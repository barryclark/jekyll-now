#<cldoc:Docs::Installation>

Installation

This library uses ST's Standard Peripheral Library, and GNU's embedded ARM cross-compilation tools. Due to both of these being cross-platform, everything should work on any platform that supports `make` (for the build system), and has FTDI driver support (for the hardware).

OS-specific installation directions:

## Mac/Linux

* Go to https://launchpad.net/gcc-arm-embedded and download the latest Mac/Linux binaries.
* Extract the tar file you downloaded, put it somewhere you want (for e.g. your home directory) and rename the extracted folder to `gcc-arm-none-eabi`.
* Add `export PATH=$PATH:$HOME/gcc-arm-none-eabi/bin` to your `~/.bash_profile`.
* Test that it worked by running `arm-none-eabi-gcc --version` from a new terminal window.
* Run `brew install dfu-util` (to use the MAEVARM M4 and some older boards).
* Install the latest [FTDI drivers](http://www.ftdichip.com/Drivers/VCP.htm).
* Run `pip install pyserial progressbar`.
* Clone this repository (ask for invite) using `hg clone` followed the URL in the top right of this webpage (use HTTPS if unsure).
* Add `export KODUINO_DIR=<koduino>/` to your `~/.bash_profile`.

## Linux

* Go to https://launchpad.net/gcc-arm-embedded and download the latest Linux binaries.
* Extract the tar file you downloaded, put it in your home directory, and rename the extracted folder to `gcc-arm-none-eabi`.
* Add `export PATH=$PATH:$HOME/gcc-arm-none-eabi/bin` to your `~/.bashrc`.
* Test that it worked by running `arm-none-eabi-gcc --version` from a new terminal window.
* Run `pip install pyserial progressbar`.
* Download [the repository](https://github.com/avikde/koduino), put it in your home directory, and remove `-master` from the name so the directory is just called `koduino`.
* Add `export KODUINO_DIR=$(HOME)/koduino/` to your `~/.bash_profile`.

## Windows (using Cygwin)

* Go to https://launchpad.net/gcc-arm-embedded and download the latest Windows binaries in zip format
* Extract the file you downloaded, put it somewhere you want (for e.g. your home directory) and rename the extracted folder to `gcc-arm-none-eabi`, so that the full path is `C:\Users\<your_user_name>\gcc-arm-none-eabi`.
* Download [Cygwin](https://www.cygwin.com/install.html). I am assuming you are using the `x86_64` version, and the root is `C:\cygwin64`.
* Select the packages (recommended but possibly not exhaustive) `binutils`, `gawk`, `gcc-g++`, `make`, `mercurial`, `nano`, `openssh`, `openssl`, `python`, `wget`.
* Right click `This PC` -> `Properties` -> `Advanced system settings` on the left -> `Environment Variables`.
* Under `User variables`, select `Path`, click `Edit`, and *append* `;C:\cygwin64\bin;C:\cygwin64\usr\bin;C:\Users\<your_user_name>\gcc-arm-none-eabi\bin` at the end
* Still in the `User variables` dialog, click `New` and enter the name-value pair `STM32DIR`, `/home/<your_user_name>/stm32-robot`, and click `OK`.
* Test that it worked by running `arm-none-eabi-gcc --version` from a new Cygwin window.
* Install the latest [FTDI drivers](http://www.ftdichip.com/Drivers/VCP.htm).
* Open the Cygwin terminal; and run `cd; wget https://pypi.python.org/packages/source/p/pyserial/pyserial-2.7.tar.gz; tar xzf pyserial-2.7.tar.gz; cd pyserial-2.7; python setup.py install; cd`
* Run `wget http://peak.telecommunity.com/dist/ez_setup.py; python ez_setup.py`.
* Run `cd; wget https://pypi.python.org/packages/source/p/progressbar-latest/progressbar-latest-2.4.tar.gz; tar xzf progressbar-latest-2.4.tar.gz; cd progressbar-latest-2.4; python setup.py install; cd`
* To test if this worked, run `python`, and try `import serial`, and `import progressbar`. Both should run without errors.
* Clone this repository (ask for invite) using `hg clone` followed the URL in the top right of this webpage (use HTTPS if unsure).

