/* *******************************************************
/  Machine User Interface
*/
// set pin numbers:
const int buttonPin = 5;     // the number of the pushbutton pin
const int ledPin =  13;      // the number of Arduino's onbaord LED pin

// variables will change:
int buttonState = 0;         // variable for reading the pushbutton status
/* *******************************************************
*/

/* *******************************************************
/  Setup, this code is only executed once
*/
void setup() {
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);
  
  // open serial connection to computer
  Serial.begin(9600);
}
/* *******************************************************
*/

/* *******************************************************
/  Loop, this code is constantly repeated
*/
void loop() {
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);
  // print the state to the computer
  Serial.println(buttonState);
  
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
  
  // Wait 200 milliseconds
  delay(200);
}
