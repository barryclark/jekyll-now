---
layout: post
title: How to split image dataset into train, validation and test set?
---

Splitting image data into train, validation, and test sets is a crucial step in machine learning model development. It helps to prevent over-fitting, evaluate model performance, and ensure that the model generalizes well to new, unseen data.
It's useful to have code that can quickly separate image data into training, validation, and testing datasets.
The folder structure would look something like this:

<script src="https://gist.github.com/Aravinda89/ae9ba29924cec60f892fc290647d8759.js"></script>

        
1. Obtain the image data Retrieve all the images located in the designated folder.

<script src="https://gist.github.com/Aravinda89/b3db76d48c4dfa8d801ae8619b008d3f.js"></script>


2. Split the data Randomly separate the image data into three sets: 70% for training, 15% for validation, and 15% for testing.

<script src="https://gist.github.com/Aravinda89/2241d6cd7fc837b5e172e14cc9c8d997.js"></script>


3. Copy the images into their respective folders Create separate folders for each set, including the training, evaluation, and testing sets. Copy the images into their respective folders based on the random split.

<script src="https://gist.github.com/Aravinda89/11626d83af915b45ea56924b8f09001d.js"></script>


<a href="https://github.com/Aravinda89/split_train_eval_test"> Full code </a>

<script src="https://gist.github.com/Aravinda89/0aafd15ff5cad8f13e9002f5ec459e8e.js"></script>


“ Why did the machine learning model go to therapy?
Because it couldn’t decide between the train, validation, and test sets — it just kept overthinking! :) ”
