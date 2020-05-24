---
layout: post
title: cpp_project_starter
---

[cpp_project_starter](https://github.com/dayarthvader/cpp_project_starter)  

## Skeletal framework for new c++ projects.  
I wanted to make a ready framework for all of my future C++ projects. This repo should serve me and hopefully, others who'd like to build c++ libraries and applications well. I'm of the belief that the following 6 aspects of your future project must be well set right at the onset, even before you write your first line of C++ code. 

## Source tree structure
I attach a lot of significance to how I structure the source tree. Ideally the source structure should reflect software architecture. Advantages of well-desinged source tree structure being :  
* Intuitive code browsing -  
* Predictability -  
* Transparency -  
* Maintainability -    
* Automation tools integration -  

## Build system
Any software project of a reasonable size and complexity needs a set of tools to manage its lifecycle, through development to delivery. Managing a live codebase has its fair share of complexities. One of the biggest contributors to such complexity is the tendency of the codebase to change. In its purest form, software management is change management. There a number of tools in the market today to help us with this change. Change management becomes one of the invaluable aspects of the software project that as a designer one must choose to have and choose the right one. I found CMake to be the most widely accepted build system in the C++ fraternity (At least in my circle of C++ experts). CMake is still an evolving system aiming to meet many requirements of software management, ranging from build, dependency, test management, etc... I am sure there are many. Choose one for your needs but definitely make it a point to have one.

## style-guides
![Alt Text](https://media.giphy.com/media/10KIsXhwdoerHW/giphy.gif)  
C++ has a powerful set of features. Like many experts believe it is a swiss army knife. One must carefully deliberate on the subset of tools (read language features) that he/she chooses to use. Selecting the right set of features and using them in the right combination is a matter of expertise. Thankfully for us, many experts in the field have set guidelines for us to adapt and use their wisdom to our advantage. Sticking to a style guide brings you the following advantages.  
* Manage code complexity  
* Improve readability  
* Improve maintainability  
* Improve overall productivity - developer and reviewers can focus on the logic than styles  

## logging framework
I think we all agree that we need a good logging framework. Using language provided 'print' statements to print all the logs to stdout/stderr is hardly going to help. Loggers are developer/maintainer's best friends. You could make one for yourself if you see fit but there are a lot of the frameworks out there you can choose. Logging is going to impact the software's performance, maintainability, and debuggability. Some common characteristics look for in a logger could be:
* performance  
* formatting support  
* append-ability   
* support different log levels    
* log rotation support  

## Error handling model
It may come obvious to many that the error-handling model should be set-up right in the beginning. Unfortunately for me, there have been some projects in the past where we realize the need to standardize the error-handling model in our codebases. The model of error handling is a major part of our API design. So it does call for greater attention while designing our projects. Some of the common options being:    
* Setting a global error identifier (errno, perror).  
* Using well-defined enum class specifying the error types unambiguously.  
* C++ exceptions (World is divided over its use, I am biased for it), asserts.  
* statusor based error handling model, found in most of google's C++ projects. I am going to start using it in my personal projects.  
* And never to use bool to indicate success or failure.  
* [nodiscard] or not?.  
Your chosen style-guide may support or may conflict with the chosen the error-handling model, so tune them up accordingly.   

## test-framework
We all know TDD is great! I wish I could do more TDD than I actually do. I slip up most times and end up regretting not doing TDD while writing tests before feature release. A few C++ testing frameworks I've known in my circle of experts:
* Catch2  
* googletest  
* googlemock

You can fork this repo to get a headstart in your new C++ projects if you chose  
* Details.1. As your folder structure.
* CMake as your build support tool.  
* google-style-guide as your coding style-guide  
* googletest and googlemock as your unit test framework  
* spdlog as logging framework  
* **experimental** statusor as a error handling model -- This is new model I am trying.  
  
## Source tree
1. cpp source tree structure, designed based on my past projects. In principle, my projects are library-oriented.  
Do review the source tree once to suite your architecture before forking the repo. This is not one structure fits all solutions as the ease of usage varies widely based on the language of implementation, domain, architecture, etc ...This template may not be suitable for upcoming C++20 based projects as we'd like to move to modules then.

Below is the source tree structure that I am comfortable with.
```
cpp_project_starter/
├── cmake
│   └── sanitizer.cmake
├── _config.yml
├── cpp
│   ├── .clang-format
│   ├── CMakeLists.txt
│   ├── include
│   │   └── cpp_project_starter_lib
│   │       └── cpp_project_starter.h
│   ├── src
│   │   ├── cpp_project_starter_lib
│   │   │   └── cpp_project_starter.cpp
│   │   └── main
│   │       └── main.cpp
│   ├── test
│   │   └── cpp_project_starter_test.cpp
│   └── third_party
├── package
├── README.md
└── scripts
```
# Todo
- [ ] Compiler options?
- [ ] Update .clang-format as per google style guide
- [ ] Update Main CMakeLists.txt to provide the basic skeleton

Happy hacking :)
