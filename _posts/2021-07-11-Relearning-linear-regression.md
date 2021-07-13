## Why write this?

I recently realized that I didn't understand linear regression as well as I thought as I did when I came across this [twitter thread](https://twitter.com/lightspringfox/status/1412581659745001474).

![twitter thread image](https://user-images.githubusercontent.com/1283020/125213633-ebc50a80-e267-11eb-8ddc-b8d8b9c9aea7.png)

Okay, I thought, so maybe I don't know _exactly_ how to do it with linear algebra but I intuitively know how to draw a best fit for a set of points, so I should be able to work from there and develop a more rigorous algorithm of what I'm doing by intuition.

For example, for this set of points, what line would you draw? 

![data points](https://user-images.githubusercontent.com/1283020/125375441-e508c700-e33d-11eb-91f7-31c8fb0d328c.png)

I'd draw a line looking like this

![my line fit](https://user-images.githubusercontent.com/1283020/125375730-6eb89480-e33e-11eb-96e2-638cb8a93305.png)

Except that's not correct if you're using least squares. This is the correct fit.

![correct line fit](https://user-images.githubusercontent.com/1283020/125375825-94de3480-e33e-11eb-985d-56ee11efe284.png)

Oh. Oops. Looks like I need to learn linear regression beyond just importing scikit-learn.

It's pretty easy to google for basic blog posts about linear regression, so why am I writing another one? Well, for one, it's helping me to consolidate my learnings into notes. But also, I found the blogs to be unsatisfactory in giving me a deep understanding. I didn't just want to see know how to solve the least squares problem, I wanted to know _why_ the "how" worked. 

I'll try to cite the blogs and stackexchange posts that I came across and relied on as I built up my understanding. I've also included them at the end.

The tweet talks about the least squares problem, but I'm going to focus on just the linear least squares problem. It seems like there are two approaches to solving the problem. One approach defines a cost function that describes how good/bad the model is, and then minimizes that cost function. The other approach uses linear algebra to project the data onto a line. This is the one I struggled to develop an intuition for, because the approach never explicitly uses a cost function or derivative, so it wasn’t clear to me how a solution could just “emerge”.

## What went wrong with my drawing?

Going back to my poor line of fit: I drew the line which minimizes the euclidean distance between the points and the line, but that's not actually useful for prediction (in typical cases).
That's because if I'm given an input, I want to guess the output for _that_ input. We're _given_ the X value, so we're not trying to change anything related to that. But when we do the euclidean distance minimization,
then you _do_ change the X value. So that's kind of silly (again, in typical cases). So since we want to _only_ change the Y value,
that means we're changing the vertical value of the point, or in other words, minimizing the vertical distance. Which ends up being the least squares formula.

### Calculus approach

### Linear algebra approach

Like I said, I struggled to intuitively understand this approach. Defining a cost function and minimizing it made sense to me. You can start with a terrible fit and optimize it.
But I couldn't understand how you could just "get" the optimal solution in a closed form formula that didn't involve any derivatives (or even the cost function!). [This post](https://medium.com/@andrew.chamberlain/the-linear-algebra-view-of-least-squares-regression-f67044b7f39b)
was the first one I looked at that introduced the linear algebra solution. Even though the logic is sound, I found myself confused by certain steps.

So let's go back to the points we had above. We're solving a 2-dimensional linear regression. So you have all your points e.g
(1,3), (1,5), (2,3), (3,4), (3,6), (3,7), ..., (10,6), (10,11), (10,12). Since we're ultimately trying to find a single linear solution (of the form $$y = cx + b$$) that fits these points,
you can rewrite your points as a system of linear equations.

$$x=3\\x=5\\2x=3\\3x=4\\...$$

And we can straightforwardly rewrite this in matrix notation as

$$\begin{bmatrix}1\\1\\2\\3\\3\\3\\...\\10\\10\\10\end{bmatrix} \begin{bmatrix}x\end{bmatrix} = \begin{bmatrix}3\\5\\3\\4\\6\\7\\...\\6\\11\\12\end{bmatrix}$$

We'll label the matrices and rewrite the equation as

$$Ab = Y$$

where we're trying to solve for $$b$$.

Quick note: if we were working with higher dimension data, $$A$$ and $$Y$$ would have more columns. But we don't have to worry about that for now since
our notation is valid for all dimensions.

Now of course, if you actually tried to solve this solution, you wouldn't be able to. This is because $$Y$$ isn't in the column space of $$A$$ (referred to as $$C(A)$$.

I needed a reminder for what a column space was, so I'll include one here. If you don't need it, feel free to skip ahead to the next paragraph.

The column space of a matrix $$A$$ is essentially the _range_ of the matrix, analogous to the range of a function. It describes the space of all possible linear
combinations of the columns of $$A$$. Since our matrix has just one column, its column space is actually just a line. If it had two columns, the column space would span a plane. But a line _where_? Well, say $$A$$ has n rows. Then $$C(A)$$ would be a line in n-space. So in our case, $$C(A)$$ is just a line parallel to the column vector $$A$$. Note that $$Y$$ is also a vector in n-space. And of course, more likely than not, $$Y$$ does not lie on the line $$C(A)$$.

So in order to make the problem solvable, we need to project $$Y$$ onto $$C(A)$$. This is where I got confused when I was learning. The blogs often used 2D or 3D examples
and described $$C(A)$$ as a plane. So I assumed that $$C(A)$$ was a plane in the same space as the original linear regression problem itself. So I kept thinking it meant that for each data point, we needed
to project it onto our line/plane. But of course, that's circular reasoning because we don't actually have a line yet. And also, that "projection" likely isn't orthogonal. Of course, my thinking didn't really make sense, but I'm including it here in case someone else is confused because of the different spaces described by the rows and columns. The linear regression problem has the same dimension as the number of columns in $$A$$ + 1 for $$Y$$. Whereas the column space is concerned with the number of rows in $$A$$. Basically, the more data points / rows you have, the more data points that you need to move onto some common line. 

$$proj_{C(A)}Y = \dfrac{y \cdot \hat{A}}{\hat{A} \cdot \hat{A}}\hat{A}$$

So now that we've projected $$Y$$ onto $$C(A)$$, we have a new vector $$\hat{Y}$$. So our equation is now $$Ab = \hat{Y}$$. Which is solvable! 
We want to isolate $$b$$ so we should "divide" by $$A$$ on both sides. 

$$b = A^{-1}\hat{Y}$$

But wait - we can't inverse $$A$$! $$A$$ is Nx1 so it's definitely not invertible. Instead, we can multiply it by its transpose to get a square matrix:

$$A^{T}Ab = \hat{Y}$$

$$b = (A^{T}A)^{-1}\hat{Y}$$

So technically $$A^{T}A$$ might not be invertible, but for our practical purposes, we can assume it is because if it weren’t then $$Ab = 0$$ would have a solution where $$b \neq 0$$. And at least for our 2d example, this is obviously not possible since if we have any data points where $$x_i \neq 0$$ then $$x_i * b = 0$$ iff $$b = 0$$.

Cool, so we're pretty much done. However, if you look at other blogs or stackexchange posts or even wikipedia pages, the common final equation you'll probably see is $$b = (A^{T}A)^{-1}A^{T}Y$$.

We can relate our equation to this more common one

$$A^{T}Y = Y \cdot C(A) = \hat{Y}$$ because of the Hermitian adjoint.

#### _Why_ does this work?

Okay cool, what we did looks great. But _why_ does that work? Why does this projection approach give us the same solution as minimizing the least squares cost function? Well, because minimizing the least squares sum
of the points in the original problem is actually the same thing as projecting $$Y$$ onto $$C(A)$$.

The whole point of a projection is that the resulting vector should be “similar” to the original in a meaningful way. In other words, the distance between $$Y$$ and $$\hat{Y}$$ should be minimal.
We know from basic geometry that the shortest distance between two points is
a line between them.
So $$\hat{Y} - Y$$ looks like

$$\sqrt{(\hat{y}_{1}-y_{1})^2 + (\hat{y}_2 - y_2)^2 ... + (\hat{y}_N - y_N)^2}$$

which can be rewritten as

$$\sqrt{\sum_{n=1}^{N} (\hat{y}_n - y_n)^2}$$

which should remind us of our least squares cost function.

Remember that each row in $$Y$$ corresponds to one of our data points. So projecting $$Y$$ means moving each point. The distance between $$Y$$ and $$\hat{Y}$$ looks like a typical euclidean distance formula, but when you consider each row individually, since it’s only a single dimension, each one looks like a vertical distance. 

#### Other cost functions
So what about other cost functions? What if we used absolute value instead of least squares? Or what about Deming regression? What's the equivalent thing to do in N space? (pca? TODO)

## Citations

[Linear algebra approach](https://medium.com/@andrew.chamberlain/the-linear-algebra-view-of-least-squares-regression-f67044b7f39b)

[Why projecting is same thing as least squares](https://math.stackexchange.com/questions/3750293/relationship-between-projections-and-least-squares)

[Showing why euclidean distance is nonsense in problem space](https://math.stackexchange.com/questions/2837161/does-least-squares-approximate-solution-minimize-the-orthogonal-distance-of-b)

[More about projection vs least square](https://math.stackexchange.com/questions/1298261/difference-between-orthogonal-projection-and-least-squares-solution)

[Philosophy about vertical distance](https://stats.stackexchange.com/questions/319041/why-does-linear-regression-use-a-cost-function-based-on-the-vertical-distance-be)

[Calculus approach](https://math.stackexchange.com/questions/131590/derivation-of-the-formula-for-ordinary-least-squares-linear-regression)

[Another calculus approach](https://towardsdatascience.com/linear-regression-derivation-d362ea3884c2)

[Lin alg derivation of normal equation](https://math.stackexchange.com/questions/644834/least-squares-in-a-matrix-form?rq=1)

[Column space](https://towardsdatascience.com/what-is-column-space-with-a-machine-learning-example-8f8a8d4ec6c)

[“Common sense” vs best fit + PCA](https://stats.stackexchange.com/questions/332819/line-of-best-fit-does-not-look-like-a-good-fit-why)
