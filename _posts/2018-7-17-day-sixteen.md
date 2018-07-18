When I came in tooday, the first thing I tried to do was install DOLPHOT. This requires me to install the GNU Compiler Collection (GCC) first. As I was going through the process, I realized that I need administrator credentials to install these types of things. I'll ask Dr. G what to do at our morning meeting tomorrow; I know she and Marta already encountered something similar, and I have something else (see below) to do in the meantime. Once I get the permissions I need, installation should be easy. 

## Full-Width Half-Maximum
Before I get too far into DOLPHOT, I feel like there's one more thing I need to finish before I can fully immerse myself in PSF photometry, and that's figuring out good FWHM values to use for my aperture photometry. To do that, I first  googled "how to find FWHM" and discovered this product called mantid, which seems like a really cool product. Unfortunately, it costs $150 for a student license, so I highly doubt we'll use it for this project. It's a professional-level photometry package that can basically do anything photometry-related you need. Luckily, we already have other methods of doing our photometry. 

After realizing that mantid cost money, I tried another google search and found a helpful [link](https://astrobites.org/2011/03/09/how-to-use-sao-ds9-to-examine-astronomical-images/) to astrobites that talks about how to use SAO ds9 to analyze .fits files. I particularly think that Marta will find the section on "opening multiple images" helpful because it seems similar to astrometric matching. I didn't find anything specifically for FWHM, but I did find it a good introduction to what ds9 can do. I did not realize that it had so many capabilities; I've only been using it to look at the images so far. 

I found another page called [ds9 tricks](http://www.adamgginsburg.com/ds9tips.htm#body1) that was useful. Both of these pages mention a  capability of  ds9's to create what's called a "projection" region. Unlike most regions, this one is not 2-dimensional; it is merely a line. ds9 plots the flux of each pixel on that line with the pixel's WCS position as the x-axis and flux as the y-axis. 

![raw]({{ thom-ory.github.io }}/images/raw_data.png)  
_the section of the sky this .fits file covers_  

---
![region]({{ thom-ory.github.io }}/images/ds9_prjection_region.png)  
_This is the prominent star near the top center of the raw image. The green line across the star is the "region" I'm looking at_  

---
![graph]({{ thom-ory.github.io }}/images/WCS_v_counts.png)
_WCS position vs. Flux in counts at that point_

---
I might be able to use this to determine FWHM for an image. I can easily find what half the maximum is; it's simple enough to look up the graph's max using ds9 and divide it by two. I can also see the WCS of the endpoints of the line, both in degrees and sexigesimal. From that, I can determine the length of the line in pixels and by extenstion the FWHM of that star. If I do this for multiple stars in the image, I can take an average FWHM and use that in the argument of DAOStarFinder. This is a lot of manual work, however, and I don't see a way to automate this process using code at the moment. 

# Conclusion
Tomorrow morning's group meeting will be hugely helpful in figuring out what my next steps are. Not only do I need to figure out the administrator permissions, but I also have to finish this FWHM project. I'm not sure this is the most reasonable way to approach this problem; I know that Rory is working with using `imexam()` (an ipython version of IRAF's `imexamine()`) to try to find FWHMs. I'll talk to him tomorrow about his progress and ask him and the rest of the group if they have ideas for automating the FWHM finding process I described above. 
