# 前言
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
1. `$ sudo gem install fastlane`
2. `$ xcode-select --install`
3. `$ sudo gem install bundle` (if needed)
4. `$ bundler` (if needed)
5. `$ cd YOUR_PROJECT_PATH`
6. `$ fastlane init`
	* 在`fastlane init`前，確定你的帳號有<b>Apple Developer Portal</b>和<b>iTunes Connect</b>的權限。
	* 在`fastlane init`過程中，fastlane會要求輸入AppleID和密碼，這個資訊會被儲存在本機的keychain中，並且在之後需要用到憑證時時自動下載相關的Certificates和Provisioning Profiles。

# 使用
## 測試
Fastlane將<b>xcodebuild test</b>封裝成[Scan](https://github.com/fastlane/scan)，Scan讓你可以用比較簡單的方式在command line進行測試。
