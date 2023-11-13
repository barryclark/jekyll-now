# Overview
BTH is a swiss-army knife tool that incorporates numerous functionalities that makes it ideal for a reverse engineer, malware analyst, or any other user who needs a file analysis tool. Each of the main features will be described below and they are listed here for your convenience.

The goal of this project is to overcome the shortcomings of the current selection of file analysis tools and to amalgamate functionality from disparate tools into a single suite. 

If you would like to support this project please email me at colestrickler@gmail.com. 

# Features
- Hex Editor
- PE file format parser
- Structure Overlay/Editor ideal for memory dump analysis and analysis of other file types
- Disassembler
- Complete color customization
- String Scanner
- Byte Scanner
- Embedded Python Interpreter with an exposed orchestration API
- User friendly GUI supported by open source ImGui
- Use of Modern C++ 20 for easy extension and hackability


# Hex Editor


# PE File Format Parser


# Structure Overlay/Editor


# Disassembler


# Color Customization


# String and Byte Scanner


# Embedded Python Interpreter
The embedded Python interpreter currently uses Python 3.12 and is able to be accessed in the top right when in HexDump view. The Python interpreter loads the mgr module that supports the orchestration API. Much of the power of BTH comes from the fact that it exposes low level analysis methods to a high level language where automated analysis can be more easily performed. The details from the orchestration API are described below.

The embedded interpreter will access your local Python Path by its environment variable. To include Python modules that are not already included in a default Python installation, you must make sure they are put where your other Python modules are on disk.


# Orchestration API
The orchestration API is implemented in the mgr module. To get started import the mgr module at the top of your script. To see some basic examples of using this API please see https://github.com/ColeStrickler/BTH/tree/main/ScriptExamples

## File System

### GetLoadFileSize()
- This function takes no parameters and will return the number of bytes that are currently loaded. This is not the size of the file on disk, but just the number of bytes that are currently loaded in memory. By default, the file system manager only loads 200,000 bytes at a time to avoid using too much memory.

### GetFileSize()
- This function takes no parameters and returns the total file size on disk of the currently selected file.

### GetFileLoadOffset()
- This function takes no parameters and returns the offset of the current file load. This offset indicates where the currently loaded bytes are sampled from.

### SetFileLoadOffset(string offset)
- This function takes in an offset as a hex string and sets the current global offset to this value.
- The hex string must be entered like "ff4d"
- The hex string is allowed a maximum length of 8 characters, this should be sufficient for nearly all cases


### LoadFile(string path)
- This function takes in an absolute or relative path and will attempt to load that file from offset 0
- If the selected file is already loaded or if there is an error this method will return -1
- If the selected file is successfully loaded 0 is returned


### GetByte(int offset)
- This function takes in an offset from the current load offset and will attempt to return the byte at that location in the format '1f'
- If the byte at that offset does not exist or the offset is invalid an empty string will be returned


### SetByte(int offset, string val)
- This function takes in an offset from the current load offset and attempts to set the byte value at that location to the parameter val
- If the offset or input value is invalid -1 is returned
- The input value must be within the range 00-ff
- On success 0 will be returned


### SaveFile()
- tbd


## Structure Editor

### NewStructure(string name)
- This function takes in a name and adds a new structure with that name to the structure editor
- The return value from this function is a Structure ID value that uniquely identifies this structure, this value will be used for calls to other structure API calls


### GetStructId(string name)
- This function takes in the name of a structure and returns the ID of the structure if it exists
- If this call fails to find the structure -1 is returned


### AddStructMember(int struct_id, string member_name, int size, int display_type)
This function takes in four parameters:
1. struct_id -> This parameter uniquely identifies the structure and can be obtained when creating the structure with NewStructure(), or by using GetStructId()
2. member_name -> This parameter is what the new member variable will be named
3. size -> This parameter identifies the size of the new variable. If the given size is larger than the datatype given in display type, the memdump component will attempt to display the data as an array of that datatype. If the size is not divisable by the size of the data type(i.e. size%sizeof(data type) != 0) then you will not receive any displayed output in the structure overlay
4. display_type -> display_type is the data type of the member variable. The type options are as follows:
- 0 = INT
- 1 = LONG_INT
- 2 = UNSIGNED_INT
- 3 = UNSIGNED_LONGLONG
- 4 = ASCII
- 5 = UNICODE
- 6 = HEX
- 7 = BOOL



## Raw Data Access



###

# API Extension
The Orchestration API can be easily extended by editing or adding to the methods inside of PYBIND11_EMBEDDED_MODULE(mgr, m) function.

# Upcoming





