---
layout: post
title: My approach to file management in MxEngine
---

![mxengine-file-scanning]({{ site.baseurl }}/images/mxengine-file-scanning.png)

File management is a very important part of any game engine. A good file manager makes lives of game developers much easier and helps them to write cross-platform code. In this article we will discuss how it can be done and what the common problems can arise when developing such file management system.

## Where are we?

The first step the engine is need to perform when it is being launched, is to determine where it actually is in terms of the user file system. This step is obviously required if your application have some kind of config file which is used to setup other subsystems, or if you have some dynamic libraries, which should be loaded on engine startup. Only when the root directory is determined, other files can be processed based on it.

During development it is also a good idea to switch application working directory to the user's source/resource directory. It is much easier for a game developer to store code sources, game objects and configs in one place, for example in his project directory. Using output binary directory as resource storage is error-prone: it can be cleared accidentally by a programmer or switched to other folder due to different IDE settings. As a bonus, when resource folder is separated from build folder, we do not have to copy all files to the binary directory or force user to hardcode the path to the root directory in the config. Also, binary and source directories can be easily detected and tracked by the build system, such as CMake. For example, in MxEngine I used some interesting tricks to perform working directory setup depending on how the engine is launched:

{% highlight cmake %}
# add macro definitions to built executable
target_compile_definitions(${EXECUTABLE_NAME} PUBLIC MXENGINE_PROJECT_SOURCE_DIRECTORY="${CMAKE_CURRENT_SOURCE_DIR}")
target_compile_definitions(${EXECUTABLE_NAME} PUBLIC MXENGINE_PROJECT_BINARY_DIRECTORY="${CMAKE_CURRENT_BINARY_DIR}")
{% endhighlight %}

{% highlight cpp %}
#if defined(MXENGINE_PROJECT_SOURCE_DIRECTORY) && defined(MXENGINE_PROJECT_BINARY_DIRECTORY)
inline void LaunchFromSourceDirectory()
{
	FilePath currentWorkingDirectory = std::filesystem::current_path();
	FilePath binaryDirectory = MXENGINE_PROJECT_BINARY_DIRECTORY;
	if (currentWorkingDirectory == binaryDirectory)
	{
		std::filesystem::current_path(MXENGINE_PROJECT_SOURCE_DIRECTORY);
	}
}
{% endhighlight %}

If the executable is launched from CMake build directory, this means that the game is built by developer and we need to switch to the source directory. Otherwise no actions are performed as the game is probably launched from folder which already contains all necessary resources. Note that in the code above I use C++17 `std::filesystem` library to check current working directory and set a new one. In my opinion, filesystem library is one of the best things standard brought to us, and you should definitely use it if you are targeting modern language versions.

## Know your files

When we are finally determined the root directory of our game, the good idea is to process all files: check if engine config presents in directory, load all system resources like shaders and lookup-textures, maybe generate some data for later use. Scanning process is very easy: you can simply check if file or directory exists by calling `std::filesystem::exists`, get file extensions by invoking member function `std::filesystem::filepath::extenstion` or even look through directories recursively using `std::filesystem::recursive_directory_iterator`:

{% highlight cpp %}
void FileManager::InitializeRootDirectory(const std::filesystem::path& directory)
{
    using fs = std::filesystem;
	if (!fs::exists(directory))
    {
        fs::create_directory(directory);
    }
    
    auto it = fs::recursive_directory_iterator(directory, fs::directory_options::skip_permission_denied);
    for (const auto& entry : it)
    {
        if (entry.is_regular_file())
        {
       	    fs::path proximate = fs::proximate(entry.path(), directory);
            FileManager::ProcessFile(proximate);
        }
    }    
}
{% endhighlight %}

 Note that in the code above I create a proximate file path from the entry got by directory iterator. This is a good idea if you plan to use these paths later, and especially if you are planning to serialize them for game distribution. Proximate paths are relative to the root directory and so they remain valid even if someone decide to move game folder to another place. Because of that, try to avoid loading resources from arbitrary filepaths - it is better to create a copy of the folder inside your root directory first, and then load from it. When the user decide to release his game, he will not have to look for absolute paths in the project and replace them with local, as everything already lies there it should.

## Hashing go brrr

When the user wants to load resource from the code, he usually writes a string which somehow identifies the file. It can be a simple relative path to the requested resource, such as `level1/enemies/monster1` or some kind of associated name: `Level1.Enemies.Monster1`. And each time we have to allocate a string, convert it to a valid path, go to the file manager and ask: did you have a file `...`? You see that this process is rather slow and memory consuming. To fix this, we will perform the following optimization: let's convert all our file paths to some fixed format (unix-like paths, dot-separated paths, etc.) and then perform hashing. As a result, it will become possible to use simple integers as resource identifiers through all our system and go back to the path representation only when the file is actually needed to be loaded. The hashing can be performed with any simple algorithm, such as *crc32*, and can be done at compile-time on modern C++ versions:

