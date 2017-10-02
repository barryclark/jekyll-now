---
layout: project
title: DDR - Dance Dance Robotics
date: September 29, 2014
image: luxo.png
---
By, Austin Lawrence (Ablarry91@gmail.com)
Master of Science in Robotics, Northwestern University

## Intro
The objective of this project is to classify music and use this information to instruct a specific dancing scheme for a robot.  The repository of this project may be found [here](https://github.com/ablarry91/dancing_robot).

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZPxmVsA1itM" frameborder="0" allowfullscreen></iframe>

## Motivation
As consumer-level robots slowly find their place in a typical household, human personification is inevitable.  We argue with automated personal assistants, name our vacuums, and marvel at their literal interpretation of the world.  Despite this, machines of this category still lack the ability to facilitate an emotional response between the machine and a human.  To go beyond the status of an appliance, and possibly use robotics as a means of emotional therapy or entertainment, much development is still needed to create machine that reacts in a human-like manner.  Perhaps the most successful case of this may be the querky [Jibo](https://www.jibo.com/) robot, though even it has noticeable limitations.  Though not quite analogous to emotion, having an ability to classify the genre of an mp3 music file is a step in the direction of autonomous emotion classification.

## Method

The philosophy of this project is quite straightforward; identify information about a musical stimulus, and do something with the newfound data.  Two major techniques were implemented for the classification aspect of this project: one, a broad examination of a best-fit machine learning algorithm given musical features to estimate genre, and two, fingerprinting specific MP3 files from raw microphone samples using an array of audio peaks as data.  Both methods allow for the possibility to make an estimation about a musical stimulus, whether it is an emotional/genre characteristic, or the literal value of the song.  Provided this information, a dancing heuristic can be implemented.

### Musical Classification from Musical Features

As a quick start to this element of the project, the [Million Song Dataset](http://labrosa.ee.columbia.edu/millionsong/) provided a foundational amount of data in the meta and analytical nature.  Thanks to the information available in this dataset, several characteristics of songs can be utilized, including:

* Duration: the length of a song
* Artist familiarity: an estimation of how familiar the artist is to the world
* Artist hotness: an estimation of how popular an artist is
* Song hotness: an estimation of how popular a song is
* End of fade in: an estimation of when the song finishes fading in
* Start of fade out: an estimation of when the song begins to fade out
* Loudness: Overall loudness of a song in dB
* Mode: whether a song is in major or minor key
* Key: an estimation of the song’s key
* Tempo: an estimation of how fast the song is
* Time signature: an estimation of a song’s time signature

Using Python [SQLite](https://www.sqlite.org/) to generate the database and [Weka](http://www.cs.waikato.ac.nz/ml/weka/) for learning purposes, a Bayes Net classifier was found to generate the best results, next to a J48 Decision Tree classifier.  Success is measured against the genre provided by the Million Song Dataset and the classification accuracy.

### Results
Between decision tree, clustering, naïve Bayes, and Bayes Networks, the latter was found to generate the highest classification accuracy. At a classification accuracy of 43.7% against a ZeroR accuracy of 18.7%, much can still be done to improve the quality of this classifier.  Regardless, this implementation was successful in correctly identifying the majority class for each instance.   The most influential features were artist hotness, artist familiarity, and loudness.

### Discussion
The most interesting observation to make from these results corresponds to the chronological development of these independent genres.  For example, pop has a higher misclassification for the music genre rock.  From a sequential standpoint, much of where pop is today is due to the musical influence of rock that developed prior, such as upbeat tempos, loud choruses, and popularity in mainstream media.
Additional musical features may help improve the quality of classification, provided that the features are more distinct to particular types of music.  Features not available in the dataset used in this study, such as the presence of a vocalist, deviation of tempo, and deviation of loudness may help distinguish various classes from their peers.

###Conclusion
Though this exercise proved useful in classifying musical genres with a heightened reliability, more work is to be done to improve accuracy to a meaningful level.  Going forward, it is of interest to transition this study into the area of feature extraction from mp3 files, as opposed to acquiring this information from another source in a precompiled format.  Doing so may influence the types of features available to study, and optimistically, improvement in the quality of musical genre classification.

A technical writeup of this aspect of the project may be found [here](portfolio/assets/DDR_Final_Paper.pdf)
![ar_sys](https://github.com/ablarry91/temp/blob/master/confusion.png?raw=true)


## Musical Classification from Audio Fingerprinting
An alternative method to classification via extracted musical classes is to extract directly from the audio data itself in the form of a microphone recording.  A similar technique to what is found in Shazam's audio fingerprinting algorithm, a Python derivation of the software was composed through the excellent work of [Will Drevo](https://github.com/worldveil/dejavu) and made available for public use.  An easy to understand technical writeup is provided [here](http://willdrevo.com/fingerprinting-and-audio-recognition-with-python/) and is very similar to [Avery Li-Chun Wang's work](https://www.ee.columbia.edu/~dpwe/papers/Wang03-shazam.pdf), the Chief Scientiest of Shazam.

## Audio Signal Visualization
Another interest was to provide a visualization tool for contextually understanding the structure of an audio sample, and provide a foundation for another mode of conveying feeling to a human.  [Scott Harden](http://www.swharden.com/blog/2013-05-09-realtime-fft-audio-visualization-with-python/) wrote an excellent script capable of publishing high resolution audio samples at 6hz, which was manipulated for this project.

## Construction of a ROS Environment
ROS was utilized to provided a unified platform for identifying a musical stimulus and acting upon it.  It relies on four significant nodes to address the entire context of this project:

* state_publisher - Maintains a class 'SongStuff' to store information regarding the current song identified, any meta information, and robot configuration data.  It relies on two SQLite databases: songMeta.db, and danceData.db.  Publishes JointState() messages at a specific rate, which Rviz will ultimately register.

* music_tag - Utilizes the excellent work of [Will Drevo](https://github.com/worldveil/dejavu) to run an audio fingerprinting package given an autonomously managed fingerprint database.  Upon a publication from the 'tag_command' topic, a short audio sample is recorded via a microphone and a song identification is estimated and published.  Can either tag once, or in a continuous loop.

* play_music - A simple music player based from PyGame.  Convenient for testing software developements as you experiment with new things.

* GUI - A Tkinter GUI that's aimed towards giving accessibility to the more substantial functions used in this package.  Quite configurable to publish new topics.

## (Ongoing) Construction of a Physical Robot Model
Inspired by Disney's inexplicable expertise in characterizing human-like characteristics in otherwise inanimate objects, a concluding goal to this project was to build a physical implementation of a robot and give it life-like gestures.  Luxo Jr., the jumping lamp in the beginning of every Pixar film, was modeled and redesigned for accomodating six independent degrees of freedom through a tension-driven servo actuator array.

Construction is currently ongoing, and more ROS development is anticipated to provide a simple calibration procedure, keyframing, and inverse kinematics/dynamics.

## Going Forward
It's a continuing interest to carry this project beyond the rather linear solution of providing one explicit dance heuristic to each song.

Instead, a non-deterministic approach could provide interesting results that continue to leave users guessing on the robot's next move.
