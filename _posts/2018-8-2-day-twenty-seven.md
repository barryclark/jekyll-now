After a frustrating day yesterday, I was rewarded with making some good progress on dolphot pretty quickly today. I prepared all of the flc files for photometry and got the paramter file ready -- I had confirmed I can do this before now, but I have now actually run `calcsky` and all the commands that precede it the requisite number of times for the flc images in the first folder (26 per folder). I haven't run the `dolphot` command yet because I know it won't be able to deal with the drc file for now, so that's where I turned my attention next: getting `wfc3mask` to understand drc images.

# `wfc3mask`
So, I took a closer look at the error messages I was getting. When I try `splitgroups` or `calcsky` on the drc image, I get the same error as Rory where it splits the image into four extensions (because you have to run `wfc3mask` on the image first). Other than that, it seems like those two commands are working well. I haven't gotten the 'free point not allocated' error in a long time, though I'm not sure why. Maybe my parameter file is just correct now and it wasn't before. Now, when running `wfc3mask`, I get this:  
>Reading FITS file ib2o01020_drc.fits   
Reading IMAGE extension: 5644x5895    
Reading IMAGE extension: 5644x5895    
Reading IMAGE extension: 5644x5895    
Reading BINTABLE extension: 2097x10   
Error: unable to parse bintable (unknown form K)    
Irregular size; assuming drizzled   
Error: TABLE card "READNSEA" not found    
Error: TABLE card "READNSEB" not found    
Error: TABLE card "READNSEC" not found    
Error: TABLE card "READNSED" not found    
NCOMBINE keyword not found; assuming data came from single image    
Segmentation fault (core dumped)      

