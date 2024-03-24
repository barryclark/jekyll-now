---
layout: post
author:
- 'Wild Boar \[trevorgeek@gmail.com\]'
title: ' [article] The Internal State of a CNN-like Classifier'
usemathjax: true
category: post
---

_Hypothesis: It is possible, in at least in some straightforward cases, to populate a CNN-like structure with a state that is intelligible from an analysis point of view._

## 1. Introduction ##

Currently, the state-of-the-art (SOTA) approach for image classification is Convolutional Neural Networks (CNN) [[10]](#li2021survey). Unfortunately, the impressive performance of a CNN comes at a cost; its underlying model is essentially a black box [[11]](#liang2021explaining) (meaning that it is generally unintelligible to humans). This makes it challenging to evaluate CNN systems for correctness. It can also be quite difficult to reuse, debug, or update the models of CNN systems.

This article is the first in a series of investigations to discover the qualities that make CNN systems such an effective tool for classification. If some (or all)  of the CNN "secret sauce" is found, the next challenge could be to transfer this into a significantly more intelligible system. Our approach (across multiple articles) will involve implementing increasingly complicated CNN explanatory models that can then be compared to the performance of actual CNN systems to determine their validity. If high performance can be achieved using an explanatory model, this will go a long way towards our goal.

Naturally, the critical focus of _our_ solution will be on its transparency (a solution with intelligible internal states), with the idea that this will be useful for formulating clear explanations as to why the proposed ideas are working or failing.

Finally, it should be pointed out that this article often refers to the notion of a *feature* in images. In this context, a feature is _some_ sub-patterns within images. This can be a small _local pattern_, such as a corner, or something more complex and abstract, such as the pixels of high response when a software frequency filter is applied to the image data.

## 2. Problem Description ##
<a name="sec_problem_definition"></a>

In this work, it was decided to focus on image classification problems. While many different problem types are suitable, we chose the problem of discriminating between images of triangles and images of squares (with no real rationale other than that corner features seemed intuitive to focus on, and both squares and triangles have corners). It was decided to make the images "black and white" to avoid extra complexity around color. To add variety, the images were rotated about the center and scaled (with a variance of about 10 pixels) to have subtly different sizes (both choices were arbitrary). The images were $210 \times 210$ pixels (again, this number was arbitrarily selected).

![_config.yml]({{ site.baseurl }}/images/Intelligible-1/triangle.jpg){: width="550"}\
<span style="font-size: x-small">Figure 1: A selection of the various triangle images within the database.</span>

![_config.yml]({{ site.baseurl }}/images/Intelligible-1/square.jpg){: width="550"}\
<span style="font-size: x-small">Figure 2: A selection of the various square images within the database.</span>

Several approaches exist to solving such a problem (using traditional computer vision techniques). One approach would be a "whole image" template matching with rotation invariance [[5]](#fredriksson2001rotation). Other strategies involve discovering _features_ within images such as edges [[15]](#ziou1998edge) or corners [[13]](#mehrotra1990corner) and using the feature count as a discriminator.

## 3. Methodology ##
 
<a name="fig_cnn"></a>
![_config.yml]({{ site.baseurl }}/images/Intelligible-1/CNN.jpg){: width="550"}\
<span style="font-size: x-small">Figure 3: A Convolutional Neural Network (CNN) for image classification.</span>

[Figure 3](#fig_cnn) depicts the structure of a typical CNN for image classification. This is the structure whose internal state we are trying to "explain". It takes an image to be classified as an input and outputs a classification. The processing to arrive at the classification begins by passing the image through several layers of convolutional filters (explained below). Each layer applies several filters to the image to produce several responses. This set of responses is then combined and sub-sampled (preserving the most prominent outputs from filtering) into a singular result for the layer. As the image proceeds down the layers, it becomes increasingly smaller with increasingly more complex compound filter responses. The final output is then flattened (converted to a 1D vector) to serve as an image __descriptor__. This descriptor is then passed to a traditional (fully connected) artificial neural network (ANN), which performs the final classification.

The weights that comprise the convolutional filters and nodes in the ANN are acquired during training (the processing of fitting the model to a sample dataset) through a process known as back-propagation. Back-propagation is a process of propagating errors down the network layers to correct weights contributing to those errors.

Our implementation aims to attempt to maintain the structure of the CNN depicted in [figure 3](#fig_cnn) but to formulate it so that the model's internal state is intelligible. To control the internal state, we will attempt to manually populate the state with a solution rather than using the traditional training with back-propagation processes to achieve this.

The following [section 4](#subsec:explainable) outlines the steps that we have made to make our model intelligible. We then outline how the state was configured to perform classification in the problem defined in [section 2](#sec:problem_definition).

### 3.1 Make it Explainable ### 
<a name="subsec:explainable"></a>

This covers modifications we made to the typical CNN structure to make the internal state of the network more explainable. Two main changes were made. The first was to convert the convolution filters into matching templates. The second was to replace the ANN at the end of the process with a more "transparent" classifier.

#### 3.1.1 Convolution Filtering ####
<a name="subsubsec_convolution"></a>

[Figure 3](#fig_cnn) shows that the first layers of the classifier are banks of convolution filters [[14]](#stein2011fourier). So, what is convolution? It is the operation of "applying" a filter $F$ to a signal $S$, typically boosting some frequency signals and dampening others. The filter $F$ is called a __filter__ because it is used in \textit{signal processing} (with the convolution operation) to "filter out" some of the frequency range, for example, __high-pass filters__ and __low-pass filters__. Convolution is also used in __image processing__ [[9]](#kim2013applications), where the image $I$ data is viewed as a 2D signal, in which a spatial dimension replaces the time dimension. Images $I$ are also discrete entities, so the formulation for convolution in image processing is typically converted to a discrete form, such as

$$
   [F * I](u,v) = \sum_{i=-k}^k \sum_{j=-k}^k F(i,j)I(u-i,v-j) \ \ \ \ [1]
$$

<a name="eqn_convolution"></a>

The symbol for the convolution operation is $*$. [Equation 1](#eqn_convolution) specifies that given the convolution $F * I$ between filter $F$ and image $I$, the response at pixel $[u,v]^{\top}$ is the sum of the weights in filter $F$ at location $[i,j]^{\top}$ multiplied by corresponding pixels $[u-i, v-j]^{\top}$ in the image $I$ in the range of $[-k,k]$ for both $i$ and $j$. 

In image processing, the $F$ resembles a small "image" (a single channel 2D array of weights), and the chosen weights determine the filter's filtering effect on the image $I$. For example, one such filter $F$ is called the Sobel filter $F_s$ (see [figure 4](#tab_sobel)).

![_config.yml]({{ site.baseurl }}/images/Intelligible-1/sobel.png){: width="150"}\
<span style="font-size: x-small">Figure 4: A Sobel filter for detecting high-frequency changes in the x-direction within an image. It is formulated as a 2D array of weights.</span>
<a name="tab_sobel"></a>

![_config.yml]({{ site.baseurl }}/images/Intelligible-1/sobel_gx.png){: width="500"}\
<span style="font-size: x-small">Figure 5: An example of the x-direction Sobel filter response after convolution. The image on the left is the original, the center shows the filter, and the right shows the response.</span>
<a name="fig_sobel"></a>

The main problem with convolution filters is that the filter's effect is not always immediately apparent from the filter $F$ itself (see [figure 6](#fig_sinc)). Naturally, there are ways of establishing the impact, such as applying the filter $F$ to the image $I$ to see what "it does". Or one could determine the response in the _frequency domain_ by calculating the Fourier Transform [[12]](#lu1989algorithms). However, it would be great to achieve this by observing the filter $F$, which is usually unnatural unless the observer has seen enough filters to start using their experience to predict outcomes.

![_config.yml]({{ site.baseurl }}/images/Intelligible-1/sinc.png){: width="500"}\
<span style="font-size: x-small">Figure 6: The sinc function ($sinc(x) = sin(x) / x$), in the context of convolution, this filter is called the "box filter". In the figure, the sinc function is plotted at the top, and its response in the frequency domain is plotted at the bottom. When applied to a convolution signal, the frequencies are only retained in a particular range. However, this is typically not immediately obvious to the novice observer when looking at the function.</span>
<a name="fig_sinc"></a>

The solution proposed in this article is to try and find an alternative approach to filtering that achieves the same goal. The convolutional filters' operation in a CNN is postulated to be feature extraction (features are defined in [section 2](#sec_problem_definition)). Therefore, we are looking for an alternative "filtering" approach that extracts features from images but operates in the image domain rather than the frequency domain (which is why convolution filters are more obscure).

It turns out that convolutional is quite similar to another operation called \textit{cross-correlation}. The formulation for cross-correlation is as follows

$$
    [F \otimes I](u,v) = \sum_{i=-k}^k \sum_{j=-k}^k F(i,j)I(u+i,v+j)  \ \ \ \ [2]
$$

<a name="eqn_cross_correlation"></a>

The symbol for the cross-correlation operation is $\otimes$. As can be seen, in comparison to [equation 1](#eqn_convolution), [equation 2](#eqn_cross_correlation) is almost the same, except that the order of the pixels being multiplied together is reversed. 

Cross-correlation is also used in image processing. However, it is used in template matching~\cite{briechle2001template}. Template matching is when a larger image is expected to contain a smaller sub-image (called a template). The process is a systematic search in which the template is placed at each pixel within the image, and a score is calculated based on how well the template matches the local neighborhood of the pixel. If the score is within some threshold, a match is recorded. See [figure 7](#fig_template_matching).

![_config.yml]({{ site.baseurl }}/images/Intelligible-1/template_matching.png){: width="500"}\
<span style="font-size: x-small">Figure 7: An illustration of template matching. Here, the "template" is an image of a diamond. Each pixel within the image is systematically checked to see how well the template "fits" in that location. Areas of good fit are recorded as matches.</span>
<a name="fig_template_matching"></a>

In template matching, the template is equivalent to the convolutional filter. However, this article proposes templates because they are more intuitive since they "look" like the feature to match. Of course, cross-correlation is one \textit{scoring} scheme commonly used to compare templates; others are the Sum of Square Differences (SSD) and the Sum of Absolute Differences (SAD).  

#### 3.1.2 Classification Logic ####

The first part of the CNN is a set of convolutional filter layers that transform an image into a feature-based image descriptor. In the previous section [section 3.1.1](#subsubsec_convolution), we proposed replacing this set of convolutional filters with layers of template matching to have a more intelligible state in the network. The next part of the network uses the image descriptor to classify the image. A standard Artificial Neural Network (ANN) is the usual tool for achieving this. However, the fact that an ANN is a "black box" goes against the spirit of this work. Fortunately, there exists a set of more transparent machine-learning algorithms, including Bayesian Learning [[4]](#ch1997bayesian), Rule-base learning [[6]](#furnkranz2015brief) and Decision Trees [[8]](#kamiran2010discrimination). The downside of these approaches is that they are often too simplistic to encode complicated models. However, concerning the problem, it is felt that these approaches should serve the purpose.  


## Reference ##

<a name="amari1993backpropagation"></a> [1] Amari, Shun-ichi. 1993. "Backpropagation and Stochastic Gradient Descent Method." *Neurocomputing* 5 (4-5): 185--96.

<a name="bradski2000opencv"></a> [2] Bradski, Gary. 2000. "The openCV Library." *Dr. Dobb's Journal: Software Tools for the Professional Programmer* 25 (11): 120--23.

<a name="briechle2001template"></a> [3] Briechle, Kai, and Uwe D Hanebeck. 2001. "Template Matching Using Fast Normalized Cross Correlation." In *Optical Pattern Recognition Xii*, 4387:95--102. SPIE.

<a name="ch1997bayesian"></a> [4] Ch, Read, and ML MAP. 1997. "Bayesian Learning." *Book: Machine Learning. McGraw-Hill Science/Engineering/Math*, 154--200.

<a name="fredriksson2001rotation"></a> [5] Fredriksson, Kimmo. 2001. "Rotation Invariant Template Matching." *PhD Thesis*.

<a name="furnkranz2015brief"></a> [6] Fürnkranz, Johannes, and Tomáš Kliegr. 2015. "A Brief Overview of Rule Learning." In *International Symposium on Rules and Rule Markup Languages for the Semantic Web*, 54--69. Springer.

<a name="wildboardevGeneratingSimple"></a> [7] Gee, Trevor. 2022. "Generating Simple C++ Functions with Genetic Programming --- Wildboar-Dev.github.io."
<https://wildboar-dev.github.io/SimpleGP/>.

<a name="kamiran2010discrimination"></a> [8] Kamiran, Faisal, Toon Calders, and Mykola Pechenizkiy. 2010.
"Discrimination Aware Decision Tree Learning." In *2010 Ieee
International Conference on Data Mining*, 869--74. IEEE.

<a name="kim2013applications"></a> [9] Kim, Sung, and Riley Casper. 2013. "Applications of Convolution in Image
Processing with Matlab." *University of Washington*, 1--20.

<a name="li2021survey"></a> [10] Li, Zewen, Fan Liu, Wenjie Yang, Shouheng Peng, and Jun Zhou. 2021. "A
Survey of Convolutional Neural Networks: Analysis, Applications, and
Prospects." *IEEE Transactions on Neural Networks and Learning Systems*.

<a name="liang2021explaining"></a> [11] Liang, Yu, Siguang Li, Chungang Yan, Maozhen Li, and Changjun Jiang. 2021. "Explaining the Black-Box Model: A Survey of Local Interpretation Methods for Deep Neural Networks." *Neurocomputing* 419: 168--82.

<a name="lu1989algorithms"></a> [12] Lu, RTMAC. 1989. *Algorithms for Discrete Fourier Transform and
Convolution*. Springer.

<a name="mehrotra1990corner"></a> [13] Mehrotra, Rajiv, Sanjay Nichani, and Nagarajan Ranganathan. 1990.
"Corner Detection." *Pattern Recognition* 23 (11): 1223--33.

<a name="stein2011fourier"></a> [14] Stein, Elias M, and Rami Shakarchi. 2011. *Fourier Analysis: An
Introduction*. Vol. 1. Princeton University Press.

<a name="ziou1998edge"></a> [15] Ziou, Djemel, Salvatore Tabbone, and others. 1998. "Edge Detection
Techniques-an Overview." *Pattern Recognition and Image Analysis C/C of
Raspoznavaniye Obrazov I Analiz Izobrazhenii* 8: 537--59.