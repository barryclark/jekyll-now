Chameleon 포스트 프로세스 입니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/76590522-3f37-4447-bf08-663e8107fdbd)

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/17b2304c-3bb2-4bfa-b36b-7dec54373b11)

1. Emboss를 계산합니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/77ccc700-aea8-4ef0-a75c-6f50a063b96c)

```hlsl
int tIndex = 14;
UV = ViewportUVToSceneTextureUV(UV,14);
float4 Color = SceneTextureLookup(UV,tIndex,false);
Color -= SceneTextureLookup(UV-0.003,tIndex,false)*2.7f;
Color += SceneTextureLookup(UV+0.003,tIndex,false)*2.7f;
Color.rgb = (Color.r+Color.g+Color.b)/3.0f;
return Color;
```
