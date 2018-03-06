#!/bin/bash  
echo "Running DES CBC mode Test 1"
./des_cbc_encode -test 1
echo "Running DES CBC mode Test 2"
./des_cbc_encode -test 2
echo "Running DES CBC mode Test 3"
./des_cbc_encode -test 3
echo "Running DES CBC mode Test 4"
./des_cbc_encode -test 4

echo "Running DES CTR mode Test 1"
./des_ctr_encode -test 1
echo "Running DES CTR mode Test 2"
./des_ctr_encode -test 2
echo "Running DES CTR mode Test 3"
./des_ctr_encode -test 3
echo "Running DES CTR mode Test 4"
./des_ctr_encode -test 4