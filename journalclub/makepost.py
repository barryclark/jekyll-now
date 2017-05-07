#!/Users/dhocker/miniconda2/bin/python
import sys
#print(sys.version)
import bibtexparser

bibfile = sys.argv[1]
writefile = sys.argv[2]
olddate = sys.argv[3]

#bibfile = 'cockburn.bib'
#writefile = 'cockburn_test.md'

with open(bibfile) as bibtex_file:
    bibtex_str = bibtex_file.read()

bib_database = bibtexparser.loads(bibtex_str)
bibdict = bib_database.entries[0]


authors = bibdict['author'] if 'author' in bibdict else ''
title = bibdict['title'] if 'title' in bibdict else ''
journal = bibdict['journal'] if 'journal' in bibdict else ''
title = title.replace(':',',')
if 'year' in bibdict:
	year = bibdict['year']
elif 'month' in bibdict:
	year = bibdict['month'].split('/')[2]
	if len(year) ==2 and int(year[0]) > 4:
		year = '19' + year
	elif len(year) == 2 and int(year[0]) <= 4:
		year = '20'+year
else:
	year = ''



abstract = bibdict['abstract'] if 'abstract' in bibdict else ''
url = bibdict['link'] if 'link' in bibdict else ''
volume = bibdict['volume'] if 'volume' in bibdict else ''
pages = bibdict['pages'] if 'pages' in bibdict else ''
number = bibdict['number'] if 'number' in bibdict else ''

with open('_posts/post_template.md') as tempfile:
	text = tempfile.read()

#start making the replacements
#title
text = text.replace('#TITLE',title);
#year
text =text.replace('#YEAR',year);
#date
text = text.replace('#DATE',olddate);
#url
text = text.replace('#URL',url);
#url
text = text.replace('#JOURNAL',journal);
#These might need to be handled more carefully
#volume
text = text.replace('#VOLUME',volume);
#issue
text = text.replace('#ISSUE',volume);
#page
text = text.replace('#PAGE',pages);
#abstract
text = text.replace('#ABSTRACT',abstract);
#author
text = text.replace('#AUTHOR',authors);
#issue number
text = text.replace('#NUMBER',number);

f = open(writefile,'w')
f.write(text)
f.close()
