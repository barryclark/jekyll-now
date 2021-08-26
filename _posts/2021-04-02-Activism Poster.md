---
layout: post
author: Amna Amin
excerpt_separator: <!--more-->
title: Activism Poster
---

## Explanation of Thought Process

The document that I am coding is an image used to advertise an event from Muslim Student Activists. This document is interesting and potentially useful to historians that want to note what topics student activists focused on and how they advertised events. Thus, the aspects of the document that I want to preserve for researchers is noting what titles are used, how information is presented (in forms of questions or demands for instance), where and when these events take place, and images used on the poster.

Based on the elements I want to document, I want to note the relative size and importance of different elements of the text. For instance, the title can be noted using markup codes like `<head>`. Additionally, I want to note the group’s hosting so code that includes elements like `<orgName>` were good markup codes to use. Overall, I also used tags like question to indicate that questions were being asked, image for an image being shown, date to show a date was given for the event, and location to indicate the physical space the event was held in.

These tags made me consider how to structure the text and the hierarchy I wanted to present. I decided to make the parent tag called `<poster>` to indicate that all the material within was displayed as a poster meant to advertise to people. The other elements I treated as siblings to each other since they more so denoted changes in relative importance and different parts of the same poster rather than headers or parents. For instance, I used the tags `<head>`, `<subhead>`, and `<subhead1>` to indicate that different parts of the poster were emphasized more than others through font sizes, boldness, etc.  

Some questions that I had about markup while going through this exercise was how to address images within a text. I was not sure if I should just mention that there was an image or offset the image in a tag and then describe what the image was. In general, I was also not sure if the textual structure I used was appropriate and if there was a better one to consider for advertisements and posters.
<!--more-->
## Example Code

 ```XML

<poster>
	<head>The Migrant Crisis</head>

	<image>Large group of refugees on a boat in the ocean</image>

	<subhead><question>What does the word “immigrant” mean?</question><question>How do stereotypes behind the
		word and formation of national boundaries inform who we think of as immigrants?</question></subhead>

	<subhead1><orgName>Kalaam Cafe:</orgName> A discussion group dedicated to talking about relevant issues
		in the world. This week, we will discuss the state
		of immigrants around the world.</subhead1>

	<head><date>Friday, May 1, 7:30 PM</date><location>Murray Dodge Room 22</location></head>

	<subhead1>Sponsored by the<orgName>Muslim Advocates for Social Justice</orgName></subhead1>
</poster>

```

### Citations

 To view the original poster image, visit [Archiving Student Activism at Princeton (ASAP) Collection](/http://arks.princeton.edu/ark:/88435/0v8383311) and navigate to the Muslim Advocates for Social Justice and Individual Dignity page.
