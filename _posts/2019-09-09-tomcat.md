#tomcat
## tomcat 角色：
1. manager-gui 允许访问html接口(即URL路径为/manager/html/*)
2. manager-script 允许访问纯文本接口(即URL路径为/manager/text/*)
3. manager-jmx 允许访问JMX代理接口(即URL路径为/manager/jmxproxy/*)


## eclipse 中，tomcat 配置
1. server location在第一次要配置好，配置为安装路径
2. deploy path 设置为webapps（默认为wtpwebapps）
3. 设置超时 ：timeout默认值太小
4. modules中，edit，设置项目的路径
5. modules中，edit，将auto reloading enabled勾去掉

pom中，打包