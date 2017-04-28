---
layout: post
title: How to develop Android apps using Xamarin for Windows
published: true
---

* Step 1: Go to Xamarin Windows
* Step 2: Enable Hyper-V
* Step 3: Download & install Visual Studio Emulator For Android
* Step 4: Go to Visual Studio ->New Solution->Android->MainActivity

Code Block Below:

    using Android.App;
    using Android.Widget;
    using Android.OS;

    namespace HelloWorldAndroid
    {
    [Activity(Label = "HelloWorldAndroid", MainLauncher = true, Icon = "@drawable/icon")]
    public class MainActivity : Activity
    {
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);

            // Set our view from the "main" layout resource
            // SetContentView (Resource.Layout.Main);
        }
    }
    }

<iframe width="560" height="315" src="https://www.youtube.com/embed/FiJuoFg_Ipc" frameborder="0" allowfullscreen></iframe>


![_config.yml]({{ site.baseurl }}/images/test.jpg)

The easiest way to make your first post is to edit this one. Go into /_posts/ and update the Hello World markdown file. For more instructions head over to the [Jekyll Now repository](https://github.com/barryclark/jekyll-now) on GitHub.
