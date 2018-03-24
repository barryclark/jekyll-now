#include <iostream>
#include <iomanip>
#include <string>
#include <fstream>

using namespace std;

#include "cryptopp/rsa.h"
#include "cryptopp/integer.h"
#include "cryptopp/osrng.h"

using namespace CryptoPP;

int main(int argc, char * argv[]) {
    // n = modulus
    // e = public exponent
    // d = private exponent
    Integer n, e, d;
    
    AutoSeededRandomPool prng;
    
    RSA::PrivateKey privateKey;
    privateKey.GenerateRandomWithKeySize(prng, 1024);

    //RSA::PublicKey publicKey(privateKey);
    
    n = privateKey.GetModulus();
    e = privateKey.GetPublicExponent();
    d = privateKey.GetPrivateExponent();
    
    cout << hex << n << endl;
    cout << hex << e << endl;
    cout << hex << d << endl;
}