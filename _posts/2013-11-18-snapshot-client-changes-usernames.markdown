---
layout: post
title: Snapshot client changes usernames
date: '2013-11-18 21:00:22'
---

A while ago, I created a script with the help of one engineer to correct a particular use case that Blackboard had occurring, so here is a brief explanation:

#### Use Case:
1. You run Snapshot to change **enrique.valenzuela** to **evalenzuela** as the username
2. But you didn't consider that all the messages from the mail inside the Blackboard Learn application will actually disappear, so now you have a lot of emails by no one.

No worries, there a few things that you can do and hopefully you can run one by one of the following. 

**Please remember that I don't own anything of this, and this is a high risk task.**

### Steps
1. We first got a list of all the .header files (this files contain the email addresses) by doing

		for i in /usr/local/blackboard/content/vi/bb_bb60/courses/1/*/messaging/users/*/*/*.header; do echo "./test2.pl rep_string.txt $i"; done > run.sh
2. This will create a file named run.sh with the path of all the .header files that we need to touch. 
3. For this to be correct we need a file (feed file) which will have the old id, new id separated by a space like this:
		
        0101090201 user1@stu.edu
		0101050671 user2@stu.edu
		0101080268 user3@stu.edu
4. That file in my case was named rep_string.txt
5. Then you will need the Perl script that is below. This script hopefully is straight forward. It was done for this specific use case and it was improved, specially some performance enhancements from some team members.

		#!/usr/bin/perl
 
		$pattern_file = $ARGV[0];
		$file = $ARGV[1];
 
		open(FH, $pattern_file) || die "can't open $file\n";
		while(<FH>) {
			if (/(\S+)\s(\S+)/) {
    			$arr{$1} = $2;
   			}
		}
 
		close FH;
 
		open(FH, $file) || die "can't open $file\n";
		open(FH1, ">$file.new") || die "can't open $file.new\n";
		while(<FH>){
        	chomp; #this will remove the extra lines
        	#       print"$_\n";
        	if(/^To/ || /^From/ || /^Cc/ || /^Bcc/){ #comparing if the beginning of the line starts with
           	foreach $old (sort keys %arr) {
            	$new = $arr{$old};
                s/$old/$new/; # replacing
           }
        }
        print FH1 "$_\n"; #printing in the new file
		}
		close FH;
		close FH1;
 
		`cp $file.new $file`;
		`rm $file.new`;

As always the suggestion is that you run it first with a few users in an identified course, so you can correctly verified that it was done and it’s actually working.

Remember that will generate a **run.sh** that you will need to execute.