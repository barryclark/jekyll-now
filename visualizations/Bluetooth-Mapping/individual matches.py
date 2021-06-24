# -*- coding: utf-8 -*-
"""
Created on Sun Jun  6 00:12:14 2021

@author: charlie.henry
"""
# https://data.austintexas.gov/resource/x44q-icha.csv?match_validity=valid

import pandas as pd
import numpy as np

# Read in data
data = pd.read_csv('Individual Files 19-21.csv')

# Creating date fields
data['datetime'] = pd.to_datetime(data['Start Time'],format='%Y-%m-%dT%H:%M:%S')
data['weekday'] = data['datetime'].dt.dayofweek
data['timebin'] = data['datetime'].dt.round("60min")
data['timebin']= data['timebin'].dt.time
data['year'] = pd.DatetimeIndex(data['datetime']).year

# Only Tuesday Wednesday Thursdays
days = ["Tuesday","Wednesday","Thursday"]

data = data[data['Day of Week'].isin(days)]

# Route identifier for mapping
data['route'] = data['Origin Reader Identifier'] + '$' + data['Destination Reader Identifier']

# Free-flow speed is defined as average speed from midnight to 3AM
FFSpeed = data.set_index('datetime').between_time('0:00','3:00').pivot_table(values=['Speed (Miles Per Hour)'],index=['route'],aggfunc=np.mean)
FFSpeed = FFSpeed.rename(columns={"Speed (Miles Per Hour)":"Free Flow Speed"})

# Calculating the ratio of peaK hour speed to free-flow and buffer time index
FFSpeed['2019 Peak Hour Mean Speed'] = data[data['year'] == 2019].set_index('datetime').between_time('16:30','17:30').pivot_table(values=['Speed (Miles Per Hour)'],index=['route'],aggfunc=np.mean)
FFSpeed['2019 Peak Hour 5th Speed'] = data[data['year'] == 2019].set_index('datetime').between_time('16:30','17:30').pivot_table(values=['Speed (Miles Per Hour)'],index=['route'],aggfunc=lambda x: np.percentile(x, 5))

FFSpeed['2019 Speed Ratio'] = FFSpeed['2019 Peak Hour Mean Speed']/FFSpeed['Free Flow Speed']
FFSpeed['2019 BTI'] = ((60/FFSpeed['2019 Peak Hour 5th Speed']) - (60/FFSpeed['2019 Peak Hour Mean Speed']))/(60/FFSpeed['2019 Peak Hour Mean Speed'])

FFSpeed['2020 Peak Hour Mean Speed'] = data[data['year'] == 2020].set_index('datetime').between_time('16:30','17:30').pivot_table(values=['Speed (Miles Per Hour)'],index=['route'],aggfunc=np.mean)
FFSpeed['2020 Peak Hour 5th Speed'] = data[data['year'] == 2020].set_index('datetime').between_time('16:30','17:30').pivot_table(values=['Speed (Miles Per Hour)'],index=['route'],aggfunc=lambda x: np.percentile(x, 5))

FFSpeed['2020 Speed Ratio'] = FFSpeed['2020 Peak Hour Mean Speed']/FFSpeed['Free Flow Speed']
FFSpeed['2020 BTI'] = ((60/FFSpeed['2020 Peak Hour 5th Speed']) - (60/FFSpeed['2020 Peak Hour Mean Speed']))/(60/FFSpeed['2020 Peak Hour Mean Speed'])

FFSpeed['2021 Peak Hour Mean Speed'] = data[data['year'] == 2021].set_index('datetime').between_time('16:30','17:30').pivot_table(values=['Speed (Miles Per Hour)'],index=['route'],aggfunc=np.mean)
FFSpeed['2021 Peak Hour 5th Speed'] = data[data['year'] == 2021].set_index('datetime').between_time('16:30','17:30').pivot_table(values=['Speed (Miles Per Hour)'],index=['route'],aggfunc=lambda x: np.percentile(x, 5))

FFSpeed['2021 Speed Ratio'] = FFSpeed['2021 Peak Hour Mean Speed']/FFSpeed['Free Flow Speed']
FFSpeed['2021 BTI'] = ((60/FFSpeed['2021 Peak Hour 5th Speed']) - (60/FFSpeed['2021 Peak Hour Mean Speed']))/(60/FFSpeed['2021 Peak Hour Mean Speed'])

# Labels for determining if a segment is congested or reliable
for index, row in FFSpeed.iterrows():
    if pd.isnull(row['2019 Speed Ratio']):
        FFSpeed.at[index,'2019 Congested'] = None
    elif row['2019 Speed Ratio'] < 0.60:
        FFSpeed.at[index,'2019 Congested'] = 'Congested'
    else:
        FFSpeed.at[index,'2019 Congested'] = 'Not Congested'
        
for index, row in FFSpeed.iterrows():  
    if pd.isnull(row['2019 BTI']):
        FFSpeed.at[index,'2019 BTI'] = None     
    elif row['2019 BTI'] >= 1.5:
        FFSpeed.at[index,'2019 Reliability'] = "Unreliable Travel Time"
    elif row['2019 BTI'] >= 1.25:
        FFSpeed.at[index,'2019 Reliability'] = "Moderately Reliable Travel Time"
    else:
        FFSpeed.at[index,'2019 Reliability'] = "Reliable Travel Time"
        
for index, row in FFSpeed.iterrows():
    if pd.isnull(row['2020 Speed Ratio']):
        FFSpeed.at[index,'2020 Congested'] = None
    elif row['2020 Speed Ratio'] < 0.60:
        FFSpeed.at[index,'2020 Congested'] = 'Congested'
    else:
        FFSpeed.at[index,'2020 Congested'] = 'Not Congested'
        
for index, row in FFSpeed.iterrows(): 
    if pd.isnull(row['2020 BTI']):
        FFSpeed.at[index,'2020 BTI'] = None       
    elif row['2020 BTI'] >= 1.5:
        FFSpeed.at[index,'2020 Reliability'] = "Unreliable Travel Time"
    elif row['2020 BTI'] >= 1.25:
        FFSpeed.at[index,'2020 Reliability'] = "Moderately Reliable Travel Time"
    else:
        FFSpeed.at[index,'2020 Reliability'] = "Reliable Travel Time"

for index, row in FFSpeed.iterrows():
    if pd.isnull(row['2021 Speed Ratio']):
        FFSpeed.at[index,'2021 Congested'] = None
    elif row['2021 Speed Ratio'] < 0.60:
        FFSpeed.at[index,'2021 Congested'] = 'Congested'
    else:
        FFSpeed.at[index,'2021 Congested'] = 'Not Congested'

for index, row in FFSpeed.iterrows():
    if pd.isnull(row['2021 BTI']):
        FFSpeed.at[index,'2021 BTI'] = None        
    elif row['2021 BTI'] >= 1.5:
        FFSpeed.at[index,'2021 Reliability'] = "Unreliable Travel Time"
    elif row['2021 BTI'] >= 1.25:
        FFSpeed.at[index,'2021 Reliability'] = "Moderately Reliable Travel Time"
    else:
        FFSpeed.at[index,'2021 Reliability'] = "Reliable Travel Time"

# output data
FFSpeed.to_csv('2019-2021 PMs v2.csv')