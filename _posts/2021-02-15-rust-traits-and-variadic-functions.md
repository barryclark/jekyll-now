---
layout: post
tags: rust template-metaprogramming generic-programming
#categories: []
date: 2021-02-15
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'A Common Call Syntax for Variadic Functions in Rust'
comments_id: 21
---

I am working on a little numerics project where the goal is to let the user pass base functions to a data-fitting model in a simple fashion. And while I really like what Rust's lambdas can already do for me, I was wondering if I can pass functions with different (but compile time constant) numbers of parameters using a single interface. It turns out that I can, and the answer is a nice combination of Rust and C++ metaprogramming idioms.

# Our Goals
What I actually want for my numerics project would be more confusing than illuminating for this post. So we'll answer a related but simpler question, which might seem a little useless. We'll just use it as an example of how this interface works in principle and furthermore, we'll not bother with making our interface very generic at first. Let's focus on functions that operate on `f64` floating point numbers for now. That being said, this is what I want:

Given two callables with a different number of arguments,

```
fn f1(x:f64) -> f64 {2*x}
let f2 = |x:f64,y:f64| {x+y};
```
I want to be able to pass them to an `evaluate` function that takes the callable and a slice of parameters `&[f64]` and evaluates the functions so that the following assertions hold.

```rust
assert_eq!(evaluate(f1,&[1.]), 2.); //f1(1.)==2.
assert_eq!(evaluate(f2,&[1.,2.]), 3.); //f2(1.,2.)==3.
```
For this article, I am not concerned with any error handling, including checking whether the slice has the correct number of elements to supply the function arguments.

# A Naive Approach
It seems natural to look for a trait based approach to solve this problem. However, Rust does not have variadic generic arguments like e.g. Modern C++. So it's clear from the get-go that there is going to be some manual labor required for specializing the traits on functions of different argument lengths. That used to be the same for C++ before variadic templates arrived in C++11 and onwards. This is what I tried:

