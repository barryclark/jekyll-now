주어진 크기의 사각형 안에 원하는 크기를 비율을 유지한 채로 꽉 채우는 크기를 계산합니다.

```c#
    /// <summary>
    /// 주어진 크기의 사각형 안에 원하는 크기를 비율을 유지한 채로 꽉 채우는 크기를 계산합니다.
    /// </summary>
    /// <param name="rectSize">주어진 사각형의 크기</param>
    /// <param name="size">원하는 크기</param>
    /// <returns>비율을 유지한 채로 꽉 채우는 크기</returns>
    public static Vector2 FitIn(this Vector2 rectSize, Vector2 size)
    {
        Vector2 sizeToRect = rectSize / size;
        float fitInRect = Mathf.Min(sizeToRect.x, sizeToRect.y);

        return size * fitInRect;
    }
```

다음은 이를 이용한 예시입니다.

* `OnRectTransformDimensionsChange`는 주어진 사각형의 크기가 변경될 때 이미지를 다시 맞추기 위해서 호출됩니다.

```c#
using UnityEngine;

public class SizeController : MonoBehaviour
{
    [SerializeField] private RectTransform rectTransform;
    [SerializeField] private RectTransform imageRectTransform;
    [SerializeField] private Vector2 size;

    public void FixedUpdate()
    {
        SetSize(size);
    }
    private void OnRectTransformDimensionsChange()
    {
        SetSize(size);
    }

    public void SetSize(Vector2 newSize)
    {
        if (desireSize.x == 0 || desireSize.y == 0)
        {
            imageRectTransform.sizeDelta = size;
            return;
        }

        size = rectTransform.sizeDelta.FitIn(newSize);
        rectTransform.sizeDelta = size;
    }

}

public static partial class Extension
{
    /// <summary>
    /// 주어진 크기의 사각형 안에 원하는 크기를 비율을 유지한 채로 꽉 채우는 크기를 계산합니다.
    /// </summary>
    /// <param name="rectSize">주어진 사각형의 크기</param>
    /// <param name="size">원하는 크기</param>
    /// <returns>비율을 유지한 채로 꽉 채우는 크기</returns>
    public static Vector2 FitIn(this Vector2 rectSize, Vector2 size)
    {
        Vector2 sizeToRect = rectSize / size;
        float fitInRect = Mathf.Min(sizeToRect.x, sizeToRect.y);

        return size * fitInRect;
    }
}
```
