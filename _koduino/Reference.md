#<cldoc:Docs::Reference>

IS THIS NEEDED?

# Structure

Basic language structure is C/C++ (identical to that in Arduino). Please refer [here](http://arduino.cc/en/Reference/HomePage).

# Wirish core (C)

### Variables

* [Constants](Constants) - `HIGH`, `LOW`, `INPUT`, `OUTPUT`, etc.
* [Data types](Types) - `int`, `float`, `PinName`, `TimerPinName` etc.

### Functions

* [Digital I/O](Digital) - `pinMode`, `digitalWrite`, `digitalRead`
* [Timers, PWM input and output](Timer) - `analogWrite`, `pulseIn`
* [Analog input](ADC) - `analogRead`
* [Time](Time) - `millis`, `micros`, `delay`, `delayMicroseconds`
* [Wiring math](Math) - `min`, `max`, `abs`, `constrain`, `map` (for floats as well!), etc.
* [Advanced math](Math) - ARM fast math functions, `DLPF`, `PD`, etc.
* [Bits and bytes](Bitwise) - `lowByte`, `highByte`, `bitRead`, `bitWrite`, `bitSet`, `bitClear`, `bit`
* [External interrupts](EXTI) - `attachInterrupt`, `detachInterrupt`, `interrupts`, `noInterrupts`
* [Timer interrupts](Timebase) - `attachTimerInterrupt`, `detachTimerInterrupt`, `timerInterrupts`, `noTimerInterrupts`

Note yet implemented:

* Advanced I/O - `tone`, `noTone`, `shiftIn`, `shiftOut`
* Random numbers - `randomSeed`, `random`

# Libraries (C++)

### [Arduino](Arduino)

* [Serial](Arduino/Serial) - `print`, `println`, `available`, `write`, `read`, etc.
* [Stream](Arduino/Stream)
* [Streaming](http://arduiniana.org/libraries/streaming/) - `<<` operator for concatenating

### [EEPROM](EEPROM)

Store data in non-volatile flash memory.

* `read`, `write`

### [Encoder](Encoder)

Read a quadrature encoder (A/B/I) at high speeds. *NOTE: This library might be moved into the `wirish` core as a pinMode option*

* `init`, `read`, `write`

### [IMU](IMU)

Drivers for IMU chips as well as filtering code.

* `IMU` base class, `MPU6000`
* `OrientationFilter` base class, `ComplementaryFilter`

### [MotorController](MotorController)

Control motors at a higher level, when the motor controller is configured in voltage or torque more. Also includes high-level multi-motor setups such as a sagittal pair with mean/difference control, and easy extensibility to other setups, such as a Delta configuration etc.

* `Motor` base class, `BlCon34`
* `AbstractMotor` base class, `SagittalPair`

### [OpenLog](OpenLog)

Driver for the [SparkFun OpenLog](https://github.com/sparkfun/OpenLog) for asynchronously dumping data to an SD card over Serial, usable either with the official SparkFun hardware or the version on the mainboard.

* `init`, `enable`, `write`

### [SPI](SPI)

* `setPins`, `setBitOrder`, `setDataMode`, `setClockDivider`
* `begin`, `end`
* `transfer`

### [Wire](Wire)

*NOTE: This API may change to be closer to the [Arduino Wire library](http://arduino.cc/en/Reference/Wire)*

* `setClockSpeed`
* `begin`
* `ready`
* `beginTransmission`, `endTransmission`, `write`
* `read`
