---
title: Make It To School: A Text Adventure featuring Mr. Young
link: https://flotsametc.wordpress.com/2012/06/02/make-it-to-school/
author: jamesbuckland
description: 
post_id: 21
created: 2012/06/02 19:44:12
created_gmt: 2012/06/02 19:44:12
comment_status: open
post_name: make-it-to-school
status: publish
post_type: post
layout: post
---

# Make It To School: A Text Adventure featuring Mr. Young

This is the script for a text adventure York Chen, Will Thompson, and I both wrote (wrote) and wrote (coded) for our AP Computer Science final in senior year. It features our instructor, Mr. Young, trying to make it to school on time the day after Saint Patrick's day. It was inspired by a real event, in which Mr. Young actually arrived 30 minutes late to first period class that Monday. ****

# Make It To School

## _With Mr. Young_

# 
    
    
    MARCH 18, 2012. THE DAY AFTER SAINT PATRICK’S DAY
    7:48 am.
    Groggily, you awake on a SUBWAY PLATFORM. SHAMROCKS and EMPTY BOTTLES surround you. Suddenly there’s a sinking feeling in your stomach — and this time, it’s not from the ALCOHOL. It’s MONDAY, and you’re MR. YOUNG! Can you make it to SCHOOL by FIRST PERIOD?
    _
    _
    _<press any key to continue>_
    You hear a rumbling in the distance. Sitting upright, you rub your eyes just in time to see the train approach the station.
    _
    _
    _get on train / board train / get on / get on the train / enter train_
    What, like this? You’re not standing up, buddy!
    _
    _
    _stand up / get up / stand_
    This isn’t turning out to be as easy as you’d hoped. You stumble to your feet, just in time for the TRAIN to come to rest.
    _
    _
    _<anything else>_
    What are you waiting for? GET ON THE TRAIN ALREADY!
    
    (once you’ve stood up)
    _get on train / board train / enter train / get on / get on the train
    _Shaky, you put one foot in front of the other, until... WHAM! You fool! The DOORS aren’t even open yet!
    (if you try to board the train again)
    Seriously, calm down. The doors aren’t open yet! Just... hold up a little.
    
    (if you try a third time)
    Dude, just WAIT.
    _
    _
    _wait for doors to open / wait / okay_
    It’s getting late... <delay> Ding! DOORS are open! What do you do now?
    _
    _
    _get on train / board train / get on / get on the train / enter train
    _Here we go. You take a running start, and... wham. Right into the side of the TRAIN. PASSENGERS look at you suspiciously. Try the DOORS next time.
    _
    _
    _try doors / find doors / <anything with ‘door’>_
    Those are the DOORS! Very good!
    _
    _
    _go through them / go through the doors / get on train, etc..._
    You got on the TRAIN! It’s a 6 TRAIN, alright. You check the flashing sign... 96TH STREET, ten stops! Do you dare NAP or STAY AWAKE investigating Dr. Zizmor’s treatments for seborrhea or rosacea?
    
    (if you nap)
    _nap / sleep / rest_
    You wake up upstate. As the subway train pulls to a stop, you see INTERN DOLEN LE approach the train car carrying a stack of FRESHLY GRADED CS PAPERS in one hand and a BRAN MUFFIN in the other. You bow your head in your hands. What MISTAKES have you made to deserve this? It’s 8:53. Here’s to a day of coding with the LEs.
    
    (if you stay awake)
    _stay awake / stay awake staring at Dr. Zizmor ads / <anything with ‘Zizmor’>_
    You wait... it’s getting later...
    
    <press any key to continue>
    
    Monday, March 18, 2012.
    8:00 am.
    Only eight minutes left before FIRST PERIOD! Better round that up to ten. It’s not like the STUDENTS will be there on time. Little buggers...
    _
    _
    <press any key to continue>
    Luckily, the train is pulling into the 96TH STREET STATION. And the DOORS are opening!
    _
    _
    _exit train / get off train / exit / get off / leave train_
    You walk right into a POLE. Seriously, nice job.
    _
    _
    _find doors / <anything with ‘door’>
    _You found the DOORS again! Here they are. Just where you left them.
    _exit train / get off train / exit / get off / leave train_
    You walk right through the DOORS onto the PLATFORM! Amazing work, considering. Following the crowd, you manage to find yourself at a crossroads between four STAIRCASES, the NE, NW, SE, and SW corners of the intersection above. It’s getting later, choose carefully...
    
    if _NE_:
    Nice job. No, really! The worst choice you could have made. It’s, like, 8:03. Good luck with that.
    
    if _NW_ or _SE_:
    Nice try! But you could have done better. Still, only 8:03. You could still make it!
    
    if _SW_:
    Oh man. Oh man. I bet the kids are gonna be so proud of this one. Saving, like, ten seconds here. What a champ. Still, it’s getting late. 8:03. Hurry up.
    
    if <_anything_ _else_>:
    What are you doing? Choose a staircase already!
    
    You’re aboveground, finally. Your FRAIL BODY aches from the sheer minutes of PURE STRESS and ADRENALINE. You hold up a HAND to block out the BLINDING SUNLIGHT as years of HORRIBLE, GRUELING EXPERIENCE guide you quickly through the streets to...
    BREAKFAST. COFFEE at SING’S? Or get a ride to North Bergen New Jersey to find the nearest Dairy Queen for a BLIZZARD?
    _
    _
    _<blizzard>_
    It’s 8:33, too early for Dairy Queen, they say. But not in England! You sit back and nurse your morning Blizzard. You are satisfied in knowing you made the right choice commuting so much out of your way for ice cream goodies instead of preparing your students for the AP.
    _
    _
    _<school>_
    HUNTER COLLEGE HIGH SCHOOL itself, a horrific behemoth towering over your TIRED FRAME. Luckily, CLASS is only on the... the FOURTH FLOOR? Really? Dang it.
    _
    _
    _enter building / go upstairs / go to class / <anything not involving ‘door’>_
    Have you learned nothing? Jim Morrison would be disappointed.
    _
    _
    _find doors / enter doors / <anything involving ‘door’_
    Good, good. We are LEARNING, then. You’re IN! You pass the SECURITY DESK. Either it’s EMPTY, or they DON’T NOTICE YOU. Maybe they’re just not having a good morning either. 8:05. You can still make it.
    _
    _
    _go upstairs / go to class / <anything>_
    You begin to climb the STAIRCASE, when... BAM! Out of nowhere! Your INTERN DOLEN LE appears, carrying a stack of FRESHLY GRADED TESTS for you to look over.
    
    if <_anything but ‘ignore him’_>
    He starts to talk about COMPUTER SCIENCE or some shit. God, if only he would shut up... it’s 8:06. You haven’t got time for this. You gotta just IGNORE HIM.
    
    if <_anything but ‘ignore him’ again_>
    Now he’s complaining about his COMMUTE from upstate. Why won’t he stop talking? Gotta IGNORE HIM.
    
    if _ignore_ _him_
    Good choice. You dash up the stairs. It’s 8:07... Almost there...
    
    WAIT.
    
    OH NO.
    
    THE CLASSROOM IS EMPTY.
    
    WITH A SINKING FEELING IN YOUR STOMACH AND A RINGING IN YOUR EARS, YOU STUMBLE TO YOUR OFFICE TO FIND... THERE, ON THE WALL OF YOUR OFFICE. A CALENDAR.
    
    YOU RUB YOUR EYES.
    
    SAINT PATRICK’S DAY IS ON A SATURDAY.
    
    YESTERDAY WAS SAINT PATRICK’S DAY.
    
    IT’S SUNDAY.
    
    ...
    
    WHAT THE HELL IS DOLEN DOING AT SCHOOL?
    
    fin** **