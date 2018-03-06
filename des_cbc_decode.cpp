// 2018-03-05 9:01PM

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

using namespace CryptoPP;

void printhex(unsigned char *text) {
    for(int i = 0; i < 8; i++) {
        cout << setbase(16) << (int)text[i] << " ";
    }
    
    cout << endl;
}

void des_decryption_8(unsigned char *input, unsigned char *key, unsigned char *xorBlock,  unsigned char *output) {
    DESDecryption desDecryptor;
    desDecryptor.SetKey(key,8);
    desDecryptor.ProcessAndXorBlock(input,xorBlock,output);
}

streampos des_decryption(unsigned char *plaintext, unsigned char *key, unsigned char *ciphertext, unsigned char *iv, streampos file_size) {
    unsigned char subtext[8];
    unsigned char subcipher[8];
    unsigned char prevcipher[8];
    
    memset(subtext, 0, 8);
    memset(subcipher, 0, 8);
    copy(iv, iv + 8, prevcipher);
            
    for(int i = 0; i < file_size; i = i + 8) {        
        int start = i;
        int end;
        
        end = start + 8;
        copy(ciphertext + start, ciphertext + end, subcipher);
                              
        des_decryption_8(subcipher, key, prevcipher, subtext);
                        
        cout << i << "c: "; printhex(subcipher);
        cout << i << "k: "; printhex(key);
        cout << i << "x: "; printhex(prevcipher);
        cout << i << "p: "; printhex(subtext);

        copy(subtext, subtext + 8, plaintext + start);
        copy(subcipher, subcipher + 8, prevcipher);
    }
        
    for(int i = 1; i <= 8; i++) {
        if(subtext[8 - i] == i) {
            return file_size - i; 
        } else if(subtext[7 - i] > 7 || (i != 0 && subtext[8 - i] != subtext[7 - i])) {
            return file_size;
        }
    }
    
    return file_size;
}

void read_key(char *keystring, unsigned char *key) {
    cout << "read_key -> keystring = " << keystring << endl;
    
    memset(key, 0, 8);
    
    for (int i = 0; i < 8; i++) {
        if (keystring[i] != '\0') {
            key[i] = (unsigned char)keystring[i];
        } else {
            break;
        }
    }
    
    cout << "read_key -> key = "; printhex(key);
}

void decode_file(char *infilename, char* outfilename, char* keystring, char* ivstring, bool hasIv) {
    ifstream infile;
    ofstream outfile;
    streampos size;
    streampos plainsize;
    unsigned char *plaintext;
    unsigned char *ciphertext;
    unsigned char *key = new unsigned char[8];
    unsigned char *iv =  new unsigned char[8];
    
    infile.open(infilename, ios::in | ios::binary | ios::ate);
    outfile.open(outfilename, ios::out | ios::binary);

    if (infile.is_open()) {
        size = infile.tellg();

        plaintext = new unsigned char[size];
        ciphertext = new unsigned char[size];
        infile.seekg(0, ios::beg);
        infile.read((char*)ciphertext, size);

        read_key(keystring, key);

        if(hasIv) {
            read_key(ivstring, iv);
        } else {
            memset(iv, 0, 8);
        }

        plainsize = des_decryption(plaintext, key, ciphertext, iv, size);


        outfile.write((char*)plaintext, plainsize);
        cout << "plaintext stored in: " << outfilename << endl;
    } else {
        cout << "Unable to open file " << infilename << endl;
    }

    infile.close();
    outfile.close();
}

int main(int argc, char * argv[]) {

    if (argc != 4 && argc != 5) {
        cout << "usage:des_encode infile outfile key iv" << endl;
    } else {
        decode_file(argv[1], argv[2], argv[3], argv[4], argc == 5);
    }
}
