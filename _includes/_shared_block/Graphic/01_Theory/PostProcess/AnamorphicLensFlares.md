Chameleon PostProcess입니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/8af42e2c-3a29-451c-b6c0-a37cc4a80ada)

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/7d65f0af-8bad-43d8-b290-88b58b014f14)

1. 누적된 빛을 구합니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/d5328607-ab0c-4270-8d86-bd544003df0b)

```hlsl
int tIndex = 14;
UV = GetDefaultSceneTextureUV(Parameters, 14);
half TotalLuminance = Luminance( LinearColor ) * ExposureScale;
half BloomLuminance = TotalLuminance - BloomThreshold.x;
half BloomAmount = saturate(BloomLuminance / 2.0f);
float4 OutColor = float4(0,0,0,0);
OutColor.rgb = (BloomAmount * LinearColor); 
if(BloomAnamorphicIntensity == 0 || BloomAnamorphicSteps == 0) return SceneTextureLookup(UV,tIndex,false).rgb;
float2 newUv;
float offset;
float3 modifier;
int steps = BloomAnamorphicSteps + 1;
float3 sample = float3(0,0,0);
float3 result = float3(0,0,0);
for(int i = 1, j = 0; i < steps; i++, j++)
{
	offset = 1.0 / steps * j * BloomAnamorphicLength;
	modifier = BloomAnamorphicTint.rgb / i;
	newUv = abs(UV+float2(-offset, 0));
	sample = pow(SceneTextureLookup(newUv,tIndex,false).rgb*2.0, 8.0);
	result += sample * modifier;
	newUv = abs(UV+float2(offset, 0));
	sample = pow(SceneTextureLookup(newUv,tIndex,false).rgb*2.0, 8.0);
	result += sample * modifier;
}
result -= (BloomThreshold.x*2);
result *= BloomAnamorphicIntensity;
OutColor.rgb += result;
OutColor.rgb *= 0.5f;
return OutColor;
```

* [Luminance](https://docs.unrealengine.com/5.2/en-US/BlueprintAPI/Math/Color/Luminance_LinearColor/)

2. 원래 화면과 누적된 빛 화면을 블렌드합니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/1cf29201-a363-46ef-87f8-9abe40a2ed41)
