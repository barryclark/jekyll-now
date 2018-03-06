#!/bin/bash
echo "Encrypting files using DES CBC mode"
./des_cbc_encode MSG1 MSG1.e key iv
./des_cbc_encode MSG2 MSG2.e key iv
./des_cbc_encode MSG3 MSG3.e key iv
./des_cbc_encode text1 text1.e key iv

./des_cbc_decode MSG1.e MSG1.d key iv
./des_cbc_decode MSG2.e MSG2.d key iv
./des_cbc_decode MSG3.e MSG3.d key iv
./des_cbc_decode text1.e text1.d key iv