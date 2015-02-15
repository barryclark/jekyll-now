/*
  ByteBuffer.cpp - A circular buffer implementation for Arduino
  Created by Sigurdur Orn, July 19, 2010.
  siggi@mit.edu
  Updated by GreyGnome (aka Mike Schwager) Mon Apr  8 21:11:15 CDT 2013
  	Fixed putString() so it reenables inputs correctly. In the if (length == capacity) section,
	it was missing this line:
			SREG = oldSREG; // Restore register; reenables interrupts
  Updated by GreyGnome (aka Mike Schwager) Thu Feb 23 17:25:14 CST 2012
  	added the putString() method and the fillError variable.
	added the checkError() and resetError() methods.  The checkError() method resets the fillError variable
	to false as a side effect.
	added the ByteBuffer(unsigned int buf_size) constructor.
	added the init() method, and had the constructor call it automagically.
	Also made the capacity, position, length, and fillError variables volatile, for safe use by interrupts.
	Mon Dec  3 07:55:04 CST 2012
	Added the putHex() and putDec() methods.
 */
 
#include "ByteBuffer.h"

void ByteBuffer::init(){
	ByteBuffer::init(DEFAULTBUFSIZE);
}

void ByteBuffer::init(unsigned int buf_length){
	data = (byte*)malloc(sizeof(byte)*buf_length);
	capacity = buf_length;
	position = 0;
	length = 0;
	fillError=false;
}

// Arduino 1.0: free() doesn't free.  :-(  This is a no-op as of 11/2012.
void ByteBuffer::deAllocate(){
	free(data);
}

void ByteBuffer::clear(){
	position = 0;
	length = 0;
}

void ByteBuffer::resetError(){
	fillError=false;
}

boolean ByteBuffer::checkError(){
	/*
	if (fillError) {
		Serial.print("E: checkError: length ");
		Serial.println(length, DEC);
	}
	*/

	boolean result=fillError;
	fillError=false;
	return(result);
}

int ByteBuffer::getSize(){
	return length;
}

int ByteBuffer::getCapacity(){
	return capacity;
}

byte ByteBuffer::peek(unsigned int index){
	byte b = data[(position+index)%capacity];
	return b;
}

uint8_t ByteBuffer::put(byte in){
	if(length < capacity){
		// save data byte at end of buffer
		data[(position+length) % capacity] = in;
		// increment the length
		length++;
		return 1;
	}
	// return failure
	//Serial.print("E: put: ");
	//Serial.println(length, DEC);
	fillError=true;
	return 0;
}


uint8_t ByteBuffer::putString(const char *in) {
	return(putString((char *) in));
}

uint8_t ByteBuffer::putString(char *in){
	uint8_t count=0;
	char *inString;

	inString=in;
	uint8_t oldSREG = SREG; cli();
	while(length <= capacity){
		if (length == capacity) {
			fillError=true;
			SREG = oldSREG; // Restore register; reenables interrupts
			return count;
		}
		// save data byte at end of buffer
		data[(position+length) % capacity] = *inString;
		// increment the length
		length++;
		inString++;
		count++;
		if (*inString == 0) {
			if (count==0) fillError=true; // Serial.println("E: putString"); };
			SREG = oldSREG; // Restore register; reenables interrupts
			return count;
		}
	}
	SREG = oldSREG; // Restore register; reenables interrupts
	return count;
}

uint8_t ByteBuffer::putInFront(byte in){
	uint8_t oldSREG = SREG; cli();
	if(length < capacity){
			// save data byte at end of buffer
			if( position == 0 )
					position = capacity-1;
			else
					position = (position-1)%capacity;
			data[position] = in;
			// increment the length
			length++;
			SREG = oldSREG; // Restore register; reenables interrupts
			return 1;
	}
	// return failure
	//Serial.println("E: putInFront");
	fillError=true;
	SREG = oldSREG; // Restore register; reenables interrupts
	return 0;
}

// Returns 0 if length of data is 0.
byte ByteBuffer::get(){
	uint8_t oldSREG = SREG; cli();
	byte b = 0;

	if(length > 0){
		b = data[position];
		// move index down and decrement length
		position = (position+1)%capacity;
		length--;
	}
	SREG = oldSREG; // Restore register; reenables interrupts
	return b;
}

