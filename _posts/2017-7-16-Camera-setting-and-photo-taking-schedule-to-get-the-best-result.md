I left the camera turned on to take photos for a full and was so excited to see the results the next evening. The next evening, I came home to … disappointment. Here are some photos I found that night:

|![Bad photo](/assets/20170716-bad1.jpg)|![...and another bad photo](/assets/20170716-bad2.jpg)|

As you can see, the photo quality was terrible. I kept getting photos with different stripes of exposure, overexposed, underexposed,or just plain white. A quick search on Google gave me the answer, Apparently, I set the the camera to take the photo right on the first frame, which means the camera has no time to set itself up yet. After several different tries, I came to the perfect setting.

```bash
#!/bin/bash
DATE=$(date +"%Y-%m-%d_%H%M")
fswebcam -D 2 -S 20 --set brightness=30% --set contrast=0%  -F 10 -r  640x480 --no-banner /home/pi/camera/$DATE.jpg
```

`fswebcam`: After the camera is called,
`-D 2`: I set it to delay for 2 seconds, this can be thought of as warming up time.
`-S 20`: then, I skip the next 20 frames, just so the camera is used to the exposure and brightness of the scene
`--set brightness=30%`: my room can be a bit dark at time so I raise the brightness slightly
`--set contrast=0%`: I was testing with other values here but in the end, I decided to keep it as default. I would suggest to play around with Åthis value as it does improve the colours and exposure of the images.
`-F 10`: I then finally take a photo, I choose to take it in 10 frames, which gives some interesting effect with the cars moving outside my window.

`-r  640x480`: I originally set the resolution to 1080x960 but I don’t think the photos need to be that big. 640x480 is also a nice size when it comes to making little gif.
`--no-banner`: I use this option to clear out any banner the camera app automatically overlays on the final images.

Here is the camera settings for reference.

| Available Controls | Current Value | Range |
| -------- | ------- | ----- |
| Brightness | 97 (29%) | 30 - 255 |
| Contrast | 0 | 0 - 10 |
| Saturation | 83 (41%) | 0 - 200 |
| White Balance Temperature, Auto | True | True / False |
| Power Line Frequency | 50 Hz | Disabled / 50 Hz / 60 Hz |
| White Balance Temperature | 4500 (23%) | 2800 - 10000 |
| Sharpness | 25 (50%) | 0 - 50 |
| Backlight Compensation | 5 | 0 - 10 |
| Exposure, Auto | Aperture Priority Mode | Manual Mode / Aperture Priority Mode |
| Exposure (Absolute) | 156 (0%) | 5 - 20000 |
| Pan (Absolute) | 0 (50%) | -201600 - 201600 |
| Tilt (Absolute) | 0 (50%) | -201600 - 201600 |
| Zoom, Absolute | 0 | 0 - 10 |
Adjusting resolution from 384x288 to 352x288.

For more details, please read: [Ubuntu manual for fswebcam](http://manpages.ubuntu.com/manpages/xenial/man1/fswebcam.1.html)

I tested making the gif from the photos so far. They are pretty great. However, there are too many photos and those taken at night are not very useful. I changed the scheduling so it’s taking photo every 15 mins between 5am to 8pm only.

```bash
sudo crontab -e
*/15 5-20 * * * /home/pi/camera.sh 2>&1
```