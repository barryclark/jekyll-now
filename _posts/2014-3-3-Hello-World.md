---
layout: post
title: Android Reverse 学习总结
---
## Step1

> 参考：[创建 Android 项目](https://developer.android.google.cn/training/basics/firstapp/creating-project)

根据实验要求创建安卓新项目，参数：API23；Android6.0；Empty Activity。

### 开发基础

`Android` 开发的四大组件为：
- `Activity` ：用于表现功能
- `Service` ：后台运行的服务
- `Broadcast Receiver`：用于接收广播
- `Content Provider` ：等同于数据库
[参考](https://blog.csdn.net/xchaha/article/details/80398620)

#### Activity

- 定义：用户操作的可视化界面，提供一个完成操作指令的窗口。当创建完毕 `Activity` 之后，需要调用 `setContentView()` 方法来完成界面的显示。
- 依赖：需要在 `AndroidManifest.xml` `配置相关信息，否则系统将不识别也不执行该Activity` 。在 `android stdio` 会自动生成。
- 通信： `Activity` 之间通过 `Intent` 通信。
- 生命周期： `Android` 中维护一个 `Activity Stack` ， 使得一个 `Activity` 有四种状态： `Active` ； `Paused` ； `Stoped` ； `Destroyed` 。
> 暂停和停止的区别作于：暂停一般系统不会销毁该活动；而停止状态是该活动被其他活动完全覆盖（或点击 `HOME` 键退入后台），系统在需要时会自动销毁该活动。

![](lab1-2.png)<br>

#### Service

- 定义： `Service` 是一个专门在后台处理长时间任务的 `Android` 组件，没有 `UI` ，运行不依赖于任何用户界面。它有两种启动方式， `startService` 和 `bindService` 。
- 依赖：需要在 `AndroidManifest.xml` 配置相关信息，使用 \<service>\</service> 标签。
- 生命周期：这里分两种启动方式讨论。
  - `startService` ： 只是启动 `Service` ，启动它的组件（如 `Activity` ）和 `Service` 并 **没有关联** ，只有当 `Service` 调用 `stopSelf` 或者其他组件调用 `stopService` 服务才会终止。
  - `bindService` ： 其他组件可以通过 **回调** 获取 `Service` 的代理对象和 `Service` 交互，而这两方也进行了 **绑定** ，当启动方销毁时， `Service` 也会自动进行 `unBind` 操作，当发现 **所有绑定** 都进行了 `unBind` 时才会销毁 `Service` 。


#### Broadcast Receiver

- 定义：广播接收器是对发送出来的广播进行过滤接受并响应的一类组件。
> 广播是 `Android` 中一种广泛运用的在应用程序之间传输信息的机制。
- 依赖：
  - 广播接收器既可以在  `AndroidManifest.xml` 中注册（静态注册）。
  - 也可以在运行时的代码中使用 `Context.registerReceive()` 进行注册（动态注册）。
  > 当用来注册的 `Activity` 关掉后，动态注册的 `Broadcast Receiver` 也随之失效。
- 性质：
    - 应用可以使用它对外部事件进行过滤，使其只对感兴趣的外部事件（例如电话呼入、网络可用时）接收并响应。
    > 虽然 `Broadcast Receiver` 没有用户界面，但是它可以启动一个 `Activity` 或者 `Service` 来响应接收到的消息，或者用 `NotificationManager` 通知用户。通知方式包括闪灯，震动，放声，状态栏目标等等。

#### Content Provider

- 定义：该组件使一个应用程序的指定数据集可以提供给其他应用程序。其他应用可以通过 `ContentResolver` 类从该内容提供者中获取或存入数据。
> 即应用程序之间的通信（唯一方式），只有需要在多个应用程序间共享数据是才需要 `Content Provider` 。
- 依赖：没有依赖。 `ContentProvider` 使用 URI 来唯一标识其数据集，以 `content://` 作为前缀，表示该数据由 `ContentProvider` 来管理。
- 性质：
  - `ContentProvider` 用于保存和获取数据，即一份数据对所有应用程序可见。
  - 开发人员不会直接使用 `ContentProvider` 类对象，大多数通过 `ContentResolver` 对象实现对 `ContentProvider` 的操作。
  > `ContentProvider` 是一个抽象类。创建 `MyProvider` 类继承 `ContentProvider` ，实现6个抽象方法： `onCreate` 、 `getType` 、 `query` 、 `insert` 、 `delete` 、 `update` 。 `onCreate()` 方法会在创建的时候调用一次。其它方法通过ContentResolver的增删改查方法触发。[参考](https://blog.csdn.net/sjdjdjdjahd/article/details/103694314)


#### AndroidManifest.xml

- 定义： `AndroidManifest.xml` 是整个 `Android` 程序的信息扫描文件，它位于整个项目的根目录，描述了 `package` 中暴露的组件 （`Activities`，`Services`， `Content provider` 和 `Broadcast Receiver`） 的信息，是每个 `Android` 程序都必须的文件，该文件在程序创建自动生成的，不需要我们自己创建（该文件的文件名不能修改）。

- 结构：
  0. \<xml> : 版本和编码信息 
  1. \<manifest> : `package` ，用于指定应用程序的包名。
  2. \<application> : 
     1. Android:label : 指定 `Activity` 中标题栏的内容。默认为程序名。
     2. Android:supportsRtl (Rtl:right to left): 表示程序是否支持从右到左的布局方向。
     3. Android:allowBackup : `Android API Level 8`及其以上 `Android` 系统为应用程序提供的应用程序的数据备份和恢复功能。其默认为 `true` ，用户可以通过 `adb` 命令（ `backup` `restore` ） 对数据进行备份和恢复。
     > 存在安全隐患。
     4. ......
  3. \<activity> : 
     1. Android:name : 在创建活动时，需要通过 \<activity> 标签进行注册， name 即指定具体注册哪个互动。
     2. \<intent-fileter> : 为程序配置主活动（程序运行时首先启动的活动）。
     > 如果有多个< Activity >，那么其实有一个< intent-filter >标签就可以了，因为如果每个< Activity >标签中都含有< intent-filter >，那么就会按顺序去第一个含有< intent-filter >标签的< Activity >作为程序的主活动。
     3. android:permission ： 设置许可名，这个属性若在上定义的话，是一个给应用程序的所有组件设置许可的便捷方式，当然它是被各组件设置的许可名所覆盖的。
     4. android:presistent ： 该应用程序是否应该在任何时候都保持运行状态,默认为 `false` 。因为应用程序通常不应该设置本标识，持续模式仅仅应该设置给某些系统应用程序才是有意义的。
     5. ...
  4. \<intent-filter> : 
     1. \<action /> : 只有 android:name 一个属性，常见的 android:name 值为 android.intent.action.MAIN 。
     2. \<category /> : 也只有 android:name 这个属性，常见的 android:name 值为 android.intent.category.LAUNCHER 。
  5. \<meta-data> : 储存资源，供组件使用。
  6. \<activity-alias> : 创建 `activity` 的快捷方式。
  7. \<service> : 
     1. android:icon ： 声明图标，图片一般都放在 `drawable` 文件夹下
     2. android:enabled ： `Android` 系统是否能够实例化该应用程序的组件，如果为 `true` ，每个组件的 `enabled` 属性决定那个组件是否可以被 `enabled` 。如果为 `false` ，它覆盖组件指定的值；所有组件都是 `disabled` 。
     3. android:process ： 应用程序运行的进程名，它的默认值为元素里设置的包名，当然每个组件都可以通过设置该属性来覆盖默认值。如果你想两个应用程序共用一个进程的话，你可以设置他们的 android:process 相同，但前提条件是他们共享一个用户 ID 及被赋予了相同证书的时候
     4. ...
  8. \<Receiver> : 和 `service` 基本相同。
  9. \<Provider> : 
     1.  android:authorities：标识这个 `ContentProvider` ，调用者可以根据这个标识来找到它。
     2.  android:grantUriPermission：对某个URI授予的权限。

### Task1
有了以上安卓编程基础，可以开始实现 Task1，首先创建一个 Receiver：
![](step1-1.png)
可以看见在AndroidManifest.xml中已经自动添加了receiver字段，接下来实现要求：开机自启动和后台自启动一个service。


为实现以上功能，在清单中申请开机自启权限：
`<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />`

然后完成receiver的onReceive方法，主要思路是：**Receiver通过接受系统开机加载完毕后发送的`BOOT_COMPLETED`广播，使用Intent加载Mainactivity完成自启动。**
```java
    @Override
    public void onReceive(Context context, Intent intent) {
        // TODO: This method is called when the BroadcastReceiver is receiving
        // an Intent broadcast.

        if (intent.getAction().equals("android.intent.action.BOOT_COMPLETED")){
            Intent i=new Intent(context,MainActivity.class);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(i);
        }

        throw new UnsupportedOperationException("Not yet implemented");
    }
```
> 参考0：[要在清单中声明广播接收器，请执行以下步骤](https://developer.android.google.cn/guide/components/broadcasts)
> 参考1：[如何启动另一个activity](https://developer.android.google.cn/training/basics/firstapp/starting-activity)
> 参考2：[为什么要添加FLAG_ACTIVITY_NEW_TASK](https://blog.csdn.net/weixin_44618862/article/details/106268932)，因为Context并不存在任务栈，被启动的活动就无法进入启动它的活动的任务栈中，就会出现错误。

接下来实现无通知启动一个service，同理创建一个service文件后，receiver可以通过启动Mainactivity来间接启动service，即在Mainactivity中启动service。
```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Intent intent = new Intent(MainActivity.this, SecretService.class);
        startService(intent);
    }
```
> 报错：Installed Build Tools revision 33.0.0 is corrupted. Remove and install again using the SDK Manager.
> 解决：找到build tools目录中的d8.bat，将文件名修改为dx.bat。找到build tools目录中的lib/d8.jar，将文件名修改为dx.jar。

以上，第一步实现完毕。接下来实现获取设备位置信息并每三秒弹窗显示。


首先在清单中添加前台位置权限信息：
`<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />`
`<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />`
然后在Mainactivity中申请权限：
```java
if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION)
        != PackageManager.PERMISSION_GRANTED) {
    requestPermissions(new String[] { Manifest.permission.ACCESS_COARSE_LOCATION }, 0);
}
if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
        != PackageManager.PERMISSION_GRANTED) {
    requestPermissions(new String[] { Manifest.permission.ACCESS_FINE_LOCATION }, 1);
}
```
权限拿到手后，开始获取其位置信息，基本思路为使用LocationManager调用requestLocationUpdates方法每三秒获取位置信息，而LocationListener进行监听，监听结果使用toast进行显示。
```Java
    @Override
    public void onCreate() {
        super.onCreate();
        final LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        LocationListener locationListener = new LocationListener() {
            public void onLocationChanged(Location location) {
                String latitude = Double.toString(location.getLatitude());
                String longitude = Double.toString(location.getLongitude());
                String accuracy = Double.toString(location.getAccuracy());
                Log.i("log", "Location changed : Lat: " + latitude + " Lng: " + longitude);
                Toast.makeText(SecretService.this, "getAccuracy:" + 
                accuracy + "\ngetLatitude:" + latitude + "\ngetLongitude:" + 
                longitude, Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onStatusChanged(String provider, int status, Bundle extras) {
            }

            @Override
            public void onProviderEnabled(String provider) {
            }

            @Override
            public void onProviderDisabled(String provider) {
            }
        };

        //实现每三秒重新获取
        if (ActivityCompat.checkSelfPermission(
                this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED &&
            ActivityCompat.checkSelfPermission(
                this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 3000, 0, locationListener);

    }
```

> 参考1：[官方文档-位置信息](https://developer.android.google.cn/training/location)
> 参考2：[官方文档-请求权限](https://developer.android.google.cn/training/permissions/requesting)
> 参考3：[官方文档-LocationManager](https://developer.android.google.cn/reference/android/location/LocationManager.html)
> 参考4：[官方文档-getSystemService](https://developer.android.google.cn/reference/android/content/ContextWrapper#getSystemService(java.lang.String))
> 参考5：[官方文档-LocationListener](https://developer.android.google.cn/reference/android/location/LocationListener)：其中的几个方法必须被覆盖。
> 参考6：[官方文档-Location](https://developer.android.google.cn/reference/android/location/Location)
> 参考7：[官方文档-toast](https://developer.android.google.cn/reference/android/widget/Toast)

### Task2 

#### UI控件


