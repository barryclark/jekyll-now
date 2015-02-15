#include <ByteBuffer.h>

/*
  Silly program that emulates buffered processing
  using a circular bytebuffer
 */

ByteBuffer buffer;

void setup()
{
  // Initialize the buffer with a capacity for 256 bytes
  buffer.init(256);

  // Init serial just to debug
  Serial.begin(9600);
}

int cnt = 0;
void loop() {
  cnt++;

  // Every 100th update	
  if( cnt%100 == 0 ){
    buffer.clear();
    buffer.put(200);					// Put one byte at end
    buffer.putInt(2000);				// Put one int at end
    buffer.putLong(20000);				// Put one long at end
    buffer.putFloatInFront(200000);	// Put one float at beginning
  }

  // Every 100th update	(20 updates offset)
  if( (cnt+20)%100 == 0 ){
    Serial.println("Received following bytes");
      while( buffer.getSize() > 0 )
        Serial.println(buffer.get(), DEC);
    Serial.println("");
  }
}

