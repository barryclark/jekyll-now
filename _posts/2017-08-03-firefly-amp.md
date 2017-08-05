---
published: false
title: FireFly Tube Amplifier
---
## Building a FireFly Tube Amplifier

I recently built a FireFly Tube Amplifier based off of [Doug Hammond's original design](http://ax84.com/index.php/oldprojects.html?project_id=firefly). 

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
* **[John Calhoun's FireFly Build Guide and Bill of Materials (BOM Page 11)](http://vintageusaguitars.com/misc/Firefly%20PCB%20Guide%208.pdf)**
* **[Mouser Parts List](https://www.mouser.com/ProjectManager/ProjectDetail.aspx?AccessID=41C1F88452)**




![FireFly-1]({{taylorjhawkins.com}}/images/firefly-1.jpg)
![FireFly-2]({{taylorjhawkins.com}}/images/firefly-2.jpg)
![FireFly-3]({{taylorjhawkins.com}}/images/firefly-3.jpg)
![FireFly-4]({{taylorjhawkins.com}}/images/firefly-4.jpg)
![FireFly-5]({{taylorjhawkins.com}}/images/firefly-5.jpg)
![FireFly-6]({{taylorjhawkins.com}}/images/firefly-6.jpg)
![FireFly-7]({{taylorjhawkins.com}}/images/firefly-7.jpg)
![FireFly-8]({{taylorjhawkins.com}}/images/firefly-8.jpg)

Line Number	Mouser Part Number
Customer Part Number
Manufacturer Part Number
Description
Estimated
Shipment
Date(s)	Quantity	Unit Price
(USD)	Extended Price
(USD)

1	
RoHS1858-P160KN-0QC15A1M
P160KN-0QC15A1M
16mm Rotary
JUL 12, 2017
1
0.720	0.72

2	
RoHS2550-12202
NMJ4HCD2
2C MONO 2-SPST NC
JUL 12, 2017
1
1.150	1.15

3	
RoHS1108-0020-EVX
SPDT ON-ON
JUL 12, 2017
1
3.270	3.27

4	
RoHS1108-0024-EVX
DPDT ON-ON
JUL 12, 2017
1
3.810	3.81

5	
RoHS2647-TVX2G470MCD
TVX2G470MCD
400volts 47uF
JUL 12, 2017
3
4.110	12.33

6	
RoHS2647-TVX1H100MAD1LS
TVX1H100MAD1LS
50volts 10uF
JUL 12, 2017
1
0.900	0.90

7	
RoHS2539-150105J100IC
150105J100IC
100V 1uF 5%
JUL 12, 2017
2
3.210	6.42

8	
RoHS2598-715P22256JD3
715P22256JD3
600Volts 2200pF
JUL 12, 2017
1
2.200	2.20

9	
RoHS2598-715P22356KD3
715P22356KD3
600Volts 22000pF
JUL 12, 2017
2
3.050	6.10

10	5982-15-500V470
CD15FD471JO3
MICA 470PF500VJ
JUL 12, 2017
1
3.430	3.43

11	5982-15-500V220
CD15FD221JO3
MICA 220PF500VJ
JUL 12, 2017
1
2.200	2.20

12	
RoHS2294-22K-RC
22Kohms
JUL 12, 2017
10
0.038	0.38

13	
RoHS2293-1M-RC
1Mohms
JUL 12, 2017
10
0.020	0.20

14	
RoHS2293-470K-RC
470Kohms
JUL 12, 2017
10
0.020	0.20

15	
RoHS2293-330K-RC
330Kohms
JUL 12, 2017
10
0.020	0.20

16	
RoHS2293-100K-RC
100Kohms
JUL 12, 2017
10
0.020	0.20

17	
RoHS2293-33K-RC
33Kohms
JUL 12, 2017
10
0.020	0.20

18	
RoHS2293-1.8K-RC
1.8Kohms
JUL 12, 2017
10
0.020	0.20

19	
RoHS2293-820-RC
820ohms
JUL 12, 2017
10
0.020	0.20

20	
RoHS2273-100-RC
100ohms 1%
JUL 12, 2017
10
0.024	0.24

21	
RoHS2603-MFR50SFTE52-442R
MFR50SFTE52-442R
442 OHM 1/2W 1%
JUL 12, 2017
10
0.104	1.04

22	
RoHS1103-0008-EVX
Toggle DPDT
JUL 12, 2017
1
4.510	4.51

23	
RoHS2607-1030D3
1030D3
AMBER DIFFUSED
JUL 12, 2017
1
3.420	3.42

24	
RoHS2576-0215001.HXP
0215001.HXP
250V 1A
JUL 12, 2017
2
1.550	3.10

25	48SM003
METRIC SCREW 3MMX6MM
JUL 12, 2017
100
0.015	1.50

26	
RoHS1855-R30-1011002
R30-1011002
M3 x 10mm HEX SPACER
JUL 12, 2017
6
0.520	3.12

27	
RoHS1855-R30-1012502
R30-1012502
M3 x 25mm HEX SPACER
JUL 12, 2017
6
0.730	4.38

28	
RoHS2502-12A
12A
2 CONDUCTOR 1/4"
JUL 12, 2017
1
3.190	3.19

29	
RoHS2538-39880-0302
39880-0302
2 CKT TERM. BLOCK
JUL 12, 2017
2
0.670	1.34

30	
RoHS2538-39880-0303
39880-0303
3 CKT TERM. BLOCK
JUL 12, 2017
2
0.840	1.68
