---
title: "YII(版本1) 权威指南学习笔记(未完结)"
layout: post
category: notes
tags: [php, framework]
excerpt: "Yii 是一个基于组件的高性能 PHP 框架, 用于快速开发大型 Web 应用. 它使 Web 开发中的 可复用度最大化, 可以显著提高你的 Web 应用开发速度. Yii 这个名字(读作易(Yee) 或 [ji:])代表 简单(easy), 高效(efficient) 和 可扩展(extensible)."
---

#基础

##入口脚本

WEB 应用一般为 `index.php`, 控制台应用一般为 `yii.php` 并在文件开头加上 `#! /usr/bin/env php`

入口脚本是定义全局常量的好地方

支持三个常量: `YII_DEBUG`, `YII_ENV`, `YII_ENABLE_ERROR_HANDLER`

WEB:

```php
<?php
// 定义全局常量
defined('YII_DEBUG') or define('YII_DEBUG', true);
defined('YII_ENV') or define('YII_ENV', 'dev');

// 注册 Composer 自动加载器
require(__DIR__ . '/../vendor/autoload.php');

// 包含 Yii 类文件
require(__DIR__ . '/../vendor/yiisoft/yii2/Yii.php');

// 加载应用配置
$config = require(__DIR__ . '/../config/web.php');

// 创建、配置、运行一个应用
(new yii\web\Application($config))->run();
```

控制台:

```php
#!/usr/bin/env php
<?php
defined('YII_DEBUG') or define('YII_DEBUG', true);

// fcgi 默认没有定义 STDIN 和 STDOUT
defined('STDIN') or define('STDIN', fopen('php://stdin', 'r'));
defined('STDOUT') or define('STDOUT', fopen('php://stdout', 'w'));

// 注册 Composer 自动加载器
require(__DIR__ . '/vendor/autoload.php');

// 包含 Yii 类文件
require(__DIR__ . '/vendor/yiisoft/yii2/Yii.php');

// 加载应用配置
$config = require(__DIR__ . '/config/console.php');

$application = new yii\console\Application($config);
$exitCode = $application->run();
exit($exitCode);
?>
```

##应用主体

创建: `Yii::createWebApplication($configFile)`

访问: 可以在任何地方使用 `Yii::app()|YiiBase::app` 访问

##控制器

控制器路由格式: `moduleID/controllerID/actionID`

控制器创建决策步骤:

1. 如果指定了 `CWebApplication::catchAllRequest`, 用户指定的 ID 将被忽略. (通常用于设置应用为维护状态, 显示一个静态页面)
2. 如果在 `CWebApplication::controllerMap` 中找到 ID, 相应的控制器配置则被用于创建控制器
3. 如果 ID 为 `path/to/xyz` 形式, 则按控制器路由格式解析并创建

创建:

- 默认控制器在 `CWebApplication::defaultController` 中定义, 默认动作为 `index`, 对应的方法名为 `actionIndex`, 可通过 `CController::defaultAction` 修改

    ```php
    <?php
    class SiteController extends CController {
    }
    ?>
    ```

- 也可以由一个动作类来定义动作, 以便重用动作:

    ```php
    <?php
    class UpdateAction extends CAction {
        public function run() {
            // place the action logic here
        }
    }
    ?>
    ```

- 然后需覆盖控制器类的 `actions` 方法:

    ```php
    <?php
    class PostController extends CController {
        public function actions() {
            return array(
                'edit'=>'application.controllers.post.UpdateAction',
            );
        }
    }
    ?>
    ```

动作参数绑定:

```php
<?php
// in PostController:
public function actionCreate(array $category, $language = 'en') {
    // 动作参数绑定功能将会把传入 action 的参数和 $_GET 中的数据绑定
    // 在此, 如果 $_GET 中没有 language 这一项, $language 默认为 'en'
    // 因为没有为 $category 提供默认值, 如果 $_GET 中没有 category 这一项则会报错
    // array 类型声明会确保 $category 为一个数组(自动将基本类型转换为数组)
}
?>
```

过滤器可被配置在动作执行之前或之后执行, 如访问控制过滤器, 性能过滤器(参见[访问控制过滤器][accessControlFilter])

- 定义:

    - 可被定义为一个 `filter` 前缀的控制器方法:

    ```php
    <?php
    public function filterAccessControl($filterChain) {
        // 调用 $filterChain->run() 以继续后续过滤器与动作的执行。
    }
    ?>
    ```

    - 也可是一个 `CFilter` 或其子类的实例:

    ```php
    <?php
    class PerformanceFilter extends CFilter {
        protected function preFilter($filterChain) {
            // 动作被执行之前应用的逻辑
            return true; // 如果动作不应被执行，此处返回 false
        }

        protected function postFilter($filterChain) {
            // 动作执行之后应用的逻辑
        }
    }
    ?>
    ```

- 配置使用: 需要覆盖控制器的 `filter()` 方法:

    ```php
    <?php
    class PostController extends CController {
        ......
        public function filters() {
            return array(
                'postOnly + edit, create', // 使用 filter 前缀方法定义的过滤器
                array(                     // 使用类定义的过滤器
                    'application.filters.PerformanceFilter - edit, create',
                    'unit'=>'second',
                ),
            );
        }
    }
    ?>
    ```

##模型

Yii 实现了两种类型的模型: 表单模型和 Active Record, 二者都继承于 CModel

如果用户输入被收集然后丢弃, 应该创建一个表单模型; 如果用户输入被收集后要保存到数据库, 应使用一个 Active Record

详见[表单模型][FormModel]和[Active Record][ActiveRecord]

##视图

`CController::render('edit')` 将会在 `protected/views/ControllerID` 目录下寻找 `edit.php` 视图文件

可以通过在视图中使用 `$this->propertyName` 访问控制器的任何属性, 也可以在控制器中将数据传递到视图中:

```php
<?php
$this->render('edit', array(
    'var1'=>$value1,
    'var2'=>$value2,
));
?>
```

`protected/views/layouts/main.php` 是默认的`布局`文件, 可通过 `CWebApplication::layout` 自定义. 要渲染一个不带布局的视图, 需调用 `CController::renderPartial`

`小物件`是 `CWidget` 或其子类的实例, 它也可以有自己的视图文件

