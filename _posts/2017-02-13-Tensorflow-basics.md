---
published: true
---
This note is not designed to replace the Tensorflow official documentation but rather to try to summarize the fundamental principles in Tensorflow. Fundamental principles are important to use and debug Tensorflow-based programs more effectively and less time-consuming. I won't write about detail APIs because the official [Tensorflow website](https://www.tensorflow.org/) serves this job better.    


## Tensorflow as Computational Graph  
Tensorflow represents computations in graph whose nodes are operations (**ops** for short). An op takes zero or more **Tensors** as input, performs some computations, and produces zero or more **Tensor** as output. 

![computational graph](/images/comp_graph.png)
Figure 1. *An example of computational graph (Credit: https://nathanbrixius.wordpress.com)*   

The computation process in Tensorflow occurs as follows:
* Construct a computational graph  
* Launch the graph into a **Session** in which the graph ops are placed onto **devices** (GPU, CPU)  
* The computation returns **Tensors** as Numpy *ndarray* objects in Python and as `Tensorflow::Tensor` instances in C and C++.  

Example:  Compute matrix multiplication in Tensorflow  


* Build a computational graph. Recall that an **op** takes in **Tensors**(or nothing)  and produces **Tensors** (or nothing)   

```
import tensorflow as tf   

mat1 = tf.constant([[1.,2.]])
mat2 = tf.constant([[3.], [4.]])
prod = tf.matmul(mat1,mat2)
```  

* Launch the constructed graph into a **Session()**. There are three different ways to do so. 
	* Basic way: 
    
    ```
    sess = tf.Session()
    print(sess.run(prod))
    sess.close() 
    ```   
    * Using `with` block:  
    
    ```
    with tf.Session() as sess:
    	print(sess.run(prod))
    ```  
    * Using Interactive Session:  
    
    ```
    sess = tf.InteractiveSession()
    prod.eval() 
    ```

## Common Tensorflow ops and Tensors 
|Syntax|Meaning|
|------|-------|
|`tf.placeholder(tf.float32, [None, 784])`| A interactive tensor specified with data type and shape. `None` means of any length|
|`tf.Variable(tf.zeros([784,10])`| A modifiable tensor which needs to be initialized. In this example, it is initialized to zeros| 