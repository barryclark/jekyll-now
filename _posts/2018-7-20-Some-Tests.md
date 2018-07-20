---
layout: post
title: Some tests
---

Next you can update your site name, avatar and other options using the _config.yml file in the root of your repository (shown below).


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

