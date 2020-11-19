# -*- coding: utf-8 -*-
"""
Created on Thu Nov 19 11:03:16 2020

@author: charlie.henry
"""

import pandas as pd
import numpy as np

# Trip data from Austin Open Data Portal:
file_name="Austin_MetroBike_Trips.csv"

data = pd.read_csv(file_name)

# Kiosk data from Austin Open Data Portal:
kiosks = pd.read_csv("Austin_MetroBike_Kiosk_Locations.csv")

data= data.dropna(subset=['Checkout Kiosk ID','Return Kiosk ID','Checkout Date'])

#Group by date and Checkout/Return Kiosk ID
checkouts = data.groupby(['Checkout Date','Checkout Kiosk ID'],as_index = False).count()
returns = data.groupby(['Checkout Date','Return Kiosk ID'],as_index = False).count()

# Name field for joining later
checkouts['name'] = checkouts['Checkout Date'] + " " + checkouts['Checkout Kiosk ID'].astype(str)
returns['name'] = returns['Checkout Date'] + " " + returns['Return Kiosk ID'].astype(str)

# Outer join of the checkouts and returns
trips = pd.merge(checkouts, returns, left_on='name', right_on='name',how = 'outer')

# Creating Kiosk ID and Date fields 
trips["Kiosk ID"] = ""
trips["Date"] = ""
for index, row in trips.iterrows():
    if np.isnan(row["Checkout Kiosk ID_x"]):
        trips.at[index,"Kiosk ID"] = row["Return Kiosk ID_y"]
        trips.at[index,"Date"] = row["Checkout Date_y"]
    else:
        trips.at[index,"Kiosk ID"] = row["Checkout Kiosk ID_x"]
        trips.at[index,"Date"] = row["Checkout Date_x"]

# Formatting Columns
export = trips[['Kiosk ID','Date','Trip ID_x','Trip ID_y']].copy()
export = export.rename(columns={'Trip ID_x' : 'Checkout Count','Trip ID_y' : 'Return Count'})

# Merge back with Kiosks data
export = pd.merge(export, kiosks, left_on='Kiosk ID', right_on='Kiosk ID', how = 'left')

# More formatting, missing joins are zero trips
export['Checkout Count'] = export['Checkout Count'].fillna(0)
export['Return Count'] = export['Return Count'].fillna(0)

# Date formatting and sorting
export['Date'] = pd.to_datetime(export.Date)
export = export.sort_values(by='Date')

# export to csv
export.to_csv('MetroBike table.csv',index=False)
