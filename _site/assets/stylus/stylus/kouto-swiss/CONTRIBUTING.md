# kouto swiss: contributing

You want to contribute to **kouto swiss* ? It's great! I'm really glad to see you want it too.

This little document will help you to contribute to the project easily by presenting you the tools I made to help you.

There's two way to contribute to **kouto swiss**: add new functionalities or bugfix the stylus libraries, or, if you don't want/can't write stylus code, you can help me rewrite the texte of the documentation, since my english, is, I know, very bad.

### Setup the project for development

Simply fork & clone the repository, and launch the command `npm install` from inside the **kouto swiss** folder.

## Contribute to the lib

Each functionality of the **kouto swiss** lib has 3 parts: 

1. the unit tests
2. the functionality's code
3. the functionality's documentation

### Unit Tests

If you look at the folder `test/cases`, you will see many tests here. Each test consist of two files: a `.styl` file, and a `.css` file. As you can guess, The stylus file is compiled using the lib and should be equal to the result in css file.

Each time you want to add/modify a functionality, be sure to begin your work by adding the corresponding tests.

You can run the test by launching this command: `grunt test`.

### Functionality's code

All the functionalities of **kouto swiss** are stored in the `lib/` folder of the repository. Simply add your new functionality's file to the corresponding folder, and don't forget to import it into the `index.styl` file of the folder.

After each addition and/or modification, be sure **all** the tests are running well.

### Functionality's documentation

The documentations for the funtionnalities of **kouto swiss** are store in the `_docs` folder. These are written in `markdown` format and follow some simple structure you can easely understand by reading the existent doc files.

Don't forget to add your new functionnality to the `_doc/index.json` file, which is used to generate the documentation page.

You can preview the **kouto swiss** website locally with the following command: `grunt preview`, which allows you to see the site on [localhost:5555](http://localhost:5555).

## Contribute to the documentation website

The process is much simpler here: the documentation website's files are stored in the `_docs` folder.

Before modifying anything, launch the following command: `grunt work`, which will compile all the files and launch a web server for previewing the site on [localhost:5555](http://localhost:5555). This preview has a *livereload* feature included if you want to use it.

Simply modify/correct the files and the task will recompile your changes.

* * *

Thanks in advance for helping me making **kouto swiss** a great and useful tool for all the stylus users! :)
