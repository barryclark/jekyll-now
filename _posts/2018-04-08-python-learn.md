## python

#### windows 安装python第三方包psycopg2
```js
pip list
```

```js
pip install psycopg2
```

#### 一开始跑不起来报下列错误：
 python main.py
Traceback (most recent call last):
  File "main.py", line 14, in <module>
    from common import web_helper, log_helper
  File "D:\pythonProjects\allempty\common\__init__.py", line 12, in <module>
    __import__(name)
  File "D:\pythonProjects\allempty\common\verify_helper.py", line 4, in <module>
    from PIL import Image, ImageDraw, ImageFont, ImageFilter
ImportError: No module named 'PIL'

然后执行安装Pillow居然成功了：
$ pip install --use-wheel Pillow
