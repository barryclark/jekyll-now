---
layout: post
title: Vertical Interconnect Accesses - Do you even RF? (Part II)
---

A while ago I promised to look into the effects of using VIAs (Vertical Interconnect Access) on RF tracks to change layers on PCBs. Unlike the 90º degree bends on PCB tracks, in this case there's essentially two postures about the matter. Either people are completely clueless of the potential risk of placing a via on a RF track and do it recklessly. Or they're somehow a little aware of the risks, therefore completely demonize such practice, going at extreme lengths such as increasing the track sizes immensely (making it even worst), just so to avoid the use of the via. 

A long time ago I found an awesome primer about vias for high-speed and RF tracks from Keysight, you can find it [here](https://youtu.be/FVKOC8xz1F0). However, it focuses mainly on multi-layer board in excess of 8 layers. Therefore, although the concepts are the same and the material is absolutely valuable no matter your scenario, it lacks the actual results you'd get in a 2 or 4 layer board. 

I've been cooking this post for a while, but due to several reasons (laziness), it has taken me much longer than usual to finish it up. And then, in the latest weeks there's been releases on Youtube, of videos concerning this very specific topic, about ground vias and current return paths. So, instead of going through a lengthy post and a lot of explanations, I'm just going to leave here two links for two videos from Mr. Robert Feranec's youtube channel explaining why this stuff matters and showing some neat simulations on the phenomena.

[Video 1 - Ground vias](https://youtu.be/nPx2iqmVAHY)

[Video 2 - Current return paths](https://youtu.be/icRzEZF3eZo)

Now, this stuff is no secret, you can read the [High-Speed Digital Design: A Handbook of Black Magic](https://books.google.pt/books?id=H5SsQgAACAAJ&hl=pt-PT&source=gbs_book_other_versions) by Howard W. Johnson and Martin Graham and you'd learn most of this stuff. The issue is, most electronics engineers don't actually read this book unless they work with Signal Integrity topics, but believe me if I say everyone can benefit from getting to know about it. And not only those poor EMC engineers, that have to dwell into the deepness of electronic hell, to fight the evil forces of the electromagnetic and restore the balance to the force(s)... quite literally.

![Gandalf](/images/gandalf.gif)

Well, that would be a pretty lame post if I'd just leave it at that. So I'm going to try to show the limits of the application of vias on RF tracks, especially in 2- and 4-layer FR-4 PCBs, which are used most frequently, especially (but not exclusively) in the hobbyist world.

Let's start with the 2-layer PCB. Now you could be legitimately asking why would someone need to know this, who'd be the fool to design RF circuits on 2-layer FR-4 PCBs... 

