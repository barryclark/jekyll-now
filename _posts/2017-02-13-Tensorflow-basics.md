---
published: false
---
This note is not designed to replace the Tensorflow official documentation but rather to try to summarize the fundamental principles in Tensorflow. Fundamental principles are important to use and debug Tensorflow-based programs more effectively and less time-consuming. I won't write about detail APIs because the official [Tensorflow website](https://www.tensorflow.org/) serves this job better.    

Tensorflow represents computations in graph whose nodes are operations (**ops** for short). An op takes zero or more **Tensors** as input, performs some computations, and produces zero or more **Tensor** as output. 

![computational graph](/images/comp_graph.png)
Figure 1. *An example of computational graph (Credit: https://nathanbrixius.wordpress.com)*   

The computation process in Tensorflow occurs as follows:
* Construct a computational graph  
* Launch the graph into a **Session** in which the graph ops are placed onto **devices** (GPU, CPU)  
* The computation returns **Tensors** as Numpy *ndarray* objects in Python and as `Tensorflow::Tensor` instances in C and C++.  
