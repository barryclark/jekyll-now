---
layout: post
permalink: /facebook-hack-night/
title: Facebook Hack Night
---

We all hope you enjoyed your first Hack Nights session! As always we'll post written versions of all the material covered, with access to github code and our presentation slides. For this first session, we learned about PHP/Hack, and then worked on building a food finder web application. 

For those of you who attended the event, we ran into some issues with the access token, and weren't able to get a fully working version of the application. For that we apologize. This is the first year we are having events at such large scales, and we are rapidly working on ways to improve our sessions. For starters we will now fully test run workshops on our Hack Board members beforehand. If you have additional suggestions, please fill out this [survey](https://goo.gl/forms/rKJlhrGjJebmBinp1), we are always open to hearing suggestions from you as well. This blog post should have the correct version of the code.

## Tools for the Job

A plain text editor is needed for this. We want to write plain text without any
formatting applied, and we want do so in a monospaced (typewriter) font to let
us vertically align code for readability.

Please download [Sublime Text](https://www.sublimetext.com/3) (or a text editor like Atom, Notepad++, etc. of
your choice).

We'll also need a web browser. Google Chrome and Safari are our recommendations to ensure that you're seeing support for the latest
and greatest.

Finally you will need to install php. If you are mac this should come pre-installed, but if you are on windows then you need to follow the following steps:

