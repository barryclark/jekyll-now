# Introduction

*Robustness* is a desirable property in a neural network. Informally,
robustness can be described as ‘resilience to perturbations in the
input’. Said differently, a neural network is robust if small changes to
the input produce small or no changes to the output. In particular, if
the network is a classifier, robustness means that inputs close to each
other should be assigned the same class by the network. Let us look at
an example.  
Suppose our network assigns class 0 (blue) to a reference input (thick
blue circle). A robust network would assign the same class (i.e. blue)
to all input points “close" to the reference point. In particular, a
robust network would not assign the class 1 (red) to any input close to
the reference point. In the figure below, case I shows a network that is
robust at the reference point while case II shows a network that is not
robust at the reference point.

<img src="../images/neural_network_verification_using_linear_programming/images/motivating example.png" alt="image" />

Ensuring robustness of networks is important because neural networks are
vulnerable to adversarial examples produced by small perturbations in
the input. E.g. small changes in the image of a chihuahua can lead a
network to classify it as a chocolate chip muffin.
https://www.freecodecamp.org/news/chihuahua-or-muffin-my-search-for-the-best-computer-vision-api-cbda4d6b425d/  
In the subsequent sections, we will make the notion of robustness more
precise. We will then explore how we can verify the robustness of a
*trained* neural network using a very popular idea from mathematical
optimization, viz. *Linear Programming*.

# Problem setup

Suppose we are given a *K-class classifier* fully connected, feed
forward neural network that was trained using the ReLU activation
function. Note that the weights and biases of this network are fixed.
Suppose the network accepts real vectors of length *n* as inputs. Then
we can represent the network as a classification function *F* given by:
ℝ<sup>*n*</sup> → {1, 2, ..., *K*}:
*F*(*x*<sub>0</sub>) = *l*<sub>0</sub>
where *l*<sub>0</sub> is the class label assigned to the input
*x*<sub>0</sub> by the network.

## *F* as a composition of functions

Let *W*<sub>*i*</sub> and *b*<sub>*i*</sub> represent the weight matrix
and the bias vector of the *i*th layer respectively. Then we can write
the output of the *i*th layer recursively as follows:
$$\\label{eq_nn_output_recursive}
\\begin{split}
    z\_{i} &= \\phi(W\_{i} z\_{i-1} + b\_{i})\\\\
    &= \\phi \\circ \\omega_i(z\_{i - 1})
\\end{split}$$

where *ω*<sub>*i*</sub> represents the affine transformation
corresponding to the *i*th layer and *ϕ* represents the "vectorized"
version of the activation function i.e.
*ϕ*(*x*<sub>1</sub>,...,*x*<sub>*n*</sub>) = (*ϕ*(*x*<sub>1</sub>),...,*ϕ*(*x*<sub>*n*</sub>))

We can then describe the network output function
*f*<sub>*W*</sub> : ℝ<sup>*n*</sup> → ℝ<sup>*K*</sup> as follows:
*f*<sub>*W*</sub>(*x*) = *ϕ* ∘ *ω*<sub>*H* + 1</sub> ∘ … ∘ *ϕ* ∘ *ω*<sub>1</sub>(*x*)

where *H* is the number of hidden layers in the network. Now we can
define a labeling function *π* : ℝ<sup>*K*</sup> → {1, 2, ..., *K*} as
follows:
*π*(*y*) = arg max<sub>*i* = 1, ..., *K*</sub>*y*<sub>*i*</sub>

