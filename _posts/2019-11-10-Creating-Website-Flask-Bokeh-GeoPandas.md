---
layout: post
title: Tutorial
---

{% include plot.html %}

## 3. How to put a Bokeh plot into a website?

We have a running plot in Bokeh. Dynamic or static, complex or simple, it does not matter the process will be the same. It does not even need to be a Bokeh plot. However, before making a website, given that you have many options, you first need to evaluate your needs.
1. You can create a webpage with only your plot. If you go into the "templates" folder, you will find all the dynamic plots we have created saved with a HTML format file extension.
	+ Your plot will be standing alone
	+ Your website will not run in Python 
	+ You just need in your current website to make a redirection to the plot when you want your reader to read it.
2. You can create a webpage where your plot is surrounded by text and other plots. We will be using Flask to do this.
	+ Flask is very simple to set up
	+ Your website will use Python
	+ You can set up an authentication system (flask-login)

In the previous section, we already saw how to save the dynamic plot as an HTML file. Therefore, we are now only going to work on point 2. Let's s use Flask. I hope you will be as amazed as I was to notice how easy it is to make a website with Flask.

How does Flask work ? You still need an HTML page. However Flask is going to convert for you the plot into HTML and JS. One additional interest of Flask is that you can develop your website with Python but also with HTML, CSS and JS. It is pretty convenient for designing the website. Here is the [link](https://www.freecodecamp.org/news/how-to-build-a-web-application-using-flask-and-deploy-it-to-the-cloud-3551c985e492/) of a simple tutorial made by Flask developers.

We are going to create :
+ `app.py` that will have the python script inserting our plot
+ `base.html` in the templates repository that will contain our website.

You can also see the desired structure in the [project GitHub](https://github.com/YannFra/Website-Flask-Bokeh-Geopandas).

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<link rel="stylesheet" href="{% raw %}{{url_for('static', filename='css/main.css')}}{% endraw %}">
	<script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
	<script src="{% raw %}{{ url_for('static', filename='js/main.js')}}{% endraw %}"></script>
	{% raw %}{{ js_resources | safe}}{% endraw %}
	{% raw %}{{ css_resources | safe}}{% endraw %}
</head>
<body>
{% raw %}{{ script | safe }}{% endraw %}
{% raw %}{{ div | safe }}{% endraw %}
</body>
</html>
{% endhighlight %}




What you see in {{}} is what Flask is going to give to the HTML file to display the plot.

{% highlight python %}
from flask import Flask

#Application that is running the website
app = Flask(__name__)

@app.route("/")
def index():
    
    #Downloading the datasets
    import geopandas as gpd
    
    db_bike_path="data/geo_export_0ff3043a-1833-476b-afe0-779dfa091ebd.shp"
    db_bike=gpd.read_file(db_bike_path)
    
    db_roads_path="data/tl_2017_06075_roads.shp"
    db_roads=gpd.read_file(db_roads_path)
    
    
    #Plotting the bike lanes and the streets
    from bokeh.plotting import figure
    from bokeh.models import GeoJSONDataSource
    from bokeh.embed import components
    from bokeh.resources import INLINE
    from flask import render_template

    SF = figure(aspect_scale=1, match_aspect=True)
    
    db_roads_json=GeoJSONDataSource(geojson = db_roads.to_json())
    SF.multi_line('xs', 'ys', source=db_roads_json,
        color="gray", line_width=0.5,legend="All streets")
    
    db_bike_json=GeoJSONDataSource(geojson = db_bike.to_json())
    SF.multi_line('xs', 'ys', source=db_bike_json,
        color="red", line_width=1.5,legend="Bike Lanes")
    
    SF.legend.click_policy="hide"
    
    
    #Convert the plot into HTML and JS that can be read by base.html
    script_plot,div_plot=components(SF ,INLINE)
    
    return render_template('plot.html',
                       script=script_plot,
                       div=div_plot,
                       js_resources=INLINE.render_js(),
                       css_resources=INLINE.render_css())


#Make the website work when we run this python file
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)
{% endhighlight %}

With his method, your website is now running in local. It might be enough for your need. In case it is not, here are two different tutorials to make your website global:
+  [Here](https://www.freecodecamp.org/news/how-to-build-a-web-application-using-flask-and-deploy-it-to-the-cloud-3551c985e492/) is the tutorial done by Flask developer to make a website and then upload it to the cloud using [Google App Engine](https://cloud.google.com/appengine/).
+ [Here](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-gunicorn-and-nginx-on-ubuntu-16-04) is a great tutorial done by Digital Ocean helping you put on the cloud your website on [AWS](https://aws.amazon.com).

Unless you have a special reason I would recommend following Flask developers tutorial to upload your website to the cloud. It will be much simpler.

Hope this tutorial was helpful and will help your personal projects !


