// 2018-03-03 12:54PM

#include <iostream>
#include <iomanip>
#include <cstring>
#include <fstream>
#include <sstream>
#include <string>

using namespace std;

#include "cryptopp/cryptlib.h"
#include "cryptopp/hex.h"
#include "cryptopp/filters.h"
#include "cryptopp/des.h"
#include "cryptopp/aes.h"
#include "cryptopp/modes.h"

void printhex(unsigned char *text) {
    for(int i = 0; i < 8; i++) {
        cout << setbase(16) << (int)text[i] << " ";
    }
    
    cout << endl;
}

int main(int argc, char * argv[]) {
    unsigned char *input = new unsigned char[8];
    unsigned char *output = new unsigned char[8];
    unsigned char *key = new unsigned char[8];
    
    memset(input, 0, 8);
    memset(key, 0, 8);
    
    cout << "input: "; printhex(input);
    cout << "key: "; printkex(key);
    
    DESEncryption desEncryptor;
    desEncryptor.SetKey(key,8);
    desEncryptor.ProcessBlock(input,output);
    
    DESDecryption desDecryptor;
    desDecryptor.SetKey(key,8);
    desDecryptor.ProcessBlock(input,output);
    
    cout << "output: "; printkex(output);
}