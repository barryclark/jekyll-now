---
layout: post
title: Task
---

## Task
- [ ] Fork and join

### C# Task Class
[Task Class](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=net-7.0&viewFallbackFrom=net-7.0%2Fpicked-by-liner%2Fsystem.threading.tasks.task%3Fview%3Dnet-7.0), [Task 클래스](https://www.csharpstudy.com/Threads/task.aspx)

Task 클래스와 이의 Generic형태인 Task<T>클래스는 .NET 4.0에 도입된 새로운 클래스들로서 쓰레드풀로부터 쓰레드를 가져와 비동기 작업을 실행합니다. Task 관련 클래스들과 Parallel 클래스들을 합쳐 Task Parallel Library(TPL)이라 부르는데, 이들은 기본적으로 다중 CPU 병렬 처리를 염두에 두고 만들었습니다.

<details><summary>Unity C# 비동기 애셋 로드</summary>
<div markdown="1">

1. 애셋의 로드하는 테스크들을 만든 후, 
2. 테스크들이 완료될때까지 기다립니다. 

``` c#
// 로드 할 테스크 목록
Task[] tasks = new Task[]
{
    LoadMaterialOrange(),
    LoadMaterialYellow(),
    UILoadAsset(EPlayType.Cleaner),
    ObjLoadAsset(EPlayType.Cleaner),
    TableLoadAsset("NarrationData", DataManager.Instance.OnLoadNarrationData),
    TableLoadAsset("CleanerPositionData", DataManager.Instance.OnLoadCleanerPositionData),
    NarrationLoadAsset(EPlayType.Cleaner),
    LoadSoundEffect(),
};

// 비동기 로드
await Task.WhenAll(tasks);
```

</div></details>