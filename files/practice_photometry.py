#Original code from googling
import numpy as np
from matplotlib import pylab

from IPython.core.pylabtools import *

from pylab import *
from numpy import *
#Original line: %pylab --no-import-all
#This line originally replaced all the code above it
from photutils import datasets
from astropy.visualization import LogStretch
from astropy.visualization.mpl_normalize import ImageNormalize

#This is the text given in the exercises given to us be Dr. G. I don't exactly know what I'm doing, though I think I understand the setup and basically what this code is getting at. I'm going to try to run it now by using the terminal on the Mac.

#After my first few attempts I keep getting an error on the first line saying that the syntax is bad on the "t" in "import." It also didn't like a "%" symbol.

#I tried to run it in the Jupyter notebook gives the error "`%matplotlib` prevents importing * from pylab and numpy"

#I did some googling and found that the percent indicates a shortcut specifucally for Jupyter notebooks, and replaced it with the code it's supposedly shorthand for. I also changed in which line I import matplotlib. After trying to run it in the terminal again, it now hates the "t" in import in line 6.

#Rory ws able to help me out a little and the addition of an asterisk after the t solved the syntax error. Now, running this program in the terminal gives me no error message (note: none of the code after this line was in the program when I ran it this time).

###########

#Trying to load an image

hdu = datasets.load_star_image()
data = hdu.data[0:400, 0:400]
norm = ImageNormalize(stretch=LogStretch())

plt.imshow(data, cmap='Greys',origin='lower',norm=norm)
#added by me
plt.show()

#I can run this second bit of code (w/o the part added by me) in the Jupyter notebook on its own, and it gives the image titled "Figure 1" in my blog post. I can also run this code as is (with only what's written above this line) and get the same exact image out. This required the addition of a show command.

#I think I get this part of code, though I wouldn't know the syntax on my own. The first line defines a command to load the image,  the second defines where to look in the data (I'm guessing by RA and declination) and uses the first line's definition of a command to load it, and the third line defines another command about how to normalize the data. The actual computational command is the fourth line and actually creates the image, and uses the third lines command definition.

#Things I don't understand: how exactly the coordinates in the second line work, why there's a logarithmic stretch on the data to normalize and why it even needs to be normalized, why they chose the origin like they did, and where they are getting this image from. For today, I'm going to try to get as far as I can into the exercises, then in the morning I'll start trying to figure out things I didn't get the first time.

###########

#Source Detection
