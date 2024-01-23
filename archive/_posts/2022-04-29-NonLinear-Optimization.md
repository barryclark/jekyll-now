---
layout: post
title: Nonlinear Optimization Solvers
usemathjax: true
---

__This article is about the implementation of a basic nonlinear optimization solver in C++__

![_config.yml]({{ site.baseurl }}/images/NonLinear_Optimization/minima.png)

After spending most of last year thinking about other problems, this year I am much more focused on the 3D reconstruction problem once again. However, there have been some changes since I last worked in this space:
 * I have now moved fully to a **Linux Ubuntu** environment (currently Ubuntu 20.04).
 * I have decided to target C++ as my main development language (I used to be a C# developer).
 * I am starting to embrace some of the machine learning techniques that are currently dominating my field. 

 Right now, I am at phase where I am gathering the algorithmic tools that I need to do my work, and one of those tools is a nonlinear optimizer. Essentially, identified 4 options that I wanted to examine. This article is a document of the selection process I went through to choose the most fitting options. The options that I have available are as follows:
  1. *cminpack* [[Link](https://github.com/devernay/cminpack)].
  1. OpenCV's *LMSolver* [[Link](https://docs.opencv.org/4.x/d3/d6d/classcv_1_1LMSolver.html)].
  1. *Nelder-Mead* as by J Burkardt [[Link](http://https://people.sc.fsu.edu/~jburkardt/cpp_src/asa047/asa047.html)].
  1. My own attempt at an implementation of a *Gauss-Newton* solver [[Link](https://github.com/wildboar-dev/RefinerLib)].

## Background

If you are new to nonlinear optimization and want to find out more, here is a document which I think is useful in explaining some of the background theory [[Link](https://web.mit.edu/15.053/www/AMP-Chapter-13.pdf)].

The Nelder-Mead algorithm is quite well explained by its [[Wikipedia](https://en.wikipedia.org/wiki/Nelder%E2%80%93Mead_method)] page.

## Methodology

In order to figure out which algorithm is best, I have decided to see how each algorithm performs against a toy problem that is a typical problem in the 3D reconstruction space, namely a bundle adjustment problem. In terms of evaluation, the best algorithm will have the best convergence (and most consistent convergence onto a solution), with ideally the least number of iterations.

### Toy Problem Setup

In order to test the system, I have formulated a distortion free basic PnP (Perspective-n-Point) problem as follows:
  * Given 100 randomly generated scene points.
  * The corresponding projected image locations of these scene points.
  * The pin-hole projection model (as a $3 \times 3$ camera matrix).
My goal is to determine a small random rigid transform (6 degrees of freedom) representing the coordinate differences between the scene coordinate system and the image coordinate system.

Mathematically the relationship between scene points $P$ and image points $p$ is given by the matrix expression:
  
  $p = KMP$

where $K$ is a $3 \times 3$ camera matrix and $M$ is $3 \times 4$ rigid transform. Our goal is to fin $M$.  

### CMINPack implementation details

CMINPack can be installed on Ubuntu as follows:

```
sudo apt install libcminpack-lib
```

This makes *minpack.h* available to include into your source code, and *cminpack* to be linked in your CMakeLists.txt as follows:

```
target_link_libraries(GradDesc GradDescLib NVLib RefinerLib ${OpenCV_LIBS} cminpack)
```

The actual call to the Levenberg-Marquardt descent is through the C style method *lmdif1_*, which can be done as follows:

```cpp
int j, m, n, info, lwa, iwa[params.rows], one = 1;

m = _problem->GetTrainingSize();
n = params.rows;
lwa = (m * n) + (5 * n) + m;

double tol, fnorm, x[n], fvec[m], wa[lwa];

for (auto i = 0; i < params.rows; i++) x[i] = initial_values[i];

tol = sqrt(dpmpar_(&one));
lmdif1_(&ErrorFunc, &m, &n, x, fvec, &tol, &info, iwa, wa, &lwa);
fnorm = enorm_(&m, fvec);

for (auto i = 0; i < params.rows; i++) solution[i] = x[i];
```

**NOTE:** This method calculates approximate derivatives. 

### OpenCV's LMSolver

There are actual some forums where people are enquiring how to use the OpenCV Levenberg-Marquardt implementation, as it is not very well documented.

Essentially calling the solver is relatively easy, simply include OpenCV into your project and call as follows:

```cpp
auto problem = new NVL_Research::LMProblem(bundleTest);
auto solver = LMSolver::create(Ptr<NVL_Research::LMProblem>(lmProblem), 1000);
Mat parameters = Mat_<double>::zeros(6,1); // Initial values are zeros
auto iterations = solver->run(parameters);
```

The main problem is the definition of the *LMProblem*. Here one needs to override OpenCV's *cv::LMSolver::Callback* which involves overriding the method *virtual bool compute(InputArray param, OutputArray err, OutputArray J) const override;

This can be done as follows:

```cpp
bool LMProblem::compute(InputArray param, OutputArray err, OutputArray J) const
{
	// Get the parameters
	auto d = (double *) param.getMat().data; auto p = Vec6d(d[0], d[1], d[2], d[3], d[4], d[5]);

	// Calculate errors
	auto errors = vector<double>(); auto error = _problem->GetErrorSet(p, errors);

	// Assign errors
	err.create(errors.size(), 1, CV_64F); auto errorData = (double *) err.getMat().data;
	for (auto i = 0; i < errors.size(); i++) errorData[i] = errors[i];

	// Build up the jacobian
	if (!J.needed()) return true;

	Mat jacobian;
	for (auto i = 0; i < errors.size(); i++) 
	{
		Mat jmatrix = param.getMat();
		Mat entry = GetJacobian(jmatrix, errors[i], (int)i);
		jacobian.push_back(entry);
	}

	J.create(jacobian.rows, jacobian.cols, CV_64F); auto jin = (double *) jacobian.data; 
	auto jout = (double *) J.getMat().data;
	
	for (auto row = 0; row < jacobian.rows; row++) 
	{
		for (auto column = 0; column < jacobian.cols; column++) 
		{
			auto index = column + row * jacobian.cols;
			jout[index] = jin[index];	
		}
	}

	return true;
}

```

In order to calculate the Jacobian, I simply used the approximate derivative as follows:

$f'(x) \equiv \frac{f(x + h) - f(x)}{h}$

where it is assumed that $h$ has a very small value.

### Nelder-Mead Algorithm

Essentially I just used this algorithm as directly as possible (from J Burkhardt's implementation). I was a little unsure about parameters, so I just used the default values in most cases. I experimented a little with step sizes and found that if I used steps of $0.1$ I got better performance than $1.0$, so I used these values. Ultimately I could use a genetic algorithm to optimize the parameters, but right now I want to get this evaluation done as quickly as possible - so I will leave this to future work.

## Results

The experiment was run $10$ times, with randomly generated poses. Poses were generated as 6 numbers, with the first $3$ as Euler angles $r_x$, $r_y$ and $r_z$ in the range $-10^{\circ}$ to $10^{\circ}$ degrees, and the last $3$ numbers generated in the range of $-100$mm to $100$mm. 

I have given the algorithms the following keys:

|no|algorithm|key|
|-|-|-|
|1|My Newton-Gauss Implementation| A |
|2|CMinPack Levenberg-Marquardt| B |
|3|OpenCV Levenberg-Marquardt| C |
|4|Nelder-Mead| D |

_Table 1: Key values assigned to the algorithms for presentation purposes_

The results of the experiments are as follows:

|no|A_error|A_iter|B_error|B_iter|C_error|C_iter|D_error|D_iter|
|-|-|-|-|-|-|-|-|-|
|1|0|4|0|64|0|6|2.25|1000|
|2|0|5|0|64|0|6|5.6|1000|
|3|-|-|0|64|0|6|9.7|1000|
|4|-|-|0|64|0|6|3.3|1000|
|5|0|5|0|64|0|6|39.2|1000|
|6|0|5|0|71|0|6|1.3|1000|
|7|-|-|0|85|0|8|0|1000|
|8|0|7|0|71|0|6|12.2|1000|
|9|-|-|0|306|0|78|0.56|1000|
|10|0|6|0|78|0|6|36.0|1000|

_Table 2: Results of the 10 experiments performed at iteratively refining the pose for the given bundle adjustment problem_

**NOTE:** With respect to the iteration counts, counts for the *cminpack* algorithm includes iterations for calculating the Jacobian, while those of the OpenCV approach do not. However, if you multiply the OpenCV iteration by $6$ (for $6$ extra cost calculations - one for each parameter), it is still apparent that the OpenCV version converges with less iterations. The *Nelder-Mead* algorithm never converged, and since it was limited to 1000 iterations, this was its iteration count for all problems.

## Conclusions

In this work, we evaluated $4$ iterative optimizers for solving non-linear convex multi-parameter problems. In order to evaluate these algorithms, we setup a toy bundle adjustment problem in the form of a classical distortion free PnP (Perspective-n-Point) problem. The performance was as follows:

My implementation of the Newton-Gauss performed reasonably well in several cases (converging to zero and often in the least number of iterations), however it is also was the only algorithm to truly fail (which it did in $40\%$ of the cases). My assumption is that this is related to a known issue with Newton-Gauss algorithm, in that sometimes it "overshoots" its target and this causes problems. The solution to this problem was of course the Levenberg-Marquardt algorithm - which is more complex, but several implementations already exist.

Both OpenCV's version and the CMinPack versions of Levenberg-Marquardt managed to solve all the problems. OpenCV's version was able to do this in less iterations - however CMinPack is often easier to incorporate into code. Essentially my finding is that one of these two algorithms would be my tool of choice. If the Jacobian was known, then OpenCV's implementation is a clear winner (based on implementation complexity).

The Nelder-Mead algorithm was the least accurate of the algorithms. This could of course be due to my bad tuning of the parameters, but at the moment, I am most comfortable with the performance of the two Levenberg-Marquardt algorithms.