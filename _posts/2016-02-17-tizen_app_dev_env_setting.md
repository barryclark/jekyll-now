---
layout: post
title: [Ubuntu] Tizen 애플리케이션 개발환경 셋팅
---
## Tizen Application development environment setting
**Tizen Application** 개발환경 셋팅 (작성 중)  
1. java-sdk 설치   
    // 기존 java jdk 제거  
    // [oracle-jdk] 다운로드. (현재 apt-get 으로 install하려면 repository를 추가해주어야함)  
    $ sudo apt-get --purge remove openjdk*   // tizen sdk는 Oracle jdk에 최적화 되어 있음  
    $ sudo mkdir /usr/lib/jvm  
    $ sudo tar zxvf jdk-7u79-linux-x64.gz -C /usr/lib/jvm  
    $ sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk1.7.0_79/bin/java 1  
    $ sudo update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/jdk1.7.0_79/bin/javac 1  
    $ sudo update-alternatives --install /usr/bin/javaws javaws /usr/lib/jvm/jdk1.7.0_79/bin/javaws 1  
    $ java -version

2. tizen-sdk 설치  
    // [tizen-sdk] 다운로드  
    $ sudo chmod 755 ./tizen-web-ide_TizenSDK_2.4.0_Rev3_ubuntu-64.bin  
    $ ./tizen-web-ide_TizenSDK_2.4.0_Rev3_ubuntu-64.bin  

3. update-manager 진행

4. proxy 서버 사용 시 sdk 내 설정 (선택)  
   // preference -> General -> Network conncetion
   
   

[oracle-jdk]: http://www.oracle.com/technetwork/java/javase/downloads/index.html
[tizen-sdk]: https://developer.tizen.org/development/tools/download
