---
layout: post
title: Invoke & InvokeRepeating & Coroutine
---

<details><summary>Invoke & InvokeRepeating</summary>
<div markdown="1">

[MonoBehaviour.Invoke](https://docs.unity3d.com/ScriptReference/MonoBehaviour.Invoke.html)

[MonoBehaviour.InvokeRepeating](https://docs.unity3d.com/ScriptReference/MonoBehaviour.InvokeRepeating.html)

시간 초 단위로 메서드를 호출합니다.

* 메서드에 매개 변수를 전달해야 하는 경우 Coroutine을 대신 사용하는 것이 좋습니다. 코루틴은 또한 더 나은 성능을 제공합니다.

</div></details>

## Coroutine

[Coroutine Manual](https://docs.unity3d.com/2023.1/Documentation/Manual/Coroutines.html)

[Coroutine API](https://docs.unity3d.com/ScriptReference/Coroutine.html)

코루틴은 완료 될 때까지 실행(yield)을 일시 중지할 수 있는 함수입니다. 시간의 흐름에 따른 이벤트의 시퀀스나 절차상의 애니메이션을 포함하기 위해 메서드콜을 사용하고자 하는 상황에서 코루틴을 사용할 수 있습니다.

<details><summary>yield return의 종류</summary>
<div markdown="1">

```c#
{
    yield return null;
}
```

yield return null은 자주 사용하는 함수인 Update()가 끝나면 그때 yield return null구문의 밑의 부분이 실행됩니다.

```c#
{
    yield return new WaitForEndOfFrame();
}
```

yield return new WaitForEndOfFream()은 프로그램에서 한 프레임이 완전히 종료될 때 호출이 됩니다. 모든 Update()가 끝나고 화면 렌더링까지 끝났을 때 yield return new WaitForEndOfFream()구문의 밑의 부분이 실행됩니다.

```c#
{
    yield return new WaitForFixedUpdate();
}
```

yield return new WaitForFixedUpdate()은 이름에서 알 수 있듯이 FixedUpdate()가 끝나면 그 때 yield return new WaitForFixedUpdate() 구문의 밑의 부분이 실행됩니다.

```c#
{
    yield return new WaitForSeconds(1.0f);
}
```

yield return new WaitForSeconds()은 괄호 안의 시간(초)가 지나면 yield return new WaitForSeconds()구문의 밑의 부분이 실행됩니다.

```c#
{
    yield return new WaitForSecondsRealtime(1.0f);
}
```

yield return new WaitForSecondsRealtime()은 괄호 안의 시간(초)이 지나면 yield return new WaitForSecondsRealtime()구문의 밑의 부분이 실행됩니다. 하지만 여기서의 시간은 Time.timeScale의 영향을 받지 않는 절대적인 시간을 의미합니다.

```c#
{
    yield return new WaitUntil(()=>numA < numB);
}
```

yield return new WaitUntile()은 괄호 안의 조건이 만족(결과값이 true)하게 되면 yield return new WaitUntil()의 밑의 구문이 실행됩니다. 실행 위치는 Update()와 LateUpdate() 이벤트 사이입니다.

```c#
{
    yield return new WaitWhile(()=>numA < numB);
}
```

yield return new WaitWhile()은 괄호 안의 조건이 만족하지 (결괏값이 false) 않는다면 yield return new WaitWhile()의 밑의 구문이 실행됩니다. 실행 위치는 Update()와 LateUpdate() 이벤트 사이입니다.

```c#
{
    yield return new StartCoroutine(OtherCoroutine());
}
```

yield return new StartCoroutine()은 괄호 안의 쓰인 코루틴이 끝나면 yield return new StartCoroutine()의 밑의 구문이 실행됩니다.


</div></details>

<details><summary>코루틴 예시</summary>
<div markdown="1">

```C#
IEnumerator EffectDestroy()
    {
        Particle.Play();
        while(Particle ? Particle.isPlaying : false)
        {
            float ReverseTime = 1.0f - (Particle.time / Particle.main.duration);
            transform.localScale = new Vector3(ReverseTime, ReverseTime, ReverseTime);
            yield return null;
        }
        Destroy(gameObject);
    }
```

</div></details>