## Design Patterns

Gang of four has divided the design patterns into three major parts.
* Creational
* Structural
* Behavioural

> Creational : <br> 
> Focused on how objects are created.

> 1. Singleton Pattern: <br> 
Overview <br>
a. It guarantees only one instance is going to be created. <br>
b. It also guarantees the control of resources, lazily loaded.<br>
c.Example : Java Runtime, spring beans, graphics managers.

> Example:

```
private static volatile SingletonPattern singletonPattern = null;

private SingletonPattern(){}

@NotNull public static SingletonPattern getInstance() 
{
    if(singletonPattern==null){
        //ensuring thread safety.
        synchronized (SingletonPattern.class){
            
            if(singletonPattern==null){
                singletonPattern = new SingletonPattern();
            }
        }
    }
    return singletonPattern;
}
```
> Test to verify the same. 

```

public class SingletonPatternTest {

    @Test
    public void testSingleInstanceIsCreated() {

        SingletonPattern instance1 = SingletonPattern.getInstance();
        SingletonPattern instance2 = SingletonPattern.getInstance();

        Assert.assertEquals(instance1,instance2);
    }

}
```

