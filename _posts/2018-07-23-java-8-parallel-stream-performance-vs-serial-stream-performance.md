---
layout: post
title: Java 8 Parallel Stream Performance vs Serial Stream Performance
tags: [java]
keywords: [java 8, java 8 parallel stream performance, parallel stream performance, parallel stream, stream]
image: /images/Java_logo.jpg
thumbnail: true
---

I'm almost done with grad school and graduating with my Master's in Computer Science - just one class left on Wednesday, and that's the final exam. Originally I had hoped to graduate last year, but things happened that delayed my graduation year (to be specific, I switched from a thesis to non-thesis curriculum). My final class is ***Distributed Computing***, which I had a project to do. This project included a report. For my project, I compared the performance of a Java 8 parallel stream to a "normal" non-parallel (i.e. serial) stream.

I copied the report into my blog format (it was originally a word document) and present it below. **TLDR;** parallel streams aren't always faster.

## Algorithm Description

The algorithm that has been implemented for this project is a linear search algorithm that may return zero, one, or multiple items. The condition for the returned items was designed such that every item in the list must be examined, thereby forcing the best case, worst case, and average case to take as close to the same time as possible (namely, O(n)).

This project’s linear search algorithm looks over a series of directories, subdirectories, and files on a local file system in order to find any and all files that are images and are less than 3,000,000 bytes in size. A file is considered an image file if its extension is one of **jpg**, **jpeg**, **gif**, or **png**. Since it cannot be known if an arbitrary file meets these conditions, and all such files must be returns, every file must be searched before the algorithm can be finished.

The entire local file system is not searched; only a subset of the file system is searched. For the purpose of this project, three different directories and their subdirectories were searched. These three directories are **C:\Users\hendr\CEG7370\7**, **C:\Users\hendr\CEG7370\214**, and **C:\Users\hendr\CEG7370\1424**. The number of the left-most directory is named after the number of files in that directory. Therefore, **C:\Users\hendr\CEG7370\7** has seven files, **C:\Users\hendr\CEG7370\214** has 214 files, and **C:\Users\hendr\CEG7370\1424** has 1,424 files.

## Implementation Design Description

The linear search algorithm was implemented using [Java’s stream API](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html). Java’s stream API was introduced with Java SE 8 in early 2014.

Java provides two types of streams: serial streams and parallel streams. Serial streams (which are just called streams) process data in a normal, sequential manner. Parallel streams process data concurrently, taking advantage of any multithreading capability of multicore computers. This project compares the difference in time between the two.

The file system is traversed by using the static **walk** method in the **[java.nio.file.Files](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html)** class. While the **Files** class was introduced in 2011 with Java SE 7, the static **walk** method was introduced with Java SE 8. This method returns a path stream (**Stream<Path>** in the code) which is autoclosable.

