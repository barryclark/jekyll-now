#!/bin/bash

# Init conda.
conda init

# Create conda environment.
conda create -n blog python=3.10 -y

# Install the remaining packages using poetry.
bash -i -c "conda activate blog && poetry install"