#!/usr/bin/env bash

template="notebook_simple_ann_post"

bash ../nb_converter.sh neural_network_implementation_intermezzo01.ipynb "How to implement a neural network Intermezzo 1" "2015-06-10" $template '1 3 5'

bash ../nb_converter.sh neural_network_implementation_intermezzo02.ipynb "How to implement a neural network Intermezzo 2" "2015-06-10" $template '1 3'

bash ../nb_converter.sh neural_network_implementation_part01.ipynb "How to implement a neural network Part 1" "2015-06-10" $template '1 3 5 7 9'

bash ../nb_converter.sh neural_network_implementation_part02.ipynb "How to implement a neural network Part 2" "2015-06-10" $template '1 3 5 8 9'

bash ../nb_converter.sh neural_network_implementation_part03.ipynb "How to implement a neural network Part 3" "2015-06-10" $template '1 3 5 8 11 12 13'

bash ../nb_converter.sh neural_network_implementation_part04.ipynb "How to implement a neural network Part 4" "2015-06-10" $template '1 3 11 12 13'

bash ../nb_converter.sh neural_network_implementation_part05.ipynb "How to implement a neural network Part 5" "2015-08-02" $template '1 3 12 16 18'
