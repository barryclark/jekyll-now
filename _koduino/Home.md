This is a library of code for boards developed using the STM32 F3/F4 series of microcontrollers, chosen for their FPU instructions and friendly built-in bootloaders.
The microcontrollers currently targeted are:

* [F373xC](http://www.st.com/web/catalog/mmc/FM141/SC1169/SS1576/LN10) (full support)
* [F4xxRG](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577?sc=stm32f4) (planned)

The API functions here are in general optimized for speed and concurrency, at the expense of being slightly less fool-proof than Arduino (e.g. see [pin configuration](@ref Pins)).

## Getting Started

Code can be compiled and uploaded from either within the Arduino IDE, or it can be done standalone with Makefiles.

* [Installation](Installation.md)
* [Writing your first program](Guide.md)
* [Uploading your code](Bootloading.md)

## API Reference

### Core functionality

* [Pin configuration](@ref Pins) - pinMode, ...
* [Digital I/O](@ref Digital) - digitalWrite, digitalRead, ...
* [Reading analog signals](@ref Analog) - analogRead, ...
* [PWM output and input](@ref PWM) - analogWrite, pulseIn, ...
* [Keeping time](@ref Time) - millis, micros ...
* [Running code with precise timing](@ref Timebase) - attachTimerInterrupt, ...
* [External (or pin-change) interrupts](@ref EXTI) - attachInterrupt, ...
* [Printing, streaming and strings](@ref Streaming) - Serial1 <<, ...

### Communication

* [Serial / USART](@ref Serial) - FTDI (USB/Serial), XBee, ...
* [SPI](@ref SPI) - MPU6000, ...
* [Wire / I2C / SMBus](@ref Wire) - Nunchuck, MPU6050, ...

### Basic libraries

* [Storing data in non-volatile memory (EEPROM)](@ref EEPROM)
* [Reading a quadrature encoder](@ref Encoder)
* [Data logging: OpenLog driver](@ref OpenLog)

### Robotics-oriented libraries

* [Basic and advanced Math (+Eigen)](@ref Math)
* [Brushless commutation (field-oriented control)](@ref Brushless)
* [IMU drivers and attitude estimation](@ref IMU)
* [Motor controller library with multi-motor coordination](@ref MotorController)