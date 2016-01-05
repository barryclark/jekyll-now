---
layout: post
title: Vim 편해지기
---

vim이 익숙 해지기 위한 단계  
## 화면 분할  
- 좌우 분할 : :vs (vertical split)  
- 상하 분할 : :sp (split)  
- 화면이동 : Ctrl – w 후 방향 이동  
- 화면종료 : Ctrl - q  
- header file 열기 : Ctrl – w,f  
	- 같은 폴더에 있지 않다면 : :set path = ../include  

## v (visual) 사용  
	- v 후 블록 지정(방향키) -> 복사, 삭제  

## 정렬  
	- gg=G ; 처음으로 이동 -> 정렬 -> 끝까지  

## buffer 사용  
```sh 
	$ vim *.cpp # 모든 cpp 열고  
	$ :ls # 버퍼에 있는 파일들 확인  
	$ :b1 # 원하는 버퍼 파일로 이동  
	$ !bash # vim을 종료하지 않고 shell 사용  
	$ exit # vim으로 복귀  
```
## 마킹  
마킹해두고 다른 곳 편집하다 마크로 이동  
- ma ; a로 마크  
- ‘a ; 마크a로 이동  

## 쉘명령 사용하기  
:! [명령]  
:!bash  
:r input ; 읽어서 파일 넣기  

## 빠른 탐색  
- 같은 단어 전, 후로 이동 : #, *  

## 폴딩  
- 접기 : 블록지정 후 zf  
- 펼치기 : Zo  

## 자동완성  
- Ctrl + p  

## 치환  
정규표현식을 학습  
- %s/old/new/g  
- option, g:global, c; 질문  
