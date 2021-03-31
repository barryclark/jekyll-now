---
layout: post
author: José Pablo Fernández García
excerpt_separator: <!--more-->
title: Michelle Obama in *The Daily Princetonian*
---
The Princeton University Library's [Papers of Princeton](https://papersofprinceton.princeton.edu/princetonperiodicals/?) collection offers a rich trove of multiple historic publications from Princeton — both the town and the university. A dive into this collection allows one to reconstruct life in Princeton as far back as the mid 1800s through records detailing everything from the biggest events of the day to the most mundane. In fact, the collection's comprehensive nature even allows one to construct partial narratives of individual students' lives in some cases. And in the case of famous alumni, this collection often contains a second story, not of a student's life as much as of a student's accomplishments and legacy.

Take, for example, Michelle Obama<!--more-->(née Robinson), a member of Princeton's Class of 1985. During her time as a student, *The Daily Princetonian* only recorded her presence at the university a handful of times, mostly for her work with the Third World Center (today the Carl A. Fields Center) as a member of its Governance Board. The paper, however, also captures Obama walking the runway for a charity event in one more article. Meanwhile, after Obama's national profile began to rise with her husband's political career, *The Daily Princetonian*'s coverage became far more prolific, reporting on everything from a high school graduation speech she gave to the "lukewarm" relationship she has had with the university since graduating.

### The Purpose of Encoding  ###
Below is just one of these articles that has been encoded with XML as if it were one part of a larger collection of articles from *The Daily Princetonian* that has been encoded for a project examining students' lives at the university and how they are remembered at the university well past their graduation. With this in mind, the encoding schema does two main things.

#### A Newspaper's Physical Characteristics ####
First, it encodes the article with information about its position and appearance within an issue of the newspaper. This would help a researcher understand what type of content is being recorded. In this case, the content is a front page article reporting on a campus event. The newspaper, however, is also filled with opinion articles, advertisements, and campus announcements among numerous other types of content. These types of content are important to distinguish because they carry significantly different perspectives on campus events. An advertisement for the fashion show described in this article would contain very different information; it might've not even included the reference to Obama, for example.

Furthermore, an article's position and appearance within an issue can convey some meaning as well since placement on the front page across multiple columns and with a border delineating it may denote some greater importance to the text — at least in the eyes of the newspaper's editors — than if it had been limited to a single column deep into the issue. As such, the article below is encoded with tags for such things like the page it is on (`<page>`), the columns on the page it takes up (`<column>`), a number denoting its ordered place in a column (`<item>`), and a handful of stylistic markers (`<border>`, `<headline>`, `<byline>`, `<header>`, and `<mediacredit>` for example). Again, these tags organize the text in such a way that it both records how it appears on the newspaper page and conveys its purpose and function in the newspaper.

#### The Information Newspapers Contain ####
Second, the schema used below encodes the article with tags denoting people's names and of places on the university campus (`<name>`, `<organization>`, and `<place>`). The usefulness of these tags is not as obvious in just one article as it would be across a corpus of multiple issues of *The Daily Princetonian* with all their content encoded. However, these tags would be what allows for analyzing student life at the university.

Name tags could at first be used to find all references to an individual student before going on to identify networks of students based on references in the same article as another student or as campus organizations. Such tags could also reveal clusters of campus life by highlighting what types of things are reported to have happened at various places on the campus. Furthermore, this category of tags could be expanded to include tags for administrative units like the Office of the Dean of the College or academic departments, just to name a few examples.

### Structuring The Text's Hierarchy ###
The trickiest questions that emerged in developing this schema were related to the text's structure. Of course, in terms of content, the text forms one unit: a news article. However, in terms of its actual physical structure, the article is split into two, with the majority of the text plus the photo being on the first page of the issue and a final portion of the text on the issue's third page. This is fairly unsurprising due to newspapers' practice of splitting articles in order to fit as much as possible into the limited printing space. Still, it poses challenges in how to encode an article: should the text be split up into two separate units and grouped by page, emphasizing its physical separation, or should it be kept together, emphasizing the content?

The schema used below adopted the latter hierarchy, treating the article as one overall unit while relegating the tags denoting the text's physical structure to within the individual article unit. This approach was taken in order to prioritize the content as the primary unit since the schema was designed with the aim of examining student life - which comes across more in the content than in the physical form — and not the characteristics of the newspaper. Thus, a larger collection of encoded texts from *The Daily Princetonian* would be organized like a collection of articles under this schema instead of like a collection of print materials (though the articles could be organized by issue for organization's sake).

### Multi-Part Pieces of Information ###
Another question that emerged throughout the process of encoding the text was how to treat pieces of information with multiple parts like names and quotes. For names, *The Daily Princetonian*'s practice of listing class year following the name of any student or alumni mentioned presented the option of ignoring the class year and just tagging the name or of linking the name with the class year. The schema used below took the latter approach since class year is a fairly significant factor in the experience of a Princeton student and is also a useful piece of information for the potential analysis of networks at the university.

Thus, any name followed by a class year was tagged with `<student>` as a container for two more tags: `<name>` and `<class>`, the latter having the precise class year as an attribute. Similarly, quotes have multiple parts: the speaker, the actual quoted remark, and often some additional text that helps make sense of the quoted remark. Thus, all these components were tagged with `<quote>` which then contained `<quoataion>` for the actual quoted remarks and `<quoted>` for the speaker. Developing such a tagging system for names and quotes preserved their distinct parts as separate pieces of information while also preserving the relationship between these pieces of information. A class year without a student and a speaker without their quoted remark aren't very helpful.