- 定义

    ```php
    <?php
    class MyWidget extends CWidget {
        public function init() {
            // 此方法会被 CController::beginWidget() 调用
        }

        public function run() {
            // 此方法会被 CController::endWidget() 调用
        }
    }
    ?>
    ```

- 按如下视图脚本来使用一个小物件:

    ```php
    <?php $this->beginWidget('path.to.WidgetClass', $config); ?>
    ...可能会由小物件获取的内容主体...
    <?php $this->endWidget(); ?>
    // 或
    <?php $this->widget('path.to.WidgetClass', $config); ?>
    ```

系统视图用于展示 Yii 的错误和日志消息, 如如果 CHttpException 抛出一个 404 错误, 那么 `error404` 就会被展示. Yii 在 `framework/views` 下提供了默认的系统视图, 也可以通过在 `protected/views/system` 下创建同名视图文件进行自定义

##组件

加载: 通过配置应用的 `components|CApplication::components` 属性

- 可以配置 `enabled` 为 `false` 禁用组件
- 组件是按需创建的, 但是可以将组件 ID 列入应用的 `preload|CWebApplication::preload` 属性中强制其加载

访问: `Yii::app()->ComponentID`

预定义的核心应用组件:

- assetManager
- authManager
- cache
- clientScript
- coreMessage
- db
- errorHandler
- format
- messages
- request
- securityManager
- session
- statePersister
- urlManager
- user
- themeManager

组件属性

- 可以通过直接定义一个公共成员变量定义
- 也可以使用 getter 和 setter 更灵活的定义
- 通过 getter 和 setter 定义的属性和类成员变量有个区别: 他们是不区分大小写的

组件事件

1. 定义组件事件(`on` 开头)

    ```php
    <?php
    public function onClicked($event) {
        $this->raiseEvent('onClicked', $event);
    }
    ?>
    ```

2. 定义事件回调

    ```php
    <?php
    function callbackName($event) {
        ......
    }
    ?>
    ```

3. 绑定事件回调

    ```php
    <?php
    $component->onClicked=$callback;
    // 或使用匿名函数
    $component->onclicked=function($event) {
    }
    ?>
    ```

组件行为

- 行为类必须实现 `IBehavior`

- 大多数行为可继承自 `CBehavior`, 如果行为需要绑定到模型, 则也可以继承自 `CModelBehavior` 或 `CActiveRecordBehavior`

- 两个同名行为绑定到同一个组件下是有可能的, 在这种情况下, 先绑定的行为则拥有优先权

- 当和 events, 一起使用时, 行为会更加强大. 当行为被绑定到组件时,行为里的一些方法就可以绑定到组件的一些事件上了. 这样一来,行为就有机观察或者改变组件的常规执行流程

- 一个行为的属性也可以通过绑定到的组件来访问. 这些属性包含公共成员变量以及通过 getters 和/或 setters 方式设置的属性. 例如, 若一个行为有一个 `xyz` 的属性，此行为被绑定到组件 `$a`, 然后我们可以使用表达式 `$a->xyz` 访问此行为的属性

- 绑定行为:
    
    ```php
    <?php
    // $name 在组件中实现了对行为的唯一识别
    $component->attachBehavior($name,$behavior);
    // test() 是行为中的方法。
    $component->test();
    ?>
    ```

- 访问行为:

    ```php
    <?php
    $behavior=$component->tree;
    // 等于下行代码：
    // $behavior=$component->asa('tree');
    ?>
    ```

- 禁用行为:

    ```php
    <?php
    $component->disableBehavior($name);
    // 下面的代码将抛出一个异常
    $component->test();
    $component->enableBehavior($name);
    // 现在就可以使用了
    $component->test();
    ?>
    ```

##模块

模块是一个独立的软件单元，它包含 模型, 视图, 控制器 和其他支持的组件. 如 `forum` 模块的典型目录结构

    forum/
       ForumModule.php            模块类文件
       components/                包含可复用的用户组件
          views/                  包含小物件的视图文件
       controllers/               包含控制器类文件
          DefaultController.php   默认的控制器类文件
       extensions/                包含第三方扩展
       models/                    包含模块类文件
       views/                     包含控制器视图和布局文件
          layouts/                包含布局文件
          default/                包含 DefaultController 的视图文件
             index.php            首页视图文件

模块可以嵌套

使用模块:

1. 继承 CWebModule, 并命名为 ucfirst($id).'Module'

2. 将模块目录放入 `modules` 目录中, 然后在应用的 `modules` 配置 属性中声明模块 ID. 模块也可以在配置是带有初始属性值

3. 使用 CController::module 访问

##路径别名和名字空间

`YiiBase::getPathOfAlias()` 获取别名的真实路径, `YiiBase::setPathOfAlias()` 设置新的别名的真实路径

预定义的根别名

- system
- zii
- application
- webroot
- ext
- 模块 ID

使用别名导入类: `Yii::import('system.web.CController')`. (所有核心类已被预先导入)

预导入: 在 `CWebApplication::run()` 之前执行:

```php
<?php
Yii::$classMap=array(
    'ClassName1' => 'path/to/ClassName1.php',
    'ClassName2' => 'path/to/ClassName2.php',
    ......
);
?>
```

导入目录: `Yii::import('system.web.*');`

#<a name="FormModel">使用表单</a>

##创建模型

```php
<?php
class LoginForm extends CFormModel {
    // 定义特性(我们把用于存储用户输入或数据库数据的属性成为特性(attribute))
    public $username;
    public $password;
    public $rememberMe=false;

    private $_identity;

    // 验证规则
    public function rules() {
        /**
         * 每个验证规则的格式为: 
         * array('AttributeList', 'Validator', 'on'=>'ScenarioList', ...附加选项)
         * 有三种方法指定 Validator
         * 1. 指定为模型类中的一个方法, 该方法定义格式为
         * public function ValidatiorName($attributes, $params) {...}
         * 2. 一个继承自 CValidator 的验证器类, 此时附加选项用于初始化实例的属性值
         * 3. 一个预定义的验证器类的别名, 以下是完整列表
         * boolean, captcha, compare, email, default, exists, file
         * filter, in, length, match, numerical, required, type, unique, url
         */
        return array(
            array('username, password', 'required'), // 必填
            array('rememberMe', 'boolean'),          // 布尔
            array('password', 'authenticate'),       // 需验证
        );
    }

    /**
     * authenticate Validator
     */
    public function authenticate($attribute,$params)
    {
        $this->_identity=new UserIdentity($this->username,$this->password);
        if(!$this->_identity->authenticate())
            $this->addError('password','错误的用户名或密码。');
    }
}
?>
```

