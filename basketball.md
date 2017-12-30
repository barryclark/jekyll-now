

```python
import pandas as pd
import numpy as np
from random import *
```


```python
all_teams = pd.read_csv('teams.csv')
seasons= pd.read_csv('Seasons.csv')
reg_compact = pd.read_csv('RegularSeasonCompactResults.csv')
reg_detail = pd.read_csv('RegularSeasonDetailedResults.csv')
tour_compact = pd.read_csv('TourneyCompactResults.csv')
tour_detail = pd.read_csv('TourneyDetailedResults.csv')
tour_seeds = pd.read_csv('TourneySeeds.csv')
tour_slots = pd.read_csv('TourneySlots.csv')
sample_submission = pd.read_csv('SampleSubmission.csv')
```

I am going to create a function to score preductions for a specific year, based on the Kaggle Loss Score


```python
##Takes a list of teams invited to tournament for a given year and returns a list of all possible matchups

def game_list(year):
    games = []
    teams = tour_seeds[tour_seeds.Season == year].Team.values
    for index, team1 in enumerate(teams):
        for team2 in teams[index+1:]:
            games.append(str(year) + '_' + str(team1) + '_' + str(team2))
    return games
```


```python
submit_2003 = pd.DataFrame()
submit_2003['Id']= game_list(2003)
submit_2003['prob'] = [randint(1, 99)/100 for x in submit_2003['Id']]
```


```python
## Takes a year and returns a list of results -- each result is a string in the form year_Wteam_Lteam 

def results_makelist(year):  
    resultlist = []
    results = tour_compact[tour_compact['Season'] == year]
    for index, row in results.iterrows():
        resultlist.append(str(row['Season']) + '_' + str(row['Wteam']) + '_' + str(row['Lteam']))
    return resultlist      



```


```python
## takes a year and a team and provides the numeric portion of  such team for such year as integer

def get_seed(year, team):
    df_seeds = tour_seeds[tour_seeds.Season == year]
    
    try: 
        seed = df_seeds[df_seeds.Team == int(team)]['Seed'].values[0]
        return int(seed[1:3])
    
    except:
        return None
    
```


```python
get_seed(1985, 1121)
```


```python
get_seed(1985, 1116)
```




    9




```python
## takes a submission of predictions for a given year and scores the predictions for such year using the
## Kaggle formala for log loss.

def model_score(predictions = sample_submission):
        
    year = int(predictions.iloc[0,0][0:4])
    game_data = tour_compact[tour_compact['Season'] == year]
    results = results_makelist(year)
    predicts = fillout_submission(predictions)
    sigma = 0
    for result in results:
        sigma += np.log(predicts[result])
    return(0 - sigma/(len(results)))   

model_score(submit_2003)
```




    1.0049025371862554



Create Function to Calculate Point Differential and Schedule Difficulty for each team for a given year


```python
def make_factors(year):
    
    def difficulty(factors):
        strength_dic = dict(zip(factors.Team.values, factors.Diff.values))
        difficulty_schedule = []
        for team in factors['Team']:
            opponents = []
            for i in results.index:
                if results.loc[i, 'Wteam'] == team:
                    opponents.append(results.loc[i, 'Lteam'])
                elif results.loc[i, 'Lteam'] == team:
                    opponents.append(results.loc[i, 'Wteam'])
            opp_strength = 0
            for opponent in opponents:
                opp_strength += strength_dic[opponent]/len(opponents)
            difficulty_schedule.append(opp_strength)
        return difficulty_schedule
    
    
    
    team_list = [team for team in all_teams.iloc[:, 0]]
    dif_list = []
    results = reg_compact[reg_compact['Season'] == year]
    team_year_list = team_list.copy()
    for team in team_list:
        point_dif = 0
        games_played = 0
        for i in results.index:
            if results.loc[i, 'Wteam'] == team:
                point_dif = point_dif + results.loc[i, 'Wscore'] - results.loc[i, 'Lscore']
                games_played += 1
            elif results.loc[i, 'Lteam'] == team:
                point_dif = point_dif + results.loc[i, 'Lscore'] - results.loc[i, 'Wscore']
                games_played += 1
        if games_played == 0:
            team_year_list.remove(team)
        else:
            dif_list.append(point_dif/games_played)
    
    
        
    
    
    
    factors = pd.DataFrame()
    factors['Team'] = [team for team in team_year_list]
    factors['Diff'] = [diff for diff in dif_list]
    factors['schedule_str'] = [strength for strength in difficulty(factors)]
    factors['Seed'] = [get_seed(year, team) for team in team_year_list]
    return factors
```


