---
layout: post
title: North Bay Python - 2FA Mind
date: 2017-12-07 19:30
---

I am fresh from attending a brand new conference to start here in the North Bay region of California, called [North Bay Python](https://2017.northbaypython.org/). This conference was held at the Mystic Theater in Petaluma, and featured a diverse range of talks by all sorts of people ranging from topics such as [Accessibility](https://www.youtube.com/watch?v=ys7cy7njkvA&index=6&list=PLaeNpBNgqQWvWl273wwS3f-iEgDWNuoxN), [Testing](https://www.youtube.com/watch?v=uO3lMtlL9jg&index=7&list=PLaeNpBNgqQWvWl273wwS3f-iEgDWNuoxN), [Diversity in Tech](https://www.youtube.com/watch?v=FgJ40931e9Y), and [Implementing merge sort in Python using only import statements](https://www.youtube.com/watch?v=7wPcR3OWSU8&list=PLaeNpBNgqQWvWl273wwS3f-iEgDWNuoxN&index=5). One talk that I want to highlight was by [Carina Z Zona](http://cczona.com/) and was about using Two Factor Authentication and why we should all be using it.

In a nutshell, 2 Factor Authentication (2FA for short) is that annoying thing we've all had to deal with when logging into our bank account for the first time on a new computer, where you have to wait for it to text you some sort of code after you initially login, then verify that code to access your account. This has two layers of authentication, the initial login and then the additional verification, hence the name 2 Factor Authentication. While this may be a bit annoying to the user, 2FA can significantly lower identify theft and phishing through email. The technical term for this particular 2FA approach is called "TOTP (Time based One Time Password) via SMS".

Carina zoned in on some of the aspects of 2FA that are holding back consumers and companies from making the change to adapting this technology. She spoke about the concept of *"leaving no user behind"*, and mentioned that *"with each 2FA solution, there is some sort of accessibility issue."* *"We cannot allow online security to be contingent on having smartphones."* Many consumers do not have access to a smartphone such as those living in India, where roughly 78% of the population do not currently own smartphones, so the 2FA implementation using a smartphone would not be feasible for these consumers.

There are many other approaches to 2FA implementation, such as TOTP via phone, TOTP via email, using a security key such as Yubikey, facial identificaton (I.E. IPhone X), and Amazon Alexa Voice recognition, just to name a few. When implementing 2FA it's important to consider the needs and possible accessibility restrictions of our various users, and keep those in mind when considering the wide array of choices we have when implementing 2FA.

Additionally Carina mentioned that we can strengthen the effect of 2FA by increasing the quality of the first factor of authentication. Some ways that this can be achieved are by:
* Ruthlessly slashing arbitrary restrictions
* Communicating remaining restrictions to users
* Sanitizing user input
* Hashing securely
* Rolling out the red carpet for password managers - by making it easy for users to use password managers, they can generate passwords that are very hard to hack, making the first factor much more strong.

I learned a lot at North Bay Python and from listening to great speakers such as Carina, I suggest you head over to check out  more of [Carina's talks](http://cczona.com/speaking/talks/), and hope that you will come visit Petaluma next year to check out North Bay Python 2018. In the mean time, check out more great talks from [North Bay Python 2017](https://www.youtube.com/watch?v=7wPcR3OWSU8&list=PLaeNpBNgqQWvWl273wwS3f-iEgDWNuoxN)
