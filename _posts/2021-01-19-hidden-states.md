---
layout: prediction_post
published: True
title: 'Finding the Words to Say: Hidden State Visualizations for Language Models'
---


<script>
window.ecco = {};

let dataPath = '/data/';
let ecco_url = '/assets/';
</script>

<script type="module">
let dataPath = '/data/';
let ecco_url = '/assets/';
import * as explainingApp from "/js/explaining-app.js";
 if (window.location.pathname =='/hidden-states/'){
    explainingApp.citations();
 }
</script>

<link id='css' rel="stylesheet" type="text/css" href="https://storage.googleapis.com/ml-intro/ecco/html/styles.css?6">


<style>
    .toc li{
        margin-bottom:0px;
        list-style-type: none;
    }
    .toc{
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        font-size:80%;

    }
    .toc ul{
        margin-top: 0;
    }

    .toc h3{
        /*font-size:90%;*/
        margin-bottom:5px;
    }

</style>


<p>By visualizing the hidden state between a model's layers, we can get some clues as to the model's "thought process".</p>
<div style="background: hsl(0, 0%, 97%);;
border-top: 1px solid rgba(0, 0, 0, 0.1);;" class="l-screen">

<div class="l-page">
<figure style="text-align: center; padding: 15px">
<img src="/images/explaining/rankings-gpt2xl.png" style="border:1px solid #bbb; width: 90%; margin: 0 auto; text-align: center"/>
        <figcaption style="text-align:left">
            <strong>Figure: Finding the words to say</strong><br/>
            After a language model generates a sentence, we can visualize a view of how the model came by each word (column).  Each row is a model layer. The value and color indicate the ranking of the output token at that layer. The darker the color, the higher the ranking. Layer 0 is at the top. Layer 47 is at the bottom.<br/>
            <strong>Model:</strong>GPT2-XL<br/>
        </figcaption>
    
</figure>
    </div>
</div>

<p>Part 2: Continuing the pursuit of making Transformer language models more transparent, this article showcases a collection of visualizations to uncover mechanics of language generation inside a pre-trained language model. These visualizations are all created using <a href="https://www.eccox.io">Ecco</a>, the open-source package we're releasing

<p>In the first part of this series, <a href="/explaining-transformers/">Interfaces for Explaining Transformer Language Models</a>, we showcased interactive interfaces for input saliency and neuron activations. In this article, we will focus on the hidden state as it evolves from model layer to the next. By looking at the hidden states produced by every transformer decoder block, we aim to gleam information about how a language model arrived at a specific output token. This method is explored by Voita et al.<cite key="voita2019bottom"></cite>. Nostalgebraist <cite key="nostalgebraist2020"></cite>
        presents compelling visual treatments showcasing the evolution of token rankings, logit scores, and softmax
        probabilities for the evolving hidden state through the various layers of the model.
    </p>

<!--more-->
<h2>Recap: Transformer Hidden States</h2>
<p>The following figure recaps how a transformer language model works. How the layers result in a final hidden state. And how that final state is then projected to the output vocabulary which results in a score assigned to each token in
        the model's vocabulary. We can see here the top scoring tokens when DistilGPT2 is fed the input sequence " 1, 1,
        ":</p>
<figure class="l-page-outset">
        <img src="/images/explaining/transformer-language-model-steps.png"/>
        <figcaption>
            <strong>Figure: Recap of transformer language models.</strong><br />
            This figure shows how the model arrives at the top five output token candidates and their probability scores. This shows us that at the final layer, the
            model is 59% sure the next token is ' 1', and that would be chosen as the output token by greedy decoding.
            Other probable outputs include ' 2' with 18% probability (maybe we are counting) and ' 0' with 5%
            probability (maybe we are counting down).
        </figcaption>
    </figure>

Ecco provides a view of the model's top scoring tokens and their probability scores.

{% highlight py %}
# Generate one token to complete this input string
output = lm.generate(" 1, 1, 1,", generate=1)

# Visualize
output.layer_predictions(position=6, layer=5)
{% endhighlight %}

Which would show the following breakdown of candidate output tokens and their probability scores:

<figure class="l-page-outset">
        <img src="/images/explaining/prediction_scores.PNG"/>
        <figcaption>
            <strong>Figure: Ten tokens with highest probabilities at the final layer of the model.</strong><br />
        </figcaption>
    </figure>

<h2>Scores after each layer</h2>
<p>Applying the same projection to internal hidden states of the model gives us a view of how the model's conviction
        for the output scoring developed over the processing of the inputs. This projection of internal hidden states
        gives us a sense of which layer contributed the most to elevating the scores (and hence ranking) of a certain
        potential output token.</p>

<figure class="l-page-outset">
        <img src="/images/explaining/predictions.PNG"/>
        <figcaption>
            <strong>Figure: projecting inner hidden states to the model's vocabulary reveals cues of processing between layers.</strong><br />
        </figcaption>
    </figure>
<p>Viewing the evolution of the hidden states means that instead of looking only at the candidates output tokens from
        projecting the final model state, we can look at the top scoring tokens after projecting the hidden state
        resulting from each of the model's six layers.</p>


