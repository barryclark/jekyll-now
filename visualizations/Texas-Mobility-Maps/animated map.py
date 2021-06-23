# -*- coding: utf-8 -*-
"""
Created on Tue Jun  1 10:44:48 2021

@author: charlie.henry
"""
import pandas as pd
import geopandas
import matplotlib.pyplot as plt
import numpy as np

# Read in County outlines
##   Source TxDOT county boundaries detailed: 
##   https://gis-txdot.opendata.arcgis.com/datasets/8b902883539a416780440ef009b3f80f_0

Counties = geopandas.read_file('Texas_County_Boundaries.geojson',index_col='CNTY_NM')

# Read in Google mobility data
data = pd.read_csv('mobility_report_US.csv')

# Creating labels for grouping by month,year combination
data['timestamp'] = pd.to_datetime(data['date'],format='%Y-%m-%d')
data['Month'] = data['timestamp'].apply(lambda x: x.strftime('%m'))
data['Year'] = data['timestamp'].dt.year.astype(str)
data['Year-Month'] = data['Year'] + "-" + data['Month']

# Data cleaning, removing the totals and fixing some issues with merging between the datasets
data = data[data['state']=='Texas']
data = data[data['county']!='Total']
Counties['CNTY_NM'] = Counties['CNTY_NM'].replace(to_replace="De Witt", value="DeWitt")

# Grouping by month and year into a pivot table, each column in a year/month label
countyData = data.pivot_table(values = "workplaces",columns=["Year-Month"],index = "county",aggfunc=np.mean)

# Add 'County' after each name for merging between the two datasets
Counties['County'] = Counties['CNTY_NM'] + " County"

# Merge the two
Counties = Counties.merge(countyData, how='left', left_on='County',right_on='county')

# Choropleth max and min 
vmin, vmax = 0, -50

# List of labels to create plots for
list_of_months = countyData.columns

filenames = []
for month in list_of_months:
    
    fig, ax = plt.subplots(1, 1)
    
    # background is gray for counties with missing google data
    ax = Counties.plot(color='gray', edgecolor='black', linewidths = 0.5)

    fig = Counties.plot(column=month, ax=ax,cmap='Purples', figsize=(10,10), linewidth=0.5, edgecolor='black', vmin=vmin, vmax=vmax,
legend=True, norm=plt.Normalize(vmin=vmin, vmax=vmax))
    
    # remove axis of chart
    fig.axis('off')
    
    # add a title
    csfont = {'fontname':'Courier New'}
    plt.title('Workplaces % Change From Normal ' + month,**csfont)
    
    
    # this will save the figure as a high-res png in the output path. you can also save as svg if you prefer.
    chart = fig.get_figure()
    name= month
    chart.savefig(month+".png", dpi=300)
    filenames.append(month+".png")

    
# Exporting to a gif file
import imageio
images = []
for filename in filenames:
    images.append(imageio.imread(filename))
imageio.mimsave('TX Google Workplaces.gif', images,duration=0.5)




