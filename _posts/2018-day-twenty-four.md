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

>Finally, there are six new parameters that can be used:  
WFC3useCTE = 1   
FlagMask = 4   
CombineChi = 0   
WFC3IRpsfType = 0
WFC3UVISpsfType = 0   
InterpPSFlib = 1  

Nifty things, manuals. I ended up changing FitSky, img_RChi, img_RSky, img_RSky2, img_apsky, SkipSky, SecondPass, SigFindMult, MaxIT, NoiseMult, Rcentroid, RCombine, SigPSF, and added the other paramters (setting WFC3UseCTE = 0). 

Now it's time to run DOLPHOT on this folder. Let's see what happens. 

What's happens is... weirdness. I honestly have no idea what's going on. The terminal just tells me "PSTPhotIt=1-5." ...what? 'PSFPhotIt' is a parameter, but not 'PSTPhotIt'. I looked, in the parameter file, 'PSFPhotIt=5', so shouldn't be a problem. I tried running it with it set to 4, same thing. I tried overriding it from the command line. I tried renaming 'PSFPhotIt' to 'PSTPhotIt'. Nothing worked. I googled "PSTPhotIt" and literally the _only_ result was [this](https://github.com/dstndstn/dolphot/blob/master/dolphot_common.h), which I think is the raw code for DOLPHOT, and there's one line that says:
> if (!strcasecmp(var,"PSFPhotIt")) {PSFPhotIt=i; if (PSFPhotIt<1 || PSFPhotIt>5) perr("PSTPhotIt=1-5"); return 1;}

which shows that the only existence of "PSTPhotIt" on the internet is as the typoed error message when PSFPhotIt is outside of the bounds. This lead me to discover that dolphot isn't looking at the meticulously-planned parameter file I've been writing but the generic one that came with DOLPHOT. Ugh. I tried copying my 'ib2o01020_phot.param', the file specifically designed for this one folder, into the param folder that dolphot has, still specifying which parameter file to look. It again ignored me. I made a copy of the original parameter file, called it '[backup]dolphot.param', saved it to the desktop, and replaced the body of 'dolphot.param' with what I had written. This led to something new, finally, but it gave me this:
>Cannot parse parameter line:  
Cannot parse parameter line:  
Cannot parse parameter line:   
Cannot parse parameter line:  
Cannot match parameter name:  
PSFa  
Cannot match parameter name:  
PSFb  
Cannot match parameter name:  
PSFc  
Cannot parse parameter line:  
Cannot parse parameter line:    
Cannot parse parameter line:  
Cannot parse parameter line:  
Reading FITS file ib2o01soq_flc.chip1.sky.fits: 4096x2051    
  GAIN=1.00 EXP=10s NOISE=3.08 BAD=-44.24 SAT=99299.56    
Reading FITS file ib2o01soq_flc.chip2.sky.fits: 4096x2051   
  GAIN=1.00 EXP=10s NOISE=3.13 BAD=-30.97 SAT=98252.36    
Reading FITS file ib2o01spq_flc.chip1.sky.fits: 4096x2051   
  GAIN=1.00 EXP=600s NOISE=3.08 BAD=-13.33 SAT=103323.77    
Reading FITS file ib2o01spq_flc.chip2.sky.fits: 4096x2051   
  GAIN=1.00 EXP=600s NOISE=3.13 BAD=-8.88 SAT=100444.31   
Reading FITS file ib2o01ssq_flc.chip1.sky.fits: 4096x2051   
  GAIN=1.00 EXP=600s NOISE=3.08 BAD=-31.13 SAT=102335.94    
Reading FITS file ib2o01020_drz.fits    
  GAIN=1.40 EXP=2496s NOISE=5.40 BAD=-1.00 SAT=65535.00   
****Number of extensions are not the same   



# Conclusion
I'm just realizing that I only ever downloaded the WFC3/UVIS data, but I have PAMs and PSFs for ACS/WFC as well. I think maybe I was right to only download WFC3/UVIS data in the first place, and I think I only downloaded ACS/WFC PSFs and PAMs because the [PYDOLPHOT tutorial](https://github.com/dweisz/pydolphot) said to. Should I download the ACS/WFC data, too? 

Also, I confidently stated earlier that you don't need to run `wfc3mask` and the rest of the WFC3 things on drizzled images, but I'm actually not super sure. Are _crj images drizzled, too? Why are we getting an error? Does `wfc3mask` support drizzling? The manual can't seem to make up it's mind on the last question. I gotta say though, I think this worked -- without bothering about the drizzled stuff. 