<a name="massiveAssign">块赋值(massive assignment)</a>

```php
<?php
$model = new LoginForm();
if (isset($_POST['LoginForm'])) {
    /**
     * 只有被认为 '安全' 的特性才会被赋值
     * 特性如果出现在相应场景的一个验证规则中, 即被认为是安全的
     * 也可以用特殊的 `safe` Validator 来让特性变为安全的
     * 
     * 为了使块赋值正确工作, 对应于模型类 `C` 中的特性 `a` 的表单域, 请命名其为  `C[a]`
     */
    $model->attributes = $_POST['LoginForm'];
}
?>
```

<a name="triggerValidation">触发验证</a>

- 验证是基于 `场景(scenario)` 的
- 可以手动调用 `CModel::validate()` 触发; 对于 `CActiveRecord`, 会在 `CAcitveRecord::save()` 时自动触发验证
- 验证错误可以使用 `CModel::getError()` 或 `CModel::getErrors()` 获取

标签

- `CModel` 默认将返回特性的名字作为其标签
- 也可使用 `CModel::attributesLabels` 方法自定义标签

##创建动作

```php
<?php
public function actionLogin() {
    $model=new LoginForm;
    if(isset($_POST['LoginForm'])) {
        // 收集用户输入的数据
        $model->attributes=$_POST['LoginForm'];
        // 验证用户输入，并在判断输入正确后重定向到前一页
        if($model->validate())
            $this->redirect(Yii::app()->user->returnUrl);
    }
    // 显示登录表单
    $this->render('login',array('model'=>$model));
}
?>
```

##创建视图

```php
<div class="form">
<?php $form=$this->beginWidget('CActiveForm'); ?>

    <?php echo $form->errorSummary($model); ?>

    <div class="row">
        <?php echo $form->label($model,'username'); ?>
        <?php echo $form->textField($model,'username') ?>
    </div>

    <div class="row">
        <?php echo $form->label($model,'password'); ?>
        <?php echo $form->passwordField($model,'password') ?>
    </div>

    <div class="row rememberMe">
        <?php echo $form->checkBox($model,'rememberMe'); ?>
        <?php echo $form->label($model,'rememberMe'); ?>
    </div>

    <div class="row submit">
        <?php echo CHtml::submitButton('Login'); ?>
    </div>

<?php $this->endWidget(); ?>
</div><!-- form -->
```

##收集表格输入(批量)

action:

```php
<?php
public function actionBatchUpdate()
{
    // 假设每一项（item）是一个 'Item' 类的实例，
    // 提取要通过批量模式更新的项
    $items=$this->getItemsToUpdate();
    if(isset($_POST['Item']))
    {
        $valid=true;
        foreach($items as $i=>$item)
        {
            if(isset($_POST['Item'][$i]))
                $item->attributes=$_POST['Item'][$i];
            $valid=$valid && $item->validate();
        }
        if($valid)  // 如果所有项目有效
            // ...则在此处做一些操作
    }
    // 显示视图收集表格输入
    $this->render('batchUpdate',array('items'=>$items));
}
?>
```

view:

```php
<div class="form">
<?php echo CHtml::beginForm(); ?>
<table>
<tr><th>Name</th><th>Price</th><th>Count</th><th>Description</th></tr>
<?php foreach($items as $i=>$item): ?>
<tr>
<td><?php echo CHtml::activeTextField($item,"[$i]name"); ?></td>
<td><?php echo CHtml::activeTextField($item,"[$i]price"); ?></td>
<td><?php echo CHtml::activeTextField($item,"[$i]count"); ?></td>
<td><?php echo CHtml::activeTextArea($item,"[$i]description"); ?></td>
</tr>
<?php endforeach; ?>
</table>

<?php echo CHtml::submitButton('Save'); ?>
<?php echo CHtml::endForm(); ?>
</div>
```

##使用表单生成器 @todo

action: 

```php
<?php
public function actionLogin() {
    $model = new LoginForm;
    $form = new CForm('application.views.site.loginForm', $model);
    if($form->submitted('login') && $form->validate()) {
        $this->redirect(array('site/index'));
    } else {
        $this->render('login', array('form'=>$form));
    }
}
?>
```

protected/views/site/loginForm.php:

```php
<?php
return array(
    'title'=>'Please provide your login credential',

    'elements'=>array(
        'username'=>array(
            // 可选 type: text, hidden, password, textarea, file, radio
            // checkbox, listbox, dropdownlist, checkboxlist, radiolist
            'type'=>'text',
            'maxlength'=>32,
        ),
        'password'=>array(
            'type'=>'password',
            'maxlength'=>32,
        ),
        'rememberMe'=>array(
            'type'=>'checkbox',
        )
    ),

    'buttons'=>array(
        'login'=>array(
            'type'=>'submit',
            'label'=>'Login',
        ),
    ),
);
?>
```

view:

```php
<h1>Login</h1>

<div class="form">
<?php echo $form; ?>
</div>
```

#使用数据库

##数据访问对象(DAO)

建立数据库连接:

- 使用 `CDbConnection`:

```php
<?php
$connection=new CDbConnection($dsn,$username,$password);
// 建立连接。你可以使用  try...catch 捕获可能抛出的异常
$connection->active=true;
......
$connection->active=false;  // 关闭连接
?>
```

- 作为应用组件配置, 然后使用 `Yii::app()->db` 访问

```php
<?php
array(
    ......
    'components'=>array(
        ......
        'db'=>array(
            'class'=>'CDbConnection',
            'connectionString'=>'mysql:host=localhost;dbname=testdb',
            'username'=>'root',
            'password'=>'password',
            'emulatePrepare'=>true,  // needed by some MySQL installations
        ),
    ),
)
?>
```

##执行 SQL 语句

