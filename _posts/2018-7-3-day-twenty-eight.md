So, I tried to run DOLPHOT one more time after I got home yesterday. I looked back at Rory's blog and saw that he fixed his empty result issue by adding the PSFs to the dolphot directory. I already had the PSFs in the folder where I thought they were supposed to be, but just for kicks I put them in the working directory, too. Unfortunately, I got the same exact thing I did before. I left a comment of Rory's blog asking where he had put the PSFs, and he replied sayint that his are in the same place I had mine at first, so that's not the issue. The only thing I can think of is the change to the structure of the .fits files coming out of Marta's code, but she left a comment on yesterday's post that's really helpful. It might help, but if that doesn't work, I'm going to try Astrodrizzle. 

# Marta's Code
So, Marta gave me a few lines of code that should help me specify which header I want to add new information to. I hope that the headers remain unchanged after going through the code. 

The first thing I did was try to run wfc3mask on the drc image I know is bad to see what exactly the issues are. It's the "READNSE(A,B,C,D)" and 'NCOMBINE' errors still. I modified Marta's code according to her instructions to try to add this info to the right header.

I spent some time on this, trying different a few different methods of modifying the header. I tried `fits.setval`, `fits.set`, I tried both ways Marta reccomended, I tried to be creative and write something new, but nothing worked. Most of the time, I got an error, and when I did get a modified fits files, `wfc3mask` never worked. I might come back to this, but I need to leave it for now. 

# Astrodrizzle
I started a little bit of work with Astrodrizzle in installing it and reading through a bit of the manual. It seems really complicated but I still think it might be worth it. It's good to know learn how to do as much as possible. I haven't tried to work with any data yet, but know a little bit about what the drizzlpac is about now. 

# Conclusion
Tomorrow I hope to get Marta's code to work beause I think I'm close, and I'll look more into Astrodrizzle as well. Even if I got Marta's code to work perfectly like I want, I'm still not sure it will play well with `wfc3mask`.
