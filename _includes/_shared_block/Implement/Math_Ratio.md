```c#
public float GetRatio(float current, float min, float max)
{
    return (current - min) / (max - min);
}
```

```c#
public float GetValueFromRatio(float ratio, float min, float max)
{
    return (max - min) * ratio + min;
}
```