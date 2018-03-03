#!/bin/bash  
echo "Compiling DES Encoder"
g++ -o des -L. des.cpp -lcryptopp