byte ByteBuffer::getFromBack(){
	byte b = 0;
	if(length > 0){
		uint8_t oldSREG = SREG; cli();
		b = data[(position+length-1)%capacity];
		length--;
		SREG = oldSREG; // Restore register; reenables interrupts
	}

	return b;
}

//
// Ints
//

void ByteBuffer::putIntInFront(int in){
    byte *pointer = (byte *)&in;
	putInFront(pointer[0]);	
	putInFront(pointer[1]);	
}

void ByteBuffer::putInt(int in){
    byte *pointer = (byte *)&in;
	put(pointer[1]);	
	put(pointer[0]);	
}


int ByteBuffer::getInt(){
	int ret;
    byte *pointer = (byte *)&ret;
	pointer[1] = get();
	pointer[0] = get();
	return ret;
}

int ByteBuffer::getIntFromBack(){
	int ret;
    byte *pointer = (byte *)&ret;
	pointer[0] = getFromBack();
	pointer[1] = getFromBack();
	return ret;
}

void ByteBuffer::putHex(uint8_t theByte) {
	put('0'); put('x');
    uint8_t hinybble=theByte>>4;
    uint8_t lonybble=theByte & 0x0F;
	uint8_t addend=0;
	if (hinybble >= 0x0a) addend=7;
	put(hinybble+48+addend);
	if (lonybble >= 0x0a) addend=7;
	else addend=0;
	put(lonybble+48+addend);
}

void ByteBuffer::putDec(uint8_t number) {
  uint8_t hundreds=0;
  uint8_t tens=0;
  uint8_t ones=0;
  uint8_t tmp=number;

  while (tmp >= 100 ) {
    hundreds++;
    tmp-=100;
  }
  while (tmp >= 10 ) {
    tens++;
    tmp-=10;
  }
  ones=tmp;
  hundreds+=48; tens+=48; ones+=48;
  if (number >= 100) { put(hundreds); }
  if (number >= 10) {  put(tens); }
  put(ones);
}

void ByteBuffer::putDec(int8_t number) {
	uint8_t absNumber=abs(number);
	if (number < 0) put('-');
	putDec(absNumber);
}

//
// Longs
//

void ByteBuffer::putLongInFront(long in){
    byte *pointer = (byte *)&in;
	putInFront(pointer[0]);	
	putInFront(pointer[1]);	
	putInFront(pointer[2]);	
	putInFront(pointer[3]);	
}

void ByteBuffer::putLong(long in){
    byte *pointer = (byte *)&in;
	put(pointer[3]);	
	put(pointer[2]);	
	put(pointer[1]);	
	put(pointer[0]);	
}


long ByteBuffer::getLong(){
	long ret;
    byte *pointer = (byte *)&ret;
	pointer[3] = get();
	pointer[2] = get();
	pointer[1] = get();
	pointer[0] = get();
	return ret;
}

long ByteBuffer::getLongFromBack(){
	long ret;
    byte *pointer = (byte *)&ret;
	pointer[0] = getFromBack();
	pointer[1] = getFromBack();
	pointer[2] = getFromBack();
	pointer[3] = getFromBack();
	return ret;
}


//
// Floats
//

void ByteBuffer::putFloatInFront(float in){
    byte *pointer = (byte *)&in;
	putInFront(pointer[0]);	
	putInFront(pointer[1]);	
	putInFront(pointer[2]);	
	putInFront(pointer[3]);	
}

void ByteBuffer::putFloat(float in){
    byte *pointer = (byte *)&in;
	put(pointer[3]);	
	put(pointer[2]);	
	put(pointer[1]);	
	put(pointer[0]);	
}

float ByteBuffer::getFloat(){
	float ret;
    byte *pointer = (byte *)&ret;
	pointer[3] = get();
	pointer[2] = get();
	pointer[1] = get();
	pointer[0] = get();
	return ret;
}

float ByteBuffer::getFloatFromBack(){
	float ret;
    byte *pointer = (byte *)&ret;
	pointer[0] = getFromBack();
	pointer[1] = getFromBack();
	pointer[2] = getFromBack();
	pointer[3] = getFromBack();
	return ret;
}


