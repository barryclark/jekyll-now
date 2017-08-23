## React-Native android在windows下的踩坑记

在Android手机上运行React-native项目时
报错：unable to load script from assets 'index.android bundle'  ,make sure your bundle is packaged correctly or youu're runing a packager server


解决方案：
第一步：在  android/app/src/main 目录下创建一个  assets空文件夹
第二步：执行 下面这段命令
```js
react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

然后再次启动
```js
react-native run-android
```