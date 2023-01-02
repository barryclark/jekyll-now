---
layout: post
title: C# Basic
---

- [ ] 이것이 C#이다(개정판): 입문자에게 가장 탄탄한 기본기를 다져줄 C# 입문서
- [ ] Hellow world 찍어보기..
- [ ] [Invoke 함수...](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=dsmjj2018&logNo=221382866918)
- [ ] 코루틴..., 타이머 클래스도 있다.
- [ ] [멀티쓰레드](https://coderzero.tistory.com/entry/%EC%9C%A0%EB%8B%88%ED%8B%B0-C-%EA%B0%95%EC%A2%8C-23-%EB%A9%80%ED%8B%B0%EC%8A%A4%EB%A0%88%EB%93%9CMulti-thread)
- [ ]  [https://en.wikipedia.org/wiki/.NET_Framework](https://en.wikipedia.org/wiki/.NET_Framework) 읽기
- [ ]  [https://kaluteblog.tistory.com/5](https://kaluteblog.tistory.com/5)

> 주요 참고자료
> - [예제로 배우는 C# 프로그래밍](https://www.csharpstudy.com/)
> - [정성태의 닷넷 이야기](https://www.sysnet.pe.kr/)

### ?, ??
* `int? Nullable = null;`
  * 변수에 null을 입력하게 함으로써, 0의 값이 들어가야 하는지 아니면 입력이 없는지를 구분할 수 있게 해줍니다.
* `A?.[B]?.[C]....`
  * null이 아닐경우, 오른쪽으로 계속 진행합니다. 값이 null일 경우, 더이상 진행하지 않습니다.
* `X ?? Y`
  * [null 병합 연사자](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/operators/null-coalescing-operator)는 왼쪽의 값이 null일 경우 오른쪽의 값을 반환합니다.
  * 
```c#
int Return(Data data)
{
	// data가 null이 아니라면 data.Int를, null이라면 0을 반환합니다.
	return data?.Int ?? 0;
}  
```