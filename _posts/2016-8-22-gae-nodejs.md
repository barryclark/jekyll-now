---
layout: post
title: Google Cloud Platform SDKをセットアップしてGAEでnode.jsアプリを動かしてみる
---

村岡です。[Google App Engine for node.js](https://cloud.google.com/nodejs/)がローンチされてしばらく経つのでGoogle Cloud Platform SDKをセットアップするところからの流れをやってみました。  
環境はOSX 10.11.6です。node.jsはもっぱらherokuにホストしてるんだけどGAEも選択肢に入れたいところ。

# 手順

## Google Cloud Platform SDKをインストールする

GAEはPython2.7で動きます。ボクの環境はPhothon3がデフォルトなので[pyenv](https://github.com/yyuu/pyenv)でPython2.7にしてからSDKをセットアップします。

```
$ pyenv activate python2
$ python -V
Python 2.7.11rc1
$ curl https://sdk.cloud.google.com | bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   421    0   421    0     0    249      0 --:--:--  0:00:01 --:--:--   249
Downloading Google Cloud SDK install script: https://dl.google.com/dl/cloudsdk/channels/rapid/install_google_cloud_sdk.bash
######################################################################## 100.0%
Running install script from: /var/folders/4c/kfbvy4tj5cdflv39c08nfzm00000gn/T/tmp.XXXXXXXXXX.4dFK67yC/install_google_cloud_sdk.bash
which curl
curl -# -f https://dl.google.com/dl/cloudsdk/channels/rapid/google-cloud-sdk.tar.gz
######################################################################## 100.0%

Installation directory (this will create a google-cloud-sdk subdirectory) (/Users/hoge): /Users/hoge/bin
mkdir -p /Users/hoge/bin  // 指定したディレクトリに google-cloud-sdkがインストールされる
tar -C /Users/hoge/bin -xvf /var/folders/4c/kfbvy4tj5cdflv39c08nfzm00000gn/T/tmp.XXXXXXXXXX.2cPUN8lz/google-cloud-sdk.tar.gz
x google-cloud-sdk/
x google-cloud-sdk/lib/
x google-cloud-sdk/lib/surface/

…(省略)…

x google-cloud-sdk/.install/
x google-cloud-sdk/.install/core.snapshot.json
x google-cloud-sdk/.install/core.manifest
x google-cloud-sdk/.install/.download/

/Users/hoge/bin/google-cloud-sdk/install.sh
Welcome to the Google Cloud SDK!

To help improve the quality of this product, we collect anonymized data on how
the SDK is used. You may choose to opt out of this collection now (by choosing
'N' at the below prompt), or at any time in the future by running the following
command:
    gcloud config set disable_usage_reporting true

Do you want to help improve the Google Cloud SDK (Y/n)?  Y


This will install all the core command line tools necessary for working with
the Google Cloud Platform.



Your current Cloud SDK version is: 104.0.0
Installing components from version: 104.0.0

┌────────────────────────────────────────────────────────────────────────────┐
│                    These components will be installed.                     │
├─────────────────────────────────────────────────────┬────────────┬─────────┤
│                         Name                        │  Version   │   Size  │
├─────────────────────────────────────────────────────┼────────────┼─────────┤
│ BigQuery Command Line Tool                          │     2.0.24 │ < 1 MiB │
│ BigQuery Command Line Tool (Platform Specific)      │     2.0.24 │ < 1 MiB │
│ Cloud SDK Core Libraries (Platform Specific)        │ 2016.03.28 │ < 1 MiB │
│ Cloud Storage Command Line Tool                     │       4.18 │ 2.6 MiB │
│ Cloud Storage Command Line Tool (Platform Specific) │       4.18 │ < 1 MiB │
│ Default set of gcloud commands                      │            │         │
└─────────────────────────────────────────────────────┴────────────┴─────────┘

For the latest full release notes, please visit:
  https://cloud.google.com/sdk/release_notes

╔════════════════════════════════════════════════════════════╗
╠═ Creating update staging area                             ═╣
╠════════════════════════════════════════════════════════════╣
╠═ Installing: BigQuery Command Line Tool                   ═╣
╠════════════════════════════════════════════════════════════╣
╠═ Installing: BigQuery Command Line Tool (Platform Spec... ═╣
╠════════════════════════════════════════════════════════════╣
╠═ Installing: Cloud SDK Core Libraries (Platform Specific) ═╣
╠════════════════════════════════════════════════════════════╣
╠═ Installing: Cloud Storage Command Line Tool              ═╣
╠════════════════════════════════════════════════════════════╣
╠═ Installing: Cloud Storage Command Line Tool (Platform... ═╣
╠════════════════════════════════════════════════════════════╣
╠═ Installing: Default set of gcloud commands               ═╣
╠════════════════════════════════════════════════════════════╣
╠═ Creating backup and activating new installation          ═╣
╚════════════════════════════════════════════════════════════╝

Performing post processing steps...done.

Update done!


Modify profile to update your $PATH and enable shell command 
completion? (Y/n)?  Y

The Google Cloud SDK installer will now prompt you to update an rc 
file to bring the Google Cloud CLIs into your environment.

Enter a path to an rc file to update, or leave blank to use 
[/Users/hoge/.bash_profile]:  /Users/hoge/.profile
Backing up [/Users/hoge/.profile] to [/Users/hoge/.profile.backup].
[/Users/hoge/.profile] has been updated.
Start a new shell for the changes to take effect.


For more information on how to get started, please visit:
  https://cloud.google.com/sdk/#Getting_Started


$
```

上記の解説をちょっと。  

`Installation directory (this will create a google-cloud-sdk subdirectory) (/Users/user):` のところで指定したディレクトリに google-cloud-sdkがインストールされます。

`Enter a path to an rc file to update, or leave blank to use ` のときのリソースファイルは `~/.profile` を指定。Macの場合。

## シェルを再起動してPATHを反映させる

```
 exec -l $SHELL
```

ちなみに `.profile`にはこんなのが追加されます。  

```
# The next line updates PATH for the Google Cloud SDK. 
source '/Users/hoge/bin/google-cloud-sdk/path.bash.inc' 
  
# The next line enables shell command completion for gcloud. 
source '/Users/hoge/bin/google-cloud-sdk/completion.bash.inc'  
```


## Googleアカウントの認証

```
$ gcloud init
Welcome! This command will take you through the configuration of gcloud.

Your current configuration has been set to: [default]

To continue, you must log in. Would you like to log in (Y/n)?  Y

Your browser has been opened to visit:

    **********************************************************

You are now logged in as: [yourname@gmail.com]

Pick cloud project to use: 
 [1] [example1]
 [2] [example2]
 [3] [example3]
Please enter your numeric choice:  1     # 認証する Google Cloud Platform関係のプロジェクトIDを指定する

Your current project has been set to: [optimum-sound-128005].

Which compute zone would you like to use as project default?
 [1] [asia-east1-c]
 [2] [asia-east1-b]
 [3] [asia-east1-a]
 [4] [europe-west1-c]
 [5] [europe-west1-b]
 [6] [europe-west1-d]
 [7] [us-central1-a]
 [8] [us-central1-f]
 [9] [us-central1-b]
 [10] [us-central1-c]
 [11] [us-east1-d]
 [12] [us-east1-b]
 [13] [us-east1-c]
 [14] Do not set default zone
Please enter your numeric choice:  1 # Google Compute EngineのZoneを指定する

Your project default compute zone has been set to [asia-east1-c].
You can change it by running [gcloud config set compute/zone NAME].

Your project default compute region has been set to [asia-east1].
You can change it by running [gcloud config set compute/region NAME].

Created a default .boto configuration file at [/Users/hoge/.boto]. See this file and
[https://cloud.google.com/storage/docs/gsutil/commands/config] for more
information about configuring Google Cloud Storage.
Your Google Cloud SDK is configured and ready to use!

* Commands that require authentication will use yourname@gmail.com by default
* Commands will reference project `optimum-sound-128005` by default
* Compute Engine commands will use region `asia-east1` by default
* Compute Engine commands will use zone `asia-east1-c` by default

Run `gcloud help config` to learn how to change individual settings

This gcloud configuration is called [default]. You can create additional configurations if you work with multiple accounts and/or projects.
Run `gcloud topic configurations` to learn more.

Some things to try next:

* Run `gcloud --help` to see the Cloud Platform services you can interact with. And run `gcloud help COMMAND` to get help on any gcloud command.
* Run `gcloud topic -h` to learn about advanced features of the SDK like arg files and output formatting
* Clone your Google Source Repository to a local directory by running the command `gcloud source repos clone default /local/path`
```

gcloud init 時`To continue, you must log in. Would you like to log in (Y/n)?  Y` の時点でWebブラウザに遷移してGoogleのOAuth認証でログインするアカウントを選択する必要があります。

## Google Cloud PlatformにあるソースコードをCloneする

```
$ cd ./src
$ gcloud source repos clone default   # defaultは最初に gcloud init した際自動的に付与される configuration名の模様
```

## サンプルをローカルで実行する

```
$ cd default/1-hello-world/
$ npm install
$ npm start

> nodejs-getting-started@1.0.0 start /Users/hoge/src/gae/default/1-hello-world
> node app.js

App listening at http://:::8080
```

Webブラウザで http://localhost:8080 にアクセスすると表示されます

## コードを編集してデプロイする

簡単なhttpサーバーのサンプルを書いてGAEにデプロイしてみます。

```
$ vi app.js
=====
...
// [START hello_world]
// Say hello!
app.get('/', function (req, res) {
  //res.status(200).send('Hello, world!');
  var version = process.versions.node;  // node.jsのバージョン
  res.status(200).send('Welcome GoogleAppEngine node v' + version);
});
// [END hello_world]
...
=====
$ gcloud preview app deploy 
You are about to deploy the following modules:
 - optimum-sound-128005/default (from [/Users/hoge/src/google-cloud-platform/gae/default/1-hello-world/app.yaml])
     Deployed URL: [https://optimum-sound-128005.appspot.com]

Do you want to continue (Y/n)?  Y

Beginning deployment...

Verifying that Managed VMs are enabled and ready.
Building and pushing image for module [default]
Started cloud build [e52339f0-e624-45c4-b402-89e33201bcf8].
To see logs in the Cloud Console: https://console.developers.google.com/logs?project=optimum-sound-128005&service=cloudbuild.googleapis.com&key1=e52339f0-e624-45c4-b402-89e33201bcf8&logName=projects/optimum-sound-128005/logs/cloudbuild
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "e52339f0-e624-45c4-b402-89e33201bcf8"

FETCHSOURCE
Fetching storage object: gs://staging.optimum-sound-128005.appspot.com/us.gcr.io/optimum-sound-128005/appengine/default.20160413t163332:latest#1460532818731000
Copying gs://staging.optimum-sound-128005.appspot.com/us.gcr.io/optimum-sound-128005/appengine/default.20160413t163332:latest#1460532818731000...
Downloading file:///tmp/source-archive.tgz:                      0 B/2.75 KiB   Downloading file:///tmp/source-archive.tgz:                      2.75 KiB/2.75 KiB    
FETCHBUILDER
BUILD
Client:
 Version:      1.9.1
 API version:  1.21
 Go version:   go1.4.3
 Git commit:   a34a1d5
 Built:        Fri Nov 20 17:56:04 UTC 2015
 OS/Arch:      linux/amd64

Server:
 Version:      1.9.1
 API version:  1.21
 Go version:   go1.4.2
 Git commit:   a34a1d5
 Built:        Fri Nov 20 13:12:04 UTC 2015
 OS/Arch:      linux/amd64
Sending build context to Docker daemon 18.43 kB
Step 1 : FROM gcr.io/google_appengine/nodejs
 ---> 75e9e51b56c9

…(省略)…
Updating module [default]...done.
Deployed module [default] to [https://optimum-sound-128005.appspot.com]

$ curl https://optimum-sound-128005.appspot.com
Welcome GoogleAppEngine node v4.2.3
```

デプロイ完了後、[https://optimum-sound-128005.appspot.com](https://optimum-sound-128005.appspot.com)にアクセスするとメッセージが表示されます。

`package.json`で`”engines”: { “node”: “>=0.12.7” }`と指定されてるのでこの時点でのGAE node.jsのカレントバージョンは現時点でv4.2.3だと思われます。

## node.jsのバージョンを指定してデプロイする

もっと新しいバージョンのnode.jsは使えるのかな？と思ってenginesのバージョンを新しいのに変えてデプロイしてみました。

```
$ vi package.json
====
  "engines": {
    "node": "5.10.1"
  }
====
$ gcloud preview app deploy
You are about to deploy the following modules:
 - optimum-sound-128005/default (from [/Users/hoge/src/google-cloud-platform/gae/default/1-hello-world/app.yaml])
     Deployed URL: [https://optimum-sound-128005.appspot.com]

Do you want to continue (Y/n)?  Y

Beginning deployment...

…(省略)…


Step 1 : FROM gcr.io/google_appengine/nodejs
 ---> 75e9e51b56c9
Step 2 : RUN /usr/local/bin/install_node 5.10.1
 ---> Running in 42eb64c60daf
Installed Node.js v5.10.1
 ---> 8c929043dede
Removing intermediate container 42eb64c60daf
Step 3 : COPY . /app/
 ---> 3bcabbc1ece1

…(省略)…

Updating module [default]...done.
Deployed module [default] to [https://optimum-sound-128005.appspot.com]
$ curl https://optimum-sound-128005.appspot.com
Welcome GoogleAppEngine node v5.10.1
```

普通に指定できますね。

## ソースコードをcommitしてGoogle Cloud Platformのレポジトリにpushする

Google Cloud Platformには簡単なソースコード管理も付属しています。そこにソースコードを上げてみます。

```
$ git add .
$ git commit -am”modified”
$ gcloud auth login
$ Your browser has been opened to visit:

# ここでWebブラウザに遷移して Google のOAuth認証をする

Saved Application Default Credentials.

You are now logged in as [yourname@gmail.com].
Your current project is [optimum-sound-128005].  You can change this setting by running:
  $ gcloud config set project PROJECT_ID

$  git push origin master
Counting objects: 9, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (9/9), done.
Writing objects: 100% (9/9), 895 bytes | 0 bytes/s, done.
Total 9 (delta 6), reused 0 (delta 0)
remote: Storing objects: 100% (9/9), done.
remote: Processing commits: 100% (2/2), done.
To https://source.developers.google.com/p/optimum-sound-128005/r/default
   bf56e5d..844e0e0  master -> master
```

`.git/config`をみると

```
[credential]
	helper = \"gcloud.sh\”
```

というのが追加されています。こいつがpush時のユーザー認証手続きとかを代行してるっぽい。

pushが完了したら[Google Cloud Platformダッシュボード](https://console.cloud.google.com/home/dashboard)左上ハンバーガーメニューから[開発] -> [ソースコード] にレポジトリがあるので、反映されてるか確認します。

`$ gcloud source repos clone default` の`default`というのは最初に`gcloud init`した際自動的に付与される configuration名のことのようです。今回のinitではGAE ID`optimum-sound-128005`を指定したので`default`でcloneされるソースコードはoptimum-sound-128005プロジェクトのソースコードということになるようです。

# 感想

herokuを長く使っているのでgcloudコマンドには少し違和感がありますが、まあherokuコマンドと同じようなもんなので問題なく使えそうです。  
node.js的にはどっち使っても遜色なくやれそうです。GAEとherokuではレギュレーションが異なるのでケース・バイ・ケースで使っていきたいです。
