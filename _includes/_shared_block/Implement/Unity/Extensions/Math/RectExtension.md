```c#
/// <summary>
/// 렉트의 크기를 조절하는 확장입니다.
/// </summary>
public static partial class RectExtension
{
    /// <summary>
    /// 기준 크기에 새로운 크기를 맞추는 비율을 구합니다.
    /// 기준 크기를 넘어가지 않기 위해 최소 크기로 설정합니다.
    /// </summary>
    /// <param name="targetSize">기준이 되는 크기입니다.</param>
    /// <param name="newSize"></param>
    /// <returns></returns>
    public static float CalculateFitInRatio(this Vector2 targetSize, Vector2 newSize)
    {
        if (newSize.x == 0 || newSize.y == 0)
            return 0f;

        float ratio = 1.0f;
        float widthRatio = targetSize.x / newSize.x;
        float heightRatio = targetSize.y / newSize.y;

        ratio = Mathf.Min(widthRatio, heightRatio);
        return ratio;
    }

    /// <summary>
    /// 기준 크기에 새로운 크기를 맞추는 비율을 구합니다.
    /// 기준 크기를 넘어가지 않기 위해 최소 크기로 설정합니다.
    /// </summary>
    /// <param name="targetRect">렉트의 크기를 기본 크기로 사용합니다.</param>
    /// <param name="newSize"></param>
    /// <returns></returns>
    public static float CalculateFitInRatio(this Rect targetRect, Vector2 newSize)
    {
        return targetRect.size.CalculateFitInRatio(newSize);
    }

    /// <summary>
    /// 기본 크기에 맞춰진 크기를 구합니다.
    /// </summary>
    /// <param name="targetSize">기준이 되는 크기입니다.</param>
    /// <param name="newSize"></param>
    /// <returns></returns>
    public static Vector2 CalculateFitInRectSize(this Vector2 targetSize, Vector2 newSize)
    {
        return newSize * CalculateFitInRatio(targetSize, newSize);
    }

    /// <summary>
    /// 기본 크기에 맞춰진 크기를 구합니다.
    /// </summary>
    /// <param name="targetRect"></param>
    /// <param name="newSize"></param>
    /// <returns></returns>
    public static Vector2 CalculateFitInRectSize(this Rect targetRect, Vector2 newSize)
    {
        return newSize * CalculateFitInRatio(targetRect, newSize);
    }
}
```
