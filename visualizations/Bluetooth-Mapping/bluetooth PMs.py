# -*- coding: utf-8 -*-
"""
Created on Tue Jun  1 18:07:47 2021

@author: charlie.henry
"""
import pandas as pd
import numpy as np


data21 = pd.read_csv('May 2021.csv')
data20 = pd.read_csv('May 2020.csv')
data19 = pd.read_csv('May 2019.csv')

data21['datetime'] = pd.to_datetime(data21['timestamp'],format='%m/%d/%Y %I:%M:%S %p')
data21['weekday'] = data21['datetime'].dt.dayofweek
data21['timebin'] = data21['datetime'].dt.round("60min")
data21['timebin']= data21['timebin'].dt.time

data20['datetime'] = pd.to_datetime(data20['timestamp'],format='%m/%d/%Y %I:%M:%S %p')
data20['weekday'] = data20['datetime'].dt.dayofweek
data20['timebin'] = data20['datetime'].dt.round("60min")
data20['timebin']= data20['timebin'].dt.time

data19['datetime'] = pd.to_datetime(data19['timestamp'],format='%m/%d/%Y %I:%M:%S %p')
data19['weekday'] = data19['datetime'].dt.dayofweek
data19['timebin'] = data19['datetime'].dt.round("60min")
data19['timebin']= data19['timebin'].dt.time

days = [0,1,2,3,4]

data21 = data21[data21['weekday'].isin(days)]
data20 = data20[data20['weekday'].isin(days)]
data19 = data19[data19['weekday'].isin(days)]

data21['route'] = data21['origin_reader_identifier'] + ' -> ' + data21['destination_reader_identifier']
data20['route'] = data20['origin_reader_identifier'] + ' -> ' + data20['destination_reader_identifier']
data19['route'] = data19['origin_reader_identifier'] + ' -> ' + data19['destination_reader_identifier']

data21['row weight'] = data21['average_speed_mph'] * data21['number_samples']
data20['row weight'] = data20['average_speed_mph'] * data20['number_samples']
data19['row weight'] = data19['average_speed_mph'] * data19['number_samples']


full_data = data21.append(data20,ignore_index=True)
full_data = full_data.append(data19,ignore_index=True)

FFSpeed = full_data.set_index('datetime').between_time('0:00','3:00').pivot_table(values=['row weight','number_samples'],index=['route'],aggfunc=np.sum)
FFSpeed['Free Flow Speed'] = FFSpeed['row weight'] / FFSpeed['number_samples'] 

PeakHr21 = data21.set_index('datetime').between_time('16:30','17:30').pivot_table(values=['row weight','number_samples'],index=['route'],aggfunc=np.sum)
PeakHr21['Peak Hour Speed'] = PeakHr21['row weight'] / PeakHr21['number_samples'] 
results21 = FFSpeed.join(PeakHr21,lsuffix = 'L',rsuffix='R')

results21['ratio'] = results21['Peak Hour Speed']/results21['Free Flow Speed']

for index, row in results21.iterrows():
    if row['ratio'] < 0.60:
        results21.at[index,'Congested'] = 'Congested'
    else:
        results21.at[index,'Congested'] = 'Not Congested'
 
data19['row weight'] = data19['average_speed_mph'] * data19['number_samples']

PeakHr19 = data19.set_index('datetime').between_time('16:30','17:30').pivot_table(values=['row weight','number_samples'],index=['route'],aggfunc=np.sum)
PeakHr19['Peak Hour Speed'] = PeakHr19['row weight'] / PeakHr19['number_samples'] 
results19 = FFSpeed.join(PeakHr19,lsuffix = 'L',rsuffix='R')

results19['ratio'] = results19['Peak Hour Speed']/results19['Free Flow Speed']

for index, row in results19.iterrows():
    if row['ratio'] < 0.60:
        results19.at[index,'Congested'] = 'Congested'
    else:
        results19.at[index,'Congested'] = 'Not Congested'
        
data20['row weight'] = data20['average_speed_mph'] * data20['number_samples']

# FFSpeed = data20.set_index('datetime').between_time('0:00','3:00').pivot_table(values=['row weight','number_samples'],index=['route'],aggfunc=np.sum)
# FFSpeed['Free Flow Speed'] = FFSpeed['row weight'] / FFSpeed['number_samples'] 

PeakHr20 = data20.set_index('datetime').between_time('16:30','17:30').pivot_table(values=['row weight','number_samples'],index=['route'],aggfunc=np.sum)
PeakHr20['Peak Hour Speed'] = PeakHr20['row weight'] / PeakHr20['number_samples'] 
results20 = FFSpeed.join(PeakHr20,lsuffix = 'L',rsuffix='R')

results20['ratio'] = results20['Peak Hour Speed']/results20['Free Flow Speed']

for index, row in results20.iterrows():
    if row['ratio'] < 0.60:
        results20.at[index,'Congested'] = 'Congested'
    else:
        results20.at[index,'Congested'] = 'Not Congested'

print(1-len(results19[(results19['Congested'] == 'Not Congested')])/len(results19['Congested']))
print(1-len(results20[(results20['Congested'] == 'Not Congested')])/len(results20['Congested']))
print(1-len(results21[(results21['Congested'] == 'Not Congested')])/len(results21['Congested']))


print(sum(data19['row weight'])/sum(data19['number_samples']))
print(sum(data20['row weight'])/sum(data20['number_samples']))
print(sum(data21['row weight'])/sum(data21['number_samples']))