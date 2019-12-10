---
Category: post
title: Learning Journal for Spring MVC and Spring JPA
---

## Spring JPA setup

1.Using Gradle is more convenient while creating a Spring MVC and JPA project ***https://www.jetbrains.com/help/idea/getting-started-with-gradle.html***

2. Creating JPAConfiguration class ***it needs to be directly created under the root package***

3. In ***Datasource***, double check
  (1) the Java Package name
  (2) the confidential information used in MySQL
  (3) Whether the correct ***schema*** is used
  
4.Create an ***interface*** that extends another interface ***CrudRepository***
```
package com.improving.GetMovie;
import com.sun.xml.bind.v2.model.core.ID;
import org.springframework.data.repository.CrudRepository;
import com.improving.GetMovie.Intercepters.Movie;

import java.util.List;

public interface MoviesRepository extends CrudRepository<Movie, Integer> {
}

```
5. Create an application.properties class under ***resources*** to change port if necessary

6. If there is a need to create html pages, create a template folder under resource is a common way to do too

7. Create an entity for each table ***don't forget about the name***

Example
```
package com.improving.GetMovie.Intercepters;

import javax.persistence.*;

@Entity(name = "movie")

public class Movie {

@Id
@GeneratedValue(strategy= GenerationType.AUTO)
private Integer id;
private String movieTitle;
private  String genre;
private Integer movieYear;
private String country;
private String actors;

    public Movie() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public String getGenre() {
        return genre;
    }

    public int getMovieYear() {
        return movieYear;
    }

    public String getCountry() {
        return country;
    }

    public String getActors() {
        return actors;
    }
}

```

### Gradle ###

1.recommended dependencies

```
plugins {
    id 'java'
    id 'war'
    id 'org.springframework.boot' version '2.2.0.RELEASE'
    id 'io.spring.dependency-management' version '1.0.8.RELEASE'
}

group 'com.improving'
version '1.0-SNAPSHOT'

apply plugin:'io.spring.dependency-management'

sourceCompatibility = 1.8 //set up the version

repositories{
    jcenter() //superset maven central that get all maven repositories
}


dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    
    runtimeOnly 'mysql:mysql-connector-java'
    
    implementation 'org.springframework.boot:spring-boot-starter-web'//runtime implementation; won't be seen while writing codes; this is an artifact ID
    
    implementation 'org.apache.tomcat.embed:tomcat-embed-jasper' //JSL dependency with tomcat
    
    implementation 'javax.servlet:jstl:1.2'
    
//    implementation 'org.springframework.boot:spring-boot-starter-security' => this will generate a login page that requires a system-generated userName and passWord

    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
    
    providedRuntime 'org.springframework.boot:spring-boot-starter-tomcat'
    
    testImplementation 'org.junit.jupiter:junit-jupiter-api:5.5.2'
    
    testRuntime 'org.junit.jupiter:junit-jupiter-engine:5.5.2'
}
```

2.If git is used, don't forget to use notePad to create a .gitignore file. Here are common files that can be ignored while using Gradle
```
.gradle/

/build/
 
.idea/

# Ignore Gradle GUI config
gradle-app.setting

# Avoid ignoring Gradle wrapper jar file (.jar files are usually ignored)
!gradle-wrapper.jar

# Cache of project
.gradletasknamecache

# # Work around https://youtrack.jetbrains.com/issue/IDEA-116898
# gradle/wrapper/gradle-wrapper.properties

 build.gradle
 
gradle/

gradlew

gradlew.bat

settings.gradle

```
## Spring MVC Interaction with Spring JPA

### Use Controller!
```
package com.improving.GetMovie;

import com.improving.GetMovie.Intercepters.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path="/api")
public class AnotherAPIController {

    @Autowired
    private MoviesRepository moviesRepository;

    @GetMapping(path = "/movies")
    public @ResponseBody
    Iterable<Movie> getAllMovies() {
        return moviesRepository.findAll();
    }


@GetMapping(path = "/movies/{id}")
public @ResponseBody
Optional<Movie> getAllById(@PathVariable Integer id){
        if(id!=null) {
        return moviesRepository.findById(id);
        }
        return null;
}

}
```

*The information in ***MVCConfig*** and ***APP*** (main class) is the same  

## Spring JPA Doc.

1. A good easy intro about what ***Spring JPA*** is and commonly-used interfaces
https://www.petrikainulainen.net/programming/spring-framework/spring-data-jpa-tutorial-introduction/

2.


## Spring MVC Doc.

## Q & A
1.obtain the post data :https://stackoverflow.com/questions/2494774/how-to-explicitly-obtain-post-data-in-spring-mvc
2. connecting JPA and MVC https://www.baeldung.com/spring-boot-angular-web
3. deleting a row https://www.baeldung.com/spring-data-jpa-delete
