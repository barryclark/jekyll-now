#!/bin/bash  
echo "Compiling DES Encoder"
g++ -o des_encode -L. des_encode.cpp -lcryptopp