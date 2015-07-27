---
layout: post
title: Automating Snapshot running?
date: '2013-11-18 20:15:35'
---

Well this particular use case kind of don't belong to us, but since the client preferred us to do it, well we start building it.

This Client has Snapshot Controller owned and supported by ICM but the first run of the season, the prefer us to run it. Why? Well quite simple, there are larger files (larger than 4k lines), they want to have a roll back option in case of failure and also to have some sort of notification.

Got the point?

1. Notifications
2. Files in smaller batch sizes
3. Run the script

So obviously there should be some way to do it, so lets start compiling what is already there.

#### Current Steps
1. At this time a file gets to us, lets call it file.txt
2. We split the file using linux split

		split file.txt
3. This will split the file in lines of 1000s, named xaa, xab, xac depending on the amount of files
4. Then we will run the snapshot command, since we know that this file is for courses, we run the following:

		/usr/local/blackboard/apps/snapshot/bin/snapshot_override.sh"-Ddata.source.key=data_source" -f CRS_MANUAL -C /usr/local/blackboard/apps/snapshot/data/snapshot.properties -t /usr/local/blackboard/apps/snapshot/bin/xaa > /tmp/EAlert.txt
and so on depending on the file (xaa, xab, xac)
5. So we want to automate it as much as we can, the first way to automate it was to create a bash script like the following:

		#!/bin/bash
		/usr/local/blackboard/apps/snapshot/bin/snapshot_override.sh "-Ddata.source.key=dsk" -f CRS_MANUAL -C /usr/local/blackboard/apps/snapshot/data/snapshot.properties -t /usr/local/blackboard/apps/snapshot/bin/xaa > /tmp/EAlert.txt
        
		/bin/mail -s "SNAPSHOT" "email@email.com" < /tmp/EAlert.txt

		/usr/local/blackboard/apps/snapshot/bin/snapshot_override.sh "-Ddata.source.key=dsk" -f CRS_MANUAL -C /usr/local/blackboard/apps/snapshot/data/snapshot.properties -t /usr/local/blackboard/apps/snapshot/bin/xab > /tmp/EAlert.txt
        
		/bin/mail -s "SNAPSHOT" "email@email.com" < /tmp/EAlert.txt

		/usr/local/blackboard/apps/snapshot/bin/snapshot_override.sh "-Ddata.source.key=dsk1" -f CRS_MANUAL -C /usr/local/blackboard/apps/snapshot/data/snapshot.properties -t /usr/local/blackboard/apps/snapshot/bin/xac > /tmp/EAlert.txt
        
		/bin/mail -s "SNAPSHOT" "email@email.com" < /tmp/EAlert.txt


		rm /tmp/EAlert.txt
As you can see this is inefficient and problematic, we need to create the bash file, with each request, so we want to automate it even more.

This is not counting that we need the header from the first file into the xa* file.

So we build the following.

### New Solution
Ok, first lets give the script and then we start explaining:

	file=COURSE_1116_001;line=$(head -n 1 COURSE_1116_001);split COURSE_1116_001;sed -s -i "1s/.*/$line/" xa*;for i in /tmp/bk/evalenzuela/xa*; do echo "\
	/usr/local/blackboard/apps/snapshot/bin/snapshot_override.sh -Ddata.source.key=$file -f CRS_MANUAL -C /usr/local/blackboard/apps/snapshot/data/snapshot.properties -t /usr/local/blackboard/apps/snapshot/bin/$i > /tmp/snapshot_log.txt
	\/bin/mail -s 'SNAPSHOT' 'email@blackboard.com' < /tmp/snapshot_log.txt";  done > automated_snapshot.sh;chmod 777 automated_snapshot.sh

#### Explanation
1. Define the file name

		file=COURSE_1116_001
2. Get the header of the file so we can place it in all the splitted files: 

		line=$(head -n 1 COURSE_1136_001)
3. Split the file

		split COURSE_1116_001
4. Now we place this header line into all the splitted files:

		sed -s -i "1s/.*/$line/" xa*;
5. Then we create our script file with the following format as many times as needed. This file has a few variables that we are getting as well:

		#!/bin/bash\
		/usr/local/blackboard/apps/snapshot/bin/snapshot_override.sh -Ddata.source.key=FILE_NAME -f CRS_MANUAL -C/usr/local/blackboard/apps/snapshot/data/snapshot.properties -t /usr/local/blackboard/apps/snapshot/bin/splitted_file > /tmp/snapshot_log.txt\
		/bin/mail -s 'SNAPSHOT' 'email@blackboard.com' < /tmp/snapshot_log.txt
        
Hopefully that helps a few people that are trying to automate Snapshot and make it easier or maybe have some notifications.