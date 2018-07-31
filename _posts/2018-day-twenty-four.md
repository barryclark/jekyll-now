I'm back in the Mac lab. After struggling for awhile to get the reset on my laptop done because no restore points had been created (due to the fact that I recently migrated the OS to an SSD), I went to sleep frustrated last night. In the morning, I consulted Dr. Google again and figured out the right way to do what I want. The things I saw yesterday ended up just taking me down a rabbit hole (they were geared towards a system reset whereas I want to install a new version of Windows from scratch). My laptop is now on the desk behind me downloading Windows, and I'll install it once that's done. For now, it's nice to be back on these Macs (even though my laptop actually competes with them when it comes to power, it's just... Windows...). 

# DOLPHOT
Time to figure out drz. The error I was getting all those years ago was that `wfc3mask` didn't like looking at drizzled images. I think this is because `wfc3mask` requires different settings for drz images. The first thing I'm going to try is copying all the drz files into their own directories, changing the parameters for `wfc3mask` for that directory, and running it only in that directory. 

Well, I just found something super useful in the [user manual for the WFC3 module](http://americano.dolphinsim.com/dolphot/dolphotWFC3.pdf). In the introduction to _§3 Preprocessing Steps_, it says: "Because drizzled images produce suboptimal photometry (because of resampling of the images), support exists only for CRJ and FLT datasets."  It actually supports _flc, too; I've done it before. I read the rest of the manual and have decided that you do not need to run `wfc3mask` on drizzled images because you're not using them for photometry, just WCS. So, I ran `wfc3mask` on all the _flc images and moved on with my life. 

`wfc3mask` worked beautifully for these _flc images. I picked up a piece of advice from the manual that I should combine the flc images with the reference image using DOLPHOT's `imcombine` command and use that as a reference image for the best accuracy, so I'll keep that in the back of my head for a future running of DOLPHOT. For now, I'm just going to keep it as simple as possible to try to get some results. I also figured out why `splitgroups` makes 15 or more chips when you don't so `wfc3mask`; it's because, according to the [manual](http://americano.dolphinsim.com/dolphot/dolphotWFC3.pdf), "The data quality and noise extensions are deleted when writing the data back to disk [using `wfc3mask`]. The output image will thus have one extension if it is an IR or drizzled image, or two if a UVIS image." 

I then did `splitgroups`, again only on the _flc images and not the drizzled one. I hope that's right; I think it is. Thus far, I had been able to do `*_flc.fits` to perform the operation on all the images in the directory, but it looks like calcsky needs to be run one-by-one. Not terrible -- after splitting there are 10 images per folder (except for one that will have only 2), since again this is only being done on the _flc.fits files. That makes 122 times running calcsky. After renaming probably a thousand or so files this weekend, that's nothing. 

I might take that back, calcsky takes a little time to run... I got it done for the first folder, so we'll have that photometry at least. I get to skip the next step, running `wfc3fitdistort`, because "if using UseWCS=1 or UseWCS=2 in the DOLPHOT parameters, this step can often be skipped," and I'm doing 'UseWCS=2'. I also need to adjust the parameter file because "in this case, the alignment lines should be 'img shift = 0 0' and 'img xform = 1 0 0'" as opposed to my initial guess of 'img_xform=0 0 0'. I also found this: 

> Recommended values for other parameters for WFC3/UVIS are as follows:    
PSFPhot = 1    
Force1 = 0    
FitSky = 2   
img RAper = 3     
img RChi = 2     
img RPSF = 13     
img RSky2 = 4 10     
img RSky = 15 35    
img apsky = 15 25    
SkipSky = 2     
SkySig = 2.25   
SecondPass = 5     
SigFindMult = 0.85   
MaxIT = 25   
NoiseMult = 0.10   
FSat = 0.999   
ApCor = 1   
RCentroid = 2  
PosStep = 0.25  
RCombine = 1.5  
SigPSF = 5.0  
PSFres = 1  

Nifty things, manuals. 

# Conclusion
I'm just realizing that I only ever downloaded the WFC3/UVIS data, but I have PAMs and PSFs for ACS/WFC as well. I think maybe I was right to only download WFC3/UVIS data in the first place, and I think I only downloaded ACS/WFC PSFs and PAMs because the [PYDOLPHOT tutorial](https://github.com/dweisz/pydolphot) said to. Should I download the ACS/WFC data, too? 

Also, I confidently stated earlier that you don't need to run `wfc3mask` and the rest of the WFC3 things on drizzled images, but I'm actually not super sure. Are _crj images drizzled, too? Why are we getting an error? Does `wfc3mask` support drizzling? The manual can't seem to make up it's mind on the last question. I gotta say though, I think this worked -- without bothering about the drizzled stuff. 