I'm not sure what to do about the 'BINTABLE' error, but I can tackle the "READNBSE(ABCD)" and "NCOMBINE" errors. They're just missing from the header of the .fits file. Luckily, Marta has already written codes for adding things to .fits file headers. She gave me [one of her codes](https://github.com/GosnellResearchGroupSummer2018/NGC6819) on a flash drive, and I modified it to to add the keywords that I want. After a quick aside to install ds9 (I didn't see the Windows download link for ds9 at first, so I looked up how to install Unix programs through "Bash on Ubuntu on Windows," the name of what I'm using for Ubuntu. It requires downloading an Xserver, so I did that and all went smoothly, but when I went back to the ds9 download page, I saw the Windows download link and just did it through Windows), I checked the headers of the drc file and saw that the normal header does have values for READNSE(A,B,C,D), but the [SCI] version of the header does not. That's good; I didn't know what I was actually going to put for those values. Weirdly, "NCOMBINE" is already in [SCI], but not in the normal one. When I run Marta's code, it gives me back out a .fits file with only one header that contains both things. Now, the only error I get is: 
>Error: FITS card "FILETYPE" not found    
**Format error (filetype,telescop,instrume)

Well, the "BINTABLE" error went away. Now, I'm going to add the "FILETYPE" keyword. I went back to the original and found that "FILETYPE" should look like: 
>'SCI'

Adding that to the header and running again gives:
>Error: FITS card "TELESCOP" not found    
**Format error (filetype,telescop,instrume)

so I'm assuming that I need to add both "TELESCOP"='HST' and "INSTRUME"='WFC3'. I ran it again after editing the header and the program gave me two more things to add to the header -- "DETECTOR"='UVIS' and "APERTURE"='UVIS-CENTER' and has the gall to claim that this isn't WFC3 data (?!¿?¡). After adding "DETECTOR" and "APERTURE", the only error I get now is:
>ib2o01020_drc.fits is not a WFC3 fits file

This confused me for awhile but I figured out that it's because Marta's program does not write most of the data that's already in the .fits file when it comes from MAST. It creates a new .fits file from only the .fits image and whatever ingredients you added above this line:
>`fits.writeto('newheader.fits', data, header, overwrite=True)`,

meaning that the new file is lacking all the original's extensions, etc. Even though this means that future commands now work because they rely on the fact that the image only has one chip, I'm sure that wfc3mask is not working properly, still. 

BUT,  `splitgroups` and `calcsky` WORK now! I can "split" the drc image into a single chip (there was only one extension) called 'ib2o01020_drc.chip0.fits' with `splitgroups`, and `calcsky` creates 'ib2o01020_drc.chip0.sky.fits' after some thinking, just like with flc images. I'm not sure if I need to use the 'chip[x].sky.fits' files or just the 'chip[x].fits' files, but the pydolphot tutorial uses the '.chip[x].fits' files so I'll try that first. 

I don't know how terrible this error is; I think we can roll with it. It's my understanding from reading manuals that all `wfc3mask` does is compress the four extensions into one and hide bad pixels, I think usually caused by comsmic rays. Marta's code gets us to the one extension, and she can do cosmic ray rejection as well, so... we don't need `wfc3mask`? I think this might be why the WFC3 documentation said that drc and drz .fits files aren't compatible with the WFC3 module. I have also found out more about the files (crj or crc) they do say are compatible, but haven't found where on the internet to get them, although I do now know how to make them from the [WFC3 Data Handbook](http://www.stsci.edu/hst/wfc3/documents/handbooks/currentDHB/Chapter2_data_structure2.html). 

How I see it, I have two options to decide from. I could cheat and use this round-the-back hack for making dolphot recognize drc images, or I could get Astrodrizzle and make some crc images myself. I think the cheater method might lead to some issues in the future as well as less accuracy, so I'm very tempted to download Astrodrizzle. I think it's worth it, is it?

For today, I am going to use the hack and see if I get any photometry results. For the first time ever, running dolphot actually makes something happen in the terminal. I'm cautiously optimistic. 

I don't think it's working. It starts writing this:   
>Reading FITS file ib2o01ssq_flc.chip1.fits: 4096x2051    
  GAIN=1.00 EXP=600s NOISE=3.08 BAD=-31.13 SAT=102335.94    
Reading FITS file ib2o01ssq_flc.chip2.fits: 4096x2051   
  GAIN=1.00 EXP=600s NOISE=3.13 BAD=-23.47 SAT=99188.09   
Reading FITS file ib2o01spq_flc.chip1.fits: 4096x2051   
  GAIN=1.00 EXP=600s NOISE=3.08 BAD=-13.33 SAT=103323.77    
Reading FITS file ib2o01spq_flc.chip2.fits: 4096x2051   
  GAIN=1.00 EXP=600s NOISE=3.13 BAD=-8.88 SAT=100444.31   
Reading FITS file ib2o01ssq_flc.chip1.fits: 4096x2051   
  GAIN=1.00 EXP=600s NOISE=3.08 BAD=-31.13 SAT=102335.94    
Reading FITS file ib2o01ssq_flc.chip2.fits: 4096x2051     
  GAIN=1.00 EXP=600s NOISE=3.13 BAD=-23.47 SAT=99188.09   
Reading FITS file ib2o01suq_flc.chip1.fits: 4096x2051   
  GAIN=1.00 EXP=670s NOISE=3.08 BAD=-10.50 SAT=102375.97    
Reading FITS file ib2o01suq_flc.chip2.fits: 4096x2051   
  GAIN=1.00 EXP=670s NOISE=3.13 BAD=-4.70 SAT=100861.48   
Reading FITS file ib2o01sxq_flc.chip1.fits: 4096x2051   
  GAIN=1.00 EXP=616s NOISE=3.08 BAD=-25.34 SAT=102823.77    
Reading FITS file ib2o01sxq_flc.chip2.fits: 4096x2051   
  GAIN=1.00 EXP=616s NOISE=3.13 BAD=-16.82 SAT=99291.98   
Reading FITS file ib2o01020_drc.chip0.fits: 5644x5895   
  GAIN=1.40 EXP= 1s NOISE=5.40 BAD=-1.00 SAT=65535.00   
** Chip 1 **    
Alignment estimates from WCS header   
image 1: shift -247.61 256.53, scale 1.000570, rotate -0.002    
image 2: shift -247.61 256.52, scale 1.000568, rotate -0.002    
image 3: shift -756.09 -751.93, scale 1.000543, rotate -0.002   
image 4: shift -756.09 -751.94, scale 1.000541, rotate -0.002   
image 5: shift -247.61 256.53, scale 1.000570, rotate -0.002    
image 6: shift -247.61 256.52, scale 1.000568, rotate -0.002    
image 7: shift 764.24 758.14, scale 1.000541, rotate -0.002   
image 8: shift 764.24 758.13, scale 1.000539, rotate -0.002   
image 9: shift 255.76 -250.28, scale 1.000550, rotate -0.002    
image 10: shift 255.76 -250.29, scale 1.000548, rotate -0.002   

and then I check my task manager and realize Ubuntu is only using 0% of my processor or disk and 13MB/s of RAM. So, in other words, it's just open and nothing is happening. Looking at the directory where I'm doing all this confirms that nothing is happening; I see that the '.phot' file has been created, but like Rory's was at first, it's empty. I'm going to come back to this tomorrow. 

# Conclusion
It felt really good to get a lot of photometry done today, finally. I feel like I hadn't even done that for awhile. Hopefully tomorrow brings something nice, but I really think the only viable option is downloading Astrodrizzle and making some crc images. That sounds kinda fun, though. 
