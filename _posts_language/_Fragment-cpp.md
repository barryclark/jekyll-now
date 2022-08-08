---
layout: post
title: CPP *.inl
---

* TEnumAsByte는 레거시 코드에 대해서,

## C++에 "추상"에 대한 키워드가 있습니까?

[c-abstract-keyword](https://www.programmerinterview.com/c-cplusplus/c-abstract-keyword/)

아니요, C++는 추상 클래스를 설명하기 위해 abstract 키워드를 사용하지 않습니다. 그러나 C++에서 abstract 키워드를 사용하지 않는다고 해서 추상 클래스가 없는 것은 아닙니다. C++에서 추상 클래스는 순수 가상 함수 를 사용하여 생성됩니다.

## 

프로그래밍 언어는 다양한 패러다임으로 정의됩니다. 일부 언어는 하나의 패러다임을 지원하도록 설계되었지만 다른 프로그래밍 언어는 여러 패러다임(ex) object, Pascal, C++, Java, JavaScript, C#, ...)을 지원합니다. 예를 들어, C++은 순전히 절차 적이거나, 순전이 객체 지향이거나 둘다 또는 다른 패러다임을 포함할 수 있습니다. 소프트웨어 디자이너와 프로그래머는 이러한 패러다임 요소를 사용하는 방법을 결정합니다.

​

동시성과 병렬성(concurrency and parallel)

 


 동시성은 단일 코어가 한 작업에 약간의 시간을 할애하고 다른 작업에 시간을 할애합니다. 이것을 시간에 대해서 분할/겹침 기간이 있다고 부를 수 있습니다. 실제 병렬 처리는 여러 코어에서 여러 작업을 병렬로 실행하는 것을 의미합니다. 참고로 동시성은 더 넓은 용어이고 병렬성은 그 하위 집합입니다.

 실제 병렬 처리를 위해서는 전용 코어, 별도의 메모리 등이 필요한 이유로 더 많은 리소스를 사용합니다. 따라서 여기서 병렬처리가 아닌 동시성을 필요로 하게 됩니다. 동시성을 달성하기 위해서는 작은 논리 단위로 분할 하여 하나의 코어에서 동시적으로 처리되게 할 수 있습니다. 모든 동시 코드를 병렬로 실행하려고 하면 불필요하게 리소스가 고갈됩니다. 따라서 동시를 원하는지 병렬로 구현할 것인지 고민해야 합니다.

동시성(Concurrency)

병렬성(Parallel)

기본 정의

중첩 또는 시간 분할을 사용하여 동일한 코어에서 여러 작업을 실행

다른 코어에서 여러 작업을 실행

목표

리소스에 스트레스를 주지 않으면서 병렬 처럼 보이게

성능을 위한 실제 병렬 처리

관점

협동 방식으로 계산을 독립적으로 실행하는 구성

병렬 연산 실행

자원 활용

가벼움

무거움

* 병렬 처리는 동시성의 하위 집합입니다.

* 동시성은 병렬 처리를 가능하게 합니다.

* 동시성은 소프트웨어 설계에 관한 것이고 병렬 처리는 하드웨어에 관한 것입니다.

* 동시성은 병렬 처리의 환상을 주는 반면 병렬 처리는 성능에 관한 것입니다.

* 동시성은 하나의 코어만 필요하고 병렬 처리에는 최소 2개의 코어가 필요합니다.

​

동시 프로그래밍(concurrent programming)

 동시성은 서로 통신하는 프로그램의 여러 복사본이 동시에 실행될 때 발생합니다. 간단히 말하면, 동시성은 두 작업이 겹칠 때 입니다. 간단한 동시 응용 프로그램은 단일 기계를 사용하여 프로그램의 명령을 저장하지만 해당 프로세스는 여러 개의 서로 다른 스레드에 의해 실행됩니다. 이 설정은 각 스레드가 다음 스레드로 전달하기 전에 명령을 실행하는 일종의 제어 흐름을 생성합니다. 스레드는 독립적으로 작동하고 이전 스레드를 기반으로 결정을 내립니다. 그러나 동시성에서 구현하기 어렵게 만드는 몇 가지 문제가 발생할 수 있습니다.

 예를 들어 데이터 경쟁(data race)은 c++ 동시성 및 다중 스레드 프로세스에서 발생할 수 있는 일반적인 문제입니다. c++에서 데이터 경쟁은 최소 두 개의 스레드가 변수 또는 메모리 위치에 동시에 액세스 할 수 있고 해당 스레드 중 하나 이상이 해당 변수에 액세스하려고 할 때 발생합니다.

​


 동시성과 병렬성은 종종 혼동됩니다. 병렬 처리에서는 동일한 프로그램의 여러 복사본을 동시에 실행하지만 다른 데이터에서 실행됩니다. 예를 들어 병렬 처리를 사용하여 다른 웹 사이트에 요청을 보내지만 프로그램의 각 복사본에 다른 URL 집합을 제공할 수 있습니다. 이러한 복사본은 반드시 서로 통신할 필요는 없지만 동시에 병렬로 실행됩니다. 위에서 설명했듯이 동시 프로그래밍에는 공유 메모리 위치가 포함되며 다른 스레드는 실제로 이전 스레드에서 제공한 정보를 "읽습니다".

​


​

  c++에서 동시성을 구현하는 가장 일반적인 두 가지 방법은 멀티스레딩과 병렬 처리를 사용하는 것 입니다. 이것들은 다른 프로그래밍 언어에서 사용 될 수 있지만 c++는 평균보다 낮은 오버헤드 비용과 복잡한 명령을 위한 용량으로 동시 기능이 두드러집니다.

​

병렬 프로그래밍(parallel programming)

​

작업 병렬처리(task parallelism)

 전체 문제를 작은 독립된 동기화할 필요가 거의 없는 작업들로 나누어 처리하는 방식입니다. (1)몬테 카를로 시뮬레이션이 이러한 상황을 잘 설명합니다. 몬테 카를로 적분은 다른 것 입니다. 그러나 이 패러다임의 사용은 제한적입니다.

​

(1) 몬테 카를로 시뮬레이션은 무작위 난수를 뽑아서 ...

​

데이터 병렬 처리(data parallelism)

  어레이 등에서 루프를 분석하기 위해 다중 스레드에서 사용하는 방식 입니다. 프로세서 간의 통신 및 동기화는 종종 숨겨져 있어 프로그래밍하기 쉽습니다. 그러나 사용자는 전문 컴파일러에게 많은 제어를 넘겨줍니다. 데이터 병렬화의 예로는 컴파일러 기반 병렬화 및 OpenMP 지시문이 있습니다.

​

메세지 전달(message passing)

 관련된 모든 프로세서는 독립적인 메모리 주소 공간을 가집니다. 사용자는 글로벌 문제의 데이터 및 작업을 분할하고 하위 문제를 프로세서에 배포할 책임이 있습니다. 프로세서 간의 협업은 데이터 전송과 동기화에 사용되는 명시적 메시지 전달을 통해 이루어집니다.

​

벡터화(vectorization)

 여러 데이터 요소에서 병렬로 작동할 수 있는 단일 명령 스트림을 나타내는 (2)SIMD(single instructions multiple data)의 특수한 경우입니다. 벡터화는 SIMD 명령어와 함께 루프를 풀어내는 것으로 생각할 수 있습니다.

for (int i =0; i < n; i++)
    a[i] = b[i] + c[i];
(1) https://compphysics.github.io/ComputationalPhysics2/doc/LectureNotes/_build/html/vectorization.html

(2) SIMD(single instruction multiple data)는 병렬컴퓨팅의 한 종류로, 하나의 명령어로 여러 개의 값을 동시에 계산하는 방식입니다. 벡터 프로세서에서 많이 사용되는 방식으로, 비디오 게임 콘솔이나 그래픽 카드와 같은 멀티미디어 분야에 자주 사용됩니다.

​

행위자 프로그래밍(Actor programming)

 동시 프로그래밍과 함께 환경에 대응하여 지역적 결정을 내리는 행위자를 이용합니다.

​

제약 프로그래밍(Constraint programming)

 변수 간의 관계는 제약조건으로 표현되어 허용 가능한 솔류션을 지시합니다.

​

데이터 흐름 프로그래밍(Dataflow programming)

 데이터 값이 변경될 때 수식을 강제로 다시 계산하는 프로그래밍입니다.

​

선언적 프로그래밍(Declarative programming)

 명령형 프로그래밍을 참조하여 자세한 상태 변경을 지정하지 않고 계산이 수행해야 하는 작업을 설명합니다.

​

분산 프로그래밍(Distributed programming)

컴퓨터 네트워크를 통해 통신하는 여러 자율 컴퓨터를 지원하는 프로그래밍입니다.

​

함수형 프로그래밍(Functional programming)

수학 함수의 평가를 사용하고 상태 및 변경 가능한 데이터를 피합니다.

​

일반 프로그래밍(Generic programming)

매개변수로 제공된 특정 유형에 대해 필요에 따라 인스턴스화 되는 나중에 지정될 유형으로 작성된 알고리즘을 사용합니다.

​

명령형 프로그래밍(Imperative programming)

프로그램 상태를 변경하는 명시적 명령문 프로그래밍입니다.

​

논리 프로그래밍(Logic programming)

프로그래밍을 위해 명시적 수학적 논리를 사용하는 프로그래밍입니다.

​

메타 프로그래밍(Metaprogramming)

다른 프로그램을 데이터로 쓰거나 조작하는 프로그램 작성으로, 그렇지 않으면 런타임에 수행될 작업의 일부를 컴파일 시간에 수행합니다.

​

템플릿 메타 프로그래밍(Template meta programing)

컴파일러에서 템플릿을 사용하여 임시 소스 코드를 생성하고 컴파일러가 나머지 소스 코드와 병합한 다음 컴파일하는 메타 프로그래밍 방법입니다.

​

반사 프로그래밍(Reflective programming)

프로그램 자체적으로 수정하거나 확장하는 메타프로그래밍 방법입니다.

​

객체 지향 프로그래밍(Object-oriented programming)

프로그램을 설계하기 위해 상호 작용과 함께 데이터 필드 및 메서드로 구성된 데이터 구조를 사용합니다.

​

클래스 기반(Class-based)

객체 자체에 대한 클래스를 정의하여 상속을 달성하는 객체 지향 프로그래밍입니다.

​

프로토타입 기반(Prototype-based)

클래스를 피하고 인스턴스 복제를 통해 상속을 구현하는 객체 지향 프로그래밍입니다.

​

파이프라인 프로그래밍(Pipeline programming)

원래 없음으로 설계된 언어에 함수 호출을 중첩하는 구문을 추가하기 위한 간단한 구문 변경입니다.

​

규칙 기반 프로그래밍(Rule-based programming)

지식 기반을 구성하고 전문가 시스템과 문제 추론 및 해결에 사용할 수 있는 경험적 규칙 네트워크 프로그래밍입니다.

​

시각적 프로그래밍(Visual programming)

프로그램 요소를 텍스트로 지정하는 대신 그래픽으로 조작하는 프로그래밍으로 다이어그램 프로그래밍이라고도 합니다.

​

Data oriented programing

(1) https://www.dataorienteddesign.com/dodbook/node2.html

​

(1) programming paradigm https://en.wikipedia.org/wiki/Programming_paradigm


- [ ] 클래스와 구조체에서 extern 키워드
- [ ] 맴버함수에서 static 키워드

- [ ] 클래스와 구조체를 어떻게 만들어야 하는가?
- [ ] 언리얼 Using Structs 문서 참고
- [ ] [언리얼 엔진 4는 STL을 지원하지 않습니까?](https://www.gamedev.net/forums/topic/708066-unreal-engine-4-does-not-support-stl/5431473/)
- [ ] 맴버함수를 어떻게 만들어야 하는가?

- [ ] 코드를 어떻게 작성해야 하는가?

- [ ] STL과 언리얼 엔진에서 STL...
- [ ] TArray를 어떻게 대해야 하는가?

## 01 cast 01 암시적 명시적 형변환 implicit explicit cast.h
#pragma once

/*
	2021 11 26
	암시적 형변환		: 자동적으로 캐스팅 되는 것
	(자동적 형변환)
	명시적 형변환		: 프로그래머가 형변환을 직접 나타낸 것.
	(강제 형변환)
						  ex) (type)value
						  포인터의 경우 모든 타입에 대해 강제적인 형변환이 가능함.
	https://killu.tistory.com/24
*/
#include <cstdio>
namespace C17_implicit_explicit_cast
{
	void cast_test()
	{
		// 암시적 형변환 implicit cast

		char c = 0;
		short s = 0;
		int i = 0;
		long l = 0;
		float f = 0;
		double d = 0;
		unsigned int ui = 0;

		int long_to_int = l;		// int형으로 케스팅 됨.
		
		auto i_op_l = i + l;		// 나타낼수 있는 범위가 더큰 타입으로 캐스팅 됨.
		auto l_op_i = l + i;

		auto ui_op_i = ui + i;		// 타입과 unsigned 타입의 경우 unsigned 타입으로 캐스팅 됨.
		auto i_op_ui = i + ui;

		auto l_op_f = l + f;		// 정수와 실수의 경우 실수를 우선으로 캐스팅함.
		auto f_op_l = f + l;

		auto ui_op_f = ui + f;		// 같은 원리로 unsigned 타입과 실수의 경우 실수를 우선으로 캐스팅함.
		auto f_op_ui = f + ui;

		int by_l = l;				// 집어넣을 라는 변수의 타입이 다를 경우 왼쪽 변수의 타입으로 형변환됨

		short num1 = 10, num2 = 20; // 정수의 승격(Integral Promotion)'에 의한 자동 형 변환
		auto num_add = num1 + num2; // int형 크기보다 작은 자료형인 경우 CPU가 계산하기 편한 int형으로 형변환 됨.

		// 명시적 형변환 explicit cast

		auto int_by_l = (int)l; // l을 i로 명시적 형변환함

		// 포인터의 경우 모든 타입에 대해 강제적인 형변환이 가능함.
		// 설명 생략.
	}

	struct Cast_struct
	{
		Cast_struct() {}
		Cast_struct(int a) {}
	};
	Cast_struct operator+ (const Cast_struct& a, const int& b)
	{
		return b;
	}
	struct Empty_struct
	{
	};
	void s_cast_test()
	{
		// 자료형의 캐스팅

		int a = 0;
		Cast_struct A;
		
		A = (Cast_struct)a; // 생성자를 이용하여 형변환함.
							// 생성자가 없고, 형변환을 허용하지 않으면 캐스팅 자체가 되지 않음.

		Empty_struct* p_es;
		p_es = (Empty_struct*)(&a);	// 포인터의 경우 강제형변환이 가능함.
									// 어떤 타입으로든 캐스트가 가능하지만 안정성을 보장해주지 않음.

		Cast_struct B;
		B = (Cast_struct)a + 3;		// 다음식의 연산은 operator에 의해 이루어짐.

	}
}

## 01 cast 02 기본 형변환 default cast.h
#pragma once

/*
	2021 11 26
	static_cast			: 우리가 흔히 생각하는, 언어적 차원에서 지원하는 일반적인 타입 변환 일반적으로 업캐스팅
						  유도 클래스의 포인터 및 참조형 데이터를 기초 클래스의 포인터 및 참조형 데이터로 뿐만 아니라,
						  기초 클래스의 포인터 및 참조형 데이터도 유도 클래스의 포인터 및 참조형 데이터로
						  아무런 조건 없이 형 변환시켜주지만, 그에 대한 책임은 프로그래머가 져야 한다.
	dynamic_cast		: 파생 클래스 사이에서의 캐스팅
						  조건. 포인터 또는 참조이거나 void*이여야 한다.
						  조건. dynamic_cast를 사용할 자료형은 다형 클래스 형식이여야 한다.
						  컴파일 시간이 아닌 런타임에 안정성을 검사하도록 컴파일러가 바이너리 코드를 생성
	const_cast			: 객체의 상수성(const)를 없애는 타입 변환,
						  ex) const *int -> *int
						  const cast는 개체 형식에 대한 포인터, 참조, 맴버 포인터의 경우에만 가능함.
	reinterpret_cast	: 위험을 감수하고 하는 캐스팅으로 서로 관련이 없는 포인터들 사이의 캐스팅,
						  reinterpret_cast<new_type>(expression)
						  expression에 해당하는 것을 new_type으로 비트단위로 바꾸는 것 입니다.
						  조건. 포인터만 가능하다.
	https://musket-ade.tistory.com/entry/C-C-%ED%98%95-%EB%B3%80%ED%99%98-%EC%97%B0%EC%82%B0%EC%9E%90-staticcast-constcast-dynamiccast-reinterpretcast
	https://blockdmask.tistory.com/242
*/

namespace C17_default_cast
{
	// 부모 클래스
	class Parent
	{
	public:
		char parent[7] = "parent";
		// dynamic cast를 지원하기 위해서는 다형식 클래스여야한다.
		// 아닐 경우 컴파일 자체가 안된다.
		virtual ~Parent() = default;
	};
	// 자식 클래스
	class Child : public Parent // private으로 확장하는 경우
								// 형변환시 : 엑세스 할 수 없는 기본 클래스 ...으로 부터의 형변환은 허용하지 않는다.
								// 컴파일 자체가 안된다.
	{
	public:
		char child[6] = "child";
	};


	void cast_test()
	{
		Parent p;
		Child c;
		Parent* pp = &p;
		Child* pc = &c;

		//////
		// 부모에서 자식으로 형변환 (다운 캐스팅)
		// Parent -> Child

		// 정적 형변환의 경우
		// Child p_to_c_s = static_cast<Child>(p); // 형변환의 사용이 적절하지 않으므로 컴파일 자체가 안된다.

		// 동적 형변환의 경우
		// Child p_to_c_d = dynamic_cast<Child>(p); // 포인터, 참조, void*가 아니므로 컴파일 자체가 안된다.

		//////
		// 자식에서 부모로 형벼환 (업 캐스팅)
		// Child -> Parent

		// 정적 형변환의 경우
		Parent c_to_p_s = static_cast<Parent>(c);

		// 동적 형변환의 경우
		// Parent c_to_p_d = dynamic_cast<Parent>(c); // 포인터, 참조, void*가 아니므로 컴파일 자체가 안된다.

		//////
		// 부모 포인터에서 자식 포인터로 형변환 (다운 캐스팅)
		// Parent ptr -> Child ptr

		// 정적 형변환의 경우
		Child* pp_to_c_s = static_cast<Child*>(pp); // 되기는 하나 실제로 사용하면 오류를 발생시킨다. 
													//(정삭적으로 작동 할 수도 있으나, 불가능 한 것으로 생각해야함)

		// 동적 형변환의 경우
		Child* pp_to_c_d = dynamic_cast<Child*>(pp); // 캐스팅이 가능한 경우 nullptr이 아닌 값을 반환하고 불가능 하다면 nullptr을 반환한다.

		//////
		// 자식 포인터에서 부모 포인터로 형변환 (업 캐스팅)
		// Child ptr -> Parent ptr

		// 정적 형변환의 경우
		Parent* pc_to_p_s = static_cast<Parent*>(pc); // 가능

		// 동적 형변환의 경우
		Parent* pc_to_p_d = dynamic_cast<Parent*>(pc); // 가능


		//////
		// const cast

		const int const_int = 3;
		//const_cast<int>(const_int) = 3;			// const cast는 개체 형식에 대한 포인터, 참조, 맴버 포인터의 경우에만 가능함.
		(*const_cast<int*>(&const_int)) = 3;

		//////
		// reinterpret cast
		int rint = 3;
		float* prfloat = reinterpret_cast<float*>(&rint);
	}
}

## 01 cast 03 크로스 형변환 cross cast.h
#pragma once

/*
	2021 11 26
	// 개념적인 의미
	cross cast (side cast)	: Left -> Right, 또는 반대의 상황에서 dynamic_cast를 하는 경우를 말함.
							  크로스캐스트는 reinterpret_cast또는 static_cast가 아닌 dynamic_cast에서만 작동
							  최상위 부모 클래스의 상속이 전부 virtual면 다이아몬드 상황에서도 바로 최상위 부모 클래스로 캐스트 가능함.
	https://stackoverflow.com/questions/35959921/what-is-side-cast-or-cross-cast-in-dynamic-cast-in-c/51669399
*/

namespace C17_cross_cast
{
	class Parent
	{
	public:
		virtual ~Parent() {}
		char parent[7] = { "parent" };
	};
	class Left : public Parent
	{
	public:
		char left[5] = { "left" };
	};
	class Right : public Parent
	{
	public:
		char right[6] = { "right" };
	};
	/// <summary>
	/// 다이아몬드 상속의 상황에서
	/// </summary>
	class Child : public Left, public Right
	{
		char child[6] = { "child" };
	};
	class Right2
	{
	public:
		virtual ~Right2() {}
		char right[6] = { "right" };
	};
	/// <summary>
	/// 중복없는 다중상속 상황에서
	/// </summary>
	class Child2 : public Left, public Right2
	{
		char child[6] = { "child" };
	};

	void cross_cast_test()
	{
		// 중복없는 다중 상속 상황에서
		{
			Child2 child;
			Child2* p_child = &child;
			Parent* p_parent_by_child = dynamic_cast<Parent*>(p_child);

			Left* p_left = dynamic_cast<Left*>(p_child);
			Parent* p_parent_by_left = dynamic_cast<Parent*>(p_left);

			Right2* p_right = dynamic_cast<Right2*>(p_child);

			// cross cast
			Right2* p_right_by_left = dynamic_cast<Right2*>(p_left);
			Left* p_left_by_right = dynamic_cast<Left*>(p_right);
			// 문제없이 cross cast가 작동한다.
		}

		// 다이아몬드 상속 상황에서
		{
			Child child;
			Child* p_child = &child;
			// Parent* p_parent_by_child = dynamic_cast<Parent*>(p_child); // Parent가 두개기 때문에 모호하다는 이유로 컴파일 자체가 불가능하다.
																		   // Parent로 캐스팅 하기 위해서는 Left와 Right중 하나를 골라야 한다.
			Left* p_left = dynamic_cast<Left*>(p_child);
			Parent* p_parent_by_left = dynamic_cast<Parent*>(p_left);

			Right* p_right = dynamic_cast<Right*>(p_child);
			Parent* p_parent_by_right = dynamic_cast<Parent*>(p_right);

			// cross cast
			Right* p_right_by_left = dynamic_cast<Right*>(p_left);
			Right* p_right_by_left_parent = dynamic_cast<Right*>(p_parent_by_left);
			Left* p_left_by_right = dynamic_cast<Left*>(p_right);
			Left* p_left_by_right_parent = dynamic_cast<Left*>(p_parent_by_right);
			// 문제없이 cross cast가 작동한다.
		}
	}
}

## 01 lambda 00 람다.h

#pragma once

/*
	
	람다
	https://docs.microsoft.com/ko-kr/cpp/cpp/lambda-expressions-in-cpp?view=msvc-170
	[] () keyward exception-specification() -> trailing-return-type
*/
namespace c17_lambda
{
	struct S { void lambda_test(int i) ; };
	void S::lambda_test(int i)
	{
		/*
		    []          : 아무것도 캡쳐 안함
		    [&a, b]     : a 는 레퍼런스로 캡쳐하고 b 는 (변경 불가능한) 복사본으로 캡쳐
		    [&]         : 외부의 모든 변수들을 레퍼런스로 캡쳐
		    [=]         : 외부의 모든 변수들을 복사본으로 캡쳐
		    [a = 3]     : a 를 3으로 초기화 하고 갈무리 저장
		*/

		[&, i] {}; // ok
		//[&, &i] {}; // error &에는 &i가 포함돔
		//[=, this] {}; // error =에서는 this를 사용할 수 없음. this가 이미 복사되었기 때문.
		[=, *this] {}; // ok, S를 복사해서 보내는 것임.
		//[i, i] {}; // error i가 중복됨
		//[this] {};
	}

	struct K { void lambda_test(int i); };
	void K::lambda_test(int i)
	{
		/*
			C++14에서 매개 변수 형식이 제네릭인 경우 키워드를 형식 지정자로 사용할 수 auto 있습니다.
			이 키워드는 함수 호출 연산자를 템플릿으로 만들도록 컴파일러에 지시합니다. 매개 변수 목록의 
			각 auto 인스턴스는 고유 형식 매개 변수와 동일합니다.
			템플릿처럼 반환형식에 따라 만들도록 지시 가능.
		*/
		auto i = [](auto a) {};
	}

	struct N { void lambda_test(int i); };
	void N::lambda_test(int i)
	{
		/*
		
		*/
		auto i = [i]() { /*i = 3;*/ }; // i는 constant처럼 사용됨.
		auto j = [i]() mutable { i = 3; }; // mutable을 이용하여 캡쳐 절을 변경 가능함.

		/*
			lambda를 constepr함수처럼 사용할 수 있음.
		*/
		auto l = [i]() constexpr -> int { return 5; };
		constexpr int m = l();
	}

	struct R { void lambda_test(int i); };
	void R::lambda_test(int i)
	{
		/*
		*/
		auto j = [i]() noexcept { throw 5; }; // 되기는 하나 경고 생성
		//auto k = [i]() throw(int) { throw 5; }; // int형 오류 throw 정확히 무슨 의미인지 잘 모르겠음.
	}
}

## 01 literal 00 리터럴 literal.h

#pragma once

/*
	2021 11 27
	literal
		literal constant : 코드에 직접 삽입된 값, 이 값은 변경할 수 없으므로 상수이다.
		unsigned int			:	u(U)
		long					:	l(L)
		unsigned long			:	ul(uL, Ul, UL, lu, lU, Lu, LU)
		long long				:	ll(LL)
		unsinged long long		:	ull(uLL, Ull, ULL, llum llUm LLu, LLU)
		float					:	f(F)
		double					:	l(L)
	
		char					:	'a'
		const char*				:	"abs"
		
		base10(decimal)			:	0, 1, 2, ...
		base2(binary)			:	0b0, 0b1, 0b10, ....
		base8(octal)			:	00, 01, 02, ... 07, 010, ...
		base16(hexadecimal)		:	0x0, 0x1, 0x2, ... 0xF, 0x10, ...
	리터럴 연산자 오버라이드
*/
namespace c17_literal
{
	// literal constant
	bool Bool = true;
	int x = 3;

	float f = 3.14f; // float literal

	double pi = 3.141592; // double literal
	double avogadro = 6.02e23; // 6.02 x 10^23

	// 문자와 문자열 리터럴
	char c = 'c';
	auto cs = "abs";

	// 진수 리터럴
	int binary = 0b10; // 0b0 0b1 0b10 0b11 0b100
	int decimal = 10;
	int octal = 010;	// 00, 
	int hexadecimal = 0x10;   // 
}

## 01 literal 01 유저 정의 리터럴 user-defined literals.h
#pragma once

#include <string>
/*
	User-defined literals
	https://en.cppreference.com/w/cpp/language/user_literal
*/
namespace c17_literal_operator_override
{
	int operator""custom_operator(unsigned long long literal)
	{
		return -1;
	}
	// 반환형에 따라 허용되는 입력형이 있음.
	//int operator""custom_operator(int a)
	//{
	//}

	std::string operator""custom_string(const char* pc, size_t s)
	{
		return std::string(pc, s);
	}

	void literal_operaotr_override()
	{
		int num = 32custom_operator;
		std::string str = "Ar"custom_string;
		//std::string str2 = custom_string"Ar"; 반대로 하는 것은 안됨..
	}
}

## 01 유니폼 초기화 Uniform Initialization.h
#pragma once

#include <iostream>
class A {
public:
	A() { std::cout << "A 의 생성자 호출!" << std::endl; }
	A(int a) {}
};
class B {
public:
	B(A a) { std::cout << "B 의 생성자 호출!" << std::endl; }
	B(A a, int c) {}
};
void test_uniform() {
	//A a(); // ? -> 아무것도 출력하지 않음.. 객체 a를 만드는 것이 아니라 함수의 정의처럼 보이기 때문에, 함수의 정의라고 생각함.
	//A a(3); // 이 경우에는 객체를 생성함...

	//// 중괄호 초기화로 해결 가능..
	//A aa{}; // 이제 객체를 생성함.
	//B b(A()); // 뭐가 출력될까요? // 골때리눼에
	//B b{A()};
	//B b(A(), 3); // 이 경우에도 객체를 생성함...

	// 다만 중괄호 생성자는 일부 암시적 형변환을 허용하지 않음.
	//		전부 데이터 손실이 있는 경우들을 말함.
	//		부동 소수점 타입에서 정수 타입으로의 변환
	//		long double에서 double혹은 float으로의 변환, double에서 float으로의 변환
	//		정수 타입에서 부동 소수점 타입으로의 변환

	using namespace std::literals;
	auto list = { "m"s, ""s }; // 이렇게 해줘야 string형 initializer_list를 사용하는 구나..
}

## 01 유니폼 초기화 Uniform Initialization.h
#pragma once

#include <iostream>
class A {
public:
	A() { std::cout << "A 의 생성자 호출!" << std::endl; }
	A(int a) {}
};
class B {
public:
	B(A a) { std::cout << "B 의 생성자 호출!" << std::endl; }
	B(A a, int c) {}
};
void test_uniform() {
	//A a(); // ? -> 아무것도 출력하지 않음.. 객체 a를 만드는 것이 아니라 함수의 정의처럼 보이기 때문에, 함수의 정의라고 생각함.
	//A a(3); // 이 경우에는 객체를 생성함...

	//// 중괄호 초기화로 해결 가능..
	//A aa{}; // 이제 객체를 생성함.
	//B b(A()); // 뭐가 출력될까요? // 골때리눼에
	//B b{A()};
	//B b(A(), 3); // 이 경우에도 객체를 생성함...

	// 다만 중괄호 생성자는 일부 암시적 형변환을 허용하지 않음.
	//		전부 데이터 손실이 있는 경우들을 말함.
	//		부동 소수점 타입에서 정수 타입으로의 변환
	//		long double에서 double혹은 float으로의 변환, double에서 float으로의 변환
	//		정수 타입에서 부동 소수점 타입으로의 변환

	using namespace std::literals;
	auto list = { "m"s, ""s }; // 이렇게 해줘야 string형 initializer_list를 사용하는 구나..
}

## 01 유니폼 초기화 Uniform Initialization.h
#pragma once

#include <iostream>
class A {
public:
	A() { std::cout << "A 의 생성자 호출!" << std::endl; }
	A(int a) {}
};
class B {
public:
	B(A a) { std::cout << "B 의 생성자 호출!" << std::endl; }
	B(A a, int c) {}
};
void test_uniform() {
	//A a(); // ? -> 아무것도 출력하지 않음.. 객체 a를 만드는 것이 아니라 함수의 정의처럼 보이기 때문에, 함수의 정의라고 생각함.
	//A a(3); // 이 경우에는 객체를 생성함...

	//// 중괄호 초기화로 해결 가능..
	//A aa{}; // 이제 객체를 생성함.
	//B b(A()); // 뭐가 출력될까요? // 골때리눼에
	//B b{A()};
	//B b(A(), 3); // 이 경우에도 객체를 생성함...

	// 다만 중괄호 생성자는 일부 암시적 형변환을 허용하지 않음.
	//		전부 데이터 손실이 있는 경우들을 말함.
	//		부동 소수점 타입에서 정수 타입으로의 변환
	//		long double에서 double혹은 float으로의 변환, double에서 float으로의 변환
	//		정수 타입에서 부동 소수점 타입으로의 변환

	using namespace std::literals;
	auto list = { "m"s, ""s }; // 이렇게 해줘야 string형 initializer_list를 사용하는 구나..
}

## 02 스텐다드 라이브러리 Standard library.h
#pragma once

/*
	STL
	std::vector
	std::list
	std::deque
C++ 표준 템플릿 라이브러리 개요
시퀀스 컨테이너(sequence container)
반복자 (iterator)
범위 기반 for 문 (Range-based for loop)
*/

/*
컴퓨터 공학에선 어떠한 작업의 처리 속도를 복잡도(complexity) 라고 부르고, 
그 복잡도를 Big OO 표기법이라는 것으로 나타냅니다. 이 표기법은, NN 개의 데이터가 주어져 있을 때 
그 작업을 수행하기 위해 몇 번의 작업을 필요로 하는지 NN 에 대한 식으로 표현하는 방식입니다. 
(즉 복잡도가 클 수록 작업이 수행되는데 걸리는 시간이 늘어나겠지요)
https://modoocode.com/223
vector 에서 지원하는 반복자로 const_iterator 가 있습니다. 
이는 마치 const 포인터를 생각하시면 됩니다. 
즉, const_iterator 의 경우 가리키고 있는 원소의 값을 바꿀 수 없습니다. 
// 이걸 몰라서 그 고생을 했나?
bool operator<(const Todo& t) const {
  if (priority == t.priority) {
	return job_desc < t.job_desc;
  }
  return priority > t.priority;
}
// 정리에서 사용하는 operator의 개념은 작은게 앞에오도록,
// 이를 활용할 때는 앞에오고 싶은게 true를 반환하도록.
*/

## 알고리즘
	#pragma once

/*
참고로 sort 에 들어가는 반복자의 경우 반드시 
임의접근 반복자(RandomAccessIterator) 타입을 만족해야 하므로, 
우리가 봐왔던 컨테이너들 중에선 벡터와 데크만 가능하고 
나머지 컨테이너는 sort 함수를 적용할 수 없습니다. 
(예를 들어 리스트의 경우 반복자 타입이 양방향 반복자(BidirectionalIterator) 이므로 안됩니다)
list<int> l;
sort(l.begin(), l.end());
*/

#include <algorithm>
#include <iostream>
#include <vector>

namespace Test
{
    template <typename Iter>
    void print(Iter begin, Iter end)
    {
        while (begin != end) {
            std::cout << *begin << " ";
            begin++;
        }
        std::cout << std::endl;
    }
    struct int_compare
    {
        bool operator()(const int& a, const int& b) const { return a > b; }
    };
    void solve() {
        std::vector<int> vec;
        vec.push_back(5);
        vec.push_back(3);
        vec.push_back(1);
        vec.push_back(6);
        vec.push_back(4);
        vec.push_back(7);
        vec.push_back(2);

        std::cout << "정렬 전 ----" << std::endl;
        print(vec.begin(), vec.end());
        std::sort(vec.begin(), vec.end(), int_compare());
        // a > b이므로 a 가 더클 때 앞에 온다
        // 큰 순서대로 내려오는 것을 내림차순이라 한다.
        std::cout << "정렬 후 ----" << std::endl;
        print(vec.begin(), vec.end());
    }
}

namespace Partial_sort
{
    void solve()
    {
        std::vector<int> vec = { 5, 3, 1, 6, 4, 7, 2 };
        std::partial_sort(vec.begin(), vec.begin() + 3, vec.end());
        // [start, end) 원소들 중에서
        // [start, middle)까지 원소들이 전체 원소들 중에서 제장 작은 애들 순으로 정렬,
        // 5, 3, 1, 6, 4, 7, 2
        // 1, 2, 3 ...
        // 앞의 3곳에 가작 작은 녀석들을 넣게됨.
        /*
        만약에 우리가 전체 배열을 정렬할 필요가 없을 경우, 
        예를 들어서 100 명의 학생 중에서 상위 10 명의 학생의 성적순을 보고 싶다,
        이런 식이면 굳이 sort 로 전체를 정렬 할 필요 없이 
        partial_sort 로 10 개만 정렬 하는 것이 더 빠르게 됩니다.
        */
    }
}

namespace Stable_sort
{
    /*
    
    sort 함수의 경우 정렬 과정에서 원소들 간의 상대적 위치를 랜덤하게 바꿔버리지만 
    stable_sort 의 경우 그 순서를 처음에 넣었던 상태 그대로 유지함을 알 수 있습니다.
    당연히도 이러한 제약 조건 때문에 stable_sort 는 그냥 sort 보다 좀 더 오래걸립니다. 
    C++ 표준에 따르면 sort 함수는 최악의 경우에서도 O(n log n) 이 보장되지만 stable_sort 
    의 경우 최악의 경우에서 O(n (log n)^2) 으로 작동하게 됩니다. 조금 더 느린 편이지요.
    // 그냥 입력 순서를 유지하면서 정렬한다는 뜻, 그게 그말인가??
    */
}

namespace Remove_if
{
    struct is_odd {
        int num_delete;

        is_odd() : num_delete(0) {}

        bool operator()(const int& i) {
            if (num_delete >= 2) return false;

            if (i % 2 == 1) {
                num_delete++;
                return true;
            }

            return false;
        }
        // 오류 날 수 있음. num_delete를 외부로 빼던가 해야함.
    };

    void solve()
    {
        std::vector<int> vec = { 5, 3, 1, 6, 4, 7, 2 };
        //vec.erase(remove(vec.begin(), vec.end(), 3), vec.end());
        
        int num_erased = 1;
        vec.erase(std::remove_if(vec.begin(), vec.end(), [&num_erased](const int& val) -> bool
            { 
                return val == 4 || val == 2; 
            }),
            vec.end());

        // remove나 remove_if는 실제로 지우는 작업을 하지 않는다. 대신 뒤로 지워질 값을 이동시키고, 지워져야 되는 부분의 시작 iterator를 반환한다.

        vec.erase(std::remove_if(vec.begin(), vec.end(), is_odd()),
            vec.end());
        // 클래스 호출 로 전달하면 맴버 변수를 사용 할 수 있게 된다.
        /*
        사실 C++ 표준에 따르면 remove_if 에 전달되는 함수 객체의 경우 이전의 호출에 의해 내부 상태가 달라지면 안됩니다. 
        다시 말해, 위 처럼 함수 객체 안에 인스턴스 변수 (num_delete) 를 넣는 것은 원칙상 안된다는 것이지요.
        그 이유는 remove_if 를 실제로 구현 했을 때, 해당 함수 객체가 여러번 복사 될 수 있기 때문입니다. 
        물론, 이는 어떻게 구현하냐에 따라서 달라집니다. 예를 들어 아래 버전을 살펴볼까요.
        다시 한 번 말하자면, 함수 객체에는 절대로 특정 상태를 저장해서 이에 따라 결과가 달라지는 루틴을 짜면 안됩니다.
        위 처럼 이해하기 힘든 오류가 발생할 수 도 있습니다.
        */

        // 더 간단하게 클래스 생성하지 말고 람다함수로 처리하자.

    }

    class SomeClass {
        std::vector<int> vec;

        int num_erased;

    public:
        SomeClass() {
            vec.push_back(5);
            vec.push_back(3);
            vec.push_back(1);
            vec.push_back(2);
            vec.push_back(3);
            vec.push_back(4);

            num_erased = 1;

            //&num_erased하면 스택에서 num_erased의 정의를 찾는다. 이런 경우
            // this를 해주면 맴버변수에 접근할 수 있게 된다.
            vec.erase(std::remove_if(vec.begin(), vec.end(),
                [this, dividor = 2](int i) {
                    if (num_erased >= 2)
                        return false;
                    else if (i % dividor == 1) {
                        num_erased++;
                        return true;
                    }
                    return false;
                }),
                vec.end());

            /*
                []          : 아무것도 캡쳐 안함
                [&a, b]     : a 는 레퍼런스로 캡쳐하고 b 는 (변경 불가능한) 복사본으로 캡쳐
                [&]         : 외부의 모든 변수들을 레퍼런스로 캡쳐
                [=]         : 외부의 모든 변수들을 복사본으로 캡쳐
                [a = 3]     : a 를 3으로 초기화 하고 갈무리 저장
            */
        }
    };
}

#include <algorithm>
#include <functional>
#include <iostream>
#include <string>
#include <vector>

namespace transform
{
    template <typename Iter>
    void print(Iter begin, Iter end) {
        while (begin != end) {
            std::cout << "[" << *begin << "] ";
            begin++;
        }
        std::cout << std::endl;
    }

    void transform_solve() {
        std::vector<int> vec;
        vec.push_back(5);
        vec.push_back(3);
        vec.push_back(1);
        vec.push_back(2);
        vec.push_back(3);
        vec.push_back(4);

        // vec2 에는 6 개의 0 으로 초기화 한다.
        std::vector<int> vec2(6, 0);

        std::cout << "처음 vec 과 vec2 상태 ------" << std::endl;
        print(vec.begin(), vec.end());
        print(vec2.begin(), vec2.end());

        std::cout << "vec 전체에 1 을 더한 것을 vec2 에 저장 -- " << std::endl;
        std::transform(vec.begin(), vec.end(), vec2.begin(),
            [](int i) { return i + 1; });
        print(vec.begin(), vec.end());
        print(vec2.begin(), vec2.end());

        // 조금이라도 빨리, 조금이라도 쉽게 쓰면 이득인가,,
    }
}

## Computer Science
#pragma once

/*
	https://sckllo7.tistory.com/entry/32bit%EC%99%80-64bit%EC%9D%98-C-%EC%9E%90%EB%A3%8C%ED%98%95Data-Type-%ED%81%AC%EA%B8%B0-%EC%B0%A8%EC%9D%B4
	---------------------------------------------------------------------------------------------
	 CPU 와 컴퓨터 메모리인 RAM 은 물리적으로 떨어져 있습니다. 따라서 CPU 가 메모리
	에서 데이터를 읽어 오기 위해서는 꽤 많은 시간이 걸립니다. 실제로, 인텔의 i7-6700 CPU 의 경우
	최소 42 사이클 정도 걸린다고 보시면 됩니다. CPU 에서 덧셈 한 번을 1 사이클에 끝낼 수 있는데,
	메모리에서 데이터 오는 것을 기다리느라, 42 번 덧셈을 연산할 시간을 놓치게 되는 것
	이는 CPU 입장에 굉장한 손해가 아닐 수 없습니다. 메모리에서 데이터 한 번 읽을 때 마다 42 사이클
	동안 아무것도 못한다니 말입니다
	---------------------------------------------------------------------------------------------
	 따라서 CPU 개발자들은, 이를 보완하기 위해 캐시(Cache) 라는 것을 도입하였습니다. 캐시란,
	CPU 칩 안에 있는 조그마한 메모리라고 보시면 됩니다. 여기서 중요한 점은 램과는 다르게 CPU
	에서 연산을 수행하는 부분이랑 거의 붙어 있다 싶이 해서, 읽기 / 쓰기 속도가 매우 빠르다는 점입
	니다.
	 CPU 가 특정한 주소에 있는 데이터에 접근하려 한다면, 일단 캐시에 있는지 확인한 후, 캐시에
	있다면 해당 값을 읽고, 없다면 메모리 까지 갔다 오는 방식으로 진행됩니다. 이렇게 캐시에 있는
	데이터를 다시 요청해서 시간을 절약하는 것을 Cache hit 이라과 하며 반대로 캐시에 요청한 데이
	터가 없어서 메모리 까지 갔다 오는 것을 Cache miss 라고 부릅니다.
	• 메모리를 읽으면 일단 캐시에 저장해놓는다.
	• 만일 캐시가 다 찼다면 특정한 방식에 따라 처리한다.
	 이 때 여기서 말하는 특정한 방식 은 CPU 마다 다른데, 대표적인 예로 가장 이전에 쓴(LRU - Least
	Recently Used) 캐시를 날려버리고 그 자리에 새로운 캐시를 기록하는 방식이 있습니다. 이 LRU
	방식의 가장 큰 특징으로는, 최근에 접근한 데이터를 자주 반복해서 접근한다면 매우 유리하다는
	점이 있습니다.
	
	CPU register(16b) -42- RAM(4gb)
	>>>
	CPU register(16b) -1- Cache(1kb) -42- RAM(4gb)
	#안의 숫자는 위의 예시들이다. 기기마다 다르다.
	---------------------------------------------------------------------------------------------
	for (int i = 0; i < 1000; i++) {
		for (int j = 0; j < 10000; j++) {
			s += data[j];
		}
	}
	for (int j = 0; j < 10000; i++) {
		for (int i = 0; i < 10000; i++) {
			s += data[j];
		}
	}
	무엇이 더 빠른가?
	 답은 두 번째 방식입니다. 왜냐하면 첫 번째 경우에서 data[0] 를 접근하는 것을 생각해봅시다.
	일단 첫 번째 루프에서 data[0] 는 캐시에 들어가게 됩니다. 하지만, CPU 캐시가 매우 작기
	때문에 j = 256 이 되었을 때 data[0] 는 캐시에서 사라지게 되지요 (1KB = 1024 byte = int
	256 개).
	따라서 i = 1 인 루프에서 data[0] 에 다시 접근했을 때 이미 data[0] 는 캐시에서 사라진
	이후기에 Cache Miss 가 발생하게 됩니다. 따지고 보면 data 원소의 모든 접근이 Cache Miss 가
	되서 느리겠지요.
	반면에 후자의 경우 data[0] 을 10000 번 연속으로 접근하므로, 처음에 접근할 때 빼고 나머지
	9999 번 접근이 Cache hit 이 되어서 빠르게 덧셈을 수행할 수 있게 됩니다.
	캐시에 대해서는 이 정도로 줄이겠습니다. 사실 캐시에 대해서만 이야기해도 한 보따리는 풀 수
	있지만, 이는 나중에 컴퓨터 시스템에 관한 강좌를 하게 되면다면 더 깊게 다루도록 하겠습니다.
	간단하게 보여주면,
	1번 : data[0], data[1], data[2], ...
	2번 : data[0], data[0], ... data[0], data[1], ...
	2번 방식이 더 빠르다.
*/

## 완벽전달
#pragma once

/*
	
*/
#include <iostream>
#include <string>
namespace c17_move_forward
{
	struct S
	{
		S() = default;
		S(const S& rhs) { /*복사 생성자*/ };
		S(S&& rhs) { /*이동 연산자*/ };
	};

	struct test_struct
	{
		std::string str;
		test_struct(const std::string& s) : str(s)
		{
			std::cout << "기본 생성자" << std::endl;
		}
		test_struct(const test_struct& rhs)
		{
			std::cout << "복사 생성자" << std::endl;
			str = rhs.str;
		}
		test_struct(test_struct&& rhs) noexcept
		{
			std::cout << "이동 생성자" << std::endl;
			str.swap(rhs.str);
		}

		void swap(test_struct& b)
		{
			std::cout << "문자열을 생성함" << std::endl;
			std::string temp = this->str;
			str = b.str;
			b.str = temp;
		}
		void move_swap(test_struct& b)
		{
			std::cout << "문자열의 ref만 바꿈" << std::endl;
			std::string temp = std::move(this->str);
			str = b.str;
			b.str = temp;
		}
	};

	void move_forward_test()
	{
		/*
			l-value		: 왼쪽과 오른쪽 둘다 올 수 있다.
			r-value		: 오른쪽만 가능하다.
		*/


		// C++11 부터 좌측값을 우측값으로 바꾸어주는 move함수를 제공
		// move는 어떠한 일도 하지않고 형변환만 수행한다.
		// 즉 어떠한 바이트코드도 연산도 수행하지 않는다.

		int a = 3;					// 좌측값에 3이라는 리터럴을 할당했다.
		int&& b = std::move(a);		// std::move를 통하여 좌측값을 우측값으로 변환해서 반환

		auto lambda = []() { return 1; };
		int&& c = lambda();			// 이렇게 rhs를 좌측값에 저장하지 않고, 수명을 연장시킬 수 있다.

		/*
		
			이동생성자가 반드시 빠르게 아니라는 점을 기억하자.
			
			1. 만들어진 새로운 데이터 안에 동적할당 및 복사를 하지 않고,
			데이터 안에 레퍼런스를 옮기는 등의 작업만을 수행하도록
			최적화 했기 때문에 빠름.
			
		*/

		{
			std::cout << "test_struct s;" << std::endl;
			std::cout << "test_struct new_s = construct_only_copy(s);" << std::endl;
			test_struct s("string");
			test_struct other("other");
			
			s.swap(other);
			s.move_swap(other);

			/*
			
				복사하여 옮기는 경우 임시로 문자열을 저장할 객체를 생성하게 되지만
				단순하게 옮기는 목적이라면, 문자열을 가리키는 포인터만 옮기는 것으로 최적화가 가능하다.
				다만 이렇게 포인터를 옮기는 방식으로 인해 원치 않는 문제가 발생 할 수 있다.
			
				이동생성자나 이동 대입 연산자를 호출할 때 이동이 수행되는 것이지
				std::move를 호출한다고 이동이 되는 것은 아니다.
			*/
		}
	}


	template <typename T>
	void wrapper(T u) {
		g(u);
	}
	template <typename T>
	void ref_wrapper(T& u) {
		g(u);
	}
	template <typename T>
	void universal_wrapper(T&& u) {
		g(u);
	}
	template <typename T>
	void perfect_wrapper(T&& u) {
		g(std::forward<T>(u));
	}
	struct A { int a; };
	void g(A& a)		{ std::cout << "좌측값 레퍼런스 호출" << std::endl; }
	void g(const A& a)	{ std::cout << "좌측값 상수 레퍼런스 호출" << std::endl; }
	void g(A&& a)		{ std::cout << "우측값 레퍼런스 호출" << std::endl; }
	void perfect_forwarding() 
	{
		A a;
		const A ca;
		std::cout << "원본 --------" << std::endl;
		g(a);
		g(ca);
		g(A());
		A&& rra = A();
		rra.a = 3; // 값을 바꿀 수 있음. 우측값이지만 좌측값 처럼 처리되는 이유가 있다고 봄.
		g(rra);
		std::cout << "Wrapper -----" << std::endl;
		wrapper(a);
		wrapper(ca);
		wrapper(A());
		/*
			원본 --------
			좌측값 레퍼런스 호출
			좌측값 상수 레퍼런스 호출
			우측값 레퍼런스 호출
			Wrapper -----
			좌측값 레퍼런스 호출
			좌측값 레퍼런스 호출
			좌측값 레퍼런스 호출
			위의 경우 전부 좌측값만을 받도록 설계되었다.
			어째서 인가?
			템플릿 인자 T가 레퍼런스가 아닌 일반적인 타입이라면 const를 무시한다.
			즉 T 가 전부 다 class A 로 추론됩니다.
			따라서 위 세 경우 전부 다 좌측값 레퍼런스를 호출하는 g 를 호출하였습니다.
			그렇다고 warp를 &참조자를 붙이면 A()의 경우 오류를 발생한다.
			이를 해결하기 위해,
			T&, constT&의 모든 경우를 만들기란 굉장히 번거로운 일이다.
			인자가 2개만 넘어가도 4가지 경우의 수가 생긴다.
			이를 해결하기 위해 보편참조(universal reference)를 활용한다.
		*/

		std::cout << "ref Wrapper -----" << std::endl;
		ref_wrapper(a);
		ref_wrapper(ca);
		//ref_wrapper(A()); error

		std::cout << "universal Wrapper -----" << std::endl;
		universal_wrapper(a);
		universal_wrapper(ca);
		universal_wrapper(A());

		std::cout << "perfect Wrapper -----" << std::endl;
		perfect_wrapper(a);
		perfect_wrapper(ca);
		perfect_wrapper(A()); // 단순하게 A로 추론된다. 왜지?
		/*
			좌측값 레퍼런스 호출
			좌측값 상수 레퍼런스 호출
			우측값 레퍼런스 호출
			
			보편참조는 우측값 레퍼런스와 다르게
			template또는 auto에서만 가능하다.
			왼값이면 왼값 참조로, 오른값이면 오른값 참조를 한다.
			C++ 11 에서는 다음과 같은 레퍼런스 겹침 규칙 (reference collapsing rule) 에 따라 T 의 타입을 추론
			& == 1, && == 0 일때 OR연산과 같다.
			&	&		1		&
			&	&&		1		&
			&&	&		1		&
			&&	&&		0		&&
			템플릿타입		|	인자타입	|	추론형식	|	인자형식				|	컴파일 결과
			T				|	A(lv)		|	A			|	A						|	ok : 다만 매번 복사가 이루어짐
			T				|	const A		|	A			|	A						|	ok : 템플릿에서는 참조자가 아닌 경우 const속성이 무시됨.
			T				|	A(rv)		|	A			|	A						|	ok
			T&				|	A(lv)		|	A			|	A&						|	ok
			T&				|	const A		|	const A		|	const A&				|	ok
			T&				|	A(rv)		|	A			|	A&						|	error : rv를 lv ref에 참조할 수 없음.
			
			T&&				|	A(lv)		|	A&			|	A& &&			A&		|	ok
			T&&				|	const A		|	const A&	|	const A& &&		A&		|	ok
			T&&				|	A(rv)		|	A			|	A&&						|	ok : 놀랍게도, 우측값 참조를 집어넣으면 좌측값 레퍼런스를 호출한다. 우측값이 좌측값으로 처리된다.
																								 1) & && -> & 때문인건지 부정확함. 
																								 2) 우측값 참조가 좌측값이기 때문인지 부정확함
			따라서 우측값인 경우 우측값을 전달하기 위해서는 std::forward를 사용해줘야 한다.
			// 일단 정확히 이해를 못하겠다. 위에까지 외우도록 하자.
			struct remove_reference {
			    using type                 = A;
			    using _Const_thru_ref_type = const A;
			};
			using remove_reference_t = typename remove_reference<A>::type;
			A&& forward(remove_reference_t<A>& a) noexcept { return static_cast<A>(a); }
		*/
		auto&& ra = a;
		auto&& f_r1 = std::forward<A&>(ra);		// & ra -> && & ra	-> & ra
		auto&& f_r3 = std::forward<A>(rra);		// rra	-> && rra	-> && rra

		//auto&& f_r2 = std::forward<A&>(ra);		// & ra -> & ra	-> && & ra -> & ra
		//auto&& f_r4 = std::forward<A&>(rra);
	}
}

#pragma once

/*
	
*/
#include <iostream>
#include <string>
namespace c17_move_forward
{
	struct S
	{
		S() = default;
		S(const S& rhs) { /*복사 생성자*/ };
		S(S&& rhs) { /*이동 연산자*/ };
	};

	struct test_struct
	{
		std::string str;
		test_struct(const std::string& s) : str(s)
		{
			std::cout << "기본 생성자" << std::endl;
		}
		test_struct(const test_struct& rhs)
		{
			std::cout << "복사 생성자" << std::endl;
			str = rhs.str;
		}
		test_struct(test_struct&& rhs) noexcept
		{
			std::cout << "이동 생성자" << std::endl;
			str.swap(rhs.str);
		}

		void swap(test_struct& b)
		{
			std::cout << "문자열을 생성함" << std::endl;
			std::string temp = this->str;
			str = b.str;
			b.str = temp;
		}
		void move_swap(test_struct& b)
		{
			std::cout << "문자열의 ref만 바꿈" << std::endl;
			std::string temp = std::move(this->str);
			str = b.str;
			b.str = temp;
		}
	};

	void move_forward_test()
	{
		/*
			l-value		: 왼쪽과 오른쪽 둘다 올 수 있다.
			r-value		: 오른쪽만 가능하다.
		*/


		// C++11 부터 좌측값을 우측값으로 바꾸어주는 move함수를 제공
		// move는 어떠한 일도 하지않고 형변환만 수행한다.
		// 즉 어떠한 바이트코드도 연산도 수행하지 않는다.

		int a = 3;					// 좌측값에 3이라는 리터럴을 할당했다.
		int&& b = std::move(a);		// std::move를 통하여 좌측값을 우측값으로 변환해서 반환

		auto lambda = []() { return 1; };
		int&& c = lambda();			// 이렇게 rhs를 좌측값에 저장하지 않고, 수명을 연장시킬 수 있다.

		/*
		
			이동생성자가 반드시 빠르게 아니라는 점을 기억하자.
			
			1. 만들어진 새로운 데이터 안에 동적할당 및 복사를 하지 않고,
			데이터 안에 레퍼런스를 옮기는 등의 작업만을 수행하도록
			최적화 했기 때문에 빠름.
			
		*/

		{
			std::cout << "test_struct s;" << std::endl;
			std::cout << "test_struct new_s = construct_only_copy(s);" << std::endl;
			test_struct s("string");
			test_struct other("other");
			
			s.swap(other);
			s.move_swap(other);

			/*
			
				복사하여 옮기는 경우 임시로 문자열을 저장할 객체를 생성하게 되지만
				단순하게 옮기는 목적이라면, 문자열을 가리키는 포인터만 옮기는 것으로 최적화가 가능하다.
				다만 이렇게 포인터를 옮기는 방식으로 인해 원치 않는 문제가 발생 할 수 있다.
			
				이동생성자나 이동 대입 연산자를 호출할 때 이동이 수행되는 것이지
				std::move를 호출한다고 이동이 되는 것은 아니다.
			*/
		}
	}


	template <typename T>
	void wrapper(T u) {
		g(u);
	}
	template <typename T>
	void universal_wrapper(T&& u) {
		g(std::forward<T>(u));
	}
	class A {};
	void g(A& a)		{ std::cout << "좌측값 레퍼런스 호출" << std::endl; }
	void g(const A& a)	{ std::cout << "좌측값 상수 레퍼런스 호출" << std::endl; }
	void g(A&& a)		{ std::cout << "우측값 레퍼런스 호출" << std::endl; }
	void perfect_forwarding() 
	{
		A a;
		const A ca;
		std::cout << "원본 --------" << std::endl;
		g(a);
		g(ca);
		g(A());
		std::cout << "Wrapper -----" << std::endl;
		wrapper(a);
		wrapper(ca);
		wrapper(A());
		/*
			원본 --------
			좌측값 레퍼런스 호출
			좌측값 상수 레퍼런스 호출
			우측값 레퍼런스 호출
			Wrapper -----
			좌측값 레퍼런스 호출
			좌측값 레퍼런스 호출
			좌측값 레퍼런스 호출
			위의 경우 전부 좌측값만을 받도록 설계되었다.
			어째서 인가?
			템플릿 인자 T가 레퍼런스가 아닌 일반적인 타입이라면 const를 무시한다.
			즉 T 가 전부 다 class A 로 추론됩니다.
			따라서 위 세 경우 전부 다 좌측값 레퍼런스를 호출하는 g 를 호출하였습니다.
			그렇다고 warp를 &참조자를 붙이면 A()의 경우 오류를 발생한다.
			이를 해결하기 위해,
			T&, constT&의 모든 경우를 만들기란 굉장히 번거로운 일이다.
			인자가 2개만 넘어가도 4가지 경우의 수가 생긴다.
			이를 해결하기 위해 보편참조(universal reference)를 활용한다.
		*/
		universal_wrapper(a);
		universal_wrapper(ca);
		universal_wrapper(A());
		/*
			좌측값 레퍼런스 호출
			좌측값 상수 레퍼런스 호출
			우측값 레퍼런스 호출
			
			보편참조는 우측값 레퍼런스와 다르게
			template또는 auto에서만 가능하다.
			왼값이면 왼값 참조로, 오른값이면 오른값 참조를 한다.
			& == 1, && == 0 일때 OR연산과 같다.
			&	&		1		&
			&	&&		1		&
			&&	&		1		&
			&&	&&		0		&&
			A			|	A&			->
			const A&	|	const A&	->
			A(rhs)		|	A		->
			forward는 
		*/
		auto&& temp1 = a;
		auto&& temp2 = ca;
		auto&& temp3 = A();
	}
}

## 스마트 포인터
#pragma once

#include <memory>

namespace c17_smart_pointer
{
	void smart_pointer_test()
	{
		{
			std::unique_ptr<int> unique_ptr = std::make_unique<int>();
			std::unique_ptr<int> move_target = std::move(unique_ptr);
		}

		{
			std::weak_ptr<int> weak_ptr;
			{
				std::shared_ptr<int> shared_ptr = std::make_shared<int>();
				std::shared_ptr<int> shared = shared_ptr;
				weak_ptr = shared_ptr;
			}
			// weak_ptrÀÌ »èÁ¦µÇÁö ¾Ê¾Ò´Ù.
		}
	}
}

## Atomic
#pragma once

// https://modoocode.com/271 ??? 연산속도의 차이.

/*
    ● 컴퓨터는 사실 여러분이 시키는 대로 하지 않는다.
    여태까지 여러분이 코드를 작성하면, 컴파일러가 그 코드를 그대로 기계어로 번역한 다음, CPU 가
    해당 번역된 기계어를 그대로 실행시킨다고 생각하셨을 것입니다.
    그런데 이게 사실이 아니라 한다면 여러분은 믿을 수 있으신가요?
    int a = 0;          | foo():                            | 
    int b = 0;          |   mov eax, DWORD PTR b[rip]       |   eax에 *(int*) b[rip] 가져오기
    void foo() {        |   move DWORD PTR b[rip], 1        |   *(int*) b[rip] = 1
        a = b + 1;      |   add eax, 1                      |   eax += 1
        b = 1;          |   mov DWORD PTR a[rip], eax       |   *(int*) a[rip] = eax
    }                   |   ret                             |
    한 작업 (세탁 - 건조 - 개기) 이 끝나기 전에, 다음 작업을 시작하는 방식으로 동시에 여러 개의 
    작업을 동시에 실행하는 것을 파이프라이닝(pipelining) 이라고 합니다.
    CPU 도 마찬가지입니다. 실제 CPU 에서 명령어를 실행할 때 여러 단계를 거치게 됩니다. 명령어를
    읽어야 하고 (fetch), 읽은 명령어가 무엇 인지 해석해야 하고 (decode), 해석된 명령어를 실행하고
    (execute), 마지막으로 결과를 써야 하지요 (write).
    CPU 역시 정확히 동일한 방법으로 명령어를 처리합니다.
    ● 과연 컴파일러만 재배치를 할까?
     한 가지 더 재미있는 점은, 꼭 컴파일러만이 명령어를 재배치하는게 아니라는 점입니다. 예를 들어서
    다음과 같은 두 명령을 생각해봅시다.
    
    // 현재 a = 0, b = 0;
    a = 1; // 캐시에 없음
    b = 1; // 캐시에 있음
     a = 1 의 경우 현재 a 가 캐시에 없으므로, 매우 오래 걸립니다. 반면에 b = 1; 의 경우 현재 b
    가 캐시에 있기 때문에 빠르게 처리할 수 있겠지요. 따라서 CPU 에서 위 코드가 실행될 때, b =
    1; 가 a = 1; 보다 먼저 실행될 수 있습니다.
    따라서, 다른 쓰레드에서 a 는 0 인데, b 가 1 인 순간을 관찰할 수 있다는 것입니다
    ● 무엇을 믿어야 하는가?
    아니, 이렇게 명령어 순서도 뒤죽 박죽 바꾸고 심지어 CPU 에서도 명령어들을 제대로 된 순서로
    실행하지 않는다면, 도대체 무엇을 믿을 수 있을까요?
    C++ 의 모든 객체들은 수정 순서(modification order) 라는 것을 정의할 수 있습니다. 수정
    순서라 하는 것은, 만약에 어떤 객체의 값을 실시간으로 확인할 수 있는 전지전능한 무언가가 있다고
    하였을 때, 해당 객체의 값의 변화를 기록한 것이라 보면 됩니다. (물론 실제로 존재하지 않고, 가상의
    수정 순서가 있다고 생각해봅시다.)
     모든 쓰레드에서 변수의 수정 순서에 동의만 한다면 문제될 것이 없습니다. 이 말이 무슨 말이냐면,
    같은 시간에 변수 a 의 값을 관찰했다고 해서 굳이 모든 쓰레드들이 동일한 값을 관찰할 필요는 없다
    라는 점입니다.
     쓰레드 간에서 같은 시간에 변수의 값을 읽었을 때 다른 값을 리턴해도 된다는 점은 조금 충격적입
    니다. 하지만, 이 조건을 강제할 수 없는 이유는 그 이유는 아래 그림 처럼 CPU 캐시가 각 코어별로
    존재하기 때문입니다.
    ● 원자성(atomicity)
    앞서 이야기 했듯이, C++ 에서 모든 쓰레드들이 수정 순서에 동의해야만 하는 경우는 
    바로 모든 연산들이 원자적 일 때 라고 하였습니다.
    
    원자적인 연산이 아닌 경우에는 모든 쓰레드에서 같은 수정 순서를 관찰할 수 있음이 보장되지 않기에 
    여러분이 직접 적절한 동기화 방법을 통해서 처리해야 합니다. 만일 이를 지키지 않는다면, 
    프로그램이 정의되지 않은 행동(undefined behavior)을 할 수 있습니다.
    
    그렇다면 원자적 이라는 것이 무엇일까요?
    이미 이름에서 짐작하셨겠지만, 원자적 연산이란, CPU 가 명령어 1 개로 처리하는 명령으로, 
    중간에 다른 쓰레드가 끼어들 여지가 전혀 없는 연산을 말합니다. 
    즉, 이 연산을 반 정도 했다 는 있을 수 없고 이 연산을 했다 혹은 안 했다 만 존재할 수 있습니다.
    마치 원자처럼 쪼갤 수 없다 해서 원자적(atomic) 이라고 합니다.
    std::atomic<int> x;
    x.is_lock_free() == true인 경우, mutex의 lock과 unlock 없이 해당 연산을 올바르게 수행할 수 있다는 의미.
    memory_order_relaxed는 서로 다른 변수의 relaxed 메모리 연산까지 CPU 마음대로 배치가 가능하기 때문.
    따라서 CPU에 가장 빠른 방법을 추구할 수 있음.
    memory_order_relaxed는 해당 메모리 명령이 자류롭게 재배치되도록 함.
    memory_order_release는 해당 명령 이전의 모든 메모리 명령들이 해당 명령 이후로 재배치 되는 것을 금지.
    memory_order_acquire는 해당 명령 뒤에 오는 모든 메모리 명령들이 해당 멸령 위로 재배치 되는 것을 금지.
    memory_order_acq_rel는 release와 acquire를 모두 수행함.
    memory_order_seq_cst는 메모리 명령의 순차적 일관성(sequential consistency)를 보장함. atomic의 기본 메모리 명령 설정임.
        순차적 일관성(sequential consistency)란 메모리 명령 재배치도 없고, 모든 쓰레드에서 모든 시점에 동일한 값을 관찰할 수 있는,
        CPU가 작동하는 방식이라 생각하면 됨.
         문제는 멀티 코어 시스템에서 memory_order_seq_cst 가 꽤나 비싼 연산이라는 것입니다. 인텔
        혹은 AMD 의 x86(-64) CPU 의 경우에는 사실 거의 순차적 일관성이 보장되서 memory_order_-
        seq_cst 를 강제하더라도 그 차이가 그렇게 크지 않습니다. 하지만 ARM 계열의 CPU 와 같은
        경우 순차적 일관성을 보장하기 위해서는 CPU 의 동기화 비용이 매우 큽니다. 따라서 해당 명령은
        정말 꼭 필요 할 때만 사용해야 합니다.
    참고로 memory_order_consume 은 다루지 않았는데 
        C++ 17 현재, memory_order_consume의 정의가 살짝 수정 중에 있기에 memory_order_consume 의 사용이 권장되지 않습니다.
    https://popcorntree.tistory.com/22 ??
    atomic은 별도의 자료 크기를 차지하나?
    ?? atomic<type>과 type의 자료 크기는 같다??
*/

#include <atomic>
#include <iostream>
#include <thread>
#include <vector>

namespace c17_atomic
{
    void worker(std::atomic<int>& counter) {
        for (int i = 0; i < 10000; i++) {
            counter++;
        }
    }

    void solve() {
        std::atomic<int> counter(0);

        std::vector<std::thread> workers;
        for (int i = 0; i < 4; i++) {
            workers.push_back(std::thread(worker, std::ref(counter)));
        }

        for (int i = 0; i < 4; i++) {
            workers[i].join();
        }

        // 아무런 노력도 하지 않고 값은 40000이 나온다.
        std::cout << "Counter 최종 값 : " << counter << std::endl;
    }

    void t1(std::atomic<int>* a, std::atomic<int>* b) {
        b->store(1, std::memory_order_relaxed); // b = 1 (쓰기)
        int x = a->load(std::memory_order_relaxed); // x = a (읽기)
        printf("x : %d \n", x);
    }
    void t2(std::atomic<int>* a, std::atomic<int>* b) {
        a->store(1, std::memory_order_relaxed); // a = 1 (쓰기)
        int y = b->load(std::memory_order_relaxed); // y = b (읽기)
        printf("y : %d \n", y);
    }
    void memory_order_relaxed_test() {
        std::vector<std::thread> threads;
        std::atomic<int> a(0);
        std::atomic<int> b(0);
        threads.push_back(std::thread(t1, &a, &b));
        threads.push_back(std::thread(t2, &a, &b));
        for (int i = 0; i < 2; i++) {
            threads[i].join();
        }

        /*
            x : 1
            y : 0
            x : 0
            y : 1
            x : 1
            y : 1
            x : 0
            y : 0
            위와 같은 실행결과가 나올 수 있음.
            memory_order_relaxed는 서로 다른 변수의 relaxed 메모리 연산까지 CPU 마음대로 배치가 가능하기 때문.
            따라서 CPU에 가장 빠른 방법을 추구할 수 있음.
            다음과 같은 상황에서 사용될 수 있음.
                void worker(std::atomic<int>* counter) {
                    for (int i = 0; i < 10000; i++) {
                    // 다른 연산들 수행
                    counter->fetch_add(1, memory_order_relaxed);
                    }
                }
                어찌되었건 간에 1만 증가하면 되는 상황.
            memory_order_relaxed는 cpu에 너무 많은 자유를 부여하여 그 사용 용도는 꽤나 제한적.
        */
    }

    std::atomic<bool> is_ready;
    std::atomic<int> data[3];
    //int c = sizeof(int[3]);
    //int a = sizeof(data);
    void producer() {
        data[0].store(1, std::memory_order_relaxed);        // │ ┌ 자유롭게 재배치 되는 공간
        data[1].store(2, std::memory_order_relaxed);        // │ │
        data[2].store(3, std::memory_order_relaxed);        // │ └
        is_ready.store(true, std::memory_order_release);    // └ 해당 명령 이전의 메모리 명령이 이후로 재배치 되는 것을 막음
    }
    void consumer() {
        // data 가 준비될 때 까지 기다린다.
        while (!is_ready.load(std::memory_order_acquire)) {                                 // ┌ 해당 명령 이후의 메모리 명령이 이전으로 재배치 되는 것을 막음
        }                                                                                   // │
        std::cout << "data[0] : " << data[0].load(std::memory_order_relaxed) << std::endl;  // │ ┌ 자유롭게 재배치 되는 공간
        std::cout << "data[1] : " << data[1].load(std::memory_order_relaxed) << std::endl;  // │ │
        std::cout << "data[2] : " << data[2].load(std::memory_order_relaxed) << std::endl;  // │ └
    }
    void relaxed_and_relase_acquire() {
        std::vector<std::thread> threads;
        threads.push_back(std::thread(producer));
        threads.push_back(std::thread(consumer));
        for (int i = 0; i < 2; i++) {
            threads[i].join();
        }
    }

}

## 가변 길이 템플릿
#pragma once

#include <iostream>

template <typename T>
void print_t(T arg)
{
	std::cout << arg << ", ";
}

template <typename T, typename... Types>
void print_t(T arg, Types... args)
{
	std::cout << arg << ", ";
	print_t(args...);
}

/*
https://modoocode.com/290
순서를 바꾼다면? 
컴파일러는 오류를 낸다.
C++ 컴파일러는 함수를 컴파일 시에, 자신의 앞에 정의되어 있는 
함수들 밖에 보지 못하기 때문입니다. 따라서 void print(T arg, Types... args) 이 
함수를 컴파일 할 때, void print(T arg) 이 함수가 존재함을 모르는 셈이지요.
그렇게 된다면, 마지막에 print("abc") 의 오버로딩을 찾을 때, 
파라미터 팩이 있는 함수를 택하게 되는데, 그 경우 그 함수 안에서 
print() 가 호출이 됩니다. 하지만 우리는 print() 를 정의하지 않았기에 
컴파일러가 이 함수를 찾을 수 없다고 오류를 뿜뿜 하게 되는 것입니다.
*/

void variadic_template()
{
	print_t(1, 2, 3);
}

/*
임의의 개수의 문자열을 합치는 함수
가변 길이 템플릿을 활용한 또 다른 예시로 임의의 길이의 문자열을 합쳐주는 함수를 들 수 있습니다. 예를 들어서 std::string 에서 문자열을 합치기 위해서는
요구하는 시스템
std::string concat;
concat.reserve(s1.size() + s2.size() + s3.size());  // 여기서 할당 1 번 수행
concat.append(s1);
concat.append(s2);
concat.append(s3);
// 직접 짜봐야 실력이 늘거 같은데,,
*/

#include <iostream>
#include <string>


// get size in here
namespace
{
	size_t get_size(const char* s) { return strlen(s); }
	size_t get_size(const std::string& s) { return s.size(); }

	template <typename String, typename... Strings>
	size_t get_size(const String& s, Strings... strs)
	{
		return get_size(s) + get_size(strs...);
	}
}

// append in here
namespace
{
	void append_to_string(std::string* concat_str) { return; }

	template <typename String, typename... Strings>
	void append_to_string(std::string* concat_str, const String& s, Strings... strs)
	{
		concat_str->append(s);
		append_to_string(concat_str, strs...);		// 이렇게 해도 확장이 되는구나,,
	}
}

template <typename Str, typename... Strs>
std::string StrCat(const Str& s, Strs... strs)
{
	size_t total_size = get_size(s, strs...);

	std::string concat_str;
	concat_str.reserve(total_size);

	concat_str = s;
	append_to_string(&concat_str, strs...);
	
	return concat_str;
}

void test()
{
	std::string This = "this";
	std::cout << StrCat(This, " ", "is", " ", "a", " ", std::string("sentence"));
}

/*
Fold Expression
C++ 11 에서 도입된 가변 길이 템플릿은 매우 편리하지만 
한 가지 단점이 있습니다. 재귀 함수 형태로 구성해야 하기 때문에,
반드시 재귀 호출 종료를 위한 함수를 따로 만들어야 한다는 것이지요.
위와 같이 재귀 함수 호출을 종료하기 위해 베이스 케이스를 
꼭 만들어줘야 한다는 점입니다. 이는 코드의 복잡도를 쓸데없이 늘리게 됩니다.
하지만 C++ 17 에 새로 도입된 Fold 형식을 사용한다면 이를 훨씬 간단하게 표현할 수 있습니다.
*/

#include <iostream>

template <typename... Ints>
int sum_all(Ints... nums) 
{
	return (... + nums);
}

void fold_expression()
{
	std::cout << sum_all(1, 4, 2, 3, 10) << std::endl;
}

/*
위와 같은 형태를 단항 좌측 Fold (Unary left fold)라고 부릅니다. 
C++ 17 에서 지원하는 Fold 방식의 종류로 아래 표와 같이 총 4 가지가 있습니다. 
참고로 I 는 초기값을 의미하며 파라미터 팩이 아닙니다.
(E op ...)			단항 우측 Fold		(E1 op (... op (EN-1 op EN))...)
(... op E)			단항 좌측 Fold		((...(E1 op E2) op ...) op EN)
(E op ... op I)		이항 우측 Fold		(E1 op (... op(EN-1 op (EN op I))...))
(I op ... op E)		이항 좌측 Fold		((...((I op E1) op E2) op ... ) op EN
한 가지 중요한 점은 Fold 식을 쓸 때 꼭 () 로 감싸줘야 한다는 점입니다.
C++ 17 옵션을 켜줘야 한다.
*/

#include <vector>
template <typename... T>
int vector_sum(std::vector<int>& index, T... N)
{
	return (... + index[N]);
}

void fold_expression2()
{
	std::vector<int> vec = { 0,1,2,3,4,5 };
	std::cout << vector_sum(vec, 0, 1, 2, 3) << std::endl;
}

## 탬플릿 메타 프로그래밍
#pragma once

/*
https://modoocode.com/221
 이렇게 템플릿을 통해서 타입이 마치 인자 인것 처럼 사용하는 것을 
 바로 일반화 프로그래밍 (generic programming) 혹은 그냥 제너릭 
 프로그래밍 이라고 부릅니다.
 array를 생각해보자, 그럼 간단하다.
*/

#include <iostream>
#include <typeinfo>

template <int N>
struct Int {
	static const int num = N;
};

template <typename T, typename U>
struct add {
	typedef Int<T::num + U::num> result;
};

void template_meta_programming() 
{
	typedef Int<1> one;
	typedef Int<2> two;

	typedef add<one, two>::result three;

	std::cout << "Addtion result : " << three::num << std::endl;
}

// 3라는 결과를 반환한다.

/*
	
	템플릿 메타 프로그래밍 (Template Meta Programming - TMP)
	또한 타입은 반드시 컴파일 타임에 확정되어야 하므로, 컴파일 타임에 모든 연산이 끝나게 됩니다. 
	이렇게 타입을 가지고 컴파일 타임에 생성되는 코드로 프로그래밍을 하는 것을 메타 프로그래밍(meta programming) 
	이라고 합니다. C++ 의 경우 템플릿을 가지고 이러한 작업을 하기 때문에 템플릿 메타 프로그래밍, 줄여서 TMP 라고 부릅니다.
*/

/* 컴파일 타임 팩토리얼 계산 */
#include <iostream>
template <int N>
struct Factorial 
{
	static const int result = N * Factorial<N - 1>::result;
};

template <>
struct Factorial<1> 
{
	static const int result = 1;
};

void tmp() 
{
	std::cout << "6! = 1*2*3*4*5*6 = " << Factorial<6>::result << std::endl;
}

/*
TMP 를 왜 쓰는가?
한 가지 재미있는 사실은어떠한 C++ 코드도 템플릿 메타 프로그래밍 코드로 변환할 수 있다는 점입니다
(물론 엄청나게 코드가 길어지겠지만요). 게다가 템플릿 메타 프로그래밍으로 작성된 코드는 모두 컴파일 타임에 
모든 연산이 끝나기 때문에 프로그램 실행 속도를 향상 시킬 수 있다는 장점이 있습니다 
(당연히도 컴파일 시간은 엄청 늘어나게 됩니다).
그 뿐만이 아니라, 템플릿 메타 프로그래밍으로 작성된 코드는 버그를 찾는 것이 매우 힘듭니다. 
일단 기본적으로 '컴파일' 타임에 연산하는 것이기 때문에 디버깅이 불가능 하고, 
C++ 컴파일러에 특성 상 템플릿 오류 시에 엄청난 길이의 오류를 내뿜게 됩니다.
따라서 TMP 를 이용하는 경우는 꽤나 제한적이지만, 많은 C++ 라이브러리들이 TMP 를 이용해서 구현되었고 
(Boost 라이브러리), TMP 를 통해서 컴파일 타임에 여러 오류들을 잡아낼 수 도 있고 
(Ex. 단위나 통화 일치 여부등등) 속도가 매우 중요한 프로그램의 경우 TMP 를 통해서 런타임 속도도 향상 시킬 수 있습니다.
*/

int gcd(int a, int b) {
	if (b == 0) {
		return a;
	}

	return gcd(b, a % b);
}

#include <iostream>

template <int X, int Y>
struct GCD {
	static const int value = GCD<Y, X% Y>::value;
};

template <int X>
struct GCD<X, 0> {
	static const int value = X;
};

void TMP_GCD() {
	std::cout << "gcd (36, 24) :: " << GCD<36, 24>::value << std::endl;
}

//////////////////////////////////////////////////

/*
문제 1
N 번째 피보나치 수를 나타내는 TMP 를 만들어보세요.
참고로 피보나치 수는, N 번째 항이 N - 1 번째 항과 N - 2 번째
항의 합으로 정의되는 수 입니다. 참고로 1, 1, 2, 3, 5, ...
로 진행됩니다.(난이도 : 하)
*/
namespace
{
	template <int N>
	struct Fibonacci
	{
		static const int Num = Fibonacci<N - 1>::num + Fibonacci<N - 2>::num;
	};
	template <>
	struct Fibonacci<1>
	{
		static const int Num = 1;
	};
	template <>
	struct Fibonacci<2>
	{
		static const int Num = 1;
	};
}

/*
문제 2
TMP 를 사용해서 어떤 수가 소수인지 아닌지를 판별하는 프로그램을 만들어보세요. 
(난이도 : 상) 참고로 이 문제는 다음 강좌에서 다룰 예정입니다!
*/
namespace
{
	/*
	
		3을 검사한다고 할때.
		2, 가 소수일 경우, (1 초과) 나누어 떨어지면 소수가 아니고 나누어 떨어지지 않으면 소수이다.
		5를 검사한다고 할때.
		4(소수아님 제외), 3(소수), 2(소수)에서 소수만을 나누어 검사하고, 나누어 떨어지지 않으면 소수이다.
		6을 검사한다고 할때.
		5, 4, 3, 2에서 5에서 나누어 떨어지지 않으므로 3을 검사하는데 나누어 떨어지므로 소수가 아니다.
	
	*/

	template <int N>
	struct is_prime
	{
		template <int I>
		static constexpr bool can_divide()
		{
			// 소수일 때는나누어 떨어지는지 검사하고 아니라면 false를 반환
			return is_prime<I>::is_true ? N % I == 0 : false;
		}

		template <int I>
		static constexpr bool extend()
		{
			return can_divide<I>() || extend<I - 1>();
		}
		template <>
		static constexpr bool extend<1>()
		{
			return false;
		}

		static constexpr bool is_true = extend<N - 1>() == false;
	};
}

#pragma once

namespace
{
	bool is_prime(int N) 
	{
		if (N == 2) return true;
		if (N == 3) return true;

		for (int i = 2; i <= N / 2; i++) {
			if (N % i == 0) return false;
		}

		return true;
	}
}

/*
	아니 미친,, 더 간단하게 푸네??
	인줄 알았는데,, 아니네,, 더럽게 복잡하게 푸네,
*/

/*
https://modoocode.com/222
단위(Unit) 라이브러리
C++ 코드를 작성하는 이유는 여러가지가 있겠지만, 그 중 하나로 바로 여러 수치 계산을 
사용하는데에도 많이 사용합니다. 예를 들어서 인공위성의 궤도를 계산한다던지, 
입자의 운동을 계산한다던지 말이지요. 이러한 물리적 수치 계산 시에 꼭 필요한 것이 바로 '단위' 입니다.
단위라 하면 쉽게 말해 킬로그램 (kg), 미터 (m), 초 (s) 등을 생각하시면 됩니다. 
이러한 것들을 계산하는 프로그램들의 경우, double 이나 float 변수에 들어가는 
값에는 '단위' 가 붙어서 들어가겠지요.
예를 들어서 핸드폰의 가속도 센서에서 부터 데이터를 받는 프로그램은 아마도 
m/s^2 단위로 데이터를 받겠지요. 혹은 시계로 부터 데이터를 받는 프로그램은 
s 단위로 데이터를 받을 것 입니다.
float v;        // 속도; m/s
float a;        // 가속도; m/s^2
std::cout << v + a;  // ???
만약에 v 가 속도를 나타내는 값이고, 
a 가 가속도를 나타내는 값이라면, 
v + a 는 불가능한 연산입니다.
만약에 프로그래머가 저러한 코드를 ㎢摸 분명히 실수일 것입니다. 
물론 C++ 컴파일러 입장에서는 그냥 두 개의 float 변수를 더한 것이기 때문에 
문제 없이 컴파일 됩니다. 하지만 프로그램을 돌리게 된다면 골치아픈 문제가 발생하겠지요.
실제로, NASA 의 경우 단위를 잘못 처리해서 1조원 짜리 화성 탐사선을 날려먹은 경우가 있습니다. 
이 경우 1조원 자리 버그 이겠네요.
여러분 이라면 이러한 실수를 어떻게 막을 것인가요? 
일단 가장 먼저 드는 생각으로 단위 데이터를 일반적인 변수에 보관하지 말고 
클래스를 만들어서 클래스 객체에서 보관하는 것입니다. 그리고 operator+ 
등으로 연산자들을 오버로딩 한 뒤에, 연산 시에 객체 끼리 단위를 체크해서 
단위가 맞지 않으면 적절히 처리하면 됩니다.
물론 이 방법은 꽤나 괜찮아 보이지만 한 가지 문제가 있습니다. 
만일 틀린 단위를 연산하는 코드가 매우 드물게 일어난다면 어떨까요? 
즉 런타임에서 그 문제를 발견하지 못한 채 넘어갈 수 있다는 점입니다.
가장 이상적인 상황은 단위가 맞지 않는 연산을 수행하는 코드가 있다면 
아예 컴파일 시에 오류를 발생시켜버리는 것입니다. 
그렇다면 적어도 틀린 단위를 연산하는 일은 막을 수 있게 되고,
프로그램을 실행 시키면서 기다리는 수고를 줄일 수 있게 되지요.
*/

#include <iostream>
#include <typeinfo>

template <int X, int Y>
struct GCD {
    static const int value = GCD<Y, X% Y>::value;
};

template <int X>
struct GCD<X, 0> {
    static const int value = X;
};

template <int N, int D = 1>
struct Ratio {
private:
    const static int _gcd = GCD<N, D>::value;

public:
    typedef Ratio<N / _gcd, D / _gcd> type;
    static const int num = N / _gcd;
    static const int den = D / _gcd;
};
template <class R1, class R2>
struct _Ratio_add {
    using type = Ratio<R1::num* R2::den + R2::num * R1::den, R1::den* R2::den>;
};

template <class R1, class R2>
struct Ratio_add : _Ratio_add<R1, R2>::type {};

template <class R1, class R2>
struct _Ratio_subtract {
    using type = Ratio<R1::num* R2::den - R2::num * R1::den, R1::den* R2::den>;
};

template <class R1, class R2>
struct Ratio_subtract : _Ratio_subtract<R1, R2>::type {};

template <class R1, class R2>
struct _Ratio_multiply {
    using type = Ratio<R1::num* R2::num, R1::den* R2::den>;
};

template <class R1, class R2>
struct Ratio_multiply : _Ratio_multiply<R1, R2>::type {};

template <class R1, class R2>
struct _Ratio_divide {
    using type = Ratio<R1::num* R2::den, R1::den* R2::num>;
};

template <class R1, class R2>
struct Ratio_divide : _Ratio_divide<R1, R2>::type {};

template <typename U, typename V, typename W>
struct Dim {
    using M = U;
    using L = V;
    using T = W;

    using type = Dim<M, L, T>;
};

template <typename U, typename V>
struct add_dim_ {
    typedef Dim<typename Ratio_add<typename U::M, typename V::M>::type,
        typename Ratio_add<typename U::L, typename V::L>::type,
        typename Ratio_add<typename U::T, typename V::T>::type>
        type;
};

template <typename U, typename V>
struct subtract_dim_ {
    typedef Dim<typename Ratio_subtract<typename U::M, typename V::M>::type,
        typename Ratio_subtract<typename U::L, typename V::L>::type,
        typename Ratio_subtract<typename U::T, typename V::T>::type>
        type;
};

template <typename T, typename D>
struct quantity {
    T q;
    using dim_type = D;

    quantity operator+(quantity<T, D> quant) {
        return quantity<T, D>(q + quant.q);
    }

    quantity operator-(quantity<T, D> quant) {
        return quantity<T, D>(q - quant.q);
    }

    template <typename D2>
    quantity<T, typename add_dim_<D, D2>::type> operator*(quantity<T, D2> quant) {
        return quantity<T, typename add_dim_<D, D2>::type>(q * quant.q);
    }

    template <typename D2>
    quantity<T, typename subtract_dim_<D, D2>::type> operator/(
        quantity<T, D2> quant) {
        return quantity<T, typename subtract_dim_<D, D2>::type>(q / quant.q);
    }

    // Scalar multiplication and division
    quantity<T, D> operator*(T scalar) { return quantity<T, D>(q * scalar); }

    quantity<T, D> operator/(T scalar) { return quantity<T, D>(q / scalar); }

    quantity(T q) : q(q) {}
};

template <typename T, typename D>
std::ostream& operator<<(std::ostream& out, const quantity<T, D>& q) {
    out << q.q << "kg^" << D::M::num / D::M::den << "m^" << D::L::num / D::L::den
        << "s^" << D::T::num / D::T::den;

    return out;
}

void dim() {
    using one = Ratio<1, 1>;
    using zero = Ratio<0, 1>;

    quantity<double, Dim<one, zero, zero>> kg(2);
    quantity<double, Dim<zero, one, zero>> meter(3);
    quantity<double, Dim<zero, zero, one>> second(1);

    // F 의 타입은 굳이 알필요 없다!
    auto F = kg * meter / (second * second);
    std::cout << "2 kg 물체를 3m/s^2 의 가속도로 밀기 위한 힘의 크기는? " << F
        << std::endl;
}

/*
이것으로 템플릿 메타프로그래밍에 대한 강좌를 마치도록 하겠습니다. 
사실 실제 현업에서 템플릿 메타 프로그래밍을 활용하는 경우는 그다지 많지 않습니다. 
왜냐하면 일단 TMP 의 특성상복잡하고, 머리를 매우 많이 써야되고, 
무엇보다도 버그가 발생하였을 때 찾는 것이 매우 힘年求.
*/

## 모어 템플릿
#pragma once

template <template <typename... Args> typename A>
void template_template_typename_typename()
{

}

template <typename... Args>
struct Struct 
{...};

void test()
{
	Struct<int> a;


}


template <typename T, int N>
class IteratorSpecificier {};

template <typename T>
class IteratorSpecificier<T, 1> {...};

template <typename T, int N>
class TestClass
{
	using Iterator = IteratorSpecificier<T, N>;
};


#include <memory>
#include <functional>
struct test_struct
{
	test_struct(int a) {}
};

void func(int a)
{

}

void test()
{

	std::make_unique<test_struct>(3);
}

## 스레드 생성과 인자 전달
#pragma once

#include <iostream>
#include <thread>
#include <vector>
#include <algorithm>

namespace c17_thread
{
	/*
	
		스레드는 값을 받지 못하므로 포인터를 넘겨야 한다.
	
	*/
	void worker(std::vector<int>::iterator start, std::vector<int>::iterator end, int* result)
	{
		for (auto it = start; it < end; ++it)
			*result += *it;

		// cout로 하면 출력이 뒤섞이게 된다.
		//std::cout << "쓰레드" << std::this_thread::get_id() << "에서 계산한 결과 : " << *result << std::endl;
		// printf로 하면 한번에 출력하게 된다. printf가 필요하기도 하는구나...
		printf("쓰레드%x에서 계산한 결과 : %d\n", (std::this_thread::get_id()), (int)(*result));
	}
	void get_thread_return()
	{
		std::vector<int> data(10000);
		std::transform(data.begin(), data.end(), data.begin(),
			[a = 0](int ptr) mutable -> int
		{
			return ptr = a++;
		});

		std::vector<int> partial_sums(4);
		std::vector<std::thread> workers;
		for (int i = 0; i < 4; i++) {
			workers.push_back(std::thread(worker, data.begin() + i * 2500,
				data.begin() + (i + 1) * 2500, &partial_sums[i]));
		}

		for (int i = 0; i < 4; i++) {
			workers[i].join();
		}

		int total = 0;
		for (int i = 0; i < 4; i++) {
			total += partial_sums[i];
		}
		std::cout << "전체 합 : " << total << std::endl;

	}
}

namespace c17_thread
{
	void func1()
	{
		for (int i = 0; i < 10; i++)
		{
			std::cout << "쓰레드 1 작동중!" << std::endl;
		}
	}

	void func2()
	{
		for (int i = 0; i < 10; i++)
		{
			std::cout << "쓰레드 2 작동중!" << std::endl;
		}
	}

	void func3()
	{
		for (int i = 0; i < 10; i++)
		{
			std::cout << "쓰레드 3 작동중!" << std::endl;
		}
	}

	void thread_call()
	{
		// 스레드 실행.
		std::thread t1(func1);
		std::thread t2(func2);
		std::thread t3(func3);

		// 스레드가 종료될때까지 기다려라.
		t1.join(); // join은 쓰레드가 종료될 때 반환하는 메서드 이다. 
		t2.join(); // t2가 먼저 끝나도 t1에서 join이 반환할 때 까지 대기하게 된다.
		t3.detach(); // detach는 실행시키고 잊어버리는 것이다. 스레드는 알아서 종료되면 돌아간다.

		/*
			스레드를 생성하고 join또는 detach 하지 않는 다면 예외를 발생한다.
		*/
	}


}

## 데이터 레이스와 뮤텍스
#pragma once

/*
	경쟁 상태 (Race Condition)
	경쟁 상태란 하나의 변수를 여러개의 스레드가 데이터를 입력하는 상태를 말함.
	뮤텍스 (mutex)와 데드락(deadlock)
	생산자 - 소비자 패턴
	condition_variable
	// CPU 간단 소개
	CPU의 레지스터(register)라는 곳에 데이터를 기록한 다음에 연산을 수행.
	64비트 컴퓨터의 경우, 레지스터의 크기들은 8바이트에 불과,
	일반적인 연산에서 사용되는 범용 레지스터의 경우 16개 밖에 없음. 32비트에서는 8개임...
	이 문제를 해결하기 위한게
	뮤텍스(mutex)
	뮤텍스란 상호 배제 (mutual exclusion)라는 단어에서 따온 말.
	m.lock() 과 m.unlock() 사이에 한 쓰레드만이 유일하게 실행할 수 있는 코드 부분을 임계 영역(critical section)이라 한다.
	-------------------------------------------------------------------------------------------
	데드락을 피하기 위해서는 다음과 같은 가이드 라인이 제시된다 (C++ Concurrency In Action)
	중첩된 Lock을 사용하는 것을 피해라
	모든 쓰레드들이 최대 1개의 Lock만을 소유한다면 데드락 상황이 발생하는 것을 피할 수 있다.
	또한 대부분의 디자인에서는 1개의 Lock으로도 충분하다. 만일 여러개의 Lock을 필요로 한다면, 정말 필요로 하는지를 물어보자.
	Lock을 소유하고 있을 때 유저 코드를 호출하는 것을 피해라.
	유저 코드에서 Lock을 소유할 수 도 있기에 중첩된 Lock을 얻는 것을 피하려면 Lock 소유시 유저 코드를 호출하는 것을 지양 해야 한다.
	-> 메서도 호출울 지향하라는 뜻인가
	Lock들을 언제나 정해진 순서로 득해라.
	여러개의 Lock들을 획득해야 할 상황이 온다면, 반드시 락을 정해진 순서로 득해라.
	m1, m2 & m1, m2 순으로 lock했다면 데드락은 발생하지 않았을 것이다.
*/
#include <iostream>
#include <mutex>
#include <thread>
#include <vector>

void worker(int& result, std::mutex& m) {
	for (int i = 0; i < 10000; ++i)
	{
		m.lock();
		// 락을 통하여 한 쓰레드만이 유일하게 실행할 수 있는 부분을
		// 임계영역(critical section)이라고 한다.
		result += 1;
		m.unlock();
		// 실수로 unlock을 선언하지 않으면 아무 쓰레드도 연산을 진행하지 못한다.
		// 이러한 상황을 데드락(deadlock)이라고 한다.
	}
}

void worker2(int& result, std::mutex& m)
{
	for (int i = 0; i < 10000; i++)
	{
		std::lock_guard<std::mutex> lock(m);
		result += 1;
	}
	// 락가드를 통하여 언락을 자동으로 할 수 있다.
	// 락가드만 있는 상황에서 뮤텍스를 전혀 고려할 필요가 없는 걸까?
}

void test()
{
	int counter = 0;
	std::mutex m;

	std::vector<std::thread> workers;
	for (int i = 0; i < 4; ++i)
	{
		workers.push_back(std::thread(worker, std::ref(counter), std::ref(m)));
	}

	for (int i = 0; i < 4; ++i)
	{
		workers[i].join();
	}

	std::cout << " Coutner 최종 값 : " << counter << std::endl;
}

// 데드락 (Deadlock)

void deadlock1(std::mutex& m1, std::mutex& m2)
{
	for (int i = 0; i < 10000; ++i)
	{
		std::lock_guard<std::mutex> lock1(m1);
		std::lock_guard<std::mutex> lock2(m2);
		// ...
	}
}

void deadlock2(std::mutex& m1, std::mutex& m2)
{
	for (int i = 0; i < 10000; ++i)
	{
		std::lock_guard<std::mutex> lock2(m2);
		std::lock_guard<std::mutex> lock1(m1);
		// ...
	}
}

// 동시에 실행 했다고 했을 때 
// 메서드 1에서 m1을 락하고 m2를 락할려고 했으나 deadlock2에서 락되어 대기한다.
// 메서드 2에서 m2를 락하고 m1을 락할려고 했으나 deadlock1에서 락되어 대기한다.
// !! 교착상태. 데드락 이라 한다.

// 우선권을 주어 데디락을 막을 수 있다.
// 다만 한 쓰레드만 계속해서 돌아가는 기아 상태(starvation)이 발생할 수 있다.

void worker1(std::mutex& m1, std::mutex& m2) {
	for (int i = 0; i < 10; ++i)
	{
		m1.lock();
		m2.lock();

		std::cout << "Worker1 Hi!" << i << std::endl;

		m2.unlock();
		m1.unlock();
	}
}

void worker2(std::mutex& m1, std::mutex& m2) {
	for (int i = 0; i < 10; ++i)
	{
		while (true)
		{
			m2.lock();

			// m1이 이미 lock되어 있다면 포기하고 기다린다.
			if (!m1.try_lock())
			{
				m2.unlock();
				continue;
			}
			std::cout << "Worker2 Hi!" << i << std::endl;

			m1.unlock();
			m2.unlock();

			break;
		}
	}
}

## 생산자 소비자 패턴
	#pragma once

/*
	생산자(Producer) 소비자 (Consumer) 패턴
	멀티 쓰레드 프로그램에서 가장 많이 등장하는 생산자 - 소비자 패턴,
	생산자의 경우, 무언가 처리할 일을 받아오는 쓰레드를 의미,
	ex) 인터넷에서 페이지를 긁어오는 쓰레드
	소비자의 경우, 받은 일을 처리하는 쓰레드를 의미,
	ex) 긁어온 페이지를 분석하는 쓰레드가 해당
	소비자가 필요한경우에만 작동하도록 하는 것이 condition_variable이다.
	어떠 어떠한 조건을 만족할 때 까지 자라! 라는 명령
	생산자 소비자 페턴은 네트워크에서 주로 사용하기 때문에 예시 자체도 네트워크이다.
	https://modoocode.com/270
	조건 변수 (condition_variable)
	어떠 어떠한 조건을 만족할 때 대기하라라는 메서드
		1. cv->wait(unique_lock, condition function(boo())으로 notify될 때 까지 대기
		2. 대기하고 있는 스레드를 깨우고 싶다면 cv->notify_one(), 또는 cv->notify_all()을 이용하여 알려준다.
			condition function	true	:	두번째 부터, unique_lock의 mutex를 lock한다.
								false	:	mutex를 unlock, while문에 의해 다시한번 wait를 호출한다.
								
								1) 당연하게도 excepthion을 throw하면 안된다.
								2) 그외,	wait_for	: 지정된 시간 초과 기간동안 조건 변수가 깨어날 때까지 스레드를 차단.
											wait_untile	: 지정된 시점에 도달 하기 전까지 조건 변수가 깨어날 때까지 스레드를 차단.	
*/

#include <iostream>
#include <mutex>
#include <queue>
#include <string>
#include <thread>
#include <vector>

namespace
{
	void producer(std::queue<std::string>* downloaded_pages, std::mutex* m,
		int index, std::condition_variable* cv) {
		for (int i = 0; i < 5; i++) {
			// 웹사이트를 다운로드 하는데 걸리는 시간이라 생각하면 된다.
			// 각 쓰레드 별로 다운로드 하는데 걸리는 시간이 다르다.
			std::this_thread::sleep_for(std::chrono::milliseconds(100 * index));
			std::string content = "웹사이트 : " + std::to_string(i) + " from thread(" +
				std::to_string(index) + ")\n";

			// data 는 쓰레드 사이에서 공유되므로 critical section 에 넣어야 한다.
			m->lock();
			downloaded_pages->push(content);
			m->unlock();

			// consumer 에게 content 가 준비되었음을 알린다.
			cv->notify_one();
			/*
				만약에 페이지를 하나 다운 받았다면,
				잠자고 있는 쓰레드들 중 하나를 깨워서 일을 시켜야겠죠?
				(만약에 모든 쓰레드들이 일을 하고 있는 상태라면 아무 일도 일어나지 않습니다.)
				notify_one 함수는 말 그대로,조건이 거짓인 바람에 자고 있는 쓰레드 중
				하나를 깨워서 조건을 다시 검사하게 해줍니다.
				만일 조건이 참이 된다면 그 쓰레드가 다시 일을 시작하겠지요.
			*/
		}
	}

	void consumer(std::queue<std::string>* downloaded_pages, std::mutex* m,
		int* num_processed, std::condition_variable* cv) {
		while (*num_processed < 25)
		{
			std::unique_lock<std::mutex> lk(*m);
			/*
				참고로 기존의 lock_guard 와는 다르게 unique_lock 을 정의하였는데,
				사실 unique_lock 은 lock_guard 와 거의 동일합니다.
				다만, lock_guard 의 경우 생성자 말고는 따로 lock 을 할 수 없는데,
				unique_lock 은 unlock 후에 다시 lock 할 수 있습니다.
				덧붙여 unique_lock 을 사용한 이유는 cv->wait 가 unique_lock 을 인자로 받기 때문입니다.
			*/

			cv->wait(
				lk, [&] { return downloaded_pages->empty() == false || *num_processed == 25; });
			// condition_variable의 wait 함수의 결과가 참이 될 때까지 기다린다.
			// 여기서는 다운로드된 페이지가 있거나 원소의 개수가 25개가 된다면 작동되도록 했다.

			if (*num_processed == 25) {
				lk.unlock();
				return;
			}
			/*
				cv.wait 후에 아래 num_processed 가 25 인지 확인하는 구문이 추가되었는데,
				이는 wait 에서 탈출한 이유가 모든 페이지 처리를 완료해서 인지, 아니면
				정말 downloaded_pages 에 페이지가 추가榮쩝 알 수 없기 때문입니다.
				만일 모든 페이지 처리가 끝나서 탈출한 것였다면, 그냥 쓰레드를 종료해야 합니다.
			*/

			// 맨 앞의 페이지를 읽고 대기 목록에서 제거한다.
			std::string content = downloaded_pages->front();
			downloaded_pages->pop();

			(*num_processed)++;
			lk.unlock();

			// content 를 처리한다.
			std::cout << content;
			std::this_thread::sleep_for(std::chrono::milliseconds(80));
		}
	}

	int solve() {
		// 현재 다운로드한 페이지들 리스트로, 아직 처리되지 않은 것들이다.
		std::queue<std::string> downloaded_pages;
		std::mutex m;
		std::condition_variable cv;

		std::vector<std::thread> producers;
		for (int i = 0; i < 5; i++) {
			producers.push_back(
				std::thread(producer, &downloaded_pages, &m, i + 1, &cv));
		}

		int num_processed = 0;
		std::vector<std::thread> consumers;
		for (int i = 0; i < 3; i++) {
			consumers.push_back(
				std::thread(consumer, &downloaded_pages, &m, &num_processed, &cv));
		}

		for (int i = 0; i < 5; i++) {
			producers[i].join();
		}

		// 나머지 자고 있는 쓰레드들을 모두 깨운다.
		cv.notify_all();

		for (int i = 0; i < 3; i++) {
			consumers[i].join();
		}
	}
}

// https://en.cppreference.com/w/cpp/thread/condition_variable
// 좀더 알고 싶다면,
// 여기서의 예제가 좀더 알기 쉽게 되어있다.

// `std::mutex` 대신 `std::shared_mutex`를 사용해야 합니다. 크기는 8바이트이고 성능은 `std::mutex`보다 높습니다.
// https://developercommunity.visualstudio.com/t/c-stdmutex-size-on-x64-86-is-80-bytes/334696
// https://docs.microsoft.com/ko-kr/cpp/standard-library/shared-mutex?view=msvc-170

#include <shared_mutex>

std::shared_mutex s;
void temp()
{
	// lock shared, 스레드가 뮤텍스의 공유 소유권을 가져올 때까지 호출 스레드를 차단.
	// unlock_shared 메서드는 스레드를 호출하여 가져온 뮤텍스의 공유 소유권을 해제합니다.
	// try_lock_shared 메서드는 차단 없이 뮤텍스에 대한 공유 소유권을 가져오려고 시도합니다. 
	// 반환 형식은bool로 변환할 수 있으며, true면 메서드가 소유권을 가져옵니다.
}

## 동기 비동기 실행
#pragma once

/*
예를 들어서 여러분이 하드 디스크에서 파일을 읽는다고 생각해봅시다. SSD 가 아니라, 하드 디스
크를 사용한다면, 임의의 위치에 쓰여져 있는 파일을 읽는데 시간이 상당해 오래 걸립니다.
왜냐하면 하드 디스크의 경우 헤드 라고 부르는 장치가 디스크에 파일이 쓰여져 있는 실제 위치 까지
가야 하기 때문이죠. 이는 하드 디스크에 있는 모터가 디스크를 돌려서 헤드를 정해진 구역에 위치
시킵니다.
보통 사용하는 7200rpm 하드 디스크의 경우 (여기서 rpm 은 모터가 돌아가는 속도를 말합니다),
평균 4.17 밀리초가 걸린다고 합니다. 램에서 데이터를 읽어내는데 50 나노초가 걸리는 것에 비해
대략 8만배 정도 느린 셈입니다.
-------------------------------------------------------------------------------------------
string txt = read("a.txt"); // 5ms
string result = do_something_with_txt(txt); // 5ms
do_other_computation(); // 5ms 걸림 (CPU 로 연산을 수행함)
read 함수가 파일이 하드 디스크에서 읽어지는 동안 기다리기
때문입니다. 다시 말해 read 함수는 파일 읽기가 끝나기 전 까지 리턴하지 않고, CPU 는 아무것도
하지 않은 채 가만히 기다리게 됩니다.
이렇게, 한 번에 하나씩 순차적으로 실행 되는 작업을 동기적 (synchronous) 으로 실행 된다고
부릅니다.
만일 read 함수가 CPU 를 계속 사용한다면, 동기적으로 작업을 수행해도 문제될 것이 없습니다.
하지만 실제로는 read 함수가 하드 디스크에서 데이터를 읽어오는 동안 CPU 는 아무런 작업도
하지 않기 때문에, 그 시간에 오히려 CPU 를 놀리지 않고 do_other_computation 과 같은
작업을 수행하는 것이 더 바람직합니다.
-------------------------------------------------------------------------------------------
void file_read(string* result) {
	string txt = read("a.txt"); // (1)
	*result = do_something_with_txt(txt);
}
int main() {
	string result;
	thread t(file_read, &result);
	do_other_computation(); // (2)
	t.join();
}
위 코드의 수행 시간은 어떻게 될까요? 예를 들어서 쓰레드 t 를 생성한 뒤에 바로 새로운 쓰레드에서
file_read 함수를 실행한다고 해봅시다.
이와 같이 프로그램의 실행이, 한 갈래가 아니라 여러 갈래로 갈라져서 동시에 진행되는 것을 비동
기적(asynchronous) 실행 이라고 부릅니다. 자바스크립트와 같은 언어들은 언어 차원에서 비동
기적 실행을 지원하지만, C++ 의 경우 위와 같이 명시적으로 쓰레드를 생성해서 적절히 수행해야
했었습니다.
하지만 C++ 11 표준 라이브러리를 통해 매우 간단히 비동기적 실행을 할 수 있게 해주는 도구를
제공하고 있습니다.
-------------------------------------------------------------------------------------------
*/

#include <thread>
#include <future>
#include <functional>
namespace c17_asynchronous
{
	int some_task(int x) { return 10 + x; }
	void test()
	{
		std::packaged_task<int(int)> task(some_task);
		// promise로 부터 future을 설정함.
		std::future<int> start = task.get_future();
		std::thread t(std::move(task), 5); // 복사 생성이 불가능 하므로, 명시적으로 std::move를 해줘야함...
		// ...
		t.join();
	}
	void async()
	{
		auto f1 = std::async([]() {return 3; }); // future<int>로 형식연역된다.

		f1.get();
	}
}

## 스레드 풀
#pragma once

/*
	
	2011 12 25
*/

#include <thread>
#include <functional>
#include <queue>
#include <vector>
#include <mutex>
namespace c17_thread_pool_v1
{

	class Thread_pool
	{
	private:
		// 쓰레드를 보관하는 벡터
		std::vector<std::thread> threads;
		// 할일을 보관하는 job큐
		std::queue<std::function<void()>> jobs;

		// queue는 멀티 쓰레드 환경에서 안전하지 않기 때문에..
		// condition_variable과 mutex를 사용함.
		std::condition_variable cv_jobs;
		std::mutex m_jobs;

		// 모든 스레드를 종료시키기 위한 맴버 변수
		bool stop_all;

		void work_thread()
		{
			while (true)
			{
				std::unique_lock lock(this->m_jobs);

				cv_jobs.wait(lock, [this] () -> bool
					{ 
						return this->jobs.empty() == false || this->stop_all == true; 
					});

				if (this->stop_all == true)
				{
					return;
				}

				// 루프에 의해 조건이 충족될 때마다 job을 하나씩 처리함.
				auto job = std::move(jobs.front());
				jobs.pop();

				// que를 바꿨으니,, 이제 que의 지배권을 넘겨준다.
				lock.unlock();

				job();
			}
		}

	public:
		Thread_pool(size_t num_threads) :
			stop_all(false)
		{
			printf("this ref : %d\n", (int)this);
			threads.reserve(num_threads);
			for (int i = 0; i < num_threads; ++i)
				threads.emplace_back([this] 
					{ 
						this->work_thread(); 
					});
		}

		~Thread_pool()
		{
			printf("close is called\n");

			// 종료를 위해서 모든 쓰레드를 정리함.
			stop_all = true;
			this->cv_jobs.notify_all();

			// 쓰레드 종료 확인.
			for (auto& thread : threads)
				thread.join();
		}

		void enqueue_job(std::function<void()> job)
		{
			if (stop_all)
			{
				throw std::runtime_error("ThreadPool이 사용 중지됨.");
			}
			{
				printf("enqueue job.\n");
				std::lock_guard lock(this->m_jobs);
				//job();
				jobs.emplace(std::move(job));
				//auto get = std::move(jobs.front());
				//jobs.pop();
				//get();
			}

			this->cv_jobs.notify_one();
		}
	};
}

int main()
{

}

## 모어 스레드 풀
#pragma once

/*
	2021 12 25
	사용하기 쉽게, 이해하기 쉽게, 보기 쉽게 하기 위해 
	최소단위로 쪼개는 것은 매우 중요하다.
*/

#include <utility>

#include <queue>
#include <functional>
#include <future>

#include <condition_variable>
#include <mutex>

namespace thread_pool
{
	class jobs
	{
		std::queue<std::function<void()>> function_queues;
	};

	template <typename T>
	concept is_worker 
		= (
			true
		);

	class workers
	{
		std::condition_variable condtion_variable;
		std::vector<std::thread> worker_threads;
	public:
		workers(int num_of_thread)
		{
		}
	};

	template <
		typename Workers, 
		typename Jobs
	>
	requires 
	is_worker<Workers>
	class job_worker
	{

	};

	job_worker<workers, jobs> a;
}

///*
//	
//	2011 11 28
//	씹어먹는 C++에서 가져옴.
//*/
//
//#include <chrono>
//#include <condition_variable>
//#include <cstdio>
//#include <functional>
//#include <future>
//#include <mutex>
//#include <queue>
//#include <thread>
//#include <vector>
//
//namespace c17_thread_pool_v2
//{
//	class ThreadPool {
//	public:
//		ThreadPool(size_t num_threads);
//		~ThreadPool();
//		// job 을 추가한다.
//		template <class F, class... Args>
//		std::future<decltype(std::invoke(declval<F>(), declval<Args>()...))> EnqueueJob(
//			F&& f, Args&&... args);
//	private:
//		// 총 Worker 쓰레드의 개수.
//		size_t num_threads_;
//		// Worker 쓰레드를 보관하는 벡터.
//		std::vector<std::thread> worker_threads_;
//		// 할일들을 보관하는 job 큐.
//		std::queue<std::function<void()>> jobs_;
//		// 위의 job 큐를 위한 cv 와 m.
//		std::condition_variable cv_job_q_;
//		std::mutex m_job_q_;
//		// 모든 쓰레드 종료
//		bool stop_all;
//		// Worker 쓰레드
//		void WorkerThread();
//	};
//	ThreadPool::ThreadPool(size_t num_threads)
//		: num_threads_(num_threads), stop_all(false) {
//		worker_threads_.reserve(num_threads_);
//		for (size_t i = 0; i < num_threads_; ++i) {
//			worker_threads_.emplace_back([this]() { this->WorkerThread(); });
//		}
//	}
//	void ThreadPool::WorkerThread() {
//		while (true) {
//			std::unique_lock<std::mutex> lock(m_job_q_);
//			cv_job_q_.wait(lock, [this]() { return !this->jobs_.empty() || stop_all; });
//			if (stop_all && this->jobs_.empty()) {
//				return;
//			}
//			// 맨 앞의 job 을 뺀다.
//			std::function<void()> job = std::move(jobs_.front());
//			jobs_.pop();
//			lock.unlock();
//			// 해당 job 을 수행한다 :)
//			job();
//		}
//	}
//	ThreadPool::~ThreadPool() {
//		stop_all = true;
//		cv_job_q_.notify_all();
//		for (auto& t : worker_threads_) {
//			t.join();
//		}
//	}
//	template <class F, class... Args>
//	std::future<decltype(std::invoke(declval<F>(), declval<Args>()...))>
//		ThreadPool::EnqueueJob(
//			F&& f, 
//			Args&&... args
//		) 
//	{
//		if (stop_all)
//		{
//			throw std::runtime_error("ThreadPool 사용 중지됨");
//		}
//		using return_type = typename std::invoke_result<F, Args...>::type;
//		auto job = std::make_shared<std::packaged_task<return_type()>>(
//			std::bind(std::forward<F>(f), std::forward<Args>(args)...));
//		std::future<return_type> job_result_future = job->get_future();
//		{
//			std::lock_guard<std::mutex> lock(m_job_q_);
//			jobs_.push([job]() { (*job)(); });
//		}
//		cv_job_q_.notify_one();
//		return job_result_future;
//	}
//}

## Specific struct - 문자열 string.h
#pragma once

#include <string>
#include <iostream>
namespace c17_literal_expend
{
	void literal_expend_test()
	{
		char; char16_t; char32_t; wchar_t;
		/*
			읽을때 주의사항
				string은 편의를 위하여 작성함. 모든 string은 위의 const char* 형으로 변환 가능
				c++에서 기본 처리는 utf-8이다. (환경설정에 따라 변경될 수 있도고 생각됨. 확인필요)
		*/

		std::string str = "" "" ""; // 이런식으로 작성해도 된다.. 놀라운 사실.
		std::string raw_string 
			= R"( 이안에 있는 모든 것이 문자열로 처리됨 
보기 이쁘지는 않음...)";

		std::string u8_str = "UTF - 8 문자열";			// 문자를 1~4바이트로 표현한다.
		std::u16string u16_str = u"UTF - 16 문자열";	// 문자를 2,4바이트로 표현한다.
		std::u32string u32_str = U"UTF - 32 문자열";	// 문자를 4바이트로 표현한다.
		std::wstring wstr = L"world wide 문자열";		// Linux에서 wchar_t는 4 바이트이고 Windows에서는 2 바이트입니다.

#pragma message (__FILE__ "(" _CRT_STRINGIZE(__LINE__) ")" ": warning: 문자열 타입간 형변환 방법이 궁금.")
		/*
		
			https://github.com/nemtrif/utfcpp
			utf간의 변환 라이브러리
		
		*/
		// to utf-8 
		{
			std::cout << "to utf - 8" << std::endl;

			std::string from_u8		(u8_str.begin(), u8_str.end());
			std::string from_u16	(u16_str.begin(), u16_str.end());
			std::string from_u32	(u32_str.begin(), u32_str.end());
			std::string from_w		(wstr.begin(), wstr.end());

			std::cout << from_u8.c_str() << std::endl;
			std::cout << from_u16.c_str() << std::endl;
			std::cout << from_u32.c_str() << std::endl;
			std::cout << from_w.c_str() << std::endl;
		}
		// to utf-16 
		{
			std::cout << "to utf - 16" << std::endl;

			std::u16string from_u8(u8_str.begin(), u8_str.end());
			std::u16string from_u16(u16_str.begin(), u16_str.end());
			std::u16string from_u32(u32_str.begin(), u32_str.end());
			std::u16string from_w(wstr.begin(), wstr.end());

			std::cout << from_u8.c_str() << std::endl;
			std::cout << from_u16.c_str() << std::endl;
			std::cout << from_u32.c_str() << std::endl;
			std::cout << from_w.c_str() << std::endl;
		}
		// to utf-32
		{
			std::cout << "to utf - 32" << std::endl;

			std::u32string from_u8(u8_str.begin(), u8_str.end());
			std::u32string from_u16(u16_str.begin(), u16_str.end());
			std::u32string from_u32(u32_str.begin(), u32_str.end());
			std::u32string from_w(wstr.begin(), wstr.end());

			std::cout << from_u8.c_str() << std::endl;
			std::cout << from_u16.c_str() << std::endl;
			std::cout << from_u32.c_str() << std::endl;
			std::cout << from_w.c_str() << std::endl;
		}
		// to world wide
		{
			std::cout << "to world wide" << std::endl;

			std::wstring from_u8(u8_str.begin(), u8_str.end());
			std::wstring from_u16(u16_str.begin(), u16_str.end());
			std::wstring from_u32(u32_str.begin(), u32_str.end());
			std::wstring from_w(wstr.begin(), wstr.end());

			std::cout << from_u8.c_str() << std::endl;
			std::cout << from_u16.c_str() << std::endl;
			std::cout << from_u32.c_str() << std::endl;
			std::cout << from_w.c_str() << std::endl;
		}


		/*
		
			string_view는 데이터를 생성하지 않고 읽기만 하는 자료형임.
			string_view의 sub_str는 string_view를 반환함.
			다만 이때도 데이터를 생성하지 않기 때문에 원본이 파괴되면 이를 이용한 모든 string_view가 망가짐.
		
		*/
		{
			const char* text = "test";
			std::string_view sv = text;
			std::u16string_view;
			std::u32string_view;
			std::wstring_view;
		}
	}
}

## 재귀 호출의 개념
Recursive call(재귀 호출의 개념)   
재귀 호출은 알고리즘이나 자료 구조론에서는 매우 중요한 개념 중 하나입니다.
또한 재귀 호출을 사용하면 복잡한 문제도 매우 간단하게 논리적으로 접근하여 표현할 수 있습니다.   

진짜 좋네....
http://www.tcpschool.com/c/c_function_recursive   

재귀 호출은 다양한 알고리즘을 표현한 의사 코드를 그대로 코드로 옮길 수 있게 해줍니다.
따라서 재귀 호출은 직관적인 프로그래밍을 하는데 많은 도움을 줍니다.   

스택 오버플로우(stack overflow)는 메모리 구조 중 스택(stack)영역에서
 해당 프로그램이 사용 할 수 있는 메모리 공간 이상을 사용하려고 할 때 발생합니다.

재귀 호출로 실행하는 것은 for문보다 느리기는 합니다.

-----------------------------------

https://sudeky.tistory.com/156 

알고리즘에 따라 특정 상황에서 유리한, 또 다른 상황에서는 불리한 알고리즘이 있지만,
성능 이외에 알고리즘의 또 단른 특성 중 하나는 어떤 이해 및 구현의 난이도를 보이냐입니다.
보통 초기 구현과정에서는 가장(이해 구현이) 쉬운 알고리즘을 사용하며,
해당 알고리즘의 적용이 문제 해결의 correctness를 보장한다는 사실을 확인한 이후에
보다 어렵지만 나은 성능을 보이는 알고리즘으로 대체하는 것이 가능합니다. 

정렬은 컴퓨터 공학의 오래된 연구 분야이므로 이미 아주 훌륭한 정렬 관련 라이브러리가 존재합니다.

주요 관심사. 어떻게 이걸 생각해 낼 수 있었을까? 그리고 어디에 쓸 수 있을까?

##
- [ ] [역사상 가장 완벽한 C++/게임 개발 인터뷰 질문 요약 (2) - 가상 기능, 메모리, STL](https://jerish.blog.csdn.net/article/details/99098535)
- [ ] [4년 동안 언리얼 엔진을 사용한 네트워크 아키텍처 공개](https://blog.csdn.net/csdnnews/article/details/106935212?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-9-106935212-blog-105101177.pc_relevant_multi_platform_whitelistv3&spm=1001.2101.3001.4242.6&utm_relevant_index=12)
- [ ] ["Exploring in UE4" 게임 캐릭터의 동작 원리(파트 1)](https://blog.csdn.net/u012999985/article/details/105101177)


## TCHAR
요즘은 문자를 처리할 때 유니코드를 주로 사용합니다. WBCS라고 하며 모든 문자와 숫자를 2바이트로 처리합니다.

 

모든 프로그램이 유니코드를 사용하면 좋겠지만.... 실상은 아니죠.

 

초창기, 문자열 처리는 아스키코드로 사용해왔고, 아스키 코드는 1바이트로 구성됩니다.

 

그리고 초창기부터 사용되어 왔던 아스키코드를 지금도 사용하고 있죠.

 

C/C++에선 유니코드를 사용함에 따라 문자열 처리를 1바이트와 2바이트 이 두개를 신경써서 해야 했고,

 

결론적으로 유니코드를 처리할 수 있는 자료형을 만들어 냅니다.

 

바로 앞에 w를 붙인 자료형이죠.

 

아래 자료형 선언은 <Windows.h> 헤더파일에 정의되어 있습니다.

(정확히 말하자면 winnt.h에 있지만 이 해더파일을 Windows.h가 포함하고 있습니다.)

char = 1바이트
wchar_t = 2바이트
 
wchar_t로 선언된 char형은 2바이트로 처리하게 됩니다.

 

하지만 MS에선 이 자료형들에 대해 일관성을 부여하기위해 typedef를 사용해 대문자로 사용합니다.

char -> CHAR
wchar_t -> WCHAR
 
 

char 를 대문자인 CHAR로

wchar_t 를 대문자인 WCHAR로 말이죠.

 

따라서 아스키코드를 사용하는 프로그램은 CHAR를 사용하면 되고

유니코드를 사용하는 프로그램은 WCHAR를 사용하면 됩니다.

 

 

 

그러면 상수 문자열은 어떻게 처리해야 할까요??

예를들자면 이런거 말입니다.

char arr[] = "hi my name";
printf("안녕하세요?\n");
 

이런 문자열들은 상수로 선언된 것입니다. 이것들은 기본적으로 1바이트로 구성되어 있죠.

따라서 프로그래머는다음 키워드를 통해 2바이트로 바꿔줘야 합니다.

 

char arr[] = L"hi my name";
printf(L"안녕하세요?\n");
 
 

문자열 앞에 'L'을 붙여주는 것이죠. 이렇게 하면 해당 문자열은 2바이트로 처리가 됩니다.

 

 

 

하지만 여기서 불편한 점이 생김니다.

 

아스키코드로 사용된 프로그램이 유니코드를 사용해야 한다면.....

혹은 유니코드로 사용된 프로그램이 아스키코드를 사용해야 한다면....

 

똑같은 프로그램을 유니코드용과 아스키코드용으로 만들어야 합니다.

즉, 2개의 프로그램이 필요한 것이죠.

 

이러한 점 때문에 MS에선 한가지 방법은 고안해 냅니다.

 

전처리 함수를 통해 유니코드일 땐 WCHAR로 변환해서 사용하고 아스키코드일땐 CHAR로 변환해서 사용하는 것입니다.

 

컴파일러의 설정에 따라서 말이죠.

 

즉, 프로그래머는 사용환경에 맞춰 컴파일 빌드만 바꿔주면 아스키코드용 프로그램이 만들어지고

유니코드용 프로그램이 만들어 지는 것입니다.

 

그리고 이를 정의하 전처리 함수는 다음과 같습니다.

#ifdef UNICODE
    typedef WCHAR TCHAR;
#else
    typedef CHAR TCHAR;
#endif
 
 

 

TCHAR로 통일하는 것입니다. 

(다른 자료형들도 많이 있지만(LPTSTR, LPCTSTR 등) 생략했습니다.)

 

그리고 상수로 표현하는 문자열의 처리도 다음과 같이 정의되어 있습니다.

#ifdef _UNICODE
    #define __T(x) L ## x
#else
    #define __T(x) x
#endif

#define _T(x)        __T(x)
#define _TEXT(x)     __T(x)
 
 

따라서 문자열 앞에 '_T'를 붙여주면 컴파일 환경에 따라 문자열을 처리할 수 있게 됩니다.

그리고 이걸 사용하기 위해선 <tchar.h> 헤더 파일을 선언해 줘야합니다.

 

보통은 <Windows.h>와 <tchar.h> 요 두를 동시에 선언하는게 보편적입니다.