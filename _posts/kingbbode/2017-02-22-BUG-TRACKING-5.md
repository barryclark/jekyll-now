---
layout: post
title: 버그 트래킹 일지(5) - 대망의 적용 배포 그리고 결론
subtitle: 웹 서비스(Spring Framework)의 세션을 Membase(현재의 Couchbase)로 관리하면서 발생한 이슈입니다. 이슈를 해결해 나가는 과정을 기록으로 남깁니다.
category: zuminternet
author: 권용근
nickname: kingbbode
tag: [membase, bugtracking, resource, io, nosql]
---

주니어개발자의 버그 트래킹 일지입니다!

주 내용은 웹 서비스의 세션을 Membase(현재의 Couchbase)로 관리하면서 발생한 이슈입니다. 이슈를 해결해 나가는 과정을 기록으로 남깁니다.

[버그 트래킹 일지(1) - 시작은 사전지식 확보부터](https://zumdev.github.io/BUG-TRACKING-1)<br>
[버그 트래킹 일지(2) - 로그를 보자!](https://zumdev.github.io/BUG-TRACKING-2)<br>
[버그 트래킹 일지(3) - 임시방편보단 장기적으로](https://zumdev.github.io/BUG-TRACKING-3)<br>
[버그 트래킹 일지(4) - 의심하고 또 의심하자](https://zumdev.github.io/BUG-TRACKING-4)<br>
**버그 트래킹 일지(5) - 대망의 적용 배포 그리고 결론**

### 버그트래킹 환경

-	Membase Server

	-	Version : 1.7.2
	-	Node

		-	4개
		-	노드당 Replica 2개
		-	노드당 할당 메모리 2GB

	-	Bucket

		-	1개
		-	메모리 8GB(노드당 메모리 * 노드 수)

	-	각 서버 스팩

		-	RAM 8GB
		-	HDD 30GB

-	WEB Server

	-	Spring Boot Web Application(version 1.2)
		-	SpyMemCached(version 2.7.3)

---

대망의 적용 배포 그리고 결론
----------------------------

-	불필요 요청 제거
-	동적 빈 생성 모듈 개발
-	Spring Security Skip Filter 개발

위 과정을 거쳐, 지난 2월 14일 릴리즈!

결과는?

![great](/images/2017/2017_02_15_COUCHBASE/result1.jpg)

**효과가 굉장했다!**

![result](/images/2017/2017_02_15_COUCHBASE/result2.jpg)

배포 직후 급감하기 시작하더니,

![result](/images/2017/2017_02_15_COUCHBASE/result22.png)

감소 이후 안정적인 형태를 보이기 시작합니다!

![result](/images/2017/2017_02_15_COUCHBASE/result3.png)

oepration 감소로 이루려고 했던 disk write queue도 매우 크게 감소했습니다.

**결론**

operation : **97%** 감소<br> disk write queue : **99.9%** 감소<br>cpu 사용량 : **95%** 감소<br> 서비스 영향 : **없음**

**효과가 굉장했다!**

마무리
------

Membase의 1도 모르는 상태에서 Bug Tracking을 해보았습니다.

오래된 프로젝트인지라 버전이 너무 낮아 문서를 찾기도 힘들었고...

![Forum 답글](/images/2017/2017_02_15_COUCHBASE/notfound.png)

한국 사용자 모임이 없는 Couchbase에 영어로 질문을 해가며(결론은 버전을 올리란,,) 힘겹게 문제를 해결해나가 보았습니다.

![Forum 답글](/images/2017/2017_02_15_COUCHBASE/reply.png)

긴 버그 트래킹(약 2주) 끝에 Operation 이상을 확인했고, 끊임없이 의심하며 기존 시스템을 바꾸어 나갔고 결과적으로 서비스에 큰 안정화를 가져올 수 있었습니다.

서버의 메모리부터 각종 데몬들과 용어들까지, 코드 외에도 알아야하고 배워나가야하는게 정말 많다는 것을 느꼈습니다. 이번 Bug Tracking 경험이 나중에 있을 개발에 많은 도움이 될 것 같습니다.


**끝!**