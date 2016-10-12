---
layout: post
title: Swift 3 - Salesforce Mobile SDK 4.3.1
---

At Dreamforce16 as expected there were many innovation intorduced. On mobile front two especially have peacked my interest, S1 Mobile app customization and submited to Appstore as your own and Swift support in Mobile SDK. At first glance S1 mobile app branding seem huge, but digging bit deeper it turned out to push your own S1 Mobile app to AppStore you need Salesforce Professional services ocntract and it can be done for a fee. That can be great option for Enterprise customers who wnat to have Appstore presence without Mobile experts. 

Next is Mobile SDK + Swift, here we will try to explore support for Xcode 8 & Swift 3. As this article been written during the week of DF16 the Salesforce Mobile SDK version is 4.3.1 sadly neither master nor unstable branches seem to support Swift 3. However, Swift 2.3 with conversion step does work well. So we can explore this part on how set up sdk and new build Swift project:

Instal [Salesforce Mobile SDK iOS](https://github.com/forcedotcom/SalesforceMobileSDK-iOS) from github.
Using setup instructions [here](https://developer.salesforce.com/docs/atlas.en-us.noversion.mobile_sdk.meta/mobile_sdk/install_ios.htm#install_ios) test the forceios command

```
forceios
```
You should see something like this image below if Node, NPM and `forceios` was set up correctly on MacOSX.

![forceios]({{ site.baseurl }}/images/mobile/sdk4.3/forceios.png)

We will create a native Swift app using following comand directive `native_swift`

```
forceios create --apptype=native_swift --appname=DGSwift --companyid=com.test.dgswift

```
Now Mobile SDK native template will go to work to create a starting Xcode Swift project and workspace.

![Swift Project]({{ site.baseurl }}/images/mobile/sdk4.3/swiftproject.png)

We will open Xcode workspace created by SDK template and will need to do Swift syntax conversion by selecting Swift 2.3 step (while Swift 3 not yet working this will help to make this transition easier later)

Select to Convert button

![Swift 2.3 Convert]({{ site.baseurl }}/images/mobile/sdk4.3/swiftconvert.png)

Set Swift 2.3 and follow Next steps of conversion.

![Swift 2.3 Convert]({{ site.baseurl }}/images/mobile/sdk4.3/swift2.3.png)

After conversion we can compile/build our project to check if everything is working syntaxwise with Swift 2.3. This build should work, and we can try run this project with iOS 10 iPhone 7 simulator. However, this may throw a bit of obscure runtime error about `Access to Keychain Groups`. This issue should be fixed in later updates for supporting Xcode 8. If you see this error at this point there is a fix, in Xcode project turn on Keychain Sharing in project Capabilities section.

![KeychainSharing]({{ site.baseurl }}/images/mobile/sdk4.3/keychainshare.png)

This solution is documented in this [Stack Overflow article](http://stackoverflow.com/questions/38456471/secitemadd-always-returns-error-34018-in-xcode-8-in-ios-10-simulator). Once this setting apply you can rerun the project and connect to Salesforce, authorize your app with OAuth and get a list of contacts on this sample app.

![sdkapp]({{ site.baseurl }}/images/mobile/sdk4.3/sdkapp.png)

This is how we can use Salesforce MobileSDK with Swift 2.3 to build native iOS app connected to Salesforce data.




