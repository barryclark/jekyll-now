---
layout: post
title: Asset with cpp
---

## Asset의 경로
언리얼 프로젝트에서 모든 Asset은 경로(Path)기반으로 관리됩니다.

* 에셋의 경로 정보는 컨텐츠 브라우저에서 Asset을 우클릭한 다음 "레퍼런스 복사"를 누르면, 경로 정보가 클립보드에 복사되어, 코드에서 바로 붙여넣기하여 사용할 수 있게 됩니다.
* 인스턴스마다 불필요하게 에셋을 로드할 필요가 없는 경우 static 키워드를 붙일 수 있습니다.

## LoadClass와 LoadObject
LoadObject<T>는 애니메이션, 텍스처, 음향 효과 및 기타 리소스와 같은 청사진이 아닌 리소스를 로드하는데 사용되며,
LoadClass<T>는 청사진을 로드하고 캐릭터 청사진과 같은 청사진 클래스를 가져오는데 사용됩니다.

* 청사진으로 객체를 생성하려면 LoadClass를 통해 클래스를 가져온 다음 SpawnActor를 통해 객체를 생성해야 합니다.

```cpp
    ...
    UTexture2D* Tex = LoadObject<UTexture2D>(NULL, TEXT("FileName"));
```

## 생성자(Constructor)에서의 ConstructorHelpers
ConstructorHelpers::FObjectFinder는 Asset의 CDO(Class dfault object)를 찾으며,
FClassFinder는 UClass를 찾는 정적 로딩입니다.

* 정적 로딩은 생성자에서 반드시 완료되어야 하는 로딩 방식을 말합니다. 동적 로딩값은 런타임 중에 로딩될 수 있는 방식입니다.

```cpp
    ...
    static ConstructorHelpers::FObjectFinder<UClass> Object(TEXT("Path"));

    static ConstructHelpers::FClassFinder<UClass> Class(TEXT("Path"));

    if (Object.Succeeded())
    {
        ...
    }
    ...
```

* 다음은 Path의 예시입니다.

```
WidgetBlueprint'/Game/MainMenu/BP_MainMenu.BP_MainMenu'
```

```
/Game/MainMenu/BP_MainMenu.BP_MainMenu_C
```

참고자료 
: [UE4 c++의 동적 로딩 문제](https://www.iteye.com/blog/aigo-2281558)
, [UE4 ConstructorHelper::FObjectFinder/FClassFinder](http://sweeper.egloos.com/3208657)
, [CDO Constructor failed to find blueprint class](https://forums.unrealengine.com/t/cdo-constrcutor-failed-to-find-blueprint-class-why/397110)