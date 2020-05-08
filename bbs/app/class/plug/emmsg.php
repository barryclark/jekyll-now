<?php
if(!defined('WMBLOG'))exit;

function emmsg_init(){   
     $config['title'] = '评论/回复邮件提醒通知';
     $config['file'] = 'emmsg.php';
     $config['act'] = 'addpl,plsave';
     $config['func'] = 'emmsg';
     $config['cfg'] = array('smtp服务器','邮箱地址','password'=>'邮箱密码');
	 if(!function_exists("socket_create")) {
            $config['error'] = "服务器不支持sockets！";             
     }
     return $config;
}

function emmsg_run($arr){
	 global $set;
	 $arg = $arr['args'];
     if($arr['act']=='plsave'){
	    $email = $arr['pmail'];
		if(filter_var($email, FILTER_VALIDATE_EMAIL)==false) return 'pmail empty';
		$text = '<b>您在<a href="'.$arr['r'].'">'.$set['webtitle'].'</a>评论被回复</b><hr>回复内容：'.$arr['rcontent'];
		$title = '评论回复通知';
	 }else{
	    $email = empty($set['webmail'])?$arg[1] : $set['webmail'];
		$text = '<b>评论地址：</b><a href="'.$arr['r'].'">'.$set['webtitle'].'</a><br><b>评论昵称：</b>'.$arr['pname'].'<br><b>评论内容：</b>'.$arr['pcontent'];
		$title = '您的博客收到新的评论';
	 }
     $mail = new Smtper();
     $mail->setServer($arg[0], $arg[1], $arg[2], 465, 1); //设置smtp服务器
     $mail->setFrom($set['webuser'],$arg[1]); //设置发件人
	 $mail->setReceiver($email);  //设置收件人
	 $mail->setMail($title, $text); //设置邮件主题、内容
     $mail->send(); //发送
	 print_r($mail->error());
} 
/**
* 邮件发送类
* 仅支持发送纯文本和HTML内容邮件
* 需要的php扩展，sockets
* @example
* $mail = new MySendMail();
* $mail->setServer("XXXXX", "XXXXX@XXXXX", "XXXXX"); 设置smtp服务器
* $mail->setFrom("XXXXX"); 设置发件人
* $mail->setReceiver("XXXXX"); 设置收件人
* $mail->setMailInfo("test", "<b>test</b>"); 设置邮件主题、内容
* $mail->sendMail(); 发送
*/  
class  Smtper{
    /**
    * @var string 邮件传输代理用户名
    * @access private
    */
    private $_userName;
 
    /**
    * @var string 邮件传输代理密码
    * @access private
    */
    private $_password;
 
    /**
    * @var string 邮件传输代理服务器地址
    * @access private
    */
    private $_sendServer;
 
    /**
    * @var int 邮件传输代理服务器端口
    * @access protected
    */
    protected $_port=25;
 
    /**
    * @var string 发件人
    * @access protected
    */
    protected $_from;

	protected $_name;
 
    /**
    * @var string 收件人
    * @access protected
    */
    protected $_to;
 
    /**
    * @var string 主题
    * @access protected
    */
    protected $_subject;
 
    /**
    * @var string 邮件正文
    * @access protected
    */
    protected $_body;
 
    /**
    * @var reource socket资源
    * @access protected
    */
    protected $_socket;

    /**
    * @var reource 是否是安全连接
    * @access protected
    */

    protected $_isSecurity;
    /**
    * @var string 错误信息
    * @access protected
    */
    protected $_errorMessage;   /**
    * 设置邮件传输代理，如果是可以匿名发送有邮件的服务器，只需传递代理服务器地址就行
    * @access public
    * @param string $server 代理服务器的ip或者域名
    * @param string $username 认证账号
    * @param string $password 认证密码
    * @param int $port 代理服务器的端口，smtp默认25号端口
    * @return boolean
    */
    public function setServer($server, $username="", $password="", $port=25, $isSecurity=false) {
        $this->_sendServer = $server;
        $this->_port = $port;
        $this->_isSecurity = $isSecurity;
        $this->_userName = empty($username) ? "" : base64_encode($username);
        $this->_password = empty($password) ? "" : base64_encode($password);
        return true;
    }
 
