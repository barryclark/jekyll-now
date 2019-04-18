## Exercise - Using GraalVM to create native Serverless Java function


As mentionned in the previous exercice, reducing the size of the function container image is key.

In adidtion to JPMS (see here), we can also use GraalVM and its AOT compiler to further reduce the size of function container image.

GraalVM is an open-source high performance virtual machine developed by Oracle Labs. It offers many features, we will focus on GraalVM AOT (Ahead-of-Time) native compilation.
GraalVM 




fn init --init-image fnproject/fn-java-native-init graalfunc`
