#ifndef UINT8TOSTRING
#define UINT8TOSTRING

void uint8ToString(char *outString, uint8_t number) {
  uint8_t hundreds=0;
  uint8_t tens=0;
  uint8_t ones=0;

  while (number >= 100 ) {
    hundreds++;
    number-=100;
  }
  while (number >= 10 ) {
    tens++;
    number-=10;
  }
  ones=number;
  ones+=48;
  if (hundreds > 0) { hundreds+=48; tens+=48; outString[0]=hundreds; outString[1]=tens; outString[2]=ones; outString[3]=0; }
  else if (tens > 0) {  tens+=48; outString[0]=tens; outString[1]=ones; outString[2]=0; }
  else { outString[0]=ones; outString[1]=0; };
}
#endif

