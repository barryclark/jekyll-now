Chameleon 포스트 프로세스 샘플입니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/d32ec1c9-f4d5-4e3d-aa83-3bc76a7b28f3)

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/f4bfa326-919e-4462-9206-b0d8840383d2)

1. 외각선을 검사하고 그립니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/5a7bd0e0-93d0-435e-8d82-c34a4e5695ac)

```hlsl
int tIndex = 14;
UV = ViewportUVToSceneTextureUV(UV,14);
float t1 = dot(clamp(SceneTextureLookup(UV + float2(-1.0f / sW, -1.0f / sH),tIndex,false),0,1), LMN);
float t2 = dot(clamp(SceneTextureLookup(UV + float2(0, -1.0f / sH),tIndex,false),0,1), LMN);
float t3 = dot(clamp(SceneTextureLookup(UV + float2(1.0f / sW, -1.0f / sH),tIndex,false),0,1), LMN); 
float m1 = dot(clamp(SceneTextureLookup(UV + float2(-1.0f / sW, 0),tIndex,false),0,1), LMN); 
float m3 = dot(clamp(SceneTextureLookup(UV + float2(-1.0f / sW, 0),tIndex,false),0,1), LMN);
float b1 = dot(clamp(SceneTextureLookup(UV + float2(-1.0f / sW, 1.0f / sH),tIndex,false),0,1), LMN); 
float b2 = dot(clamp(SceneTextureLookup(UV + float2(0, 1.0f / sH),tIndex,false),0,1), LMN);
float b3 = dot(clamp(SceneTextureLookup(UV + float2(1.0f / sW, 1.0f / sH),tIndex,false),0,1), LMN); 
float tot1 = t3 + b3 + (2 * m3) - t1 - (2 * m1) - b1;
float tot2 = b1 + (2 * b2) + b3 - t1 - (2 * t2) - t3;
float4 col;
if (((tot1 * tot1) + (tot2 * tot2)) > Threshold) { col = float4(0,0,0,1); } else { col = float4(1,1,1,1); }
return col;
```
