---
layout: post
title: Ruby and me [part 1]
date: '2014-02-25 17:00:00'
---

This might be a long story cut in pieces since I have been trying to learn ruby on my own by doing some research as well as doing some projects since I don't want to just forget how to code since in many occasions has saved my life on doing several things.

In this occasion, I have been doing some coding in PHP to facilitate my work, which in the case was to perform the following:

**Automated Monthly Reports**

Why? well in my current position there are several requirements that we need to provide the client on a monthly basis and in some cases weekly basis. In my case its monthly so we are not so bad, but in any case; this process of creating the monthly report includes but not limited to:

1. Log in into 5 web applications
2. Grab / grep information from those 5 web sites
3. Download the information and perform some math around it
4. Do some graphing in Excel, in others copy and paste it.
5. Select items (application servers) from each web application, in other word select the item to compute the information from and get the appropiate values
6. Download the graphs and values
7. Log out

In many of this cases, getting the information from each web application can take some time, since the data center where the information relies can change from one year to the other or if the server outgrew the current farm or the application servers for the client changed. So in any case, the information that you **know** where to go, it can quickly become obsolete.

So looking at this opportunity, found some nifty tricks using [curl][1], which i knew nothing about but there is something nice in learning new things that maybe can facilitate your life. 

After reading and learning a bit more, I switch hats and became a developer once again with the basic information that I knew of [php][2] and did some awful work using some bad coding practices, which later were refined.

The end product was not nice, neither was secure, but got the job done.

Here you can see that I used sessions variables:
<pre class="language-php">//systems
$_SESSION['url'] = $systems['up_url1'];
$_SESSION['app_ip'] = $systems['app_ip'];
$_SESSION['db_ip'] = $systems['db_ip'];
$_SESSION['vip'] = $systems['vip'];
$_SESSION['truesight_server'] = $systems['ts_url'];
$_SESSION['ts_watchpoint_id'] = $systems['ts_watchpoint_id'];
$_SESSION['up_url'] = $systems['up_url1'];
$entity_array = explode(",", $systems['up_entity_ids1'] );
//clients
$_SESSION['client_id'] = $clients['client_id'];
$_SESSION['product_id'] = $clients['product_id'];
$_SESSION['type'] = $clients['client_id'];
$_SESSION['name'] = $clients['client_id'];
//users
$_SESSION['username'] = $users['username'];
$_SESSION['password'] = $users['password_1'];
$_SESSION['encoded_pw'] = $users['password_2'];
</pre>
And I tried to learn a bit of MVC, so I created classes at least of each system that it was being engaged:
<pre class="language-php"><code>$is = new Insight();
$is_files = $is->run();
</code></pre>
In the class per se, you can see how not safe I was doing it:
<pre class="language-php"><code>class Insight{
	function run(){
		//get variables
		$client_id = $_SESSION['client_id'];
		$product_id = $_SESSION['product_id'];
		$database_ip = $_SESSION['db_ip'];
		$application_ip = $_SESSION['app_ip'];
		$month = $_SESSION['month'];
</code></pre>	
Then the obvious thing to do, is build the variables and paths that you need:
<pre class="language-bash">$url_total_logins = 'https://***/cgi-bin/AM/graphs/graph_usage.g1.php?ip='.$database_ip.'&type=TOTALLOGINS&clientid='.$client_id;

$url_percentile_graph	= 'https://***/cgi-bin/AM/bw/95_usage_g_vip_test.php?cid='.$client_id.'&bw_year_month=20110&vip_year_month=201101';
$cookieFileName = "cookies/insight_cookie-".$client_id."-".$month.".txt";
$file_95_usage_vip = "report/".$client_id."_img_95_usage_g_vip_".$month.".png";
$file_total_logins_vip = "report/".$client_id."_img_total_logins_".$month.".png";

//set variables for file

$base_url = 'https://***/cgi-bin/AM/download_stats';
//this files contains all the statistics for given month
$file_complete = $base_url.'.php?clientid='.$client_id.'&ip='.$database_ip;
$file_fileSystemUsage  = $base_url.'.php?clientid='.$client_id.'&ip='.$application_ip.'&mount=/usr/local/blackboard&type=FS_USAGE';
$file_databaseUsage  = $base_url.'.php?clientid='.$client_id.'&ip='.$database_ip.'&mount=/usr/local/blackboard/cms&type=DBFS_USAGE';
$file_totalLogins  = $base_url.'1.php?clientid='.$client_id.'&ip='.$database_ip.'&type=TOTALLOGINS';
</code></pre>
But then the funny part was using the DRY (Don't Repeat Yourself) way of thinking, i also created the class of *CURL*, that I called SC, and executed something like this:
<pre class="language-php"><code>//create class of SC (session curl)
$sc = new SC();
//execution 1.1 - get images
$sc->download($url_total_logins, $cookieFileName, $file_total_logins_vip);
$sc->download($url_percentile_graph, $cookieFileName, $file_95_usage_vip);
</code></pre>
Fairly simple right?
Well the complicated part was to identify the common stuff and different patterns that the urls were using so getting the images and information was kind of funky.

For documentation purposes the entire CURL class is below:
<script src="https://gist.github.com/enriquemanuel/19f4782a6d4afc238745.js"></script>

Fairly straight forward putting cookies, following information and doing the correct paths or downloading the image or file for that matter.

As mentioned before, this was just a proof of concept that it worked, now that I have been working with Ruby, its just quite different.

###The different story.
Learning Ruby to do all of this has definetely become a challenge, and I don't know if at this time I have met an Engineer that does not like one. I reading a bit and coding some more (things that I will be documenting later), but for know some references.

The few things a long the way that I have found interesting and need to use are:

* [CURB][3]
* [Nokogiri][4] - at first i read it wrong and thought of "NokoGirl" -- small dumb joke

Those two tools will definetely make my life easier since now I can scrape pages and read the information in a more comprehensive manner. Part two will show you where I stand... shortly.

[1]: http://curl.haxx.se/  "Curl Documentation"
[2]: http://php.net "Php Documentation"
[3]: https://github.com/taf2/curb "CURL for Ruby"
[4]: http://nokogiri.org/ "Web Scrapping"