[Autoclosable](https://docs.oracle.com/javase/8/docs/api/java/lang/AutoCloseable.html), along with [try-with-resources](https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html), was introduced with Java SE 7. It allows any IO object to be closed without explicitly calling the object’s close method. Before Java SE 7 and try-with-resources, outputting the first line in a file might appear as follows:

```java
BufferedReader br = null;
try {
    br = new BufferedReader(new FileReader("path"));
    System.out.println(br.readLine());
} catch(IOException e ) { 
    e.printStackTrace();
} finally {
    try {
        if (br != null) {
            br.close();
        }
    } catch(IOException e ) { 
        e.printStackTrace();
    }
}
```

With try-with-resources implemented, the same functionality might appear as follows:

```java
try (BufferedReader br = new BufferedReader(new FileReader("path"));) {    
    System.out.println(br.readLine());
} catch(IOException e ) { 
    e.printStackTrace();
}
```

The search parameters are specified in the stream object’s **filter** method, which takes a method reference that returns a Boolean. Method references and lambdas were introduced in Java SE 8; method references follow the form **[object]::[method]** for instance methods and **[class]::[method]** for static methods. The **[object]** part of instance method references can either be a variable name or the keyword **this**.

The method passed into the steam’s **filter** method is also called **filter**. It uses basic Java String manipulation to determine if the file ends with a predetermined extension (as mentioned in the **Algorithm Description** section, this is one of **jpg**, **jpeg**, **gif**, or **png**). It then extracts file size using the **BasicFileAttributes** class and compares the size in bytes:

```java
private static final List<String> IMAGE_EXTENSIONS = 
                    Arrays.asList(".jpg",".jpeg",".gif",".png");

public boolean filter(Path path) {
    try {
        String pathString = path.toString();
        int dot = pathString.lastIndexOf(".");
    
        if(dot > 0) {
            String extension = pathString
                                .substring(dot)
                                .toLowerCase();

            if(IMAGE_EXTENSIONS.contains(extension)) {
                BasicFileAttributes attr = Files
                        .readAttributes(path, BasicFileAttributes.class);
        
                return attr.size() < 3_000_000; 
           }
        }
    } catch(IOException e) {
        e.printStackTrace();
    }

    return false;
}
```

The two different types of streams are implemented by creating an abstract class **ImageFileSearch** with one abstract method as well as the **filter** method described previously and then extending that abstract class into two separate concrete classes **ParallelImageFileSearch** and **SerialImageFileSearch**. The abstract method is called **search**, which takes a **String** argument representing a path, and returns a list of paths (**List<Path>** in the code). The implementation of this method is nearly identical in both concrete classes. The key difference is that in the implementation in the **ParallelImageFileSearch** class, the stream calls its **parallel** method before it calls its final method.

The final method called by the stream object in both **ParallelImageFileSearch** and **SerialImageFileSearch** is **collect**, which executes the stream and returns one of Java’s collection objects, such as a list or set. This method takes a **[Collector](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Collector.html)** object that specifies the type of collection. In the case of this project, **[Collector.toList()](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Collectors.html#toList--)** was used.

Below is the search method implemented by SerialImageFileSearch:

```java
public List<Path> search(String pathname) {
    try (Stream<Path> pathStream = Files.walk(Paths.get(pathname))) {
        return pathStream
                .filter(this::filter)
                .collect(Collectors.toList());
    } catch (IOException e) {
        e.printStackTrace();
    }

    return new ArrayList<>();
}
```

The following is the **search** method implemented by **ParallelImageFileSearch**, with the parallel method called on line 4:

```java
public List<Path> search(String pathname) {
    try (Stream<Path> pathStream = Files.walk(Paths.get(pathname))) {
        return pathStream
            .parallel()
            .filter(this::filter)
            .collect(Collectors.toList());
    } catch (IOException e) {
        e.printStackTrace();
    }

    return new ArrayList<>();
}
```

### Testing

Testing was done using Java’s standard **main** method. This **main** method was implemented in the **ImageSearch** class. Furthermore, the **ImageSearch** class contains a test instance method that measures the time in nanoseconds to execute the **search** method. Each individual call of the **test** instance method tests the search method for each of the test directories mentioned in the algorithm description section (namely, **C:\Users\hendr\CEG7370\7**, **C:\Users\hendr\CEG7370\214**, and **C:\Users\hendr\CEG7370\1424**). The test is then executed three times for each concrete class.

```java
public static final String[] PATHS = {"C:\\Users\\hendr\\CEG7370\\7",
                                    "C:\\Users\\hendr\\CEG7370\\214",
                                    "C:\\Users\\hendr\\CEG7370\\1424"};
    
public static void main(String[] args) throws IOException {
    ImageFileSearch[] tests = {new SerialImageFileSearch(),
                               new ParallelImageFileSearch()};

    System.out.println("directory\tclass\t# images\tnanoseconds;");

    for(ImageFileSearch test : tests) {
        for(int i = 0; i < 3; i++) {
            test.test();
        }
    }
}
    
public void test() {
    for(String path : PATHS) {
        long start = System.nanoTime();            
        long count = search(path).size();            
        long end = System.nanoTime();
        long time = end - start;
            
        System.out.printf("%s\t%s\t%d\t%,d%n",
            path, this.getClass().getSimpleName(), count, time);
    }
}
```
 
## Results

### 1st Iteration 

files searched | images found | SerialImageFileSearch | ParallelImageFileSearch
---: | ---: | ---: | ---:
7 | 6 | 35,826,276 ns | 8,272,604 ns
214 | 160 | 12,966,600 ns | 6,912,994 ns
1424 | 793 | 73,740,479 ns | 39,905,107 ns

### 2nd Iteration

files searched | images found | SerialImageFileSearch | ParallelImageFileSearch
---: | ---: | ---: | ---:
7 | 6 | 590,589 ns | 596,221 ns
214 | 160 | 7,060,705 ns | 6,414,308 ns
1424 | 793 | 57,785,349 ns | 36,082,019 ns

### 3rd Iteration

files searched | images found | SerialImageFileSearch | ParallelImageFileSearch
---: | ---: | ---: | ---:
7 | 6 | 498,174 ns | 558,078 ns
214 | 160 | 7,056,865 ns | 5,719,015 ns
1424 | 793 | 55,346,703 ns | 38,445,400 ns

![All Times](/images/ceg7370/all-times-graph.png)
*All Times*

![Final Time Only](/images/ceg7370/final-time-only-graph.png)
*Final Time Only*

files searched | Parallel time / serial time
---: | ---:
7 | 112%
214 | 81%
1424 | 69%

![Parallel Time / Serial Time](/images/ceg7370/ratio-graph.png)
*Parallel Time / Serial Time*
  
## Discussion

The first time **search** is run takes exceedingly longer than any other time search is ran. This is true regardless if **search** is called first via **SerialImageFileSearch** or **ParallelImageFileSearch**, or the amount of files to be searched. This is most likely due to caching and Java loading the class.

**ParallelImageFileSearch** performed better when searching 1,424 files and 214 files, whereas **SerialImageFileSearch** performed better when searching only 7 files. This is most likely due to any overhead incurred by parallel streams. It is notable that searching 1,424 files via a parallel stream took approximately 69% of the time it took to search via a serial stream, whereas searching 214 files via a parallel stream took approximately 81% of the time it took to search via a serial stream. This improved performance over a greater number of files indicates that any overhead with parallel streams does not increase as much when searching a greater number of files – it may even remain constant.
 
## Implementation Source Code

### ImageFileSearch.java

```java
package hendrix11.search.image;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.Arrays;
import java.util.List;

public abstract class ImageFileSearch {
    
    private static final List<String> IMAGE_EXTENSIONS = 
                                Arrays.asList(".jpg",".jpeg",".gif",".png");

    private static final String[] PATHS = {"C:\\Users\\hendr\\CEG7370\\7",
                                          "C:\\Users\\hendr\\CEG7370\\214",
                                          "C:\\Users\\hendr\\CEG7370\\1424"};

    public static void main(String[] args) throws IOException {
        ImageFileSearch[] tests = {new SerialImageFileSearch(),
                                   new ParallelImageFileSearch()};

        System.out.println("directory\tclass\t# images\tnanoseconds;");
    
        for(ImageFileSearch test : tests) {
            for(int i = 0; i < 3; i++) {
                test.test();
            }
        }
    }

    public void test() {
        for(String path : PATHS) {
            long start = System.nanoTime();            
            long count = search(path).size();            
            long end = System.nanoTime();
            long time = end - start;

            System.out.printf("%s\t%s\t%d\t%,d%n", 
                path, this.getClass().getSimpleName(), count, time);
        }
    }

    public abstract List<Path> search(String pathname);

    public boolean filter(Path path) {
        try {
            String pathString = path.toString();
            int dot = pathString.lastIndexOf(".");
    
            if(dot > 0) {
                String extension = pathString
                                .substring(dot)
                                .toLowerCase();

                if(IMAGE_EXTENSIONS.contains(extension)) {
                    BasicFileAttributes attr = Files
                        .readAttributes(path, BasicFileAttributes.class);                
                    return attr.size() < 3_000_000;
                }
            }
        } catch(IOException e) {
            e.printStackTrace();
        }

        return false;
    }
}
```
 
### ParallelImageFileSearch.java

```java
package hendrix11.search.image;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ParallelImageFileSearch extends ImageFileSearch {

    @Override
    public List<Path> search(String pathname) {
        try (Stream<Path> pathStream = Files.walk(Paths.get(pathname))) {
            return pathStream
                        .parallel()
                        .filter(this::filter)
                        .collect(Collectors.toList());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ArrayList<>();
    }
}
```
 
### SerialImageFileSearch.java

```java
package hendrix11.search.image;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class SerialImageFileSearch extends ImageFileSearch {

    @Override
    public List<Path> search(String pathname) {
        try (Stream<Path> pathStream = Files.walk(Paths.get(pathname))) {
            return pathStream
                    .filter(this::filter)
                    .collect(Collectors.toList());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ArrayList<>();
    }
}
```
 
## Implementation Documentation

### ImageFileSearch

The abstract superclass that implements the **filter** and **test** methods. The abstract method **search** must be implemented by all subclasses. Also contains the main entry point to the program.

```java
private static final List<String> IMAGE_EXTENSIONS
```

A list of image file extensions in lowercase and including the dot (.).

```java
private static final String[] PATHS
```

An array of the path to the directories to search for each test.

```java
public static void main(String[] args)
```

The main entry point to the program. Any input arguments are ignored and not used for this program. This method runs the tests as well.

```java
public void test()
```

Runs a single test for the current instance and outputs the path name, class name, the number of files found, and the amount of time taken in nanoseconds.

```java
public abstract List<Path> search(String pathname)
```

Abstract method that must be implemented by any concrete classes that extend this class. Takes a path name as a **String** and returns a list containing any and all paths that return true when passed to the filter method.

```java
public boolean filter(Path path)
```

Takes a **Path** object and returns **true** if its **String** representative ends with one of the extensions in **IMAGE_EXTENSIONS** and the associated file is less than three million bytes in size. It returns **false** otherwise.

### ParallelImageFileSearch

This class extends **ImageFileSearch** and overrides the abstract method **search** in a parallel manner.

### SerialImageFileSearch

This class extends **ImageFileSearch** and overrides the abstract method **search** in a serial manner.
