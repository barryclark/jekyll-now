/* *******************************************************
/  Libraries
*/

#include <Wire.h> // Needed for I2C connection
#include <LiquidCrystal_I2C.h> // Needed for operating the LCD screen
#include <Servo.h> // Needed for controlling the ESC
/* *******************************************************
*/

/* *******************************************************
/  LCD
*/
// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27,16,2);
/* *******************************************************
*/

/* *******************************************************
/  Centrifuge Settings
*/
static int Settings[2] = { 0, 0}; // Power and time
/* *******************************************************
*/

/* *******************************************************
/  Machine User Interface
*/
boolean buttonState = 0; // Start button
int ledstate = false; // Blinking indicator LED
// set pin numbers:
const int buttonPin = 5;     // the number of the pushbutton pin
const int ledPin =  13;      // the number of Arduino's onboard LED pin
/* *******************************************************
*/

/* *******************************************************
/  Set the initial state of the machine
/  In this code we will switch operation modes, from programming time, to programming power, to spinning, to slowing down
*/
const char* state = "StateTimeProgramming";
/* *******************************************************
*/

/* *******************************************************
/  Variables needed for keeping track of time
*/
uint32_t lastTick = 0; // Global Clock
uint32_t stateStartTime = 0; // Start state Clock
uint32_t StateDt; // Time within a state
uint32_t PhaseStartTime = 0;
int LCDTime = 0;

/* Useful Constants */
#define SECS_PER_MIN  (60UL)
#define SECS_PER_HOUR (3600UL)
#define SECS_PER_DAY  (SECS_PER_HOUR * 24L)
 
/* Useful Macros for getting elapsed time */
#define numberOfSeconds(_time_) (_time_ % SECS_PER_MIN)  
#define numberOfMinutes(_time_) ((_time_ / SECS_PER_MIN) % SECS_PER_MIN)
#define numberOfHours(_time_) (( _time_% SECS_PER_DAY) / SECS_PER_HOUR)
#define elapsedDays(_time_) ( _time_ / SECS_PER_DAY)  
/* *******************************************************
*/

/* *******************************************************
/  Motor control
*/
Servo myservo;  // create servo object to control a servo
/* *******************************************************
*/

/* *******************************************************
/  Rotary Encoder
*/
//these pins can not be changed 2/3 are special interrupt pins
int encoderPin1 = 2;
int encoderPin2 = 3;

volatile int lastEncoded = 0;
volatile long encoderValue = 0;

long lastencoderValue = 0;

int lastMSB = 0;
int lastLSB = 0;
/* *******************************************************
*/

/* *******************************************************
/  RPM calculations
*/
int CurrentRPM = 0; // Current average RPM
int PrevRPM = 0; // Previous RPM
double RPMtime = 0; // RPM time
double RPMnow = 0; // Measured RPM
double Gforce = 0; // Calculated GForce
int InfraPin = 6; // Infrared sensor pin
/* *******************************************************
*/

/* *******************************************************
/  Setup, this code is only executed once
*/
void setup() {
  // Update clock
  lastTick = millis();

  // Initialize I2C
  Wire.begin();

  // Open serial connection and print a message
  Serial.begin(9600);
  Serial.println(F("BioHack Academy Centrifuge"));

  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);
  
  // rotary encoder
  pinMode(encoderPin1, INPUT); 
  pinMode(encoderPin2, INPUT);
  digitalWrite(encoderPin1, HIGH); //turn pullup resistor on
  digitalWrite(encoderPin2, HIGH); //turn pullup resistor on
  //call updateEncoder() when any high/low changed seen
  //on interrupt 0 (pin 2), or interrupt 1 (pin 3) 
  attachInterrupt(0, updateEncoder, CHANGE); 
  attachInterrupt(1, updateEncoder, CHANGE);  
  
  // attaches the ESC on pin 9 to the myservo object 
  myservo.attach(9);  
  // activate ESC 
  myservo.write(21);
  
  // Initialize the LCD and print a message
  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print(F("BioHack Academy"));
  lcd.setCursor(0,1);
  lcd.print(F("Centrifuge"));
  delay(1000);
  lcd.clear();
}
/* *******************************************************
*/

