---
 layout: post
 title:  ImageNet-trained CNNs are biased towards texture; increasing shape bias improves accuracy and robustness(2018)
 category: journalclub
 olddate: 2019-02-11
 ---
 
 *Robert Geirhos, Patricia Rubisch, Claudio Michaelis, Matthias Bethge, Felix A. Wichmann, Wieland Brendel*. Stimulus- and goal-oriented frameworks for understanding natural vision, ICLR 2019 (2018) 
 [(ICLR 2019)](https://openreview.net/forum?id=Bygh9j09KX)
 [(local cache)]({site.url}/journalclub/JCpapers/Geirhos et al_2018_ImageNet-trained CNNs are biased towards texture; increasing shape bias.pdf)
 #### Abstract
 Convolutional Neural Networks (CNNs) are commonly thought to recognise objects by learning increasingly complex representations of object shapes. Some recent studies suggest a more important role of image textures. We here put these conflicting hypotheses to a quantitative test by evaluating CNNs and human observers on images with a texture-shape cue conflict. We show that ImageNet-trained CNNs are strongly biased towards recognising textures rather than shapes, which is in stark contrast to human behavioural evidence and reveals fundamentally different classification strategies. We then demonstrate that the same standard architecture (ResNet-50) that learns a texture-based representation on ImageNet is able to learn a shape-based representation instead when trained on 'Stylized-ImageNet', a stylized version of ImageNet. This provides a much better fit for human behavioural performance in our well-controlled psychophysical lab setting (nine experiments totalling 48,560 psychophysical trials across 97 observers) and comes with a number of unexpected emergent benefits such as improved object detection performance and previously unseen robustness towards a wide range of image distortions, highlighting advantages of a shape-based representation.