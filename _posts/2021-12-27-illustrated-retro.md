---
layout: prediction_post
published: False
title: The Illustrated Retro Transformer 
---

looking at DeepMind's Retro Transformer, which at 7.5B parameters is on par with GPT3 and models 25X its size in knowledge-intensive tasks. 

A big moment for Large Language Models (LLMs) for reasons I'll mention in this thread.

[image model]

Language modeling trains models to predict the next word. 

Sometimes, the completion requires knowledge of factual information. Other times, familiarity with language is enough (expressions, grammar).

Examples in the image. Completions:
1) 2021
2) time

[image: 2   prompts]


Large GPTs had to encode everything they know in their model parameters. This makes sense for language data. But it's inefficient knowledge information (there so many facts). 

Now the Language model can be much smaller, and a neural database helps it with retrieval. 

[image: large GPT]


This way, you get the following benefits:
1) The core language model can be much smaller. Which means it can be faster and easier to deploy on smaller GPUs.

2) To add new information to the model, you (may be able to) simply update the database without re-training.


Mechanically, it's an encoder-decoder model just like the original transformer, T5, or T0.

It uses the help of a neural database to augment its input, however.

[image: prompt dune input to retro ]

The database looks like this.

It's a key-value store. The key is standard BERT embeddings.

The value is text in two parts: 
1- Neighbor, which is used to compute the key
2- Completion, the continuation of the text in the original document.

Retro's database is 2 trillion tokens

[image databse]

How is the database incorporated?

This is the process:

Before hitting Retro, the input prompt actually goes into BERT.

The output contextualized vectors are then averaged to construct a sentence embedding vector. 

That vector is then used to query the database.
[image bert]

That sentence embedding is then used in an approximate nearest neighbor search (using: https://github.com/google-research/google-research/tree/master/scann). 

The two nearest neighbors are retrieved, and their text becomes a part of the input into Retro.

[image input + 2 neighbors]

This is now the input to Retro. The input prompt and its two nearest neighbors from the database (and their continuations).

From here, the Transformer and Retro Blocks incorporate the information into their processing.

[image input + 2 neighbors going into retro]

Architecture: An encoder stack and a decoder stack. 

The 7.5B parameter model has 32 layers. So I'm thinking 16 in the encoder and 16 in the decoder (Counting the parameters should verify).

[enc-dec stacks]

The encoder seems to be made of standard Transformer encoder blocks (self-attention + FFNN).

The decoder stack interleaves two kinds of decoder blocks:
- Decoder Block (Attn + FFNN)
- Retro Decoder Block (Attn + Chunked cross attention [CCA] + FFNN)

[blocks]

Correction: I now see the decoder is 32 layers. 

Every third block starting from 9 is a Retro block (that allows its input to attend to the neighbors). So 9, 12, 15...32).

Decoder blocks only work on the input text. No enc-dec cross-attention in the model aside from CCA.

[hyper params]












