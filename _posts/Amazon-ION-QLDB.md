# AMAZON QLDB

# Code Snippet


```
sudo yum -u update
sudo yum -y install java-1.8.0-openjdk-dev
sudo yum -y install java-1.8.0-openjdk-devel
udo update-alternatives --config javac

java -version
javac -version

curl -s "https://get.sdkman.io" | bashsource "$HOME/.sdkman/bin/sdkman-init.sh"sdk install gradle

gradle -version
```

### Gradle stuff
```bash
mkdir lab2cd lab2

gradle init --type java-application
```

### build.gradle

```java
dependencies {    
// This dependency is used by the application.    
implementation 'com.google.guava:guava:29.0-jre'    
// Use JUnit test framework    
testImplementation 'junit:junit:4.13'    
compile group: 'com.amazon.ion', name: 'ion-java', version: '1.6.1'    
compile group: 'software.amazon.qldb', name: 'amazon-qldb-driver-java', version: '2.0.0-rc.1'    
compile group: 'com.amazonaws', name: 'aws-java-sdk-qldb', version: '1.11.785'
}

mavenCentral()
```

### Application.java


```java
package lab2;public class App {
    public static void main(String[] args) {        
         System.out.println("Let's play with Ion!");    
    }
}
```

The code

```java
 package lab2;import com.amazon.ion.*;import com.amazon.ion.system.*;import com.amazon.ion.util.*;import software.amazon.awssdk.services.qldbsession.*;import software.amazon.awssdk.services.qldbsession.model.OccConflictException;import software.amazon.qldb.*;import software.amazon.qldb.exceptions.TransactionAbortedException;import java.util.Iterator;public class SlowUpdate {    public static void main(String[] args) throws Exception {        QldbSessionClientBuilder sessionClientBuilder = QldbSessionClient.builder();        //RetryPolicy retryPolicy = RetryPolicy.builder().maxRetries(3).build();        RetryPolicy retryPolicy = RetryPolicy.none();        QldbDriver driver = QldbDriver          .builder()          .ledger("ion-lab")          .sessionClientBuilder(sessionClientBuilder)          .transactionRetryPolicy(retryPolicy)          .build();        try {            driver.execute(txn -> {                Result result = txn.execute("SELEC
 ```
 

# References
* Amazon QLDB - https://aws.amazon.com/qldb/
* https://docs.aws.amazon.com/qldb/latest/developerguide/what-is.html
* Amazon QLDB Java Driver - https://javadoc.io/doc/software.amazon.qldb/amazon-qldb-driver-java/latest/index.html
* Amazon ION - http://amzn.github.io/ion-docs/
* Amazon ION Cook book - http://amzn.github.io/ion-docs/guides/cookbook.html
* PartiQL (compatible access to relational, semi-structured, and nested data.) - https://partiql.org/
* http://tinyurl.com/y4kdbt3k
*  Ledger capabilitlies of QLDB as a demo
*  Emile Baizel (AWS): https://tinyurl.com/y4kdnt3k
*  https://tinyurl.com/y64kmpmd