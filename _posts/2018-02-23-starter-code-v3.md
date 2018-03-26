

# Getting started

Once you've chosen your scenario, download the data from the Iowa website in csv format. Start by loading the data with pandas. You may need to parse the date columns appropriately.

The State of Iowa Tax Board has requested an analysis of the 2015 liquor sales to predict the annual sales for 2016, in order to determine whether changes in the liquor tax rates are warranted. 

All assumptions and analysis are based on the dataset supplied by the state of Iowa. 

The data consisted of the full year of 2015 and the first 3 months of 2016. The data was engineered so that tets can be run based on the first 3 months of sales for 2015 and how that affects overall sales so that a similar prediction can be made for the full 2016 year.

After running 2 testing models and then running a different 3rd testing model, I have concluded that I can account for over 98% of the variance in the data for sales in 2015. This high score may be due to a high correlation between variables in the dataframe, however I tried to compensate by running the tests again with different variables, which produced very similar results. It is with this model that I predicted annual 2016 liquor sales and appended it to the 2015 dataframe to compare sales and see if there is indeed any increase to report to Iowa State Tax Board. I found that sales were predicted to go up.


```python
import pandas as pd
from sklearn import datasets
import csv
from matplotlib import pyplot as plt
import numpy as np
from scipy import stats
import scipy.stats as stats
import seaborn as sns
from sklearn import datasets, linear_model
from sklearn.model_selection import train_test_split

%config InlineBackend.figure_format = 'retina'
%matplotlib inline

plt.style.use('fivethirtyeight')



## Load the data into a DataFrame


# Load CSV using Pandas from URL


filepath = ('./iowa_liquor_sales_proj_2.csv')
df = pd.read_csv(filepath)

#data = pd.DataFrame(df.data,columns=df.feature_names)
print(df.shape)
print(df.keys())
df

## Transform the dates if needed, e.g.
#df["Date"] = pd.to_datetime(df["Date"], format="%m-%d-%y")
```

    /anaconda3/lib/python3.6/site-packages/IPython/core/interactiveshell.py:2698: DtypeWarning: Columns (6) have mixed types. Specify dtype option on import or set low_memory=False.
      interactivity=interactivity, compiler=compiler, result=result)


    (2709552, 24)
    Index(['Invoice/Item Number', 'Date', 'Store Number', 'Store Name', 'Address',
           'City', 'Zip Code', 'Store Location', 'County Number', 'County',
           'Category', 'Category Name', 'Vendor Number', 'Vendor Name',
           'Item Number', 'Item Description', 'Pack', 'Bottle Volume (ml)',
           'State Bottle Cost', 'State Bottle Retail', 'Bottles Sold',
           'Sale (Dollars)', 'Volume Sold (Liters)', 'Volume Sold (Gallons)'],
          dtype='object')





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
      <th>Invoice/Item Number</th>
      <th>Date</th>
      <th>Store Number</th>
      <th>Store Name</th>
      <th>Address</th>
      <th>City</th>
      <th>Zip Code</th>
      <th>Store Location</th>
      <th>County Number</th>
      <th>County</th>
      <th>...</th>
      <th>Item Number</th>
      <th>Item Description</th>
      <th>Pack</th>
      <th>Bottle Volume (ml)</th>
      <th>State Bottle Cost</th>
      <th>State Bottle Retail</th>
      <th>Bottles Sold</th>
      <th>Sale (Dollars)</th>
      <th>Volume Sold (Liters)</th>
      <th>Volume Sold (Gallons)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>S29198800001</td>
      <td>11/20/2015</td>
      <td>2191</td>
      <td>Keokuk Spirits</td>
      <td>1013 MAIN</td>
      <td>KEOKUK</td>
      <td>52632</td>
      <td>1013 MAIN\nKEOKUK 52632\n(40.39978, -91.387531)</td>
      <td>56.0</td>
      <td>Lee</td>
      <td>...</td>
      <td>297</td>
      <td>Templeton Rye w/Flask</td>
      <td>6</td>
      <td>750</td>
      <td>$18.09</td>
      <td>$27.14</td>
      <td>6</td>
      <td>$162.84</td>
      <td>4.50</td>
      <td>1.19</td>
    </tr>
    <tr>
      <th>1</th>
      <td>S29195400002</td>
      <td>11/21/2015</td>
      <td>2205</td>
      <td>Ding's Honk And Holler</td>
      <td>900 E WASHINGTON</td>
      <td>CLARINDA</td>
      <td>51632</td>
      <td>900 E WASHINGTON\nCLARINDA 51632\n(40.739238, ...</td>
      <td>73.0</td>
      <td>Page</td>
      <td>...</td>
      <td>297</td>
      <td>Templeton Rye w/Flask</td>
      <td>6</td>
      <td>750</td>
      <td>$18.09</td>
      <td>$27.14</td>
      <td>12</td>
      <td>$325.68</td>
      <td>9.00</td>
      <td>2.38</td>
    </tr>
    <tr>
      <th>2</th>
      <td>S29050300001</td>
      <td>11/16/2015</td>
      <td>3549</td>
      <td>Quicker Liquor Store</td>
      <td>1414 48TH ST</td>
      <td>FORT MADISON</td>
      <td>52627</td>
      <td>1414 48TH ST\nFORT MADISON 52627\n(40.624226, ...</td>
      <td>56.0</td>
      <td>Lee</td>
      <td>...</td>
      <td>249</td>
      <td>Disaronno Amaretto Cavalli Mignon 3-50ml Pack</td>
      <td>20</td>
      <td>150</td>
      <td>$6.40</td>
      <td>$9.60</td>
      <td>2</td>
      <td>$19.20</td>
      <td>0.30</td>
      <td>0.08</td>
    </tr>
    <tr>
      <th>3</th>
      <td>S28867700001</td>
      <td>11/04/2015</td>
      <td>2513</td>
      <td>Hy-Vee Food Store #2 / Iowa City</td>
      <td>812  S 1ST AVE</td>
      <td>IOWA CITY</td>
      <td>52240</td>
      <td>812 S 1ST AVE\nIOWA CITY 52240\n</td>
      <td>52.0</td>
      <td>Johnson</td>
      <td>...</td>
      <td>237</td>
      <td>Knob Creek w/ Crystal Decanter</td>
      <td>3</td>
      <td>1750</td>
      <td>$35.55</td>
      <td>$53.34</td>
      <td>3</td>
      <td>$160.02</td>
      <td>5.25</td>
      <td>1.39</td>
    </tr>
    <tr>
      <th>4</th>
      <td>S29050800001</td>
      <td>11/17/2015</td>
      <td>3942</td>
      <td>Twin Town Liquor</td>
      <td>104 HIGHWAY 30 WEST</td>
      <td>TOLEDO</td>
      <td>52342</td>
      <td>104 HIGHWAY 30 WEST\nTOLEDO 52342\n(41.985887,...</td>
      <td>86.0</td>
      <td>Tama</td>
      <td>...</td>
      <td>249</td>
      <td>Disaronno Amaretto Cavalli Mignon 3-50ml Pack</td>
      <td>20</td>
      <td>150</td>
      <td>$6.40</td>
      <td>$9.60</td>
      <td>2</td>
      <td>$19.20</td>
      <td>0.30</td>
      <td>0.08</td>
    </tr>
    <tr>
      <th>5</th>
      <td>S28869200001</td>
      <td>11/11/2015</td>
      <td>3650</td>
      <td>Spirits, Stogies and Stuff</td>
      <td>118 South Main St.</td>
      <td>HOLSTEIN</td>
      <td>51025</td>
      <td>118 South Main St.\nHOLSTEIN 51025\n(42.490073...</td>
      <td>47.0</td>
      <td>Ida</td>
      <td>...</td>
      <td>237</td>
      <td>Knob Creek w/ Crystal Decanter</td>
      <td>3</td>
      <td>1750</td>
      <td>$35.55</td>
      <td>$53.34</td>
      <td>1</td>
      <td>$53.34</td>
      <td>1.75</td>
      <td>0.46</td>
    </tr>
    <tr>
      <th>6</th>
      <td>S28865700001</td>
      <td>11/09/2015</td>
      <td>2538</td>
      <td>Hy-Vee Food Store #3 / Waterloo</td>
      <td>1422 FLAMMANG DR</td>
      <td>WATERLOO</td>
      <td>50702</td>
      <td>1422 FLAMMANG DR\nWATERLOO 50702\n(42.459938, ...</td>
      <td>7.0</td>
      <td>Black Hawk</td>
      <td>...</td>
      <td>238</td>
      <td>Forbidden Secret Coffee Pack</td>
      <td>6</td>
      <td>1500</td>
      <td>$11.62</td>
      <td>$17.43</td>
      <td>6</td>
      <td>$104.58</td>
      <td>9.00</td>
      <td>2.38</td>
    </tr>
    <tr>
      <th>7</th>
      <td>S28869500001</td>
      <td>11/10/2015</td>
      <td>3942</td>
      <td>Twin Town Liquor</td>
      <td>104 HIGHWAY 30 WEST</td>
      <td>TOLEDO</td>
      <td>52342</td>
      <td>104 HIGHWAY 30 WEST\nTOLEDO 52342\n(41.985887,...</td>
      <td>86.0</td>
      <td>Tama</td>
      <td>...</td>
      <td>237</td>
      <td>Knob Creek w/ Crystal Decanter</td>
      <td>3</td>
      <td>1750</td>
      <td>$35.55</td>
      <td>$53.34</td>
      <td>2</td>
      <td>$106.68</td>
      <td>3.50</td>
      <td>0.92</td>
    </tr>
    <tr>
      <th>8</th>
      <td>S29339300091</td>
      <td>11/30/2015</td>
      <td>2662</td>
      <td>Hy-Vee Wine &amp; Spirits / Muscatine</td>
      <td>522 MULBERRY, SUITE A</td>
      <td>MUSCATINE</td>
      <td>52761</td>
      <td>522 MULBERRY, SUITE A\nMUSCATINE 52761\n</td>
      <td>70.0</td>
      <td>Muscatine</td>
      <td>...</td>
      <td>173</td>
      <td>Laphroaig w/ Whiskey Stones</td>
      <td>12</td>
      <td>750</td>
      <td>$19.58</td>
      <td>$29.37</td>
      <td>4</td>
      <td>$117.48</td>
      <td>3.00</td>
      <td>0.79</td>
    </tr>
    <tr>
      <th>9</th>
      <td>S29050900001</td>
      <td>11/16/2015</td>
      <td>4307</td>
      <td>Crossroads Wine and Liquor</td>
      <td>117 IOWA AVE</td>
      <td>DUNLAP</td>
      <td>712-2</td>
      <td>117 IOWA AVE\nDUNLAP 712-2\n(41.854728, -95.60...</td>
      <td>43.0</td>
      <td>Harrison</td>
      <td>...</td>
      <td>249</td>
      <td>Disaronno Amaretto Cavalli Mignon 3-50ml Pack</td>
      <td>20</td>
      <td>150</td>
      <td>$6.40</td>
      <td>$9.60</td>
      <td>2</td>
      <td>$19.20</td>
      <td>0.30</td>
      <td>0.08</td>
    </tr>
    <tr>
      <th>10</th>
      <td>S29049900001</td>
      <td>11/17/2015</td>
      <td>2661</td>
      <td>Hy-Vee Food Store / Sheldon</td>
      <td>1989 PARK ST</td>
      <td>SHELDON</td>
      <td>51201</td>
      <td>1989 PARK ST\nSHELDON 51201\n(43.186038, -95.8...</td>
      <td>71.0</td>
      <td>O'Brien</td>
      <td>...</td>
      <td>249</td>
      <td>Disaronno Amaretto Cavalli Mignon 3-50ml Pack</td>
      <td>20</td>
      <td>150</td>
      <td>$6.40</td>
      <td>$9.60</td>
      <td>20</td>
      <td>$192.00</td>
      <td>3.00</td>
      <td>0.79</td>
    </tr>
    <tr>
      <th>11</th>
      <td>S28868200001</td>
      <td>11/05/2015</td>
      <td>2561</td>
      <td>Hy-Vee Food Store / Fleur / DSM</td>
      <td>4605 FLEUR DRIVE</td>
      <td>DES MOINES</td>
      <td>50321</td>
      <td>4605 FLEUR DRIVE\nDES MOINES 50321\n(41.542816...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>237</td>
      <td>Knob Creek w/ Crystal Decanter</td>
      <td>3</td>
      <td>1750</td>
      <td>$35.55</td>
      <td>$53.34</td>
      <td>2</td>
      <td>$106.68</td>
      <td>3.50</td>
      <td>0.92</td>
    </tr>
    <tr>
      <th>12</th>
      <td>S28869600001</td>
      <td>11/09/2015</td>
      <td>4114</td>
      <td>After 5 Somewhere</td>
      <td>704 W 7TH ST PO BOX 372</td>
      <td>ATLANTIC</td>
      <td>50022</td>
      <td>704 W 7TH ST PO BOX 372\nATLANTIC 50022\n(41.4...</td>
      <td>15.0</td>
      <td>Cass</td>
      <td>...</td>
      <td>237</td>
      <td>Knob Creek w/ Crystal Decanter</td>
      <td>3</td>
      <td>1750</td>
      <td>$35.55</td>
      <td>$53.34</td>
      <td>3</td>
      <td>$160.02</td>
      <td>5.25</td>
      <td>1.39</td>
    </tr>
    <tr>
      <th>13</th>
      <td>S28866900001</td>
      <td>11/11/2015</td>
      <td>3650</td>
      <td>Spirits, Stogies and Stuff</td>
      <td>118 South Main St.</td>
      <td>HOLSTEIN</td>
      <td>51025</td>
      <td>118 South Main St.\nHOLSTEIN 51025\n(42.490073...</td>
      <td>47.0</td>
      <td>Ida</td>
      <td>...</td>
      <td>238</td>
      <td>Forbidden Secret Coffee Pack</td>
      <td>6</td>
      <td>1500</td>
      <td>$11.62</td>
      <td>$17.43</td>
      <td>1</td>
      <td>$17.43</td>
      <td>1.50</td>
      <td>0.40</td>
    </tr>
    <tr>
      <th>14</th>
      <td>S29050100001</td>
      <td>11/19/2015</td>
      <td>2806</td>
      <td>Osco #881 / Clinton</td>
      <td>1307 N SECOND</td>
      <td>CLINTON</td>
      <td>52732</td>
      <td>1307 N SECOND\nCLINTON 52732\n(41.858483, -90....</td>
      <td>23.0</td>
      <td>Clinton</td>
      <td>...</td>
      <td>249</td>
      <td>Disaronno Amaretto Cavalli Mignon 3-50ml Pack</td>
      <td>20</td>
      <td>150</td>
      <td>$6.40</td>
      <td>$9.60</td>
      <td>20</td>
      <td>$192.00</td>
      <td>3.00</td>
      <td>0.79</td>
    </tr>
    <tr>
      <th>15</th>
      <td>S29049600001</td>
      <td>11/17/2015</td>
      <td>2624</td>
      <td>Hy-Vee #2 / Dubuque</td>
      <td>2395 NW ARTERIAL RD</td>
      <td>DUBUQUE</td>
      <td>52002</td>
      <td>2395 NW ARTERIAL RD\nDUBUQUE 52002\n(42.516621...</td>
      <td>31.0</td>
      <td>Dubuque</td>
      <td>...</td>
      <td>249</td>
      <td>Disaronno Amaretto Cavalli Mignon 3-50ml Pack</td>
      <td>20</td>
      <td>150</td>
      <td>$6.40</td>
      <td>$9.60</td>
      <td>20</td>
      <td>$192.00</td>
      <td>3.00</td>
      <td>0.79</td>
    </tr>
    <tr>
      <th>16</th>
      <td>S28868400001</td>
      <td>11/04/2015</td>
      <td>2572</td>
      <td>Hy-Vee Food Store / Cedar Falls</td>
      <td>6301 UNIVERSITY</td>
      <td>CEDAR FALLS</td>
      <td>50613</td>
      <td>6301 UNIVERSITY\nCEDAR FALLS 50613\n(42.512771...</td>
      <td>7.0</td>
      <td>Black Hawk</td>
      <td>...</td>
      <td>237</td>
      <td>Knob Creek w/ Crystal Decanter</td>
      <td>3</td>
      <td>1750</td>
      <td>$35.55</td>
      <td>$53.34</td>
      <td>3</td>
      <td>$160.02</td>
      <td>5.25</td>
      <td>1.39</td>
    </tr>
    <tr>
      <th>17</th>
      <td>S29196300002</td>
      <td>11/24/2015</td>
      <td>2595</td>
      <td>Hy-Vee Wine and Spirits / Denison</td>
      <td>1620  4TH AVE, SOUTH</td>
      <td>DENISON</td>
      <td>51442</td>
      <td>1620 4TH AVE, SOUTH\nDENISON 51442\n(42.012395...</td>
      <td>24.0</td>
      <td>Crawford</td>
      <td>...</td>
      <td>297</td>
      <td>Templeton Rye w/Flask</td>
      <td>6</td>
      <td>750</td>
      <td>$18.09</td>
      <td>$27.14</td>
      <td>6</td>
      <td>$162.84</td>
      <td>4.50</td>
      <td>1.19</td>
    </tr>
    <tr>
      <th>18</th>
      <td>S29134300126</td>
      <td>11/18/2015</td>
      <td>3723</td>
      <td>J D Spirits Liquor</td>
      <td>1023  9TH ST</td>
      <td>ONAWA</td>
      <td>51040</td>
      <td>1023 9TH ST\nONAWA 51040\n(42.025841, -96.095845)</td>
      <td>67.0</td>
      <td>Monona</td>
      <td>...</td>
      <td>258</td>
      <td>Rumchata "GoChatas"</td>
      <td>1</td>
      <td>6000</td>
      <td>$99.00</td>
      <td>$148.50</td>
      <td>1</td>
      <td>$148.50</td>
      <td>6.00</td>
      <td>1.59</td>
    </tr>
    <tr>
      <th>19</th>
      <td>S28869000001</td>
      <td>11/10/2015</td>
      <td>2665</td>
      <td>Hy-Vee / Waukee</td>
      <td>1005 E HICKMAN RD</td>
      <td>WAUKEE</td>
      <td>50263</td>
      <td>1005 E HICKMAN RD\nWAUKEE 50263\n(41.614909, -...</td>
      <td>25.0</td>
      <td>Dallas</td>
      <td>...</td>
      <td>237</td>
      <td>Knob Creek w/ Crystal Decanter</td>
      <td>3</td>
      <td>1750</td>
      <td>$35.55</td>
      <td>$53.34</td>
      <td>2</td>
      <td>$106.68</td>
      <td>3.50</td>
      <td>0.92</td>
    </tr>
    <tr>
      <th>20</th>
      <td>S29198700002</td>
      <td>11/24/2015</td>
      <td>5093</td>
      <td>Cody Mart</td>
      <td>1220 N CODY RD</td>
      <td>LE CLAIRE</td>
      <td>52753</td>
      <td>1220 N CODY RD\nLE CLAIRE 52753\n(41.610504, -...</td>
      <td>82.0</td>
      <td>Scott</td>
      <td>...</td>
      <td>297</td>
      <td>Templeton Rye w/Flask</td>
      <td>6</td>
      <td>750</td>
      <td>$18.09</td>
      <td>$27.14</td>
      <td>3</td>
      <td>$81.42</td>
      <td>2.25</td>
      <td>0.59</td>
    </tr>
    <tr>
      <th>21</th>
      <td>S29282800048</td>
      <td>11/23/2015</td>
      <td>2642</td>
      <td>Hy-Vee Wine and Spirits / Pella</td>
      <td>512 E OSKALOOSA</td>
      <td>PELLA</td>
      <td>50219</td>
      <td>512 E OSKALOOSA\nPELLA 50219\n(41.397023, -92....</td>
      <td>63.0</td>
      <td>Marion</td>
      <td>...</td>
      <td>238</td>
      <td>Forbidden Secret Coffee Pack</td>
      <td>6</td>
      <td>1500</td>
      <td>$11.62</td>
      <td>$17.43</td>
      <td>6</td>
      <td>$104.58</td>
      <td>9.00</td>
      <td>2.38</td>
    </tr>
    <tr>
      <th>22</th>
      <td>S28868000001</td>
      <td>11/04/2015</td>
      <td>2548</td>
      <td>Hy-Vee Food Store / Altoona</td>
      <td>100 8TH STREET SW</td>
      <td>ALTOONA</td>
      <td>50009</td>
      <td>100 8TH STREET SW\nALTOONA 50009\n(41.644041, ...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>237</td>
      <td>Knob Creek w/ Crystal Decanter</td>
      <td>3</td>
      <td>1750</td>
      <td>$35.55</td>
      <td>$53.34</td>
      <td>3</td>
      <td>$160.02</td>
      <td>5.25</td>
      <td>1.39</td>
    </tr>
    <tr>
      <th>23</th>
      <td>S29199600001</td>
      <td>11/20/2015</td>
      <td>2558</td>
      <td>Hy-Vee Food Store / Mount Pleasant</td>
      <td>1700 E WASHINGTON</td>
      <td>MOUNT PLEASANT</td>
      <td>52641</td>
      <td>1700 E WASHINGTON\nMOUNT PLEASANT 52641\n(40.9...</td>
      <td>44.0</td>
      <td>Henry</td>
      <td>...</td>
      <td>297</td>
      <td>Templeton Rye w/Flask</td>
      <td>6</td>
      <td>750</td>
      <td>$18.09</td>
      <td>$27.14</td>
      <td>18</td>
      <td>$488.52</td>
      <td>13.50</td>
      <td>3.57</td>
    </tr>
    <tr>
      <th>24</th>
      <td>S29050500001</td>
      <td>11/18/2015</td>
      <td>3735</td>
      <td>C B Liquor</td>
      <td>1202 A AVE EAST</td>
      <td>OSKALOOSA</td>
      <td>52577</td>
      <td>1202 A AVE EAST\nOSKALOOSA 52577\n(41.296286, ...</td>
      <td>10.0</td>
      <td>Buchanan</td>
      <td>...</td>
      <td>249</td>
      <td>Disaronno Amaretto Cavalli Mignon 3-50ml Pack</td>
      <td>20</td>
      <td>150</td>
      <td>$6.40</td>
      <td>$9.60</td>
      <td>3</td>
      <td>$28.80</td>
      <td>0.45</td>
      <td>0.12</td>
    </tr>
    <tr>
      <th>25</th>
      <td>S28867000001</td>
      <td>11/04/2015</td>
      <td>3842</td>
      <td>Bancroft Liquor Store</td>
      <td>107 N PORTLAND ST PO BX 222</td>
      <td>BANCROFT</td>
      <td>50517</td>
      <td>107 N PORTLAND ST PO BX 222\nBANCROFT 50517\n(...</td>
      <td>55.0</td>
      <td>Kossuth</td>
      <td>...</td>
      <td>238</td>
      <td>Forbidden Secret Coffee Pack</td>
      <td>6</td>
      <td>1500</td>
      <td>$11.62</td>
      <td>$17.43</td>
      <td>3</td>
      <td>$52.29</td>
      <td>4.50</td>
      <td>1.19</td>
    </tr>
    <tr>
      <th>26</th>
      <td>S28868600001</td>
      <td>11/09/2015</td>
      <td>2650</td>
      <td>Hy-Vee Wine and Spirits / Harlan</td>
      <td>1808 23RD ST</td>
      <td>HARLAN</td>
      <td>51537</td>
      <td>1808 23RD ST\nHARLAN 51537\n(41.650657, -95.33...</td>
      <td>83.0</td>
      <td>Shelby</td>
      <td>...</td>
      <td>237</td>
      <td>Knob Creek w/ Crystal Decanter</td>
      <td>3</td>
      <td>1750</td>
      <td>$35.55</td>
      <td>$53.34</td>
      <td>3</td>
      <td>$160.02</td>
      <td>5.25</td>
      <td>1.39</td>
    </tr>
    <tr>
      <th>27</th>
      <td>S28869100001</td>
      <td>11/10/2015</td>
      <td>2666</td>
      <td>Hy-Vee #2 / Ankeny</td>
      <td>2510 SW STATE ST</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>2510 SW STATE ST\nANKENY 50023\n(41.704185, -9...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>237</td>
      <td>Knob Creek w/ Crystal Decanter</td>
      <td>3</td>
      <td>1750</td>
      <td>$35.55</td>
      <td>$53.34</td>
      <td>3</td>
      <td>$160.02</td>
      <td>5.25</td>
      <td>1.39</td>
    </tr>
    <tr>
      <th>28</th>
      <td>S29197900002</td>
      <td>11/23/2015</td>
      <td>3842</td>
      <td>Bancroft Liquor Store</td>
      <td>107 N PORTLAND ST PO BX 222</td>
      <td>BANCROFT</td>
      <td>50517</td>
      <td>107 N PORTLAND ST PO BX 222\nBANCROFT 50517\n(...</td>
      <td>55.0</td>
      <td>Kossuth</td>
      <td>...</td>
      <td>297</td>
      <td>Templeton Rye w/Flask</td>
      <td>6</td>
      <td>750</td>
      <td>$18.09</td>
      <td>$27.14</td>
      <td>18</td>
      <td>$488.52</td>
      <td>13.50</td>
      <td>3.57</td>
    </tr>
    <tr>
      <th>29</th>
      <td>S28865800001</td>
      <td>11/09/2015</td>
      <td>2539</td>
      <td>Hy-Vee Food Store / iowa Falls</td>
      <td>HIGHWAY 65 SOUTH</td>
      <td>IOWA FALLS</td>
      <td>50126</td>
      <td>HIGHWAY 65 SOUTH\nIOWA FALLS 50126\n</td>
      <td>42.0</td>
      <td>Hardin</td>
      <td>...</td>
      <td>238</td>
      <td>Forbidden Secret Coffee Pack</td>
      <td>6</td>
      <td>1500</td>
      <td>$11.62</td>
      <td>$17.43</td>
      <td>6</td>
      <td>$104.58</td>
      <td>9.00</td>
      <td>2.38</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2709522</th>
      <td>S31558600021</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>31475</td>
      <td>New Amsterdam Gin</td>
      <td>12</td>
      <td>750</td>
      <td>$6.90</td>
      <td>$10.35</td>
      <td>1</td>
      <td>$10.35</td>
      <td>0.75</td>
      <td>0.20</td>
    </tr>
    <tr>
      <th>2709523</th>
      <td>S31558600022</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>45276</td>
      <td>Paramount White Rum</td>
      <td>12</td>
      <td>750</td>
      <td>$4.00</td>
      <td>$6.00</td>
      <td>2</td>
      <td>$12.00</td>
      <td>1.50</td>
      <td>0.40</td>
    </tr>
    <tr>
      <th>2709524</th>
      <td>S31558600023</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>45278</td>
      <td>Paramount White Rum</td>
      <td>6</td>
      <td>1750</td>
      <td>$7.84</td>
      <td>$11.76</td>
      <td>2</td>
      <td>$23.52</td>
      <td>3.50</td>
      <td>0.92</td>
    </tr>
    <tr>
      <th>2709525</th>
      <td>S31558600024</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>88296</td>
      <td>Patron Tequila Silver</td>
      <td>12</td>
      <td>750</td>
      <td>$27.00</td>
      <td>$40.50</td>
      <td>1</td>
      <td>$40.50</td>
      <td>0.75</td>
      <td>0.20</td>
    </tr>
    <tr>
      <th>2709526</th>
      <td>S31558600025</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>88556</td>
      <td>Sauza Blanco Silver</td>
      <td>12</td>
      <td>750</td>
      <td>$9.45</td>
      <td>$14.18</td>
      <td>1</td>
      <td>$14.18</td>
      <td>0.75</td>
      <td>0.20</td>
    </tr>
    <tr>
      <th>2709527</th>
      <td>S31558600026</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>38006</td>
      <td>Smirnoff Vodka Traveller</td>
      <td>12</td>
      <td>750</td>
      <td>$8.25</td>
      <td>$12.38</td>
      <td>4</td>
      <td>$49.52</td>
      <td>3.00</td>
      <td>0.79</td>
    </tr>
    <tr>
      <th>2709528</th>
      <td>S31558600027</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>28866</td>
      <td>Tanqueray Gin</td>
      <td>12</td>
      <td>750</td>
      <td>$12.50</td>
      <td>$18.75</td>
      <td>1</td>
      <td>$18.75</td>
      <td>0.75</td>
      <td>0.20</td>
    </tr>
    <tr>
      <th>2709529</th>
      <td>S31558600028</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>27102</td>
      <td>Templeton Rye</td>
      <td>6</td>
      <td>750</td>
      <td>$18.09</td>
      <td>$27.14</td>
      <td>1</td>
      <td>$27.14</td>
      <td>0.75</td>
      <td>0.20</td>
    </tr>
    <tr>
      <th>2709530</th>
      <td>S31558600029</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>38176</td>
      <td>Titos Vodka</td>
      <td>12</td>
      <td>750</td>
      <td>$9.65</td>
      <td>$14.48</td>
      <td>3</td>
      <td>$43.44</td>
      <td>2.25</td>
      <td>0.59</td>
    </tr>
    <tr>
      <th>2709531</th>
      <td>S31558600030</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>41692</td>
      <td>Uv Blue (raspberry) Vodka</td>
      <td>6</td>
      <td>1750</td>
      <td>$10.99</td>
      <td>$16.49</td>
      <td>2</td>
      <td>$32.98</td>
      <td>3.50</td>
      <td>0.92</td>
    </tr>
    <tr>
      <th>2709532</th>
      <td>S31558600031</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>37338</td>
      <td>UV Vodka PET</td>
      <td>6</td>
      <td>1750</td>
      <td>$10.99</td>
      <td>$16.49</td>
      <td>2</td>
      <td>$32.98</td>
      <td>3.50</td>
      <td>0.92</td>
    </tr>
    <tr>
      <th>2709533</th>
      <td>S31558600032</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>22156</td>
      <td>Wild Turkey 101</td>
      <td>12</td>
      <td>750</td>
      <td>$13.50</td>
      <td>$20.25</td>
      <td>1</td>
      <td>$20.25</td>
      <td>0.75</td>
      <td>0.20</td>
    </tr>
    <tr>
      <th>2709534</th>
      <td>S31558600033</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>73051</td>
      <td>Rumchata Mini</td>
      <td>12</td>
      <td>500</td>
      <td>$8.87</td>
      <td>$13.31</td>
      <td>1</td>
      <td>$13.31</td>
      <td>0.50</td>
      <td>0.13</td>
    </tr>
    <tr>
      <th>2709535</th>
      <td>S31558600034</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>89191</td>
      <td>Jose Cuervo Especial Reposado Tequila Mini</td>
      <td>12</td>
      <td>500</td>
      <td>$11.50</td>
      <td>$17.25</td>
      <td>1</td>
      <td>$17.25</td>
      <td>0.50</td>
      <td>0.13</td>
    </tr>
    <tr>
      <th>2709536</th>
      <td>S31558600035</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>68031</td>
      <td>Bailey's Original Irish Cream Minis</td>
      <td>4</td>
      <td>1000</td>
      <td>$25.25</td>
      <td>$37.88</td>
      <td>1</td>
      <td>$37.88</td>
      <td>1.00</td>
      <td>0.26</td>
    </tr>
    <tr>
      <th>2709537</th>
      <td>S31558600036</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>65204</td>
      <td>Tequila Rose Liqueur Mini</td>
      <td>6</td>
      <td>500</td>
      <td>$6.63</td>
      <td>$9.95</td>
      <td>1</td>
      <td>$9.95</td>
      <td>0.50</td>
      <td>0.13</td>
    </tr>
    <tr>
      <th>2709538</th>
      <td>S31558600037</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>75208</td>
      <td>Kinky Liqueur Mini</td>
      <td>6</td>
      <td>500</td>
      <td>$4.84</td>
      <td>$7.26</td>
      <td>1</td>
      <td>$7.26</td>
      <td>0.50</td>
      <td>0.13</td>
    </tr>
    <tr>
      <th>2709539</th>
      <td>S31558600038</td>
      <td>03/31/2016</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>84172</td>
      <td>99 Bananas Mini</td>
      <td>10</td>
      <td>600</td>
      <td>$5.94</td>
      <td>$8.91</td>
      <td>1</td>
      <td>$8.91</td>
      <td>0.60</td>
      <td>0.16</td>
    </tr>
    <tr>
      <th>2709540</th>
      <td>S31558800001</td>
      <td>03/31/2016</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>64858</td>
      <td>Fireball Cinnamon Whiskey Mini Dispenser</td>
      <td>1</td>
      <td>3000</td>
      <td>$29.72</td>
      <td>$44.58</td>
      <td>3</td>
      <td>$133.74</td>
      <td>9.00</td>
      <td>2.38</td>
    </tr>
    <tr>
      <th>2709541</th>
      <td>S31558800002</td>
      <td>03/31/2016</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>37994</td>
      <td>Smirnoff Vodka 80 Prf</td>
      <td>24</td>
      <td>375</td>
      <td>$4.75</td>
      <td>$7.13</td>
      <td>24</td>
      <td>$171.12</td>
      <td>9.00</td>
      <td>2.38</td>
    </tr>
    <tr>
      <th>2709542</th>
      <td>S31558800003</td>
      <td>03/31/2016</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>53214</td>
      <td>Paul Masson Grande Amber Brandy</td>
      <td>24</td>
      <td>375</td>
      <td>$3.22</td>
      <td>$4.83</td>
      <td>24</td>
      <td>$115.92</td>
      <td>9.00</td>
      <td>2.38</td>
    </tr>
    <tr>
      <th>2709543</th>
      <td>S31558800004</td>
      <td>03/31/2016</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>36904</td>
      <td>Mccormick Vodka Pet</td>
      <td>24</td>
      <td>375</td>
      <td>$1.80</td>
      <td>$2.70</td>
      <td>24</td>
      <td>$64.80</td>
      <td>9.00</td>
      <td>2.38</td>
    </tr>
    <tr>
      <th>2709544</th>
      <td>S31558800005</td>
      <td>03/31/2016</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>23824</td>
      <td>Five Star</td>
      <td>24</td>
      <td>375</td>
      <td>$2.00</td>
      <td>$3.00</td>
      <td>24</td>
      <td>$72.00</td>
      <td>9.00</td>
      <td>2.38</td>
    </tr>
    <tr>
      <th>2709545</th>
      <td>S31558800006</td>
      <td>03/31/2016</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>11774</td>
      <td>Black Velvet</td>
      <td>24</td>
      <td>375</td>
      <td>$3.07</td>
      <td>$4.61</td>
      <td>24</td>
      <td>$110.64</td>
      <td>9.00</td>
      <td>2.38</td>
    </tr>
    <tr>
      <th>2709546</th>
      <td>S31558800007</td>
      <td>03/31/2016</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>48105</td>
      <td>Hennessy VS</td>
      <td>12</td>
      <td>375</td>
      <td>$9.99</td>
      <td>$14.99</td>
      <td>12</td>
      <td>$179.88</td>
      <td>4.50</td>
      <td>1.19</td>
    </tr>
    <tr>
      <th>2709547</th>
      <td>S31558800008</td>
      <td>03/31/2016</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>36305</td>
      <td>Hawkeye Vodka</td>
      <td>12</td>
      <td>750</td>
      <td>$3.34</td>
      <td>$5.01</td>
      <td>12</td>
      <td>$60.12</td>
      <td>9.00</td>
      <td>2.38</td>
    </tr>
    <tr>
      <th>2709548</th>
      <td>S31558800009</td>
      <td>03/31/2016</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>32233</td>
      <td>Seagrams Extra Dry Gin</td>
      <td>48</td>
      <td>200</td>
      <td>$1.99</td>
      <td>$2.99</td>
      <td>48</td>
      <td>$143.52</td>
      <td>9.60</td>
      <td>2.54</td>
    </tr>
    <tr>
      <th>2709549</th>
      <td>S31558800010</td>
      <td>03/31/2016</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>32232</td>
      <td>Seagrams Extra Dry Gin</td>
      <td>48</td>
      <td>100</td>
      <td>$0.97</td>
      <td>$1.46</td>
      <td>48</td>
      <td>$70.08</td>
      <td>4.80</td>
      <td>1.27</td>
    </tr>
    <tr>
      <th>2709550</th>
      <td>S31558800011</td>
      <td>03/31/2016</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>36308</td>
      <td>Hawkeye Vodka</td>
      <td>6</td>
      <td>1750</td>
      <td>$7.17</td>
      <td>$10.76</td>
      <td>6</td>
      <td>$64.56</td>
      <td>10.50</td>
      <td>2.77</td>
    </tr>
    <tr>
      <th>2709551</th>
      <td>S31558800012</td>
      <td>03/31/2016</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>11786</td>
      <td>Black Velvet Traveler</td>
      <td>12</td>
      <td>750</td>
      <td>$5.23</td>
      <td>$7.85</td>
      <td>12</td>
      <td>$94.20</td>
      <td>9.00</td>
      <td>2.38</td>
    </tr>
  </tbody>
</table>
<p>2709552 rows × 24 columns</p>
</div>




```python
df.dtypes
```




    Invoice/Item Number       object
    Date                      object
    Store Number               int64
    Store Name                object
    Address                   object
    City                      object
    Zip Code                  object
    Store Location            object
    County Number            float64
    County                    object
    Category                 float64
    Category Name             object
    Vendor Number              int64
    Vendor Name               object
    Item Number                int64
    Item Description          object
    Pack                       int64
    Bottle Volume (ml)         int64
    State Bottle Cost         object
    State Bottle Retail       object
    Bottles Sold               int64
    Sale (Dollars)            object
    Volume Sold (Liters)     float64
    Volume Sold (Gallons)    float64
    dtype: object




```python
df['State Bottle Retail'] = df['State Bottle Retail'].str.replace('$','')
```


```python
df['Sale (Dollars)'] = df['Sale (Dollars)'].str.replace('$','')
```


```python
df['State Bottle Cost'] = df['State Bottle Cost'].str.replace('$','')
```


```python
df["Date"] = pd.to_datetime(df["Date"], format="%m/%d/%Y")
df.dtypes
```




    Invoice/Item Number              object
    Date                     datetime64[ns]
    Store Number                      int64
    Store Name                       object
    Address                          object
    City                             object
    Zip Code                         object
    Store Location                   object
    County Number                   float64
    County                           object
    Category                        float64
    Category Name                    object
    Vendor Number                     int64
    Vendor Name                      object
    Item Number                       int64
    Item Description                 object
    Pack                              int64
    Bottle Volume (ml)                int64
    State Bottle Cost                object
    State Bottle Retail              object
    Bottles Sold                      int64
    Sale (Dollars)                   object
    Volume Sold (Liters)            float64
    Volume Sold (Gallons)           float64
    dtype: object




```python
df['Year']=df['Date'].dt.year
```


```python
df['Month']=df['Date'].dt.month
```


```python
df['Store_Number'] = df['Store Number'].astype(int)
```


```python
df['Vendor_Number'] = df['Vendor Number'].astype(int)
```


```python
df['Item_Number'] = df['Item Number'].astype(int)
```


```python
df['Bottle_Volume'] = df['Bottle Volume (ml)'].astype(float)
```


```python
df['State_Bottle_Cost'] = df['State Bottle Cost'].astype(float)
```


```python
#df['State_Bottle_Cost'] = pd.to_numeric(df['State Bottle Cost'], downcast='float')

```


```python
df['State_Bottle_Retail'] = df['State Bottle Retail'].astype(float)
```


```python
df['Bottles_Sold'] = df['Bottles Sold'].astype(int)
```


```python
df['Sale'] = df['Sale (Dollars)'].astype(float)
```


```python
df['Zip_Code'] = pd.to_numeric(df['Zip Code'], errors='coerce')
```


```python
df.dtypes
```




    Invoice/Item Number              object
    Date                     datetime64[ns]
    Store Number                      int64
    Store Name                       object
    Address                          object
    City                             object
    Zip Code                         object
    Store Location                   object
    County Number                   float64
    County                           object
    Category                        float64
    Category Name                    object
    Vendor Number                     int64
    Vendor Name                      object
    Item Number                       int64
    Item Description                 object
    Pack                              int64
    Bottle Volume (ml)                int64
    State Bottle Cost                object
    State Bottle Retail              object
    Bottles Sold                      int64
    Sale (Dollars)                   object
    Volume Sold (Liters)            float64
    Volume Sold (Gallons)           float64
    Year                              int64
    Month                             int64
    Store_Number                      int64
    Vendor_Number                     int64
    Item_Number                       int64
    Bottle_Volume                   float64
    State_Bottle_Cost               float64
    State_Bottle_Retail             float64
    Bottles_Sold                      int64
    Sale                            float64
    Zip_Code                        float64
    dtype: object



# Explore the data

Perform some exploratory statistical analysis and make some plots, such as histograms of transaction totals, bottles sold, etc.


```python
import matplotlib.pyplot as plt
x= df[['Bottles Sold']]
fig, ax = plt.subplots(figsize=(8,8))
plt.hist(x.loc[:10000,:])

plt.show()
```


![png](/images/starter-code-v3_files/starter-code-v3_22_0.png)



```python
import matplotlib.pyplot as plt
x= df[['Sale (Dollars)']]
fig, ax = plt.subplots(figsize=(8,8))
plt.hist(x.loc[:10000,:])

plt.show()
```


![png](/images/starter-code-v3_files/starter-code-v3_23_0.png)



```python
import matplotlib.pyplot as plt
x= df[['Volume Sold (Gallons)']]
fig, ax = plt.subplots(figsize=(8,8))
plt.hist(x.loc[:10000,:])

plt.show()
```


![png](/images/starter-code-v3_files/starter-code-v3_24_0.png)



```python
import matplotlib.pyplot as plt
x= df[['Volume Sold (Gallons)']]
fig, ax = plt.subplots(figsize=(8,8))
plt.hist(x.loc[:25,:])

plt.show()
```


![png](/images/starter-code-v3_files/starter-code-v3_25_0.png)



```python
import seaborn as sns
import matplotlib.pyplot as plt
```

# Record your findings

Be sure to write out anything observations from your exploratory analysis.


# Mine the data

Now you are ready to compute the variables you will use for your regression from the data. For example, you may want to compute total sales per store from Jan to March of 2015, mean price per bottle, etc. Refer to the readme for more ideas appropriate to your scenario.

Pandas is your friend for this task. Take a look at the operations here for ideas on how to make the best use of pandas and feel free to search for blog and Stack Overflow posts to help you group data by certain variables and compute sums, means, etc. You may find it useful to create a new data frame to house this summary data.
 



```python
df.groupby('City').sum().sort_values('Sale', ascending=False)
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
      <th>Store Number</th>
      <th>County Number</th>
      <th>Category</th>
      <th>Vendor Number</th>
      <th>Item Number</th>
      <th>Pack</th>
      <th>Bottle Volume (ml)</th>
      <th>Bottles Sold</th>
      <th>Volume Sold (Liters)</th>
      <th>Volume Sold (Gallons)</th>
      <th>...</th>
      <th>Month</th>
      <th>Store_Number</th>
      <th>Vendor_Number</th>
      <th>Item_Number</th>
      <th>Bottle_Volume</th>
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
      <th>Zip_Code</th>
    </tr>
    <tr>
      <th>City</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>DES MOINES</th>
      <td>868952982</td>
      <td>18297895.0</td>
      <td>2.478366e+11</td>
      <td>61663941</td>
      <td>12405329015</td>
      <td>3140563</td>
      <td>200851304</td>
      <td>3456812</td>
      <td>2737345.55</td>
      <td>723268.840001</td>
      <td>...</td>
      <td>1367728</td>
      <td>868952982</td>
      <td>61663941</td>
      <td>12405329015</td>
      <td>200851304.0</td>
      <td>2390173.07</td>
      <td>3.588329e+06</td>
      <td>3456812</td>
      <td>4.443986e+07</td>
      <td>1.196452e+10</td>
    </tr>
    <tr>
      <th>CEDAR RAPIDS</th>
      <td>637407493</td>
      <td>10551726.0</td>
      <td>1.940740e+11</td>
      <td>47939578</td>
      <td>8598599700</td>
      <td>2488824</td>
      <td>157678227</td>
      <td>1914428</td>
      <td>1677148.46</td>
      <td>443109.460001</td>
      <td>...</td>
      <td>1090647</td>
      <td>637407493</td>
      <td>47939578</td>
      <td>8598599700</td>
      <td>157678227.0</td>
      <td>1789750.10</td>
      <td>2.687219e+06</td>
      <td>1914428</td>
      <td>2.448673e+07</td>
      <td>9.753066e+09</td>
    </tr>
    <tr>
      <th>DAVENPORT</th>
      <td>409310747</td>
      <td>9508802.0</td>
      <td>1.216956e+11</td>
      <td>29958350</td>
      <td>5394246848</td>
      <td>1594536</td>
      <td>98355824</td>
      <td>1532850</td>
      <td>1157198.64</td>
      <td>305757.360000</td>
      <td>...</td>
      <td>675412</td>
      <td>409310747</td>
      <td>29958350</td>
      <td>5394246848</td>
      <td>98355824.0</td>
      <td>1067066.14</td>
      <td>1.602215e+06</td>
      <td>1532850</td>
      <td>1.747656e+07</td>
      <td>6.158730e+09</td>
    </tr>
    <tr>
      <th>IOWA CITY</th>
      <td>259665806</td>
      <td>4178512.0</td>
      <td>8.370079e+10</td>
      <td>20621692</td>
      <td>3910522645</td>
      <td>989955</td>
      <td>70532715</td>
      <td>963948</td>
      <td>841650.17</td>
      <td>222360.520000</td>
      <td>...</td>
      <td>461704</td>
      <td>259665806</td>
      <td>20621692</td>
      <td>3910522645</td>
      <td>70532715.0</td>
      <td>814878.81</td>
      <td>1.223565e+06</td>
      <td>963948</td>
      <td>1.279549e+07</td>
      <td>4.197901e+09</td>
    </tr>
    <tr>
      <th>WATERLOO</th>
      <td>305222100</td>
      <td>591675.0</td>
      <td>8.850820e+10</td>
      <td>21731427</td>
      <td>3948224576</td>
      <td>1205400</td>
      <td>69001243</td>
      <td>1169700</td>
      <td>822010.40</td>
      <td>217196.600000</td>
      <td>...</td>
      <td>487965</td>
      <td>305222100</td>
      <td>21731427</td>
      <td>3948224576</td>
      <td>69001243.0</td>
      <td>764977.11</td>
      <td>1.148562e+06</td>
      <td>1169700</td>
      <td>1.256057e+07</td>
      <td>4.293309e+09</td>
    </tr>
    <tr>
      <th>WEST DES MOINES</th>
      <td>232836400</td>
      <td>5453443.0</td>
      <td>7.481824e+10</td>
      <td>18326691</td>
      <td>3349141989</td>
      <td>865201</td>
      <td>64088226</td>
      <td>761972</td>
      <td>740992.30</td>
      <td>195770.020000</td>
      <td>...</td>
      <td>424642</td>
      <td>232836400</td>
      <td>18326691</td>
      <td>3349141989</td>
      <td>64088226.0</td>
      <td>756489.39</td>
      <td>1.135848e+06</td>
      <td>761972</td>
      <td>1.235846e+07</td>
      <td>3.608603e+09</td>
    </tr>
    <tr>
      <th>SIOUX CITY</th>
      <td>283659813</td>
      <td>7680363.0</td>
      <td>8.341733e+10</td>
      <td>20468971</td>
      <td>3603982716</td>
      <td>990579</td>
      <td>72539815</td>
      <td>910798</td>
      <td>796784.53</td>
      <td>210524.610000</td>
      <td>...</td>
      <td>468650</td>
      <td>283659813</td>
      <td>20468971</td>
      <td>3603982716</td>
      <td>72539815.0</td>
      <td>801321.81</td>
      <td>1.203069e+06</td>
      <td>910798</td>
      <td>1.201932e+07</td>
      <td>4.080970e+09</td>
    </tr>
    <tr>
      <th>COUNCIL BLUFFS</th>
      <td>295975175</td>
      <td>6313164.0</td>
      <td>8.445430e+10</td>
      <td>20335153</td>
      <td>3697582178</td>
      <td>1092658</td>
      <td>71787815</td>
      <td>871597</td>
      <td>770795.08</td>
      <td>203651.120000</td>
      <td>...</td>
      <td>466975</td>
      <td>295975175</td>
      <td>20335153</td>
      <td>3697582178</td>
      <td>71787815.0</td>
      <td>769002.38</td>
      <td>1.154492e+06</td>
      <td>871597</td>
      <td>1.152233e+07</td>
      <td>4.168457e+09</td>
    </tr>
    <tr>
      <th>DUBUQUE</th>
      <td>225864047</td>
      <td>2112278.0</td>
      <td>7.152862e+10</td>
      <td>17101034</td>
      <td>3050705446</td>
      <td>797399</td>
      <td>64614585</td>
      <td>701327</td>
      <td>667482.30</td>
      <td>176348.530000</td>
      <td>...</td>
      <td>397332</td>
      <td>225864047</td>
      <td>17101034</td>
      <td>3050705446</td>
      <td>64614585.0</td>
      <td>692184.47</td>
      <td>1.039391e+06</td>
      <td>701327</td>
      <td>9.650613e+06</td>
      <td>3.565012e+09</td>
    </tr>
    <tr>
      <th>AMES</th>
      <td>263220972</td>
      <td>6450905.0</td>
      <td>7.919604e+10</td>
      <td>19670736</td>
      <td>3655102990</td>
      <td>880812</td>
      <td>70021883</td>
      <td>679597</td>
      <td>666521.31</td>
      <td>176096.070000</td>
      <td>...</td>
      <td>441247</td>
      <td>263220972</td>
      <td>19670736</td>
      <td>3655102990</td>
      <td>70021883.0</td>
      <td>798237.83</td>
      <td>1.198673e+06</td>
      <td>679597</td>
      <td>9.587908e+06</td>
      <td>3.795428e+09</td>
    </tr>
    <tr>
      <th>ANKENY</th>
      <td>166817928</td>
      <td>3678906.0</td>
      <td>4.975856e+10</td>
      <td>12185551</td>
      <td>2133354574</td>
      <td>534657</td>
      <td>45665324</td>
      <td>473757</td>
      <td>483007.32</td>
      <td>127614.720000</td>
      <td>...</td>
      <td>281031</td>
      <td>166817928</td>
      <td>12185551</td>
      <td>2133354574</td>
      <td>45665324.0</td>
      <td>535625.44</td>
      <td>8.043293e+05</td>
      <td>473757</td>
      <td>7.141135e+06</td>
      <td>2.389949e+09</td>
    </tr>
    <tr>
      <th>CORALVILLE</th>
      <td>124635526</td>
      <td>1852812.0</td>
      <td>3.769315e+10</td>
      <td>9353292</td>
      <td>2013176284</td>
      <td>413848</td>
      <td>33399959</td>
      <td>419205</td>
      <td>398461.96</td>
      <td>105276.070000</td>
      <td>...</td>
      <td>212549</td>
      <td>124635526</td>
      <td>9353292</td>
      <td>2013176284</td>
      <td>33399959.0</td>
      <td>403898.77</td>
      <td>6.064109e+05</td>
      <td>419205</td>
      <td>6.854789e+06</td>
      <td>1.887885e+09</td>
    </tr>
    <tr>
      <th>BETTENDORF</th>
      <td>129278451</td>
      <td>2907448.0</td>
      <td>3.838366e+10</td>
      <td>9422141</td>
      <td>1711951656</td>
      <td>412437</td>
      <td>34528512</td>
      <td>441044</td>
      <td>408584.99</td>
      <td>107951.590000</td>
      <td>...</td>
      <td>210490</td>
      <td>129278451</td>
      <td>9422141</td>
      <td>1711951656</td>
      <td>34528512.0</td>
      <td>418238.32</td>
      <td>6.278674e+05</td>
      <td>441044</td>
      <td>6.632695e+06</td>
      <td>1.939431e+09</td>
    </tr>
    <tr>
      <th>CEDAR FALLS</th>
      <td>213903540</td>
      <td>400939.0</td>
      <td>5.976955e+10</td>
      <td>14707086</td>
      <td>2795086510</td>
      <td>676843</td>
      <td>52043965</td>
      <td>494971</td>
      <td>460805.22</td>
      <td>121752.030000</td>
      <td>...</td>
      <td>337445</td>
      <td>213903540</td>
      <td>14707086</td>
      <td>2795086510</td>
      <td>52043965.0</td>
      <td>576279.69</td>
      <td>8.653990e+05</td>
      <td>494971</td>
      <td>6.589479e+06</td>
      <td>2.899127e+09</td>
    </tr>
    <tr>
      <th>WINDSOR HEIGHTS</th>
      <td>88891788</td>
      <td>2131283.0</td>
      <td>2.883234e+10</td>
      <td>6961754</td>
      <td>1316709740</td>
      <td>339889</td>
      <td>25597303</td>
      <td>371208</td>
      <td>412029.59</td>
      <td>108862.320000</td>
      <td>...</td>
      <td>160000</td>
      <td>88891788</td>
      <td>6961754</td>
      <td>1316709740</td>
      <td>25597303.0</td>
      <td>293894.38</td>
      <td>4.412831e+05</td>
      <td>371208</td>
      <td>5.990735e+06</td>
      <td>1.392631e+09</td>
    </tr>
    <tr>
      <th>MASON CITY</th>
      <td>132175119</td>
      <td>711076.0</td>
      <td>4.426549e+10</td>
      <td>11051610</td>
      <td>1905257264</td>
      <td>502197</td>
      <td>41040981</td>
      <td>390217</td>
      <td>375518.46</td>
      <td>99210.810000</td>
      <td>...</td>
      <td>248625</td>
      <td>132175119</td>
      <td>11051610</td>
      <td>1905257264</td>
      <td>41040981.0</td>
      <td>418363.24</td>
      <td>6.282773e+05</td>
      <td>390217</td>
      <td>4.842734e+06</td>
      <td>2.133726e+09</td>
    </tr>
    <tr>
      <th>FORT DODGE</th>
      <td>105794826</td>
      <td>2545780.0</td>
      <td>3.072538e+10</td>
      <td>7677833</td>
      <td>1333638905</td>
      <td>338980</td>
      <td>28893212</td>
      <td>339020</td>
      <td>318878.97</td>
      <td>84243.040000</td>
      <td>...</td>
      <td>171862</td>
      <td>105794826</td>
      <td>7677833</td>
      <td>1333638905</td>
      <td>28893212.0</td>
      <td>286560.70</td>
      <td>4.303711e+05</td>
      <td>339020</td>
      <td>4.333031e+06</td>
      <td>1.486143e+09</td>
    </tr>
    <tr>
      <th>BURLINGTON</th>
      <td>114273343</td>
      <td>900247.0</td>
      <td>3.239620e+10</td>
      <td>8091324</td>
      <td>1451435311</td>
      <td>410071</td>
      <td>26355753</td>
      <td>308723</td>
      <td>240293.95</td>
      <td>63494.570000</td>
      <td>...</td>
      <td>182234</td>
      <td>114273343</td>
      <td>8091324</td>
      <td>1451435311</td>
      <td>26355753.0</td>
      <td>293626.73</td>
      <td>4.407700e+05</td>
      <td>308723</td>
      <td>3.731482e+06</td>
      <td>1.633675e+09</td>
    </tr>
    <tr>
      <th>MARSHALLTOWN</th>
      <td>91685992</td>
      <td>1713472.0</td>
      <td>2.799106e+10</td>
      <td>7002946</td>
      <td>1204313557</td>
      <td>317585</td>
      <td>26122203</td>
      <td>273714</td>
      <td>253245.27</td>
      <td>66901.670000</td>
      <td>...</td>
      <td>156238</td>
      <td>91685992</td>
      <td>7002946</td>
      <td>1204313557</td>
      <td>26122203.0</td>
      <td>270012.44</td>
      <td>4.054909e+05</td>
      <td>273714</td>
      <td>3.683832e+06</td>
      <td>1.342880e+09</td>
    </tr>
    <tr>
      <th>CLINTON</th>
      <td>103122918</td>
      <td>705456.0</td>
      <td>3.237821e+10</td>
      <td>8047103</td>
      <td>1406093501</td>
      <td>402334</td>
      <td>27956025</td>
      <td>297608</td>
      <td>267297.76</td>
      <td>70618.570000</td>
      <td>...</td>
      <td>181377</td>
      <td>103122918</td>
      <td>8047103</td>
      <td>1406093501</td>
      <td>27956025.0</td>
      <td>281922.26</td>
      <td>4.233242e+05</td>
      <td>297608</td>
      <td>3.634210e+06</td>
      <td>1.633640e+09</td>
    </tr>
    <tr>
      <th>URBANDALE</th>
      <td>94129635</td>
      <td>1870253.0</td>
      <td>2.527484e+10</td>
      <td>6178466</td>
      <td>1061737780</td>
      <td>302756</td>
      <td>22285912</td>
      <td>245167</td>
      <td>213976.22</td>
      <td>56536.070000</td>
      <td>...</td>
      <td>147311</td>
      <td>94129635</td>
      <td>6178466</td>
      <td>1061737780</td>
      <td>22285912.0</td>
      <td>252910.90</td>
      <td>3.797862e+05</td>
      <td>245167</td>
      <td>3.392298e+06</td>
      <td>1.222241e+09</td>
    </tr>
    <tr>
      <th>MUSCATINE</th>
      <td>112328486</td>
      <td>2357460.0</td>
      <td>3.520959e+10</td>
      <td>8559024</td>
      <td>1523829953</td>
      <td>431768</td>
      <td>30268531</td>
      <td>259294</td>
      <td>248435.98</td>
      <td>65636.790000</td>
      <td>...</td>
      <td>193930</td>
      <td>112328486</td>
      <td>8559024</td>
      <td>1523829953</td>
      <td>30268531.0</td>
      <td>318107.11</td>
      <td>4.776874e+05</td>
      <td>259294</td>
      <td>3.381011e+06</td>
      <td>1.776885e+09</td>
    </tr>
    <tr>
      <th>ALTOONA</th>
      <td>72443965</td>
      <td>1640793.0</td>
      <td>2.230951e+10</td>
      <td>5381804</td>
      <td>943513422</td>
      <td>270451</td>
      <td>19912031</td>
      <td>222839</td>
      <td>208620.46</td>
      <td>55123.270000</td>
      <td>...</td>
      <td>125619</td>
      <td>72443965</td>
      <td>5381804</td>
      <td>943513422</td>
      <td>19912031.0</td>
      <td>205723.36</td>
      <td>3.089460e+05</td>
      <td>222839</td>
      <td>2.963462e+06</td>
      <td>1.070193e+09</td>
    </tr>
    <tr>
      <th>KEOKUK</th>
      <td>47730250</td>
      <td>955808.0</td>
      <td>1.786505e+10</td>
      <td>4477606</td>
      <td>800317015</td>
      <td>200901</td>
      <td>16604575</td>
      <td>205772</td>
      <td>196203.86</td>
      <td>51836.180000</td>
      <td>...</td>
      <td>97120</td>
      <td>47730250</td>
      <td>4477606</td>
      <td>800317015</td>
      <td>16604575.0</td>
      <td>175570.83</td>
      <td>2.635351e+05</td>
      <td>205772</td>
      <td>2.916154e+06</td>
      <td>8.983230e+08</td>
    </tr>
    <tr>
      <th>MARION</th>
      <td>78549797</td>
      <td>1373187.0</td>
      <td>2.510294e+10</td>
      <td>6157256</td>
      <td>1050255461</td>
      <td>299690</td>
      <td>22817000</td>
      <td>220852</td>
      <td>208900.84</td>
      <td>55188.550000</td>
      <td>...</td>
      <td>140231</td>
      <td>78549797</td>
      <td>6157256</td>
      <td>1050255461</td>
      <td>22817000.0</td>
      <td>229697.38</td>
      <td>3.449333e+05</td>
      <td>220852</td>
      <td>2.753354e+06</td>
      <td>1.254790e+09</td>
    </tr>
    <tr>
      <th>MOUNT VERNON</th>
      <td>54780859</td>
      <td>652194.0</td>
      <td>1.195423e+10</td>
      <td>2897386</td>
      <td>746162879</td>
      <td>122746</td>
      <td>11213775</td>
      <td>195916</td>
      <td>195149.82</td>
      <td>51545.860000</td>
      <td>...</td>
      <td>66353</td>
      <td>54780859</td>
      <td>2897386</td>
      <td>746162879</td>
      <td>11213775.0</td>
      <td>130008.99</td>
      <td>1.951605e+05</td>
      <td>195916</td>
      <td>2.737323e+06</td>
      <td>5.985768e+08</td>
    </tr>
    <tr>
      <th>CARROLL</th>
      <td>43972958</td>
      <td>200942.0</td>
      <td>1.495630e+10</td>
      <td>3641642</td>
      <td>614961254</td>
      <td>163150</td>
      <td>14501400</td>
      <td>175448</td>
      <td>193412.92</td>
      <td>51095.760000</td>
      <td>...</td>
      <td>84089</td>
      <td>43972958</td>
      <td>3641642</td>
      <td>614961254</td>
      <td>14501400.0</td>
      <td>142104.03</td>
      <td>2.133878e+05</td>
      <td>175448</td>
      <td>2.605922e+06</td>
      <td>7.377586e+08</td>
    </tr>
    <tr>
      <th>SPIRIT LAKE</th>
      <td>49966334</td>
      <td>499980.0</td>
      <td>1.739151e+10</td>
      <td>4309944</td>
      <td>708166042</td>
      <td>192560</td>
      <td>16791534</td>
      <td>176897</td>
      <td>191891.53</td>
      <td>50684.170000</td>
      <td>...</td>
      <td>98282</td>
      <td>49966334</td>
      <td>4309944</td>
      <td>708166042</td>
      <td>16791534.0</td>
      <td>171550.60</td>
      <td>2.576149e+05</td>
      <td>176897</td>
      <td>2.535546e+06</td>
      <td>8.559658e+08</td>
    </tr>
    <tr>
      <th>OTTUMWA</th>
      <td>74286328</td>
      <td>2022390.0</td>
      <td>2.341499e+10</td>
      <td>5645899</td>
      <td>1019612478</td>
      <td>321464</td>
      <td>19138981</td>
      <td>186266</td>
      <td>164789.43</td>
      <td>43542.190000</td>
      <td>...</td>
      <td>130517</td>
      <td>74286328</td>
      <td>5645899</td>
      <td>1019612478</td>
      <td>19138981.0</td>
      <td>197309.58</td>
      <td>2.962550e+05</td>
      <td>186266</td>
      <td>2.350715e+06</td>
      <td>1.179750e+09</td>
    </tr>
    <tr>
      <th>CLEAR LAKE</th>
      <td>86176860</td>
      <td>355317.0</td>
      <td>2.181816e+10</td>
      <td>5149583</td>
      <td>929624767</td>
      <td>238845</td>
      <td>20778025</td>
      <td>154819</td>
      <td>158942.72</td>
      <td>41980.030000</td>
      <td>...</td>
      <td>124114</td>
      <td>86176860</td>
      <td>5149583</td>
      <td>929624767</td>
      <td>20778025.0</td>
      <td>214367.99</td>
      <td>3.219187e+05</td>
      <td>154819</td>
      <td>2.130372e+06</td>
      <td>1.053834e+09</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>WALFORD</th>
      <td>1006860</td>
      <td>11058.0</td>
      <td>2.005134e+08</td>
      <td>45335</td>
      <td>6652603</td>
      <td>1974</td>
      <td>199500</td>
      <td>1429</td>
      <td>1415.75</td>
      <td>373.890000</td>
      <td>...</td>
      <td>1218</td>
      <td>1006860</td>
      <td>45335</td>
      <td>6652603</td>
      <td>199500.0</td>
      <td>1899.50</td>
      <td>2.852970e+03</td>
      <td>1429</td>
      <td>2.014426e+04</td>
      <td>1.015609e+07</td>
    </tr>
    <tr>
      <th>DAKOTA CITY</th>
      <td>1098250</td>
      <td>10580.0</td>
      <td>2.379560e+08</td>
      <td>54567</td>
      <td>8602753</td>
      <td>3817</td>
      <td>152225</td>
      <td>3035</td>
      <td>1869.20</td>
      <td>493.960000</td>
      <td>...</td>
      <td>1272</td>
      <td>1098250</td>
      <td>54567</td>
      <td>8602753</td>
      <td>152225.0</td>
      <td>1427.74</td>
      <td>2.144150e+03</td>
      <td>3035</td>
      <td>1.993156e+04</td>
      <td>1.162167e+07</td>
    </tr>
    <tr>
      <th>OTHO</th>
      <td>672875</td>
      <td>16450.0</td>
      <td>1.807758e+08</td>
      <td>43269</td>
      <td>5931563</td>
      <td>2637</td>
      <td>163125</td>
      <td>2443</td>
      <td>1679.40</td>
      <td>443.780000</td>
      <td>...</td>
      <td>1041</td>
      <td>672875</td>
      <td>43269</td>
      <td>5931563</td>
      <td>163125.0</td>
      <td>1216.85</td>
      <td>1.827000e+03</td>
      <td>2443</td>
      <td>1.940232e+04</td>
      <td>8.849575e+06</td>
    </tr>
    <tr>
      <th>MARTENSDALE</th>
      <td>702048</td>
      <td>12922.0</td>
      <td>1.480708e+08</td>
      <td>38795</td>
      <td>6449091</td>
      <td>1669</td>
      <td>112175</td>
      <td>1881</td>
      <td>1324.70</td>
      <td>350.170000</td>
      <td>...</td>
      <td>823</td>
      <td>702048</td>
      <td>38795</td>
      <td>6449091</td>
      <td>112175.0</td>
      <td>1173.95</td>
      <td>1.765610e+03</td>
      <td>1881</td>
      <td>1.839646e+04</td>
      <td>7.122720e+06</td>
    </tr>
    <tr>
      <th>MONTROSE</th>
      <td>1377080</td>
      <td>15064.0</td>
      <td>2.801652e+08</td>
      <td>74440</td>
      <td>11586234</td>
      <td>4398</td>
      <td>188675</td>
      <td>2527</td>
      <td>1441.47</td>
      <td>380.980000</td>
      <td>...</td>
      <td>1284</td>
      <td>1377080</td>
      <td>74440</td>
      <td>11586234</td>
      <td>188675.0</td>
      <td>1749.35</td>
      <td>2.626950e+03</td>
      <td>2527</td>
      <td>1.832241e+04</td>
      <td>1.415989e+07</td>
    </tr>
    <tr>
      <th>WHEATLAND</th>
      <td>1439868</td>
      <td>6693.0</td>
      <td>3.026881e+08</td>
      <td>71556</td>
      <td>11966994</td>
      <td>3654</td>
      <td>253125</td>
      <td>1860</td>
      <td>1421.73</td>
      <td>375.460000</td>
      <td>...</td>
      <td>1718</td>
      <td>1439868</td>
      <td>71556</td>
      <td>11966994</td>
      <td>253125.0</td>
      <td>2397.11</td>
      <td>3.599520e+03</td>
      <td>1860</td>
      <td>1.807145e+04</td>
      <td>1.535811e+07</td>
    </tr>
    <tr>
      <th>ALTA</th>
      <td>657624</td>
      <td>1452.0</td>
      <td>1.366657e+08</td>
      <td>33909</td>
      <td>4489933</td>
      <td>1632</td>
      <td>125375</td>
      <td>2042</td>
      <td>1599.50</td>
      <td>422.760000</td>
      <td>...</td>
      <td>709</td>
      <td>657624</td>
      <td>33909</td>
      <td>4489933</td>
      <td>125375.0</td>
      <td>916.20</td>
      <td>1.375070e+03</td>
      <td>2042</td>
      <td>1.783164e+04</td>
      <td>6.732264e+06</td>
    </tr>
    <tr>
      <th>SULLY</th>
      <td>532105</td>
      <td>5750.0</td>
      <td>1.196082e+08</td>
      <td>29640</td>
      <td>4866399</td>
      <td>1487</td>
      <td>98725</td>
      <td>1566</td>
      <td>1134.30</td>
      <td>299.850000</td>
      <td>...</td>
      <td>632</td>
      <td>532105</td>
      <td>29640</td>
      <td>4866399</td>
      <td>98725.0</td>
      <td>1031.99</td>
      <td>1.550020e+03</td>
      <td>1566</td>
      <td>1.752950e+04</td>
      <td>5.778865e+06</td>
    </tr>
    <tr>
      <th>DELMAR</th>
      <td>899118</td>
      <td>4554.0</td>
      <td>2.054581e+08</td>
      <td>52371</td>
      <td>8277788</td>
      <td>2888</td>
      <td>155825</td>
      <td>1973</td>
      <td>1360.33</td>
      <td>359.570000</td>
      <td>...</td>
      <td>1399</td>
      <td>899118</td>
      <td>52371</td>
      <td>8277788</td>
      <td>155825.0</td>
      <td>1444.50</td>
      <td>2.171830e+03</td>
      <td>1973</td>
      <td>1.735900e+04</td>
      <td>1.030333e+07</td>
    </tr>
    <tr>
      <th>VILLISCA</th>
      <td>795800</td>
      <td>12696.0</td>
      <td>1.911242e+08</td>
      <td>45118</td>
      <td>7365245</td>
      <td>1950</td>
      <td>179125</td>
      <td>1566</td>
      <td>1499.75</td>
      <td>396.210000</td>
      <td>...</td>
      <td>937</td>
      <td>795800</td>
      <td>45118</td>
      <td>7365245</td>
      <td>179125.0</td>
      <td>1635.84</td>
      <td>2.456730e+03</td>
      <td>1566</td>
      <td>1.680238e+04</td>
      <td>9.358976e+06</td>
    </tr>
    <tr>
      <th>NORTH ENGLISH</th>
      <td>1754074</td>
      <td>16752.0</td>
      <td>3.629388e+08</td>
      <td>98501</td>
      <td>15494009</td>
      <td>4194</td>
      <td>333750</td>
      <td>1705</td>
      <td>1856.41</td>
      <td>490.640000</td>
      <td>...</td>
      <td>960</td>
      <td>1754074</td>
      <td>98501</td>
      <td>15494009</td>
      <td>333750.0</td>
      <td>2588.42</td>
      <td>3.888040e+03</td>
      <td>1705</td>
      <td>1.658446e+04</td>
      <td>1.825828e+07</td>
    </tr>
    <tr>
      <th>AURELIA</th>
      <td>487377</td>
      <td>1782.0</td>
      <td>1.021761e+08</td>
      <td>21771</td>
      <td>3031122</td>
      <td>1402</td>
      <td>87950</td>
      <td>1816</td>
      <td>1368.30</td>
      <td>361.680000</td>
      <td>...</td>
      <td>590</td>
      <td>487377</td>
      <td>21771</td>
      <td>3031122</td>
      <td>87950.0</td>
      <td>717.69</td>
      <td>1.078990e+03</td>
      <td>1816</td>
      <td>1.643316e+04</td>
      <td>5.049495e+06</td>
    </tr>
    <tr>
      <th>MINDEN</th>
      <td>838674</td>
      <td>12636.0</td>
      <td>1.685966e+08</td>
      <td>39936</td>
      <td>6483356</td>
      <td>2271</td>
      <td>135350</td>
      <td>1445</td>
      <td>1019.59</td>
      <td>269.460000</td>
      <td>...</td>
      <td>1093</td>
      <td>838674</td>
      <td>39936</td>
      <td>6483356</td>
      <td>135350.0</td>
      <td>1396.56</td>
      <td>2.096380e+03</td>
      <td>1445</td>
      <td>1.485285e+04</td>
      <td>8.351586e+06</td>
    </tr>
    <tr>
      <th>MERRILL</th>
      <td>667990</td>
      <td>10050.0</td>
      <td>1.391722e+08</td>
      <td>31313</td>
      <td>4831118</td>
      <td>1939</td>
      <td>110775</td>
      <td>1406</td>
      <td>946.02</td>
      <td>249.980000</td>
      <td>...</td>
      <td>627</td>
      <td>667990</td>
      <td>31313</td>
      <td>4831118</td>
      <td>110775.0</td>
      <td>935.62</td>
      <td>1.405560e+03</td>
      <td>1406</td>
      <td>1.196527e+04</td>
      <td>6.839092e+06</td>
    </tr>
    <tr>
      <th>LOVILIA</th>
      <td>620619</td>
      <td>8772.0</td>
      <td>1.339165e+08</td>
      <td>30956</td>
      <td>5083251</td>
      <td>1990</td>
      <td>89900</td>
      <td>1160</td>
      <td>706.45</td>
      <td>186.670000</td>
      <td>...</td>
      <td>838</td>
      <td>620619</td>
      <td>30956</td>
      <td>5083251</td>
      <td>89900.0</td>
      <td>992.63</td>
      <td>1.490680e+03</td>
      <td>1160</td>
      <td>1.162769e+04</td>
      <td>6.469350e+06</td>
    </tr>
    <tr>
      <th>KELLOG</th>
      <td>801987</td>
      <td>9850.0</td>
      <td>2.048704e+08</td>
      <td>57053</td>
      <td>8187857</td>
      <td>2260</td>
      <td>195725</td>
      <td>1132</td>
      <td>923.06</td>
      <td>243.830000</td>
      <td>...</td>
      <td>596</td>
      <td>801987</td>
      <td>57053</td>
      <td>8187857</td>
      <td>195725.0</td>
      <td>1833.66</td>
      <td>2.752020e+03</td>
      <td>1132</td>
      <td>1.118002e+04</td>
      <td>9.876792e+06</td>
    </tr>
    <tr>
      <th>DANVILLE</th>
      <td>559104</td>
      <td>3248.0</td>
      <td>1.198225e+08</td>
      <td>27880</td>
      <td>4853534</td>
      <td>1822</td>
      <td>85725</td>
      <td>1064</td>
      <td>706.06</td>
      <td>186.630000</td>
      <td>...</td>
      <td>584</td>
      <td>559104</td>
      <td>27880</td>
      <td>4853534</td>
      <td>85725.0</td>
      <td>949.88</td>
      <td>1.425040e+03</td>
      <td>1064</td>
      <td>1.082697e+04</td>
      <td>5.893776e+06</td>
    </tr>
    <tr>
      <th>EVERLY</th>
      <td>360346</td>
      <td>2058.0</td>
      <td>1.013555e+08</td>
      <td>25331</td>
      <td>3385315</td>
      <td>1092</td>
      <td>106250</td>
      <td>805</td>
      <td>882.25</td>
      <td>233.050000</td>
      <td>...</td>
      <td>467</td>
      <td>360346</td>
      <td>25331</td>
      <td>3385315</td>
      <td>106250.0</td>
      <td>962.85</td>
      <td>1.445940e+03</td>
      <td>805</td>
      <td>1.079394e+04</td>
      <td>5.031124e+06</td>
    </tr>
    <tr>
      <th>Carroll</th>
      <td>81207</td>
      <td>126.0</td>
      <td>9.664800e+06</td>
      <td>1044</td>
      <td>242964</td>
      <td>108</td>
      <td>6750</td>
      <td>372</td>
      <td>279.00</td>
      <td>73.740000</td>
      <td>...</td>
      <td>51</td>
      <td>81207</td>
      <td>1044</td>
      <td>242964</td>
      <td>6750.0</td>
      <td>158.31</td>
      <td>2.375100e+02</td>
      <td>372</td>
      <td>9.817080e+03</td>
      <td>4.626090e+05</td>
    </tr>
    <tr>
      <th>MELBOURNE</th>
      <td>247266</td>
      <td>3648.0</td>
      <td>5.848099e+07</td>
      <td>13359</td>
      <td>2460402</td>
      <td>564</td>
      <td>62425</td>
      <td>736</td>
      <td>720.00</td>
      <td>190.240000</td>
      <td>...</td>
      <td>257</td>
      <td>247266</td>
      <td>13359</td>
      <td>2460402</td>
      <td>62425.0</td>
      <td>525.20</td>
      <td>7.894800e+02</td>
      <td>736</td>
      <td>9.007320e+03</td>
      <td>2.859234e+06</td>
    </tr>
    <tr>
      <th>SCHALLER</th>
      <td>498456</td>
      <td>10449.0</td>
      <td>1.350451e+08</td>
      <td>31017</td>
      <td>5638350</td>
      <td>1356</td>
      <td>146250</td>
      <td>581</td>
      <td>686.00</td>
      <td>181.270000</td>
      <td>...</td>
      <td>536</td>
      <td>498456</td>
      <td>31017</td>
      <td>5638350</td>
      <td>146250.0</td>
      <td>1338.27</td>
      <td>2.010290e+03</td>
      <td>581</td>
      <td>8.385040e+03</td>
      <td>6.585837e+06</td>
    </tr>
    <tr>
      <th>LOHRVILLE</th>
      <td>379089</td>
      <td>949.0</td>
      <td>7.614313e+07</td>
      <td>16039</td>
      <td>3378167</td>
      <td>1020</td>
      <td>62775</td>
      <td>816</td>
      <td>601.55</td>
      <td>158.880000</td>
      <td>...</td>
      <td>536</td>
      <td>379089</td>
      <td>16039</td>
      <td>3378167</td>
      <td>62775.0</td>
      <td>598.67</td>
      <td>8.993800e+02</td>
      <td>816</td>
      <td>8.018970e+03</td>
      <td>3.756069e+06</td>
    </tr>
    <tr>
      <th>DELHI</th>
      <td>621000</td>
      <td>3360.0</td>
      <td>1.250370e+08</td>
      <td>28191</td>
      <td>5203460</td>
      <td>2022</td>
      <td>68175</td>
      <td>721</td>
      <td>415.69</td>
      <td>109.820000</td>
      <td>...</td>
      <td>764</td>
      <td>621000</td>
      <td>28191</td>
      <td>5203460</td>
      <td>68175.0</td>
      <td>886.32</td>
      <td>1.330740e+03</td>
      <td>721</td>
      <td>6.813300e+03</td>
      <td>6.266760e+06</td>
    </tr>
    <tr>
      <th>SEYMOUR</th>
      <td>438228</td>
      <td>NaN</td>
      <td>8.753869e+07</td>
      <td>18415</td>
      <td>3587268</td>
      <td>1249</td>
      <td>64400</td>
      <td>642</td>
      <td>428.53</td>
      <td>113.160000</td>
      <td>...</td>
      <td>150</td>
      <td>438228</td>
      <td>18415</td>
      <td>3587268</td>
      <td>64400.0</td>
      <td>688.13</td>
      <td>1.032730e+03</td>
      <td>642</td>
      <td>6.726960e+03</td>
      <td>4.417560e+06</td>
    </tr>
    <tr>
      <th>ROBINS</th>
      <td>228448</td>
      <td>2508.0</td>
      <td>4.598717e+07</td>
      <td>11391</td>
      <td>1846856</td>
      <td>498</td>
      <td>38250</td>
      <td>332</td>
      <td>286.50</td>
      <td>75.730000</td>
      <td>...</td>
      <td>337</td>
      <td>228448</td>
      <td>11391</td>
      <td>1846856</td>
      <td>38250.0</td>
      <td>436.92</td>
      <td>6.561400e+02</td>
      <td>332</td>
      <td>4.767120e+03</td>
      <td>2.302432e+06</td>
    </tr>
    <tr>
      <th>Davenport</th>
      <td>18044</td>
      <td>164.0</td>
      <td>2.144000e+06</td>
      <td>202</td>
      <td>73265</td>
      <td>12</td>
      <td>1500</td>
      <td>252</td>
      <td>189.00</td>
      <td>49.930000</td>
      <td>...</td>
      <td>4</td>
      <td>18044</td>
      <td>202</td>
      <td>73265</td>
      <td>1500.0</td>
      <td>23.01</td>
      <td>3.452000e+01</td>
      <td>252</td>
      <td>4.643520e+03</td>
      <td>1.056020e+05</td>
    </tr>
    <tr>
      <th>GILBERTVILLE</th>
      <td>312120</td>
      <td>420.0</td>
      <td>6.238184e+07</td>
      <td>14879</td>
      <td>2620533</td>
      <td>857</td>
      <td>44050</td>
      <td>335</td>
      <td>244.81</td>
      <td>64.660000</td>
      <td>...</td>
      <td>180</td>
      <td>312120</td>
      <td>14879</td>
      <td>2620533</td>
      <td>44050.0</td>
      <td>519.98</td>
      <td>7.801200e+02</td>
      <td>335</td>
      <td>4.207660e+03</td>
      <td>3.038040e+06</td>
    </tr>
    <tr>
      <th>RUNNELLS</th>
      <td>245152</td>
      <td>NaN</td>
      <td>4.877912e+07</td>
      <td>11818</td>
      <td>2131865</td>
      <td>714</td>
      <td>33075</td>
      <td>267</td>
      <td>189.43</td>
      <td>49.990000</td>
      <td>...</td>
      <td>141</td>
      <td>245152</td>
      <td>11818</td>
      <td>2131865</td>
      <td>33075.0</td>
      <td>378.12</td>
      <td>5.673000e+02</td>
      <td>267</td>
      <td>3.086250e+03</td>
      <td>2.361139e+06</td>
    </tr>
    <tr>
      <th>TABOR</th>
      <td>245481</td>
      <td>NaN</td>
      <td>4.877912e+07</td>
      <td>11818</td>
      <td>2131865</td>
      <td>714</td>
      <td>33075</td>
      <td>267</td>
      <td>189.43</td>
      <td>49.990000</td>
      <td>...</td>
      <td>141</td>
      <td>245481</td>
      <td>11818</td>
      <td>2131865</td>
      <td>33075.0</td>
      <td>378.12</td>
      <td>5.673000e+02</td>
      <td>267</td>
      <td>3.086250e+03</td>
      <td>2.427691e+06</td>
    </tr>
    <tr>
      <th>GRISWOLD</th>
      <td>229540</td>
      <td>690.0</td>
      <td>4.763664e+07</td>
      <td>9671</td>
      <td>1799669</td>
      <td>462</td>
      <td>45550</td>
      <td>239</td>
      <td>255.55</td>
      <td>67.440000</td>
      <td>...</td>
      <td>100</td>
      <td>229540</td>
      <td>9671</td>
      <td>1799669</td>
      <td>45550.0</td>
      <td>404.33</td>
      <td>6.065700e+02</td>
      <td>239</td>
      <td>2.884660e+03</td>
      <td>2.370610e+06</td>
    </tr>
  </tbody>
</table>
<p>386 rows × 21 columns</p>
</div>




```python
df.groupby('City').sum().sort_values('Sale', ascending=False)
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
      <th>Store Number</th>
      <th>County Number</th>
      <th>Category</th>
      <th>Vendor Number</th>
      <th>Item Number</th>
      <th>Pack</th>
      <th>Bottle Volume (ml)</th>
      <th>Bottles Sold</th>
      <th>Volume Sold (Liters)</th>
      <th>Volume Sold (Gallons)</th>
      <th>...</th>
      <th>Month</th>
      <th>Store_Number</th>
      <th>Vendor_Number</th>
      <th>Item_Number</th>
      <th>Bottle_Volume</th>
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
      <th>Zip_Code</th>
    </tr>
    <tr>
      <th>City</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>DES MOINES</th>
      <td>868952982</td>
      <td>18297895.0</td>
      <td>2.478366e+11</td>
      <td>61663941</td>
      <td>12405329015</td>
      <td>3140563</td>
      <td>200851304</td>
      <td>3456812</td>
      <td>2737345.55</td>
      <td>723268.840001</td>
      <td>...</td>
      <td>1367728</td>
      <td>868952982</td>
      <td>61663941</td>
      <td>12405329015</td>
      <td>200851304.0</td>
      <td>2390173.07</td>
      <td>3.588329e+06</td>
      <td>3456812</td>
      <td>4.443986e+07</td>
      <td>1.196452e+10</td>
    </tr>
    <tr>
      <th>CEDAR RAPIDS</th>
      <td>637407493</td>
      <td>10551726.0</td>
      <td>1.940740e+11</td>
      <td>47939578</td>
      <td>8598599700</td>
      <td>2488824</td>
      <td>157678227</td>
      <td>1914428</td>
      <td>1677148.46</td>
      <td>443109.460001</td>
      <td>...</td>
      <td>1090647</td>
      <td>637407493</td>
      <td>47939578</td>
      <td>8598599700</td>
      <td>157678227.0</td>
      <td>1789750.10</td>
      <td>2.687219e+06</td>
      <td>1914428</td>
      <td>2.448673e+07</td>
      <td>9.753066e+09</td>
    </tr>
    <tr>
      <th>DAVENPORT</th>
      <td>409310747</td>
      <td>9508802.0</td>
      <td>1.216956e+11</td>
      <td>29958350</td>
      <td>5394246848</td>
      <td>1594536</td>
      <td>98355824</td>
      <td>1532850</td>
      <td>1157198.64</td>
      <td>305757.360000</td>
      <td>...</td>
      <td>675412</td>
      <td>409310747</td>
      <td>29958350</td>
      <td>5394246848</td>
      <td>98355824.0</td>
      <td>1067066.14</td>
      <td>1.602215e+06</td>
      <td>1532850</td>
      <td>1.747656e+07</td>
      <td>6.158730e+09</td>
    </tr>
    <tr>
      <th>IOWA CITY</th>
      <td>259665806</td>
      <td>4178512.0</td>
      <td>8.370079e+10</td>
      <td>20621692</td>
      <td>3910522645</td>
      <td>989955</td>
      <td>70532715</td>
      <td>963948</td>
      <td>841650.17</td>
      <td>222360.520000</td>
      <td>...</td>
      <td>461704</td>
      <td>259665806</td>
      <td>20621692</td>
      <td>3910522645</td>
      <td>70532715.0</td>
      <td>814878.81</td>
      <td>1.223565e+06</td>
      <td>963948</td>
      <td>1.279549e+07</td>
      <td>4.197901e+09</td>
    </tr>
    <tr>
      <th>WATERLOO</th>
      <td>305222100</td>
      <td>591675.0</td>
      <td>8.850820e+10</td>
      <td>21731427</td>
      <td>3948224576</td>
      <td>1205400</td>
      <td>69001243</td>
      <td>1169700</td>
      <td>822010.40</td>
      <td>217196.600000</td>
      <td>...</td>
      <td>487965</td>
      <td>305222100</td>
      <td>21731427</td>
      <td>3948224576</td>
      <td>69001243.0</td>
      <td>764977.11</td>
      <td>1.148562e+06</td>
      <td>1169700</td>
      <td>1.256057e+07</td>
      <td>4.293309e+09</td>
    </tr>
    <tr>
      <th>WEST DES MOINES</th>
      <td>232836400</td>
      <td>5453443.0</td>
      <td>7.481824e+10</td>
      <td>18326691</td>
      <td>3349141989</td>
      <td>865201</td>
      <td>64088226</td>
      <td>761972</td>
      <td>740992.30</td>
      <td>195770.020000</td>
      <td>...</td>
      <td>424642</td>
      <td>232836400</td>
      <td>18326691</td>
      <td>3349141989</td>
      <td>64088226.0</td>
      <td>756489.39</td>
      <td>1.135848e+06</td>
      <td>761972</td>
      <td>1.235846e+07</td>
      <td>3.608603e+09</td>
    </tr>
    <tr>
      <th>SIOUX CITY</th>
      <td>283659813</td>
      <td>7680363.0</td>
      <td>8.341733e+10</td>
      <td>20468971</td>
      <td>3603982716</td>
      <td>990579</td>
      <td>72539815</td>
      <td>910798</td>
      <td>796784.53</td>
      <td>210524.610000</td>
      <td>...</td>
      <td>468650</td>
      <td>283659813</td>
      <td>20468971</td>
      <td>3603982716</td>
      <td>72539815.0</td>
      <td>801321.81</td>
      <td>1.203069e+06</td>
      <td>910798</td>
      <td>1.201932e+07</td>
      <td>4.080970e+09</td>
    </tr>
    <tr>
      <th>COUNCIL BLUFFS</th>
      <td>295975175</td>
      <td>6313164.0</td>
      <td>8.445430e+10</td>
      <td>20335153</td>
      <td>3697582178</td>
      <td>1092658</td>
      <td>71787815</td>
      <td>871597</td>
      <td>770795.08</td>
      <td>203651.120000</td>
      <td>...</td>
      <td>466975</td>
      <td>295975175</td>
      <td>20335153</td>
      <td>3697582178</td>
      <td>71787815.0</td>
      <td>769002.38</td>
      <td>1.154492e+06</td>
      <td>871597</td>
      <td>1.152233e+07</td>
      <td>4.168457e+09</td>
    </tr>
    <tr>
      <th>DUBUQUE</th>
      <td>225864047</td>
      <td>2112278.0</td>
      <td>7.152862e+10</td>
      <td>17101034</td>
      <td>3050705446</td>
      <td>797399</td>
      <td>64614585</td>
      <td>701327</td>
      <td>667482.30</td>
      <td>176348.530000</td>
      <td>...</td>
      <td>397332</td>
      <td>225864047</td>
      <td>17101034</td>
      <td>3050705446</td>
      <td>64614585.0</td>
      <td>692184.47</td>
      <td>1.039391e+06</td>
      <td>701327</td>
      <td>9.650613e+06</td>
      <td>3.565012e+09</td>
    </tr>
    <tr>
      <th>AMES</th>
      <td>263220972</td>
      <td>6450905.0</td>
      <td>7.919604e+10</td>
      <td>19670736</td>
      <td>3655102990</td>
      <td>880812</td>
      <td>70021883</td>
      <td>679597</td>
      <td>666521.31</td>
      <td>176096.070000</td>
      <td>...</td>
      <td>441247</td>
      <td>263220972</td>
      <td>19670736</td>
      <td>3655102990</td>
      <td>70021883.0</td>
      <td>798237.83</td>
      <td>1.198673e+06</td>
      <td>679597</td>
      <td>9.587908e+06</td>
      <td>3.795428e+09</td>
    </tr>
    <tr>
      <th>ANKENY</th>
      <td>166817928</td>
      <td>3678906.0</td>
      <td>4.975856e+10</td>
      <td>12185551</td>
      <td>2133354574</td>
      <td>534657</td>
      <td>45665324</td>
      <td>473757</td>
      <td>483007.32</td>
      <td>127614.720000</td>
      <td>...</td>
      <td>281031</td>
      <td>166817928</td>
      <td>12185551</td>
      <td>2133354574</td>
      <td>45665324.0</td>
      <td>535625.44</td>
      <td>8.043293e+05</td>
      <td>473757</td>
      <td>7.141135e+06</td>
      <td>2.389949e+09</td>
    </tr>
    <tr>
      <th>CORALVILLE</th>
      <td>124635526</td>
      <td>1852812.0</td>
      <td>3.769315e+10</td>
      <td>9353292</td>
      <td>2013176284</td>
      <td>413848</td>
      <td>33399959</td>
      <td>419205</td>
      <td>398461.96</td>
      <td>105276.070000</td>
      <td>...</td>
      <td>212549</td>
      <td>124635526</td>
      <td>9353292</td>
      <td>2013176284</td>
      <td>33399959.0</td>
      <td>403898.77</td>
      <td>6.064109e+05</td>
      <td>419205</td>
      <td>6.854789e+06</td>
      <td>1.887885e+09</td>
    </tr>
    <tr>
      <th>BETTENDORF</th>
      <td>129278451</td>
      <td>2907448.0</td>
      <td>3.838366e+10</td>
      <td>9422141</td>
      <td>1711951656</td>
      <td>412437</td>
      <td>34528512</td>
      <td>441044</td>
      <td>408584.99</td>
      <td>107951.590000</td>
      <td>...</td>
      <td>210490</td>
      <td>129278451</td>
      <td>9422141</td>
      <td>1711951656</td>
      <td>34528512.0</td>
      <td>418238.32</td>
      <td>6.278674e+05</td>
      <td>441044</td>
      <td>6.632695e+06</td>
      <td>1.939431e+09</td>
    </tr>
    <tr>
      <th>CEDAR FALLS</th>
      <td>213903540</td>
      <td>400939.0</td>
      <td>5.976955e+10</td>
      <td>14707086</td>
      <td>2795086510</td>
      <td>676843</td>
      <td>52043965</td>
      <td>494971</td>
      <td>460805.22</td>
      <td>121752.030000</td>
      <td>...</td>
      <td>337445</td>
      <td>213903540</td>
      <td>14707086</td>
      <td>2795086510</td>
      <td>52043965.0</td>
      <td>576279.69</td>
      <td>8.653990e+05</td>
      <td>494971</td>
      <td>6.589479e+06</td>
      <td>2.899127e+09</td>
    </tr>
    <tr>
      <th>WINDSOR HEIGHTS</th>
      <td>88891788</td>
      <td>2131283.0</td>
      <td>2.883234e+10</td>
      <td>6961754</td>
      <td>1316709740</td>
      <td>339889</td>
      <td>25597303</td>
      <td>371208</td>
      <td>412029.59</td>
      <td>108862.320000</td>
      <td>...</td>
      <td>160000</td>
      <td>88891788</td>
      <td>6961754</td>
      <td>1316709740</td>
      <td>25597303.0</td>
      <td>293894.38</td>
      <td>4.412831e+05</td>
      <td>371208</td>
      <td>5.990735e+06</td>
      <td>1.392631e+09</td>
    </tr>
    <tr>
      <th>MASON CITY</th>
      <td>132175119</td>
      <td>711076.0</td>
      <td>4.426549e+10</td>
      <td>11051610</td>
      <td>1905257264</td>
      <td>502197</td>
      <td>41040981</td>
      <td>390217</td>
      <td>375518.46</td>
      <td>99210.810000</td>
      <td>...</td>
      <td>248625</td>
      <td>132175119</td>
      <td>11051610</td>
      <td>1905257264</td>
      <td>41040981.0</td>
      <td>418363.24</td>
      <td>6.282773e+05</td>
      <td>390217</td>
      <td>4.842734e+06</td>
      <td>2.133726e+09</td>
    </tr>
    <tr>
      <th>FORT DODGE</th>
      <td>105794826</td>
      <td>2545780.0</td>
      <td>3.072538e+10</td>
      <td>7677833</td>
      <td>1333638905</td>
      <td>338980</td>
      <td>28893212</td>
      <td>339020</td>
      <td>318878.97</td>
      <td>84243.040000</td>
      <td>...</td>
      <td>171862</td>
      <td>105794826</td>
      <td>7677833</td>
      <td>1333638905</td>
      <td>28893212.0</td>
      <td>286560.70</td>
      <td>4.303711e+05</td>
      <td>339020</td>
      <td>4.333031e+06</td>
      <td>1.486143e+09</td>
    </tr>
    <tr>
      <th>BURLINGTON</th>
      <td>114273343</td>
      <td>900247.0</td>
      <td>3.239620e+10</td>
      <td>8091324</td>
      <td>1451435311</td>
      <td>410071</td>
      <td>26355753</td>
      <td>308723</td>
      <td>240293.95</td>
      <td>63494.570000</td>
      <td>...</td>
      <td>182234</td>
      <td>114273343</td>
      <td>8091324</td>
      <td>1451435311</td>
      <td>26355753.0</td>
      <td>293626.73</td>
      <td>4.407700e+05</td>
      <td>308723</td>
      <td>3.731482e+06</td>
      <td>1.633675e+09</td>
    </tr>
    <tr>
      <th>MARSHALLTOWN</th>
      <td>91685992</td>
      <td>1713472.0</td>
      <td>2.799106e+10</td>
      <td>7002946</td>
      <td>1204313557</td>
      <td>317585</td>
      <td>26122203</td>
      <td>273714</td>
      <td>253245.27</td>
      <td>66901.670000</td>
      <td>...</td>
      <td>156238</td>
      <td>91685992</td>
      <td>7002946</td>
      <td>1204313557</td>
      <td>26122203.0</td>
      <td>270012.44</td>
      <td>4.054909e+05</td>
      <td>273714</td>
      <td>3.683832e+06</td>
      <td>1.342880e+09</td>
    </tr>
    <tr>
      <th>CLINTON</th>
      <td>103122918</td>
      <td>705456.0</td>
      <td>3.237821e+10</td>
      <td>8047103</td>
      <td>1406093501</td>
      <td>402334</td>
      <td>27956025</td>
      <td>297608</td>
      <td>267297.76</td>
      <td>70618.570000</td>
      <td>...</td>
      <td>181377</td>
      <td>103122918</td>
      <td>8047103</td>
      <td>1406093501</td>
      <td>27956025.0</td>
      <td>281922.26</td>
      <td>4.233242e+05</td>
      <td>297608</td>
      <td>3.634210e+06</td>
      <td>1.633640e+09</td>
    </tr>
    <tr>
      <th>URBANDALE</th>
      <td>94129635</td>
      <td>1870253.0</td>
      <td>2.527484e+10</td>
      <td>6178466</td>
      <td>1061737780</td>
      <td>302756</td>
      <td>22285912</td>
      <td>245167</td>
      <td>213976.22</td>
      <td>56536.070000</td>
      <td>...</td>
      <td>147311</td>
      <td>94129635</td>
      <td>6178466</td>
      <td>1061737780</td>
      <td>22285912.0</td>
      <td>252910.90</td>
      <td>3.797862e+05</td>
      <td>245167</td>
      <td>3.392298e+06</td>
      <td>1.222241e+09</td>
    </tr>
    <tr>
      <th>MUSCATINE</th>
      <td>112328486</td>
      <td>2357460.0</td>
      <td>3.520959e+10</td>
      <td>8559024</td>
      <td>1523829953</td>
      <td>431768</td>
      <td>30268531</td>
      <td>259294</td>
      <td>248435.98</td>
      <td>65636.790000</td>
      <td>...</td>
      <td>193930</td>
      <td>112328486</td>
      <td>8559024</td>
      <td>1523829953</td>
      <td>30268531.0</td>
      <td>318107.11</td>
      <td>4.776874e+05</td>
      <td>259294</td>
      <td>3.381011e+06</td>
      <td>1.776885e+09</td>
    </tr>
    <tr>
      <th>ALTOONA</th>
      <td>72443965</td>
      <td>1640793.0</td>
      <td>2.230951e+10</td>
      <td>5381804</td>
      <td>943513422</td>
      <td>270451</td>
      <td>19912031</td>
      <td>222839</td>
      <td>208620.46</td>
      <td>55123.270000</td>
      <td>...</td>
      <td>125619</td>
      <td>72443965</td>
      <td>5381804</td>
      <td>943513422</td>
      <td>19912031.0</td>
      <td>205723.36</td>
      <td>3.089460e+05</td>
      <td>222839</td>
      <td>2.963462e+06</td>
      <td>1.070193e+09</td>
    </tr>
    <tr>
      <th>KEOKUK</th>
      <td>47730250</td>
      <td>955808.0</td>
      <td>1.786505e+10</td>
      <td>4477606</td>
      <td>800317015</td>
      <td>200901</td>
      <td>16604575</td>
      <td>205772</td>
      <td>196203.86</td>
      <td>51836.180000</td>
      <td>...</td>
      <td>97120</td>
      <td>47730250</td>
      <td>4477606</td>
      <td>800317015</td>
      <td>16604575.0</td>
      <td>175570.83</td>
      <td>2.635351e+05</td>
      <td>205772</td>
      <td>2.916154e+06</td>
      <td>8.983230e+08</td>
    </tr>
    <tr>
      <th>MARION</th>
      <td>78549797</td>
      <td>1373187.0</td>
      <td>2.510294e+10</td>
      <td>6157256</td>
      <td>1050255461</td>
      <td>299690</td>
      <td>22817000</td>
      <td>220852</td>
      <td>208900.84</td>
      <td>55188.550000</td>
      <td>...</td>
      <td>140231</td>
      <td>78549797</td>
      <td>6157256</td>
      <td>1050255461</td>
      <td>22817000.0</td>
      <td>229697.38</td>
      <td>3.449333e+05</td>
      <td>220852</td>
      <td>2.753354e+06</td>
      <td>1.254790e+09</td>
    </tr>
    <tr>
      <th>MOUNT VERNON</th>
      <td>54780859</td>
      <td>652194.0</td>
      <td>1.195423e+10</td>
      <td>2897386</td>
      <td>746162879</td>
      <td>122746</td>
      <td>11213775</td>
      <td>195916</td>
      <td>195149.82</td>
      <td>51545.860000</td>
      <td>...</td>
      <td>66353</td>
      <td>54780859</td>
      <td>2897386</td>
      <td>746162879</td>
      <td>11213775.0</td>
      <td>130008.99</td>
      <td>1.951605e+05</td>
      <td>195916</td>
      <td>2.737323e+06</td>
      <td>5.985768e+08</td>
    </tr>
    <tr>
      <th>CARROLL</th>
      <td>43972958</td>
      <td>200942.0</td>
      <td>1.495630e+10</td>
      <td>3641642</td>
      <td>614961254</td>
      <td>163150</td>
      <td>14501400</td>
      <td>175448</td>
      <td>193412.92</td>
      <td>51095.760000</td>
      <td>...</td>
      <td>84089</td>
      <td>43972958</td>
      <td>3641642</td>
      <td>614961254</td>
      <td>14501400.0</td>
      <td>142104.03</td>
      <td>2.133878e+05</td>
      <td>175448</td>
      <td>2.605922e+06</td>
      <td>7.377586e+08</td>
    </tr>
    <tr>
      <th>SPIRIT LAKE</th>
      <td>49966334</td>
      <td>499980.0</td>
      <td>1.739151e+10</td>
      <td>4309944</td>
      <td>708166042</td>
      <td>192560</td>
      <td>16791534</td>
      <td>176897</td>
      <td>191891.53</td>
      <td>50684.170000</td>
      <td>...</td>
      <td>98282</td>
      <td>49966334</td>
      <td>4309944</td>
      <td>708166042</td>
      <td>16791534.0</td>
      <td>171550.60</td>
      <td>2.576149e+05</td>
      <td>176897</td>
      <td>2.535546e+06</td>
      <td>8.559658e+08</td>
    </tr>
    <tr>
      <th>OTTUMWA</th>
      <td>74286328</td>
      <td>2022390.0</td>
      <td>2.341499e+10</td>
      <td>5645899</td>
      <td>1019612478</td>
      <td>321464</td>
      <td>19138981</td>
      <td>186266</td>
      <td>164789.43</td>
      <td>43542.190000</td>
      <td>...</td>
      <td>130517</td>
      <td>74286328</td>
      <td>5645899</td>
      <td>1019612478</td>
      <td>19138981.0</td>
      <td>197309.58</td>
      <td>2.962550e+05</td>
      <td>186266</td>
      <td>2.350715e+06</td>
      <td>1.179750e+09</td>
    </tr>
    <tr>
      <th>CLEAR LAKE</th>
      <td>86176860</td>
      <td>355317.0</td>
      <td>2.181816e+10</td>
      <td>5149583</td>
      <td>929624767</td>
      <td>238845</td>
      <td>20778025</td>
      <td>154819</td>
      <td>158942.72</td>
      <td>41980.030000</td>
      <td>...</td>
      <td>124114</td>
      <td>86176860</td>
      <td>5149583</td>
      <td>929624767</td>
      <td>20778025.0</td>
      <td>214367.99</td>
      <td>3.219187e+05</td>
      <td>154819</td>
      <td>2.130372e+06</td>
      <td>1.053834e+09</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>WALFORD</th>
      <td>1006860</td>
      <td>11058.0</td>
      <td>2.005134e+08</td>
      <td>45335</td>
      <td>6652603</td>
      <td>1974</td>
      <td>199500</td>
      <td>1429</td>
      <td>1415.75</td>
      <td>373.890000</td>
      <td>...</td>
      <td>1218</td>
      <td>1006860</td>
      <td>45335</td>
      <td>6652603</td>
      <td>199500.0</td>
      <td>1899.50</td>
      <td>2.852970e+03</td>
      <td>1429</td>
      <td>2.014426e+04</td>
      <td>1.015609e+07</td>
    </tr>
    <tr>
      <th>DAKOTA CITY</th>
      <td>1098250</td>
      <td>10580.0</td>
      <td>2.379560e+08</td>
      <td>54567</td>
      <td>8602753</td>
      <td>3817</td>
      <td>152225</td>
      <td>3035</td>
      <td>1869.20</td>
      <td>493.960000</td>
      <td>...</td>
      <td>1272</td>
      <td>1098250</td>
      <td>54567</td>
      <td>8602753</td>
      <td>152225.0</td>
      <td>1427.74</td>
      <td>2.144150e+03</td>
      <td>3035</td>
      <td>1.993156e+04</td>
      <td>1.162167e+07</td>
    </tr>
    <tr>
      <th>OTHO</th>
      <td>672875</td>
      <td>16450.0</td>
      <td>1.807758e+08</td>
      <td>43269</td>
      <td>5931563</td>
      <td>2637</td>
      <td>163125</td>
      <td>2443</td>
      <td>1679.40</td>
      <td>443.780000</td>
      <td>...</td>
      <td>1041</td>
      <td>672875</td>
      <td>43269</td>
      <td>5931563</td>
      <td>163125.0</td>
      <td>1216.85</td>
      <td>1.827000e+03</td>
      <td>2443</td>
      <td>1.940232e+04</td>
      <td>8.849575e+06</td>
    </tr>
    <tr>
      <th>MARTENSDALE</th>
      <td>702048</td>
      <td>12922.0</td>
      <td>1.480708e+08</td>
      <td>38795</td>
      <td>6449091</td>
      <td>1669</td>
      <td>112175</td>
      <td>1881</td>
      <td>1324.70</td>
      <td>350.170000</td>
      <td>...</td>
      <td>823</td>
      <td>702048</td>
      <td>38795</td>
      <td>6449091</td>
      <td>112175.0</td>
      <td>1173.95</td>
      <td>1.765610e+03</td>
      <td>1881</td>
      <td>1.839646e+04</td>
      <td>7.122720e+06</td>
    </tr>
    <tr>
      <th>MONTROSE</th>
      <td>1377080</td>
      <td>15064.0</td>
      <td>2.801652e+08</td>
      <td>74440</td>
      <td>11586234</td>
      <td>4398</td>
      <td>188675</td>
      <td>2527</td>
      <td>1441.47</td>
      <td>380.980000</td>
      <td>...</td>
      <td>1284</td>
      <td>1377080</td>
      <td>74440</td>
      <td>11586234</td>
      <td>188675.0</td>
      <td>1749.35</td>
      <td>2.626950e+03</td>
      <td>2527</td>
      <td>1.832241e+04</td>
      <td>1.415989e+07</td>
    </tr>
    <tr>
      <th>WHEATLAND</th>
      <td>1439868</td>
      <td>6693.0</td>
      <td>3.026881e+08</td>
      <td>71556</td>
      <td>11966994</td>
      <td>3654</td>
      <td>253125</td>
      <td>1860</td>
      <td>1421.73</td>
      <td>375.460000</td>
      <td>...</td>
      <td>1718</td>
      <td>1439868</td>
      <td>71556</td>
      <td>11966994</td>
      <td>253125.0</td>
      <td>2397.11</td>
      <td>3.599520e+03</td>
      <td>1860</td>
      <td>1.807145e+04</td>
      <td>1.535811e+07</td>
    </tr>
    <tr>
      <th>ALTA</th>
      <td>657624</td>
      <td>1452.0</td>
      <td>1.366657e+08</td>
      <td>33909</td>
      <td>4489933</td>
      <td>1632</td>
      <td>125375</td>
      <td>2042</td>
      <td>1599.50</td>
      <td>422.760000</td>
      <td>...</td>
      <td>709</td>
      <td>657624</td>
      <td>33909</td>
      <td>4489933</td>
      <td>125375.0</td>
      <td>916.20</td>
      <td>1.375070e+03</td>
      <td>2042</td>
      <td>1.783164e+04</td>
      <td>6.732264e+06</td>
    </tr>
    <tr>
      <th>SULLY</th>
      <td>532105</td>
      <td>5750.0</td>
      <td>1.196082e+08</td>
      <td>29640</td>
      <td>4866399</td>
      <td>1487</td>
      <td>98725</td>
      <td>1566</td>
      <td>1134.30</td>
      <td>299.850000</td>
      <td>...</td>
      <td>632</td>
      <td>532105</td>
      <td>29640</td>
      <td>4866399</td>
      <td>98725.0</td>
      <td>1031.99</td>
      <td>1.550020e+03</td>
      <td>1566</td>
      <td>1.752950e+04</td>
      <td>5.778865e+06</td>
    </tr>
    <tr>
      <th>DELMAR</th>
      <td>899118</td>
      <td>4554.0</td>
      <td>2.054581e+08</td>
      <td>52371</td>
      <td>8277788</td>
      <td>2888</td>
      <td>155825</td>
      <td>1973</td>
      <td>1360.33</td>
      <td>359.570000</td>
      <td>...</td>
      <td>1399</td>
      <td>899118</td>
      <td>52371</td>
      <td>8277788</td>
      <td>155825.0</td>
      <td>1444.50</td>
      <td>2.171830e+03</td>
      <td>1973</td>
      <td>1.735900e+04</td>
      <td>1.030333e+07</td>
    </tr>
    <tr>
      <th>VILLISCA</th>
      <td>795800</td>
      <td>12696.0</td>
      <td>1.911242e+08</td>
      <td>45118</td>
      <td>7365245</td>
      <td>1950</td>
      <td>179125</td>
      <td>1566</td>
      <td>1499.75</td>
      <td>396.210000</td>
      <td>...</td>
      <td>937</td>
      <td>795800</td>
      <td>45118</td>
      <td>7365245</td>
      <td>179125.0</td>
      <td>1635.84</td>
      <td>2.456730e+03</td>
      <td>1566</td>
      <td>1.680238e+04</td>
      <td>9.358976e+06</td>
    </tr>
    <tr>
      <th>NORTH ENGLISH</th>
      <td>1754074</td>
      <td>16752.0</td>
      <td>3.629388e+08</td>
      <td>98501</td>
      <td>15494009</td>
      <td>4194</td>
      <td>333750</td>
      <td>1705</td>
      <td>1856.41</td>
      <td>490.640000</td>
      <td>...</td>
      <td>960</td>
      <td>1754074</td>
      <td>98501</td>
      <td>15494009</td>
      <td>333750.0</td>
      <td>2588.42</td>
      <td>3.888040e+03</td>
      <td>1705</td>
      <td>1.658446e+04</td>
      <td>1.825828e+07</td>
    </tr>
    <tr>
      <th>AURELIA</th>
      <td>487377</td>
      <td>1782.0</td>
      <td>1.021761e+08</td>
      <td>21771</td>
      <td>3031122</td>
      <td>1402</td>
      <td>87950</td>
      <td>1816</td>
      <td>1368.30</td>
      <td>361.680000</td>
      <td>...</td>
      <td>590</td>
      <td>487377</td>
      <td>21771</td>
      <td>3031122</td>
      <td>87950.0</td>
      <td>717.69</td>
      <td>1.078990e+03</td>
      <td>1816</td>
      <td>1.643316e+04</td>
      <td>5.049495e+06</td>
    </tr>
    <tr>
      <th>MINDEN</th>
      <td>838674</td>
      <td>12636.0</td>
      <td>1.685966e+08</td>
      <td>39936</td>
      <td>6483356</td>
      <td>2271</td>
      <td>135350</td>
      <td>1445</td>
      <td>1019.59</td>
      <td>269.460000</td>
      <td>...</td>
      <td>1093</td>
      <td>838674</td>
      <td>39936</td>
      <td>6483356</td>
      <td>135350.0</td>
      <td>1396.56</td>
      <td>2.096380e+03</td>
      <td>1445</td>
      <td>1.485285e+04</td>
      <td>8.351586e+06</td>
    </tr>
    <tr>
      <th>MERRILL</th>
      <td>667990</td>
      <td>10050.0</td>
      <td>1.391722e+08</td>
      <td>31313</td>
      <td>4831118</td>
      <td>1939</td>
      <td>110775</td>
      <td>1406</td>
      <td>946.02</td>
      <td>249.980000</td>
      <td>...</td>
      <td>627</td>
      <td>667990</td>
      <td>31313</td>
      <td>4831118</td>
      <td>110775.0</td>
      <td>935.62</td>
      <td>1.405560e+03</td>
      <td>1406</td>
      <td>1.196527e+04</td>
      <td>6.839092e+06</td>
    </tr>
    <tr>
      <th>LOVILIA</th>
      <td>620619</td>
      <td>8772.0</td>
      <td>1.339165e+08</td>
      <td>30956</td>
      <td>5083251</td>
      <td>1990</td>
      <td>89900</td>
      <td>1160</td>
      <td>706.45</td>
      <td>186.670000</td>
      <td>...</td>
      <td>838</td>
      <td>620619</td>
      <td>30956</td>
      <td>5083251</td>
      <td>89900.0</td>
      <td>992.63</td>
      <td>1.490680e+03</td>
      <td>1160</td>
      <td>1.162769e+04</td>
      <td>6.469350e+06</td>
    </tr>
    <tr>
      <th>KELLOG</th>
      <td>801987</td>
      <td>9850.0</td>
      <td>2.048704e+08</td>
      <td>57053</td>
      <td>8187857</td>
      <td>2260</td>
      <td>195725</td>
      <td>1132</td>
      <td>923.06</td>
      <td>243.830000</td>
      <td>...</td>
      <td>596</td>
      <td>801987</td>
      <td>57053</td>
      <td>8187857</td>
      <td>195725.0</td>
      <td>1833.66</td>
      <td>2.752020e+03</td>
      <td>1132</td>
      <td>1.118002e+04</td>
      <td>9.876792e+06</td>
    </tr>
    <tr>
      <th>DANVILLE</th>
      <td>559104</td>
      <td>3248.0</td>
      <td>1.198225e+08</td>
      <td>27880</td>
      <td>4853534</td>
      <td>1822</td>
      <td>85725</td>
      <td>1064</td>
      <td>706.06</td>
      <td>186.630000</td>
      <td>...</td>
      <td>584</td>
      <td>559104</td>
      <td>27880</td>
      <td>4853534</td>
      <td>85725.0</td>
      <td>949.88</td>
      <td>1.425040e+03</td>
      <td>1064</td>
      <td>1.082697e+04</td>
      <td>5.893776e+06</td>
    </tr>
    <tr>
      <th>EVERLY</th>
      <td>360346</td>
      <td>2058.0</td>
      <td>1.013555e+08</td>
      <td>25331</td>
      <td>3385315</td>
      <td>1092</td>
      <td>106250</td>
      <td>805</td>
      <td>882.25</td>
      <td>233.050000</td>
      <td>...</td>
      <td>467</td>
      <td>360346</td>
      <td>25331</td>
      <td>3385315</td>
      <td>106250.0</td>
      <td>962.85</td>
      <td>1.445940e+03</td>
      <td>805</td>
      <td>1.079394e+04</td>
      <td>5.031124e+06</td>
    </tr>
    <tr>
      <th>Carroll</th>
      <td>81207</td>
      <td>126.0</td>
      <td>9.664800e+06</td>
      <td>1044</td>
      <td>242964</td>
      <td>108</td>
      <td>6750</td>
      <td>372</td>
      <td>279.00</td>
      <td>73.740000</td>
      <td>...</td>
      <td>51</td>
      <td>81207</td>
      <td>1044</td>
      <td>242964</td>
      <td>6750.0</td>
      <td>158.31</td>
      <td>2.375100e+02</td>
      <td>372</td>
      <td>9.817080e+03</td>
      <td>4.626090e+05</td>
    </tr>
    <tr>
      <th>MELBOURNE</th>
      <td>247266</td>
      <td>3648.0</td>
      <td>5.848099e+07</td>
      <td>13359</td>
      <td>2460402</td>
      <td>564</td>
      <td>62425</td>
      <td>736</td>
      <td>720.00</td>
      <td>190.240000</td>
      <td>...</td>
      <td>257</td>
      <td>247266</td>
      <td>13359</td>
      <td>2460402</td>
      <td>62425.0</td>
      <td>525.20</td>
      <td>7.894800e+02</td>
      <td>736</td>
      <td>9.007320e+03</td>
      <td>2.859234e+06</td>
    </tr>
    <tr>
      <th>SCHALLER</th>
      <td>498456</td>
      <td>10449.0</td>
      <td>1.350451e+08</td>
      <td>31017</td>
      <td>5638350</td>
      <td>1356</td>
      <td>146250</td>
      <td>581</td>
      <td>686.00</td>
      <td>181.270000</td>
      <td>...</td>
      <td>536</td>
      <td>498456</td>
      <td>31017</td>
      <td>5638350</td>
      <td>146250.0</td>
      <td>1338.27</td>
      <td>2.010290e+03</td>
      <td>581</td>
      <td>8.385040e+03</td>
      <td>6.585837e+06</td>
    </tr>
    <tr>
      <th>LOHRVILLE</th>
      <td>379089</td>
      <td>949.0</td>
      <td>7.614313e+07</td>
      <td>16039</td>
      <td>3378167</td>
      <td>1020</td>
      <td>62775</td>
      <td>816</td>
      <td>601.55</td>
      <td>158.880000</td>
      <td>...</td>
      <td>536</td>
      <td>379089</td>
      <td>16039</td>
      <td>3378167</td>
      <td>62775.0</td>
      <td>598.67</td>
      <td>8.993800e+02</td>
      <td>816</td>
      <td>8.018970e+03</td>
      <td>3.756069e+06</td>
    </tr>
    <tr>
      <th>DELHI</th>
      <td>621000</td>
      <td>3360.0</td>
      <td>1.250370e+08</td>
      <td>28191</td>
      <td>5203460</td>
      <td>2022</td>
      <td>68175</td>
      <td>721</td>
      <td>415.69</td>
      <td>109.820000</td>
      <td>...</td>
      <td>764</td>
      <td>621000</td>
      <td>28191</td>
      <td>5203460</td>
      <td>68175.0</td>
      <td>886.32</td>
      <td>1.330740e+03</td>
      <td>721</td>
      <td>6.813300e+03</td>
      <td>6.266760e+06</td>
    </tr>
    <tr>
      <th>SEYMOUR</th>
      <td>438228</td>
      <td>NaN</td>
      <td>8.753869e+07</td>
      <td>18415</td>
      <td>3587268</td>
      <td>1249</td>
      <td>64400</td>
      <td>642</td>
      <td>428.53</td>
      <td>113.160000</td>
      <td>...</td>
      <td>150</td>
      <td>438228</td>
      <td>18415</td>
      <td>3587268</td>
      <td>64400.0</td>
      <td>688.13</td>
      <td>1.032730e+03</td>
      <td>642</td>
      <td>6.726960e+03</td>
      <td>4.417560e+06</td>
    </tr>
    <tr>
      <th>ROBINS</th>
      <td>228448</td>
      <td>2508.0</td>
      <td>4.598717e+07</td>
      <td>11391</td>
      <td>1846856</td>
      <td>498</td>
      <td>38250</td>
      <td>332</td>
      <td>286.50</td>
      <td>75.730000</td>
      <td>...</td>
      <td>337</td>
      <td>228448</td>
      <td>11391</td>
      <td>1846856</td>
      <td>38250.0</td>
      <td>436.92</td>
      <td>6.561400e+02</td>
      <td>332</td>
      <td>4.767120e+03</td>
      <td>2.302432e+06</td>
    </tr>
    <tr>
      <th>Davenport</th>
      <td>18044</td>
      <td>164.0</td>
      <td>2.144000e+06</td>
      <td>202</td>
      <td>73265</td>
      <td>12</td>
      <td>1500</td>
      <td>252</td>
      <td>189.00</td>
      <td>49.930000</td>
      <td>...</td>
      <td>4</td>
      <td>18044</td>
      <td>202</td>
      <td>73265</td>
      <td>1500.0</td>
      <td>23.01</td>
      <td>3.452000e+01</td>
      <td>252</td>
      <td>4.643520e+03</td>
      <td>1.056020e+05</td>
    </tr>
    <tr>
      <th>GILBERTVILLE</th>
      <td>312120</td>
      <td>420.0</td>
      <td>6.238184e+07</td>
      <td>14879</td>
      <td>2620533</td>
      <td>857</td>
      <td>44050</td>
      <td>335</td>
      <td>244.81</td>
      <td>64.660000</td>
      <td>...</td>
      <td>180</td>
      <td>312120</td>
      <td>14879</td>
      <td>2620533</td>
      <td>44050.0</td>
      <td>519.98</td>
      <td>7.801200e+02</td>
      <td>335</td>
      <td>4.207660e+03</td>
      <td>3.038040e+06</td>
    </tr>
    <tr>
      <th>RUNNELLS</th>
      <td>245152</td>
      <td>NaN</td>
      <td>4.877912e+07</td>
      <td>11818</td>
      <td>2131865</td>
      <td>714</td>
      <td>33075</td>
      <td>267</td>
      <td>189.43</td>
      <td>49.990000</td>
      <td>...</td>
      <td>141</td>
      <td>245152</td>
      <td>11818</td>
      <td>2131865</td>
      <td>33075.0</td>
      <td>378.12</td>
      <td>5.673000e+02</td>
      <td>267</td>
      <td>3.086250e+03</td>
      <td>2.361139e+06</td>
    </tr>
    <tr>
      <th>TABOR</th>
      <td>245481</td>
      <td>NaN</td>
      <td>4.877912e+07</td>
      <td>11818</td>
      <td>2131865</td>
      <td>714</td>
      <td>33075</td>
      <td>267</td>
      <td>189.43</td>
      <td>49.990000</td>
      <td>...</td>
      <td>141</td>
      <td>245481</td>
      <td>11818</td>
      <td>2131865</td>
      <td>33075.0</td>
      <td>378.12</td>
      <td>5.673000e+02</td>
      <td>267</td>
      <td>3.086250e+03</td>
      <td>2.427691e+06</td>
    </tr>
    <tr>
      <th>GRISWOLD</th>
      <td>229540</td>
      <td>690.0</td>
      <td>4.763664e+07</td>
      <td>9671</td>
      <td>1799669</td>
      <td>462</td>
      <td>45550</td>
      <td>239</td>
      <td>255.55</td>
      <td>67.440000</td>
      <td>...</td>
      <td>100</td>
      <td>229540</td>
      <td>9671</td>
      <td>1799669</td>
      <td>45550.0</td>
      <td>404.33</td>
      <td>6.065700e+02</td>
      <td>239</td>
      <td>2.884660e+03</td>
      <td>2.370610e+06</td>
    </tr>
  </tbody>
</table>
<p>386 rows × 21 columns</p>
</div>




```python
df.groupby('City').sum().sort_values('Sale', ascending=False)
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
      <th>Store Number</th>
      <th>County Number</th>
      <th>Category</th>
      <th>Vendor Number</th>
      <th>Item Number</th>
      <th>Pack</th>
      <th>Bottle Volume (ml)</th>
      <th>Bottles Sold</th>
      <th>Volume Sold (Liters)</th>
      <th>Volume Sold (Gallons)</th>
      <th>...</th>
      <th>Month</th>
      <th>Store_Number</th>
      <th>Vendor_Number</th>
      <th>Item_Number</th>
      <th>Bottle_Volume</th>
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
      <th>Zip_Code</th>
    </tr>
    <tr>
      <th>City</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>DES MOINES</th>
      <td>868952982</td>
      <td>18297895.0</td>
      <td>2.478366e+11</td>
      <td>61663941</td>
      <td>12405329015</td>
      <td>3140563</td>
      <td>200851304</td>
      <td>3456812</td>
      <td>2737345.55</td>
      <td>723268.840001</td>
      <td>...</td>
      <td>1367728</td>
      <td>868952982</td>
      <td>61663941</td>
      <td>12405329015</td>
      <td>200851304.0</td>
      <td>2390173.07</td>
      <td>3.588329e+06</td>
      <td>3456812</td>
      <td>4.443986e+07</td>
      <td>1.196452e+10</td>
    </tr>
    <tr>
      <th>CEDAR RAPIDS</th>
      <td>637407493</td>
      <td>10551726.0</td>
      <td>1.940740e+11</td>
      <td>47939578</td>
      <td>8598599700</td>
      <td>2488824</td>
      <td>157678227</td>
      <td>1914428</td>
      <td>1677148.46</td>
      <td>443109.460001</td>
      <td>...</td>
      <td>1090647</td>
      <td>637407493</td>
      <td>47939578</td>
      <td>8598599700</td>
      <td>157678227.0</td>
      <td>1789750.10</td>
      <td>2.687219e+06</td>
      <td>1914428</td>
      <td>2.448673e+07</td>
      <td>9.753066e+09</td>
    </tr>
    <tr>
      <th>DAVENPORT</th>
      <td>409310747</td>
      <td>9508802.0</td>
      <td>1.216956e+11</td>
      <td>29958350</td>
      <td>5394246848</td>
      <td>1594536</td>
      <td>98355824</td>
      <td>1532850</td>
      <td>1157198.64</td>
      <td>305757.360000</td>
      <td>...</td>
      <td>675412</td>
      <td>409310747</td>
      <td>29958350</td>
      <td>5394246848</td>
      <td>98355824.0</td>
      <td>1067066.14</td>
      <td>1.602215e+06</td>
      <td>1532850</td>
      <td>1.747656e+07</td>
      <td>6.158730e+09</td>
    </tr>
    <tr>
      <th>IOWA CITY</th>
      <td>259665806</td>
      <td>4178512.0</td>
      <td>8.370079e+10</td>
      <td>20621692</td>
      <td>3910522645</td>
      <td>989955</td>
      <td>70532715</td>
      <td>963948</td>
      <td>841650.17</td>
      <td>222360.520000</td>
      <td>...</td>
      <td>461704</td>
      <td>259665806</td>
      <td>20621692</td>
      <td>3910522645</td>
      <td>70532715.0</td>
      <td>814878.81</td>
      <td>1.223565e+06</td>
      <td>963948</td>
      <td>1.279549e+07</td>
      <td>4.197901e+09</td>
    </tr>
    <tr>
      <th>WATERLOO</th>
      <td>305222100</td>
      <td>591675.0</td>
      <td>8.850820e+10</td>
      <td>21731427</td>
      <td>3948224576</td>
      <td>1205400</td>
      <td>69001243</td>
      <td>1169700</td>
      <td>822010.40</td>
      <td>217196.600000</td>
      <td>...</td>
      <td>487965</td>
      <td>305222100</td>
      <td>21731427</td>
      <td>3948224576</td>
      <td>69001243.0</td>
      <td>764977.11</td>
      <td>1.148562e+06</td>
      <td>1169700</td>
      <td>1.256057e+07</td>
      <td>4.293309e+09</td>
    </tr>
    <tr>
      <th>WEST DES MOINES</th>
      <td>232836400</td>
      <td>5453443.0</td>
      <td>7.481824e+10</td>
      <td>18326691</td>
      <td>3349141989</td>
      <td>865201</td>
      <td>64088226</td>
      <td>761972</td>
      <td>740992.30</td>
      <td>195770.020000</td>
      <td>...</td>
      <td>424642</td>
      <td>232836400</td>
      <td>18326691</td>
      <td>3349141989</td>
      <td>64088226.0</td>
      <td>756489.39</td>
      <td>1.135848e+06</td>
      <td>761972</td>
      <td>1.235846e+07</td>
      <td>3.608603e+09</td>
    </tr>
    <tr>
      <th>SIOUX CITY</th>
      <td>283659813</td>
      <td>7680363.0</td>
      <td>8.341733e+10</td>
      <td>20468971</td>
      <td>3603982716</td>
      <td>990579</td>
      <td>72539815</td>
      <td>910798</td>
      <td>796784.53</td>
      <td>210524.610000</td>
      <td>...</td>
      <td>468650</td>
      <td>283659813</td>
      <td>20468971</td>
      <td>3603982716</td>
      <td>72539815.0</td>
      <td>801321.81</td>
      <td>1.203069e+06</td>
      <td>910798</td>
      <td>1.201932e+07</td>
      <td>4.080970e+09</td>
    </tr>
    <tr>
      <th>COUNCIL BLUFFS</th>
      <td>295975175</td>
      <td>6313164.0</td>
      <td>8.445430e+10</td>
      <td>20335153</td>
      <td>3697582178</td>
      <td>1092658</td>
      <td>71787815</td>
      <td>871597</td>
      <td>770795.08</td>
      <td>203651.120000</td>
      <td>...</td>
      <td>466975</td>
      <td>295975175</td>
      <td>20335153</td>
      <td>3697582178</td>
      <td>71787815.0</td>
      <td>769002.38</td>
      <td>1.154492e+06</td>
      <td>871597</td>
      <td>1.152233e+07</td>
      <td>4.168457e+09</td>
    </tr>
    <tr>
      <th>DUBUQUE</th>
      <td>225864047</td>
      <td>2112278.0</td>
      <td>7.152862e+10</td>
      <td>17101034</td>
      <td>3050705446</td>
      <td>797399</td>
      <td>64614585</td>
      <td>701327</td>
      <td>667482.30</td>
      <td>176348.530000</td>
      <td>...</td>
      <td>397332</td>
      <td>225864047</td>
      <td>17101034</td>
      <td>3050705446</td>
      <td>64614585.0</td>
      <td>692184.47</td>
      <td>1.039391e+06</td>
      <td>701327</td>
      <td>9.650613e+06</td>
      <td>3.565012e+09</td>
    </tr>
    <tr>
      <th>AMES</th>
      <td>263220972</td>
      <td>6450905.0</td>
      <td>7.919604e+10</td>
      <td>19670736</td>
      <td>3655102990</td>
      <td>880812</td>
      <td>70021883</td>
      <td>679597</td>
      <td>666521.31</td>
      <td>176096.070000</td>
      <td>...</td>
      <td>441247</td>
      <td>263220972</td>
      <td>19670736</td>
      <td>3655102990</td>
      <td>70021883.0</td>
      <td>798237.83</td>
      <td>1.198673e+06</td>
      <td>679597</td>
      <td>9.587908e+06</td>
      <td>3.795428e+09</td>
    </tr>
    <tr>
      <th>ANKENY</th>
      <td>166817928</td>
      <td>3678906.0</td>
      <td>4.975856e+10</td>
      <td>12185551</td>
      <td>2133354574</td>
      <td>534657</td>
      <td>45665324</td>
      <td>473757</td>
      <td>483007.32</td>
      <td>127614.720000</td>
      <td>...</td>
      <td>281031</td>
      <td>166817928</td>
      <td>12185551</td>
      <td>2133354574</td>
      <td>45665324.0</td>
      <td>535625.44</td>
      <td>8.043293e+05</td>
      <td>473757</td>
      <td>7.141135e+06</td>
      <td>2.389949e+09</td>
    </tr>
    <tr>
      <th>CORALVILLE</th>
      <td>124635526</td>
      <td>1852812.0</td>
      <td>3.769315e+10</td>
      <td>9353292</td>
      <td>2013176284</td>
      <td>413848</td>
      <td>33399959</td>
      <td>419205</td>
      <td>398461.96</td>
      <td>105276.070000</td>
      <td>...</td>
      <td>212549</td>
      <td>124635526</td>
      <td>9353292</td>
      <td>2013176284</td>
      <td>33399959.0</td>
      <td>403898.77</td>
      <td>6.064109e+05</td>
      <td>419205</td>
      <td>6.854789e+06</td>
      <td>1.887885e+09</td>
    </tr>
    <tr>
      <th>BETTENDORF</th>
      <td>129278451</td>
      <td>2907448.0</td>
      <td>3.838366e+10</td>
      <td>9422141</td>
      <td>1711951656</td>
      <td>412437</td>
      <td>34528512</td>
      <td>441044</td>
      <td>408584.99</td>
      <td>107951.590000</td>
      <td>...</td>
      <td>210490</td>
      <td>129278451</td>
      <td>9422141</td>
      <td>1711951656</td>
      <td>34528512.0</td>
      <td>418238.32</td>
      <td>6.278674e+05</td>
      <td>441044</td>
      <td>6.632695e+06</td>
      <td>1.939431e+09</td>
    </tr>
    <tr>
      <th>CEDAR FALLS</th>
      <td>213903540</td>
      <td>400939.0</td>
      <td>5.976955e+10</td>
      <td>14707086</td>
      <td>2795086510</td>
      <td>676843</td>
      <td>52043965</td>
      <td>494971</td>
      <td>460805.22</td>
      <td>121752.030000</td>
      <td>...</td>
      <td>337445</td>
      <td>213903540</td>
      <td>14707086</td>
      <td>2795086510</td>
      <td>52043965.0</td>
      <td>576279.69</td>
      <td>8.653990e+05</td>
      <td>494971</td>
      <td>6.589479e+06</td>
      <td>2.899127e+09</td>
    </tr>
    <tr>
      <th>WINDSOR HEIGHTS</th>
      <td>88891788</td>
      <td>2131283.0</td>
      <td>2.883234e+10</td>
      <td>6961754</td>
      <td>1316709740</td>
      <td>339889</td>
      <td>25597303</td>
      <td>371208</td>
      <td>412029.59</td>
      <td>108862.320000</td>
      <td>...</td>
      <td>160000</td>
      <td>88891788</td>
      <td>6961754</td>
      <td>1316709740</td>
      <td>25597303.0</td>
      <td>293894.38</td>
      <td>4.412831e+05</td>
      <td>371208</td>
      <td>5.990735e+06</td>
      <td>1.392631e+09</td>
    </tr>
    <tr>
      <th>MASON CITY</th>
      <td>132175119</td>
      <td>711076.0</td>
      <td>4.426549e+10</td>
      <td>11051610</td>
      <td>1905257264</td>
      <td>502197</td>
      <td>41040981</td>
      <td>390217</td>
      <td>375518.46</td>
      <td>99210.810000</td>
      <td>...</td>
      <td>248625</td>
      <td>132175119</td>
      <td>11051610</td>
      <td>1905257264</td>
      <td>41040981.0</td>
      <td>418363.24</td>
      <td>6.282773e+05</td>
      <td>390217</td>
      <td>4.842734e+06</td>
      <td>2.133726e+09</td>
    </tr>
    <tr>
      <th>FORT DODGE</th>
      <td>105794826</td>
      <td>2545780.0</td>
      <td>3.072538e+10</td>
      <td>7677833</td>
      <td>1333638905</td>
      <td>338980</td>
      <td>28893212</td>
      <td>339020</td>
      <td>318878.97</td>
      <td>84243.040000</td>
      <td>...</td>
      <td>171862</td>
      <td>105794826</td>
      <td>7677833</td>
      <td>1333638905</td>
      <td>28893212.0</td>
      <td>286560.70</td>
      <td>4.303711e+05</td>
      <td>339020</td>
      <td>4.333031e+06</td>
      <td>1.486143e+09</td>
    </tr>
    <tr>
      <th>BURLINGTON</th>
      <td>114273343</td>
      <td>900247.0</td>
      <td>3.239620e+10</td>
      <td>8091324</td>
      <td>1451435311</td>
      <td>410071</td>
      <td>26355753</td>
      <td>308723</td>
      <td>240293.95</td>
      <td>63494.570000</td>
      <td>...</td>
      <td>182234</td>
      <td>114273343</td>
      <td>8091324</td>
      <td>1451435311</td>
      <td>26355753.0</td>
      <td>293626.73</td>
      <td>4.407700e+05</td>
      <td>308723</td>
      <td>3.731482e+06</td>
      <td>1.633675e+09</td>
    </tr>
    <tr>
      <th>MARSHALLTOWN</th>
      <td>91685992</td>
      <td>1713472.0</td>
      <td>2.799106e+10</td>
      <td>7002946</td>
      <td>1204313557</td>
      <td>317585</td>
      <td>26122203</td>
      <td>273714</td>
      <td>253245.27</td>
      <td>66901.670000</td>
      <td>...</td>
      <td>156238</td>
      <td>91685992</td>
      <td>7002946</td>
      <td>1204313557</td>
      <td>26122203.0</td>
      <td>270012.44</td>
      <td>4.054909e+05</td>
      <td>273714</td>
      <td>3.683832e+06</td>
      <td>1.342880e+09</td>
    </tr>
    <tr>
      <th>CLINTON</th>
      <td>103122918</td>
      <td>705456.0</td>
      <td>3.237821e+10</td>
      <td>8047103</td>
      <td>1406093501</td>
      <td>402334</td>
      <td>27956025</td>
      <td>297608</td>
      <td>267297.76</td>
      <td>70618.570000</td>
      <td>...</td>
      <td>181377</td>
      <td>103122918</td>
      <td>8047103</td>
      <td>1406093501</td>
      <td>27956025.0</td>
      <td>281922.26</td>
      <td>4.233242e+05</td>
      <td>297608</td>
      <td>3.634210e+06</td>
      <td>1.633640e+09</td>
    </tr>
    <tr>
      <th>URBANDALE</th>
      <td>94129635</td>
      <td>1870253.0</td>
      <td>2.527484e+10</td>
      <td>6178466</td>
      <td>1061737780</td>
      <td>302756</td>
      <td>22285912</td>
      <td>245167</td>
      <td>213976.22</td>
      <td>56536.070000</td>
      <td>...</td>
      <td>147311</td>
      <td>94129635</td>
      <td>6178466</td>
      <td>1061737780</td>
      <td>22285912.0</td>
      <td>252910.90</td>
      <td>3.797862e+05</td>
      <td>245167</td>
      <td>3.392298e+06</td>
      <td>1.222241e+09</td>
    </tr>
    <tr>
      <th>MUSCATINE</th>
      <td>112328486</td>
      <td>2357460.0</td>
      <td>3.520959e+10</td>
      <td>8559024</td>
      <td>1523829953</td>
      <td>431768</td>
      <td>30268531</td>
      <td>259294</td>
      <td>248435.98</td>
      <td>65636.790000</td>
      <td>...</td>
      <td>193930</td>
      <td>112328486</td>
      <td>8559024</td>
      <td>1523829953</td>
      <td>30268531.0</td>
      <td>318107.11</td>
      <td>4.776874e+05</td>
      <td>259294</td>
      <td>3.381011e+06</td>
      <td>1.776885e+09</td>
    </tr>
    <tr>
      <th>ALTOONA</th>
      <td>72443965</td>
      <td>1640793.0</td>
      <td>2.230951e+10</td>
      <td>5381804</td>
      <td>943513422</td>
      <td>270451</td>
      <td>19912031</td>
      <td>222839</td>
      <td>208620.46</td>
      <td>55123.270000</td>
      <td>...</td>
      <td>125619</td>
      <td>72443965</td>
      <td>5381804</td>
      <td>943513422</td>
      <td>19912031.0</td>
      <td>205723.36</td>
      <td>3.089460e+05</td>
      <td>222839</td>
      <td>2.963462e+06</td>
      <td>1.070193e+09</td>
    </tr>
    <tr>
      <th>KEOKUK</th>
      <td>47730250</td>
      <td>955808.0</td>
      <td>1.786505e+10</td>
      <td>4477606</td>
      <td>800317015</td>
      <td>200901</td>
      <td>16604575</td>
      <td>205772</td>
      <td>196203.86</td>
      <td>51836.180000</td>
      <td>...</td>
      <td>97120</td>
      <td>47730250</td>
      <td>4477606</td>
      <td>800317015</td>
      <td>16604575.0</td>
      <td>175570.83</td>
      <td>2.635351e+05</td>
      <td>205772</td>
      <td>2.916154e+06</td>
      <td>8.983230e+08</td>
    </tr>
    <tr>
      <th>MARION</th>
      <td>78549797</td>
      <td>1373187.0</td>
      <td>2.510294e+10</td>
      <td>6157256</td>
      <td>1050255461</td>
      <td>299690</td>
      <td>22817000</td>
      <td>220852</td>
      <td>208900.84</td>
      <td>55188.550000</td>
      <td>...</td>
      <td>140231</td>
      <td>78549797</td>
      <td>6157256</td>
      <td>1050255461</td>
      <td>22817000.0</td>
      <td>229697.38</td>
      <td>3.449333e+05</td>
      <td>220852</td>
      <td>2.753354e+06</td>
      <td>1.254790e+09</td>
    </tr>
    <tr>
      <th>MOUNT VERNON</th>
      <td>54780859</td>
      <td>652194.0</td>
      <td>1.195423e+10</td>
      <td>2897386</td>
      <td>746162879</td>
      <td>122746</td>
      <td>11213775</td>
      <td>195916</td>
      <td>195149.82</td>
      <td>51545.860000</td>
      <td>...</td>
      <td>66353</td>
      <td>54780859</td>
      <td>2897386</td>
      <td>746162879</td>
      <td>11213775.0</td>
      <td>130008.99</td>
      <td>1.951605e+05</td>
      <td>195916</td>
      <td>2.737323e+06</td>
      <td>5.985768e+08</td>
    </tr>
    <tr>
      <th>CARROLL</th>
      <td>43972958</td>
      <td>200942.0</td>
      <td>1.495630e+10</td>
      <td>3641642</td>
      <td>614961254</td>
      <td>163150</td>
      <td>14501400</td>
      <td>175448</td>
      <td>193412.92</td>
      <td>51095.760000</td>
      <td>...</td>
      <td>84089</td>
      <td>43972958</td>
      <td>3641642</td>
      <td>614961254</td>
      <td>14501400.0</td>
      <td>142104.03</td>
      <td>2.133878e+05</td>
      <td>175448</td>
      <td>2.605922e+06</td>
      <td>7.377586e+08</td>
    </tr>
    <tr>
      <th>SPIRIT LAKE</th>
      <td>49966334</td>
      <td>499980.0</td>
      <td>1.739151e+10</td>
      <td>4309944</td>
      <td>708166042</td>
      <td>192560</td>
      <td>16791534</td>
      <td>176897</td>
      <td>191891.53</td>
      <td>50684.170000</td>
      <td>...</td>
      <td>98282</td>
      <td>49966334</td>
      <td>4309944</td>
      <td>708166042</td>
      <td>16791534.0</td>
      <td>171550.60</td>
      <td>2.576149e+05</td>
      <td>176897</td>
      <td>2.535546e+06</td>
      <td>8.559658e+08</td>
    </tr>
    <tr>
      <th>OTTUMWA</th>
      <td>74286328</td>
      <td>2022390.0</td>
      <td>2.341499e+10</td>
      <td>5645899</td>
      <td>1019612478</td>
      <td>321464</td>
      <td>19138981</td>
      <td>186266</td>
      <td>164789.43</td>
      <td>43542.190000</td>
      <td>...</td>
      <td>130517</td>
      <td>74286328</td>
      <td>5645899</td>
      <td>1019612478</td>
      <td>19138981.0</td>
      <td>197309.58</td>
      <td>2.962550e+05</td>
      <td>186266</td>
      <td>2.350715e+06</td>
      <td>1.179750e+09</td>
    </tr>
    <tr>
      <th>CLEAR LAKE</th>
      <td>86176860</td>
      <td>355317.0</td>
      <td>2.181816e+10</td>
      <td>5149583</td>
      <td>929624767</td>
      <td>238845</td>
      <td>20778025</td>
      <td>154819</td>
      <td>158942.72</td>
      <td>41980.030000</td>
      <td>...</td>
      <td>124114</td>
      <td>86176860</td>
      <td>5149583</td>
      <td>929624767</td>
      <td>20778025.0</td>
      <td>214367.99</td>
      <td>3.219187e+05</td>
      <td>154819</td>
      <td>2.130372e+06</td>
      <td>1.053834e+09</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>WALFORD</th>
      <td>1006860</td>
      <td>11058.0</td>
      <td>2.005134e+08</td>
      <td>45335</td>
      <td>6652603</td>
      <td>1974</td>
      <td>199500</td>
      <td>1429</td>
      <td>1415.75</td>
      <td>373.890000</td>
      <td>...</td>
      <td>1218</td>
      <td>1006860</td>
      <td>45335</td>
      <td>6652603</td>
      <td>199500.0</td>
      <td>1899.50</td>
      <td>2.852970e+03</td>
      <td>1429</td>
      <td>2.014426e+04</td>
      <td>1.015609e+07</td>
    </tr>
    <tr>
      <th>DAKOTA CITY</th>
      <td>1098250</td>
      <td>10580.0</td>
      <td>2.379560e+08</td>
      <td>54567</td>
      <td>8602753</td>
      <td>3817</td>
      <td>152225</td>
      <td>3035</td>
      <td>1869.20</td>
      <td>493.960000</td>
      <td>...</td>
      <td>1272</td>
      <td>1098250</td>
      <td>54567</td>
      <td>8602753</td>
      <td>152225.0</td>
      <td>1427.74</td>
      <td>2.144150e+03</td>
      <td>3035</td>
      <td>1.993156e+04</td>
      <td>1.162167e+07</td>
    </tr>
    <tr>
      <th>OTHO</th>
      <td>672875</td>
      <td>16450.0</td>
      <td>1.807758e+08</td>
      <td>43269</td>
      <td>5931563</td>
      <td>2637</td>
      <td>163125</td>
      <td>2443</td>
      <td>1679.40</td>
      <td>443.780000</td>
      <td>...</td>
      <td>1041</td>
      <td>672875</td>
      <td>43269</td>
      <td>5931563</td>
      <td>163125.0</td>
      <td>1216.85</td>
      <td>1.827000e+03</td>
      <td>2443</td>
      <td>1.940232e+04</td>
      <td>8.849575e+06</td>
    </tr>
    <tr>
      <th>MARTENSDALE</th>
      <td>702048</td>
      <td>12922.0</td>
      <td>1.480708e+08</td>
      <td>38795</td>
      <td>6449091</td>
      <td>1669</td>
      <td>112175</td>
      <td>1881</td>
      <td>1324.70</td>
      <td>350.170000</td>
      <td>...</td>
      <td>823</td>
      <td>702048</td>
      <td>38795</td>
      <td>6449091</td>
      <td>112175.0</td>
      <td>1173.95</td>
      <td>1.765610e+03</td>
      <td>1881</td>
      <td>1.839646e+04</td>
      <td>7.122720e+06</td>
    </tr>
    <tr>
      <th>MONTROSE</th>
      <td>1377080</td>
      <td>15064.0</td>
      <td>2.801652e+08</td>
      <td>74440</td>
      <td>11586234</td>
      <td>4398</td>
      <td>188675</td>
      <td>2527</td>
      <td>1441.47</td>
      <td>380.980000</td>
      <td>...</td>
      <td>1284</td>
      <td>1377080</td>
      <td>74440</td>
      <td>11586234</td>
      <td>188675.0</td>
      <td>1749.35</td>
      <td>2.626950e+03</td>
      <td>2527</td>
      <td>1.832241e+04</td>
      <td>1.415989e+07</td>
    </tr>
    <tr>
      <th>WHEATLAND</th>
      <td>1439868</td>
      <td>6693.0</td>
      <td>3.026881e+08</td>
      <td>71556</td>
      <td>11966994</td>
      <td>3654</td>
      <td>253125</td>
      <td>1860</td>
      <td>1421.73</td>
      <td>375.460000</td>
      <td>...</td>
      <td>1718</td>
      <td>1439868</td>
      <td>71556</td>
      <td>11966994</td>
      <td>253125.0</td>
      <td>2397.11</td>
      <td>3.599520e+03</td>
      <td>1860</td>
      <td>1.807145e+04</td>
      <td>1.535811e+07</td>
    </tr>
    <tr>
      <th>ALTA</th>
      <td>657624</td>
      <td>1452.0</td>
      <td>1.366657e+08</td>
      <td>33909</td>
      <td>4489933</td>
      <td>1632</td>
      <td>125375</td>
      <td>2042</td>
      <td>1599.50</td>
      <td>422.760000</td>
      <td>...</td>
      <td>709</td>
      <td>657624</td>
      <td>33909</td>
      <td>4489933</td>
      <td>125375.0</td>
      <td>916.20</td>
      <td>1.375070e+03</td>
      <td>2042</td>
      <td>1.783164e+04</td>
      <td>6.732264e+06</td>
    </tr>
    <tr>
      <th>SULLY</th>
      <td>532105</td>
      <td>5750.0</td>
      <td>1.196082e+08</td>
      <td>29640</td>
      <td>4866399</td>
      <td>1487</td>
      <td>98725</td>
      <td>1566</td>
      <td>1134.30</td>
      <td>299.850000</td>
      <td>...</td>
      <td>632</td>
      <td>532105</td>
      <td>29640</td>
      <td>4866399</td>
      <td>98725.0</td>
      <td>1031.99</td>
      <td>1.550020e+03</td>
      <td>1566</td>
      <td>1.752950e+04</td>
      <td>5.778865e+06</td>
    </tr>
    <tr>
      <th>DELMAR</th>
      <td>899118</td>
      <td>4554.0</td>
      <td>2.054581e+08</td>
      <td>52371</td>
      <td>8277788</td>
      <td>2888</td>
      <td>155825</td>
      <td>1973</td>
      <td>1360.33</td>
      <td>359.570000</td>
      <td>...</td>
      <td>1399</td>
      <td>899118</td>
      <td>52371</td>
      <td>8277788</td>
      <td>155825.0</td>
      <td>1444.50</td>
      <td>2.171830e+03</td>
      <td>1973</td>
      <td>1.735900e+04</td>
      <td>1.030333e+07</td>
    </tr>
    <tr>
      <th>VILLISCA</th>
      <td>795800</td>
      <td>12696.0</td>
      <td>1.911242e+08</td>
      <td>45118</td>
      <td>7365245</td>
      <td>1950</td>
      <td>179125</td>
      <td>1566</td>
      <td>1499.75</td>
      <td>396.210000</td>
      <td>...</td>
      <td>937</td>
      <td>795800</td>
      <td>45118</td>
      <td>7365245</td>
      <td>179125.0</td>
      <td>1635.84</td>
      <td>2.456730e+03</td>
      <td>1566</td>
      <td>1.680238e+04</td>
      <td>9.358976e+06</td>
    </tr>
    <tr>
      <th>NORTH ENGLISH</th>
      <td>1754074</td>
      <td>16752.0</td>
      <td>3.629388e+08</td>
      <td>98501</td>
      <td>15494009</td>
      <td>4194</td>
      <td>333750</td>
      <td>1705</td>
      <td>1856.41</td>
      <td>490.640000</td>
      <td>...</td>
      <td>960</td>
      <td>1754074</td>
      <td>98501</td>
      <td>15494009</td>
      <td>333750.0</td>
      <td>2588.42</td>
      <td>3.888040e+03</td>
      <td>1705</td>
      <td>1.658446e+04</td>
      <td>1.825828e+07</td>
    </tr>
    <tr>
      <th>AURELIA</th>
      <td>487377</td>
      <td>1782.0</td>
      <td>1.021761e+08</td>
      <td>21771</td>
      <td>3031122</td>
      <td>1402</td>
      <td>87950</td>
      <td>1816</td>
      <td>1368.30</td>
      <td>361.680000</td>
      <td>...</td>
      <td>590</td>
      <td>487377</td>
      <td>21771</td>
      <td>3031122</td>
      <td>87950.0</td>
      <td>717.69</td>
      <td>1.078990e+03</td>
      <td>1816</td>
      <td>1.643316e+04</td>
      <td>5.049495e+06</td>
    </tr>
    <tr>
      <th>MINDEN</th>
      <td>838674</td>
      <td>12636.0</td>
      <td>1.685966e+08</td>
      <td>39936</td>
      <td>6483356</td>
      <td>2271</td>
      <td>135350</td>
      <td>1445</td>
      <td>1019.59</td>
      <td>269.460000</td>
      <td>...</td>
      <td>1093</td>
      <td>838674</td>
      <td>39936</td>
      <td>6483356</td>
      <td>135350.0</td>
      <td>1396.56</td>
      <td>2.096380e+03</td>
      <td>1445</td>
      <td>1.485285e+04</td>
      <td>8.351586e+06</td>
    </tr>
    <tr>
      <th>MERRILL</th>
      <td>667990</td>
      <td>10050.0</td>
      <td>1.391722e+08</td>
      <td>31313</td>
      <td>4831118</td>
      <td>1939</td>
      <td>110775</td>
      <td>1406</td>
      <td>946.02</td>
      <td>249.980000</td>
      <td>...</td>
      <td>627</td>
      <td>667990</td>
      <td>31313</td>
      <td>4831118</td>
      <td>110775.0</td>
      <td>935.62</td>
      <td>1.405560e+03</td>
      <td>1406</td>
      <td>1.196527e+04</td>
      <td>6.839092e+06</td>
    </tr>
    <tr>
      <th>LOVILIA</th>
      <td>620619</td>
      <td>8772.0</td>
      <td>1.339165e+08</td>
      <td>30956</td>
      <td>5083251</td>
      <td>1990</td>
      <td>89900</td>
      <td>1160</td>
      <td>706.45</td>
      <td>186.670000</td>
      <td>...</td>
      <td>838</td>
      <td>620619</td>
      <td>30956</td>
      <td>5083251</td>
      <td>89900.0</td>
      <td>992.63</td>
      <td>1.490680e+03</td>
      <td>1160</td>
      <td>1.162769e+04</td>
      <td>6.469350e+06</td>
    </tr>
    <tr>
      <th>KELLOG</th>
      <td>801987</td>
      <td>9850.0</td>
      <td>2.048704e+08</td>
      <td>57053</td>
      <td>8187857</td>
      <td>2260</td>
      <td>195725</td>
      <td>1132</td>
      <td>923.06</td>
      <td>243.830000</td>
      <td>...</td>
      <td>596</td>
      <td>801987</td>
      <td>57053</td>
      <td>8187857</td>
      <td>195725.0</td>
      <td>1833.66</td>
      <td>2.752020e+03</td>
      <td>1132</td>
      <td>1.118002e+04</td>
      <td>9.876792e+06</td>
    </tr>
    <tr>
      <th>DANVILLE</th>
      <td>559104</td>
      <td>3248.0</td>
      <td>1.198225e+08</td>
      <td>27880</td>
      <td>4853534</td>
      <td>1822</td>
      <td>85725</td>
      <td>1064</td>
      <td>706.06</td>
      <td>186.630000</td>
      <td>...</td>
      <td>584</td>
      <td>559104</td>
      <td>27880</td>
      <td>4853534</td>
      <td>85725.0</td>
      <td>949.88</td>
      <td>1.425040e+03</td>
      <td>1064</td>
      <td>1.082697e+04</td>
      <td>5.893776e+06</td>
    </tr>
    <tr>
      <th>EVERLY</th>
      <td>360346</td>
      <td>2058.0</td>
      <td>1.013555e+08</td>
      <td>25331</td>
      <td>3385315</td>
      <td>1092</td>
      <td>106250</td>
      <td>805</td>
      <td>882.25</td>
      <td>233.050000</td>
      <td>...</td>
      <td>467</td>
      <td>360346</td>
      <td>25331</td>
      <td>3385315</td>
      <td>106250.0</td>
      <td>962.85</td>
      <td>1.445940e+03</td>
      <td>805</td>
      <td>1.079394e+04</td>
      <td>5.031124e+06</td>
    </tr>
    <tr>
      <th>Carroll</th>
      <td>81207</td>
      <td>126.0</td>
      <td>9.664800e+06</td>
      <td>1044</td>
      <td>242964</td>
      <td>108</td>
      <td>6750</td>
      <td>372</td>
      <td>279.00</td>
      <td>73.740000</td>
      <td>...</td>
      <td>51</td>
      <td>81207</td>
      <td>1044</td>
      <td>242964</td>
      <td>6750.0</td>
      <td>158.31</td>
      <td>2.375100e+02</td>
      <td>372</td>
      <td>9.817080e+03</td>
      <td>4.626090e+05</td>
    </tr>
    <tr>
      <th>MELBOURNE</th>
      <td>247266</td>
      <td>3648.0</td>
      <td>5.848099e+07</td>
      <td>13359</td>
      <td>2460402</td>
      <td>564</td>
      <td>62425</td>
      <td>736</td>
      <td>720.00</td>
      <td>190.240000</td>
      <td>...</td>
      <td>257</td>
      <td>247266</td>
      <td>13359</td>
      <td>2460402</td>
      <td>62425.0</td>
      <td>525.20</td>
      <td>7.894800e+02</td>
      <td>736</td>
      <td>9.007320e+03</td>
      <td>2.859234e+06</td>
    </tr>
    <tr>
      <th>SCHALLER</th>
      <td>498456</td>
      <td>10449.0</td>
      <td>1.350451e+08</td>
      <td>31017</td>
      <td>5638350</td>
      <td>1356</td>
      <td>146250</td>
      <td>581</td>
      <td>686.00</td>
      <td>181.270000</td>
      <td>...</td>
      <td>536</td>
      <td>498456</td>
      <td>31017</td>
      <td>5638350</td>
      <td>146250.0</td>
      <td>1338.27</td>
      <td>2.010290e+03</td>
      <td>581</td>
      <td>8.385040e+03</td>
      <td>6.585837e+06</td>
    </tr>
    <tr>
      <th>LOHRVILLE</th>
      <td>379089</td>
      <td>949.0</td>
      <td>7.614313e+07</td>
      <td>16039</td>
      <td>3378167</td>
      <td>1020</td>
      <td>62775</td>
      <td>816</td>
      <td>601.55</td>
      <td>158.880000</td>
      <td>...</td>
      <td>536</td>
      <td>379089</td>
      <td>16039</td>
      <td>3378167</td>
      <td>62775.0</td>
      <td>598.67</td>
      <td>8.993800e+02</td>
      <td>816</td>
      <td>8.018970e+03</td>
      <td>3.756069e+06</td>
    </tr>
    <tr>
      <th>DELHI</th>
      <td>621000</td>
      <td>3360.0</td>
      <td>1.250370e+08</td>
      <td>28191</td>
      <td>5203460</td>
      <td>2022</td>
      <td>68175</td>
      <td>721</td>
      <td>415.69</td>
      <td>109.820000</td>
      <td>...</td>
      <td>764</td>
      <td>621000</td>
      <td>28191</td>
      <td>5203460</td>
      <td>68175.0</td>
      <td>886.32</td>
      <td>1.330740e+03</td>
      <td>721</td>
      <td>6.813300e+03</td>
      <td>6.266760e+06</td>
    </tr>
    <tr>
      <th>SEYMOUR</th>
      <td>438228</td>
      <td>NaN</td>
      <td>8.753869e+07</td>
      <td>18415</td>
      <td>3587268</td>
      <td>1249</td>
      <td>64400</td>
      <td>642</td>
      <td>428.53</td>
      <td>113.160000</td>
      <td>...</td>
      <td>150</td>
      <td>438228</td>
      <td>18415</td>
      <td>3587268</td>
      <td>64400.0</td>
      <td>688.13</td>
      <td>1.032730e+03</td>
      <td>642</td>
      <td>6.726960e+03</td>
      <td>4.417560e+06</td>
    </tr>
    <tr>
      <th>ROBINS</th>
      <td>228448</td>
      <td>2508.0</td>
      <td>4.598717e+07</td>
      <td>11391</td>
      <td>1846856</td>
      <td>498</td>
      <td>38250</td>
      <td>332</td>
      <td>286.50</td>
      <td>75.730000</td>
      <td>...</td>
      <td>337</td>
      <td>228448</td>
      <td>11391</td>
      <td>1846856</td>
      <td>38250.0</td>
      <td>436.92</td>
      <td>6.561400e+02</td>
      <td>332</td>
      <td>4.767120e+03</td>
      <td>2.302432e+06</td>
    </tr>
    <tr>
      <th>Davenport</th>
      <td>18044</td>
      <td>164.0</td>
      <td>2.144000e+06</td>
      <td>202</td>
      <td>73265</td>
      <td>12</td>
      <td>1500</td>
      <td>252</td>
      <td>189.00</td>
      <td>49.930000</td>
      <td>...</td>
      <td>4</td>
      <td>18044</td>
      <td>202</td>
      <td>73265</td>
      <td>1500.0</td>
      <td>23.01</td>
      <td>3.452000e+01</td>
      <td>252</td>
      <td>4.643520e+03</td>
      <td>1.056020e+05</td>
    </tr>
    <tr>
      <th>GILBERTVILLE</th>
      <td>312120</td>
      <td>420.0</td>
      <td>6.238184e+07</td>
      <td>14879</td>
      <td>2620533</td>
      <td>857</td>
      <td>44050</td>
      <td>335</td>
      <td>244.81</td>
      <td>64.660000</td>
      <td>...</td>
      <td>180</td>
      <td>312120</td>
      <td>14879</td>
      <td>2620533</td>
      <td>44050.0</td>
      <td>519.98</td>
      <td>7.801200e+02</td>
      <td>335</td>
      <td>4.207660e+03</td>
      <td>3.038040e+06</td>
    </tr>
    <tr>
      <th>RUNNELLS</th>
      <td>245152</td>
      <td>NaN</td>
      <td>4.877912e+07</td>
      <td>11818</td>
      <td>2131865</td>
      <td>714</td>
      <td>33075</td>
      <td>267</td>
      <td>189.43</td>
      <td>49.990000</td>
      <td>...</td>
      <td>141</td>
      <td>245152</td>
      <td>11818</td>
      <td>2131865</td>
      <td>33075.0</td>
      <td>378.12</td>
      <td>5.673000e+02</td>
      <td>267</td>
      <td>3.086250e+03</td>
      <td>2.361139e+06</td>
    </tr>
    <tr>
      <th>TABOR</th>
      <td>245481</td>
      <td>NaN</td>
      <td>4.877912e+07</td>
      <td>11818</td>
      <td>2131865</td>
      <td>714</td>
      <td>33075</td>
      <td>267</td>
      <td>189.43</td>
      <td>49.990000</td>
      <td>...</td>
      <td>141</td>
      <td>245481</td>
      <td>11818</td>
      <td>2131865</td>
      <td>33075.0</td>
      <td>378.12</td>
      <td>5.673000e+02</td>
      <td>267</td>
      <td>3.086250e+03</td>
      <td>2.427691e+06</td>
    </tr>
    <tr>
      <th>GRISWOLD</th>
      <td>229540</td>
      <td>690.0</td>
      <td>4.763664e+07</td>
      <td>9671</td>
      <td>1799669</td>
      <td>462</td>
      <td>45550</td>
      <td>239</td>
      <td>255.55</td>
      <td>67.440000</td>
      <td>...</td>
      <td>100</td>
      <td>229540</td>
      <td>9671</td>
      <td>1799669</td>
      <td>45550.0</td>
      <td>404.33</td>
      <td>6.065700e+02</td>
      <td>239</td>
      <td>2.884660e+03</td>
      <td>2.370610e+06</td>
    </tr>
  </tbody>
</table>
<p>386 rows × 21 columns</p>
</div>




```python
df.groupby('County').mean().sort_values('Sale', ascending=False)
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
      <th>Store Number</th>
      <th>County Number</th>
      <th>Category</th>
      <th>Vendor Number</th>
      <th>Item Number</th>
      <th>Pack</th>
      <th>Bottle Volume (ml)</th>
      <th>Bottles Sold</th>
      <th>Volume Sold (Liters)</th>
      <th>Volume Sold (Gallons)</th>
      <th>...</th>
      <th>Month</th>
      <th>Store_Number</th>
      <th>Vendor_Number</th>
      <th>Item_Number</th>
      <th>Bottle_Volume</th>
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
      <th>Zip_Code</th>
    </tr>
    <tr>
      <th>County</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Dallas</th>
      <td>3516.860910</td>
      <td>25.0</td>
      <td>1.043907e+06</td>
      <td>257.465971</td>
      <td>46417.163918</td>
      <td>11.407390</td>
      <td>942.047857</td>
      <td>13.770228</td>
      <td>14.319193</td>
      <td>3.782568</td>
      <td>...</td>
      <td>5.911779</td>
      <td>3516.860910</td>
      <td>257.465971</td>
      <td>46417.163918</td>
      <td>942.047857</td>
      <td>10.086326</td>
      <td>15.148395</td>
      <td>13.770228</td>
      <td>243.191052</td>
      <td>50220.707129</td>
    </tr>
    <tr>
      <th>Johnson</th>
      <td>3456.626391</td>
      <td>52.0</td>
      <td>1.042409e+06</td>
      <td>256.630089</td>
      <td>49948.375252</td>
      <td>12.080160</td>
      <td>894.367849</td>
      <td>11.407403</td>
      <td>10.174843</td>
      <td>2.688184</td>
      <td>...</td>
      <td>5.817726</td>
      <td>3456.626391</td>
      <td>256.630089</td>
      <td>49948.375252</td>
      <td>894.367849</td>
      <td>10.436902</td>
      <td>15.670890</td>
      <td>11.407403</td>
      <td>161.071004</td>
      <td>52252.129693</td>
    </tr>
    <tr>
      <th>Polk</th>
      <td>3574.389356</td>
      <td>77.0</td>
      <td>1.042139e+06</td>
      <td>256.786047</td>
      <td>48455.861129</td>
      <td>12.643822</td>
      <td>881.712790</td>
      <td>11.826492</td>
      <td>10.183208</td>
      <td>2.690594</td>
      <td>...</td>
      <td>5.813899</td>
      <td>3574.389356</td>
      <td>256.786047</td>
      <td>48455.861129</td>
      <td>881.712790</td>
      <td>10.216061</td>
      <td>15.339128</td>
      <td>11.826492</td>
      <td>159.515047</td>
      <td>50249.196675</td>
    </tr>
    <tr>
      <th>Carroll</th>
      <td>3319.272978</td>
      <td>14.0</td>
      <td>1.043164e+06</td>
      <td>250.379118</td>
      <td>42441.514309</td>
      <td>11.323343</td>
      <td>1009.362997</td>
      <td>10.589884</td>
      <td>11.517219</td>
      <td>3.042522</td>
      <td>...</td>
      <td>5.863078</td>
      <td>3319.272978</td>
      <td>250.379118</td>
      <td>42441.514309</td>
      <td>1009.362997</td>
      <td>9.929890</td>
      <td>14.912195</td>
      <td>10.589884</td>
      <td>155.219949</td>
      <td>51332.226887</td>
    </tr>
    <tr>
      <th>Delaware</th>
      <td>4683.158511</td>
      <td>28.0</td>
      <td>1.043323e+06</td>
      <td>254.743212</td>
      <td>43957.494693</td>
      <td>10.607581</td>
      <td>1037.825637</td>
      <td>10.894004</td>
      <td>11.454229</td>
      <td>3.026229</td>
      <td>...</td>
      <td>6.011027</td>
      <td>4683.158511</td>
      <td>254.743212</td>
      <td>43957.494693</td>
      <td>1037.825637</td>
      <td>9.975314</td>
      <td>14.980590</td>
      <td>10.894004</td>
      <td>149.845406</td>
      <td>52076.358374</td>
    </tr>
    <tr>
      <th>Scott</th>
      <td>3633.280157</td>
      <td>82.0</td>
      <td>1.043660e+06</td>
      <td>256.517674</td>
      <td>46033.009166</td>
      <td>13.045822</td>
      <td>863.436629</td>
      <td>12.214212</td>
      <td>9.686884</td>
      <td>2.559447</td>
      <td>...</td>
      <td>5.790099</td>
      <td>3633.280157</td>
      <td>256.517674</td>
      <td>46033.009166</td>
      <td>863.436629</td>
      <td>9.624638</td>
      <td>14.450823</td>
      <td>12.214212</td>
      <td>149.449703</td>
      <td>52766.940474</td>
    </tr>
    <tr>
      <th>Floyd</th>
      <td>3681.560380</td>
      <td>34.0</td>
      <td>1.048835e+06</td>
      <td>259.050917</td>
      <td>46701.206840</td>
      <td>11.250552</td>
      <td>979.405130</td>
      <td>11.394947</td>
      <td>10.896632</td>
      <td>2.878658</td>
      <td>...</td>
      <td>5.751561</td>
      <td>3681.560380</td>
      <td>259.050917</td>
      <td>46701.206840</td>
      <td>979.405130</td>
      <td>9.604136</td>
      <td>14.424217</td>
      <td>11.394947</td>
      <td>147.524519</td>
      <td>50588.797867</td>
    </tr>
    <tr>
      <th>Woodbury</th>
      <td>3610.549841</td>
      <td>97.0</td>
      <td>1.044582e+06</td>
      <td>256.108365</td>
      <td>44762.080454</td>
      <td>12.449104</td>
      <td>907.409569</td>
      <td>11.005332</td>
      <td>9.632151</td>
      <td>2.544942</td>
      <td>...</td>
      <td>5.898888</td>
      <td>3610.549841</td>
      <td>256.108365</td>
      <td>44762.080454</td>
      <td>907.409569</td>
      <td>9.968118</td>
      <td>14.966124</td>
      <td>11.005332</td>
      <td>144.649045</td>
      <td>51100.314222</td>
    </tr>
    <tr>
      <th>Sioux</th>
      <td>3878.556120</td>
      <td>84.0</td>
      <td>1.047041e+06</td>
      <td>256.901155</td>
      <td>44265.517321</td>
      <td>10.437259</td>
      <td>1043.652810</td>
      <td>9.496921</td>
      <td>10.615156</td>
      <td>2.804090</td>
      <td>...</td>
      <td>5.863510</td>
      <td>3878.556120</td>
      <td>256.901155</td>
      <td>44265.517321</td>
      <td>1043.652810</td>
      <td>9.908660</td>
      <td>14.881450</td>
      <td>9.496921</td>
      <td>141.233329</td>
      <td>51168.080908</td>
    </tr>
    <tr>
      <th>Lee</th>
      <td>3257.744587</td>
      <td>56.0</td>
      <td>1.045221e+06</td>
      <td>257.627558</td>
      <td>47723.211780</td>
      <td>12.665637</td>
      <td>924.415600</td>
      <td>10.229810</td>
      <td>9.500765</td>
      <td>2.510179</td>
      <td>...</td>
      <td>5.758755</td>
      <td>3257.744587</td>
      <td>257.627558</td>
      <td>47723.211780</td>
      <td>924.415600</td>
      <td>9.938769</td>
      <td>14.920697</td>
      <td>10.229810</td>
      <td>139.283811</td>
      <td>52631.250720</td>
    </tr>
    <tr>
      <th>Dubuque</th>
      <td>3386.711328</td>
      <td>31.0</td>
      <td>1.043615e+06</td>
      <td>249.443359</td>
      <td>44348.253288</td>
      <td>11.590170</td>
      <td>946.888886</td>
      <td>10.185852</td>
      <td>9.786396</td>
      <td>2.585473</td>
      <td>...</td>
      <td>5.828372</td>
      <td>3386.711328</td>
      <td>249.443359</td>
      <td>44348.253288</td>
      <td>946.888886</td>
      <td>9.983731</td>
      <td>14.992111</td>
      <td>10.185852</td>
      <td>139.272394</td>
      <td>52005.636146</td>
    </tr>
    <tr>
      <th>Shelby</th>
      <td>3249.252615</td>
      <td>83.0</td>
      <td>1.044541e+06</td>
      <td>262.105746</td>
      <td>44106.647084</td>
      <td>12.253188</td>
      <td>940.425706</td>
      <td>10.195443</td>
      <td>10.227182</td>
      <td>2.701678</td>
      <td>...</td>
      <td>5.701963</td>
      <td>3249.252615</td>
      <td>262.105746</td>
      <td>44106.647084</td>
      <td>940.425706</td>
      <td>9.513225</td>
      <td>14.282304</td>
      <td>10.195443</td>
      <td>137.164365</td>
      <td>51537.000000</td>
    </tr>
    <tr>
      <th>Dickinson</th>
      <td>3587.059515</td>
      <td>30.0</td>
      <td>1.042836e+06</td>
      <td>257.897937</td>
      <td>42968.708697</td>
      <td>11.794907</td>
      <td>978.322511</td>
      <td>9.585595</td>
      <td>9.950549</td>
      <td>2.628599</td>
      <td>...</td>
      <td>5.903300</td>
      <td>3587.059515</td>
      <td>257.897937</td>
      <td>42968.708697</td>
      <td>978.322511</td>
      <td>10.361877</td>
      <td>15.559336</td>
      <td>9.585595</td>
      <td>135.507936</td>
      <td>51351.007443</td>
    </tr>
    <tr>
      <th>Pottawattamie</th>
      <td>3679.068021</td>
      <td>78.0</td>
      <td>1.043395e+06</td>
      <td>251.535640</td>
      <td>45278.825202</td>
      <td>13.442504</td>
      <td>888.740085</td>
      <td>10.367248</td>
      <td>9.100978</td>
      <td>2.404574</td>
      <td>...</td>
      <td>5.771726</td>
      <td>3679.068021</td>
      <td>251.535640</td>
      <td>45278.825202</td>
      <td>888.740085</td>
      <td>9.441530</td>
      <td>14.174404</td>
      <td>10.367248</td>
      <td>135.356809</td>
      <td>51505.815820</td>
    </tr>
    <tr>
      <th>Linn</th>
      <td>3518.087946</td>
      <td>57.0</td>
      <td>1.042862e+06</td>
      <td>257.263091</td>
      <td>46673.223199</td>
      <td>13.093124</td>
      <td>869.075612</td>
      <td>10.457264</td>
      <td>9.310354</td>
      <td>2.459748</td>
      <td>...</td>
      <td>5.852460</td>
      <td>3518.087946</td>
      <td>257.263091</td>
      <td>46673.223199</td>
      <td>869.075612</td>
      <td>9.638322</td>
      <td>14.471914</td>
      <td>10.457264</td>
      <td>133.257586</td>
      <td>52357.109682</td>
    </tr>
    <tr>
      <th>Crawford</th>
      <td>3275.017820</td>
      <td>24.0</td>
      <td>1.045649e+06</td>
      <td>248.559831</td>
      <td>45376.162018</td>
      <td>11.870782</td>
      <td>981.377238</td>
      <td>9.368543</td>
      <td>9.984054</td>
      <td>2.637392</td>
      <td>...</td>
      <td>5.855028</td>
      <td>3275.017820</td>
      <td>248.559831</td>
      <td>45376.162018</td>
      <td>981.377238</td>
      <td>9.829989</td>
      <td>14.760848</td>
      <td>9.368543</td>
      <td>133.145345</td>
      <td>51445.523244</td>
    </tr>
    <tr>
      <th>Howard</th>
      <td>3033.045962</td>
      <td>45.0</td>
      <td>1.047965e+06</td>
      <td>263.223736</td>
      <td>50604.997702</td>
      <td>10.722259</td>
      <td>1083.179251</td>
      <td>9.181221</td>
      <td>10.937411</td>
      <td>2.889358</td>
      <td>...</td>
      <td>5.951412</td>
      <td>3033.045962</td>
      <td>263.223736</td>
      <td>50604.997702</td>
      <td>1083.179251</td>
      <td>9.808974</td>
      <td>14.737270</td>
      <td>9.181221</td>
      <td>132.950906</td>
      <td>51988.715036</td>
    </tr>
    <tr>
      <th>Webster</th>
      <td>3651.788704</td>
      <td>94.0</td>
      <td>1.045240e+06</td>
      <td>260.939413</td>
      <td>45099.393382</td>
      <td>12.036165</td>
      <td>937.628162</td>
      <td>10.733260</td>
      <td>9.553792</td>
      <td>2.524007</td>
      <td>...</td>
      <td>5.874361</td>
      <td>3651.788704</td>
      <td>260.939413</td>
      <td>45099.393382</td>
      <td>937.628162</td>
      <td>9.674606</td>
      <td>14.527694</td>
      <td>10.733260</td>
      <td>132.583749</td>
      <td>50520.614188</td>
    </tr>
    <tr>
      <th>Black Hawk</th>
      <td>3694.293993</td>
      <td>7.0</td>
      <td>1.045022e+06</td>
      <td>256.187862</td>
      <td>47305.958773</td>
      <td>13.242862</td>
      <td>855.522392</td>
      <td>11.495482</td>
      <td>8.884931</td>
      <td>2.347581</td>
      <td>...</td>
      <td>5.811959</td>
      <td>3694.293993</td>
      <td>256.187862</td>
      <td>47305.958773</td>
      <td>855.522392</td>
      <td>9.413499</td>
      <td>14.135018</td>
      <td>11.495482</td>
      <td>131.776281</td>
      <td>50668.287838</td>
    </tr>
    <tr>
      <th>Hardin</th>
      <td>3363.621968</td>
      <td>42.0</td>
      <td>1.042716e+06</td>
      <td>251.362256</td>
      <td>43513.472333</td>
      <td>10.097010</td>
      <td>1117.981811</td>
      <td>9.385861</td>
      <td>10.395711</td>
      <td>2.746035</td>
      <td>...</td>
      <td>5.860490</td>
      <td>3363.621968</td>
      <td>251.362256</td>
      <td>43513.472333</td>
      <td>1117.981811</td>
      <td>10.067527</td>
      <td>15.123532</td>
      <td>9.385861</td>
      <td>131.042916</td>
      <td>50318.579409</td>
    </tr>
    <tr>
      <th>Jefferson</th>
      <td>3189.431418</td>
      <td>51.0</td>
      <td>1.042559e+06</td>
      <td>264.576528</td>
      <td>45443.737164</td>
      <td>11.261858</td>
      <td>985.342298</td>
      <td>9.993399</td>
      <td>9.231824</td>
      <td>2.438841</td>
      <td>...</td>
      <td>5.674450</td>
      <td>3189.431418</td>
      <td>264.576528</td>
      <td>45443.737164</td>
      <td>985.342298</td>
      <td>10.246688</td>
      <td>15.384084</td>
      <td>9.993399</td>
      <td>131.004128</td>
      <td>52556.000000</td>
    </tr>
    <tr>
      <th>Fremont</th>
      <td>4573.000000</td>
      <td>36.0</td>
      <td>1.038873e+06</td>
      <td>236.179039</td>
      <td>39378.873362</td>
      <td>12.877729</td>
      <td>812.554585</td>
      <td>13.484716</td>
      <td>9.236026</td>
      <td>2.441354</td>
      <td>...</td>
      <td>5.947598</td>
      <td>4573.000000</td>
      <td>236.179039</td>
      <td>39378.873362</td>
      <td>812.554585</td>
      <td>7.553493</td>
      <td>11.343188</td>
      <td>13.484716</td>
      <td>129.943668</td>
      <td>51640.000000</td>
    </tr>
    <tr>
      <th>Fayette</th>
      <td>4265.693375</td>
      <td>33.0</td>
      <td>1.046453e+06</td>
      <td>266.723077</td>
      <td>43889.114006</td>
      <td>11.030858</td>
      <td>1047.290173</td>
      <td>10.131614</td>
      <td>10.895545</td>
      <td>2.877835</td>
      <td>...</td>
      <td>5.828101</td>
      <td>4265.693375</td>
      <td>266.723077</td>
      <td>43889.114006</td>
      <td>1047.290173</td>
      <td>9.366253</td>
      <td>14.073306</td>
      <td>10.131614</td>
      <td>128.620092</td>
      <td>51263.676301</td>
    </tr>
    <tr>
      <th>Humboldt</th>
      <td>2993.599263</td>
      <td>46.0</td>
      <td>1.044412e+06</td>
      <td>260.003525</td>
      <td>44543.554078</td>
      <td>12.083160</td>
      <td>977.784009</td>
      <td>9.640923</td>
      <td>10.368398</td>
      <td>2.737758</td>
      <td>...</td>
      <td>5.925813</td>
      <td>2993.599263</td>
      <td>260.003525</td>
      <td>44543.554078</td>
      <td>977.784009</td>
      <td>9.453977</td>
      <td>14.199279</td>
      <td>9.640923</td>
      <td>126.893767</td>
      <td>50547.078834</td>
    </tr>
    <tr>
      <th>Marshall</th>
      <td>3506.484771</td>
      <td>64.0</td>
      <td>1.045208e+06</td>
      <td>260.198861</td>
      <td>44638.529368</td>
      <td>12.158418</td>
      <td>963.137142</td>
      <td>9.498844</td>
      <td>8.744316</td>
      <td>2.310074</td>
      <td>...</td>
      <td>5.850427</td>
      <td>3506.484771</td>
      <td>260.198861</td>
      <td>44638.529368</td>
      <td>963.137142</td>
      <td>9.891863</td>
      <td>14.855032</td>
      <td>9.498844</td>
      <td>126.851927</td>
      <td>50156.831060</td>
    </tr>
    <tr>
      <th>Kossuth</th>
      <td>3313.396362</td>
      <td>55.0</td>
      <td>1.046943e+06</td>
      <td>258.498946</td>
      <td>47919.842238</td>
      <td>10.895850</td>
      <td>1037.378953</td>
      <td>8.986145</td>
      <td>9.792669</td>
      <td>2.586902</td>
      <td>...</td>
      <td>5.861816</td>
      <td>3313.396362</td>
      <td>258.498946</td>
      <td>47919.842238</td>
      <td>1037.378953</td>
      <td>10.377765</td>
      <td>15.586984</td>
      <td>8.986145</td>
      <td>126.533109</td>
      <td>50517.775857</td>
    </tr>
    <tr>
      <th>Washington</th>
      <td>3486.449939</td>
      <td>92.0</td>
      <td>1.049317e+06</td>
      <td>261.304148</td>
      <td>48327.527023</td>
      <td>11.958654</td>
      <td>938.002027</td>
      <td>8.878260</td>
      <td>8.250176</td>
      <td>2.179817</td>
      <td>...</td>
      <td>5.913998</td>
      <td>3486.449939</td>
      <td>261.304148</td>
      <td>48327.527023</td>
      <td>938.002027</td>
      <td>10.188058</td>
      <td>15.295749</td>
      <td>8.878260</td>
      <td>122.501363</td>
      <td>52349.402648</td>
    </tr>
    <tr>
      <th>Winneshiek</th>
      <td>4078.730069</td>
      <td>96.0</td>
      <td>1.047582e+06</td>
      <td>251.571690</td>
      <td>44024.573289</td>
      <td>10.375238</td>
      <td>1086.889896</td>
      <td>8.697480</td>
      <td>9.197910</td>
      <td>2.429561</td>
      <td>...</td>
      <td>5.819082</td>
      <td>4078.730069</td>
      <td>251.571690</td>
      <td>44024.573289</td>
      <td>1086.889896</td>
      <td>10.180187</td>
      <td>15.288626</td>
      <td>8.697480</td>
      <td>120.216381</td>
      <td>52106.756034</td>
    </tr>
    <tr>
      <th>Clinton</th>
      <td>3489.616489</td>
      <td>23.0</td>
      <td>1.045522e+06</td>
      <td>259.932822</td>
      <td>45428.511812</td>
      <td>12.839801</td>
      <td>915.221038</td>
      <td>9.720569</td>
      <td>8.883790</td>
      <td>2.347039</td>
      <td>...</td>
      <td>5.903824</td>
      <td>3489.616489</td>
      <td>259.932822</td>
      <td>45428.511812</td>
      <td>915.221038</td>
      <td>9.050505</td>
      <td>13.590874</td>
      <td>9.720569</td>
      <td>118.197318</td>
      <td>52725.653248</td>
    </tr>
    <tr>
      <th>Des Moines</th>
      <td>3753.324690</td>
      <td>29.0</td>
      <td>1.044046e+06</td>
      <td>257.858201</td>
      <td>45948.258889</td>
      <td>12.777515</td>
      <td>893.970428</td>
      <td>9.481698</td>
      <td>7.802442</td>
      <td>2.061570</td>
      <td>...</td>
      <td>5.856680</td>
      <td>3753.324690</td>
      <td>257.858201</td>
      <td>45948.258889</td>
      <td>893.970428</td>
      <td>9.550390</td>
      <td>14.337266</td>
      <td>9.481698</td>
      <td>117.536124</td>
      <td>52628.924799</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>Montgomery</th>
      <td>3243.385541</td>
      <td>69.0</td>
      <td>1.044251e+06</td>
      <td>250.606956</td>
      <td>42731.971891</td>
      <td>11.615174</td>
      <td>969.196999</td>
      <td>7.219390</td>
      <td>6.935650</td>
      <td>1.832057</td>
      <td>...</td>
      <td>5.987851</td>
      <td>3243.385541</td>
      <td>250.606956</td>
      <td>42731.971891</td>
      <td>969.196999</td>
      <td>10.028564</td>
      <td>15.056697</td>
      <td>7.219390</td>
      <td>91.928042</td>
      <td>51550.615531</td>
    </tr>
    <tr>
      <th>Decatur</th>
      <td>3846.892626</td>
      <td>27.0</td>
      <td>1.041529e+06</td>
      <td>272.714344</td>
      <td>42337.725284</td>
      <td>12.522690</td>
      <td>907.354133</td>
      <td>7.294165</td>
      <td>6.213703</td>
      <td>1.641957</td>
      <td>...</td>
      <td>6.222447</td>
      <td>3846.892626</td>
      <td>272.714344</td>
      <td>42337.725284</td>
      <td>907.354133</td>
      <td>8.945746</td>
      <td>13.438290</td>
      <td>7.294165</td>
      <td>88.843250</td>
      <td>50142.194489</td>
    </tr>
    <tr>
      <th>O'Brien</th>
      <td>3681.299251</td>
      <td>71.0</td>
      <td>1.047592e+06</td>
      <td>259.258237</td>
      <td>47495.574136</td>
      <td>11.510426</td>
      <td>1000.993836</td>
      <td>6.650749</td>
      <td>7.137228</td>
      <td>1.885270</td>
      <td>...</td>
      <td>5.874942</td>
      <td>3681.299251</td>
      <td>259.258237</td>
      <td>47495.574136</td>
      <td>1000.993836</td>
      <td>9.506020</td>
      <td>14.277901</td>
      <td>6.650749</td>
      <td>88.300560</td>
      <td>51218.412442</td>
    </tr>
    <tr>
      <th>Osceola</th>
      <td>4795.613839</td>
      <td>72.0</td>
      <td>1.042948e+06</td>
      <td>244.917690</td>
      <td>43136.281529</td>
      <td>11.391741</td>
      <td>1046.902902</td>
      <td>6.585658</td>
      <td>6.933912</td>
      <td>1.831551</td>
      <td>...</td>
      <td>5.937779</td>
      <td>4795.613839</td>
      <td>244.917690</td>
      <td>43136.281529</td>
      <td>1046.902902</td>
      <td>9.786091</td>
      <td>14.698474</td>
      <td>6.585658</td>
      <td>87.993834</td>
      <td>51249.000000</td>
    </tr>
    <tr>
      <th>Guthrie</th>
      <td>3400.487840</td>
      <td>39.0</td>
      <td>1.040302e+06</td>
      <td>243.331226</td>
      <td>40476.350924</td>
      <td>11.459874</td>
      <td>1027.030642</td>
      <td>7.368677</td>
      <td>6.790134</td>
      <td>1.793188</td>
      <td>...</td>
      <td>6.123541</td>
      <td>3400.487840</td>
      <td>243.331226</td>
      <td>40476.350924</td>
      <td>1027.030642</td>
      <td>9.239178</td>
      <td>13.882814</td>
      <td>7.368677</td>
      <td>86.679874</td>
      <td>50168.270671</td>
    </tr>
    <tr>
      <th>Butler</th>
      <td>4274.965898</td>
      <td>12.0</td>
      <td>1.040564e+06</td>
      <td>249.936119</td>
      <td>39251.062440</td>
      <td>11.435879</td>
      <td>1018.750000</td>
      <td>7.598463</td>
      <td>7.866323</td>
      <td>2.078136</td>
      <td>...</td>
      <td>5.671710</td>
      <td>4274.965898</td>
      <td>249.936119</td>
      <td>39251.062440</td>
      <td>1018.750000</td>
      <td>8.466213</td>
      <td>12.719335</td>
      <td>7.598463</td>
      <td>86.608951</td>
      <td>50629.111912</td>
    </tr>
    <tr>
      <th>Audubon</th>
      <td>4355.273950</td>
      <td>5.0</td>
      <td>1.045009e+06</td>
      <td>246.662454</td>
      <td>42479.058296</td>
      <td>11.199348</td>
      <td>1022.390950</td>
      <td>7.562984</td>
      <td>7.453343</td>
      <td>1.969348</td>
      <td>...</td>
      <td>5.821443</td>
      <td>4355.273950</td>
      <td>246.662454</td>
      <td>42479.058296</td>
      <td>1022.390950</td>
      <td>8.634586</td>
      <td>12.976996</td>
      <td>7.562984</td>
      <td>86.001957</td>
      <td>50031.403587</td>
    </tr>
    <tr>
      <th>Worth</th>
      <td>4232.045597</td>
      <td>98.0</td>
      <td>1.045247e+06</td>
      <td>247.266545</td>
      <td>44131.815789</td>
      <td>11.218343</td>
      <td>1079.670401</td>
      <td>6.899427</td>
      <td>7.209036</td>
      <td>1.903567</td>
      <td>...</td>
      <td>5.697238</td>
      <td>4232.045597</td>
      <td>247.266545</td>
      <td>44131.815789</td>
      <td>1079.670401</td>
      <td>9.656386</td>
      <td>14.502084</td>
      <td>6.899427</td>
      <td>85.771053</td>
      <td>50458.738927</td>
    </tr>
    <tr>
      <th>Tama</th>
      <td>4110.772900</td>
      <td>86.0</td>
      <td>1.049184e+06</td>
      <td>256.332735</td>
      <td>47233.278915</td>
      <td>12.115450</td>
      <td>944.290840</td>
      <td>7.065851</td>
      <td>6.736635</td>
      <td>1.779509</td>
      <td>...</td>
      <td>5.839700</td>
      <td>4110.772900</td>
      <td>256.332735</td>
      <td>47233.278915</td>
      <td>944.290840</td>
      <td>9.075495</td>
      <td>13.626634</td>
      <td>7.065851</td>
      <td>83.626818</td>
      <td>52042.806036</td>
    </tr>
    <tr>
      <th>Wayne</th>
      <td>3063.803797</td>
      <td>93.0</td>
      <td>1.048806e+06</td>
      <td>246.546203</td>
      <td>41240.843038</td>
      <td>10.425316</td>
      <td>1064.746835</td>
      <td>6.400633</td>
      <td>6.227449</td>
      <td>1.644259</td>
      <td>...</td>
      <td>5.824684</td>
      <td>3063.803797</td>
      <td>246.546203</td>
      <td>41240.843038</td>
      <td>1064.746835</td>
      <td>9.828241</td>
      <td>14.768380</td>
      <td>6.400633</td>
      <td>81.330557</td>
      <td>50070.406962</td>
    </tr>
    <tr>
      <th>Lyon</th>
      <td>4320.491779</td>
      <td>60.0</td>
      <td>1.048842e+06</td>
      <td>252.102579</td>
      <td>42268.865370</td>
      <td>11.274935</td>
      <td>1014.018029</td>
      <td>5.793256</td>
      <td>5.872486</td>
      <td>1.551251</td>
      <td>...</td>
      <td>5.884651</td>
      <td>4320.491779</td>
      <td>252.102579</td>
      <td>42268.865370</td>
      <td>1014.018029</td>
      <td>10.179136</td>
      <td>15.285365</td>
      <td>5.793256</td>
      <td>80.143007</td>
      <td>51242.561472</td>
    </tr>
    <tr>
      <th>Pocahontas</th>
      <td>4289.619992</td>
      <td>76.0</td>
      <td>1.045588e+06</td>
      <td>263.941063</td>
      <td>42612.244029</td>
      <td>10.928351</td>
      <td>1037.914099</td>
      <td>6.398883</td>
      <td>7.121672</td>
      <td>1.880738</td>
      <td>...</td>
      <td>5.697612</td>
      <td>4289.619992</td>
      <td>263.941063</td>
      <td>42612.244029</td>
      <td>1037.914099</td>
      <td>9.069220</td>
      <td>13.620560</td>
      <td>6.398883</td>
      <td>79.618854</td>
      <td>50566.714368</td>
    </tr>
    <tr>
      <th>Buena Vista</th>
      <td>2934.859246</td>
      <td>11.0</td>
      <td>1.043468e+06</td>
      <td>257.445268</td>
      <td>44899.327300</td>
      <td>11.570323</td>
      <td>964.648059</td>
      <td>5.853431</td>
      <td>5.750129</td>
      <td>1.518997</td>
      <td>...</td>
      <td>5.839184</td>
      <td>2934.859246</td>
      <td>257.445268</td>
      <td>44899.327300</td>
      <td>964.648059</td>
      <td>10.437317</td>
      <td>15.673365</td>
      <td>5.853431</td>
      <td>79.529218</td>
      <td>50589.776385</td>
    </tr>
    <tr>
      <th>Franklin</th>
      <td>3497.575381</td>
      <td>35.0</td>
      <td>1.044440e+06</td>
      <td>260.550937</td>
      <td>44283.566306</td>
      <td>11.473214</td>
      <td>1015.957992</td>
      <td>6.312354</td>
      <td>6.402911</td>
      <td>1.691197</td>
      <td>...</td>
      <td>6.205796</td>
      <td>3497.575381</td>
      <td>260.550937</td>
      <td>44283.566306</td>
      <td>1015.957992</td>
      <td>9.913350</td>
      <td>14.888778</td>
      <td>6.312354</td>
      <td>79.192788</td>
      <td>50442.448478</td>
    </tr>
    <tr>
      <th>Poweshiek</th>
      <td>3675.044394</td>
      <td>79.0</td>
      <td>1.041499e+06</td>
      <td>257.342692</td>
      <td>42937.867516</td>
      <td>12.172973</td>
      <td>919.039373</td>
      <td>5.747676</td>
      <td>5.506746</td>
      <td>1.454381</td>
      <td>...</td>
      <td>5.986752</td>
      <td>3675.044394</td>
      <td>257.342692</td>
      <td>42937.867516</td>
      <td>919.039373</td>
      <td>9.654714</td>
      <td>14.499220</td>
      <td>5.747676</td>
      <td>76.823704</td>
      <td>50372.069217</td>
    </tr>
    <tr>
      <th>Sac</th>
      <td>3254.110259</td>
      <td>81.0</td>
      <td>1.045233e+06</td>
      <td>250.096843</td>
      <td>41409.016460</td>
      <td>10.718151</td>
      <td>1109.695603</td>
      <td>5.692559</td>
      <td>6.227822</td>
      <td>1.644582</td>
      <td>...</td>
      <td>5.899098</td>
      <td>3254.110259</td>
      <td>250.096843</td>
      <td>41409.016460</td>
      <td>1109.695603</td>
      <td>10.475405</td>
      <td>15.732678</td>
      <td>5.692559</td>
      <td>75.646837</td>
      <td>50802.653100</td>
    </tr>
    <tr>
      <th>Jasper</th>
      <td>3677.209220</td>
      <td>50.0</td>
      <td>1.046530e+06</td>
      <td>263.119865</td>
      <td>43456.732463</td>
      <td>12.301067</td>
      <td>929.731058</td>
      <td>6.009374</td>
      <td>5.732085</td>
      <td>1.514313</td>
      <td>...</td>
      <td>5.768415</td>
      <td>3677.209220</td>
      <td>263.119865</td>
      <td>43456.732463</td>
      <td>929.731058</td>
      <td>9.265812</td>
      <td>13.916554</td>
      <td>6.009374</td>
      <td>72.274412</td>
      <td>50190.035742</td>
    </tr>
    <tr>
      <th>Grundy</th>
      <td>4329.639172</td>
      <td>38.0</td>
      <td>1.040646e+06</td>
      <td>240.704215</td>
      <td>40971.630632</td>
      <td>11.810683</td>
      <td>1002.938772</td>
      <td>6.157340</td>
      <td>6.185316</td>
      <td>1.633781</td>
      <td>...</td>
      <td>5.602108</td>
      <td>4329.639172</td>
      <td>240.704215</td>
      <td>40971.630632</td>
      <td>1002.938772</td>
      <td>8.473290</td>
      <td>12.729771</td>
      <td>6.157340</td>
      <td>71.190580</td>
      <td>50638.291061</td>
    </tr>
    <tr>
      <th>Palo Alto</th>
      <td>4036.579965</td>
      <td>74.0</td>
      <td>1.041811e+06</td>
      <td>253.814290</td>
      <td>40231.896971</td>
      <td>10.565141</td>
      <td>1088.817788</td>
      <td>5.057545</td>
      <td>5.520668</td>
      <td>1.458181</td>
      <td>...</td>
      <td>5.702514</td>
      <td>4036.579965</td>
      <td>253.814290</td>
      <td>40231.896971</td>
      <td>1088.817788</td>
      <td>10.409100</td>
      <td>15.629041</td>
      <td>5.057545</td>
      <td>69.604876</td>
      <td>50636.794954</td>
    </tr>
    <tr>
      <th>Clayton</th>
      <td>4022.692151</td>
      <td>22.0</td>
      <td>1.046143e+06</td>
      <td>245.572893</td>
      <td>43314.508647</td>
      <td>10.571250</td>
      <td>1067.194225</td>
      <td>4.817670</td>
      <td>5.071168</td>
      <td>1.339522</td>
      <td>...</td>
      <td>5.704985</td>
      <td>4022.692151</td>
      <td>245.572893</td>
      <td>43314.508647</td>
      <td>1067.194225</td>
      <td>10.316978</td>
      <td>15.494100</td>
      <td>4.817670</td>
      <td>66.717674</td>
      <td>52025.526411</td>
    </tr>
    <tr>
      <th>Jones</th>
      <td>3363.300059</td>
      <td>53.0</td>
      <td>1.046974e+06</td>
      <td>247.245101</td>
      <td>44503.341575</td>
      <td>11.757761</td>
      <td>996.045457</td>
      <td>5.039950</td>
      <td>5.423211</td>
      <td>1.432769</td>
      <td>...</td>
      <td>5.755007</td>
      <td>3363.300059</td>
      <td>247.245101</td>
      <td>44503.341575</td>
      <td>996.045457</td>
      <td>9.283679</td>
      <td>13.944414</td>
      <td>5.039950</td>
      <td>65.444390</td>
      <td>52276.923554</td>
    </tr>
    <tr>
      <th>Cedar</th>
      <td>4465.860053</td>
      <td>16.0</td>
      <td>1.043411e+06</td>
      <td>258.830036</td>
      <td>44020.844799</td>
      <td>12.031985</td>
      <td>911.310403</td>
      <td>5.715284</td>
      <td>5.167753</td>
      <td>1.364996</td>
      <td>...</td>
      <td>5.902667</td>
      <td>4465.860053</td>
      <td>258.830036</td>
      <td>44020.844799</td>
      <td>911.310403</td>
      <td>8.287009</td>
      <td>12.448812</td>
      <td>5.715284</td>
      <td>64.009473</td>
      <td>52651.948726</td>
    </tr>
    <tr>
      <th>Louisa</th>
      <td>3733.331018</td>
      <td>58.0</td>
      <td>1.039629e+06</td>
      <td>260.153462</td>
      <td>43029.882570</td>
      <td>13.656610</td>
      <td>841.138485</td>
      <td>7.735837</td>
      <td>4.395620</td>
      <td>1.161630</td>
      <td>...</td>
      <td>5.419362</td>
      <td>3733.331018</td>
      <td>260.153462</td>
      <td>43029.882570</td>
      <td>841.138485</td>
      <td>8.236974</td>
      <td>12.367241</td>
      <td>7.735837</td>
      <td>61.715704</td>
      <td>52703.461255</td>
    </tr>
    <tr>
      <th>Davis</th>
      <td>3013.000000</td>
      <td>26.0</td>
      <td>1.046640e+06</td>
      <td>257.830482</td>
      <td>44904.773976</td>
      <td>10.097978</td>
      <td>1039.009850</td>
      <td>4.888025</td>
      <td>5.039010</td>
      <td>1.330824</td>
      <td>...</td>
      <td>5.808191</td>
      <td>3013.000000</td>
      <td>257.830482</td>
      <td>44904.773976</td>
      <td>1039.009850</td>
      <td>9.076516</td>
      <td>13.634287</td>
      <td>4.888025</td>
      <td>60.654889</td>
      <td>52537.000000</td>
    </tr>
    <tr>
      <th>Harrison</th>
      <td>4257.492341</td>
      <td>43.0</td>
      <td>1.049191e+06</td>
      <td>243.960914</td>
      <td>44951.364126</td>
      <td>12.242410</td>
      <td>913.441185</td>
      <td>4.684430</td>
      <td>4.198329</td>
      <td>1.109179</td>
      <td>...</td>
      <td>5.936960</td>
      <td>4257.492341</td>
      <td>243.960914</td>
      <td>44951.364126</td>
      <td>913.441185</td>
      <td>8.993125</td>
      <td>13.504819</td>
      <td>4.684430</td>
      <td>54.800180</td>
      <td>51557.922065</td>
    </tr>
    <tr>
      <th>Adams</th>
      <td>2327.000000</td>
      <td>2.0</td>
      <td>1.045576e+06</td>
      <td>261.787500</td>
      <td>43571.756696</td>
      <td>12.659375</td>
      <td>994.086161</td>
      <td>4.541518</td>
      <td>4.103344</td>
      <td>1.083004</td>
      <td>...</td>
      <td>6.069196</td>
      <td>2327.000000</td>
      <td>261.787500</td>
      <td>43571.756696</td>
      <td>994.086161</td>
      <td>10.195147</td>
      <td>15.302268</td>
      <td>4.541518</td>
      <td>54.656826</td>
      <td>50841.000000</td>
    </tr>
    <tr>
      <th>Mitchell</th>
      <td>4517.933242</td>
      <td>66.0</td>
      <td>1.043356e+06</td>
      <td>259.080051</td>
      <td>44853.907829</td>
      <td>11.327534</td>
      <td>1000.342098</td>
      <td>4.156290</td>
      <td>4.517180</td>
      <td>1.193155</td>
      <td>...</td>
      <td>5.886326</td>
      <td>4517.933242</td>
      <td>259.080051</td>
      <td>44853.907829</td>
      <td>1000.342098</td>
      <td>9.785710</td>
      <td>14.698779</td>
      <td>4.156290</td>
      <td>53.224804</td>
      <td>50463.161568</td>
    </tr>
    <tr>
      <th>Monona</th>
      <td>3826.531913</td>
      <td>67.0</td>
      <td>1.049145e+06</td>
      <td>255.009882</td>
      <td>46830.096306</td>
      <td>12.285194</td>
      <td>966.963470</td>
      <td>4.282926</td>
      <td>3.864324</td>
      <td>1.020579</td>
      <td>...</td>
      <td>5.720962</td>
      <td>3826.531913</td>
      <td>255.009882</td>
      <td>46830.096306</td>
      <td>966.963470</td>
      <td>9.614269</td>
      <td>14.435406</td>
      <td>4.282926</td>
      <td>52.771386</td>
      <td>51037.953993</td>
    </tr>
    <tr>
      <th>Keokuk</th>
      <td>4242.955373</td>
      <td>54.0</td>
      <td>1.047949e+06</td>
      <td>259.839695</td>
      <td>45086.714328</td>
      <td>11.898708</td>
      <td>970.096888</td>
      <td>4.782149</td>
      <td>4.587413</td>
      <td>1.211952</td>
      <td>...</td>
      <td>6.114797</td>
      <td>4242.955373</td>
      <td>259.839695</td>
      <td>45086.714328</td>
      <td>970.096888</td>
      <td>8.456447</td>
      <td>12.698826</td>
      <td>4.782149</td>
      <td>52.516362</td>
      <td>52546.488550</td>
    </tr>
    <tr>
      <th>Taylor</th>
      <td>3641.227380</td>
      <td>87.0</td>
      <td>1.042184e+06</td>
      <td>248.768248</td>
      <td>44145.316515</td>
      <td>12.483687</td>
      <td>898.208880</td>
      <td>4.085772</td>
      <td>3.641060</td>
      <td>0.962570</td>
      <td>...</td>
      <td>5.712412</td>
      <td>3641.227380</td>
      <td>248.768248</td>
      <td>44145.316515</td>
      <td>898.208880</td>
      <td>9.070975</td>
      <td>13.618009</td>
      <td>4.085772</td>
      <td>47.882143</td>
      <td>50841.264379</td>
    </tr>
  </tbody>
</table>
<p>99 rows × 21 columns</p>
</div>




```python
df.Sale.sum()
```




    349854916.2888579




```python
df_2015 = df[df['Year']==2015]
```


```python
df_2015.dropna(inplace=True)
```

    /anaconda3/lib/python3.6/site-packages/ipykernel_launcher.py:1: SettingWithCopyWarning: 
    A value is trying to be set on a copy of a slice from a DataFrame
    
    See the caveats in the documentation: http://pandas.pydata.org/pandas-docs/stable/indexing.html#indexing-view-versus-copy
      """Entry point for launching an IPython kernel.



```python
df_2015 
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
      <th>Invoice/Item Number</th>
      <th>Date</th>
      <th>Store Number</th>
      <th>Store Name</th>
      <th>Address</th>
      <th>City</th>
      <th>Zip Code</th>
      <th>Store Location</th>
      <th>County Number</th>
      <th>County</th>
      <th>...</th>
      <th>Month</th>
      <th>Store_Number</th>
      <th>Vendor_Number</th>
      <th>Item_Number</th>
      <th>Bottle_Volume</th>
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
      <th>Zip_Code</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>6</th>
      <td>S28865700001</td>
      <td>2015-11-09</td>
      <td>2538</td>
      <td>Hy-Vee Food Store #3 / Waterloo</td>
      <td>1422 FLAMMANG DR</td>
      <td>WATERLOO</td>
      <td>50702</td>
      <td>1422 FLAMMANG DR\nWATERLOO 50702\n(42.459938, ...</td>
      <td>7.0</td>
      <td>Black Hawk</td>
      <td>...</td>
      <td>11</td>
      <td>2538</td>
      <td>962</td>
      <td>238</td>
      <td>1500.0</td>
      <td>11.62</td>
      <td>17.43</td>
      <td>6</td>
      <td>104.58</td>
      <td>50702.0</td>
    </tr>
    <tr>
      <th>8</th>
      <td>S29339300091</td>
      <td>2015-11-30</td>
      <td>2662</td>
      <td>Hy-Vee Wine &amp; Spirits / Muscatine</td>
      <td>522 MULBERRY, SUITE A</td>
      <td>MUSCATINE</td>
      <td>52761</td>
      <td>522 MULBERRY, SUITE A\nMUSCATINE 52761\n</td>
      <td>70.0</td>
      <td>Muscatine</td>
      <td>...</td>
      <td>11</td>
      <td>2662</td>
      <td>65</td>
      <td>173</td>
      <td>750.0</td>
      <td>19.58</td>
      <td>29.37</td>
      <td>4</td>
      <td>117.48</td>
      <td>52761.0</td>
    </tr>
    <tr>
      <th>13</th>
      <td>S28866900001</td>
      <td>2015-11-11</td>
      <td>3650</td>
      <td>Spirits, Stogies and Stuff</td>
      <td>118 South Main St.</td>
      <td>HOLSTEIN</td>
      <td>51025</td>
      <td>118 South Main St.\nHOLSTEIN 51025\n(42.490073...</td>
      <td>47.0</td>
      <td>Ida</td>
      <td>...</td>
      <td>11</td>
      <td>3650</td>
      <td>962</td>
      <td>238</td>
      <td>1500.0</td>
      <td>11.62</td>
      <td>17.43</td>
      <td>1</td>
      <td>17.43</td>
      <td>51025.0</td>
    </tr>
    <tr>
      <th>18</th>
      <td>S29134300126</td>
      <td>2015-11-18</td>
      <td>3723</td>
      <td>J D Spirits Liquor</td>
      <td>1023  9TH ST</td>
      <td>ONAWA</td>
      <td>51040</td>
      <td>1023 9TH ST\nONAWA 51040\n(42.025841, -96.095845)</td>
      <td>67.0</td>
      <td>Monona</td>
      <td>...</td>
      <td>11</td>
      <td>3723</td>
      <td>305</td>
      <td>258</td>
      <td>6000.0</td>
      <td>99.00</td>
      <td>148.50</td>
      <td>1</td>
      <td>148.50</td>
      <td>51040.0</td>
    </tr>
    <tr>
      <th>21</th>
      <td>S29282800048</td>
      <td>2015-11-23</td>
      <td>2642</td>
      <td>Hy-Vee Wine and Spirits / Pella</td>
      <td>512 E OSKALOOSA</td>
      <td>PELLA</td>
      <td>50219</td>
      <td>512 E OSKALOOSA\nPELLA 50219\n(41.397023, -92....</td>
      <td>63.0</td>
      <td>Marion</td>
      <td>...</td>
      <td>11</td>
      <td>2642</td>
      <td>962</td>
      <td>238</td>
      <td>1500.0</td>
      <td>11.62</td>
      <td>17.43</td>
      <td>6</td>
      <td>104.58</td>
      <td>50219.0</td>
    </tr>
    <tr>
      <th>25</th>
      <td>S28867000001</td>
      <td>2015-11-04</td>
      <td>3842</td>
      <td>Bancroft Liquor Store</td>
      <td>107 N PORTLAND ST PO BX 222</td>
      <td>BANCROFT</td>
      <td>50517</td>
      <td>107 N PORTLAND ST PO BX 222\nBANCROFT 50517\n(...</td>
      <td>55.0</td>
      <td>Kossuth</td>
      <td>...</td>
      <td>11</td>
      <td>3842</td>
      <td>962</td>
      <td>238</td>
      <td>1500.0</td>
      <td>11.62</td>
      <td>17.43</td>
      <td>3</td>
      <td>52.29</td>
      <td>50517.0</td>
    </tr>
    <tr>
      <th>29</th>
      <td>S28865800001</td>
      <td>2015-11-09</td>
      <td>2539</td>
      <td>Hy-Vee Food Store / iowa Falls</td>
      <td>HIGHWAY 65 SOUTH</td>
      <td>IOWA FALLS</td>
      <td>50126</td>
      <td>HIGHWAY 65 SOUTH\nIOWA FALLS 50126\n</td>
      <td>42.0</td>
      <td>Hardin</td>
      <td>...</td>
      <td>11</td>
      <td>2539</td>
      <td>962</td>
      <td>238</td>
      <td>1500.0</td>
      <td>11.62</td>
      <td>17.43</td>
      <td>6</td>
      <td>104.58</td>
      <td>50126.0</td>
    </tr>
    <tr>
      <th>38</th>
      <td>S28867100001</td>
      <td>2015-11-09</td>
      <td>4604</td>
      <td>Pit Stop Liquors / Newton</td>
      <td>1324, 1st AVE E</td>
      <td>NEWTON</td>
      <td>50208</td>
      <td>1324, 1st AVE E\nNEWTON 50208\n(41.699173, -93...</td>
      <td>50.0</td>
      <td>Jasper</td>
      <td>...</td>
      <td>11</td>
      <td>4604</td>
      <td>962</td>
      <td>238</td>
      <td>1500.0</td>
      <td>11.62</td>
      <td>17.43</td>
      <td>2</td>
      <td>34.86</td>
      <td>50208.0</td>
    </tr>
    <tr>
      <th>42</th>
      <td>S29191200001</td>
      <td>2015-11-19</td>
      <td>2248</td>
      <td>Ingersoll Liquor and Beverage</td>
      <td>3500 INGERSOLL AVE</td>
      <td>DES MOINES</td>
      <td>50312</td>
      <td>3500 INGERSOLL AVE\nDES MOINES 50312\n(41.5863...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>11</td>
      <td>2248</td>
      <td>65</td>
      <td>173</td>
      <td>750.0</td>
      <td>19.58</td>
      <td>29.37</td>
      <td>36</td>
      <td>1057.32</td>
      <td>50312.0</td>
    </tr>
    <tr>
      <th>50</th>
      <td>S29137200001</td>
      <td>2015-11-18</td>
      <td>2566</td>
      <td>Hy-Vee Food Store / Knoxville</td>
      <td>813 N LINCOLN STE 1</td>
      <td>KNOXVILLE</td>
      <td>50138</td>
      <td>813 N LINCOLN STE 1\nKNOXVILLE 50138\n(41.3254...</td>
      <td>63.0</td>
      <td>Marion</td>
      <td>...</td>
      <td>11</td>
      <td>2566</td>
      <td>962</td>
      <td>238</td>
      <td>1500.0</td>
      <td>11.62</td>
      <td>17.43</td>
      <td>12</td>
      <td>209.16</td>
      <td>50138.0</td>
    </tr>
    <tr>
      <th>52</th>
      <td>S29161800004</td>
      <td>2015-11-18</td>
      <td>2622</td>
      <td>Hy-Vee Food Store / Iowa City</td>
      <td>1125 N DODGE ST</td>
      <td>IOWA CITY</td>
      <td>52240</td>
      <td>1125 N DODGE ST\nIOWA CITY 52240\n(41.676203, ...</td>
      <td>52.0</td>
      <td>Johnson</td>
      <td>...</td>
      <td>11</td>
      <td>2622</td>
      <td>305</td>
      <td>258</td>
      <td>6000.0</td>
      <td>99.00</td>
      <td>148.50</td>
      <td>1</td>
      <td>148.50</td>
      <td>52240.0</td>
    </tr>
    <tr>
      <th>53</th>
      <td>S29082800001</td>
      <td>2015-11-16</td>
      <td>2573</td>
      <td>Hy-Vee Food Store / Muscatine</td>
      <td>2400 2ND AVE</td>
      <td>MUSCATINE</td>
      <td>52761</td>
      <td>2400 2ND AVE\nMUSCATINE 52761\n(41.45135, -91....</td>
      <td>70.0</td>
      <td>Muscatine</td>
      <td>...</td>
      <td>11</td>
      <td>2573</td>
      <td>305</td>
      <td>258</td>
      <td>6000.0</td>
      <td>99.00</td>
      <td>148.50</td>
      <td>1</td>
      <td>148.50</td>
      <td>52761.0</td>
    </tr>
    <tr>
      <th>56</th>
      <td>S29331500076</td>
      <td>2015-11-30</td>
      <td>4152</td>
      <td>Food Land Super Markets / Missouri V</td>
      <td>407 W HURON</td>
      <td>MISSOURI VALLEY</td>
      <td>51555</td>
      <td>407 W HURON\nMISSOURI VALLEY 51555\n(41.557404...</td>
      <td>43.0</td>
      <td>Harrison</td>
      <td>...</td>
      <td>11</td>
      <td>4152</td>
      <td>65</td>
      <td>173</td>
      <td>750.0</td>
      <td>19.58</td>
      <td>29.37</td>
      <td>1</td>
      <td>29.37</td>
      <td>51555.0</td>
    </tr>
    <tr>
      <th>62</th>
      <td>S29216200002</td>
      <td>2015-11-20</td>
      <td>2573</td>
      <td>Hy-Vee Food Store / Muscatine</td>
      <td>2400 2ND AVE</td>
      <td>MUSCATINE</td>
      <td>52761</td>
      <td>2400 2ND AVE\nMUSCATINE 52761\n(41.45135, -91....</td>
      <td>70.0</td>
      <td>Muscatine</td>
      <td>...</td>
      <td>11</td>
      <td>2573</td>
      <td>305</td>
      <td>258</td>
      <td>6000.0</td>
      <td>99.00</td>
      <td>148.50</td>
      <td>2</td>
      <td>297.00</td>
      <td>52761.0</td>
    </tr>
    <tr>
      <th>69</th>
      <td>S28867200001</td>
      <td>2015-11-05</td>
      <td>4881</td>
      <td>Sperry One Stop Shop LLC</td>
      <td>516 HWY 141</td>
      <td>COON RAPIDS</td>
      <td>50058</td>
      <td>516 HWY 141\nCOON RAPIDS 50058\n</td>
      <td>14.0</td>
      <td>Carroll</td>
      <td>...</td>
      <td>11</td>
      <td>4881</td>
      <td>962</td>
      <td>238</td>
      <td>1500.0</td>
      <td>11.62</td>
      <td>17.43</td>
      <td>1</td>
      <td>17.43</td>
      <td>50058.0</td>
    </tr>
    <tr>
      <th>84</th>
      <td>S29249700269</td>
      <td>2015-11-21</td>
      <td>2619</td>
      <td>Hy-Vee Wine and Spirits / WDM</td>
      <td>1725  74TH ST</td>
      <td>WEST DES MOINES</td>
      <td>50266</td>
      <td>1725 74TH ST\nWEST DES MOINES 50266\n(41.59851...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>11</td>
      <td>2619</td>
      <td>305</td>
      <td>258</td>
      <td>6000.0</td>
      <td>99.00</td>
      <td>148.50</td>
      <td>2</td>
      <td>297.00</td>
      <td>50266.0</td>
    </tr>
    <tr>
      <th>85</th>
      <td>S28865900001</td>
      <td>2015-11-11</td>
      <td>2566</td>
      <td>Hy-Vee Food Store / Knoxville</td>
      <td>813 N LINCOLN STE 1</td>
      <td>KNOXVILLE</td>
      <td>50138</td>
      <td>813 N LINCOLN STE 1\nKNOXVILLE 50138\n(41.3254...</td>
      <td>63.0</td>
      <td>Marion</td>
      <td>...</td>
      <td>11</td>
      <td>2566</td>
      <td>962</td>
      <td>238</td>
      <td>1500.0</td>
      <td>11.62</td>
      <td>17.43</td>
      <td>6</td>
      <td>104.58</td>
      <td>50138.0</td>
    </tr>
    <tr>
      <th>90</th>
      <td>S28866800001</td>
      <td>2015-11-09</td>
      <td>2643</td>
      <td>Hy-Vee Wine and Spirits / Waterloo</td>
      <td>2126 KIMBALL AVE</td>
      <td>WATERLOO</td>
      <td>50701</td>
      <td>2126 KIMBALL AVE\nWATERLOO 50701\n</td>
      <td>7.0</td>
      <td>Black Hawk</td>
      <td>...</td>
      <td>11</td>
      <td>2643</td>
      <td>962</td>
      <td>238</td>
      <td>1500.0</td>
      <td>11.62</td>
      <td>17.43</td>
      <td>6</td>
      <td>104.58</td>
      <td>50701.0</td>
    </tr>
    <tr>
      <th>93</th>
      <td>S29142300101</td>
      <td>2015-11-18</td>
      <td>2637</td>
      <td>Hy-Vee #5 / Davenport</td>
      <td>2351 W LOCUST</td>
      <td>DAVENPORT</td>
      <td>52804</td>
      <td>2351 W LOCUST\nDAVENPORT 52804\n(41.538207, -9...</td>
      <td>82.0</td>
      <td>Scott</td>
      <td>...</td>
      <td>11</td>
      <td>2637</td>
      <td>962</td>
      <td>238</td>
      <td>1500.0</td>
      <td>11.62</td>
      <td>17.43</td>
      <td>6</td>
      <td>104.58</td>
      <td>52804.0</td>
    </tr>
    <tr>
      <th>100</th>
      <td>S23647700049</td>
      <td>2015-01-26</td>
      <td>4742</td>
      <td>No Frills Supermarkets #786 / Counci</td>
      <td>1817, W BROADWAY</td>
      <td>COUNCIL BLUFFS</td>
      <td>51501</td>
      <td>1817, W BROADWAY\nCOUNCIL BLUFFS 51501\n(41.26...</td>
      <td>78.0</td>
      <td>Pottawattamie</td>
      <td>...</td>
      <td>1</td>
      <td>4742</td>
      <td>35</td>
      <td>43128</td>
      <td>1750.0</td>
      <td>15.00</td>
      <td>22.50</td>
      <td>12</td>
      <td>270.00</td>
      <td>51501.0</td>
    </tr>
    <tr>
      <th>101</th>
      <td>S29065400007</td>
      <td>2015-11-16</td>
      <td>2555</td>
      <td>Hy-Vee Food Store / Keokuk</td>
      <td>3111 MAIN</td>
      <td>KEOKUK</td>
      <td>52632</td>
      <td>3111 MAIN\nKEOKUK 52632\n(40.414975, -91.403338)</td>
      <td>56.0</td>
      <td>Lee</td>
      <td>...</td>
      <td>11</td>
      <td>2555</td>
      <td>260</td>
      <td>37996</td>
      <td>750.0</td>
      <td>8.25</td>
      <td>12.38</td>
      <td>12</td>
      <td>148.56</td>
      <td>52632.0</td>
    </tr>
    <tr>
      <th>102</th>
      <td>S26107400154</td>
      <td>2015-06-09</td>
      <td>2666</td>
      <td>Hy-Vee #2 / Ankeny</td>
      <td>2510 SW STATE ST</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>2510 SW STATE ST\nANKENY 50023\n(41.704185, -9...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>6</td>
      <td>2666</td>
      <td>259</td>
      <td>76478</td>
      <td>750.0</td>
      <td>8.83</td>
      <td>13.75</td>
      <td>2</td>
      <td>27.50</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>103</th>
      <td>S27992700007</td>
      <td>2015-09-21</td>
      <td>4898</td>
      <td>Burlington Shell</td>
      <td>130, S ROOSEVELT AVE</td>
      <td>BURLINGTON</td>
      <td>52601</td>
      <td>130, S ROOSEVELT AVE\nBURLINGTON 52601\n(40.80...</td>
      <td>29.0</td>
      <td>Des Moines</td>
      <td>...</td>
      <td>9</td>
      <td>4898</td>
      <td>260</td>
      <td>37993</td>
      <td>200.0</td>
      <td>2.75</td>
      <td>4.13</td>
      <td>10</td>
      <td>41.30</td>
      <td>52601.0</td>
    </tr>
    <tr>
      <th>104</th>
      <td>S29131400002</td>
      <td>2015-11-17</td>
      <td>4426</td>
      <td>LIQUOR AND GROCERY DEPOT</td>
      <td>114 CENTRAL ST N Suite 1</td>
      <td>MARSHALLTOWN</td>
      <td>50158</td>
      <td>114 CENTRAL ST N Suite 1\nMARSHALLTOWN 50158\n</td>
      <td>64.0</td>
      <td>Marshall</td>
      <td>...</td>
      <td>11</td>
      <td>4426</td>
      <td>297</td>
      <td>23626</td>
      <td>750.0</td>
      <td>3.46</td>
      <td>5.19</td>
      <td>12</td>
      <td>62.28</td>
      <td>50158.0</td>
    </tr>
    <tr>
      <th>105</th>
      <td>S25525700025</td>
      <td>2015-05-07</td>
      <td>4958</td>
      <td>Five Corners Liquor &amp; Wine</td>
      <td>809 E 18TH ST</td>
      <td>CEDAR FALLS</td>
      <td>50613</td>
      <td>809 E 18TH ST\nCEDAR FALLS 50613\n(42.5214, -9...</td>
      <td>7.0</td>
      <td>Black Hawk</td>
      <td>...</td>
      <td>5</td>
      <td>4958</td>
      <td>259</td>
      <td>86796</td>
      <td>750.0</td>
      <td>4.87</td>
      <td>7.56</td>
      <td>3</td>
      <td>22.68</td>
      <td>50613.0</td>
    </tr>
    <tr>
      <th>106</th>
      <td>S24499300036</td>
      <td>2015-03-12</td>
      <td>4847</td>
      <td>Slagle Foods LeClaire</td>
      <td>1301 EAGLE RIDGE RD</td>
      <td>LECLAIRE</td>
      <td>52753</td>
      <td>1301 EAGLE RIDGE RD\nLECLAIRE 52753\n(41.58734...</td>
      <td>82.0</td>
      <td>Scott</td>
      <td>...</td>
      <td>3</td>
      <td>4847</td>
      <td>65</td>
      <td>19061</td>
      <td>500.0</td>
      <td>6.83</td>
      <td>10.25</td>
      <td>1</td>
      <td>10.25</td>
      <td>52753.0</td>
    </tr>
    <tr>
      <th>107</th>
      <td>S23530700064</td>
      <td>2015-01-15</td>
      <td>4969</td>
      <td>Lake Liquors Wine and Spirits</td>
      <td>910 N 8TH ST W</td>
      <td>CLEAR LAKE</td>
      <td>50428</td>
      <td>910 N 8TH ST W\nCLEAR LAKE 50428\n(43.142775, ...</td>
      <td>17.0</td>
      <td>Cerro Gordo</td>
      <td>...</td>
      <td>1</td>
      <td>4969</td>
      <td>305</td>
      <td>5486</td>
      <td>750.0</td>
      <td>30.07</td>
      <td>45.11</td>
      <td>3</td>
      <td>135.33</td>
      <td>50428.0</td>
    </tr>
    <tr>
      <th>108</th>
      <td>S27099100001</td>
      <td>2015-08-03</td>
      <td>5070</td>
      <td>Jeff's Market / Wilton</td>
      <td>101, E 4TH ST</td>
      <td>WILTON</td>
      <td>52778</td>
      <td>101, E 4TH ST\nWILTON 52778\n(41.58873, -91.01...</td>
      <td>70.0</td>
      <td>Muscatine</td>
      <td>...</td>
      <td>8</td>
      <td>5070</td>
      <td>434</td>
      <td>80578</td>
      <td>1750.0</td>
      <td>7.05</td>
      <td>10.58</td>
      <td>6</td>
      <td>63.48</td>
      <td>52778.0</td>
    </tr>
    <tr>
      <th>109</th>
      <td>S24009000053</td>
      <td>2015-02-12</td>
      <td>4269</td>
      <td>Tipton Family Foods</td>
      <td>610 CEDAR ST</td>
      <td>TIPTON</td>
      <td>52772</td>
      <td>610 CEDAR ST\nTIPTON 52772\n(41.771753, -91.12...</td>
      <td>16.0</td>
      <td>Cedar</td>
      <td>...</td>
      <td>2</td>
      <td>4269</td>
      <td>65</td>
      <td>10626</td>
      <td>750.0</td>
      <td>7.88</td>
      <td>11.82</td>
      <td>5</td>
      <td>59.10</td>
      <td>52772.0</td>
    </tr>
    <tr>
      <th>110</th>
      <td>S28774900013</td>
      <td>2015-11-02</td>
      <td>4689</td>
      <td>Walgreens #11759 / Fort Madison</td>
      <td>2639 AVENUE L</td>
      <td>FORT MADISON</td>
      <td>52627</td>
      <td>2639 AVENUE L\nFORT MADISON 52627\n(40.626968,...</td>
      <td>56.0</td>
      <td>Lee</td>
      <td>...</td>
      <td>11</td>
      <td>4689</td>
      <td>240</td>
      <td>45886</td>
      <td>750.0</td>
      <td>9.65</td>
      <td>14.48</td>
      <td>12</td>
      <td>173.76</td>
      <td>52627.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2184454</th>
      <td>S29235700001</td>
      <td>2015-12-03</td>
      <td>4669</td>
      <td>Vom Fass / Des Moines</td>
      <td>833, 42ND ST</td>
      <td>DES MOINES</td>
      <td>50312</td>
      <td>833, 42ND ST\nDES MOINES 50312\n(41.593431, -9...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>12</td>
      <td>4669</td>
      <td>166</td>
      <td>987643</td>
      <td>200.0</td>
      <td>21.49</td>
      <td>32.24</td>
      <td>12</td>
      <td>386.88</td>
      <td>50312.0</td>
    </tr>
    <tr>
      <th>2184455</th>
      <td>S29445800040</td>
      <td>2015-12-03</td>
      <td>4669</td>
      <td>Vom Fass / Des Moines</td>
      <td>833, 42ND ST</td>
      <td>DES MOINES</td>
      <td>50312</td>
      <td>833, 42ND ST\nDES MOINES 50312\n(41.593431, -9...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>12</td>
      <td>4669</td>
      <td>885</td>
      <td>987884</td>
      <td>200.0</td>
      <td>9.53</td>
      <td>14.30</td>
      <td>6</td>
      <td>85.80</td>
      <td>50312.0</td>
    </tr>
    <tr>
      <th>2184456</th>
      <td>S29445800039</td>
      <td>2015-12-03</td>
      <td>4669</td>
      <td>Vom Fass / Des Moines</td>
      <td>833, 42ND ST</td>
      <td>DES MOINES</td>
      <td>50312</td>
      <td>833, 42ND ST\nDES MOINES 50312\n(41.593431, -9...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>12</td>
      <td>4669</td>
      <td>885</td>
      <td>987885</td>
      <td>375.0</td>
      <td>13.24</td>
      <td>19.86</td>
      <td>6</td>
      <td>119.16</td>
      <td>50312.0</td>
    </tr>
    <tr>
      <th>2184457</th>
      <td>S29458500002</td>
      <td>2015-12-10</td>
      <td>3995</td>
      <td>Barmuda Distribution</td>
      <td>6027 University Ave STE 100</td>
      <td>CEDAR FALLS</td>
      <td>50613</td>
      <td>6027 University Ave STE 100\nCEDAR FALLS 50613...</td>
      <td>7.0</td>
      <td>Black Hawk</td>
      <td>...</td>
      <td>12</td>
      <td>3995</td>
      <td>259</td>
      <td>988018</td>
      <td>750.0</td>
      <td>9.83</td>
      <td>14.75</td>
      <td>12</td>
      <td>177.00</td>
      <td>50613.0</td>
    </tr>
    <tr>
      <th>2184458</th>
      <td>S29702200004</td>
      <td>2015-12-17</td>
      <td>4669</td>
      <td>Vom Fass / Des Moines</td>
      <td>833, 42ND ST</td>
      <td>DES MOINES</td>
      <td>50312</td>
      <td>833, 42ND ST\nDES MOINES 50312\n(41.593431, -9...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>12</td>
      <td>4669</td>
      <td>166</td>
      <td>987646</td>
      <td>200.0</td>
      <td>21.49</td>
      <td>32.24</td>
      <td>12</td>
      <td>386.88</td>
      <td>50312.0</td>
    </tr>
    <tr>
      <th>2184459</th>
      <td>S29702200002</td>
      <td>2015-12-17</td>
      <td>4669</td>
      <td>Vom Fass / Des Moines</td>
      <td>833, 42ND ST</td>
      <td>DES MOINES</td>
      <td>50312</td>
      <td>833, 42ND ST\nDES MOINES 50312\n(41.593431, -9...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>12</td>
      <td>4669</td>
      <td>166</td>
      <td>987647</td>
      <td>750.0</td>
      <td>48.67</td>
      <td>73.01</td>
      <td>6</td>
      <td>438.06</td>
      <td>50312.0</td>
    </tr>
    <tr>
      <th>2184460</th>
      <td>S29702200003</td>
      <td>2015-12-17</td>
      <td>4669</td>
      <td>Vom Fass / Des Moines</td>
      <td>833, 42ND ST</td>
      <td>DES MOINES</td>
      <td>50312</td>
      <td>833, 42ND ST\nDES MOINES 50312\n(41.593431, -9...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>12</td>
      <td>4669</td>
      <td>166</td>
      <td>987648</td>
      <td>375.0</td>
      <td>28.35</td>
      <td>42.53</td>
      <td>12</td>
      <td>510.36</td>
      <td>50312.0</td>
    </tr>
    <tr>
      <th>2184461</th>
      <td>S29393100001</td>
      <td>2015-12-14</td>
      <td>4604</td>
      <td>Pit Stop Liquors / Newton</td>
      <td>1324, 1st AVE E</td>
      <td>NEWTON</td>
      <td>50208</td>
      <td>1324, 1st AVE E\nNEWTON 50208\n(41.699173, -93...</td>
      <td>50.0</td>
      <td>Jasper</td>
      <td>...</td>
      <td>12</td>
      <td>4604</td>
      <td>410</td>
      <td>988804</td>
      <td>750.0</td>
      <td>45.00</td>
      <td>67.50</td>
      <td>6</td>
      <td>405.00</td>
      <td>50208.0</td>
    </tr>
    <tr>
      <th>2184462</th>
      <td>S29826100037</td>
      <td>2015-12-22</td>
      <td>4669</td>
      <td>Vom Fass / Des Moines</td>
      <td>833, 42ND ST</td>
      <td>DES MOINES</td>
      <td>50312</td>
      <td>833, 42ND ST\nDES MOINES 50312\n(41.593431, -9...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>12</td>
      <td>4669</td>
      <td>885</td>
      <td>987869</td>
      <td>50.0</td>
      <td>4.84</td>
      <td>7.26</td>
      <td>6</td>
      <td>43.56</td>
      <td>50312.0</td>
    </tr>
    <tr>
      <th>2184463</th>
      <td>S29826100036</td>
      <td>2015-12-22</td>
      <td>4669</td>
      <td>Vom Fass / Des Moines</td>
      <td>833, 42ND ST</td>
      <td>DES MOINES</td>
      <td>50312</td>
      <td>833, 42ND ST\nDES MOINES 50312\n(41.593431, -9...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>12</td>
      <td>4669</td>
      <td>885</td>
      <td>987870</td>
      <td>100.0</td>
      <td>7.00</td>
      <td>10.50</td>
      <td>6</td>
      <td>63.00</td>
      <td>50312.0</td>
    </tr>
    <tr>
      <th>2184464</th>
      <td>S29445800038</td>
      <td>2015-12-03</td>
      <td>4669</td>
      <td>Vom Fass / Des Moines</td>
      <td>833, 42ND ST</td>
      <td>DES MOINES</td>
      <td>50312</td>
      <td>833, 42ND ST\nDES MOINES 50312\n(41.593431, -9...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>12</td>
      <td>4669</td>
      <td>885</td>
      <td>987871</td>
      <td>200.0</td>
      <td>9.99</td>
      <td>14.99</td>
      <td>6</td>
      <td>89.94</td>
      <td>50312.0</td>
    </tr>
    <tr>
      <th>2184465</th>
      <td>S29445800037</td>
      <td>2015-12-03</td>
      <td>4669</td>
      <td>Vom Fass / Des Moines</td>
      <td>833, 42ND ST</td>
      <td>DES MOINES</td>
      <td>50312</td>
      <td>833, 42ND ST\nDES MOINES 50312\n(41.593431, -9...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>12</td>
      <td>4669</td>
      <td>885</td>
      <td>987872</td>
      <td>375.0</td>
      <td>14.11</td>
      <td>21.17</td>
      <td>6</td>
      <td>127.02</td>
      <td>50312.0</td>
    </tr>
    <tr>
      <th>2184466</th>
      <td>S29826100035</td>
      <td>2015-12-22</td>
      <td>4669</td>
      <td>Vom Fass / Des Moines</td>
      <td>833, 42ND ST</td>
      <td>DES MOINES</td>
      <td>50312</td>
      <td>833, 42ND ST\nDES MOINES 50312\n(41.593431, -9...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>12</td>
      <td>4669</td>
      <td>885</td>
      <td>987873</td>
      <td>750.0</td>
      <td>25.36</td>
      <td>38.04</td>
      <td>3</td>
      <td>114.12</td>
      <td>50312.0</td>
    </tr>
    <tr>
      <th>2184467</th>
      <td>S29826100029</td>
      <td>2015-12-22</td>
      <td>4669</td>
      <td>Vom Fass / Des Moines</td>
      <td>833, 42ND ST</td>
      <td>DES MOINES</td>
      <td>50312</td>
      <td>833, 42ND ST\nDES MOINES 50312\n(41.593431, -9...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>12</td>
      <td>4669</td>
      <td>885</td>
      <td>987877</td>
      <td>100.0</td>
      <td>10.28</td>
      <td>15.42</td>
      <td>6</td>
      <td>92.52</td>
      <td>50312.0</td>
    </tr>
    <tr>
      <th>2184468</th>
      <td>S29445800030</td>
      <td>2015-12-03</td>
      <td>4669</td>
      <td>Vom Fass / Des Moines</td>
      <td>833, 42ND ST</td>
      <td>DES MOINES</td>
      <td>50312</td>
      <td>833, 42ND ST\nDES MOINES 50312\n(41.593431, -9...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>12</td>
      <td>4669</td>
      <td>885</td>
      <td>987879</td>
      <td>375.0</td>
      <td>26.39</td>
      <td>39.59</td>
      <td>6</td>
      <td>237.54</td>
      <td>50312.0</td>
    </tr>
    <tr>
      <th>2184469</th>
      <td>S29952200002</td>
      <td>2015-12-30</td>
      <td>4057</td>
      <td>Tequila's Liquor Store</td>
      <td>1434 DES MOINES ST STE 5</td>
      <td>DES MOINES</td>
      <td>50316</td>
      <td>1434 DES MOINES ST STE 5\nDES MOINES 50316\n(4...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>12</td>
      <td>4057</td>
      <td>310</td>
      <td>989457</td>
      <td>1000.0</td>
      <td>17.34</td>
      <td>26.01</td>
      <td>36</td>
      <td>936.36</td>
      <td>50316.0</td>
    </tr>
    <tr>
      <th>2184470</th>
      <td>S29630400001</td>
      <td>2015-12-17</td>
      <td>2190</td>
      <td>Central City Liquor, Inc.</td>
      <td>1460 2ND AVE</td>
      <td>DES MOINES</td>
      <td>50314</td>
      <td>1460 2ND AVE\nDES MOINES 50314\n(41.60566, -93...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>12</td>
      <td>2190</td>
      <td>420</td>
      <td>994113</td>
      <td>750.0</td>
      <td>419.99</td>
      <td>629.99</td>
      <td>1</td>
      <td>629.99</td>
      <td>50314.0</td>
    </tr>
    <tr>
      <th>2184471</th>
      <td>S29627600001</td>
      <td>2015-12-16</td>
      <td>4129</td>
      <td>Cyclone Liquors</td>
      <td>626 LINCOLN WAY</td>
      <td>AMES</td>
      <td>50010</td>
      <td>626 LINCOLN WAY\nAMES 50010\n(42.022854, -93.6...</td>
      <td>85.0</td>
      <td>Story</td>
      <td>...</td>
      <td>12</td>
      <td>4129</td>
      <td>35</td>
      <td>994810</td>
      <td>750.0</td>
      <td>28.63</td>
      <td>42.95</td>
      <td>6</td>
      <td>257.70</td>
      <td>50010.0</td>
    </tr>
    <tr>
      <th>2184472</th>
      <td>S29918500001</td>
      <td>2015-12-29</td>
      <td>3952</td>
      <td>Lot-A-Spirits</td>
      <td>3780 STATE ST</td>
      <td>BETTENDORF</td>
      <td>52722</td>
      <td>3780 STATE ST\nBETTENDORF 52722\n(41.529655, -...</td>
      <td>82.0</td>
      <td>Scott</td>
      <td>...</td>
      <td>12</td>
      <td>3952</td>
      <td>260</td>
      <td>994848</td>
      <td>750.0</td>
      <td>39.99</td>
      <td>59.99</td>
      <td>2</td>
      <td>119.98</td>
      <td>52722.0</td>
    </tr>
    <tr>
      <th>2184473</th>
      <td>S29851100003</td>
      <td>2015-12-29</td>
      <td>3869</td>
      <td>Bootleggin' Barzini's Fin</td>
      <td>412  1ST AVE</td>
      <td>CORALVILLE</td>
      <td>52241</td>
      <td>412 1ST AVE\nCORALVILLE 52241\n(41.672672, -91...</td>
      <td>52.0</td>
      <td>Johnson</td>
      <td>...</td>
      <td>12</td>
      <td>3869</td>
      <td>260</td>
      <td>994848</td>
      <td>750.0</td>
      <td>39.99</td>
      <td>59.99</td>
      <td>1</td>
      <td>59.99</td>
      <td>52241.0</td>
    </tr>
    <tr>
      <th>2184474</th>
      <td>S29851000003</td>
      <td>2015-12-26</td>
      <td>3773</td>
      <td>Benz Distributing</td>
      <td>501 7TH AVE SE</td>
      <td>CEDAR RAPIDS</td>
      <td>52401</td>
      <td>501 7TH AVE SE\nCEDAR RAPIDS 52401\n(41.975739...</td>
      <td>57.0</td>
      <td>Linn</td>
      <td>...</td>
      <td>12</td>
      <td>3773</td>
      <td>260</td>
      <td>994848</td>
      <td>750.0</td>
      <td>39.99</td>
      <td>59.99</td>
      <td>6</td>
      <td>359.94</td>
      <td>52401.0</td>
    </tr>
    <tr>
      <th>2184475</th>
      <td>S29850600003</td>
      <td>2015-12-26</td>
      <td>2588</td>
      <td>Hy-Vee Food and Drug #6 / Cedar Rapi</td>
      <td>4035 MT. VERNON ROAD S.E.</td>
      <td>CEDAR RAPIDS</td>
      <td>52403</td>
      <td>4035 MT. VERNON ROAD S.E.\nCEDAR RAPIDS 52403\...</td>
      <td>57.0</td>
      <td>Linn</td>
      <td>...</td>
      <td>12</td>
      <td>2588</td>
      <td>260</td>
      <td>994848</td>
      <td>750.0</td>
      <td>39.99</td>
      <td>59.99</td>
      <td>3</td>
      <td>179.97</td>
      <td>52403.0</td>
    </tr>
    <tr>
      <th>2184476</th>
      <td>S29850700003</td>
      <td>2015-12-30</td>
      <td>2633</td>
      <td>Hy-Vee #3 / BDI / Des Moines</td>
      <td>3221 SE 14TH ST</td>
      <td>DES MOINES</td>
      <td>50320</td>
      <td>3221 SE 14TH ST\nDES MOINES 50320\n(41.554101,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>12</td>
      <td>2633</td>
      <td>260</td>
      <td>994848</td>
      <td>750.0</td>
      <td>39.99</td>
      <td>59.99</td>
      <td>2</td>
      <td>119.98</td>
      <td>50320.0</td>
    </tr>
    <tr>
      <th>2184477</th>
      <td>S29851300003</td>
      <td>2015-12-29</td>
      <td>5105</td>
      <td>Johncy's Liquor Store</td>
      <td>585, HIGHWAY 965</td>
      <td>NORTH LIBERTY</td>
      <td>52317</td>
      <td>585, HIGHWAY 965\nNORTH LIBERTY 52317\n(41.737...</td>
      <td>52.0</td>
      <td>Johnson</td>
      <td>...</td>
      <td>12</td>
      <td>5105</td>
      <td>260</td>
      <td>994848</td>
      <td>750.0</td>
      <td>39.99</td>
      <td>59.99</td>
      <td>6</td>
      <td>359.94</td>
      <td>52317.0</td>
    </tr>
    <tr>
      <th>2184478</th>
      <td>S29852200001</td>
      <td>2015-12-30</td>
      <td>4969</td>
      <td>Lake Liquors Wine and Spirits</td>
      <td>910 N 8TH ST W</td>
      <td>CLEAR LAKE</td>
      <td>50428</td>
      <td>910 N 8TH ST W\nCLEAR LAKE 50428\n(43.142775, ...</td>
      <td>17.0</td>
      <td>Cerro Gordo</td>
      <td>...</td>
      <td>12</td>
      <td>4969</td>
      <td>260</td>
      <td>994848</td>
      <td>750.0</td>
      <td>39.99</td>
      <td>59.99</td>
      <td>2</td>
      <td>119.98</td>
      <td>50428.0</td>
    </tr>
    <tr>
      <th>2184479</th>
      <td>S29852400002</td>
      <td>2015-12-26</td>
      <td>2584</td>
      <td>Hy-Vee Food Store / Fort Madison</td>
      <td>2606 AVENUE L</td>
      <td>FORT MADISON</td>
      <td>52627</td>
      <td>2606 AVENUE L\nFORT MADISON 52627\n(40.626988,...</td>
      <td>56.0</td>
      <td>Lee</td>
      <td>...</td>
      <td>12</td>
      <td>2584</td>
      <td>260</td>
      <td>994848</td>
      <td>750.0</td>
      <td>39.99</td>
      <td>59.99</td>
      <td>2</td>
      <td>119.98</td>
      <td>52627.0</td>
    </tr>
    <tr>
      <th>2184480</th>
      <td>S29851800002</td>
      <td>2015-12-30</td>
      <td>2663</td>
      <td>Hy-Vee / Urbandale</td>
      <td>8701 DOUGLAS</td>
      <td>URBANDALE</td>
      <td>50322</td>
      <td>8701 DOUGLAS\nURBANDALE 50322\n(41.629365, -93...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>12</td>
      <td>2663</td>
      <td>260</td>
      <td>994848</td>
      <td>750.0</td>
      <td>39.99</td>
      <td>59.99</td>
      <td>6</td>
      <td>359.94</td>
      <td>50322.0</td>
    </tr>
    <tr>
      <th>2184481</th>
      <td>S29852100002</td>
      <td>2015-12-30</td>
      <td>4988</td>
      <td>Happy's Wine &amp; Spirits</td>
      <td>5925 UNIVERSITY AVE</td>
      <td>CEDAR FALLS</td>
      <td>50613</td>
      <td>5925 UNIVERSITY AVE\nCEDAR FALLS 50613\n(42.51...</td>
      <td>7.0</td>
      <td>Black Hawk</td>
      <td>...</td>
      <td>12</td>
      <td>4988</td>
      <td>260</td>
      <td>994848</td>
      <td>750.0</td>
      <td>39.99</td>
      <td>59.99</td>
      <td>6</td>
      <td>359.94</td>
      <td>50613.0</td>
    </tr>
    <tr>
      <th>2184482</th>
      <td>S29851900002</td>
      <td>2015-12-26</td>
      <td>2670</td>
      <td>Hy-Vee Food Store / Coralville</td>
      <td>2004 8TH  ST</td>
      <td>CORALVILLE</td>
      <td>52241</td>
      <td>2004 8TH ST\nCORALVILLE 52241\n(41.682337, -91...</td>
      <td>52.0</td>
      <td>Johnson</td>
      <td>...</td>
      <td>12</td>
      <td>2670</td>
      <td>260</td>
      <td>994848</td>
      <td>750.0</td>
      <td>39.99</td>
      <td>59.99</td>
      <td>6</td>
      <td>359.94</td>
      <td>52241.0</td>
    </tr>
    <tr>
      <th>2184483</th>
      <td>S29851700002</td>
      <td>2015-12-26</td>
      <td>2590</td>
      <td>Hy-Vee Food Store #5 / Cedar Rapids</td>
      <td>3235 OAKLAND ROAD NE</td>
      <td>CEDAR RAPIDS</td>
      <td>52402</td>
      <td>3235 OAKLAND ROAD NE\nCEDAR RAPIDS 52402\n(42....</td>
      <td>57.0</td>
      <td>Linn</td>
      <td>...</td>
      <td>12</td>
      <td>2590</td>
      <td>260</td>
      <td>994848</td>
      <td>750.0</td>
      <td>39.99</td>
      <td>59.99</td>
      <td>6</td>
      <td>359.94</td>
      <td>52402.0</td>
    </tr>
  </tbody>
</table>
<p>2180184 rows × 35 columns</p>
</div>




```python
df_2015.groupby('Month').sum().sort_values('Sale', ascending=False)
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
      <th>Store Number</th>
      <th>County Number</th>
      <th>Category</th>
      <th>Vendor Number</th>
      <th>Item Number</th>
      <th>Pack</th>
      <th>Bottle Volume (ml)</th>
      <th>Bottles Sold</th>
      <th>Volume Sold (Liters)</th>
      <th>Volume Sold (Gallons)</th>
      <th>Year</th>
      <th>Store_Number</th>
      <th>Vendor_Number</th>
      <th>Item_Number</th>
      <th>Bottle_Volume</th>
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
      <th>Zip_Code</th>
    </tr>
    <tr>
      <th>Month</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>12</th>
      <td>826848560</td>
      <td>13183023.0</td>
      <td>2.418978e+11</td>
      <td>59235464</td>
      <td>10484620269</td>
      <td>2798871</td>
      <td>209916579</td>
      <td>2252618</td>
      <td>1974776.38</td>
      <td>521741.210001</td>
      <td>464092785</td>
      <td>826848560</td>
      <td>59235464</td>
      <td>10484620269</td>
      <td>209916579.0</td>
      <td>2.357671e+06</td>
      <td>3.541754e+06</td>
      <td>2252618</td>
      <td>3.060091e+07</td>
      <td>1.180034e+10</td>
    </tr>
    <tr>
      <th>6</th>
      <td>732442041</td>
      <td>11694460.0</td>
      <td>2.134913e+11</td>
      <td>52353445</td>
      <td>9478512506</td>
      <td>2507117</td>
      <td>191026475</td>
      <td>2055507</td>
      <td>1881166.71</td>
      <td>496989.130001</td>
      <td>412819095</td>
      <td>732442041</td>
      <td>52353445</td>
      <td>9478512506</td>
      <td>191026475.0</td>
      <td>2.000531e+06</td>
      <td>3.006027e+06</td>
      <td>2055507</td>
      <td>2.704752e+07</td>
      <td>1.050601e+10</td>
    </tr>
    <tr>
      <th>10</th>
      <td>627776166</td>
      <td>9944236.0</td>
      <td>1.828737e+11</td>
      <td>44386120</td>
      <td>8007495183</td>
      <td>2150205</td>
      <td>160343025</td>
      <td>1920409</td>
      <td>1769625.26</td>
      <td>467528.510001</td>
      <td>350245285</td>
      <td>627776166</td>
      <td>44386120</td>
      <td>8007495183</td>
      <td>160343025.0</td>
      <td>1.740732e+06</td>
      <td>2.616199e+06</td>
      <td>1920409</td>
      <td>2.584127e+07</td>
      <td>8.907209e+09</td>
    </tr>
    <tr>
      <th>9</th>
      <td>681760349</td>
      <td>10889880.0</td>
      <td>1.973626e+11</td>
      <td>48572943</td>
      <td>8736030434</td>
      <td>2332135</td>
      <td>175553342</td>
      <td>1838232</td>
      <td>1677914.70</td>
      <td>443298.100001</td>
      <td>381393155</td>
      <td>681760349</td>
      <td>48572943</td>
      <td>8736030434</td>
      <td>175553342.0</td>
      <td>1.843857e+06</td>
      <td>2.766617e+06</td>
      <td>1838232</td>
      <td>2.408023e+07</td>
      <td>9.701252e+09</td>
    </tr>
    <tr>
      <th>11</th>
      <td>630659979</td>
      <td>10113331.0</td>
      <td>1.842270e+11</td>
      <td>45166851</td>
      <td>8129438739</td>
      <td>2158335</td>
      <td>161102811</td>
      <td>1769176</td>
      <td>1572508.70</td>
      <td>415455.440000</td>
      <td>354063710</td>
      <td>630659979</td>
      <td>45166851</td>
      <td>8129438739</td>
      <td>161102811.0</td>
      <td>1.752615e+06</td>
      <td>2.630228e+06</td>
      <td>1769176</td>
      <td>2.360886e+07</td>
      <td>9.012033e+09</td>
    </tr>
    <tr>
      <th>3</th>
      <td>634666044</td>
      <td>10238065.0</td>
      <td>1.863391e+11</td>
      <td>45835748</td>
      <td>8094228501</td>
      <td>2197764</td>
      <td>165222525</td>
      <td>1750252</td>
      <td>1577854.59</td>
      <td>416860.100001</td>
      <td>360441185</td>
      <td>634666044</td>
      <td>45835748</td>
      <td>8094228501</td>
      <td>165222525.0</td>
      <td>1.733993e+06</td>
      <td>2.604325e+06</td>
      <td>1750252</td>
      <td>2.322945e+07</td>
      <td>9.173228e+09</td>
    </tr>
    <tr>
      <th>4</th>
      <td>643148795</td>
      <td>10398804.0</td>
      <td>1.879366e+11</td>
      <td>45892972</td>
      <td>8321734666</td>
      <td>2215060</td>
      <td>167269325</td>
      <td>1760836</td>
      <td>1596418.95</td>
      <td>421763.090001</td>
      <td>363687350</td>
      <td>643148795</td>
      <td>45892972</td>
      <td>8321734666</td>
      <td>167269325.0</td>
      <td>1.750363e+06</td>
      <td>2.628124e+06</td>
      <td>1760836</td>
      <td>2.283082e+07</td>
      <td>9.251042e+09</td>
    </tr>
    <tr>
      <th>5</th>
      <td>604337759</td>
      <td>9637826.0</td>
      <td>1.762641e+11</td>
      <td>43141607</td>
      <td>7731041005</td>
      <td>2060030</td>
      <td>158299300</td>
      <td>1682216</td>
      <td>1600964.43</td>
      <td>422961.110000</td>
      <td>341191890</td>
      <td>604337759</td>
      <td>43141607</td>
      <td>7731041005</td>
      <td>158299300.0</td>
      <td>1.662807e+06</td>
      <td>2.497708e+06</td>
      <td>1682216</td>
      <td>2.240761e+07</td>
      <td>8.680486e+09</td>
    </tr>
    <tr>
      <th>7</th>
      <td>655869921</td>
      <td>10293358.0</td>
      <td>1.899023e+11</td>
      <td>46706527</td>
      <td>8396725107</td>
      <td>2240740</td>
      <td>169286843</td>
      <td>1727707</td>
      <td>1569249.82</td>
      <td>414584.310001</td>
      <td>367084640</td>
      <td>655869921</td>
      <td>46706527</td>
      <td>8396725107</td>
      <td>169286843.0</td>
      <td>1.758291e+06</td>
      <td>2.640382e+06</td>
      <td>1727707</td>
      <td>2.237451e+07</td>
      <td>9.335428e+09</td>
    </tr>
    <tr>
      <th>8</th>
      <td>639818283</td>
      <td>10171074.0</td>
      <td>1.859565e+11</td>
      <td>45593987</td>
      <td>8104075697</td>
      <td>2206145</td>
      <td>165719849</td>
      <td>1738239</td>
      <td>1556128.65</td>
      <td>411118.550000</td>
      <td>359520330</td>
      <td>639818283</td>
      <td>45593987</td>
      <td>8104075697</td>
      <td>165719849.0</td>
      <td>1.720948e+06</td>
      <td>2.584103e+06</td>
      <td>1738239</td>
      <td>2.208402e+07</td>
      <td>9.151256e+09</td>
    </tr>
    <tr>
      <th>2</th>
      <td>561166566</td>
      <td>9080229.0</td>
      <td>1.650099e+11</td>
      <td>40400424</td>
      <td>7276759497</td>
      <td>1939793</td>
      <td>146074753</td>
      <td>1590455</td>
      <td>1492496.60</td>
      <td>394308.670000</td>
      <td>319135700</td>
      <td>561166566</td>
      <td>40400424</td>
      <td>7276759497</td>
      <td>146074753.0</td>
      <td>1.547193e+06</td>
      <td>2.324195e+06</td>
      <td>1590455</td>
      <td>2.119865e+07</td>
      <td>8.120243e+09</td>
    </tr>
    <tr>
      <th>1</th>
      <td>561627427</td>
      <td>9076743.0</td>
      <td>1.653728e+11</td>
      <td>40852537</td>
      <td>7350549460</td>
      <td>1952425</td>
      <td>146207600</td>
      <td>1457984</td>
      <td>1319720.96</td>
      <td>348662.190000</td>
      <td>319395635</td>
      <td>561627427</td>
      <td>40852537</td>
      <td>7350549460</td>
      <td>146207600.0</td>
      <td>1.512978e+06</td>
      <td>2.271825e+06</td>
      <td>1457984</td>
      <td>1.847266e+07</td>
      <td>8.126456e+09</td>
    </tr>
  </tbody>
</table>
</div>




```python
df_2015_year = df_2015[['State_Bottle_Cost', 'State_Bottle_Retail',
                         'Bottle_Volume', 'Store_Number', 'Bottles_Sold','Sale']] 
```


```python
df_2015_group = df_2015_year.groupby('Store_Number').sum()
```


```python
df_2015_f3m = df_2015[df_2015['Month']<4]
```


```python
df_2015_f3m_clean = df_2015_f3m[[ 'Store_Number', 'Sale']] 
```


```python
df_2015_f3m_group = df_2015_f3m_clean.groupby('Store_Number').sum() 
```


```python
df_2015_f3m_group.rename(columns={'Sale': 'Sale_f3m'}, inplace=True)
```


```python
# df_2015_f3m_group['Store_Number'] = df_2015_f3m_group['Store_Number'].astype(int)
```


```python
df_2015_f3m_group.head()
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
      <th>Sale_f3m</th>
    </tr>
    <tr>
      <th>Store_Number</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2106</th>
      <td>337166.53</td>
    </tr>
    <tr>
      <th>2113</th>
      <td>22351.86</td>
    </tr>
    <tr>
      <th>2130</th>
      <td>277764.46</td>
    </tr>
    <tr>
      <th>2152</th>
      <td>16805.11</td>
    </tr>
    <tr>
      <th>2178</th>
      <td>54411.42</td>
    </tr>
  </tbody>
</table>
</div>




```python
df_2015_group.join(df_2015_f3m_group).head()
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
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottle_Volume</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
      <th>Sale_f3m</th>
    </tr>
    <tr>
      <th>Store_Number</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2106</th>
      <td>55019.19</td>
      <td>82582.34</td>
      <td>4639675.0</td>
      <td>99957</td>
      <td>1433451.46</td>
      <td>337166.53</td>
    </tr>
    <tr>
      <th>2113</th>
      <td>14469.12</td>
      <td>21725.74</td>
      <td>1313875.0</td>
      <td>6483</td>
      <td>85763.42</td>
      <td>22351.86</td>
    </tr>
    <tr>
      <th>2130</th>
      <td>40541.36</td>
      <td>60849.63</td>
      <td>3645525.0</td>
      <td>72544</td>
      <td>1107685.25</td>
      <td>277764.46</td>
    </tr>
    <tr>
      <th>2152</th>
      <td>12311.88</td>
      <td>18507.48</td>
      <td>1513250.0</td>
      <td>5928</td>
      <td>72080.36</td>
      <td>16805.11</td>
    </tr>
    <tr>
      <th>2178</th>
      <td>26665.46</td>
      <td>40070.07</td>
      <td>2739775.0</td>
      <td>20504</td>
      <td>277987.96</td>
      <td>54411.42</td>
    </tr>
  </tbody>
</table>
</div>




```python
#run only once 
#df_2015_group = df_2015_group.join(df_2015_f3m_group)
```


```python
df_2015_group.dropna()
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
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottle_Volume</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
      <th>Sale_f3m</th>
    </tr>
    <tr>
      <th>Store_Number</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2106</th>
      <td>55019.19</td>
      <td>82582.34</td>
      <td>4639675.0</td>
      <td>99957</td>
      <td>1433451.46</td>
      <td>337166.53</td>
    </tr>
    <tr>
      <th>2113</th>
      <td>14469.12</td>
      <td>21725.74</td>
      <td>1313875.0</td>
      <td>6483</td>
      <td>85763.42</td>
      <td>22351.86</td>
    </tr>
    <tr>
      <th>2130</th>
      <td>40541.36</td>
      <td>60849.63</td>
      <td>3645525.0</td>
      <td>72544</td>
      <td>1107685.25</td>
      <td>277764.46</td>
    </tr>
    <tr>
      <th>2152</th>
      <td>12311.88</td>
      <td>18507.48</td>
      <td>1513250.0</td>
      <td>5928</td>
      <td>72080.36</td>
      <td>16805.11</td>
    </tr>
    <tr>
      <th>2178</th>
      <td>26665.46</td>
      <td>40070.07</td>
      <td>2739775.0</td>
      <td>20504</td>
      <td>277987.96</td>
      <td>54411.42</td>
    </tr>
    <tr>
      <th>2190</th>
      <td>152643.66</td>
      <td>229161.33</td>
      <td>10382625.0</td>
      <td>107479</td>
      <td>1226205.17</td>
      <td>255392.25</td>
    </tr>
    <tr>
      <th>2191</th>
      <td>63279.89</td>
      <td>94971.07</td>
      <td>5419875.0</td>
      <td>79006</td>
      <td>1275405.26</td>
      <td>318985.32</td>
    </tr>
    <tr>
      <th>2200</th>
      <td>45107.16</td>
      <td>67728.01</td>
      <td>4384000.0</td>
      <td>15409</td>
      <td>223899.24</td>
      <td>45340.33</td>
    </tr>
    <tr>
      <th>2205</th>
      <td>29443.78</td>
      <td>44214.11</td>
      <td>2540650.0</td>
      <td>17863</td>
      <td>230898.31</td>
      <td>57849.23</td>
    </tr>
    <tr>
      <th>2228</th>
      <td>28134.17</td>
      <td>42250.12</td>
      <td>2693025.0</td>
      <td>14932</td>
      <td>188879.70</td>
      <td>51031.04</td>
    </tr>
    <tr>
      <th>2233</th>
      <td>30886.50</td>
      <td>46379.74</td>
      <td>2682850.0</td>
      <td>22166</td>
      <td>316855.05</td>
      <td>68657.91</td>
    </tr>
    <tr>
      <th>2238</th>
      <td>6439.28</td>
      <td>9661.22</td>
      <td>460625.0</td>
      <td>6631</td>
      <td>105057.79</td>
      <td>4151.93</td>
    </tr>
    <tr>
      <th>2248</th>
      <td>66289.16</td>
      <td>99517.87</td>
      <td>3972184.0</td>
      <td>35557</td>
      <td>659252.26</td>
      <td>121837.56</td>
    </tr>
    <tr>
      <th>2285</th>
      <td>43045.96</td>
      <td>64633.23</td>
      <td>2661875.0</td>
      <td>44267</td>
      <td>776397.91</td>
      <td>146513.09</td>
    </tr>
    <tr>
      <th>2290</th>
      <td>86172.50</td>
      <td>129369.91</td>
      <td>7678528.0</td>
      <td>39455</td>
      <td>549295.90</td>
      <td>118934.06</td>
    </tr>
    <tr>
      <th>2327</th>
      <td>18103.82</td>
      <td>27171.39</td>
      <td>1757403.0</td>
      <td>8446</td>
      <td>100596.80</td>
      <td>20335.03</td>
    </tr>
    <tr>
      <th>2353</th>
      <td>36043.85</td>
      <td>54155.74</td>
      <td>3665628.0</td>
      <td>33615</td>
      <td>485145.13</td>
      <td>110482.20</td>
    </tr>
    <tr>
      <th>2367</th>
      <td>5171.83</td>
      <td>7762.79</td>
      <td>513225.0</td>
      <td>5594</td>
      <td>65149.11</td>
      <td>39434.77</td>
    </tr>
    <tr>
      <th>2413</th>
      <td>48180.28</td>
      <td>72338.39</td>
      <td>4516900.0</td>
      <td>55573</td>
      <td>835742.87</td>
      <td>204237.78</td>
    </tr>
    <tr>
      <th>2445</th>
      <td>15806.63</td>
      <td>23735.01</td>
      <td>1718125.0</td>
      <td>6329</td>
      <td>71682.86</td>
      <td>16939.15</td>
    </tr>
    <tr>
      <th>2448</th>
      <td>43175.85</td>
      <td>64818.70</td>
      <td>3981625.0</td>
      <td>13836</td>
      <td>203038.62</td>
      <td>55498.12</td>
    </tr>
    <tr>
      <th>2459</th>
      <td>9176.42</td>
      <td>13792.65</td>
      <td>1080400.0</td>
      <td>6379</td>
      <td>79026.65</td>
      <td>15983.98</td>
    </tr>
    <tr>
      <th>2460</th>
      <td>32564.14</td>
      <td>48902.56</td>
      <td>3264200.0</td>
      <td>22961</td>
      <td>301694.40</td>
      <td>71758.66</td>
    </tr>
    <tr>
      <th>2465</th>
      <td>45964.55</td>
      <td>69004.52</td>
      <td>3627725.0</td>
      <td>18293</td>
      <td>264728.41</td>
      <td>62988.17</td>
    </tr>
    <tr>
      <th>2475</th>
      <td>8864.98</td>
      <td>13317.48</td>
      <td>1040000.0</td>
      <td>7801</td>
      <td>121763.29</td>
      <td>29637.75</td>
    </tr>
    <tr>
      <th>2478</th>
      <td>12134.70</td>
      <td>18204.01</td>
      <td>819250.0</td>
      <td>11196</td>
      <td>198550.40</td>
      <td>48759.71</td>
    </tr>
    <tr>
      <th>2487</th>
      <td>38762.32</td>
      <td>58237.32</td>
      <td>4001075.0</td>
      <td>23145</td>
      <td>293643.02</td>
      <td>89736.70</td>
    </tr>
    <tr>
      <th>2498</th>
      <td>4540.91</td>
      <td>6826.84</td>
      <td>576600.0</td>
      <td>2840</td>
      <td>27453.07</td>
      <td>5577.61</td>
    </tr>
    <tr>
      <th>2500</th>
      <td>125788.26</td>
      <td>188916.82</td>
      <td>10949203.0</td>
      <td>98526</td>
      <td>1354990.08</td>
      <td>310035.66</td>
    </tr>
    <tr>
      <th>2501</th>
      <td>132264.89</td>
      <td>198707.39</td>
      <td>11455684.0</td>
      <td>102095</td>
      <td>1377465.13</td>
      <td>310718.21</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>5091</th>
      <td>3692.24</td>
      <td>5542.27</td>
      <td>341575.0</td>
      <td>3316</td>
      <td>30876.44</td>
      <td>11046.56</td>
    </tr>
    <tr>
      <th>5092</th>
      <td>5855.63</td>
      <td>8788.20</td>
      <td>523825.0</td>
      <td>4517</td>
      <td>51100.71</td>
      <td>15648.81</td>
    </tr>
    <tr>
      <th>5093</th>
      <td>18773.32</td>
      <td>28186.48</td>
      <td>1622475.0</td>
      <td>9178</td>
      <td>99586.06</td>
      <td>29251.18</td>
    </tr>
    <tr>
      <th>5094</th>
      <td>1288.43</td>
      <td>1933.73</td>
      <td>118200.0</td>
      <td>1983</td>
      <td>14327.23</td>
      <td>6285.49</td>
    </tr>
    <tr>
      <th>5096</th>
      <td>6639.17</td>
      <td>9973.23</td>
      <td>617375.0</td>
      <td>4352</td>
      <td>71490.84</td>
      <td>17333.76</td>
    </tr>
    <tr>
      <th>5097</th>
      <td>6062.03</td>
      <td>9109.57</td>
      <td>731125.0</td>
      <td>9078</td>
      <td>123882.25</td>
      <td>39686.13</td>
    </tr>
    <tr>
      <th>5098</th>
      <td>6604.64</td>
      <td>9910.40</td>
      <td>508000.0</td>
      <td>19184</td>
      <td>100442.05</td>
      <td>18166.40</td>
    </tr>
    <tr>
      <th>5099</th>
      <td>2121.79</td>
      <td>3186.79</td>
      <td>207525.0</td>
      <td>1918</td>
      <td>20721.55</td>
      <td>7615.84</td>
    </tr>
    <tr>
      <th>5100</th>
      <td>5268.11</td>
      <td>7903.85</td>
      <td>399950.0</td>
      <td>19701</td>
      <td>109536.24</td>
      <td>20298.09</td>
    </tr>
    <tr>
      <th>5101</th>
      <td>7754.30</td>
      <td>11642.38</td>
      <td>776125.0</td>
      <td>11584</td>
      <td>88825.14</td>
      <td>16363.86</td>
    </tr>
    <tr>
      <th>5102</th>
      <td>81591.24</td>
      <td>122460.94</td>
      <td>6667450.0</td>
      <td>138300</td>
      <td>1951393.22</td>
      <td>321727.56</td>
    </tr>
    <tr>
      <th>5103</th>
      <td>2758.78</td>
      <td>4140.06</td>
      <td>224200.0</td>
      <td>1083</td>
      <td>12924.97</td>
      <td>1340.65</td>
    </tr>
    <tr>
      <th>5104</th>
      <td>29202.00</td>
      <td>43853.51</td>
      <td>2360050.0</td>
      <td>6103</td>
      <td>100995.41</td>
      <td>18426.13</td>
    </tr>
    <tr>
      <th>5105</th>
      <td>46166.84</td>
      <td>69315.05</td>
      <td>3847600.0</td>
      <td>32424</td>
      <td>482906.49</td>
      <td>35800.91</td>
    </tr>
    <tr>
      <th>5106</th>
      <td>12303.06</td>
      <td>18502.70</td>
      <td>1537700.0</td>
      <td>18940</td>
      <td>241120.84</td>
      <td>22723.38</td>
    </tr>
    <tr>
      <th>5108</th>
      <td>7455.56</td>
      <td>11190.33</td>
      <td>743050.0</td>
      <td>8273</td>
      <td>60238.69</td>
      <td>9829.29</td>
    </tr>
    <tr>
      <th>5112</th>
      <td>2747.80</td>
      <td>4123.79</td>
      <td>232375.0</td>
      <td>2379</td>
      <td>38465.05</td>
      <td>7667.62</td>
    </tr>
    <tr>
      <th>5113</th>
      <td>7853.22</td>
      <td>11782.74</td>
      <td>591900.0</td>
      <td>18747</td>
      <td>108094.57</td>
      <td>9977.58</td>
    </tr>
    <tr>
      <th>5114</th>
      <td>957.92</td>
      <td>1438.22</td>
      <td>93325.0</td>
      <td>954</td>
      <td>9555.45</td>
      <td>3556.53</td>
    </tr>
    <tr>
      <th>5115</th>
      <td>1997.59</td>
      <td>3000.22</td>
      <td>207700.0</td>
      <td>2763</td>
      <td>24917.04</td>
      <td>5989.43</td>
    </tr>
    <tr>
      <th>5116</th>
      <td>15883.52</td>
      <td>23832.07</td>
      <td>1411400.0</td>
      <td>14641</td>
      <td>128662.55</td>
      <td>16258.69</td>
    </tr>
    <tr>
      <th>5119</th>
      <td>2944.82</td>
      <td>4425.02</td>
      <td>319200.0</td>
      <td>1572</td>
      <td>23645.56</td>
      <td>1444.80</td>
    </tr>
    <tr>
      <th>5123</th>
      <td>14100.52</td>
      <td>21202.80</td>
      <td>1554800.0</td>
      <td>13046</td>
      <td>187448.46</td>
      <td>997.50</td>
    </tr>
    <tr>
      <th>5128</th>
      <td>17345.32</td>
      <td>26063.72</td>
      <td>2064725.0</td>
      <td>18059</td>
      <td>191781.25</td>
      <td>3855.58</td>
    </tr>
    <tr>
      <th>9001</th>
      <td>4662.93</td>
      <td>6994.95</td>
      <td>187500.0</td>
      <td>7186</td>
      <td>191820.12</td>
      <td>42762.24</td>
    </tr>
    <tr>
      <th>9002</th>
      <td>5705.65</td>
      <td>8560.25</td>
      <td>256875.0</td>
      <td>17837</td>
      <td>327676.62</td>
      <td>44636.28</td>
    </tr>
    <tr>
      <th>9010</th>
      <td>960.52</td>
      <td>1441.05</td>
      <td>56850.0</td>
      <td>1510</td>
      <td>26209.38</td>
      <td>11707.62</td>
    </tr>
    <tr>
      <th>9013</th>
      <td>487.98</td>
      <td>732.16</td>
      <td>40750.0</td>
      <td>3081</td>
      <td>30957.66</td>
      <td>825.60</td>
    </tr>
    <tr>
      <th>9022</th>
      <td>12.67</td>
      <td>19.01</td>
      <td>750.0</td>
      <td>210</td>
      <td>3992.10</td>
      <td>3992.10</td>
    </tr>
    <tr>
      <th>9023</th>
      <td>123.13</td>
      <td>184.73</td>
      <td>5250.0</td>
      <td>324</td>
      <td>8550.36</td>
      <td>5383.56</td>
    </tr>
  </tbody>
</table>
<p>1281 rows × 6 columns</p>
</div>




```python
df_2015_group.describe()
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
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottle_Volume</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
      <th>Sale_f3m</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>1374.000000</td>
      <td>1374.000000</td>
      <td>1.374000e+03</td>
      <td>1374.000000</td>
      <td>1.374000e+03</td>
      <td>1.281000e+03</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>15561.848421</td>
      <td>23370.806223</td>
      <td>1.467265e+06</td>
      <td>15679.498544</td>
      <td>2.065331e+05</td>
      <td>4.910286e+04</td>
    </tr>
    <tr>
      <th>std</th>
      <td>24267.788336</td>
      <td>36441.059401</td>
      <td>2.066206e+06</td>
      <td>31490.477656</td>
      <td>5.020404e+05</td>
      <td>1.206400e+05</td>
    </tr>
    <tr>
      <th>min</th>
      <td>12.670000</td>
      <td>19.010000</td>
      <td>7.500000e+02</td>
      <td>103.000000</td>
      <td>6.799800e+02</td>
      <td>4.138500e+02</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>2601.590000</td>
      <td>3909.985000</td>
      <td>2.597750e+05</td>
      <td>3046.000000</td>
      <td>3.083463e+04</td>
      <td>8.335470e+03</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>6995.670000</td>
      <td>10504.170000</td>
      <td>7.141500e+05</td>
      <td>6576.000000</td>
      <td>7.122926e+04</td>
      <td>1.805408e+04</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>16087.250000</td>
      <td>24167.035000</td>
      <td>1.619512e+06</td>
      <td>15909.250000</td>
      <td>1.917841e+05</td>
      <td>4.671076e+04</td>
    </tr>
    <tr>
      <th>max</th>
      <td>236754.110000</td>
      <td>355414.460000</td>
      <td>1.784085e+07</td>
      <td>593628.000000</td>
      <td>9.790022e+06</td>
      <td>2.328836e+06</td>
    </tr>
  </tbody>
</table>
</div>




```python
df_2016 = df[df['Year']==2016]
df_2016.dropna(inplace=True)
```

    /anaconda3/lib/python3.6/site-packages/ipykernel_launcher.py:2: SettingWithCopyWarning: 
    A value is trying to be set on a copy of a slice from a DataFrame
    
    See the caveats in the documentation: http://pandas.pydata.org/pandas-docs/stable/indexing.html#indexing-view-versus-copy
      



```python
df_2016
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
      <th>Invoice/Item Number</th>
      <th>Date</th>
      <th>Store Number</th>
      <th>Store Name</th>
      <th>Address</th>
      <th>City</th>
      <th>Zip Code</th>
      <th>Store Location</th>
      <th>County Number</th>
      <th>County</th>
      <th>...</th>
      <th>Month</th>
      <th>Store_Number</th>
      <th>Vendor_Number</th>
      <th>Item_Number</th>
      <th>Bottle_Volume</th>
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
      <th>Zip_Code</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2184243</th>
      <td>S30383800018</td>
      <td>2016-01-26</td>
      <td>3621</td>
      <td>Jensen Liquors, Ltd.</td>
      <td>615  2ND AVE</td>
      <td>SHELDON</td>
      <td>51201</td>
      <td>615 2ND AVE\nSHELDON 51201\n(43.18463, -95.854...</td>
      <td>71.0</td>
      <td>O'Brien</td>
      <td>...</td>
      <td>1</td>
      <td>3621</td>
      <td>497</td>
      <td>1224</td>
      <td>750.0</td>
      <td>21.50</td>
      <td>32.25</td>
      <td>1</td>
      <td>32.25</td>
      <td>51201.0</td>
    </tr>
    <tr>
      <th>2184484</th>
      <td>S30165000183</td>
      <td>2016-01-12</td>
      <td>2552</td>
      <td>Hy-Vee Food Store #3 / Cedar Rapids</td>
      <td>20 WILSON AVENUE WEST</td>
      <td>CEDAR RAPIDS</td>
      <td>52404</td>
      <td>20 WILSON AVENUE WEST\nCEDAR RAPIDS 52404\n(41...</td>
      <td>57.0</td>
      <td>Linn</td>
      <td>...</td>
      <td>1</td>
      <td>2552</td>
      <td>65</td>
      <td>173</td>
      <td>750.0</td>
      <td>19.58</td>
      <td>29.37</td>
      <td>2</td>
      <td>58.74</td>
      <td>52404.0</td>
    </tr>
    <tr>
      <th>2184485</th>
      <td>S30172700001</td>
      <td>2016-01-13</td>
      <td>2513</td>
      <td>Hy-Vee Food Store #2 / Iowa City</td>
      <td>812  S 1ST AVE</td>
      <td>IOWA CITY</td>
      <td>52240</td>
      <td>812 S 1ST AVE\nIOWA CITY 52240\n</td>
      <td>52.0</td>
      <td>Johnson</td>
      <td>...</td>
      <td>1</td>
      <td>2513</td>
      <td>65</td>
      <td>173</td>
      <td>750.0</td>
      <td>19.58</td>
      <td>29.37</td>
      <td>12</td>
      <td>352.44</td>
      <td>52240.0</td>
    </tr>
    <tr>
      <th>2184486</th>
      <td>S30188900079</td>
      <td>2016-01-13</td>
      <td>3869</td>
      <td>Bootleggin' Barzini's Fin</td>
      <td>412  1ST AVE</td>
      <td>CORALVILLE</td>
      <td>52241</td>
      <td>412 1ST AVE\nCORALVILLE 52241\n(41.672672, -91...</td>
      <td>52.0</td>
      <td>Johnson</td>
      <td>...</td>
      <td>1</td>
      <td>3869</td>
      <td>65</td>
      <td>173</td>
      <td>750.0</td>
      <td>19.58</td>
      <td>29.37</td>
      <td>3</td>
      <td>88.11</td>
      <td>52241.0</td>
    </tr>
    <tr>
      <th>2184487</th>
      <td>S30193900075</td>
      <td>2016-01-14</td>
      <td>2106</td>
      <td>Hillstreet News and Tobacco</td>
      <td>2217 COLLEGE</td>
      <td>CEDAR FALLS</td>
      <td>50613</td>
      <td>2217 COLLEGE\nCEDAR FALLS 50613\n(42.517607, -...</td>
      <td>7.0</td>
      <td>Black Hawk</td>
      <td>...</td>
      <td>1</td>
      <td>2106</td>
      <td>65</td>
      <td>173</td>
      <td>750.0</td>
      <td>19.58</td>
      <td>29.37</td>
      <td>1</td>
      <td>29.37</td>
      <td>50613.0</td>
    </tr>
    <tr>
      <th>2184488</th>
      <td>S30441600009</td>
      <td>2016-01-28</td>
      <td>2248</td>
      <td>Ingersoll Liquor and Beverage</td>
      <td>3500 INGERSOLL AVE</td>
      <td>DES MOINES</td>
      <td>50312</td>
      <td>3500 INGERSOLL AVE\nDES MOINES 50312\n(41.5863...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>1</td>
      <td>2248</td>
      <td>65</td>
      <td>173</td>
      <td>750.0</td>
      <td>19.58</td>
      <td>29.37</td>
      <td>36</td>
      <td>1057.32</td>
      <td>50312.0</td>
    </tr>
    <tr>
      <th>2184489</th>
      <td>S30032900145</td>
      <td>2016-01-05</td>
      <td>2651</td>
      <td>Hy-Vee / Waverly</td>
      <td>1311 4 STREET SW</td>
      <td>WAVERLY</td>
      <td>50677</td>
      <td>1311 4 STREET SW\nWAVERLY 50677\n(42.713533, -...</td>
      <td>9.0</td>
      <td>Bremer</td>
      <td>...</td>
      <td>1</td>
      <td>2651</td>
      <td>65</td>
      <td>173</td>
      <td>750.0</td>
      <td>19.58</td>
      <td>29.37</td>
      <td>1</td>
      <td>29.37</td>
      <td>50677.0</td>
    </tr>
    <tr>
      <th>2184490</th>
      <td>S30039900002</td>
      <td>2016-01-06</td>
      <td>2285</td>
      <td>John's Grocery</td>
      <td>401 EAST MARKET ST</td>
      <td>IOWA CITY</td>
      <td>52240</td>
      <td>401 EAST MARKET ST\nIOWA CITY 52240\n(41.66354...</td>
      <td>52.0</td>
      <td>Johnson</td>
      <td>...</td>
      <td>1</td>
      <td>2285</td>
      <td>65</td>
      <td>173</td>
      <td>750.0</td>
      <td>19.58</td>
      <td>29.37</td>
      <td>24</td>
      <td>704.88</td>
      <td>52240.0</td>
    </tr>
    <tr>
      <th>2184491</th>
      <td>S30053000037</td>
      <td>2016-01-06</td>
      <td>2603</td>
      <td>Hy-Vee Wine and Spirits / Bettendorf</td>
      <td>2890 DEVILS GLEN ROAD</td>
      <td>BETTENDORF</td>
      <td>52722</td>
      <td>2890 DEVILS GLEN ROAD\nBETTENDORF 52722\n(41.5...</td>
      <td>82.0</td>
      <td>Scott</td>
      <td>...</td>
      <td>1</td>
      <td>2603</td>
      <td>65</td>
      <td>173</td>
      <td>750.0</td>
      <td>19.58</td>
      <td>29.37</td>
      <td>12</td>
      <td>352.44</td>
      <td>52722.0</td>
    </tr>
    <tr>
      <th>2184492</th>
      <td>S30000200003</td>
      <td>2016-01-04</td>
      <td>2643</td>
      <td>Hy-Vee Wine and Spirits / Waterloo</td>
      <td>2126 KIMBALL AVE</td>
      <td>WATERLOO</td>
      <td>50701</td>
      <td>2126 KIMBALL AVE\nWATERLOO 50701\n</td>
      <td>7.0</td>
      <td>Black Hawk</td>
      <td>...</td>
      <td>1</td>
      <td>2643</td>
      <td>65</td>
      <td>173</td>
      <td>750.0</td>
      <td>19.58</td>
      <td>29.37</td>
      <td>12</td>
      <td>352.44</td>
      <td>50701.0</td>
    </tr>
    <tr>
      <th>2184493</th>
      <td>S30009000118</td>
      <td>2016-01-04</td>
      <td>2549</td>
      <td>Hy-Vee Food Store / Indianola</td>
      <td>910 N JEFFERSON</td>
      <td>INDIANOLA</td>
      <td>50125</td>
      <td>910 N JEFFERSON\nINDIANOLA 50125\n(41.368503, ...</td>
      <td>91.0</td>
      <td>Warren</td>
      <td>...</td>
      <td>1</td>
      <td>2549</td>
      <td>65</td>
      <td>173</td>
      <td>750.0</td>
      <td>19.58</td>
      <td>29.37</td>
      <td>2</td>
      <td>58.74</td>
      <td>50125.0</td>
    </tr>
    <tr>
      <th>2184494</th>
      <td>S30223500022</td>
      <td>2016-01-15</td>
      <td>4152</td>
      <td>Food Land Super Markets / Missouri V</td>
      <td>407 W HURON</td>
      <td>MISSOURI VALLEY</td>
      <td>51555</td>
      <td>407 W HURON\nMISSOURI VALLEY 51555\n(41.557404...</td>
      <td>43.0</td>
      <td>Harrison</td>
      <td>...</td>
      <td>1</td>
      <td>4152</td>
      <td>65</td>
      <td>173</td>
      <td>750.0</td>
      <td>19.58</td>
      <td>29.37</td>
      <td>2</td>
      <td>58.74</td>
      <td>51555.0</td>
    </tr>
    <tr>
      <th>2184495</th>
      <td>S30228200020</td>
      <td>2016-01-15</td>
      <td>2549</td>
      <td>Hy-Vee Food Store / Indianola</td>
      <td>910 N JEFFERSON</td>
      <td>INDIANOLA</td>
      <td>50125</td>
      <td>910 N JEFFERSON\nINDIANOLA 50125\n(41.368503, ...</td>
      <td>91.0</td>
      <td>Warren</td>
      <td>...</td>
      <td>1</td>
      <td>2549</td>
      <td>65</td>
      <td>173</td>
      <td>750.0</td>
      <td>19.58</td>
      <td>29.37</td>
      <td>1</td>
      <td>29.37</td>
      <td>50125.0</td>
    </tr>
    <tr>
      <th>2184496</th>
      <td>S29993400031</td>
      <td>2016-01-04</td>
      <td>4114</td>
      <td>After 5 Somewhere</td>
      <td>704 W 7TH ST PO BOX 372</td>
      <td>ATLANTIC</td>
      <td>50022</td>
      <td>704 W 7TH ST PO BOX 372\nATLANTIC 50022\n(41.4...</td>
      <td>15.0</td>
      <td>Cass</td>
      <td>...</td>
      <td>1</td>
      <td>4114</td>
      <td>962</td>
      <td>238</td>
      <td>750.0</td>
      <td>11.62</td>
      <td>17.43</td>
      <td>2</td>
      <td>34.86</td>
      <td>50022.0</td>
    </tr>
    <tr>
      <th>2184497</th>
      <td>S30056300040</td>
      <td>2016-01-06</td>
      <td>3820</td>
      <td>Charlie's Wine and Spirits,</td>
      <td>507 W 19th St</td>
      <td>SIOUX CITY</td>
      <td>51103</td>
      <td>507 W 19th St\nSIOUX CITY 51103\n(42.510535, -...</td>
      <td>97.0</td>
      <td>Woodbury</td>
      <td>...</td>
      <td>1</td>
      <td>3820</td>
      <td>130</td>
      <td>249</td>
      <td>150.0</td>
      <td>6.40</td>
      <td>9.60</td>
      <td>8</td>
      <td>76.80</td>
      <td>51103.0</td>
    </tr>
    <tr>
      <th>2184498</th>
      <td>S30181500061</td>
      <td>2016-01-13</td>
      <td>3819</td>
      <td>Quillins Decorah</td>
      <td>915 SHORT ST</td>
      <td>DECORAH</td>
      <td>52101</td>
      <td>915 SHORT ST\nDECORAH 52101\n(43.291013, -91.7...</td>
      <td>96.0</td>
      <td>Winneshiek</td>
      <td>...</td>
      <td>1</td>
      <td>3819</td>
      <td>130</td>
      <td>249</td>
      <td>150.0</td>
      <td>6.40</td>
      <td>9.60</td>
      <td>4</td>
      <td>38.40</td>
      <td>52101.0</td>
    </tr>
    <tr>
      <th>2184499</th>
      <td>S30176700011</td>
      <td>2016-01-13</td>
      <td>5199</td>
      <td>Super Mart / Oelwein</td>
      <td>701, S  FREDERICK  AVE</td>
      <td>OELWEIN</td>
      <td>50662</td>
      <td>701, S FREDERICK AVE\nOELWEIN 50662\n(42.66912...</td>
      <td>33.0</td>
      <td>Fayette</td>
      <td>...</td>
      <td>1</td>
      <td>5199</td>
      <td>305</td>
      <td>258</td>
      <td>6000.0</td>
      <td>99.00</td>
      <td>148.50</td>
      <td>1</td>
      <td>148.50</td>
      <td>50662.0</td>
    </tr>
    <tr>
      <th>2184500</th>
      <td>S30356500001</td>
      <td>2016-01-25</td>
      <td>2538</td>
      <td>Hy-Vee Food Store #3 / Waterloo</td>
      <td>1422 FLAMMANG DR</td>
      <td>WATERLOO</td>
      <td>50702</td>
      <td>1422 FLAMMANG DR\nWATERLOO 50702\n(42.459938, ...</td>
      <td>7.0</td>
      <td>Black Hawk</td>
      <td>...</td>
      <td>1</td>
      <td>2538</td>
      <td>305</td>
      <td>258</td>
      <td>6000.0</td>
      <td>99.00</td>
      <td>148.50</td>
      <td>20</td>
      <td>2970.00</td>
      <td>50702.0</td>
    </tr>
    <tr>
      <th>2184501</th>
      <td>S30032900148</td>
      <td>2016-01-05</td>
      <td>2651</td>
      <td>Hy-Vee / Waverly</td>
      <td>1311 4 STREET SW</td>
      <td>WAVERLY</td>
      <td>50677</td>
      <td>1311 4 STREET SW\nWAVERLY 50677\n(42.713533, -...</td>
      <td>9.0</td>
      <td>Bremer</td>
      <td>...</td>
      <td>1</td>
      <td>2651</td>
      <td>305</td>
      <td>258</td>
      <td>6000.0</td>
      <td>99.00</td>
      <td>148.50</td>
      <td>1</td>
      <td>148.50</td>
      <td>50677.0</td>
    </tr>
    <tr>
      <th>2184502</th>
      <td>S30033700001</td>
      <td>2016-01-05</td>
      <td>4602</td>
      <td>Cheap Smokes / Beer City</td>
      <td>58231 190th ST</td>
      <td>PACIFIC JUNCTION</td>
      <td>51561</td>
      <td>58231 190th ST\nPACIFIC JUNCTION 51561\n(41.04...</td>
      <td>65.0</td>
      <td>Mills</td>
      <td>...</td>
      <td>1</td>
      <td>4602</td>
      <td>305</td>
      <td>258</td>
      <td>6000.0</td>
      <td>99.00</td>
      <td>148.50</td>
      <td>1</td>
      <td>148.50</td>
      <td>51561.0</td>
    </tr>
    <tr>
      <th>2184503</th>
      <td>S30045200012</td>
      <td>2016-01-05</td>
      <td>5126</td>
      <td>Price Chopper  /  Merle Hay</td>
      <td>4343 MERLE HAY RD</td>
      <td>DES MOINES</td>
      <td>50310</td>
      <td>4343 MERLE HAY RD\nDES MOINES 50310\n(41.63740...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>1</td>
      <td>5126</td>
      <td>305</td>
      <td>258</td>
      <td>6000.0</td>
      <td>99.00</td>
      <td>148.50</td>
      <td>1</td>
      <td>148.50</td>
      <td>50310.0</td>
    </tr>
    <tr>
      <th>2184504</th>
      <td>S30051100001</td>
      <td>2016-01-06</td>
      <td>2594</td>
      <td>Hy-Vee Food Store / Sioux City</td>
      <td>4500 SERGEANT ROAD</td>
      <td>SIOUX CITY</td>
      <td>51106</td>
      <td>4500 SERGEANT ROAD\nSIOUX CITY 51106\n(42.4480...</td>
      <td>97.0</td>
      <td>Woodbury</td>
      <td>...</td>
      <td>1</td>
      <td>2594</td>
      <td>305</td>
      <td>258</td>
      <td>6000.0</td>
      <td>99.00</td>
      <td>148.50</td>
      <td>1</td>
      <td>148.50</td>
      <td>51106.0</td>
    </tr>
    <tr>
      <th>2184505</th>
      <td>S30056300125</td>
      <td>2016-01-06</td>
      <td>3820</td>
      <td>Charlie's Wine and Spirits,</td>
      <td>507 W 19th St</td>
      <td>SIOUX CITY</td>
      <td>51103</td>
      <td>507 W 19th St\nSIOUX CITY 51103\n(42.510535, -...</td>
      <td>97.0</td>
      <td>Woodbury</td>
      <td>...</td>
      <td>1</td>
      <td>3820</td>
      <td>305</td>
      <td>258</td>
      <td>6000.0</td>
      <td>99.00</td>
      <td>148.50</td>
      <td>1</td>
      <td>148.50</td>
      <td>51103.0</td>
    </tr>
    <tr>
      <th>2184506</th>
      <td>S30068300030</td>
      <td>2016-01-06</td>
      <td>2502</td>
      <td>Hy-Vee Wine and Spirits / Ankeny</td>
      <td>410 NORTH ANKENY BLVD</td>
      <td>ANKENY</td>
      <td>50021</td>
      <td>410 NORTH ANKENY BLVD\nANKENY 50021\n</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>1</td>
      <td>2502</td>
      <td>305</td>
      <td>258</td>
      <td>6000.0</td>
      <td>99.00</td>
      <td>148.50</td>
      <td>1</td>
      <td>148.50</td>
      <td>50021.0</td>
    </tr>
    <tr>
      <th>2184507</th>
      <td>S30430200051</td>
      <td>2016-01-27</td>
      <td>2502</td>
      <td>Hy-Vee Wine and Spirits / Ankeny</td>
      <td>410 NORTH ANKENY BLVD</td>
      <td>ANKENY</td>
      <td>50021</td>
      <td>410 NORTH ANKENY BLVD\nANKENY 50021\n</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>1</td>
      <td>2502</td>
      <td>305</td>
      <td>258</td>
      <td>6000.0</td>
      <td>99.00</td>
      <td>148.50</td>
      <td>1</td>
      <td>148.50</td>
      <td>50021.0</td>
    </tr>
    <tr>
      <th>2184508</th>
      <td>S30441900020</td>
      <td>2016-01-28</td>
      <td>5215</td>
      <td>Cody Mart</td>
      <td>1220, N CODY RD</td>
      <td>LE CLAIRE</td>
      <td>52753</td>
      <td>1220, N CODY RD\nLE CLAIRE 52753\n(41.610504, ...</td>
      <td>82.0</td>
      <td>Scott</td>
      <td>...</td>
      <td>1</td>
      <td>5215</td>
      <td>370</td>
      <td>316</td>
      <td>750.0</td>
      <td>11.49</td>
      <td>17.24</td>
      <td>6</td>
      <td>103.44</td>
      <td>52753.0</td>
    </tr>
    <tr>
      <th>2184509</th>
      <td>S30430000005</td>
      <td>2016-01-27</td>
      <td>3417</td>
      <td>Big G Food Store</td>
      <td>PO BOX 261  310 W DILLON</td>
      <td>MARENGO</td>
      <td>52301</td>
      <td>PO BOX 261 310 W DILLON\nMARENGO 52301\n</td>
      <td>48.0</td>
      <td>Iowa</td>
      <td>...</td>
      <td>1</td>
      <td>3417</td>
      <td>370</td>
      <td>316</td>
      <td>750.0</td>
      <td>11.49</td>
      <td>17.24</td>
      <td>6</td>
      <td>103.44</td>
      <td>52301.0</td>
    </tr>
    <tr>
      <th>2184510</th>
      <td>S30429200060</td>
      <td>2016-01-27</td>
      <td>3990</td>
      <td>Cork and Bottle / Oskaloosa</td>
      <td>309 A AVE WEST</td>
      <td>OSKALOOSA</td>
      <td>52577</td>
      <td>309 A AVE WEST\nOSKALOOSA 52577\n(41.296228, -...</td>
      <td>62.0</td>
      <td>Mahaska</td>
      <td>...</td>
      <td>1</td>
      <td>3990</td>
      <td>370</td>
      <td>316</td>
      <td>750.0</td>
      <td>11.49</td>
      <td>17.24</td>
      <td>6</td>
      <td>103.44</td>
      <td>52577.0</td>
    </tr>
    <tr>
      <th>2184511</th>
      <td>S30300100044</td>
      <td>2016-01-20</td>
      <td>4932</td>
      <td>B and B West</td>
      <td>3105 HUDSON RD</td>
      <td>CEDAR FALLS</td>
      <td>50613</td>
      <td>3105 HUDSON RD\nCEDAR FALLS 50613\n(42.509207,...</td>
      <td>7.0</td>
      <td>Black Hawk</td>
      <td>...</td>
      <td>1</td>
      <td>4932</td>
      <td>370</td>
      <td>316</td>
      <td>750.0</td>
      <td>11.49</td>
      <td>17.24</td>
      <td>6</td>
      <td>103.44</td>
      <td>50613.0</td>
    </tr>
    <tr>
      <th>2184512</th>
      <td>S30312000006</td>
      <td>2016-01-21</td>
      <td>4959</td>
      <td>Bani's</td>
      <td>2128 COLLEGE ST</td>
      <td>CEDAR FALLS</td>
      <td>50613</td>
      <td>2128 COLLEGE ST\nCEDAR FALLS 50613\n(42.518018...</td>
      <td>7.0</td>
      <td>Black Hawk</td>
      <td>...</td>
      <td>1</td>
      <td>4959</td>
      <td>370</td>
      <td>316</td>
      <td>750.0</td>
      <td>11.49</td>
      <td>17.24</td>
      <td>6</td>
      <td>103.44</td>
      <td>50613.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2709522</th>
      <td>S31558600021</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>205</td>
      <td>31475</td>
      <td>750.0</td>
      <td>6.90</td>
      <td>10.35</td>
      <td>1</td>
      <td>10.35</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709523</th>
      <td>S31558600022</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>434</td>
      <td>45276</td>
      <td>750.0</td>
      <td>4.00</td>
      <td>6.00</td>
      <td>2</td>
      <td>12.00</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709524</th>
      <td>S31558600023</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>434</td>
      <td>45278</td>
      <td>1750.0</td>
      <td>7.84</td>
      <td>11.76</td>
      <td>2</td>
      <td>23.52</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709525</th>
      <td>S31558600024</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>410</td>
      <td>88296</td>
      <td>750.0</td>
      <td>27.00</td>
      <td>40.50</td>
      <td>1</td>
      <td>40.50</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709526</th>
      <td>S31558600025</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>65</td>
      <td>88556</td>
      <td>750.0</td>
      <td>9.45</td>
      <td>14.18</td>
      <td>1</td>
      <td>14.18</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709527</th>
      <td>S31558600026</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>260</td>
      <td>38006</td>
      <td>750.0</td>
      <td>8.25</td>
      <td>12.38</td>
      <td>4</td>
      <td>49.52</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709528</th>
      <td>S31558600027</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>260</td>
      <td>28866</td>
      <td>750.0</td>
      <td>12.50</td>
      <td>18.75</td>
      <td>1</td>
      <td>18.75</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709529</th>
      <td>S31558600028</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>255</td>
      <td>27102</td>
      <td>750.0</td>
      <td>18.09</td>
      <td>27.14</td>
      <td>1</td>
      <td>27.14</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709530</th>
      <td>S31558600029</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>301</td>
      <td>38176</td>
      <td>750.0</td>
      <td>9.65</td>
      <td>14.48</td>
      <td>3</td>
      <td>43.44</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709531</th>
      <td>S31558600030</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>380</td>
      <td>41692</td>
      <td>1750.0</td>
      <td>10.99</td>
      <td>16.49</td>
      <td>2</td>
      <td>32.98</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709532</th>
      <td>S31558600031</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>380</td>
      <td>37338</td>
      <td>1750.0</td>
      <td>10.99</td>
      <td>16.49</td>
      <td>2</td>
      <td>32.98</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709533</th>
      <td>S31558600032</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>461</td>
      <td>22156</td>
      <td>750.0</td>
      <td>13.50</td>
      <td>20.25</td>
      <td>1</td>
      <td>20.25</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709534</th>
      <td>S31558600033</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>305</td>
      <td>73051</td>
      <td>500.0</td>
      <td>8.87</td>
      <td>13.31</td>
      <td>1</td>
      <td>13.31</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709535</th>
      <td>S31558600034</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>395</td>
      <td>89191</td>
      <td>500.0</td>
      <td>11.50</td>
      <td>17.25</td>
      <td>1</td>
      <td>17.25</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709536</th>
      <td>S31558600035</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>260</td>
      <td>68031</td>
      <td>1000.0</td>
      <td>25.25</td>
      <td>37.88</td>
      <td>1</td>
      <td>37.88</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709537</th>
      <td>S31558600036</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>300</td>
      <td>65204</td>
      <td>500.0</td>
      <td>6.63</td>
      <td>9.95</td>
      <td>1</td>
      <td>9.95</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709538</th>
      <td>S31558600037</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>322</td>
      <td>75208</td>
      <td>500.0</td>
      <td>4.84</td>
      <td>7.26</td>
      <td>1</td>
      <td>7.26</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709539</th>
      <td>S31558600038</td>
      <td>2016-03-31</td>
      <td>4165</td>
      <td>I-35 Spirits / Ankeny</td>
      <td>113 SE DELAWARE AVE STE 101</td>
      <td>ANKENY</td>
      <td>50023</td>
      <td>113 SE DELAWARE AVE STE 101\nANKENY 50023\n(41...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4165</td>
      <td>55</td>
      <td>84172</td>
      <td>600.0</td>
      <td>5.94</td>
      <td>8.91</td>
      <td>1</td>
      <td>8.91</td>
      <td>50023.0</td>
    </tr>
    <tr>
      <th>2709540</th>
      <td>S31558800001</td>
      <td>2016-03-31</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4974</td>
      <td>421</td>
      <td>64858</td>
      <td>3000.0</td>
      <td>29.72</td>
      <td>44.58</td>
      <td>3</td>
      <td>133.74</td>
      <td>50317.0</td>
    </tr>
    <tr>
      <th>2709541</th>
      <td>S31558800002</td>
      <td>2016-03-31</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4974</td>
      <td>260</td>
      <td>37994</td>
      <td>375.0</td>
      <td>4.75</td>
      <td>7.13</td>
      <td>24</td>
      <td>171.12</td>
      <td>50317.0</td>
    </tr>
    <tr>
      <th>2709542</th>
      <td>S31558800003</td>
      <td>2016-03-31</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4974</td>
      <td>115</td>
      <td>53214</td>
      <td>375.0</td>
      <td>3.22</td>
      <td>4.83</td>
      <td>24</td>
      <td>115.92</td>
      <td>50317.0</td>
    </tr>
    <tr>
      <th>2709543</th>
      <td>S31558800004</td>
      <td>2016-03-31</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4974</td>
      <td>300</td>
      <td>36904</td>
      <td>375.0</td>
      <td>1.80</td>
      <td>2.70</td>
      <td>24</td>
      <td>64.80</td>
      <td>50317.0</td>
    </tr>
    <tr>
      <th>2709544</th>
      <td>S31558800005</td>
      <td>2016-03-31</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4974</td>
      <td>297</td>
      <td>23824</td>
      <td>375.0</td>
      <td>2.00</td>
      <td>3.00</td>
      <td>24</td>
      <td>72.00</td>
      <td>50317.0</td>
    </tr>
    <tr>
      <th>2709545</th>
      <td>S31558800006</td>
      <td>2016-03-31</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4974</td>
      <td>115</td>
      <td>11774</td>
      <td>375.0</td>
      <td>3.07</td>
      <td>4.61</td>
      <td>24</td>
      <td>110.64</td>
      <td>50317.0</td>
    </tr>
    <tr>
      <th>2709546</th>
      <td>S31558800007</td>
      <td>2016-03-31</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4974</td>
      <td>420</td>
      <td>48105</td>
      <td>375.0</td>
      <td>9.99</td>
      <td>14.99</td>
      <td>12</td>
      <td>179.88</td>
      <td>50317.0</td>
    </tr>
    <tr>
      <th>2709547</th>
      <td>S31558800008</td>
      <td>2016-03-31</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4974</td>
      <td>434</td>
      <td>36305</td>
      <td>750.0</td>
      <td>3.34</td>
      <td>5.01</td>
      <td>12</td>
      <td>60.12</td>
      <td>50317.0</td>
    </tr>
    <tr>
      <th>2709548</th>
      <td>S31558800009</td>
      <td>2016-03-31</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4974</td>
      <td>370</td>
      <td>32233</td>
      <td>200.0</td>
      <td>1.99</td>
      <td>2.99</td>
      <td>48</td>
      <td>143.52</td>
      <td>50317.0</td>
    </tr>
    <tr>
      <th>2709549</th>
      <td>S31558800010</td>
      <td>2016-03-31</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4974</td>
      <td>370</td>
      <td>32232</td>
      <td>100.0</td>
      <td>0.97</td>
      <td>1.46</td>
      <td>48</td>
      <td>70.08</td>
      <td>50317.0</td>
    </tr>
    <tr>
      <th>2709550</th>
      <td>S31558800011</td>
      <td>2016-03-31</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4974</td>
      <td>434</td>
      <td>36308</td>
      <td>1750.0</td>
      <td>7.17</td>
      <td>10.76</td>
      <td>6</td>
      <td>64.56</td>
      <td>50317.0</td>
    </tr>
    <tr>
      <th>2709551</th>
      <td>S31558800012</td>
      <td>2016-03-31</td>
      <td>4974</td>
      <td>Super Stop  SE 14th</td>
      <td>727, SE  14TH ST</td>
      <td>DES MOINES</td>
      <td>50317</td>
      <td>727, SE 14TH ST\nDES MOINES 50317\n(41.581689,...</td>
      <td>77.0</td>
      <td>Polk</td>
      <td>...</td>
      <td>3</td>
      <td>4974</td>
      <td>115</td>
      <td>11786</td>
      <td>750.0</td>
      <td>5.23</td>
      <td>7.85</td>
      <td>12</td>
      <td>94.20</td>
      <td>50317.0</td>
    </tr>
  </tbody>
</table>
<p>510700 rows × 35 columns</p>
</div>




```python
df_2016_3m = df_2016[['State_Bottle_Cost', 'State_Bottle_Retail',
                         'Bottle_Volume', 'Store_Number', 'Bottles_Sold','Sale']] 
```


```python
df_2016_f3m = df[df['Month']<4]
```


```python
df_2016_f3m_clean = df_2016_f3m[[ 'Store_Number', 'Sale']] 
```


```python
df_2016_f3m_group = df_2016_f3m_clean.groupby('Store_Number').sum()
```


```python
df_2016_f3m_group.rename(columns={'Sale': 'Sale_f3m'}, inplace=True)
```


```python
df_2016_group = df_2016_3m.groupby('Store_Number').sum()
```


```python
df_2016_group.dropna(inplace=True)
df_2016_group
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
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottle_Volume</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
    </tr>
    <tr>
      <th>Store_Number</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2106</th>
      <td>12850.99</td>
      <td>19282.87</td>
      <td>1125075.0</td>
      <td>23579</td>
      <td>337446.81</td>
    </tr>
    <tr>
      <th>2113</th>
      <td>4132.16</td>
      <td>6201.13</td>
      <td>369000.0</td>
      <td>1701</td>
      <td>21663.33</td>
    </tr>
    <tr>
      <th>2130</th>
      <td>10399.76</td>
      <td>15603.80</td>
      <td>969925.0</td>
      <td>19730</td>
      <td>303978.69</td>
    </tr>
    <tr>
      <th>2152</th>
      <td>2053.31</td>
      <td>3085.95</td>
      <td>229500.0</td>
      <td>749</td>
      <td>9307.75</td>
    </tr>
    <tr>
      <th>2178</th>
      <td>6156.75</td>
      <td>9243.32</td>
      <td>617275.0</td>
      <td>4525</td>
      <td>58749.04</td>
    </tr>
    <tr>
      <th>2190</th>
      <td>39487.76</td>
      <td>59250.94</td>
      <td>2512300.0</td>
      <td>24528</td>
      <td>320989.41</td>
    </tr>
    <tr>
      <th>2191</th>
      <td>16765.65</td>
      <td>25156.47</td>
      <td>1439725.0</td>
      <td>18680</td>
      <td>300110.12</td>
    </tr>
    <tr>
      <th>2200</th>
      <td>10802.71</td>
      <td>16212.11</td>
      <td>1060625.0</td>
      <td>3877</td>
      <td>55121.79</td>
    </tr>
    <tr>
      <th>2228</th>
      <td>6693.58</td>
      <td>10047.29</td>
      <td>636375.0</td>
      <td>3676</td>
      <td>42359.79</td>
    </tr>
    <tr>
      <th>2233</th>
      <td>5986.95</td>
      <td>8985.62</td>
      <td>517900.0</td>
      <td>4089</td>
      <td>55834.13</td>
    </tr>
    <tr>
      <th>2238</th>
      <td>248.81</td>
      <td>373.25</td>
      <td>13625.0</td>
      <td>155</td>
      <td>3536.14</td>
    </tr>
    <tr>
      <th>2248</th>
      <td>13603.11</td>
      <td>20412.58</td>
      <td>810178.0</td>
      <td>8406</td>
      <td>135672.49</td>
    </tr>
    <tr>
      <th>2285</th>
      <td>8799.50</td>
      <td>13201.49</td>
      <td>519328.0</td>
      <td>8499</td>
      <td>158089.70</td>
    </tr>
    <tr>
      <th>2290</th>
      <td>26050.73</td>
      <td>39093.25</td>
      <td>2338125.0</td>
      <td>9133</td>
      <td>123472.77</td>
    </tr>
    <tr>
      <th>2327</th>
      <td>4733.31</td>
      <td>7105.69</td>
      <td>469350.0</td>
      <td>1727</td>
      <td>21834.49</td>
    </tr>
    <tr>
      <th>2353</th>
      <td>3619.21</td>
      <td>5434.38</td>
      <td>396625.0</td>
      <td>2790</td>
      <td>39609.55</td>
    </tr>
    <tr>
      <th>2413</th>
      <td>11643.33</td>
      <td>17475.02</td>
      <td>1079550.0</td>
      <td>13245</td>
      <td>202172.93</td>
    </tr>
    <tr>
      <th>2445</th>
      <td>3390.98</td>
      <td>5087.91</td>
      <td>366625.0</td>
      <td>1439</td>
      <td>15689.80</td>
    </tr>
    <tr>
      <th>2448</th>
      <td>9695.30</td>
      <td>14549.18</td>
      <td>900100.0</td>
      <td>3281</td>
      <td>48335.87</td>
    </tr>
    <tr>
      <th>2459</th>
      <td>2129.15</td>
      <td>3198.55</td>
      <td>248350.0</td>
      <td>1270</td>
      <td>16299.95</td>
    </tr>
    <tr>
      <th>2465</th>
      <td>9502.05</td>
      <td>14259.12</td>
      <td>722500.0</td>
      <td>3579</td>
      <td>51830.14</td>
    </tr>
    <tr>
      <th>2475</th>
      <td>2420.12</td>
      <td>3633.80</td>
      <td>265075.0</td>
      <td>1986</td>
      <td>30402.43</td>
    </tr>
    <tr>
      <th>2478</th>
      <td>3115.92</td>
      <td>4674.40</td>
      <td>188750.0</td>
      <td>2478</td>
      <td>45426.18</td>
    </tr>
    <tr>
      <th>2498</th>
      <td>1090.77</td>
      <td>1637.69</td>
      <td>126975.0</td>
      <td>666</td>
      <td>6367.76</td>
    </tr>
    <tr>
      <th>2500</th>
      <td>33888.25</td>
      <td>50858.05</td>
      <td>2968400.0</td>
      <td>23360</td>
      <td>325682.73</td>
    </tr>
    <tr>
      <th>2501</th>
      <td>30086.97</td>
      <td>45161.31</td>
      <td>2636031.0</td>
      <td>24983</td>
      <td>329839.42</td>
    </tr>
    <tr>
      <th>2502</th>
      <td>19400.42</td>
      <td>29115.13</td>
      <td>1673650.0</td>
      <td>16324</td>
      <td>233550.76</td>
    </tr>
    <tr>
      <th>2505</th>
      <td>13053.55</td>
      <td>19590.34</td>
      <td>1343403.0</td>
      <td>11095</td>
      <td>151268.66</td>
    </tr>
    <tr>
      <th>2506</th>
      <td>22985.48</td>
      <td>34496.32</td>
      <td>2105975.0</td>
      <td>21030</td>
      <td>311469.70</td>
    </tr>
    <tr>
      <th>2507</th>
      <td>4759.72</td>
      <td>7141.90</td>
      <td>561675.0</td>
      <td>6125</td>
      <td>61056.75</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>5185</th>
      <td>758.08</td>
      <td>1137.34</td>
      <td>72575.0</td>
      <td>880</td>
      <td>8888.39</td>
    </tr>
    <tr>
      <th>5186</th>
      <td>300.18</td>
      <td>450.38</td>
      <td>33525.0</td>
      <td>406</td>
      <td>3821.37</td>
    </tr>
    <tr>
      <th>5187</th>
      <td>3265.23</td>
      <td>4899.78</td>
      <td>248700.0</td>
      <td>1989</td>
      <td>19224.33</td>
    </tr>
    <tr>
      <th>5188</th>
      <td>491.56</td>
      <td>737.47</td>
      <td>45025.0</td>
      <td>476</td>
      <td>5208.12</td>
    </tr>
    <tr>
      <th>5189</th>
      <td>238.98</td>
      <td>358.52</td>
      <td>22500.0</td>
      <td>147</td>
      <td>2821.83</td>
    </tr>
    <tr>
      <th>5190</th>
      <td>998.36</td>
      <td>1499.37</td>
      <td>113000.0</td>
      <td>844</td>
      <td>11465.90</td>
    </tr>
    <tr>
      <th>5191</th>
      <td>121.56</td>
      <td>182.77</td>
      <td>16625.0</td>
      <td>210</td>
      <td>1890.12</td>
    </tr>
    <tr>
      <th>5192</th>
      <td>151.82</td>
      <td>228.43</td>
      <td>15000.0</td>
      <td>158</td>
      <td>1992.48</td>
    </tr>
    <tr>
      <th>5193</th>
      <td>272.95</td>
      <td>410.01</td>
      <td>34025.0</td>
      <td>585</td>
      <td>5418.33</td>
    </tr>
    <tr>
      <th>5195</th>
      <td>480.31</td>
      <td>720.99</td>
      <td>40400.0</td>
      <td>347</td>
      <td>4293.86</td>
    </tr>
    <tr>
      <th>5196</th>
      <td>1660.44</td>
      <td>2491.21</td>
      <td>125400.0</td>
      <td>707</td>
      <td>7403.48</td>
    </tr>
    <tr>
      <th>5198</th>
      <td>7203.97</td>
      <td>10809.54</td>
      <td>565175.0</td>
      <td>8099</td>
      <td>64799.06</td>
    </tr>
    <tr>
      <th>5199</th>
      <td>2191.90</td>
      <td>3291.25</td>
      <td>189475.0</td>
      <td>2576</td>
      <td>21208.58</td>
    </tr>
    <tr>
      <th>5201</th>
      <td>58.29</td>
      <td>87.45</td>
      <td>4575.0</td>
      <td>108</td>
      <td>986.46</td>
    </tr>
    <tr>
      <th>5202</th>
      <td>519.98</td>
      <td>780.12</td>
      <td>44050.0</td>
      <td>335</td>
      <td>4207.66</td>
    </tr>
    <tr>
      <th>5203</th>
      <td>1916.93</td>
      <td>2878.93</td>
      <td>215875.0</td>
      <td>1758</td>
      <td>21222.75</td>
    </tr>
    <tr>
      <th>5204</th>
      <td>2112.50</td>
      <td>3169.34</td>
      <td>155850.0</td>
      <td>1803</td>
      <td>13368.79</td>
    </tr>
    <tr>
      <th>5205</th>
      <td>1089.71</td>
      <td>1638.27</td>
      <td>121875.0</td>
      <td>308</td>
      <td>4060.15</td>
    </tr>
    <tr>
      <th>5206</th>
      <td>2480.59</td>
      <td>3724.36</td>
      <td>286600.0</td>
      <td>1875</td>
      <td>22234.02</td>
    </tr>
    <tr>
      <th>5207</th>
      <td>4447.60</td>
      <td>6672.40</td>
      <td>338225.0</td>
      <td>5862</td>
      <td>52388.65</td>
    </tr>
    <tr>
      <th>5211</th>
      <td>1544.97</td>
      <td>2318.61</td>
      <td>132075.0</td>
      <td>1187</td>
      <td>14401.59</td>
    </tr>
    <tr>
      <th>5212</th>
      <td>802.95</td>
      <td>1204.74</td>
      <td>77400.0</td>
      <td>663</td>
      <td>4651.89</td>
    </tr>
    <tr>
      <th>5213</th>
      <td>612.34</td>
      <td>918.94</td>
      <td>72100.0</td>
      <td>508</td>
      <td>3540.58</td>
    </tr>
    <tr>
      <th>5215</th>
      <td>4951.98</td>
      <td>7432.70</td>
      <td>426600.0</td>
      <td>2094</td>
      <td>25209.33</td>
    </tr>
    <tr>
      <th>9001</th>
      <td>673.92</td>
      <td>1010.96</td>
      <td>26250.0</td>
      <td>872</td>
      <td>22355.76</td>
    </tr>
    <tr>
      <th>9002</th>
      <td>874.72</td>
      <td>1312.35</td>
      <td>39375.0</td>
      <td>1429</td>
      <td>28283.60</td>
    </tr>
    <tr>
      <th>9010</th>
      <td>38.74</td>
      <td>58.12</td>
      <td>2250.0</td>
      <td>36</td>
      <td>697.44</td>
    </tr>
    <tr>
      <th>9013</th>
      <td>145.30</td>
      <td>218.00</td>
      <td>13500.0</td>
      <td>495</td>
      <td>6191.34</td>
    </tr>
    <tr>
      <th>9022</th>
      <td>10.34</td>
      <td>15.51</td>
      <td>750.0</td>
      <td>42</td>
      <td>651.42</td>
    </tr>
    <tr>
      <th>9023</th>
      <td>35.18</td>
      <td>52.78</td>
      <td>1500.0</td>
      <td>48</td>
      <td>1266.72</td>
    </tr>
  </tbody>
</table>
<p>1290 rows × 5 columns</p>
</div>




```python
df_2016_group.join(df_2016_f3m_group)
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
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottle_Volume</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
      <th>Sale_f3m</th>
    </tr>
    <tr>
      <th>Store_Number</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2106</th>
      <td>12850.99</td>
      <td>19282.87</td>
      <td>1125075.0</td>
      <td>23579</td>
      <td>337446.81</td>
      <td>674970.58</td>
    </tr>
    <tr>
      <th>2113</th>
      <td>4132.16</td>
      <td>6201.13</td>
      <td>369000.0</td>
      <td>1701</td>
      <td>21663.33</td>
      <td>44088.49</td>
    </tr>
    <tr>
      <th>2130</th>
      <td>10399.76</td>
      <td>15603.80</td>
      <td>969925.0</td>
      <td>19730</td>
      <td>303978.69</td>
      <td>584706.73</td>
    </tr>
    <tr>
      <th>2152</th>
      <td>2053.31</td>
      <td>3085.95</td>
      <td>229500.0</td>
      <td>749</td>
      <td>9307.75</td>
      <td>30557.35</td>
    </tr>
    <tr>
      <th>2178</th>
      <td>6156.75</td>
      <td>9243.32</td>
      <td>617275.0</td>
      <td>4525</td>
      <td>58749.04</td>
      <td>113351.32</td>
    </tr>
    <tr>
      <th>2190</th>
      <td>39487.76</td>
      <td>59250.94</td>
      <td>2512300.0</td>
      <td>24528</td>
      <td>320989.41</td>
      <td>588918.84</td>
    </tr>
    <tr>
      <th>2191</th>
      <td>16765.65</td>
      <td>25156.47</td>
      <td>1439725.0</td>
      <td>18680</td>
      <td>300110.12</td>
      <td>621613.57</td>
    </tr>
    <tr>
      <th>2200</th>
      <td>10802.71</td>
      <td>16212.11</td>
      <td>1060625.0</td>
      <td>3877</td>
      <td>55121.79</td>
      <td>100655.56</td>
    </tr>
    <tr>
      <th>2228</th>
      <td>6693.58</td>
      <td>10047.29</td>
      <td>636375.0</td>
      <td>3676</td>
      <td>42359.79</td>
      <td>93429.61</td>
    </tr>
    <tr>
      <th>2233</th>
      <td>5986.95</td>
      <td>8985.62</td>
      <td>517900.0</td>
      <td>4089</td>
      <td>55834.13</td>
      <td>124899.48</td>
    </tr>
    <tr>
      <th>2238</th>
      <td>248.81</td>
      <td>373.25</td>
      <td>13625.0</td>
      <td>155</td>
      <td>3536.14</td>
      <td>67424.00</td>
    </tr>
    <tr>
      <th>2248</th>
      <td>13603.11</td>
      <td>20412.58</td>
      <td>810178.0</td>
      <td>8406</td>
      <td>135672.49</td>
      <td>259254.49</td>
    </tr>
    <tr>
      <th>2285</th>
      <td>8799.50</td>
      <td>13201.49</td>
      <td>519328.0</td>
      <td>8499</td>
      <td>158089.70</td>
      <td>305425.42</td>
    </tr>
    <tr>
      <th>2290</th>
      <td>26050.73</td>
      <td>39093.25</td>
      <td>2338125.0</td>
      <td>9133</td>
      <td>123472.77</td>
      <td>245019.27</td>
    </tr>
    <tr>
      <th>2327</th>
      <td>4733.31</td>
      <td>7105.69</td>
      <td>469350.0</td>
      <td>1727</td>
      <td>21834.49</td>
      <td>42169.52</td>
    </tr>
    <tr>
      <th>2353</th>
      <td>3619.21</td>
      <td>5434.38</td>
      <td>396625.0</td>
      <td>2790</td>
      <td>39609.55</td>
      <td>186892.29</td>
    </tr>
    <tr>
      <th>2413</th>
      <td>11643.33</td>
      <td>17475.02</td>
      <td>1079550.0</td>
      <td>13245</td>
      <td>202172.93</td>
      <td>408276.65</td>
    </tr>
    <tr>
      <th>2445</th>
      <td>3390.98</td>
      <td>5087.91</td>
      <td>366625.0</td>
      <td>1439</td>
      <td>15689.80</td>
      <td>32628.95</td>
    </tr>
    <tr>
      <th>2448</th>
      <td>9695.30</td>
      <td>14549.18</td>
      <td>900100.0</td>
      <td>3281</td>
      <td>48335.87</td>
      <td>104102.19</td>
    </tr>
    <tr>
      <th>2459</th>
      <td>2129.15</td>
      <td>3198.55</td>
      <td>248350.0</td>
      <td>1270</td>
      <td>16299.95</td>
      <td>32304.72</td>
    </tr>
    <tr>
      <th>2465</th>
      <td>9502.05</td>
      <td>14259.12</td>
      <td>722500.0</td>
      <td>3579</td>
      <td>51830.14</td>
      <td>116170.72</td>
    </tr>
    <tr>
      <th>2475</th>
      <td>2420.12</td>
      <td>3633.80</td>
      <td>265075.0</td>
      <td>1986</td>
      <td>30402.43</td>
      <td>60040.18</td>
    </tr>
    <tr>
      <th>2478</th>
      <td>3115.92</td>
      <td>4674.40</td>
      <td>188750.0</td>
      <td>2478</td>
      <td>45426.18</td>
      <td>95977.11</td>
    </tr>
    <tr>
      <th>2498</th>
      <td>1090.77</td>
      <td>1637.69</td>
      <td>126975.0</td>
      <td>666</td>
      <td>6367.76</td>
      <td>11945.37</td>
    </tr>
    <tr>
      <th>2500</th>
      <td>33888.25</td>
      <td>50858.05</td>
      <td>2968400.0</td>
      <td>23360</td>
      <td>325682.73</td>
      <td>639287.75</td>
    </tr>
    <tr>
      <th>2501</th>
      <td>30086.97</td>
      <td>45161.31</td>
      <td>2636031.0</td>
      <td>24983</td>
      <td>329839.42</td>
      <td>643694.26</td>
    </tr>
    <tr>
      <th>2502</th>
      <td>19400.42</td>
      <td>29115.13</td>
      <td>1673650.0</td>
      <td>16324</td>
      <td>233550.76</td>
      <td>493210.86</td>
    </tr>
    <tr>
      <th>2505</th>
      <td>13053.55</td>
      <td>19590.34</td>
      <td>1343403.0</td>
      <td>11095</td>
      <td>151268.66</td>
      <td>301984.16</td>
    </tr>
    <tr>
      <th>2506</th>
      <td>22985.48</td>
      <td>34496.32</td>
      <td>2105975.0</td>
      <td>21030</td>
      <td>311469.70</td>
      <td>623637.08</td>
    </tr>
    <tr>
      <th>2507</th>
      <td>4759.72</td>
      <td>7141.90</td>
      <td>561675.0</td>
      <td>6125</td>
      <td>61056.75</td>
      <td>128315.84</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>5185</th>
      <td>758.08</td>
      <td>1137.34</td>
      <td>72575.0</td>
      <td>880</td>
      <td>8888.39</td>
      <td>8888.39</td>
    </tr>
    <tr>
      <th>5186</th>
      <td>300.18</td>
      <td>450.38</td>
      <td>33525.0</td>
      <td>406</td>
      <td>3821.37</td>
      <td>3821.37</td>
    </tr>
    <tr>
      <th>5187</th>
      <td>3265.23</td>
      <td>4899.78</td>
      <td>248700.0</td>
      <td>1989</td>
      <td>19224.33</td>
      <td>20534.91</td>
    </tr>
    <tr>
      <th>5188</th>
      <td>491.56</td>
      <td>737.47</td>
      <td>45025.0</td>
      <td>476</td>
      <td>5208.12</td>
      <td>5208.12</td>
    </tr>
    <tr>
      <th>5189</th>
      <td>238.98</td>
      <td>358.52</td>
      <td>22500.0</td>
      <td>147</td>
      <td>2821.83</td>
      <td>2954.49</td>
    </tr>
    <tr>
      <th>5190</th>
      <td>998.36</td>
      <td>1499.37</td>
      <td>113000.0</td>
      <td>844</td>
      <td>11465.90</td>
      <td>11465.90</td>
    </tr>
    <tr>
      <th>5191</th>
      <td>121.56</td>
      <td>182.77</td>
      <td>16625.0</td>
      <td>210</td>
      <td>1890.12</td>
      <td>1890.12</td>
    </tr>
    <tr>
      <th>5192</th>
      <td>151.82</td>
      <td>228.43</td>
      <td>15000.0</td>
      <td>158</td>
      <td>1992.48</td>
      <td>1992.48</td>
    </tr>
    <tr>
      <th>5193</th>
      <td>272.95</td>
      <td>410.01</td>
      <td>34025.0</td>
      <td>585</td>
      <td>5418.33</td>
      <td>5418.33</td>
    </tr>
    <tr>
      <th>5195</th>
      <td>480.31</td>
      <td>720.99</td>
      <td>40400.0</td>
      <td>347</td>
      <td>4293.86</td>
      <td>4319.69</td>
    </tr>
    <tr>
      <th>5196</th>
      <td>1660.44</td>
      <td>2491.21</td>
      <td>125400.0</td>
      <td>707</td>
      <td>7403.48</td>
      <td>7403.48</td>
    </tr>
    <tr>
      <th>5198</th>
      <td>7203.97</td>
      <td>10809.54</td>
      <td>565175.0</td>
      <td>8099</td>
      <td>64799.06</td>
      <td>68218.74</td>
    </tr>
    <tr>
      <th>5199</th>
      <td>2191.90</td>
      <td>3291.25</td>
      <td>189475.0</td>
      <td>2576</td>
      <td>21208.58</td>
      <td>21888.34</td>
    </tr>
    <tr>
      <th>5201</th>
      <td>58.29</td>
      <td>87.45</td>
      <td>4575.0</td>
      <td>108</td>
      <td>986.46</td>
      <td>986.46</td>
    </tr>
    <tr>
      <th>5202</th>
      <td>519.98</td>
      <td>780.12</td>
      <td>44050.0</td>
      <td>335</td>
      <td>4207.66</td>
      <td>4207.66</td>
    </tr>
    <tr>
      <th>5203</th>
      <td>1916.93</td>
      <td>2878.93</td>
      <td>215875.0</td>
      <td>1758</td>
      <td>21222.75</td>
      <td>21267.75</td>
    </tr>
    <tr>
      <th>5204</th>
      <td>2112.50</td>
      <td>3169.34</td>
      <td>155850.0</td>
      <td>1803</td>
      <td>13368.79</td>
      <td>13920.13</td>
    </tr>
    <tr>
      <th>5205</th>
      <td>1089.71</td>
      <td>1638.27</td>
      <td>121875.0</td>
      <td>308</td>
      <td>4060.15</td>
      <td>4060.15</td>
    </tr>
    <tr>
      <th>5206</th>
      <td>2480.59</td>
      <td>3724.36</td>
      <td>286600.0</td>
      <td>1875</td>
      <td>22234.02</td>
      <td>22234.02</td>
    </tr>
    <tr>
      <th>5207</th>
      <td>4447.60</td>
      <td>6672.40</td>
      <td>338225.0</td>
      <td>5862</td>
      <td>52388.65</td>
      <td>55011.42</td>
    </tr>
    <tr>
      <th>5211</th>
      <td>1544.97</td>
      <td>2318.61</td>
      <td>132075.0</td>
      <td>1187</td>
      <td>14401.59</td>
      <td>14815.47</td>
    </tr>
    <tr>
      <th>5212</th>
      <td>802.95</td>
      <td>1204.74</td>
      <td>77400.0</td>
      <td>663</td>
      <td>4651.89</td>
      <td>4845.15</td>
    </tr>
    <tr>
      <th>5213</th>
      <td>612.34</td>
      <td>918.94</td>
      <td>72100.0</td>
      <td>508</td>
      <td>3540.58</td>
      <td>3540.58</td>
    </tr>
    <tr>
      <th>5215</th>
      <td>4951.98</td>
      <td>7432.70</td>
      <td>426600.0</td>
      <td>2094</td>
      <td>25209.33</td>
      <td>25903.47</td>
    </tr>
    <tr>
      <th>9001</th>
      <td>673.92</td>
      <td>1010.96</td>
      <td>26250.0</td>
      <td>872</td>
      <td>22355.76</td>
      <td>65118.00</td>
    </tr>
    <tr>
      <th>9002</th>
      <td>874.72</td>
      <td>1312.35</td>
      <td>39375.0</td>
      <td>1429</td>
      <td>28283.60</td>
      <td>72919.88</td>
    </tr>
    <tr>
      <th>9010</th>
      <td>38.74</td>
      <td>58.12</td>
      <td>2250.0</td>
      <td>36</td>
      <td>697.44</td>
      <td>12405.06</td>
    </tr>
    <tr>
      <th>9013</th>
      <td>145.30</td>
      <td>218.00</td>
      <td>13500.0</td>
      <td>495</td>
      <td>6191.34</td>
      <td>7016.94</td>
    </tr>
    <tr>
      <th>9022</th>
      <td>10.34</td>
      <td>15.51</td>
      <td>750.0</td>
      <td>42</td>
      <td>651.42</td>
      <td>4643.52</td>
    </tr>
    <tr>
      <th>9023</th>
      <td>35.18</td>
      <td>52.78</td>
      <td>1500.0</td>
      <td>48</td>
      <td>1266.72</td>
      <td>6650.28</td>
    </tr>
  </tbody>
</table>
<p>1290 rows × 6 columns</p>
</div>




```python
# run only once!!
#df_2016_group = df_2016_group.join(df_2016_f3m_group)
```


```python
df_2016_group
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
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottle_Volume</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
      <th>Sale_f3m</th>
    </tr>
    <tr>
      <th>Store_Number</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2106</th>
      <td>12850.99</td>
      <td>19282.87</td>
      <td>1125075.0</td>
      <td>23579</td>
      <td>337446.81</td>
      <td>674970.58</td>
    </tr>
    <tr>
      <th>2113</th>
      <td>4132.16</td>
      <td>6201.13</td>
      <td>369000.0</td>
      <td>1701</td>
      <td>21663.33</td>
      <td>44088.49</td>
    </tr>
    <tr>
      <th>2130</th>
      <td>10399.76</td>
      <td>15603.80</td>
      <td>969925.0</td>
      <td>19730</td>
      <td>303978.69</td>
      <td>584706.73</td>
    </tr>
    <tr>
      <th>2152</th>
      <td>2053.31</td>
      <td>3085.95</td>
      <td>229500.0</td>
      <td>749</td>
      <td>9307.75</td>
      <td>30557.35</td>
    </tr>
    <tr>
      <th>2178</th>
      <td>6156.75</td>
      <td>9243.32</td>
      <td>617275.0</td>
      <td>4525</td>
      <td>58749.04</td>
      <td>113351.32</td>
    </tr>
    <tr>
      <th>2190</th>
      <td>39487.76</td>
      <td>59250.94</td>
      <td>2512300.0</td>
      <td>24528</td>
      <td>320989.41</td>
      <td>588918.84</td>
    </tr>
    <tr>
      <th>2191</th>
      <td>16765.65</td>
      <td>25156.47</td>
      <td>1439725.0</td>
      <td>18680</td>
      <td>300110.12</td>
      <td>621613.57</td>
    </tr>
    <tr>
      <th>2200</th>
      <td>10802.71</td>
      <td>16212.11</td>
      <td>1060625.0</td>
      <td>3877</td>
      <td>55121.79</td>
      <td>100655.56</td>
    </tr>
    <tr>
      <th>2228</th>
      <td>6693.58</td>
      <td>10047.29</td>
      <td>636375.0</td>
      <td>3676</td>
      <td>42359.79</td>
      <td>93429.61</td>
    </tr>
    <tr>
      <th>2233</th>
      <td>5986.95</td>
      <td>8985.62</td>
      <td>517900.0</td>
      <td>4089</td>
      <td>55834.13</td>
      <td>124899.48</td>
    </tr>
    <tr>
      <th>2238</th>
      <td>248.81</td>
      <td>373.25</td>
      <td>13625.0</td>
      <td>155</td>
      <td>3536.14</td>
      <td>67424.00</td>
    </tr>
    <tr>
      <th>2248</th>
      <td>13603.11</td>
      <td>20412.58</td>
      <td>810178.0</td>
      <td>8406</td>
      <td>135672.49</td>
      <td>259254.49</td>
    </tr>
    <tr>
      <th>2285</th>
      <td>8799.50</td>
      <td>13201.49</td>
      <td>519328.0</td>
      <td>8499</td>
      <td>158089.70</td>
      <td>305425.42</td>
    </tr>
    <tr>
      <th>2290</th>
      <td>26050.73</td>
      <td>39093.25</td>
      <td>2338125.0</td>
      <td>9133</td>
      <td>123472.77</td>
      <td>245019.27</td>
    </tr>
    <tr>
      <th>2327</th>
      <td>4733.31</td>
      <td>7105.69</td>
      <td>469350.0</td>
      <td>1727</td>
      <td>21834.49</td>
      <td>42169.52</td>
    </tr>
    <tr>
      <th>2353</th>
      <td>3619.21</td>
      <td>5434.38</td>
      <td>396625.0</td>
      <td>2790</td>
      <td>39609.55</td>
      <td>186892.29</td>
    </tr>
    <tr>
      <th>2413</th>
      <td>11643.33</td>
      <td>17475.02</td>
      <td>1079550.0</td>
      <td>13245</td>
      <td>202172.93</td>
      <td>408276.65</td>
    </tr>
    <tr>
      <th>2445</th>
      <td>3390.98</td>
      <td>5087.91</td>
      <td>366625.0</td>
      <td>1439</td>
      <td>15689.80</td>
      <td>32628.95</td>
    </tr>
    <tr>
      <th>2448</th>
      <td>9695.30</td>
      <td>14549.18</td>
      <td>900100.0</td>
      <td>3281</td>
      <td>48335.87</td>
      <td>104102.19</td>
    </tr>
    <tr>
      <th>2459</th>
      <td>2129.15</td>
      <td>3198.55</td>
      <td>248350.0</td>
      <td>1270</td>
      <td>16299.95</td>
      <td>32304.72</td>
    </tr>
    <tr>
      <th>2465</th>
      <td>9502.05</td>
      <td>14259.12</td>
      <td>722500.0</td>
      <td>3579</td>
      <td>51830.14</td>
      <td>116170.72</td>
    </tr>
    <tr>
      <th>2475</th>
      <td>2420.12</td>
      <td>3633.80</td>
      <td>265075.0</td>
      <td>1986</td>
      <td>30402.43</td>
      <td>60040.18</td>
    </tr>
    <tr>
      <th>2478</th>
      <td>3115.92</td>
      <td>4674.40</td>
      <td>188750.0</td>
      <td>2478</td>
      <td>45426.18</td>
      <td>95977.11</td>
    </tr>
    <tr>
      <th>2498</th>
      <td>1090.77</td>
      <td>1637.69</td>
      <td>126975.0</td>
      <td>666</td>
      <td>6367.76</td>
      <td>11945.37</td>
    </tr>
    <tr>
      <th>2500</th>
      <td>33888.25</td>
      <td>50858.05</td>
      <td>2968400.0</td>
      <td>23360</td>
      <td>325682.73</td>
      <td>639287.75</td>
    </tr>
    <tr>
      <th>2501</th>
      <td>30086.97</td>
      <td>45161.31</td>
      <td>2636031.0</td>
      <td>24983</td>
      <td>329839.42</td>
      <td>643694.26</td>
    </tr>
    <tr>
      <th>2502</th>
      <td>19400.42</td>
      <td>29115.13</td>
      <td>1673650.0</td>
      <td>16324</td>
      <td>233550.76</td>
      <td>493210.86</td>
    </tr>
    <tr>
      <th>2505</th>
      <td>13053.55</td>
      <td>19590.34</td>
      <td>1343403.0</td>
      <td>11095</td>
      <td>151268.66</td>
      <td>301984.16</td>
    </tr>
    <tr>
      <th>2506</th>
      <td>22985.48</td>
      <td>34496.32</td>
      <td>2105975.0</td>
      <td>21030</td>
      <td>311469.70</td>
      <td>623637.08</td>
    </tr>
    <tr>
      <th>2507</th>
      <td>4759.72</td>
      <td>7141.90</td>
      <td>561675.0</td>
      <td>6125</td>
      <td>61056.75</td>
      <td>128315.84</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>5090</th>
      <td>782.73</td>
      <td>1174.26</td>
      <td>76425.0</td>
      <td>728</td>
      <td>6542.92</td>
      <td>20451.53</td>
    </tr>
    <tr>
      <th>5091</th>
      <td>1612.10</td>
      <td>2418.60</td>
      <td>152625.0</td>
      <td>1077</td>
      <td>8936.59</td>
      <td>19983.15</td>
    </tr>
    <tr>
      <th>5092</th>
      <td>1693.92</td>
      <td>2542.06</td>
      <td>159975.0</td>
      <td>1130</td>
      <td>12133.13</td>
      <td>27879.04</td>
    </tr>
    <tr>
      <th>5094</th>
      <td>268.11</td>
      <td>402.26</td>
      <td>22900.0</td>
      <td>836</td>
      <td>5855.74</td>
      <td>12141.23</td>
    </tr>
    <tr>
      <th>5096</th>
      <td>1938.68</td>
      <td>2909.89</td>
      <td>202000.0</td>
      <td>1373</td>
      <td>20838.86</td>
      <td>38873.54</td>
    </tr>
    <tr>
      <th>5097</th>
      <td>1186.43</td>
      <td>1781.00</td>
      <td>143000.0</td>
      <td>1550</td>
      <td>22713.56</td>
      <td>62399.69</td>
    </tr>
    <tr>
      <th>5098</th>
      <td>1493.41</td>
      <td>2240.64</td>
      <td>114300.0</td>
      <td>4962</td>
      <td>23991.48</td>
      <td>43448.03</td>
    </tr>
    <tr>
      <th>5099</th>
      <td>619.23</td>
      <td>929.39</td>
      <td>62275.0</td>
      <td>593</td>
      <td>6454.59</td>
      <td>14070.43</td>
    </tr>
    <tr>
      <th>5100</th>
      <td>1773.11</td>
      <td>2660.29</td>
      <td>132475.0</td>
      <td>5683</td>
      <td>31055.10</td>
      <td>52126.23</td>
    </tr>
    <tr>
      <th>5101</th>
      <td>3531.18</td>
      <td>5298.93</td>
      <td>346425.0</td>
      <td>4298</td>
      <td>33488.19</td>
      <td>50898.06</td>
    </tr>
    <tr>
      <th>5102</th>
      <td>22926.64</td>
      <td>34399.53</td>
      <td>1850325.0</td>
      <td>42964</td>
      <td>599570.40</td>
      <td>924173.61</td>
    </tr>
    <tr>
      <th>5103</th>
      <td>1072.29</td>
      <td>1608.67</td>
      <td>93175.0</td>
      <td>462</td>
      <td>5216.57</td>
      <td>6557.22</td>
    </tr>
    <tr>
      <th>5104</th>
      <td>1628.93</td>
      <td>2444.07</td>
      <td>156250.0</td>
      <td>286</td>
      <td>4554.12</td>
      <td>22980.25</td>
    </tr>
    <tr>
      <th>5105</th>
      <td>10765.76</td>
      <td>16154.45</td>
      <td>935275.0</td>
      <td>8172</td>
      <td>117737.71</td>
      <td>154365.30</td>
    </tr>
    <tr>
      <th>5106</th>
      <td>3816.74</td>
      <td>5730.55</td>
      <td>472400.0</td>
      <td>4924</td>
      <td>61190.56</td>
      <td>83928.93</td>
    </tr>
    <tr>
      <th>5108</th>
      <td>2485.98</td>
      <td>3730.63</td>
      <td>242675.0</td>
      <td>2347</td>
      <td>18294.74</td>
      <td>28329.57</td>
    </tr>
    <tr>
      <th>5112</th>
      <td>488.63</td>
      <td>733.04</td>
      <td>43750.0</td>
      <td>454</td>
      <td>7615.26</td>
      <td>15333.88</td>
    </tr>
    <tr>
      <th>5113</th>
      <td>2063.67</td>
      <td>3096.40</td>
      <td>165303.0</td>
      <td>4623</td>
      <td>26766.06</td>
      <td>38569.26</td>
    </tr>
    <tr>
      <th>5114</th>
      <td>305.86</td>
      <td>458.89</td>
      <td>28575.0</td>
      <td>492</td>
      <td>4472.34</td>
      <td>8028.87</td>
    </tr>
    <tr>
      <th>5115</th>
      <td>618.93</td>
      <td>928.97</td>
      <td>67750.0</td>
      <td>781</td>
      <td>6862.30</td>
      <td>12851.73</td>
    </tr>
    <tr>
      <th>5116</th>
      <td>4107.07</td>
      <td>6166.96</td>
      <td>419775.0</td>
      <td>5252</td>
      <td>42859.09</td>
      <td>60366.11</td>
    </tr>
    <tr>
      <th>5119</th>
      <td>410.23</td>
      <td>615.81</td>
      <td>56625.0</td>
      <td>304</td>
      <td>3990.90</td>
      <td>5435.70</td>
    </tr>
    <tr>
      <th>5123</th>
      <td>3565.99</td>
      <td>5355.41</td>
      <td>427750.0</td>
      <td>3921</td>
      <td>56780.91</td>
      <td>58783.65</td>
    </tr>
    <tr>
      <th>5128</th>
      <td>5327.60</td>
      <td>7998.83</td>
      <td>631800.0</td>
      <td>5624</td>
      <td>60277.44</td>
      <td>64693.83</td>
    </tr>
    <tr>
      <th>9001</th>
      <td>673.92</td>
      <td>1010.96</td>
      <td>26250.0</td>
      <td>872</td>
      <td>22355.76</td>
      <td>65118.00</td>
    </tr>
    <tr>
      <th>9002</th>
      <td>874.72</td>
      <td>1312.35</td>
      <td>39375.0</td>
      <td>1429</td>
      <td>28283.60</td>
      <td>72919.88</td>
    </tr>
    <tr>
      <th>9010</th>
      <td>38.74</td>
      <td>58.12</td>
      <td>2250.0</td>
      <td>36</td>
      <td>697.44</td>
      <td>12405.06</td>
    </tr>
    <tr>
      <th>9013</th>
      <td>145.30</td>
      <td>218.00</td>
      <td>13500.0</td>
      <td>495</td>
      <td>6191.34</td>
      <td>7016.94</td>
    </tr>
    <tr>
      <th>9022</th>
      <td>10.34</td>
      <td>15.51</td>
      <td>750.0</td>
      <td>42</td>
      <td>651.42</td>
      <td>4643.52</td>
    </tr>
    <tr>
      <th>9023</th>
      <td>35.18</td>
      <td>52.78</td>
      <td>1500.0</td>
      <td>48</td>
      <td>1266.72</td>
      <td>6650.28</td>
    </tr>
  </tbody>
</table>
<p>1199 rows × 6 columns</p>
</div>




```python
df_2015_group.dropna()
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
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottle_Volume</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
      <th>Sale_f3m</th>
    </tr>
    <tr>
      <th>Store_Number</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2106</th>
      <td>55019.19</td>
      <td>82582.34</td>
      <td>4639675.0</td>
      <td>99957</td>
      <td>1433451.46</td>
      <td>337166.53</td>
    </tr>
    <tr>
      <th>2113</th>
      <td>14469.12</td>
      <td>21725.74</td>
      <td>1313875.0</td>
      <td>6483</td>
      <td>85763.42</td>
      <td>22351.86</td>
    </tr>
    <tr>
      <th>2130</th>
      <td>40541.36</td>
      <td>60849.63</td>
      <td>3645525.0</td>
      <td>72544</td>
      <td>1107685.25</td>
      <td>277764.46</td>
    </tr>
    <tr>
      <th>2152</th>
      <td>12311.88</td>
      <td>18507.48</td>
      <td>1513250.0</td>
      <td>5928</td>
      <td>72080.36</td>
      <td>16805.11</td>
    </tr>
    <tr>
      <th>2178</th>
      <td>26665.46</td>
      <td>40070.07</td>
      <td>2739775.0</td>
      <td>20504</td>
      <td>277987.96</td>
      <td>54411.42</td>
    </tr>
    <tr>
      <th>2190</th>
      <td>152643.66</td>
      <td>229161.33</td>
      <td>10382625.0</td>
      <td>107479</td>
      <td>1226205.17</td>
      <td>255392.25</td>
    </tr>
    <tr>
      <th>2191</th>
      <td>63279.89</td>
      <td>94971.07</td>
      <td>5419875.0</td>
      <td>79006</td>
      <td>1275405.26</td>
      <td>318985.32</td>
    </tr>
    <tr>
      <th>2200</th>
      <td>45107.16</td>
      <td>67728.01</td>
      <td>4384000.0</td>
      <td>15409</td>
      <td>223899.24</td>
      <td>45340.33</td>
    </tr>
    <tr>
      <th>2205</th>
      <td>29443.78</td>
      <td>44214.11</td>
      <td>2540650.0</td>
      <td>17863</td>
      <td>230898.31</td>
      <td>57849.23</td>
    </tr>
    <tr>
      <th>2228</th>
      <td>28134.17</td>
      <td>42250.12</td>
      <td>2693025.0</td>
      <td>14932</td>
      <td>188879.70</td>
      <td>51031.04</td>
    </tr>
    <tr>
      <th>2233</th>
      <td>30886.50</td>
      <td>46379.74</td>
      <td>2682850.0</td>
      <td>22166</td>
      <td>316855.05</td>
      <td>68657.91</td>
    </tr>
    <tr>
      <th>2238</th>
      <td>6439.28</td>
      <td>9661.22</td>
      <td>460625.0</td>
      <td>6631</td>
      <td>105057.79</td>
      <td>4151.93</td>
    </tr>
    <tr>
      <th>2248</th>
      <td>66289.16</td>
      <td>99517.87</td>
      <td>3972184.0</td>
      <td>35557</td>
      <td>659252.26</td>
      <td>121837.56</td>
    </tr>
    <tr>
      <th>2285</th>
      <td>43045.96</td>
      <td>64633.23</td>
      <td>2661875.0</td>
      <td>44267</td>
      <td>776397.91</td>
      <td>146513.09</td>
    </tr>
    <tr>
      <th>2290</th>
      <td>86172.50</td>
      <td>129369.91</td>
      <td>7678528.0</td>
      <td>39455</td>
      <td>549295.90</td>
      <td>118934.06</td>
    </tr>
    <tr>
      <th>2327</th>
      <td>18103.82</td>
      <td>27171.39</td>
      <td>1757403.0</td>
      <td>8446</td>
      <td>100596.80</td>
      <td>20335.03</td>
    </tr>
    <tr>
      <th>2353</th>
      <td>36043.85</td>
      <td>54155.74</td>
      <td>3665628.0</td>
      <td>33615</td>
      <td>485145.13</td>
      <td>110482.20</td>
    </tr>
    <tr>
      <th>2367</th>
      <td>5171.83</td>
      <td>7762.79</td>
      <td>513225.0</td>
      <td>5594</td>
      <td>65149.11</td>
      <td>39434.77</td>
    </tr>
    <tr>
      <th>2413</th>
      <td>48180.28</td>
      <td>72338.39</td>
      <td>4516900.0</td>
      <td>55573</td>
      <td>835742.87</td>
      <td>204237.78</td>
    </tr>
    <tr>
      <th>2445</th>
      <td>15806.63</td>
      <td>23735.01</td>
      <td>1718125.0</td>
      <td>6329</td>
      <td>71682.86</td>
      <td>16939.15</td>
    </tr>
    <tr>
      <th>2448</th>
      <td>43175.85</td>
      <td>64818.70</td>
      <td>3981625.0</td>
      <td>13836</td>
      <td>203038.62</td>
      <td>55498.12</td>
    </tr>
    <tr>
      <th>2459</th>
      <td>9176.42</td>
      <td>13792.65</td>
      <td>1080400.0</td>
      <td>6379</td>
      <td>79026.65</td>
      <td>15983.98</td>
    </tr>
    <tr>
      <th>2460</th>
      <td>32564.14</td>
      <td>48902.56</td>
      <td>3264200.0</td>
      <td>22961</td>
      <td>301694.40</td>
      <td>71758.66</td>
    </tr>
    <tr>
      <th>2465</th>
      <td>45964.55</td>
      <td>69004.52</td>
      <td>3627725.0</td>
      <td>18293</td>
      <td>264728.41</td>
      <td>62988.17</td>
    </tr>
    <tr>
      <th>2475</th>
      <td>8864.98</td>
      <td>13317.48</td>
      <td>1040000.0</td>
      <td>7801</td>
      <td>121763.29</td>
      <td>29637.75</td>
    </tr>
    <tr>
      <th>2478</th>
      <td>12134.70</td>
      <td>18204.01</td>
      <td>819250.0</td>
      <td>11196</td>
      <td>198550.40</td>
      <td>48759.71</td>
    </tr>
    <tr>
      <th>2487</th>
      <td>38762.32</td>
      <td>58237.32</td>
      <td>4001075.0</td>
      <td>23145</td>
      <td>293643.02</td>
      <td>89736.70</td>
    </tr>
    <tr>
      <th>2498</th>
      <td>4540.91</td>
      <td>6826.84</td>
      <td>576600.0</td>
      <td>2840</td>
      <td>27453.07</td>
      <td>5577.61</td>
    </tr>
    <tr>
      <th>2500</th>
      <td>125788.26</td>
      <td>188916.82</td>
      <td>10949203.0</td>
      <td>98526</td>
      <td>1354990.08</td>
      <td>310035.66</td>
    </tr>
    <tr>
      <th>2501</th>
      <td>132264.89</td>
      <td>198707.39</td>
      <td>11455684.0</td>
      <td>102095</td>
      <td>1377465.13</td>
      <td>310718.21</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>5091</th>
      <td>3692.24</td>
      <td>5542.27</td>
      <td>341575.0</td>
      <td>3316</td>
      <td>30876.44</td>
      <td>11046.56</td>
    </tr>
    <tr>
      <th>5092</th>
      <td>5855.63</td>
      <td>8788.20</td>
      <td>523825.0</td>
      <td>4517</td>
      <td>51100.71</td>
      <td>15648.81</td>
    </tr>
    <tr>
      <th>5093</th>
      <td>18773.32</td>
      <td>28186.48</td>
      <td>1622475.0</td>
      <td>9178</td>
      <td>99586.06</td>
      <td>29251.18</td>
    </tr>
    <tr>
      <th>5094</th>
      <td>1288.43</td>
      <td>1933.73</td>
      <td>118200.0</td>
      <td>1983</td>
      <td>14327.23</td>
      <td>6285.49</td>
    </tr>
    <tr>
      <th>5096</th>
      <td>6639.17</td>
      <td>9973.23</td>
      <td>617375.0</td>
      <td>4352</td>
      <td>71490.84</td>
      <td>17333.76</td>
    </tr>
    <tr>
      <th>5097</th>
      <td>6062.03</td>
      <td>9109.57</td>
      <td>731125.0</td>
      <td>9078</td>
      <td>123882.25</td>
      <td>39686.13</td>
    </tr>
    <tr>
      <th>5098</th>
      <td>6604.64</td>
      <td>9910.40</td>
      <td>508000.0</td>
      <td>19184</td>
      <td>100442.05</td>
      <td>18166.40</td>
    </tr>
    <tr>
      <th>5099</th>
      <td>2121.79</td>
      <td>3186.79</td>
      <td>207525.0</td>
      <td>1918</td>
      <td>20721.55</td>
      <td>7615.84</td>
    </tr>
    <tr>
      <th>5100</th>
      <td>5268.11</td>
      <td>7903.85</td>
      <td>399950.0</td>
      <td>19701</td>
      <td>109536.24</td>
      <td>20298.09</td>
    </tr>
    <tr>
      <th>5101</th>
      <td>7754.30</td>
      <td>11642.38</td>
      <td>776125.0</td>
      <td>11584</td>
      <td>88825.14</td>
      <td>16363.86</td>
    </tr>
    <tr>
      <th>5102</th>
      <td>81591.24</td>
      <td>122460.94</td>
      <td>6667450.0</td>
      <td>138300</td>
      <td>1951393.22</td>
      <td>321727.56</td>
    </tr>
    <tr>
      <th>5103</th>
      <td>2758.78</td>
      <td>4140.06</td>
      <td>224200.0</td>
      <td>1083</td>
      <td>12924.97</td>
      <td>1340.65</td>
    </tr>
    <tr>
      <th>5104</th>
      <td>29202.00</td>
      <td>43853.51</td>
      <td>2360050.0</td>
      <td>6103</td>
      <td>100995.41</td>
      <td>18426.13</td>
    </tr>
    <tr>
      <th>5105</th>
      <td>46166.84</td>
      <td>69315.05</td>
      <td>3847600.0</td>
      <td>32424</td>
      <td>482906.49</td>
      <td>35800.91</td>
    </tr>
    <tr>
      <th>5106</th>
      <td>12303.06</td>
      <td>18502.70</td>
      <td>1537700.0</td>
      <td>18940</td>
      <td>241120.84</td>
      <td>22723.38</td>
    </tr>
    <tr>
      <th>5108</th>
      <td>7455.56</td>
      <td>11190.33</td>
      <td>743050.0</td>
      <td>8273</td>
      <td>60238.69</td>
      <td>9829.29</td>
    </tr>
    <tr>
      <th>5112</th>
      <td>2747.80</td>
      <td>4123.79</td>
      <td>232375.0</td>
      <td>2379</td>
      <td>38465.05</td>
      <td>7667.62</td>
    </tr>
    <tr>
      <th>5113</th>
      <td>7853.22</td>
      <td>11782.74</td>
      <td>591900.0</td>
      <td>18747</td>
      <td>108094.57</td>
      <td>9977.58</td>
    </tr>
    <tr>
      <th>5114</th>
      <td>957.92</td>
      <td>1438.22</td>
      <td>93325.0</td>
      <td>954</td>
      <td>9555.45</td>
      <td>3556.53</td>
    </tr>
    <tr>
      <th>5115</th>
      <td>1997.59</td>
      <td>3000.22</td>
      <td>207700.0</td>
      <td>2763</td>
      <td>24917.04</td>
      <td>5989.43</td>
    </tr>
    <tr>
      <th>5116</th>
      <td>15883.52</td>
      <td>23832.07</td>
      <td>1411400.0</td>
      <td>14641</td>
      <td>128662.55</td>
      <td>16258.69</td>
    </tr>
    <tr>
      <th>5119</th>
      <td>2944.82</td>
      <td>4425.02</td>
      <td>319200.0</td>
      <td>1572</td>
      <td>23645.56</td>
      <td>1444.80</td>
    </tr>
    <tr>
      <th>5123</th>
      <td>14100.52</td>
      <td>21202.80</td>
      <td>1554800.0</td>
      <td>13046</td>
      <td>187448.46</td>
      <td>997.50</td>
    </tr>
    <tr>
      <th>5128</th>
      <td>17345.32</td>
      <td>26063.72</td>
      <td>2064725.0</td>
      <td>18059</td>
      <td>191781.25</td>
      <td>3855.58</td>
    </tr>
    <tr>
      <th>9001</th>
      <td>4662.93</td>
      <td>6994.95</td>
      <td>187500.0</td>
      <td>7186</td>
      <td>191820.12</td>
      <td>42762.24</td>
    </tr>
    <tr>
      <th>9002</th>
      <td>5705.65</td>
      <td>8560.25</td>
      <td>256875.0</td>
      <td>17837</td>
      <td>327676.62</td>
      <td>44636.28</td>
    </tr>
    <tr>
      <th>9010</th>
      <td>960.52</td>
      <td>1441.05</td>
      <td>56850.0</td>
      <td>1510</td>
      <td>26209.38</td>
      <td>11707.62</td>
    </tr>
    <tr>
      <th>9013</th>
      <td>487.98</td>
      <td>732.16</td>
      <td>40750.0</td>
      <td>3081</td>
      <td>30957.66</td>
      <td>825.60</td>
    </tr>
    <tr>
      <th>9022</th>
      <td>12.67</td>
      <td>19.01</td>
      <td>750.0</td>
      <td>210</td>
      <td>3992.10</td>
      <td>3992.10</td>
    </tr>
    <tr>
      <th>9023</th>
      <td>123.13</td>
      <td>184.73</td>
      <td>5250.0</td>
      <td>324</td>
      <td>8550.36</td>
      <td>5383.56</td>
    </tr>
  </tbody>
</table>
<p>1281 rows × 6 columns</p>
</div>




```python
#run only once
#df_2015_group = df_2015_group.dropna()
```


```python
mask = df_2016_group.index.isin(df_2015_group.index)
# run once
#df_2016_group = df_2016_group[mask]
```


```python
len(mask)
```




    1290




```python
mask.sum()
```




    1199




```python
df_2016_group
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
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottle_Volume</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
      <th>Sale_f3m</th>
    </tr>
    <tr>
      <th>Store_Number</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2106</th>
      <td>12850.99</td>
      <td>19282.87</td>
      <td>1125075.0</td>
      <td>23579</td>
      <td>337446.81</td>
      <td>674970.58</td>
    </tr>
    <tr>
      <th>2113</th>
      <td>4132.16</td>
      <td>6201.13</td>
      <td>369000.0</td>
      <td>1701</td>
      <td>21663.33</td>
      <td>44088.49</td>
    </tr>
    <tr>
      <th>2130</th>
      <td>10399.76</td>
      <td>15603.80</td>
      <td>969925.0</td>
      <td>19730</td>
      <td>303978.69</td>
      <td>584706.73</td>
    </tr>
    <tr>
      <th>2152</th>
      <td>2053.31</td>
      <td>3085.95</td>
      <td>229500.0</td>
      <td>749</td>
      <td>9307.75</td>
      <td>30557.35</td>
    </tr>
    <tr>
      <th>2178</th>
      <td>6156.75</td>
      <td>9243.32</td>
      <td>617275.0</td>
      <td>4525</td>
      <td>58749.04</td>
      <td>113351.32</td>
    </tr>
    <tr>
      <th>2190</th>
      <td>39487.76</td>
      <td>59250.94</td>
      <td>2512300.0</td>
      <td>24528</td>
      <td>320989.41</td>
      <td>588918.84</td>
    </tr>
    <tr>
      <th>2191</th>
      <td>16765.65</td>
      <td>25156.47</td>
      <td>1439725.0</td>
      <td>18680</td>
      <td>300110.12</td>
      <td>621613.57</td>
    </tr>
    <tr>
      <th>2200</th>
      <td>10802.71</td>
      <td>16212.11</td>
      <td>1060625.0</td>
      <td>3877</td>
      <td>55121.79</td>
      <td>100655.56</td>
    </tr>
    <tr>
      <th>2228</th>
      <td>6693.58</td>
      <td>10047.29</td>
      <td>636375.0</td>
      <td>3676</td>
      <td>42359.79</td>
      <td>93429.61</td>
    </tr>
    <tr>
      <th>2233</th>
      <td>5986.95</td>
      <td>8985.62</td>
      <td>517900.0</td>
      <td>4089</td>
      <td>55834.13</td>
      <td>124899.48</td>
    </tr>
    <tr>
      <th>2238</th>
      <td>248.81</td>
      <td>373.25</td>
      <td>13625.0</td>
      <td>155</td>
      <td>3536.14</td>
      <td>67424.00</td>
    </tr>
    <tr>
      <th>2248</th>
      <td>13603.11</td>
      <td>20412.58</td>
      <td>810178.0</td>
      <td>8406</td>
      <td>135672.49</td>
      <td>259254.49</td>
    </tr>
    <tr>
      <th>2285</th>
      <td>8799.50</td>
      <td>13201.49</td>
      <td>519328.0</td>
      <td>8499</td>
      <td>158089.70</td>
      <td>305425.42</td>
    </tr>
    <tr>
      <th>2290</th>
      <td>26050.73</td>
      <td>39093.25</td>
      <td>2338125.0</td>
      <td>9133</td>
      <td>123472.77</td>
      <td>245019.27</td>
    </tr>
    <tr>
      <th>2327</th>
      <td>4733.31</td>
      <td>7105.69</td>
      <td>469350.0</td>
      <td>1727</td>
      <td>21834.49</td>
      <td>42169.52</td>
    </tr>
    <tr>
      <th>2353</th>
      <td>3619.21</td>
      <td>5434.38</td>
      <td>396625.0</td>
      <td>2790</td>
      <td>39609.55</td>
      <td>186892.29</td>
    </tr>
    <tr>
      <th>2413</th>
      <td>11643.33</td>
      <td>17475.02</td>
      <td>1079550.0</td>
      <td>13245</td>
      <td>202172.93</td>
      <td>408276.65</td>
    </tr>
    <tr>
      <th>2445</th>
      <td>3390.98</td>
      <td>5087.91</td>
      <td>366625.0</td>
      <td>1439</td>
      <td>15689.80</td>
      <td>32628.95</td>
    </tr>
    <tr>
      <th>2448</th>
      <td>9695.30</td>
      <td>14549.18</td>
      <td>900100.0</td>
      <td>3281</td>
      <td>48335.87</td>
      <td>104102.19</td>
    </tr>
    <tr>
      <th>2459</th>
      <td>2129.15</td>
      <td>3198.55</td>
      <td>248350.0</td>
      <td>1270</td>
      <td>16299.95</td>
      <td>32304.72</td>
    </tr>
    <tr>
      <th>2465</th>
      <td>9502.05</td>
      <td>14259.12</td>
      <td>722500.0</td>
      <td>3579</td>
      <td>51830.14</td>
      <td>116170.72</td>
    </tr>
    <tr>
      <th>2475</th>
      <td>2420.12</td>
      <td>3633.80</td>
      <td>265075.0</td>
      <td>1986</td>
      <td>30402.43</td>
      <td>60040.18</td>
    </tr>
    <tr>
      <th>2478</th>
      <td>3115.92</td>
      <td>4674.40</td>
      <td>188750.0</td>
      <td>2478</td>
      <td>45426.18</td>
      <td>95977.11</td>
    </tr>
    <tr>
      <th>2498</th>
      <td>1090.77</td>
      <td>1637.69</td>
      <td>126975.0</td>
      <td>666</td>
      <td>6367.76</td>
      <td>11945.37</td>
    </tr>
    <tr>
      <th>2500</th>
      <td>33888.25</td>
      <td>50858.05</td>
      <td>2968400.0</td>
      <td>23360</td>
      <td>325682.73</td>
      <td>639287.75</td>
    </tr>
    <tr>
      <th>2501</th>
      <td>30086.97</td>
      <td>45161.31</td>
      <td>2636031.0</td>
      <td>24983</td>
      <td>329839.42</td>
      <td>643694.26</td>
    </tr>
    <tr>
      <th>2502</th>
      <td>19400.42</td>
      <td>29115.13</td>
      <td>1673650.0</td>
      <td>16324</td>
      <td>233550.76</td>
      <td>493210.86</td>
    </tr>
    <tr>
      <th>2505</th>
      <td>13053.55</td>
      <td>19590.34</td>
      <td>1343403.0</td>
      <td>11095</td>
      <td>151268.66</td>
      <td>301984.16</td>
    </tr>
    <tr>
      <th>2506</th>
      <td>22985.48</td>
      <td>34496.32</td>
      <td>2105975.0</td>
      <td>21030</td>
      <td>311469.70</td>
      <td>623637.08</td>
    </tr>
    <tr>
      <th>2507</th>
      <td>4759.72</td>
      <td>7141.90</td>
      <td>561675.0</td>
      <td>6125</td>
      <td>61056.75</td>
      <td>128315.84</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>5090</th>
      <td>782.73</td>
      <td>1174.26</td>
      <td>76425.0</td>
      <td>728</td>
      <td>6542.92</td>
      <td>20451.53</td>
    </tr>
    <tr>
      <th>5091</th>
      <td>1612.10</td>
      <td>2418.60</td>
      <td>152625.0</td>
      <td>1077</td>
      <td>8936.59</td>
      <td>19983.15</td>
    </tr>
    <tr>
      <th>5092</th>
      <td>1693.92</td>
      <td>2542.06</td>
      <td>159975.0</td>
      <td>1130</td>
      <td>12133.13</td>
      <td>27879.04</td>
    </tr>
    <tr>
      <th>5094</th>
      <td>268.11</td>
      <td>402.26</td>
      <td>22900.0</td>
      <td>836</td>
      <td>5855.74</td>
      <td>12141.23</td>
    </tr>
    <tr>
      <th>5096</th>
      <td>1938.68</td>
      <td>2909.89</td>
      <td>202000.0</td>
      <td>1373</td>
      <td>20838.86</td>
      <td>38873.54</td>
    </tr>
    <tr>
      <th>5097</th>
      <td>1186.43</td>
      <td>1781.00</td>
      <td>143000.0</td>
      <td>1550</td>
      <td>22713.56</td>
      <td>62399.69</td>
    </tr>
    <tr>
      <th>5098</th>
      <td>1493.41</td>
      <td>2240.64</td>
      <td>114300.0</td>
      <td>4962</td>
      <td>23991.48</td>
      <td>43448.03</td>
    </tr>
    <tr>
      <th>5099</th>
      <td>619.23</td>
      <td>929.39</td>
      <td>62275.0</td>
      <td>593</td>
      <td>6454.59</td>
      <td>14070.43</td>
    </tr>
    <tr>
      <th>5100</th>
      <td>1773.11</td>
      <td>2660.29</td>
      <td>132475.0</td>
      <td>5683</td>
      <td>31055.10</td>
      <td>52126.23</td>
    </tr>
    <tr>
      <th>5101</th>
      <td>3531.18</td>
      <td>5298.93</td>
      <td>346425.0</td>
      <td>4298</td>
      <td>33488.19</td>
      <td>50898.06</td>
    </tr>
    <tr>
      <th>5102</th>
      <td>22926.64</td>
      <td>34399.53</td>
      <td>1850325.0</td>
      <td>42964</td>
      <td>599570.40</td>
      <td>924173.61</td>
    </tr>
    <tr>
      <th>5103</th>
      <td>1072.29</td>
      <td>1608.67</td>
      <td>93175.0</td>
      <td>462</td>
      <td>5216.57</td>
      <td>6557.22</td>
    </tr>
    <tr>
      <th>5104</th>
      <td>1628.93</td>
      <td>2444.07</td>
      <td>156250.0</td>
      <td>286</td>
      <td>4554.12</td>
      <td>22980.25</td>
    </tr>
    <tr>
      <th>5105</th>
      <td>10765.76</td>
      <td>16154.45</td>
      <td>935275.0</td>
      <td>8172</td>
      <td>117737.71</td>
      <td>154365.30</td>
    </tr>
    <tr>
      <th>5106</th>
      <td>3816.74</td>
      <td>5730.55</td>
      <td>472400.0</td>
      <td>4924</td>
      <td>61190.56</td>
      <td>83928.93</td>
    </tr>
    <tr>
      <th>5108</th>
      <td>2485.98</td>
      <td>3730.63</td>
      <td>242675.0</td>
      <td>2347</td>
      <td>18294.74</td>
      <td>28329.57</td>
    </tr>
    <tr>
      <th>5112</th>
      <td>488.63</td>
      <td>733.04</td>
      <td>43750.0</td>
      <td>454</td>
      <td>7615.26</td>
      <td>15333.88</td>
    </tr>
    <tr>
      <th>5113</th>
      <td>2063.67</td>
      <td>3096.40</td>
      <td>165303.0</td>
      <td>4623</td>
      <td>26766.06</td>
      <td>38569.26</td>
    </tr>
    <tr>
      <th>5114</th>
      <td>305.86</td>
      <td>458.89</td>
      <td>28575.0</td>
      <td>492</td>
      <td>4472.34</td>
      <td>8028.87</td>
    </tr>
    <tr>
      <th>5115</th>
      <td>618.93</td>
      <td>928.97</td>
      <td>67750.0</td>
      <td>781</td>
      <td>6862.30</td>
      <td>12851.73</td>
    </tr>
    <tr>
      <th>5116</th>
      <td>4107.07</td>
      <td>6166.96</td>
      <td>419775.0</td>
      <td>5252</td>
      <td>42859.09</td>
      <td>60366.11</td>
    </tr>
    <tr>
      <th>5119</th>
      <td>410.23</td>
      <td>615.81</td>
      <td>56625.0</td>
      <td>304</td>
      <td>3990.90</td>
      <td>5435.70</td>
    </tr>
    <tr>
      <th>5123</th>
      <td>3565.99</td>
      <td>5355.41</td>
      <td>427750.0</td>
      <td>3921</td>
      <td>56780.91</td>
      <td>58783.65</td>
    </tr>
    <tr>
      <th>5128</th>
      <td>5327.60</td>
      <td>7998.83</td>
      <td>631800.0</td>
      <td>5624</td>
      <td>60277.44</td>
      <td>64693.83</td>
    </tr>
    <tr>
      <th>9001</th>
      <td>673.92</td>
      <td>1010.96</td>
      <td>26250.0</td>
      <td>872</td>
      <td>22355.76</td>
      <td>65118.00</td>
    </tr>
    <tr>
      <th>9002</th>
      <td>874.72</td>
      <td>1312.35</td>
      <td>39375.0</td>
      <td>1429</td>
      <td>28283.60</td>
      <td>72919.88</td>
    </tr>
    <tr>
      <th>9010</th>
      <td>38.74</td>
      <td>58.12</td>
      <td>2250.0</td>
      <td>36</td>
      <td>697.44</td>
      <td>12405.06</td>
    </tr>
    <tr>
      <th>9013</th>
      <td>145.30</td>
      <td>218.00</td>
      <td>13500.0</td>
      <td>495</td>
      <td>6191.34</td>
      <td>7016.94</td>
    </tr>
    <tr>
      <th>9022</th>
      <td>10.34</td>
      <td>15.51</td>
      <td>750.0</td>
      <td>42</td>
      <td>651.42</td>
      <td>4643.52</td>
    </tr>
    <tr>
      <th>9023</th>
      <td>35.18</td>
      <td>52.78</td>
      <td>1500.0</td>
      <td>48</td>
      <td>1266.72</td>
      <td>6650.28</td>
    </tr>
  </tbody>
</table>
<p>1199 rows × 6 columns</p>
</div>



# Refine the data

Look for any statistical relationships, correlations, or other relevant properties of the dataset.

Many of the variables are highly correlated as seen in the heatmap graph in the plotting section, therefor producing a very high R-Score >98%. The R scores in statsmodel results indicated to take out a number of variables but the score remained quite high even when running on 2 different models. Additionally a number of stores particularly in the 3 largest cities in Iowa account for a large portion of annual revenue and heavily skewing the sales data by store to the right.

# Build your models

Using scikit-learn or statsmodels, build the necessary models for your scenario. Evaluate model fit.


```python
from matplotlib import pyplot as plt
import seaborn as sns


from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.cross_validation import cross_val_score, cross_val_predict
from sklearn import metrics


%matplotlib inline 
import numpy as np
import pandas as pd
```


```python
df_2015_group.dropna(inplace=True)

df_2015_group
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
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottle_Volume</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
      <th>Sale_f3m</th>
    </tr>
    <tr>
      <th>Store_Number</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2106</th>
      <td>55019.19</td>
      <td>82582.34</td>
      <td>4639675.0</td>
      <td>99957</td>
      <td>1433451.46</td>
      <td>337166.53</td>
    </tr>
    <tr>
      <th>2113</th>
      <td>14469.12</td>
      <td>21725.74</td>
      <td>1313875.0</td>
      <td>6483</td>
      <td>85763.42</td>
      <td>22351.86</td>
    </tr>
    <tr>
      <th>2130</th>
      <td>40541.36</td>
      <td>60849.63</td>
      <td>3645525.0</td>
      <td>72544</td>
      <td>1107685.25</td>
      <td>277764.46</td>
    </tr>
    <tr>
      <th>2152</th>
      <td>12311.88</td>
      <td>18507.48</td>
      <td>1513250.0</td>
      <td>5928</td>
      <td>72080.36</td>
      <td>16805.11</td>
    </tr>
    <tr>
      <th>2178</th>
      <td>26665.46</td>
      <td>40070.07</td>
      <td>2739775.0</td>
      <td>20504</td>
      <td>277987.96</td>
      <td>54411.42</td>
    </tr>
    <tr>
      <th>2190</th>
      <td>152643.66</td>
      <td>229161.33</td>
      <td>10382625.0</td>
      <td>107479</td>
      <td>1226205.17</td>
      <td>255392.25</td>
    </tr>
    <tr>
      <th>2191</th>
      <td>63279.89</td>
      <td>94971.07</td>
      <td>5419875.0</td>
      <td>79006</td>
      <td>1275405.26</td>
      <td>318985.32</td>
    </tr>
    <tr>
      <th>2200</th>
      <td>45107.16</td>
      <td>67728.01</td>
      <td>4384000.0</td>
      <td>15409</td>
      <td>223899.24</td>
      <td>45340.33</td>
    </tr>
    <tr>
      <th>2205</th>
      <td>29443.78</td>
      <td>44214.11</td>
      <td>2540650.0</td>
      <td>17863</td>
      <td>230898.31</td>
      <td>57849.23</td>
    </tr>
    <tr>
      <th>2228</th>
      <td>28134.17</td>
      <td>42250.12</td>
      <td>2693025.0</td>
      <td>14932</td>
      <td>188879.70</td>
      <td>51031.04</td>
    </tr>
    <tr>
      <th>2233</th>
      <td>30886.50</td>
      <td>46379.74</td>
      <td>2682850.0</td>
      <td>22166</td>
      <td>316855.05</td>
      <td>68657.91</td>
    </tr>
    <tr>
      <th>2238</th>
      <td>6439.28</td>
      <td>9661.22</td>
      <td>460625.0</td>
      <td>6631</td>
      <td>105057.79</td>
      <td>4151.93</td>
    </tr>
    <tr>
      <th>2248</th>
      <td>66289.16</td>
      <td>99517.87</td>
      <td>3972184.0</td>
      <td>35557</td>
      <td>659252.26</td>
      <td>121837.56</td>
    </tr>
    <tr>
      <th>2285</th>
      <td>43045.96</td>
      <td>64633.23</td>
      <td>2661875.0</td>
      <td>44267</td>
      <td>776397.91</td>
      <td>146513.09</td>
    </tr>
    <tr>
      <th>2290</th>
      <td>86172.50</td>
      <td>129369.91</td>
      <td>7678528.0</td>
      <td>39455</td>
      <td>549295.90</td>
      <td>118934.06</td>
    </tr>
    <tr>
      <th>2327</th>
      <td>18103.82</td>
      <td>27171.39</td>
      <td>1757403.0</td>
      <td>8446</td>
      <td>100596.80</td>
      <td>20335.03</td>
    </tr>
    <tr>
      <th>2353</th>
      <td>36043.85</td>
      <td>54155.74</td>
      <td>3665628.0</td>
      <td>33615</td>
      <td>485145.13</td>
      <td>110482.20</td>
    </tr>
    <tr>
      <th>2367</th>
      <td>5171.83</td>
      <td>7762.79</td>
      <td>513225.0</td>
      <td>5594</td>
      <td>65149.11</td>
      <td>39434.77</td>
    </tr>
    <tr>
      <th>2413</th>
      <td>48180.28</td>
      <td>72338.39</td>
      <td>4516900.0</td>
      <td>55573</td>
      <td>835742.87</td>
      <td>204237.78</td>
    </tr>
    <tr>
      <th>2445</th>
      <td>15806.63</td>
      <td>23735.01</td>
      <td>1718125.0</td>
      <td>6329</td>
      <td>71682.86</td>
      <td>16939.15</td>
    </tr>
    <tr>
      <th>2448</th>
      <td>43175.85</td>
      <td>64818.70</td>
      <td>3981625.0</td>
      <td>13836</td>
      <td>203038.62</td>
      <td>55498.12</td>
    </tr>
    <tr>
      <th>2459</th>
      <td>9176.42</td>
      <td>13792.65</td>
      <td>1080400.0</td>
      <td>6379</td>
      <td>79026.65</td>
      <td>15983.98</td>
    </tr>
    <tr>
      <th>2460</th>
      <td>32564.14</td>
      <td>48902.56</td>
      <td>3264200.0</td>
      <td>22961</td>
      <td>301694.40</td>
      <td>71758.66</td>
    </tr>
    <tr>
      <th>2465</th>
      <td>45964.55</td>
      <td>69004.52</td>
      <td>3627725.0</td>
      <td>18293</td>
      <td>264728.41</td>
      <td>62988.17</td>
    </tr>
    <tr>
      <th>2475</th>
      <td>8864.98</td>
      <td>13317.48</td>
      <td>1040000.0</td>
      <td>7801</td>
      <td>121763.29</td>
      <td>29637.75</td>
    </tr>
    <tr>
      <th>2478</th>
      <td>12134.70</td>
      <td>18204.01</td>
      <td>819250.0</td>
      <td>11196</td>
      <td>198550.40</td>
      <td>48759.71</td>
    </tr>
    <tr>
      <th>2487</th>
      <td>38762.32</td>
      <td>58237.32</td>
      <td>4001075.0</td>
      <td>23145</td>
      <td>293643.02</td>
      <td>89736.70</td>
    </tr>
    <tr>
      <th>2498</th>
      <td>4540.91</td>
      <td>6826.84</td>
      <td>576600.0</td>
      <td>2840</td>
      <td>27453.07</td>
      <td>5577.61</td>
    </tr>
    <tr>
      <th>2500</th>
      <td>125788.26</td>
      <td>188916.82</td>
      <td>10949203.0</td>
      <td>98526</td>
      <td>1354990.08</td>
      <td>310035.66</td>
    </tr>
    <tr>
      <th>2501</th>
      <td>132264.89</td>
      <td>198707.39</td>
      <td>11455684.0</td>
      <td>102095</td>
      <td>1377465.13</td>
      <td>310718.21</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>5091</th>
      <td>3692.24</td>
      <td>5542.27</td>
      <td>341575.0</td>
      <td>3316</td>
      <td>30876.44</td>
      <td>11046.56</td>
    </tr>
    <tr>
      <th>5092</th>
      <td>5855.63</td>
      <td>8788.20</td>
      <td>523825.0</td>
      <td>4517</td>
      <td>51100.71</td>
      <td>15648.81</td>
    </tr>
    <tr>
      <th>5093</th>
      <td>18773.32</td>
      <td>28186.48</td>
      <td>1622475.0</td>
      <td>9178</td>
      <td>99586.06</td>
      <td>29251.18</td>
    </tr>
    <tr>
      <th>5094</th>
      <td>1288.43</td>
      <td>1933.73</td>
      <td>118200.0</td>
      <td>1983</td>
      <td>14327.23</td>
      <td>6285.49</td>
    </tr>
    <tr>
      <th>5096</th>
      <td>6639.17</td>
      <td>9973.23</td>
      <td>617375.0</td>
      <td>4352</td>
      <td>71490.84</td>
      <td>17333.76</td>
    </tr>
    <tr>
      <th>5097</th>
      <td>6062.03</td>
      <td>9109.57</td>
      <td>731125.0</td>
      <td>9078</td>
      <td>123882.25</td>
      <td>39686.13</td>
    </tr>
    <tr>
      <th>5098</th>
      <td>6604.64</td>
      <td>9910.40</td>
      <td>508000.0</td>
      <td>19184</td>
      <td>100442.05</td>
      <td>18166.40</td>
    </tr>
    <tr>
      <th>5099</th>
      <td>2121.79</td>
      <td>3186.79</td>
      <td>207525.0</td>
      <td>1918</td>
      <td>20721.55</td>
      <td>7615.84</td>
    </tr>
    <tr>
      <th>5100</th>
      <td>5268.11</td>
      <td>7903.85</td>
      <td>399950.0</td>
      <td>19701</td>
      <td>109536.24</td>
      <td>20298.09</td>
    </tr>
    <tr>
      <th>5101</th>
      <td>7754.30</td>
      <td>11642.38</td>
      <td>776125.0</td>
      <td>11584</td>
      <td>88825.14</td>
      <td>16363.86</td>
    </tr>
    <tr>
      <th>5102</th>
      <td>81591.24</td>
      <td>122460.94</td>
      <td>6667450.0</td>
      <td>138300</td>
      <td>1951393.22</td>
      <td>321727.56</td>
    </tr>
    <tr>
      <th>5103</th>
      <td>2758.78</td>
      <td>4140.06</td>
      <td>224200.0</td>
      <td>1083</td>
      <td>12924.97</td>
      <td>1340.65</td>
    </tr>
    <tr>
      <th>5104</th>
      <td>29202.00</td>
      <td>43853.51</td>
      <td>2360050.0</td>
      <td>6103</td>
      <td>100995.41</td>
      <td>18426.13</td>
    </tr>
    <tr>
      <th>5105</th>
      <td>46166.84</td>
      <td>69315.05</td>
      <td>3847600.0</td>
      <td>32424</td>
      <td>482906.49</td>
      <td>35800.91</td>
    </tr>
    <tr>
      <th>5106</th>
      <td>12303.06</td>
      <td>18502.70</td>
      <td>1537700.0</td>
      <td>18940</td>
      <td>241120.84</td>
      <td>22723.38</td>
    </tr>
    <tr>
      <th>5108</th>
      <td>7455.56</td>
      <td>11190.33</td>
      <td>743050.0</td>
      <td>8273</td>
      <td>60238.69</td>
      <td>9829.29</td>
    </tr>
    <tr>
      <th>5112</th>
      <td>2747.80</td>
      <td>4123.79</td>
      <td>232375.0</td>
      <td>2379</td>
      <td>38465.05</td>
      <td>7667.62</td>
    </tr>
    <tr>
      <th>5113</th>
      <td>7853.22</td>
      <td>11782.74</td>
      <td>591900.0</td>
      <td>18747</td>
      <td>108094.57</td>
      <td>9977.58</td>
    </tr>
    <tr>
      <th>5114</th>
      <td>957.92</td>
      <td>1438.22</td>
      <td>93325.0</td>
      <td>954</td>
      <td>9555.45</td>
      <td>3556.53</td>
    </tr>
    <tr>
      <th>5115</th>
      <td>1997.59</td>
      <td>3000.22</td>
      <td>207700.0</td>
      <td>2763</td>
      <td>24917.04</td>
      <td>5989.43</td>
    </tr>
    <tr>
      <th>5116</th>
      <td>15883.52</td>
      <td>23832.07</td>
      <td>1411400.0</td>
      <td>14641</td>
      <td>128662.55</td>
      <td>16258.69</td>
    </tr>
    <tr>
      <th>5119</th>
      <td>2944.82</td>
      <td>4425.02</td>
      <td>319200.0</td>
      <td>1572</td>
      <td>23645.56</td>
      <td>1444.80</td>
    </tr>
    <tr>
      <th>5123</th>
      <td>14100.52</td>
      <td>21202.80</td>
      <td>1554800.0</td>
      <td>13046</td>
      <td>187448.46</td>
      <td>997.50</td>
    </tr>
    <tr>
      <th>5128</th>
      <td>17345.32</td>
      <td>26063.72</td>
      <td>2064725.0</td>
      <td>18059</td>
      <td>191781.25</td>
      <td>3855.58</td>
    </tr>
    <tr>
      <th>9001</th>
      <td>4662.93</td>
      <td>6994.95</td>
      <td>187500.0</td>
      <td>7186</td>
      <td>191820.12</td>
      <td>42762.24</td>
    </tr>
    <tr>
      <th>9002</th>
      <td>5705.65</td>
      <td>8560.25</td>
      <td>256875.0</td>
      <td>17837</td>
      <td>327676.62</td>
      <td>44636.28</td>
    </tr>
    <tr>
      <th>9010</th>
      <td>960.52</td>
      <td>1441.05</td>
      <td>56850.0</td>
      <td>1510</td>
      <td>26209.38</td>
      <td>11707.62</td>
    </tr>
    <tr>
      <th>9013</th>
      <td>487.98</td>
      <td>732.16</td>
      <td>40750.0</td>
      <td>3081</td>
      <td>30957.66</td>
      <td>825.60</td>
    </tr>
    <tr>
      <th>9022</th>
      <td>12.67</td>
      <td>19.01</td>
      <td>750.0</td>
      <td>210</td>
      <td>3992.10</td>
      <td>3992.10</td>
    </tr>
    <tr>
      <th>9023</th>
      <td>123.13</td>
      <td>184.73</td>
      <td>5250.0</td>
      <td>324</td>
      <td>8550.36</td>
      <td>5383.56</td>
    </tr>
  </tbody>
</table>
<p>1281 rows × 6 columns</p>
</div>




```python
X1 = df_2015_group[['State_Bottle_Cost', 'State_Bottle_Retail',
                         'Bottle_Volume', 'Bottles_Sold', 'Sale_f3m']]
y1 = df_2015_group['Sale']  

```


```python
X_train, X_test, y_train, y_test = train_test_split(X1, y1, test_size=0.5, random_state=77777)
```


```python
slr = LinearRegression()
```


```python
cross_val_score(slr,X_train,y_train)
```




    array([ 0.98245111,  0.9720755 ,  0.98688283])




```python
print(np.mean(cross_val_score(slr,X1,y1)))
print(np.std(cross_val_score(slr,X1,y1)))
```

    0.977753713501
    0.0145304466686



```python
slr.fit(X_train,y_train)
predictions = slr.predict(X_test)
plt.scatter(y_test, predictions)
plt.plot(y_test,y_test)
plt.show()
slr.score(X_test,y_test)
```


![png](/images/starter-code-v3_files/starter-code-v3_78_0.png)





    0.99046596842122359




```python
slr.fit(X1,y1)
predictions_2016 = slr.predict(df_2016_group[['State_Bottle_Cost', 'State_Bottle_Retail',
                         'Bottle_Volume', 'Bottles_Sold', 'Sale_f3m']])
predictions_2016
```




    array([  1.84512900e+06,   1.08255072e+05,   1.59013172e+06, ...,
             8.24373304e+03,  -5.60406575e+02,   4.60615409e+03])




```python
len(predictions_2016)
```




    1199




```python
df_pred_2016_sales = pd.DataFrame(predictions_2016, columns=['Predicted 2016'])
df1 = df_2016_group.reset_index()
df2 = df_pred_2016_sales.reset_index(drop=True)
result = pd.concat( [df1, df2], axis=1) 
result= result.set_index('Store_Number')
result= result[['Predicted 2016']]

df_2015_group.join(result)
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
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottle_Volume</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
      <th>Sale_f3m</th>
      <th>Predicted 2016</th>
    </tr>
    <tr>
      <th>Store_Number</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2106</th>
      <td>55019.19</td>
      <td>82582.34</td>
      <td>4639675.0</td>
      <td>99957</td>
      <td>1433451.46</td>
      <td>337166.53</td>
      <td>1.845129e+06</td>
    </tr>
    <tr>
      <th>2113</th>
      <td>14469.12</td>
      <td>21725.74</td>
      <td>1313875.0</td>
      <td>6483</td>
      <td>85763.42</td>
      <td>22351.86</td>
      <td>1.082551e+05</td>
    </tr>
    <tr>
      <th>2130</th>
      <td>40541.36</td>
      <td>60849.63</td>
      <td>3645525.0</td>
      <td>72544</td>
      <td>1107685.25</td>
      <td>277764.46</td>
      <td>1.590132e+06</td>
    </tr>
    <tr>
      <th>2152</th>
      <td>12311.88</td>
      <td>18507.48</td>
      <td>1513250.0</td>
      <td>5928</td>
      <td>72080.36</td>
      <td>16805.11</td>
      <td>6.993927e+04</td>
    </tr>
    <tr>
      <th>2178</th>
      <td>26665.46</td>
      <td>40070.07</td>
      <td>2739775.0</td>
      <td>20504</td>
      <td>277987.96</td>
      <td>54411.42</td>
      <td>3.012815e+05</td>
    </tr>
    <tr>
      <th>2190</th>
      <td>152643.66</td>
      <td>229161.33</td>
      <td>10382625.0</td>
      <td>107479</td>
      <td>1226205.17</td>
      <td>255392.25</td>
      <td>1.648961e+06</td>
    </tr>
    <tr>
      <th>2191</th>
      <td>63279.89</td>
      <td>94971.07</td>
      <td>5419875.0</td>
      <td>79006</td>
      <td>1275405.26</td>
      <td>318985.32</td>
      <td>1.677019e+06</td>
    </tr>
    <tr>
      <th>2200</th>
      <td>45107.16</td>
      <td>67728.01</td>
      <td>4384000.0</td>
      <td>15409</td>
      <td>223899.24</td>
      <td>45340.33</td>
      <td>2.598239e+05</td>
    </tr>
    <tr>
      <th>2205</th>
      <td>29443.78</td>
      <td>44214.11</td>
      <td>2540650.0</td>
      <td>17863</td>
      <td>230898.31</td>
      <td>57849.23</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2228</th>
      <td>28134.17</td>
      <td>42250.12</td>
      <td>2693025.0</td>
      <td>14932</td>
      <td>188879.70</td>
      <td>51031.04</td>
      <td>2.449988e+05</td>
    </tr>
    <tr>
      <th>2233</th>
      <td>30886.50</td>
      <td>46379.74</td>
      <td>2682850.0</td>
      <td>22166</td>
      <td>316855.05</td>
      <td>68657.91</td>
      <td>3.289728e+05</td>
    </tr>
    <tr>
      <th>2238</th>
      <td>6439.28</td>
      <td>9661.22</td>
      <td>460625.0</td>
      <td>6631</td>
      <td>105057.79</td>
      <td>4151.93</td>
      <td>1.596898e+05</td>
    </tr>
    <tr>
      <th>2248</th>
      <td>66289.16</td>
      <td>99517.87</td>
      <td>3972184.0</td>
      <td>35557</td>
      <td>659252.26</td>
      <td>121837.56</td>
      <td>7.052140e+05</td>
    </tr>
    <tr>
      <th>2285</th>
      <td>43045.96</td>
      <td>64633.23</td>
      <td>2661875.0</td>
      <td>44267</td>
      <td>776397.91</td>
      <td>146513.09</td>
      <td>8.195034e+05</td>
    </tr>
    <tr>
      <th>2290</th>
      <td>86172.50</td>
      <td>129369.91</td>
      <td>7678528.0</td>
      <td>39455</td>
      <td>549295.90</td>
      <td>118934.06</td>
      <td>6.546323e+05</td>
    </tr>
    <tr>
      <th>2327</th>
      <td>18103.82</td>
      <td>27171.39</td>
      <td>1757403.0</td>
      <td>8446</td>
      <td>100596.80</td>
      <td>20335.03</td>
      <td>1.031501e+05</td>
    </tr>
    <tr>
      <th>2353</th>
      <td>36043.85</td>
      <td>54155.74</td>
      <td>3665628.0</td>
      <td>33615</td>
      <td>485145.13</td>
      <td>110482.20</td>
      <td>4.774984e+05</td>
    </tr>
    <tr>
      <th>2367</th>
      <td>5171.83</td>
      <td>7762.79</td>
      <td>513225.0</td>
      <td>5594</td>
      <td>65149.11</td>
      <td>39434.77</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2413</th>
      <td>48180.28</td>
      <td>72338.39</td>
      <td>4516900.0</td>
      <td>55573</td>
      <td>835742.87</td>
      <td>204237.78</td>
      <td>1.103059e+06</td>
    </tr>
    <tr>
      <th>2445</th>
      <td>15806.63</td>
      <td>23735.01</td>
      <td>1718125.0</td>
      <td>6329</td>
      <td>71682.86</td>
      <td>16939.15</td>
      <td>7.521778e+04</td>
    </tr>
    <tr>
      <th>2448</th>
      <td>43175.85</td>
      <td>64818.70</td>
      <td>3981625.0</td>
      <td>13836</td>
      <td>203038.62</td>
      <td>55498.12</td>
      <td>2.666956e+05</td>
    </tr>
    <tr>
      <th>2459</th>
      <td>9176.42</td>
      <td>13792.65</td>
      <td>1080400.0</td>
      <td>6379</td>
      <td>79026.65</td>
      <td>15983.98</td>
      <td>7.656758e+04</td>
    </tr>
    <tr>
      <th>2460</th>
      <td>32564.14</td>
      <td>48902.56</td>
      <td>3264200.0</td>
      <td>22961</td>
      <td>301694.40</td>
      <td>71758.66</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2465</th>
      <td>45964.55</td>
      <td>69004.52</td>
      <td>3627725.0</td>
      <td>18293</td>
      <td>264728.41</td>
      <td>62988.17</td>
      <td>3.045128e+05</td>
    </tr>
    <tr>
      <th>2475</th>
      <td>8864.98</td>
      <td>13317.48</td>
      <td>1040000.0</td>
      <td>7801</td>
      <td>121763.29</td>
      <td>29637.75</td>
      <td>1.509197e+05</td>
    </tr>
    <tr>
      <th>2478</th>
      <td>12134.70</td>
      <td>18204.01</td>
      <td>819250.0</td>
      <td>11196</td>
      <td>198550.40</td>
      <td>48759.71</td>
      <td>2.474127e+05</td>
    </tr>
    <tr>
      <th>2487</th>
      <td>38762.32</td>
      <td>58237.32</td>
      <td>4001075.0</td>
      <td>23145</td>
      <td>293643.02</td>
      <td>89736.70</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2498</th>
      <td>4540.91</td>
      <td>6826.84</td>
      <td>576600.0</td>
      <td>2840</td>
      <td>27453.07</td>
      <td>5577.61</td>
      <td>2.094094e+04</td>
    </tr>
    <tr>
      <th>2500</th>
      <td>125788.26</td>
      <td>188916.82</td>
      <td>10949203.0</td>
      <td>98526</td>
      <td>1354990.08</td>
      <td>310035.66</td>
      <td>1.747007e+06</td>
    </tr>
    <tr>
      <th>2501</th>
      <td>132264.89</td>
      <td>198707.39</td>
      <td>11455684.0</td>
      <td>102095</td>
      <td>1377465.13</td>
      <td>310718.21</td>
      <td>1.774652e+06</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>5091</th>
      <td>3692.24</td>
      <td>5542.27</td>
      <td>341575.0</td>
      <td>3316</td>
      <td>30876.44</td>
      <td>11046.56</td>
      <td>4.356746e+04</td>
    </tr>
    <tr>
      <th>5092</th>
      <td>5855.63</td>
      <td>8788.20</td>
      <td>523825.0</td>
      <td>4517</td>
      <td>51100.71</td>
      <td>15648.81</td>
      <td>6.430908e+04</td>
    </tr>
    <tr>
      <th>5093</th>
      <td>18773.32</td>
      <td>28186.48</td>
      <td>1622475.0</td>
      <td>9178</td>
      <td>99586.06</td>
      <td>29251.18</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>5094</th>
      <td>1288.43</td>
      <td>1933.73</td>
      <td>118200.0</td>
      <td>1983</td>
      <td>14327.23</td>
      <td>6285.49</td>
      <td>2.340150e+04</td>
    </tr>
    <tr>
      <th>5096</th>
      <td>6639.17</td>
      <td>9973.23</td>
      <td>617375.0</td>
      <td>4352</td>
      <td>71490.84</td>
      <td>17333.76</td>
      <td>9.331253e+04</td>
    </tr>
    <tr>
      <th>5097</th>
      <td>6062.03</td>
      <td>9109.57</td>
      <td>731125.0</td>
      <td>9078</td>
      <td>123882.25</td>
      <td>39686.13</td>
      <td>1.542861e+05</td>
    </tr>
    <tr>
      <th>5098</th>
      <td>6604.64</td>
      <td>9910.40</td>
      <td>508000.0</td>
      <td>19184</td>
      <td>100442.05</td>
      <td>18166.40</td>
      <td>1.289792e+05</td>
    </tr>
    <tr>
      <th>5099</th>
      <td>2121.79</td>
      <td>3186.79</td>
      <td>207525.0</td>
      <td>1918</td>
      <td>20721.55</td>
      <td>7615.84</td>
      <td>2.644483e+04</td>
    </tr>
    <tr>
      <th>5100</th>
      <td>5268.11</td>
      <td>7903.85</td>
      <td>399950.0</td>
      <td>19701</td>
      <td>109536.24</td>
      <td>20298.09</td>
      <td>1.556500e+05</td>
    </tr>
    <tr>
      <th>5101</th>
      <td>7754.30</td>
      <td>11642.38</td>
      <td>776125.0</td>
      <td>11584</td>
      <td>88825.14</td>
      <td>16363.86</td>
      <td>1.412015e+05</td>
    </tr>
    <tr>
      <th>5102</th>
      <td>81591.24</td>
      <td>122460.94</td>
      <td>6667450.0</td>
      <td>138300</td>
      <td>1951393.22</td>
      <td>321727.56</td>
      <td>2.600313e+06</td>
    </tr>
    <tr>
      <th>5103</th>
      <td>2758.78</td>
      <td>4140.06</td>
      <td>224200.0</td>
      <td>1083</td>
      <td>12924.97</td>
      <td>1340.65</td>
      <td>6.261518e+03</td>
    </tr>
    <tr>
      <th>5104</th>
      <td>29202.00</td>
      <td>43853.51</td>
      <td>2360050.0</td>
      <td>6103</td>
      <td>100995.41</td>
      <td>18426.13</td>
      <td>4.618291e+04</td>
    </tr>
    <tr>
      <th>5105</th>
      <td>46166.84</td>
      <td>69315.05</td>
      <td>3847600.0</td>
      <td>32424</td>
      <td>482906.49</td>
      <td>35800.91</td>
      <td>4.263134e+05</td>
    </tr>
    <tr>
      <th>5106</th>
      <td>12303.06</td>
      <td>18502.70</td>
      <td>1537700.0</td>
      <td>18940</td>
      <td>241120.84</td>
      <td>22723.38</td>
      <td>2.274731e+05</td>
    </tr>
    <tr>
      <th>5108</th>
      <td>7455.56</td>
      <td>11190.33</td>
      <td>743050.0</td>
      <td>8273</td>
      <td>60238.69</td>
      <td>9829.29</td>
      <td>7.240846e+04</td>
    </tr>
    <tr>
      <th>5112</th>
      <td>2747.80</td>
      <td>4123.79</td>
      <td>232375.0</td>
      <td>2379</td>
      <td>38465.05</td>
      <td>7667.62</td>
      <td>2.884358e+04</td>
    </tr>
    <tr>
      <th>5113</th>
      <td>7853.22</td>
      <td>11782.74</td>
      <td>591900.0</td>
      <td>18747</td>
      <td>108094.57</td>
      <td>9977.58</td>
      <td>1.141394e+05</td>
    </tr>
    <tr>
      <th>5114</th>
      <td>957.92</td>
      <td>1438.22</td>
      <td>93325.0</td>
      <td>954</td>
      <td>9555.45</td>
      <td>3556.53</td>
      <td>1.065901e+04</td>
    </tr>
    <tr>
      <th>5115</th>
      <td>1997.59</td>
      <td>3000.22</td>
      <td>207700.0</td>
      <td>2763</td>
      <td>24917.04</td>
      <td>5989.43</td>
      <td>2.438740e+04</td>
    </tr>
    <tr>
      <th>5116</th>
      <td>15883.52</td>
      <td>23832.07</td>
      <td>1411400.0</td>
      <td>14641</td>
      <td>128662.55</td>
      <td>16258.69</td>
      <td>1.725472e+05</td>
    </tr>
    <tr>
      <th>5119</th>
      <td>2944.82</td>
      <td>4425.02</td>
      <td>319200.0</td>
      <td>1572</td>
      <td>23645.56</td>
      <td>1444.80</td>
      <td>2.386742e+03</td>
    </tr>
    <tr>
      <th>5123</th>
      <td>14100.52</td>
      <td>21202.80</td>
      <td>1554800.0</td>
      <td>13046</td>
      <td>187448.46</td>
      <td>997.50</td>
      <td>1.587296e+05</td>
    </tr>
    <tr>
      <th>5128</th>
      <td>17345.32</td>
      <td>26063.72</td>
      <td>2064725.0</td>
      <td>18059</td>
      <td>191781.25</td>
      <td>3855.58</td>
      <td>1.821200e+05</td>
    </tr>
    <tr>
      <th>9001</th>
      <td>4662.93</td>
      <td>6994.95</td>
      <td>187500.0</td>
      <td>7186</td>
      <td>191820.12</td>
      <td>42762.24</td>
      <td>1.588806e+05</td>
    </tr>
    <tr>
      <th>9002</th>
      <td>5705.65</td>
      <td>8560.25</td>
      <td>256875.0</td>
      <td>17837</td>
      <td>327676.62</td>
      <td>44636.28</td>
      <td>1.823368e+05</td>
    </tr>
    <tr>
      <th>9010</th>
      <td>960.52</td>
      <td>1441.05</td>
      <td>56850.0</td>
      <td>1510</td>
      <td>26209.38</td>
      <td>11707.62</td>
      <td>1.912806e+04</td>
    </tr>
    <tr>
      <th>9013</th>
      <td>487.98</td>
      <td>732.16</td>
      <td>40750.0</td>
      <td>3081</td>
      <td>30957.66</td>
      <td>825.60</td>
      <td>8.243733e+03</td>
    </tr>
    <tr>
      <th>9022</th>
      <td>12.67</td>
      <td>19.01</td>
      <td>750.0</td>
      <td>210</td>
      <td>3992.10</td>
      <td>3992.10</td>
      <td>-5.604066e+02</td>
    </tr>
    <tr>
      <th>9023</th>
      <td>123.13</td>
      <td>184.73</td>
      <td>5250.0</td>
      <td>324</td>
      <td>8550.36</td>
      <td>5383.56</td>
      <td>4.606154e+03</td>
    </tr>
  </tbody>
</table>
<p>1281 rows × 7 columns</p>
</div>




```python
#run once 
#df_2015_group = df_2015_group.join(result)

```


```python
df_2015_group.dropna(inplace=True)
df_2015_group
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
      <th>State_Bottle_Cost</th>
      <th>State_Bottle_Retail</th>
      <th>Bottle_Volume</th>
      <th>Bottles_Sold</th>
      <th>Sale</th>
      <th>Sale_f3m</th>
      <th>Predicted 2016</th>
    </tr>
    <tr>
      <th>Store_Number</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2106</th>
      <td>55019.19</td>
      <td>82582.34</td>
      <td>4639675.0</td>
      <td>99957</td>
      <td>1433451.46</td>
      <td>337166.53</td>
      <td>1.845129e+06</td>
    </tr>
    <tr>
      <th>2113</th>
      <td>14469.12</td>
      <td>21725.74</td>
      <td>1313875.0</td>
      <td>6483</td>
      <td>85763.42</td>
      <td>22351.86</td>
      <td>1.082551e+05</td>
    </tr>
    <tr>
      <th>2130</th>
      <td>40541.36</td>
      <td>60849.63</td>
      <td>3645525.0</td>
      <td>72544</td>
      <td>1107685.25</td>
      <td>277764.46</td>
      <td>1.590132e+06</td>
    </tr>
    <tr>
      <th>2152</th>
      <td>12311.88</td>
      <td>18507.48</td>
      <td>1513250.0</td>
      <td>5928</td>
      <td>72080.36</td>
      <td>16805.11</td>
      <td>6.993927e+04</td>
    </tr>
    <tr>
      <th>2178</th>
      <td>26665.46</td>
      <td>40070.07</td>
      <td>2739775.0</td>
      <td>20504</td>
      <td>277987.96</td>
      <td>54411.42</td>
      <td>3.012815e+05</td>
    </tr>
    <tr>
      <th>2190</th>
      <td>152643.66</td>
      <td>229161.33</td>
      <td>10382625.0</td>
      <td>107479</td>
      <td>1226205.17</td>
      <td>255392.25</td>
      <td>1.648961e+06</td>
    </tr>
    <tr>
      <th>2191</th>
      <td>63279.89</td>
      <td>94971.07</td>
      <td>5419875.0</td>
      <td>79006</td>
      <td>1275405.26</td>
      <td>318985.32</td>
      <td>1.677019e+06</td>
    </tr>
    <tr>
      <th>2200</th>
      <td>45107.16</td>
      <td>67728.01</td>
      <td>4384000.0</td>
      <td>15409</td>
      <td>223899.24</td>
      <td>45340.33</td>
      <td>2.598239e+05</td>
    </tr>
    <tr>
      <th>2228</th>
      <td>28134.17</td>
      <td>42250.12</td>
      <td>2693025.0</td>
      <td>14932</td>
      <td>188879.70</td>
      <td>51031.04</td>
      <td>2.449988e+05</td>
    </tr>
    <tr>
      <th>2233</th>
      <td>30886.50</td>
      <td>46379.74</td>
      <td>2682850.0</td>
      <td>22166</td>
      <td>316855.05</td>
      <td>68657.91</td>
      <td>3.289728e+05</td>
    </tr>
    <tr>
      <th>2238</th>
      <td>6439.28</td>
      <td>9661.22</td>
      <td>460625.0</td>
      <td>6631</td>
      <td>105057.79</td>
      <td>4151.93</td>
      <td>1.596898e+05</td>
    </tr>
    <tr>
      <th>2248</th>
      <td>66289.16</td>
      <td>99517.87</td>
      <td>3972184.0</td>
      <td>35557</td>
      <td>659252.26</td>
      <td>121837.56</td>
      <td>7.052140e+05</td>
    </tr>
    <tr>
      <th>2285</th>
      <td>43045.96</td>
      <td>64633.23</td>
      <td>2661875.0</td>
      <td>44267</td>
      <td>776397.91</td>
      <td>146513.09</td>
      <td>8.195034e+05</td>
    </tr>
    <tr>
      <th>2290</th>
      <td>86172.50</td>
      <td>129369.91</td>
      <td>7678528.0</td>
      <td>39455</td>
      <td>549295.90</td>
      <td>118934.06</td>
      <td>6.546323e+05</td>
    </tr>
    <tr>
      <th>2327</th>
      <td>18103.82</td>
      <td>27171.39</td>
      <td>1757403.0</td>
      <td>8446</td>
      <td>100596.80</td>
      <td>20335.03</td>
      <td>1.031501e+05</td>
    </tr>
    <tr>
      <th>2353</th>
      <td>36043.85</td>
      <td>54155.74</td>
      <td>3665628.0</td>
      <td>33615</td>
      <td>485145.13</td>
      <td>110482.20</td>
      <td>4.774984e+05</td>
    </tr>
    <tr>
      <th>2413</th>
      <td>48180.28</td>
      <td>72338.39</td>
      <td>4516900.0</td>
      <td>55573</td>
      <td>835742.87</td>
      <td>204237.78</td>
      <td>1.103059e+06</td>
    </tr>
    <tr>
      <th>2445</th>
      <td>15806.63</td>
      <td>23735.01</td>
      <td>1718125.0</td>
      <td>6329</td>
      <td>71682.86</td>
      <td>16939.15</td>
      <td>7.521778e+04</td>
    </tr>
    <tr>
      <th>2448</th>
      <td>43175.85</td>
      <td>64818.70</td>
      <td>3981625.0</td>
      <td>13836</td>
      <td>203038.62</td>
      <td>55498.12</td>
      <td>2.666956e+05</td>
    </tr>
    <tr>
      <th>2459</th>
      <td>9176.42</td>
      <td>13792.65</td>
      <td>1080400.0</td>
      <td>6379</td>
      <td>79026.65</td>
      <td>15983.98</td>
      <td>7.656758e+04</td>
    </tr>
    <tr>
      <th>2465</th>
      <td>45964.55</td>
      <td>69004.52</td>
      <td>3627725.0</td>
      <td>18293</td>
      <td>264728.41</td>
      <td>62988.17</td>
      <td>3.045128e+05</td>
    </tr>
    <tr>
      <th>2475</th>
      <td>8864.98</td>
      <td>13317.48</td>
      <td>1040000.0</td>
      <td>7801</td>
      <td>121763.29</td>
      <td>29637.75</td>
      <td>1.509197e+05</td>
    </tr>
    <tr>
      <th>2478</th>
      <td>12134.70</td>
      <td>18204.01</td>
      <td>819250.0</td>
      <td>11196</td>
      <td>198550.40</td>
      <td>48759.71</td>
      <td>2.474127e+05</td>
    </tr>
    <tr>
      <th>2498</th>
      <td>4540.91</td>
      <td>6826.84</td>
      <td>576600.0</td>
      <td>2840</td>
      <td>27453.07</td>
      <td>5577.61</td>
      <td>2.094094e+04</td>
    </tr>
    <tr>
      <th>2500</th>
      <td>125788.26</td>
      <td>188916.82</td>
      <td>10949203.0</td>
      <td>98526</td>
      <td>1354990.08</td>
      <td>310035.66</td>
      <td>1.747007e+06</td>
    </tr>
    <tr>
      <th>2501</th>
      <td>132264.89</td>
      <td>198707.39</td>
      <td>11455684.0</td>
      <td>102095</td>
      <td>1377465.13</td>
      <td>310718.21</td>
      <td>1.774652e+06</td>
    </tr>
    <tr>
      <th>2502</th>
      <td>84607.47</td>
      <td>127087.08</td>
      <td>7216284.0</td>
      <td>92636</td>
      <td>1372155.78</td>
      <td>258284.84</td>
      <td>1.337398e+06</td>
    </tr>
    <tr>
      <th>2505</th>
      <td>55510.91</td>
      <td>83359.41</td>
      <td>5590253.0</td>
      <td>48908</td>
      <td>659068.44</td>
      <td>150049.71</td>
      <td>8.136794e+05</td>
    </tr>
    <tr>
      <th>2506</th>
      <td>100952.25</td>
      <td>151569.81</td>
      <td>8850903.0</td>
      <td>94253</td>
      <td>1426370.36</td>
      <td>309568.16</td>
      <td>1.693955e+06</td>
    </tr>
    <tr>
      <th>2507</th>
      <td>25269.62</td>
      <td>37942.28</td>
      <td>3039900.0</td>
      <td>29811</td>
      <td>299207.06</td>
      <td>66468.32</td>
      <td>3.450604e+05</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>5090</th>
      <td>2679.95</td>
      <td>4022.08</td>
      <td>214750.0</td>
      <td>3110</td>
      <td>31888.65</td>
      <td>13818.67</td>
      <td>4.316273e+04</td>
    </tr>
    <tr>
      <th>5091</th>
      <td>3692.24</td>
      <td>5542.27</td>
      <td>341575.0</td>
      <td>3316</td>
      <td>30876.44</td>
      <td>11046.56</td>
      <td>4.356746e+04</td>
    </tr>
    <tr>
      <th>5092</th>
      <td>5855.63</td>
      <td>8788.20</td>
      <td>523825.0</td>
      <td>4517</td>
      <td>51100.71</td>
      <td>15648.81</td>
      <td>6.430908e+04</td>
    </tr>
    <tr>
      <th>5094</th>
      <td>1288.43</td>
      <td>1933.73</td>
      <td>118200.0</td>
      <td>1983</td>
      <td>14327.23</td>
      <td>6285.49</td>
      <td>2.340150e+04</td>
    </tr>
    <tr>
      <th>5096</th>
      <td>6639.17</td>
      <td>9973.23</td>
      <td>617375.0</td>
      <td>4352</td>
      <td>71490.84</td>
      <td>17333.76</td>
      <td>9.331253e+04</td>
    </tr>
    <tr>
      <th>5097</th>
      <td>6062.03</td>
      <td>9109.57</td>
      <td>731125.0</td>
      <td>9078</td>
      <td>123882.25</td>
      <td>39686.13</td>
      <td>1.542861e+05</td>
    </tr>
    <tr>
      <th>5098</th>
      <td>6604.64</td>
      <td>9910.40</td>
      <td>508000.0</td>
      <td>19184</td>
      <td>100442.05</td>
      <td>18166.40</td>
      <td>1.289792e+05</td>
    </tr>
    <tr>
      <th>5099</th>
      <td>2121.79</td>
      <td>3186.79</td>
      <td>207525.0</td>
      <td>1918</td>
      <td>20721.55</td>
      <td>7615.84</td>
      <td>2.644483e+04</td>
    </tr>
    <tr>
      <th>5100</th>
      <td>5268.11</td>
      <td>7903.85</td>
      <td>399950.0</td>
      <td>19701</td>
      <td>109536.24</td>
      <td>20298.09</td>
      <td>1.556500e+05</td>
    </tr>
    <tr>
      <th>5101</th>
      <td>7754.30</td>
      <td>11642.38</td>
      <td>776125.0</td>
      <td>11584</td>
      <td>88825.14</td>
      <td>16363.86</td>
      <td>1.412015e+05</td>
    </tr>
    <tr>
      <th>5102</th>
      <td>81591.24</td>
      <td>122460.94</td>
      <td>6667450.0</td>
      <td>138300</td>
      <td>1951393.22</td>
      <td>321727.56</td>
      <td>2.600313e+06</td>
    </tr>
    <tr>
      <th>5103</th>
      <td>2758.78</td>
      <td>4140.06</td>
      <td>224200.0</td>
      <td>1083</td>
      <td>12924.97</td>
      <td>1340.65</td>
      <td>6.261518e+03</td>
    </tr>
    <tr>
      <th>5104</th>
      <td>29202.00</td>
      <td>43853.51</td>
      <td>2360050.0</td>
      <td>6103</td>
      <td>100995.41</td>
      <td>18426.13</td>
      <td>4.618291e+04</td>
    </tr>
    <tr>
      <th>5105</th>
      <td>46166.84</td>
      <td>69315.05</td>
      <td>3847600.0</td>
      <td>32424</td>
      <td>482906.49</td>
      <td>35800.91</td>
      <td>4.263134e+05</td>
    </tr>
    <tr>
      <th>5106</th>
      <td>12303.06</td>
      <td>18502.70</td>
      <td>1537700.0</td>
      <td>18940</td>
      <td>241120.84</td>
      <td>22723.38</td>
      <td>2.274731e+05</td>
    </tr>
    <tr>
      <th>5108</th>
      <td>7455.56</td>
      <td>11190.33</td>
      <td>743050.0</td>
      <td>8273</td>
      <td>60238.69</td>
      <td>9829.29</td>
      <td>7.240846e+04</td>
    </tr>
    <tr>
      <th>5112</th>
      <td>2747.80</td>
      <td>4123.79</td>
      <td>232375.0</td>
      <td>2379</td>
      <td>38465.05</td>
      <td>7667.62</td>
      <td>2.884358e+04</td>
    </tr>
    <tr>
      <th>5113</th>
      <td>7853.22</td>
      <td>11782.74</td>
      <td>591900.0</td>
      <td>18747</td>
      <td>108094.57</td>
      <td>9977.58</td>
      <td>1.141394e+05</td>
    </tr>
    <tr>
      <th>5114</th>
      <td>957.92</td>
      <td>1438.22</td>
      <td>93325.0</td>
      <td>954</td>
      <td>9555.45</td>
      <td>3556.53</td>
      <td>1.065901e+04</td>
    </tr>
    <tr>
      <th>5115</th>
      <td>1997.59</td>
      <td>3000.22</td>
      <td>207700.0</td>
      <td>2763</td>
      <td>24917.04</td>
      <td>5989.43</td>
      <td>2.438740e+04</td>
    </tr>
    <tr>
      <th>5116</th>
      <td>15883.52</td>
      <td>23832.07</td>
      <td>1411400.0</td>
      <td>14641</td>
      <td>128662.55</td>
      <td>16258.69</td>
      <td>1.725472e+05</td>
    </tr>
    <tr>
      <th>5119</th>
      <td>2944.82</td>
      <td>4425.02</td>
      <td>319200.0</td>
      <td>1572</td>
      <td>23645.56</td>
      <td>1444.80</td>
      <td>2.386742e+03</td>
    </tr>
    <tr>
      <th>5123</th>
      <td>14100.52</td>
      <td>21202.80</td>
      <td>1554800.0</td>
      <td>13046</td>
      <td>187448.46</td>
      <td>997.50</td>
      <td>1.587296e+05</td>
    </tr>
    <tr>
      <th>5128</th>
      <td>17345.32</td>
      <td>26063.72</td>
      <td>2064725.0</td>
      <td>18059</td>
      <td>191781.25</td>
      <td>3855.58</td>
      <td>1.821200e+05</td>
    </tr>
    <tr>
      <th>9001</th>
      <td>4662.93</td>
      <td>6994.95</td>
      <td>187500.0</td>
      <td>7186</td>
      <td>191820.12</td>
      <td>42762.24</td>
      <td>1.588806e+05</td>
    </tr>
    <tr>
      <th>9002</th>
      <td>5705.65</td>
      <td>8560.25</td>
      <td>256875.0</td>
      <td>17837</td>
      <td>327676.62</td>
      <td>44636.28</td>
      <td>1.823368e+05</td>
    </tr>
    <tr>
      <th>9010</th>
      <td>960.52</td>
      <td>1441.05</td>
      <td>56850.0</td>
      <td>1510</td>
      <td>26209.38</td>
      <td>11707.62</td>
      <td>1.912806e+04</td>
    </tr>
    <tr>
      <th>9013</th>
      <td>487.98</td>
      <td>732.16</td>
      <td>40750.0</td>
      <td>3081</td>
      <td>30957.66</td>
      <td>825.60</td>
      <td>8.243733e+03</td>
    </tr>
    <tr>
      <th>9022</th>
      <td>12.67</td>
      <td>19.01</td>
      <td>750.0</td>
      <td>210</td>
      <td>3992.10</td>
      <td>3992.10</td>
      <td>-5.604066e+02</td>
    </tr>
    <tr>
      <th>9023</th>
      <td>123.13</td>
      <td>184.73</td>
      <td>5250.0</td>
      <td>324</td>
      <td>8550.36</td>
      <td>5383.56</td>
      <td>4.606154e+03</td>
    </tr>
  </tbody>
</table>
<p>1199 rows × 7 columns</p>
</div>




```python
print(df_2015_group.Sale.sum())
print(df_2015_group['Predicted 2016'].sum())
```

    273707496.9300008
    326207022.8730077



```python
#df_pred = pd.df_2016_group(predictions)
#df_pred 
#df_2016_group
```


```python

 
y = df_2015_group['Sale'] #*12
plt.hist(y, bins=800)
plt.xlim(0,350000)
plt.show()
y
```


![png](/images/starter-code-v3_files/starter-code-v3_86_0.png)





    Store_Number
    2106    1433451.46
    2113      85763.42
    2130    1107685.25
    2152      72080.36
    2178     277987.96
    2190    1226205.17
    2191    1275405.26
    2200     223899.24
    2228     188879.70
    2233     316855.05
    2238     105057.79
    2248     659252.26
    2285     776397.91
    2290     549295.90
    2327     100596.80
    2353     485145.13
    2413     835742.87
    2445      71682.86
    2448     203038.62
    2459      79026.65
    2465     264728.41
    2475     121763.29
    2478     198550.40
    2498      27453.07
    2500    1354990.08
    2501    1377465.13
    2502    1372155.78
    2505     659068.44
    2506    1426370.36
    2507     299207.06
               ...    
    5090      31888.65
    5091      30876.44
    5092      51100.71
    5094      14327.23
    5096      71490.84
    5097     123882.25
    5098     100442.05
    5099      20721.55
    5100     109536.24
    5101      88825.14
    5102    1951393.22
    5103      12924.97
    5104     100995.41
    5105     482906.49
    5106     241120.84
    5108      60238.69
    5112      38465.05
    5113     108094.57
    5114       9555.45
    5115      24917.04
    5116     128662.55
    5119      23645.56
    5123     187448.46
    5128     191781.25
    9001     191820.12
    9002     327676.62
    9010      26209.38
    9013      30957.66
    9022       3992.10
    9023       8550.36
    Name: Sale, Length: 1199, dtype: float64




```python
y = predictions_2016


plt.hist(y, bins=500)

plt.xlim(0,350000)
plt.show()
```


![png](/images/starter-code-v3_files/starter-code-v3_87_0.png)



```python
y1 = predictions_2016
y2 = df_2015_group['Sale']

plt.hist(y1, bins=800, alpha=.7)
plt.hist(y2, bins=800, alpha=.7)
plt.xlim(0,350000)
plt.show()
```


![png](/images/starter-code-v3_files/starter-code-v3_88_0.png)



```python
len(y1)
```




    1290




```python
len(y2)
```




    1281




```python
# MODEL 2 EXTRACTING UNNECESSARY VARIABLES 
X2 = df_2015_group[['Bottle_Volume', 'Bottles_Sold', 'Sale_f3m']]
y2 = df_2015_group['Sale'] *12 
```


```python
X_train, X_test, y_train, y_test = train_test_split(X2, y2, test_size=0.5, random_state=77777)
```


```python
slr = LinearRegression()
```


```python
cross_val_score(slr,X_train,y_train)
```




    array([ 0.99079692,  0.98802195,  0.98721696])




```python
print(np.mean(cross_val_score(slr,X2,y2)))
print(np.std(cross_val_score(slr,X2,y2)))
```

    0.979421936187
    0.0127838312991



```python
slr.fit(X_train,y_train)
predictions = slr.predict(X_test)
plt.scatter(y_test, predictions)
plt.plot(y_test,y_test)
plt.show()
slr.score(X_test,y_test)
```


![png](/images/starter-code-v3_files/starter-code-v3_96_0.png)





    0.99010295082444366




```python
# I DO NOT HAVE TO TAKE OUT VARIABLES FROM FIRST MODEL AS IT IS RUNNING FINE WITH ALL IT'S VARIABLES SO I WILL USE MODEL 1
```


```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
scaler.fit(X1)
X1 = scaler.transform(X1)
```


```python
alpha_range = 10.**np.arange(-2, 3)
alpha_range
```




    array([  1.00000000e-02,   1.00000000e-01,   1.00000000e+00,
             1.00000000e+01,   1.00000000e+02])




```python
from sklearn.linear_model import RidgeCV
ridgeregcv = RidgeCV(alphas=alpha_range, normalize=True)#, scoring='neg_mean_squared_error')
ridgeregcv.fit(X_train, y_train)
ridgeregcv.alpha_
```




    0.01




```python
ridgeregcv.score(X_test,y_test)
```




    0.98946565102493678




```python
predictions = ridgeregcv.predict(X_test)
plt.scatter(y_test, predictions)
plt.plot(y_test,y_test)
plt.show()
ridgeregcv.score(X_test,y_test)
```


![png](/images/starter-code-v3_files/starter-code-v3_102_0.png)





    0.98946565102493678



import statsmodels.api as sm


X = df_2015_group[['State_Bottle_Cost', 'State_Bottle_Retail',
                         'Bottle_Volume', 'Store_Number', 'Bottles_Sold', 'Sale_f3m']].values
X = np.concatenate([X, np.ones((X.shape[0], 1))], axis=1)
y = df_2015_group['Sale'] *12


model = sm.OLS(y, X)
model = model.fit()
predictions = model.predict(X)
model.summary()


```python
#df_2015_group = df_2015_group.reset_index()
```


```python
df_2015_group = df_2015_group.dropna()
df_2015_group
```

import statsmodels.api as sm


X = df_2015_group[['State_Bottle_Cost','Bottle_Volume', 'Bottles_Sold', 'Sale_f3m']].values
X = np.concatenate([X, np.ones((X.shape[0], 1))], axis=1)
y = df_2015_group['Sale'] *12

model = sm.OLS(y, X)
model = model.fit()
predictions = model.predict(X)
model.summary()


```python
predictions
```


```python
#df_2016_group = df_2016_group.reset_index()
```

import statsmodels.api as sm


X = df_2016_group[['State_Bottle_Cost', 'State_Bottle_Retail',
                         'Bottle_Volume', 'Bottles_Sold', 'Sale_f3m']].values
X = np.concatenate([X, np.ones((X.shape[0], 1))], axis=1)
y = df_2016_group['Sale'] *12


model = sm.OLS(y, X)
model = model.fit()
predictions = model.predict(X)
model.summary()


```python
predictions
```

import statsmodels.api as sm


X1 = df_2016_group[['Bottle_Volume', 'Store_Number', 'Bottles_Sold', 'Sale_f3m']].values
X2 = np.concatenate([X, np.ones((X.shape[0], 1))], axis=1)
y1 = df_2016_group['Sale'] *12


model = sm.OLS(y1, X1)
model = model.fit()
predictions = model.predict(X1)
model.summary()

import statsmodels.api as sm


X1 = df_2016_group[['Bottle_Volume', 'Store_Number', 'Bottles_Sold', 'Sale_f3m']].values
X2 = np.concatenate([X, np.ones((X.shape[0], 1))], axis=1)
y1 = df_2016_group['Sale'] *12

model = sm.OLS(y1, X1)
model = model.fit()
predictions = model.predict(X1)
model.summary()


```python
predictions
```

# Plot your results

Again make sure that you record any valuable information. For example, in the tax scenario, did you find the sales from the first three months of the year to be a good predictor of the total sales for the year? Plot the predictions versus the true values and discuss the successes and limitations of your models


```python
# Linear Regression number 1 for 2015
slr.fit(X_train,y_train)
predictions = slr.predict(X_test)
plt.scatter(y_test, predictions)
plt.plot(y_test,y_test)
plt.xlabel('Training Data 2015')
plt.ylabel('Testing Data 2015')
plt.show()
slr.score(X_test,y_test)
```


![png](/images/starter-code-v3_files/starter-code-v3_115_0.png)





    0.98871316667988796




```python
# Linear Regression number 2 for 2015
slr.fit(X_train,y_train)
predictions = slr.predict(X_test)
plt.scatter(y_test, predictions)
plt.plot(y_test,y_test)
plt.xlabel('Model 2 Training Data 2015')
plt.ylabel('Model 2 Testing Data 2015')
plt.show()
slr.score(X_test,y_test)
```


![png](/images/starter-code-v3_files/starter-code-v3_116_0.png)





    0.98871316667988796




```python
#Ridge Regression for 2015
predictions = ridgeregcv.predict(X_test)
plt.scatter(y_test, predictions)
plt.plot(y_test,y_test)
plt.xlabel('Ridge Model Training Data 2015')
plt.ylabel('Ridge Model Testing Data 2015')
plt.show()
ridgeregcv.score(X_test,y_test)
```


![png](/images/starter-code-v3_files/starter-code-v3_117_0.png)





    0.98946565102493678




```python
y1 = predictions_2016
y2 = df_2015_group['Sale']

plt.hist(y1, bins=800, alpha=.7)
plt.hist(y2, bins=800, alpha=.7)
plt.xlim(0,350000)
plt.xlabel('Overall Sales by store 2015/2016')
plt.ylabel('Number of Stores')
plt.show()
```


![png](/images/starter-code-v3_files/starter-code-v3_118_0.png)



```python
def correlation_heat_map(df):
    corrs = df.corr()

    # Set the default matplotlib figure size:
    fig, ax = plt.subplots(figsize=(11,7))

    # Generate a mask for the upper triangle (taken from the Seaborn example gallery):
    mask = np.zeros_like(corrs, dtype=np.bool)
    mask[np.triu_indices_from(mask)] = True

    # Plot the heatmap with Seaborn.
    # Assign the matplotlib axis the function returns. This allow us to resize the labels.
    cmap = sns.diverging_palette(220, 10, as_cmap=True)
    ax = sns.heatmap(corrs, mask=mask, annot=True, cmap=cmap, vmin=-1, vmax=1)

    # Resize the labels.
    ax.set_xticklabels(ax.xaxis.get_ticklabels(), fontsize=14, rotation=30)
    ax.set_yticklabels(ax.yaxis.get_ticklabels(), fontsize=14, rotation=0)

    # If you put plt.show() at the bottom, it prevents those useless printouts from matplotlib.
    plt.show()

df_with_target = df_2015_group.copy()
df_2015_group = y
correlation_heat_map(df_with_target)
```


![png](/images/starter-code-v3_files/starter-code-v3_119_0.png)



```python
# We see data is highly correlated
```

# Present the Results

Present your conclusions and results. If you have more than one interesting model feel free to include more than one along with a discussion. Use your work in this notebook to prepare your write-up.

After running 2 Linear Regression models in SKlearn with different features and then standardizing and running a Ridge REgularization model, I have concluded that I can account for over 98% of the variance in the data for sales in 2015. This may be due to a high correlation between variables in the dataframe, however I tried to compensate by running a second linear regression which produced very similar results in terms of r score to the first as well as regularizing with a Ridge Model that produced almost identical results as well. It is with this model that I predicted annual 2016 liquor sales and appended it to the 2015 dataframe to compare sales and see if there is indeed any increase to report to Iowa State Tax Board. I found that sales were predicted to go up by 19%.
