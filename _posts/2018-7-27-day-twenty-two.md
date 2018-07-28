Today was a DOLPHOT day. Here's what happened:

#DOLPHOT
So, while writing the new parameter file last night, I had a very important epiphany about how to run DOLPHOT. I was in error before because I had no refernce image and tried to do every file that I have at once. No one said it explicitly anywhere, but I've figured out from reading the [manual](https://github.com/GosnellResearchGroupSummer2018/NGC6819/blob/master/dolphot_userguide.pdf) and that PYDOLPHOT tutorial 1000 times that you need a drizzled image as the reference image and then you can do photometry on all the flc images that the drizzled image is a composite of. I never got DOLPHOT to work on my laptop, so I tried to run it with the new parameter file with that information in my head on the Macs first thing when I got to the computational lab. Some changes that I made to the parameter file follow (everything is set to the default DOLPHOT settings except for these things):

Nimg = x  
_where x is the number of images that make up the drz reference image, known as science images_

img0_file = ib2o0xxxx_drz.chip1  
_refence image's base filename without the .fits tag, after splitgroups has been performed_

imgx_file = ib2o0xxxx_flc.chipx  
_each science image must be entered into the parameter file individually w/o the .fits extension. x is a placeholder for 1, 2, 3..._

imgx_xform = 0 0 0 
_Scale ratio, cubic distortion, and linear and quadratic variation for an image. It was {1 0 0} before, but I'm using an option that comes later called "useWCS" that was turned off before and uses WCS in the header to compute the full transformation_ 

RAper = 3  
_I increased the aperture radius to 3 from 2.5 because this is a more common value in manuals and I was detecting too few stars before_

RChi = 1.8  
_this is the radius of the aperture in which the chi value is calculate. it must be less than img_RAper and defaults to -1, which tells the program to use img_RAper as RChi, but I guess that a smaller aperture is better_

RPSF = 13  
_again, this is default value, but I had changed it to 10 the other day and decided to change it back after learning how it works and that it should be set large enough that there should be no light outside this radius from the star after background subtraction_

SigFindMult = .8  
_varies between .75 and 1 based on how good the sampling is for your PSF. I did some googling and found some awesome PSF resources I'll talk about and link to later, but I found that the Tiny Tim HST PSF package that I'm using is considered undersampled, so I put this value on the lower side of the range_ 

SigFinal = 2.5  
_threshold for a star to be listed as a source. To list all detected stars, set (as I did) SigFinal = SigFind, an earlier parameter I didn't change_ 

MaxIT = 50  
_I doubled the default value for maximum number of iterations for photometry because I feel that's more accurate_

PSFPhotIt = 5  
_Number of iterations to use for photometry. DOLPHOT will automatically go further than this if it's required for convergence, but will always at least do this many. I increased this value from 1_ 


FitSky = 3  
_FitSky has 5 options called 0,1,2,3, and 4 where 1 and 3 are the recommended settings and do normal PSF fitting, and 3 is slightly more precise because it does 2-parameter fitting inside the PSF aperture (changed from 1 to 3)_

