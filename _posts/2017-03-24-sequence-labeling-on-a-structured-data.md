---
published: false
---
# Sequence Labeling on a Structured Data

Sequence labeling is one of the classic ML tasks, that include well-studied problems of Part-of-Speech (POS) tagging,
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
     <p align="left" indent="1em">La cinquième planète était <i>très curieuse</i>.</p>
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
Here we forget that tere was any structure in the input document, and we extract text only and tokenize it:
```
La 
cinquième 
planète 
était 
très 
curieuse.
```
Advantage: pretty easy to create a training dataset and use standard methods of tokenization and ML.

Disadvantage: looses information about structure, that may be important for prediction.

### Pretend approach
Lets take the text of XML document and tokenize it:
```
<
doc
>
<
chapter 
id
="
1
"
name
="
Chapitre
XIV
">
<
p
align
="
left
"
indent
="
1em
">
La 
cinquième 
planète 
était 
<
i
>
très 
curieuse
</
i
>.
</
p
>
</
chapter
>
</
doc
>
```
Puff. A lot of noise we get from XML markup.

Advantagse: easy to implement - no change required in the tooling.

Disadvantage: input is very ambiguous. There are many equivalent ways to serialize the same XML document. 

Consider that this one:
```
<doc>
  <chapter name="Chapitre XIV" id="1">
    <p indent="1em" align="left">La cinqui&#232;me plan&#232;te &#233;tait <i>tr&#232;s curieuse</i>.</p>
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

One way of doing this would be to tokenize only CDATA portion of the XML, and treat tags and tag attributes as features
```
La             B-doc  B-chapter  O
cinquième      I-doc  I-chapter  O
planète        I-doc  I-chapter  O
était          I-doc  I-chapter  O
très           I-doc  I-chapter  B-i
curieuse       I-doc  I-chapter  I-i
.              I-doc  I-chapter  O
```
Somehow this approach feels better than both previous ones. We do not tokenize control information (tags), and we do preserve
the control information in the form of token features.

#### XML tags may interfere with tokenization
One assumption silently embedded in the token/feature sketch above is that we can unambiguously assign XML tag to a token. This is
not trivial requirement. Consider this XML fragment:
```
and they lived <i>happily ev</i>er after
```
This is somewhat contrieved, but still. Note that `<i>` tag covers only half of the word `ever`. What should we do?

Practical solution is to change tokenization such that it is always consistent with XML tagging.
The rule is: XML start and end tags induce token break:
```
and       O
they      O
lived     O
happily   O
ev        O
er        B-i
after     O
```

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

## Decoding problem
It is easy to use `argmax` method on logits to get the current label for a given token. Yet the result may not be sensical.
There are two problems:

1. IOB encoding implied constraints. In IOB label encoding scheme there are natural constrains: `I` label must be preceded by
   `B` or `I`. Sequence of `O I` does not make sense, as one can not get *inside* label without first *beginning* the label.
2. XML structure constraints. XML tags must be well-formed (correctly nested). The result of tagging is addition of XML annotation
   tag. We should make sure that adding annotation tag still preserves well-formedness of the XML tree. Technically, one can invent
   an alternative way of annotationg text spans in XML document, without using XML annotation tag. One solution could be to use
   XML processing instructions to add annotations. But in practice XML annotations are way more convenient (and XML tooling is
   much more mature for tags), that we almost always use tags and must obey correct nesting.

Both these problems move us into the domain of *constrained label decoding*. Among all possible label assignments we must pick
the one that minimises the total loss *given the structural constrains*.

The problem of IOB constraints can be addressed by applying Viterbi-style decoding with the transition matrix that defines the
constraint.

The problem of satisfying XML structure constraint is not yet well understood. But we can re-formulate it in the terms of
interval nesting problem.

### XML tree as a set of nested intervals
First, lets define the text content of an XML document. Text content is the text we get after removing all XML tags.

Each XML tag has its start and end offset into the text content. In other words, each XML tag defines an interval on the text content.
If we take all XML tags and look at all intervals induced by these tags, we will get a set of well-nested intervals. Given any two
intervals, only following is possible:
1. one interval is completely inside the other
2. intervals have zero intersection
3. intervals are identical
What can not possibly happen is when two intervals partially overlap. This is because it is not an arbitrary set of intervals, but
the set induced by a tree XML structure.

And if we have a set of intervals that obeys properties 1-3 above, we can build a set of valid XML trees out of it! This is
somewhat ambiguous (because if intervals have the same span, we can choose any order of tag nesting in the tree), but it is
possible.

Now we have a simple way to check if suggested annotation can be put into original XML tree as a tag or not. We just need to check
that the new interval that this annotation is proposing does not break rules 1-3 above wrt any other interval already present in the
tree.

Putting it all together: once we have logits for every token in XML tree, we should run Viterbi algorithm that suppresses
impossible IOB decodings and, additionally, check for the interval to be admissible.

As we decode labels, we check for the interval start/end. If some intervals starts at the current token, we split Viterbi
decoding into the same number of sub-streams. Each stream represents the choice of this interval as its "base". If an interval
is "base" for a Viterbi decoding, then label transition from B or I to (O, B) is not allowed until the end of this interval.
Additionally, if Viterbi decoding starts a label at this exact token, then we add a normal decoding that must end at or before 
the end of the smallest of these intervals.
