// 04/16/2018 08:37PM

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

void brute(char* infile[], char* outfile[]) {
    byte rear[] = "x7qfkp3mbv9w"; // last 12 bytes
    byte front[] = "0000"; // first 4 bytes
    byte key[] = new byte[16]; // 12 + 4 = 16 bytes
    
    copy(rear, rear + 12, key + 12);
    copy(front, front + 4, key);    
    
    cout << key << endl;
    
    fstream file1;
    fstream file2;
    
    file1.open(infile,ios::in);
    file2.open(outfile,ios::out);
    
    stringstream buffer;  
    buffer << file1.rdbuf();  
    string cipher(buffer.str());
    
    string plain=aes_decode(cipher,key);
    cout << "cipher text: " << cipher << endl;
    cout << "plain text: " << plain << endl;
    
    file2 << plain;
    
    file1.close();
    file2.close();
    
    cout << "plain text stored in:" << outfile << endl;
}

int main(int argc,char * argv[]) {
    if(argc != 3) {
        cout << "usage: aesbrute infile outfile" << endl;
    } else {
        brute(argv[1], argv[2]);
    }
}
