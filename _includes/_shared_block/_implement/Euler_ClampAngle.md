오일러 각을 Clamp하는 함수입니다.

```c#
public float ClampAngle(float current, float min, float max)
{
    float dtAngle = Mathf.Abs(((min - max) + 180) % 360 - 180);
    float hdtAngle = dtAngle * 0.5f;
    float midAngle = min + hdtAngle;

    float offset = Mathf.Abs(Mathf.DeltaAngle(current, midAngle)) - hdtAngle;
    if (offset > 0)
        current = Mathf.MoveTowardsAngle(current, midAngle, offset);
    return current;
}
```