This visualization is created using the same method above with omitting the 'layer' argument (which we set to the final layer in the previous example, layer #5):
{% highlight py %}
# Visualize the top scoring tokens after each layer
output.layer_predictions(position=6)
{% endhighlight %}

Resulting in: 

<figure class="l-page-outset">
        <img src="/images/explaining/predictions%20all%20layers.PNG"/>
        <figcaption>
        <strong>Figure: Top scoring tokens after each of the model's six layers.</strong>
        <br />
            Each row shows the top ten predicted tokens obtained by projecting each hidden state to the output
            vocabulary. The probability scores are shown in pink (obtained by passing logit scores through softmax). We
            can see that <strong>Layer 0</strong> has no digits in its top ten predictions. <strong>Layer 1</strong>
            gives the token ' 1' a 0.03%, probability which, while low, still ranks the token as the seventh highest
            ranking token. Subsequent layers keep elevating the probability and ranking of ' 1', until <strong>the final
            layer</strong> injects a bit more caution by reducing the probability from 100% to ~60%, still retaining the
            token as the highest ranked in the model's output.<br />
            <strong>Note:</strong> This figure is incorrect in showing 0 probability assigned to some tokens due to rounding. The current version of Ecco fixes this by showing '<0.01%'.
        </figcaption>
    </figure>




You can experiment with these visualizations and experiment with them on your own input sentences at the following colab link:

<p><a href="https://colab.research.google.com/github/jalammar/ecco/blob/main/notebooks/Ecco_Output_Token_Scores.ipynb"><img src="/images/explaining/colab-badge.svg"/></a>
    </p>

<h3>Evolution of the selected token</h3>
<figure class="aside">
        <img src="/images/explaining/logit_ranking_1.png" style="max-width:202px"/>
        <figcaption>
            <strong>The ranking of the token ' 1' after each layer</strong><br/>
            <strong>Layer 0</strong> elevated the token ' 1' to be the 31st highest scored token in the hidden state it
            produced. <strong>Layers 1 and 2</strong> kept increasing the ranking (to 7 then 5 respectively). All the
            <strong>following layers</strong> were sure this is the best token and gave it the top ranking spot.
        </figcaption>
    </figure>
<p>Another visual perspective on the evolving hidden states is to re-examine the hidden states after selecting an output
        token to see how the hidden state after each layer ranked that token. This is one of the many perspectives
        explored by Nostalgebraist <cite key="nostalgebraist2020"></cite>
        and the one we think is a great first approach. In the figure on the side, we can see the ranking (out of
        +50,0000 tokens in the model's vocabulary) of the token ' 1' where each row
        indicates a layer's output.
    </p>

<p>The same visualization can then be plotted for an entire generated sequence, where each column indicates a
        generation step (and its output token), and each row the ranking of
        the output token at each layer:
    </p>

<figure>
        <img src="/images/explaining/sequence_111_rankings.PNG" style="max-width: 400px"/>
        <figcaption>
            <strong>Evolution of the rankings of the output sequence ' 1 , 1'</strong><br/>
            We can see that <strong>Layer 3</strong> is the point at which the model started to be certain of
            the digit ' 1' as the output. <br/><strong>When the output is to be a comma</strong>, Layer 0 usually ranks
            the comma as 5. <br/>
            <strong>When the output is to be a ' 1'</strong>, Layer 0 is less certain, but still ranks the ' 1' token at
            31 or 32.
            Notice that every output token is ranked #1 after Layer 5. That is the definition of <strong>greedy
            sampling</strong> -- the reason we selected this token is because it was ranked first.
        </figcaption>
    </figure>

<p>Let us demonstrate this visualization by presenting the following input to GPT2-Large:</p>


<figure class="l-page">
    <!--
        <script>
            require(['d3', 'ecco'], (d3, ecco) => {
                const euData ={'tokens': [{'token': 'The', 'token_id': 464, 'type': 'input'}, {'token': ' countries', 'token_id': 2678, 'type': 'input'}, {'token': ' of', 'token_id': 286, 'type': 'input'}, {'token': ' the', 'token_id': 262, 'type': 'input'}, {'token': ' European', 'token_id': 3427, 'type': 'input'}, {'token': ' Union', 'token_id': 4479, 'type': 'input'}, {'token': ' are', 'token_id': 389, 'type': 'input'}, {'token': ':', 'token_id': 25, 'type': 'input'}, {'token': '\n', 'token_id': 198, 'type': 'input'}, {'token': '1', 'token_id': 16, 'type': 'input'}, {'token': '.', 'token_id': 13, 'type': 'input'}, {'token': ' Austria', 'token_id': 17322, 'type': 'input'}, {'token': '\n', 'token_id': 198, 'type': 'input'}, {'token': '2', 'token_id': 17, 'type': 'input'}, {'token': '.', 'token_id': 13, 'type': 'input'}, {'token': ' Belgium', 'token_id': 15664, 'type': 'input'}, {'token': '\n', 'token_id': 198, 'type': 'input'}, {'token': '3', 'token_id': 18, 'type': 'input'}, {'token': '.', 'token_id': 13, 'type': 'input'}, {'token': ' Bulgaria', 'token_id': 27902, 'type': 'input'}, {'token': '\n', 'token_id': 198, 'type': 'input'}, {'token': '4', 'token_id': 19, 'type': 'input'}, {'token': '.', 'token_id': 13, 'type': 'input'}, {'token': ' Croatia', 'token_id': 28975, 'type': 'output'}]}
     ecco.renderOutputSequence('viz_eu_input', euData);
            })
        </script>
        <div id="viz_eu_input" class="ecco"></div>
        -->
        <div id="viz_eu_input" class="ecco"><div style="float: left; width: 70%;"><div class="sequence-indicator inputs-indicator">input:</div><div token="The" id="t0" position="0" value="0" class="token token-part input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">0</div><span style="color: rgb(0, 0, 0); padding-left: 4px;">The</span></div><div token=" countries" id="t1" position="1" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">1</div><span style="color: rgb(0, 0, 0); padding-left: 4px;"> countries</span></div><div token=" of" id="t2" position="2" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">2</div><span style="color: rgb(0, 0, 0); padding-left: 4px;"> of</span></div><div token=" the" id="t3" position="3" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">3</div><span style="color: rgb(0, 0, 0); padding-left: 4px;"> the</span></div><div token=" European" id="t4" position="4" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">4</div><span style="color: rgb(0, 0, 0); padding-left: 4px;"> European</span></div><div token=" Union" id="t5" position="5" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">5</div><span style="color: rgb(0, 0, 0); padding-left: 4px;"> Union</span></div><div token=" are" id="t6" position="6" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">6</div><span style="color: rgb(0, 0, 0); padding-left: 4px;"> are</span></div><div token=":" id="t7" position="7" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">7</div><span style="color: rgb(0, 0, 0); padding-left: 4px;">:</span></div><div token="
" id="t8" position="8" value="0" class="token new-line input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">8</div><span style="color: rgb(0, 0, 0); padding-left: 4px;">\n</span></div><div token="1" id="t9" position="9" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">9</div><span style="color: rgb(0, 0, 0); padding-left: 4px;">1</span></div><div token="." id="t10" position="10" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">10</div><span style="color: rgb(0, 0, 0); padding-left: 4px;">.</span></div><div token=" Austria" id="t11" position="11" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">11</div><span style="color: rgb(0, 0, 0); padding-left: 4px;"> Austria</span></div><div token="
" id="t12" position="12" value="0" class="token new-line input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">12</div><span style="color: rgb(0, 0, 0); padding-left: 4px;">\n</span></div><div token="2" id="t13" position="13" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">13</div><span style="color: rgb(0, 0, 0); padding-left: 4px;">2</span></div><div token="." id="t14" position="14" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">14</div><span style="color: rgb(0, 0, 0); padding-left: 4px;">.</span></div><div token=" Belgium" id="t15" position="15" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">15</div><span style="color: rgb(0, 0, 0); padding-left: 4px;"> Belgium</span></div><div token="
" id="t16" position="16" value="0" class="token new-line input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">16</div><span style="color: rgb(0, 0, 0); padding-left: 4px;">\n</span></div><div token="3" id="t17" position="17" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">17</div><span style="color: rgb(0, 0, 0); padding-left: 4px;">3</span></div><div token="." id="t18" position="18" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">18</div><span style="color: rgb(0, 0, 0); padding-left: 4px;">.</span></div><div token=" Bulgaria" id="t19" position="19" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">19</div><span style="color: rgb(0, 0, 0); padding-left: 4px;"> Bulgaria</span></div><div token="
" id="t20" position="20" value="0" class="token new-line input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">20</div><span style="color: rgb(0, 0, 0); padding-left: 4px;">\n</span></div><div token="4" id="t21" position="21" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">21</div><span style="color: rgb(0, 0, 0); padding-left: 4px;">4</span></div><div token="." id="t22" position="22" value="0" class="token input-token" style="opacity: 1; background-color: white;"><div class="position_in_seq">22</div><span style="color: rgb(0, 0, 0); padding-left: 4px;">.</span></div></div></div>
    </figure>
<div style="clear:both"></div>

<p>Visualizaing the evolution of the hidden states sheds light on how various layers contribute to generating this sequence as we can see in the following figure:</p>
 <figure>
 <a href="/images/explaining/ranking-eu-gpt2.png" target="_blank"><img src="/images/explaining/ranking-eu-gpt2-thumb.png" style="max-width: 648px"/></a><br/><br/>
        <figcaption>
            <strong>Figure: Hidden state evolution of an output sequence</strong> <br />
            Click to open image in full resolution. The figure reveals:
            <ul>
                <li>Columns of solid pink corresponding to newlines and periods. Starting from Layer #0 and onwards, the model is certain early on of these tokens, indicating Layer #0's awareness of certain syntactic properties (and that later layers raise no objections).</li>
                <li>
                    Columns where country names are predicted are very bright at the top and it's up to the last five layers to really come up with the appropriate token.
                </li>
                <li>
                    Columns tracking the incrementing number tend to be resolved at layer #9.
                </li>
                <li>
                    The model erroneously lists Chile in the list, not a EU country. But notice that the ranking of that token is 43 -- indicating the error is better attributed to our token sampling method rather than to the model itself. In the case of all other countries they were correct and in the top 3.
                </li>
                <li>
                    Aside from Chile, the rest of the countries are correct, but also follow the alphabetical order followed in the input sequence.
                </li>
            </ul>
        </figcaption>
    </figure>






<p><a href="https://colab.research.google.com/github/jalammar/ecco/blob/main/notebooks/Ecco_Evolution_of_Selected_Token.ipynb"><img src="/images/explaining/colab-badge.svg"/></a></p>


<h3>Rankings of Other Tokens</h3>



<figure class="wide-aside">
        <img src="/images/explaining/watch_keys_cabinet.png" style="max-width:270px;"/>
        <figcaption>
            <strong>Figure: Rankings of which token should go in the blank</strong> <br />
            While the final output succeeds in assigning the correct number, the first five layers surprisingly fail at
            identifying the correct number (by giving " is" a higher ranking than " are", which is the correct answer).
            Examining attention or inner-layer saliency could reveal clues as to the reason.
        </figcaption>
    </figure>

<p>We are not limited to watching the evolution of only one (the selected) token for a specific position. There are
        cases where we want to compare the rankings of multiple tokens <i>in the same position</i> regardless if the model selected them or not. </p>
 <p>One such case is the number prediction task described by Linzen et al.<cite key="linzen2016assessing"></cite>
        which arises from the English language phenomenon of subject-verb agreement. In that task, we want to analyze the
        model's capacity to encode <i>syntactic number</i> (whether the subject we're addressing is singular or plural)
        and <i>syntactic subjecthood</i> (which subject in the sentence we're addressing).
    </p>
<p>Put simply, fill-in the blank. The only acceptable answers are 1) <strong>is</strong> 2) <strong>are</strong>:
    </p>
