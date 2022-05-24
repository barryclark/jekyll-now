---
layout: post
title: RHI
---

## Render hardware interface
[RHI](https://docs.unrealengine.com/5.0/en-US/graphics-programming-overview-for-unreal-engine/)는 플랫폼 전용 그래픽 API위의 얇은 레이어입니다. UE4의 RHI 추상화 레벨은 가급적 낮추었습니다. 이는 모든 플랫폼에서 작동할 수 있도록 하기 위해서 입니다.

* SM5
    - 일반적으로 D3D11 셰이더 모델 5에 해당하는데, 유일한 차이점은 **OpenGL 4.3 제한때문에 텍스처를 16개만 사용할 수 있다는 점입니다. 테셀레이션, 컴퓨트 셰이더, 큐브맵 배열을 지원합니다. 디퍼드 셰이딩 패스가 지원됩니다.**
* SM4
    - D3D11 셰이더 모델 4에 해당합니다. 일반적으로 SM5와 같지만 테셀레이션, 컴퓨트 셰이더, 큐브맵 배열이 없습니다. 디퍼드 셰이딩 패스는 지원됩니다. Eye adaption 컴퓨트 셰이더를 사용하므로 지원되지 않습니다.
* ES3_1
    - OpenGL ES3.1, Vulkan 및 Metal에서 지원하는 기능에 해당합니다.

* [Feature level](https://en.wikipedia.org/wiki/Feature_levels_in_Direct3D)은 번역하면 기능 수준을 나타냅니다. Direct3D를 기준으로 하면 Direct3D 11 Feature level 11_1일 때 논리적 혼합 작업, 대상 독립적인 래스터화, 슬롯 수가 증가된 모든 파이프라인 단계의 UAV 등을 지원하는 것을 볼 수 있습니다. 추가적으로 Tier는 계층도 순위, 순서 등을 나타낼 때 사용됩니다.

UE의 RHI패키지는 DirectX가 지배적입니다.

## API features

* Graphics API Applicable system Coloring language
|:-:|:-:|:-:|
|API|OS|language|
|DirectX|Window, XBox|HLSL(Hight Level Shading Language)|
|Vulkan|Cross-platform|SPIR-V|
|Metal|iOS, MacOS|MSL(Metal Shading Language)|
|OpenGL|Cross-platform|GLSL(OpenGL Shading Language)|
|OpenGL ES|Moving end|ES GLSL|

* Compare
|:-:|:-:|:-:|
|DirectX|Vulkan|OpenGL(ES)|Metal|
|texture|image|texture and render buffer|texture|
|render target|color attachments|color attachments|color attachments or render target|
|command list|command buffer|part of context, display list, NV_command_list|command buffer|
|command list|secondary command buffer|-|parallel command encoder|
|command list bundle|-|light-weight display list|indirect command buffer|
|command allocator|command pool part of context|command pool part of context|command queue|
|command queue|queue|part of context|command queue|
|copy queue|transfer queue glBiltFramebuffer()|transfer queue glBiltFramebuffer()|bit command encoder|
|copy engine|transfer engine conditional|-|blit engine|
|predication|conditional rendering|conditional rendering|-|
|depth/stencil view|depth/stencil attachment|depth attachment and stencil attachment|attachment, depth render target and stencil render target|
|render target view, depth/stencil view, shader resource view, unordered access view|image view|texture view|texture view|
|typed buffer SRV, typed buffer UAV|buffer view, texel buffer|texture buffer|texture buffer|
|constant buffer views(CBV)|uniform buffer|uniform buffer|buffer in constant address space|
|rasterizer order view(ROV)|fragment shader interlock|GL_APB_fragment_shader_interlock|raster order group|
|raw or structured buffer UAV|storage buffer|shader storage buffer|buffer in device address space|
|descriptor|descriptor|-|argument|
|descriptor heap|descriptor pool|-|heap|
|descriptor table|descriptor set|-|argument buffer|
|heap| device memory|-|placement heap|
|-|subpass|pixel local storage|progammable blending|
|split barrier|event|-|-|
|ID3D12Fence::SetEventOnCompletion|fence|fence, sync|completed handler, MTLCommandBufferwaitUntilComplete|
|resource barrier|pipeline barrier, memory barrier|texture barrier, memory barrier|texture barrier, memory barrier|
|fence|semaphore|fence, sync|fence, event|
|D3D12 fence|timeline semaphore fragment|-|event|
|pixel shader|fragment shader tessellation|fragment shader|fragment shader or fragment function tessellation|
|hull shader|tessellation control shader|tessellation control shader|tessellation compute kernel|
|domain shader|tessellation evaluation shader|tessellation evaluation shader|post-tessellation vertex shader|
|collection of resources pool|fragmentbuffer heap|fragment object|-|
|pool|heap|-|-|
|heap type, CPU page property|memory type|automatically managerd, texture storage hint, buffer storage|storage mode, CPU cache mode|
|GPU virtual address|buffer device address|-|-|
|image layout, swizzle|image tilling interface|-|-|
|matching semantics|matching(in / out)|varying(removed in GLSL 4.20)|-|
|thread, lane|invocation|invocation|thread, lane|
|threadgroup|workgroup|workgroup|threadgroup|
|wave, wavefront|subgroup|subgroup|SIMD-group,quadgroup|
|slice|layer|-|slice|
|device|logical device|context|device|
|multi-adapter device|device group|implicit(E.G.SLICrossFire)|peer group|
|adapter, node|physical device-multiview|-|device|
view instancing|multiview rendering|multiview rendering|vertex amplification|
|resource state|image layout|-|-|
|pipeline state|pipeline|stage and program or program pipeline|pipeline state|
|root signature|pipeline layout|-|-|
|root parameter|descriptor set layout binding push descriptor|-}argument in shader parameter list|
|resulting ID3DBlob from D3DCompileFromFile|shader module shader object|shader library|
|shading rate image|shading rate attachment|-|rasterization rate map|
|tile|sparse block|sparse block|sparse tile|
|reserved resource(D12), tiled resource(D11)|sparse image|sparse texture|sparse texture|
|window|surface|HDC, GLXDrawable, EGLSurface Pairt of HDC, GLXDrawable, EGLSurface|layer|
|-|swapchain image|default framebuffer|drawable texture|
|stream-out|transform feedback|transform feedback|-|


## 렌더링 상태 기본값
렌더링 상태가 너무 많기 때문에 무언가를 그릴 때마다 모두 설정하는 것은 실용적이지 않습니다. 대신 기본값으로 설정된 암시적 상태 세트(**따라서 변경 후 기본값으로 복원되더야 함)과 명시적으로 설정해야 하는 훨씬 더 작은 상태 세트를 가지고 있습니다.

다음은 명시적으로 설정해야 하는 상태 집합은 다음과 같습니다.

* RHISetRenderTargets
* RHISetBoundShaderState
* RHISetDepthState
* RHISetBlendState
* RHISetRasterizerState
* RHISetBoundShaderState

다른 모든 상태는 기본값으로 간주됩니다.

[Analyzing the unreal rendering system (13) - RHI Supplements](https://www.programmerall.com/article/67502324508/)