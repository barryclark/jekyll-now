---
layout: post
title: You're up and running!
---

## Hello World

### First Blog Post

``` 
    public class SingletonPattern {

        //It guarantees only one instance is going to be created.
        //It also guarantees the control of resources, lazily loaded.
        //Example runtime, logger(maybe), spring beans, graphics managers.

        private static volatile SingletonPattern singletonPattern = null;

        private SingletonPattern(){

        }

        @NotNull public static SingletonPattern getInstance(){
            if(singletonPattern==null){
                synchronized (SingletonPattern.class){
                    if(singletonPattern==null){
                        singletonPattern = new SingletonPattern();
                    }
                }
            }
            return singletonPattern;
        }

    }
```

Singleton Pattern. 