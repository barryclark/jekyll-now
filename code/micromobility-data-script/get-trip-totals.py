import json
import requests
import os

import pandas as pd
import pygsheets
from dotenv import load_dotenv

# Load in Google sheets credentials
load_dotenv("micromobility.env")
GOOGLE_JSON = os.getenv("GOOGLE_JSON")
gc = pygsheets.authorize(service_file=GOOGLE_JSON)

# List of cities currently in the ridereport platform
CITIES = [
        "pdx",
        "austin",
        "santa-monica",
        "louisville",
        "greensboro",
        "boulder",
        "denver",
        "melbourne",
        "newark",
        "fortcollins",
        "atlanta",
        "milwaukee",
        "littleton",
        "arvada",
        "aurora",
        ]

# Iterate through each city and download the trip_metrics.json file

daily_dfs = []
hourly_dfs = []

for city in CITIES:
    url = f"https://public-data-exports-production.s3-us-west-2.amazonaws.com/{city}/data-export/all/all/trip_metrics.json"
    
    res = requests.get(url)
    count_data = json.loads(res.text)
    
    # Total daily trips table
    city_df = pd.DataFrame(count_data['tripsPerDay']['dataBuckets'])
    city_df['city'] = city
    daily_dfs.append(city_df)
    
    # Trips per hour
    city_df = pd.DataFrame(count_data['tripsByHour']['dataBuckets'])
    city_df['city'] = city
    hourly_dfs.append(city_df)


# Formatting our data
daily_data = pd.concat(daily_dfs)
daily_data['month'] = pd.to_datetime(daily_data['xValue']).dt.to_period('M')
daily_data['dayofweek'] = pd.to_datetime(daily_data['xValue']).dt.dayofweek

# Export daily data to google sheet
sh = gc.open('Micromobility Stats')
wks = sh[0]
wks.set_dataframe(daily_data,(0,0))

# Export hourly data to google sheet
hourly_data = pd.concat(hourly_dfs)
sh = gc.open('Micromobility Stats')
wks = sh[1]
wks.set_dataframe(hourly_data,(0,0))

