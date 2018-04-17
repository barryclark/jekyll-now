// 04/17/2018 06:41PM

#include<iostream>
#include<fstream>
#include<sstream>
#include<string>

using namespace std;

#include <chrono>
using namespace std::chrono;

#include"cryptopp/cryptlib.h"
#include"cryptopp/hex.h"
#include"cryptopp/filters.h"
#include"cryptopp/aes.h"
#include"cryptopp/modes.h"

using namespace CryptoPP;

string aes_decode(string & cipher, byte key[]) {
    string plain;

    try {
        ECB_Mode<AES>::Decryption dec;
	dec.SetKey(key, AES::DEFAULT_KEYLENGTH);
	StringSource s(cipher, true, new StreamTransformationFilter(dec, new StringSink(plain)));  
    } catch(const CryptoPP::Exception& e) {
    
    }
    
    return plain;	
}

bool increment(byte front[], int pos) {
    front[pos]++;
    
    if(front[pos] == 58) { // one character passed 9
        front[pos] = 'a';
    } else if(front[pos] == 123) { // one character passed z
        front[pos] = '0';
        
        if(pos > 0) {
            increment(front, pos - 1);
        } else {
            return false;
        }
    }
    
    return true;
}

bool increment(byte front[]) {
    return increment(front, 3);
}

bool is_english(string plain) {
    const char *array = plain.c_str();
    
    for(int i = 0; i < plain.size(); i++) {
        char letter = array[i];
        
        if(letter < 32 || letter > 94) {
            return false;
        }
    }
    
    return true;
}

void brute(string cipher) {
    string plain;
    
    byte rear[] = "x7qfkp3mbv9w"; // last 12 bytes
    byte front[] = "0000"; // first 4 bytes
    byte key[16];// = new byte[16]; // 12 + 4 = 16 bytes
    
    memset(key, 0, 17);
    copy(rear, rear + 12, key + 4);

    auto start = high_resolution_clock::now();
    cout << "start: " << start << endl;
    
    do {
        copy(front, front + 4, key);        
        plain = aes_decode(cipher, key);
        
        if(is_english(plain)) {
            cout << key << endl << plain << endl;
            return plain;
        }
        
    } while(increment(front));
    
    auto finish = high_resolution_clock::now();
    duration<double> elapsed = finish - start;
    cout << "finish: " << finish << endl;
    cout << "elapsed: " << elapsed.count() << endl;
    
}

void decode_file(char* infile) {   
    fstream file1;
    
    file1.open(infile,ios::in);
    
    stringstream buffer;  
    buffer << file1.rdbuf();  
    string cipher(buffer.str());
    
    file1.close();
    
    brute(cipher);   
}

int main(int argc,char * argv[]) {
    if(argc != 2) {
        cout << "usage: aesbrute infile" << endl;
    } else {
        decode_file(argv[1]);
    }
}
