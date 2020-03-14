With the recent market volatility due to COVID-19, I found myself checking stocks too often.
Whether it's smart or not to be checking frequently during volatile times, it's definitely a pain to google
individual tickers each day and see what's happening.

I'm not trying to do day trading, but I would like to be relatively up to date on daily movements for the time being.
I also don't feel like paying for a service to do this. Are there free services that would send me daily quote info for
several stocks for free? Probably, but I thought it'd be fun to write it myself.

In short, I used a Python wrapper around [Finnhub](https://finnhub.io/) to get daily quote info. I specified
the stocks I'm interested in tracking and price limits for them. I made a gmail account to send relevant alerts to
my personal gmail account. I set it up on a daily schedule by putting it in launchd on my laptop.

Note:

I'm not interested in doing day trading, and I'm also not using this to set up automated trading.
I only care about getting daily alerts if any stocks I care about exceed price limits I set for them.

Also note that this is an extremely barebones simple thing going on here. The price limits I set are hardcoded absolute numbers
and not derivatives of any previous or current values. If you want to do any remotely automated or frequent trading,
you should definitely use a much more robust system than what's here.

### Getting stock info

I used [Finnhub](https://finnhub.io/) to get daily price info. It has a free API for several things.
Notably, you can't get tick data for free though.
There's also a small [Python wrapper](https://github.com/s0h3ck/finnhub-api-python-client) that I'm using.

I don't want to pay for anything, and I'm not interested in using any of this for intra-daily trading,
so I'm satisfied with just getting the OHLC prices per day.

Given that, it's super simple to get the info I wanted:

```python
from finnhub import client as Finnhub

client = Finnhub.Client(api_key="{API KEY}")

quote = client.quote(symbol='MSFT')
```

### Specifying stocks and limits
To specify the stocks I want to watch and what their limits should be, I put that info in a simple map:

```python
alert_values = {
    'MSFT': {
        'low': 140,
        'high': float('inf')
    },
    'DIS': {
        'low': 90,
        'high': 110
    },
}
```

You can combine this and the Finnhub quote API with a simple loop to determine if the prices exceed limits.

### Sending alerts

I don't want to have to run this script every day and parse the output. 

Part of solving this is sending the info to my email account. 

I did some ultra-barebones formatting around the info and put that in an email body text like `MSFT is HIGH`.

Then to actually send the email, I had to do a couple things. Obviously I had to write code to do so, which I'll
include below, but I also had to set up a gmail account and configure it to allow less-secure apps to connect to it.

After you create the account, you can allow less-secure apps [here](https://myaccount.google.com/lesssecureapps).

To configure the email in your code:

```python
alerts = determine_alerts_from_finnhub()

sent_from = 'Stock Watcher'
to = ['first email to send to', 'second email to send to']

if len(alerts) == 0:
    subject = 'No Alerts'
else:
    subject = 'Stock Alerts'

subject += ' - ' + date.today().strftime('%b %d %Y')
body = format_alerts(alerts)

email_text = f"""\
From: {sent_from}
To: {','.join(to)}
Subject: {subject}

{body}
"""

gmail_user = 'your email'
gmail_password = 'your password'
```

And then to send the email:

```python
import smtplib

try:
    server_ssl = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server_ssl.ehlo()
    server_ssl.login(gmail_user, gmail_password)
    server_ssl.sendmail(sent_from, to, email_text)
    server_ssl.close()
    print('email sent')
except Exception as e:
    print('couldnt connect to gmail', e)
```

### Scheduling

Now to schedule the script so that it runs once a day, we can use launchd - assuming you're on a Mac. I believe Linux distros
have anacron instead.

The nice thing about launchd over cron is that if your computer is off when the job is scheduled to run, it'll run the next
time your computer is running. 

I by no means understand launchd very well, but here's how I set up my script to run daily:

You have to specify the settings for your job with a plist file. This is what my plist file looked like:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>whatever.label.you.want</string>
    <key>KeepAlive</key>
    <false/>
    <key>RunAtLoad</key>
    <true/>
    <key>UserName</key>
    <string>your-username</string>
    <key>StandardOutPath</key>
    <string>/path/to/where/you/want/to/log/stdout.log</string>
    <key>StandardErrorPath</key>
    <string>/path/to/where/you/want/to/log/stderr.log</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/python3</string>
        <string>/path/to/your/script.py</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>08</integer>
        <key>Minute</key>
        <integer>00</integer>
    </dict>
</dict>
</plist>
```

To touch on some values in that file:
- Label: the label for your job, basically to find it when using `launchctl`
- KeepAlive: will keep the script running in the background
- RunAtLoad: runs job immediately instead of waiting for next schedule
- StandardOutPath/StandardErrorPath: any output will get appended to files you provide here
- ProgramArguments: the first arg should be the program (python3 in our case), the second arg should be your script, and any args after that would correspond to commandline-args for your script
- StartCalendarInterval: similar to cron, you can specify what interval to run a job on. Mine will run daily at 8am

Now where do you actually save that plist file? Technically, you could save it anywhere, but there are some conventional places to put it.

I put mine in `/Library/LaunchAgents`.

To load your plist file into launchd, you can use

```console
/Library/LaunchAgents $ launchctl load -w your-file.plist
```

This will load your plist file into launchd, which means it should run at its next scheduled interval. 

You can see if it was properly loaded by using

```console
$ launchctl list
```

and seeing if it's in the list. 

If you want to test your file immediately, you can use

```console
/Library/LaunchAgents $ launchctl start whatever.label.you.chose
```

to run it immediately. You should be able to see output in your log files.

### Next steps
There's hardly any error-checking in this script at all, so adding some checks would be smart.

For now, it's probably okay to get by on since the launchd job writes to a logfile and I can check on that if I'm missing
an email one day.