1. 创建 `CDbCommand` 实例

    ```php
    <?php
    $connection=Yii::app()->db;   // 假设你已经建立了一个 "db" 连接
    // 如果没有，你可能需要显式建立一个连接：
    // $connection=new CDbConnection($dsn,$username,$password);
    $command=$connection->createCommand($sql);
    // 如果需要，此 SQL 语句可通过如下方式修改：
    // $command->text=$newSQL;
    ?>
    ```

2. 使用以下方法执行语句

    ```php
    <?php
    $rowCount=$command->execute();   // 执行无查询 SQL(Insert, delete, update)
    $dataReader=$command->query();   // 执行一个 SQL 查询(select), 返回 CDbDataReader 实例
    $rows=$command->queryAll();      // 查询并返回结果中的所有行
    $row=$command->queryRow();       // 查询并返回结果中的第一行
    $column=$command->queryColumn(); // 查询并返回结果中的第一列
    $value=$command->queryScalar();  // 查询并返回结果中第一行的第一个字段
    ?>
    ```

3. 获取查询结果

    ```php
    <?php
    $dataReader=$command->query();
    // 重复调用 read() 直到它返回 false
    while(($row=$dataReader->read())!==false) { ... }
    // 或使用 foreach 遍历数据中的每一行
    foreach($dataReader as $row) { ... }
    // 一次性提取所有行到一个数组
    $rows=$dataReader->readAll();
    ?>
    ```

4. 使用事务

    ```php
    <?php
    $transaction=$connection->beginTransaction();
    try {
        $connection->createCommand($sql1)->execute();
        $connection->createCommand($sql2)->execute();
        //.... other SQL executions
        $transaction->commit();
    } catch(Exception $e) { // 如果有一条查询失败，则会抛出异常
        $transaction->rollBack();
    }
    ?>
    ```

5. 使用 Prepare Statment

    ```php
    <?php
    // 一条带有两个占位符 ":username" 和 ":email"的 SQL
    $sql="INSERT INTO tbl_user (username, email) VALUES(:username,:email)";
    $command=$connection->createCommand($sql);
    // 用实际的用户名替换占位符 ":username" 
    $command->bindParam(":username",$username,PDO::PARAM_STR);
    // 用实际的 Email 替换占位符 ":email" 
    $command->bindParam(":email",$email,PDO::PARAM_STR);
    $command->execute();
    // 使用新的参数集插入另一行
    $command->bindParam(":username",$username2,PDO::PARAM_STR);
    $command->bindParam(":email",$email2,PDO::PARAM_STR);
    $command->execute();
    ?>
    ```

6. 绑定结果列

    ```php
    <?php
    $sql="SELECT username, email FROM tbl_user";
    $dataReader=$connection->createCommand($sql)->query();
    // 使用 $username 变量绑定第一列 (username) 
    $dataReader->bindColumn(1,$username);
    // 使用 $email 变量绑定第二列 (email) 
    $dataReader->bindColumn(2,$email);
    while($dataReader->read()!==false) {
        // $username 和 $email 含有当前行中的 username 和 email 
    }
    ?>
    ```

7. 使用表前缀

    配置 `CDbConnection::tablePrefix` 属性为所希望的表前缀, 然后便可以在 SQL 语句中使用 `{{TableName}}` 代表表的名字

##查询构建器

查询构建器构建于一个 `CDbCommand` 实例上

查询构建器不能用于修改一个已经存在的 SQL 查询

可用的查询构建器示例:

```php
<?php
// 1. 数据查询

// SELECT *
select()
// SELECT `id`, `username`
select('id, username')
// SELECT `tbl_user`.`id`, `username` AS `name`
select('tbl_user.id, username as name')
// SELECT `id`, `username`
select(array('id', 'username'))
// SELECT `id`, count(*) as num
select(array('id', 'count(*) as num'))

// SELECT DISTINCT `id`, `username`
selectDistinct('id, username')

// FROM `tbl_user`
from('tbl_user')
// FROM `tbl_user` `u`, `public`.`tbl_profile` `p`
from('tbl_user u, public.tbl_profile p')
// FROM `tbl_user`, `tbl_profile`
from(array('tbl_user', 'tbl_profile'))
// FROM `tbl_user`, (select * from tbl_profile) p
from(array('tbl_user', '(select * from tbl_profile) p'))

// WHERE id=1 or id=2
where('id=1 or id=2')
// WHERE id=:id1 or id=:id2
where('id=:id1 or id=:id2', array(':id1'=>1, ':id2'=>2))
// WHERE id=1 OR id=2
where(array('or', 'id=1', 'id=2'))
// WHERE id=1 AND (type=2 OR type=3)
where(array('and', 'id=1', array('or', 'type=2', 'type=3')))
// WHERE `id` IN (1, 2)
where(array('in', 'id', array(1, 2))
// WHERE `id` NOT IN (1, 2)
where(array('not in', 'id', array(1,2)))
// when using LIKE, remember to escape user inputed `%` and `_`
// WHERE `name` LIKE '%Qiang%'
where(array('like', 'name', '%Qiang%'))
// WHERE `name` LIKE '%Qiang' AND `name` LIKE '%Xue'
where(array('like', 'name', array('%Qiang', '%Xue')))
// WHERE `name` LIKE '%Qiang' OR `name` LIKE '%Xue'
where(array('or like', 'name', array('%Qiang', '%Xue')))
// WHERE `name` NOT LIKE '%Qiang%'
where(array('not like', 'name', '%Qiang%'))
// WHERE `name` NOT LIKE '%Qiang%' OR `name` NOT LIKE '%Xue%'
where(array('or not like', 'name', array('%Qiang%', '%Xue%')))

// WHERE ... OR ...
orWhere()

// WHERE ... AND ...
andWhere()

// ORDER BY `name`, `id` DESC
order('name, id desc')
// ORDER BY `tbl_profile`.`name`, `id` DESC
order(array('tbl_profile.name', 'id desc'))

// LIMIT 10
limit(10)
// LIMIT 10 OFFSET 20
limit(10, 20)

// OFFSET 20
offset(20)

// JOIN `tbl_profile` ON user_id=id
join('tbl_profile', 'user_id=id')

// LEFT JOIN `pub`.`tbl_profile` `p` ON p.user_id=id AND type=1
leftJoin('pub.tbl_profile p', 'p.user_id=id AND type=:type', array(':type'=>1))

// RIGHT JOIN
rightJoin()

// CROSS JOIN
crossJoin()

// NATURAL JOIN
natrualJoin()

// GROUP BY `name`, `id`
group('name, id')
// GROUP BY `tbl_profile`.`name`, `id`
group(array('tbl_profile.name', 'id'))

// HAVING id=1 or id=2
having('id=1 or id=2')
// HAVING id=1 OR id=2
having(array('or', 'id=1', 'id=2'))

// UNION (select * from tbl_profile)
union('select * from tbl_profile')

// 2. 数据操作(不同于数据查询, 数据操作会立即执行)

// INSERT INTO `tbl_user` (`name`, `email`) VALUES (:name, :email)
$command->insert('tbl_user', array(
    'name'=>'Tester',
    'email'=>'tester@example.com',
));

// UPDATE `tbl_user` SET `name`=:name WHERE id=:id
$command->update('tbl_user', array(
    'name'=>'Tester',
), 'id=:id', array(':id'=>1));

// DELETE FROM `tbl_user` WHERE id=:id
$command->delete('tbl_user', 'id=:id', array(':id'=>1));

// 3. Schema 操作

// CREATE TABLE `tbl_user` (
//     `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     `username` varchar(255) NOT NULL,
//     `location` point
// ) ENGINE=InnoDB
createTable('tbl_user', array(
    'id' => 'pk',
    'username' => 'string NOT NULL',
    'location' => 'point',
), 'ENGINE=InnoDB')

