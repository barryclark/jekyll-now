---
layout: post
title: Modern pipeline mechanism
---

## 자원 관리

<div style="text-align : center;">
    <img src="https://www.programmerall.com/images/787/a6/a6de0085364cd0e2df4a470c4ad750a3.png" style="user-select: auto;">
</div>

* 위에서 부터 아래로 Capacity(수용량)는 점점 작아지고 있지만, Bandwith(대역폭)은 점점 커지고 있습니다.
    - [Bandwith](https://www.donga.com/docs/c&c/docs/class-dic-content.html)는 한번의 접속으로 정보를 전송하는 양을 말합니다. Bandwidth의 기본단위는 보통 bits-per-second(bps)로 한 페이지(영문)은 16,000비트입니다. Full-motion, Full-screen Video는 최소한 10,000,000bps가 필요합니다.   
    [GPU의 memory bandwith란](http://i5on9i.blogspot.com/2018/08/gpu-memory-bandwidth-vram.html) GPU의 VRAM에 한번에 얼마나 많은 양을 넣고(copy to), 뺄수(copy from) 있는 지를 알려줍니다. 같은 해상도(resolution)에서 시각효과(visual effects)가 많을 수록 더 높은 memory bandwith가 필요합니다.   
        - VRAM의 총량은 GPU의 다른 중요한 요소입니다. 필요한 VRAM의 양이 현재 가능한 리소스를 넘어선다면, 게임은 계속 돌겠지만 이 부족한 ememory 부분만큼 CPU의 main memory를 이용하게 됩니다. 이것은 CPU가 DRAM에서 data를 가져오게 돼서, GPU의 VRAM에서 가져오는 시간보다 더 오래 걸리게 됩니다. 이것은 게임화면의 버벅임을 만들게 됩니다.

최신 그래픽 API는 응용 프로그램에서 리소스 저장 위치, 상태, 변환, 수명 주기, 종속성, 지정된 정확한 데이터 형식 및 레이아웃, 압축 켜기 여부 등을 정확하게 제어할 수 있습니다. 
최신 그래픽 API드라이버는 추가 메모리 관리 작업을 수행하지 않습니다. 그리고 애플리케이션은 리소스가 관리되는 방식을 알고 있기에 모든 소유권은 애플리케이션에 속합니다.

<div style="text-align : center;">
    <img src = "https://www.programmerall.com/images/226/e8/e863b62c123a09a145c65103ea106b0a.png" style="user-select: auto;">
</div>

**최신 그래픽 API에서는 거의 모든 작업이 지연되므로 대기열을 처리하는 과정에 있는 데이터와 리소스를 변경하지 않도록 합니다. 개발자는 리소스 수명 주기, 스토리지 관리 및 리소스 충돌을 처리해야 합니다.**

## 자원 할당

* DDI는 [Display driver IC](https://news.samsungdisplay.com/20785)로 디스플레이의 각 픽셀을 구동하기 위해 꼭 필요한 반도체칩입니다. 기기의 중앙처리장치로부터 어떤 화면을 구동할지 신호를 입력받아서 패널을 동작시키기 위한 출력신호를 생성하고 제어하는 역활을 합니다.
    - IC는 Intergrated Circuit의 약자로 직접회로이며 칩이나 마이크로칩이라고도 불립니다.

D3D11과 같은 기존 API는 리소스를 할당할 때 일반적으로 각 리소스는 GPU VA(가상 주소) 및 물리적 페이지에 할당 합니다.

<div style="text-align : center;">
    <img src = https://www.programmerall.com/images/798/a8/a824d6ebee01b80cbdd65323f3347c46.png style="user-select: auto;">
</div>

D3D12에서는 모든 동적 업데이트(Constant Buffer, Dynamic Vertex Buffer, Dynamic Textures등 포함)는 응용 프로그램에서 제어합니다. 이러한 동적 업데이트에는 메모리 가용성을 보장하는 필요한 GPU 펜스 또는 버퍼링이 포함됩니다.

<div style="text-align : center;">
    <img src = https://www.programmerall.com/images/551/9c/9ce4f6c5c42c8182c918a31bb3b07427.png style="user-select: auto;">
</div>

D3D12와 같은 최신 그래픽 API에서는 GPU VA와 리소스의 물리적 페이지가 분리됩니다. 응용 프로그램은 물리적 페이지 할당의 오버헤드를 더 잘 공유할 수 있고 임시 빈 메모리를 재사용하거나 장면이 더 이상 사용되지 않는 메모리를 조정할 수 있습니다.

<div style="text-align : center;">
    <img src = https://www.programmerall.com/images/632/85/85c73204a32c7bbbd080875d2d0ecec8.png
    style="user-select: auto;">
</div>

**Heap Type Memory Location**
|Type|Memory|Destinations|
|---|---|---|
|Default|Video Memory|Default, Readback|
|Upload|System Memory|Default, Readback|
|Readback|System Memory|

어떻게 사용하냐에 따라 매우큰 속도 차이를 불러올 수 있습니다.

<div style="text-align : center;">
    <img src = https://www.programmerall.com/images/681/5f/5f2dff4f3f889d46ba25798b6c828f89.png
    style="user-select: auto;">
</div>

## 자원 업데이트

최신 그래픽 API는 CPU와 GPU는 암시적 복사본이 없는 동일한 저장소를 공유합니다. (Apple A7및 SOC와 같은 CPU-GPU 아키텍처 결합에만 해당)
    - SOC란 Sytem on chip으로 단일 칩 시스템을 말합니다.

그리고 CPU와 GPU는 border observation write operations를 커멘드 버퍼에서 수행하거나 명시적인 CPU 캐시 관리가 필요하지 않는 자동 CPU 및 GPU 버퍼 일관성 모델을 가지고 있습니다.
속성은 크게 향상될 수 있지만 응용 프로그램 개발자는 더 많은 Sync를 책임져야 합니다.

런타임 컴파일 및 리소스 검증으로 인한 리소스 구조(크기, 계층, 형식)으로 인해 오버헤드가 크기 때문에 변경할 수 없지만 리소스의 내용은 변경될 수 있습니다.

데이터 버퍼를 업데이트할 때 CPU는 기존 API처럼 LockXXX 인터페이스를 호출하지 않고 직접 저장소에 액세스합니다.

텍스처 데이터를 업데이트할 때 개인 저장 영역이 구현되어 업로드 경로를 빠르고 효율적으로 시행 할 수 있습니다.

하드웨어 가속의 파이프라인 업데이트는 GPU의 COPY ENGINE을 사용하여 하드우에어 가속을 달설하는데 사용할 수 있습니다.

동일한 픽셀 크기의 텍스처에 대해 다른 픽셀 형식으로 해석되는 다른 텍스처와 스토리지를 공유할 수 있습니다.
    - 예를 들어 SRGB VS RGB, R32 VS RGBA8888을 들 수 있습니다. 텍스처는 Storage를 다른 버퍼와 공유할 수 있습니다.

픽셀 데이터가 행 선형일 때 여러 분산 텍스처 데이터가 동일한 명령 버퍼에 패키징 됩니다.

## PSO(Pipeline State Object)

D3D11에서는 GPU hardware에 without matching을 많은 작은 state objecte들이 있지만 D3D12에서는 파이프 상태를 단일 개체로 그룹화하고 PSO를 하드웨어 상태로 복사합니다.

<div style="text-align : center;">
    <img src = https://www.programmerall.com/images/352/d7/d776b84de34ed1c0fad4f92045550b90.png
    style="user-select: auto;">
</div>

## Synchronization

GPU에는 많은 수의 처리 스레드가 있습니다. 장벽이 없는 곳이면 어디에서나 드라이버와 하드웨어가 이러한 스레드를 처리하여 성능을 향상시킵니다. 그러나 GPU 쓰레드간에 의존성이 있는 경우 동기화를 위해 다양한 유형의 동기화 객체가 필요합니다.

Synchronaisation는 엄격하고 정확한 작업 순서를 보장합니다. UAV RAW WAW장벽과 같은 GPU 파이프라인 depth를 변경하여 셰이더 웨이브(WAVE) 중첩을 방지합니다.

Visibility는 다수의 작은 L1캐시, 큰 L2캐시와 같은 GPU내부의 여러 구성 요소를 포함합니다. 구체적인 예로 UAV(SHADER_RESOURCE | CONSTANT_BUFFER)를 변환하려면 텍스쳐는 L1에서 L2가 브러싱 되고 셰이더 L1을 새로고칩니다.

<div style="text-align : center;">
    <img src = https://www.programmerall.com/images/638/2c/2cc7803271603844dd66139fa3b0ac66.png
    style="user-select: auto;">
</div>

Format Conversion은 많은 GPU하드웨어는 bandwidth를 절약하기 위해 DCC(Delta Color Compression), UBWC, AFBC 등과 같은 비파괴 압축을 지원합니다. 그러나 이러한 압축된 데이터를 읽을 때 압축이 풀릴 수 있으며, UAV쓰기도 압축을 풉니다.

<div style="text-align : center;">
    <img src = https://www.programmerall.com/images/148/57/57325bdcf0c8f281398667c31047808c.png
    style="user-select: auto;">
</div>

보다 자세한 내용은 [13.4 chapter를 참고](https://www.programmerall.com/article/67502324508/)하시면 됩니다.