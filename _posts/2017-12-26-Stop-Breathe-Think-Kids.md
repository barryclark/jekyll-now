---
layout: post
title: Stop, Breathe & Think Kids
description: Mindfulness app specially designed for kids, featuring guided meditations for dealing with anxiety, stress and sleeping problems. 
description2: Showcased on The Planet of the Apps show and selected as App Store's Best of Show 2017 in 3 countries.
background: index/sbt-postBackground.svg
banner: posts/StopBreathe&ThinkKids/sbtk-banner.jpg
featured: true
roles: [iOS Developer, UI Engineer]
order: 1
---

*Mindfulness app specially designed for kids, featuring guided meditations for dealing with anxiety, stress and sleeping problems.*

*Showcased on The Planet of the Apps show and selected as **App Store's Best of Show 2017** in 3 countries.*

![](/static/img/posts/StopBreathe&ThinkKids/sbtk-player-iphone6.jpg)

# Can we teach our kids to meditate?

After having established itself in the mindfulness space, 'Stop, Breathe & Think' had an interesting question: Can we make our kids care about meditating?

Our aimed audience, between 6 and 11 years old, provided me a fascinating challenge. As a UI Engineer, my main goals were:

- Fast and impatience-proof performance
- Generous tappable areas
- Fun but not-in-the-way micro interactions

Without the baggage of our first app, we decided going full Swift and with exclusive support of iOS 10 (and later, iOS 11).

# From side project to main attraction

The project was originally pitched by the product team as a proof-of-concept app. They decided to assign only me and our ux/ui designer for working on its first version while the rest of the team were focused on our original app.

Only time after release the CEO revealed the product was actually part of a broader and bigger strategy born from the company's participation on The Planet of the Apps show. Currently the app is growing faster than its All-Ages counterpart.

![](/static/img/posts/StopBreathe&ThinkKids/sbtk-kid.jpg)

# Fast prototyping for early deliveries

Keeping the sprints short and our options open, I decided for a deliver-early approach, focusing on providing UI implementation progress on our foundational iterations.

I relied on .xib files for laying out our scenes and branched out a (very) slim version of the VIPER architecture for our modules.

# Taking control of the flow

Thanks to this approach, I noticed early on that we needed to structure our navigation flow based more on our information needs rather than how we were visually presenting the screens.

So there's a heavy reliance on custom transitions across the app (e.g a modal transition animation mimicking a right-to-left push transition), giving us the freedom we were looking for. 

# Featured interactions

I have many favorite interactions, but one I feel most proud of the Emotion Picker. Comprising of a UIStackView for the parent emotions and a custom laid out UICollectionView for the children, it helps you quickly express all the range of emotion you feel in a quick and fun way.

<p>
<video width="100%" controls preload="metadata" poster="/static/img/posts/StopBreathe&ThinkKids/sbtk-emotionPicker-poster.jpg">
<source src="/static/img/posts/StopBreathe&ThinkKids/sbtk-emotionPicker.mp4" type="video/mp4">
</video>
</p>

I also feel proud of the Kids Account Manager, a later adition to the product. A UICollectionView with custom layout seamlessly gives way to a second screen for editing a kid's information.

<p>
<video width="100%" controls preload="metadata" poster="/static/img/posts/StopBreathe&ThinkKids/sbtk-kidsAccount-poster.jpg">
<source src="/static/img/posts/StopBreathe&ThinkKids/sbtk-kidsAccount.mp4" type="video/mp4">
</video>
</p>

# Final thoughts

I'll always value the oportunity of working on this project. Having a direct impact on children lives is what makes this project so special. 

We keep receiving emails thanking us for helping  an austistic child finding calmness or a bullied child regaining confidence in life. That's the ultimate reward on this job.


