---
published: false
title: FireFly Tube Amplifier Part 1
---
## Building a FireFly Tube Amplifier

I recently built a FireFly Tube Amplifier based off of [Doug Hammond's original design](http://ax84.com/index.php/oldprojects.html?project_id=firefly). 

This will be a multi-part series, as I intend to build an enclosure for the amplifier, as well as a speaker cabinet sometime in the near future. 

I'd like to briefly document the process followed, the tools required, and the issues I ran into. 

**_Disclaimer: This project can be potentially fatal, proceed at your own risk!_** 

Tool recommendations are a blend of quality and affordability. While Greenlee tools are quite nice, their cost can be hard to stomach.

**Tools and Supplies Needed for Amplifier Assembly**
- **[Soldering Station](https://www.amazon.com/Weller-WES51-Analog-Soldering-Station/dp/B000BRC2XU/ref=sr_1_1?ie=UTF8&qid=1501897991&sr=8-1&keywords=wes+51)**
* **[Solder](https://www.amazon.com/gp/product/B0149K4JTY/ref=oh_aui_detailpage_o02_s00?ie=UTF8&psc=1)**
* **[Vise](https://www.amazon.com/gp/product/B000B61D22/ref=oh_aui_detailpage_o04_s00?ie=UTF8&psc=1)**
* **[Desoldering Pump](https://www.amazon.com/gp/product/B00L2HRW92/ref=oh_aui_detailpage_o05_s00?ie=UTF8&psc=1)**
* **[Rosin Flux Pen](https://www.amazon.com/gp/product/B008OC3VMU/ref=oh_aui_detailpage_o03_s00?ie=UTF8&psc=1)**
* **[Hookup Wire](https://www.amazon.com/gp/product/B01180QKJ0/ref=oh_aui_detailpage_o08_s00?ie=UTF8&psc=1)**
* **Screwdriver**
* **Multimeter**

**Tools and Supplies Needed for Amplifier Chassis**
* **[Drill](https://www.amazon.com/Milwaukee-2606-22CT-M18-Drill-Driver/dp/B00GLEWR96)**
* **[Drill Bit Set](https://www.amazon.com/dp/B004GIO0F8?tag=mcaveman-20)**
* **[Unibit \#1](https://www.amazon.com/Irwin-Tools-Unibit-Step-Drill-10231/dp/B00004THYX/ref=pd_sim_469_1?_encoding=UTF8&psc=1&refRID=NXY6AMAEYY2HTC4JVQ1X)**
* **[Unibit \#4](https://www.amazon.com/Irwin-Industrial-Tools-10234CB-Unibit/dp/B00126J1PG/ref=sr_1_1?ie=UTF8&qid=1501898470&sr=8-1&keywords=Irwin+10234CB)**
* **[Cutting Fluid](https://www.amazon.com/Forney-20857-Magic-Industrial-Cutting/dp/B003X3ZKXI/ref=pd_bxgy_469_2?_encoding=UTF8&psc=1&refRID=WGCA7P8PYG9MGM152KFX)**
* **[Nibbler](https://www.amazon.com/ProsKit-900-215-Nibbler/dp/B000BN60XW/ref=sr_1_2?s=hi&ie=UTF8&qid=1501901209&sr=1-2&keywords=Nibbling+Tool)**
* **[Automatic Center Punch](https://www.amazon.com/TEKTON-6580-Automatic-Center-Punch/dp/B0037UUO60/ref=sr_1_9?s=hi&ie=UTF8&qid=1501901209&sr=1-9&keywords=Nibbling+Tool)**
* **[Knockout Punch Kit](https://www.harborfreight.com/knockout-punch-kit-10-pc-60575.html)**
* **[Deburring Tool](https://www.amazon.com/gp/product/B00004T828/ref=oh_aui_detailpage_o06_s00?ie=UTF8&psc=1)**
* **Aluminum Files**

### Components Needed
Due to the nature of the electronic component industry, I've provided several links to various bill of materials for this project. Please take your time to ensure that the parts ordered meet the required specifications. John Calhoun's Bill of Materials is a good starting place for component specifications, although keep in mind that some components may need to be substituted, and components may need to be sourced from other vendors.

Please take heed of the information provided on the RonSound Revision 8 PCB page regarding the chassis, transformers, tubes, sockets, etc.

* **[RonSound Revision 8 PCB](http://ronsound.com/index.php?main_page=product_info&cPath=129&products_id=882)**
* **[John Calhoun's FireFly PCB Assembly Guide and Bill of Materials (BOM Page 11)](http://vintageusaguitars.com/misc/Firefly%20PCB%20Guide%208.pdf)**
* **[Mouser Parts List](https://www.mouser.com/ProjectManager/ProjectDetail.aspx?AccessID=41C1F88452)**

Additionally, you may want to purchase some nuts and washers in order to mount the transformers to the chassis. 

### Amplifier Assembly
For my build I followed John Calhoun's FireFly PCB Assembly Guide, which is overall a very useful document. However, I did run into a few snags, which I'd like to mention.

#### Hammond 269EX Power Transformer

Please read the manufacturer's notes for your components, as the current production of the Hammond 269EX Power Transformer has different colored wires than is documented in Calhoun's Guide. In Step 19 of Calhoun's Guide, he states "start with the black wires from the power transformer." 

However, the current production has (1) black wire, (1) grey wire, and (1) white wire. 

**DO NOT** assume that by "black wires" Calhoun means the black **AND** grey wires.

This is important to note, because if power is connected to **BOTH** the black **AND** grey wires, instantaneous destruction of the transformer will result. With the current production of the Hammond 269EX Power Transformer, the White and Gray wires should be used for 115 VAC Input and the White and Black wires should be used for 125 VAC Input. Tape the unused wire. 

#### Power Switch 

In steps 19 and 20 of Calhoun's guide, the Power Switch is wired into the amplifier circuit. 

The switch recommended i nthe BOM is a Double Pole Double Throw (DPDT) Switch. This switch has two input terminals and four output terminals, which makes it an ON/ON switch. However, Calhoun's document wires the DPDT switch so that one set of output terminals is used for the input, which prevents live current being present on the unused terminals when the switch is in the OFF state. 

The terminals on the DPDT switch I purchased were all numbered, just as in Calhoun's document. However, if the particular switch I purchased is wired accordingly, then the ON/OFF states will be inverted on the amplifier.

Additionally, when my amplifier was assembled and power was turned on the internal connection between terminal 1 and terminal 2 failed after about 10 seconds. This required a multimeter in order to perform continuity testing of the circuit to identify the failed component. After identifying that it was in fact the switch, I was able to desolder the input leads from terminals 1 and 4, and then proceed to resolder them to terminals 3 and 6. 

This corrected the ON/OFF inversion issue, as well as resolving the issue with the switches internal failure.

#### Output Jack

In step 21 of Calhoun's guide there is a diagram of the output jack being wired to the output transformer. This image is slightly confusing due to how the image appears to be suggesting the wiring should look. I would recommend disregarding the image, and paying close attention to the textual details. Additionally, please review the manufacturer's notes for your output jack to ensure your understanding of how the component should be wired. 

### Chassis Assembly




![FireFly-1]({{taylorjhawkins.com}}/images/firefly-1.jpg)
![FireFly-2]({{taylorjhawkins.com}}/images/firefly-2.jpg)
![FireFly-3]({{taylorjhawkins.com}}/images/firefly-3.jpg)
![FireFly-4]({{taylorjhawkins.com}}/images/firefly-4.jpg)
![FireFly-5]({{taylorjhawkins.com}}/images/firefly-5.jpg)
![FireFly-6]({{taylorjhawkins.com}}/images/firefly-6.jpg)
![FireFly-7]({{taylorjhawkins.com}}/images/firefly-7.jpg)
![FireFly-8]({{taylorjhawkins.com}}/images/firefly-8.jpg)
