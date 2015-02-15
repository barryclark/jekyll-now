/*
Derived from: github.com/PieterVanBoheemen/RWXBioFuge
! Note:
Tested third party libraries are available through the RWXBioFuge repository. Please go to the original repositories to find the latest versions whenever needed.
The code is a bit heavy on libraries, because both the ESC and two Rotary encoders need interrupts
*/

#include <Wire.h>
#include <SPI.h>
#include "avr/pgmspace.h"
#include "Centrifuge.h"
#include <Servo.h> // Electronic Speed Controller
#include <ByteBuffer.h> // Rotary encoder
#include <ooPinChangeInt.h> // Rotary encoder
#include <AdaEncoder.h> // Rotary encoder

/* *******************************************************
/  Rotary Encoder
*/
#define ENCA_a 8
#define ENCA_b 9
#define ENCB_a A0
#define ENCB_b A1
AdaEncoder encoderA = AdaEncoder('a', ENCA_a, ENCA_b);
//AdaEncoder encoderB = AdaEncoder('b', ENCB_a, ENCB_b);
int8_t clicks=0;
char id=0;
int time_counter = 0;
int rpm_counter = 0;
/* ******************************************************* */

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
boolean Start = false; // Start button
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
int InfraPin = 2; // Infrared sensor pin
/* *******************************************************
*/

/* *******************************************************
/  Set the initial state of the machine
*/
const char* state = "StateProgramming";
/* *******************************************************
*/

/* *******************************************************
/  Define Electronic Speed Control
*/
Servo esc;
/* *******************************************************
*/

/* *******************************************************
/  Panic switch for emergency break
*/
boolean breakopp = false;
/* *******************************************************
*/

void setup() {
      	// Update clock
	lastTick = millis();

	// Initialize I2C
	Wire.begin();

	// Open serial connection
	Serial.begin(9600);
        Serial.println(F("RWXBioFuge Started"));

	// Initialize the LCD
	lcd.init();
	lcd.backlight();
	lcd.clear();
	lcd.setCursor(0,0);
	lcd.print(F("RWXBioFuge"));
        delay(1000);
        lcd.clear();

	// Initialize buttons
	pinMode(3, INPUT); // Start button
        
        // Initialize ESC control
        esc.attach(7);

}

void loop() {
	// Update clock
	uint32_t time = millis();
	uint16_t dt = time-lastTick;
	lastTick = time;   

        // Rotary encoders
        AdaEncoder *thisEncoder=NULL;
        thisEncoder=AdaEncoder::genie();
        if (thisEncoder != NULL) {
          clicks=thisEncoder->query();
          if (clicks > 0) {
            //Serial.println(" CW");
            if(thisEncoder->getID() == 'a') time_counter -= 1;
          }
          if (clicks < 0) {
            // Serial.println(" CCW");
            if(thisEncoder->getID() == 'a') time_counter += 1;   
          }
          // Sanity checks
          if(time_counter < 0) time_counter = 0;
        }
                    
	// Button updates
	if(digitalRead(3) == HIGH) {
		Start = true;
	}

	// Machine logic
	machineUpdate(dt);

	// Button updates
	if(digitalRead(3) == LOW) {
		Start = false;
	}
}