### The Encoded Text ###
What follows is the encoded text for the article "Fashion show benefits Ethiopian relief fund" in the February 26, 1985 [issue](https://papersofprinceton.princeton.edu/princetonperiodicals/?a=d&d=Princetonian19850226-01.1.1) of *The Daily Princetonian*.
```XML
<div type="news article">
  <page num="1">
    <column num="1-2"><item num="2"><border>
      <headline>
        <italics>Fashion show benefits Ethiopian relief fund</italics>
      </headline>

      <centered>
        <byline>By
          <name>NADA ABDELMONEIM</name>
        </byline>
      </centered>

      <column num="1">
        <p>Elegant evening wear and stunning outfits appear completely unrelated to the fate of the starving people of Ethiopia, but
          <student>
            <name>Karen Jackson</name>
            <class year="1986">'86</class>
          </student>,
          <student>
            <name>Yvonne Chu</name>
            <class year="1986">'86</class>
          </student> and
          <student>
            <name>Patricia Cole</name>
            <class year="1986">'86</class>
          </student> found a way to combine the two last Saturday night. The three innovative designers plan to contribute all proceeds from their fashion show in
          <place type="campus hall">Wu Hall</place> to the
          <organization>Ethiopian Relief Fund</organization>.
        </p>

        <p>The show, entitled "Secret Fantasy," presented a dazzling display of a variety of styles, ranging from evening wear in flourescent green and blue satin to original outfits patterned from white terry-cloth. The show attracted a receptive audience of about 150 people who strained to catch a glimpse of each creation.</p>

        <header>Good choice</header>

        <p>
          <lastname>Jackson</lastname> came up with the idea of donating receipts from the show to the Relief Fund.
          <quote continue="1">
            <quotation>"If there is a worthy cause, and this is one of the most worthy, this is the best thing to do,"</quotation>
            <quoted>she</quoted> said, adding that she had combined a possible
          </quote>
        </p>
      </column>

      <column num="2">
        <p cont="true">
          <quote resume="1">career choice with a valuable learning experience.</quote>
        </p>

        <p>For the three women,
          <quotation>"the best thing to do"</quotation> had developed into almost a full-time commitment over the past semester. They began designing last summer, auditioned models before midterm break and sewed the fifty-plus creations themselves. All three expressed satisfaction with the outcome of their efforts,
          <quote>with
            <quoted>
              <lastname>Chu</lastname>
            </quoted> adding that she was
            <quotation>"very relieved"</quotation> that the pressure was off.
          </quote>
        </p>

        <header>Color me beautiful</header>

        <p>Fashions were displayed around seasonal and evening themes — spring, summer, fall / winter and glittery "winelight" attire. While the designers' styles are very different, their creations were all striking and attractive. The designers used a multitude of bright and bold colors to highlight their unique pieces. As diverse as their use of colors, the three incorporated a wide variety of exotic motifs and off-</p>

        <break continue="1">(Continued on page three)</break>
      </column>

      <media>
        <centered>
          <photo>...</photo>
        </centered>
        <mediacredit>
          <name>Danny Shapiro</name> — Princetonian
        </mediacredit>

        <caption>
          <student>
            <name>Michelle Robinson</name>
            <class year="1985">'85</class>
          </student> models one of the outfits displayed Saturday night in a fashion show in
          <place type="campus hall">Wu Hall</place> to aid Ethiopian famine victims.
        </caption>
      </media>

    </border></item></column>
  </page>

  <page num="3">
    <column num="1"><item num="3">
      <headline>Fashion</headline>

      <break resume="1">(Continued from page one)</break>

      <p cont="true">beat styles. They fashioned designs that highlighted African and Chinese motifs, as well as dashing turbans, sashes, slits, and off-the-shoulder and sleeveless dresses. The creations varied in length but the designers seemed to favor the long and streamlined look.</p>

      <header>Stand-outs</header>

      <p>Some of the designs which stood out as highlights of the show included
        <nickname>Trish</nickname>'s dresses of African batiste and her terry-cloth outfits,
        <firstname>Yvonne</firstname>'s dark sleeveless dress dramatized by contrasting sashes and
        <firstname>Karen</firstname>'s romantic organza skirt and lace top combination.
      </p>

      <p>Members of the audience expressed enthusiasm for the students' fashions, and gave the three designers a standing ovation at the end.
        <quote>The presentation
          <quotation>"gathered up a bunch of dynamic personalities, dynamic models — an all-over dynamic show,"</quotation> said
          <quoted>
            <student>
              <name>Eugene Vanhorn</name>
              <class year="1988">'88.</class>
            </student>
          </quoted>
        </quote>
      </p>

      <p>
        <quote>
          <quotation>"I was really surprised at the very unique ideas expressed,"</quotation> added
          <quoted>
            <student>
              <name>Lisa Brooks</name>
              <class year="1988">'88</class>
            </student>
          </quoted>.
        </quote>
      </p>
    </item></column>
  </page>
</div>
```

### Michelle Obama's Photo ###
And for the reader who has made it this far, here is the photo from the encoded article that shows Obama modeling at a charity fashion show during her senior year.

![Michelle Obama Fashion Show](https://github.com/jpgarcia2023/hello-world/blob/main/Princetonian_1985-02-26_v109_n018_0001%20photo.png?raw=true){:width="500px"}

Source: “Daily Princetonian 26 February 1985 — Princeton Periodicals.” Accessed March 26, 2021. [Link](https://papersofprinceton.princeton.edu/princetonperiodicals/?a=d&d=Princetonian19850226-01.2.3&srpos=23&e=------198-en-20--21--txt-txIN-michelle+robinson------.)
