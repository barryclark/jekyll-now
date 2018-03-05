#!/bin/bash  
echo "Compiling DES CBC Encoder"
g++ -o des_cbc_encode -L. des_cbc_encode.cpp -lcryptopp
echo "Compiling DES CBC Decoder"
g++ -o des_cbc_decode -L. des_cbc_decode.cpp -lcryptopp
