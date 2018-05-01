---
layout: post
title: Schematic and PCB Design
lang: EN
ref: PCBDesign
teaserImage: /images/CanSat_PCB_V1.png
---

After some time full of exams and tests we finally got to
take our next step: The PCB Design

**Step 1: Circuit Diagram**

Before you start printing a PCB (Printed Circuit Board
you should know what you want to design. For that it helps to design a circuit diagram.
First of all, you have to include all  components and the electrical connections you want
and arrange them.

{% include image.html path = "/images/Erster_Schaltplan.jpg" caption = "Our first schematic"%}

It's best to do it digitally, but it helps to have it all on paper as well.
The design tool we used is the web application EasyEDA, with which you can also convert schematics to PCBs.
The electronics have been tested on breadboards before so we can just convert them into a schematic.

{% include image.html Path = "/images/CanSat_Schaltplan.png" caption = "Our schematic: each box represents a layer in the CanSat"%

**Step 2: PCB design**

After creating your wiring diagram you can go over to the PCB design.
Now you arrange all parts according to how it should look in the end.
You also have to consider how to arrange them, especially if you don't have a lot of space.
We decided to design three different PCBs which will be stacked in the CanSat.

{% include image.html path = "/images/CanSat_PCB_V1.png" caption = "Our PCB design"%}

**Step 3: Paper printout**

This step is not really necessary but before you spend a lot of money on something that doesn't work in the end,
it may be worth it to print it out on carboard. Of course you can't test the electrical connections themselves but you can see
if all the components fit on the board the way you wanted them to.
It's especially helpful for us since we can arrange all three parts the way we want to connect them in that CanSat.

{% include image.html path = "/images/CanSat_PCB_Layout.jpg" caption = "For testing: All three layers printed on cardboard"%}

**And now?**

With that we would be done. However, there are a few things that we want to optimize.
For example we want to see if we can arrange everything and save a little more space. Also, it would be helpful to have three
overlying holes with which we can connect the PCBs firmly together. And the antenna from the radio module
could be connect to the top PCB so the antenna would on top of the CanSat instead of in the middle.
