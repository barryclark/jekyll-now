I recently realized that I didn't understand linear regression as well as I thought as I did.

$$ \nabla_\boldsymbol{x} J(\boldsymbol{x}) $$

![twitter thread image](https://user-images.githubusercontent.com/1283020/125213633-ebc50a80-e267-11eb-8ddc-b8d8b9c9aea7.png)

<sub>From this [twitter thread](https://twitter.com/lightspringfox/status/1412581659745001474)
</sub>

Maybe I don't know _exactly_ how to do it with linear algebra but I can intuitively draw a best fit for a set of points, so I should be able to work from there.

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
But I couldn't understand how you could just "get" the optimal solution in a closed form formula. [This post](https://medium.com/@andrew.chamberlain/the-linear-algebra-view-of-least-squares-regression-f67044b7f39b)
was the first one I looked at that introduced the linear algebra solution. Even though the logic is sound, I found myself very confused by it.

So let's go back to the points we had above. We're solving a 2-dimensional linear regression. So you have all your points e.g 
(1,3), (1,5), (2,3), (3,4), (3,6), (3,7), ..., (10,6), (10,11), (10,12). Since we're ultimately trying to find a single linear solution (of the form y = cx + b) that fits these points,
you can rewrite your points as a system of linear equations.

show the system (TODO)

And we can straightforwardly rewrite this in matrix notation as

latex of matrix math (TODO)

We'll call the leftmost matrix A. If we were working in higher dimensions, A would have more columns. But since we're just solving a 2D problem, and therefore have a single predictor variable X, we have just 1 column.
The second matrix we'll call b. why is it 1x1 (TODO) And we're equating it to Y. Which is also Nx1 because we're predicting a single variable.

Now of course, if you actually tried to solve this solution, you wouldn't be able to. This is because Y isn't in the range / column space of A. 
Since A has just one column, its column space (C(A)) spans a line. So we can't really visualize this because it's too high dimensional, but C(A) is a vector in N-space.
Y is another vector in N-space, and obviously they are not the same vector. If they were, you'd be done (and it would mean that all your data points fit a line perfectly).

So in order to make the problem solvable, we need to project Y onto C(A). This is where I got confused when I was learning. The blogs often used 2D or 3D examples
and described C(A) as a plane. So I assumed that C(A) was a plane in the same space as the original problem itself. So I kept thinking it meant that for each data point, we needed
to project it onto our line/plane. But of course, that's circular reasoning because we don't actually have a line yet. And also, that "projection" likely isn't orthogonal. 

So the key for me was realizing that when we say we want to project Y onto C(A) it's in a different space / dimension than the original problem itself. If you're trying to fit a line in 2D space,
we're not projecting the 2D points onto a hypothetical line. No, we are projecting the N-dimensional vector that's represented by Y's single column, onto the N-dimensioanl vector represented by A.

projection is just Y . unit of C(A)

So now that we've projected Y onto C(A), we have a new vector Y-hat. So our equation is now Ab = Y-hat. Which is solvable! 

b = A^-1 * Y-hat

But wait - we can't inverse A! A is Nx1 so it's definitely not invertible. Instead, we can multipy it by its transpose so get a square matrix:

A^T * A * b = Y-hat
b = (A^T * A) ^ -1 * Y-hat

Can we definitely inverse (A^T * A)? (TODO)

The common equation you'll probably see is b = (A^T * A)^-1 * A^T * Y

A^T * Y = Y . C(A) because of the Hermitian adjoint. 


Okay cool, that looks great. But _why_ does that work? Why does that give us the same solution as minimizing the cost function? Well, because minimizing the least squares sum
of the points in the original problem is actually the same thing as projecting Y onto C(A).

We project Y onto C(A), and the point is that the projection of Y should be "similar" to Y. So in some sense, the distance between Y and Y-hat should be minimal. 
In some sense, you could view this as a minimization problem. On the other hand, we know from basic geometry that the shortest distance between two points is
a line between them. And this line is orthogonal to C(A). 
So Y-hat - Y (latex TODO?) looks like sqrt of all points etc (TODO). Which you can rewrite as sigma notation (TODO). 
Now that should look familiar. 

Because in some sense, when we project Y onto C(A) and we calculate the square root of the pairwise differences, we're really computing the vertical distance between two points 
in the original space. 

So what about other cost functions? What if we used absolute value instead of least squares? Or what about Deming regression? What's the equivalent thing to do in N space? (pca? TODO)



