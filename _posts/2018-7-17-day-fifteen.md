After a hectic day, I'm finally able to sit down and work on photometry. Really quickly, before I start reading Rory's posts and learning DOLPHOT, I remade a few of the images that I posted yesterday so that I could give accurate information about the code that made them. Here they are: 

**[sources_phot_table](https://github.com/GosnellResearchGroupSummer2018/NGC6819/blob/master/first_attempt_at_HST_source_detection/day_seven/phot_table.txt)**    
![sources]({{ thom-ory.github.io }}/images/day_fifteen/sources.png)     
_FWHM = 3.0, Threshold = 5σ ("democratic" source detection, looking for most sources possible)_      

**[bright_sources_phot_table](https://github.com/GosnellResearchGroupSummer2018/NGC6819/blob/master/first_attempt_at_HST_source_detection/day_seven/bright_phot_table.txt)**      
![bright_sources]({{ thom-ory.github.io }}/images/day_fifteen/bright_sources.png)         
_FWHM = 4.3, Threshold = 7σ ("oligargich" source detection, looking for brightest sources)_     

_**Note: When comparing the two raw images to the two that have the sources circled, you'll notice that they disagree on what the true RA and Dec are. That's an error; the RA and Dec are correct on the source images, but the images with circles on them contain information from an earlier test which do not correspond to that actual section of sky. All four images depict the same section of sky.**_

![fluxes]({{ thom-ory.github.io }}/images/day_fifteen/fluxes.png)       
_Fluxes according to [bright_sources_phot_table](https://github.com/GosnellResearchGroupSummer2018/NGC6819/blob/master/first_attempt_at_HST_source_detection/day_seven/phot_table.txt). I decided that  bright_phot_table.txt represented better source detection. RA and Dec information are correct in this image_

---
Like has been the case so far, these codes are detecting extra sources around diffraction spikes, and are missing a few smaller sources. I'm planning on being more empirical about which FWHM I use by writing a code (tomorrow) that will actually determine the FWHM of the sources in the image. Hopefully, this will improve the source detection. 
