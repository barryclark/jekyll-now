---
layout: post
title: Process? Thread란?
---
# Process? Thread란? 

## **⚙️ 프로세스의 개념**
여러분의 컴퓨터에서 실행할 수 있는 파일
윈도우의 경우 이름 뒤쪽에 .exe 붙어있는
그런 파일들을 '프로그램'이라고 해요.

**그리고 그 프로그램이 실행돼서
돌아가가고 있는 상태,**

**즉 컴퓨터가 어떤 일을 하고 있는 상태를
'프로세스'라고 하죠.**

여러 프로세스를 함께 돌리는 작업은
동시적, 병렬적, 또는
이 둘의 혼합으로 이뤄져요.

## **🧵 스레드의 개념**
한 프로세스 내에서도 여러 갈래의 작업들이
동시에 진행될 필요가 있는거에요.

**이 갈래를 '스레드'라고 불러요.**

이 영상에서 메모리를 조리대에 비유했죠?

프로세서는 요리사고,
대량주문이 들어오는 이 식당에서
끊임없이 만들어내는 요리 메뉴
하나하나가 프로세스에요.

컴퓨터는 프로세스마다 자원을 분할해서 할당해요.

라면 끓이는 섹션, 김밥 마는 섹션, 햄버거 만드는 섹션

이렇게 조리 공간을 나눠서
요리사 혼자서 돌아다니면서 동시적으로 하든
여럿이서 병렬적으로 하든, 이들을 섞어서 하든

이 메뉴들을 계속해서 만들어내는거죠.

햄버거를 만드는 프로세스에서는
패티를 굽는 스레드가 진행되는 동안

빵🍞에 야채🍅를 얹고 소스🥫를 뿌리는
스레드도 진행될 수 있겠죠.

한 메뉴(=프로세스)의 스레드들은 같은 조리대(=메모리)에서 이뤄져요.

패티는 여기서 굽고 야채는 저기서 얹는다면
같은 조리대에서 작업하는 것보다 일하기가 더 힘들겠죠.

같은 메뉴를 만들 때는 같은 공간과 장비,
즉 **같은 자원을 공유**하는것이 더 효율적일거에요.

프로세스들은 컴퓨터의 자원을 분할해서 쓰지만

스레드는 프로세스마다 주어진 전체 자원을
함께 사용하는거죠.

이게 속도와 효율 면에서는 낫겠지만
단점도 있어요.

프로세스 안에서 공유되는 변수에
스레드 두 개가 동시에 손을 대요.

현실세계에서는 로맨스물이 되지만
컴퓨터 세계에서는 Error물이 돼요.

→ Process : 프로그램의 작업 단위..  메모리 = 조리대, 요리사 = 프로세서, 프로세스 = 메뉴라 생각하면 쉽다.

운영체제로부터 자원을 할당받는 작업의 단위.

→ Thread : 프로세스가 이뤄지는 작업의 갈래의 단위

할당 받은 자원을 이용하는 실행의 단위이고 프로세스 내에 여러개 생길 수 있다.

⇒ 어플리케이션 하나가 프로세스이고, 그 안에서의 분기처리가 스레드가 되는 셈이다.

일반적으로 하나의 Application(Program)은 하나 이상의 Process를 가지고 있고, 하나의 Process는 반드시 하나 이상의 Thread를 갖는다.

→ Process를 생성하면 기본적으로 하나의 Main Thread가 생성되는 셈.

[Detail) Process?](https://www.notion.so/Detail-Process-34146af3e56047eaa8e5d094946ee9fc)

먼저 위 페이지를 보고오자.

![스크린샷 2022-09-12 오후 1.21.04.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e7c23637-7dd9-452a-b00b-14c66ee2d688/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-09-12_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.21.04.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220915%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220915T125825Z&X-Amz-Expires=86400&X-Amz-Signature=b78fe0c1cea9260bc25764176fb3418880c25437936ded8ddc59163340a66afe&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA%25202022-09-12%2520%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE%25201.21.04.png%22&x-id=GetObject)

Thread는 Process 내에서 각각 [Stack](https://www.notion.so/Detail-Process-34146af3e56047eaa8e5d094946ee9fc)영역 만 따로 할당 받고, Code, Data Heap영역은 **공유** 한다.

Thread는 한 Process 내에서 동작되는 여러 실행의 흐름으로, 같은 프로세스 안에 있는 여러 스레드들은 같은 힙공간을 공유한다.

반면, Process는 다른 Process의 메모리에 직접 접근할 수 없다.

한 Thread가 Process의 자원을 변경하면, 다른 이웃 Thread(Sibling Thread도 그 변경결과를 즉시 볼 수 있다.

![스크린샷 2022-09-12 오후 1.35.17.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0a935bde-ec24-4814-9eb6-9aef0fb6383f/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-09-12_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.35.17.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220915%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220915T125853Z&X-Amz-Expires=86400&X-Amz-Signature=eab35d06442d850407ff767f823a96400c66eec79c96ea627f3f8c72e8024612&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA%25202022-09-12%2520%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE%25201.35.17.png%22&x-id=GetObject)

# Multi Process & Multi Thread

## Multi Process

- 하나의 프로그램을 **여러개의 프로세스**로 구성하여 각 프로세스가 하나의 작업(Task)를 처리하는 것이다.
    - 장점 : 하나의 프로세스가 잘못되어도 프로그램은 동작함.
    - 단점 : Context Switching 비용 발생.

## Multi Thread

- 프로그램을 **여러개의 Thread**로 구성하고 각 Thread가 작업(Task)를 처리하는 것.
    - 장점 : 시스템 자원 소모 감소, 처리 비용 감소(실행속도 향상), Thread간 자원공유([Stack을 제외한 영역](https://www.notion.so/Detail-Process-34146af3e56047eaa8e5d094946ee9fc))
    - 단점 : 디버깅 어려움, 동기화 이슈 발생, 하나의 Thread의 오류로 전체 프로세스 문제 발생.



### 참고자료
[Process, Thread 차이가 뭐예요?](https://brunch.co.kr/@babosamo/100)

[👩‍💻 프로세스 vs 쓰레드 차이 정리](https://inpa.tistory.com/entry/%F0%9F%91%A9%E2%80%8D%F0%9F%92%BB-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4-%E2%9A%94%EF%B8%8F-%EC%93%B0%EB%A0%88%EB%93%9C-%EC%B0%A8%EC%9D%B4#f791)

[프로세스는 뭐고 스레드는 뭔가요?](https://www.youtube.com/watch?v=iks_Xb9DtTM)
