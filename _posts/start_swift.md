# 스위프트 
## 작성자 : 이동준 
***
### 템플릿
|            템플릿            |                 설명                  |
| :-----------------------: | :---------------------------------: |
|  single view application  |   1개의 뷰로 구성된 애플리케이션 만들때 사용하는 템플릿    |
|    Tabbed application     | 화면의 하단에 탭 바가 있는 애플리케이션 만들때 사용하는 템플릿 |
| master-detail application |    계층구조를 가지는 애플리케이션 만들때 사용하는 템플릿    |
|           game            |          게임을 만들때 사용하는 템플릿           |
|  page-based application   |   페이지를 넘기는 애플리케이션을 만들 때 사용하는 템플릿    |

### 프로젝트 내부 파일.
|          네비게이터          |                    설명                    |
| :---------------------: | :--------------------------------------: |
|    AppDelegate.swift    | 애플리케이션 전체 프로그램을 작성하는 파일로 앱이 닫혀 있는 상태등에서가 하고 싶을때 |
|  ViewController.swift   |    화면(view)속의 움직임을 제어하는 프로그램을 작성하는 파일    |
|     Main.storyboard     |       스토리보드 파일이며, 애플리케이션의 화면을 작성함        |
|     Assets.xcassets     |    아이폰에 표시되는 이미지의 해상도 등을 관리하는 이미지 에셋     |
| LaunchScreen.storyboard | 스토리보드 파일이며, 앱이 시작된 직후 표시되는 시작화면을 만들때 사용  |
|       Info.plist        | 애플리케이션의 설정파일이며,기본 설정은 프로젝트파일에서 수행하기 때문에 거의 수정하지 않음 |


### 오토 레이아웃    
- 화면의 크기가 달라지더라도 의도한 대로 레이아웃을 만들려면 오토레이아웃(Auto Layout)을 사용한다.
- 오토레이아웃은 화면의 비율이나 크기에 따라 자동으로 레이아웃을 변화시켜주는 기능이다.

#### IB :  IBOutlet, IBAction의 IB는 인터페이스 빌더를 의미
#### Outlet : 현실에서 일반적으로 물건을 싸게 처분하는 곳이라는 의미, 즉 연결 통로 같은 곳,

### 변수
#### var score = 100
#### score = 200

### 상수 .
#### let myage = 20

** 상수와 변수를 만들었는데 사용하지 않으면 에러가 발생한다. **

### 반복문
#### `for index in 0 ... 5 {}` .   0~5까지 반복, index 값으로 사용

### 자료형
#### var 변수이름 : 자료형 = 값 의 형태.   
#### 예시 

```swift
var number:Int = 10   // Integer 형태. 
let weight:Double = 1.23  // Double 형태.
var flag:Bool = true / false // Boolean 형태.
var name = "String 타입 문자열 지정법" . // String 형태.
```



### 자료형 변환 

#### 문법  : 변환할 자료형(값).
#### 예

```swift
let string_num = "100"  // 스트링 
let cast_num = Int(string_num)       // Integer 타입으로 변환

let number : Int = 200      //  Integer 타입
let cast_number = Double(number)  // Double 타입으로 변환

let number = 5
let string_num :String = "문자열로 변환 합니다"+String(number)+"이런식으로요 ~"
```



### 조건문.
#### switch

```swift
var dice  = 1
switch dice {
case 1: print("~~~~ 1")
case 2,5: print("~~~~ 2 or 5")
default : print("~~~~ 디폴트 ")
} // break 가 필요 
```



### 배열.

```swift
var int_array = [1,2,3]
var string_array = ["A","B","C"]

// 자료형을 지정해서 배열 만들기.
var int_array:[Int] = [1,2,3]
var str_array:[String] = ["a","b","c"]

// 같은 초기값이 있는 배열 만들기.
var int_array = Array(repeating:0, count:3) . // 0을 3개 가진 배열 => [0,0,0]
var str_array = Array(repeating:"A", count:3) . // A 를 3개 가진 배열 => ["A","A","A"]

// 빈 배열만들기
var empt_arr:[String] = []
var empt_arr2 = [String]()    // 둘다 같은 뜻임

// 배열 요소 갯수 확인
var int_arr = [1,2,3,4,5]
print(int_arr.count) // 5출력
```



