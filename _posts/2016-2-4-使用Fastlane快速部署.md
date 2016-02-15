---
layout: post
title: 使用Fastlane快速部署
---

[Fastlane](https://github.com/fastlane/fastlane) 是一套提供給Mac & iOS Developer的整合部署工具，提供使用者藉由預先寫好lane script方便的進行完整部署流程。Fastlane內建了許多常見的tool以及封裝過的tool，大致上可分為以下幾類：

* Building
* Testing
* Deploying
* Modifying Project
* Developer Portal
* Using git
* Using mercurial
* Notifications
* Misc

舉例來說，在我寫完一個新的功能要發佈到App store上時，只要在command line輸入以下指令：<br>

	$ fastlane appstore
就可以快速完成部署的工作。

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

# 使用
## 編寫Script
fastlane所有的行為都是依據你編寫的`Fastfile`來決定，你可以在`YOUR_PROJECT_PATH/fastlane/Fastfile`找到這個檔案。

打開`Fastfile`我們可以看到檔案的架構如下：
```ruby
platform :ios do
  before_all do
    # ENV["SLACK_URL"] = "https://hooks.slack.com/services/..."
    cocoapods
    
  end

  desc "Runs all the tests"
  lane :test do
    scan
  end

  desc "Submit a new Beta Build to Apple TestFlight"
  desc "This will also make sure the profile is up to date"
  lane :beta do
    # match(type: "appstore") # more information: https://codesigning.guide
    gym # Build your app - more options available
    pilot

    # sh "your_script.sh"
    # You can also use other beta testing services here (run `fastlane actions`)
  end

  desc "Deploy a new version to the App Store"
  lane :appstore do
    # match(type: "appstore")
    # snapshot
    gym # Build your app - more options available
    deliver(force: true)
    # frameit
  end

  # You can define as many lanes as you want

  after_all do |lane|
    # This block is called, only if the executed lane was successful

    # slack(
    #   message: "Successfully deployed new App Update."
    # )
  end

  error do |lane, exception|
    # slack(
    #   message: exception.message,
    #   success: false
    # )
  end
end
```

Fastlane將<b>xcodebuild test</b>封裝成[Scan](https://github.com/fastlane/scan)，Scan讓你可以用比較簡單的方式在command line進行測試。
