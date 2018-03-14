---
layout: post
title: We Got Breached from RingZer0team.com
---

This challenge was a SQL injection attack on a mysql server. It was interesting to see since it was able to extract data from the database while only knowing if a query returns true or false. It works by using MID() to get a letter from the query returned and then converting to ascii code with ORD(), and comparing to a guess from the attacker. This lets the attacker know if the char is above or below the current guess. Once one char is found, then the attacker moves to the next char. 

![_config.yml]({{ site.baseurl }}/images/we_got_breached/http_packets.png)

When you first look at the pcap, you can see that it has a lot of HTTP traffic. If the HTTP stream is followed for one of the requests, you can see SQL queries being built. 

![_config.yml]({{ site.baseurl }}/images/we_got_breached/SQLi.png)

SQL queries themselves are not suspicious, but this one is querying INFORMATION_SCHEMA.SCHEMATA which is a table in mysql that contains table information. 

To see only the server's responses in Wireshark the filter "http && ip.src==10.0.1.142" can be used. The server responds with "User id: " + user_input + ("was found" or "was not found"). The attacker builds a SQL query to start mapping the database by using queries the resolve to true or false. The attacker uses distinct to group the table names together, and then starts guessing the name for each table. First finding the length of the schema_name returned, and then starting to guess the actual name. 

![_config.yml]({{ site.baseurl }}/images/we_got_breached/SQL_break_out.png)

The returns for the first char of the length of row one schema_name were:

    char > 51 was not found
    char > 48 was found
    char > 49 was not found

This means the char is greater than 48, but not greater than 49, so char is 49. 49 is 1 when converted to ascii. If done for the second char you get 8, which means the schema_name is 18 chars long. The attacker can now guess the chars in the actual name. 

The attacker can then repeat this process again for each row in INFORMATION_SCHEMA.SCHEMATA. He will now have the names of the tables in the database, and determine which is of interest to him. In packet 3846, the attacker starts querying INFORMATION_SCHEMA.TABLES, which contains column names for tables, for the table chart_db. 

After finding the column name, the attacker then starts querying the chart_db table for the value in the column flag. 

The quickest way to find out what the flag value is from the pcap, is to export the HTTP objects. You can then take advantage of what the attacker has done, and use sort and grep to find that name quickly. 

![_config.yml]({{ site.baseurl }}/images/we_got_breached/http_export.png)

After exporting HTTP objects for the responses for the flag, run the following:

    strings http_objects/* > flag_pcap.txt
    sort flag_pcap.txt > flag_data_sorted.txt
    cat flag_data_sorted.txt | grep ,X, | grep not (where X is the char you want)


This will show you the smallest value that was not found, which is the value that the char is. If you want to verify this you can reverse sort flag_pcap.txt, and then grep for first value found. This will be the value right below the answer. 

To automate the process the following bash can be run, after you know the length of the flag:
    for i in $(seq 1 37); do cat flag_data_sorted.txt | grep ,$i, | grep not -m 1; done

![_config.yml]({{ site.baseurl }}/images/we_got_breached/flag_data.png)