* Install [Chocolatey](https://chocolatey.org/)
* Run the following commang in your terminal: choco install php


## Source Code and Slides

Here is the link to view the [Google Slides](https://docs.google.com/presentation/d/1MhdiCN8VmXwP26rwDZWeWdQWoxDysAZv1F0j1hjIpPc/edit?usp=sharing)
<br>
Here is a link to download the [Source Code](https://github.com/AkhilNadendla/Facebook-Hack-Night)

## Introduction to PHP

Php is primarily a backend language that is extremely widely used on the internet, and is especially suited for server-side web development. It’s great for performing calculations, storing user information, and interacting with mysql databases.

Initially stood for personal home page, built by Ramus Lerdorf for managing visitors to his resume site, but nowadays is referred to as Hypertext Preprocessor.  

#### Fun Facts
* 75% of Web 2.0 sites are built in PHP. PHP is used by 81.7% of all the websites whose server-side programming language we know.
* There are about 5 million PHP developers worldwide.
* Many of the biggest online brands, such as Facebook, Wikipedia, Flickr, and Yahoo! are powered by PHP.

### First Program
Create a file called index.php

```html
<!DOCTYPE html>
<html>
<body>
	<?php
		echo "Hello UCLA!";
	?> 
</body>
</html>
```
Browser Output:
```
Hello UCLA!
```
The php tag is exactly like the script tag in html that informs the server that we are running some php code

How to test this, you can run this on local host using the following terminal command **php -S localhost:8000**, or use the following website [PHP Fiddle](http://phpfiddle.org/) to test things out in this browser application

### Set up your configuration file
Create a file called php.ini

```php
display_errors = on
display_startup_errors = on
```

The configuration file (php.ini) is read when PHP starts up. We added two fields to add debugging messages.

Let’s see what happens when we remove the ending quote from the following line

```php
echo "Hello UCLA!;
```

We should get an error output for incorrect syntax

```
Parse error: parse error, expecting `"variable (T_VARIABLE)"' or `"${ (T_DOLLAR_OPEN_CURLY_BRACES)"' or `"{$ (T_CURLY_OPEN)"' in /Users/anadendla/Documents/Hack Nights/Facebook-Hack-Night/php-intro/first-program.php on line 9
```

### Comments
Let's try some comments

```php
<?php
// Single Line Comment
# Also Single Line Comment
/* 
Multiple 
Lines comment
*/
?> 
```

Comments will not get executed by your program's compiler, and are generally for you or other developers looking at your code.


### Variables
#### Few things about variables
* Variables are used as containers to store some information

* Variables start with a dollar sign and can not begin with a number, so a variable name like $2test is not allowed

* We use echo to print statements to the screen, and these can even be html tags. The dot operator is used for string concatenation

* Variables are case insensitive meaning $test is equivalent to any of the following $Test, $tEst, $tESt, and so on.

* Variables can be strings, integers, floats, boolean, arrays, objects, and null

<br>
variables.php
```php
<?php
	$bruin = "I'm a Bruin! It's Fall ";
	echo $bruin;
	$year = 2016;
	echo $year;
	echo "<br>";
	echo $bruin.$year;
	echo "<h1>Hack Nights are awesome!</h1>";
?> 
```
Browser Output:
```
I'm a Bruin! It's Fall2016
I'm a Bruin! It's Fall2016
Hack Nights are awesome!
```

more-variables.php
```php
<?php
	$number = 25;
	echo ($number/2)."<br>"; // Can perform math computations inline
	$professor = "David Smallberg";
	echo "$professor is teaching CS 31"."<br>"; // Can insert other variables inside a string
	echo $professor. " is teaching CS 31"."<br>"; // Can append variables together using .
	$name = "Eggert";
	$n = "name";
	echo $$n; // Can double reference variables using $$
?> 
```
Browser Output:
```
12.5
David Smallberg is teaching CS 31
David Smallberg is teaching CS 31
Eggert
```

### If Else Statements
#### Few things about conditionals
* The if construct is one of the most important features of many languages, PHP included. It allows for conditional execution of code fragments. PHP features an if structure that is similar to that of C:
* if statement - executes some code if one condition is true
* if...else statement - executes some code if a condition is true and another code if that condition is false
* if...elseif....else statement - executes different codes for more than two conditions

This is the basic structure for conditionals in php
``` 
if (condition) {
    code to be executed if condition is true;
}
```
``` 
if (condition) {
    code to be executed if condition is true;
} else {
    code to be executed if condition is false;
}
```
``` 
if (condition) {
    code to be executed if condition is true;
} elseif (condition) {
    code to be executed if this condition is true;
} else {
    code to be executed if condition is false;
}
```

Here are some basic comparators in php
``` 
//Equal
$a == $b //TRUE if $a is equal to $b after type juggling.
//Identical
$a === $b //TRUE if $a is equal to $b, and they are of the same type.
//Not equal
$a != $b //TRUE if $a is not equal to $b after type juggling.
//Not identical
$a !== $b //TRUE if $a is not equal to $b, or they are not of the same type.
//Less than
$a < $b //TRUE if $a is strictly less than $b.
//Greater than
$a > $b	//TRUE if $a is strictly greater than $b.
//Less than or equal to
$a <= $b //TRUE if $a is less than or equal to $b.
//Greater than or equal to
$a >= $b //TRUE if $a is greater than or equal to $b.
//Spaceship
$a <=> $b //An integer less than, equal to, or greater than zero when $a is respectively less than, equal to, or greater than $b. Available as of PHP 7.
```

conditionals.php
```php
<?php
	$walk_from_south_to_north_campus = 15;
	if($walk_from_south_to_north_campus == 5){
		echo "Damn that was fast!"."<br>";
	}
	else if ($walk_from_south_to_north_campus == 10){ 
		echo "Right on time!"."<br>";
	}
	else { 
		echo "Late to class again!"."<br>"; 
	}
?>
```
Browser Output:
```
Late to class again!
```

more-conditionals.php
```php
<?php
	$year = 1;
	$location = "dorms";
	if($year == 1 and $location == "dorms"){
		echo "Watch out for that freshman 15"."<br>";
	}
	//The keyword and is equivalent to "&&", while the keyword or is equivalent to "||"
	$year = 3; 
	if($year == 3 or $year == 4){
		echo "You're probably living off-campus"."<br>";
	}
?>
```
Browser Output:
```
Watch out for that freshman 15
You're probably living off-campus
```

### Arrays
#### Few things about arrays
* Arrays are special types of variables that can hold multiple values, and can be created using the array() function

* Array indexes can be accessed in the following manner, with $array[0] being the first element, $array[1] being the second, and so on.

arrays.php
```php
<?php
	$ucla_dining=array("BPlate","Covel","BCafe"); // Initialize arrays like this
	print_r($ucla_dining); // print out contents of array
	echo "<br>";
	echo $ucla_dining[0]; // access element in array
	echo $ucla_dining[5]; // will not crash like other languages
	echo "<br>";
	$ucla_dorms[0]="Holly"; // another way to create arrays
	$ucla_dorms[1]="Delta Terrace";
	print_r($ucla_dorms);
?> 
```
Browser Output:
```
Array ( [0] => BPlate [1] => Covel [2] => BCafe ) 
BPlate
Array ( [0] => Holly [1] => Delta Terrace )
```


more-arrays.php
```php
<?php
	$ucla_buildings=array(
		"Library"=>"Powell",
		"Track"=>"Drake Stadium",
		"Gym"=>"Wooden",
	);
	print_r($ucla_buildings);
	$ucla_buildings["Football"] = "Rose Bowl";
	echo "<br>".count($ucla_buildings)."<br>";
	print_r($ucla_buildings);
?>
```
Browser Output:
```
Array ( [Library] => Powell [Track] => Drake Stadium [Gym] => Wooden ) 
4
Array ( [Library] => Powell [Track] => Drake Stadium [Gym] => Wooden [Football] => Rose Bowl )
```

#### Few more things about arrays
* Php naturally supports key-value pairs in arrays, where you can use a specific key to retrieve a value. For instance in the previous example $ucla_buildings[“library”] will return Powell

* You can also retrieve the size of an array using count, for instance count($ucla_buildings) should return a value of 4

### For and Foreach Loops
This is the For loop basic structure
``` 
for (init counter; test counter; increment counter) {
    code to be executed;
}
```
This is the Foreach loop basic structure

``` 
foreach ($array as $value) {
    code to be executed;
}
```

for-loops.php
```php
<?php
	for($i = 0; $i < 5; $i++){
		echo $i."<br>";
	}
	$ucla_buildings=array("Library"=>"Powell", "Track"=>"Drake Stadium", "Gym"=>"Wooden");
	foreach($ucla_buildings as $key=>$value){
		echo "Building: $key, Name: $value"."<br>";
	}
?>
```
Browser Output:
```
0
1
2
3
4
Building: Library, Name: Powell
Building: Track, Name: Drake Stadium
Building: Gym, Name: Wooden
```

### While Loops
This is the While loop basic structure
``` 
while (condition is true) {
    code to be executed;
}
```

while-loops.php
```php
<?php
	$i = 0;
	while($i < 5){
		echo $i."<br>"; $i++;
	}
	$i = 0;
	$ucla_buildings=array("Powell", "Drake Stadium", "Wooden");
	while($ucla_buildings[$i]){
		echo "Building: $i, Name: $ucla_buildings[$i]"."<br>"; $i++;
	}
?>
```
Browser Output:
```
0
1
2
3
4
Building: 0, Name: Powell
Building: 1, Name: Drake Stadium
Building: 2, Name: Wooden
```

### Get and Post Variables
This is a more advanced topic, you can get more info at [Tutorial Point](https://www.tutorialspoint.com/php/php_get_post.htm/)

#### Some important facts
* Both GET and POST create an array (e.g. array( key => value, key2 => value2, key3 => value3, ...)). This array holds key/value pairs, where keys are the names of the form controls and values are the input data from the user.

* Both GET and POST are treated as $_GET and $_POST. These are superglobals, which means that they are always accessible, regardless of scope - and you can access them from any function, class or file without having to do anything special.

* $_GET is an array of variables passed to the current script via the URL parameters.

* $_POST is an array of variables passed to the current script via the HTTP POST method.

* Information sent from a form with the GET method is visible to everyone, use for non-sensitive data

* Information sent from a form with the POST method is not visible to everyone, use for sensitive data


### Hack
This is also a more advanced topic, you can get more info by reading the [Facebook Documentation](https://docs.hhvm.com/hack/)

#### Some important facts
* Hack is a language Facebook invented to deal with scaling issues they were running into with php, it has identical syntax to php, with a few additional features: nullable types, collections, lambdas, xhp, shapes, async, and more!

* HHVM is an open-source VM designed for executing programs in both languages, and it uses a just-in-time compilation strategy to achieve superior performance while still having the flexibility of php

* It is very easy to transition from php to hack, so we will not go over the more advanced features of hack today, but feel free to explore it on your own time

## Food Finder

### What will we building
We're going to build a simple web application that looks at the facebook events you are attending and returns you the ones with free food

### What will we need to build this
* Will need the facebook sdk to authenticate users, and graph api to grab the event data
* Will need to filter events with the keyword(s) “food” or “free”
* Finally will need to display the data in a website
* Once again here is a link to download the [Source Code](https://github.com/AkhilNadendla/Facebook-Hack-Night)

### Stage 0: Setting up the Facebook App/SDK
First you must be a Facebook Developer to create apps that use the facebook sdk, so go to the following [website](https://developers.facebook.com/) to register your app, so you can use the sdk, the following are screenshots to guide your process.Skip to step 5, if you are already a registered facebook developer

Step 1:
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/php-1.png)
Press register in the top right corner, enter password, then press submit<br>

Step 2:
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/php-2.png)
Accept the policy and press next<br>

Step 3:
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/php-3.png)
Enter your phone number to confirm your account<br>

Step 4:
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/php-4.png)
If this is your first time developing for Facebook, then press create app ID, and skip to step 7.<br>

Step 5:
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/php-5.png)
Go to top right corner and press My Apps. This should give you drop down to create a new app. Then pick Website for the app type<br>

Step 6:
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/php-6.png)
Press Create new App ID<br>

Step 7:
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/php-7.png)
Enter your display name (should be unique), contact email, and category<br>

Step 8:
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/php-8.png)
Skip the quickstart in the upper right-hand corner<br>


