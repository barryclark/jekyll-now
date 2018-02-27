#include<iostream>
#include<fstream>
#include<sstream>
#include<string>
using namespace std;

#include"cryptopp/cryptlib.h"
#include"cryptopp/hex.h"
#include"cryptopp/filters.h"
#include"cryptopp/des.h"
#include"cryptopp/modes.h"

using namespace CryptoPP;

void des_encryption_8(unsigned char *input, unsigned char *key, unsigned char *output) {
	    DESEncryption desEncryptor;
	    unsigned char xorBlock[8];
	    memset(xorBlock,0,8);
	    desEncryptor.SetKey(key,8);
	    desEncryptor.ProcessAndXorBlock(input,xorBlock,output);
}

void des_encryption(unsigned char *plaintext, unsigned char *key, unsigned char *ciphertext) {
	unsigned char *subtext;
	unsigned char *subcipher;
	
	for(int i=0; i < sizeof plaintext; i=i+8) {
		int start = i;
		int end = start + 8;
		copy(plaintext + start, plaintext + end, subtext);
		des_encryption_8(subtext, key, subcipher);
		copy(subcipher, subcipher + 8, ciphertext + start);
	}
}

void read_key(unsigned char *keystring, unsigned char *key) {
	memset(key,0,DES::DEFAULT_KEYLENGTH);
		
	for(int i=0;i<DES::DEFAULT_KEYLENGTH;i++) {
		if(keystring[i]!='\0') {
			key[i]=(byte)keystring[i];
		} else {
			break;
		}
	}
}

int main(int argc, char * argv[]) {

	ifstream infile;
	ofstream outfile;
	streampos size;
	unsigned char *plaintext;
	unsigned char *ciphertext;
	unsigned char *key;

	if(argc!=4)	{
		cout<<"usage:des_encode infile outfile key"<<endl;
	} else {
		infile.open(argv[1], ios::in | ios::binary | ios::ate);
		outfile.open(argv[2], ios::out | ios::binary);
		
		if (infile.is_open()) {
			size = infile.tellg();
			plaintext = new unsigned char[size];
			infile.seekg(0, ios::beg);
			infile.read(plaintext, size);
			
			read_key(argv[3], key);
			des_encryption(plaintext, key, ciphertext);
			
			outfile << ciphertext;
			cout << "cipher text stored in: " << argv[2] << endl;
		} else {
			cout << "Unable to open file " << argv[1];
		}
		
		infile.close();
		outfile.close();
	}
}