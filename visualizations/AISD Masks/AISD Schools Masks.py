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

elementary = elementary.merge(masks_sent, left_on = 'ELEM_PLAN9', right_on='SCHOOL', how='left')


fig, ax = plt.subplots(1, 1)

ax = elementary.plot(color='gray', edgecolor='black', linewidths = 0.5)

ax.get_xaxis().set_visible(False)
ax.get_yaxis().set_visible(False)

csfont = {'fontname':'Courier New'}
plt.title('Do you plan to send your child to school \nwearing a mask? \nElementary Schools',**csfont)
plt.xlabel("Elementary Schools")

fig2 = elementary.plot(column='Q1 - PERCENT YES', ax=ax, legend=True,legend_kwds={'label': "Percent Yes"},vmin = 60.0, vmax = 100.0,cmap='Purples',edgecolor="black",linewidths=0.5).get_figure()

fig2.savefig("Elementary Schools Q1.png",dpi=500)

elementary.to_file("Elementary Schools.geojson", driver='GeoJSON')