void machineUpdate(uint16_t dt) {

	// fixed state machine logic

		if(state == "StateProgramming") {
                        // Arm ESC
                        esc.write(21);
  
			// Machine is now responsive to all interactions

                        // TIME
                        //int timec = (int) time_counter;
                        if(time_counter < 30) Settings[1] = map(time_counter, 0, 30, 0, 30);
                        else if(time_counter < 36) Settings[1] = map(time_counter, 30, 36, 30, 60);
                        else if(time_counter < 40) Settings[1] = map(time_counter, 36, 40, 60, 120);
                        else if(time_counter < 48) Settings[1] = map(time_counter, 40, 48, 120, 600);
                        else if(time_counter < 52) Settings[1] = map(time_counter, 48, 52, 600, 3000);
                        else if(time_counter > 52) Settings[1] = -2;
                        else Settings[1] = 0; 

                        lcd.setCursor(0,0);
                        lcd.print(F("Time"));
			lcd.setCursor(6,0);
                        lcd.print(time(Settings[1]));
  
			// RPM
                        Settings[0] = map((int) rpm_counter, 0, 100, 0, 100);
                        lcd.setCursor(0,1);
                        lcd.print(F("Speed"));
			lcd.setCursor(6,1);
                        if(Settings[0] < 10) lcd.print(F(" "));
                        if(Settings[0] < 100) lcd.print(F(" "));
			lcd.print(Settings[0]);
                        lcd.print(F("%"));

			// If user presses Start button
			if(Start)
			{
				stateChange("StateLock");
			}

		}

  	if(state == "StateLock") {
                        lcd.clear();
	
                                // Remap speed setting
                                Settings[0] = map(Settings[0],0,100,30,165);
                                
				// Continue to next state
				stateChange("StateRampup");

		}
		
		if(state == "StateRampup") {
			// Start spinning the rotor

                        // update LCD
                        printInfo("Speeding up","");

			// Send step by step increased pulses to ESC
                        for(int i=30;i<Settings[0];i+=10) {
                                esc.write(i);

                                // wait a little for rotor to respond
                                delay(500); 
                                

                                esc.write(Settings[0]);
                                }

			// When RPM reaches target
			stateChange("StateSpinSteady");
		}

		if(state == "StateSpinSteady") {
			// Maintain constant speed
	                measureSpeed(dt);
			printStatus(dt);
	
			// Send pulse to ESC
                        // esc.write(Settings[0]);

			// Time in current state
			StateDt = millis() - PhaseStartTime;

				// Spin down after time runs out
				if(StateDt > Settings[1]*1000) 
				{
					stateChange("StateRampdown");
				}
			
		}

		if(state == "StateRampdown") {
			// Slowly reduce rotor speed

                        // update LCD
                        printInfo("Slowing down","");

			// Send step by step decreasing pulses to ESC
                        for(int i=Settings[0];i>21;i=i-10) {
                                esc.write(i);

                                // wait a little for rotor to slow down
                                delay(300);
                                
                        }
                        
			// Send pulse to ESC
                        esc.write(0);

			// Continue when rotor stops
			stateChange("StateUnlock");
		}
	
		if(state == "StateUnlock") {
			// Unlock the system
			
			// Print finish
			printInfo("Unlocking","");
			delay(1000);
                        lcd.clear();
			
			// Return to programming mode
			stateChange("StateProgramming");
		}
	
}

static void measureSpeed(uint16_t dt) 
{ 
        // Derived from code of Karlin Yeh
	PrevRPM = RPMnow;
	RPMtime = pulseIn(InfraPin,HIGH);
	RPMtime+= pulseIn(InfraPin,LOW);
	RPMtime/= 1000000;
	RPMnow = 1 / RPMtime;

        // Calculation depends on rotor diameter
	Gforce = 2 * RPMnow * 3.1415;
	Gforce = pow(Gforce,2);
	Gforce *= 0.065;
	Gforce /= 9.8;

	RPMnow *= 60;

	CurrentRPM = (CurrentRPM + RPMnow + PrevRPM) / 3;
}

static void printStatus(uint16_t dt) 
{
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
}

static void printInfo(char* line1, char* line2) 
{
        // Print to LCD
	lcd.clear();
	lcd.setCursor(0,0);
	lcd.print(line1);
	lcd.setCursor(0,1);
	lcd.print(line2);
}

static void stateChange(const char* newstate) 
{
	state = newstate;
        //Serial.println(newstate);
        PhaseStartTime = millis();     
}

String time(int val){  
         if(val < 0) 
         {
              return "infinite";
         }
         else 
         {
             int days = elapsedDays(val);
             int hours = numberOfHours(val);
             int minutes = numberOfMinutes(val);
             int seconds = numberOfSeconds(val);
            
             String returnval = "";
            
             // digital clock display of current time 
             returnval = printDigits(minutes) + ":" + printDigits(seconds) + "   ";
             
             return returnval;
         }
    }

String printDigits(int digits){
          // utility function for digital clock display: prints colon and leading 0
          String returnval = "";
          if(digits < 10)
                    returnval += "0";
          returnval += digits; 
         
          return returnval; 
}