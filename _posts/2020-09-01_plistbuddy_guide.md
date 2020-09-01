# PlistBuddy Guide

## Why does this doc exist?

With the `defaults` command showing some weird behaviors, I wanted to learn another command-line tool that I could work it my workflows.

I put this doc together because I was finding it difficult to locate anything out on the Internet related to `PlistBuddy` that was easy to following or understand. 

Also because I am more of a visual learner (actually seeing the "cause" and "effect" of a given command) so hopefully some of the examples below will make it easier for others to see how they can apply `PlistBuddy` to their workflows as well.

It should be noted that this is not an extensive guide to using `PlistBuddy` but it should get you moving in the right direction. I will try to update it as I find new ways to use `PlistBuddy` that I think might be useful for others as well. 😊


## What is PlistBuddy?

`PlistBuddy` is a command line utility that can be used to manipulate values inside of a `.plist` file aka preference lists.


## Using PlistBuddy

### Binary Path

To call `PlistBuddy` you must use the fully qualified path.

- `/usr/libexec/PlistBuddy`

If you run the above command without any arguments you get the following usage output.

```
/usr/libexec/PlistBuddy 

Usage: PlistBuddy [-cxh] <file.plist>
    -c "<command>" execute command, otherwise run in interactive mode
    -x output will be in the form of an xml plist where appropriate
    -h print the complete help info, with command guide
```

Notice the `-c` flag. This flag allows you to execute commands immediately with `PlistBuddy`. This is handy for leveraging `PlistBuddy` within shell scripts.

### PlistBuddy Help Page

If you open Terminal.app and type `/usr/libexec/PlistBuddy -h` then hit Return you will get the following help output for `PlistBuddy`.

```
/usr/libexec/PlistBuddy -h

Command Format:
    Help - Prints this information
    Exit - Exits the program, changes are not saved to the file
    Save - Saves the current changes to the file
    Revert - Reloads the last saved version of the file
    Clear [<Type>] - Clears out all existing entries, and creates the root of Type
    Print [<Entry>] - Prints value of Entry.  Otherwise, prints file
    Set <Entry> <Value> - Sets the value at Entry to Value
    Add <Entry> <Type> [<Value>] - Adds Entry to the plist, with value Value
    Copy <EntrySrc> <EntryDst> - Copies the EntrySrc property to EntryDst
    Delete <Entry> - Deletes Entry from the plist
    Merge <file.plist> [<Entry>] - Adds the contents of file.plist to Entry
    Import <Entry> <file> - Creates or sets Entry the contents of file

Entry Format:
    Entries consist of property key names delimited by colons.  Array items
    are specified by a zero-based integer index.  Examples:
        :CFBundleShortVersionString
        :CFBundleDocumentTypes:2:CFBundleTypeExtensions

Types:
    string
    array
    dict
    bool
    real
    integer
    date
    data

Examples:
    Set :CFBundleIdentifier com.apple.plistbuddy
        Sets the CFBundleIdentifier property to com.apple.plistbuddy
    Add :CFBundleGetInfoString string "App version 1.0.1"
        Adds the CFBundleGetInfoString property to the plist
    Add :CFBundleDocumentTypes: dict
        Adds a new item of type dict to the CFBundleDocumentTypes array
    Add :CFBundleDocumentTypes:0 dict
        Adds the new item to the beginning of the array
    Delete :CFBundleDocumentTypes:0 dict
        Deletes the FIRST item in the array
    Delete :CFBundleDocumentTypes
        Deletes the ENTIRE CFBundleDocumentTypes array
```

Not super helpful, IMO, if you want to know how to apply the commands 😜.


## Examples 

Sample plist file call `plistbuddy_plist_example.plist`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>Palo Alto Networks</key>
	<dict>
		<key>GlobalProtect</key>
		<dict>
			<key>PanSetup</key>
			<dict>
				<key>Portal</key>
				<string>vpn.example.com</string>
				<key>Prelogon</key>
				<integer>0</integer>
			</dict>
		</dict>
	</dict>
</dict>
</plist>
```

### Reading data from a plist.

**Return the entire contents of a plist**

Use the following command to print the entire contents of a plist.

*Command*

```sh
/usr/libexec/PlistBuddy -x -c "print" plistbuddy_plist_example.plist
```

`-x` tells `PlistBuddy` to print the output in XML format.

*Output*

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Palo Alto Networks</key>
    <dict>
        <key>GlobalProtect</key>
        <dict>
            <key>PanSetup</key>
            <dict>
                <key>Portal</key>
                <string>my.vpn.example.com</string>
                <key>Prelogon</key>
                <integer>0</integer>
            </dict>
        </dict>
    </dict>
</dict>
</plist>
```

**Return the contents of a particular key in the plist**

To return a specific key simply add it to the print command with the double-quotes. In the example below, we are returning the key `Palo Alto Networks`. The key that you are returning must exist at that particular level in the plist. Meaning we cannot return other keys if they are stored at a lower level within another key.

Notice that you must put single quotes ' ' around keys containing spaces.  

Slashes (\\) were added in the command below for readability but the command can be written on one line.

*Command*

