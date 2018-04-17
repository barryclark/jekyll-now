// 04/16/2018 09:22PM

#include<iostream>
#include<fstream>
#include<sstream>
#include<string>

using namespace std;

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
            return false;
        }
    }
    
    return true;
}

void increment(byte front[]) {
    return increment(front, 3);
}

string brute(string cipher) {
    string plain;
    
    byte rear[] = "x7qfkp3mbv9w"; // last 12 bytes
    byte front[] = "0000"; // first 4 bytes
    byte key[16];// = new byte[16]; // 12 + 4 = 16 bytes
    
    copy(rear, rear + 12, key + 4);

    do {
        copy(front, front + 4, key);        
        plain = aes_decode(cipher,key);
        
        cout << key << endl << plain << endl;
        
    } while(increment(front));
    
    return plain;
}

void decode_file(char* infile, char* outfile) {   
    fstream file1;
    fstream file2;
    
    file1.open(infile,ios::in);
    file2.open(outfile,ios::out);
    
    stringstream buffer;  
    buffer << file1.rdbuf();  
    string cipher(buffer.str());
    
    string plain = brute(cipher);
       
    file2 << plain;
    
    file1.close();
    file2.close();
    
    cout << "plain text stored in:" << outfile << endl;
}

int main(int argc,char * argv[]) {
    if(argc != 3) {
        cout << "usage: aesbrute infile outfile" << endl;
    } else {
        decode_file(argv[1], argv[2]);
    }
}
