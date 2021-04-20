---
layout: post
author: José Pablo Fernández García
Title: Princeton University's Academic Network
excerpt_separator: <!--more-->
---
For any Princeton University student going through the course selection process, it is very likely that one thought in the back of their head is the distribution requirements they must fulfill during their four years at Princeton. The [Undergraduate Announcement](https://ua.princeton.edu/contents/general-education-requirements) states: "While each student will concentrate in a discipline, a broad exposure to other kinds of knowledge will enhance students’ ability to discern what questions can be answered through methods native to their own fields and what questions require other methods." Therefore, during the 2018–2019 and 2019–2020 [academic years](https://web.archive.org/web/20190315200449/https://ua.princeton.edu/contents/general-education-requirements), students seeking an A.B. degree needed to take a certain number of courses that fell within each of seven distribution areas. While these distribution requirements may take on the shape of a checklist in the minds of students, they also offer a way to compare Princeton's many academic departments and programs. <!--more-->

### The Distribution Requirements ###
Before going any further, it is worth noting that the data used in this project is taken from the [course offerings](https://registrar.princeton.edu/course-offerings) for the 2018–2019 and 2019–2020 academic years because the distribution requirements at Princeton were stable during these years. Since then, the names and definitions of the distribution areas have slightly changed, and an additional "Culture and Difference" distribution requirement was added.

Focusing on the aforementioned academic years, many of the undergraduate courses offered at Princeton fulfilled one of the following distribution requirements and were thus labeled in the course offerings with the code in parentheses.
* Epistemology and Cognition (EC)
* Ethical Thought and Moral Values (EM)
* Historical Analysis (HA)
* Literature and the Arts (LA)
* Quantitative Reasoning (QR)
* Science and Technology (STL/STN)
	* If the course had a lab component, it was labeled STL — otherwise, STN.
* Social Analysis (SA)

However, it is also worth noting that a not-insignificant portion of undergraduate courses fulfilled none of the distribution requirements and therefore were not labeled with one of the above codes. Generally, these courses fell into one of three categories: the mandatory writing seminars, language courses in which practical language instruction is the primary objective, and what could be called studio or practical courses that are focused on doing something (architecture studio design courses, project-based entrepreneurship courses, and private music lessons are some of the courses that would fall in this category).

### Academic Units ###
Separate from the distribution requirement a course fulfills, every single course offered is listed with a course code of sorts that lists at least one academic department or program and the course number assigned by each academic unit, e.g., HUM 331. With this additional bit of information, the course offerings present a correspondence between distribution areas and the university's many academic units. In turn, one could take this information and build a network to represent Princeton's academics as a collection of academic units that are connected through the kinds of knowledge they pursue.

At this point, it is worth noting that many courses at Princeton are cross-listed with multiple academic units and thus have multiple course codes of the "ABC ###" format. For the purpose of the networks below, only the first course code in a course listing was used to determine an edge between a distribution area and an academic unit. This decision was taken for two reasons. First, all courses have at least one course code, but not all courses have more than one course code. Second, the order of the course codes is not arbitrary such as alphabetical. Instead, order of the course code seems to indicate some sort of primacy with the first course code indicating a sort of home academic unit.

### Research Questions ###
With all this preliminary information established as well as some analytical choices already described, it is worth elaborating on the research questions driving this small project before going any further. Encompassing any other questions, there is the desire to understand the intellectual network that is Princeton University. Often, professors have affiliations with more than one academic unit and will teach courses cross-listed beyond their home departments. Additionally, the notion of inter-disciplinary work is often strongly emphasized at Princeton. But how do those connections actually manifest within the university? One way is through the physical grouping of academic units through the Humanities Council, the High Meadows Environmental Institute, or the School of Engineering and Applied Sciences. Still, looking at something like distribution area could organize the university at a much more fundamental level, at the level of the knowledge being pursued. This, of course, then leads to the driving question of the networks below: how are the academic units at Princeton connected and organized by the distribution areas of the courses they offer?

### The Networks ###
Building the networks below required taking a data set that included the course offerings from the relevant semesters and reducing this data set to a straightforward [edge list](https://docs.google.com/spreadsheets/d/e/2PACX-1vTga4ooDjsnkWJUgEcmvaLHmbQhuj3AjmkpNOTS1bP_y591X9Wh8Tq1MoI3M6ElqhRsoyjwm1hiR52N/pubhtml) with distribution areas in one column and the first listed academic unit in the other column. As indicated above, this also required removing a sizable chunk of the overall course offerings due to their not fulfilling a distribution requirement, their being cancelled, and their being graduate level courses.

#### Original Network ####
The edge list was then imported into Cytoscape where it was analyzed before being visualized as below with the "Edge Weighted Spring Embedded Layout" based on "edge betweenness." Within Cytoscape, an additional "type" column was added to the Node Table in order to be able to color the distribution areas green and the academic units blue.

Of course, the first impression of this "Original Network" is not the most useful. Mathematics, with its outsized number of undergraduate courses, dwarfs the entire network since each individual course is represented by an separate edge. This enormous number of edges also generally muddles the network, leaving the connections between distribution areas and academic units very hard to discern. However, this network does offer a basic understanding of the overall shape of the network, isolating the LA distribution area towards the bottom while grouping the QR, STL, and STN distribution areas together, separate from the HA, SA, EC, and EM distribution areas. It also offers some insight into which academic units are similar to each other on the basis of distribution areas.

![Original Network](https://raw.githubusercontent.com/jpgarcia2023/hello-world/main/DTA4-original-cropped.png){:width="900px"}

#### Combined Edges Network ####
In order to increase the usefulness of this network visualization, the edges of the network were simplified by removing all duplicate edges in Cytoscape. However, in doing so, a column was also created in the Edge Table that preserved the number of duplicate edges that had originally existed. Thus, for example, the 219 edges between Mathematics and the QR distribution area were reduced to just one but with the value of 219 in a "NumberOfUnderlyingEdges" column. This then allowed for the width of the edges to vary depending on this new attribute.

At this point, each of the distribution areas was also assigned a color to make the network more easily readable. First, the distribution areas' value in the aforementioned "type" column in the Node Table was revised to be individually specific. Second, a similar "type" column was added to the Edge Table that labeled each edge with the distribution area it connected to one one end.

The result is a much more useful network — a more easily readable network — that makes the network of academic units that much clearer. In part, this is due to the closer zoom level now that the 219 edges leading to Mathematics no longer visually overpowering the network.

![Combined Edges Network](https://raw.githubusercontent.com/jpgarcia2023/hello-world/main/DTA4-bundled3-cropped.png){:width="900px"}

#### Curated Network ####
Still, the above network is not fully readable due to the close proximity of many of the nodes that cause many of the labels to overlap or be fully blocked. Thus, this final network visualization took the one above and separated the nodes by hand so that every detail of it would be more visible. Of course, this version of the network loses the actual shape of the network produced by the "Edge Weighted Spring Embedded Layout" of the network just above, but it reveals some key pieces of information.

For example, the networks above totally hides Environmental Studies under the Freshman Seminars. However, this hand-adjusted network allows for both to be seen, showing that they are the only two academic units listed first for at least one course in all of the distribution areas. It also declutters the dense groupings of academic units throughout the network and especially those in the group just above the LA distribution area.

![Curated Network](https://raw.githubusercontent.com/jpgarcia2023/hello-world/main/DTA4-curated-cropped.png){:width="900px"}

### Final Comments ###
In building this network visualization with Cytoscape, the three distinct groupings of distribution areas were the most intriguing and informative features of the network. It shows that Princeton could be considered as being three separate though still linked academic endeavors: one focused on literature and the arts; one focused on the social sciences, ethics, epistemology; and one focused on STEM. It was also quite revealing to see how academic units were grouped with some solidly between distribution areas and others connected only to one distribution area. There were also some surprises like Visual Arts which one may expect to see only offer courses in the Literature and the Arts distribution area but in fact also offered at least one course in Science and Technology with a lab component.

Overall, these networks offer a different and fairly fascinating window into Princeton's academics.

### Network Legend ###
For ease of reading the networks above, here is a legend detailing the abbreviations for Princeton's academic units during the relevant semesters. In the network, the distribution areas were labeled with the same codes as listed above.

Abbreviation | Academic Unit
-------------|--------------
AAS | African American Studies
AFS | African Studies
AMS | American Studies
ANT | Anthropology
APC | Applied and Computational Math
ARA | Arabic
ARC | Architecture
ART | Art and Archaeology
ASA | Asian American Studies
AST | Astrophysical Sciences
ATL | Atelier
CBE | Chemical and Biological Engineering
CEE | Civil and Environmental Engineering
CGS | Cognitive Science
CHI | Chinese
CHM | Chemistry
CHV | Center for Human Values
CLA | Classics
CLG | Classical Greek
COM | Comparative Literature
COS | Computer Science
CWR | Creative Writing
DAN | Dance
EAS | East Asian Studies
ECO | Economics
ECS | European Cultural Studies
EEB | Ecology and Evolutionary Biology
EGR | Engineering
ELE | Electrical Engineering
ENE | Energy Studies
ENG | English
ENV | Environmental Studies
EPS | Contemporary European Studies
FRE | French
FRS | Freshman Seminars
GEO | Geosciences
GER | German
GHP | Global Health & Health Policy
GSS | Gender and Sexuality Studies
HEB | Hebrew
HIN | Hindi
HIS | History
HLS | Hellenic Studies
HUM | Humanistic Studies
ISC | Integrated Science Curriculum
ITA | Italian
JDS | Judaic Studies
JRN | Journalism
KOR | Korean
LAO | Latino Studies
LAS | Latin American Studies
LAT | Latin
LCA | Lewis Center for the Arts
LIN | Linguistics
MAE | Mechanical and Aerospace Engineering
MAT | Mathematics
MED | Medieval Studies
MOL | Molecular Biology
MPP | Music Performance
MSE | Materials Science and Engineering
MTD | Music Theater
MUS | Music
NES | Near Eastern Studies
NEU | Neuroscience
ORF | Operations Research and Financial Engineering
PER | Persian
PHI | Philosophy
PHY | Physics
POL | Politics
POR | Portuguese
PSY | Psychology
QCB | Quantitative Computational Biology
REL | Religion
RUS | Russian
SAN | Sanskrit
SAS | South Asian Studies
SLA | Slavic Languages and Literature
SML | Statistics & Machine Learning
SOC | Sociology
SPA | Spanish
STC | Science and Technology Council
THR | Theater
TPP | Teacher Preparation
TRA | Translation and Intercultural Communication
TUR | Turkish
URB | Urban Studies
VIS | Visual Arts
WWS | Woodrow Wilson School
