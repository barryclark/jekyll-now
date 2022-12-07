---
layout: post
title: Localize, Build, Packaging
---

**Unreal 4.27.2**

<center><div class="mermaid"> 
graph LR;
A(Localization\n현지화할 언어 추가\n 번역 및 현지화 애셋추가)-->B;
B(Language & Culture\n언어 및 문화설정)--->C;
C(Packaging & Cooking\n런치할 프로젝트 설정\n프로젝트 런치);
</div></center>

## Localization(현지화)

- [ ] 코드 텍스트 현지화

[Localization](https://docs.unrealengine.com/4.27/en-US/ProductionPipelines/Localization/ManageActiveCultureRuntime/)

활성 문화를 변경하여 언어, 로케일, 문화를 한번에 설정할 수 있습니다. 이를 통해 텍스트가 어떻게 보여야할지, 어떤 애셋이 보여야할지 결정할 수 있습니다.

* Language는 어떤 현지화 데이터를 사용해야 하는지 알아내는 데 사용됩니다.
* Locale은 국제화 라이브러리 내에서 숫자/날짜/시간.등의 형식을 제어하는데 사용됩니다.
* Asset group culture는 기본 프로젝트 언어와 다른 문화권을 할당할 수 있는 자산 클래스 그룹(애셋 현지화)를 만들 수 있습니다.

<details><summary>현지화 언어 추가하기</summary>
<div markdown="1">

1. Window/Localization Dashboard창을 엽니다. 
2. 하단의 Add New Culture를 통해 문화를 추가합니다.
3. Cultures에서 Compile Text를 하면 해당 문화를 사용할 수 있게됩니다.

<center><div markdown="1">

![Open Localization Dashboard](/images/OpenLocalizationDashboard.png)

</div></center>

</div></details>

현지화할 언어를 추가하면, 번역 및 애셋을 현지화할 수 있습니다.

* 기본 언어로 설정된 부분은 기본이므로 현지화할 필요 없습니다.

<details><summary>Text Localization(텍스트 현지화)</summary>
<div markdown="1">

**패키지의 텍스트 현지화**

1. Gather from Packages를 활성화 합니다.
2. 수집할 저장소를 설정합니다.
3. 텍스트를 수집합니다.
4. 텍스트를 번역한 후 컴파일 합니다.

<center><div markdown="1">

![TextLocalizationStandalonTest](/images/TextLocalizationStandalonTest.gif)

</div></center>

<center><div markdown="1">

![Open Localization Dashboard](/images/TextTranslationExportAndImport.png)

</div></center>

</div></details>

<details><summary>Asset Localize(애셋 현지화)</summary>
<div markdown="1">

[How to Localize Assets in Unreal Engine](https://www.youtube.com/watch?v=rcj1zrCWA6I)

1. 애셋을 현지화합니다.
2. 현지화된 애셋을 수정합니다.

* View Options/Show Localized Content를 활성화하면 L10N/`culture`에 추가된 현지화 애셋을 볼 수 있습니다.

![Open Localization Dashboard](/images/AddLocalizedAsset.png)

General/Region&Langu...에서 Preview Game language에서 원하는 언어를 설정한 후 독립형으로 실행하면, 애셋이 변경되는 것을 볼 수 있습니다. 또는 빌드 후 현지화를 확인할 수 있습니다.

<center><div markdown="1">

![Localize Build Test](/images/LocalizeBuildTest.gif)

</div></center>

</div></details>

## Language(언어) & Culture(문화)

- [ ] 메모리해제를 위해서 해당 에셋을 메모리에서 해제하는 방법
- [ ] 메모리해제를 위해서 빈 레벨로 이동, 모든 자산 해제 후 되돌아가기

에디터 또는 런타임에서 언어 및 문화를 변경하여 현지화할 수 있습니다.

* **같은 프로젝트명을 사용할 경우 같은 INI을 사용하게됩니다.**

<details><summary>에디터에서 활성문화 변경하기</summary>
<div markdown="1">

활성문화의 변경은 Engine의 'SetCurrentCulture`를 이용해 변경할 수 있습니다. Save to Config를 이용하여 마지막으로 설정한 문화를 설정할 수 있습니다.

![Localize Build Test](/images/LocalizeTestCode.png)

</div></details>
<details><summary>SetCurrentCulture</summary>
<div markdown="1">

GGameUserSettingsIni에 Culture를 변경하고 저장합니다.

```cpp
bool UKismetInternationalizationLibrary::SetCurrentCulture(const FString& Culture, const bool SaveToConfig)
{
	if (FInternationalization::Get().SetCurrentCulture(Culture))
	{
		if (!GIsEditor && SaveToConfig)
		{
			GConfig->SetString(TEXT("Internationalization"), TEXT("Culture"), *Culture, GGameUserSettingsIni);
			GConfig->EmptySection(TEXT("Internationalization.AssetGroupCultures"), GGameUserSettingsIni);
			GConfig->Flush(false, GGameUserSettingsIni);
		}
		return true;
	}

	return false;
}
```

[How to quickly access the gameusersetting.ini location](https://pubgsettings.com/gameusersettings-location/)

다음에서 GGameUserSettingsIni은 `%localappdata%\TslGame\Saved\Config\WindowsNoEditor`에 위치합니다. 예로 C:\Users\Username\AppData\Local\ProjectName\Saved\Config\WindowsNoEditor\GameUserSettings.ini에서 Ini를 볼 수 있습니다.

</div></details>

<details><summary>블루프린트 프로젝트인 경우 빌드되는 실행파일명 바꾸기</summary>
<div markdown="1">

[Specify the name of packaged exe?](https://forums.unrealengine.com/t/specify-the-name-of-packaged-exe/375605)

블루프린트 프로젝트인 경우 .uproject의 파일이름을 편집하면 빌드시 exe의 파일을 변경할 수 있습니다.

</div></details>


애셋이 메모리에 로드되어있다면, Culture가 변경되도 런타임에 게임에서 변경되지 않습니다.

<details><summary>Asset을 런타임에 다시 불러오는 방법에 대해서</summary>
<div markdown="1">

[How Can I Load/Reload Localized Assets at Runtime?](https://forums.unrealengine.com/t/how-can-i-load-reload-localized-assets-at-runtime/380289) 

현재 런타임 시 콘텐츠 핫 리로딩을 지원하지 않으므로 안타깝게도 문화권을 변경한 후 **현지화된 자산을 다시 로드하는 유일한 방법은 해당 Asset이 제거되고 다시 로드되는지 확인하는 것입니다.** 메인 메뉴에만 있는 경우 메인 메뉴 세계를 다시 로드하는 경우일 수 있지만 **전역적으로 로드된 참조는 다시 시작해야 하는 문제를 일으킬 수 있습니다.**

</div></details>

## Packaging(패키징) & cooking(쿠킹)

[Build Operations: Cook, Package, Deploy, and Run](https://docs.unrealengine.com/4.27/ko/SharingAndReleasing/Deployment/BuildOperations/)

Unreal Engine 4 프로젝트에 사용할 수 있는 빌드 작업(쿠킹, 패키지, 실행 및 배포)에 대한 개요를 설명합니다.

* 파일 메뉴에서 프로젝트를 패킹할 프랫폼을 선택할 수 있습니다.
* Project Launcher에서는 기본 프로필을 사용하거나 사용자 지정 프로필을 만들어 프로젝트의 최신 빌드에 대한 프로파일링 또는 디버깅과 같은 작업을 수행할 수 있습니다. [Project Launcher](https://docs.unrealengine.com/4.27/ko/SharingAndReleasing/Deployment/ProjectLauncher/)에서 추가적인 정보를 볼 수 있습니다.

<details><summary>현지화 확인을 위한 커스텀 실행 프로파일 설정</summary>
<div markdown="1">

- [ ] 빌드시 Command로 컬쳐 설정
- [ ] 설정에서 실행파일 이름 변경

현지화한 빌드를 출력하는 것이 목표이므로 
1. 블루프린트 프로젝트의 .uproject를 복사하여 ..._ko, ..._en을 각각 추가

Custom Project Launcher을 각각추가한 다음 세팅을
1. Project를 해당하는 프로젝트로 설정 (예를 들어 Localize_en)
2. Build를 Build로 설정
3. Cook을 By the book으로 설정
4. Package에 확인하기 쉬운 위치에 저장되도록 설정
5. Deploy를 Do not deploy로 설정

두 커스텀 실행 프로파일을 실행하면, 이름이 다른 두 빌드를 얻을 수 있습니다.

<center><div markdown="1">

![Custom Project Launch](/images/CustomProjectLaunch.gif)

</div></center>

</div></details>

## UBT(Unreal Build Tool)

[compiling-unreal](https://github.com/Allar/compiling-unreal)

언리얼 빌드툴이 어떻게 작동하는지 설명합니다.

[Targets](https://docs.unrealengine.com/4.26/en-US/ProductionPipelines/BuildTools/UnrealBuildTool/TargetFiles/)

* 게임을 실행하려면 쿠킹된 데이터가 필요한 독립 실행형 게임입니다.
* 클라이언트는 게임과 동일하지만 서버 코드를 포함하지 않습니다. 네트워크 게임에 유용합니다.
* 서버는 게임과 동일하지만 클라이언트 코드를 포함하지 않습니다. 네트워크 게임의 전용 서버에 유용합니다.
* 에디터는 Unreal Editor를 확장하는 대상입니다.
* 프로그램은 언리얼 엔진 위에 구축된 독립 실행형 유틸리티 프로그램입니다.

[Command-Line Arguments](https://docs.unrealengine.com/4.26/en-US/ProductionPipelines/CommandLineArguments/)

명령줄 인수 는 명령줄 또는 실행 파일에 대한 바로 가기를 통해 실행 파일을 실행할 때 전달할 수 있는 키워드 문자열입니다. 그 목적은 개발자나 사용자의 요구에 맞게 엔진이 실행되는 방식을 사용자 지정하는 것입니다. 이는 게임 대신 편집기를 실행하는 것처럼 간단할 수도 있고, 각 프레임을 개별 이미지 파일로 덤프하는 동안 지정된 해상도와 프레임 속도로 실행되는 특정 맵으로 게임을 시작하는 것과 같이 훨씬 더 복잡할 수도 있습니다.