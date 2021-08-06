# -*- coding: utf-8 -*-
"""
Created on Thu Aug  5 19:41:51 2021

@author: charlie.henry
"""
import pandas as pd
import geopandas
import matplotlib.pyplot as plt
import numpy as np

elementary = geopandas.read_file('21_22_ELEM_BNDRY_updt_v2.shp')
middle = geopandas.read_file('20_21_mid_updt_v2.shp')
high = geopandas.read_file('20_21_high_updt_v2.shp')

masks_sent = pd.read_csv('sent with masks.csv')

masks_sent['Q1 - PERCENT YES'] = masks_sent['Q1 - PERCENT YES'].replace('%','', regex=True).values
masks_sent['Q1 - PERCENT NO'] = masks_sent['Q1 - PERCENT NO'].replace('%','', regex=True).values

masks_sent['Q1 - PERCENT YES'] = masks_sent['Q1 - PERCENT YES'].astype("float")
masks_sent['Q1 - PERCENT NO'] = masks_sent['Q1 - PERCENT NO'].astype("float")

masks_sent['Q2 - PERCENT YES'] = masks_sent['Q2 - PERCENT YES'].replace('%','', regex=True).values
masks_sent['Q2 - PERCENT NO'] = masks_sent['Q2 - PERCENT NO'].replace('%','', regex=True).values

masks_sent['Q2 - PERCENT YES'] = masks_sent['Q2 - PERCENT YES'].astype("float")
masks_sent['Q2 - PERCENT NO'] = masks_sent['Q2 - PERCENT NO'].astype("float")

masks_sent['SCHOOL'] = masks_sent['SCHOOL'].str.upper()

elementary['ELEM_PLAN9'] = elementary['ELEM_PLAN9'].replace('ST ELMO','ST. ELMO').values
elementary['ELEM_PLAN9'] = elementary['ELEM_PLAN9'].replace('SUMMITT','SUMMIT').values
elementary['ELEM_PLAN9'] = elementary['ELEM_PLAN9'].replace('RODRIGUEZ','RODRIQUEZ').values

middle['MID_NAME'] = middle['MID_NAME'].replace('O HENRY','O. HENRY').values

high['HIGH_NAME'] = high['HIGH_NAME'].replace('NORTHEAST EARLY COLLEGE','NORTHEAST').values

elementary = elementary.merge(masks_sent, left_on = 'ELEM_PLAN9', right_on='SCHOOL', how='left')

middle = middle.merge(masks_sent, left_on = 'MID_NAME', right_on='SCHOOL', how='left')

high = high.merge(masks_sent, left_on = 'HIGH_NAME', right_on='SCHOOL', how='left')

fig, ax = plt.subplots(1, 1)

ax = elementary.plot(color='gray', edgecolor='black', linewidths = 0.5)

ax.get_xaxis().set_visible(False)
ax.get_yaxis().set_visible(False)

csfont = {'fontname':'Courier New'}
plt.title('Do you plan to send your child to school \nwearing a mask? \nElementary Schools',**csfont)

fig2 = elementary.plot(column='Q1 - PERCENT YES', ax=ax, legend=True,legend_kwds={'label': "Percent Yes"},vmin = 60.0, vmax = 100.0,cmap='Purples',edgecolor="black",linewidths=0.5).get_figure()

fig2.savefig("Elementary Schools Q1.png",dpi=500)

elementary.to_file("Elementary Schools.geojson", driver='GeoJSON')


fig, ax = plt.subplots(1, 1)

ax = middle.plot(color='gray', edgecolor='black', linewidths = 0.5)

ax.get_xaxis().set_visible(False)
ax.get_yaxis().set_visible(False)

csfont = {'fontname':'Courier New'}
plt.title('Do you plan to send your child to school \nwearing a mask? \nMiddle Schools',**csfont)

fig2 = middle.plot(column='Q1 - PERCENT YES', ax=ax, legend=True,legend_kwds={'label': "Percent Yes"},vmin = 60.0, vmax = 100.0,cmap='Oranges',edgecolor="black",linewidths=0.5).get_figure()

fig2.savefig("Middle Schools Q1.png",dpi=500)

middle.to_file("Middle Schools.geojson", driver='GeoJSON')

fig, ax = plt.subplots(1, 1)

ax = high.plot(color='gray', edgecolor='black', linewidths = 0.5)

ax.get_xaxis().set_visible(False)
ax.get_yaxis().set_visible(False)

csfont = {'fontname':'Courier New'}
plt.title('Do you plan to send your child to school \nwearing a mask? \nHigh Schools',**csfont)

fig2 = high.plot(column='Q1 - PERCENT YES', ax=ax, legend=True,legend_kwds={'label': "Percent Yes"},vmin = 60.0, vmax = 100.0,cmap='Greens',edgecolor="black",linewidths=0.5).get_figure()

fig2.savefig("High Schools Q1.png",dpi=500)

high.to_file("High Schools.geojson", driver='GeoJSON')


