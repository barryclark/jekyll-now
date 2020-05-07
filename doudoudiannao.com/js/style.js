function Login()
{
  function pass()
  {
    a = 1
  }
  name = prompt('你是谁？')
  docment.write('欢迎'+name)
  dengluzhuangtai = 'zhengzaidenglu'
  password = prompt('密码是？游客不用填')
  pswd = "159357rrrocky521"
  pswd1 = "admin"
  if (password == pswd){
    dengluzhuangtai = 'superuser-rocky'
    docment.write('你好啊开发者 Rocky')
  } elif (password == pswd1){
    dengluzhuangtai = 'suprouser-dad'
    docment.write()
  } else{
    pass()
  }
}
Login()