/* *******************************************************
/  Loop, this code is constantly repeated
*/
void loop() {
  // Update clock
  uint32_t time = millis(); // current time since start of sketch
  uint16_t dt = time-lastTick; // difference between current and previous time
  lastTick = time;

  // Button updates
  buttonState = digitalRead(buttonPin);
  
  // Blink the LED, indicating that the Arduino is working
  if (ledstate == false) {
    // turn LED on:
    digitalWrite(ledPin, HIGH);
    ledstate = true;
  }
  else {
    // turn LED off:
    digitalWrite(ledPin, LOW);
    ledstate = false;
  }
  
  // Do machine logic
  machineUpdate(dt);
  
  // Reset button state
  buttonState = 0;

  // Wait 200 microsconds
  delay(200);
}
/* *******************************************************
*/

/* *******************************************************
/  machineUpdate, this function checks in which state the device is and executes the code that belongs to that state
*/
void machineUpdate(uint16_t dt) {

  // StateTimeProgramming is the first state in which the user can set the time that the centrifuge has to spin
  if(state == "StateTimeProgramming") {
    // Arm the Electronic Speed Controller
    myservo.write(21);
    
    // Sanitize the values of the Rotary encoder, no less than 0, no more than 51
    if(encoderValue < 0) encoderValue = 0;
    if(encoderValue > 51) encoderValue = 51;
  
    // Convert encoder value to seconds  
    if(encoderValue < 30) Settings[1] = map(encoderValue, 0, 30, 0, 30);
    else if(encoderValue < 36) Settings[1] = map(encoderValue, 30, 36, 30, 60);
    else if(encoderValue < 40) Settings[1] = map(encoderValue, 36, 40, 60, 120);
    else if(encoderValue < 48) Settings[1] = map(encoderValue, 40, 48, 120, 600);
    else if(encoderValue < 52) Settings[1] = map(encoderValue, 48, 52, 600, 3000);
    else Settings[1] = 0; 

    // Display time setting on the LCD
    lcd.setCursor(0,0);
    lcd.print(F("Time"));
    lcd.setCursor(6,0);
    lcd.print(time(Settings[1]));    

    // In case the button is pressed, continue to next state
    if(buttonState > 0) {
      stateChange("StateRPMProgramming");
      encoderValue = 0;
    }  
  } 
 
  // StateRPMProgramming is similar to StateTimeProgramming, but now the user can set the power of the centrifuge
  if(state == "StateRPMProgramming") {
    // Keep the ESC armed
    myservo.write(21);
    
    // Sanity check
    if(encoderValue < 0) encoderValue = 0;
    if(encoderValue > 100) encoderValue = 100;
  
    // Convert percentage into stepper signal, minimal 60, maximal 255  
    Settings[0] = map((int) encoderValue, 1, 100, 60, 255);

    // Display the settings on the LCD
    lcd.setCursor(0,1);
    lcd.print(F("Speed"));
    lcd.setCursor(6,1);
    if(encoderValue == 0) lcd.print(F(" "));
    if(encoderValue < 10) lcd.print(F(" "));
    if(encoderValue < 100) lcd.print(F(" "));
    lcd.print(encoderValue);
    lcd.print(F("%"));

    // Continue to next state if the button is pressed
    if(buttonState > 0) {
      stateChange("StateSpin");
      encoderValue = 0;
    }     
  } 
 
  // StateSpin is the state in which the motor is actually running
  if(state == "StateSpin") {
    // Spin the rotor at the power that was set by the user
    myservo.write(Settings[0]);
    
    // Calculate how long this state is already lasting
    StateDt = millis() - PhaseStartTime;
    
    // Measure the speed of the rotor
    measureSpeed();
    
    // Update the LCD every second
    LCDTime += dt;
    if(LCDTime > 1000) {
      LCDTime = 0;
      
      // Print to LCD
      lcd.clear();
      lcd.setCursor(0,0);
      lcd.print(F("Force "));
      lcd.print(Gforce);
      lcd.print(F("g"));
      lcd.setCursor(0,1);
      lcd.print(time(Settings[1] - StateDt/1000));
      lcd.print(F(" "));
      lcd.print(CurrentRPM);
    }
        
    // Change state after time runs out
    if(StateDt > Settings[1]*1000) {
      stateChange("StateStop");
    }
    
    // Change state if the user presses the button
    if(buttonState > 0) {
      stateChange("StateStop");
    }     
  }

  // StateStop stops the rotor
  if(state == "StateStop") {
    // Stop the rotor and return to programming mode
    myservo.write(0);
    
    // Print a message to the LCD
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print(F("Done! "));
    delay(1000);
    lcd.clear();
    
    // Go back to the first state
    stateChange("StateTimeProgramming");
  }
}
/* *******************************************************
*/

