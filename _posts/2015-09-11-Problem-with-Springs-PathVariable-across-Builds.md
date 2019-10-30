---
layout: post
title: Problem with Spring's @PathVariable across builds
excerpt_separator: <!--more-->
tags: [spring, web development]
---

Some colleagues had a very strange problem today: their Spring REST endpoints would work fine when hitting a SNAPSHOT release.

They would fail though, when trying to test against a release.
The error was something like

> java.lang.IllegalStateException: No parameter name specified for argument of type [java.lang.String], and no parameter name information found in class file either.

The failing method was something like 

```
@RequestMapping(value={"/foo/{fromId}/action"}, 
    method={org.springframework.web.bind.annotation.RequestMethod.POST}, 
    headers={"content-type=application/json"})
  public ResponseEntity<SomeResponse> doAction(@PathVariable String fromId, @RequestBody TheBody theBody, HttpServletRequest request)
  {...}
```

But why??
<!--more-->

The name of the argument matches the path variable, a nice little feature of Spring. 

After some digging online, it appears that the “implicit PathVariable name” feature only works when [debug information is on at compile time][1].

Or in other words, [RTFM][2] and don't just jump from example to example; **read the text in between!**

Since it is a good practice to disable debug information in your released artifacts, our release build was doing exactly that

Something like the following in Maven 
 
```
...
<profile>
    <id>used-by-default</id>
    <activation>
        <activeByDefault>true</activeByDefault>
    </activation>
    <build>
        <pluginManagement>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <configuration>
                        <debug>true</debug>
                    </configuration>
                </plugin>
            </plugins>
        </pluginManagement>
    </build>
</profile>
...
<profile>
    <id>used-for-release</id>
    <build>
        <pluginManagement>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <configuration>
                        <debug>false</debug>
                    </configuration>
                </plugin>
            </plugins>
        </pluginManagement>
    </build>
</profile>
...
```

So, mystery solved and the morale of the story: 

All @PathVariables MUST be explicit (and RTFM, RTFM, RTFM,...)



   [1]: https://objectpartners.com/2010/08/12/spring-pathvariable-head-slapper/
   [2]: https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/htmlsingle/#mvc-ann-requestmapping-uri-templates
