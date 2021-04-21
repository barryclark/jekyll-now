---
layout: post
author: Sophie Goldman
excerpt_separator: <!--more-->
title: Networked Dystopia: Exploring Setting in Dystopian Film
---

### What is the role of setting in dystopian movies?

When considering movie genres for this assignment, I became curious about the patterns and trends in the settings of dystopian movies. In particular, I wanted to examine what types of settings were commonly seen in these types of movies and whether these settings reflected a real-world location. Often, dystopian movies reflect elements of human society and offer a criticism, warning, or other message about the future of life on Earth. Since these messages can explore threatening and alarming topics, I anticipated that dystopian movies would employ fictional locations to served as representations of life on Earth, rather than realistically establishing the movie in a particular location. However, I found that many of the movies that I analyzed take place in an explicitly familiar setting - whether on Earth, a particular country, or one city, these movies locate themselves in the audience's world.

<!--more-->

### The Data
I used [IMBD's list of feature films labeled with the keyword "dystopian,"](https://www.imdb.com/search/keyword/?keywords=dystopia&pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=bdc91cb7-0144-4906-b072-b45760c8aa67&pf_rd_r=87SV6VT6763RFZYAG8HZ&pf_rd_s=right-1&pf_rd_t=15051&pf_rd_i=genre&ref_=kw_nxt&mode=detail&page=1&title_type=movie&sort=moviemeter,asc) and analyzed the top 100 movies in the list sorted by popularity. While going through this list, I eliminated movies that did not fully embody the themes of dystopia, including fantasy movies and a documentary, as well as those whose locations were not easily classifiiable, for a total of 94 movies. Since all data for this project was based on a selection of only 94 movies, there may be trends that are not well represented by this data. 

### Labeling the Data
I used plot summaries found on IMDB, Wikipedia, and fan websites to classify each movie by its setting. Multiple settings were applied to one movie if more than one setting was highly relevant to the plot. This was primarily applied for movies that took place both on Earth and in outer space. In most cases, only the movie's primary setting was used.

Through this process, I began to realize the surprising complexity of my question. Some movies, especially those that took place in space alone, were relatively straightforward to classify. Others, however, became much harder, as I found that two movies set in the same physical location might have entirely different *settings* when considering the impact of the movie's plot and time period. This led me to create multiple classification categories that separated movies between those describing an alternate past, the present, and the future. I chose to distinguish the future separately from the present as a distant future often exhibits different visual and societal features than the audience's more familiar modern setting, even if the name of the setting has not changed. I also chose to separate the setting classifications into global, national, and city-specific levels in order to see if particular locations were more commonly used as dystopian settings. I only included edges at the most specific levels, such that I only included an edge between the film and its city, and not the city's country, in cases where a specific city was identifiable as a setting.

[The spreadsheet of movies and their settings can be found here.](https://docs.google.com/spreadsheets/d/1aJKW8D20lYVDX--59RklBFRlqNi0tgz_dzQ4i5_sINY/edit?usp=sharing)

#### Below is the dictionary containing the labels for the settings and a description of what criteria were used to assign that setting to a given movie:

| Setting Label      | Description |
| ----------- | ----------- |
| Earth      | A movie primarily set on Earth (as opposed to a particular country), in the present or near future (within 20 years of the movie's release) with the implication that this Earth is equivalent to the audience's Earth prior to the events of the film/the film's universe.        |
| United States   | A movie primarily set in the United States (unspecified/unnamed location or multiple locations), with the implication that this United States is equivalent to the audience's United States.        |
| Alternate United States |A movie set in the United States where historical events are in some way manipulated, changed, or impacted prior to or during the plot of the movie. |
| Alternate Earth |A movie set on Earth where historical events are in some way manipulated, changed, or impacted prior to or during the plot of the movie. |
| Future United States|A movie set in multiple locations in the United States, at least 20 years in the future relative to the movie's release. This label also includes movies in which the United States no longer exists but is referenced in the movie's plot and set on the North American continent. |
| Future Earth|A movie set on Earth, at least 20 years in the future relative to the movie's release.  |
| Virtual| A movie set in a simulation or virtual reality universe (this label is used even if a physical location is also specified in the movie)|
| Unspecified|  A fictional or otherwise non-traceable location. |
| Fictional (Representative)| A movie set in a fictionalized location with some implicit references to recognizable traits of locations on the audience's Earth.|
| Space| A movie set in outer space or on other planets. |

 *Note 1: Movies labeled with specific city names are primarily set in that city, with the implication that the city is equivalent to the city in the audience's Earth. Other labels that follow similar formatting to those in the table are named using the same logic, with the only difference being the name of the place itself.*
 
 *Note 2: The cutoff of 20 years for a movie to be considered "in the future" was made arbitrarily, but can be seen as being roughly equivalent to the length of a generation.*
 
### Visualizing the Network

Below are images of the full network and zoomed-in images of the network:

![Full Network](https://github.com/sophiegoldman/images/blob/main/fullgraph.png?raw=true)
![Earth, Space, and Future US Subgroup](https://github.com/sophiegoldman/images/blob/main/earth-space-futureus.png?raw=true) 
<img  width = "400" src="https://github.com/sophiegoldman/images/blob/main/future-locations.png?raw=true"> 
<img  width ="400"  src="https://github.com/sophiegoldman/images/blob/main/modern-locations.png?raw=true"> 
<img  width = "400" src="https://github.com/sophiegoldman/images/blob/main/virtual-unspecified.png?raw=true">
<img  width ="400"  src="https://github.com/sophiegoldman/images/blob/main/alternate-fictional.png?raw=true">


This network contains five subgroups, which became apparent to me through the network visualization. I manually sorted the components of this network into these subgroups to support my analysis. The first and largest subgroup contains all movies whose setting is Earth, Future Earth, Space, or Future United States. The other subgroups are as follows, and are shown above in clockwise order starting from the top left:
- Future countries or cities
- Modern day countries or cities
- Depictions of alternate Earth, alternate countries, or fictional locations meant to represent a real-world location
- Unspecified/Virtual settings


### Analyzing the Network

First, I will address the differences between this graph and my expectations. I had predicted that many nodes would be categorized as taking place in a non-existent location. This hypothesis was based on the assumption that the creators of movies with potentially distressing messages might want to distant their audience from the plot through the use of a allegorical setting. However, in the graph, only one node was labeled as "Fictional (Representative)," and 13 nodes take place in unspecified or virtual settings. The subgroup of nodes representing "alternate" settings, or those where the historical timeline of a real-world location differs from our own, was also relatively small and only contained nine movies.

In constrast, the most obvious subgroup, which contains a single connected component, is the one that contains references to Earth (present and future), space, and the United States (future). Of the eight films that take place in space, all but two are also connected to a setting on Earth or in the United States. This component demonstrates the role of a global setting in dystopia. I would consider the edges leading to the "Earth" and "Future Earth" nodes to be most significant in this graph, as they reveal that dystopian films quite often intend to speak to a global audience. Furthermore, these movies do not hide their message behind a fictional or vaguely explained location, but emphasize to the viewer that the film takes place on *their* planet. Similarly, the movies that take place in a "Future United States" speak to a broad audience, especially American viewers, and can inspire direct parallels between the movie's plot and the future of the United States.

Finally, the variety of specific cities referenced in this graph in both the modern and futuristic subgroups reveal the ways in which dystopian movies can intentionally speak to local communities. Though very few movies are contained within each connected component, by reducing the scale of setting to a single city, a movie can connect viewers to a specific real-world location. For example, a movie that focuses on a society set in futuristic Chicago can employ elements of setting familiar to a modern viewer who has visited or lived in the city, drawing them further into the plot. However, since only large cities were singled out as the primary settings in the movies considered here, it is likely that many viewers will be able to relate to the setting without having personal familiarity.

Interestingly, there were five movies that took place in Los Angeles, the most out of any specified city or country (other than Future United States). There were also additional movies in the dataset that I categorized as "Future United States," but were filmed in Los Angeles (such as *In Time*) or had some mention of the city. It is not clear to me why Los Angles plays such a prominent role in dystopian settings compared to other large U.S. cities, but by mapping the network at multiple levels of geography, it is possible to begin exploring these questions.

### A Note on Labeling

While creating this network graph, I was acutely aware of the decision making process invovled in labeling each edge relationship. While reading through plot summaries and movie descriptions, I attempted to label movies based on its most important setting. This labeling leads to a subjective approach, as the "most important" setting can be disputed. It is fully possible that another approach to labeling these movies could result in a different graph. I could have chosen to strictly label movies with real-world settings in cases where that real-world setting's name is used, but as the setting of the movie can be communicated through features such as geography and characters' references, I chose to expand my use of labeling. However, since I relied on plot summaries and short descriptions of movies, it is possible that there are significant cues to a particular location that I did not capture in my labeling. When I could not confidently assign a label, I defaulted to use the label I was most sure of. This may have led to an artifical increase in movies in the "Future United States" category, as it is possible some movies could have been better categorized within a particular city.

### Conclusion

In this networked exploration of dystopian movies and their settings, I have reconsidered my perception of these movies. While initially I imagined many of these movies as taking place in a distant, unfamiliar world meant to represent our own, in this selection of films there is a strong pattern of acknowledging the physical connections between the audience's world and the dystopian world. In doing so, these movies may be able to more effectively communicate their severe and urgent messsages to their audiences. 
