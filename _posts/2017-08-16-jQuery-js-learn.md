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

## 在隐藏的tab里添加多个chart图表时报错
在隐藏的tab里添加多个chart图表时报错Uncaught Error: Invalid dimensions for plot, width = 0, height = 200
详细如下：
jquery.flot.js:135 Uncaught Error: Invalid dimensions for plot, width = 0, height = 200
    at Canvas.resize (jquery.flot.js:135)
    at new Canvas (jquery.flot.js:114)
    at setupCanvases (jquery.flot.js:1313)
    at new Plot (jquery.flot.js:707)
    at Function.$.plot (jquery.flot.js:3146)
    at HTMLDivElement.<anonymous> (jquery.flot.js:3159)
    at Function.each (jquery.js:374)
    at jQuery.fn.init.each (jquery.js:139)
    at jQuery.fn.init.$.fn.plot (jquery.flot.js:3158)
    at Object.<anonymous> (ui-jp.js:17)
上一个项目都没问题，百思不得其解。google后找到一个解决方法：
I have this error when I insert charts in hidden tabs like second, third, etc. here is the error:
Answers:
Well I already made it!
If you have this library <script src="js/jquery.flot.resize.min.js"></script>, you only need to change this inside of styles.css(the stylesheets file):
max-width: none;
height: 400px;

with this:

width: 100%;
height: 400px;

Now the charts always resize in every screen.

虽然答案就在眼前，但一开始理解不了。后台仔细想了下，在每个chart都加上width:100%，居然可以了。
<div class="tab-content piefull">
<div class="tab-pane p-y-sm active" id="line_1" aria-expanded="true">
  <div class="row m-0">
    <div class="col-sm-12 col-md-12">
      <div ui-jp="plot" ui-refresh="app.setting.color" ui-options="
      [
        { 
          data: [[1, 5.5], [2, 5.7], [3, 6.4], [4, 7.0], [5, 7.2], [6, 7.3], [7, 7.5]], 
          points: { show: true, radius: 5}, 
          splines: { show: true, tension: 0.45, lineWidth: 5} 
        }
      ], 
      {
        colors: ['#fcc100'],
        series: { shadowSize: 3 },
        xaxis: { show: true, font: { color: '#ccc' }, position: 'bottom' },
        yaxis:{ show: true, font: { color: '#ccc' }, min:3},
        grid: { hoverable: true, clickable: true, borderWidth: 0, color: 'rgba(120,120,120,0.5)' },
        tooltip: true,
        tooltipOpts: { content: '%x.0 is %y.4',  defaultTheme: false, shifts: { x: 0, y: -40 } }
      }
    " style="width: 100%;height:200px">
      </div>
    </div>
  </div>
</div>
<div class="tab-pane p-y-sm" id="line_2" aria-expanded="false">
  <div class="row m-0">
    <div class="col-sm-12 col-md-12">
      <div ui-jp="plot" ui-refresh="app.setting.color" ui-options="
        [
          { 
            data: [[1, 6.1], [2, 6.3], [3, 6.4], [4, 6.6], [5, 7.0], [6, 7.7], [7, 8.3]], 
            points: { show: true, radius: 0}, 
            splines: { show: true, tension: 0.45, lineWidth: 2, fill: 0 } 
          },
          { 
            data: [[1, 5.5], [2, 5.7], [3, 6.4], [4, 7.0], [5, 7.2], [6, 7.3], [7, 7.5]], 
            points: { show: true, radius: 0}, 
            splines: { show: true, tension: 0.45, lineWidth: 2, fill: 0 } 
          }
        ], 
        {
          colors: ['#0cc2aa','#fcc100'],
          series: { shadowSize: 3 },
          xaxis: { show: true, font: { color: '#ccc' }, position: 'bottom' },
          yaxis:{ show: true, font: { color: '#ccc' }},
          grid: { hoverable: true, clickable: true, borderWidth: 0, color: 'rgba(120,120,120,0.5)' },
          tooltip: true,
          tooltipOpts: { content: '%x.0 is %y.4',  defaultTheme: false, shifts: { x: 0, y: -40 } }
        }
      " style="width: 100%;height:200px">
      </div>
    </div>
  </div>
</div>
<!-- line_2 end-->
</div>

### 收藏切换和点赞切换
```js
$(document).ready(function () {
    var $light_num = {$data['light']|default=0};
    $(".likey").click(function () {
        $(".likey i").toggleClass("cur_yes");
    })
    $(".dianzan").toggle(function(){
          $(".dianzan i").text($light_num+1).addClass("cur_yes");},function(){
          $(".dianzan i").text($light_num).removeClass("cur_yes");
    });
})
```