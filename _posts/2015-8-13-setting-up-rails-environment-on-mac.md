---
layout: post
title: Seting up Rails development environment on Mac
---

![My helpful screenshot]({{ site.url }}/images/RubyOnRails.png)
Let's begin the Ruby on Rails development environment setup on Mac OS X 10.10 Yosemite !!! This will take about 30 minutes.

First we need to install Homebrew , it allows us to install & compile software packages easily from the source.
<br><b>Open the terminal and run the following command:</b></br>
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 

Now we have Homebrew installed so we can start with Ruby installation. To manage Ruby versions we will be using <b>rbnev</b> and will run all the commands through terminals.
<br><b>Run the following commands in your Terminal:</b></br>
brew install rbenv ruby-build

<b>Add rbenv to bash so that it loads every time you open a terminal</b>
<br>echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
source ~/.bash_profile</br>

<b>Install Ruby</b>
<br>rbenv install 2.2.2</br>
rbenv global 2.2.2
ruby -v</br>



Congrats finally Ruby is installed on your Mac.Now let us start installing Rails.
<b>Its very easy to install Rails...Just type the following commands in your terminal:</b>
<br>gem install rails -v 4.2.3</br>

<b>We can verify Rails is installed by typing the following command:</b>
<br>rails -v</br>


After install Ruby and Rails framework lets start with setting up a Database. Rails default database is sqlite3 , but the problem is that heroku doesn't allows us to deploy the application if the application is made entirely on sqlite3. So we can use MySQL or PostgreSQL.

<b>Let's start with the PostgreSQL setup.</b>
<br>brew install postgresql</br>
Once the action based on this command is completed then follow the instructions and run them.
By default the postgresql user is your current OS X username with no password. So use your username to login to postgresql .

<b>Now you for those who want to use MySQL Databse , follow these instructions: </b>
<br>brew install mysql</br>
The user of mysql is <i>root</i> with no password.


Finally we have completed all the basic steps now lets create a demo application and lets call this application "demoapp". 
<br><b>So follow these simple steps : </b></br>
rails new demoapp

rails new demoapp -d postgresql *if you want to use PostgreSQL as your database*
                                 or
rails new demoapp -d mysql *if you want to use MySQL as your database*

<br><b>Now move into the application directory</b></br>
cd demoapp

<b>If you have setup PostgreSQL or MySQL with a username/password , don't forget to make changes into config/database.yml file , its very important !!!</b>

<br><b>Now create the database</b></br>
rake db:create

<b>Finally run the rails local server to check that your application is up and running </b>
rails server

<i>Visit http://localhost:3000 to view your new and first rails web application. If you received an error that said Access denied for user 'root'@'localhost' (using password: NO) then you need to update your config/database.yml file to match the database username and password.</i>

Bonjour !!! If you have any doubts do ask me or comment here,  i'll try to answer them as quickly as possible :)
