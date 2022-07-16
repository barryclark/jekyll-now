---
layout: post
title: Alexa and AppleTV via Kubernetes
---
## WTF Kinda Tutorial is this?
It's not, it's my notes for how I got everything up and running... The readme's from homebridge-alexa and homebridge-apply-tv-remote have more details.
## References
- My Homebridge config [git repo](https://github.com/hashtagcyber/homebridge-on-k8s)
- homebridge-alexa [git repo](https://github.com/NorthernMan54/homebridge-alexa)
- homebridge-apple-tv-remote [git repo](https://github.com/lukasroegner/homebridge-apple-tv-remote#readme)
    - *Note*: There are known stability [issues](https://github.com/lukasroegner/homebridge-apple-tv-remote/issues/46) with this plugin. I like to play with broken toys...

## My notes
1. Deploy homebridge
2. Register an account with [homebridge.ca](https://www.homebridge.ca/)
    - These creds are going directly into the config file :( , don't re-use passwords.
3. Install the homebridge-alexa plugin... HomebridgeUI>Plugins>Search "homebridge-alexa" >> Install
4. Enter your homebridge.ca credentials in the Plugin Settings... HomebridgeUI>Plugins>"Homebridge Alexa">Settings
5. Restart Homebridge (Click the power button in the top right corner of the UI)
6. Install NPM + NVM if you don't have it (M1 Mac Instructions):
```
# I know, curl to bash... just like the hax0rz do :(
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
source ~/.bash_profile
nvm install v15
```
7. Install and use node-appletv-x to generate an API key for your TV.
```
npm install -g node-appletv-x
appletv pair
    <Enter Pin from TV when prompted>
Credentials: <Save-This-String-For-Later>
```

8. Install the homebridge-apple-tv-remote plugin via the HomebridgeUI
9. Update the plugin settings:
    - Device Name: Idiot Box
    - Device Credentials (Step 7)
    - Configure Switches (I just want play/pause)
    - Click save
    - *Note* It might be better just to copy/paste this config (update your credentials)
    ```
    {
    "name": "Apple TV Platform",
    "devices": [
        {
            "name": "Idiot Box (TV)",
            "credentials": "<SNIP - Step 7>",
            "isPlayPauseSwitchEnabled": false,
            "playPauseSwitchName": "Idiotbox Pause",
            "commandSwitches": [
                {
                    "name": "Play (TV)",
                    "commands": [
                        {
                            "key": "play",
                            "longPress": false
                        }
                    ]
                },
                {
                    "name": "Pause (TV)",
                    "commands": [
                        {
                            "key": "pause",
                            "longPress": false
                        }
                    ]
                },
                {
                    "name": "Right (TV)",
                    "commands": [
                        {
                            "key": "right",
                            "longPress": false
                        }
                    ]
                },
                {
                    "name": "Left (TV)",
                    "commands": [
                        {
                            "key": "left",
                            "longPress": false
                        }
                    ]
                }
            ]
        }
    ],
    "platform": "AppleTvPlatform"
}
    ```
10. Restart Homebridge
11. In Alexa App, add the "Homebridge" skill, and sign-in to your Homebridge.ca account.
12. Say, "Alexa discover devices"
13. <Magic Happens>
14. You should be able to see your Idiot Box in the "Devices" menu of the Alexa App.
15. A bit of troubleshooting... remove/reinstall the homebridge-alexa plugin if things aren't showing up
