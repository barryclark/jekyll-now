[Font Asset](https://docs.unity3d.com/Packages/com.unity.textmeshpro@3.2/manual/FontAssets.html)

TextMesh Pro에서 다른 글꼴을 사용하려면 글꼴 자산을 만들어야 합니다. TextMesh Pro 에는 Unity의 일반 글꼴 에셋 형식 과 다르지만 관련이 있는 자체 글꼴 에셋 형식이 있습니다. Unity 글꼴 자산 에서 TextMesh Pro 글꼴 자산을 만듭니다.

[Fallback Font Asset](https://docs.unity3d.com/Packages/com.unity.textmeshpro@3.2/manual/FontAssetsFallback.html)

글꼴 아틀라스와 글꼴 에셋은 특정 수의 글리프만 포함할 수 있습니다. 정확한 수는 글꼴, 아틀라스 텍스처의 크기 및 아틀라스를 생성할 때 사용하는 설정에 따라 다릅니다. 대체 글꼴 시스템을 사용하면 TextMesh Pro가 텍스트 개체의 글꼴 자산에서 글리프를 찾을 수 없을 때 검색할 다른 글꼴 자산을 지정할 수 있습니다.

이는 다음과 같은 다양한 상황에서 유용합니다.

알파벳이 매우 큰 언어(예: 중국어, 한국어, 일본어)로 작업합니다. 대체 글꼴을 사용하여 여러 자산에 알파벳을 배포합니다.

부과된 최대 텍스처 크기로 인해 충분한 품질의 단일 아틀라스에 전체 글리프 세트를 맞출 수 없는 모바일 장치용 디자인.

텍스트에 다른 알파벳의 특수 문자를 포함합니다.

