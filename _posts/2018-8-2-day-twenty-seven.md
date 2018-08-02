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

I'm not sure what to do about the 'BINTABLE' error, but I can tackle the "READNBSE(ABCD)" and "NCOMBINE" errors. They're just missing from the header of the .fits file. Luckily, Marta has already written codes for adding things to .fits file headers. She gave me one of her codes on a flash drive, and I modified it to to add the keywords that I want. After a quick aside to install ds9 (I didn't see the Windows download link for ds9 at first, so I looked up how to install Unix programs through "Bash on Ubuntu on Windows," the name of what I'm using for Ubuntu. It requires downloading an Xserver, so I did that and all went smoothly, but when I went back to the ds9 download page, I saw the Windows download link and just did it through Windows), I checked the headers of the drc file and saw that the normal header does have values for READNSE(A,B,C,D), but the [SCI] version of the header does not. That's good; I didn't know what I was actually going to put for those values. 

As far as the 'BINTABLE' error goes, I'm not really sure what's going on, but it doesn't seem fatal. 