```rust
trait VariadicFunction {
  fn eval(&self, args: &[f64]) -> f64;
}

impl<Func> VariadicFunction for Func
where Func : Fn(f64)->f64 {
  fn eval(&self,args : &[f64])->f64 {
    (self)(args[0])
  }
}

impl<Func> VariadicFunction for Func
where Func : Fn(f64,f64)->f64 {
  fn eval(&self,args : &[f64])->f64 {
    (self)(args[0],args[1])
  }
}

fn evaluate<F:VariadicFunction>(func : F, args: &[f64]) -> f64{
  func.eval(args)
}
```
So we have a trait that we blanket implement for all types of callables `Fn(f64)->f64` and `Fn(f64,f64)->f64`, which gives us the desired behavior of dispatching the slice to the arguments. We knew we would have to hand code it for different lengths of callables, but there sure is a way to leverage the macro system to ease that pain. So all in all not so bad, but there is a tiny problem. [This doesn't compile](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=f51fd59670e66be3c438f4a8283c44cd):

```
error[E0119]: conflicting implementations of trait `VariadicFunction`:
  --> src/lib.rs:12:1
   |
5  | / impl<Func> VariadicFunction for Func
6  | | where Func : Fn(f64)->f64 {
7  | |   fn eval(&self,args : &[f64])->f64 {
8  | |     (self)(args[0])
9  | |   }
10 | | }
   | |_- first implementation here
11 |
12 | / impl<Func> VariadicFunction for Func
13 | | where Func : Fn(f64,f64)->f64 {
14 | |   fn eval(&self,args : &[f64])->f64 {
15 | |     (self)(args[0],args[1])
16 | |   }
17 | | }
   | |_^ conflicting implementation

error: aborting due to previous error
```
The compiler thinks that the implementations could be conflicting. Intuitively, that did not make much sense to me, because $$f(x)$$ is a different type than $$f(x,y)$$, but there are some obscure reasons for this problem:

> This is an issue because a closure could implement both Fn traits (even though they never will), e.g. using some nightly features you can manually implement the traits for a custom type
>
> -- [Nemo157](https://github.com/rust-lang/rust/issues/60074)

See? Obscure! But nonetheless, this is a problem because we cannot implement the same trait on two types that satisfy `Fn` with different argument lists. Can we still find a way to pass the variadic function trait through the same interface? Turns out we can.

# Generic Traits to the Rescue
I probably would have given up here, if I had not --by sheer luck-- come across [actix-web](https://actix.rs/) at work. This crate achieves a similar (but more powerful) effect by letting us pass functions with all kinds of generic arguments [as handlers](https://docs.rs/actix-web/3.3.2/actix_web/struct.Resource.html#method.to). They mention (but don't document) a `Factory` trait which should do pretty much what I want. So I took a look at the [source code](https://github.com/actix/actix-web/blob/web-v3.3.2/src/handler.rs) and saw the magic. If you take a look, you'll see that they also blanket implement the `Factory` trait for `Fn` objects of different sizes manually[^actix_macro]. But then they use a very crafty trick to implement the same trait on different `Fn` types. Haven't we just established that's impossible?

Well, I was imprecise. What they actually do is to create a generic trait and then implement *different specializations* of the generic trait on `Fn` types with different argument lists. Different specializations of generic traits are different traits, but they give us the same interface[^from_trait]. We'll leverage this by modifying our trait and making it generic by sticking a type in there that allows us to specialize the trait for different `Fn` types.

```rust
trait VariadicFunction<ArgList> {
  fn eval(&self, args: &[f64]) -> f64;
}
```
We have modified our trait by giving it the generic type parameter `ArgList`. Note that this type does play any role inside the logic of the trait, because it occurs neither in the function argument nor as an associated type. We'll just use it to get different trait specializations that give us the same interface:

```rust
impl<Func> VariadicFunction<f64> for Func
where Func : Fn(f64)->f64 {
  fn eval(&self,args : &[f64])->f64 {
    (self)(args[0])
  }
}

impl<Func> VariadicFunction<(f64,f64)> for Func
where Func : Fn(f64,f64)->f64 {
  fn eval(&self,args : &[f64])->f64 {
    (self)(args[0],args[1])
  }
}

fn evaluate<ArgList, F>(func : F, args: &[f64]) -> f64
where F: VariadicFunction<ArgList>{
  func.eval(args)
}
```
[This makes the compiler happy](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=a88b93d03e90dd992dbcc8a40414dc2f).  Note that we stuck the argument types of the functions inside the trait parameter `ArgList`. Nothing is forcing us to do that, because the argument list serves no other purpose than to specialize the trait. Still, this is nice and instructive and lends itself to writing a macro for it. If we want, we can use the same procedure to add specializations of this trait to callables taking 3,4,5,... arguments as long as we code that manually.

# Going More Generic
If you look at the actix code, you'll see that they made the interface much more generic. Furthermore, the argument list actually serves a purpose in their implementation. Since I am mostly interested in using this for numeric functions, I don't need to go super generic, but let's get a little more generic just for fun.

Let's try to get this trait working for functions `Fn(Arg)->Ret`, `Fn(Arg,Arg)->Ret`, and so on. The argument type should always be the same, but the number of arguments can differ. So we can template our trait on a type `Arg`, which indicates our argument type and on a type `Ret` indicating the return type. Furthermore, we need the `ArgList` parameter to generate specializations depending on the argument list of the callable type[^arg_type]:

```rust
pub trait VariadicFunction<Arg,ArgList,Ret> {
    fn eval(&self,params:&[Arg]) ->Ret;
}
```
Now we need to blanket implement our specializations for a wide variety of functions. Since we cannot move out of our slice, we'll constrain our `Arg` types to `Clone`:

```rust
impl<Func,Arg,Ret> VariadicFunction<Arg,Arg,Ret> for Func
where Func : Fn(Arg) -> Ret,
Arg : Clone,{
    fn eval(&self, params:&[Arg]) -> Ret {
        (self)(params[0].clone())
    }
}

impl<Func,Arg,Ret> VariadicFunction<Arg, (Arg,Arg), Ret> for Func
where Func : Fn(Arg,Arg) ->Ret,
Arg : Clone, {
    fn eval(&self, params:&[Arg]) -> Ret {
        (self)(params[0].clone(),params[1].clone())
    }
}

fn evaluate<Arg,Ret,ArgList,F>(func : F, args : &[Arg]) -> Ret
where Arg : Clone,
F : VariadicFunction<Arg,ArgList,Ret>
{
    func.eval(args)
}

```
You can [try for yourself](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=cf13d7fa53e95e9bd986cb6b2a40edef) what you can do with this. We can even use that interface for string concatenation.

# Conclusion
Providing extra generic parameters is a neat way of implementing a trait with the same interface for different types. I encourage you to take a look [at the actix-web source code](https://github.com/actix/actix-web/blob/web-v3.3.2/src/handler.rs) to see how to do it for a use case which is even more generic. Furthermore, they provide a neat macro to lessen the burden of manually implementing the traits for each argument count.

# Endnotes
[^actix_macro]: However, they use a macro to reduce the amount of required monkeywork.
[^from_trait]: For example `From<f64>` and `From<(f64,f64)>` are different traits.
[^arg_type]: We could probably do without the explicit `Arg` type and absorb it into the `ArgList`, but I like the type for semantic clarity.
