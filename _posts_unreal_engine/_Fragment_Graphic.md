---
layout: post
title: Graphics Fragment
---

흑백효과 세피아 효과 주기
흑백
rgb = dot(rgb, float3(0.3, 0.59, 0.11));

세피아
r = dot(rgb, float3(0.393f, 0.769f, 0.189f));
g = dot(rgb, float3(0.349f, 0.686f, 0.168f));
b = dot(rgb, float3(0.272f, 0.534f, 0.131f));


## FSceneRenderer::ViewExtensionPreRender_RenderThread
FSceneRenderer에서 RenderThread라는데.

FRHICommandListImmediate& RHICmdList파라메터에서
FRDGBuilder GraphBuilder(RHICmdList)를 생성

ViewArray에서 PreRenderViewFamily_RenderThread호출 후에

GraphBuilder.Execute를 실행합니다.

그 다음 FDeferredUpdateResource::UpdateResource(RHICmdList)에서 업데이트 한다.

## RDG를 어떻게 작동시키는 것인지 모르겠다.

## RenderingThread를 등록한다.

## 이거 읽고 따라해볼까?
https://forums.unrealengine.com/t/how-can-i-pass-multiple-render-targets-to-a-compute-shader/139770/2

## 공식문서 이해안가면 영어로 보자.
번역이 너무 이상해서 이해 안갈만 했다.!

## Add Graph추가하기 전에 Compute Shader부터 추가해보자.
