---
layout: post
title: Moden graphics API term
---

[Moden graphics API Features](https://www.programmerall.com/article/67502324508/)의 내용에서 최신 그래픽스 API의 특성만을 모아 정리했습니다.

## 시작 프로세스

* InitApi는 API 내부 작업에 접근하기 위해 필요한 핵심 데이터 구조를 생성합니다.

* LoadingAssets는 그래픽 파이프라인에게 describe하기위한 데이터를 채웁니다. GPU가 수행하기위한 커멘드 버퍼를 만들고 채웁니다. 그리고 리소스를 GPU의 전용 메모리(dedicated memory)에 보냅니다.

* UpdatingAsset은 shader를 위한 어떠한 UNIFORM data를 업데이트 하는 것을 말합니다. application level에서 로직을 수행합니다.

* Presentation은 Command buffer list를 Command queue에 보내고 exchange chain을 present하는 것을 말합니다.

* AppClosed는 애플리케이션이 닫기 명령을 보내지 않으면 자산 로드, 자산 업데이트 및 프레젠테이션 단계를 반복하고, 그렇지 않으면 DESTROY 단계를 실행합니다.

* Destroy는 GPU가 나머지 작업을 모두 완료하고 모든 데이터 구조와 핸들을 파괴할 때까지 기다립니다.

## 장치

* Entry Point는 일반적으로 하나의 진입점 인스턴스만 있는 응용 프로그램의 전역 인스턴스입니다. 전역 데이터, 구성 및 상태를 저장하는 데 사용됩니다.

* Physical Device는 하드웨어 장치(그래픽 카드 1, 그래픽 카드 2, 통합 그래픽)에 따라 메모리 크기 및 기능 지원과 같은 중요한 장비별 세부 정보를 쿼리할 수 있습니다.
    - 쿼리란 사전적 정의는 문의, 혹은 질문으로 컴퓨터 언어로도 비슷한 뜻입니다. 데이터베이스에 정보를 요청한다는 뜻으로, 쉽게 말해 데이터베이스에서 원하는 애용을 찾기 위해 몇가지 코드나 키를 이용해 검색을 하는 것을 쿼리라고 합니다.

* Logical Device는 텍스처, 버퍼, 큐, 파이프와 같은 그래픽 데이터 구조와 같은 API의 핵심 내부 기능에 접근할 수 있으며 이는 대부분의 최신 그래픽 API에서 동일하며 변경 사항이 거의 없습니다. Vulkan 및 DirectX 12 논리 장치로 메모리 제어 메모리 데이터 구조 생성.

## 스왑체인

* Swapchain은 단일 버퍼링, 이중 버퍼, 세 개의 버퍼를 포함하며 다양한 상황을 처리합니다.

## 명령(Command)

* Command List은 GPU에 대한 작업을 실행하는 장치로, GPU는 프로젝트가 대기열에 추가되는 시기를 제어하는 동안 busy state에 있어야 하는 비동기 컴퓨팅 장치입니다.

* Command Allocator는 명령 버퍼 생성을 허용하여 GPU에서 실행하려는 기능을 정의할 수 있습니다.
    - N<sub>CommandAllocator</sub> = N<sub>recording thread</sub> * N<sub>buffer frame</sub> + n<sub>bundle pool</sub>
    - 명령 할당자가 증가한다는 의미는 다음과 같습니다.
        - dispenser 메모리를 복구할 수 없는 경우, recycling distributor는 최악의 경우에 CommandAllocator를 증가시킵니다.

* Command Buffer는 GPU 실행 프로세스(예: 그리기)를 설명하고 CPU-GPU 액세스 메모리에서 GPU 전용 메모리로 데이터를 복사하고 현재 그래픽 파이프와 같은 그래픽 파이프의 모든 측면을 동적으로 설정하는 비동기 컴퓨팅 장치입니다. Scissor와 같이 Vulkan의 Command Buffer는 재사용과 정확한 제어를 위해 복잡한 상태와 변환(즉, 제한된 상태 머신)을 가지고 있습니다.
    - [Scissor Rectangle](https://gamedev.stackexchange.com/questions/100890/what-is-the-difference-between-a-viewport-and-a-scissor-rectangle)은 뷰포트 내에서 작동하고 픽셀 셰이더 단계 후에 발생하며 현재 뷰포트 변환을 실제로 수정하지 않고 화면의 직사각형 부분으로 픽셀당 작업을 제한할 수 있는 기능을 제공합니다.

* **Command List는 GPU에 푸시되는 Command Buffer의 그룹입니다. 이는 GPU를 비지 상태로 만들어 CPU와 GPU간의 동기화를 줄이기 위함입니다. 각 명령 목록은 순서대로 엄격하게 실행됩니다.**

## Texture, shader

* Texture, Shader는 대부분의 최신 그래픽 API에는 UNIFORM BUFFER 및 텍스처를 이 데이터가 필요한 그래픽 파이프에 연결하는 바인딩 데이터 구조가 있습니다.
    - UNIFORM BUFFER는 셰이더 프로그램에 대한 균일한 데이터를 저장하는 데 사용되는 버퍼입니다. 이해하기 쉬운 한가지 예를 들면 셰이더 외부에 있는 데이터를 받아 셰이더 단계에서 전역변수로 사용하는 것을 말합니다.

## Shader Binding

* PIPELINE state는 래스터 드로잉 호출, 스케쥴 계산, 레이트래킹 스케쥴 시 실행되는 내용에 대한 전반적인 설명입니다. DirectX 11 및 OpenGL에는 전용 그래픽 파이프 개체가 없지만 플롯 호출 간에 호출을 사용하여 파이프라인을 설정합니다.

* Root Signature는 상수 버퍼, 구조화된 버퍼, 샘플러, 텍스처, 구조화된 버퍼 등(아래)과 같은 리소스 유형에 액세스할 수 있는 리소스 유형을 정의하는 객체입니다.

* Descriptor는 셰이더 리소스의 매개변수(예: 버퍼, 버퍼 보기, 이미지 보기, 샘플러 또는 결합된 이미지 샘플러)를 설명하는 작은 데이터 조각으로, OS 수명 주기 관리 없이 불투명한 데이터만 하드웨어를 나타내는 보기입니다.

* Descriptor HEAP (Descriptor Heap)은 셰이더에서 참조하는 객체의 설명을 저장하는 데 사용되는 메모리 할당을 처리하는 객체입니다.

## Heap, Buffer

* Heap은 GPU 전용 메모리에 리소스(예: 정점 버퍼, 텍스처)를 업로드하는 데 사용할 수 있는 GPU 메모리를 포함하는 개체입니다.

* Buffer는 주로 정점 인덱스, 정점 속성, 상수 버퍼 등을 GPU에 업로드하는 데 사용됩니다.

## Fence, Barrier, Semaphore

* Fence는 CPU와 GPU 동기화를 위한 객체입니다. CPU나 GPU는 다른 쪽이 따라잡을 수 있도록 펜스에 표시할 수 있습니다. 전체 그래픽 메모리를 보다 쉽게 ​​관리할 수 있도록 리소스 할당 및 재활용을 관리할 수 있습니다.

* Barrier는 이것은 Command Buffer에서 보다 미세하게 세분화된 동기화 형식입니다.

* Semaphore는 예를 들어 명령 버퍼가 장치 대기열에 제출되기 전과 같이 교환 체인의 다음 이미지를 얻기 전과 같이 작업 간에 종속성을 도입하기 위한 개체입니다. Vulkan의 고유성은 세마포의 양이 API의 일부인 반면 DirectX 및 Metal은 이를 OS 호출에 위임한다는 것입니다.

* Event는 명령 버퍼 내에서 작업을 동기화하는 데 사용되는 장벽과 유사합니다. UE 내부에서 Fervent는 스레드 간의 신호를 동기화하는 데 사용됩니다.

## Graphics API
Graphics API에 대한 내용은 [DirectX 12](https://docs.microsoft.com/ko-kr/windows/win32/direct3d12/directx-12-programming-guide), [OpenGL](https://www.opengl.org/sdk/docs/tutorials/), [Vulkan](https://vulkan.lunarg.com/doc/view/latest/windows/apispec.html), [Metal](https://developer.apple.com/documentation/metal)를 볼 수 있습니다.