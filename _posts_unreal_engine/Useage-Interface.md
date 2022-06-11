
/*
 *
 */
UINTERFACE(MinimalAPI, Blueprintable)
class UReactToFeetOffInterface : public UInterface
{
	GENERATED_BODY()
};

class IReactToFeetOffInterface
{
	GENERATED_BODY()

public:
	/** Add interface function declarations here */

	UFUNCTION(BlueprintCallable, BlueprintImplementableEvent)
	void SetBoneStrikePosition(const FName& BoneName, const FVector& HitPosition, bool IsOffState);
};

	if (SkeletalMeshComponent->GetClass()->ImplementsInterface(UReactToFeetOffInterface::StaticClass()))
	{
		IReactToFeetOffInterface::Execute_SetBoneStrikePosition(SkeletalMeshComponent, BoneName, HitResult.Location, true);
	}