{% highlight cpp %}
static constexpr uint32_t crc_table[256] =
{
	0x00000000, 0x77073096, 0xee0e612c, 0x990951ba, 0x076dc419, 0x706af48f,
	0xe963a535, 0x9e6495a3, 0x0edb8832, 0x79dcb8a4, 0xe0d5e91e, 0x97d2d988,
	0x09b64c2b, 0x7eb17cbd, 0xe7b82d07, 0x90bf1d91, 0x1db71064, 0x6ab020f2,
	0xf3b97148, 0x84be41de, 0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7,
	0x136c9856, 0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9,
	0xfa0f3d63, 0x8d080df5, 0x3b6e20c8, 0x4c69105e, 0xd56041e4, 0xa2677172,
	0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b, 0x35b5a8fa, 0x42b2986c,
	0xdbbbc9d6, 0xacbcf940, 0x32d86ce3, 0x45df5c75, 0xdcd60dcf, 0xabd13d59,
	0x26d930ac, 0x51de003a, 0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423,
	0xcfba9599, 0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924,
	0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d, 0x76dc4190, 0x01db7106,
	0x98d220bc, 0xefd5102a, 0x71b18589, 0x06b6b51f, 0x9fbfe4a5, 0xe8b8d433,
	0x7807c9a2, 0x0f00f934, 0x9609a88e, 0xe10e9818, 0x7f6a0dbb, 0x086d3d2d,
	0x91646c97, 0xe6635c01, 0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e,
	0x6c0695ed, 0x1b01a57b, 0x8208f4c1, 0xf50fc457, 0x65b0d9c6, 0x12b7e950,
	0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3, 0xfbd44c65,
	0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2, 0x4adfa541, 0x3dd895d7,
	0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a, 0x346ed9fc, 0xad678846, 0xda60b8d0,
	0x44042d73, 0x33031de5, 0xaa0a4c5f, 0xdd0d7cc9, 0x5005713c, 0x270241aa,
	0xbe0b1010, 0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f,
	0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17, 0x2eb40d81,
	0xb7bd5c3b, 0xc0ba6cad, 0xedb88320, 0x9abfb3b6, 0x03b6e20c, 0x74b1d29a,
	0xead54739, 0x9dd277af, 0x04db2615, 0x73dc1683, 0xe3630b12, 0x94643b84,
	0x0d6d6a3e, 0x7a6a5aa8, 0xe40ecf0b, 0x9309ff9d, 0x0a00ae27, 0x7d079eb1,
	0xf00f9344, 0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb,
	0x196c3671, 0x6e6b06e7, 0xfed41b76, 0x89d32be0, 0x10da7a5a, 0x67dd4acc,
	0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5, 0xd6d6a3e8, 0xa1d1937e,
	0x38d8c2c4, 0x4fdff252, 0xd1bb67f1, 0xa6bc5767, 0x3fb506dd, 0x48b2364b,
	0xd80d2bda, 0xaf0a1b4c, 0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55,
	0x316e8eef, 0x4669be79, 0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236,
	0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe, 0xb2bd0b28,
	0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31, 0x2cd99e8b, 0x5bdeae1d,
	0x9b64c2b0, 0xec63f226, 0x756aa39c, 0x026d930a, 0x9c0906a9, 0xeb0e363f,
	0x72076785, 0x05005713, 0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0x0cb61b38,
	0x92d28e9b, 0xe5d5be0d, 0x7cdcefb7, 0x0bdbdf21, 0x86d3d2d4, 0xf1d4e242,
	0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1, 0x18b74777,
	0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c, 0x8f659eff, 0xf862ae69,
	0x616bffd3, 0x166ccf45, 0xa00ae278, 0xd70dd2ee, 0x4e048354, 0x3903b3c2,
	0xa7672661, 0xd06016f7, 0x4969474d, 0x3e6e77db, 0xaed16a4a, 0xd9d65adc,
	0x40df0b66, 0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9,
	0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605, 0xcdd70693,
	0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8, 0x5d681b02, 0x2a6f2b94,
	0xb40bbe37, 0xc30c8ea1, 0x5a05df1b, 0x2d02ef8d
};

using StringId = uint32_t;

constexpr StringId crc32(const char* str, size_t size, size_t idx = 0, uint32_t prev_crc = 0xFFFFFFFF)
{
	if (size == idx)
		return prev_crc ^ 0xFFFFFFFF;
	else
		return crc32(str, size, idx + 1, (prev_crc >> 8) ^ crc_table[(prev_crc ^ str[idx]) & 0xFF]);
}

#define STRING_ID(x) std::integral_constant<StringId, crc32(x, sizeof(x) - 1)>::value

constexpr StringId operator ""_id(const char* s, size_t size)
{
	return crc32(s, size);
}
{% endhighlight %}

With this code any string can be hashed at runtime via `crc32` function, or at compile time by wrapping it with `STRING_ID("smth")` macro or by adding `"smth"_id` postfix. After that we can create a global hash table which will map string hashes to actual paths and perform fast look-ups based on hash. And even if our database become so large that the collision will occur, we will easily spot it at the time of engine initialization, as all our files are contained inside project root directory. In such cases the developer simply need to think up a different name for a file, which is not a big deal in most cases.

## There is even more to cover

In this article I tried to describe the techniques which are already implemented in [MxEngine](https://github.com/asc-community/MxEngine). We did not cover actual resource processing or Unreal Engine-like resource databases. If you want a more deep understanding of file management, consider reading chapters 6 and 7 of [Game Engine Architecture book](https://www.gameenginebook.com/) which contains a lot of examples of how different engines deal with this task. This field in engine development is rather complex, so there is no silver bullet - feel free to experiment, try something new and do not forget share your ideas with others!

I hope that this little article was useful for you. As always, if you have any questions about the topic or know how to make MxEngine better, feel free to contact me on [GitHub](https://github.com/MomoDeve) or create an issue in [project repo](https://github.com/asc-community/MxEngine/issues) describing your ideas. If one day the engine become large enough to write a second part, I will definitely do so and notify you here. 