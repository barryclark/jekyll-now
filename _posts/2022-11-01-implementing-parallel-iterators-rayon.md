---
layout: post
tags: rust rayon parallel concurrency multi-threading
#categories: []
date: 2022-11-01
last_updated:
#excerpt: ''
#description:
#permalink:
title: Implementing Rayon's Parallel Iterators - A Tutorial
#
#
# Make sure this image is correct !!!
og_image: parallel-iterators.png
#
#
# Make sure comments are enabled !!!	
comments_id: 39
---

Rayon is a brilliant piece of engineering that is so simple to use that one 
seldom has to descend into its depths. This is the story of how I 
learned to implement [rayon's](https://docs.rs/rayon/latest/rayon/)
[`ParallelIterator`](https://docs.rs/rayon/latest/rayon/iter/trait.ParallelIterator.html)
trait for my own type. There are tons of guides on _how to use_ rayon's parallel
iterators and there are a few explanations on _how they work_ under the hood. However,
I found no tutorials on _how to implement one_ on my own type from the ground up.
This article aims to close that gap.

There is a fair bit of complexity around rayon's parallel iterators and this tutorial
cannot explain every nook and cranny. What I'd rather do is give a guide
for a not-too-trivial example. It might or might not be enough for your use case
, but you'll have an understanding of the map of the territory either way.

# Existing Literature

First, here is a collection of prior art on the subject of implementing parallel iterators.
I've ordered this in ascending order of usefulness (as perceived by me). I recommend to read
this guide first and then go back to the literature referenced in this section.
Eventually, reading [the source](https://github.com/rayon-rs/rayon/tree/master/src)
will prove invaluable, though it would not be my first port of call.

Inside the rayon repository, there is a [plumbing/README.md](https://github.com/rayon-rs/rayon/blob/master/src/iter/plumbing/README.md).
It was too terse as an introduction for me, but it does come in handy as a refresher
or if you have prior knowledge. What I found very helpful in understanding how rayon
thinks about parallel iterators is the three part blog series
([Part 1 - Foundations](https://smallcultfollowing.com/babysteps/blog/2016/02/19/parallel-iterators-part-1-foundations/),
[Part 2 - Producers](https://smallcultfollowing.com/babysteps/blog/2016/02/25/parallel-iterators-part-2-producers/),
[Part 3 - Consumers](https://smallcultfollowing.com/babysteps/blog/2016/11/14/parallel-iterators-part-3-consumers/))
by Niko Matsakis, rayon's creator. It's a brilliant introduction to this subject
and I hope this guide will complement it nicely. We're going to see
the principles applied to an example.

Finally, it's worth noting that often you don't really _have_ to implement your own
parallel iterator from the ground up because you can use what's already there
in rayon. [Here](https://stackoverflow.com/questions/59028562/implementing-a-rayoniterparalleliterator)
and [here](https://github.com/dimforge/nalgebra/issues/848) are examples of how the
[`par_bridge`](https://docs.rs/rayon/latest/rayon/iter/trait.ParallelBridge.html)
and [`par_chunks`](https://docs.rs/rayon/latest/rayon/slice/trait.ParallelSlice.html)
functionality can be used as quick alternatives to implementing custom iterators.
[Here](https://github.com/rayon-rs/rayon/issues/643) is an example of how to
make use of rayon's existing iterators to implement your own iterator with less
overhead. But what if it turns out you do have to (or want to) implement a parallel
iterator from the ground up? _That_ is where this guide comes in.

# Groundwork

First let's get to know our example and draw a very rough map of the rayon
territory.

## Our Example

We'll implement parallel iterators for a collection of some data where sequential
iterators are already present. This is a common use case. Our example will be
deliberately simple, which is why I use vectors and slices as the underlying ways
of storing and accessing our data. Those already give us sequential iterators[^double_ended].
Note that rayon already has parallel iterators for `Vec`s and slices, but we will
_not_ use them. So we learn how to implement parallel iterators from first principles.
For convenience, we'll use `i32`s as a stand-in for the data[^send] inside our collection.

```rust
type Data = i32;

struct DataCollection {
  data : Vec<Data>,
}
```

We will make heavy use of the fact that we can split a vector into slices and
that there are sequential iterators over slices. Again, we will not exploit
rayons parallel iterators over slices or `Vec`s.

## Rayon Tour de Force

I am interested in writing an iterator that implements both rayons
[`ParallelIterator`](https://docs.rs/rayon/latest/rayon/iter/trait.ParallelIterator.html)
as well as [`IndexedParallelIterator`](https://docs.rs/rayon/latest/rayon/iter/trait.IndexedParallelIterator.html#),
which makes this (in rayon's terms) a "random access" iterator with an exactly
known length. Some of what I am going to say will be true for other types 
of parallel iterators but some things won't be, so keep that in
mind.

We will start out by writing a structure for the parallel iterator over our data
and we'll see that we can implement all but one required method of
`ParallelIterator` and `IndexedParallelIterator` pretty easily. For the final
piece of the puzzle, we have to understand rayon's concept of a [`Producer`](https://docs.rs/rayon/latest/rayon/iter/plumbing/trait.Producer.html).
It helps to think of rayon as a divide and conquer multithreading library.
It wants to split the whole iteration into smaller and smaller chunks,
distribute them across threads, then fall back to regular sequential iterators
to perform the actual work within the threads.
Producers are the glue that allows rayon to understand how to
split your iteration into smaller chunks and how to iterate over those chunks
_sequentially_. If that all seems a bit much now, bear with me.

# The Implementation

Here we'll see how to implement parallel iterators that iterate over (mutably
or immutably) borrowed data.

## (Indexed) Parallel Iterators

Since we are borrowing the data, the easiest way is to provide the iterator
with a reference to a slice of the data. Let's start with iterators over immutable
references fist.

```rust
struct ParDataIter<'a> {
  data_slice : &'a [Data]
}
```

I already mentioned that I want to write a parallel iterator that has an exactly
known size. So the two traits we have to implement are [`ParallelIterator`](https://docs.rs/rayon/latest/rayon/iter/trait.ParallelIterator.html)
and [`IndexedParallelIterator`](https://docs.rs/rayon/latest/rayon/iter/trait.IndexedParallelIterator.html#)
on our `ParDataIter`. Let's start out by implementing all the required methods by
just putting a `todo!()` into each body to appease the compiler.
This looks something like this:

```rust
impl<'a> ParallelIterator for ParDataIter<'a> {
    type Item = &'a i32;

    fn drive_unindexed<C>(self, consumer: C) -> C::Result
    where C: UnindexedConsumer<Self::Item> {
        todo!()
    }
}
```

The `ParallelIterator` trait only has one required method, which seems not that
bad, right? The associated type `Item` is clear, because we want to iterate over
references to the data, so we make it `&'a i32` right away. Now let's look at the
second iterator trait before we go any further:

```rust
impl<'a> IndexedParallelIterator for ParDataIter<'a> {
    fn with_producer<CB: ProducerCallback<Self::Item>>(
        self,
        callback: CB,
    ) -> CB::Output {
        todo!()
    }

    fn drive<C: Consumer<Self::Item>>(self, consumer: C) -> C::Result {
        todo!()
    }

    fn len(&self) -> usize {
        todo!()
    }
}
```

This one has three methods we need to implement. The simplest one is `len`, which
must return the number of elements that this parallel iterator produces. This is
just `self.data_slice.len()` and we're done. The next two methods we implement
are `drive_unindexed` and `drive` of `ParallelIterator` and `IndexedParallelIterator`,
respectively. The three part series by Niko Matsakis linked above gives a great
explanation of what the logic behind these methods is. Here, we'll take a practical
approach and look at how rayon goes about implementing these methods.
In the [parallel iterator Implementation for slices](https://github.com/rayon-rs/rayon/blob/3e8f617e21b8e6957e0c378a299096046ce36f9e/src/slice/mod.rs)
in lines 708 and 721, we can see that both methods are implemented by a simple
call to `bridge(self, consumer)`. Interesting! If we look at the documentation of
[`rayon::iter::plumbing::bridge`](https://docs.rs/rayon/latest/rayon/iter/plumbing/fn.bridge.html)
we find:

> This helper function is used to “connect” a parallel iterator to a consumer.
> [...]
> This is useful when you are implementing your own parallel iterators:
> it is often used as the definition of the `drive_unindexed` or `drive` methods.

The last sentence tells us that this is exactly what we need. It is worth noting
that `bridge` requires the first argument (i.e. `self`) to implement `IndexedParallelIterator`,
which is no problem for us, because that is what we are doing anyways. That lets
us fill all but one method with the correct logic. Before we see how to implement
`with_producer`, let's throw in a low-hanging optimization in there.

`ParallelIterator` has a method [`opt_len(&self)->Option<usize>`](https://docs.rs/rayon/latest/rayon/iter/trait.ParallelIterator.html#method.opt_len)
that returns the length of this iterator if it is known. We can just return
`Some(self.len())`, which calls the `len` method of `self` as an implementor of
`IndexedParallelIterator`. In summary, this leaves us with this code:

```rust
impl<'a> ParallelIterator for ParDataIter<'a> {
    type Item = &'a i32;

    fn drive_unindexed<C>(self, consumer: C) -> C::Result
    where
        C: UnindexedConsumer<Self::Item> {
        bridge(self,consumer)
    }

    fn opt_len(&self) -> Option<usize> {
      Some(self.len())
    }
}

impl<'a> IndexedParallelIterator for ParDataIter<'a> {
    fn with_producer<CB: ProducerCallback<Self::Item>>(
        self,
        callback: CB,
    ) -> CB::Output {
        todo!()
    }

    fn drive<C: Consumer<Self::Item>>(self, consumer: C) -> C::Result {
        bridge(self,consumer)
    }

    fn len(&self) -> usize {
        self.data_slice.len()
    }
}
```

So the only thing left to implement is `with_producer` and we're done.

## Producers

It's pretty important to understand rayon's concept of producers when we want
to implement parallel iterators. They work in hand in hand with a concept called
_consumers_. Put simply, producers produce elements and consumers consume them.
I know: thanks Captain Obvious! But bear with me. Functions like `fold` on 
parallel iterators work with a `FoldConsumer` [under the hood](https://github.com/rayon-rs/rayon/blob/master/src/iter/fold.rs)
that consumes the elements produced by the producer. That's about all we
need to know about consumers here, but we need to dive into producers a little
bit more. Producers are described by the rayon documentation [like  this](https://docs.rs/rayon/1.5.3/rayon/iter/plumbing/trait.Producer.html#method.min_len):

> A Producer is effectively a “splittable IntoIterator”. That is, a producer is
> a value which can be converted into an iterator at any time: at that point,
> it simply produces items on demand, like any iterator. But what makes a Producer
> special is that, before we convert to an iterator, we can also split it at a
> particular point using the `split_at` method.

So a producer allows us to split the range over which we iterate and it can
be made into a _sequential_ iterator at any time. So let's try and create a
producer for the elements of our `DataCollection`. Let's create a new structure
for the producer [^producer]:

```rust
struct DataProducer<'a> {
  data_slice : &'a [Data],
}
```

To implement the [`Producer`](https://docs.rs/rayon/1.5.3/rayon/iter/plumbing/trait.Producer.html#)
trait for this structure we have to know essentially three things.

1. What is the sequential iterator into which this producer can be made?
2. What type of item does said iterator produce?
3. How can we split the producer into two at a given index?

Let's start at the top. The sequential iterator should be the iterator over a
borrowed slice of `Data`, i.e. [`std::slice::Iter<'a,Data>`](https://doc.rust-lang.org/std/slice/struct.Iter.html).
This implies that the type of item returned from this iterator is `&'a Data`. It is
worth noting that `Producer` requires the returned iterator to implement both
[`DoubleEndedIterator`](https://doc.rust-lang.org/nightly/core/iter/traits/double_ended/trait.DoubleEndedIterator.html)
as well as [`ExactSizeIterator`](https://doc.rust-lang.org/nightly/core/iter/traits/exact_size/trait.ExactSizeIterator.html).
This is no problem for us because slice iterators implement both these traits[^mod_iter].
Finally,we can split our producer by splitting the borrowed slice by
using [`split_at`](https://doc.rust-lang.org/std/primitive.slice.html#method.split_at).
Our implementation can thus look like this:

```rust
impl<'a> Producer for DataProducer<'a> {
    type Item = &'a Data;
    type IntoIter = std::slice::Iter<'a, Data>;

    fn into_iter(self) -> Self::IntoIter {
        self.data_slice.iter()
    }

    fn split_at(self, index: usize) -> (Self, Self) {
        let (left, right) = self.data_slice.split_at(index);
        (
            DataProducer { data_slice: left },
            DataProducer { data_slice: right },
        )
    }
}
```

And just like that we have our producer. Let's add some convenience functionality
to go from a parallel iterator to a producer. This will come in handy momentarily.

```rust
impl<'a> From<ParDataIter<'a>> for DataProducer<'a> {
    fn from(iterator: ParDataIter<'a>) -> Self {
        Self {
            data_slice: iterator.data_slice,
        }
    }
}
```

Finally, we can revisit our implementation of `IndexedParallelIterator` for
`ParDataIter` and fill in the missing piece.

```rust
impl<'iter> IndexedParallelIterator for ParDataIter<'iter> {
    fn with_producer<CB: ProducerCallback<Self::Item>>(
        self,
        callback: CB,
    ) -> CB::Output {
        let producer = DataProducer::from(self);
        callback.callback(producer)
    }

// --- other methods unchanged ---
// [...]
}
```

If you are wondering what on earth a producer callback is, I recommend to
read the appropriately titled section ["What on earth is `ProducerCallback`"](https://github.com/rayon-rs/rayon/blob/master/src/iter/plumbing/README.md#producer-callback)
in the rayon README. For us as implementors, we just need to remember
to invoke that callback function on a producer that we create from
our iterator. We do that by using the slightly awkward (but very cleverly
designed) `callback.callback(producer)` syntax.

## Usage and Ergonomics

Now we have sucessfully implemented a parallel iterator. There is one final thing
we need to do before we can use it. We have to expose an interface on our datastructure
to get one. We can for example expose a member function

```rust
impl DataCollection {
    pub fn parallel_iterator(&self) -> ParDataIter {
    ParDataIter {
      data_slice : &self.data,
    }
  }
}
```

Now we can call this function on our collection to obtain a parallel iterator
and this is a fine way to do so. Matter of fact, for structures that have more
than one way to iterate over their data it is good practice to implement 
descriptive member functions that return different kinds of parallel iterators.
Think e.g. of a matrix that could have element wise, column wise, and row wise parallel
iterators.

However, if there is only one way to reasonable iterate over the elements
in our datastructure, rayon has a nice feature through blanket implementations.
There is a trait [`IntoParallelRefIterator`](https://docs.rs/rayon/latest/rayon/iter/trait.IntoParallelRefIterator.html#)
that exposes a function `par_iter()` that iterates over references of elements.
We don't implement this trait directly, but we get it for free when implementing
`IntoParallelIterator` for `&DataCollection`. So let's do that:

```rust
impl<'a> IntoParallelIterator for &'a DataCollection {
    type Iter = ParDataIter<'a>;
    type Item = &'a i32;

    fn into_par_iter(self) -> Self::Iter {
        ParDataIter { data_slice: &self.data }
    }
}
```  

## Example Code on the Rust Playground
You can find all the code plus more [on the playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&code=use%20std%3A%3Afmt%3A%3ADebug%3B%0A%0Ause%20rayon%3A%3A%7B%0A%20%20%20%20iter%3A%3Aplumbing%3A%3A%7Bbridge%2C%20Producer%7D%2C%0A%20%20%20%20prelude%3A%3A*%2C%0A%7D%3B%0A%0Atype%20Data%20%3D%20i32%3B%0A%0Afn%20main()%20%7B%0A%20%20%20%20let%20mut%20data%20%3D%20DataCollection%3A%3Anew(%5B1%2C%202%2C%203%2C%204%5D)%3B%0A%0A%20%20%20%20data.par_iter_mut().for_each(%7Cx%7C%20*x%20%3D%20-*x)%3B%0A%20%20%20%20println!(%22numbers%20mutated%20to%20negative%3A%20%7B%3A%3F%7D%22%2C%20data)%3B%0A%0A%20%20%20%20let%20sum_of_squares%3A%20Data%20%3D%20data.par_iter().map(%7Cx%7C%20x%20*%20x).sum()%3B%0A%0A%20%20%20%20println!(%22parallel%20calculation%20of%20sum%20of%20squares%3A%20%7B%7D%22%2C%20sum_of_squares)%3B%0A%7D%0A%0Apub%20struct%20DataCollection%20%7B%0A%20%20%20%20pub%20data%3A%20Vec%3CData%3E%2C%0A%7D%0A%0Aimpl%20Debug%20for%20DataCollection%20%7B%0A%20%20%20%20fn%20fmt(%26self%2C%20f%3A%20%26mut%20std%3A%3Afmt%3A%3AFormatter%3C%27_%3E)%20-%3E%20std%3A%3Afmt%3A%3AResult%20%7B%0A%20%20%20%20%20%20%20%20self.data.fmt(f)%0A%20%20%20%20%7D%0A%7D%0A%0Aimpl%3C%27a%3E%20IntoParallelIterator%20for%20%26%27a%20DataCollection%20%7B%0A%20%20%20%20type%20Iter%20%3D%20ParDataIter%3C%27a%3E%3B%0A%20%20%20%20type%20Item%20%3D%20%26%27a%20Data%3B%0A%0A%20%20%20%20fn%20into_par_iter(self)%20-%3E%20Self%3A%3AIter%20%7B%0A%20%20%20%20%20%20%20%20ParDataIter%20%7B%20data%3A%20%26self.data%20%7D%0A%20%20%20%20%7D%0A%7D%0A%0Aimpl%3C%27a%3E%20IntoParallelIterator%20for%20%26%27a%20mut%20DataCollection%20%7B%0A%20%20%20%20type%20Iter%20%3D%20ParDataIterMut%3C%27a%3E%3B%0A%20%20%20%20type%20Item%20%3D%20%26%27a%20mut%20Data%3B%0A%0A%20%20%20%20fn%20into_par_iter(self)%20-%3E%20Self%3A%3AIter%20%7B%0A%20%20%20%20%20%20%20%20ParDataIterMut%20%7B%20data%3A%20self%20%7D%0A%20%20%20%20%7D%0A%7D%0A%0Aimpl%20DataCollection%20%7B%0A%20%20%20%20pub%20fn%20new%3CI%3E(data%3A%20I)%20-%3E%20Self%0A%20%20%20%20where%0A%20%20%20%20%20%20%20%20I%3A%20IntoIterator%3CItem%20%3D%20Data%3E%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20Self%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20data%3A%20data.into_iter().collect()%2C%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D%0A%0Apub%20struct%20ParDataIter%3C%27a%3E%20%7B%0A%20%20%20%20data%3A%20%26%27a%20%5BData%5D%2C%0A%7D%0A%0Apub%20struct%20ParDataIterMut%3C%27a%3E%20%7B%0A%20%20%20%20data%3A%20%26%27a%20mut%20DataCollection%2C%0A%7D%0A%0Aimpl%3C%27a%3E%20ParallelIterator%20for%20ParDataIter%3C%27a%3E%20%7B%0A%20%20%20%20type%20Item%20%3D%20%26%27a%20Data%3B%0A%0A%20%20%20%20fn%20drive_unindexed%3CC%3E(self%2C%20consumer%3A%20C)%20-%3E%20C%3A%3AResult%0A%20%20%20%20where%0A%20%20%20%20%20%20%20%20C%3A%20rayon%3A%3Aiter%3A%3Aplumbing%3A%3AUnindexedConsumer%3CSelf%3A%3AItem%3E%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20bridge(self%2C%20consumer)%0A%20%20%20%20%7D%0A%0A%20%20%20%20fn%20opt_len(%26self)%20-%3E%20Option%3Cusize%3E%20%7B%0A%20%20%20%20%20%20%20%20Some(%3CSelf%20as%20IndexedParallelIterator%3E%3A%3Alen(self))%0A%20%20%20%20%7D%0A%7D%0A%0Aimpl%3C%27a%3E%20ParallelIterator%20for%20ParDataIterMut%3C%27a%3E%20%7B%0A%20%20%20%20type%20Item%20%3D%20%26%27a%20mut%20Data%3B%0A%20%20%20%20fn%20drive_unindexed%3CC%3E(self%2C%20consumer%3A%20C)%20-%3E%20C%3A%3AResult%0A%20%20%20%20where%0A%20%20%20%20%20%20%20%20C%3A%20rayon%3A%3Aiter%3A%3Aplumbing%3A%3AUnindexedConsumer%3CSelf%3A%3AItem%3E%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20bridge(self%2C%20consumer)%0A%20%20%20%20%7D%0A%0A%20%20%20%20fn%20opt_len(%26self)%20-%3E%20Option%3Cusize%3E%20%7B%0A%20%20%20%20%20%20%20%20Some(%3CSelf%20as%20IndexedParallelIterator%3E%3A%3Alen(self))%0A%20%20%20%20%7D%0A%7D%0A%0Aimpl%3C%27a%3E%20IndexedParallelIterator%20for%20ParDataIter%3C%27a%3E%20%7B%0A%20%20%20%20fn%20with_producer%3CCB%3A%20rayon%3A%3Aiter%3A%3Aplumbing%3A%3AProducerCallback%3CSelf%3A%3AItem%3E%3E(%0A%20%20%20%20%20%20%20%20self%2C%0A%20%20%20%20%20%20%20%20callback%3A%20CB%2C%0A%20%20%20%20)%20-%3E%20CB%3A%3AOutput%20%7B%0A%20%20%20%20%20%20%20%20let%20data_producer%20%3D%20DataProducer%3A%3Afrom(self)%3B%0A%20%20%20%20%20%20%20%20callback.callback(data_producer)%0A%20%20%20%20%7D%0A%0A%20%20%20%20fn%20drive%3CC%3A%20rayon%3A%3Aiter%3A%3Aplumbing%3A%3AConsumer%3CSelf%3A%3AItem%3E%3E(self%2C%20consumer%3A%20C)%20-%3E%20C%3A%3AResult%20%7B%0A%20%20%20%20%20%20%20%20bridge(self%2C%20consumer)%0A%20%20%20%20%7D%0A%0A%20%20%20%20fn%20len(%26self)%20-%3E%20usize%20%7B%0A%20%20%20%20%20%20%20%20self.data.len()%0A%20%20%20%20%7D%0A%7D%0A%0Aimpl%3C%27a%3E%20IndexedParallelIterator%20for%20ParDataIterMut%3C%27a%3E%20%7B%0A%20%20%20%20fn%20with_producer%3CCB%3A%20rayon%3A%3Aiter%3A%3Aplumbing%3A%3AProducerCallback%3CSelf%3A%3AItem%3E%3E(%0A%20%20%20%20%20%20%20%20self%2C%0A%20%20%20%20%20%20%20%20callback%3A%20CB%2C%0A%20%20%20%20)%20-%3E%20CB%3A%3AOutput%20%7B%0A%20%20%20%20%20%20%20%20let%20producer%20%3D%20DataProducerMut%3A%3Afrom(self)%3B%0A%20%20%20%20%20%20%20%20callback.callback(producer)%0A%20%20%20%20%7D%0A%0A%20%20%20%20fn%20drive%3CC%3A%20rayon%3A%3Aiter%3A%3Aplumbing%3A%3AConsumer%3CSelf%3A%3AItem%3E%3E(self%2C%20consumer%3A%20C)%20-%3E%20C%3A%3AResult%20%7B%0A%20%20%20%20%20%20%20%20bridge(self%2C%20consumer)%0A%20%20%20%20%7D%0A%0A%20%20%20%20fn%20len(%26self)%20-%3E%20usize%20%7B%0A%20%20%20%20%20%20%20%20self.data.data.len()%0A%20%20%20%20%7D%0A%7D%0A%0Apub%20struct%20DataProducer%3C%27a%3E%20%7B%0A%20%20%20%20data_slice%3A%20%26%27a%20%5BData%5D%2C%0A%7D%0A%0Apub%20struct%20DataProducerMut%3C%27a%3E%20%7B%0A%20%20%20%20data_slice%3A%20%26%27a%20mut%20%5BData%5D%2C%0A%7D%0A%0Aimpl%3C%27a%3E%20From%3C%26%27a%20mut%20%5BData%5D%3E%20for%20DataProducerMut%3C%27a%3E%20%7B%0A%20%20%20%20fn%20from(data_slice%3A%20%26%27a%20mut%20%5BData%5D)%20-%3E%20Self%20%7B%0A%20%20%20%20%20%20%20%20Self%20%7B%20data_slice%20%7D%0A%20%20%20%20%7D%0A%7D%0A%0Aimpl%3C%27a%3E%20From%3CParDataIter%3C%27a%3E%3E%20for%20DataProducer%3C%27a%3E%20%7B%0A%20%20%20%20fn%20from(iterator%3A%20ParDataIter%3C%27a%3E)%20-%3E%20Self%20%7B%0A%20%20%20%20%20%20%20%20Self%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20data_slice%3A%20%26iterator.data%2C%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D%0A%0Aimpl%3C%27a%3E%20From%3CParDataIterMut%3C%27a%3E%3E%20for%20DataProducerMut%3C%27a%3E%20%7B%0A%20%20%20%20fn%20from(iterator%3A%20ParDataIterMut%3C%27a%3E)%20-%3E%20Self%20%7B%0A%20%20%20%20%20%20%20%20Self%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20data_slice%3A%20%26mut%20iterator.data.data%2C%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D%0A%0Aimpl%3C%27a%3E%20Producer%20for%20DataProducer%3C%27a%3E%20%7B%0A%20%20%20%20type%20Item%20%3D%20%26%27a%20Data%3B%0A%20%20%20%20type%20IntoIter%20%3D%20std%3A%3Aslice%3A%3AIter%3C%27a%2C%20Data%3E%3B%0A%0A%20%20%20%20fn%20into_iter(self)%20-%3E%20Self%3A%3AIntoIter%20%7B%0A%20%20%20%20%20%20%20%20self.data_slice.iter()%0A%20%20%20%20%7D%0A%0A%20%20%20%20fn%20split_at(self%2C%20index%3A%20usize)%20-%3E%20(Self%2C%20Self)%20%7B%0A%20%20%20%20%20%20%20%20let%20(left%2C%20right)%20%3D%20self.data_slice.split_at(index)%3B%0A%20%20%20%20%20%20%20%20(%0A%20%20%20%20%20%20%20%20%20%20%20%20DataProducer%20%7B%20data_slice%3A%20left%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20DataProducer%20%7B%20data_slice%3A%20right%20%7D%2C%0A%20%20%20%20%20%20%20%20)%0A%20%20%20%20%7D%0A%7D%0A%0Aimpl%3C%27a%3E%20Producer%20for%20DataProducerMut%3C%27a%3E%20%7B%0A%20%20%20%20type%20Item%20%3D%20%26%27a%20mut%20Data%3B%0A%20%20%20%20type%20IntoIter%20%3D%20std%3A%3Aslice%3A%3AIterMut%3C%27a%2C%20Data%3E%3B%0A%0A%20%20%20%20fn%20into_iter(self)%20-%3E%20Self%3A%3AIntoIter%20%7B%0A%20%20%20%20%20%20%20%20self.data_slice.iter_mut()%0A%20%20%20%20%7D%0A%0A%20%20%20%20fn%20split_at(self%2C%20index%3A%20usize)%20-%3E%20(Self%2C%20Self)%20%7B%0A%20%20%20%20%20%20%20%20let%20(left%2C%20right)%20%3D%20self.data_slice.split_at_mut(index)%3B%0A%20%20%20%20%20%20%20%20(Self%3A%3Afrom(left)%2C%20Self%3A%3Afrom(right))%0A%20%20%20%20%7D%0A%7D)
Additionally, the playground code includes an implementation of _mutable_ iteration.
All of this together allows us to do something like this:

```rust
fn main() {
    let mut data = DataCollection{data : vec![1, 2, 3, 4]};

    data.par_iter_mut().for_each(|x| *x = -*x);
    println!("numbers mutated to negative: {:?}", data);

    let sum_of_squares: Data = data.par_iter().map(|x| x * x).sum();
    println!("parallel calculation of sum of squares: {}", sum_of_squares);
}
```

## Parallel Iterators for Mutable Data

So far we have only seen an implementation to immutably iterate over our data.
The good thing is that adding parallel iterators for mutable data
is dead simple, because we can just replace all our `&'a` with `&'a mut`
for mutable iteration. So what we do is create a second iterator for mutable iteration
`ParDataIterMut` that references a _mutable_ slice. We implement the two iterator
traits just as above. That means we'll have to create an analogous `DataProducerMut`,
plug everything together again and voilà we're done[^lifetimes]. The playground
link above has the code for mutable iterators as well.

# Conclusion

Multithreading is hard and it is a testament to the genius design of the
rayon library, that so much of the complexity is abstracted away from us.
Ninetynine percent of the time we can just replace `iter()` for `par_iter()`
and enjoy the magic. We usually don't have to know how to implement our own parallel
iterators, but if you find yourself wanting to, I hope this tutorial has given
you an idea of how to go about it. Now is probably a good time to look at all the
prior art that I mentioned at the beginning of this article, if you haven't
already.

# Endnotes

[^double_ended]: As a matter of fact, those iterators implement [`ExactSizeIterator`](https://doc.rust-lang.org/std/iter/trait.ExactSizeIterator.html#) as well as [`DoubleEndedIterator`](https://doc.rust-lang.org/std/iter/trait.DoubleEndedIterator.html#), which will be important later.
[^send]: Note that `i32` is `Send`, which is also important later.
[^producer]: The astute reader will have noticed that the producer here looks just like the parallel iterator structure. I have seen this code duplication inside of [the rayon codebase](https://github.com/rayon-rs/rayon/blob/3e8f617e21b8e6957e0c378a299096046ce36f9e/src/slice/mod.rs) as well. There's no reason why we could not implement the `Producer` trait on our parallel iterator type. This will not work for every use case, but it certainly would for our particular example. I have also written parallel iterators where I was able to modify the sequential iterators so that they implemented the `Producer` trait. This, of course, is only possible if you own the codebase that contains the sequential iterators. We'll stick to the most general case here and won't bother ourselves with reducing code duplication too much.
[^mod_iter]: If the sequential iterator for your use case does not implement these traits, this gets trickier. You can either try and implement them for the iterator (if you own the codebase) or create a new sequential iterator that implements them, possibly by wrapping the existing one.
[^lifetimes]: While it truly _is_ that simple for our case, it does not have to be in all cases. The borrow checker might complain about certain code containing mutable references that it will accept for immutable references.
