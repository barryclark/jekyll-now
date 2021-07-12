I recently realized that I didn't understand linear regression as well as I thought as I did.

![twitter thread image](https://user-images.githubusercontent.com/1283020/125213633-ebc50a80-e267-11eb-8ddc-b8d8b9c9aea7.png)

<sub>From this [twitter thread](https://twitter.com/lightspringfox/status/1412581659745001474)
</sub>

Okay, so maybe I don't know _exactly_ how to do it with linear algebra but I can intuitively draw a best fit for a set of points, so I should be able to work from there.

For example, for this set of points (TODO), I'd draw a line looking like this (TODO).

Except that's not correct if you're using least squares. This is the correct fit. (TODO)

Oh. Oops.

I drew the major line which minimizes the euclidean distance between the points and the line, but that's not actually useful for prediction (in typical cases).
That's because if I'm given an input, I want to guess the output for _that_ input. Basically, I'd want to look at the points with the same X value (assuming I have them),
and then guess the mean Y value as my prediction. Do you see what I mean? We're _given_ the X value, so we're not changing that. But when do the euclidean distance minimization,
then you _do_ change the X value. So that's kind of silly (in some cases, it's actually a reasonable thing to do. We'll cover that later). So since we want to _only_ change the Y value,
that means we're changing the vertical value of the point, or in other words, minimizing the vertical distance. Which ends up being the least squares formula. 

So it seems like I needed to relearn regression, or perhaps really learn it for the first time.

It's pretty easy to google for basic blog posts about linear regression, so why am I writing another one? 
Because I found the blogs to be unsatisfactory in giving me a deep understanding.
The whole point of this was to learn and _really_ understand how linear regression works and, importantly, why the explanation-of-how is valid. 

I'll try to cite the blogs and stackexchange posts that I came across and relied on as I built up my understanding.

describe linear regression (TODO)

It seems like there are two approaches to solving the linear regression problem: one that defines a cost function of the regression coefficients and minimizes it;
the other tripped me up because it doesn't seem to involve any real minimization. Instead we use linear algebra to project the solution onto our hypothetical line
and determine the best fit from that. (TODO)

### Calculus approach

### Linear algebra approach

Like I said, I struggled to inuitively understand this approach. Defining a cost function and minimizing it made sense to me. You can start with a terrible fit and optimize it.
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
to project it onto our line/plane. But of course, that's circular reasoning because we don't actually have a line yet. And also, that "projection" likely isn't orthogonal. Of course, my thinking didn't really make sense, but I'm including it here in case someone else is confused because of the different spaces described by the rows and columns. The linear regression problem has the same dimension as the number of columns in $$A$$ + 1 for $$Y$$. Whereas the column space is concerned with the number of rows in $$A$$. If it helps, consider the case where we have just 3 data points. The entire space of all possible values is 3d space. The regression is still a 2d problem however. 

To project $$Y$$ onto $$C(A)$$, we can use $$Y \cdot \hat{A}$$ where $$\hat{A}$$ is the normalized vector of $$A$$.

So now that we've projected $$Y$$ onto $$C(A)$$, we have a new vector $$\hat{Y}$$. So our equation is now $$Ab = \hat{Y}$$. Which is solvable! 

$$b = A^{-1}\hat{Y}$$

But wait - we can't inverse $$A$$! $$A$$ is Nx1 so it's definitely not invertible. Instead, we can multipy it by its transpose to get a square matrix:

$$A^{T}Ab = \hat{Y}$$

$$b = (A^{T}A)^{-1}\hat{Y}$$

Can we definitely inverse $$A^{T}A$$? (TODO)

The common equation you'll probably see is $$b = (A^{T}A)^{-1}A^{T}Y$$

$$A^{T} * Y = Y \cdot C(A)$$ because of the Hermitian adjoint. 


Okay cool, that looks great. But _why_ does that work? Why does that give us the same solution as minimizing the cost function? Well, because minimizing the least squares sum
of the points in the original problem is actually the same thing as projecting Y onto C(A).

We project $$Y$$ onto $$C(A)$$, and the point is that the projection of $$Y$$ should be "similar" to $$Y$$. So in some sense, the distance between $$Y$$ and $$\hat{Y}$$ should be minimal. 
In some sense, you could view this as a minimization problem. On the other hand, we know from basic geometry that the shortest distance between two points is
a line between them. And this line is orthogonal to $$C(A)$$. 
So $$\hat{Y} - Y$$ looks like 

$$\sqrt{(\hat{y}_{1}-y_{1})^2 + (\hat{y}_2 - y_2)^2 ... + (\hat{y}_N - y_N)^2}$$

which can be rewritten as

$$\sqrt{\sum_{n=1}^{N} (\hat{y}_n - y_n)^2}$$

which should remind of us our least squares cost function.


Because in some sense, when we project Y onto C(A) and we calculate the square root of the pairwise differences, we're really computing the vertical distance between two points in the original space. 

So what about other cost functions? What if we used absolute value instead of least squares? Or what about Deming regression? What's the equivalent thing to do in N space? (pca? TODO)



