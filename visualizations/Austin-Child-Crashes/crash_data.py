# -*- coding: utf-8 -*-
"""
Created on Fri Jun 11 12:23:42 2021

@author: charlie.henry
"""
from sodapy import Socrata
import pandas as pd
import geopandas
import numpy as np

client = Socrata("data.austintexas.gov", "xGgtOt9EQqEfXEGD2r4etNC9V")

results = client.get("xecs-rpy9",limit=1000000)
    
response = pd.DataFrame.from_records(results)

response = response.dropna(subset = ['prsn_age'])

response['prsn_age'] = response['prsn_age'].astype('int64')

response = response[response['prsn_age'] < 16]

response['prsn_injry_sev_id'] = response['prsn_injry_sev_id'].str.replace('1','Serious Injury')
response['prsn_injry_sev_id'] = response['prsn_injry_sev_id'].str.replace('4','Fatal Injury')

response['prsn_gndr_id'] = response['prsn_gndr_id'].str.replace('1','Male')
response['prsn_gndr_id'] = response['prsn_gndr_id'].str.replace('2','Female')
response['prsn_gndr_id'] = response['prsn_gndr_id'].str.replace('0','Unkown')

response['prsn_ethnicity_id'] = response['prsn_ethnicity_id'].str.replace('0','Unkown')
response['prsn_ethnicity_id'] = response['prsn_ethnicity_id'].str.replace('1','White')
response['prsn_ethnicity_id'] = response['prsn_ethnicity_id'].str.replace('2','Hispanic')
response['prsn_ethnicity_id'] = response['prsn_ethnicity_id'].str.replace('3','Black')
response['prsn_ethnicity_id'] = response['prsn_ethnicity_id'].str.replace('4','Asian')
response['prsn_ethnicity_id'] = response['prsn_ethnicity_id'].str.replace('5','Other')
response['prsn_ethnicity_id'] = response['prsn_ethnicity_id'].str.replace('6','American Indian/Alaskan Native')

pivot = response.pivot_table(values='person_id',columns=['prsn_ethnicity_id'],aggfunc='count')

pivot = response.pivot_table(values='person_id',index=['mode_desc'],columns=['prsn_ethnicity_id'],aggfunc='count')
pivot = pivot.fillna(0)

pivot = response.pivot_table(values='person_id',columns=['prsn_injry_sev_id'],aggfunc='count')


response['timestamp'] = pd.to_datetime(response['crash_date'],format='%Y-%m-%dT%H:%M:%S')
response['Month'] = response['timestamp'].apply(lambda x: x.strftime('%m'))
response['Year'] = response['timestamp'].dt.year.astype(str)
response['Year-Month'] = response['Year'] + "-" + response['Month']

timeline = response.groupby('Year-Month')['crash_date'].count()


pivot = response.pivot_table(values='person_id',columns=['Year'],aggfunc='count')

response['hour'] = response['timestamp'].dt.hour

pivot = response.pivot_table(values='person_id',columns=['hour'],aggfunc='count')

response['dayofweek'] = response['timestamp'].dt.dayofweek

pivot = response.pivot_table(values='person_id',columns=['dayofweek'],aggfunc='count')

results = client.get("y2wy-tgr5",limit=1000000)
    
crashes = pd.DataFrame.from_records(results)

crashes = crashes.merge(response, how='right', left_on='crash_id',right_on='crash_id')

