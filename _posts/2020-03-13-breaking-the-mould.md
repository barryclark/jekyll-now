---
layout: post
title: Breaking the mould
author: georgia_gage
---
![Breaking the mould!]({{ "/images/breaking-the-mould/atTheTable.JPG"}})

# Work experience: where to start?
If the words ‘work experience’ fill you with a cold-sweat-inducing feeling of trepidation, you aren't alone. For generations, teenagers have been shipped off to local businesses to spend mindless hours sealing envelopes and watching people send very boring emails. My colleague Johnny, when he was a teenager, spent an entire week putting small plastic tubes into ziplock bags—truly the stuff of dreams. At Infinity Works, we wanted to break the mould of shoddy work experience.

We have the tech, we have the knowledge, and we have the people, and with these in our back pocket, we set out to inspire three young people to pursue a career in software engineering.

We sought the help of Digital Her to find us three willing students. An offshoot of Manchester Digital, Digital Her is a not-for-profit organisation that works to inspire girls and young women to pursue a tech or digital career. If you are a woman in tech and would like to become one of their ‘role models’, I implore you to check out [their website](https://digitalher.co.uk/). Equally, they are always looking for support from other tech and digital companies across Greater Manchester.

# Building something awesome 🛠

With the search for the students underway, we were left with a blank week to fill with vibrant and challenging technological activities and learning. We wanted the students to build something awesome. The Infinity Works IoT (Internet of Things) group, having recently built some dazzling Slack-controlled fairy lights, were quick to jump on board. A couple of ‘thought showers’ later and we had an idea: we'd ask the students to build an IoT 'plant moisture sensor' which would alert its user when their prized plants were feeling thirsty. Now don’t tell me you haven’t always wished for one of them?

The best thing about planning this work experience was that we got to design and build the tech ourselves to test it out ahead of the students; I was eminently reminded of my dad bringing science projects home to his rather ambivalent daughter. After several late-nights at the office we had an IoT plant moisture sensor and an agenda to replicate the build with the students. Our design was simple:

  * Raspberry Pi 3 B+ in a semi-waterproof casing to provide our IoT capabilities and compute power
  * Pimornoi Display-o-tron Dothat: an LCD screen equipped with backlight LEDs that slots on top of the Raspberry Pi
  * Moisture sensor probe
  * Moisture sensor: processes the signal from the moisture probe and outputs an analogue signal
  * ADC (analogue-to-digital converter)

![Equipment photo]("/images/breaking-the-mould/equipment.jpg")

# A breath of fresh air 💨
The day the students arrived was as exciting as it was exhausting. They were nervous and we were nervous that they were nervous, but together we began to tentatively implement our plan.

The thing that struck me most on the first day was the breath of fresh air and life they brought into the office; they were wonderfully different from our set of employees. All three of them were women and from the BAME (black, Asian and minority ethnic) community, both groups painfully underrepresented in the tech industry. They were here because of their technical passion, we hadn’t gone out of our way to be diverse, we had collected students from the community of Manchester and these three students reflected the community in which we work.

# Meeting 'The Client' 👨🏻‍💼
We began the first day with some icebreakers and setting up their MacBooks. After a whiteboard session on ‘What on earth is IoT, the Cloud and AWS?’, we met 'The Client’. You may squirm at the thought of introducing three teenagers to a client but fear not, we had enlisted the help of our fervent colleague James to jump into the shoes of our fictitious client, the CEO of Plant ‘n’ Grow which provides tech solutions to their green-fingered customers. James delivered an animated client brief to the three students who readily took notes. The device must:
have a visual indication of whether the plant needs water or not
send a text or email to the owner to alert them if the plant requires watering
not be connected to mains electricity
be possible to water the plant whilst the device is in use
be written in Python (to align with the rest of Plant ‘n’ Grow’s tech, of course)
It must connect to the IoT using AWS

Moving from the boardroom to the whiteboard, the students sketched out their ‘no-holds-barred’ ideas which included solar panels, temperature sensors, traffic lights, a digital screen, and moisture sensors. The device was christened ‘iPlant’ and the three young consultants seemed excited to get cracking with the build.

![Whiteboard photo]("/images/breaking-the-mould/whiteboard.jpg")

We left them in a room with the equipment we had available and a circuit diagram. With a bit of nudging in the right direction, the team built a set up that resembled the circuit diagram. We noticed how quiet they were and how hesitant they were to share their ideas with each other. We silently hoped that it was just first-day nerves.

At the end of day one, I reckon we were more exhausted than the students. We were constantly assessing whether we were doing a good job and creating a good experience; we probably resembled slightly overbearing parents. The highlight? Taking the students to Bundobust and ordering the entire menu.

# Falling in love with Python 🧡🐍
The next day was a little easier. Having learnt some Python the day before using Codecademy, the students (with a little help from us) SSH’d into the Pi’s for the first time and ran an example script that made the Display-o-tron Dothat screen light up in a brilliant rainbow of colours. It was a real eureka moment! Watching their faces light up with a whimsical joy at what they had created, we felt a nice warm glowing feeling that we’d brought the pleasures of technology to the next generation.

With the tools at hand, the students now began to write the code for their devices. We started them off with a Python script containing all the required libraries and running scripts and an empty ‘your-code-goes-here’ function.

In an effort to introduce them to TDD, we had prepared a test suit which would allow them to increase the functionality step-by-step, making each test pass as they go. These quickly went out the window. It was way more fun to make the device look as cool as possible as fast as possible. Duh.

![Working at the table]("/images/breaking-the-mould/atTheTable.JPG")

# The students 😎
I should perhaps now pause to give you a little background to these three young women. All three are attending a different college in Manchester and between them are studying combinations of Maths, Physics, Computer Science A-Levels and Software Development Level 3 BTEC. One was set to go to university to study Software Engineering with a year in industry. One had just switched from Social and Health BTEC (a popular choice among her female friends) to Software Engineering. The third student in her final year of Software Engineering BTEC was unsure of what steps to take next but was searching for a quick entry into the industry without the need for a university degree.

It should be noted that none of them were considering computer science degrees. I wonder if this indicates a shift in education that companies like Infinity Works should be aware of. I often overhear fellow devs by the coffee machine, lamenting over the inadequacies of a computer science degree in preparing you for ‘real world industry’. “The technology is out of date, you don’t learn enough coding, it’s all theory and no hands on!''.

It seems the education system is thinking along the same lines. Like traditional practical trades, software engineering requires a lot of practical skills. Like traditional practical trades, perhaps apprenticeships and in-industry training schemes are the future of the software engineering workforce.

> "Work experience is a great way to build up a CV and see if working in Tech is something that you may enjoy.  Nothing can replace that first step, and candidates that have relevant work experience have a distinct advantage when applying for entry level jobs." - Steve Harper, Engineering Community of Practice Lead at Infinity Works.

This would open a lot of doors for those who can’t afford a degree or have never been encouraged into one, a pathway I think we should be embracing if we harbour any hope of increasing the diversity of the technological work force in the UK.

# Bitmaps and AWS
Back to the moisture sensors! By the end of Tuesday (day two) we had two devices that lit up with a red screen and a message alerting the owner of an unhappy plant when the probe was in air and a green screen with a different message when the probe was in water. All in a good day's work.

![Two devices]("/images/breaking-the-mould/devicesGrid2.png")

By the end of the next day one device had a screen that displayed a gradient of colour from green to yellow to red with the strip of LEDs lighting up like a charging bar which reflected the moisture level. The other was similar with the addition of an animated flower displaying on the screen. It was impressive! The students had reverse engineered a Dothat example script that contained an animation of a pirate. They had created and implemented their own bitmap design, something we had tried to do in our own dry run design and had given up on pretty quickly.

![Photo grid]("/pages/breaking-the-mould/grid6.png")

And so the week went on. Tweaking and perfecting the code, wiring it up to AWS IoT Core and preparing a presentation.There were a couple of rocky moments when we tried a ‘code-along’ to hook the devices up to AWS. So much of AWS wrangling must seem very abstract to someone who had never heard the words ‘security certificate’ before the beginning of the week. In hindsight, we perhaps should have set up a lot of the AWS config for them, the alternative was painstakingly reading out bash commands, puzzled faces at a terminal full of errors and long searches for typos. We got there in the end though!

AWS IoT is a relatively intuitive platform to use once you’ve completed the set up and you understand what a device shadow is. It’s easy to add ‘Rules’ that allow you to integrate with a long list of AWS services; CloudWatch, S3, Dynamo, SNS, and Step Functions are a few examples. The moisture sensor outputted a voltage which related to the moisture level detected by the probe. With the students, we added an IoT rule that sent this data to CloudWatch. In CloudWatch, we created an alarm which sent a text to subscribers when the alarm was in alarm state i.e. when the plant required urgent watering.

# The grande finale

With a little help from Tim Benjamin, our in-house storyteller and public speaking expert, three rather shy and reserved students were transformed into the confident and charismatic developers of iPlant. The presentation and accompanying demo were a success and I think, of the IW employees who came to watch, there was a collective satisfaction and pride that, as a company, we had been able to provide an inspirational and educational week to three young women. A week which has changed their outlook on tech careers and software engineering.

> "I was particularly impressed with their enthusiasm, the pace they picked up and integrated concepts and utilized them in their product delivery" - Richard Harper, Principle Consultant at Infinity Works.

Each day we had introduced the students to an employee at IW and spent ten minutes hearing about their life story from school to now. The students valued hearing of the many varied twists and turns that had brought the people of IW together. I think it helped to shave off a little of that pressure to ‘get it right first time’ that so many of us experience post-school or university.

>“I really enjoyed learning all about the industry whilst we completed the project, especially meeting other people who work at Infinity Works and hearing their journey and advice.” - Tia, work experience student.

An opportunity like this can really alter someone’s career and education prospects and it felt like, in line with our company ethos, we really were giving something back. We had the tech, we had the knowledge, we had the people and with these in our back pocket, we created a significant ripple in the careers of three young women.

> “[The thing I enjoyed most was] being able to implement what I have learnt into a project as a group, which contributed to the learning and development of new skills and knowledge. “ - Aicha, work experience student.

> "This was an eye-opening experience and I am very glad I did it!” - Alisha, work experience student.

![Presentation photo]("/images/breaking-the-mould/presentation.png)

If you have the resources to host an engaging, challenging and educational work experience, we implore you to give it a try! Get in touch if you’d like any help or advice. Digital Her were excellent at sourcing three students and dealing with the relevant paperwork. You can find their [website here](https://digitalher.co.uk/).




