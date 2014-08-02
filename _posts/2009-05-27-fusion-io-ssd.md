---
title: Fusion-io SSD
author: kgorman
layout: post
permalink: fusion-io-ssd
dsq_thread_id:
  - 134389873
fave-post_views:
  - 1043
categories:
  - Database Engineering
  - PostgreSQL
tags:
  - fusion-io
  - performance
  - postgresql
  - SSD
  - vxfs
---
I got the opportunity to test out some of the new Fusion-io <a href="http://en.wikipedia.org/wiki/Solid\_state\_disk#Flash\_based\_drive" target=1>Solid State</a> ioDrive, and I thought I would post some results.

[Fusion-io][1] has created a SSD product called [ioDrive][2] that is based on PCIe cards vs replacing SAS or SATA drives with SSD directly. This approach allows for much lower latency because of the use of the PCIe bus vs traditional disk channels geared towards slow disk. The 320GB model I used in my test are made of Multi Level Cell (MLC) NAND flash and are quoted by Fusion-io to achieve throughput somewhere in the 70k IOPS neighborhood.

<!--more-->

For this test I used two identical Dell 2970 boxes, one using a 6 disk RAID 10 disk, and the other using a single Fusion-io 320GB NAND flash PCIe card. Here are the important configuration items:  
- [Dell 2970][3] 2u  
- (6) SAS disk RAID 10 with Perc6i controller or Fusion-io 320GB PCIe ioDrive.  
- 32GB RAM  
- Quad-Core AMD Opteron(tm) Processor 2347 HE 1895 MHZ 512 KB Cache  
- SuSE linux; 2.6.16.46-0.12-smp x86_64  
- VxFS file system with 8k block size and cached I/O  
- PostgreSQL 8.2.4 with 2GB buffer cache and fsync=on  
- All data on the same mount point; /data

The test I used is a custom set of pgbench scripts that represent a real world workload. The script is launched from a third host and is not run on the database host itself. The test is about 80% reads and about 20% writes. The test does not perform deletes, just select,insert,update. Typical queries are index range scan type queries where multiple rows are fetched per result set.

The performance was measured using [pgstat][4].

The test results are shown below. Some interesting things to note:  
- Notice about 400% peak improvement in performance using SSD.  
- Notice at about 25 concurrent backends the machine with SSD starts to degrade.  
- Notice at about 100 concurrent backends the machine with disk starts to degrade.

<img class="aligncenter size-full wp-image-404" title="fusionio" src="http://www.kennygorman.com/wordpress/wp-content/uploads/2009/04/fusionio.png" alt="fusionio" width="600" height="273" />

When considering SSD there are some new things to think about vs traditional disk. In this test I used RAID10 for SAS drives and a single Fusion-io 320GB card. Unfair? Perhaps a bit, but one thing to consider is that SSD is more reliable than traditional disk even though it has a limited lifetime. Another thing to consider is the machine with SSD does not need as much RAM because the disk is so fast. So comparing disk to SSD directly is not always a perfect comparison. In the real world I would run 8GB of RAM on the SSD machine, and perhaps run RAID1 of 2 cards. Here is a [white-paper outlining][5] some of the differences. One other item to note is because SSD&#8217;s lifetime is effected by number of writes being performed to the drive. So RAID5 while economical could cause premature end of lifetime (writing all the parity).

The Fusion-io cards are simple to install and configure. <del datetime="2009-06-01T21:00:00+00:00">The drivers are available on <a href="http://freshmeat.net/projects/fio<br />
">Freshmeat</a></del> The drivers are available on the <a href=http://www.fusionio.com/support/index.php>Fusion IO support site</a>. They have a simple setup guide so I won&#8217;t cover any of the details, but once installed the drive appears as any other block device. Installing the Veritas file system was a little more time consuming. Here is a quick cheat sheet:

<pre lang="bash">vxddladm addforeign path=/dev/fioa
vxdisk scandisks
vxdg init dbdg fio=fiob cds=off
vxassist -g dbdg -p maxsize
vxassist -g dbdg make fusionA 313563136
mkfs.vxfs /dev/vx/rdsk/dbdg/fusionA -o bsize=4096,largefiles
mount -t vxfs /dev/vx/dsk/dbdg/fusionA /data
</pre>

A note about random writes. Random writes on SSD are the Achilles Heel. My tests perform random writes because this is what our workload really does. To speed up random writes some tuning measures can be performed. The Fusion-io architecture employs a background process that performs writes to the SSD media. This process can become overwhelmed, and in order to speed it up more scratch space needs to be used in a high random write environment. So formatting the disk space with less usable, and more reserve may result in a speed up in performance. This is done at format time with the fio-format tool. So test before you deploy to see what free space percentage works well with your workload. If I can grab some more time I will do so and add the results to my initial testing.

In terms of price these units are fairly expensive, but coming down in price. If you consider the TPS/$ factor then SSD is fairly competitive and when you add in the form factor savings (more TPS per U) as well as power savings; now might be about the time to jump into some Fusion-io SSD&#8217;s.

 [1]: http://www.fusionio.com/
 [2]: http://www.fusionio.com/PDFs/Fusion_Specsheet.pdf
 [3]: http://www.dell.com/content/products/productdetails.aspx/pedge_2970_rack?c=us&l=en&s=biz&cs=555
 [4]: http://pgfoundry.org/projects/pgstat2/
 [5]: http://www.fusionio.com/PDFs/Whitepaper_Solidstatestorage2.pdf