Step 9:
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/php-9.png)
Now your app should be created, and you should end up on the dashboard. Now press the settings tab.<br>

Step 10:
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/php-10.png)
Under App Domains type in 'localhost'. Then press add platform, and choose website.<br>

Step 11:
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/php-11.png)
Finally add your site url, which should be 'http://localhost:8000/' under the newly created website section. Congrats your setup should be complete.<br>

### Stage 1: Setting up PHP Package Manager

Now let’s go to your desktop, or any place that you would like in your computer, and create a folder called food_finder

Let’s add a file called index.php and a file called php.ini.

index.php
```php
<!DOCTYPE html>
<html>
<body>
<h1>Stage 1: Setting up the project</h1>
</body>
</html>
```

php.ini
```php
display_errors = on
display_startup_errors = on
```

This is where Composer comes in. Composer is a dependency manager for PHP. Composer will manage the dependencies you require on a project by project basis. This means that Composer will pull in all the required libraries, dependencies and manage them all in one place. If things correctly installed, then a vendor folder should appear. 

To setup composer run the following terminal commands in your project directory.

```
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('SHA384', 'composer-setup.php') === 'e115a8dc7871f15d853148a7fbac7da27d6c0030b848d9b3dc09e2a0388afed865e6a3d6b3c0fad45c48e2b5fc1196ae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```
These terminal commands will do the following
* Download the installer to the current directory
* Verify the installer SHA-384 which you can also cross-check here
* Run the installer
* Remove the installer

