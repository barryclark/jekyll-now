//Based on bildr article: http://bildr.org/2012/08/rotary-encoder-arduino/

/* *******************************************************
/  Rotary Encoder
*/
//these pins can not be changed 2/3 are special pins
int encoderPin1 = 2;
int encoderPin2 = 3;

volatile int lastEncoded = 0;
volatile long encoderValue = 0;

long lastencoderValue = 0;

int lastMSB = 0;
int lastLSB = 0;
/* *******************************************************
*/

int RPM = 0;

/* *******************************************************
*/

/* *******************************************************
/  Setup, this code is only executed once
*/
void setup() {
  // Open a serial connection to the computer
  Serial.begin (9600);

  // Set pinmodes
  pinMode(encoderPin1, INPUT); 
  pinMode(encoderPin2, INPUT);

  digitalWrite(encoderPin1, HIGH); //turn pullup resistor on
  digitalWrite(encoderPin2, HIGH); //turn pullup resistor on

  //call updateEncoder() when any high/low changed seen
  //on interrupt 0 (pin 2), or interrupt 1 (pin 3) 
  attachInterrupt(0, updateEncoder, CHANGE); 
  attachInterrupt(1, updateEncoder, CHANGE);

}
/* *******************************************************
*/

/* *******************************************************
/  Loop, this code is constantly repeated
*/
void loop(){ 

  // Sanity check the encoder value, no less than 0, no more than 100
  if(encoderValue < 0) encoderValue = 0;
  if(encoderValue > 100) encoderValue = 100;
  
  // Convert percentage into stepper signal 
  // 1 to 100 scale to 60 to 255 scale
  RPM = map((int) encoderValue, 1, 100, 60, 255);

  // Print the value to the computer
  Serial.println(encoderValue);
  
  // Wait 10 microsconds
  delay(10); //just here to slow down the output, and show it will work  even during a delay
}

/* *******************************************************
/  updateEncoder is the function that reacts to the rotary encoder interrupts
*/
void updateEncoder(){
  int MSB = digitalRead(encoderPin1); //MSB = most significant bit
  int LSB = digitalRead(encoderPin2); //LSB = least significant bit

  int encoded = (MSB << 1) |LSB; //converting the 2 pin value to single number
  int sum  = (lastEncoded << 2) | encoded; //adding it to the previous encoded value

  if(sum == 0b1101 || sum == 0b0100 || sum == 0b0010 || sum == 0b1011) encoderValue ++;
  if(sum == 0b1110 || sum == 0b0111 || sum == 0b0001 || sum == 0b1000) encoderValue --;

  lastEncoded = encoded; //store this value for next time
}
/* *******************************************************
*/
