---
layout: post
title: Some tests
---

Next you can update your site name, avatar and other options using the _config.yml file in the root of your repository (shown below).

![_config.yml]({{ site.baseurl }}/images/config.png)

```
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
