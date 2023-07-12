```c#
public float Remap(float current, float inMin, float inMax, float outMin, float outMax)
{
    float ratio = GetRatio(current, inMin, inMax);
    return GetValueFromRatio(current, outMin, outMax);
}
```