Now let’s add a file to manage our packages
composer.json
```
{
  "require" : {
    "php": "^5.3.3 || ^7.0",
    "facebook/graph-sdk" : "~5.0"
  }
}
```

Now that we have listed the packages we want, in this case it is just php and the facebook sdk, let's use the following terminal commands to install and update our packages.

```
php composer.phar install //Use this to install dependencies
php composer.phar update //Use this to update dependencies
```

At this point your webite should look like this
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/stage1.png)

At this point your [Source Code](https://github.com/AkhilNadendla/Facebook-Hack-Night/tree/master/Food%20Finder/stage%201) should look something like this

### Stage 2: Stage 2: Setting up login 

Let’s create three new files, one called login.php that will set up the login button, one called fb-callback that will handle the authentication, and another file events.php that we will redirect to.

But let’s update index.php 
```php
<?php
    date_default_timezone_set('UTC');
    # Start the session 
    session_start();
?>
<!DOCTYPE html>
<html>
<body>

<h1>Stage 2: Setting up login authentication</h1>
<?php include 'login.php';?>
</body>
</html>
```

Create a login.php, which will display the login button and redirect all button presses to the fb-callback.php file, which we will create right after this file.

```php
 <?php
    # Autoload the required vendor files
    require_once __DIR__ . '/vendor/autoload.php';
    # Set up the app with default parameters
    $fb = new Facebook\Facebook([
      // Replace {app-id} with your app id
      'app_id' => '1005350496240851',
      // Replace {app-secret} with your app secret
      'app_secret' => 'ce763571e38e35b4e6257021149988c3',
      // Replace {graph-version} with your app secret
      'default_graph_version' => 'v2.8',
    ]);
    # Create the login helper object
    $helper = $fb->getRedirectLoginHelper();
    // we want to be able to retrieve user's email and events
    $permissions  = ['email', 'user_events'];
    // we want to redirect to callback which will set everything up
    $loginUrl = $helper->getLoginUrl('http://localhost:8000/fb-callback.php', $permissions);
    // we want to display clickable button ui
    echo '<button class="btn-transparent"><a href="' . $loginUrl . '"><img src="./img/facebook-login.png" width="300" height="75"/></a></button>';
?>
```

Now let's create a fb-callback.php file that will generate the login session, and store the access token before redirecting to the events.php file
```php
<?php
  date_default_timezone_set('UTC');
  require_once __DIR__ . '/vendor/autoload.php';
  # Start the session 
  session_start();
  # Set up the app with default parameters
  $fb = new Facebook\Facebook([
    'app_id' => '1005350496240851', // Replace {app-id} with your app id
    'app_secret' => 'ce763571e38e35b4e6257021149988c3',
    'default_graph_version' => 'v2.8',
    ]);
  # Create the login helper object
  $helper = $fb->getRedirectLoginHelper();
  # Get the access token and catch the exceptions if there are any
  try {
    $accessToken = $helper->getAccessToken();
  } catch(Facebook\Exceptions\FacebookResponseException $e) {
    // When Graph returns an error
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
  } catch(Facebook\Exceptions\FacebookSDKException $e) {
    // When validation fails or other local issues
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
  }
  # If the access token is not set, means we have errors
  if (! isset($accessToken)) {
    if ($helper->getError()) {
      header('HTTP/1.0 401 Unauthorized');
      echo "Error: " . $helper->getError() . "\n";
      echo "Error Code: " . $helper->getErrorCode() . "\n";
      echo "Error Reason: " . $helper->getErrorReason() . "\n";
      echo "Error Description: " . $helper->getErrorDescription() . "\n";
    } else {
      header('HTTP/1.0 400 Bad Request');
      echo 'Bad request';
    }
    exit;
  }
  // Now you can redirect to another page but first let's store the access token
  // in a global variable $_SESSION['facebook_access_token'] 
  // so we don't have to recompute it every request
  $_SESSION['fb_access_token'] = (string) $accessToken;
  // You can redirect them to using php function header
  // Let's redirect to the events page
  header('Location: http://localhost:8000/events.php');
?>
```

Finally let's create a mostly empty events.php file that we will land on when our authentication is done.
```php
<!DOCTYPE html>
<html>
<body>
<h1>Welcome you are logged in!</h1>
</body>
</html>
```

At this point your webite should be able to do this when you press the login button
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/stage2.png)
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/stage2b.png)

