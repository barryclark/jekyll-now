---
layout: post
title: A basic overview of mixing using DAW software.
---

This post is literally a piece of coursework. The brief tells me to make "A blog with illustrative examples of mixing and mastering using a DAW." So here I am!

This blog won't cover DAW basics, such as adjusting levels, automation etc but is more geared towards using slightly more involved elements of mixing.

The reference track used in all of these clips is Queen's "Don't Stop Me Now". The stems are available online if you want to try them yourself!

## Effects Processing In The Mix

To add effects in Audition, select a track to apply effects to (this also includes the master track), go to your effects rack, hit track effects and add plugins of your choice!
![Adobe Audition Effects Rack](https://toaster.sh/i/6yyo.png)

## Monitoring audio in the mix

Monitoring audio in the mix is really easy with Adobe Audition. Every track has a "solo" function, which isolates just the track highlighted. This can be used to mix certain elements together. In this case, I used solo on Freddie's vocals and the piano to balance the mix between the two.

## Parametric EQ

Parametric EQ is essentially what allows me to edit the tonal properties of the audio track. If you use Logic, like I do on my Mac, all of the EQ plugins are parametric anyway, but parametric essentially just means that it has a graph that you can adjust the parameters on to change the sound of the audio. I'm going to use it on my kickdrum stem to add more punch to the sound.
When used too much, it can un-necessarily make frequencies sound too punchy and drown out other frequencies, making the mix much more difficult to process. For example, too much bass makes the mix sound very muddy, and drowns out high frequencies. When used correctly, it can add warmth and punch to the mix, pronouncing certain parts of the mix clearly, resulting in a more enjoyable listening experience.

## Noise Gate

A noise gate is a really easy way to prevent any noise that isn't the subject from playing on a recording, as it only lets audio that hits a threshold (in dB) through its filter. Of course, the ideal situation would be that you record in a properly treated studio, but even then there can be some noises like sound bleed that can occur that may sneak their way into your recording.
However, if you misuse a noise filter, it can lead to pretty disastrous effect. Overusing a noise filter will cause the track to start unexpectedly cutting out during playback as the gate will be blocking too much sound. On the other hand, used correctly, it can help reduce ambient noise to produce a cleaner mix.

By the way, turning up the fade is a must if your audio has variable levels - if your audio source dips just slightly below the required level, it will fade it but not cut it for the fraction of a second which the audio is under the gate, which means it still sounds natural in the final mix.

## Compressors

Compressors are best represented by this picture of a cat:

![White cat in a square, transparent box with the word Compression over the top in white text.](https://toaster.sh/i/jwn2.png)

In essence, they squish your audio down (reducing dynamic range to create a "box-y" sound) and make it all play at the same dB level overall. This is useful if artists sing quietly at some points but still want emphasis on vocals. A good example of this is Billie Eilish's Therefore I Am, at the "Stop. What the hell are you talking about?" line. In the case of Don't Stop Me Now, though, Freddie's vocals are already compressed, so there's not much I can do to them except from just adjusting track volume/gain. I used basic compression throughout other parts of the mix, such as on the kick drum, to help add warmth and punch to the mix.

## Master Bus Compression / Multiband Compression

Master bus compression is the same thing as compression, but instead of only being applied to a single track, it is applied to the whole master bus. Crazy, right? I chose to use a multiband compressor. This allows me to apply different amounts of compression to different frequency ranges across the band. This configurable, modular kind of compressor is very handy when used on a complex mix, and also  When used correctly, it not only evens levels, but also adds warmth/brightness depending on configuration. My configuration for the multiband compressor was one intended to add lots of punch to the mix, as I feel like that will help bring the mix into the 21st century, where lots of poppier tracks have strong bass lines. It also balances highs, while keeping them at a manageable volume.

## Brickwall Limiter

A brickwall limiter is essentially just an effect that builds a "brick wall" at around -1 dB, so that audio cannot pass through it, and therefore clip. This can be useful in production for radio imaging, where pushing compression really hard, combined with a brickwall limiter can create a really strong sound which sounds good on FM radio, but otherwise, I mostly use it as a safeguard. Adobe Audition's Multiband Compressor includes a brickwall limiter, which I turned on purely as a safeguard while I was mixing as to not accidentally damage my speakers.

*For the sake of my speakers' health, I turned them off while taking this screenshot. I've intentionally overdriven the mix really badly.*

![Don't do this.](https://toaster.sh/i/ycfk.png) 

You can see that the audio is clipping (indicated by the red bars on the right hand side of the VU meter), but if I apply the brickwall limiter...

![Still don't do this. Make your mix quieter](https://toaster.sh/i/ssyj.png)

The audio is still very, very loud overall (the VU meter was stuck in this position for the whole time) but the brickwall limiter prevents it from clipping.

## Enhancing Stereo Width

Stereo width is effectively the term used for the pseudo-"stage" of sound that is represented by (normally) the left and right channels of audio. Using techniques such as balance and pan, can add lots of dimension to the mix, if used correctly. The Beatles' records do this quite effectively, seperating instrumentals and vocal tracks to the left and right channels almost entirely. Another way to enhance stereo width is with EQ - increasing the EQ on lead tracks in the 2.5-5Khz range (the "presence zone", AKA what we hear the clearest) can add dimension to the final mix pretty easily. Overuse of stereo width can result in a bad mix (imagine if I could only hear the vocals in my left ear for the whole of Bohemian Rhapsody - it wouldn't sound good), but used correctly, it means that your mix will sound wicked, regardless of if on a pair of headphones or a proper stereo speaker setup.
