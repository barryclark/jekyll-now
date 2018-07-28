---
layout: post
title: Some tests
---

2018-7-20-Some-Tests.md

```
fn init --runtime kotlin myfunc
```

```kotlin
package com.fn.example

fun hello(input: String) = when {
    input.isEmpty() -> ("Hello, world!")
        else -> ("Hello, ${input}")
}
```

## GIST inclusion 

#### embed
<script src="<script src="https://gist.github.com/delabassee/12bfd37ec64b8e49aaadcaf0e921007e.js"></script>"></script>


```kotlin
package com.fn.example
import com.fnproject.fn.testing.*
import org.junit.*
import kotlin.test.assertEquals

class HelloFunctionTest {

        @Rule @JvmField
        val fn = FnTestingRule.createDefault()

        @Test
        fun `should return default greeting`() {
                with (fn) {
                        givenEvent().enqueue()
                        thenRun("com.fn.example.HelloFunctionKt","hello")
                        assertEquals("Hello, world!", getOnlyResult().getBodyAsString())
                }
        }

        @Test
        fun `should return personalized greeting`() {
                with (fn) {
                        givenEvent().withBody("Jhonny").enqueue()
                        thenRun("com.fn.example.HelloFunctionKt","hello")
                        assertEquals("Hello, Jhonny", getOnlyResult().getBodyAsString())
                }
        }

}
```

```
mvn test
...
[INFO] --- kotlin-maven-plugin:1.2.51:test-compile (test-compile) @ hello ---
...
-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running com.fn.example.HelloFunctionTest
Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.518 sec
Results :
Tests run: 2, Failures: 0, Errors: 0, Skipped: 0
```


```
fn run myfunc
```

