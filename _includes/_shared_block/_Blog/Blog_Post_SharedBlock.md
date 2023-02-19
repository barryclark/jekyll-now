`SharedBlock`은 내용을 정리할 수 있는 단위로 나눠, 여러 포스트의 내용을 재사용 하기위해 사용합니다. 이를 통해 잘못된 지식이나, 오류가 발견되었을 때 하위 포스트의 수정이 동시에 이루어지게 합니다.

`include`폴더에 저장된 다른 파일의 콘텐츠를 포함할 수 있는 것을 이용히여 `Post`에서 공유블럭을 포함합니다.

{% assign Temp = "{%" %}
```liquid
<!-- Post의 내용 -->

{{Temp}} include directory/file.md %}
```
`Verbosity`변수를 이용하여, `Verbosity`을 전부 포함하거냐 요약본만을 포함합니다.

```liquid
<!-- Post의 내용 -->

{{Temp}} assign Verbosity = 3 %}
{{Temp}} include directory/file.md %}
{{Temp}} assign Verbosity = null %}
```

`SharedBlock`을 작성할 때 Verbocity에 포함되는 정도를 조절하고자 하는 부분은 다음과 같이 작성합니다. 

```liquid
<!-- SharedBlock의 내용 -->

{{Temp}} if Verbosity == null or 3 <= Verbosity %}
contents...
{{Temp}} endif %}
```