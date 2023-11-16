
BTH is a swiss-army knife tool that incorporates numerous functionalities that makes it ideal for a reverse engineer, malware analyst, or any other user who needs a file analysis tool. Each of the main features will be described below and they are listed here for your convenience.

The goal of this project is to overcome the shortcomings of the current selection of file analysis tools and to amalgamate functionality from disparate tools into a single suite. 

If you would like to support this project please email me at colestrickler@gmail.com.

For compiled binaries see: https://github.com/ColeStrickler/BTH/releases/tag/v1.0

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

# **Loading Files**
You can load a file into BTH by clicking 'Select File' in the top left. This will bring up a navigation tab where files and directories can be browsed through and selected. When a file is selected it is automatically loaded from offset 0. The default max load size is 200,000 bytes.

![]({{site.baseurl}}/images/filebrowser.PNG)


# **Hex Editor**
The Hex Editor is a dump of bytes from the current file load offset. Each byte can be clicked on and edited. There are two view options: hex and ASCII

Hex View
![]({{site.baseurl}}/images/hexdump.PNG)

ASCII View
![]({{site.baseurl}}/images/asciidump.PNG)


# **Structure Overlay/Editor**
The structure overlay feature allows for overlaying custom structures over regions in a file. This feature is particular useful for memory dump analysis as it allows deciphering in memory structures by viewing their data and navigating their pointers. For Windows use cases Microsoft keeps descriptions of process and thread structures here https://learn.microsoft.com/en-us/windows/win32/procthread/process-and-thread-structures. These can easily be added with the structure editor or with the orchestration API.

The structure editor feature allows for adding user defined structures. The ability to add user defined structures can greatly assist in reverse engineering tasks. To see how to add and edit structures via the orchestration API please see that section further down.

![]({{site.baseurl}}/images/memorydumpview.PNG)




# **Disassembler**
The disassembler works for x86/x86-64 binaries only

![]({{site.baseurl}}/images/disassembler.PNG)


# **PE File Format Parser**
The PE File Format parser will handle any loaded files that are detected to be of this format and display the data. If you need information about a particular field please see: https://learn.microsoft.com/en-us/windows/win32/debug/pe-format

Dos Header
![]({{site.baseurl}}/images/dosHeader.PNG)

Rich Header
![]({{site.baseurl}}/images/richHeader.PNG)

File Header
![]({{site.baseurl}}/images/fileHeader.PNG)

Optional Header
![]({{site.baseurl}}/images/optionalHeader.PNG)

Data Directories
![]({{site.baseurl}}/images/dataDirectories.PNG)

Section Headers
![]({{site.baseurl}}/images/sectionHeaders.PNG)

Imports
![]({{site.baseurl}}/images/imports.PNG)

Exports
tba


# **Settings**

### Color Settings
Nearly every color in BTH can be customized.

![]({{site.baseurl}}/images/settings.PNG)


Color Settings are also scriptable
![]({{site.baseurl}}/images/colorchange_script.gif)


### Performance Settings
tba



# **String and Byte Scanner**

The Byte Scanner supports a maximum pattern size of 16 bytes
![]({{site.baseurl}}/images/bytescan.PNG)

The String Scanner displays 250 strings by default but all strings can be dumped
![]({{site.baseurl}}/images/stringscan.PNG)


# **Embedded Python Interpreter**
The embedded Python interpreter currently uses Python 3.12 and is able to be accessed in the top right when in HexDump view. The Python interpreter loads the mgr module that supports the orchestration API. Much of the power of BTH comes from the fact that it exposes low level analysis methods to a high level language where automated analysis can be more easily performed. The details from the orchestration API are described below.

The embedded interpreter will access your local Python Path by its environment variable. To include Python modules that are not already included in a default Python installation, you must make sure they are put where your other Python modules are on disk.

There is currently one interpreter thread that runs at a time. Running a script with an infinite loop will lock up this thread for the remainder of the application runtime. There is not an option for multiple threads at the moment because we pybind11 does not currently support this.

![]({{site.baseurl}}/images/interpreter.PNG)


# **Orchestration API**
BTH exposes an orchestration API that allows much of its functionality to be accessed through Python methods. The orchestration API is implemented in the mgr module. To get started import the mgr module at the top of your script. To see some basic examples of using this API please see https://github.com/ColeStrickler/BTH/tree/main/ScriptExamples

### File System

GetFileLoadSize()
- This function takes no parameters and will return the number of bytes that are currently loaded. This is not the size of the file on disk, but just the number of bytes that are currently loaded in memory. By default, the file system manager only loads 200,000 bytes at a time to avoid using too much memory.

GetFileSize()
- This function takes no parameters and returns the total file size on disk of the currently selected file.

GetFileLoadOffset()
- This function takes no parameters and returns the offset of the current file load. This offset indicates where the currently loaded bytes are sampled from.


SetFileLoadOffset(string offset)
- This function takes in an offset as a hex string and sets the current global offset to this value.
- The hex string must be entered like "ff4d"
- The hex string is allowed a maximum length of 8 characters, this should be sufficient for nearly all cases
- In order for this to actually change you must set the offset atleast 200,000 bytes after the current offset, or anywhere before the current offset


