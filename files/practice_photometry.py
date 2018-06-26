pylab --no-import-all #Original line: %pylab --no-import-all
from photutils import datasets
from astropy.visualization import LogStretch
from astropy.visualization.mpl_normalize import ImageNormalize
import matplotlib.pylab as plt

#Trying to load an image

hdu = datasets.load_star_image()

data = hdu.data[0:400, 0:400]

norm = ImageNormalize(stretch=LogStretch())
plt.imshow(data, cmap='greys',origin='lower',norm=norm)

#This is exactly the text given to me by the exercises given to us be Dr. G. I don't exactly
#know what I'm doing, though I think I understand the setup and basically what this code is
#getting at. I'm going to try to run it now by using the terminal on the Mac.

#After my first few attempts I keep getting an error on the first line saying that the syntax is bad on
#the t in "import." It also didn't like a "%" symbol.

#I tried to run it in the Jupyter notebook gives the error "`%matplotlib` prevents importing
# * from pylab and numpy"

#Running just the second bit of code under "Trying to load an image" gives a Fig. 1 in my June. 26th
#blog post. 
