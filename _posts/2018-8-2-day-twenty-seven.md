After a frustrating day yesterday, I was rewarded with making some good progress on dolphot pretty quickly today. I prepared all of the flc files for photometry and got the paramter file ready -- I had confirmed I can do this before now, but I have now actually run `calcsky` and all the commands that precede it the requisite number of times for the flc images in the first folder (26 per folder). I haven't run the `dolphot` command yet because I know it won't be able to deal with the drc file for now, so that's where I turned my attention next: getting `wfc3mask` to understand drc images.

# wfc3mask
So, I took a closer look at the error messages I was getting. When I try `splitgroups` or `calcsky` on the drc image, I get the same error as Rory where it splits the image into four extensions (because you have to run `calcsky` on the image first). Other than that, it seems like those two commands are working well. I haven't gotten the 'free point not allocated` error in a long time, though I'm not sure why. Maybe my parameter file is just correct now and it wasn't before. Now what I'm getting is this:  
>Reading FITS file ib2o01020_drc.fits   
Reading IMAGE extension: 5644x5895  
Reading IMAGE extension: 5644x5895  
Reading IMAGE extension: 5644x5895  
Reading BINTABLE extension: 2097x10   
Error: unable to parse bintable (unknown form K)    
  BAD=-1.00 SAT=65535.00    
  BAD=-1.00 SAT=65535.00    
  BAD=-1.00 SAT=65535.00    
  BAD=-1.00 SAT=65535.00    
  BAD=-1.00 SAT=65535.00    
  BAD=-1.00 SAT=65535.00    
Writing FITS file ib2o01020_drc.sky.fits    
Writing IMAGE extension: 5644x5895    
Writing IMAGE extension: 5644x5895    
Writing IMAGE extension: 5644x5895    
Writing BINTABLE extension: 2097x10   

