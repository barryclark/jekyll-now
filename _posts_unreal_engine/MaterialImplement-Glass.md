---
layout: post
title: Glass material
---

## Glass의 색감
* [How to Create A Glass Material](https://www.youtube.com/watch?v=a16EGZreJlM)

MaterialDomain = Surface;   
BlendMode = Translucent;   
LightingMode = SurfaceTranslucencyVolume;   

BaseColor = float4(0.005, 0.001, 0.00848, 0.996);   
Metalic = 0.1;   
Soecykar = 26;   
Roughness = 0.1;   
Alpha = Fresnel_function(Power = 1.5);   
Opacity = Lerp (0.008, 0.9, Alpha);   
Replaction = Lerp (1.05, 0.95, Alpha);   

* [UE4 Tutorial: Milky Glass](https://www.youtube.com/watch?v=527ZcxYnf_s)

Translucent material은 scene color texture를 가져올 수 있습니다.
SpiralBlur - SceneTexture를 사용할 수 있습니다. Opacity와 Emmisive에 올바른 값을 연결하면 작동합니다.

* 결론

? 내부적으로 어떻게 작동하는지 모르니, 이걸 활용하는 방법을 모르겠네에?

## Screen color를 이용한 구현
