"""
Created on Friday 28 December 2018
Last update: -

@author: Michiel Stock
michielfmstock@gmail.com

Simple script to parse my book list CSV file from Goodreads into markdown for
my blog.
"""

import pandas as pd

books = pd.read_csv("goodreads_library_export26122018.csv")

# get read books this year
books = books.loc[books.Bookshelves != "to-read"]
books = books.reindex().iloc[:50]
#books = books.loc[[("2018" in str(date)) for date in books["Date Read"]]]

for index in books.index:
    print("- '*{title}*' by {author} ({rating})".format(
    title=books.iloc[index]["Title"],
    author=books.iloc[index]["Author"],
    rating=books.iloc[index]["My Rating"] * "\*"
    ))
