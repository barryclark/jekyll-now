---
layout: post
title: Fitbit + Strava
---

I've had a Fitbit Charge HR for 18 months.This model has the usual watch/pedometer features, but adds a heartrate monitor. Despite my first unit breaking within the first year (which Fitbit happily replaced, for free I might add) I've been rather pleased with it. With one exception; you can't do anything useful with the heartrate data.

Now, by useful I mean record my location and heartrate during a workout, so that I can look back at my route and see how I was doing. When I cycle, I use Strava to record my route. Strava is pretty technology agnostic; it supports most device manufacturers, including Fitbits with GPS, but not the humble Charge HR. In the Strava app, you can even pair third party heartrate monitors, but not the Fitbit.

Another useful feature of Strava is that it can export any workout to a GPX file - an XML file of coordinates, times and other data. The GPX format used by Strava can contain heart rate data if it was present when the workout was logged.

And so, the challenge is to get the heartrate data out of Fitbit. Fitbit's API allows for 'Personal' apps, which can access ['Intraday Time Series'](https://dev.fitbit.com/docs/heart-rate/#get-heart-rate-intraday-time-series) heart rate data for the owning user. This is great, and comes in detail levels down to 1 second. This can then be matched to the GPX times, and added in.

So, the workflow looks something like this:

<table markdown="0" style="border: 0px">
	<tbody>
		<tr>
			<td align="right">Record ride in Strava app</td>
			<td valign="middle">→</td>
			<td align="right">Download GPX</td>
			<td align="left" valign="bottom">⤵</td>
		</tr>
		<tr>
			<td colspan="3"></td>
			<td>Match GPX and heart rate timestamps</td>
			<td valign="middle">→</td>
			<td>Export new GPX file</td>
			<td valign="middle">→</td>
			<td >Upload to Strava</td>
		</tr>
		<tr>
			<td colspan="3" align="right">Download heart rate data from Fitbit</td>
			<td align="left" valign="top">⤴</td>
		</tr>
	</tbody>
</table>

## Exporting workout from Strava

This is probably the easiest part! Assuming you've already recorded a workout, from the workout overview click the spanner, then 'Export GPX'. The downloaded file should look something like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gpx creator="strava.com Android" version="1.1" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
 <metadata>
  <time>2017-04-02T12:46:32Z</time>
 </metadata>
 <trk>
  <name>Afternoon Ride</name>
  <trkseg>
   <trkpt lat="51.3967040" lon="-1.3312170">
    <ele>82.6</ele>
    <time>2017-04-02T12:46:32Z</time>
   </trkpt>
   <trkpt lat="51.3966910" lon="-1.3311640">
    <ele>82.8</ele>
    <time>2017-04-02T12:46:46Z</time>
   </trkpt>
...
...
...
  </trkseg>
 </trk>
</gpx>
```

The `trkpt` elements contain the timestamped GPS coordinates and elevation. Strava analyses this information to produce speed and elevation polts (though it looks like the elevation data is superceded by the built in map). The ISO8601 timestamps are what we'll need to match up with the heart rate timestamps.

## Downloading heart rate data from Fitbit

Getting basic data from the Fitbit API is easy - no authentication required. But for heart rate time series authentication *is* required. This means we need to register an app with [dev.fitbit.com](https://dev.fitbit.com/apps/new).

Registering an app is fairly straight-forward. The important parts are to set the 'OAuth 2.0 Application Type' to 'Personal', and the 'Callback URL' to 'http://127.0.0.1:8080'. You'll then be given your 'Client ID' and 'Client Secret' you'll need these to access your data.

To download the data, I used (python-fitbit)[https://github.com/orcasgit/python-fitbit]. Download the zip and install the requirements as described on the project page. The [docs](http://python-fitbit.readthedocs.io/en/latest/) suggest that the easiest way to authenticate is using the bundled `./gather_keys_oauth2.py`. `cd` to your `python-fitbit-master` directory and call it like this:
```
python ./gather_keys_oauth2.py <Client ID> <Client Secret>
```

Follow the prompts and you'll get somthing like:
```
refresh_token = ***
access_token = ***
expires_at = ***
```

Now we have everything we need to download the data! Run `python` from your terminal and try this:
```python
import fitbit, json
client = fitbit.Fitbit(client_id, client_secret, access_token, refresh_token, expires_at)
hr = client.intraday_time_series('activities/heart', detail_level='1sec')

