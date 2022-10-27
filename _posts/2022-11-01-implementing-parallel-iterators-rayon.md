---
layout: post
tags: rust rayon parallel concurrency multi-threading
#categories: []
date: 2022-08-20
last_updated:
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: Implementing Rayon's Parallel Iterators - A Tutorial
comments_id:
---

I recently faced the problem of having to implement [rayon's](https://docs.rs/rayon/latest/rayon/)
[`ParallelIterator`](https://docs.rs/rayon/latest/rayon/iter/trait.ParallelIterator.html)
trait for my own type. There are tons of guides on _how to use_ rayon's parallel
iterators. There also are few explanations on _how they work_, but I found no guides
on how to implement one on my own type from the ground up. So this is what this
article aims for.

There is a bit of complexity around rayon's parallel iterators and this guide
cannot explain every nook and cranny. What I'd rather do is give a guided intro
for a non-trivial example. It might or might not be enough for your use case
, but you'll have an understanding of the map of the territory either way.

# Existing Literature and Prior Art
I'll cover some prior art on the subject of implementing parallel iterators here
in ascending order of usefulness (as perceived by me). I recommend to read
this guide first and then go back to the literature referenced in this section.
Eventually, reading [the source](https://github.com/rayon-rs/rayon/tree/master/src)
will prove invaluable, though it would not be my first port of call.

Inside the rayon repository, there is a [plumbing/README.md](https://github.com/rayon-rs/rayon/blob/master/src/iter/plumbing/README.md).
It was too terse as a beginning for me, but it does come in handy as a refresher 
or if you have prior knowledge. What I found very helpful to understand how rayon 
thinks about parallel iterators is the three part blog series
([Part 1 - Foundations](https://smallcultfollowing.com/babysteps/blog/2016/02/19/parallel-iterators-part-1-foundations/),
[Part 2 - Producers](https://smallcultfollowing.com/babysteps/blog/2016/02/25/parallel-iterators-part-2-producers/),
[Part 3 - Consumers](https://smallcultfollowing.com/babysteps/blog/2016/11/14/parallel-iterators-part-3-consumers/))
by Niko Matsakis, rayon's creator. It's a brilliant introduction to this subject
and I hope this guide will complement it nicely. We're going to see
the principles applied to an example.

Finally, it's worth noting that often you don't _have_ to implement your own
parallel iterator from the ground up because you can use what is already there 
in rayon. [Here](https://stackoverflow.com/questions/59028562/implementing-a-rayoniterparalleliterator)
and [here](https://github.com/dimforge/nalgebra/issues/848) are examples of how the
[`par_bridge`](https://docs.rs/rayon/latest/rayon/iter/trait.ParallelBridge.html)
and [`par_chunks`](https://docs.rs/rayon/latest/rayon/slice/trait.ParallelSlice.html)
functionality can be used as quick alternatives to implementing custom iterators.
[Here](https://github.com/rayon-rs/rayon/issues/643) is an example of how to
make use of rayon's existing iterators to implement your own iterator with less
overhead. But what if it turns out you do have (or want) to implement a parallel 
iterator from the ground up? _That_ is where this guide comes in.

# Groundwork
Here we'll get to know our example and draw a very rough map of the rayon 
territory.
## Our Example
We'll implement parallel iterators for a collection of some data where sequential
iterators are already present. This is a common use case. Our example will be 
deliberately simple, which is why use vectors and slices as the underlying ways
of storing and accessing our data. Those already give us sequential iterators[^double_ended]. 
Note that rayon already has parallel iterators for `Vec`s and slices, but we will
not use them so we see how to implement parallel iterators from the ground up.
we use vectors (and slices) to store and access our data. Finally, we'll use 
`i32`s as a stand-in for the data[^send] inside our collection.

```rust
struct IntegerCollection {
  data : Vec<i32>,
}
```
We will make heavy use of the fact that we can split a vector into slices and 
that there are sequential iterators over slices. Again, we will not exploit
rayons parallel iterators on slices or `Vec`s.

## Rayon Tour de Force
I am interested in writing an iterator that implements both rayons
[`ParallelIterator`](https://docs.rs/rayon/latest/rayon/iter/trait.ParallelIterator.html)
as well as [`IndexedParallelIterator`](https://docs.rs/rayon/latest/rayon/iter/trait.IndexedParallelIterator.html#),
which makes this (in rayon's terms) a "random access" iterator with an exactly 
known length. Some of what I am going to say is going to be true for parallel
iterators that are not random access, but other things won't be, so keep that in 
mind.

We will start out by writing a structure for the parallel iterator over our data 
and we'll see that we can implement all but one required method of
`ParallelIterator` and `IndexedParallelIterator` pretty easily. For the final 
piece of the puzzle, we have to understand rayon's concept of a [`Producer`](https://docs.rs/rayon/latest/rayon/iter/plumbing/trait.Producer.html).
It helps to think of rayon as a divide and conquer multithreading library.
It wants to split the whole iteration into smaller and smaller chunks,
distribute them across threads, then fall back to regular sequential iterators 
to perform the actual work within the threads, before piecing the iteration 
together again. Producers are the glue that allow rayon to understand how to 
split your iteration into smaller chunks and how to iterate over those chunks 
_sequentially_. If that all seems a bit much now, bear with me.

# The Implementation
So let's get to work and see how to actually implement parallel iterators here.

## Charging Iterators Head On
Let's start with how our iterator could look like:
```rust
struct ParallelIntegerIterator<'a> {
  data_slice : &'a [i32]
}
```
This seems like a reasonable starting point for the iterator. It borrows a slice of 
the data of the `IntegerCollection` immutably and thus there is a clear way how we 
can split this iterator and how we can iterate over it sequentially, which we'll 
need to do eventually.

I already mentioned I want to write a parallel iterator that has an exactly
known size. So the two traits I have to implement are [`ParallelIterator`](https://docs.rs/rayon/latest/rayon/iter/trait.ParallelIterator.html)
and [`IndexedParallelIterator`](https://docs.rs/rayon/latest/rayon/iter/trait.IndexedParallelIterator.html#)
on my iterator. Let's start with an iterator that borrows the data immutably first. 
So we start out by implementing all the required methods and just putting a `todo!()`
into each body to appease the compiler. This looks something like this:

```rust 
impl<'a> ParallelIterator for ParDataIter<'a> {
    type Item = &'a i32;

    fn drive_unindexed<C>(self, consumer: C) -> C::Result
    where
        C: rayon::iter::plumbing::UnindexedConsumer<Self::Item>,
    {
        todo!()
    }
}
```
The `ParallelIterator` trait only has one required method, which seems not that
bad, right? The associated type `Item` is clear, because we want to iterate over
references to the data, so we make it `&'a i32` right away .Let's look at the 
second iterator trait now before we go any further:
```rust 
impl<'a> IndexedParallelIterator for ParDataIter<'a> {
    fn with_producer<CB: rayon::iter::plumbing::ProducerCallback<Self::Item>>(
        self,
        callback: CB,
    ) -> CB::Output {
        todo!()
    }

    fn drive<C: rayon::iter::plumbing::Consumer<Self::Item>>(self, consumer: C) -> C::Result {
        todo!()
    }

    fn len(&self) -> usize {
        todo!()
    }
}
```
This one has three methods we need to implement. The simplest one is `len`, which
must return the number of elements that this parallel iterator contains. This is 
just `self.data_slice.len()` and we're done.

!!! NEXT WE CAN TACKLE DRIVE AND DRIVE UNINDEXED. TO SEE _WHAT_ THEY DO, READ NIKOS POST,
which does not really tell you HOW TO IMPLEMENT THEM. 

!!!!!TODO IMPLEMENT opt_len for iterator!!!!!!!!!!!

!!!!!!!!! THE HELPER TRAITS !!! useful if there's only one way to convert 
your data into an iterator. But we can also have member functions that return 
iterators if there is not only one unique way of iterating over the data. !!!
FOR example with matrices, we could have  a `par_row_iter`, _and_ a `par_column_iter`
member function that return a parallel iterator over the rows or columns respectively.

# Endnotes
[^double_ended]: As a matter of fact, those iterators implement [`ExactSizeIterator`](https://doc.rust-lang.org/std/iter/trait.ExactSizeIterator.html#) as well as [`DoubleEndedIterator`](https://doc.rust-lang.org/std/iter/trait.DoubleEndedIterator.html#), which will be important later.
[^send]: Note that `i32` is `Send`, which is also important later.