// RENAME TABLE `tbl_users` TO `tbl_user`
renameTable('tbl_users', 'tbl_user')

// DROP TABLE `tbl_user`
dropTable('tbl_user')

// TRUNCATE TABLE `tbl_user`
truncateTable('tbl_user')

// ALTER TABLE `tbl_user` ADD `email` varchar(255) NOT NULL
addColumn('tbl_user', 'email', 'string NOT NULL')

// ALTER TABLE `tbl_user` DROP COLUMN `location`
dropColumn('tbl_user', 'location')

// ALTER TABLE `tbl_users` CHANGE `name` `username` varchar(255) NOT NULL
renameColumn('tbl_user', 'name', 'username')

// ALTER TABLE `tbl_user` CHANGE `username` `username` varchar(255) NOT NULL
alterColumn('tbl_user', 'username', 'string NOT NULL')

// ALTER TABLE `tbl_profile` ADD CONSTRAINT `fk_profile_user_id`
// FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`)
// ON DELETE CASCADE ON UPDATE CASCADE
addForeignKey('fk_profile_user_id', 'tbl_profile', 'user_id',
    'tbl_user', 'id', 'CASCADE', 'CASCADE')

// ALTER TABLE `tbl_profile` DROP FOREIGN KEY `fk_profile_user_id`
dropForeignKey('fk_profile_user_id', 'tbl_profile')

// CREATE INDEX `idx_username` ON `tbl_user` (`username`)
createIndex('idx_username', 'tbl_user', 'username')

// DROP INDEX `idx_username` ON `tbl_user`
dropIndex('idx_username', 'tbl_user')
?>
```

也可通过使用属性赋值方式:

```php
<?php
$command->select = array('id', 'username');
?>
```

或在创建 `CDbCommand` 是传配置参数的方式构建:

```php
<?php
$row = Yii::app()->db->createCommand(array(
    'select' => array('id', 'username'),
    'from' => 'tbl_user',
    'where' => 'id=:id',
    'params' => array(':id'=>1),
))->queryRow();
?>
```

构建完成后, 可以使用在[执行 SQL 语句][runSql]中讲到的方法执行之; 也可使用 `CDbCommand::getText()` 获取最后构建完工后的 SQL 语句, 绑定的参数被保存在 `CDbCommand::params` 中

同一个 `CDbCommand` 实例可用于多次构建不同的查询, 但是记得要再另一次之前调用 `CDbCommand::reset()` 以清理上次的查询

##<a name="ActiveRecord">Active Record</a>

每个 AR 类代表一个数据表(或视图), 数据表(或视图)的列在 AR 类中体现为类的属性, 一个 AR 实例则表示表中的一行

最佳应用是模型化数据表为 PHP 结构和执行不包含复杂 SQL 语句的查询. 对于复杂查询的场景, 应使用 Yii DAO

如果你数据库的表结构很少改动, 你应该通过配置 `CDbConnection::schemaCachingDuration` 属性的值为一个大于零的值开启表结构缓存

通过 AR 使用多个数据库有两种方式. 如果数据库的结构不同, 你可以创建不同的 AR 基类实现不同的 `getDbConnection()`; 否则, 动态改变静态变量 `CActiveRecord::db` 是一个好主意

由于 AR 类经常在多处被引用, 我们可以导入包含 AR 类的整个目录, 而不是一个个导入. 见[路径别名和命名空间][Alias]

通过 Yii 的日志功能, 可以查看 AR 在背后到底执行了那些语句

定义 AR 类:

```php
<?php
class Post extends CActiveRecord {
    public static function model($className=__CLASS__) {
        return parent::model($className);
    }

    /**
     * 默认情况下, AR 类的名字和数据表的名字相同. 如果不同, 请覆盖 `CActiveRecord::tableName` 方法
     */
    public function tableName() {
        return 'tbl_post';
    }

    /**
     * AR 依靠表中良好定义的主键. 如果一个表没有主键，则必须在相应的 AR 类中通过如下方式覆盖 primaryKey() 方法指定哪一列或哪几列作为主键:
     */
    public function primaryKey() {
        return 'id';
        // 对于复合主键，要返回一个类似如下的数组
        // return array('pk1', 'pk2');
    }
}
?>
```

创建记录:

- 如果表的主键是自增的, 在插入完成后, AR 实例将包含一个更新的主键

```php
<?php
$post=new Post;
$post->title='sample post';
$post->content='content for the sample post';
// 如果要使用 Mysql 的 NOW(), 必须使用 CDbExpression, 单纯的 'NOW()' 将会被作为字符串对待
$post->create_time=new CDbExpression('NOW()');
$post->save();
?>
```

读取记录:

- `find` 系列返回一个 AR 实例, 或者 `null`
- `findAll` 系列返回 AR 实例数组, 或者空数组

```php
<?php
// 1. 常规
// 查找满足指定条件的结果中的第一行
$post=Post::model()->find($condition,$params);
$post=Post::model()->find('postID=:postID', array(':postID'=>10));
// 查找具有指定主键值的那一行
$post=Post::model()->findByPk($postID,$condition,$params);
// 查找具有指定属性值的行
$post=Post::model()->findByAttributes($attributes,$condition,$params);
// 通过指定的 SQL 语句查找结果中的第一行
$post=Post::model()->findBySql($sql,$params);

