<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="renderer" content="webkit">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
<title><?php echo $webtitle;?> - 安全中心</title>
<style>
body,
h1,
p {
margin: 0;
padding: 0;
}
a {
text-decoration: none;
}
button {
padding: 0;
font-family: inherit;
background: none;
border: none;
outline: none;
cursor: pointer;
}
html {
width: 100%;
height: 100%;
background-color: #eff2f5;
}
body {
padding-top: 100px;
color: #222;
font-size: 13px;
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
line-height: 1.5;
-webkit-tap-highlight-color: rgba(0,0,0,0);
}
@media (max-width: 620px) {
body {
font-size: 15px;
}
}
.button {
display: inline-block;
padding: 10px 16px;
color: #fff;
font-size: 14px;
line-height: 1;
background-color: #0077d9;
border-radius: 3px;
}
@media (max-width: 620px) {
.button {
font-size: 16px;
}
}
.button:hover {
background-color: #0070cd;
}
.button:active {
background-color: #0077d9;
}
.link-button {
color: #105cb6;
font-size: 13px;
}
@media (max-width: 620px) {
.link-button {
font-size: 15px;
}
}
.logo,
.wrapper {
margin: auto;
padding-left: 30px;
padding-right: 30px;
max-width: 540px;
}
.wrapper {
padding-top: 25px;
padding-bottom: 25px;
background-color: #f7f7f7;
border: 1px solid #babbbc;
border-radius: 5px;
}
@media (max-width: 620px) {
.logo,
.wrapper {
margin: 0 10px;
}
}
h1 {
margin-bottom: 12px;
font-size: 16px;
font-weight: 700;
line-height: 1;
}
@media (max-width: 620px) {
h1 {
font-size: 18px;
}
}
.warning {
color: #c33;
}
.link {
margin-top: 12px;
word-wrap: normal;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
cursor: pointer;
}
.link.is-expanded {
word-wrap: break-word;
white-space: normal;
}
.actions {
margin-top: 15px;
padding-top: 30px;
text-align: right;
border-top: 1px solid #d8d8d8;
}
.actions .link-button + .link-button {
margin-left: 30px;
}
</style>
</head>
<body>
<div class="wrapper">
<div class="content">
<h1>即将离开<?php echo $webtitle;?></h1>
<p class="info">您即将离开<?php echo $webtitle;?>，请注意您的帐号和财产安全。</p>
<p class="link"><?php echo $s;?></p>
</div>
<div class="actions">
<a class="button" href="<?php echo $s;?>">继续访问</a>
</div>
</div> 
</body>
</html>