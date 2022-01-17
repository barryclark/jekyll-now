---
layout : page
title : theia on windows 환경설정
categories: [development, Crumbles from workplace]
---

##### Prerequsites

- scoop
    - install
        https://github.com/ScoopInstaller/Scoop#installation
- node
    - install with powershell
        ```scoop install nvm```
    - version
        node 12.14.1
        ```
        nvm install 12.14.1
        nvm use 12.14.1
        ```
    
- yarn
    - install with powershell
        ```scoop install yarn```
- windows-build-tools
    - install with powershell Admin
        ```npm --add-python-to-path install --global --production windows-build-tools```

>출처: https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#building-on-windows


##### additionals
- git
    - install with powershell
        ```scoop install git```
- vscode
    - 장점:
    theia에 사용될 plugin과 vscode-extension을 테스트해보기 좋다


