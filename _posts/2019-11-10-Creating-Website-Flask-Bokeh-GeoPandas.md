---
layout: post
title: How to create an interactive plot and insert it in a website. All in Python (Flask-Bokeh-GeoPandas)
---

You have a dataset. How do you plot this dataset into a website? Well guess what, here again Python can do all of that. From opening the dataset to creating a webpage including the interactive plot you did, there is nothing Python cannot do! 

This tutorial/example will go through all the steps required to go from the dataset to inserting your dynamic plot in a webpage. We will be plotting the bikeways in San Francisco over the city’s streets. The questions this example answers are:
1.	How do you open and plot a geospatial database ? We will use GeoPandas to open a shapefile db (.shp).
2.	How do you make this plot interact with the user ? We will use Bokeh to create the interactive plot.
3.	How do you create a webpage including this plot ? We will use Flask to do so. 

A lot of tutorials show how to do each of these parts independently. The goal of this tutorial is to include all of them into one example on the Bike Lanes network in San Francisco. The Python code used can be found in this [GitHub](https://github.com/YannFra/Website-Flask-Bokeh-Geopandas) and the explanations in this [tutorial](https://yannfra.github.io/Creating-Website-Flask-Bokeh-GeoPandas/). Please contact me if you encounter any issue. 

Python libraries used in this tutorial: [Bokeh](https://docs.bokeh.org/en/latest/),[Flask](https://www.fullstackpython.com/flask.html), and [GeoPandas](http://geopandas.org)

Our example will be on the bike network in San Francisco. Where are the bike lanes in San Francisco ? Is there enough of them to commute in bike ? We will create a plot that superimposes the bike lanes network to the street network in San Francisco. Then we will allow the user to zoom this plot and to hide/show the desired networks. 

This work was possible thanks to :
+ [DataSF](https://datasf.org) that has a lot of Open Access datasets. We used the one they give on the [bike lanes in San Francisco](https://data.sfgov.org/Transportation/SFMTA-Bikeway-Network/ygmz-vaxd).
+ [Data.gov](https://www.data.gov) that also has a lot of open Access datasets. We used the one they give on the [streets in San Francisco](https://catalog.data.gov/dataset/tiger-line-shapefile-2017-county-san-francisco-county-ca-all-roads-county-based-shapefile)



## 0. Downloading the datasets

Create a "data" folder for the datasets and a "templates" for the plots we are going to create.

Do not forget to download and unzip the datasets in "data":
+ The Bike Lanes in San Francisco dataset from [DataSF](https://data.sfgov.org/Transportation/SFMTA-Bikeway-Network/ygmz-vaxd).
+ The Streets in San Francisco dataset from [Data.gov](https://catalog.data.gov/dataset/tiger-line-shapefile-2017-county-san-francisco-county-ca-all-roads-county-based-shapefile)

Instead of doing all this, you can run `upload_dataset`, a code doing all of that for you.

To be sure we are using the same libraries versions, please download the `requirements.txt` file in the [GitHub](https://github.com/YannFra/Website-Flask-Bokeh-Geopandas) and run `pip install -r requirements.txt` in your terminal.


{% highlight python %}
import upload_dataset
{% endhighlight %}
    

## 1. How to plot shapefile databases (.shp) using GeoPandas?

{% highlight python %}
#Uploading the shapefiles
import geopandas as gpd

db_bike_path="data/geo_export_0ff3043a-1833-476b-afe0-779dfa091ebd.shp"
db_bike=gpd.read_file(db_bike_path)

db_roads_path="data/tl_2017_06075_roads.shp"
db_roads=gpd.read_file(db_roads_path)

db_bike.columns,db_roads.columns
{% endhighlight%}


>(Index(['barrier', 'biap', 'buffered', 'cnn', 'contraflow', 'created_da',
>		'created_us', 'dir', 'direct', 'double', 'facility_t', 'from_st', 'fy',
>		'globalid', 'greenwave', 'install_mo', 'install_yr', 'last_edite',
>		'length', 'notes', 'number_', 'qtr', 'raised', 'sharrow', 'sm_sweeper',
>		'street_', 'streetname', 'surface_tr', 'symbology', 'to_st',
>		'update_mo', 'update_yr', 'geometry'],
>	   dtype='object'),
> Index(['LINEARID', 'FULLNAME', 'RTTYP', 'MTFCC', 'geometry'], dtype='object'))



`read_file` reads any .shp file without any problem. The column having the geospatial information needs to be called `geometry`. Thic convention is respected but remember to check it if you get an error message stating that the column `geometry` is missing. 
You can see in the code's output above that our shapefiles respect the conventions.

{% highlight python %}
#Plotting the databases
import matplotlib.pyplot as plt

fig, ax = plt.subplots(1, 1,figsize=(10,10))

db_roads.plot(ax=ax,color="gray")
db_bike.plot(ax=ax,color="red")

plt.axis('equal')
plt.axis('off')
plt.show()
{% endhighlight %}

{:refdef: style="text-align: center;"}
![GeoPandas plot]({{ site.baseurl }}/images/SF_plot_gpd.jpg )
{: refdef}

As you can see, a few lines of code are enough to read and plot a shapefile database without breaking any sweat. The rest is just knowing how to use Matplotlib.

Now let’s consider you want the user being able to zoom the graph or to hide/show the "Bike Lanes" at any time. In that case, GeoPandas will not be enough as you can only create static plot with it. Don’t worry, there is an alternative. Let’s use Bokeh!

## How to make an interactive plot using Bokeh?

Bokeh is a very interesting Python library you can do a lot of stuff with. I advise to take a look at [Bokeh's gallery](http://docs.bokeh.org/en/1.3.2/docs/gallery.html) and look at all their fancy examples. Bokeh advantages are:

+ handling the JavaScript part of the plot that makes it interactive with some lines of code in Python
+ connecting sliders, buttons, and many others objects that can change your plot when the user plays with them
+ beautiful default design settings

First, let’s plot with Bokeh the same plot as before.

To do so, we first need to know what kind of spatial element we are plotting. 
+ `Point`(or `Multi-Points`) can be plotted with `.circle`
+ `Line`(or `Multi-Lines`) can be plotted with `.multi_line`
+ `Polygon`(or `Multi-Polygons`) can be plotted with `.patch`

As it can be seen bellow, in the two databases, we are working with `Line`(or `Multi-Lines`). Therefore, we will be using `.multi_line` to plot our database. For more details, the best is to look at the tutorial made on the plotting topic by [Bokeh](https://docs.bokeh.org/en/latest/docs/reference/plotting.html) and/or by [GeoPandas](https://automating-gis-processes.github.io/2016/Lesson5-interactive-map-bokeh.html)


{% highlight python %}
db_bike.geometry.type.unique(),db_roads.geometry.type.unique()
{% endhighlight %}

>(array(['LineString'], dtype=object), array(['LineString'], dtype=object))




{% highlight python %}
#Libraries for Dynamic Vizualisation
from bokeh.plotting import figure
from bokeh.io import output_file,show,output_notebook
from bokeh.models import GeoJSONDataSource

#To display in the notebook your Bokeh Plot
output_notebook()

#SF, San Francisco, will be the figure containing the plots.
SF = figure(aspect_scale=1, match_aspect=True)

#Bokeh can only plot json db
#GeoJSONDataSource tsakes care of the conversion
db_roads_json=GeoJSONDataSource(geojson = db_roads.to_json())
multi_line_all=SF.multi_line('xs', 'ys', source=db_roads_json,
    color="gray", line_width=0.5,legend="All streets")

db_bike_json=GeoJSONDataSource(geojson = db_bike.to_json())
multi_line_bike=SF.multi_line('xs', 'ys', source=db_bike_json,
    color="red", line_width=1.5,legend="Bike Lanes")

#Hide axis and grid
SF.axis.visible=False
SF.xgrid.visible = False
SF.ygrid.visible = False

show(SF)
#enables you to save a stand alone plot as a html page
output_file("templates/SF_plot.html")
{% endhighlight %}



{% include SF_plot.html %}





As you can see, we have recreated the same plot as the one done with GeoPandas and Matplotlib. We have actually a bit cheated. You can see, in the top right, icons. Those icons are coming by default with your Bokeh plot and can be removed. Each icon has a built-in function associated. E.g. The second and third one from the top are for different kinds of zooms.You can only use an icon at a time. Try them out !

Let's now create two checkboxes with `CheckboxGroup`. One for "Bike Lanes" and one for "All strets". We want them to hide/show the associated curve when the user click on them.


{% highlight python %}
from bokeh.models.widgets import CheckboxGroup
from bokeh.layouts import  row

checkbox_choices = CheckboxGroup(labels=["All streets", "Bike Lanes"], 
    active=[i for i in range(2)])

layout=row(SF,checkbox_choices)

show(layout)
output_file("templates/SF_plot_widgets.html")
{% endhighlight python %}







The checkboxes are currently standing alone and clicking on them will do nothing.

You could connect the checkboxes with a code in Python and Bokeh would take care of the conversion of this code into JavaScript. That sounds perfect. Unfortunately, this conversion requires having a Bokeh server running alongside your plot which is everything but convenient. Do not worry, Bokeh developers are really smart and they allow you to put in your code pieces of JavaScript that will take care of the connection between the checkboxes and the plot. This is what we are going to do. As a non JavaScript lover, I can promise you that the JS part will be very small and simple. However your JS code will depend of your project and the number of widgets you want to connect to your plot.

Creating the plot ineractivity requires:
+ a dictionary with all the elements included in the interactivity. Here it will be our two `multi_line` and our checkboxes. 
+ a JS code monitoring the interactivity. Whenever you call the elements in the interactivity use the same names as the one given in the dictionary
+ make a callback on the objects that will be clicked by the user with the dictionnary and the JS code.


{% highlight python %}
from bokeh.models import CustomJS

update_elements=dict(curves=[multi_line_all,multi_line_bike],
    check=checkbox_choices)

updatingJS="""
    var coefs=check.active;
    
    for (var i = 0; i<= coefs.length; i++){
        console.log(coefs.includes(i))
        if (coefs.includes(i)){
            curves[i].visible=true;
        }
        else{
            curves[i].visible=false;
        }
    }    
"""
checkbox_choices.callback=CustomJS(args=update_elements,code=updatingJS)

layout=row(SF,checkbox_choices)

show(layout)
output_file("templates/SF_plot_widgets_connected.html")
{% endhighlight %}

{% include SF_plot_total.html %}







Here we are. We have a dynamic plot. The user can decide what plot to see and can also zoom to some specific neighbors of San Francsico.

These checkboxes were actually an excuse to show you how everything works for your own project. In case you are interested into hiding/showing a plot at will, Bokeh already has a function in Python that can do this. 
Thank you Bokeh ! 

In the interactive plot just above, click on `bikeways` or `streets` in the legend to hide/show the associated plot in the figure.
In case you are interested in this functionality, bellow is a code without the checkboxes.


{% highlight python %}
#Libraries for Dynamic Vizualisation
from bokeh.plotting import figure
from bokeh.io import output_file,show
from bokeh.models import GeoJSONDataSource


SF = figure(aspect_scale=1, match_aspect=True)

db_roads_json=GeoJSONDataSource(geojson = db_roads.to_json())
multi_line_all=SF.multi_line('xs', 'ys', source=db_roads_json,
    color="gray", line_width=0.5,legend="All streets")

db_bike_json=GeoJSONDataSource(geojson = db_bike.to_json())
multi_line_bike=SF.multi_line('xs', 'ys', source=db_bike_json,
    color="red", line_width=1.5,legend="Bike Lanes")

SF.legend.click_policy="hide"

#Hide axis and grid
SF.axis.visible=False
SF.xgrid.visible = False
SF.ygrid.visible = False

show(SF)
output_file("templates/SF_plot_legend.html")
{% endhighlight %}




Now that are in possession of this interactive plot, let’s make it available to the users in a website.


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




What you see in brackets is what Flask is going to give to the HTML file to display the plot.

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

Now that you have created these two files, double click on `app.py`. You will see this following window.
Everything is normal. Go now to [http://localhost:8000](http://localhost:8000). You will see your website. 

{:refdef: style="text-align: center;"}
![Website Python Terminal]({{ site.baseurl }}/images/running_website.png )
{: refdef}

However, with this method, your website is running locally, i.e. only on tyour computer.
It might be enough for your need. In case it is not, here are two different tutorials to make your website global:
+  [Here](https://www.freecodecamp.org/news/how-to-build-a-web-application-using-flask-and-deploy-it-to-the-cloud-3551c985e492/) is the tutorial done by Flask developer to make a website and then upload it to the cloud using [Google App Engine](https://cloud.google.com/appengine/).
+ [Here](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-gunicorn-and-nginx-on-ubuntu-16-04) is a great tutorial done by Digital Ocean helping you put on the cloud your website on [AWS](https://aws.amazon.com).

Unless you have a special reason I would recommend following Flask developers tutorial to upload your website to the cloud. It will be much simpler.

Hope this tutorial was helpful and will help your personal projects !


