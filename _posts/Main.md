
Cell downloading the databases used for this example.

Open `upload_dataset` in `python_code_used` for more details


```python
import python_code_used.upload_dataset
```

    Bike Network Db file already downloaded
    Streets SF Db file already downloaded
    


```python
import geopandas as gpd

db_bike_path="data/geo_export_0ff3043a-1833-476b-afe0-779dfa091ebd.shp"
db_bike=gpd.read_file(db_bike_path)


db_roads_path="data/tl_2017_06075_roads.shp"
db_roads=gpd.read_file(db_roads_path)

```


```python
#Libraries for Dynamic Vizualisation
from bokeh.plotting import figure
from bokeh.io import output_file,show,output_notebook
from bokeh.layouts import  row, column, layout
from bokeh.models.widgets import CheckboxGroup
from bokeh.models import CustomJS
from bokeh.models import GeoJSONDataSource
output_notebook()

SF = figure(aspect_scale=1, match_aspect=True,sizing_mode='scale_height')
SF.xaxis.axis_label='Longitude'
SF.yaxis.axis_label='Latitude'

db_roads_json=GeoJSONDataSource(geojson = db_roads.to_json())
multi_line_all=SF.multi_line('xs', 'ys', source=db_roads_json,
    color="gray", line_width=0.5,legend="All streets")

db_bike_json=GeoJSONDataSource(geojson = db_bike.to_json())
multi_line_bike=SF.multi_line('xs', 'ys', source=db_bike_json,
    color="red", line_width=1.5,legend="Bike Lanes")

checkbox_choices = CheckboxGroup(labels=["All streets", "Bike Lanes"], 
    active=[i for i in range(2)])

SF.legend.location = "top_left"
SF.legend.click_policy="hide"

#output_file("foo.html")


updatingRequiredParameters=dict(curves=[multi_line_all,multi_line_bike],
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
checkbox_choices.callback=CustomJS(args=updatingRequiredParameters,code=updatingJS)


layout=row(SF,checkbox_choices)

show(layout)
```



    <div class="bk-root">
        <a href="https://bokeh.pydata.org" target="_blank" class="bk-logo bk-logo-small bk-logo-notebook"></a>
        <span id="1708">Loading BokehJS ...</span>
    </div>











  <div class="bk-root" id="05527a8b-d8b9-4c69-9a26-9529add5138c" data-root-id="1774"></div>




