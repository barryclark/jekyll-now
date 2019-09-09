

## 手机，邮箱验证码

## 登陆信息存放

## 权限相关
### oauth2
1. 什么是oauth
授权（authorization）的开放网络标准
详见rfc 6749
 
### spring security

## 微信支付

## 用户认证表

## redis缓存

## redis结构设计

## 缓存的对象过期

## mongoDB使用

## 文件上传下载

## 秒杀


## 计算队列，线程池

## 定时任务


## 图片水印

## 事务嵌套，造成死锁

## 线程嵌套，造成死锁


## 远程调用
实现方式：hessian 结合 spring

## 加密算法
### 对称加密
概念：加密密钥=解密密钥 
- des，3des (data encryption standard) des已不安全，不作为加密算法。
- aes：
	产生原因：des不安全，3des速度慢。
	常用于移动通信系统加密以及使用ssh协议的软件的加密。


- pbe
- idea

des,3des,aes使用方式非常接近，使用步骤:
1. 服务端：生成key
2. 服务端->客户端：公布key给客户端
3. 服务端：使用key加密数据
4. 服务端->客户端：发送加密消息至客户端
5. 客户端：解密

pbe的使用步骤：
1. 服务端：生成key
2. 服务端->客户端：公布key给客户端
3. 服务端：生成盐
4. 服务端：使用key，盐加密数据
5. 服务端->客户端：发送盐+加密消息至客户端
6. 客户端：解密

### 加密算法常见攻击及防御
1. 时间攻击 
使用PasswordEncoder中的matches防止时间攻击


## 合作伙伴免登录
实现方式：协议定义一个加密key，合作伙伴传入两个参数进验证接口：username,MD5(username+key)，验证通过后，返回一个该用户登陆的token。

## jmx
jmx是Java管理扩展的缩写：Java Management Extensions
对于springboot ，可以使用：http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/reference/htmlsingle/#production-ready
对于非spring boot 应用，可以使用：javamelody