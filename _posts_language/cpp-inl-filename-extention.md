---
layout: post
title: CPP *.inl
---

- [ ] 조금더 공부 필요

inl file에는 inline 함수의 정의부를 적어 놓고, 선언부가 있는 header file의 끝에
#include로 inl file을 포함하여 사용할 수 있습니다.

* Header.h
```cpp
inline void Func();
#include Inline.inl
```

* Inline.inl
```cpp
void Func()
{

}
```

항목형식은 C/C++ 헤더로 되어있어야 합니다.

* 헤더파일의 크기가 비대해지면 사용합니다.