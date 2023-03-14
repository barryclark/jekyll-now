<center><div markdown="1">

![FirstComputeShader](/images/Unity_Graphics_ComputeShader_01.gif)

</div></center>

다음 클래스는 ComputeShader, 적용할 커널, 텍스처 해상도, 렌더러 및 컬러를 받아들입니다.

클래스는 Start() 메소드에서 Init() 함수를 호출하여 RenderTexture를 초기화하고, Update() 메소드에서 Compute() 함수를 호출하여 ComputeShader를 실행합니다.

Compute() 함수는 셰이더에 컬러와 텍스처를 전달하고, 텍스처의 해상도에 맞게 셰이더를 디스패치하여 결과를 계산합니다.

```c#
using UnityEngine;

public class FirstComputeComponent : MonoBehaviour
{
    [SerializeField] private ComputeShader shader;
    [SerializeField] private string kernal;
    [SerializeField] private int texResolution = 1024;
    [SerializeField] private Renderer m_renderer;
    [SerializeField] private Color m_color;

    private RenderTexture m_outputTexture;
    int kernelHandle;

    private void Start()
    {
        Init();
    }

    private void Update()
    {
        Compute();
    }

    private void Init()
    {
        m_outputTexture = new RenderTexture(texResolution, texResolution, 0);
        m_outputTexture.enableRandomWrite = true;
        m_outputTexture.Create();

        kernelHandle = shader.FindKernel(kernal);
        m_renderer.material.SetTexture("_BaseMap", m_outputTexture);
    }

    private void Compute()
    {
        shader.SetVector("MyColor", m_color);
        shader.SetTexture(kernelHandle, "Result", m_outputTexture);
        shader.Dispatch(kernelHandle, texResolution / 8, texResolution / 8, 1);
    }
}
```

커널 이름은 FirstComputeShader이며, Result 텍스처와 MyColor 컬러를 사용합니다.

[numthreads(8, 8, 1)] 라인은 각 디스패치에서 실행할 쓰레드의 수를 정의합니다. 이 경우 8x8의 쓰레드가 1개의 디스패치에서 실행됩니다.

커널은 각 픽셀의 좌표를 가져와 해당 좌표에 MyColor 값을 할당하여 결과를 계산하고, RWTexture2D<float4> 는 해당 결과를 저장하기 위해 읽기/쓰기 텍스처로 선언됩니다.

```hlsl
#pragma kernel FirstComputeShader 

RWTexture2D<float4> Result;
float4 MyColor;

[numthreads(8,8,1)]
void FirstComputeShader (uint3 id : SV_DispatchThreadID)
{
    Result[id.xy] = MyColor;
}
```