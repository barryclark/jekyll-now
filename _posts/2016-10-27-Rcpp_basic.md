---
title:  "Introduction to Rcpp: making R much much faster"
date:   2016-11-29
layout: single
author_profile: true
comments: true
tags: [R]
---

Pakcage _**Rcpp**_ allows you to use _C++_ or _C_ code in an R environment. It's a great tool to enhance speed of your program, at the price of longer programming and harder debugging. But when it finally works out, it's totally worth it.

On _stackoverflow_ (as of date 2016/9/22), number of **r** tagged questions is 153199, while number of **rcpp** tagged questions is 1193. Only 1% of the questions asked are about Rcpp. This implies the fact that not that many R users are also Rcpp users. The lack in population leads to incomplete documentation, and limited references you can find when you get into trouble during Rcpp programming.

The goal of this documentation is to give a general introduction to Rcpp, use it as a framework for future update with more details. We assume knowledge of both C++ and R programming, so there will be no introduction about them.

### Collection of online references
You might find the following web pages useful:  
- Hadley Wickham's Advanced R: [Chapter from Advanced R](http://adv-r.had.co.nz/Rcpp.html )  
- Online gitbook: [Introduction to Rcpp](https://www.gitbook.com/book/teuder/introduction-to-rcpp/details)  
- The _Armadillo_ library details, with introduction about all member functions: [Armadillo Website](http://arma.sourceforge.net/docs.html)  
- Rcpp documentation: [Rcpp Version 0.12.7 Documentation](http://dirk.eddelbuettel.com/code/rcpp/html/index.html)   
- Understanding R's C interface [C interface in R](http://adv-r.had.co.nz/C-interface.html)

## Two ways to incorporate C++ functions

- **Inline function definition**: usage of `cppFunction()`  

```c
cppFunction(
" int my_C_function (int x){
  int y=5;
  return  x+y;
}")
```

- **Write .cpp source file**  
 You can also write _.cpp_ source files outside and use  
 `sourceCpp("your_file_name.cpp")`
 to source the file. However, there are certain rules to be followed. A simple template is shown below:  

```c
#include <Rcpp.h>
using namespace Rcpp;
//[[Rcpp::export]]  /* to show that this function is to be exported to R */  
/* write your C++ function here */
int my_C_function (int x){
return x+1;
}
```



## Rcpp Data Structure

### NumericVector
- Basics:

```c
 NumericVector v (3);  // rep(0,3)
 NumericVector v {1,2,3};
 NumericVector v (5,3.0);  // rep(5,3)
 NumericVector v = NumericVector::create(1,2,3);
 //
 // subsetting
 v[u]; // where u is a LogicalVector
 //
 //Use `clone()` function when you don't want your vector or matrix value to be changed:
 NumericVector v1=v2; // change of v1 will result in change of v2
 NumericVector v1=clone(v2); // v2 will not be changed, when v1 is changed
 //
 // member functions:
  v.length(); //  length of v
 //
 // Doing iterations:   
 NumericVector::iterator it; // 'it' is then a pointer to the head of the vector
```

   What you get from logical vector subsetting `v[u]` is a pointer. To be able to use it, you need to wrap it up into whatever type you want it to have (eg. `as<NumericVector>(v[u])`)

### NumericMatrix
* Basic

```c
NumericMatrix M; // multiple initiation methods as  NumericVector
M.length(); // total elements of M
M.nrow(), M.ncol() // returns row , column number
M.row(i),M.col(j) // returns pointers to row i, col j
NumericVector y= M( _ , i); // get ith column, M(_,i) itself is also a pointer
```

More operations of Matrix in  _**RcppArmadillo**_ Section.


### DataFrame

```c
DataFrame df = DataFrame::create(Named("a1")=v1, _["a2"] =v2);} // OK to do without names
```
### List

```c
// names can be added as well following same routine as in DataFrame
List L = List::create (v1,v2); 
// access elements by names
int K =  Mylist["var_name"];
```

## Use R Functions
Example:

```c
//example 1: use R function
Function dnorm("dnorm");
double temp = dnorm(x,Named("mean",0),Named("sd",1),Named("log",1));

//example 2: use function from global environment
Environment env=Environment::global_env();
Function my_fun("fun_in_glob"); // fun_in_glob() is a function defined existing in global env
```

Transition from C++ to R takes a lot of time. Always try to find function supported by Rcpp or write your own function rather than refer functions from R package.

## Linear Algebra: **RcppArmadillo**
- Possible problems during installation and compilation: [-lgfortran and -lquadmath problem](http://thecoatlessprofessor.com/programming/rcpp-rcpparmadillo-and-os-x-mavericks-lgfortran-and-lquadmath-error)

- When writing _RcppArmadillo_ source files, use `#include <RcppArmadillo.h>` then `<Rcpp.h>` is spontaneously implied.
- Include `using namespace arma;` to save the trouble of writing `arma::` everytime.

- Basic variable types: **arma::mat, arma::vec**

### arma:mat

```c
// initialization
arma::mat M; // initializes a 0 size matrix
arma::mat M(a,b); // a  by b matrix,  filled with 0.
//
//member functions
M.n_rows, M.n_cols //number of rows and columns
M.size() // returns number of elements
M.print() //print the matrix  
M.reshape(), M.fill(), M.ones(), M.zeros() //
M.t()// transpose
M(i,j), M.row(i), M.col(j), M.row(1,2) // accessing elements
//
//operators for M
M % M, M / M // element wise multiplication, division
inv(M) // inverse
M*M //matrix product;
//
// Matrix subsetting
arma::mat M2 = M.rows(from, to); // contiguous; use M.cols() for column subsetting
arma::mat M3= M.submat(row_from, col_from, row_to, col_to); // contiguous ; by both row and column
// non-contiguous
// access multiple rows by indices
// index_vec need to be uvec (Col<uword>) or urowvec (Col<uword>) type
M.cols(index_vec), M.rows(index_vec) 

```


### arma::vec
**arma::vec** is also treated as **arma::mat** with only one column.

```c
	// basics
	arma::vec V;
	V.size(); // returns length of V
	//
	// vector subsetting
	v.subvec( from,  to); // contiguous subsetting; from, to are index
	// non-contiguous
```


### Cube
Cube is three dimensional array. Less often used than **arma::mat, arma::vec**, but also useful.

```c
//construtors
arma::cube x(n_row, n_col, n_slice); // all 0
//
// attributes
x.n_cols, x.n_rows, x.n_slices // number of dimensions
x.size() // number of elements
//
// member
x.slice(i); // mat of slice i
x.slices(first_slice, last_slice); // contiguous slices
x.subcube(row1,col1,slice1,row2,col2,slice2); // contiguous subcube
x.fill(double c); // fill the cube with c
```


### _shared functions_
This section, I put in some useful functions mostly shared by both _arma::mat_ and _arma::vec_, and some by _arma::cube_.

- **Element-wise functions**: [element-wise](http://arma.sourceforge.net/docs.html#misc_fns).
- **Constructors**: [mat constructor](http://arma.sourceforge.net/docs.html#constructors_mat) and [mat advanced constructor](http://arma.sourceforge.net/docs.html#adv_constructors_mat).
- others:

```c
	// iterators
	arma::vec::iterator it; // arma::vec::const_iterator for read only
	v.begin(), v.end() // for vector
	v.begin_row(row_number), v.end_row(row_number) // for mat; column version similar  
	//
	diagmat( M ) // generate diagonal matrix from given matrix or vector
	accu(M)  // accumulate sum of all elements in vector or matrix
	//
	//elements access
	V.at(i), V[i] // element i, for vector
	M.at(i,j), M(i,j) // for matrix
	//
	// initialization
	ones(n_elem), ones(n_rows,n_cols) // matrix filled with 1
	ones<vec_type>(n_elem); ones<mat_type>(dim1, dim2)
	randu<type>(dim1, dim2, dim3); //unif(0,1); type can be : vec, mat, cube
	randu<type>(dim1, dim2, dim3); // N(0,1)
	zeros<vector_type/mat_type/cube_type>(...); // initiation with 0s
	//others
	.min();.max(); // get minimum maximum
```

- Type conversion:   
	say you have an input of type _NumericMatrix x_, you can convert it with:   
	`arma::mat y= as<arma::mat>(x);`

	To work in the opposite direction use _wrap_ function :  
	`NumericVector x= wrap(y);`


### useful topics
- use logical vector to access submatrix/subvector:

```c
arma::mat matrix_sub(arma::mat M, LogicalVector a, int b)
{
  // b=1: select row
  // b=2: select column
  arma::mat out;
  if(b==2){
    arma::colvec z=as<arma::colvec>(a);
    out=M.cols(find(z==1));
  } else if(b==1){
    arma::rowvec z=as<arma::rowvec>(a);
    out=M.rows(find(z==1));
  }
  
  return out;
}
```

We first convert the logical vector `a` into `colvec` or `rowvec`, on which we can use the `find(expr)` function. `find` return the index (type `uvec`) where `expr` is true, and that index can be used to get submatrix.

For vector, the steps can be easier:

```c
// convert logical vector to uvec
arma::uvec q = as<arma::uvec>(a);
// use .elem() function to get subvector
return v.elem(find(q));
```

More on how to use find: [find](http://arma.sourceforge.net/docs.html#find).
	

## Work with Distributions
_Rcpp_ provides many equivalents for R functions related to distributions, so you don't have to scratch your head to write your own, or refer to those R functions with the price of a speed slow down.
##### Uniform distribution
- `R::runif(double a, double b)` : uniform from `[a,b]`

##### Binomial distribution
- `R::dbinom(x, size, prob, log=0\1)`:expects 4 inputs  
	`R::qbinom(p,size,prob,lower.tail,log.p)`: expects 5 inputs  
	`R::rbinom(size,p)`: only generates one random value at a time; need to vectorize it if necessary  
	same parameters as in _R_. For parameter _log_, use `0/1` instead of `true/false`.

##### Poisson distribution

##### Beta distribution
- `R::dbeta(double x, double a, double b, int log)`

##### Gamma distribution
- `R::rgamma(double shape, double scale)` : it only takes scale rather than rate as input. There is also a vectorized version:
	`Rcpp::rgamma(int n, double shape, double scale)`  
 	`R::dgamma(double x, double shape, double scale, int logical)` : the 4th parameter control if output should be _log_ transformed.

##### Exponential distribution
- `R::rexp( double r )` : for generating one exponential random variable
	`Rcpp::rexp( int n, double r)` : for generating an array of exponential numbers


## Frequently used functions
- Type convertion:  
	`wrap()` :  a templated function that transforms an arbitrary object into a _SEXP_, that can be returned to R.   
	eg:  
	`NumericVector x= wrap(seq(1,n))`   


- Console output:

```c
// Console output:
Rcout << "Some message" << std::endl;  
Rcerr << "Error message" ;  
```

- R _any()_ equivalent:

```c
  bool any_cpp(LogicalVector lv)
  {return is_true(any(lv));}
```

- R _seq()_ equivalent:  
`seq(int start,int end)` , it's the same as R `seq( , ,by=1)`. The return type is _Rcpp::Range_, need to use `wrap()` function to make it a NumericVector.

- R _sample()_:  
  For simple cases, we can adapt from `R::runif()` to achieve our goal.   
 For example, when we want to sample one integer from `c(a:b)`, we can do `int out=R::runif(a,b+1)`.   
 
 There is an equivalent `sample` function in `<sample.h>` file. To use it, we need to first `#include <RcppArmadilloExtensions/sample.h>` and follow the syntax:   
 `Rcpp::RcppArmadillo::sample(sample_set,int size, bool replacement, weight_vec)`.
 
 See [stackoverflow:sample](http://stackoverflow.com/questions/26384959/rcpp-r-sample-equivalent-from-a-numericvector).
 

- _max()_  equivalent:  
	`max( obj )` : obj can be _NumericVector_

## Others
- To use C++11 features, such as _range based for_, and more ways of variable initialization, include

```
//[[Rcpp::plugins("cpp11")]]
```
in _.cpp_ source file comments.

-  _Rcpp_ functions take inputs from _R_, and _R_ doesn't have variable type _pointer_, thus when writing _Rcpp_ functions we are not supposed to use pointers as input variable.   
	If you don't want the function to make a copy of your variable, you can specify the variable as e.g. `void my_fun(int &var){}`, i.e.  passing a reference to the variable instead.
