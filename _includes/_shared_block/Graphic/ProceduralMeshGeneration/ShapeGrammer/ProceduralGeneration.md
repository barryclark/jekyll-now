[Procedural Modeling of Buildings with Shape Grammars](https://www.gamedev.net/tutorials/programming/engines-and-middleware/procedural-modeling-of-buildings-with-shape-grammars-r4596/)

이 예시는 형태문법을 이용한 절차적 건물 모델링의 예시를 보여줍니다.

![ccs-224012-0-61459600-1481648007](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/4b39b688-3e2d-425e-a342-0ae6431f18cf)

```
Lot -> extrude(10) Mass 
	Mass -> FaceSplit{ sides: Facade } 
		Facade -> Split("y"){ 3: FirstFloor, ~1: TopFloors } 
			TopFloors -> Repeat("y"){ 1: Floor } 
				Floor -> Repeat("x"){ 1: Window } 
					Window -> insert("window.obj") 
```

1. ```Lot -> extrude(10) Mass``` 에서 평면은 10만큼 돌출시키고 이를 Mass로 설정합니다.
2. ```Mass -> FaceSplit{ slides: Facade }``` 에서 Mass에서 Face들을 분리하여 Facade로 설정합니다.
3. ```Facade -> Split("y"){ 3: FirstFloor, ~1: TopFloors }```에서 Facade를 y축 기준으로 처음 3만큼을 FirstFloor로 설정하고 나머지를 TopFloor로 설정합니다.
4. ```TopFloors -> Repeat("y"){ 1: Floor }```에서 TopFloors를 y축 기준으로 1만큼씩 나누고 이를 Floor로 설정합니다.
5. ```Floor -> Repeat("x"){ 1: Window }```에서 x축 기준으로 1만큼씩 나누고 이를 Window로 설정합니다.
6. ```Window -> insert("window.obj")```에서 window에 window.obj를 삽입합니다.

이 과정을 통해 절차적으로 건물을 만드는 예시를 볼 수 있습니다.
