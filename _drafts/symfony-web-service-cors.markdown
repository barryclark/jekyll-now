#### Cross-Origin Resource Sharing

It is also important to mention that there was an extra difficulty added to this project: the Web Service needs to support [Cross-Origin Resource Sharing](http://www.w3.org/TR/cors/) (CORS) requests, which are sent from the different iPads.

CORS support could be a little bit tricky because it requires some additional coordination between both the server and client. We will explain how to build up CORS Requests and Responses once we start building them in the [upcoming articles of this series](http://miriamtocino.com/articles/symfony-web-service-introduction/#upcoming-articles-in-the-symfony-web-service-series), but if you are new to this topic and feel like reading more about it, the tutorial [Using CORS](http://www.html5rocks.com/en/tutorials/cors/) by [Monsur Hossain](https://twitter.com/monsur) was the best I found online. If you want to have a global overview of CORS workflow, you can check out this [image](http://www.html5rocks.com/static/images/cors_server_flowchart.png).

I will be using the [Nelmio CORS Bundle](https://github.com/nelmio/NelmioCorsBundle) for Symfony, which allows you to send Cross-Origin Resource Sharing headers with ACL-style per-url configuration.

_You can check [here](http://caniuse.com/#search=cors) a complete list of the browsers that support CORS._

- - -

#### Useful Resources

* [Using CORS - HTML5 ROCKS](http://www.html5rocks.com/en/tutorials/cors/)
* [CORS Server Flow Chart - HTML5 ROCKS](http://www.html5rocks.com/static/images/cors_server_flowchart.png)