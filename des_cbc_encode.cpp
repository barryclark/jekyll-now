// 2018-03-05 8:49PM

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
    unsigned char prevcipher[8];
    
    memset(subtext, 0, 8);
    memset(subcipher, 0, 8);
    copy(iv, iv + 8, prevcipher);
            
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
                        
        des_encryption_8(subtext, key, prevcipher, subcipher);
                
        cout << i << "p: "; printhex(subtext);
        cout << i << "k: "; printhex(key);
        cout << i << "x: "; printhex(prevcipher);
        cout << i << "c: "; printhex(subcipher);
        
        copy(subcipher, subcipher + 8, ciphertext + start);
        copy(subcipher, subcipher + 8, prevcipher);
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

void encode_file(char *infilename, char* outfilename, char* keystring, char* ivstring, bool hasIv) {
    ifstream infile;
    ofstream outfile;
    streampos size;
    streampos ciphersize;
    unsigned char *plaintext;
    unsigned char *ciphertext;
    unsigned char *key =  new unsigned char[8];
    unsigned char *iv =  new unsigned char[8];
    
    infile.open(infilename, ios::in | ios::binary | ios::ate);
    outfile.open(outfilename, ios::out | ios::binary);

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

        read_key(keystring, key);

        if(hasIv) {
            read_key(ivstring, iv);
        } else {
            memset(iv, 0, 8);
        }

        des_encryption(plaintext, key, ciphertext, iv, size);

        outfile.write((char*)ciphertext, ciphersize);
        cout << "cipher text stored in: " << outfilename << endl;
    } else {
        cout << "Unable to open file " << infilename << endl;
    }

    infile.close();
    outfile.close();
}

void test(char *test) {
    unsigned char *ciphertext;
    
    if(test[0] == '1') {
        unsigned char *key = new unsigned char[8]{0x14, 0x0b, 0xb2, 0x2a, 0xb4, 0x06, 0xb6, 0x74};
        unsigned char *iv = new unsigned char[8]{0x4c, 0xa0, 0x0f, 0xd6, 0xdb, 0xf1, 0xfb, 0x28};
        unsigned char *plaintext = new unsigned char[16]{0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF}; //16
        des_encryption(plaintext, key, ciphertext, iv, 16);
    } else if(test[0] == '2') {
        unsigned char *key = new unsigned char[8]{0x32, 0xF6, 0xA8, 0x31, 0x98, 0xA2, 0xE0, 0x37};
        unsigned char *iv = new unsigned char[8]{0x0f, 0xf4, 0xc8, 0xd6, 0x1e, 0x80, 0x06, 0x18};
        unsigned char *plaintext = new unsigned char[16]{0x32, 0x43, 0xF6, 0xA8, 0x88, 0x5A, 0x30, 0x8D, 0x31, 0x31, 0x98, 0xA2, 0xE0, 0x37, 0x07, 0x34};
        des_encryption(plaintext, key, ciphertext, iv, 16);
    } else {
        cout << "there are only two tests: -test 1 and -test 2" << endl;
        return;
    }
        
    cout << "ciphertext" << endl;
    printhex(ciphertext);
    printhex(ciphertext + 8);
}

int main(int argc, char * argv[]) {
    if(argc == 3 && strncmp(argv[1], "-test") == 0) {
        test(argv[2]);
    } else if (argc != 4 && argc != 5) {
        cout << "usage:des_encode infile outfile key iv" << endl;
    } else {
        encode_file(argv[1], argv[2], argv[3], argv[4], argc == 5);
    }
}