// 查找满足指定条件的所有行
$posts=Post::model()->findAll($condition,$params);
// 查找带有指定主键的所有行
$posts=Post::model()->findAllByPk($postIDs,$condition,$params);
// 查找带有指定属性值的所有行
$posts=Post::model()->findAllByAttributes($attributes,$condition,$params);
// 通过指定的SQL语句查找所有行
$posts=Post::model()->findAllBySql($sql,$params);

// 获取满足指定条件的行数
$n=Post::model()->count($condition,$params);
// 通过指定的 SQL 获取结果行数
$n=Post::model()->countBySql($sql,$params);
// 检查是否至少有一行复合指定的条件
$exists=Post::model()->exists($condition,$params);

// 2. 使用 `CDbCriteria`
$criteria=new CDbCriteria;
$criteria->select='title';  // 只选择 'title' 列
$criteria->condition='postID=:postID';
$criteria->params=array(':postID'=>10);
$post=Post::model()->find($criteria); // $params 不需要了

// 3. 传递数组
$post=Post::model()->find(array(
    'select'=>'title',
    'condition'=>'postID=:postID',
    'params'=>array(':postID'=>10),
));
?>
```

更新记录:

- 如果一个 AR 实例是使用 new 操作符创建的, 调用 `CActiveRecord::save` 将会向数据表中插入一行新数据; 如果 AR 实例是某个 find 或 findAll 方法的结果, 调用 `CActiveRecord::save` 将更新表中现有的行. 实际上, 我们是使用 `CActiveRecord::isNewRecord` 说明一个 AR 实例是不是新的

- 直接更新数据表中的一行或多行而不首先载入也是可行的:

```php
<?php
// 更新符合指定条件的行
Post::model()->updateAll($attributes,$condition,$params);
// 更新符合指定条件和主键的行
Post::model()->updateByPk($pk,$attributes,$condition,$params);
// 更新满足指定条件的行的计数列
Post::model()->updateCounters($counters,$condition,$params);
?>
```

删除记录:

- 实例化后删除: 这样删除之后, AR 实例仍不改变

```php
<?php
$post=Post::model()->findByPk(10); // 假设有一个帖子，其 ID 为 10
$post->delete(); // 从数据表中删除此行
?>
```

- 不实例化直接删除

```php
<?php
// 删除符合指定条件的行
Post::model()->deleteAll($condition,$params);
// 删除符合指定条件和主键的行
Post::model()->deleteByPk($pk,$condition,$params);
?>
```

如果要确定两个 AR 是否是同一个记录, 只需对比它们的主键值, 或直接调用 `CActiveRecord::equals()`

通过以下几个占位符方法, 可以自定义 AR 的工作流:

|占位符方法|含义|
|----------|----|
|beforeValidate, afterValidate|在验证之前(后)执行|
|beforeSave, afterSave|在保存 AR 实例之前(后)执行|
|beforeFind, afterFind|在执行查询之前(后)执行|
|afterConstruct|在 AR 实例化之后执行|

数据验证和块赋值参见[触发验证][triggerValidation]和[块赋值][massiveAssign]

事务处理, 参见[使用事务][useTransaction]

```php
<?php
$model=Post::model();
$transaction=$model->dbConnection->beginTransaction();
try {
    // 查找和保存是可能由另一个请求干预的两个步骤
    // 这样我们使用一个事务以确保其一致性和完整性
    $post=$model->findByPk(10);
    $post->title='new post title';
    $post->save();
    $transaction->commit();
} catch(Exception $e) {
    $transaction->rollBack();
}
?>
```

命名范围: 即查询时的过滤器

- 定义

```php
<?php
class Post extends CActiveRecord {
    /**
     * 默认命名范围, 隐式应用于所有关于此模型的 SELECT 查询
     */
    public function defaultScope() {
        return array(
            'condition'=>"language='".Yii::app()->language."'",
        );
    }

    /**
     * 这里定义的命名范围可以被显式应用于 SELECT,UPDATE,CREATE,DELETE 操作
     * @return {[type]} [description]
     */
    public function scopes() {
        return array(
            'published'=>array(
                'condition'=>'status=1',
            ),
            'recently'=>array(
                'order'=>'create_time DESC',
                'limit'=>5,
            ),
        );
    }
}
?>
```

- 使用

```php
<?php
$posts=Post::model()->published()->recently()->findAll();
?>
```

##关系型 Active Record

为了使用关系型 AR, 建议在关联的表中定义主键-外键约束

关系包括: `BELONGS_TO`, `HAS_MANY`, `HAS_ONE`, `MANY_MANY`, `STAT`

使用 `STAT` 关系已获取统计数据

适当使用 `together` 查询选项, 会加快查询速度

在 AR 查询中, 基础表的别名为 `t`, 其他关联表的别名和关系的名称一样

声明关系

```php
<?php
class Post extends CActiveRecord {
    public function relations() {
        return array(
            'author'=>array(self::BELONGS_TO, 'User', 'author_id'),
            'categories'=>array(self::MANY_MANY, 'Category',
                'tbl_post_category(post_id, category_id)'),
        );
    }
}

class User extends CActiveRecord {
    public function relations() {
        return array(
            'posts'=>array(self::HAS_MANY, 'Post', 'author_id'),
            'profile'=>array(self::HAS_ONE, 'Profile', 'owner_id'),
        );
    }
}

// 使用额外的选项
// 可用选项包括: select, condition, params, on, order, with, joinType, alias, together, join, group, having, index
// 当使用 `STAT` 关系时, 可用的选项包括: select, defaultValue, condition, params, order, group, having
class User extends CActiveRecord {
    public function relations() {
        return array(
            'posts'=>array(self::HAS_MANY, 'Post', 'author_id',
                            'order'=>'posts.create_time DESC',
                            'with'=>'categories'),
            'profile'=>array(self::HAS_ONE, 'Profile', 'owner_id'),
        );
    }
}
?>
```

执行关联查询

```php
<?php
// 1. 懒惰式加载: 
// 获取 ID 为 10 的帖子
$post=Post::model()->findByPk(10);
// 获取帖子的作者(author): 此处将执行一个关联查询。
$author=$post->author;

