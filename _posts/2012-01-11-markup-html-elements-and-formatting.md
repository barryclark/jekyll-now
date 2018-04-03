---
layout: post
title: "Markup: HTML Elements and Formatting"
sub_title: "The common elements"
categories:
  - Markup
elements:
  - content
  - css
  - formatting
  - html
  - markup
last_modified_at: 2017-03-09T10:55:59-05:00
---

A variety of common HTML elements to demonstrate the theme's stylesheet and verify they have been styled appropriately.

# Header one

## Header two

### Header three

#### Header four

##### Header five

###### Header six

## Blockquotes

Single line blockquote:

> Stay hungry. Stay foolish.

Multi line blockquote with a cite reference:

> People think focus means saying yes to the thing you've got to focus on. But that's not what it means at all. It means saying no to the hundred other good ideas that there are. You have to pick carefully. I'm actually as proud of the things we haven't done as the things I have done. Innovation is saying no to 1,000 things.

<cite>Steve Jobs</cite> --- Apple Worldwide Developers' Conference, 1997
{: .small}

## Tables

| Employee         | Salary |                                                              |
| --------         | ------ | ------------------------------------------------------------ |
| [John Doe](#)    | $1     | Because that's all Steve Jobs needed for a salary.           |
| [Jane Doe](#)    | $100K  | For all the blogging she does.                               |
| [Fred Bloggs](#) | $100M  | Pictures are worth a thousand words, right? So Jane × 1,000. |
| [Jane Bloggs](#) | $100B  | With hair like that?! Enough said.                           |

| Header1 | Header2 | Header3 |
|:--------|:-------:|--------:|
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|-----------------------------|
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|=============================|
| Foot1   | Foot2   | Foot3   |

## Definition Lists

Definition List Title
: Definition list division.

Startup
: A startup company or startup is a company or temporary organization designed to search for a repeatable and scalable business model.

#dowork
: Coined by Rob Dyrdek and his personal body guard Christopher "Big Black" Boykins, "Do Work" works as a self motivator, to motivating your friends.

Do It Live
: I'll let Bill O'Reilly [explain](https://www.youtube.com/watch?v=O_HyZ5aW76c "We'll Do It Live") this one.

## Unordered Lists (Nested)

  * List item one
      * List item one
          * List item one
          * List item two
          * List item three
          * List item four
      * List item two
      * List item three
      * List item four
  * List item two
  * List item three
  * List item four

## Ordered List (Nested)

  1. List item one
      1. List item one
          1. List item one
          2. List item two
          3. List item three
          4. List item four
      2. List item two
      3. List item three
      4. List item four
  2. List item two
  3. List item three
  4. List item four

## Address element

<address>
  1 Infinite Loop<br /> Cupertino, CA 95014<br /> United States
</address>

## Anchor element (aka. Link)

This is an example of a [link](http://apple.com "Apple").

## Abbreviation element

The abbreviation CSS stands for "Cascading Style Sheets".

*[CSS]: Cascading Style Sheets

## Cite element

"Code is poetry." ---<cite>Automattic</cite>

## Code element

You will learn later on in these tests that `word-wrap: break-word;` will be your best friend.

## Strike element

This element will let you <strike>strikeout text</strike>.

## Emphasize element

The emphasize element should _italicize_ text.

## Insert element

This element should denote <ins>inserted</ins> text.

## Keyboard element

This scarcely known element emulates <kbd>keyboard text</kbd>, which is usually styled like the `<code>` element.

## Preformatted element

This element styles large blocks of code.

<pre>
.post-title {
	margin: 0 0 5px;
	font-weight: bold;
	font-size: 38px;
	line-height: 1.2;
	and here's a line of some really, really, really, really long text, just to see how the PRE element handles it and to find out how it overflows;
}
</pre>

## Quote element

<q>Developers, developers, developers&#8230;</q> &#8211;Steve Ballmer

## Strong element

This element shows **bold text**.

## Subscript element

Getting our science styling on with H<sub>2</sub>O, which should push the "2" down.

## Superscript element

Still sticking with science and Isaac Newton's E = MC<sup>2</sup>, which should lift the 2 up.

## Variable element

This allows you to denote <var>variables</var>.