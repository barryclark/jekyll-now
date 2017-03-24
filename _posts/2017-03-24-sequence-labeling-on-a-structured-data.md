---
published: false
---
# Sequence Labeling on a Structured Data

Sequence labeling is one of the classic ML task, that includes well-studied problems of Part-of-Speech (POS) tagging,
Named Entity Recognition (NER), and more. Here I want to discuss two related topics: **tokenization**, and satisfying
constrains imposed by the **structure** of input document. These two pieces are independent, but I still want to
talk about both here, under the umbrella of generic sequence labeling.

## Tokenization
In sequence labeling our object is ... a sequence (surprise!). But the sequence of what? It is common in Natural 
Language Processing to convert input text to a sequence of **tokens**. Here token is understood to be a word.
Intuitively this is logical and reasonable. However, when diving into implementation details, there are many questions
to answer on order to define word boundary. Basic tokenization scheme would be to split text on every whitespace (blank,
TAB, newline). A more sophisticated one will also split on punctuation. Then we still need to decide how to treat
numbers and text that mixes numbers and letters. Thus, there are several popular tokenization schemes out there
