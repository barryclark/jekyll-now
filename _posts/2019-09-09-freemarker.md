#### 获取返回的数据

#### 打印指定变量名
格式：${变量名}

#### 逻辑语法常用基本格式
<#操作名 变量名>
</#操作名>

如
	
	<#switch user.role!>
		<#case 1 >
			case1111
		<#break>
		<#case 2 >
			case2222
		<#break>
		<#case 3 >
			case3333
		<#break>
	</#switch>

#### 字符串函数
字符串函数的调用格式：

		${变量名}?函数名称
例如

		${username}?upper_case
		${username}?substring(1,3)
		${username}?length

字符串之间也可以直接用加号"+"来拼接

		${str1+str2}

#### 内建函数
转换格式：

* numbervar?string("0.##")
* strvar?date("MM/dd/yyyy")
* strvar?time("hh`:`mm`:`ss")
* strvar?datetime("MM/dd/yyyy hh`:`mm`:`ss")

#### 自定义指令与自定义函数
自定义指令：TemplateMethodModelEx
自定义函数：

#### 在模板中为变量赋值
格式：<#assign 变量名=变量/>例如：

* 赋值：

      <#assign a="letter a" />
      <#assign b=31241243432423 />
* 打印赋值的变量

      a=${a}
      b=${b}

* 结果 

      a=letter a
      b=31,241,243,432,423

若变量为null，会报错：user:${gfagcustomerList}
应对方法：在要打印的变量后加"!",若要设置默认值，则在后面加想要显示的默认值

        user:${customerList!"default"}
若变量为list，直接打印变量，也会报错：

	user:${customerList!}

### 对结果list遍历
	<#list customerList as customer>
	userId:${customer.userId}
	</#list>
遍历前判断空：

	<#list customerList ! as customer>

#### 使用变量之前，先判断变量是否存在
语法：<#if 变量名 ??>

	<#if csustomerList ??>
	    <#list customerList ! as customer>
	    userId:${customer.userId}---- <br/>
	    </#list>
	</#if>

#### 获取List的size,String的length
语法：:${List的变量名?size}

	${customerList?size}

