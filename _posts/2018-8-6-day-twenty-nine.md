So, after a reccomendation from Dr. G, I looked again at running `dolphot` without running `wfc3mask` on the drc images. There's still a few troubling things, and I'm actually getting the same result that I was before, but it's not as bad as I thought at first. 

# `dolphot`
So, if you try to run `dolphot` with the pure drc image as reference, you get the error "Number of extensions are not the same" and the program fails. You can still run `splitgroups` on just the drc image without doing `wfc3mask` -- which is where the problem truly lies -- but this only 3/4 works. You get this:
>Reading FITS file ib2o01020_drc.fits   
Reading IMAGE extension: 5644x5895    
Reading IMAGE extension: 5644x5895    
Reading IMAGE extension: 5644x5895    
Reading BINTABLE extension: 2097x10   
Error: unable to parse bintable (unknown form K)    
Writing FITS file ib2o01020_drc.chip1.fits: 5644x5895   
Writing FITS file ib2o01020_drc.chip2.fits: 5644x5895   
Writing FITS file ib2o01020_drc.chip3.fits: 5644x5895   
Writing FITS file ib2o01020_drc.chip4.fits: 2097x10   
Segmentation fault (core dumped)    

So, it looks like `splitgroups` works for the first three extensions and not the fourth. Looking in the working directory, the file 'ib2o01020_drc.chip4.fits' is only 96 KB, as opposed to the other three at 130,003 KB. I'm troubled by this, but it turns out it's not fatal like I thought it was before. I ended up using 'ib2o01020_drc.chip1.fits' as the reference image (all the chips are the same dimensions take up the same space on my SSD, so I don't think it matters which I use) and ran `dolphot`. These are exactly the same conditions I used the first time I ran `dolphot`, and that time I checked the task manager and saw that the Ubuntu terminal wasn't using any processor or memory. I figured this meant that dolphot wasn't working, but I failed to scroll down a little bit and look in "Background Processes," not just "Apps". Turns out, dolphot is running in the background and taking up about 30% of my cpu and almost 2GB of RAM. It does stop at the same point it did before, but I was more patient this time around and it moved past that part. At the time of writing this, dolphot has already computed the alignment from the WCS in the header and found 343 stars to use for alignment. It's now on the "Finding Stars" step for photometry, but hasn't found anything yet. 
