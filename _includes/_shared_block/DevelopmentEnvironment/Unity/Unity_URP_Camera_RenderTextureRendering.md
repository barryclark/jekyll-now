[URP Camera RenderTextureRendering](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@16.0/manual/rendering-to-a-render-texture.html)

유니버설 렌더 파이프라인(URP)에서 카메라는 화면 또는 렌더 텍스처 로 렌더링할 수 있습니다. 화면에 렌더링하는 것이 기본이며 가장 일반적인 사용 사례이지만 렌더 텍스처로 렌더링하면 CCTV 카메라 모니터와 같은 효과를 만들 수 있습니다.

렌더 텍스처로 렌더링하는 카메라가 있는 경우 해당 렌더 텍스처를 화면에 렌더링하는 두 번째 카메라가 있어야 합니다. URP에서 렌더 텍스처로 렌더링하는 모든 카메라는 화면에 렌더링하는 모든 카메라보다 먼저 렌더링 루프를 수행합니다. 이렇게 하면 렌더 텍스처가 화면에 렌더링될 준비가 됩니다. URP의 카메라 렌더링 순서에 대한 자세한 내용은 렌더링 순서 및 오버드로를 참조하십시오.

