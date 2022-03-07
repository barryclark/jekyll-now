##### [JAVA] Scanner, BufferedReader

자바 코딩테스트 문제들을 풀다보면 대부분 Scanner를  통해 값을 읽어올 것이다. 하지만 풀다보면 속도와 용량의 측면에서 버퍼를 사용하는 것이 굉장히 유익하다는 것을 알게 된다.

```java
import java.util.Scanner;
.
.
.
Scanner sc = new Scanner(System.in);
```

위는 우리가 아는 import를 통해 Scanner를 불러오는  방식이다. 

코드의 길이는 Scanner를 사용하는 것이 더 빠르고 접근도 쉬워 많은 사람들이 쉽게 접한다. 이에 비하면 BufferedReader를 사용할때는 비교적 코드가 복잡하다. 이때 나중에 따로 정리하겠지만 BufferedWriter의 개념까지 합쳐지면 굉장히 어려워 진다. 하지만 굉장히 빠른 속도와 용량을 절약할 수 있다는 점에서 데이터 처리에 효율적이라 데이터의 양이 많은 상황에서 굉장히 유익하다. 따라서 형태를 익혀놓으면 도움이 된다.

BufferedReader의 기본 형태는 다음과 같다.

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
.
.
.
BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
```

이때 StringTokenizer나 위에서도 언급한 BufferedWriter 그리고 readLine(), parseInt() 그리고 throws IOException과 같은 예외처리 등 다양한 개념이 함께 자주 등장한다. 이에 대한 내용은 다음 포스트에서 더 자세히 다루며 공부하려한다. 