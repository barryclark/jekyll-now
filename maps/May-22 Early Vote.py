#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue May  3 22:58:58 2022

@author: charliehenry
"""

import pandas as pd
import geopandas as gpd

precincts = gpd.read_file("precincts_2022.geojson")

mail_data = pd.read_excel("05.03.22Rosters/05.03.22ByMail.xlsx", header=3)

early_data = pd.read_excel("05.03.22Rosters/05.03.22EarlyVote.xlsx", header=3)

registration = pd.read_csv("may-3-22-reg.csv")


mail_data = mail_data.pivot_table(index="Precinct", values="VUID", aggfunc="count")
mail_data = mail_data.rename(columns={"VUID": "Mail-in Votes"})

early_data = early_data.pivot_table(index="PCT", values="VUID", aggfunc="count")
early_data = early_data.rename(columns={"VUID": "Early Votes"})

precincts["Precinct"] = precincts["Precinct"].astype(int)
precincts = precincts.merge(
    mail_data, left_on="Precinct", right_on="Precinct", how="left"
)
precincts = precincts.merge(early_data, left_on="Precinct", right_on="PCT", how="left")
precincts = precincts.merge(
    registration, left_on="Precinct", right_on="Precinct", how="left"
)


precincts["Early Votes"] = precincts["Early Votes"].fillna(0)
precincts["Mail-in Votes"] = precincts["Mail-in Votes"].fillna(0)
precincts["Active"] = precincts["Active"].fillna(0)
precincts["Suspense"] = precincts["Suspense"].fillna(0)
precincts["Total"] = precincts["Total"].fillna(0)


precincts["Total Votes"] = precincts["Mail-in Votes"] + precincts["Early Votes"]
precincts["Turnout"] = precincts["Total Votes"] / precincts["VoterCount"]

precincts.to_file("may-3-22 turnout.geojson")


past_data = gpd.read_file("Travis County Turnout.geojson")
