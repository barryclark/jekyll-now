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

Counties = geopandas.read_file(
    "https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json"
)

# Read in Google mobility data
data = pd.read_csv(
    "https://www.gstatic.com/covid19/mobility/Global_Mobility_Report.csv"
)

data = data[data["country_region_code"] == "US"]

# Creating labels for grouping by month,year combination
data["timestamp"] = pd.to_datetime(data["date"], format="%Y-%m-%d")
data["Month"] = data["timestamp"].apply(lambda x: x.strftime("%m"))
data["Year"] = data["timestamp"].dt.year.astype(str)
data["Year-Month"] = data["Year"] + "-" + data["Month"]

# Data cleaning, removing the totals and fixing some issues with merging between the datasets
data = data.dropna(subset=["census_fips_code"])
data["census_fips_code"] = data["census_fips_code"].astype(int)

Counties["id"] = Counties["id"].astype(int)

# Grouping by month and year into a pivot table, each column in a year/month label
countyData = data.pivot_table(
    values="workplaces_percent_change_from_baseline",
    columns=["Year-Month"],
    index="census_fips_code",
    aggfunc=np.mean,
)

# Merge the two
Counties = Counties.merge(
    countyData, how="left", left_on="id", right_on="census_fips_code"
)

# Choropleth max and min
vmin, vmax = 0, -50

# List of labels to create plots for
list_of_months = countyData.columns

states_to_remove = [2, 15, 60, 66, 69, 72, 78]
Counties["STATE"] = Counties["STATE"].astype(int)

Counties = Counties[~Counties.STATE.isin(states_to_remove)]

filenames = []
for month in list_of_months:

    fig, ax = plt.subplots(1, 1)

    # background is gray for counties with missing google data
    ax = Counties.plot(color="gray", edgecolor="black", linewidths=0.0)

    fig = Counties.plot(
        column=month,
        ax=ax,
        cmap="Purples",
        figsize=(10, 10),
        linewidth=0.0,
        edgecolor="black",
        vmin=vmin,
        vmax=vmax,
        legend=True,
        norm=plt.Normalize(vmin=vmin, vmax=vmax),
    )

    # remove axis of chart
    fig.axis("off")

    # add a title
    csfont = {"fontname": "Courier New"}
    plt.title("Workplaces % Change From Normal " + month, **csfont)

    # this will save the figure as a high-res png in the output path. you can also save as svg if you prefer.
    chart = fig.get_figure()
    name = month
    chart.savefig(month + ".png", dpi=300)
    filenames.append(month + ".png")


# Exporting to a gif file
import imageio

images = []
for filename in filenames:
    images.append(imageio.imread(filename))
imageio.mimsave("USA Google Workplaces.gif", images, duration=0.5)
