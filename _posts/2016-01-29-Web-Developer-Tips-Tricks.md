---
layout: post
title: Web Developer Tips & Tricks...
excerpt_separator: <!--more-->
img_file: code-asif.png
---
Here is a working copy of list of tips and tricks for web developers...
<!--more-->
My special thanks to Hunter @Devbootcamp.com...


### MAC Symbol Guide

  - ⌘ – Command Key
  - ⇥ – Tab Key
  - ⌃ – Control Key
  - ⌥ – Option Key
  - ⇧ – Shift Key
  - ⏎ – Return


### Sublime Shortcuts
[Complete List](http://sublime-text-unofficial-documentation.readthedocs.org/en/latest/reference/keyboard_shortcuts_osx.html)

- move lines vertically ``` ⌘ + ⌃ ```
- jump to file ``` ⌘ + p + (fuzzy file name) ```
- global search ``` ⌘ + ⇧ + f ```
- duplicate line ``` ⌘ + ⇧ + d ```
- select word (and repeat) ``` ⌘ + d ```
- commenting code ``` ⌘ + / ```
- jump to line ``` ⌘ + p + : + (line number (int)) ```

### Make your code easy to read
Limit the length of your lines to 80 characters. Set a ruler in Sublime User settings. ```"rulers": [80]```

### Keep your working window clean.
 

 Use [Spectacle](https://www.spectacleapp.com/). It is the easiest way to accomplish this.

 Auto hiding the Doc can provide some more screen estate. Having the Dock take up a pretty big chunk of your screen is bad, especially on widescreen displays, where the Dock sits at the bottom and eats away precious height. Alt-Click the black bar to open preferences, then check auto-hide.

 Use `⌘ + K` to clear bash terminal. This command does not clear your history so it is better than `CLR` command.

### Follow the Golden Rule of BLOCKS
If it has a __BEGINNING__ it also has an __END__.

Write the end as soon as you write the beginning and save your self lots of frustration counting def-end combinations later.


<pre><xmp style="width:450px">
ruby

def thing_func

end

thingy.each do

end

{ }

[ ]
</xmp></pre>

### Code readability
__Code readability BEATS conciseness 10.times out of 10__

This means writing functions that are easy for developers to read. Not just you, but the people that maintain your code down the road.


<img src="http://img.picturequotes.com/2/47/46731/always-code-as-if-the-guy-who-ends-up-maintaining-your-code-will-be-a-violent-psychopath-who-knows-quote-1.jpg">

Don't one line a thing because you want to look cool.

Indentation - OMG do this. All the time. No matter what. Lots of languages are whitespace dependent, meaning you must indent correctly. Better to establish this habit now. Also, I will look at you funny if your screen is all jacked up.

### File Organization

Good habits when it comes to naming and storing files is something that will pay off big time for you in the long run.

Don't keep your files on the desktop.

Spend some time to figure out a good file structure that works for you. Once you make a plan stick to it. Down the road you will have  away easier time tracking down projects because they will have been placed in to your structure by some standard of your creation.

Here is a sample of what a well organized file structure looks like.

<pre><xmp style="width:450px">
bash
Main Folder
├── 1Phase
│   ├── 1Week
│   ├── 2week
│   ├── 3Week
│   ├── assesments
│   ├── breakouts
│   ├── general
│   ├── lectures
│   └── phase-1-guide
├── 2Phase
│   ├── 4week
│   ├── 5week
│   ├── 6week
│   ├── assessments
│   ├── guides
│   ├── lectures
│   ├── other
│   └── p-challenges
├── 3Phase
│   ├── challenges
│   ├── lectures
│   ├── other
│   ├── phase-3-guide
│   └── someshit
├── Core_Coaches
│   └── Initial\ prospectus.pages
├── hackathons
│   ├── notes.md
│   ├── pitches.md
│   ├── schedule.md
│   └── team_leads.md
├── hemlock
│   ├── CONTRIBUTING.md
│   ├── Gemfile
│   ├── Gemfile.lock
│   ├── README.md
│   ├── Rakefile
│   ├── bin
│   ├── lib
│   └── spec
├── lectures
│   ├── 1phase
│   └── 2phase
├── other
│   ├── Ruby-Anagrams
│   ├── devbootcamp.github.io
│   ├── hemlock
│   ├── node_sample2
│   ├── react-7guis
│   ├── retros
│   └── rspec_rails_4
└── phase-guides
    └── RockDoves
</xmp></pre>


### Git Workflow

Commit early and often

A good starting work flow might be something like:

  - Create your branch
  - Build test for a feature
  - Commit
  - Pass all tests for a feature
  - Commit

### NO SUDO NO (IDCare what the INTERNET tells you)
Short and sweet. If you are using ```sudo``` to install something on your mac....

__You're doing it WRONG__

- Ask for help.
- When installing something, check for a homebrew formula as your first option.

**Disclaimer** There are times when ```sudo``` is the only way, but you should
really really reallllllly try to avoid it...