// 2. 渴求式加载(比懒惰式高效)
// 2.1 常规方式
// 获取 post 及其作者和分类
$posts=Post::model()->with('author')->findAll();
// 获取 post 及其作者和分类, 以及作者简介(author.profile) 和帖子(author.posts)
$posts=Post::model()->with(
    'author.profile',
    'author.posts',
    'categories')->findAll();
// 2.2 指定 `CDbCeteria::with` 属性
$criteria=new CDbCriteria;
$criteria->with=array(
    'author.profile',
    'author.posts',
    'categories',
);
$posts=Post::model()->findAll($criteria);
// 2.3 配置数组
$posts=Post::model()->findAll(array(
    'with'=>array(
        'author.profile',
        'author.posts',
        'categories',
    )
);

// 3. 动态
// 3.1
User::model()->with(array(
    'posts'=>array('order'=>'posts.create_time ASC'),
    'profile',
))->findAll();
// 3.2
$user=User::model()->findByPk(1);
$posts=$user->posts(array('condition'=>'status=1'));

// 如果关系中没有相关的实例，则相应的属性将为 null(BELONGS_TO, HAS_ONE) 或一个空数组(HAS_MANY, MANY_MANY)
?>
```

使用命名空间

```php
<?php
// 1.
class User extends CActiveRecord {
    public function relations() {
        return array(
            'posts'=>array(self::HAS_MANY, 'Post', 'author_id',
                'with'=>'comments:approved'),
        );
    }
}
// 2.
$posts=Post::model()->published()->recently()->with('comments')->findAll();
// 3.
$posts=Post::model()->published()->recently()->with('comments')->findAll();
?>
```

##数据库迁移 @todo

#专题

##验证

验证即核查一个人是否真实他声称的那个人(用户名, 密码); 授权即检查是否有权操作特定的资源

定义身份类:

```php
<?php
class UserIdentity extends CUserIdentity {
    private $_id;

    /**
     * 这是身份类的主要工作, 实现验证
     */
    public function authenticate() {
        // 使用 User AR 获取数据
        $record=User::model()->findByAttributes(array('username'=>$this->username));
        if($record===null) {
            $this->errorCode=self::ERROR_USERNAME_INVALID;
        } else if {
            ($record->password!==md5($this->password))
            $this->errorCode=self::ERROR_PASSWORD_INVALID;
        } else {
            $this->_id=$record->id;
            // 使用 setState 把 title 信息存储为状态传递给 CWebUser
            // 之后便可以使用 Yii::app()->user->title 访问
            // CWebUser 默认会存储状态信息到 session, 但如果 CWebUser::allowAutoLogin 为 true, 则会存到 cookie, 切勿将敏感信息存入 cookie
            $this->setState('title', $record->title);
            $this->errorCode=self::ERROR_NONE;
        }
        return !$this->errorCode;
    }

    /**
     * 重写 getId, 默认的实现是直接返回用户名
     */
    public function getId() {
        return $this->_id;
    }
}
?>
```

登录和注销:

```php
<?php
// 1. 使用提供的用户名和密码登录用户
$identity=new UserIdentity($username,$password);
if($identity->authenticate()) {
    // 将用户身份信息存入持久存储(默认为 Session)
    // 之后便可以用 `Yii::app->user->isGuest` 判断用户是否登录
    Yii::app()->user->login($identity);
} else {
    echo $identity->errorMessage;
}
......

// 注销当前用户
Yii::app()->user->logout();

// 2. 使用 Cookie 登录
// 要确保用户部件的allowAutoLogin被设置为true。
// 保留用户登陆状态时间7天
Yii::app()->user->login($identity,3600*24*7);
?>
```

如果使用 cookie 登录, 要确保不要保存敏感信息到 State, 而是保存到持久存储(数据库) 上, 最好(参见[安全][security]):

- 当用户成功登录时, 保存同一个随机串到 cookie State 和数据库
- 在之后的的自动 cookie 登录时, 对比 cookie 中和数据库中的随机串是否一致
- 如果用户通过登录表单登录, 刷新这个随机串

##授权

访问控制过滤器的定义参见[过滤器][filter]

过滤器定义之后, 还要通过重载 `CController::accessRules` 指定具体授权规则

```php
<?php
class PostController extends CController {
    /**
     * 配置数组的值可为
     * 第一项: `deny` 或者 `allow`
     * actions: action 名字
     * users: *: 任何用户, ?: 匿名用户, @: 验证通过的用户 
     */
    public function accessRules() {
        return array(
            array('deny',
                'actions'=>array('create', 'edit'),
                'users'=>array('?'),
            ),
            array('allow',
                'actions'=>array('delete'),
                'roles'=>array('admin'),
            ),
            array('deny',
                'actions'=>array('delete'),
                'users'=>array('*'),
            ),
            // 为了确保某类动作在没允许情况下不被执行
            array('deny',
                    'action'=>'delete',
            )
        );
    }
}
?>
```

如果授权失败

- 已经配置 `CWebUser::loingUrl`, 则重定向到此 URL, 可以这样配置:

    ```php
    <?php
    array(
        ......
        'components'=>array(
            'user'=>array(
                // 这实际上是默认值
                'loginUrl'=>array('site/login'),
            ),
        ),
    )
    ?>
    ```

- 否则显示一个 401 HTTP 例外

如果希望在用户登录成功后转到之前页面:

```php
<?php
Yii::app()->request->redirect(Yii::app()->user->returnUrl);
?>
```

##基于角色的访问控制(Role-Based Access Control)

`授权项目`可分为`操作(operations)`, `任务(tasks)` 和`角色(roles)` 一个角色由若干任务组成, 一个任务由若干操作组成， 而一个操作就是一个`许可`, 不可再分. Yii 还允许一个角色包含其他角色或操作, 一个任务可以包含其他操作, 一个操作可以包括其他操作. 授权项目是通过它的名字唯一识别的

一个授权项目可能与一个`业务规则`关联. 业务规则是一段 PHP 代码, 在进行涉及授权项目的访问检查时将会被执行. 仅在执行返回 `true` 时, 用户才会被视为拥有此授权项目所代表的权限许可

Yii 提供了两种授权管理器： `CPhpAuthManager` 和 `CDbAuthManager`. 前者将授权数据存储在一个 PHP 脚本文件中而后者存储在数据库中.  配置 `CWebApplication::authManager` 应用组件时, 我们需要指定使用哪个授权管理器组件类, 以及所选授权管理器组件的初始化属性值:

```php
<?php
return array(
    'components'=>array(
        'db'=>array(
            'class'=>'CDbConnection',
            'connectionString'=>'sqlite:path/to/file.db',
        ),
        'authManager'=>array(
            'class'=>'CDbAuthManager',
            'connectionID'=>'db',
        ),
    ),
);
?>
```

然后, 我们便可以使用 `Yii::app()->authManager` 访问

定义授权等级体总共分三步

1. 定义授权项目
    - `CAuthManager::createRole`
    - `CAuthManager::createTask`
    - `CAuthManager::createOperation`
2. 建立授权项目之间的关系
    - `CAuthManager::addItemChild`
    - `CAuthManager::removeItemChild`
    - `CAuthItem::addChild`
    - `CAuthItem::removeChild`
3. 分配角色给用户
    - `CAuthManager::assign`
    - `CAuthManager::revoke`

如:

```php
<?php
// 并不需要在每个请求中都要运行
$auth=Yii::app()->authManager;

$auth->createOperation('createPost','create a post');
$auth->createOperation('readPost','read a post');
$auth->createOperation('updatePost','update a post');
$auth->createOperation('deletePost','delete a post');

$bizRule='return Yii::app()->user->id==$params["post"]->authID;';
$task=$auth->createTask('updateOwnPost','update a post by author himself',$bizRule);
$task->addChild('updatePost');

$role=$auth->createRole('reader');
$role->addChild('readPost');

$role=$auth->createRole('author');
$role->addChild('reader');
$role->addChild('createPost');
$role->addChild('updateOwnPost');

$role=$auth->createRole('editor');
$role->addChild('reader');
$role->addChild('updatePost');

$role=$auth->createRole('admin');
$role->addChild('editor');
$role->addChild('author');
$role->addChild('deletePost');

$auth->assign('reader','readerA');
$auth->assign('author','authorB');
$auth->assign('editor','editorC');
$auth->assign('admin','adminD');
?>
```

权限检查:

```php
<?php
if(Yii::app()->user->checkAccess('createPost')) {
    // 创建帖子
}

// 也可传参
$params=array('post'=>$post);
if(Yii::app()->user->checkAccess('updateOwnPost',$params)) {
    // 更新帖子
}
?>
```

默认角色就是一个隐式分配给每个用户的角色, 这些用户包括通过身份验证的用户和游客

配置:

```php
<?php
return array(
    'components'=>array(
        'authManager'=>array(
            'class'=>'CDbAuthManager',
            'defaultRoles'=>array('authenticated', 'guest'),
        ),
    ),
);
?>
```

定义:

```php
<?php
$bizRule='return !Yii::app()->user->isGuest;';
$auth->createRole('authenticated', 'authenticated user', $bizRule);

$bizRule='return Yii::app()->user->isGuest;';
$auth->createRole('guest', 'guest user', $bizRule);
?>
```

##安全

- XSS: 跨站脚本攻击

    定义: 攻击者常常向易受攻击的 web 应用注入 JavaScript, VBScript, ActiveX, HTML 或 Flash 来迷惑访问者以收集访问者的信息

    防范: 在显示用户输入的内容之前进行检查

    ```php
    // 这里将 CHtmlPurifier 作为一个 Widget 来过滤用户输入
    <?php $this->beginWidget('CHtmlPurifier'); ?>
    //...这里显示用户输入的内容...
    <?php $this->endWidget(); ?>
    ```

- CSRF: 跨站请求伪造

    定义: 攻击者在用户浏览器在访问恶意网站的时候, 让用户的浏览器向一个受信任的网站发起攻击者指定的请求

    防范: GET 请求只允许检索数据而不能修改服务器上的任何数据, 而 POST 请求应当含有一些可以被服务器识别的随机数值, 用来保证表单数据的来源和运行结果发送的去向是相同的

    ```php
    <?php
    // 启用 CsrfValidation 组件
    // 该组件会自动在用 CHtml::form 生成的表单中嵌入一个保存随机值的隐藏项, 在表单提交的时候发送到服务器进行验证
    return array(
        'components'=>array(
            'request'=>array(
                'enableCsrfValidation'=>true,
            ),
        ),
    );
    ?>
    ```

- Cookie 攻击

    定义: session ID 通常存储在  Cookie中, 如果攻击者窃取到了一个有效的 session ID, 他就可以使用这个 session ID 对应的 session 信息

    防范:

    - 您可以使用 SSL 来产生一个安全通道, 且只通过 HTTPS 连接来传送验证 cookie
    - 设置 cookie 的过期时间, 对所有的 cookie 和 session 令牌也这样做
    - 防范跨站代码攻击, 因为它可以在用户的浏览器触发任意代码, 这些代码可能会泄露用户的 cookie
    - 在 cookie 有变动的时候验证 cookie 的内容

    ```php
    <?php
    // 1. 启用 CookieValidation 组件 
    return array(
        'components'=>array(
            'request'=>array(
                'enableCookieValidation'=>true,
            ),
        ),
    );

    // 然后只使用 CHttpRequest::cookies 进行 cookie 操作(而不是 $_COOKIES)
    // 检索一个名为$name的cookie值
    $cookie=Yii::app()->request->cookies[$name];
    $value=$cookie->value;
    ......
    // 设置一个cookie
    $cookie=new CHttpCookie($name,$value);
    Yii::app()->request->cookies[$name]=$cookie;
    ?>
    ```

[security]: #security
[filter]: #filter
[accessControlFilter]: #accessControlFilter
[runSql]: #runSql
[FormModel]: #FormModel
[ActiveRecord]: #ActiveRecord
[Alias]: #
[triggerValidation]: #triggerValidation
[massiveAssign]: #massiveAssign
[useTransaction]: #
