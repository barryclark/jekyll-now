---
layout: prediction_post
published: True
title: Applying massive language models in the real world with Cohere
---

A little less than a year ago, I joined the awesome <a href="https://cohere.ai">Cohere</a> team. The company trains massive language models (both GPT-like and BERT-like) and offers them as an API (which also supports finetuning). Its founders include Google Brain alums including co-authors of the original Transformers paper. It's a fascinating role where I get to help companies and developers put these massive models to work solving real-world problems.

I love that I get to share some of the intuitions developers need to start problem-solving with these models. Even though I've been working very closely on pretrained Transformers for the past several years (for this blog and in developing <a href="https://github.com/jalammar/ecco">Ecco</a>), I'm enjoying the convenience of problem-solving with managed language models as it frees up the restrictions of model loading/deployment and memory/GPU management.  

These are some of the articles I wrote and collaborated on with colleagues over the last few months: 

### <a href="https://docs.cohere.ai/intro-to-llms/">Intro to Large Language Models with Cohere</a>
<div class="row two-column-text">
    <div class="col-md-6 col-xs-12">
  <a href="https://docs.cohere.ai/intro-to-llms/"><img src="https://files.readme.io/0a9715d-IntroToLLM_Visual_1.svg" class="small-image"/></a>
    </div>
    <div class="col-md-6 col-xs-12">
    <p>This is a high-level intro to large language models to people who are new to them. It establishes the difference between generative (GPT-like) and representation (BERT-like) models and examples use cases for them.</p>
    <p>This is one of the first articles I got to write. It's extracted from a much larger document that I wrote to explore some of the visual language to use in explaining the application of these models.</p>
    </div>
</div>

### <a href="https://docs.cohere.ai/prompt-engineering-wiki/">A visual guide to prompt engineering </a>

<div class="row two-column-text">
    <div class="col-md-6 col-xs-12">
  <a href="https://docs.cohere.ai/prompt-engineering-wiki/"><img src="https://files.readme.io/db285b8-PromptEngineering_Visual_2.svg" class="small-image"/></a>
    </div>
    <div class="col-md-6 col-xs-12">
        <p>Massive GPT models open the door for a new way of programming. If you structure the input text in the right way, you can useful (and often fascinating) results for a lot of taasks (e.g. text classification, copy writing, summarization...etc).
        </p>
        <p>This article visually demonstrates four principals to create prompts effectively. </p>
    </div>
</div>


### <a href="https://docs.cohere.ai/text-summarization-example/"> Text Summarization</a>

<div class="row two-column-text">
    <div class="col-md-6 col-xs-12">
  <a href="https://docs.cohere.ai/text-summarization-example/"><img src="https://files.readme.io/296454c-TextSummarization_Visual_1.svg" class="small-image"/></a>
    </div>
    <div class="col-md-6 col-xs-12">
    <p>This is a walkthrough of creating a simple summarization system. It links to a jupyter notebook which includes the code to start experimenting with text generation and summarization.</p>
    <p>The end of this notebook shows an important idea I want to spend more time on in the future. That of how to rank/filter/select the best from amongst multiple generations.</p>
    </div>
</div>


### <a href="https://docs.cohere.ai/semantic-search/">Semantic Search</a>

<div class="row two-column-text">
    <div class="col-md-6 col-xs-12">
  <a href="https://docs.cohere.ai/semantic-search/"><img src="https://files.readme.io/4ec00e1-SemanticSearch_Visual_1.svg" class="small-image"/></a>
    </div>
    <div class="col-md-6 col-xs-12">
    <p>Semantic search has to be one of the most exciting applications of sentence embedding models. This tutorials implements a "similar questions" functionality using sentence embeddings and a a vector search library.</p>
    <p>The vector search library used here is <a href="https://github.com/spotify/annoy">Annoy</a> from Spotify. There are a bunch of others out there. <a href="https://github.com/facebookresearch/faiss">Faiss</a> is used widely. I experiment with <a href="https://github.com/lmcinnes/pynndescent">PyNNDescent</a> as well.</p>
    </div>
</div>


### <a href="https://docs.cohere.ai/finetuning-representation-models/"> Finetuning Representation Models</a>

<div class="row two-column-text">
    <div class="col-md-6 col-xs-12">
  <a href="https://docs.cohere.ai/docs/training-a-representation-model"><img src="https://files.readme.io/699aead-TrainingRepModels_Visual_4.svg" class="small-image"/></a>
    </div>
    <div class="col-md-6 col-xs-12">
    <p>Finetuning tends to lead to the best results language models can achieve. This article explains the intuitions around finetuning representation/sentence embedding models. I've added a couple more visuals to the <a href="https://twitter.com/JayAlammar/status/1490712428686024705">Twitter thread</a>.</p>
<p>The research around this area is very interesting. I've highly enjoyed papers like <a href="https://arxiv.org/abs/1908.10084">Sentence BERT</a> and <a href="https://arxiv.org/abs/2007.00808">Approximate Nearest Neighbor Negative Contrastive Learning for Dense Text Retrieval</a></p>
    </div>
</div>


### <a href="https://docs.cohere.ai/token-picking/">Controlling Generation with top-k & top-p</a>

<div class="row two-column-text">
    <div class="col-md-6 col-xs-12">
  <a href="https://docs.cohere.ai/token-picking/"><img src="https://files.readme.io/ab291f6-Top-KTop-P_Visual_4.svg" class="small-image"/></a>
    </div>
    <div class="col-md-6 col-xs-12">
        <p>This one is a little bit more technical. It explains the parameters you tweak to adjust a GPT's <i>decoding strategy</i> -- the method with which the system picks output tokens. 
        </p>
    </div>
</div>


### <a href="https://docs.cohere.ai/text-classification-embeddings/">Text Classification Using Embeddings</a>

<div class="row two-column-text">
    <div class="col-md-6 col-xs-12">
  <a href="https://docs.cohere.ai/text-classification-embeddings/"><img src="https://files.readme.io/ee56264-Controlling_Generation_with_Top-K__Top-P_Visual_1.svg" class="small-image"/></a>
    </div>
    <div class="col-md-6 col-xs-12">
        <p>
        This is a walkthrough of one of the most common use cases of embedding models -- text classification. It is similar to <a href="http://127.0.0.1:4000/a-visual-guide-to-using-bert-for-the-first-time/">A Visual Guide to Using BERT for the First Time</a>, but uses Cohere's API.
        </p>
    </div>
</div>

You can find these and upcoming articles in the <a href="https://docs.cohere.ai/">Cohere docs</a> and <a href="https://github.com/cohere-ai/notebooks">notebooks repo</a>. I have quite number of experiments and interesting workflows I'd love to be sharing in the coming weeks. So stay tuned!
