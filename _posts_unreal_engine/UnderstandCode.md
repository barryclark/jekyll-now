---
layout: post
title: Understand Code
---

- [ ] 지연 렌더링이 맞는지 확인할 것
- [ ] 렌더링 더럽게 어렵네.. ㅎ.

<details><summary>시작점이 어디인가?</summary>
<div markdown="1">

[Where is the definition for main()](https://forums.unrealengine.com/t/where-is-the-definition-for-main/330821)

언리얼 엔진에서 Main함수는 Launch 모듈안에 있습니다.

Window의 경우 LaunchWindows.cpp에 있습니다.
```cpp
int32 WINAPI WinMain(HINSTANCE hInINstance, HINSTANCE hPreInstance, char*, int32 nCmdShow)
```

iOS의 경우 LaunchIOS.cpp에 있습니다.
```cpp
int main(int argc, char* argv[])
...
```

Android의 경우 LaunchAndroid.cpp에 있습니다.
```cpp
void android_main(struct android_app* state)
```

</div></details>

<details><summary>WinMain</summary>
<div markdown="1">

WinMain는 시작하고 끄는 것으로 구성되어 있습니다.
```cpp
int32 WINAPI WinMain(HINSTANCE hInINstance, HINSTANCE hPreInstance, char*, int32 nCmdShow)
{
	int32 Result = LaunchWindowsStartup(hInInstance, hPrevInstance, pCmdLine, nCmdShow, nullptr);
	LaunchWindowsShutdown();
	return Result;
}
```

GuardedMain을 통해서 엔진이 켜져있는 동안 돌아가는 루프문을 실행합니다.
```cpp
LAUNCH_API int32 LaunchWindowsStartup( HINSTANCE hInInstance, HINSTANCE hPrevInstance, char*, int32 nCmdShow, const TCHAR* CmdLine )
{
    ...

	// When we're running embedded, assume that the outer application is going to be handling crash reporting
#if UE_BUILD_DEBUG
	if (GUELibraryOverrideSettings.bIsEmbedded || !GAlwaysReportCrash)
#else
	if (GUELibraryOverrideSettings.bIsEmbedded || bNoExceptionHandler || (FPlatformMisc::IsDebuggerPresent() && !GAlwaysReportCrash))
#endif
	{
		// Don't use exception handling when a debugger is attached to exactly trap the crash. This does NOT check
		// whether we are the first instance or not!
		ErrorLevel = GuardedMain( CmdLine );
	}
	else
	{
    ...
 		{
			GIsGuarded = 1;
			// Run the guarded code.
			ErrorLevel = GuardedMainWrapper( CmdLine );
			GIsGuarded = 0;
		}
    ...
}
```

EngineTick메서드를 통해 매 프레임을 처리합니다.
```cpp
int32 GuardedMain( const TCHAR* CmdLine )
{
    ...
	{
		while( !IsEngineExitRequested() )
		{
			EngineTick();
		}
	}
    ...
}
```

EngineTick은 EngineLoop의 Tick을 호출합니다.
```cpp
LAUNCH_API void EngineTick( void )
{
	GEngineLoop.Tick();
}
```

</div></details>

<details><summary>랜더링</summary>
<div markdown="1">

GEngineLoop의 Tick메서드에서 씬을 렌더합니다.
```cpp
ENQUEUE_RENDER_COMMAND(BeginFrame)([CurrentFrameCounter](FRHICommandListImmediate& RHICmdList)
		{
			BeginFrameRenderThread(RHICmdList, CurrentFrameCounter);
		});

		for (const FWorldContext& Context : GEngine->GetWorldContexts())
		{
			UWorld* CurrentWorld = Context.World();
			if (CurrentWorld)
			{
				FSceneInterface* Scene = CurrentWorld->Scene;

				ENQUEUE_RENDER_COMMAND(SceneStartFrame)([Scene](FRHICommandListImmediate& RHICmdList)
				{
					Scene->StartFrame();
				});
			}
		}
		...
	}

	FStats::AdvanceFrame( false, FStats::FOnAdvanceRenderingThreadStats::CreateStatic( &AdvanceRenderingThreadStatsGT ) );

	{
		SCOPE_CYCLE_COUNTER( STAT_FrameTime );

		// Calculates average FPS/MS (outside STATS on purpose)
		CalculateFPSTimings();

		// Note the start of a new frame
		MALLOC_PROFILER(GMalloc->Exec(nullptr, *FString::Printf(TEXT("SNAPSHOTMEMORYFRAME")),*GLog));

		// handle some per-frame tasks on the rendering thread
		ENQUEUE_RENDER_COMMAND(ResetDeferredUpdates)(
			[](FRHICommandList& RHICmdList)
			{
				FDeferredUpdateResource::ResetNeedsUpdate();
				FlushPendingDeleteRHIResources_RenderThread();
			});

		// Don't pump messages if we're running embedded as the outer application
		// will pass us messages instead.
		if (!GUELibraryOverrideSettings.bIsEmbedded)
		{
			GEngine->SetInputSampleLatencyMarker(CurrentFrameCounter);

			//QUICK_SCOPE_CYCLE_COUNTER(STAT_PumpMessages);
			FPlatformApplicationMisc::PumpMessages(true);
		}

		bool bIdleMode;
		{

			QUICK_SCOPE_CYCLE_COUNTER(STAT_FEngineLoop_Idle);

			// Idle mode prevents ticking and rendering completely
			bIdleMode = ShouldUseIdleMode();
			if (bIdleMode)
			{
				// Yield CPU time
				FPlatformProcess::Sleep(.1f);
			}
		}

		// @todo vreditor urgent: Temporary hack to allow world-to-meters to be set before
		// input is polled for motion controller devices each frame.
		extern ENGINE_API float GNewWorldToMetersScale;
		if( GNewWorldToMetersScale != 0.0f  )
		{
#if WITH_ENGINE
			UWorld* WorldToScale = GWorld;

#if WITH_EDITOR
			if( GIsEditor && GEditor->PlayWorld != nullptr && GEditor->bIsSimulatingInEditor )
			{
				WorldToScale = GEditor->PlayWorld;
			}
#endif //WITH_EDITOR

			if( WorldToScale != nullptr )
			{
				if( GNewWorldToMetersScale != WorldToScale->GetWorldSettings()->WorldToMeters )
				{
					WorldToScale->GetWorldSettings()->WorldToMeters = GNewWorldToMetersScale;
				}
			}

			GNewWorldToMetersScale = 0.0f;
		}
#endif //WITH_ENGINE

		// tick active platform files
		FPlatformFileManager::Get().TickActivePlatformFile();

		// Roughly track the time when the input was sampled
		FCoreDelegates::OnSamplingInput.Broadcast();

		// process accumulated Slate input
		if (FSlateApplication::IsInitialized() && !bIdleMode)
		{
			CSV_SCOPED_TIMING_STAT_EXCLUSIVE(Input);
			SCOPE_TIME_GUARD(TEXT("SlateInput"));
			QUICK_SCOPE_CYCLE_COUNTER(STAT_FEngineLoop_Tick_SlateInput);
			LLM_SCOPE(ELLMTag::UI);

			FSlateApplication& SlateApp = FSlateApplication::Get();
            {
                QUICK_SCOPE_CYCLE_COUNTER(STAT_FEngineLoop_Tick_PollGameDeviceState);
                SlateApp.PollGameDeviceState();
            }
			// Gives widgets a chance to process any accumulated input
            {
                QUICK_SCOPE_CYCLE_COUNTER(STAT_FEngineLoop_Tick_FinishedInputThisFrame);
                SlateApp.FinishedInputThisFrame();
            }
		}

		// main game engine tick (world, game objects, etc.)
		GEngine->Tick(FApp::GetDeltaTime(), bIdleMode);

		// If a movie that is blocking the game thread has been playing,
		// wait for it to finish before we continue to tick or tick again
		// We do this right after GEngine->Tick() because that is where user code would initiate a load / movie.
		{
            if (FPreLoadScreenManager::Get())
            {
                if (FPreLoadScreenManager::Get()->HasRegisteredPreLoadScreenType(EPreLoadScreenTypes::EngineLoadingScreen))
                {
                    //Wait for any Engine Loading Screen to stop
                    if (FPreLoadScreenManager::Get()->HasActivePreLoadScreenType(EPreLoadScreenTypes::EngineLoadingScreen))
                    {
                        FPreLoadScreenManager::Get()->WaitForEngineLoadingScreenToFinish();
                    }

                    //Switch Game Window Back
                    UGameEngine* GameEngine = Cast<UGameEngine>(GEngine);
                    if (GameEngine)
                    {
                        GameEngine->SwitchGameWindowToUseGameViewport();
                    }
                }
                
                //Destroy / Clean Up PreLoadScreenManager as we are now done
                FPreLoadScreenManager::Destroy();
            }
			else
			{
				QUICK_SCOPE_CYCLE_COUNTER(STAT_FEngineLoop_WaitForMovieToFinish);
				GetMoviePlayer()->WaitForMovieToFinish(true);
			}
		}

		if (GShaderCompilingManager)
		{
			// Process any asynchronous shader compile results that are ready, limit execution time
			QUICK_SCOPE_CYCLE_COUNTER(STAT_FEngineLoop_Tick_GShaderCompilingManager);
			GShaderCompilingManager->ProcessAsyncResults(true, false);
		}

		if (GDistanceFieldAsyncQueue)
		{
			QUICK_SCOPE_CYCLE_COUNTER(STAT_FEngineLoop_Tick_GDistanceFieldAsyncQueue);
			GDistanceFieldAsyncQueue->ProcessAsyncTasks();
		}

		// Tick the platform and input portion of Slate application, we need to do this before we run things
		// concurrent with networking.
		if (FSlateApplication::IsInitialized() && !bIdleMode)
		{
			{
				QUICK_SCOPE_CYCLE_COUNTER(STAT_FEngineLoop_ProcessPlayerControllersSlateOperations);
				check(!IsRunningDedicatedServer());

				// Process slate operations accumulated in the world ticks.
				ProcessLocalPlayerSlateOperations();
			}

			FSlateApplication::Get().Tick(ESlateTickType::PlatformAndInput);
		}

#if WITH_ENGINE
		// process concurrent Slate tasks
		FGraphEventRef ConcurrentTask;
		const bool bDoConcurrentSlateTick = GEngine->ShouldDoAsyncEndOfFrameTasks();

		const UGameViewportClient* const GameViewport = GEngine->GameViewport;
		const UWorld* const GameViewportWorld = GameViewport ? GameViewport->GetWorld() : nullptr;
		UDemoNetDriver* const CurrentDemoNetDriver = GameViewportWorld ? GameViewportWorld->GetDemoNetDriver() : nullptr;

		// Optionally validate that Slate has not modified any replicated properties for client replay recording.
		FDemoSavedPropertyState PreSlateObjectStates;
		const bool bValidateReplicatedProperties = CurrentDemoNetDriver && CVarDoAsyncEndOfFrameTasksValidateReplicatedProperties.GetValueOnGameThread() != 0;
		if (bValidateReplicatedProperties)
		{
			PreSlateObjectStates = CurrentDemoNetDriver->SavePropertyState();
		}

		if (bDoConcurrentSlateTick)
		{
			const float DeltaSeconds = FApp::GetDeltaTime();

			if (CurrentDemoNetDriver && CurrentDemoNetDriver->ShouldTickFlushAsyncEndOfFrame())
			{
				ConcurrentTask = TGraphTask<FExecuteConcurrentWithSlateTickTask>::CreateTask(nullptr, ENamedThreads::GameThread).ConstructAndDispatchWhenReady(
					[CurrentDemoNetDriver, DeltaSeconds]()
				{
					if (CVarDoAsyncEndOfFrameTasksRandomize.GetValueOnAnyThread(true) > 0)
					{
						FPlatformProcess::Sleep(FMath::RandRange(0.0f, .003f)); // this shakes up the threading to find race conditions
					}

					if (CurrentDemoNetDriver != nullptr)
					{
						CurrentDemoNetDriver->TickFlushAsyncEndOfFrame(DeltaSeconds);
					}
				});
			}
		}
#endif

		// Tick(Advance) Time for the application and then tick and paint slate application widgets.
		// We split separate this action from the one above to permit running network replication concurrent with slate widget ticking and painting.
		if (FSlateApplication::IsInitialized() && !bIdleMode)
		{
			FSlateApplication::Get().Tick(ESlateTickType::TimeAndWidgets);
		}

#if WITH_ENGINE
		if (bValidateReplicatedProperties)
		{
			const bool bReplicatedPropertiesDifferent = CurrentDemoNetDriver->ComparePropertyState(PreSlateObjectStates);
			if (bReplicatedPropertiesDifferent)
			{
				UE_LOG(LogInit, Log, TEXT("Replicated properties changed during Slate tick!"));
			}
		}

		if (ConcurrentTask.GetReference())
		{
			CSV_SCOPED_SET_WAIT_STAT(Slate);

			QUICK_SCOPE_CYCLE_COUNTER(STAT_ConcurrentWithSlateTickTasks_Wait);
			FTaskGraphInterface::Get().WaitUntilTaskCompletes(ConcurrentTask);
			ConcurrentTask = nullptr;
		}
		{
			ENQUEUE_RENDER_COMMAND(WaitForOutstandingTasksOnly_for_DelaySceneRenderCompletion)(
				[](FRHICommandList& RHICmdList)
				{
					QUICK_SCOPE_CYCLE_COUNTER(STAT_DelaySceneRenderCompletion_TaskWait);
					FRHICommandListExecutor::GetImmediateCommandList().ImmediateFlush(EImmediateFlushType::WaitForOutstandingTasksOnly);
				});
		}
#endif

#if STATS
		// Clear any stat group notifications we have pending just in case they weren't claimed during FSlateApplication::Get().Tick
		extern CORE_API void ClearPendingStatGroups();
		ClearPendingStatGroups();
#endif

#if WITH_EDITOR && !UE_BUILD_SHIPPING
		// tick automation controller (Editor only)
		{
			QUICK_SCOPE_CYCLE_COUNTER(STAT_FEngineLoop_Tick_AutomationController);
			static FName AutomationController("AutomationController");
			if (FModuleManager::Get().IsModuleLoaded(AutomationController))
			{
				FModuleManager::GetModuleChecked<IAutomationControllerModule>(AutomationController).Tick();
			}
		}
#endif

#if WITH_ENGINE && WITH_AUTOMATION_WORKER
		// tick automation worker
		{
			QUICK_SCOPE_CYCLE_COUNTER(STAT_FEngineLoop_Tick_AutomationWorker);
			static const FName AutomationWorkerModuleName = TEXT("AutomationWorker");
			if (FModuleManager::Get().IsModuleLoaded(AutomationWorkerModuleName))
			{
				FModuleManager::GetModuleChecked<IAutomationWorkerModule>(AutomationWorkerModuleName).Tick();
			}
		}
#endif

		// tick render hardware interface
		{			
			SCOPE_CYCLE_COUNTER(STAT_RHITickTime);
			RHITick( FApp::GetDeltaTime() ); // Update RHI.
		}

		// We need to set this marker before EndFrameRenderThread is enqueued. 
		// If multithreaded rendering is off, it can cause a bad ordering of game and rendering markers.
		GEngine->SetSimulationLatencyMarkerEnd(CurrentFrameCounter);

		// Increment global frame counter. Once for each engine tick.
		GFrameCounter++;

		ENQUEUE_RENDER_COMMAND(FrameCounter)(
			[CurrentFrameCounter = GFrameCounter](FRHICommandListImmediate& RHICmdList)
		{
			GFrameCounterRenderThread = CurrentFrameCounter;
		});

		// Disregard first few ticks for total tick time as it includes loading and such.
		if (GFrameCounter > 6)
		{
			TotalTickTime += FApp::GetDeltaTime();
		}

		// Find the objects which need to be cleaned up the next frame.
		FPendingCleanupObjects* PreviousPendingCleanupObjects = PendingCleanupObjects;
		PendingCleanupObjects = GetPendingCleanupObjects();

		{
			SCOPE_CYCLE_COUNTER(STAT_FrameSyncTime);
			// this could be perhaps moved down to get greater parallelism
			// Sync game and render thread. Either total sync or allowing one frame lag.
			static FFrameEndSync FrameEndSync;
			static auto CVarAllowOneFrameThreadLag = IConsoleManager::Get().FindTConsoleVariableDataInt(TEXT("r.OneFrameThreadLag"));
			FrameEndSync.Sync( CVarAllowOneFrameThreadLag->GetValueOnGameThread() != 0 );
		}

		// tick core ticker, threads & deferred commands
		{
			SCOPE_CYCLE_COUNTER(STAT_DeferredTickTime);
			CSV_SCOPED_TIMING_STAT_EXCLUSIVE(DeferredTickTime);
			// Delete the objects which were enqueued for deferred cleanup before the previous frame.
			delete PreviousPendingCleanupObjects;

#if WITH_COREUOBJECT
			DeleteLoaders(); // destroy all linkers pending delete
#endif

			FTicker::GetCoreTicker().Tick(FApp::GetDeltaTime());
			FThreadManager::Get().Tick();
			GEngine->TickDeferredCommands();		
		}

#if !UE_SERVER
		// tick media framework
		static const FName MediaModuleName(TEXT("Media"));
		IMediaModule* MediaModule = FModuleManager::LoadModulePtr<IMediaModule>(MediaModuleName);
		if (MediaModule != nullptr)
		{
			QUICK_SCOPE_CYCLE_COUNTER(STAT_FEngineLoop_MediaTickPostRender);
			MediaModule->TickPostRender();
		}
#endif

		FCoreDelegates::OnEndFrame.Broadcast();

		#if !UE_SERVER && WITH_ENGINE
		{
			// We emit dynamic resolution's end frame right before RHI's. GEngine is going to ignore it if no BeginFrame was done.
			GEngine->EmitDynamicResolutionEvent(EDynamicResolutionStateEvent::EndFrame);
		}
		#endif

		// end of RHI frame
		ENQUEUE_RENDER_COMMAND(EndFrame)(
			[CurrentFrameCounter](FRHICommandListImmediate& RHICmdList)
			{
				EndFrameRenderThread(RHICmdList, CurrentFrameCounter);
			});
```

</div></details>