At this point your [Source Code](https://github.com/AkhilNadendla/Facebook-Hack-Night/tree/master/Food%20Finder/stage%202) should look something like this

### Stage 3: Stage 3: Setting up our profile 

Let's do a basic update of index.php
```php
<?php
    date_default_timezone_set('UTC');
    # Start the session 
    session_start();
?>
<!DOCTYPE html>
<html>
<body>
<h1>Stage 3: Setting up your user profile</h1>
<?php include 'login.php';?>
</body>
</html>
```

Next let's update events.php, by including a grab-profile.php file that we will add next, as well as by adding session information (which is needed on any page we use the facebook sdk).
```php
<?php
    date_default_timezone_set('UTC');
    # Start the session 
    session_start();
?>
<!DOCTYPE html>
<html>
<body>
<?php include 'grab-profile.php';?>
</body>
</html>
```

Finally let's add the grab-profile.php file which will do the work for grabbing all our profile information
```php
<?php
  # Autoload the required vendor files
  require_once __DIR__ . '/vendor/autoload.php';
  # Set up the app with default parameters
  $fb = new Facebook\Facebook([
    'app_id' => '1005350496240851',
    'app_secret' => 'ce763571e38e35b4e6257021149988c3',
    'default_graph_version' => 'v2.8',
  ]);
  //grab the access token from session variable before
  $fb->setDefaultAccessToken($_SESSION['fb_access_token']);
  try {
    $response = $fb->get('/me?fields=email,name,gender, age_range');
    $userNode = $response->getGraphUser();
  }catch(Facebook\Exceptions\FacebookResponseException $e) {
    // This will hit if Graph returns error
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
  } catch(Facebook\Exceptions\FacebookSDKException $e) {
    // This will hit if validation fails
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
  }
  // Print the user Details
  echo "<br><h1>Welcome, ". $userNode->getName()."!</h1><br><br>";
  $image = 'https://graph.facebook.com/'.$userNode->getId().'/picture?width=200';
  echo "<img class='img-portfolio img-responsive img-circle' src='$image'>";
  $min = $userNode->getProperty('age_range')->getProperty('min');
  $max = $userNode->getProperty('age_range')->getProperty('max');
  $gender = ucfirst($userNode->getProperty('gender'));
  if($max !== null and $min !== null){
    echo '<h3>'.$gender.' | '.$min."-".$max.' years old</h3>';
  }
  else if($max !== null){
    echo '<h3>'.$gender.' | '.$max.' years old</h3>';
  }
  else if($min !== null){
    echo '<h3>'.$gender.' | '.$min.' years old</h3>';
  }
  echo '<h3>'.$userNode->getProperty('email').'</h3>';
  echo '<br>';
?>
```
At this point your webite should be able to do this when you press the login button
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/stage3.png)
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/stage3b.png)