#### 배열의 조작

```swift
// 가장 마지막 위치에 요소 추가.
var str_arr = ["a","b","c"]
srt_arr.append("d")

//지정한 위치에 요소 추가.
var str_arr = ["a","b","c"]
str_arr.insert("d", at:1) // 1번 인덱스에 d

//지정한 위치의 요소 제거.
var str_arr = ["a","b","c"]
str_arr.remove(at:1) //1번 인덱스 요소 제거

// 요소 모두 제거.
var str_arr = ["a","b","c"]
str_arr.removeAll()

//오름차순 정렬.
var int_arr = [4,3,1,5,2]
var sort_arr = int_arr.sorted(by: <) // 오름 차순으로 정렬함 
```



### 딕셔너리.
- 여러개의 데이터를 다룰때 이름과 데이터를 함께 사용하고, 이름을 사용해 데이터를 읽고 쓰고 싶을때 딕셔너리 사용
- 사전과 같은 자료형이며,찾고싶은 데이터를 이름(키)로 검색하고 해당데이터를 읽거나 쓴다. -> 키와 요소 라고 부름.

```swift
var int_dic = ["a":1, "b":2, "c":3]
var str_dic = ["a":"가","b":"나","c":"다"]
print(str_dic.count)   --> 3 출력
print(str_dic["c"])   --> optional("다") 가 출력됨 
  why?? 키에 대응하는 값이 없을수도 있다 이럴때는 nil을 반환하게 되므로 반환값이 optional이다.

if let getValue = str_dic["c"] {
 print(getValue) .   -> 다 출력됨 (값이 있다면, 출력하는 구조 이므로 optioanl이 아님)
}

//딕셔너리 출력 형태.
var str_dic = ["a":"가","b":"나","c":"다"]
for(key,value) in str_dic {
  print("키는 : \(key), 값은 : \(value)") 
}

//딕셔너리에 요소 추가하기.
var str_dic = ["a":"가","b":"나","c":"다"]
str_dic["d"] = "라"

//딕셔너리에 요소 제거하기.
var str_dic = ["a":"가","b":"나","c":"다"]
str_dic.removeValue(forKey:"c")
```



### 튜플.
- 여러개의 데이터를 세트로 만들고, 순서를 사용해 요소를 다루는 자료형 
- 배열과 비슷하지만, 다른 종류의 데이터를 함께 사용할 수 있는 점이 다르다.
- 새로운 요소를 추가하거나 제거하는 것은 불가능 하다.

```swift
let tuple1 = (1,2,3)
let tuple2 = (100000, "튜플테스트 해보자~~")
print(tuple2.0) -> 1000000
print(tuple2.1) -> "튜플테스트 해보자~~~"

//여러개의 데이터를 한번에 할당.
let tuple2 = (100000, "튜플테스트 해보자~~")
var (postcode, address) = tuple2
print(postcode) -> 100000
print(address) -> "튜플테스트 해보자~~"

// 튜플에 이름 붙이기.
let tuple2 = (postcode:100000, message:"튜플테스트 해보자~~") // 딕셔너리 처럼 각 요소 앖에 : 으로 구분해서 요소 이름을 붙임!!
print(tuple2.postcode) -> 100000
print(tuple2.message) -> "튜플테스트 해보자~~"
```



### 함수.

```swift
// 매개변수 처리.

func hello(name:String){
 print("안녕~~~ 문자 하나 출력해봅시다~ : \(name)")
}
hello(name: "동준")

//반환값 처리 (매개변수 )
func hi_Hello(name:String) -> String{
  let message = "\(name) 입니다~~"
  return message
}
let return_Value = hi_Hello(name:"동준씨")  //호출 값.


// 반환값 처리.(매개변수 하나, 리턴값 )
func hello2(price:Double) -> (Double,Double){
  // 매개변수는 부동소수 자료형의 price이고, 리턴값은 부동소수 자료형 2개를 리턴한다는 의미.
  
  let tax = price +20
  let tax2 = tax +50
  return (tax,tax2)
}

let (tax,tax2) = hello2(price:300)
print("tax는 : \(tax)입니다.") // 320
print("tax2는 : \(tax2)입니다.") // 350
```



