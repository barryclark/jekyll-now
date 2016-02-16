---
layout: post
title: 使用Fastlane快速部署
---
在一般的產品開發週期中，當我們準備部署新版本時，會由iOS工程師包一個測試版本，交由QA部門進行測試與bug回報及修正。在App測試完成後，再由工程師上傳至App Store並讓PM決定何時部署。

但相信大家對於Apple的Archieve都有很多**不好的回憶**。尤其是關於Certification及Build Configuration，搞到最後整個team只有某一兩個人懂得如何包版。一旦這一兩個人剛好在開會或出公差，就會導致部署流程停滯不前。PM急著發佈新版修正問題，偏偏在辦公室的人都不懂怎麼部署，大家都只能等著那個關鍵人物回來處理。

為了解決這個問題，我們希望將部署的流程自動化，並且讓PM也有辦法自行決定部署與測試。

[Fastlane](https://github.com/fastlane/fastlane) 是一套提供給Mac & iOS Developer的整合部署工具，提供使用者藉由預先寫好lane script方便的進行完整部署流程。Fastlane整合了許多常見的tool讓使我們可以導入部署流程，包含的工具大致上可分為以下幾類：

* Building
* Testing
* Deploying ...and more

（更多詳見： [Fastlane Actions](https://github.com/fastlane/fastlane/blob/master/docs/Actions.md)）

舉例來說，以前iCHEF有一個新版本要發佈到App store上時，我們的做法是先打開XCode，按下Archieve，然後選擇要上傳的封裝檔，選擇Submit to App store，選擇team ID等等等；而當我們安裝Fastlane並且撰寫好部署的Script，往後當需要發佈時只需要在command line輸入以下指令：<br>

	$ fastlane appstore

便可以等待Fastlane自動幫我們完成部署的步驟。同時，簡化後的指令讓即使不懂技術的人也可以簡單地完成測試與部屬的工作，減少在部署這件事情上對工程師的依賴。

接下來，我們就來介紹如何安裝及使用Fastlane。
# 安裝
fastlane是一套Ruby-base的framework，我們假設你已經安裝過`gem`這個插件管理系統，如果沒有你可以參考 [RubyGems](https://rubygems.org/)。

1. `$ sudo gem install fastlane`
2. `$ xcode-select --install`
3. `$ sudo gem install bundle` (if needed)
4. `$ bundler` (if needed)
5. `$ cd YOUR_PROJECT_PATH`
6. `$ fastlane init`
	* 在`fastlane init`前，確定你的帳號有<b>Apple Developer Portal</b>和<b>iTunes Connect</b>的權限。
	* 在`fastlane init`過程中，fastlane會要求輸入AppleID和密碼，這個資訊會被儲存在本機的keychain中，並且在之後需要用到憑證時時自動下載相關的Certificates和Provisioning Profiles。
	* 在`fastlane init`後，fastlane會在你的專案資料夾下建立一個`fastlane/`的資料夾，裡面包含fastlane在執行時需要的參數以及設定。

# 編寫Script
fastlane所有的行為都是依據你編寫的`Fastfile`來決定，你可以在`YOUR_PROJECT_PATH/fastlane/Fastfile`找到這個檔案。

以iCHEF為例，用Editor打開`iCHEF/fastlane/Fastfile`我們可以看到檔案的架構如下：

```Ruby
fastlane_version "1.53.0"

default_platform :ios
ENV["SLACK_URL"] = "https://hooks.slack.com/services/..."

platform :ios do

  before_all do
    clean_cocoapods_cache
    cocoapods
  end

  lane :test do
    scan(
      device: "iPad Air",
      workspace: "YOUR_WORKSPACE.xcworkspace",
      scheme: "YOUR_SCHEME",
      clean: true,
      code_coverage: true
    )
    # snapshot
  end

  lane :build_RC do
    ENV["BUNDLE_IDENTIFIER"] = "YOUR.BUNDLE.IDENTIFIER"
    ENV["APPLE_ID"] = "YOUR_APPLE_ID"
    ENV["APPLE_TEAM_ID"] = "YOUR_APPLE_TEAM_ID"
    ENV["BUILD_PATH"] = "YOUR_BUILD_PATH"

    sigh(
      {
        app_identifier: ENV["BUNDLE_IDENTIFIER"],
        username: ENV["APPLE_ID"],
        team_id: ENV["APPLE_TEAM_ID"],
        output_path: ENV["BUILD_PATH"]
      }
    )
    
    gym(
      clean: true,
      scheme: "YOUR_SCHEME", 
      workspace: "YOUR_WORKSPACE.xcworkspace",
      configuration: "YOUR_BUILD_CONFIGURATION",
      output_directory: ENV["BUILD_PATH"],
    )  
    end

  after_all do |lane|
    if ENV["SLACK_URL"]
      slack(
        message: "App test complete",
        success: true,
        payload: {
          'Build Date' => Time.new.to_s
        },
        default_payloads: [:test_result, :git_branch]
      )
    end
  end

  error do |lane, exception|
    # slack(
    #   message: exception.message,
    #   success: false
    # )
  end
end
```
我們可以把這個檔案切成三個部分來看：
### before_all
顧名思義，寫在`before_all`這個block內的指令在每一個lane script執行前都會先呼叫一次。

以上面的程式碼為例，iCHEF使用CocoaPods來管理專案使用的第三方套件，在測試、包版或發佈前，我必須確保我的專案有建立好cocoapods相關的dependency，所以我就會在`before_all`內呼叫`cocoapods`來完成這個任務。

當你在`before_all`內呼叫了`cocoapods`，其實代表的是你在所有動作前執行了`pod install`這件事。Fastlane支援許多流行的第三方插件（比如CocoaPods、XCTool、Appium、TestFlight、Slack等等），並且將它們封裝成方便使用的格式。
### lane :LANE_NAME
在lane這個block內的指令就是我們要fastlane幫我們做的事情。我可以撰寫多個lane script，讓test、archieve、deploy執行不同的任務。以上面的程式碼為例，我寫了`lane :test`和`lane :build_RC`兩段lane script，它們負責：

* `lane :test`：幫我處理測試流程，並且在測試後輸出測試結果。
* `lane :build_RC`：幫我處理in-house distribution的流程，最後將包好的ipa輸出至指定的資料夾。

之後當我需要測試時，只需要開啟command line，前往專案資料夾並且呼叫`fastlane test`，它就會自動進行測試及發佈結果的工作。

### after_all
跟before\_all類似，寫在after\_all裡代表在執行完任意的lane script後都要執行的動作。

# 執行
1. `$ cd YOUR_PROJECT_PATH`
2. `$ fastlane YOUR_LANE_NAME`

# 下一步
接下來，你就可以依照需求編寫自己的部署流程，並且享受fastlane簡潔快速的部署方式！