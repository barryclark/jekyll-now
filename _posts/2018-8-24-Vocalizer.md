---
layout: post
title: Demo - Vocalizing the Perso-Arabic script
---

Today my first project demo is live! When I decided to create this site, one big reason was for me to be able to showcase some projects I have worked on. One big issue, however, is that most of them have been part of courses and lack a UI. But now at least one of my projects has had a UI added to it and [is now live!](http://vocalizer.thomasvakili.se/)

What's the project about?
-------------------------
As part of a course on NLP that I took, I worked on a project which constructed an HMM based on Persian written in the Tajik dialect to take Persian written in the Perso-Arabic script and add the vowels that are omitted in that variety of Persian.

Some more background - Persian and its scripts
----------------------------------------------
Persian is a language (which happens to be one of my mother tongues) which is spoken mostly in Iran, Afghanistan (where it's called Dari) and Tajikistan (where it is called Tajik). In Afghanistan and Iran, it is written in the Perso-Arabic script, while it is written using a Cyrillic alphabet in Tajikistan.

The Perso-Arabic script is basically a variety of the Arabic script. It is also written from right to left and the main difference is that a few letters are added, and a few letters are modified. One other big similarity is that the script omits short vowels. This means that the word for "went", pronounced "raft", is written as "r-f-t". Native speakers of a language will not pronounce every single letter and so a native Persian speaker will have no issues with this. However, this word might as well be pronounced as "reft" or "roft" or even "rafat".

![Different ways of vocalizing k-t-b.]({{ site.url }}/images/ketab.png){: .center-image }

Enter the Tajik alphabet. Because Tajikistan was part of the Soviet Union, its dialect of Persian was written in a Cyrillic alphabet just like Russian. A lot can be said of this fascinating side-effect of world history, but here I just want to point out why this is relevant for the project: the Tajik script writes out short vowels.

Line of attack
--------------
So, the way I tackled the problem was to find a big corpus of Tajik Persian to use for training an HMM. I chose to use an HMM because my hypothesis was that certain patterns of vowels and consonants should be more likely. Thus, it should be possible to determine the correct short vowel based on previous letters and the currently observed letters.

I constructed a simple intermediate romanized script which allowed me to transliterate the Tajik alphabet in a way which would capture all the sounds. The Perso-Arabic script also has the funny property that while there are no characters for some sounds, there are multiple characters for others (four for "s"), and these should be treated as equivalent as well.

Now the matrices that make up the HMM can be constructed based on the training corpus, and is ready for use! Input is split into observations and the Viterbi algorithm is then used to determine the most likely vocalization for the input.

Points of improvement
---------------------
Plenty of things could be improved, as the performance at this point in time is not good enough for this to be used as is. Ever since I handed in the project report back in December of last year, I've been thinking of interesting ideas to try out. One thing would be to run single words through the HMM rather than entire strings. The limitations imposed by the Markov assumption imply that the information gained by being able to catch the ending of a previous word probably doesn't help that much, and either way words could reasonably be treated as being independent of each other when looking at the problem of vocalization.

Another idea would be to do a basic lookup on words that are present in the training corpus and only run the vocalizing HMM on words not in the corpus. Another HMM could then be constructed on the word lever to try to resolve any ambiguities arising when to words are spelled the same way when not accounting for the hidden vowels. To improve the lookup one could also experiment with stemming the words so that as many inflections of the words can be looked up.

One third idea I've considered trying out is ditching the HMM altogether and instead treat this as a machine translation problem. Might it be possible to construct a seq2seq that outperforms the HMM?

These are all ideas I would really like to test when my schedule allows for it (and when the damn GPU shortage has been solved so I can get a CUDA-enabled graphics card...) and that hopefully might lead to more impressive results!

A demo is available [here](http://vocalizer.thomasvakili.se) and the formal project report (which contains a more in-depth explanation and background) can be found [here](https://docs.google.com/document/d/1Xh75hHI6z_Tg25WNA0a4yAZcWLe0V5bN03TPDmVMD1k/).