```sh
/usr/libexec/PlistBuddy -c \
    "print 'Palo Alto Networks'" plistbuddy_plist_example.plist`
```

*Output*

```
Dict {
    GlobalProtect = Dict {
        PanSetup = Dict {
            Portal = vpn.example.com
            Prelogon = 0
        }
    }
}
```

**Returning a value from within a lower level dictionary**

If we want to return a specific value stored in a key that exists at a lower level within a plist structure you can chain the Keys together to form a "Path" to the value you are looking for.

In this example, we are pulling the value stored in the `Portal` key.

Each key in the plist is connected by a colon ":" all the way up to the key that we are looking for.

Slashes (\\) were added in the command below for readability but the command can be written on one line.

*Command*

```sh
/usr/libexec/PlistBuddy -c \
    "print 'Palo Alto Networks':GlobalProtect:PanSetup:Portal" \
    plistbuddy_plist_example.plist
```

*Output*

```
vpn.example.com
```

A similar command can be used if we want to return the contents of the `PanSetup` key. The output returns a dictionary.

*Command*

```sh
/usr/libexec/PlistBuddy -c \
    "print 'Palo Alto Networks':GlobalProtect:PanSetup" \
    plistbuddy_plist_example.plist
```

*Output*

```
Dict {
    Portal = vpn.example.com
    Prelogon = 0
}
```

**What if a key you're wanting to read does not exist?**

If a key does not exist in a plist `PlistBuddy` will let you know with the following output.

```sh
Print: Entry, "Palo Alto Networks:GlobalProtect:PanSetup:abcd", Does Not Exist
```

You can use this output within scripts to detect whether a specific key exists or not.


### Updating a Value Within an Existing Plist

We can use the `set` keyword to update an existing key value.

If the key does not already exist in a given plist you can use the `add` keyword to append the new key and/or value to the plist.

Similar to the `print` keyword we need to define the complete "path" to the key that we want to update. In the example below, we are updating the `Portal` key with the value `my.vpn.example.com`. Just after the end of the path, we add a space and the value that we are updating the key to. The new value needs to be within the same double quotes as the path.

```sh
/usr/libexec/PlistBuddy -c \
    "set 'Palo Alto Networks':GlobalProtect:PanSetup:Portal my.vpn.example.com" \
    plistbuddy_plist_example.plist
```

If we print the contents of the plist we see that the `Portal` key has been updated.

```
Dict {
    Palo Alto Networks = Dict {
        GlobalProtect = Dict {
            PanSetup = Dict {
                Portal = my.vpn.example.com
                Prelogon = 0
            }
        }
    }
}
```

### Creating a Plist

If we want to create a new plist we can use the `add` keyword. If `PlistBuddy` sees that that plist does not exist it will try to create it.

If we want to create the plist `com.paloaltonetworks.GlobalProtect.settings.plist` we can do so with the following command.

This command will create a new plist file in the current directory containing the `Palo Alto Networks` dictionary key.

*Command*

```sh
/usr/libexec/PlistBuddy -c \
    "add 'Palo Alto Networks' dict" \
    com.paloaltonetworks.GlobalProtect.settings.plist
```

*Output*

```sh
File Doesn't Exist, Will Create: com.paloaltonetworks.GlobalProtect.settings.plist
```

*Printed Plist Contents*

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Palo Alto Networks</key>
    <dict/>
</dict>
</plist>
```

If we want to create the same `com.paloaltonetworks.GlobalProtect.settings.plist` plist with the entire dictionary structure and the `Portal` key with value `vpn.example.com` from the example above we can do that with the following command.

At the end of the "Path", we add the type `string` and the value `vpn.example.com`

*Command*

```sh
/usr/libexec/PlistBuddy -c \
    "add 'Palo Alto Networks':GlobalProtect:PanSetup:Portal \
    string vpn.example.com" com.paloaltonetworks.GlobalProtect.settings.plist
```

*Printed Plist Contents*

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Palo Alto Networks</key>
    <dict>
        <key>GlobalProtect</key>
        <dict>
            <key>PanSetup</key>
            <dict>
                <key>Portal</key>
                <string>vpn.example.com</string>
            </dict>
        </dict>
    </dict>
</dict>
</plist>
```

### Putting it all together

Here is how it would look to put multiple commands together to create the original plist that we started with.

*Commands*

```sh
# Add the dictionary structure and Portal key value pair
/usr/libexec/PlistBuddy -c \
    "add 'Palo Alto Networks':GlobalProtect:PanSetup:Portal \
    string vpn.example.com" com.paloaltonetworks.GlobalProtect.settings.plist

# Add the Prelogon key value pair
/usr/libexec/PlistBuddy -c \
    "add 'Palo Alto Networks':GlobalProtect:PanSetup:Prelogon integer 0" \
    com.paloaltonetworks.GlobalProtect.settings.plist
```

*Printed Plist Contents*

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Palo Alto Networks</key>
    <dict>
        <key>GlobalProtect</key>
        <dict>
            <key>PanSetup</key>
            <dict>
                <key>Portal</key>
                <string>my.vpn.example.com</string>
                <key>Prelogon</key>
                <integer>0</integer>
            </dict>
        </dict>
    </dict>
</dict>
</plist>
```