LoadFile(string path)
- This function takes in an absolute or relative path and will attempt to load that file from offset 0
- If the selected file is already loaded or if there is an error this method will return -1
- If the selected file is successfully loaded 0 is returned


GetByte(int offset)
- This function takes in an offset from the current load offset and will attempt to return the byte at that location in the format '1f'
- If the byte at that offset does not exist or the offset is invalid an empty string will be returned


SetByte(int offset, string val)
- This function takes in an offset from the current load offset and attempts to set the byte value at that location to the parameter val
- If the offset or input value is invalid -1 is returned
- The input value must be within the range 00-ff
- On success 0 will be returned


SaveFile(string path)
- This function takes in an absolute path and attempts to save the file there
- All edits will be done to the file during the save process
- On success 0 is returned
- On failure -1 is returned


### Structure Editor

NewStructure(string name)
- This function takes in a name and adds a new structure with that name to the structure editor
- The return value from this function is a Structure ID value that uniquely identifies this structure, this value will be used for calls to other structure API calls


GetStructId(string name)
- This function takes in the name of a structure and returns the ID of the structure if it exists
- If this call fails to find the structure -1 is returned


AddStructMember(int struct_id, string member_name, int size, int display_type)
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


SaveStructure(int struct_id)
- This function takes in a struct_id that can be obtained when the structure is created with NewStructure() or through GetStructId() and saves it to the database
- Saving a structure to the database will make the structure available for use everytime you run BTH


DeleteStructure(int struct_id)
- This function takes in a struct_id that can be obtained when the structure is created with NewStructure() or through GetStructId() and deletes it and all of its member variables from the database

### Colors

ChangeColor(string component, float r, float g, float b)
- This function takes in a component name. This is one of the components listed in the color settings.
- r,g,b must all be in the range 0.00-1.00
- This function returns 0 on success and -1 on an error

### Scanning

StringScan(int min_string_length)
- This function takes in a min_string_length parameter that dictates the minimum length of strings you want to extract
- This function returns a list of all strings, both ASCII and Unicode, that are of atleast minimum_string_length
- If min_string_length is negative or another error occurs an empty list is returned


ByteScan(list bytes)
- This function takes in a list of bytes(i.e. call this function like: ByteScan(\['4d', '5a','ff', '41'])) and will return a list of absolute offsets in the form of integers(unsigned long long in C++)
- The input byte list cannot exceed 16 in size
- Bytes must be of the format 'f1'
- Upon error an empty list is returned


### Disassembler

GetOpcode(int offset)
- This function takes in an offset from the current load position and returns data about the opcode located there.
- The opcode retrieved will be the opcode that falls in the range of \[opcode_start : opcode_start+opcode_size]
- On error an empty list is returned
- On success return = \[opcode_string, relative_offset_from_load_pos, opcode_size]


### PE Format
NOTE: almost all data is returned in an integer format. Use hex(value) to view the data in byte format

rvaToRaw(unsigned int rva)
- This functions takes in a relative virtual address and will output a raw offset into the file
- On error this function returns 0


DosHeader()
- This method will return a DosHeader structure with members accessible with the following: DosHeader.e_lfanew


FileHeader()
- This method will return a FileHeader structure with members accessible with the following:
FileHeader.NumberOfSymbols

OptionalHeader64()
- This method will return an OptionalHeader64 structure with members accessible with the following: OptionalHeader64.SizeOfImage
- If the currently loaded file is 32bit, or if there is an error, a zeroed out structure is returned


OptionalHeader32()
- This method will return an OptionalHeader32 structure with members accessible with the following: OptionalHeader32.SizeOfImage
- If the currently loaded file is 64bit, or if there is an error, a zeroed out structure is returned


RichHeader()
- This method will return a RichHeader struct with the following components:
  1. ProductId
  2. VsVersion
  3. UseCount
- Access these variables like so: RichHeader.ProductId


DataDirectories()
- This method returns a list of DataDirectoryEntry structures with the following components
	1. Name
    2. Size
    3. VirtualAddress
- Access these variables like so: DataDirectoryEntry.Name


ImportData()
- This methods returns a list of ImportEntry structures
- Each Import entry structure has the following components:
	1. Library
    2. FunctionImports -> this is a list of lists containing [ImportFunctionName, FunctionRva]
    

SectionHeaders()
- This method returns a list of IMAGE_SECTION_HEADER structures
- IMAGE_SECTION_HEADER has the following components
	1. Name
    2. Misc_PhysicalAddress
    3. Misc_VirtualSize
    4. VirtualAddress
    5. SizeOfRawData
    6. PointerToRawData
    7. PointerToRelocations
    8. PointerToLineNumbers
    9. NumberOfRelocations
    10. NumberOfLineNumbers
    11. Characteristics


# API Extension
The Orchestration API can be easily extended by editing or adding to the methods inside of PYBIND11_EMBEDDED_MODULE(mgr, m) function in main.cpp. 

A new method can be defined like so:

m.def("MethodName", \[](std::string name) {
	printf("Hello %s", name.c_str());
});

The whole point of BTH is to make it as hackable as possible. Adding new methods and functionality will enhance your experience and is greatly encouraged.
