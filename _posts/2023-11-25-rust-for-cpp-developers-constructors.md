---
layout: post
tags: rust c++ patterns 
#categories: []
date: 2023-11-25
last_updated: 
#excerpt: ''
#description:
#permalink:
title: 'Idiomatic Rust (for C++ Devs): Constructors & Conversions'
#
#
# Make sure this image is correct !!!
og_image: rust-4-cpp-constructors.png
#
#
# Make sure comments are enabled !!!	
comments_id: 54
---

Starting out in Rust as a C++ developer, one of the features I missed most
at first were constructors. In this post, we explore the many roles that
constructors have in C++ and see how they can (or can't) be mapped to different
parts of the Rust language. Although I'll use C++ terminology,
this article is likely helpful for developers coming to Rust from other
languages as well.

There are many types of constructors in C++ and, as we'll see, they serve a wide
range of purposes. I'll address these purposes section by section and we'll explore
if and how we can map them to Rust.

# Initialization

One of the most obvious (and most important) purposes of constructors is to 
provide a way to initialize an instance of a type[^initialization-cpp]. Say 
we have a simple class declaration like so:

```c++
class Rectangle {
public:
    Rectangle(double width, double height);
private:
    double width;
    double height;
}
/**omitted definitions**/

// Usage
int main() {
    Rectangle rect(1.,2.);
    //...
}
```

Here, the constructor allows us to initialize the private fields of the 
`Rectangle` class, which is pretty useful if we appreciate encapsulation. 

Before we jump into how to map this usecase to Rust,
let's note that constructors are so called _special member functions_ in C++.
They have special syntax for both how they are defined and how they are used,
but really constructors are just functions that take some arguments and return an instance 
of the type. There's nothing stopping us from just creating a static member 
function that takes the width and height and returns a rectangle[^named-constr].
In fact, this idiom in C++ is called [Named Constructors](https://isocpp.org/wiki/faq/ctors#named-ctor-idiom).
The ISO C++ website calls it a "technique that provides more intuitive and/or
safer construction operations for users of your class" ([link](https://isocpp.org/wiki/faq/ctors#named-ctor-idiom)).

Interestingly, that's exactly how we would do it in Rust. We just write an associated
function (the equivalent of a static member function) that returns `Self`[^Self] and takes 
some arguments.

```rust
struct Rectangle {
    width: f64,
    height: f64,
}

impl Rectangle {
    pub fn new(width: f64, height: f64) -> Self {
        Self {
            width,
            height,
        }
    }

    pub fn square(dim : f64) -> Self {
        Self {
            width : dim,
            height : dim,
        }
    }
}
```

Rust has no special syntax or semantics for these types of constructors. If we want to provide them,
we just write associated functions that return an instance of our type. Since 
`new` is not a keyword in Rust, it is customary (but by no means mandatory) to call 
one constructor of our type, preferrebly one that a lot of users will interact with,
`new`. That `new`-function can take the number of arguments that make sense (including no arguments).
For our rectangle that would be the width and height.

If we want to provide another constructor, Rust forces us to create another associated
function and call it by a different name than `new`. There is no function overloading in 
Rust[^function-overloading] and no default arguments, so we are forced to create 
a different function which makes us think about a useful name. For our `Rectangle`
struct that would be the `square` associated function which makes its purpose very
explicit. In C++ we might be tempted to overload a constructor that just takes
one parameter. While this might be be okay-ish for a rectangle type, it can quickly
become a problem for more complex types.

One example from the Rust standard library is for example [`Vec::new`](https://doc.rust-lang.org/std/vec/struct.Vec.html#method.new)
that takes no arguments and constructs an empty vector. To create a vector with 
a given capacity we use [`Vec::with_capacity`](https://doc.rust-lang.org/std/vec/struct.Vec.html#method.with_capacity)
and pass it the initial capacity.

## Enforcing Invariants with Constructors that Fail

Constructors are also a great way to help us enforce some invariants about a type.
In our Rectangle example we might want to make sure that the dimensions
are nonnegative. In a constructor in C++ we would have to signal this
with an exception. Even if we were big errors-as-values proponents, we could not 
return a [`std::expected<Rectangle,std::runtime_error>`](https://en.cppreference.com/w/cpp/utility/expected)
if we wanted to. A constructor for a type `T` is a special member function that can 
only return `T`. However, the named constructor idiom would allow us
to make this adjustment.

There's a lot to be said about the pros and cons of exceptions
and this is not the place to say it. Rust does not have them and thus the way
to communicate errors is as values[^failure-panic]. If we have a constructor that 
can fail, we just make it explicit in the signature and have it return `Result<Self, Error>`
where `Error` is an appropriate error type. An example in the standard
library is [`CString::new`](https://doc.rust-lang.org/std/ffi/struct.CString.html#method.new)
that takes a string of bytes and transforms it into a 
C-style (null-terminated) string. It will return an error if there are
internal null-bytes in the given input. 

# Default Constructors

Another supremely important use case of constructors is _default construction_.
In C++, a constructor that can be called with no arguments[^no-arg-constructor] is a default
constructor and is required e.g. for many operations in standard library containers.
It's so essential in C++ that writing `T t;` for a user defined `T` will not give us 
an uninitialized instance of `T` but a default constructed one.

The extent of what _default constructed_ means semantically will vary from type to type but
at least it implies that the instance will not consist of utter random nonsense. A default 
constructed `std::shared_ptr` will not be safe to dereference but at least it contains 
a null pointer, which is much better than a random address. A default constructed 
`std::string` will be empty and can be safely printed. If we are designing 
numerical optimization library, the default constructed instance of our `Optimizer` type 
could contain sensible default values for stopping criteria and tolerances and 
thus might be ready for use as-is.

The way we signal that a type is default constructible in Rust is to implement the 
[`Default`](https://doc.rust-lang.org/std/default/trait.Default.html) trait on it.
`Default` requires exactly one associated function `fn default() -> Self`, which 
already implies that default construction cannot return an error. It's a good
idea to check whether a type implements `Default`. For example `Vec` implements 
`Default`, and it turns out writing `Vec::default()` is the same as writing `Vec::new()`.
If we write a type that exposes a `new() -> Self` constructor it is customary to 
also implement the `Default` trait. In fact, there is even 
[a clippy lint](https://rust-lang.github.io/rust-clippy/master/#/new_without_default)
for exactly that. Don't worry if you don't know enough about traits yet 
to understand how to actually use the `Default` trait in practice. I'll go 
over an example of using trait bounds further below in the section on conversions.

Now, we can implement the `Default` trait for our struct manually like so:

```rust
impl Default for Rectangle {
    fn default() -> Self {
        Self {
            width : Default::default(),
            height : Default::default(),
        }
    }
}
```
Here, we have implemented the default constructor of our struct by just calling the default constructors
of all the member fields. This is what the `Default::default()` behind the fields boils
down to. I could have written `x: 0` instead of `x: Default::default()` but this way
allows us to see that we could pretty much implement any struct's default constructor 
just by calling the the default constructor of its member fields, provided the members 
are default constructible. That's a lot of boilerplate isn't it? And that is why 
we could have stuck the line `#[derive(Default)` just above our rectangle definition
to let the compiler handle the boilerplate for us like so:

```rust
#[derive(Default)]
struct Rectangle {
    width : f64,
    height : f64,
}
```

Now we can construct a rectangle with zero width and height by calling
`Rectangle::default()`.

# Copy Constructors

Another important usecase of constructors is copying instances using the copy constructor.
If we invoke a copy constructor that is because we want a, you guessed it, _copy_ of the instance
that we can manipulate independently from the original[^independently-copy]. In 
C++, manually implementing a copy constructor means that some logic has to 
be executed that goes beyond just invoking the copy constructor of each member
field. Otherwise we would have been fine with the default copy constructor.

If we want to implement a copy constructor in Rust, we implement the
[`Clone`](https://doc.rust-lang.org/std/clone/trait.Clone.html)
trait for our type. Note that the trait is called `Clone`, not `Copy`. We'll 
get to the `Copy` trait later, but for general purpose copy constructors, the 
correct trait to use is `Clone`. To give our rectangle a copy constructor, 
we can simply implement one like so:

```rust 
impl Clone for Rectangle {
    fn clone(&self) -> Self {
        Self {
            width : self.width.clone(),
            height: self.height.clone(),
    }
}
```

The first thing we can see is that the `clone` function takes `self` by shared reference
and returns an instance of `Self`. That's how the C++ copy constructor works as well.
However, copy construction cannot fail since it does not return a `Result`[^copy-ctor-panic]. 

The second thing is that I wrote the constructor a bit peculiarly by 
invoking the copy constructors of the member fields. I just did that to make it obvious
that, just as with the default constructor above, we can let the compiler implement 
the boilerplate for us. We do that by sticking the `#[derive(Clone)]` annotation
before the struct definition. This is the semantic equivalent of `default`ing the 
copy constructor in C++, only that the Rust compiler will never implement a copy constructor 
for us without being explicitly told to. Since we already derived `Default`, this now looks like so:

```rust
#[derive(Default, Clone)]
struct Rectangle {
    width : f64,
    height : f64,
}
```

For more complex cases, we have to write the logic ourselves. But, just as with 
`default`ing the copy constructor in C++, a good old `#[derive(Clone)]` is often 
just what we need.

## Using Clone for Explicit Copy Construction

If you've worked a bit with Rust, you'll know that it has _destructive_ move
semantics and single ownership. That means, if you pass in an instance of a type into a function 
_by value_[^by-value] the instance gets moved, the ownership gets transferred, and you can 
no longer access the instance. Say we have this code:

```rust 
fn flip(img : Image) -> Image {
    //logic
}

let original = Image::new("my_image.jpg");
let flipped = flip(original);
```

In this case `original` is not accessible any more after it has been passed to 
the `flip` function. That can be pretty helpful because it allows the `flip`
function to reuse the already allocated image buffers to perform its magic. But
what if we wanted to display both the original and the flipped image next to each
other? Well, that's where `Clone` can come in handy, assuming our `Image` implements 
it[^clone-image]:

```rust 
let flipped = flip(original.clone());
```

Now we have access to the original and the flipped image, since only the temporary
instance that was created via a call to `clone` is moved into the function. This 
is not unlike pass-by-value semantics in C++. However, in Rust 
we have to explicitly call the copy constructor via a call to `clone`, while in 
C++ the copy constructor is invoked implicitly. I found the explicit cloning 
pretty irritating at first, but I realized soon that it's a great way to 
spot optimization opportunities and it encourages me to think more carefully about
the ownership semantics of my APIs.

### Deriving Clone on Generic Types 
Using the `derive` macro to implement traits that can be trivially implemented
is usually the right thing to do. However, for generic types it might be necessary
to implement `Clone` manually even if all the fields are `Clone`. For example

```rust 
#[derive(Clone)]
struct MyPointer<T> {
    inner : Rc<T>,
}
```

This struct is generic on `T` and contains only one field, a reference counted 
shared pointer of type [`Rc<T>`](https://doc.rust-lang.org/std/rc/struct.Rc.html#),
which can always be cloned. However, the derive macro will implement `Clone` for 
`MyPointer<T>` only where `T` implements `Clone`. In many cases, this is the 
correct trait bound to enforce, but in this case it's more restrictive than
it needs to be, since `Rc<T>` is always `Clone`. So we are better off manually
implementing the clone trait here, which amounts to just calling `inner.clone()`.
[Here](https://stegosaurusdormant.com/understanding-derive-clone/) is a good article
going into a bit more detail on the subject.

## Trivially Copyable Types

For some types, even calling default copy constructors (which in turn invoke the
copy constructors of the type's members) may be unnecessarily expensive, because
just doing a byte-for-byte copy to a new location would suffice. That's why, in C++,
we have the concept[^concept-triv] of [trivially copyable](https://en.cppreference.com/w/cpp/named_req/TriviallyCopyable).
Those are types that can be copied by doing a byte-for-byte copy of the memory. 
Whether a type is trivially copyable can be tested at compile time with the
[`std::is_trivially_copyable`](https://en.cppreference.com/w/cpp/types/is_trivially_copyable)
type trait, which the compiler will specialize for our types. Say we define a struct 
that is an aggregate of trivially copyable types like so:

```c++
struct Point {
    double x;
    double y;
}
```

This type, [as per the standard](https://en.cppreference.com/w/cpp/language/classes#Trivially_copyable_class),
is then also trivially copyable. If we then created an aggregate
of multiple `Point` fields, that will still be trivially copyable and so on. That's
a really neat thing in C++ because it will let the compiler replace calls to 
many copy constructors by one bulk copy[^tc-ub]. 

Rust also has the concept of trivially copyable types and has a marker trait 
called [Copy](https://doc.rust-lang.org/std/marker/trait.Copy.html) for it. Marker 
traits are traits that have no associated methods and instead tell the compiler 
some semantic properties about our type. Although it has no methods, the compiler will 
not automatically implement the `Copy` trait on our types, since Rust wants you to be 
explicit about the semantics of our types[^auto-traits]. Implementing the `Copy`
trait for our type is easy since it has no methods:

```rust 
impl Copy for Rectangle {}
```

You could also --you guessed it-- stick a `#[derive(Copy)]` above the struct definition.
There's a couple important things to note about types that implement `Copy`. Firstly,
for a type to implement `Copy`, it must also implement `Clone`. Also every field of a 
type that is declared `Copy` must itself be `Copy`. The compiler 
enforces both these things. Further, the Rust documentation 
[states](https://doc.rust-lang.org/std/clone/trait.Clone.html#how-can-i-implement-clone):

> Types that are Copy should have a trivial implementation of Clone. 
> More formally: if `T: Copy`, `x: T`, and `y: &T`, then `let x = y.clone();` is 
> equivalent to `let x = *y;`. Manual implementations should be careful to uphold
> this invariant; however, unsafe code must not rely on it to ensure memory safety.

The compiler cannot enforce that, but it can help us do the right thing if we just
`#[derive(Clone,Copy)]`. However, the aforementioned caveats on implementing 
`Clone` on generic types apply.

### Copy vs Clone 

We already saw how `Clone` comes in handy for passing a copy of an 
instance by value. Now `Copy` does something with our types that is much closer 
to the C++ semantics: every assignment or pass-by-value becomes an implicit
bitwise copy instead of a destructive move. `Copy` is the reason we can use
primitive types like `f32`, `u64` like this:

```rust
fn add(lhs: i32, right: i32) -> i32 {
    lhs + rhs
}

let x = 5;
let y = x; // (1)
let z = add(x,y); // (2)
print("{x}+{y}={z}");
```

If `i32` wasn't `Copy`, then `x` would have been moved in &#9312; and `y` would
have been moved in &#9313;. It's a useful semantic to have but if you're a library
maintainer it's also a hell of a commitment to make, because if you remove `Copy`
from a type, your users will have to go through quite a bit of pain to migrate.

# Move Constructors

I'm not sure if this concept is common in other languages, but both 
C++ and Rust have move semantics. However, the way the two languages think about
move semantics is _very_ different. That makes this section pretty straightforward.

We've already mentioned that Rust has destructive move 
semantics and ownership is transferred with a move. That means that there is 
no need for a move constructor and Rust simply does not have an equivalent. That 
also frees us from the burden of leaving moved-from values in a defined state.
In Rust, there is no such thing as a moved-from value, since the compiler will
not let us access it.

# Conversions

The last major usecase --hoping I did not forget one-- of constructors in C++ are
conversions. In fact, every constructor that can be called with one parameter is 
a [converting constructor](https://en.cppreference.com/w/cpp/language/converting_constructor).
That is, unless it is declared with the keyword `explicit`, which is considered
[a better default practice](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rc-explicit)
in modern C++. Implicit conversions can come in very handy, but if we are not careful 
they can lead to surprising behavior. Take this example from the
[Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rc-explicit)
on the topic:

```c++
class String {
public:
    String(int);
    // ...
};

String s = 10;   // surprise: string of size 10
```

Surprising indeed, which is why Rust provides a way to make conversions possible
but explicit[^deref]. As with a lot of the previous sections, the solution comes in form 
of traits. In this case, the two generic traits [`From<T>`](https://doc.rust-lang.org/std/convert/trait.From.html)
and [`Into<T>`](https://doc.rust-lang.org/std/convert/trait.Into.html).
To implement `From<T>` for our type `U` we must implement the function `from(value:T) -> U`
which transforms a type `T` to type `U`. To implement `Into<U>` for a type `T`,
we must implement the function `into(self) -> U`, which also transforms `T` to `U`.
If this seems like both traits are just reduntant ways to define a transformation
`T -> U`, bear with me. The distinction will become clearer soon.

As an important aside, note that if we don't want to take ownership of the value,
we can also implement the traits on references, e.g. implement `Into<T> for &U` and so on.

For an example let's pretend we're working on a `BigInteger` type that can store 
large integer numbers. Naturally, we want to offer a converting constructor from
types like `i32`, `u64` and so on.

```rust
struct BigInteger {
    //...
}

impl From<i32> for BigInteger {
    fn from(value : i32) -> Self {
        //...
    }
}

impl From<u64> for BigInteger {
    fn from(value: u64) -> Self {
        //...
    }
}
```

Now we can use create a big integer like so:

```rust
let first = BigInteger::from(-1i32);
let second = BigInteger::from(10u64);
```

Behind the scenes, Rust will also implement `Into<BigInteger>` for 
both `i32` and `u64`, so that we can convert both those types to `BigInteger`
by calling `into`.

```rust
fn add(first :BigInteger, second:BigInteger) -> BigInteger {
    //...
}

let x = 10i32;
let y = 20u64;
let z = add(x.into(),y.into());
```

As a matter of fact, it's true that if we implement `From<T> for U`, then 
the type `T` will get a so called [blanket implementation](https://doc.rust-lang.org/std/convert/trait.Into.html)
of `Into<U>`, courtesy of the standard library. That's why it is 
[recommended](https://doc.rust-lang.org/std/convert/trait.Into.html)
to implement `From<T> for U` rather than `Into<U> for T`, if possible. The reason
is that we get the `Into` implementation for free when implementing 
`From` but not the other way round[^from-into-blanket]. If we cannot implement 
`From<T> for U`, we are still free to implement `Into<U> for T`.

In contrast to the recommendation on _implementing_ conversion traits, if we 
want to _constrait_ on them the advice is flipped around. That is, if we want to accept 
a type `U` that can be made into a `T`, we should constrain the type on 
`U: Into<T>` rather than `T: From<U>`, because there are 
possibly more types implementing the first trait bound than the latter.
So if we want to make our `add` function generic and have it perform the addition
without us having to manually call `into`, we would write it like so:

```rust
fn add<T,U> (first : T, second : U) -> BigInteger
    where T: Into<BigInteger>, 
          U: Into<BigInteger> {
    first.into() + second.into()
}
```

That is, provided our `BigInteger` type supports addition, which we can implement 
using the [`Add`](https://doc.rust-lang.org/std/ops/trait.Add.html) trait. But I'll 
leave that for another time.

## Coversions that Fail

This article is already pretty long, so I'll keep this brief. Looking at 
the associated function signatures for `From` and `Into`, we can see that they cannot return 
an error. To implement a conversion that can return an error, we can use the 
[`TryFrom`](https://doc.rust-lang.org/std/convert/trait.TryFrom.html) and 
[`TryInto`](https://doc.rust-lang.org/std/convert/trait.TryInto.html) traits. They work 
analogous to their `From` and `Into` counterparts, but allow us to specify an error type `Error`
and return a `Result<Self,Error>` to indicate conversions that can fail.

# Summary 

I hope I have covered all the important use cases of constructors in C++ and shown 
if and how we can map them to Rust. If not, please let me know and I'll add more 
use cases here. The one point that I tried to hammer home is that Rust values 
explicitness. Explicit copies, clones, conversions and even being explicit in 
what is implemented, even if the compiler could trivially do so. When I go 
back to C++ now, I often find myself adhering to these more Rusty idioms.

# Endnotes
[^initialization-cpp]: It would not be C++ if there weren't potentially many ways of initialization that interact in complex ways with each other. There's even [a book](https://leanpub.com/cppinitbook) dedicated solely to this very topic.
[^concept-triv]: It's not a _concept_ in the C++20 meaning of the word. 
[^auto-traits]: There are a handful of marker traits that the compiler will implicitly implement for you if appropriate. Those are called [Auto Traits](https://doc.rust-lang.org/beta/reference/special-types-and-traits.html#auto-traits) and are very carefully chosen. The most common auto traits that programmers interact with are the `Send` and `Sync` traits that are important for describing thread safety via the type system.
[^named-constr]: One drawback I can think of with using static functions as named constructors in C++ is that they won't be useful in contexts like `emplace` or `std::make_shared` where we use perfect forwarding of constructor arguments for in place construction of objects.
[^function-overloading]: You _can_ abuse the trait system to get something like overloading. Don't do that.
[^no-arg-constructor]: Note the wording "can be called with no arguments", not "takes no arguments". See [here](https://isocpp.org/wiki/faq/ctors#default-ctor).
[^independently-copy]: What I mean by that is that the copy is independent from the original, but it could still refer to some common data as is e.g. the case with `std::shared_ptr`.
[^failure-panic]: There is another, orthogonal, mechanism to signal failure: [panic](https://doc.rust-lang.org/std/macro.panic.html#when-to-use-panic-vs-result). I won't go into detail here.
[^copy-ctor-panic]: The copy constructor can of course panic.
[^tc-ub]: It's important to note that it's undefined to rely on manual specializations of `std::is_trivially_copyable`.
[^by-value]: The wording here is a bit C++ inspired, but if we want to be absolutely precise, everything in Rust is passed by value, including references. In Rust, references are pointers with a whole lot of compile time guardrails, but pointers nonetheless. That's why we have to dereference them. In that sense it's closer to C than C++. A pointer itself in C is also passed by value, but it's pointee may be modifyable, depending on constness.
[^deref]: Although Rust forces most conversions to be explicit, it does not abandon all forms of implict conversions either. There is a mechanism called [`Deref` coercion](https://doc.rust-lang.org/std/ops/trait.Deref.html#more-on-deref-coercion).
[^Self]: In an `impl` block, `Self` refers to the type itself. For our `Rectangle` we could just have written out `Rectangle`, but for more complex types involving generics it becomes tedious quickly.
[^clone-image]: This is just to serve as an illustration of explicit cloning. I'm not saying this is the best API for that particular problem.
[^from-into-blanket]: The standard library implementors could just as well have chosen to do the blanket implementation the other way round. It's just the way they chose to do it at the time.