    /**
    * 设置发件人
    * @access public
    * @param string $from 发件人地址
    * @return boolean
    */
    public function setFrom($name,$from) {
		$this->_name = $name;
        $this->_from = $from;
        return true;
    }
 
    /**
    * 设置收件人
    * @access public
    * @param string $to 收件人地址
    * @return boolean
    */
    public function setReceiver($to) {
        $this->_to = $to;
        return true;
    }
 
    /**
    * 设置邮件信息
    * @access public
    * @param string $body 邮件主题
    * @param string $subject 邮件主体内容，可以是纯文本，也可是是HTML文本
    * @return boolean
    */
    public function setMail($subject, $body) {
        $this->_subject = $subject;
        $this->_body = base64_encode($body);
        if(!empty($attachment)) {
            $this->_attachment = $attachment;
        }
        return true;
    }
 
    /**
    * 发送邮件
    * @access public
    * @return boolean
    */
    public function send() {
        $command = $this->getCommand();
         
        $this->_isSecurity ? $this->socketSecurity() : $this->socket();
         
        foreach ($command as $value) {
            $result = $this->_isSecurity ? $this->sendCommandSecurity($value[0], $value[1]) : $this->sendCommand($value[0], $value[1]);
            if($result) {
                continue;
            }
            else{
                return false;
            }
        }
         
        //其实这里也没必要关闭，smtp命令：QUIT发出之后，服务器就关闭了连接，本地的socket资源会自动释放
        $this->_isSecurity ? $this->closeSecutity() : $this->close();
        return true;
    }
 
    /**
    * 返回错误信息
    * @return string
    */
    public function error(){
        if(!isset($this->_errorMessage)) {
            $this->_errorMessage = "";
        }
        return $this->_errorMessage;
    }
 
    /**
    * 返回mail命令
    * @access protected
    * @return array
    */
    protected function getCommand() {
        $separator = "----=_Part_" . md5($this->_from . time()) . uniqid(); //分隔符
 
        $command = array(
                array("HELO sendmail\r\n", 250)
            );
        if(!empty($this->_userName)){
            $command[] = array("AUTH LOGIN\r\n", 334);
            $command[] = array($this->_userName . "\r\n", 334);
            $command[] = array($this->_password . "\r\n", 235);
        }
 
        //设置发件人
        $command[] = array("MAIL FROM: <" . $this->_from . ">\r\n", 250);
        $header = "FROM: " . $this->_name . "<" . $this->_from . ">\r\n";
 
        //设置收件人
        $command[] = array("RCPT TO: <" . $this->_to . ">\r\n", 250);
        $header .= "TO: <" . $this->_to . ">\r\n";
 
        $header .= "Subject: " . $this->_subject ."\r\n";
        $header .= "Content-Type: multipart/alternative;\r\n";
 
        //邮件头分隔符
        $header .= "\t" . 'boundary="' . $separator . '"';
 
        $header .= "\r\nMIME-Version: 1.0\r\n";
        $header .= "\r\n--" . $separator . "\r\n";
        $header .= "Content-Type:text/html; charset=utf-8\r\n";
        $header .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $header .= $this->_body . "\r\n";
        $header .= "--" . $separator . "\r\n";
 
        //结束数据
        $header .= "\r\n.\r\n";     $command[] = array("DATA\r\n", 354);
        $command[] = array($header, 250);
        $command[] = array("QUIT\r\n", 221);
        //print_r($header);
        return $command;
    }
 
    /**
    * 发送命令
    * @access protected
    * @param string $command 发送到服务器的smtp命令
    * @param int $code 期望服务器返回的响应吗
    * @return boolean
    */
    protected function sendCommand($command, $code) {
        //echo 'Send command:' . $command . ',expected code:' . $code . '<br />';
        //发送命令给服务器
        try{
            if(socket_write($this->_socket, $command, strlen($command))){
 
                //当邮件内容分多次发送时，没有$code，服务器没有返回
                if(empty($code))  {
                    return true;
                }
 
                //读取服务器返回
                $data = trim(socket_read($this->_socket, 1024));
                //echo 'response:' . $data . '<br /><br />';
 
                if($data) {
                    $pattern = "/^".$code."/";
                    if(preg_match($pattern, $data)) {
                        return true;
                    }
                    else{
                        $this->_errorMessage = "Error:" . $data . "|**| command:";
                        return false;
                    }
                }
                else{
                    $this->_errorMessage = "Error:" . socket_strerror(socket_last_error());
                    return false;
                }
            }
            else{
                $this->_errorMessage = "Error:" . socket_strerror(socket_last_error());
                return false;
            }
        }catch(Exception $e) {
            $this->_errorMessage = "Error:" . $e->getMessage();
        }
    }

