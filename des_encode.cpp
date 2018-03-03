// 2018-03-03 12:43PM

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
    for(int i = 0; i < DES::DEFAULT_BLOCKSIZE; i++) {
        cout << setbase(16) << (int)text[i] << " ";
    }
    
    cout << endl;
}

void des_encryption_8(unsigned char *input, unsigned char *key, unsigned char *output) {
//    copy(input, input + 8, output);
    DESEncryption desEncryptor;
    unsigned char xorBlock[DES::DEFAULT_BLOCKSIZE];
    memset(xorBlock,0,DES::DEFAULT_BLOCKSIZE);
    desEncryptor.SetKey(key,DES::DEFAULT_KEYLENGTH);
    desEncryptor.ProcessBlock(input,output);
}

void des_encryption(unsigned char *plaintext, unsigned char *key, unsigned char *ciphertext, streampos file_size) {
    unsigned char subtext[9];
    unsigned char subcipher[DES::DEFAULT_KEYLENGTH];
    
    memset(subtext, '\0', DES::DEFAULT_BLOCKSIZE);
    memset(subcipher, '\0', DES::DEFAULT_BLOCKSIZE);
    
//    cout << "plaintext: "; printhex(plaintext);
        
    for(int i=0; i < file_size; i=i+DES::DEFAULT_BLOCKSIZE) {        
        int start = i;
        int end;
        
        if(i + 7 < file_size) {
            end = start + DES::DEFAULT_BLOCKSIZE;
            copy(plaintext + start, plaintext + end, subtext);
        } else {
            end = file_size;
            int size = DES::DEFAULT_BLOCKSIZE - (end - start);
            memset(subtext,size,DES::DEFAULT_BLOCKSIZE);
            copy(plaintext + start, plaintext + end, subtext);
        }
                        
        des_encryption_8(subtext, key, subcipher);
        copy(subcipher, subcipher + DES::DEFAULT_BLOCKSIZE, ciphertext + start);
                
        cout << i << "p: "; printhex(subtext);
        cout << i << "c: "; printhex(subcipher);
    }
    
//    cout << "ciphertext: "; printhex(ciphertext);
}

void read_key(char *keystring, unsigned char *key) {
    cout << "read_key -> keystring = " << keystring << endl;
    
    key = new unsigned char[DES::DEFAULT_KEYLENGTH];
    memset(key, 0, DES::DEFAULT_KEYLENGTH);
    
    for (int i = 0; i < DES::DEFAULT_KEYLENGTH; i++) {
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
    unsigned char *key;

    if (argc != 4) {
        cout << "usage:des_encode infile outfile key" << endl;
    } else {
        infile.open(argv[1], ios::in | ios::binary | ios::ate);
        outfile.open(argv[2], ios::out | ios::binary);

        if (infile.is_open()) {
            size = infile.tellg();
            
            if(size % DES::DEFAULT_BLOCKSIZE == 0) {
                ciphersize = size;
            } else {
                ciphersize = size + DES::DEFAULT_BLOCKSIZE - (size % DES::DEFAULT_BLOCKSIZE);
            }
            
            plaintext = new unsigned char[size];
            ciphertext = new unsigned char[ciphersize];
            infile.seekg(0, ios::beg);
            infile.read((char*)plaintext, size);
            
            read_key(argv[3], key);
            
            des_encryption(plaintext, key, ciphertext, size);

            outfile.write((char*)ciphertext, ciphersize);
            cout << "cipher text stored in: " << argv[2] << endl;
        } else {
            cout << "Unable to open file " << argv[1] << endl;
        }

        infile.close();
        outfile.close();
    }
}