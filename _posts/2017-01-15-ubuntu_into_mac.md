---
layout: post
title: iMacのNVIDIA GPUをデュアルブートしたUbuntu16.04のnvidia-dockerで使う
categories: ['env development']
---

マシンは iMac(27-inch, Late 2013) でプロセッサは以下。<br>

- CPU : 3.4 GHz quad-core intel Core i5
- GPU : NVIDIA GeForce GTX 775M with 2GB of GDDR5 memory

まずは [Ubuntu Desktop](https://www.ubuntu.com/download/desktop) でUbuntu 16.04 LTSをダウンロード。
基本的にはfreeですが、ちゃんと使うなら寄付はしましょう。<br>
デュアルブートの環境は [こちらのサイト](http://ottan.xyz/el-capitan-ubuntu-dual-boot-4020/) を参考にさせていただき構築。<br>
※有線キーボードはあった方がよい（OSXに戻せなくなった人の談）

### 以降はすべてUbuntu16.04環境
上記紹介サイトの最後のパッケージインストールから実行。

```
$ sudo dpgk -i *.deb
$ reboot
```

パッケージを更新。

```
$ sudo apt-get update && sudo apt-get upgrade
$ sudo apt install mesa-utils
$ glxinfo | egrep "OpenGL vendor|OpenGL renderer*"
OpenGL vendor string: NVIDIA Corporation
OpenGL renderer string: GeForce GTX 775M/PCIe/SSE2
```

Nvidiaのdriverを入れていきたいが、デフォルトで入っているNouveauのものと競合してしまうのでblacklistファイルをいじる。自分の場合はこんな感じ。
変更したらカーネルモジュールの更新をして再起動もしておく。

```
$ cat /etc/modprobe.d/blacklist-nouveau.conf 
blacklist nouveau
options nouveau modeset=0
$ sudo update-initramfs -u
$ reboot
```

cudaをインストールする。ubuntu 16.04には8.0とのこと。

```
$ wget http://cuda-repo-ubuntu1604_8.0.44-1_amd64.deb
$ wget http://developer.download.nvidia.com/compute/cuda/repos/ubuntu1604/x86_64/7fa2af80.pub
$ cat 7fa2af80.pub | sudo apt-key add -
$ wget http://developer.download.nvidia.com/compute/cuda/repos/ubuntu1604/x86_64/cuda-repo-ubuntu1604_8.0.44-1_amd64.deb
$ sudo dpkg -i cuda-repo-ubuntu1604_8.0.44-1_amd64.deb
$ sudo apt update
```

ここでiMacに搭載されているGPUの型番に適したdriverをインストールするために [公式サイト](http://www.nvidia.com/Download/index.aspx) にて調べようとするが、GeForce GTX 775Mが見つからない。
とりあえずapt-getで入れられる最新版にしておこうという雑な進め方をして結果うまくいった。

```
$ apt-cache search 'nvidia-[0-9]+$'
nvidia-331 - Transitional package for nvidia-331
nvidia-346 - Transitional package for nvidia-346
nvidia-304 - NVIDIA legacy binary driver - version 304.132
nvidia-340 - NVIDIA binary driver - version 340.98
nvidia-361 - Transitional package for nvidia-367
nvidia-367 - NVIDIA binary driver - version 367.57
nvidia-352 - Transitional package for nvidia-367
$ sudo apt install linux-generic
$ sudo apt install cuda nvidia-367
$ reboot
```

不要なものを削除しcudaへのpathを追加する。

```
$ sudo apt remove linux-virtual
$ sudo apt autoremove
$ rm 7fa2af80.pub cuda-repo-ubuntu1604_8.0.44-1_amd64.deb
$ echo 'export PATH="/usr/local/cuda-8.0/bin:$PATH"' >> ~/.bashrc
$ echo 'export LD_LIBRARY_PATH="/usr/local/cuda-8.0/lib64:$LD_LIBRARY_PATH"' >> ~/.bashrc
```

適切にpathが通っていてGPUを認識しているか確認。

```
$ nvidia-smi
Sun Jan 15 13:36:35 2017       
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 367.57                 Driver Version: 367.57                    |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  GeForce GTX 775M    Off  | 0000:01:00.0     N/A |                  N/A |
| N/A   47C    P8    N/A /  N/A |    464MiB /  1975MiB |     N/A      Default |
+-------------------------------+----------------------+----------------------+
                                                                               
+-----------------------------------------------------------------------------+
| Processes:                                                       GPU Memory |
|  GPU       PID  Type  Process name                               Usage      |
|=============================================================================|
|    0                  Not Supported                                         |
+-----------------------------------------------------------------------------+
```

素晴らしい。<br>
ここまでくれば後はdokcerとnvidia-dockerのウェブサイトに従えばよい。dockerを導入してhello worldするまでは以下。

```
$ sudo apt-get update
$ sudo apt-get install linux-image-extra-$(uname -r) linux-image-extra-virtual
$ sudo apt-get install docker-engine
$ sudo service docker start
$ sudo docker run --rm hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

nvidia-dockerを導入してコンテナからGPUへのアクセスを確認するまでが以下。

```
$ wget -P /tmp https://github.com/NVIDIA/nvidia-docker/releases/download/v1.0.0-rc.3/nvidia-docker_1.0.0.rc.3-1_amd64.deb
$ sudo dpkg -i /tmp/nvidia-docker*.deb && rm /tmp/nvidia-docker*.deb
$ sudo nvidia-docker run --rm nvidia/cuda nvidia-smi
Sun Jan 15 04:50:47 2017       
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 367.57                 Driver Version: 367.57                    |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  GeForce GTX 775M    Off  | 0000:01:00.0     N/A |                  N/A |
| N/A   47C    P8    N/A /  N/A |    464MiB /  1975MiB |     N/A      Default |
+-------------------------------+----------------------+----------------------+
                                                                               
+-----------------------------------------------------------------------------+
| Processes:                                                       GPU Memory |
|  GPU       PID  Type  Process name                               Usage      |
|=============================================================================|
|    0                  Not Supported                                         |
+-----------------------------------------------------------------------------+
```

これにて終了。あとは自分の好きなgpu-enabledなコンテナを作って遊びましょう。<br>
お疲れ様でした。

---
---
<br>
