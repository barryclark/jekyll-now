// Use this sketch to test the user interface, without actually activating the motor

#include <Wire.h>
#include <LiquidCrystal_I2C.h>

/* *******************************************************
/  LCD
*/
// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27,16,2);
/* *******************************************************
*/

/* *******************************************************
/  Global Machine Settings
*/
static int Settings[2] = { 0, 0}; // RPM goal, time
/* *******************************************************
*/

/* *******************************************************
/  Machine User Interface Buttons
*/
boolean buttonState = 0; // Start button
// set pin numbers:
const int buttonPin = 5;     // the number of the pushbutton pin
const int ledPin =  13;      // the number of the LED pin
/* *******************************************************
*/

/* *******************************************************
/  Set the initial state of the machine
*/
const char* state = "StateTimeProgramming";
/* *******************************************************
*/

/* *******************************************************
/  Time tracking variables
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

//these pins can not be changed 2/3 are special pins
int encoderPin1 = 2;
int encoderPin2 = 3;

volatile int lastEncoded = 0;
volatile long encoderValue = 0;

long lastencoderValue = 0;

int lastMSB = 0;
int lastLSB = 0;

int RPM = 0;
int Gforce = 0;
int CurrentRPM = 0;

void setup() {
  // Update clock
  lastTick = millis();

  // Initialize I2C
  Wire.begin();

  // Open serial connection
  Serial.begin(9600);
  Serial.println(F("BioHack Academy Centrifuge"));

  // Initialize the LCD
  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print(F("BioHack Academy"));
  lcd.setCursor(0,1);
  lcd.print(F("Centrifuge"));
  delay(1000);
  lcd.clear();

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
}

void loop() {
  // Update clock
  uint32_t time = millis();
  uint16_t dt = time-lastTick;
  lastTick = time;

  // Button updates
  buttonState = digitalRead(buttonPin);
  
  // check if the pushbutton is pressed.
  // if it is, the buttonState is HIGH:
  if (buttonState == HIGH) {
    // turn LED on:
    digitalWrite(ledPin, HIGH);
  }
  else {
    // turn LED off:
    digitalWrite(ledPin, LOW);
  }
  
  machineUpdate(dt);
  
  buttonState = 0;

  delay(100);
}

void machineUpdate(uint16_t dt) {

  if(state == "StateTimeProgramming") {
    if(encoderValue < 0) encoderValue = 0;
    if(encoderValue > 51) encoderValue = 51;
    Serial.println(encoderValue);
  
    // Convert encoder to time steps    
    if(encoderValue < 30) Settings[1] = map(encoderValue, 0, 30, 0, 30);
    else if(encoderValue < 36) Settings[1] = map(encoderValue, 30, 36, 30, 60);
    else if(encoderValue < 40) Settings[1] = map(encoderValue, 36, 40, 60, 120);
    else if(encoderValue < 48) Settings[1] = map(encoderValue, 40, 48, 120, 600);
    else if(encoderValue < 52) Settings[1] = map(encoderValue, 48, 52, 600, 3000);
    else Settings[1] = 0; 

    lcd.setCursor(0,0);
    lcd.print(F("Time"));
    lcd.setCursor(6,0);
    lcd.print(time(Settings[1]));    

    if(buttonState > 0) {
      stateChange("StateRPMProgramming");
      encoderValue = 0;
    }  
  } 
 
  if(state == "StateRPMProgramming") {

    // Sanity check
    if(encoderValue < 0) encoderValue = 0;
    if(encoderValue > 100) encoderValue = 100;
  
    // Convert percentage into stepper signal  
    Settings[0] = map((int) encoderValue, 0, 100, 21, 255);

    lcd.setCursor(0,1);
    lcd.print(F("Speed"));
    lcd.setCursor(6,1);
    if(encoderValue < 10) lcd.print(F(" "));
    if(encoderValue < 100) lcd.print(F(" "));
    lcd.print(encoderValue);
    lcd.print(F("%"));

    if(buttonState > 0) {
      stateChange("StateSpin");
      encoderValue = 0;
    }     
  } 
 
  if(state == "StateSpin") {
    // Spin the rotor
    
    // Time in current state
    StateDt = millis() - PhaseStartTime;
    
    // Update status every second
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
        
    // Spin down after time runs out
    if(StateDt > Settings[1]*1000) {
      stateChange("StateStop");
    }
  
    if(buttonState > 0) {
      stateChange("StateStop");
    }     
  }

  if(state == "StateStop") {
    // Stop the rotor and return to programming mode
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print(F("Done! "));
    delay(1000);
    lcd.clear();
    stateChange("StateTimeProgramming");
  }
}

static void stateChange(const char* newstate) {
  state = newstate;
  PhaseStartTime = millis();  
  buttonState = 0;   
  Serial.println(state);
}

String time(int val){  
  int days = elapsedDays(val);
  int hours = numberOfHours(val);
  int minutes = numberOfMinutes(val);
  int seconds = numberOfSeconds(val);
            
  String returnval = "";
            
  // digital clock display of current time 
  returnval = printDigits(minutes) + ":" + printDigits(seconds) + "   ";
             
  return returnval;
}

String printDigits(int digits){
  // utility function for digital clock display: prints colon and leading 0
  String returnval = "";
  if(digits < 10)
    returnval += "0";
  returnval += digits; 
         
  return returnval; 
}

void updateEncoder(){
  int MSB = digitalRead(encoderPin1); //MSB = most significant bit
  int LSB = digitalRead(encoderPin2); //LSB = least significant bit

  int encoded = (MSB << 1) |LSB; //converting the 2 pin value to single number
  int sum  = (lastEncoded << 2) | encoded; //adding it to the previous encoded value

  if(sum == 0b1101 || sum == 0b0100 || sum == 0b0010 || sum == 0b1011) encoderValue ++;
  if(sum == 0b1110 || sum == 0b0111 || sum == 0b0001 || sum == 0b1000) encoderValue --;

  lastEncoded = encoded; //store this value for next time
}
