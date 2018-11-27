---
layout: page
title: Python PDF Merger
permalink: /guides/python-pdf-merger
---

### Merging PDF's for Free with Python

One thing that is universal across business is the PDF. Adobe's Portable Document Format, or PDF, is a standard when you need to send something and have the formatting look the same across any device. Scanners tend to produce PDFs as well, so all those signed records usually end up in this format.

One of the nice things about them is that they prevent tampering by being very difficult to modify. This can be an issue when documents come in multiple files or you need to omit a page before sending, however.

Adobe has a solution of course, but the Pro Reader costs money and we all know how slow purchase approvals are when you just need that *one* file fixed and sent.

You're welcome to use any of the online tools that will do it for free, but good luck knowing where your content ends up after that!

### Enter Python and PyPDF2

Fortunately, we can do everything using Python, and with only a couple lines of code. The PyPDF2 library has a ton of functionality when working with PDFs, and we're only going to scratch the surface in this post.

Let's get started by installing PyPDF2 if you don't have it already.

```
pip install PyPDF2
```

Now make a folder somewhere, put a PDF in, and open your text editor. I've made a folder called Python PDF Merger, and included a two page PDF file that just has one line on each page, noting that one is page one and the other is page two. Let's do a bit of a hello world to see what we're working with:

```python
import PyPDF2

def load_pdf(filename):
    f = open(filename,'rb')
    return PyPDF2.PdfFileReader(f)

doc = load_pdf()

print(doc.getNumPages())
```

If you have the number of pages in your PDF print to the console, everything is working!

### File Readers and File Writers

PyPDF2 contains reader classes and writer classes. Each (somewhat annoyingly) requires you to pass in a file using Python's `open()` function, and we've already made a function to do that for us above. We'll do that for the writer class soon enough.

Once you have this PDF object you can perform many actions with it, in our case we called the `.getNumPages()` method to return the number of pages, which will be useful later.

There's a class in PyPDF2 called `PdfFileMerger()`, but I find it a bit limiting for what I need to do sometimes, so I've chosen to omit it. It basically gives you a shortcut to join multiple documents together but with all shortcuts you lose some flexibility.

### Writing Files

Ok, now that we can read a PDF we need to know how to write them to disk, or they'll just be lost when the script is completed.

To save time, we'll write a pair of functions called `add_to_writer()` and `write_pdf()` so that we can start merging right away:

```python
def add_to_writer(pdf, writer):
    pages = pdf.getNumPages()
    for i in range(pages):
        writer.addPage(pdf.getPage(i))

def write_pdf(filename, pdfs):
    with open(filename,'wb') as o:
        writer = PyPDF2.PdfFileWriter()
        for p in pdfs:
            add_to_writer(p,writer)
        writer.write(o)

doc = load_pdf(input('Enter filename of PDF: '))

docs = [doc, doc]

write_pdf('new_doc.pdf',docs)
```

When we add to the writer, you'll notice that we add one page at a time. This will allow us to individually select pages later on when we start really manipulating documents.

When we actually write the PDF, we're going to create a `PdfFileWriter()` object and add the files to it. This `write_pdf()` function will take in an output filename, and a list of PDFs.

### Putting it all together

If you've followed along this far, you'll see all we're doing is doubling the document that we pass in. Let's make it more interactive so that we can actually merge different documents together:

```python
def select_pdfs(num_docs):
    return [load_pdf(input('Enter filename for PDF: ')) for i in range(num_docs)]

docs = select_pdfs(int(input('How many PDFs would you like to merge?')))
```

Whew, that's a dense line but we're doing quite a bit to add these pages. When we call the `select_pdfs()` function, we pass in an input that will take the number of PDFs the user wants to merge (note that it comes in as a string so we need to convert it).

Once we have that number, we call `load_pdf()` that many times in a list comprehension and return that as a list. This list gets passed in to the `write_pdf()` function and we can now merge different PDFs together.

### Command Line Merger

We can now successfully merge different PDFs together, but this script leaves a lot to be desired. For one, the user input isn't controlled at all and anything beyond what we expect to go in will cause a crash. In addition, we can only put together complete PDFs and not remove pages selectively. Finally, working on the command line is fine for us, but if we want to distribute this tool out we'll want a graphic interface for users that don't feel comfortable at the terminal.

Either way, not bad! Saved some money and got those documents merged in about 25 lines of code.

Fortunately Python has us covered for all of those issues listed above, and we'll get to that soon.

---

Full code:

```python
import PyPDF2

def load_pdf(filename):
    f = open(filename,'rb')
    return PyPDF2.PdfFileReader(f)

def add_to_writer(pdf, writer):
    pages = pdf.getNumPages()
    for i in range(pages):
        writer.addPage(pdf.getPage(i))

def write_pdf(filename, pdfs):
    with open(filename,'wb') as o:
        w = PyPDF2.PdfFileWriter()
        for p in pdfs:
            add_to_writer(p,w)
        w.write(o)

def select_pdfs(num_docs):
    return [load_pdf(input('Enter filename for PDF: ')) for f in range(num_docs)]

docs = select_pdfs(int(input('How many PDFs would you like to merge?')))

write_pdf('new_doc.pdf',docs)
```
