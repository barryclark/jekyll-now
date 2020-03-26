---
layout: post
title:  Compiling OpenCV 4.2+ with Java Support
---


[OpenCV](https://opencv.org), a powerfull Computer Vision open source library, is written in C++ ; it can be used from Java using its JNI bindings. 

OpenCV offers 'official' distributions for [Windows, iOS and Android](https://opencv.org/releases/) but none for Linux and macOS. In addition, it's not even clear if the Windows distribution includes the Java bindings.

The following 'how-to' explains how to build the latest version of OpenCV (4.2+) with its Java bindings on Linux and macOS. The [latest Java version](https://jdk.java.net), 14 at the time of writing, is used as all the OpenCV Java material seems to be stuck on Java 8 (and OpenCV 3.xx!). The approach should be pretty similar for producing Windows builds, just make sure to adapt the various paths (JDK, compilers, etc.) accordingly.

Building OpenCV and the Java binding process is straight forward but time consuming. The bulk of the time is spent in building natively OpenCV for the target platform, then the Java bindings will be built for that same platform. To do this, we need a native C++ toolchain (`g++`, `ld`, `make`, …) and a Java toolchain (JDK and a recent version Apache Ant). 

### Install the native C++ toolchain

Unless you are using a stripped down Linux distribution, most of the native tools are probably already available (ex. `ld`, `nm`, `objcopy`, `objdump`, `make`, etc.). On a fresh Ubuntu, I only had to install `g++` and `cmake`. Optionally and given that there are over 300 options to build OpenCV, using a configuration front-end such as `ccmake` or `cmake-gui` can be helpful. Note that Python is also required for the build phase.

```
sudo apt install g++
sudo apt install cmake
sudo apt install cmake-curses-gui
``` 
On macOS, you will need to have XCode installed.

### Install the Java toolchain

Install the JDK …

```
wget https://download.java.net/java/GA/jdk14/076bab302c7b4508975440c56f6cc26a/36/GPL/openjdk-14_linux-x64_bin.tar.gz
gzip -d openjdk-14_linux-x64_bin.tar.gz
sudo mkdir /usr/lib/jvm
sudo cp -r jdk-14/ /usr/lib/jvm/
sudo update-alternatives --install "/usr/bin/java" "java" "/usr/lib/jvm/jdk-14/bin/java" 1
sudo update-alternatives --install "/usr/bin/javac" "javac" "/usr/lib/jvm/jdk-14/bin/javac" 1
```
… and Apache Ant.

```
sudo snap install ant --classic
```

### Configure the build

```
mkdir workspace;cd workspace
git clone https://github.com/opencv/opencv.git
mkdir build
```

Create the build files using `ccmake` and pointing it to the OpenCV codebase directory and to the newly created build directory.

```
ccmake -S opencv/ -B build/
```

Alternatively, you can use `cmake-gui` which offers a GUI. And simillarly, you should specify the OpenCV codebase location and the directory where it should be build.

Both `ccmake` and `cmake-gui` works the same way. You first need to hit "C" (configure) to scan your envorinoment, this will scan your environment and configure related entries (ex. compilers location, JDK location, supported hardware extensions, …). Then and if required, you can manually configure some entries, just make sure to press "T" to toggle the advanced mode. Once done, you should press "G" to generate the Makfile.

Most of settings should be fine by default. The following entries should be configured for Java support.

* `JAVA_AWT_INCLUDE_PATH`

↪ Linux `/usr/lib/jvm/jdk-14/include/`

↪ macOS `/Library/Java/JavaVirtualMachines/jdk-14.jdk/Contents/Home/include/`

* `JAVA_AWT_LIBRARY`

↪ Linux `/usr/lib/jvm/jdk-14/lib/libjawt.so`

↪ macOS `/Library/Java/JavaVirtualMachines/jdk-14.jdk/Contents/Home/lib/libawt.dylib`

* `JAVA_INCLUDE_PATH`

↪ Linux `/usr/lib/jvm/jdk-14/include/`

↪ macOS `/Library/Java/JavaVirtualMachines/jdk-14.jdk/Contents/Home/include/`

* `JAVA_INCLUDE_PATH2`

↪ Linux `/usr/lib/jvm/jdk-14/include/linux/`

↪ macOS `/Library/Java/JavaVirtualMachines/jdk-14.jdk/Contents/Home/include/darwin/`

* `JAVA_JVM_LIBRARY`

↪ Linux `/usr/lib/jvm/jdk-14/lib/server/libjvm.so`

↪ macOS `/Library/Java/JavaVirtualMachines/jdk-14.jdk/Contents/Home/lib/server/libjvm.dylib`

also make sure that `BUILD_SHARED_LIBS` is set to `ON`. 

💡 Given that building OpenCV takes time, anywhere between 15 minutes and +60 minutes depending on your configuration, the selected OpenCV modules, …, it's a good idea to first do a minimal build to check that eveything is OK.

The following OpenCV modules are the bare minimum to use OpenCV and the Java bindings.

* `BUILD_opencv_core`

* `BUILD_opencv_imgcodecs`

* `BUILD_opencv_imgproc`

* `BUILD_opencv_java_bindings_gen`

You can unselect all others `BUILD_opencv_*` entries and selectevely re-enable them later if you need those features. And realistically, you will need additional modules to unleash the power of OpenCV.

Once you are done, just press "G" to generate the Makefile.

### Build OpenCV

```cmake --build build/` or `make --directory=build/``` 


### Tests

To use OpenCV from Java, you need the `build/bin/opencv-430.jar` jar and the native libs located in `build/lib`.
 
The following [Test](https://gist.github.com/delabassee/1ba380e1f32d20f2c518b1e6c6b080eb) class converts a picture from the default BGR colorspace to gray.

```
javac -cp build/bin/opencv-430.jar Test.java
java -Djava.library.path=build/lib/ -cp build/bin/opencv-430.jar Test
```
 
```
import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

public class Test {
    public static void main(String[] args) {

        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);

        String info = "Java " + System.getProperty("java.version") + " "
                + Core.NATIVE_LIBRARY_NAME + Core.VERSION_STATUS;
        System.out.println(info);

        var srcImage = Imgcodecs.imread("duke.png");
        Imgproc.cvtColor(srcImage, srcImage, Imgproc.COLOR_BGR2GRAY);
        Imgcodecs.imwrite("grey_duke.png", srcImage);

        var width = srcImage.cols();
        var height = srcImage.rows();
        System.out.println("Image size : " + width + " X " + height + " pixels.");

    }
}
```
