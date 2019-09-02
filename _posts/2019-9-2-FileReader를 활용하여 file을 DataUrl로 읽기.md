---
layout: post
title: FileReader를 활용하여 file을 DataUrl로 읽기
date: 2019-09-02
comments: true
categories: [Study, react]
tags: [fileReader, Promise]
excerpt: 지난 7월에 만들었던 프로젝트를 리팩토링 중인데, 지금 보니 좀 더 깔끔하게 react의 특성을 살려 구현할 수 있었던 코드들이 있다. 그 중 하나가 이전에 포스팅했던 이미지 업로드 전 미리보기 이다.
---

지난 7월에 만들었던 프로젝트를 리팩토링 중인데, 지금 보니 좀 더 깔끔하게 react의 특성을 살려 구현할 수 있었던 코드들이 있다. 그 중 하나가 이전에 포스팅했던 [이미지 업로드 전 미리보기](/study/react/이미지-업로드-전-미리보기/)이다. 이전 코드에서는 dom을 건드려서 미리보기를 구현했는데, dom을 건드리지 않고도 충분히 구현할 수 있다.

아래와 같이 input file을 통해 파일이 선택되면, `setFile` 함수를 실행하는데, 이 함수는 선택된 파일들을 state에 저장할 뿐만 아니라, `fileReader`로 선택된 파일들을 DataUrl로 읽어 `filesInUrl` state에 저장한다. 서버에 업로드 할때는 `files` state에 저장된 내용을 전송하고, 미리보기는 `filesInUrl` state로 렌더한다.

```react
  fileReader = file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
    });
  };

  makeFilesToUrls = files => {
    const promises = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].image_url) {
        promises.push(files[i]);
      } else {
        promises.push(this.fileReader(files[i]));
      }
    }
    return Promise.all(promises).then(values => {
      return values;
    });
  };

  setFile = async uploadedFiles => {
    const newFileUrls = await this.makeFilesToUrls(uploadedFiles);
    this.setState(prevState => {
      const { files, filesInUrl } = prevState;
      const newFiles = files.concat(Object.values(uploadedFiles));
      const newState = {
        ...prevState,
        files: newFiles,
        filesInUrl: filesInUrl.concat(newFileUrls)
      };
      return { ...newState };
    });
  };
```
