#### Working with Guzzle

I discovered how to work with [Guzzle](http://guzzle3.readthedocs.org/) in [this tutorial](http://knpuniversity.com/screencast/rest) and fell in love with it. A simple library for making HTTP requests and receiving responses, very useful for quick testing purposes.

To include Guzzle in your Symfony project go to the terminal and run:

{% highlight bash %}
$ composer require guzzle/guzzle ~3.7
{% endhighlight %}

For this project I worked with a **testing.php** file located under the root of my project, which looked like this:

{% highlight php startinline %}
// testing.php

require __DIR__.'/vendor/autoload.php';

use Guzzle\Http\Client;

// create our http client (Guzzle)
$client = new Client('http://elearning-dashboard.dev', array(
    'request.options' => array(
        'exceptions' => false,
    )
));

// Let's go deep into business!

$username = 'wonderful-user';
$data = array(
    'username' => $username,
    'logs' => array(
        array(
            "logged_at" => "2014-01-01 00:00:00",
            "status" => "1",
            "module_name" => "wonderful-module",
            "module_id" => 1
        )
    )
);

echo '1) POST Create a log resource';
echo "\n\n";

$request = $client->post('/webservice/{app_id}/logs', null, json_encode($data));
$response = $request->send();

echo $response;
echo "\n\n";

echo '2) GET a user resource';
echo "\n\n";

$userUrl = $response->getHeader('Location');

$request = $client->get($userUrl);
$response = $request->send();

echo $response;
echo "\n\n";

// ...
{% endhighlight %}