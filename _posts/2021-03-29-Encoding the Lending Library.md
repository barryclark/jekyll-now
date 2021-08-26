---
layout: post
author: Sophie Goldman
excerpt_separator: <!--more-->
title: Encoding the Lending Library
---

### Motivation and Background
For this digital tools assignment, I was interested in encoding a document that contained informational data, such as records or lists. I also hoped to find a source that contained many attributes within one record. While searching the Princeton University Library collections for potential documents, I came across the [Sylvia Beach Papers](https://findingaids.princeton.edu/catalog/C0108) and the accompanying [Shakespeare and Company Project](https://shakespeareandco.princeton.edu/) by Princeton's Center for Digital Humanities.  Sylvia Beach (1887 - 1962) owned and ran the Shakespeare and Company bookstore and lending library in Paris, France, serving members of European and American literary communities from 1919 to 1941. The Shakespeare and Company Project maintains a database of the books, members, and documents related to the library, using materials sourced from the Sylvia Beach collections. I was drawn to the lending library cards, which were used to document each library member's borrowed materials. These cards contained many of the attributes I was hoping to tag, including names, addresses, book titles, and dates. Additionally, the layout of the cards led me to consider interesting questions on how to encode their contents using XML.

<!--more-->

### Ellen Wright
Through the Shakespeare and Company Project website, I selected the collection of [all cards associated with Ellen Wright](https://shakespeareandco.princeton.edu/members/wright-ellen/cards/0d89fdbb-a48a-4bfa-8690-c53234d02331/), an American living in Paris with her husband, the acclaimed African American author Richard Wright. There are two cards associated with Wright, pictured below:

![Front of Card 1](https://iiif.princeton.edu/loris/figgy_prod/13%2Fe8%2F39%2F13e839f94ac344f7bc0a5793c5c4df80%2Fintermediate_file.jp2/full/450,/0/default.jpg)

![Front of Card 2](https://iiif.princeton.edu/loris/figgy_prod/93%2Fdd%2F4d%2F93dd4d3a5fa048ed8e88685bd2df1e0c%2Fintermediate_file.jp2/full/450,/0/default.jpg)

###### Image Credits: [Wright, Ellen; Sylvia Beach Papers, C0108, Manuscripts Division, Department of Special Collections, Princeton University Library](https://findingaids.princeton.edu/catalog/C0108_c3762)

Though there is overlap between the information on the two cards, I chose to encode them both. I did not encode the backs of the cards, as the first card is blank on the reverse, and the other side of second card is an advertisement from the Princeton Bank and Trust Company.

### Important Elements
When encoding these cards, I began by identifying the key items that formed the basis of the borrowing records: the borrow date, the book title, and the return date. I also encoded the heading on the top of each card, which contained the library member's name and home address. Another key aspect of these cards were the other library members mentioned, many of whom were accomplished authors themselves, such as Richard Wright and Gertrude Stein. Finally, I noted that the handwritten text on each card changed color multiple times, a result of the process by which the card was updated over the span of months each time Wright borrowed or returned books. Though the particular colors used may not have much significance, they provide evidence for the ways the card changed over time. By capturing the key information about an individual's borrowing habits in this encoded form, it is possible to analyze this data more effectively and systematically compare Wright's records with those of other library members.

I used the transcriptions of book titles and dates on the Shakespeare and Company Project database to confirm my reading of the cards. However, as I wanted to encode the card in full, I also had to parse the notes and other markings on each card.

### The XML Encoding

```xml
<div type='all-lending-library-cards'>
	<div type="lending-library-card">
		<side type="front">
			<heading>
				<text color="blue">
					<member-name>Mrs Richard WRIGHT</member-name>
					<address>14 rue M. le Prince, Paris VI</address>
				</text>
			</heading>
			<borrowing-record>
				<text color="blue">
					<date-start>Sept 19 1949</date-start>
					<title>The Pasquier Chronicles</title>
					<date-end>Oct 26</date-end>
					<title>Christine</title>
					<date-end>Oct 26</date-end>
					<title>Lafcadio's Adventures</title>
					<date-end>Oct 26</date-end>
					<date-start>Oct 26</date-start>
					<title>The Gambler</title>
					<date-end>Dec 10</date-end>
					<title>Walter Rathenau his life and work by
						<author>Count Harry Kessler</author>
						<publication-info>(
							<publisher>Gerald Howe Ltd</publisher>
							<address>23 Soho Square London</address>
							<year>1929</year>
							)
						</publication-info>
					</title>
					<note>O.P. to send to
						<member-name>Richard Wright</member-name>
					</note>
				</text>
				<text color='black'>
					<note>returned			
						<date-end>June 1952</date-end>
						By
						<member-name>R. W.</member-name>
					</note>
				</text>
				<text color="blue">
					<date-start>Dec 13</date-start>
					<title>Middle of the Journey</title>
					<date-end>Dec 19</date-end>
					<note>
						<circled>
							<member-name>Ellen Wright</member-name>
							<unclear>pg 81 to SB</unclear>
						</circled>
					</note>
					<title>Heidegger</title>
					<date-start>Dec 19</date-start>
					<title>Party Going</title>
				</text>
				<text color='light-blue'>
					<date-end>Jan 9</date-end>
				</text>
				<text color='blue'>
					<title>Goodbye to all that</title>
				</text>
				<text color='light-blue'>
					<date-end>Jan 9</date-end>
					<date-start>Jan 9</date-start>
				</text>
				<text color='black'>
					<unclear>19--</unclear>
				</text>
				<text color='light-blue'>
					<title>Little Women - Little Women Married</title>
				</text>
				<text color='blue'>
					<date-end>Feb 4</date-end>
				</text>
				<text color='light-blue'>
					<title>Mr Norris Changes Trains</title>
				</text>
				<text color='blue'>
					<date-end>Feb 4</date-end>
				</text>
				<text color='black'>
					<date-start>Nov 3 1946</date-start>
					<title>A Serial Universe</title>
					<note>returned</note>
					<note>(Composition
						<member-name>Gertrude Stein</member-name>
						. gave copy to
						<member-name>R W</member-name>)
					</note>
					<date-start>June 20 1946</date-start>
					<title>The Negro in our History</title>
					<title>Proletarian Literature</title>
				</text>
			</borrowing-record>
		</side>
		<side type="reverse"></side>
	</div>
	<div type="lending-library-card">
		<side type="front">
			<heading>
				<text color="purple">
					<member-name>Ellen Wright</member-name>
				</text>
				<text color="black">
					<address>14 rue M. le Prince</address>
				</text>
			</heading>
			<borrowing-record>
				<text color="purple">
					<date-start>Sept 19 1949</date-start>
					<title>The Pasquier Chronicles</title>
				</text>
				<text color="blue">
					<date-end>Oct 26</date-end>
				</text>
				<text color="purple">
					<strikethrough>
						<title>The Close</title>
					</strikethrough>
					<title>Christine</title>
				</text>
				<text color="blue">
					<date-end>Oct 26 1949</date-end>
				</text>
				<text color="purple">
					<title>Lafcadio's Adventures</title>
				</text>
				<text color="blue">
					<date-end>Oct 26 1949</date-end>
					<date-start>Oct 26 1949</date-start>
					<title>The Gambler</title>
					<date-start>Oct 26</date-start>
					<title>Walter Rathenau his life &amp; work by

						<author>Count Harry Kessler</author>
						<publication-info>
							<publisher>Gerald Howe Ltd</publisher>
							<address>23 Soho Square London</address>
							<year>1929</year>
						</publication-info>
					</title>
				</text>
				<text color="faded-blue">
					<note>
						<unclear>Also wants
							<author>Christina</author>
						</unclear>
						&amp;
						<author>Morand's</author>
						Books
					</note>
				</text>
			</borrowing-record>
		</side>
		<side type="reverse"/>
	</div>
</div>
```

### Organizing Information: Categories and Hierarchy
In order to categorize the information, I created a root tag that nested the separate cards. Within a div element for each card, I separated the encoding further with a `<heading>` element and a `<borrowing-record>` element. This first element contains Wright's name/address, while the second contains the remaining information on the card, including specific borrowed books and notes.

The first question I encountered was how to encode the dates listed on the cards. While I considered creating an element for each book which would include the borrowing date, data on the book itself, and the return date, many of the books were listed under one borrow date, and it did not feel accurate to repeatedly include the same date if it was not written on the original document. I also considered nesting the information about a book inside the tags related to its borrow date, but chose not to as borrow/return dates were not consistently available for all entries.

This question led me to nest each section of text by color in an element `<text>`, which has an associated attribute to note the color of the text, which implicitly carries information on when a given entry or set of entries was made. Within this element, I included `<date-start>` and `<date-end>` elements to differentiate between the borrow and return dates for each book. This allowed each date to exist as an individual element, rather than being explicitly connected to a particular title. I also included elements for the book's title, author, and publication information when provided. When text was circled, crossed out, or unclear, I added elements to reflect these aspects of the text.

Finally, I tagged individuals mentioned within the entries and notes on the cards. In some cases, where an individual was referred to in relation to their own work, I chose to use the `<author>` tag. When the note referred to the behavior or actions of a given individual, I checked if they were also members of Shakespeare and Company and tagged them using `<member-name>`, the same tag used in the heading to identify Wright.

### Questions and Challenges

The main challenge I encountered was determining how to translate the clear visual layout of the card to a text-based list of elements. For example, a human reader can distinguish which borrow and return dates are associated with each book by observing how the dates in the left and right margins align with the book titles in the center column of the card. However, in a list format, it is more difficult to describe the alignment of different elements. I chose to enter the text as I read it from left to right, entering each item as a separate element. In making this decision, I chose to focus my encoding on the content of the card itself, rather than its exact layout.  

The other aspect of the card that inspired questions were the various names mentioned. Some, such as Richard Wright's name, were clear, but others, such as "Christina" required additional searches for potential contemporaneous literary figures. In the case of "Christina," I am guessing that the reference is to Australian author Christina Stead, whose name appears in the Shakespeare and Company Project database. In other cases, references to individuals by their initials, such as "O.P.", were not tagged as a name as it was not possible to identify the individual being referenced.

Along with questions about markup, I had a number of questions about the contents of the documents themselves. Why might information on books borrowed in 1946 be located at the bottom of a card which first has dates from 1949? What was the purpose of the two cards, which almost entirely overlap? Why do the two cards refer to Wright by different names? Though I cannot answer these questions, by exploring these cards through the encoding process, I was able to immerse myself in the documents and their construction, gaining an understanding of the sources themselves and the considerations involved in encoding them for research purposes.

### References
“Lending Library Cards for Ellen Wright.” *Shakespeare and Company Project*, version 1.4.1. Center for Digital Humanities, Princeton University. [https://shakespeareandco.princeton.edu/members/wright-ellen/cards/](https://shakespeareandco.princeton.edu/members/wright-ellen/cards/). Accessed March 25, 2021.

Quintana, Maria. “Richard Wright (1908-1960)” January 21, 2007. [https://www.blackpast.org/african-american-history/wright-richard-1908-1960/](https://www.blackpast.org/african-american-history/wright-richard-1908-1960/). Accessed March 25, 2021.

_Shakespeare and Company Project_, version 1.4.1. Center for Digital Humanities, Princeton University, 2021. [https://shakespeareandco.princeton.edu](https://shakespeareandco.princeton.edu/). Accessed March 25, 2021.

“Sylvia Beach Papers | Princeton University Library Special Collections.” [https://library.princeton.edu/special-collections/collections/sylvia-beach-papers](https://library.princeton.edu/special-collections/collections/sylvia-beach-papers). Accessed March 25, 2021.
