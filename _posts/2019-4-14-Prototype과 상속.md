---
layout: post
title: Prototype과 상속
date: 2019-04-14
comments: true
categories: [Study, javascript]
tags: [Javascript, Prototype, __proto__]
excerpt: JavaScript는 Prototype 기반의 언어라고 불린다. 그만큼 JavaScript를 이해하고 사용하기 위해 Prototype에 대한 이해가 중요하…………지만! 그만큼 어렵고 복잡하다…..😔
---

![상속 cover](https://miro.medium.com/max/1200/1*7Bk_BqW4cKJssE3OX8YOOw.jpeg "상속 cover")

## Intro

JavaScript는 Prototype 기반의 언어라고 불린다. 그만큼 JavaScript를 이해하고 사용하기 위해 Prototype에 대한 이해가 중요하…………지만! 그만큼 어렵고 복잡하다…..😔
본격적으로 자바스크립트의 프로토타입에 대해 이야기 하기 전에 선행적으로 알아야 할 자바스크립트의 기본 개념들에 대해 이야기 하고자 한다.

<div class='innerBox'>
<ol>
<li> 자바스크립트에서 숫자, 문자열, boolean값, null, undefined 같은 기본 타입을 제 외한 모든 값은 객체이다. 따라서, 배열, 함수, 정규표현식 등 모두 객체로 표현할 수 있다.</li> 
<li> 자바스크립트에서 객체는 함수로 생성한다.</li>
<li> 모든 함수 객체의 Constructor(생성자/함수) 는 prototype이란 프로퍼티를 가지고 있으며, 이 prototype 프로퍼티는 함수로 생성되는 객체들이 원형으로 사용하는 객체를 가리킨다.</li>
<li> 자바스크립트에서 단순 대입 시
<ul>
   <li> 숫자, 문자열 : value copy(할당)</li>
   <li> 객체, 배열 : reference copy(참조)</li>
   <li> 변수를 함수의 인자(parameter)로 전달하는 것 역시 단순대입으로 동작</li>
   </ul>
</li>
</ol>
</div>

## Prototype Object

함수가 생성될 때, Constructor(생성자) 자격이 부여되며, Prototype Object가 생성&연결된다.

1. Prototype : 모든 **함수**가 생성될 때 **assignable** 한 특징을 가지는 prototype이 함께 생성된다. 이는 객체로, `Constructor`와 `__proto__` 속성을 가지고 있다.
2. Constructor : instance를 만들 수 있는 함수는 Constructor를 가지고 있으며, 함수의 Constructor는 자기 자신이다.

<img src="https://miro.medium.com/max/1400/1*Mge2Toq24VR1-PgnJsK0pQ.png" alt="Prototype Object" width='350em'>

## \_\_proto\_\_ vs prototype

### \_\_proto\_\_

instance의 `__proto__`는 **조상함수의 prototype object**를 가리킨다. 즉, 조상함수의 prototype은 instance의 원형이 되는 객체이며, 자식 객체들이 모두 공유하는 속성이다.

<img src="https://miro.medium.com/max/1400/1*wPQJCBzJojayIVMZgokEpA.png" alt="__proto__" width='350em'>

### Prototype Chain

아래 예제에서, Human 함수에 toString()이라는 method를 정의하지 않았지만, Human 함수로 생성된 객체 steve에 toString()이 실행된다. 왜?!

<img src="https://miro.medium.com/max/1400/1*QTI0vjIQx6Wbn30pD8Amww.png" alt="Prototype" width='300em'>

객체는 `__proto__` 속성을 통해 상위 프로토타입과 연결되어 있는데, 모든 객체는 결국 Object의 prototype object를 공유하고 있으며, 그 속성을 상속받는다. 이러한 연결을 **Prototype Chain**이라고 한다.

<img src="https://miro.medium.com/max/1400/1*HSp-wSe4sy16nT7BLffflQ.png" alt="Prototype Chain" width='500em'>

<img src="https://miro.medium.com/max/1400/1*vbuE4tBZntn-bDIntpJwKw.png" alt="Prototype Chain" width='100%'>

### prototype assign 하기!

prototype은 assign 될 수 있으므로, 한 constructor가 다른 constructor의 속성을 상속받게 할 수 있다.

- case ) sleep()을 할 수 있는 Human과, learn()을 할 수 있는 Student가 있다. 이 때, Student도 sleep()을 할 수 있게 하고싶다면?

**wrong.** Student.prototype = Human.prototype

![](https://miro.medium.com/max/1400/1*JfBDoKkyTAa9m7wLsr3zAA.png)

이 경우, Student는 sleep만 할 수 있게 된다.

---

**wrong.** Student.prototype = Human.prototype 한 상태에서, Student.prototype에 learn() 함수를 추가정의하면?

![](https://miro.medium.com/max/1400/1*wXgSWpeFheO-MnKszBSr9g.png)

이경우, Student는 필요조건을 만족하지만, 모든 Human이 learn 할 수 있게 되는 문제가 생긴다.

---

**★** Human.prototype을 바로 Student.prototype에 assign 하는 것이 아니라, 복사해오면 어떨까? 이때 쓸 수 있는 것이 Object.create() 이다!

![](https://miro.medium.com/max/1400/1*Ck1NHG8naImvdxAS8X-KPA.png)

하지만 이 경우, Human의 prototype을 모두 복사해 왔으므로, Student의 **constructor가 Student가 아닌 Human이 된다. 따라서, constructor를 Student라고 명시해 주는 추가 단계가 필요하다.!**

<img src="https://miro.medium.com/max/718/1*zA1HojSpOQCVPSJxQfmILA.png" alt="assign" width='350em'>

또한, new 키워드로 객체 생성 시, **instance마다 this가 각각 생기므로, this를 명시해줘야 properties가 제대로 상속된다.**

![](https://miro.medium.com/max/1400/1*vSht6JfLYEfhONhai000oQ.png)

드디어! prototype chain이 완성되었다!

<img src="https://miro.medium.com/max/498/1*HD_MMPAv55-XaWGU488vxg.png" alt="assign" width='250em'>

**덧붙여,** ES6 에서는 위의 복잡한 상속을 Class 와 Super 키워드로 간단하게 구현할 수 있게 되었다. Class와 Super 키워드에 대한 것은 coming soon!

## +헷갈렸던 개념

properties와 prototype은 다르다. properties는 new로 객체 생성 시, constructor가 실행하는 것.

<img src="https://miro.medium.com/max/706/1*1soVUcH2Tx7h9zb2GJ8Izw.png" alt="assign" width='350em'>

여기서 Grub.prototype에 age, color, food와 같은 properties 까지 있다고 생각하면 안된다. prototype에는 eat()만 추가시켜 주었다!

<img src="https://miro.medium.com/max/902/1*DdMD2k4Bm7T8LhulziT8yQ.png" alt="assign" width='450em'>
