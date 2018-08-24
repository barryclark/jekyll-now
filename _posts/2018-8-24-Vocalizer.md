---
layout: post
title: First project demo: Vocalizer of the Perso-Arabic script
---

Today my first project demo is live! When I decided to create this site, one big reason was for me to be able to showcase some projects I have worked on. One big issue, however, is that most of them have been part of courses and lack a UI. But now at least one of my projects has had a UI added to it and (is now live!)[http://vocalizer.thomasvakili.se/]

What's the project about?
-------------------------
As part of a course on NLP that I took, I worked on a project which constructed an HMM based on Persian written in the Tajik dialect to take Persian written in the Perso-Arabic script and add the vowels that are omitted in that variety of Persian.

Some more background - Persian and its scripts
----------------------------------------------
Persian is a language (which happens to be one of my mother tongues) which is spoken mostly in Iran, Afghanistan (where it's called Dari) and Tajikistan (where it is called Tajik). In Afghanistan and Iran, it is written in the Perso-Arabic script, while it is written using a Cyrillic alphabet in Tajikistan.

The Perso-Arabic script is basically a variety of the Arabic script. It is also written from right to left and the main difference is that a few letters are added, and a few letters are modified. One other big similarity is that the script omits short vowels. This means that the word for "went", pronounced "raft", is written as "r-f-t". Native speakers of a language will not pronounce every single letter and so a native Persian speaker will have no issues with this. However, this word might as well be pronounced as "reft" or "roft".

Enter the Tajik alphabet. Because Tajikistan was part of the Soviet Union, its dialect of Persian was written in a Cyrillic alphabet just like Russian. A lot can be said of this fascinating side-effect of world history, but here I just want to point out why this is relevant for the project: the Tajik script writes out short vowels.

Line of attack
--------------
So, the way I tackled the problem was to find a big corpus of Tajik Persian to use for training an HMM. I chose to use an HMM because my hypothesis was that certain patterns of vowels and consonants should be more likely. Thus, it should be possible to determine the correct short vowel based on previous letters and the currently observed letters.

I constructed a simple intermediate romanized script which allowed me to transliterate the Tajik alphabet in a way which would capture all the sounds. The Perso-Arabic script also has the funny property that while there are no characters for some sounds, there are multiple characters for others (four for "s"), and these should be treated as equivalent as well.

Now the matrices that make up the HMM can be constructed based on the training corpus, and this can now be evaluated. Input is split into observations and the Viterbi algorithm is then used to determine the most likely vocalization for the input.

A demo is available (here)[http://vocalizer.thomasvakili.se] and the formal project report (which contains a more in-depth explanation and background) can be found (here)[https://docs.google.com/document/d/1Xh75hHI6z_Tg25WNA0a4yAZcWLe0V5bN03TPDmVMD1k/].
