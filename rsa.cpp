// 03/30/2018 10:02

#include <iostream>
#include <iomanip>
#include <string>
#include <fstream>

using namespace std;

#include "cryptopp/rsa.h"
#include "cryptopp/integer.h"
#include "cryptopp/osrng.h"

using namespace CryptoPP;

// n = modulus
// e = public exponent
// d = private exponent
Integer n, e, d;

AutoSeededRandomPool prng;

bool load_key(char *filename) {
    ifstream infile(filename);
    string line;
    int count = 0;
    
    if (infile.is_open()) {
        while(getline(infile, line)) {
            const char *chararray = line.c_str();
            
            if(count == 0) {
                n = Integer(chararray);                               
            } else if(count == 1) {
                e = Integer(chararray);                
            } else if(count == 2) {
                d = Integer(chararray);                
            } else {
                infile.close();
                return true; // shouldn't get this far...
            }

            count++;
        }
    } else {
        cout << "Can't open keyfile " << filename << endl;
        return false;
    }
    
    infile.close();
    return true;
}

bool encrypt(char *plaintext, Integer *ciphertext, streampos file_size) {
    RSA::PublicKey pubKey;
    pubKey.Initialize(n, e);
    
    if(pubKey.Validate(prng, 3)) {
        Integer m, c;

        for(int i = 0; i < file_size; i++) {
            m = Integer((long)plaintext[i]);
            c = pubKey.ApplyFunction(m);
            ciphertext[i] = c;
        }
    } else {
        cout << "public key not valid" << endl;
        cout << "n:" << hex << n << endl;
        cout << "e:" << hex << e << endl;
        cout << "e:" << hex << d << endl;
        
        return false;
    }
    
    return true;
}

bool decrypt(Integer *ciphertext, char *plaintext, int size) {
    Integer c, r;
    
    RSA::PrivateKey privKey;
    privKey.Initialize(n, e, d);
    
    if(privKey.Validate(prng, 3)) {
        for(int i = 0; i < size; i++) {
            c = ciphertext[i];
            r = privKey.CalculateInverse(prng, c);
            plaintext[i] = (char)r.ConvertToLong();
        }
    } else {
        cout << "private key not valid" << endl;
        cout << "n:" << hex << n << endl;
        cout << "e:" << hex << e << endl;
        
        return false;
    }
    
    return true;
}

void encrypt_file(char *infilename, char *outfilename) {
    ifstream infile;
    ofstream outfile;
    streampos size;
    char *plaintext;
    Integer *ciphertext;
    
    infile.open(infilename, ios::in | ios::binary | ios::ate);
    outfile.open(outfilename);
  
    if (infile.is_open()) {
        size = infile.tellg();

        plaintext = new char[size];
        ciphertext = new Integer[size];
        infile.seekg(0, ios::beg);
        infile.read((char*)plaintext, size);

        if(encrypt(plaintext, ciphertext, size)) {        
            for(int i = 0; i < size; i++) {
                outfile << hex << ciphertext[i] << endl;
            }        
            cout << "cipher text stored in: " << outfilename << endl;
        }
    } else {
        cout << "Unable to open file " << infilename << endl;
    }

    infile.close();
    outfile.close();
}

void decrypt_file(char *infilename, char *outfilename) {
    ifstream infile;
    ofstream outfile;
    char *plaintext;
    Integer *ciphertext;
    string line;
    int lines = 0;
    int i = 0;
    
    infile.open(infilename);
    outfile.open(outfilename, ios::out | ios::binary);
    
    while(getline(infile, line)) {
        lines++;
    }
    
    ciphertext = new Integer[lines];
    plaintext = new char[lines];
    
    infile.clear();
    infile.seekg(0, ios::beg);
    
    while(getline(infile, line)) {
        const char *chararray = line.c_str();
        ciphertext[i] = Integer(chararray);
        i++;
    }
    
    if(decrypt(ciphertext, plaintext, lines)) {
        outfile.write((char*)plaintext, lines);    
    }
    
    infile.close();    
    outfile.close();
}

void usage() {
    cout << "usage: ./rsa -d infile outfile keyfile" << endl;
    cout << "usage: ./rsa -e infile outfile keyfile" << endl;
    cout << "-d for decrypt, -e for encrypt" << endl;
}

int main(int argc, char * argv[]) {
    // usage: ./rsa -de infile outfile keyfile
    
    if(argc != 5) {
        usage();
    } else {
        char *flag = argv[1];
        char *infile = argv[2];
        char *outfile = argv[3];
        char *keyfile = argv[4];
        
        if(load_key(keyfile)) {
            if(strcmp(flag, "-e") == 0) {
                encrypt_file(infile, outfile);
            } else if(strcmp(flag, "-d") == 0) {
                decrypt_file(infile, outfile);
            } else {
                cout << "Unknown flag used " << flag << endl;
                usage();
            }
        }
    }    

    return 0;
}