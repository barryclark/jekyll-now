---
layout: page
title: Python PDF Merger
permalink: /guides/python-pdf-merger
---

## Merging PDF's for Free with Python

One thing that is universal across business is the PDF. Adobe's Portable Document Format, or PDF, is a standard when you need to send a document and have the formatting look the same on any device.

One of the nice things about them is that they prevent tampering by being very difficult to modify. This can be an issue however, when documents come in multiple files or you need to omit a page before sending.

Adobe has a solution of course, but the Pro Reader costs money and we all know how slow purchase approvals are when you just need that *one* file.

Feel free to use any of the online tools that will do it for free, but good luck knowing where your content ends up after that!

## Enter Python

Fortunately, we can do this all for free using Python, and with only a couple lines of code. The PyPDF2 library has a ton of functionality when working with PDFs, but we're only going to scratch the surface.

Let's get started by installing PyPDF2 if you don't have it already.

```
pip install PyPDF2
```

Now make a folder somewhere, put a PDF in, and open your text editor. I've made a folder called Python PDF Merger, and included a two page PDF file that just has one line on each page, noting that one is page one and the other is page two. Let's do a bit of a hello world to see what we're working with:

```python
import PyPDF2

def load_pdf():
    f = open(input('Enter filename of PDF: '),'rb')
    return PyPDF2.PdfFileReader(f)

doc = load_pdf()

print(doc.getNumPages())
```

If you have the number of pages in your PDF print to the console, everything is working!

## File Readers and File Writers

PyPDF2 contains file reader classes and file writer classes. Each requires you to pass in a file using Python's `open()` function, and we've already made a function to do that for us above.

Once you have this PDF object you can perform many actions with it, in our case we called the `.getNumPages()` method to return the number of pages, which will be useful later.

There's a class in PyPDF2 called `PdfFileMerger`, but I find it a bit limiting for what I need to do sometimes, so it's omitted from here. It basically gives you a shortcut to join multiple documents together but loses some flexibility.
