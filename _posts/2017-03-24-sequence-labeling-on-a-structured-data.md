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
numbers and text that mixes numbers and letters. Thus, there are several popular tokenization schemes out there.

Choice of tokenization scheme can me important, and technically should be considered as part of general feature selection
and parameter tuning search. 

But here is the current wisdom:
* all tokenization schemes should work good if you have enough data, and if it matches the problem
* there was some success in token-less learning as well - check out the [work of Andrej Karpathy](http://karpathy.github.io/2015/05/21/rnn-effectiveness/) on the subject

## Structured documents

Classic NLP problems use text blocks (or sentences) as input. But these days structured input (HTML or XML) is
much more common. What are the implications of structured input?

First, let us narrow the inputs to XML documents. HTML sources can be folded into the same class, obviously. But we
are ignoring other structured type of sources: RTF, LaTeX, SGML, etc. Let us concentrate on XML.

In XML text is mixed with structural information. Example input may look like this:
```
<doc>
  <chapter id="1" name="Chapitre XIV">
     <p align="left" indent="1em">La cinquième planète était très curieuse.</p>
  </chapter>
</doc>
```

How to deal with it? Here are the options:

1. *Transform* to plain text. By stripping out XML tags one is left with the text-only content and this can be
   used for ML.
2. *Pretend* XML is text. Just use ML algorithms on full serialized XML text, hoping that machine will learn to use
   (or ignore) XML tags.
3. Incorporate *Structure* into learning. Use CDATA text of the the XML document for tokenization, and use structure tags as
   features. I will talk more about this below.

### Transform approach
Advantage: pretty easy to create a training dataset and use standard methods of tokenization and ML.

Disadvantage: looses information about structure, that may be important for prediction.

### Pretend approach
Advantagse: easy to implement - no change required in the tooling.

Disadvantage: input is very ambiguous. There are many equivalent ways to serialize the same XML document. For example:
```
<doc>
  <chapter name="Chapitre XIV" id="1" >
    <p indent="1em" align="left">La cinqui&#232;me plan&#232;te &#233;tait tr&#232;s curieuse.</p>
  </chapter>
</doc>
```
is the **same** XML document as before, just a different serialized form of it.

We can hope that given a lot of data system can eventually learn that order of attributes does not matter and that
`cinqui&#232;me` represents the same word as `cinquième`. But it is obviously a huge and artificial complication.

In short, this approach can not be expected to generalize well across all XML serialized forms.

### Structure approach
Well, we did not yet define this approach, did we? Lets for now state that
1. we want to work with parsed XML tree as our input object, and
2. somehow cast this to a standard NLP sequence labeling task

## Sequence labeling under the hood
Again, sequence labeling takes a sequence of tokens as its input, and outputs a sequence of labels, assigned to each token.
In practice, we know the set of possible labels up-front, and typical ML output will be an array of `logits` for every token.
Training is done by applying *Softmax* operator to the `logits` and attaching *Negaive Log Likelihood* loss function as an optimization objective. Prediction is done with *argmax* operation on logits.

The above is very standard and therefore I presented it in a very terse form, just to recap. 

Note that at prediction 
time values of logits can also be used to estimate the confidence. The intuition is simple: if there is one dominating (strong)
value in the array of the logits, then system is quite confident it that label. If there are two or more close values, then
system is not so sure.

Net conclusion to be taken from this section is that classical sequence labeling takes a list of tokens, and returns a list 
of logits arrays (one array for each input token). These logits values can be used to get label and confidence estimation.

