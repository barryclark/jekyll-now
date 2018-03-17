#include <iostream>
#include <iomanip>
#include <string>

using namespace std;

#include "cryptopp/rsa.h"
#include "cryptopp/integer.h"
#include "cryptopp/osrng.h"

using namespace CryptoPP;

int main(int argc, char * argv[]) {
    // n = modulus
    // e = public exponent
    // d = private exponent
    
    AutoSeededRandomPool prng;

    /////////////////////////////////////////////////////////

    // RSA::PrivateKey privKey;
    // privKey.GenerateRandomWithKeySize(prng, 64);
    // RSA::PublicKey pubKey(privKey);

    // cout << "modulus: " << hex << privKey.GetModulus() << endl;
    // cout << "private exp: " << hex << privKey.GetPrivateExponent() << endl;
    // cout << "public exp: " << hex << privKey.GetPublicExponent() << endl;
    // cout << endl;

    /////////////////////////////////////////////////////////

    Integer n("0xbeaadb3d839f3b5f"), e("0x11"), d("0x21a5ae37b9959db9");

    RSA::PrivateKey privKey;
    privKey.Initialize(n, e, d);

    RSA::PublicKey pubKey;
    pubKey.Initialize(n, e);

    /////////////////////////////////////////////////////////

    string message, recovered;
    Integer m, c, r;

    message = "secret";
    cout << "message: " << message << endl;

    // Treat the message as a big endian array
    m = Integer((const byte *)message.data(), message.size());
    cout << "m: " << hex << m << endl;

    // Encrypt
    c = pubKey.ApplyFunction(m);
    cout << "c: " << hex << c << endl;

    // Decrypt
    r = privKey.CalculateInverse(prng, c);
    cout << "r: " << hex << r << endl;

    // Round trip the message
    size_t req = r.MinEncodedSize();
    recovered.resize(req);
    r.Encode((byte *)recovered.data(), recovered.size());

    cout << "recovered: " << recovered << endl;	

    return 0;
}