/* *******************************************************
/  stateChange switches the machine logic from one state to another
*/
static void stateChange(const char* newstate) {
  // set new state
  state = newstate;
  
  // reset starting time of state
  PhaseStartTime = millis();  
  
  // reset button
  buttonState = 0;
}
/* *******************************************************
*/

/* *******************************************************
/  time converts seconds to minutes:seconds format
*/
String time(int val){  
  // calculate number of days, hours, minutes and seconds
  int days = elapsedDays(val);
  int hours = numberOfHours(val);
  int minutes = numberOfMinutes(val);
  int seconds = numberOfSeconds(val);
            
  String returnval = "";
            
  // digital clock display of current time 
  returnval = printDigits(minutes) + ":" + printDigits(seconds) + "   ";
  
  // return value      
  return returnval;
}
/* *******************************************************
*/

/* *******************************************************
/  printDigits adds an extra 0 if the integer is below 10
*/
String printDigits(int digits){
  // utility function for digital clock display: prints colon and leading 0
  String returnval = "";
  if(digits < 10)
    returnval += "0";
  returnval += digits; 
         
  return returnval; 
}
/* *******************************************************
*/

/* *******************************************************
/  updateEncoder is the function that reacts to the rotary encoder interrupts
*/
void updateEncoder(){
  int MSB = digitalRead(encoderPin1); //MSB = most significant bit
  int LSB = digitalRead(encoderPin2); //LSB = least significant bit

  int encoded = (MSB << 1) |LSB; //converting the 2 pin value to single number
  int sum  = (lastEncoded << 2) | encoded; //adding it to the previous encoded value

  if(sum == 0b1101 || sum == 0b0100 || sum == 0b0010 || sum == 0b1011) encoderValue --;
  if(sum == 0b1110 || sum == 0b0111 || sum == 0b0001 || sum == 0b1000) encoderValue ++;

  lastEncoded = encoded; //store this value for next time
}
/* *******************************************************
*/

/* *******************************************************
/  measureSpeed converts the pulses from the infrared sensor into RPM and Gforce
*/
static void measureSpeed() 
{ 
  // Derived from code of Karlin Yeh
  PrevRPM = RPMnow;
  RPMtime = pulseIn(InfraPin,HIGH);
  RPMtime+= pulseIn(InfraPin,LOW);
  RPMtime/= 1000000;
  RPMnow = 1 / RPMtime;

  // Calculation depends on rotor diameter, assuming 2 centimeters
  Gforce = 2 * RPMnow * 3.1415;
  Gforce = pow(Gforce,2);
  Gforce *= 0.065;
  Gforce /= 9.8;

  // Per minute instead of seconds
  RPMnow *= 60;

  CurrentRPM = (CurrentRPM + RPMnow + PrevRPM) / 3;
}