### optional 자료형.
- 스위프트에는  optional 이라는 자료형이 있다. 변수 뒤에  ? 또는  !를 붙이는 것.
- optional 자료형은 애플리케이션의 크래시를 막기 위한 안전 기능이다.
- 데이터에는 nil 이라는 값이 없는 상태가 있다. 0이 아니라, 값이 결정되지 않은 상태를 의미한다.
- 예를들어 사용자에게 어떤 값을 입력 받도록 요청했는데 서버가 꺼지거나 기타 오류로 인해 값이 넘어오지 않을 경우를 대비한다.

#### optional 자료형 만들기 : 랩.
- 옵셔널 자료형 변수 만들때 이름 뒤에 ? 를 붙이는데, 이러한 것을 랩 한다고 한다.
- optional 자료형으로 만들어서 안전한 상태로 만드는 것을 

```swift
// optinal 자료형 변수 만들기.
var test_int:Int? = nil

var test_int1:Int? = 10
var test_int2:Int = test_int1 // 이러면 에러임 왜냐면, 새로운 변수에도 nil이 들어갈 가능성이 있기 때문.
var test_int2:Int? = test_int1 //따라서 이처럼 만들어야 함.


// optional 자료형으로 랩한 변수는 계산이나 처리에 사용 하지 못한다 , 안전을 위해 optional자료형으로 포장했으므로 뜯어서 사용해야한다

// 언랩해서 값을 꺼내기 -> ! 를 붙인다.
var test_int3?Int = 10
var answer = test_int3! + 20  // 자료형을 언랩 했기 때문에 오류 발생 안함 .

// 암묵적인 언랩 자료형의 변수에 넣어서 꺼내기.
// 암묵적인 언랩 자료형의 변수란 , 이 변수에 들어있는 값이 절대 nil이 아니라고 보장되는 변수이므로 값을 곧바로 사용할수 있다.

var test_int1:Int? = 10
var test_int2:Int! = test_int1 // 암묵적인 언랩 자료형의 변수에 값을 넣는것. ( 새로운 변수를 만들때 변수뒤에 ! 를 붙여서 만든다.)
var answer = test_int2 +20

// if let을 사용하여 꺼내기. -> 언랩을 사용하는 방법들은 조금 강제적인 방법들.
// optional 바인딩이라고 부르는 if와 let을 함께 사용하는 것.  

var test_int:Int? = 10
if let temp = test_int {
 print(temp)
}     

// 가드를 사용해서 값을 꺼내기.
// 가드는 함수(메서드)에서 사용하는 것이므로, 조건을 만족하지 않으면 처리를 입구에서 곧바로 돌려보냄.
func test_guard(_ testInt:Int?){
   guard let temp = testInt else{ // 값이 재대로 들어있는지 확인
    return
   }
   print(temp)  // 20
}
let testInt2:Int? = 20
test_guard(testInt2)

// 자료형 변환시에 안전하게 optional 바인딩 사용하기 .
// 변환시에 변환 할수도 없을 수가 있기 때문에 이때는, nil 이 되므로 optional 자료형으로 만든다.
let test_int = "100" // String 타입.
let test_int2:Int? = Int(test_int) // Int 타입으로 
```



### 클래스.
#### 클래스 상속과 오버라이드.

```swift
// 스위치 색깔 바꾸는 
import Foundation
import UIKit

class Myswitch : UISwitch{
   
    required init?(coder aDecoder: NSCoder){
    // UIkit은 상속할때     required init?(coder aDecoder: NSCoder)라는 메서드가 필요하다.
       fatalError()
    }
    
    override init(frame: CGRect){ // 스위치 초기화 할때 사용되는 메서드가 init(frame: CGRect)이다.
       super.init(frame:frame)
        self.onTintColor = UIColor.red // 붉은 색으로 변경
    }
    
    
}

let temp = Myswitch()
temp.isOn = true
```

