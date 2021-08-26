---
layout: post
author: Hope Perry
title: Just Chilling at the Rapids
---
I was, admittedly, a bit nervous to complete this assignment because it involves
a little more code than I'm used to as a humanities concentrator. However, I soon
realized that the XML and TEI were not to be feared and I set about going through
[Thomas Adam's Journal](https://dpul.princeton.edu/pudl0017/catalog/qr46r491g) to find a page that I could tag.
When I came across this page, which is embedded below, I decided that it was perfect
for my purposes. I wanted a page with a few different entries, so that I would have some
variety.

![Journal Page 10](https://iiif-cloud.princeton.edu/iiif/2/4e%2Fde%2F53%2F4ede5376dcc5461f9d9e4f4367fe19e9%2Fintermediate_file/full/1000,/0/default.jpg){:width="500px"}

(via Princeton University Library Special Collections, Western Americana
Collection: "Journal," Identifier:ark:/88435/qr46r491g)

When creating my TEI hierarchy, I knew that I wanted to tag location names and
distances traveled because these details are especially relevant to the topics of
westward travel and emigration in the 19th-century United States. I also wanted to
tag geography; land marks and physical features of the terrain that Thomas Adams
might not provide names for, but that one might be able to decipher in the context
of the named places he describes. Since my primary focus was making the data useful for researchers curious
about the conditions of travel westward during this period, I also chose to tag food, weather, and tools,
since these are all things about the journey that a researcher may want to know,
since they reveal information about the wealth of the travelers and the general
conditions of their journey. There were also two words I was unsure of, so I
noted that in my TEI so that researchers could examine those more closely in order
to come to their own conclusions. Thomas Adams also defined a term, so I chose
to tag that as well, since he does that many times throughout the journal, so if
I chose to tag more of the source in the future, it would be a good thing to have
in my hierarchy.

Since my source is a journal page, I wanted to make sure that the paragraph and
section divisions I used reflected that textual structure, so I created paragraph
and division breaks in accordance with where they occur in the journal.
One of the more difficult things about this assignment was making sure that all
of my elements were in the proper order; I had to do a good bit of tweaking at
the end to make sure divisions came before paragraph breaks.

I'm also glad I chose these entries because I think that the first one in particular
is rather funny. They showcase the character of the author as well as providing
information to researchers. As our class approaches the end of the semester, I also
think this particular section was a good choice as preparation for the final project.
I know that I definitely want to use this source to create a digital tool, and
doing this work not only helped me learn a new skill, but also allowed me to become
more familiar with the handwriting of Thomas Adams (save those two pesky words which
I could not make out). I hope that the code has the potential to be useful as I intended
it to be. See you in the next post!

### The Code

```
<journal>
	<image url= "https://iiif-cloud.princeton.edu/iiif/2/4e%2Fde%2F53%2F4ede5376dcc5461f9d9e4f4367fe19e9%2Fintermediate_file/full/1000,/0/default.jpg"></image>
	<div>
		<p>
			<head>
				<date when= "Sunday 1853-06-05">June 5th Sunday</date>.
			</head>	The <time>morning</time> was <weather>clear</weather>;
      but <weather>rain with thunder</weather> after our frugal dinner of
      <food>hard bread, pork, and, alas; that it should be so! a pot of very badly burnt beans</food>.
      The grass is good, and the day’s rest will do our animals good, altho’
      the sand flies and mosquitoes are very troublesome to the mules, we help
      them all we can by greasing with pork fat the more <unclear>xxx</unclear>
      and tender <unclear>xxx</unclear>.
</p>
	</div>

<div>
		<p>
	<head>
				<date when= "Monday 1853-06-06">6th Monday</date>.
	</head>		Harnessed up early + having made, per <tool>odometer</tool>,
      <distance>twenty three miles</distance>, are encamped on the border of a
      <place><geography>small lake</geography></place>, a <distance>short distance from The Trail</distance>,
      in a <geography>small grove of scrub oak</geography>, called an
      <term>Oak Opening</term>. A lazy portion of the march was over
    <place><geography>open and rolling prairies</geography></place>.

		</p>
	</div>
	<div>
		<p>
			<head>
				<date when= "Tuesday 1853-06-07">7th Tuesday</date>.
			</head>		Arrived <time>Early in the afternoon</time> at the
      <place><name type="location">“Sauk Rapids”</name></place>, having during our whole march from
      <place><name type="location">St. Paul</name></place>, followed the general Course ofthe
      <place><name type="river">Mississippi</name></place>. Camped a <distance>short distance</distance>
      above <name type="location">The house of <name type="person">Mr. Russel</name></name>,
      who lives here, at the point where we will cross The River and leave civilization behind us.
      The river <place><geography>here is about 800 ft. across and sufficiently deep</geography></place>,
      even at the present low stage of water, to swim the horses nearly all the over.
		</p>
		<p> Moreover being within the portion called <name type="location">“Sauk Rapids”</name> the current is somewhat swift.
</p>
	</div>
</journal>

```

_The title of this post is derived from the content of the journal entry and
this [2016 viral video](https://www.youtube.com/watch?v=vbcc8x7j1Lg)._
