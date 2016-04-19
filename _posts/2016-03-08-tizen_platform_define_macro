---
layout: post
title: [Tizen][Platform] global macro 정의하기
---
## Tizen platform development  
## Define global macro  

Tizen package는 rpm으로 build 되어 target 또는 emulator에 설치 할 수 있다.
이에 rpm spec file 부터 cmake, cpp(source code) 내에 동일한 macro를 사용하기
위한 방법을 작성한다.  

---
**.SPEC file**  
.spec file 에서 [macro]를 정의하는 방법은 아래와 같다.  

    %global bin_dir /usr/bin  
    %define data_dir $_datadir   

위와 같은 방식으로 macro를 정의 할 수 있는데, 둘의 차이는 expanded 되는 시점이다.  
 - global : definition time  
 - define : lazily expanded (when used)  


방금 정의한 두 bin_dir, data_dir의 range는 SPEC file 내에서 유효하다.  
따라서 이를 CMakeList에 사용하려면 아래와 같이 %build 시점에 option을 주어야한다.  

    %build  
    %cmake . -DBIN_DIR = %bin_dir \  
             -DDATA_DIR = %data_dir \  
---
**CMakeList**  
이제 해당 CMakeList와 이를 물고있는 CMakeList에서 위 정의한 두 macro를 사용할 수 있다.  

    SET(PKG_DB_PATH ${DATA_DIR}/dbspace)

CMakeList에서 .manifest나 .service같은 [configure_file]에 macro를 사용하는 방법은 아래와 같다.  

    CONFIGURE_FILE(pkg.manifest.in pkg.manifest @ONLY)

@ONLY option은 manefist 내에서 macro 사용시 ${PKG_DB_PATH}은 금지하고 @PKG_DB_PATH@만 허용하는 옵션이다.

---
**.C, .CPP**  
c, cpp file과 같은 source file에서는 아직 macro를 사용 할 수 없는데  
다음과 같이 정의해주면 source file 내에서 사용 가능하다.  

    ADD_DEFINITIONS("-DPKG_DB_FILE=\"{PKG_DB_PATH}/pkg.db\"")  

이제 source code 내에서 PKG_DB_FILE 를 사용할 수 있다.  

[macro]: http://www.rpm.org/wiki/PackagerDocs/Macros
[configure_file]: https://cmake.org/cmake/help/v3.0/command/configure_file.html
