---
layout: post
title: Web scraping using BeautifulSoup in Python!
---

![](https://s-media-cache-ak0.pinimg.com/736x/35/d6/d6/35d6d65a709e9b73f6795c02fbb203d0.jpg)


### Scraping the books published by O'reilly on 'Data'

The first part of any data scraping algorithm is to generate the right url. If we look at the url of the part holding books on data we see a pattern. It is 

http://shop.oreilly.com/category/browse-subjects/data.do?sortby=publicationDate&page=

with 'page' in the end sequencing the numbers. Once we have the url next step is to append all the available html script in an array:

```
import requests

url = 'http://shop.oreilly.com/category/browse-subjects/data.do?sortby=publicationDate&page='

html_url = [url + str(i) for i in range(1,38)] 

html_text = []


def get_html_text(html_url_):
    for i in range(0,37): 
        html_text.append(requests.get(html_url_[i]).text) # goes through every page of oreilly publications on 'Data' and saves the html script
    return html_text

html_text = get_html_text(html_url)

```

The html you just collected is raw unstructured html. This is where the BeautifulSoup package comes in handy. It structures the raw data into meaningful tags which we can later use to extract only the data we need. 

```

soup = []
def format_html_text(html_text_): 
    for i in range(0,37):
        soup.append(BeautifulSoup(html_text_[i], 'html5lib')) # formats the html text
    return soup   

soup = format_html_text(html_text)

```

From the structured data you can see that the tags 'td' and 'thumbtext' contain details on every book. So let us extract that part. 

```
thumbtext = []

def get_thumbtext(soup_):
    for i in range(0, 37): 
        thumbtext.extend(soup_[i].findAll('td', 'thumbtext'))
    return thumbtext

thumbtext = get_thumbtext(soup)

print len(thumbtext) # of titles under 'data' published by o'reilly

```

O'reilly publishes not just books but also video and audio guides. So let us eliminate everything that is not a book. 

```

thumbtext_ebook = []



def is_video(thumbtext_):
    for i in range(0,1110): 
        if thumbtext_[i].find('span','pricelabel').text.split()[0].lower() == 'ebook:':
            #print thumbtext_[i].find('span','pricelabel').text.split()[0].lower()
            thumbtext_ebook.append(thumbtext_[i])
        else: 
            continue
    return thumbtext_ebook

thumbtext_ebook = is_video(thumbtext) # extract html 

print len(thumbtext_ebook)

```

Now that we have all the tags of each title, let us extract the parts of the title we need. We can start with the most important stuff like title, author, price and date of publication. 

```

data = {'title':[],'author':[], 'price':[], 'date':[]}

def extract_data(thumbtext_ebook_):
    for i in range(0,len(thumbtext_ebook_)):
        #data['bookid'].append(i)
        data['title'].append(thumbtext_ebook_[i].find('div','thumbheader').text.strip())
        data['author'].append(thumbtext_ebook_[i].find('div','AuthorName').text.strip())
        
        data['price'].append(thumbtext_ebook_[i].find('span','price').text.strip())
        data['date'].append(thumbtext_ebook_[i].find('span','directorydate').text.strip())
    return  data

data = extract_data(thumbtext_ebook)

```

Pandas offer great flexibility in working with data. So let us fit the dictinary into a data frame and work on it. 

```

from pandas import DataFrame as df
dataframe = df.from_dict(data) 
dataframe

```

This is how the output looks like: 







