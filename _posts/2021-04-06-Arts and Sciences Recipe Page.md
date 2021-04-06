---
layout: post
author: Levi Blinder
excerpt_separator: <!--more-->
Title: Arts and Sciences Recipe Page
---
[Link to original recipe](https://fromthepage.com/upenn/kislak-center-recipe-books/arts-and-sciences-manuscript-chemistry/display/1185878)

```
<doc>
...
...
...
<div type = "recipe">
  ...
  ...
  ...
  <page>44</page>
  <pageNum>14</pageNum>
  <p>
    it down with a <tl> String </tl> as far as
    the water, then fire the <m> Gun Powder </m>
    with a <tl> hot Tool </tl>, + it will clean the
    well of every noxious vapor.
  </p>
</div>

<red> <dbl> </dbl> </red>

<div type = "recipe">
  <recNum> <red> 16 </red> </recNum>
  <head> <red> To Kill Buggs </red> </head>
  <line> </line>
  <p>
    Mix <m> Oil of Turpentine </m> with
    the <m> <pl> Neopolitan </pl> Ointment </m>, + smear
    the Bedstead, + peel into the <q> ottebes </q>
    where the Buggs are + they will be
    destroyed.
  </p>
</div>

<red> <dbl> </dbl> </red>

<div type = "recipe">
  <recNum> <brown> 17 </brown> </recNum>
  <margin>
    <brown> To <person> <q> Colo le tterine </q>
    of the Artilery
    at <pl> Gibralter </pl> </person>
    <q> [Goent OZEH]</q> </brown>
  </margin>
  <head> <brown> Pigment for Wood </brown> </head>
  <dbl></dbl>
  <p>
    <abr type = "recipe"> Rx </abr> <m> Pitch <qt> 10 tt </qt> </m> + <m> Tar <qt> tty </qt> </m> as much
    <margin>
      <m> Rosen <qt> tty+ </qt> </m>
      <m> <qt> 1 Quart </qt> <q> Fabuin </q> Oil </m>
    </margin>
    <m> Grease or oil </m> as will give it the
    Consistence of Paint, melt these together
  </p>
  <page> 44 </page>
  ...
  ...
  ...
</div>
...
...
...
</doc>
```
<!--more-->
### What aspects of the document do I want to tag for a researcher?

I wanted to capture aspects of the writing itself -- what role a word or phrase played in the recipe -- but also aspects of the physical  presentation of the text.

The physical aspects that stood out to me were:
* The use of various colors in different parts of the text
* Lines and double lines used to segment the text
* The presence of possibly illegible or unintelligible words/phrases
* Writing that appears in the margins

For the most part, I don't have a clear idea about what a researcher would do with these tags, but they were the physical features that struck me looking when looking at the document. I imagine that a researcher who isn't using the image of the document might need these tags to understand its layout and points of emphasis.

I also do have a few vague ideas about how these could be used:
* First, it seems possible that a researcher may only be interested in how a writer/reader used margin notes, in which case tagging these margin notes would allow the researcher to easily compile those notes.
* Second, a researcher may be looking for phrases or words that are now obsolete and unrecognizable, in which case they might want to look through the words/phrases marked as illegible/unintelligible.  

Some aspects of the writing that I wanted to capture were typical generally useful features such as words that correspond to a person's name or a place.

Other aspects were specific to the list-of-recipes format of the text. These tags were primarily considered based on their use for someone who might try to recreate the recipe (such as in the fake coral creation experiment we saw in class). Similar to the items that were tagged in  the recipe we went over in class, the aspects that I wanted to tag for this reason were
* quantities
* materials
* tools

Lastly, I wanted to capture the organizational layout of the document, tagging paragraphs, recipes, and page breaks.

### How can I categorize this document? What markup codes will be useful?

To categorize this document, I needed to tag the aspects of the document as described above.

The tags I used are:
* organizational tags:
  * \<p> *paragraph* \</p> to enclose paragraphs
  * \<div type = "recipe"> *recipe* \</div> to enclose entire recipes
  * \<page> *pageNum* \</page> to indicate a page break/ new page
  * \<doc> *document* \<doc> root tag to enclose the entire document


* physical tags:
  * \<margin> *marginText* \</margin> to indicate writing in the (left) margin
  * \<red> *redText* \</red> to indicate writing in red ink
  * \<brown> *brownText* \</brown> to indicate writing in brown ink
  * \<q> *questionableText* \</q> to indicate possibly illegible or unintelligible words/phrases
  * \<line> \</line> to indicate a single line across the page
  * \<dbl> \</dbl> to indicate a double line across the page
  * \<head> *heading* \</head> to indicate writing that appears as a heading. All such writing (aside from recipe numbers, which were considered an exception not included in the heading tags) was actually a recipe title, so I decided to not make an additional title tag since this tag serves this. If I was to go through more of the text and find instances where heading text isn't a recipe title, I would create an additional recipe title tag which I would consider a document-specific writing tag.

* writing tags:
  * generic tags:
    * \<abr type = *full word*> *abbreviation* \</abr> used to indicate an abbreviation for a longer full word.
    * \<pl> *place* \</pl> used to indicate a word representing a place name
    * \<person> *person name* \</person> used to indicate a word/phrase representing a person's name and/or title
  * recipe specific tags:
    * \<qt> *quantity* \</qt> to indicate a word/phrase representing a quantity of material in the recipe
    * \<m> *material* \</m> to indicate a word/phrase representing a material used in the recipe
    * \<tl> *tool* \</tl> to indicate a tool used in the recipe
  * document specific tags:
    * \<recNum> *recipeNum* \<recNum> to indicate that a number was the number of the recipe in the list (these numbers were marked on the document by the author)
    * \<pageNum> *pageNum* \<pageNum> to indicate a physically marked page number. Note that these numbers don't line up with the page in the online manuscript due to blank pages and front matter at the beginning. For that reason and just to let researchers know that the author did in fact put page numbers, I felt that putting this tag in addition to the page tag was worth it.

### What textual structure seems appropriate? Consider the hierarchy of your tags.

On a broad organizational level, the document was separated as a recipe list, with a number, title, and (sometimes) multiple paragraphs of writing in each recipe. In addition, there were page numbers and breaks that frequently appeared in the middle of recipes (but not paragraphs, since that doesn't really make sense).

To account for this organization, I broadly formatted my text with paragraph tags, page tags, recipe number tags, and heading tags nested directly inside div tags (with type = "recipe"). Margin text occasionally appeared alongside title content outside of paragraphs, so there are margin tags nested directly inside div tags as well. Also, some lines or double lines appear between titles and paragraphs, so these tags are also nested directly inside div tags. (double lines also appear outside of recipes, so these are the only tag put outside of div tags).

In terms of finer textual structure, there was some tension about  hierarchy when physical aspects of the texts. For example, there were chunks of text including headings/titles, recipe numbers, lines, and margin writing that were all a different ink color (red or brown instead of black). In these cases, I chose to put color tags as the children of other writing or physical tags (aside from the line or double line tags since these are marks themselves rather than indicators of a physical property of enclosed writing).

The finest textual elements were writing aspects which (aside from the 2 document-specific tags) could be reasonably marked as the child of any non-writing aspect tag since they were small in size and clearly contained within other tags. For example, material tags such as that for Oil of Turpentine clearly should be the child of broader tags such as those for paragraphs. Hierarchy between these writing tags was also easily decided by size; for Neopolitan Ointment, for example, the Neopolitan place descriptor is contained within the material tag for Neopolitan Ointment as a whole.  

### What questions about markup emerged throughout the process?

I primarily ran into a lot of hierarchy and how-much-to-tag, but these aren't really questions about markup so much as personal preference and typical practice.

One question I did have was about the use of "type = ____" in the beginning of tags. I only found it used for the div and language tags  in sample code. It can't be that this feature only usable for specific tags, so is this just a coincidence or is it a broader phenomenon that typing tags is uncommon and used only in a few specific cases. What are some other examples of good uses of this type parameter? I experimented in my own code by adding a type parameter to abbreviation tags to store the full word but I'm not sure if this is a reasonable use.
