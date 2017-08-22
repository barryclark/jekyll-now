## jQuery中的data方法设置与获取

### data([key],[value]) 在元素上存放或读取数据,返回jQuery对象

使用
```js
$("#div1").attr("data-test","name");
```
方法设置值查看html可以看到成功，但是不能使用jquery获取了。
使用
```js
$("#div1").data("test","name");
```
方法设置则没问题。