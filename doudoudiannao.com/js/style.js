function Login()
{
  name = prompt('你是谁？')
  docment.white('欢迎'+name)
  dengluzhuangtai = 'zhengzaidenglu'
  password = prompt('密码是？游客不用填')
  pswd = "159357rrrocky521"
  pswd1 = "admin"
  if (password == pswd){
    dengluzhuangtai = 'superuser-rocky'
    docment.white('身份id：管理员Rocky,别忘去hxcpp8.com')
  } elif (password == pswd1){
    dengluzhuangtai = 'dianliren'
    docment.white('登陆身份：管理员 店里人')
  else{
    alert('你好！')
    docment.white('登陆人：游客')
    dengluzhuangtai = 'youke'
  }

}
Login()
