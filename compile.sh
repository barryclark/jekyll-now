#!/bin/bash  
echo "Compiling DES Encoder"
g++ -o des_encode -L. des_encode.cpp -lcryptopp
echo "Compiling DES Decoder"
g++ -o des_decode -L. des_decode.cpp -lcryptopp
