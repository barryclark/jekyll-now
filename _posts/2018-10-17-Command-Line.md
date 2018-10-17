#An introductory exploration of the terminal emulator 

The command line is one of the most important tools at our disposal. More than a place to run executables, the terminal has intense capabilities to match long and storied history. We use the command prompt every day, but it’s also our least understood tool. 

We’ll discuss some of the history, but for the most part, I’d like to open some beginners’ eyes to the possibilities of what the terminal can do for workflow. 

##Not just a command line

At Flatiron, we use the terminal very simply; for the most part, it’s a place to run our server commands or clone git repositories. A lot of the folks here are looking for a comprehensive education on web programming, which includes not having any experience in the field. In effect, this can give students the habitual notion that the terminal is simply a place to dump commands — little more than programs no one wanted to code a GUI for. 

And while the nature of the command line is this REPL-based execution, the terminal is much more than a place to dump commands — instead, it’s possible to build entire programs with the programs made for the terminal. Why is this?

When machine-based computing was first kicking off in the 60s and 70s, computers were exceptionally large and expensive compared to today’s models. Since it would be rare for a building or business to have more than a single computer, the world needed a way for multiple users to engage with the computer at once. 

This is how terminals were born. A terminal was nothing more than an early thin-client for accessing a mainframe computer (think iPad connecting to large services like Facebook or Netflix). 

When commands were input to a terminal, it would simply relay the command to the mainframe, hold, and await results. Since processors were much slower, this could take a significant amount of CPU execution, but in the end, the user’s session was given a printout of execution. 

This meant that computers needed to speak a language more powerful than punch-cards — were glossing over quite a bit of information, but this post’s purposes, were left with two important artifacts of computing history: the C language, and “sh”, the world’s first widely used shell. 

>>
Aside: Both C and sh are still in use today, though sh has generally been replaced with better iterations, such as bash, which is standard on nearly all non-Windows based OSs today. 

Both sh and C were developed by Ken Thompson inside the AT&T/Bell laboratories. I’d spend all day talking about it, but this post has to be short!
<<

##Chaining programs

What’s important to remember about shells in general is that they abstract the way the machine and operating system work in order to provide a consistent execution across systems. 

This means is doesn’t matter what processor, operating system, memory, or monitor you use; if your system can have bash installed on it, “ls” will always output the contents of your current directory. 

This is great! All our bash programs work the same way all the time on any computer. Again, we generally have C to thank for this, but that’s a topic for another blog post. 

Let’s chain some together to see what’s possible. 

`bash
$ ls -l | grep “Documents”
`

Here, I’m outputting the contents of my directory using a single line for each result, but instead of printing those to the screen I’m piping them to another program, called grep. grep will search each line of its input to find patterns matching its arguments. 

I believe if you can’t explain something simply, you don’t know it yet, so let’s put this command into a single English sentence: Print out the names of the contents in this directory and tell me if any of them contain the word “Documents”. Easy, right? Looks like we found a hit, which is obviously the Documents folder in my Mac’s home directory. Let’s try something else:

`bash
$ ls -l | grep “Do”
`

Or, Print out the names of the contents in this directory and tell me if any of them contain the word “Documents”. This time, we got more results — grep doesn’t care if it finds one result or many, it’ll keep searching its inputs until it exhausts the list. It doesn’t have to care about case sensitivity either: 

`bash
$ ls -l | grep -i “Do”
`

Now we’re looking for anything containing the string “do”; looks like we’ve also stumbled upon my to-do list. 

Very thankfully, there’s a command called “find” that will let us search for files much more effectively than piping to grep, but for the purposes of a demo this has served us well. 

##Bigger fish

It might look humble, but we can expand this to be an exceptionally powerful tool. Let’s look at git bisect. 
