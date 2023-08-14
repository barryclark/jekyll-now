[Unreal Doc : 구조체 사용하기](https://docs.unrealengine.com/5.0/ko/using-structs-in-unreal-cpp/)

다음은 데이터 구조체 정의에 대한 예시입니다.

```cpp
USTRUCT( BlueprintType )
struct FESegmentSpawnInfo 
{
	GENERATED_USTRUCT_BODY()

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "TestStruct")
	ESegmentForm Form;
    ...	
};
```

[Unreal Doc : Data Driven Gameplay Elements](https://docs.unrealengine.com/5.1/en-US/data-driven-gameplay-elements-in-unreal-engine/)

데이터 테이블에서 C++로 정의한 구조체를 사용하기 위해서는 FTableRowBase를 상속받아야 합니다.

```cpp
    USTRUCT(BlueprintType)
    struct FLevelUpData : public FTableRowBase
    {
        GENERATED_USTRUCT_BODY()
        ...
```