<p>The key<strong>s</strong> to the cabinet ______ </p>
<p>To answer correctly, one has to first determine whether we're describing the keys (possible subject #1) or the
        cabinet (possible subject #2). Having decided it is the keys, the second determination would be whether it is
        singular or plural.</p>



<figure class="wide-aside">
        <img src="/images/explaining/watch_key_cabinets.png" style="max-width:270px;"/>
        <figcaption>
            The model is able to assign a higher ranking to <strong>is</strong>, which is the correct token. Every layer
            in the model managed to rank " is" higher than " are". The ranking of " are" remains high, however, as far as
            rankings are concerned (the delta in probability scores might indicate otherwise, however).
        </figcaption>
    </figure>



<p>Contrast your answer for the first question with the following variation:</p>
<p>The key to the cabinet<strong>s</strong> ______ </p>
<p>The figures in this section visualize the hidden-state evolution of the tokens " is" and " are". The numbers
        in the cells are their ranking in the position of the blank (Both columns address the same position in the
        sequence, they're not subsequent positions as was the case in the previous visualization).</p>

<p>The first figure (showing the rankings for the sequence "The keys to the cabinet") raises the question of why do five layers fail the task and only the final layer sets the record
        straight. This is likely a similar effect to that observed in BERT of the final layer being the most
        task-specific<cite key="liu2019linguistic,rogers2020primer"></cite>. It is also worth investigating whether that capability of succeeding at the task is predominantly localized in
        Layer 5, or if the Layer is only the final expression in a circuit<cite key="cammarata2020thread"></cite>
        spanning multiple layers which is especially sensitive to subject-verb agreement.
    </p>

<h3>Probing for bias</h3>
<p>This method can shed light on questions of bias and where they might emerge in a model. The following figures, for example, probe for the model's gender expectation associated with different professions:</p>
<figure>
        <img src="/images/explaining/doctor.png" style="max-width:220px;"/>
        <img src="/images/explaining/nurse.png" style="max-width:220px;"/>
        <figcaption>
            <strong>Figure: Probing bias in the model's association of gender with professions - Doctor and nurse</strong><br />
            The first five layers all rank " man" higher than " woman" for both professions. For the nursing profession, the final layer decisively elevates " woman" to a higher ranking than " man".
        </figcaption>
    </figure>
<p>More systemaic and nuanced examination of bias in contextualized word embeddings (another term for the vectors we've been referring to as "hidden states") can be found in <cite key="zhao2019gender,kurita2019measuring,basta2019evaluating,webster2020measuring"></cite>.</p>



<p><a href="https://colab.research.google.com/github/jalammar/ecco/blob/main/notebooks/Ecco_Comparing_Token_Rankings.ipynb"><img src="/images/explaining/colab-badge.svg"/></a></p>

<h2>Your turn!</h2>
You can proceed to do your own experiments using Ecco and the three notebooks in this article:

<ul>
    <li>
    <a href="https://colab.research.google.com/github/jalammar/ecco/blob/main/notebooks/Ecco_Output_Token_Scores.ipynb">Output Token Scores</a>
  </li>
  <li>
    <a href="https://colab.research.google.com/github/jalammar/ecco/blob/main/notebooks/Ecco_Evolution_of_Selected_Token.ipynb">Evolution of Selected Token</a>
    </li>
    <li>
    <a href="https://colab.research.google.com/github/jalammar/ecco/blob/main/notebooks/Ecco_Comparing_Token_Rankings.ipynb">Comparing Token Rankings</a>
    </li>
</ul>

You can report issues you run into at the Ecco's Github page. Feel free to share any interesting findings at the Ecco <a href="https://github.com/jalammar/ecco/discussions">Discussion</a> board. I invite you again to read <a href="https://www.lesswrong.com/posts/AcKRB8wDpdaN6v6ru/interpreting-gpt-the-logit-lens">Interpreting GPT the Logit Lens</a> and see the various ways the author examines such a visualization. I leave you with a small gallery of examples showcasing the responses of different models to different input prompts.

<h2>Gallery</h2>
<figure>  <figcaption>
                    <strong>Input:</strong> "Heathrow airport is located in the city of"<br/>
        <strong>Model:</strong> DistilGPT2
                </figcaption>
        <a href="london_rankings.png"><img src="/images/explaining/london_rankings.png" style="max-width:247px"/></a><br/>

        
<hr style="border-top: 10px dotted #bbb"/>
<figcaption><strong>Input:</strong> "Some of the most glorious historical attractions in Spain date from the period of Muslim rule, including The Mezquita, built as the Great Mosque of Cordoba and the Medina Azahara, also in Cordoba and now in ruins but still visitable as such and built as the Madinat al-Zahra, the Palace of al-Andalus; and the Alhambra in Granada, a splendid, intact palace. There are also two synagogues still standing that were built during the era of Muslim Spain: Santa Maria la Blanca in Toledo and the Synagogue of Cordoba, in the Old City. Reconquista and Imperial era"<br/>
            <strong>Model:</strong> DistilGPT2
        </figcaption>        
<a href="/images/explaining/ranking-cordoba.png"> <img style="max-width: 648px" src="/images/explaining/ranking-cordoba.png"/></a><br/>

<br/>
<figcaption><strong>Model:</strong> GPT2-Large</figcaption>
<a href="/images/explaining/cordoba-gpt2.png"><img style="max-width: 648px" src="/images/explaining/cordoba-gpt2.png"/></a><br/>


<br/>
<figcaption><strong>Model:</strong> GPT2-XL</figcaption>
<a href="/images/explaining/cordoba-gpt2xl.png"><img style="max-width: 648px" src="/images/explaining/cordoba-gpt2xl.png"/></a><br/>

<hr style="border-top: 10px dotted #bbb"/>
<figcaption><strong>Input:</strong> "The countires of the European Union are:\n1. Austria\n2. Belgium\n3.
            Bulgaria\n4." <br />
            <strong>Model:</strong> DistilGPT2
        </figcaption>
        <a href="/images/explaining/ranking-eu.png"><img src="/images/explaining/ranking-eu.png" style="max-width: 648px"/></a><br/>
        <figcaption><strong>Model:</strong> GPT2-Large</figcaption>
<a href="/images/explaining/ranking-eu-gpt2.png"><img src="/images/explaining/ranking-eu-gpt2.png" style="max-width: 648px"/></a><br/><br/>
        <figcaption><strong>Model:</strong> GPT2-XL</figcaption>
        <a href="/images/explaining/ranking-eu-gpt2xl.png"><img style="max-width: 648px" src="/images/explaining/ranking-eu-gpt2xl.png"/></a>
    </figure>
    

<h2>Acknowledgements</h2>
<p>This article was vastly improved thanks to feedback on earlier drafts provided by
        Abdullah Almaatouq,
        Anfal Alatawi,
        Fahd Alhazmi,
        Hadeel Al-Negheimish,
        Isabelle Augenstein,
        Jasmijn Bastings,
        Najwa Alghamdi,
        Pepa Atanasova, and
        Sebastian Gehrmann.
    </p>


<h2>References</h2>
<references>
</references>


<h2>Citation</h2>
<div style="color: #777;">

If you found this work helpful for your research, please cite it as following:

<div class="cite" markdown="1">

```code
Alammar, J. (2021). Finding the Words to Say: Hidden State Visualizations for Language Models [Blog post]. Retrieved from https://jalammar.github.io/hidden-states/
```
</div>

<br />
BibTex:

<div class="cite" markdown="1">


```code
@misc{alammar2021hiddenstates, 
  title={Finding the Words to Say: Hidden State Visualizations for Language Models},
  author={Alammar, J},
  year={2021},
  url={https://jalammar.github.io/hidden-states/}
}
```

</div>
</div>



<script type="text/bibliography">

@article{poerner2018interpretable,
  title={Interpretable textual neuron representations for NLP},
  author={Poerner, Nina and Roth, Benjamin and Sch{\"u}tze, Hinrich},
  journal={arXiv preprint arXiv:1809.07291},
  year={2018},
  url={https://arxiv.org/pdf/1809.07291}
}

@misc{karpathy2015visualizing,
      title={Visualizing and Understanding Recurrent Networks},
      author={Andrej Karpathy and Justin Johnson and Li Fei-Fei},
      year={2015},
      eprint={1506.02078},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/pdf/1506.02078.pdf}
}

@article{olah2017feature,
  title={Feature visualization},
  author={Olah, Chris and Mordvintsev, Alexander and Schubert, Ludwig},
  journal={Distill},
  volume={2},
  number={11},
  pages={e7},
  year={2017},
  url={https://distill.pub/2017/feature-visualization/}
}

@article{olah2018building,
  title={The building blocks of interpretability},
  author={Olah, Chris and Satyanarayan, Arvind and Johnson, Ian and Carter, Shan and Schubert, Ludwig and Ye, Katherine and Mordvintsev, Alexander},
  journal={Distill},
  volume={3},
  number={3},
  pages={e10},
  year={2018},
  url={https://distill.pub/2018/building-blocks/}
}

@article{abnar2020quantifying,
  title={Quantifying Attention Flow in Transformers},
  author={Abnar, Samira and Zuidema, Willem},
  journal={arXiv preprint arXiv:2005.00928},
  year={2020},
  url={https://arxiv.org/pdf/2005.00928}
}

@article{li2015visualizing,
  title={Visualizing and understanding neural models in nlp},
  author={Li, Jiwei and Chen, Xinlei and Hovy, Eduard and Jurafsky, Dan},
  journal={arXiv preprint arXiv:1506.01066},
  year={2015},
  url={https://arxiv.org/pdf/1506.01066}
}

@article{poerner2018interpretable,
  title={Interpretable textual neuron representations for NLP},
  author={Poerner, Nina and Roth, Benjamin and Sch{\"u}tze, Hinrich},
  journal={arXiv preprint arXiv:1809.07291},
  year={2018},
  url={https://arxiv.org/pdf/1809.07291}
}


@inproceedings{park2019sanvis,
  title={SANVis: Visual Analytics for Understanding Self-Attention Networks},
  author={Park, Cheonbok and Na, Inyoup and Jo, Yongjang and Shin, Sungbok and Yoo, Jaehyo and Kwon, Bum Chul and Zhao, Jian and Noh, Hyungjong and Lee, Yeonsoo and Choo, Jaegul},
  booktitle={2019 IEEE Visualization Conference (VIS)},
  pages={146--150},
  year={2019},
  organization={IEEE},
  url={https://arxiv.org/pdf/1909.09595}
}

@misc{nostalgebraist2020,
    title={interpreting GPT: the logit lens},
    url={https://www.lesswrong.com/posts/AcKRB8wDpdaN6v6ru/interpreting-gpt-the-logit-lens},
    year={2020},
    author={nostalgebraist}
 }

@article{vig2019analyzing,
  title={Analyzing the structure of attention in a transformer language model},
  author={Vig, Jesse and Belinkov, Yonatan},
  journal={arXiv preprint arXiv:1906.04284},
  year={2019},
  url={https://arxiv.org/pdf/1906.04284}
}

@inproceedings{hoover2020,
    title = "ex{BERT}: A Visual Analysis Tool to Explore Learned Representations in {T}ransformer Models",
    author = "Hoover, Benjamin  and Strobelt, Hendrik  and Gehrmann, Sebastian",
    booktitle = "Proceedings of the 58th Annual Meeting of the Association for Computational Linguistics: System Demonstrations",
    month = jul,
    year = "2020",
    address = "Online",
    publisher = "Association for Computational Linguistics",
    url = "https://www.aclweb.org/anthology/2020.acl-demos.22",
    pages = "187--196"
    }

@article{jones2017,
    title= "Tensor2tensor transformer visualization",
    author="Llion Jones",
    year="2017",
    url="https://github.com/tensorflow/tensor2tensor/tree/master/tensor2tensor/visualization"
    }

@article{voita2019bottom,
  title={The bottom-up evolution of representations in the transformer: A study with machine translation and language modeling objectives},
  author={Voita, Elena and Sennrich, Rico and Titov, Ivan},
  journal={arXiv preprint arXiv:1909.01380},
  year={2019},
  url={https://arxiv.org/pdf/1909.01380.pdf}
}

@misc{bastings2020elephant,
      title={The elephant in the interpretability room: Why use attention as explanation when we have saliency methods?},
      author={Jasmijn Bastings and Katja Filippova},
      year={2020},
      eprint={2010.05607},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/pdf/2010.05607.pdf}
}

@article{linzen2016assessing,
  title={Assessing the ability of LSTMs to learn syntax-sensitive dependencies},
  author={Linzen, Tal and Dupoux, Emmanuel and Goldberg, Yoav},
  journal={Transactions of the Association for Computational Linguistics},
  volume={4},
  pages={521--535},
  year={2016},
  publisher={MIT Press},
  url={https://www.aclweb.org/anthology/Q16-1037.pdf}
}

@book{tufte2006beautiful,
  title={Beautiful evidence},
  author={Tufte, Edward R},
  year={2006},
  publisher={Graphis Pr}
}

@article{pedregosa2011scikit,
  title={Scikit-learn: Machine learning in Python},
  author={Pedregosa, Fabian and Varoquaux, Ga{\"e}l and Gramfort, Alexandre and Michel, Vincent and Thirion, Bertrand and Grisel, Olivier and Blondel, Mathieu and Prettenhofer, Peter and Weiss, Ron and Dubourg, Vincent and others},
  journal={the Journal of machine Learning research},
  volume={12},
  pages={2825--2830},
  year={2011},
  publisher={JMLR. org}
}

@article{walt2011numpy,
  title={The NumPy array: a structure for efficient numerical computation},
  author={Walt, St{\'e}fan van der and Colbert, S Chris and Varoquaux, Gael},
  journal={Computing in science \& engineering},
  volume={13},
  number={2},
  pages={22--30},
  year={2011},
  publisher={IEEE Computer Society}
}

@article{wolf2019huggingface,
  title={HuggingFace's Transformers: State-of-the-art Natural Language Processing},
  author={Wolf, Thomas and Debut, Lysandre and Sanh, Victor and Chaumond, Julien and Delangue, Clement and Moi, Anthony and Cistac, Pierric and Rault, Tim and Louf, R{\'e}mi and Funtowicz, Morgan and others},
  journal={ArXiv},
  pages={arXiv--1910},
  year={2019}
}

@article{bostock2012d3,
  title={D3. js-data-driven documents},
  author={Bostock, Mike and others},
  journal={l{\'\i}nea]. Disponible en: https://d3js. org/.[Accedido: 17-sep-2019]},
  year={2012}
}

@article{ragan2014jupyter,
  title={The Jupyter/IPython architecture: a unified view of computational research, from interactive exploration to communication and publication.},
  author={Ragan-Kelley, Min and Perez, F and Granger, B and Kluyver, T and Ivanov, P and Frederic, J and Bussonnier, M},
  journal={AGUFM},
  volume={2014},
  pages={H44D--07},
  year={2014}
}

@article{kokhlikyan2020captum,
  title={Captum: A unified and generic model interpretability library for PyTorch},
  author={Kokhlikyan, Narine and Miglani, Vivek and Martin, Miguel and Wang, Edward and Alsallakh, Bilal and Reynolds, Jonathan and Melnikov, Alexander and Kliushkina, Natalia and Araya, Carlos and Yan, Siqi and others},
  journal={arXiv preprint arXiv:2009.07896},
  year={2020}
}

@misc{li2016visualizing,
      title={Visualizing and Understanding Neural Models in NLP},
      author={Jiwei Li and Xinlei Chen and Eduard Hovy and Dan Jurafsky},
      year={2016},
      eprint={1506.01066},
      archivePrefix={arXiv},
      primaryClass={cs.CL}
}

@misc{radford2017learning,
      title={Learning to Generate Reviews and Discovering Sentiment},
      author={Alec Radford and Rafal Jozefowicz and Ilya Sutskever},
      year={2017},
      eprint={1704.01444},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/pdf/1704.01444.pdf}
}

@misc{liu2019linguistic,
      title={Linguistic Knowledge and Transferability of Contextual Representations},
      author={Nelson F. Liu and Matt Gardner and Yonatan Belinkov and Matthew E. Peters and Noah A. Smith},
      year={2019},
      eprint={1903.08855},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/pdf/1903.08855.pdf}
}

@misc{rogers2020primer,
      title={A Primer in BERTology: What we know about how BERT works},
      author={Anna Rogers and Olga Kovaleva and Anna Rumshisky},
      year={2020},
      eprint={2002.12327},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/pdf/2002.12327.pdf}
}

@article{cammarata2020thread,
  author = {Cammarata, Nick and Carter, Shan and Goh, Gabriel and Olah, Chris and Petrov, Michael and Schubert, Ludwig},
  title = {Thread: Circuits},
  journal = {Distill},
  year = {2020},
  note = {https://distill.pub/2020/circuits},
  doi = {10.23915/distill.00024},
  url={https://distill.pub/2020/circuits/}
}

@article{victor2013media,
  title={Media for thinking the unthinkable},
  author={Victor, Bret},
  journal={Vimeo, May},
  year={2013}
}

@article{molnar2020interpretable,
  title={Interpretable Machine Learning--A Brief History, State-of-the-Art and Challenges},
  author={Molnar, Christoph and Casalicchio, Giuseppe and Bischl, Bernd},
  journal={arXiv preprint arXiv:2010.09337},
  year={2020},
  url={https://arxiv.org/pdf/2010.09337.pdf}
}

@inproceedings{vaswani2017attention,
  title={Attention is all you need},
  author={Vaswani, Ashish and Shazeer, Noam and Parmar, Niki and Uszkoreit, Jakob and Jones, Llion and Gomez, Aidan N and Kaiser, {\L}ukasz and Polosukhin, Illia},
  booktitle={Advances in neural information processing systems},
  pages={5998--6008},
  year={2017},
  url={https://papers.nips.cc/paper/7181-attention-is-all-you-need.pdf}
}

@article{liu2018generating,
  title={Generating wikipedia by summarizing long sequences},
  author={Liu, Peter J and Saleh, Mohammad and Pot, Etienne and Goodrich, Ben and Sepassi, Ryan and Kaiser, Lukasz and Shazeer, Noam},
  journal={arXiv preprint arXiv:1801.10198},
  year={2018},
  url={https://arxiv.org/pdf/1801.10198}
}

@misc{radford2018improving,
  title={Improving language understanding by generative pre-training},
  author={Radford, Alec and Narasimhan, Karthik and Salimans, Tim and Sutskever, Ilya},
  year={2018},
  url={https://www.cs.ubc.ca/~amuham01/LING530/papers/radford2018improving.pdf}
}
@article{radford2019language,
  title={Language models are unsupervised multitask learners},
  author={Radford, Alec and Wu, Jeffrey and Child, Rewon and Luan, David and Amodei, Dario and Sutskever, Ilya},
  journal={OpenAI blog},
  volume={1},
  number={8},
  pages={9},
  year={2019},
  url={https://d4mucfpksywv.cloudfront.net/better-language-models/language_models_are_unsupervised_multitask_learners.pdf}
}

@article{brown2020language,
  title={Language models are few-shot learners},
  author={Brown, Tom B and Mann, Benjamin and Ryder, Nick and Subbiah, Melanie and Kaplan, Jared and Dhariwal, Prafulla and Neelakantan, Arvind and Shyam, Pranav and Sastry, Girish and Askell, Amanda and others},
  journal={arXiv preprint arXiv:2005.14165},
  year={2020},
  url={https://arxiv.org/pdf/2005.14165.pdf}
}

@article{devlin2018bert,
  title={Bert: Pre-training of deep bidirectional transformers for language understanding},
  author={Devlin, Jacob and Chang, Ming-Wei and Lee, Kenton and Toutanova, Kristina},
  journal={arXiv preprint arXiv:1810.04805},
  year={2018},
  url={https://arxiv.org/pdf/1810.04805.pdf}
}

@article{liu2019roberta,
  title={Roberta: A robustly optimized bert pretraining approach},
  author={Liu, Yinhan and Ott, Myle and Goyal, Naman and Du, Jingfei and Joshi, Mandar and Chen, Danqi and Levy, Omer and Lewis, Mike and Zettlemoyer, Luke and Stoyanov, Veselin},
  journal={arXiv preprint arXiv:1907.11692},
  year={2019}
}

@article{lan2019albert,
  title={Albert: A lite bert for self-supervised learning of language representations},
  author={Lan, Zhenzhong and Chen, Mingda and Goodman, Sebastian and Gimpel, Kevin and Sharma, Piyush and Soricut, Radu},
  journal={arXiv preprint arXiv:1909.11942},
  year={2019},
  url={https://arxiv.org/pdf/1909.11942.pdf}
}

@article{lewis2019bart,
  title={Bart: Denoising sequence-to-sequence pre-training for natural language generation, translation, and comprehension},
  author={Lewis, Mike and Liu, Yinhan and Goyal, Naman and Ghazvininejad, Marjan and Mohamed, Abdelrahman and Levy, Omer and Stoyanov, Ves and Zettlemoyer, Luke},
  journal={arXiv preprint arXiv:1910.13461},
  year={2019},
  url={https://arxiv.org/pdf/1910.13461}
}

@article{raffel2019exploring,
  title={Exploring the limits of transfer learning with a unified text-to-text transformer},
  author={Raffel, Colin and Shazeer, Noam and Roberts, Adam and Lee, Katherine and Narang, Sharan and Matena, Michael and Zhou, Yanqi and Li, Wei and Liu, Peter J},
  journal={arXiv preprint arXiv:1910.10683},
  year={2019},
  url={https://arxiv.org/pdf/1910.10683}
}

@article{dosovitskiy2020image,
  title={An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale},
  author={Dosovitskiy, Alexey and Beyer, Lucas and Kolesnikov, Alexander and Weissenborn, Dirk and Zhai, Xiaohua and Unterthiner, Thomas and Dehghani, Mostafa and Minderer, Matthias and Heigold, Georg and Gelly, Sylvain and others},
  journal={arXiv preprint arXiv:2010.11929},
  year={2020},
  url={https://arxiv.org/pdf/2010.11929.pdf}
}

@article{zhao2019gender,
  title={Gender bias in contextualized word embeddings},
  author={Zhao, Jieyu and Wang, Tianlu and Yatskar, Mark and Cotterell, Ryan and Ordonez, Vicente and Chang, Kai-Wei},
  journal={arXiv preprint arXiv:1904.03310},
  year={2019},
  url={https://arxiv.org/pdf/1904.03310.pdf}
}

@article{kurita2019measuring,
  title={Measuring bias in contextualized word representations},
  author={Kurita, Keita and Vyas, Nidhi and Pareek, Ayush and Black, Alan W and Tsvetkov, Yulia},
  journal={arXiv preprint arXiv:1906.07337},
  year={2019},
  url={https://arxiv.org/pdf/1906.07337.pdf}
}

@article{basta2019evaluating,
  title={Evaluating the underlying gender bias in contextualized word embeddings},
  author={Basta, Christine and Costa-Juss{\`a}, Marta R and Casas, Noe},
  journal={arXiv preprint arXiv:1904.08783},
  year={2019},
  url={https://arxiv.org/pdf/1904.08783.pdf}
}

@misc{atanasova2020diagnostic,
      title={A Diagnostic Study of Explainability Techniques for Text Classification},
      author={Pepa Atanasova and Jakob Grue Simonsen and Christina Lioma and Isabelle Augenstein},
      year={2020},
      eprint={2009.13295},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/pdf/2009.13295.pdf}
}

@article{madsen2019visualizing,
  author = {Madsen, Andreas},
  title = {Visualizing memorization in RNNs},
  journal = {Distill},
  year = {2019},
  note = {https://distill.pub/2019/memorization-in-rnns},
  doi = {10.23915/distill.00016},
  url={https://distill.pub/2019/memorization-in-rnns/}
}

@misc{vig2019visualizing,
      title={Visualizing Attention in Transformer-Based Language Representation Models},
      author={Jesse Vig},
      year={2019},
      eprint={1904.02679},
      archivePrefix={arXiv},
      primaryClass={cs.HC},
      url={https://arxiv.org/pdf/1904.02679}
}


@misc{tenney2020language,
      title={The Language Interpretability Tool: Extensible, Interactive Visualizations and Analysis for NLP Models},
      author={Ian Tenney and James Wexler and Jasmijn Bastings and Tolga Bolukbasi and Andy Coenen and Sebastian Gehrmann and Ellen Jiang and Mahima Pushkarna and Carey Radebaugh and Emily Reif and Ann Yuan},
      year={2020},
      eprint={2008.05122},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/pdf/2008.05122}
}

@article{wallace2019allennlp,
  title={Allennlp interpret: A framework for explaining predictions of nlp models},
  author={Wallace, Eric and Tuyls, Jens and Wang, Junlin and Subramanian, Sanjay and Gardner, Matt and Singh, Sameer},
  journal={arXiv preprint arXiv:1909.09251},
  year={2019},
  url={https://arxiv.org/pdf/1909.09251.pdf}
}

@misc{zhang2020dialogpt,
      title={DialoGPT: Large-Scale Generative Pre-training for Conversational Response Generation},
      author={Yizhe Zhang and Siqi Sun and Michel Galley and Yen-Chun Chen and Chris Brockett and Xiang Gao and Jianfeng Gao and Jingjing Liu and Bill Dolan},
      year={2020},
      eprint={1911.00536},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/pdf/1911.00536}
}
@misc{sanh2020distilbert,
      title={DistilBERT, a distilled version of BERT: smaller, faster, cheaper and lighter},
      author={Victor Sanh and Lysandre Debut and Julien Chaumond and Thomas Wolf},
      year={2020},
      eprint={1910.01108},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/pdf/1910.01108}
}

@misc{shrikumar2017just,
      title={Not Just a Black Box: Learning Important Features Through Propagating Activation Differences},
      author={Avanti Shrikumar and Peyton Greenside and Anna Shcherbina and Anshul Kundaje},
      year={2017},
      eprint={1605.01713},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/pdf/1605.01713}
}

@misc{denil2015extraction,
      title={Extraction of Salient Sentences from Labelled Documents},
      author={Misha Denil and Alban Demiraj and Nando de Freitas},
      year={2015},
      eprint={1412.6815},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/pdf/1412.6815.pdf}
}

@misc{webster2020measuring,
      title={Measuring and Reducing Gendered Correlations in Pre-trained Models},
      author={Kellie Webster and Xuezhi Wang and Ian Tenney and Alex Beutel and Emily Pitler and Ellie Pavlick and Jilin Chen and Slav Petrov},
      year={2020},
      eprint={2010.06032},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/pdf/2010.06032}
}

@article{arrieta2020explainable,
  title={Explainable Artificial Intelligence (XAI): Concepts, taxonomies, opportunities and challenges toward responsible AI},
  author={Arrieta, Alejandro Barredo and D{\'\i}az-Rodr{\'\i}guez, Natalia and Del Ser, Javier and Bennetot, Adrien and Tabik, Siham and Barbado, Alberto and Garc{\'\i}a, Salvador and Gil-L{\'o}pez, Sergio and Molina, Daniel and Benjamins, Richard and others},
  journal={Information Fusion},
  volume={58},
  pages={82--115},
  year={2020},
  publisher={Elsevier},
  url={https://arxiv.org/pdf/1910.10045.pdf}
}

@article{tsang2020does,
  title={How does this interaction affect me? Interpretable attribution for feature interactions},
  author={Tsang, Michael and Rambhatla, Sirisha and Liu, Yan},
  journal={arXiv preprint arXiv:2006.10965},
  year={2020},
  url={https://arxiv.org/pdf/2006.10965.pdf}
}

@misc{swayamdipta2020dataset,
      title={Dataset Cartography: Mapping and Diagnosing Datasets with Training Dynamics},
      author={Swabha Swayamdipta and Roy Schwartz and Nicholas Lourie and Yizhong Wang and Hannaneh Hajishirzi and Noah A. Smith and Yejin Choi},
      year={2020},
      eprint={2009.10795},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/pdf/2009.10795}
}

@article{han2020explaining,
  title={Explaining Black Box Predictions and Unveiling Data Artifacts through Influence Functions},
  author={Han, Xiaochuang and Wallace, Byron C and Tsvetkov, Yulia},
  journal={arXiv preprint arXiv:2005.06676},
  year={2020},
  url={https://arxiv.org/pdf/2005.06676.pdf}
}

@article{alammar2018illustrated,
  title={The illustrated transformer},
  author={Alammar, Jay},
  journal={The Illustrated Transformer--Jay Alammar--Visualizing Machine Learning One Concept at a Time},
  volume={27},
  year={2018},
  url={https://jalammar.github.io/illustrated-transformer/}
}

@misc{sundararajan2017axiomatic,
      title={Axiomatic Attribution for Deep Networks},
      author={Mukund Sundararajan and Ankur Taly and Qiqi Yan},
      year={2017},
      eprint={1703.01365},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/pdf/1703.01365}
}

@misc{strobelt2017lstmvis,
      title={LSTMVis: A Tool for Visual Analysis of Hidden State Dynamics in Recurrent Neural Networks},
      author={Hendrik Strobelt and Sebastian Gehrmann and Hanspeter Pfister and Alexander M. Rush},
      year={2017},
      eprint={1606.07461},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/pdf/1606.07461.pdf}
}

@inproceedings{dalvi2019neurox,
  title={NeuroX: A toolkit for analyzing individual neurons in neural networks},
  author={Dalvi, Fahim and Nortonsmith, Avery and Bau, Anthony and Belinkov, Yonatan and Sajjad, Hassan and Durrani, Nadir and Glass, James},
  booktitle={Proceedings of the AAAI Conference on Artificial Intelligence},
  volume={33},
  pages={9851--9852},
  year={2019},
  url={https://arxiv.org/pdf/1812.09359.pdf}
}

@article{de2020decisions,
  title={How do decisions emerge across layers in neural models? interpretation with differentiable masking},
  author={De Cao, Nicola and Schlichtkrull, Michael and Aziz, Wilker and Titov, Ivan},
  journal={arXiv preprint arXiv:2004.14992},
  year={2020},
  url={https://arxiv.org/pdf/2004.14992.pdf}
}

@inproceedings{morcos2018insights,
  title={Insights on representational similarity in neural networks with canonical correlation},
  author={Morcos, Ari and Raghu, Maithra and Bengio, Samy},
  booktitle={Advances in Neural Information Processing Systems},
  pages={5727--5736},
  year={2018},
  url={https://papers.nips.cc/paper/2018/file/a7a3d70c6d17a73140918996d03c014f-Paper.pdf}
}
@inproceedings{raghu2017svcca,
  title={Svcca: Singular vector canonical correlation analysis for deep learning dynamics and interpretability},
  author={Raghu, Maithra and Gilmer, Justin and Yosinski, Jason and Sohl-Dickstein, Jascha},
  booktitle={Advances in Neural Information Processing Systems},
  pages={6076--6085},
  year={2017},
  url={https://papers.nips.cc/paper/2017/file/dc6a7e655d7e5840e66733e9ee67cc69-Paper.pdf}
}

@incollection{hotelling1992relations,
  title={Relations between two sets of variates},
  author={Hotelling, Harold},
  booktitle={Breakthroughs in statistics},
  pages={162--190},
  year={1992},
  publisher={Springer}
}

@article{massarelli2019decoding,
  title={How decoding strategies affect the verifiability of generated text},
  author={Massarelli, Luca and Petroni, Fabio and Piktus, Aleksandra and Ott, Myle and Rockt{\"a}schel, Tim and Plachouras, Vassilis and Silvestri, Fabrizio and Riedel, Sebastian},
  journal={arXiv preprint arXiv:1911.03587},
  year={2019},
  url={https://arxiv.org/pdf/1911.03587.pdf}
}

@misc{holtzman2020curious,
      title={The Curious Case of Neural Text Degeneration},
      author={Ari Holtzman and Jan Buys and Li Du and Maxwell Forbes and Yejin Choi},
      year={2020},
      eprint={1904.09751},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/pdf/1904.09751.pdf}
}

@article{petroni2020context,
  title={How Context Affects Language Models' Factual Predictions},
  author={Petroni, Fabio and Lewis, Patrick and Piktus, Aleksandra and Rockt{\"a}schel, Tim and Wu, Yuxiang and Miller, Alexander H and Riedel, Sebastian},
  journal={arXiv preprint arXiv:2005.04611},
  year={2020},
  url={https://arxiv.org/pdf/2005.04611.pdf}
}

@misc{ribeiro2016whyribeiro2016why,
      title={"Why Should I Trust You?": Explaining the Predictions of Any Classifier},
      author={Marco Tulio Ribeiro and Sameer Singh and Carlos Guestrin},
      year={2016},
      eprint={1602.04938},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/pdf/1602.04938.pdf}
}

@misc{du2019techniques,
      title={Techniques for Interpretable Machine Learning},
      author={Mengnan Du and Ninghao Liu and Xia Hu},
      year={2019},
      eprint={1808.00033},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/pdf/1808.00033.pdf}
}

@article{carvalho2019machine,
  title={Machine learning interpretability: A survey on methods and metrics},
  author={Carvalho, Diogo V and Pereira, Eduardo M and Cardoso, Jaime S},
  journal={Electronics},
  volume={8},
  number={8},
  pages={832},
  year={2019},
  publisher={Multidisciplinary Digital Publishing Institute},
  url={https://www.mdpi.com/2079-9292/8/8/832/pdf}
}

@misc{durrani2020analyzing,
      title={Analyzing Individual Neurons in Pre-trained Language Models},
      author={Nadir Durrani and Hassan Sajjad and Fahim Dalvi and Yonatan Belinkov},
      year={2020},
      eprint={2010.02695},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/pdf/2010.02695}
}


</script>