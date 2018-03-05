// 2018-03-04 10:11PM

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

void des_encryption_8(unsigned char *input, unsigned char *key, unsigned char *xorBlock, unsigned char *output) {
//    copy(input, input + 8, output);
    
    unsigned char xored[8];
    
    for(int i = 0; i < 8; i++) {
        xored[i] = input[i] ^ xorBlock[i];
    }
      
    DESEncryption desEncryptor;
    desEncryptor.SetKey(key,8);
    desEncryptor.ProcessBlock(xored,output);
}

void des_encryption(unsigned char *plaintext, unsigned char *key, unsigned char *ciphertext, unsigned char *iv, streampos file_size) {
    unsigned char subtext[8];
    unsigned char subcipher[8];
    unsigned char nonce[8];
    
    memset(subtext, 0, 8);
    memset(subcipher, 0, 8);
    copy(iv, iv + 8, nonce);
            
    for(int i=0; i < file_size; i=i+8) {        
        int start = i;
        int end;
        
        if(i + 7 < file_size) {
            end = start + 8;
            copy(plaintext + start, plaintext + end, subtext);
        } else {
            end = file_size;
            int size = 8 - (end - start);
            memset(subtext,size,8);
            copy(plaintext + start, plaintext + end, subtext);
        }
                        
        des_encryption_8(subtext, key, nonce, subcipher);
                
        cout << i << "p: "; printhex(subtext);
        cout << i << "k: "; printhex(key);
        cout << i << "x: "; printhex(nonce);
        cout << i << "c: "; printhex(subcipher);
        
        copy(subcipher, subcipher + 8, ciphertext + start);
        
        for(int j = 0; j < 8; j++) {
            nonce[j]++;
            
            if(nonce[j] != 0) {
                break;
            }
        }
    }
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

int main(int argc, char * argv[]) {

    ifstream infile;
    ofstream outfile;
    streampos size;
    streampos ciphersize;
    unsigned char *plaintext;
    unsigned char *ciphertext;
    unsigned char *key =  new unsigned char[8];
    unsigned char *iv =  new unsigned char[8];

    if (argc != 4 && argc != 5) {
        cout << "usage:des_encode infile outfile key iv" << endl;
    } else {
        infile.open(argv[1], ios::in | ios::binary | ios::ate);
        outfile.open(argv[2], ios::out | ios::binary);

        if (infile.is_open()) {
            size = infile.tellg();
            
            if(size % 8 == 0) {
                ciphersize = size;
            } else {
                ciphersize = size + 8 - (size % 8);
            }
            
            plaintext = new unsigned char[size];
            ciphertext = new unsigned char[ciphersize];
            infile.seekg(0, ios::beg);
            infile.read((char*)plaintext, size);
            
            read_key(argv[3], key);
            
            if(argc == 5) {
                read_key(argv[4], iv);
            } else {
                memset(iv, 0, 8);
            }
            
            des_encryption(plaintext, key, ciphertext, iv, size);

            outfile.write((char*)ciphertext, ciphersize);
            cout << "cipher text stored in: " << argv[2] << endl;
        } else {
            cout << "Unable to open file " << argv[1] << endl;
        }

        infile.close();
        outfile.close();
    }
}