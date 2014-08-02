---
title: Mongoperf
author: kgorman
layout: post
permalink: mongoperf
aktt_notify_twitter:
  - yes
aktt_tweeted:
  - 1
fave-post_views:
  - 78
home_grid:
  - 0
make_featured:
  - 0
post_layout:
  - layout_4
featured_image_credit_line:
  -
categories:
  - Mongodb
---
Starting with <a href=http://www.mongodb.org/downloads>version 2.1</a>, MongoDB has a new utility called <a href=https://github.com/mongodb/mongo/blob/master/src/mongo/client/examples/mongoperf.cpp>Mongoperf</a>. Mongoperf is a great little utility for quickly testing the I/O performance of your system. I thought I would go over it a little bit.

Mongoperf can be found in the bin directory of your 2.1+ MongoDB distribution. The utility is invoked with options to tell it how to perform a sample I/O run, and it gives output indicating the performance of your disk I/O subsystem. The utility generates random I/O over a single file. One great aspect of this utility is it accesses the I/O subsystem very much like MongoDB itself does. It uses the same <a href=http://en.wikipedia.org/wiki/Memory-mapped_file>memory mapped files</a> interface just like MongoDB itself. Running the utility with &#8211;help outputs the various options for running. The utility takes a JSON document as input. Typically I like to store the various options in a .js file and emit that into stdin of the utility as such:  


The most powerful usage of this tool is to bypass the Linux page cache, and perform Direct I/O. Running in this manner shows true gauge on how fast your storage subsystem is. This is done via the {mmf:false} assignment in the config document. When mmf is false, then Mongoperf performs direct I/O via the <a href=http://www.kernel.org/doc/man-pages/online/pages/man2/open.2.html>O_DIRECT</a> flag. So no system memory is used to cache file buffers. That said, anything below the linux filesystem could be cached, including controller and drive caches. For example:  


The output of the utility shows the throughput as the threads ramp up to the nThreads limit you specify and then will just run at that level of concurrency forever. The output is in Disk Operations per Second. For example:  


There are a couple things to note about this utility. For one, be sure to specify a reasonably large file for fileSizeMB. Maybe like 10000. This ensures you are wider than a single stripe if using RAID, this also ensures that you have enough data on disk that random I/O is truly random. Let the test run long enough that the system normalizes (caches get populated, etc). Try for 3-5 minutes or so as a general guideline. Also try different nThreads values to get a feel for the level of disk concurrency your system can tolerate. Also, another great test is to test the read and write options together, and separate to get a feel for how well your system does on each on of these types of workload. For instance, you can test the write cache on a controller quite effectively using this approach.

In the future I think having an option for creating multiple files to I/O against would be a great option and allow for a bit more realistic workload. Perhaps an option to output the results in BSON/JSON would be cool too.
