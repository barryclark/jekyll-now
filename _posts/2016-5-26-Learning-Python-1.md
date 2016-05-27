---
layout: post
title: Data Serialization/Deserialization in Python
tags:
- Data Serialization
- Deserialize
- Python
- Pickle
- UnPickle
published: true
---

In this post I am going to talk about *pickle*. *Pickle* is to be eaten, in Python *pickle* is for data serializing and 
deserializing Python's data object. Object in this case could be a variable, instance of a class, dictionaries, tuple and etc.
Pickling is the process to convert data object into character streams. Before writing object into file, *pickle* serialize the 
object before writing it to a file. For deserializing data stream from file, *unpickle* can be used to convert data steam to 
object. Let's see how the code look like to do this.

#### Pickle file

```
  # Import the pickle module
  import pickle

  #Create something to be pickled
  picklelist=['one',2,'three','four',5]
  
  # create a file
  file = open('pickletest_file','w')

  # dump object to file
  pickle.dump(picklelist, file)
  
  # pickling is completing, close the file
  file.close()
```

#### Unpickle file

```
  # import the pickle module
  import pickle

  # now open a file for reading
  unpicklefile = open('pickletest_file','r')

  # now load the list that we pickle into a new object
  unpickledlist = pickle.load(unpicklefile)

  # close the file
  unpicklefile.close()

  # print out every item in the unpickledlist
  for item in unpickledlist:
    print item
```

One thing worth to note is that *pickle* has an optimized cousin, *cpickle*. *Cpickle* is writen in C, it is speed is 1000 times faster than *pickle*. *Cpickle* does not support subclassing of *pickler()* and *unpickler()*. Other than these, interfaces of the 2 modules are nearly the same. 