with open('hr.json', 'w') as file:
    file.write(json.dumps(hr))
```

And there you have it! A file with today's heart rate stats and datapoints every ~5 seconds. (If you want another day or a specific time range [that's posible too](http://python-fitbit.readthedocs.io/en/latest/#fitbit.Fitbit.intraday_time_series).)


## Matching GPX and Heart Rate Data

And so the the nitty-gritty - merging all this data together.

We can load in the GPX and json files we've already created using:
```python
import json
import xmltodict as xml

# Load heart rate and GPX data as dicts
hr = json.load(open('hr.json'))
ride = xml.parse(open('Afternoon_Ride_Org.gpx'))

# Find the data points we'll need to iterate over
hr_data = hr['activities-heart-intraday']['dataset']
rd_data = ride['gpx']['trk']['trkseg']['trkpt']

```


The timestamps are in slightly different formats in each file; GPX uses ISO8601, with times in UTC, whereas Fitbit's time is a similar format, but observing the current timezone. We've just hit daylight savings, so the heart rate is timestamped in BST (UTC +01:00). There are a few python modules to help us here.

```python
# Modules to help with handling dates, times and timezones
import iso8601, datetime, tzlocal

# Find out the date and local timezone
hr_date = hr['activities-heart'][0]['dateTime']
tz = tzlocal.get_localzone()

# Convert Fitbit times into datetime with correct timezone
def hr_datetime(date, time, tz):
	dt = date + 'T' + time
	t = iso8601.parse_date(dt)
	return tz.localize(datetime.datetime.combine(t.date(), t.time()))

```

This will probably break if the timezone has changed between recording the heart rate, and processing it, but it should do for now.

Now to match up the heart rate to the route:
```python
# Initialise our variables
hr_i = 0
hr_last_value = hr_data[hr_i]['value']
hr_last_time = hr_datetime(hr_date, hr_data[hr_i]['time'], tz)

# Iterate over each GPX trkpt
for rd_i, point in enumerate(rd_data):
	print str(point['@lat']) + ' ' + str(point['@lon'])
	t = iso8601.parse_date(point['time'])
	print 'coord ' + str(t)
	
	# Find the closest heart rate data point after the coordinate timestamp
	while hr_last_time < t:
		hr_i += 1
		hr_last_value = hr_data[hr_i]['value']
		hr_last_time = hr_datetime(hr_date, hr_data[hr_i]['time'], tz)
	
	print 'heart ' + str(hr_last_time)
	print hr_last_value
	
	print ''
```
This finds the closes heart rate data that is more recent than the GPX point. I noticed that both files have sporadic timebases, so this should hopefully produce nice-ish data. If the heartrate is out of range then there will be long gaps in the data which will just assume the next heart rate value. Similarly there will be gaps in the GPX data where Strava pauses the recording. We could add stationary points for every heart rate datapoint, but I think this would mess up the timings on Strava, as it uses the GPX points to know when you're moving.

## Exporting to Strava

Strava can hapilly load in GPX files as new workouts. I frequently use this if my girlfriend's phone decides to shut Strava down to save battery partway through a ride (frustrating). I can export my ride, and load it into her Strava.

The GPX data can be [extended](https://strava.github.io/api/v3/uploads/#gpx---gps-exchange-format) with heart rate data by adding the following to each point:

```xml
    <extensions>
     <heartrate>180</heartrate>
    </extensions>
```

In our `for` loop we can add this:
```python
	# Format the heart rate into the correct structure for GPX
	ext = {'extensions': {'heartrate': hr_last_value}}
	point.update(ext)
```

And finally, at the end of our code we use `xmltodict` in reverse:
```python
# Export the data to GPX
with open('output.gpx', 'w') as output:
	output.write(xml.unparse(ride, pretty=True))
```

And now go to Strava's [Upload and Sync Your Activies](https://www.strava.com/upload/select) to add the route. Strava will detect that the workout already exists, so as a quick fix I changed the date in the new file with a quick find-and-replace before uploading.

Now when you view the analysis of your workout, you should see your heart rate along side the speed graph!

![Strava Screenshot]({{ site.baseurl }}/images/strava-screenshot-hr.png)