	    /**
    * 发送命令
    * @access protected
    * @param string $command 发送到服务器的smtp命令
    * @param int $code 期望服务器返回的响应吗
    * @return boolean
    */
    protected function sendCommandSecurity($command, $code) {
       //$this->debug('Send command:' . $command . ',expected code:' . $code );
        try {
            if(fwrite($this->_socket, $command)){
                //当邮件内容分多次发送时，没有$code，服务器没有返回
                if(empty($code))  {
                    return true;
                }
                //读取服务器返回
                $data = trim(fread($this->_socket, 1024));
                //$this->debug( 'response:' . $data );
 
                if($data) {
                    $pattern = "/^".$code."/";
                    if(preg_match($pattern, $data)) {
                        return true;
                    }
                    else{
                        $this->_errorMessage = "Error:" . $data . "|**| command:";
                        return false;
                    }
                }
                else{
                    return false;
                }
            }
            else{
                $this->_errorMessage = "Error: " . $command . " send failed";
                return false;
            }
        }catch(Exception $e) {
            $this->_errorMessage = "Error:" . $e->getMessage();
        }
    } 
 
    /**
    * 建立到服务器的网络连接
    * @access private
    * @return boolean
    */
    private function socket() {
        if(!function_exists("socket_create")) {
            $this->_errorMessage = "Extension sockets must be enabled";
            return false;
        }
        //创建socket资源
        $this->_socket = socket_create(AF_INET, SOCK_STREAM, getprotobyname('tcp'));
        
        if(!$this->_socket) {
            $this->_errorMessage = socket_strerror(socket_last_error());
            return false;
        }
        //stream_socket_enable_crypto($this->_socket, true, STREAM_CRYPTO_METHOD_SSLv23_CLIENT);
        socket_set_block($this->_socket);//设置阻塞模式
 
        //连接服务器
        if(!socket_connect($this->_socket, $this->_sendServer, $this->_port)) {
            $this->_errorMessage = socket_strerror(socket_last_error());
            return false;
        }
        socket_read($this->_socket, 1024);
        
        return true;
    }
     /**
    * 建立到服务器的SSL网络连接
    * @access private
    * @return boolean
    */
    private function socketSecurity() {
        $remoteAddr = "tcp://" . $this->_sendServer . ":" . $this->_port;
        $this->_socket = stream_socket_client($remoteAddr, $errno, $errstr, 30);
        if(!$this->_socket){
            $this->_errorMessage = $errstr;
            return false;
        }
 
        //设置加密连接，默认是ssl，如果需要tls连接，可以查看php手册stream_socket_enable_crypto函数的解释
        stream_socket_enable_crypto($this->_socket, true, STREAM_CRYPTO_METHOD_SSLv23_CLIENT);
 
        stream_set_blocking($this->_socket, 1); //设置阻塞模式
        $str = fread($this->_socket, 1024);
        if(!strpos($str, "220")){
            $this->_errorMessage = $str;
            return false;
        }
 
        return true;
    }
 
    /**
    * 关闭socket
    * @access private
    * @return boolean
    */
    private function close() {
        if(isset($this->_socket) && is_object($this->_socket)) {
            $this->_socket->close();
            return true;
        }
        $this->_errorMessage = "No resource can to be close";
        return false;
    }

   /**
    * 关闭安全socket
    * @access private
    * @return boolean
    */
    private function closeSecutity() {
        if(isset($this->_socket) && is_object($this->_socket)) {
            stream_socket_shutdown($this->_socket, STREAM_SHUT_WR);
            return true;
        }
        $this->_errorMessage = "No resource can to be close";
        return false;
    }
}