```python
factors 1985 = make_factors(1985)
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Team</th>
      <th>Diff</th>
      <th>schedule_str</th>
      <th>Seed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1102</td>
      <td>-5.791667</td>
      <td>-0.324951</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1103</td>
      <td>-3.043478</td>
      <td>-1.510071</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1104</td>
      <td>7.800000</td>
      <td>1.091501</td>
      <td>7.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1106</td>
      <td>-3.791667</td>
      <td>-0.506431</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1108</td>
      <td>7.960000</td>
      <td>-1.581587</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1109</td>
      <td>-29.125000</td>
      <td>-0.343293</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>6</th>
      <td>1110</td>
      <td>-7.760000</td>
      <td>0.813161</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>7</th>
      <td>1111</td>
      <td>-2.791667</td>
      <td>-0.241291</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>8</th>
      <td>1112</td>
      <td>7.185185</td>
      <td>0.486362</td>
      <td>10.0</td>
    </tr>
    <tr>
      <th>9</th>
      <td>1113</td>
      <td>-4.074074</td>
      <td>2.048043</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>10</th>
      <td>1114</td>
      <td>2.133333</td>
      <td>-1.226953</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>11</th>
      <td>1116</td>
      <td>3.636364</td>
      <td>2.467069</td>
      <td>9.0</td>
    </tr>
    <tr>
      <th>12</th>
      <td>1117</td>
      <td>-2.880000</td>
      <td>0.038531</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>13</th>
      <td>1119</td>
      <td>-0.392857</td>
      <td>-0.624959</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>14</th>
      <td>1120</td>
      <td>3.689655</td>
      <td>2.216591</td>
      <td>11.0</td>
    </tr>
    <tr>
      <th>15</th>
      <td>1121</td>
      <td>-12.000000</td>
      <td>-2.155744</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>16</th>
      <td>1122</td>
      <td>-8.565217</td>
      <td>-0.846479</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>17</th>
      <td>1123</td>
      <td>1.655172</td>
      <td>-0.652768</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>18</th>
      <td>1124</td>
      <td>-4.583333</td>
      <td>1.116208</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>19</th>
      <td>1126</td>
      <td>-12.760000</td>
      <td>-3.509826</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>20</th>
      <td>1129</td>
      <td>1.400000</td>
      <td>-0.678539</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>21</th>
      <td>1130</td>
      <td>5.269231</td>
      <td>1.903452</td>
      <td>11.0</td>
    </tr>
    <tr>
      <th>22</th>
      <td>1131</td>
      <td>1.928571</td>
      <td>-0.555675</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>23</th>
      <td>1132</td>
      <td>-2.538462</td>
      <td>-0.976438</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>24</th>
      <td>1133</td>
      <td>1.535714</td>
      <td>1.389578</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>25</th>
      <td>1134</td>
      <td>-0.708333</td>
      <td>-5.745872</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>26</th>
      <td>1135</td>
      <td>-2.884615</td>
      <td>-3.342999</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>27</th>
      <td>1137</td>
      <td>2.280000</td>
      <td>-2.803180</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>28</th>
      <td>1139</td>
      <td>1.041667</td>
      <td>-1.943971</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>29</th>
      <td>1140</td>
      <td>0.551724</td>
      <td>0.923868</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>252</th>
      <td>1429</td>
      <td>0.518519</td>
      <td>-0.318357</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>253</th>
      <td>1431</td>
      <td>7.517241</td>
      <td>0.234672</td>
      <td>11.0</td>
    </tr>
    <tr>
      <th>254</th>
      <td>1432</td>
      <td>0.608696</td>
      <td>-0.995326</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>255</th>
      <td>1433</td>
      <td>9.866667</td>
      <td>2.023284</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>256</th>
      <td>1434</td>
      <td>-10.958333</td>
      <td>-0.893304</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>257</th>
      <td>1435</td>
      <td>-1.928571</td>
      <td>0.943533</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>258</th>
      <td>1436</td>
      <td>-11.440000</td>
      <td>-0.332644</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>259</th>
      <td>1437</td>
      <td>4.689655</td>
      <td>2.877466</td>
      <td>8.0</td>
    </tr>
    <tr>
      <th>260</th>
      <td>1438</td>
      <td>-0.250000</td>
      <td>4.359363</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>261</th>
      <td>1439</td>
      <td>11.962963</td>
      <td>-0.722497</td>
      <td>9.0</td>
    </tr>
    <tr>
      <th>262</th>
      <td>1440</td>
      <td>-2.076923</td>
      <td>-0.080353</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>263</th>
      <td>1441</td>
      <td>0.040000</td>
      <td>-2.256156</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>264</th>
      <td>1442</td>
      <td>-2.541667</td>
      <td>-1.075734</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>265</th>
      <td>1443</td>
      <td>3.925926</td>
      <td>0.786997</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>266</th>
      <td>1444</td>
      <td>-4.040000</td>
      <td>0.754539</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>267</th>
      <td>1446</td>
      <td>-6.166667</td>
      <td>2.020569</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>268</th>
      <td>1447</td>
      <td>-4.666667</td>
      <td>-2.081013</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>269</th>
      <td>1448</td>
      <td>3.444444</td>
      <td>3.360763</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>270</th>
      <td>1449</td>
      <td>6.548387</td>
      <td>2.053688</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>271</th>
      <td>1450</td>
      <td>-3.153846</td>
      <td>0.780624</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>272</th>
      <td>1451</td>
      <td>8.423077</td>
      <td>-1.460155</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>273</th>
      <td>1452</td>
      <td>4.115385</td>
      <td>0.303063</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>274</th>
      <td>1453</td>
      <td>-8.500000</td>
      <td>0.056307</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>275</th>
      <td>1455</td>
      <td>5.241379</td>
      <td>0.992553</td>
      <td>11.0</td>
    </tr>
    <tr>
      <th>276</th>
      <td>1456</td>
      <td>-0.259259</td>
      <td>0.493956</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>277</th>
      <td>1458</td>
      <td>-3.846154</td>
      <td>1.304141</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>278</th>
      <td>1461</td>
      <td>-1.961538</td>
      <td>0.250498</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>279</th>
      <td>1462</td>
      <td>1.571429</td>
      <td>0.508152</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>280</th>
      <td>1463</td>
      <td>-5.217391</td>
      <td>-2.226603</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>281</th>
      <td>1464</td>
      <td>1.555556</td>
      <td>-0.262141</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
<p>282 rows × 4 columns</p>
</div>




```python
factors1985.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 282 entries, 0 to 281
    Data columns (total 3 columns):
    Team            282 non-null int64
    Diff            282 non-null float64
    schedule_str    282 non-null float64
    dtypes: float64(2), int64(1)
    memory usage: 6.7 KB



```python
results1985 = results_makelist(1985)


wteams1985 = [result[5:9] for result in results1985]
lteams1985 = [result[10:14] for result in results1985]
wdiffs1985 = [factors1985[factors1985.Team == int(team)]['Diff'] for team in wteams1985]
wsOs1985 = [factors1985[factors1985.Team == int(team)]['schedule_str'] for team in wteams1985]
ldiffs1985 = [factors1985[factors1985.Team == int(team)]['Diff'] for team in lteams1985]
lsOs1985 = [factors1985[factors1985.Team == int(team)]['schedule_str'] for team in lteams1985]

draft = pd.DataFrame()
draft['team1'] = wteams1985[0:31] + lteams1985[31:63]
draft['team2'] = lteams1985[0:31] + wteams1985[31:63]
draft['diffs1'] = wdiffs1985[0:31] + ldiffs1985[31:63]
draft['diffs2'] = ldiffs1985[0:31] + wdiffs1985[31:63]
draft['seed1'] = [get_seed(1985, team) for team in draft['team1']]
draft['seed2'] = [get_seed(1985, team) for team in draft['team2']]
```


```python
draft.shape
```




    (63, 6)




```python

```


```python

```