At this point your [Source Code](https://github.com/AkhilNadendla/Facebook-Hack-Night/tree/master/Food%20Finder/stage%203) should look something like this

### Stage 4: Grabbing the Event Data 

Let's start off again by doing a basic update of index.php
```php
<?php
    date_default_timezone_set('UTC');
    # Start the session 
    session_start();
?>
<!DOCTYPE html>
<html>
<body>
<h1>Stage 4: Setting up your event data</h1>
<?php include 'login.php';?>
</body>
</html>
```

Let's do a basic update of events.php, by including the grab-events.php file
```php
<?php
    date_default_timezone_set('UTC');
    # Start the session 
    session_start();
?>
<!DOCTYPE html>
<html>
<body>
<?php include 'grab-profile.php';?>
<?php include 'grab-events.php';?>
</body>
</html>
```

Finally let's add the grab-events.php file which will do the work for grabbing all our events information
```php
<?php
  	# Autoload the required vendor files
    require_once __DIR__ . '/vendor/autoload.php';
  	# Set up the app with default parameters
    $fb = new Facebook\Facebook([
      'app_id' => '1005350496240851',
      'app_secret' => 'ce763571e38e35b4e6257021149988c3',
      'default_graph_version' => 'v2.8',
    ]);
	$fb->setDefaultAccessToken($_SESSION['fb_access_token']);
	$request = $fb->request('GET', '/me/events');
	// Send the request to Graph
	try {
	  $response = $fb->getClient()->sendRequest($request);
	} catch(Facebook\Exceptions\FacebookResponseException $e) {
      // This will hit if Graph returns error
	  echo 'Graph returned an error: ' . $e->getMessage();
	  exit;
	} catch(Facebook\Exceptions\FacebookSDKException $e) {
      // This will hit if validation fails
	  echo 'Facebook SDK returned an error: ' . $e->getMessage();
	  exit;
	}
	$graphEdge = $response->getGraphEdge();
	// Print the event Details by looping through each one
	foreach ($graphEdge as $graphNode) {
		try {
			$description = strtolower($graphNode->getField('description'));
			if (strpos($description, 'food') === true or strpos($description, 'free')){
				$event_link = "https://www.facebook.com/events/".$graphNode->getField('id');
				$event = "Event: <a href='$event_link'><span class='acm-cerulean'>".$graphNode->getField('name')."</span></a><br>";
				$location = "Location: <span class='acm-cerulean'>".$graphNode->getField('place')->getField('name')."</span><br>";
				$start = $graphNode->getField('start_time')->format('g:i A');
				$end = $graphNode->getField('end_time')->format('g:i A');
				$time = "Time: <span class='acm-cerulean'>".$start."-".$end."</span><br>";
				$description = "Description: <span class='acm-jet'>".substr($graphNode->getField('description'), 0, 300)."...</span><br><br>";
				echo "
					<div class='col-md-6 col-md-offset-3'>
                        <div class='portfolio-item event'>
	                    	".$event."
	                    	".$location."
	                    	".$time."
	                    	".$description."
                        </div>
                    </div>
				";
			}
		}
		catch(Facebook\Exceptions\FacebookSDKException $e) {
		  continue;
		}
	}
?>
```

At this point your webite should be able to do this when you press the login button
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/stage4.png)
![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/stage4b.png)

