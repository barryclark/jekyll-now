유니티 메시지에 IEnumerator를 쓸 경우 반복되어 호출되게 할 수 있습니다. 아래의 코드를 실행하면 "Start", "Update", "Start" ... 가 반복되어 출력되는 것을 볼 수 있습니다.

```csharp

    // Start is called before the first frame update
    IEnumerator Start()
    {
        while(true)
        {
            Debug.Log("Start");
            yield return null;
        }
    }

    // Update is called once per frame
    void Update()
    {
        Debug.Log("Update");
    }

```
