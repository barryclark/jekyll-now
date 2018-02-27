#!/bin/bash  
echo "Compiling DES Decoder"
g++ -o des_decode -L. des_decode.cpp -lcryptopp