At this point your [Source Code](https://github.com/AkhilNadendla/Facebook-Hack-Night/tree/master/Food%20Finder/stage%204) should look something like this

### Stage 5: Stage 5: Let’s add some UI

For this step we will only be updating the events.php and index.php files, and will add some styling using bootstrap. We won’t actually step through all the styling as this is a php workshop. If you want to learn more about bootstrap, check out the [Official Docs](http://getbootstrap.com/)

First let’s copy in folders css, js, font-awesome, and font from the [Github Source](https://github.com/AkhilNadendla/Facebook-Hack-Night/tree/master/Food%20Finder/stage%205). These will provide the backbone styling for our app. 

Next you want to copy index_replacement.php and events_replacement.php. These will be the styled versions of your index.php and events.php. These will work once you insert in your php includes in the following places:

Find this spot in index_replacement.php 
```html
<!-- Header -->
    <header id="top" class="header">
        <div class="text-vertical-center">
            <h1>Food Finder</h1>
            <h3>Who doesn't love a free meal?</h3>
            <br>
            <!-- login needs to be added here -->
        </div>
    </header>
```

Then update it to look like this
```html
<!-- Header -->
    <header id="top" class="header">
        <div class="text-vertical-center">
            <h1>Food Finder</h1>
            <h3>Who doesn't love a free meal?</h3>
            <br>
            <?php include 'login.php';?>
        </div>
    </header>
```

Similarily in events_replacement.php, replace the following with 
```html
	<header id="top" class="profile-header">
        <div class="text-vertical-center">
            <!-- grab profile needs to be added here -->
        </div>
    </header>

    //further down the page
    <div class="col-lg-10 col-lg-offset-1 text-center">
        <h2>Event Gallery</h2>
        <hr class="small">
        <div class="row">
        	<!-- grab events needs to be added here -->
        </div>
    </div>
```

```html
	<header id="top" class="profile-header">
        <div class="text-vertical-center">
            <?php include 'grab-profile.php';?>
        </div>
    </header>

    //further down the page
    <div class="col-lg-10 col-lg-offset-1 text-center">
        <h2>Event Gallery</h2>
        <hr class="small">
        <div class="row">
        	<?php include 'grab-events.php';?>
        </div>
    </div>
```

Congrats at this point your webite should be done, and look something like this.

![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/stage6a.png)

![_config.yml]({{ site.baseurl }}/images/hack-nights/facebook/stage6b.png)

Here is the finished [Source Code](https://github.com/AkhilNadendla/Facebook-Hack-Night/tree/master/Food%20Finder/Finished%20Product)
