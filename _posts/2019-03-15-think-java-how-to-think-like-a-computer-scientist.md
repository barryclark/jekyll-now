---
layout: post
title: Think Java - How to Think Like a Computer Scientist
date: 2019-03-15
---
Textbook: http://greenteapress.com/wp/think-java/
## Chapter 1: The way of the program
Thinking like a computer scientist combines some of the best features of mathematics, engineering, and natural science.
* Like mathematicians, computer scientists use formal languages to denote ideas, specifically computations.
* Like engineers, they design things, assembling components into systems and evaluating trade-offs among alternatives.
* Like scientists, they observe the behavior of complex systems, form hypotheses, and test predictions.

The single most important skill for a computer scientist is problem solving. It involves the ability to formulate problems, think creatively about solutions, and express solutions clearly and accurately.

### 1.1 What is programming?
A program is a sequence of instructions that specifies how to perform a computation. The computation might be something mathematical, like solving a system of equations or finding the roots of a polynomial. It can also be a symbolic computation, like searching and replacing text in a document or (strangely enough) compiling a program.

The details look different in different languages, but a few basic instructions appear in just about every language.
* Input: Get data from the keyboard, a file, a sensor, or some other device.
* Output: Display data on the screen, or send data to a file or other device.
* Math: Perform basic mathematical operations like addition and division.
* Decisions: Check for certain conditions and execute the appropriate code.
* Repetition: Perform some action repeatedly, usually with some variation.

So you can think of programming as the process of breaking down a large, complex task into smaller and smaller subtasks. The process continues until the subtasks are simple enough to be performed with the basic instructions provided by the computer.

### 1.2 What is computer science?
Computer science is the science of algorithms, including their discovery and analysis.

An algorithm is a sequence of steps that specifies how to solve a problem.

Programming errors are called bugs, and the process of tracking them down and correcting them is called debugging.

### 1.3 Programming languages
Java is a high-level language.

Before they can run, programs in high-level languages have to be translated into a low-level language, also called “machine language”. This translation takes some time, which is a small disadvantage of high-level languages.

But high-level languages have two advantages:
* It is much easier to program in a high-level language. Programs take less time to write, they are shorter and easier to read, and they are more likely to be correct.
* High-level languages are portable, meaning they can run on different kinds of computers with few or no modifications. Low-level programs can only run on one kind of computer, and have to be rewritten to run on another.

Two kinds of programs translate high-level languages into low-level languages: interpreters and compilers.
* An interpreter processes the program a little at a time, alternately reading lines and performing computations.
* A compiler reads the entire program and translates it completely before the program starts running.

The high-level program is called the source code, and the translated program is called the object code or the executable.

Once a program is compiled, you can execute it repeatedly without further translation. As a result, compiled programs often
run faster than interpreted programs.

Java is both compiled and interpreted. Instead of translating programs directly into machine language, the Java compiler generates byte code. Similar to machine language, byte code is easy and fast to interpret. But it is also portable, so it is possible to compile a Java program on one machine, transfer the byte code to another machine, and run the byte code on the other machine. The interpreter that runs byte code is called a “Java Virtual Machine” (JVM).

### 1.4 The hello world program
 The hello world program in Java:
 ```
public class Hello {
  public static void main(String[] args) {
    // generate some simple output
    System.out.println("Hello, World!");
  }
}
 ```
Java programs are made up of class and method definitions, and methods are made up of statements. A statement is a line of code that performs a basic operation. this line is a print statement that displays a message on the screen:
```
System.out.println("Hello, World!");
```
Like most statements, the print statement ends with a semicolon (;). 

Java is “case-sensitive”, which means that uppercase and lowercase are not the same.

A method is a named sequence of statements. This program defines one method named main:
```
public static void main(String[] args)
```
The name and format of main is special: when the program runs, it starts at the first statement in main and ends when it finishes the last statement.

A class is a collection of methods. 


