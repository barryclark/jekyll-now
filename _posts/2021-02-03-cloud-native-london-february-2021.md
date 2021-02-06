---
layout: post
title: "Cloud Native London February 2021: Red Hat, driftctl, and LINBIT HA-Solutions GmbH"
description: "three speakers from Red Hat, driftctl, and LINBIT HA-Solutions GmbH join us at the Cloud Native London meetup February 2021, hosted by Cheryl Hung, VP Ecosystem at CNCF"
location: London, UK
image: /images/CNL_2021-02-03_Rambly.jpg
video: https://www.youtube.com/embed/5_9q1EYtEHY
tags:
  - Photos
  - Video
  - Meetup
  - "2021"
---

Joining us at the February Cloud Native London virtual meetup via Zoom, Rambly, and the YouTube/Twitch livestreams were three great speakers from Red Hat, driftctl, and LINBIT HA-Solutions GmbH.

We are immensely grateful to [Tecknuovo](https://www.tecknuovo.com/), [Humio](https://humio.com/), [Palo Alto Networks](https://www.paloaltonetworks.com/), [CircleCI](https://circleci.com/), and [Redhat](https://www.redhat.com/en) for your enthusiastic and generous support and sponsorship.

### Overview

First up was Joel Speed from Red Hat, kicking off our first talk for the evening by exploring Eventually Consistent Testing for Kubernetes Controllers (starting at [31:01](https://youtu.be/5_9q1EYtEHY?t=1861)). His takeaways are to:

* Use Envtest to improve feedback loops of local testing for complex controller loops.
* Concentrate on the declarative actions of your controllers, observe this rather than the side effects and end goals.
* Leverage Ginkgo and it's parallelism tooling to speed up your test suites.

Next up was Stephane Jourdan from driftctl discussing Why you should take care of infrastructure drift (starting at [1:00:11](https://youtu.be/5_9q1EYtEHY?t=3611)). He talked about how:

* Even as an experienced Terraform user, as your infrastructure team and codebase grows, it often becomes harder to track drift. Minor infrastructure drift can cause major issues. The sooner they are detected, the easier it is to fix them.
* You can't efficiently improve what you don't track. We track coverage for unit tests, why not infrastructure as code coverage. There's an open source tool to do it now.
* Run your drift detection tests on a regular basis or event better put them in your CI to make sure you're covered.

Finally, after our break we returned with Robert Altnoeder from LINBIT HA-Solutions GmbH who talked about Replicated block storage with LINSTOR (starting at [1:45:22](https://youtu.be/5_9q1EYtEHY?t=6322)). His takeaways mentioned:

* Where to use block storage and why.
* Why simplicity matters when things go wrong.
* Advantages of control plane / data plane separation

And before we close, a group photo from Rambly! 
![](/images/CNL_2021-02-03_Rambly.jpg)

## Cloud Native London March

Our next meetup will be Wednesday 3rd March, when we'll be joined by speakers from StackRox, Contino, and Vodafone. [RSVP and save the date now!](https://www.meetup.com/Cloud-Native-London/events/274953657/)

Stay safe, stay healthy, and see you next month!

Cheryl (@oicheryl) 