NegSky = 0  
_I decided not to allow negative pixels because the manual says this "can increase robustness of photometry of nearby neighbors" (although, none of our images are too terribly crowded_ 

Zero = 25  
_This is the "zero point for a star of brightness 1 DN/s," which seems like it would be really specific to the particular image you're using, but I'm not sure how to check that. I'm not going to mess with it now, but I hope I'll understand this better after I read those resources I meantioned earlier about general PSF photometry_

RCombine = 1  
_Minimum pixel separation of two sources to be seen as separate. Reduced from 2 to 1_

sigPSF = 8
_Minimum signal:noise ratio to attempt PSF solution. Reduced from 10 to 8_

MinS = 1.5  
_Minimum FWHM for a good star. Increased from .65 to 1.5. It seems like the FWHM for these sources about 3 from my previous experience_

MaxS = 6  
_Max FWHM for a good star. Increased from 2_

MaxE = .65  
_Max ellipticity for a good star. I moved it closer to one, it was .5 before_

useWCS = 2   
_has options 0, 1, and 2, where two computes the full transformation using WCS. Was zero (off) before_

Align = 3  
_has options 0 - 3 where 3 computes the full transformation. Was on 1, which only computes x,y offset_

AlignIter = 10  
_passes to align image. increased from 1_

Rotate = 1  
_Corrects for rotation in alignment, was 0 before_

PSFsol = 2  
_Type of PSF solution, scalar, linear, or quadratic. I chose quadratic for accuracy_

psfoff = 0.0  
_I'm not messing with this at the moment, but I need to figure out a few things. psfoff (PSF offset) should be as above if using a DOLPHOT star list, but to 0.5 if using a DAOPHOT or IRAF star list. This may not even be relevant because I think it has to do with another feature that allows you to specify where the sources are before running photometry that I'm not using. I think that's what they mean by star list, so if I do use that feature in the future it would a DOLPHOT star list anyway. I might do this later, there's a few things I can do and am planning on doing after running the original photometry to make it better, and this might be one thing_

SubPixel = 5  
_Number of PSF calculations per dimension per pixel. It was at 1, which is good for PSFs with high sampling, but ours are not, so they require a greater number of passes_

FakeStars =
_Right now, I'm leaving this blank, but after I've done this once or twice I'm going to come back to this fake stars thing because it can catch mistakes in the photometry and make it more reliable and accurate. It seems complicated, so I'll detail my adventures with this ability once I have good photometry_ 

UsePhot = 
_Like FakeStars, I'm leaving this blank for now. This allows you to use a the information from a previous photometry run to improve another pass, so I'll do that once I have some information. I'm guessing this weekend will be consumed by making these last two parameters useful_

So, the epiphany I mentioned at the beginning means that I have to completely change up my strategy for running DOLPHOT. It also made me realize that those were actually error messages I got the first time I ran DOLPHOT. The real output should tell me which .fits file it's analyzing at any given time and then tell me how many stars it's found as it's finding them while it's running. No matter what, the next step is to go back to MAST and get drizzled images again then all their flc components and put them all in a unique folder for each drizzled image. I could just get the drizzled images from MAST and try to use header info to figure out which flc images go with which drz images, but that seems inefficient. This took longer than I was expecting if I'm honest. I also forgot that when I installed DOLPHOT on this computer (the Mac), I only got the F606W PSFs because I was confused at the time, so I went back and got the F814W band, too. 

So, downloading those data files took way longer than I thought it would. Well, really organizing them so that DOLPHOT likes them took forever. I have them all now, and they're all pretty in their proper directories. Let's see if DOLPHOT works. 

It ALMOST works. So close. For a second, I was having the 15 chip issue, but realized I should have been using `wfc3mask`, not `acsmask`, and that fixed it. It works great for flc images, but I need to modify the parameter file (a different one for the WFC3 module) and maybe add some other things to make it work with drizzled images. I'm not exactly what all I have to do yet. 

# Conclusion
Today felt like a lot of work for a little progress, which has been happening more and more lately. Downloading and organizing data took a long time, figuring out the parameter file took a long time (even though I wrote it last night, I ended up pouring over it again and second guessing myself for over an hour and a half while I was writing that guide above), and running DOLPHOT takes awhile, too. While I'm interested what things PYDOLPHOT does to streamline the running of DOLPHOT, I still really don't want to start looking at PYDOLPHOT since I'm already so invested in the original. I'm glad Rory is using it so I can see what it's about and so we can have multiple photometry analyses. 

Rory and I were also wondering if `wfc3mask` works with batches, and I think the answer is yes, but it wasn't yet working for me because I have flc and drz images in the same folder and I can't get `wfc3mask` to work with the drizzled pictures yet. Moreover, I'm almost certain you can't use the same `wfc3mask` parameters put a mask on flc and drz images so I'll have to do them separate. 

Tomorrow should see some photometry results pretty quick. I want this weekend to be mostly focused on making those results better, not getting them in the first place. I always think things won't take as long as they do, but right now I'm thinking I can get that data within an hour of coming to the lab tomorrow. So, it'll probably take all day, but let's hope I'm right for once. 
