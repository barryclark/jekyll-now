#!/usr/bin/env bash

template="notebook_simple_rnn_post"

bash ../nb_converter.sh rnn_implementation_part01.ipynb "How to implement a recurrent neural network Part 1" "2015-09-27" $template '1 5 6 7 10'

bash ../nb_converter.sh rnn_implementation_part02.ipynb "How to implement a recurrent neural network Part 2" "2015-09-27" $template '1 2 3 6 10 12 13'
