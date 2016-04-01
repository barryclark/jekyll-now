---
layout: page
title: 基于jsp和mysql的注册和登录
permalink: /jsp/
---
<bgsound　src="xxinshu.github.io/images/dope.mp3"　loop="-1">

### 一、首先要建一个如图所示数据库，方便起见我们用自动生成id的方式来避免重名检查这种反人类的东西

 ![alt text](https://github.com/xxinshu/xxinshu.github.io/blob/master/images/1.png?raw=true)
 
### 二、 然后是存放User

 public class User {
	private String user;
	private String pwd;
	private String name;
	private int age;
	public String getUser() {
	   return user;
	}
	public void setUser(String user) {
	   this.user = user;
	}
	public String getPwd() {
	   return pwd;
	}
	public void setPwd(String pwd) {
	   this.pwd = pwd;
	}
	public String getName() {
	   return name;
	}
	public void setName(String name) {
	   this.name = name;
	}
	public int getAge() {
	   return age;
	}
	public void setAge(int age) {
	   this.age = age;
	}
	}
	
###	三、建一个class用来连接数据库实现插入数据和select数据
	
	public class Dao {
private Connection conn;
private PreparedStatement pstat;
String sql="";
/**
* 
* 用户登录
*/
public boolean login(User user) throws SQLException{
   conn = GetConnection.getConnection();
   boolean i = false;
   sql = "select * from user where user=? and pwd=?";
  
   pstat = conn.prepareStatement(sql);
  
   pstat.setString(1, user.getUser());
   pstat.setString(2, user.getPwd());
  
   ResultSet rs1 = (ResultSet) pstat.executeQuery();
   if (rs1.next())
   {
    i = true;
    rs1.close();
    pstat.close();
   }
   else 
   {
    i = false ;
    rs1.close();
    pstat.close();
   }
   conn.close();
   return i;
}
/**
* 用户注册
*/
public void addUser(User user){
   conn = GetConnection.getConnection();
   sql = "insert into user values(null,?,?,?,?)";
   try{
    pstat = conn.prepareStatement(sql);
    pstat.setString(1,user.getUser());
    pstat.setString(2,user.getPwd());
    pstat.setString(3,user.getName());
    pstat.setInt(4,user.getAge());
    pstat.executeUpdate();
    pstat.close();
    conn.close();
   
   }catch(SQLException e){
    e.printStackTrace();
   }
  
}
}

### 四、利用JDBC实现与mysql的连接，关于JDBC的用法和jar包下载不多说= =

public class GetConnection {
//通过静态方法注册驱动，获得连接

public static Connection getConnection(){
   String driver = "com.mysql.jdbc.Driver";
   String url = "jdbc:mysql://localhost:3306/student";
   Connection con = null;
   try {
    Class.forName(driver);
    try {
     con = DriverManager.getConnection(url,"root","123456");
    } catch (SQLException e) {
     e.printStackTrace();
    }
   } catch (ClassNotFoundException e) {
    e.printStackTrace();
   }
   System.out.println("已获得数据库的连接");
   return con;
}
/*public static void main(String args[]){
   getConnection();
}*/
}

### 五、搞一下注册和登录的servlet
public class addUserServlet extends HttpServlet {


public void destroy() {
   super.destroy(); 

}

public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {

   response.setContentType("text/html");
doPost(request,response);
}

public void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {

   response.setContentType("text/html");
   response.setCharacterEncoding("utf-8");
   String user1 = request.getParameter("user");
   String pwd = request.getParameter("pwd");
   String name = new String(request.getParameter("name").getBytes("ISO8859_1"),"utf-8");
   String age1 = request.getParameter("age");
   User user = new User();
   user.setUser(user1);
   user.setPwd(pwd);
   user.setName(name);
   int age;
   if(age1!=null)
   {
    age = Integer.parseInt(age1);
    user.setAge(age);
   }
   Dao dao = new Dao();
   dao.addUser(user);
   response.sendRedirect("cg.jsp");
  
//      request.setAttribute("info",new String(" 添加成功！恭喜！！" + ""));
//      request.setAttribute("id", new String("a"));
//      request.setAttribute("denglu",new String("登录 ")); 
//      request.getRequestDispatcher("info.jsp").forward(request,response);
}

public void init() throws ServletException {
}

}
### 关于注册成功和注册失败导向的页面根据个人喜好来设定，由于我的注册界面比较简单，所以没有注册失败这个说法！

public class loginServlet extends HttpServlet {
public void destroy() {
   super.destroy(); // Just puts "destroy" string in log

   // Put your code here

}
public void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
   request.setCharacterEncoding("utf-8");
   response.setContentType("text/html");
   PrintWriter out = response.getWriter();
   String name = new String (request.getParameter("user").getBytes("ISO8859_1"), "GBK");
   String pwd = new String (request.getParameter("pwd").getBytes("ISO8859_1"),"UTF-8");
   User user = new User();
   user.setUser(name);
   user.setPwd(pwd);
   Dao dao = new Dao();
   boolean isLogin;
   try
   {
    isLogin = dao.login(user);
   
    if(isLogin)
    {
     response.sendRedirect("MyJsp.jsp");
    }else{ 
     response.sendRedirect("sb.jsp");
    }
   
   } catch (SQLException e) 
   {
    e.printStackTrace();
   }
}
public void doGet(HttpServletRequest request, HttpServletResponse response)
throws ServletException, IOException {
doPost(request,response);
}
public void init() throws ServletException {
}

}


### 六、配置一下servlet的web.xml

<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.5" 
	xmlns="http://java.sun.com/xml/ns/javaee" 
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee 
	http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">
  <welcome-file-list>
    <welcome-file>index.jsp</welcome-file>
  </welcome-file-list>

   <servlet>
        <servlet-name>addUserServlet</servlet-name>
        <servlet-class>servlet.addUserServlet</servlet-class>        
    </servlet>
    <servlet-mapping>
        <servlet-name>addUserServlet</servlet-name>
        <url-pattern>/add</url-pattern>
    </servlet-mapping>
    
      <servlet>
        <servlet-name>loginServlet</servlet-name>
        <servlet-class>servlet.loginServlet</servlet-class>        
    </servlet>
    <servlet-mapping>
        <servlet-name>loginServlet</servlet-name>
        <url-pattern>/login</url-pattern>
    </servlet-mapping>
</web-app>


### 七、制作你喜欢的各种jsp界面
以登录为例

<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
   
    
    <title>欢迎来到本大爷的超市系统</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0"> 
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

</head>

<body>
    <div align="center"> <font size=" 2" color="#FF6633">用户登录</font>
</div>
<form id="form1" name="form1" method="post" action="login">
<table width="357" border="0" align="center">
    <tr>
      <td width="128">用户名：</td>
      <td width="219"><label>
        <input name="user" type="text" id="user" />
      </label></td>
    </tr>
    <tr>
      <td>密　码：</td>
      <td><label>
        <input name="pwd" type="password" id="pwd" />
      </label></td>
    </tr>
    <tr>
      <td><label>
        <input type="submit" name="Submit" value="登录" />
      </label></td>
      <td><label><a href="addUser.jsp">用户注册</a></label></td>
    </tr>
</table>
<p>&nbsp;</p>
</form>
</body>
</html>

### 以上=。=不定期更新其他的
