使用拦截器分表原理:在分表之前，替换执行的sql语句。

涉及到的类： Interceptor。在实现的拦截器上配置注解:@Intercepts。使用@Signature属性，指定拦截的类
拦截的目标类：
  org.apache.ibatis.executor.statement.StatementHandler
  org.apache.ibatis.executor.Executor


可能的pattern：
1. 查询
    1. 带有分表依据
        1. 根据分表依据查询到对应表
    1. 不带分表依据
        1. 遍历所有分表
    1. 带有分表区间条件的查询
        1. 按条件找出对应的多个分表
    1. 指定多个分表依据条件的查询
        1. 按条件找出对应的多个分表
1. 单个插入
    1. 带有分表依据插入
        1. 根据分表依据，直接找到对应的分表
    1. 不带分表依据
        1. 插入不带分表后缀的表，并打印error log
1. 批量插入
    1 遍历需要插入的list，将需要插入的list，拆分为按表为key的多个list。
1. 更新
    1. 带有分表依据
        1. 根据分表依据查询到对应表
    1. 不带分表依据
        1. 遍历所有分表
1. 删除
    1. 带有分表依据
        1. 根据分表依据查询到对应表
    1. 不带分表依据
        1. 打印error log

遇到的问题：
1. 对于没有添加条件的查询，遍历所有分表。在遍历多次分表的情况下，需要清除mybatis一级缓存，否则查询多次都会从缓存中取结果！
1. select应该拦截StatementHandler里的query(Statement, ResultHandler)方法
1. update、delete、insert应该拦截StatementHandler里的query(Statement, ResultHandler)方法
1. 个人比较推荐的做法是在StatementHandler拦截器中拦截，算出需要替换掉的表和目标表。在Executor的拦截器中，替换sql语句。主要因为：
    * 批量insert的情况下，在executor中，执行的sql是已经生成好了的，此时再想执行多次分表插入，将参数list分为多个再拼接，会很麻烦。
