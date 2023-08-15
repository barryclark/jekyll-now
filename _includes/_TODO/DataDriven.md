언리얼에서 데이터 주도 개발을 하기 위해서는 데이터 테이블과 이를 읽고 초기화 하는 구조가 필요합니다.

이 예제는 C++을 이용하여 데이터 테이블에 사용될 구조체를 작성하고 블루프린트를 이용하여 데이터를 관리합니다.

데이터 테이블 구조는 다음과 같습니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/bf2bd7bf-c5a3-4559-93c2-cb6f8446c398)

데이터 테이블의 사용한 GameManger에서 애셋 래퍼런스를 직접 가지고 있습니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/72ae7ce7-42e6-4ee4-8725-faf29106a112)

처음 실행시 데이터 테이블의 나레이션을 비동기로 로드합니다. 다음은 GameManager의 코드입니다.

```cpp
UCLASS()
class VRDEMENTIAEXPERIENCE_API UGameManager : public UGameInstance
{
	GENERATED_BODY()
  ...
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly)
	TMap<FName, USoundBase*> NarrationSoundMap;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	UDataTable* NarrationDataTable;
  ...
```

```cpp

void UGameManager::Init()
{
	UE_LOG(LogTemp, Warning, TEXT("게임매니저 시작 UGameManager Init()"));
  ...
	LoadNarrationAsset();
}

...

void UGameManager::LoadNarrationAsset()
{
	if (NarrationDataTable == nullptr)
	{
		UE_LOG(LogTemp, Error, TEXT("NarrationDataTable이 유효하지 않습니다."));
		return;
	}

	// 나레이션 데이터 테이블에서 키에 해당하는 데이터를 가져옵니다.
	TArray<FNarrationData*> narrationDataArray;
	NarrationDataTable->GetAllRows<FNarrationData>(TEXT("Load Narration"), narrationDataArray);

	// 소프트 오브젝트 경로를 담을 배열을 생성합니다.
	TArray<FSoftObjectPath> softObjectPathArray;
	for (int index = 0; index < narrationDataArray.Num(); index++)
	{
		softObjectPathArray.Add(narrationDataArray[index]->SoftAssetPath);
	}

	// 나레이션을 비동기로 로드합니다.
	UAssetManager::GetStreamableManager().RequestAsyncLoad(softObjectPathArray, FStreamableDelegate::CreateUObject(this, &UGameManager::MapNarrationAsset));
}

void UGameManager::MapNarrationAsset()
{
	// 나레이션 데이터 테이블에서 키에 해당하는 데이터를 가져옵니다.
	TArray<FName> narrationNameArray;
	TArray<FNarrationData*> narrationDataArray;
	narrationNameArray = NarrationDataTable->GetRowNames();
	NarrationDataTable->GetAllRows<FNarrationData>(TEXT("Load Narration"), narrationDataArray);

	for (int index = 0; index < narrationDataArray.Num(); index++)
	{
		NarrationSoundMap.Add(narrationNameArray[index], Cast<USoundBase>(narrationDataArray[index]->SoftAssetPath.ResolveObject()));
	}
}

```