where *K* is the number of classes. The labeling function *π* selects
the index of the component with the largest value in the output vector
*y*. For a given input *x*<sub>0</sub> to our classifier network, we
have:
*F*(*x*<sub>0</sub>) = *π*(*f*<sub>*W*</sub>(*x*<sub>0</sub>) = *l*<sub>0</sub>

with *l*<sub>0</sub> ∈ {1, 2, ..., *K*}. It is worth noting that we can
use a different labeling function here, e.g. *softmax*, without
affecting our analysis as long as the labeling function of choice is
non-decreasing.  
<img src="images/pi_fw.png" alt="image" />

## Partitioning the co-domain of *f*<sub>*W*</sub>

Suppose we have *K* class labels. Then our network must output a real
vector of length *K*. Hence, the co-domain of the output function is
fixed to be ℝ<sup>*K*</sup>, regardless of what the actual output
function *f*<sub>*W*</sub> is.  
Now, consider the set ℋ<sub>*l* \> *i*</sub> of all the points in
ℝ<sup>*K*</sup> where the *l*th component is greater than the *i*th
component.
ℋ<sub>*l* \> *i*</sub> := {*y* ∈ ℝ<sup>*K*</sup> : *y*<sub>*l*</sub> \> *y*<sub>*i*</sub>}

Note that ℋ<sub>*l* \> *i*</sub> is a *half-space*. Suppose we fix *l*
and take the intersection of all half-spaces ℋ<sub>*l* \> *i*</sub>,
*i* ≠ *l*. We get the set *S*<sub>*l*</sub> of points where the *l*th
component is greater than every other component.
$$\\label{eq_S\_l}
\\begin{split}
    S_l :=& \\bigcap\_{i \\ne l} \\mathcal{H}\_{l \> i}\\\\
         =& \\{y \\in \\mathbb{R}^K: y_l \> y_i, i \\ne l\\}
\\end{split}$$
The set *S*<sub>*l*</sub> is called the *polyhedron induced by the class
label *l**. For the sake of simplicity, we will assume that there are no
ties among the components of *y*, i.e.
*i* ≠ *j* ⟹ *y*<sub>*i*</sub> ≠ *y*<sub>*j*</sub>. Note that the set of
points where *y*<sub>*i*</sub> = *y*<sub>*j*</sub>, for some *i* and
*j*, is a zero Lebesgue measure set and doesn’t have a substantial
effect on our analysis. In fact, the above assumption can be relaxed
with very little modification to our argument. Now we make a few
observations:

-   *S*<sub>*l*</sub> is an intersection of half-spaces and is therefore
    a *polyhedron*.

-   *S*<sub>*i*</sub>⋂*S*<sub>*j*</sub> = ∅ for *i* ≠ *j*.

-   $\\bigcup\_{i = 1}^K S_i$ fills up (almost) all of ℝ<sup>*K*</sup>
    (only leaving out a zero Lebesgue measure set which can be ignored
    for the sake of simplicity)

In other words, the co-domain of the neural network output function can
be partitioned into polyhedra induced by the class labels. Now we come
the the main result of this section.

<div class="proposition">

**Proposition 1** (*The image of an input lies inside an induced
polyhedron*). *Let *x*<sub>0</sub> ∈ ℝ<sup>*n*</sup> be an input to a
classifier network with classification function *F*, output function
*f*<sub>*W*</sub> and the labeling function *π*. Then,
*F*(*x*) = *l* ⇔ *f*<sub>*W*</sub>(*x*) ⊂ *S*<sub>*l*</sub>
*

</div>

<div class="proof">

*Proof.* Let *y* := *f*<sub>*W*</sub>(*x*). Then *l* = *π*(*y*). By
definition of *π* (see <a href="#eq_pi" data-reference-type="ref"
data-reference="eq_pi">[eq_pi]</a>), *l* is the index of the largest
component of *y*. Also, from the definition of *S*<sub>*l*</sub> (see
<a href="#eq_S_l" data-reference-type="ref"
data-reference="eq_S_l">[eq_S_l]</a>), we know that *S*<sub>*l*</sub> is
the set of all points where the largest component is *l*. Hence we
conclude that
*y* ∈ *S*<sub>*l*</sub> ⟹ *f*<sub>*W*</sub>(*x*) ∈ *S*<sub>*l*</sub>.
The proof in the opposite direction uses the same argument. ◻

</div>

<img src="images/pi_maps_Si_to_i.png" style="width:100.0%"
alt="image" />

## Formalizing robustness for classifier networks

Recall that we say a classifier network is robust if small perturbations
to an input do not affect its classification. Let us define a set that
contains all ‘small’ perturbations of the reference input
*x*<sub>0</sub>. We will call this set the *region of interest*.

<div class="definition">

**Definition 1**. The set *χ* ⊂ ℝ<sup>*n*</sup> given by
*χ* := ℬ<sub>∞</sub>(*x*<sub>0</sub>,*ϵ*) = {*x* :  ∥ *x* − *x*<sub>0</sub>∥<sub>∞</sub> ≤ *ϵ*}
is called the *region of interest*.

</div>

For our network to be robust, it must assign the same class to all
points in *χ* i.e. *F*(*x*) = *F*(*x*<sub>0</sub>) = *l*<sub>0</sub> for
all *x* ∈ *χ*, which is equivalent to saying
*f*<sub>*W*</sub>(*x*) ∈ *S*<sub>*l*<sub>0</sub></sub> for all *x* ∈ *χ*
(see <a href="#eq_l0_means_image_inside_Sl0" data-reference-type="ref"
data-reference="eq_l0_means_image_inside_Sl0">[eq_l0_means_image_inside_Sl0]</a>).
In other words, we want the image of the region of interest, *χ*, to lie
inside *S*<sub>*l*<sub>0</sub></sub>, the polyhedron induced by
*l*<sub>0</sub>. The verification problem then reduces to asking the
below set membership question:
$$f_W(\\chi) \\stackrel{?}{\\subset} S\_{l_0}$$

We are now ready to give a formal definition of robustness.

<div class="definition">

**Definition 2** (*ϵ*-robustness). We say that a neural network is
*ϵ*-robust at *x*<sub>0</sub> if and only if
*f*<sub>*W*</sub>(ℬ<sub>∞</sub>(*x*<sub>0</sub>,*ϵ*)) ⊂ *S*<sub>*l*<sub>0</sub></sub>

</div>

<div class="definition">

**Definition 3** (Adversarial example). A point
$\\Tilde{x} \\in \\mathbb{R}^n$ is said to be an *adversarial example*
if
$$\\Tilde{x} \\in \\mathcal{B}\_\\infty (x_0, \\epsilon),\\ \\ f_W(\\Tilde{x}) \\notin S\_{l_0}$$

</div>

The two-class classifier network shown in the figure below is not
*ϵ*-robust at *x*<sub>0</sub> since $\\Tilde{x}$ is an adversarial
example.

<img src="images/adversarial_example.png" style="width:100.0%"
alt="image" />

## Verification as an optimization problem

Recall that, given a trained *H*-hidden-layer neural network with the
output function *f*<sub>*W*</sub>, a reference input point
*x*<sub>0</sub> and a positive *ϵ*, we want to answer the following
question:
$$f_W(\\mathcal{B}\_\\infty(x_0, \\epsilon)) \\stackrel{?}{\\subset} S\_{l_0}$$
Or, equivalently,
$$\\label{eq_exists_adv_ex}
    \\stackrel{?}{\\exists} \\Tilde{x} \\in \\mathcal{B}\_\\infty(x_0, \\epsilon)\\ s.\\ t.\\ f_W(\\Tilde{x}) \\notin S\_{l_0}$$

Before moving forward, we introduce some notation for convenience. Let
$\\Tilde{z_i}$ denote the pre- and *z*<sub>*i*</sub> denote the
post-activation output of the *i*th layer of the network. In other words

$$\\label{eq_z\_i_z\_i_hat}
    \\begin{split}
        \\Tilde{z_i} &= W_i z\_{i -1} + b_i ,\\qquad i = 1, ..., H + 1\\\\
        z_i &= ReLU(\\Tilde{z_i}), \\qquad i = 1, ..., H + 1
    \\end{split}$$
In particular, note that
*z*<sub>*H* + 1</sub> = *f*<sub>*W*</sub>(*z*<sub>0</sub>). Using the
above notation, (<a href="#eq_exists_adv_ex" data-reference-type="ref"
data-reference="eq_exists_adv_ex">[eq_exists_adv_ex]</a>) can be posed
as a satisfiability problem in optimization.

<div class="subequations">

<span id="eq_opt1" label="eq_opt1"></span>
$$\\begin{aligned}
    &\\text{Find}\\ z_0\\\\
    \\text{s.t.}\\ &z_0 \\in \\mathcal{B}\_\\infty(x_0, \\epsilon) \\label{eq_region_const}\\\\
    &z\_{H+1} = f_W(z_0) \\label{eq_network_const}\\\\
    &z\_{H+1} \\notin S\_{l_0} \\label{eq_safety_set_const}\\end{aligned}$$

</div>

where *z*<sub>0</sub> ∈ ℝ<sup>*n*</sup> and
*z*<sub>*H* + 1</sub> ∈ ℝ<sup>*K*</sup> are the decision variables. Note
that if (<a href="#eq_opt1" data-reference-type="ref"
data-reference="eq_opt1">[eq_opt1]</a>) is feasible then our network is
not robust. Conversely, if (<a href="#eq_opt1" data-reference-type="ref"
data-reference="eq_opt1">[eq_opt1]</a>) is infeasible then our network
is robust. As it turns out,
*(<a href="#eq_opt1" data-reference-type="ref"
data-reference="eq_opt1">[eq_opt1]</a>) is not a convex optimization
problem*. This is because, while the *region of interest constraint*
(<a href="#eq_region_const" data-reference-type="ref"
data-reference="eq_region_const">[eq_region_const]</a>) is convex, the
*network constraint*
(<a href="#eq_network_const" data-reference-type="ref"
data-reference="eq_network_const">[eq_network_const]</a>) and the
*safety set constraint*
(<a href="#eq_safety_set_const" data-reference-type="ref"
data-reference="eq_safety_set_const">[eq_safety_set_const]</a>) are not
convex. Below, we replace these non-convex constraints with their convex
approximations.  
**Convexifying the network constraint.** Note that
(<a href="#eq_network_const" data-reference-type="ref"
data-reference="eq_network_const">[eq_network_const]</a>) is not a
convex constraint because *f*<sub>*W*</sub> is not a convex function.
However, we know that *f*<sub>*W*</sub> is *piece-wise affine*. Suppose
we can find a convex set *χ*′ ⊂ ℝ<sup>*n*</sup>, such that
*f*<sub>*W*</sub> is affine on *χ*′. Then, we can replace
<a href="#eq_network_const" data-reference-type="ref"
data-reference="eq_network_const">[eq_network_const]</a> with the
following convex approximation:
*z*<sub>*H* + 1</sub> = *f*<sub>*W*</sub>\|<sub>*χ*′</sub>(*z*<sub>0</sub>)
where *f*<sub>*W*</sub>\|<sub>*χ*′</sub> is the restriction of
*f*<sub>*W*</sub> to *χ*′. But how do we even begin to look for such a
*χ*′? As a starting point, it is helpful to note that we want
*χ*′⋂ℬ<sub>∞</sub>(*x*<sub>0</sub>,*ϵ*) to be non-empty. This is to
ensure that <a href="#eq_network_const_aff" data-reference-type="ref"
data-reference="eq_network_const_aff">[eq_network_const_aff]</a> above
does not conflict with
<a href="#eq_region_const" data-reference-type="ref"
data-reference="eq_region_const">[eq_region_const]</a>. Said
differently, we want *χ*′ to contain *x*<sub>0</sub> as well as points
that are “close” to *x*<sub>0</sub>. We will use this idea to find the
desired *χ*′.  
Observe that as our reference input *x*<sub>0</sub> propagates through
the network, it causes some neurons to be “activated” in each layer
while others remain inactive. For a given input this activation pattern
is fixed. Now, the main idea is that *points that are close to
*x*<sub>0</sub> are likely to produce the same activation pattern as
*x*<sub>0</sub>*. So, it might be useful to look for a set that contains
all inputs that produce the same activation pattern as *x*<sub>0</sub>.
Using the notation introduced in
(<a href="#eq_z_i_z_i_hat" data-reference-type="ref"
data-reference="eq_z_i_z_i_hat">[eq_z_i_z_i_hat]</a>), the pre- and
post-activation outputs of the *i*th layer produced by our reference
input *x*<sub>0</sub> are
$$\\begin{split}
        \\Tilde{x}\_i &= W_i {x}\_{i-1} + b_i\\\\
        {x}\_i &= ReLU(\\Tilde{x}\_i)
    \\end{split}$$
We say that the *j*th neuron in the *i*th layer is *activated* by the
reference input *x*<sub>0</sub> if the *j*th component of
*x*<sub>*i*</sub> is positive, i.e.
(*x*<sub>*i*</sub>)<sub>*j*</sub> \> 0. Also, note that
$$(x_i)\_j \> 0 \\iff (\\Tilde{x}\_i)\_j \> 0$$
The activation status of the *j*th neuron in the *i*th layer can then be
described by a binary constant
$$\\delta\_{i,j} =
    \\begin{cases}
        1 \\quad\\text{if}\\ (\\Tilde{x}\_i)\_j \> 0\\\\
        0 \\quad\\text{if}\\ (\\Tilde{x}\_i)\_j \\le 0
    \\end{cases}$$
The activation pattern of the *i*th layer can then be expressed
succinctly by the following *d*<sub>*i*</sub> × *d*<sub>*i*</sub>
diagonal matrix
$$\\Delta_i :=
    \\begin{pmatrix}
        \\delta\_{i,1} & 0 & 0 & 0 & 0\\\\
        0 & \\delta\_{i,2} & 0 & 0 & 0\\\\
        \\vdots & \\vdots & \\vdots & \\vdots & \\vdots\\\\
        0 & 0 & 0 & 0 & \\delta\_{i,d_i}\\\\
    \\end{pmatrix}$$
where *d*<sub>*i*</sub> is the number of neurons in the *i*th layer.
Note that the linear operator
*Δ*<sub>*i*</sub> : ℝ<sup>*d*<sub>*i*</sub></sup> → ℝ<sup>*d*<sub>*i*</sub></sup>
is nothing but a projection map.  
Now, recall the definition of the network output function
*f*<sub>*W*</sub> given in
(<a href="#eq_output_func" data-reference-type="ref"
data-reference="eq_output_func">[eq_output_func]</a>) where *ϕ* is
chosen to be *R**e**L**U*. Suppose we were to replace the composition
*ϕ* ∘ *ω*<sub>*i*</sub> with the composition
*Δ*<sub>*i*</sub> ∘ *ω*<sub>*i*</sub> in
(<a href="#eq_output_func" data-reference-type="ref"
data-reference="eq_output_func">[eq_output_func]</a>). The resulting
output function, *f*<sub>*W*<sub>0</sub></sub>, is given by
*f*<sub>*W*<sub>0</sub></sub> = *Δ*<sub>*H* + 1</sub> ∘ *ω*<sub>*H* + 1</sub> ∘ … ∘ *Δ*<sub>1</sub> ∘ *ω*<sub>1</sub>
We make some important observations about *f*<sub>*W*<sub>0</sub></sub>.

1.  *f*<sub>*W*<sub>0</sub></sub> is an affine function

2.  *f*<sub>*W*<sub>0</sub></sub>(*z*) = *f*<sub>*W*</sub>(*z*) for
    every *z* that produces the same activation pattern as
    *x*<sub>0</sub>.

The first point follows from the fact that *f*<sub>*W*<sub>0</sub></sub>
is a composition of affine functions. The second point follows from the
fact that, in computing the network output,
*f*<sub>*W*<sub>0</sub></sub> only considers neurons that were activated
by the reference input *x*<sub>0</sub> and ignores all other neurons (do
you see why?). From the above observations, is seems that a good
candidate for *χ*′ may be:
$$\\begin{split}
     \\chi' &= \\{z \\in \\mathbb{R}^n : z\\ \\text{produces the same activation pattern as } x_0 \\}\\\\
     &= \\{z \\in \\mathbb{R}^n: f_W(z) = f\_{W_0}(z)\\}
\\end{split}$$
So, finding *χ*′ simply reduces to solving the equation
$$\\begin{split}
    f_W(z) &= f\_{W_0}(z)\\\\
    \\phi \\circ \\omega\_{H+1} \\circ \\dots \\circ \\phi \\circ \\omega_1(z) &= \\Delta\_{H+1} \\circ \\omega\_{H+1} \\circ \\dots \\circ \\Delta_1 \\circ \\omega_1(z)
\\end{split}$$
which can be written as
*ϕ* ∘ *ω*<sub>*i*</sub>(*z*<sub>*i* − 1</sub>) = *Δ*<sub>*i*</sub> ∘ *ω*<sub>*i*</sub>(*z*<sub>*i* − 1</sub>) , *i* = 1, ..., *H* + 1
which is equivalent to solving for *z*<sub>0</sub> in
*R**e**L**U*(*W*<sub>*i*</sub>*z*<sub>*i* − 1</sub>+*b*<sub>*i*</sub>) = *Δ*<sub>*i*</sub>(*W*<sub>*i*</sub>*z*<sub>*i* − 1</sub>+*b*<sub>*i*</sub>) , *i* = 1, ..., *H* + 1
Solving (<a href="#eq_ReLU_equals_Delta" data-reference-type="ref"
data-reference="eq_ReLU_equals_Delta">[eq_ReLU_equals_Delta]</a>)
directly is hard. Fortunately,
(<a href="#eq_ReLU_equals_Delta" data-reference-type="ref"
data-reference="eq_ReLU_equals_Delta">[eq_ReLU_equals_Delta]</a>) has
the below equivalent affine formulation.
(2*Δ*<sub>*i*</sub>−*I*)(*W*<sub>*i*</sub>*z*<sub>*i* − 1</sub>+*b*<sub>*i*</sub>) ≥ 0 , *i* = 1, ..., *H* + 1
It can be shown that every
*z*<sub>0</sub>, *z*<sub>1</sub>, ..., *z*<sub>*H* + 1</sub> that is a
solution to (<a href="#eq_ReLU_equals_Delta" data-reference-type="ref"
data-reference="eq_ReLU_equals_Delta">[eq_ReLU_equals_Delta]</a>) is
also a solution to (<a href="#eq_affine_equiv" data-reference-type="ref"
data-reference="eq_affine_equiv">[eq_affine_equiv]</a>) and vice-versa
(see proof in appendix). Moreover, for any *z* that satisfies
(<a href="#eq_affine_equiv" data-reference-type="ref"
data-reference="eq_affine_equiv">[eq_affine_equiv]</a>), we have
$$ReLU(\\Tilde{z}\_i) = \\Delta_i \\Tilde{z}\_i$$
