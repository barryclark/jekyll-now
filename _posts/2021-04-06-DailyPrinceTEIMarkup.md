---
layout: post
author: Savannah Pobre
title: The Daily Princeton March 9th, 2001 TEI Markup  
---

## The Document
[Daily Princetonian][1], Volume 125, Number 26, 9 March 2001



## TEI Markup
### The Daily Princetonian Header
```xml
<ad/>
<ad/>
<ad/>
<div1 type="nameplate">
<pb/>
<head><i>THE DAILY</i> PRINCETONIAN</head>
<ab><num type="volume" value="CXXV No.26">Vol. CXXV, No.26</num>
<nm type="place">Princeton, New Jersey</nm>,
<date value="2001-03-01">Friday, March 9, 2001</date>
<date value="2001">copyright</date>
<num type="cost" value="30">30 cents</num></ab>
</div1>
```

### The Daily Princetonian Column
```xml
<div1 type="weekly wrap-up">
<head><i>Weekly Wrap-Up</i></head>
<div2 type="dean’s list">
<head>Dean’s List</head>
<emjup></emjup>
<p><i>COACH THOMPSON '88 </i > Leads <tm>Tigers</tm> to <br>Ivy League</br> <sp>championship</sp> and gets it right when noting, “I think that cupboard wasn’t as bare as you thought it was.” </p>
<emjup></emjup>
<p><i>UNIVERSITY WORKERS</i> <ttl>Vice president</ttl> <nm>Dick Spies </nm><yr>GS ‘72</yr> responds to concerns, promising to look into employment and compensation policies. </p>
</div2>
<div3 type="dean’s warning">
<emjdwn></emjdwn>
<p><i><tm>QUAKERS</tm></i> Heavy pre-season favorites to win the <br>Ivy League</br>, <schl>Penn</schl>was mauled by <schl>Princeton</schl> twice en route to a disappointing record. </p>
<emjdwn></emjdwn>
<p><i><pl>NEW JERSEY</pl></i> <wthr>Forecasts</wthr> of <ms>two to three feet</ms> of snow for the <pl>Garden State</pl> fail to materialize. <sar>Seems even <wthr>blizzards</wthr> like to avoid the armpitof <pl>America</pl>.</sar> </p>
</div3>
</div1>
```

## TEI Tags Cheat Sheet
```xml
- <ad> = advertisement / image with little text
- <i> = italicize
- <p> = paragraph
- <head> = header
- <pb> = page break
- <ab> = line break (think ab line in stat)
- <num> = number
- <yr> = year
- <nm> = name
- <date> = date
- <emjup> = thumbs up emoji
- <emjdwn> = thumbs down emoji
- <tm> = team name (sports)
- <br> = bracket/ conference name (sports)
- <schl> = school / University
- <pl> = place
- <wthr> = weather
- <ms> = measurement
- <sp> = sports phrases
- <sar> = sarcasm
- <ttl> = title
```

## The Reflection
<p>Since the chosen document is a newspaper, the elements I wanted to preserve for researchers (specifically historians who may reference newspapers for specific events, etc) were dates, names, and organization names (i.e. sports teams, clubs, etc). I ended up tagging all of these aspects within my TEI hierarchy as shown in the TEI tag cheat sheet. In addition to these basic tags that help researchers pick out dates, names, weather, and other common researched events throughout the history of publications, I also chose to use tags like "sar" for sarcasm which is apparent in editorial columns and other advertisements within a newspaper. If I chose to do another column with more text or a complete article I most likely would have used more of these sort of tags so that historians or researchers who were more interested in the literature could pick out phrases that might key into writing style during the time period.</p>
<p>Categorizing this document should be relatively simple because it is a periodical or newspaper that showcases events and daily life for members of the Princeton community within the duration of a specific date. Unlike prose, or other publications, choosing a newspaper made the categorization of my document easier while it made the TEI hierarchy difficult due to the variety of text sizes, images, and ads. The markup codes I chose to utilize were tags that did not have an explicit hierarchy so that I could preserve the idea of having a lot of equal elements on a page (with emphasis on the header and other words through page breaks and text style such as italics and bolds). </p>
<p>The textual structure that seems the most appropriate for this document would ideally be in line with a hierarchy that allows for the page to read with the images or emojis as well as the various text fonts and styles, all under the same parent branch. I chose to not break down a complete hierarchy of terms within my code because I want to conserve the idea of having an entire page of the newspaper in view where the reader can decide of their own free will where they want to look. To show this I coded two different elements of the entirety of the newspaper into html/TEI. </p>
<p>Throughout this process I had a few questions regarding how markup was utilized for Digital Humanity scholars to decide what makes it into the TEI code repository. For example when I was writing up my tags I was constantly unsure when to abbreviate or how to abbreviate so that my code would be understandable to a wider audience. For simplicity, I ended up coding all of my tags as abbreviations and have provided a definition list to avoid any confusion. A more general question that came up regarding markup was how to display the entirety of a document such as a newspaper to the reader in a digital platform. While an image or pdf document can easily show all of the elements of the front page of the newspaper (header, ads, as well as columns and complete articles), it is difficult to convey this in lines of code, even with a hierarchy. This is why I chose to do two separate codes one for a column of announcements called Weekly Wrap-Up, including Dean’s List and Dean’s Warning, and one for the main header for this issue of The Daily Princetonian. </p>

[1]: https://theprince.princeton.edu/princetonperiodicals/?a=d&d=Princetonian20010309-01.1.1&e=-------en-20--21--txt-txIN-advertisement-ILLUSTRATION-----
