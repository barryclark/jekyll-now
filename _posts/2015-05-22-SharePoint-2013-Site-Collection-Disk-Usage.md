---
layout: post
title: SharePoint 2013 Site Collection Disk Usage
---

I was doing some looking around on our SharePoint SQL Server and noticed that the content databases were vastly different in their sizes.

![Content Database Disk Usage](/images/2015-05-22-SharePoint-2013-Site-Collection-Disk-Usage/db-sizes.png)

For performance reasons these content databases should be as close to the same size as possible.  

To fix this I needed to move some site collections to different content databases.

## How Are we Going to do This?

We have hudreds of site collections in these content databases and I decided the best way to show the size of each one was to write a PowerShell Script.

The script needed to output these items in a .csv file:

- Site URL
- Size
- Content DB

From there I would manipulate the file in Excel to figure out which site collections to move and where.

## Step 1: Figure Out the Size of Each Site Collection

PowerShell was the best approach I could find for this:

{% gist d6b46ba0f25c1a08b1bb %}

## Step 2: Edit the file in Excel to Better Understand the Data
 
 Now the data needs to be displayed in a way that will show us which site collections to move and to where.
 
 The data came in looking like this:
 
![Content Database Disk Usage](/images/2015-05-22-SharePoint-2013-Site-Collection-Disk-Usage/excel-cleanup-1.png)

First I needed to clean it up and sort largest to smallest:

![Content Database Disk Usage](/images/2015-05-22-SharePoint-2013-Site-Collection-Disk-Usage/excel-cleanup-2.png)
 
I then needed a way to show which site collections to move and to where:
 
- Copy the whole "Content Database" column into a new Column called "Move Here".
- Then create a new column called "Changed" and set this one up with an if statement checking if Column E is different from Column F.
 - ![Content Database Disk Usage](/images/2015-05-22-SharePoint-2013-Site-Collection-Disk-Usage/excel-cleanup-3.png)
 
Your spreadsheet should now look something like this:

![Content Database Disk Usage](/images/2015-05-22-SharePoint-2013-Site-Collection-Disk-Usage/excel-cleanup-4.png)

Now create a new "Recommended PivotTable" based on "Sum of Size(GB) by Move Here".  
This will help you to see the new sizes of each content database as you decide which ones to move.

![Content Database Disk Usage](/images/2015-05-22-SharePoint-2013-Site-Collection-Disk-Usage/excel-cleanup-5.png)

## Step 3: Decide Which Site Collections to Move and Where

The first step is to figure out how much space each site collection should be using.

- Divide the total amount of used space by the number of content databases.
- I have 7 content databases and the site collections are using 380 GB of data.
 - 380/7 is about 54 GB per content database. 
 
Next you need to decide which sites to move and to where

- The excel spreadsheet helps you figure this out.
- `WSS_Content_7` has hardly any data in it where `WSS_Content_3` has 86 GB used.
- Find the largest table in `WSS_Content_3` and set the "Move Here" column to `WSS_Content_7`.
 - ![Content Database Disk Usage](/images/2015-05-22-SharePoint-2013-Site-Collection-Disk-Usage/excel-cleanup-6.png)
- Then click over to the PivotTable -> Click on Analyze -> Click Refresh
 - The new sizes will be displayed.
 - ![Content Database Disk Usage](/images/2015-05-22-SharePoint-2013-Site-Collection-Disk-Usage/excel-cleanup-7.png)
- Keep doing this until you have evened up the database sizes.

## Step 4: Move the Site Collections

- Go back to the data tab and filter by "yes" on the Changed Column
 - This will list out the Site collections you need to move and where
- Go to the SharePoint server and open up a SharePoint PowerShell Window.
- Run this command to move a site collection:

```PowerShell
Move-SPSite <http://ServerName/Sites/SiteName> -DestinationDatabase <DestinationContentDb>
```
 - For more info see: [Move site collections between databases in SharePoint 2013](https://technet.microsoft.com/en-us/library/cc825328.aspx) 
 
 

