---
layout: prediction_post
published: False
title: The Illustrated Generalist Agent (Gato)
---


Could you train one machine learning model to learn hundreds of tasks spanning text, computer vision, and playing video games and controlling robots? In this post and video we go over DeepMind’s GATO that does this with a model that is simpler and smaller than you may think. It’s a GPT-like model that learns over 600 tasks. It opens the door to World Scope 4 as discussed in the Experience Grounds Language Video.


<div class="img-div" markdown="0">
  <img src="/images/gato/.png" />
  <br />
  
</div>


<div class="img-div" markdown="0">
  <img src="/images/gato/gato-paper-figure-1.png" />
  <br />
    Figure 1 from the paper
</div>


<div class="img-div" markdown="0">
  <img src="/images/gato/gato-paper-figure-2.png" />
  <br />
    Figure 2 from the paper
</div>


# Modalities map


<div class="img-div" markdown="0">
  <img src="/images/gato/GPT-modalities.png" />
  <br />
GPT
</div>



<div class="img-div" markdown="0">
  <img src="/images/gato/bert - modalities.png" />
  <br />
    BERT
</div>


<div class="img-div" markdown="0">
  <img src="/images/gato/GAN - modalities.png" />
  <br />
    GAN
</div>

<div class="img-div" markdown="0">
  <img src="/images/gato/clip modalities.png" />
  <br />
    CLIP
</div>

<div class="img-div" markdown="0">
  <img src="/images/gato/Dalle stable diffusion image gen modalities.png" />
  <br />
    DallE / Stable Diffusion
</div>


<div class="img-div" markdown="0">
  <img src="/images/gato/gato modalities.png" />
  <br />
    Gato
</div>


<div class="img-div" markdown="0">
  <img src="/images/gato/gato-modalities-sequences.png" />
  <br />
    Gato sequences
</div>




<div class="img-div" markdown="0">
  <img src="/images/gato/gato-modalities-sequences.png" />
  <br />
    Figure 3 from the paper
</div>




<div class="img-div" markdown="0">
  <img src="/images/gato/table-1-datasets-gato.png" />
  <br />
    Table 1 from the paper - datasets
</div>


<div class="img-div" markdown="0">
  <img src="/images/gato/gato-paper-figure-4.png" />
  <br />
    Figure 4 from the paper
</div>



## Performance and results

<div class="img-div" markdown="0">
  <img src="/images/gato/gato-paper-figure-5.png" />
  <br />
    Figure 5 from the paper
</div>


<div class="img-div" markdown="0">
  <img src="/images/gato/figure-5-explainer-1-at-0.png" />
  <br />
    Figure 5 from the paper at 0
</div>



<div class="img-div" markdown="0">
  <img src="/images/gato/figure-5-explainer-2-at-50.png" />
  <br />
    Figure 5 from the paper at 50
</div>

<div class="img-div" markdown="0">
  <img src="/images/gato/figure-5-explainer-3-at-100.png" />
  <br />
    Figure 5 from the paper at 100
</div>

<div class="img-div" markdown="0">
  <img src="/images/gato/experts-vs-gato-scores.png" />
  <br />
    GATO vs. Experts scoring
</div>


## Tokenization 


<div class="img-div" markdown="0">
  <img src="/images/gato/text-tokens.png" />
  <br />
    Text tokenization
</div>


<div class="img-div" markdown="0">
  <img src="/images/gato/image-tokens.png" />
  <br />
    Image tokenization
</div>



<div class="img-div" markdown="0">
  <img src="/images/gato/text-plus-images.png" />
  <br />
    Text + Image tokenization
</div>



<div class="img-div" markdown="0">
  <img src="/images/gato/image-captioning.png" />
  <br />
    Text + Image tokenization - image captioning
</div>


## Discrete values

<div class="img-div" markdown="0">
  <img src="/images/gato/text-images-discrete-inputs.png" />
  <br />
    Text + Image tokenization - image captioning
</div>

<div class="img-div" markdown="0">
  <img src="/images/gato/discrete-actions.png" />
  <br />
    
</div>


<div class="img-div" markdown="0">
  <img src="/images/gato/actions-embeddings.png" />
  <br />

</div>



<div class="img-div" markdown="0">
  <img src="/images/gato/hadoken-sequence.png" />
  <br />

</div>




# Timesteps & episodes

<div class="img-div" markdown="0">
  <img src="/images/gato/atari-image-action.png" />
  <br />
    Image + controller
</div>


<div class="img-div" markdown="0">
  <img src="/images/gato/image-action-timesteps.png" />
  <br />
    Image + controller
</div>



<div class="img-div" markdown="0">
  <img src="/images/gato/.png" />
  <br />
    Image + controller vector sequence
</div>


## Continuous values



## Native and non-native modalities


[Translating ]

<div class="img-div" markdown="0">
  <img src="/images/gato/.png" />
  <br />
    Expert sequences
</div>




<div class="img-div" markdown="0">
  <img src="/images/gato/.png" />
  <br />

</div>
