---
layout: post
title: Graphics Metaball
---

필수적인 내용
: [Custom expression](/posts_unreal_engine/GraphicsUseage-CustomExpression)

## Custom 노드 2D 메타볼

DefineSphereFunction
```cpp
return 1;
}

float MakeSphere(float2 uv, float2 position, float radius)
{
    float weight = radius / distance(uv, position);
    return weight * weight;
```

Custom
```cpp
#define CUSTOM_NODE_SIZE 4

float2 Positions[CUSTOM_NODE_SIZE];
Positions[0] = float2(-sin(Time * 0.9) * 0.55, -cos(Time * 0.9) * 0.2);
Positions[1] = float2(-sin(Time * 0.8) * 0.5, -cos(Time * 0.8) * 0.25);
Positions[2] = float2(-sin(Time * 0.7) * 0.45, -cos(Time * 0.7) * 0.3);
Positions[3] = float2(-sin(Time * 0.6) * 0.4, -cos(Time * 0.6) * 0.35);

float3 pixel = float3(0.0, 0.0, 0.0);

for( int i = 0; i < CUSTOM_NODE_SIZE; i++)
{
    pixel += MakeSphere(UV, Positions[i], i*0.05 + 0.03);
}
return pixel / CUSTOM_NODE_SIZE;
```

##################################
? 스크린샷 찍는 플러그인이 버전 지원을 안해요. ㅠㅠ
##################################

참고자료
: [UE4 Custom 노드 2D 메타볼](https://m.blog.naver.com/checkjei/221885213673)

## 흑정령 Material

```cpp
return 1;}

/*
 *  원점(origin)에 있는 구(sphere)를 고려하면 구 안쪽에 있는 점들은 원점으로 부터 거리가 반지름(radius)보다 작을 것입니다. 
 * 구 표면상에 있는 점들은 반지름과 거리가 동일한 것이며, 구의 바깥 쪽에 있는 점들은 반지름 보다 거리들이 크게 계산됩니다.
 */
float SphereSDF(float2 TexCoord, float2 Pos, float radius)
{
    return length(TexCoord - Pos) - radius;
}

/*
 * SDF를 부드럽게 더하는 역활을 합니다.
 */
float AddObjectsSmooth(float SDF1, float SDF2, float Smoothness) 
{
    float t = ((SDF1 - SDF2) / Smoothness * 0.5) + 0.5;
    float k = clamp(t, 0.0, 1.0);
    return lerp(SDF1, SDF2, k) - k * (1.0 - k) * Smoothness;
}
```

```cpp
//SDF
return SphereSDF(TexCoord, float2(0.0, 0.0)); 
```

```cpp
return 1;}

/*
 * 파티클 기본위치 설정함
 */
float Hash12(float2 key)
{
    return frac(sin(dot(key, float2(7875.541, 3458.248))) * 5218.4731);   
}

/*
 *
 */
float2 MakeRelativePos(float Hash, float Time)
{
#define HASH_SCALE 5317
    return float2(sin(Hash * HASH_SCALE + Time * 2.0) , cos(Hash * HASH_SCALE + Time * 2.0)) * 0.5 + 0.5;        
#undef HASH_SCALE
}

/*
 * 그리드로 원을 생성합니다.
 * floor로 relativePos를 작성했을 때 Sphere가 셀의 경계에서 잘리기 때문에 인접한 셀도 계산하여 addObjectsSmooth해줍니다.
 */
float MakeSphereGridSDF(float2 TexCoord, float GridScale, float Radius, float Time)
{
    TexCoord *= GridScale;
    float2 GridCoord = floor(TexCoord);
            
    float minSDF = 1.0;
    for (float x = -1.0; x <= 1.0; x++)
    {
        for (float y = -1.0; y <= 1.0; y++)
        {
            float Hash = Hash12(GridCoord + float2(x, y));
            float RelativePos = MakeRelativePos(Hash, Time);

            float SDF = SphereSDF(TexCoord, GridCoord + RelativePos, Radius);
            minSDF = AddObjectsSmooth(minSDF, SDF, 0.3);
        }
    }        
    return minSDF / GridScale;
}

/*
 *
 */
float MakeRadiusSphere(float2 TexCoord, float2 Origin)
{
    smoothstep(0.5, 0.0, length(TexCoord - Origin)) - 0.3);
}

/*
 *
 */
float2 MakeMovCoord(float2 TexCoord, float2 Vector, float Time)
{
    return TexCoord + Vector * Time;
```

```cpp
return MakeSphereGridSDF(MovCoord, GridScale, Radius, Time)
```

* [SDF(Signed Distance Functions)](https://vateran.tistory.com/52)란 특정한 공간상의 지점(point)의 좌표를 지정해주면 점과 어떠한 표면(surface)사이의 가장 가까운 거리를 반환하는 함수입니다. 반환 되는 부호(sign)는 그 점이 표면의 안쪽(inside)인지 바깥(outside)인지를 나타냅니다.
    - 원점(origin)에 있는 구(sphere)를 고려하면 구 안쪽에 있는 점들은 원점으로 부터 거리가 반지름(radius)보다 작을 것입니다. 구 표면상에 있는 점들은 반지름과 거리가 동일한 것이며, 구의 바깥 쪽에 있는 점들은 반지름 보다 거리들이 크게 계산됩니다.
    - SDF = Sphere - Radius

* smoothstep은 

참고자료 
: [지산 흑정령? 머티리얼](https://m.blog.naver.com/PostView.naver?blogId=checkjei&logNo=221890054685&navType=by)
, [Moving ink](https://www.shadertoy.com/view/WdtXz2)

