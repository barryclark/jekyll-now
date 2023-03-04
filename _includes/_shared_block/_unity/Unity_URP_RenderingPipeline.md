[RenderingPipelineAsset](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@12.1/manual/universalrp-asset.html)

URP 자산은 유니버설 렌더 파이프라인의 여러 그래픽 기능과 품질 설정을 제어합니다. 'RenderPipelineAsset'에서 상속되는 스크립터블 객체입니다. 그래픽 설정에서 에셋을 할당하면 Unity는 빌트인 렌더 파이프라인에서 URP로 전환합니다. 그런 다음 다른 곳에서 찾는 대신 URP에서 직접 해당 설정을 조정할 수 있습니다.

여러 URP 자산을 보유하고 자산 간에 전환할 수 있습니다. 예를 들어 하나는 그림자를 켜고 다른 하나는 그림자를 끌 수 있습니다. 효과를 보기 위해 자산 간에 전환하는 경우 매번 그림자에 해당하는 설정을 수동으로 전환할 필요가 없습니다. 그러나 렌더 파이프라인이 호환되지 않으므로 HDRP/SRP와 URP 자산 간에 전환할 수 없습니다.

