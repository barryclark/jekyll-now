---
layout: post
title: LIBIGL library
---

# LIBIGL #
https://github.com/libigl/libigl   

https://libigl.github.io/tutorial/   

# GRADIANT SPACE #
http://www.gradientspace.com/tutorials/2020/1/2/libigl-in-unreal-engine
COMPUTER GRAPHICS를 


# LIBIGL이 어떤건가요? #
Libigl은 C++ 지오메트리 처리를 연구하고 개발하는 오픈소스 라이브러리 입니다. 전통적인 라이브러리의 무거운 구조는 버리고, 헤더만 가지고 있는 심플한 캡슐화된 함수 라이브러리 입니다.

* LIBIGL에 대해서 궁금하면 LIBIGL의 튜토리얼을 참고합시다.


# LIBIGL의 설계 원칙 #

1. 복잡한 데이터 유형이 없습니다. 주로 행렬과 벡터를 사용하여, 코드 재사용성을 크게 향상시키고, 함수 작성자가 알고리즘에서 사용하는 모든 매개변수를 노출하도록 합니다.

2. 최소한의 종속성. 우리는 필요할 때만 외부 라이브러리를 사용하고 작은 함수 집합으로 래핑합니다.

3. 헤더 전용. 프로젝트에 추가 포함 디렉토리가 하나뿐이므로 라이브러리를 사용하는 것은 간단합니다. (컴파일 속도가 걱정된다면 라이브러리를 정적 라이브러리로 빌드하는 것도 가능합니다.)

4. 함수 캡슐화. 모든 기능(전체 구현 포함)은 동일한 이름의 .h/cpp 파일 쌍에 포함되어 있습니다.


# 설치시 주의사항 #
* window - libigl은 64비트 모드에서 Microsoft visual studio 2015컴파일러 이상만 지원합니다. 32비트 빌드에서는 작동하지 않으며 이전 버전의 visual studio에서는 작동하지 않습니다.

