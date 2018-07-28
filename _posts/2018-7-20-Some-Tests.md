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

## GIST inclusion tests

#### iFrame

<iframe src="https://gist.github.com/delabassee/3ef986d8b37e1be6490fa59e95d3833c#file-hellofunctiontest-kt" frameborder="0"></iframe>

#### embed
<script src="https://gist.github.com/delabassee/01e3f02ac59798ba6b92fb541321f00b.js"></script>

#### 1
<script src="https://gist.github.com/delabassee/3ef986d8b37e1be6490fa59e95d3833c#file-hellofunctiontest-kt"></script>

#### 2
<script src="https://gist.github.com/delabassee/3ef986d8b37e1be6490fa59e95d3833c#file-hellofunctiontest-kt"></script>

#### 3

<script src="https://gist.github.com/delabassee/3ef986d8b37e1be6490fa59e95d3833c#file-hellofunctiontest-kt?file=gist.md"></script>

#### 4

{% gist 3ef986d8b37e1be6490fa59e95d3833c gist.md %}

## Done

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

