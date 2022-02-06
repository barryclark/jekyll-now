---
layout: memory
title: bash - strict mode
---

From time to time it's very helpful to run the bash in strict mode. Sadly I forget some of the 'set' options from time to time. So better save it as a memory

# Content
- [set -e, -u, -x, -o pipefail](#set--e--u--x--o-pipefail)
- [set -e](#set--e)
- [set -x](#set--x)
- [set -u](#set--u)
- [set -o pipefail](#set--o-pipefail)
- [Setting IFS](#setting-ifs)
- [Original Reference](#original-reference)

#### set -e, -u, -x, -o pipefail

* The `set` lines
  - These lines deliberately cause your script to fail. Wait, what? Believe me, this is a good thing. 
  - With these settings, certain common errors will cause the script to immediately fail, explicitly and loudly. Otherwise, you can get hidden bugs that are discovered only when they blow up in production.

    `set -euxo pipefail` is short for:
    ```
    set -e
    set -u
    set -o pipefail
    set -x
    ```


#### set -e
* The `set -e` option instructs bash to immediately exit if any command [1] has a non-zero exit status. You wouldn't want to set this for your command-line shell, but in a script it's massively helpful. In all widely used general-purpose programming languages, an unhandled runtime error  
- whether that's a thrown exception in Java, or a segmentation fault in C, or a syntax error in Python - immediately halts execution of the program; subsequent lines are not executed.

    - By default, bash does not do this. This default behavior is exactly what you want if you are using bash on the command line 
    - you don't want a typo to log you out! But in a script, you really want the opposite. 
    - If one line in a script fails, but the last line succeeds, the whole script has a successful exit code. That makes it very easy to miss the error.
    - Again, what you want when using bash as your command-line shell and using it in scripts are at odds here. Being intolerant of errors is a lot better in scripts, and that's what set -e gives you.

#### set -x
* Enables a mode of the shell where all executed commands are printed to the terminal. In your case it's clearly used for debugging, which is a typical use case for set -x : printing every command as it is executed may help you to visualize the control flow of the script if it is not functioning as expected.

#### set -u
* Affects variables. When set, a reference to any variable you haven't previously defined - with the exceptions of $* and $@ - is an error, and causes the program to immediately exit. Languages like Python, C, Java and more all behave the same way, for all sorts of good reasons. One is so typos don't create new variables without you realizing it. For example:

    ```
    #!/bin/bash
    firstName="Aaron"
    fullName="$firstname Maxwell"
    echo "$fullName"
    ```
* Take a moment and look. Do you see the error? The right-hand side of the third line says "firstname", all lowercase, instead of the camel-cased "firstName". Without the -u option, this will be a silent error. But with the -u option, the script exits on that line with an exit code of 1, printing the message "firstname: unbound variable" to stderr. 
* This is what you want: have it fail explicitly and immediately, rather than create subtle bugs that may be discovered too late.


#### set -o pipefail
* This setting prevents errors in a pipeline from being masked. If any command in a pipeline fails, that return code will be used as the return code of the whole pipeline. By default, the pipeline's return code is that of the last command even if it succeeds. Imagine finding a sorted list of matching lines in a file:

    ```
    $ grep some-string /non/existent/file | sort
    grep: /non/existent/file: No such file or directory
    % echo $?
    0
    ```

- Here, grep has an exit code of 2, writes an error message to stderr, and an empty string to stdout. 
- This empty string is then passed through sort, which happily accepts it as valid input, and returns a status code of 0. 
- This is fine for a command line, but bad for a shell script: you almost certainly want the script to exit right then with a nonzero exit code... like this:

    ```
    $ set -o pipefail
    $ grep some-string /non/existent/file | sort
    grep: /non/existent/file: No such file or directory
    $ echo $?
    2
    ```
#### Setting IFS
* The IFS variable - which stands for Internal Field Separator - controls what Bash calls word splitting. When set to a string, each character in the string is considered by Bash to separate words. This governs how bash will iterate through a sequence. For example, this script:

    ```
    #!/bin/bash
    IFS=$' '
    items="a b c"
    for x in $items; do
        echo "$x"
    done

    IFS=$'\n'
    for y in $items; do
        echo "$y"
    done
    ... will print out this:

    a
    b
    c
    a b c
    ```
* In the first for loop, IFS is set to $' '. (The $'...' syntax creates a string, with backslash-escaped characters replaced with special characters - like "\t" for tab and "\n" for newline.) Within the for loops, x and y are set to whatever bash considers a "word" in the original sequence. 
* For the first loop, IFS is a space, meaning that words are separated by a space character. 
* For the second loop, "words" are separated by a newline, which means bash considers the whole value of "items" as a single word. If IFS is more than one character, splitting will be done on any of those characters.
* Got all that? The next question is, why are we setting IFS to a string consisting of a tab character and a newline? Because it gives us better behavior when iterating over a loop. By "better", I mean "much less likely to cause surprising and confusing bugs". This is apparent in working with bash arrays:

    ```
    #!/bin/bash
    names=(
    "Aaron Maxwell"
    "Wayne Gretzky"
    "David Beckham"
    )

    echo "With default IFS value..."
    for name in ${names[@]}; do
    echo "$name"
    done

    echo ""
    echo "With strict-mode IFS value..."
    IFS=$'\n\t'
    for name in ${names[@]}; do
    echo "$name"
    done

    ```
    ```
    ## Output
    With default IFS value...
    Aaron
    Maxwell
    Wayne
    Gretzky
    David
    Beckham

    With strict-mode IFS value...
    Aaron Maxwell
    Wayne Gretzky
    David Beckham
    ```
Or consider a script that takes filenames as command line arguments:

    ```
    for arg in $@; do
        echo "doing something with file: $arg"
    done
    ```
* If you invoke this as myscript.sh notes todo-list 'My Resume.doc', then with the default IFS value, the third argument will be mis-parsed as two separate files - named "My" and "Resume.doc". When actually it's a file that has a space in it, named "My Resume.doc".

* Which behavior is more generally useful? The second, of course - where we have the ability to not split on spaces. If we have an array of strings that in general contain spaces, we normally want to iterate through them item by item, and not split an individual item into several.

* Setting IFS to $'\n\t' means that word splitting will happen only on newlines and tab characters. This very often produces useful splitting behavior. 
* By default, bash sets this to $' \n\t' - space, newline, tab - which is too eager.

## Original Reference
* **Maxwell, A. Unofficial-bash-strict-mode. Retrieved 2018, from http://redsymbol.net/articles/unofficial-bash-strict-mode/**
