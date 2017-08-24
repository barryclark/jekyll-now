#!/usr/bin/env bash

# Convert ipython notebooks into stripped down html with the
#  Jekyll front matter.
# Example command:
#  sh nb_converter.sh neuralnets/Simple_neural_network_part01.ipynb "Simple Neural Network Part 1" "2015-05-18" "notebook_simple_ann_post"

# Get the directory of this script
script_dir="$(dirname "$0")"

# Check if the file is passed as argument
if [ -z "$1" ]; then
    echo "notebook file expected as input"
    exit 2
fi
nb_file=$1

# Check if a title for the front matter is passed as an argument
if [ -z "$2" ]; then
    echo "You should provide a title as second argument"
    exit 2
fi
title=$2

# Check if a date for the filename is passed as an argument
if [ -z "$3" ]; then
    echo "You should provide a data in YYYY-MM-DD format as third argument"
    exit 2
fi
date=$3

# Check if a template is passed as an argument
if [ -z "$4" ]; then
    echo "You should provide a template as fourth argument."
    exit 2
fi
template=$4

# Check if the cell indices to collapse are passed in as fifth argument
if [ -z "$5" ]; then
    indices_to_collapse=''
else
	indices_to_collapse=$5
fi
indices_to_collapse=$5

# Convert to stripped down html
jupyter nbconvert --to html --template basic $nb_file

# Get the html filename
filename="${nb_file/.ipynb/.html}"

# Add the collapse/expand tags
python $script_dir/insertCollapseTags.py $filename $indices_to_collapse > tmp.html
mv tmp.html $filename

# Add the front matter before the html
echo -e "--- \n\
layout: $template \n\
title: $title \n\
---\n\n" | cat - $filename > tmp && mv tmp $filename

# Move file to the _post directory
mv $filename "$script_dir/../_posts/$date-$filename"
