---
layout: post
title: Performance in Training Text
---

Hello everyone! I've got a fun post for you guys today.
Once during an interview process, I created a text
based language model system to use in the solution.

In the solution material I created for them I included
this line:

> Train Markov Chains (longest part)
> 1. ...
> 2. ...
> 3. Wait

And it's always bothered me that I felt I had to
include indications that this step was slow enough
to notice.

So I got permission to talk about the problem, and
today we'll be fixing up that performance so an
acceptable level. (Quick note, this is only one, of
several, pieces of the interview problem though.)

---

## So what are we going to do

This post is going to center around creating a text
based language model (Markov chains).

For this particular model we're just going to find out,
from our training data, the number of occurrences of each
pair of ASCII characters appearing after any pair
of ASCII characters. (Along with the total times the
'before' pair was seen before any pair.)

Here's an example of an entry in the model data might
look like:

    ab|3
    \t|cd|2
    \t|ce|1

Here's an example of an model:

    ab|3
    \t|cd|2
    \t|ce|1
    ea|100
    \t|st|84
    \t|rt|11
    \t|rn|5

Here's what the format looks like in a quick
context free grammar:

    P = a pair of ASCII characters
    TAB = \t a literal tab character
    PIPE = | is a literal pipe character
    NUMBER = a string of digits that must be a positive int

    MODEL        -> ENTRYLIST
    ENTRYLIST    -> ENTRYLIST ENTRY
    ENTRYLIST    ->
    ENTRY        -> BASE FOLLOWERLIST
    BASE         -> P TAB NUMBER
    FOLLOWERLIST -> FOLLOWERLIST FOLLOWER
    FOLLOWERLIST ->
    FOLLOWER     -> TAB P PIPE NUMBER

This grammar isn't actually context free though because
for a given entry the `NUMBER` in each `BASE` is the sum
of all the numbers in the `FOLLOWERLIST`

## Where are we going to get some training data?

The truth is there isn't a good source for data for
something like this. Everyone wants to make money so
text data we can use worry free is hard to find. Free
data is out there but it usually comes with a license
that is complex enough that I don't want to share it
here.

I'd recommend (legally) obtaining several books from
[Project Gutenberg](https://www.gutenberg.org/) and
stringing them together until you have about 10 MB of
data. Be sure to follow all copyright laws applicable
to you.

## How are we going to measure it?

Personally I am a big fan of google benchmark so that's
what I'll be using here.

The way I'll do that is by using `cmake` to do all the
heavy lifting.

## What's my runtime env?

To contextualize the numbers in this post I'll mention
that I am using a Ryzen 5950x and this code is running
on Debian 10 in WSL2.

---

# Let's get coding.

So as I mentioned `cmake` is my chosen way to do the magic
of pulling dependencies together for this. This is what
the `CMakeLists.txt` looks like:

```cmake
cmake_minimum_required(VERSION 3.14)
project(my_project)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED YES)

include(FetchContent)

set(BENCHMARK_ENABLE_TESTING off)

FetchContent_Declare(
  googletest
    GIT_REPOSITORY https://github.com/google/googletest.git
    GIT_TAG release-1.12.0)

FetchContent_Declare(
  googlebenchmark
    GIT_REPOSITORY https://github.com/google/benchmark.git
    GIT_TAG v1.7.0)

FetchContent_MakeAvailable(
  googletest
  googlebenchmark)

find_package(OpenMP)

add_executable(bench bench.cpp)
target_compile_options(bench PUBLIC "-mavx2")
target_compile_options(bench PUBLIC "-fno-strict-aliasing")
target_compile_options(bench PUBLIC "-msse2")
target_link_libraries(
  bench
    PRIVATE
      benchmark::benchmark
      benchmark::benchmark_main
      pthread
      OpenMP::OpenMP_CXX)
```

With that in mind we'll use the following to insert
the C++ code we intend to benchmark. (Note to make
my life easier as I write this I just left in all the
includes I used while I was exploring. Don't @ me
over it.)

```cpp
#include <benchmark/benchmark.h>
#include <string>
#include <unordered_map>
#include <vector>
#include <fcntl.h>
#include <unistd.h>
#include <sstream>
#include <string>
#include <vector>
#include <random>
#include <iostream>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <mutex>
#include <omp.h>
#include <array>
#include <memory>
#include <tuple>

static std::string original_code(void); // intentionally missing

template <class ...Args>
static void BM_compute_chains(benchmark::State & state, Args &&... args)
{
  static_assert(sizeof...(Args) == 1, "Args must be one");
  using first_t = typename std::tuple_element<0, std::tuple<Args...>>::type;
  static_assert(
    std::is_same<first_t, std::string(&)()>::value,
    "First arg must be a function poitner that returns a string");
  auto args_tuple = std::make_tuple(std::move(args)...);
  for(auto _ : state)
  {
    std::string foo;
    benchmark::DoNotOptimize(foo = std::get<0>(args_tuple)());
    benchmark::ClobberMemory();
  }
}

BENCHMARK_CAPTURE(BM_compute_chains, original_code, original_code);
```

The way this works is we need to have function we want to benchmark
and then simply place this in the code:
```cpp
BENCHMARK_CAPTURE(BM_compute_chains, /*test name*/, /*function name*/);
```

With that setup in mind let's look at the
original implementation I used:

```cpp
static std::string original_code(void)
{
  int fd = open("./textToTrainOn", O_RDONLY);
  std::unordered_map<std::string,std::vector<std::string>> chains;
  //only need 4 bytes of memory to read in
  char a=0,b=0,c=0,d=0;
  read(fd,&a,1); //assume we can read 3 bytes
  read(fd,&b,1);
  read(fd,&c,1);
  while(read(fd,&d,1))
  {
    std::string currentState=std::string()+a+b;
    if(chains.find(currentState)==chains.end())
      chains[currentState]=std::vector<std::string>(1,std::string()+c+d);
    else
      chains[currentState].push_back(std::string()+c+d);
    a=b;
    b=c;
    c=d;
    d=0;
  }
  std::stringstream out;
  //for all the entry 2 char strings
  for(const auto & x:chains){
    //dump to standard out in the format "S|NN" where is S is the 2 char string and NN is the total number of times it appeared
    out<<x.first<<"|"<<x.second.size()<<std::endl;
    std::unordered_map<std::string,int> counts;
    //figure out unique values and get the counts
    for(const auto & y:x.second)
      if(counts.find(y)==counts.end())
        counts[y]=1;
      else
        counts[y]++;
    //dump to standard out in the format "\t|S|NN"
    //S is the 2 char string
    //NN is the number of times that 2 char string appeared after the one above.
    for(const auto & y:counts)
      out<<"\t|"<<y.first<<"|"<<y.second<<std::endl;
  }
  close(fd);
  return out.str();
}
```

With all that I get the following performance:
```
2022-10-05T01:00:52-07:00
Running ./build/bench
Run on (32 X 3700.01 MHz CPU s)
CPU Caches:
  L1 Data 32 KiB (x16)
  L1 Instruction 32 KiB (x16)
  L2 Unified 512 KiB (x16)
  L3 Unified 32768 KiB (x1)
Load Average: 0.03, 0.02, 0.00
--------------------------------------------------------------------------
Benchmark                                Time             CPU   Iterations
--------------------------------------------------------------------------
BM_compute_chains/original_code       3682 ms         3682 ms            1
```
*Note*, the content of the source you use matters here.
You can generate a random file as the input for this but
that will impact the performance measurement.

Nearly 4 seconds though. Not too bad really but when I was handing this in
as an interview problem I was nervous.

##First improvement

Well if you haven't heard reading from a platter hard disk is really
really slow in comparison to reading from a place like memory. So I
like to check out these types of actions first.

So where are we doing I/O with the disk?

```cpp
int fd = open("./textToTrainOn", O_RDONLY);

... clipped ...

read(fd,&a,1); //assume we can read 3 bytes
read(fd,&b,1);
read(fd,&c,1);
while(read(fd,&d,1))

... clipped ...

close(fd);
```

All of these lines ask the OS to do something with the
disk. (At least from a user perspective)

We actually need all the bytes from disk though so, unless
we have an in memory system, we can't escape reading from
disk at least once.

However there's another problem with this code. It mostly
is due to this line:

```cpp
while(read(fd,&d,1))
```

This code requests a single byte from the OS every
iteration of the loop. If we're going to go over a
13MB file that means we're making 13000000 single
byte requests. At high level we can only assume
that each of those requests is actually happening.
While each of them are being fulfilled our program
can't continue and must wait (aka block). While
in this blocked state our process has an increased
chance for the CPU to stop running it all together
and do some other work. In total all these
requests are making us prone to wait for the IO
device and/or the CPU to save/load our program.

Let's change our code to do bring over all the
data in a single read:

```cpp
static std::string read_everything(benchmark::State & state, bool & error)
{
  struct stat sb;
  const int fd = open("./textToTrainOn", O_RDONLY);
  if (fstat(fd, &sb) == -1)           /* To obtain file size */
  {
    state.SkipWithError("fstat failed");;
    error = true;
    return "";
  }
  const size_t length = sb.st_size;
  if(length < 3)
  {
    state.SkipWithError("need at least 3 bytes");;
    error = true;
    return "";
  }
  std::vector<unsigned char> data(length, 0);
  if(!read(fd,data.data(),length))
  {
    state.SkipWithError("problem reading file");;
    error = true;
    return "";
  }
  //if(!read(fd,&a,1)||!read(fd,&b,1)||!read(fd,&c,1))
  unsigned char * const addr = data.data();
  std::unordered_map<std::string,std::vector<std::string>> chains;
  //only need 4 bytes of memory to read in
  char a=addr[0],b=addr[1],c=addr[2],d=0;
  int i = 3;
  while(i < length)
  {
    d=addr[i];
    std::string currentState=std::string()+a+b;
    if(chains.find(currentState)==chains.end())
      chains[currentState]=std::vector<std::string>(1,std::string()+c+d);
    else
      chains[currentState].push_back(std::string()+c+d);
    a=b;
    b=c;
    c=d;
    d=0;
    i++;
  }
  close(fd);
  std::stringstream out;
  //for all the entry 2 char strings
  for(const auto & x:chains){
    //dump to standard out in the format "S|NN" where is S is the 2 char string and NN is the total number of times it appeared
    out<<x.first<<"|"<<x.second.size()<<std::endl;
    std::unordered_map<std::string,int> counts;
    //figure out unique values and get the counts
    for(const auto & y:x.second)
      if(counts.find(y)==counts.end())
        counts[y]=1;
      else
        counts[y]++;
    //dump to standard out in the format "\t|S|NN"
    //S is the 2 char string
    //NN is the number of times that 2 char string appeared after the one above.
    for(const auto & y:counts)
      out<<"\t|"<<y.first<<"|"<<y.second<<std::endl;
  }
  close(fd);
  return out.str();
}
```

Run the benchmark!

```sh
2022-10-12T01:31:00-07:00
Running ./build/bench
Run on (32 X 3700.01 MHz CPU s)
CPU Caches:
  L1 Data 32 KiB (x16)
  L1 Instruction 32 KiB (x16)
  L2 Unified 512 KiB (x16)
  L3 Unified 32768 KiB (x1)
Load Average: 0.01, 0.01, 0.00
---------------------------------------------------------------------------------------------------
Benchmark                                                         Time             CPU   Iterations
---------------------------------------------------------------------------------------------------
BM_compute_chains/original_code                                3587 ms         3587 ms            1
BM_compute_chains/read_everything                              1780 ms         1762 ms            1
```
Boom! 2x speedup! Nice!!

Now, normally when I get a speed up like this I would try to
see how much I can squeeze out of that strategy. In this
case though we need to read the entire file so not much
else we can do in terms of reducing I/O operations with.

##Second improvement

The second improvement we're going to make involves
knowing how text is represented in C++. In C++ text
is represented by the `char` data type which is
normally 1 byte. (You can use `CHAR_BIT` to find
out if that's true for you or not.) Given this knowledge,
and that we need to only care about 4 of these values
at once: we can use a 32 bit integers when we care about
all 4 numbers, and 2 16 bit integers when we only care
about the _previous_ pair and the _after_ pair.

This should help us greatly because we're switching to
working with a primitive type that is likely much smaller
and likely much less over head than using `std::string`.
Importantly one reason we're able to do this since we
have a fix number of values we care about rather than
an arbitrary length strings.

**Note UB ahead!!**

Note, here we're going to abuse [Type Punning](https://stackoverflow.com/questions/44137442/what-is-type-punning-and-what-is-the-purpose-of-it)
which violates the [strict aliasing rule](https://stackoverflow.com/questions/98650/what-is-the-strict-aliasing-rule),
and is undefined behavior. If you care to use this
then you should make sure that this is allowed on
your platform. I'll be using `-fno-strict-aliasing`
to try to avoid problems from happening for me, but
I've not checked if that is sufficient or portable.

Let's take a look!

```cpp
static std::string uints(benchmark::State & state, bool & error)
{
  struct stat sb;
  const int fd = open("./textToTrainOn", O_RDONLY);
  if (fstat(fd, &sb) == -1)           /* To obtain file size */
  {
    state.SkipWithError("fstat failed");;
    error = true;
    return "";
  }
  const size_t length = sb.st_size;
  if(length < 3)
  {
    state.SkipWithError("need at least 3 bytes");;
    error = true;
    return "";
  }
  std::vector<unsigned char> data(length, 0);
  if(!read(fd,data.data(),length))
  {
    state.SkipWithError("problem reading file");;
    error = true;
    return "";
  }
  unsigned char * const addr = data.data();
  std::unordered_map<uint16_t,std::vector<uint16_t>> chains;
  uint32_t v = 0;
  *(reinterpret_cast<unsigned char *>(&v) + 3)=*(reinterpret_cast<unsigned char *>(addr));
  *(reinterpret_cast<unsigned char *>(&v) + 2)=*(reinterpret_cast<unsigned char *>(addr)+1);
  *(reinterpret_cast<unsigned char *>(&v) + 1)=*(reinterpret_cast<unsigned char *>(addr)+2);
  uint16_t const * const a = reinterpret_cast<uint16_t *>(&v) + 1;
  uint16_t const * const b = reinterpret_cast<uint16_t *>(&v);
  int i = 3;
  while(i < length)
  {
    v|=addr[i++];
    chains[*a].push_back(*b);
    v<<=8;
  }
  close(fd);
  std::stringstream out;
  //for all the entry 2 char strings
  for(const auto & x:chains)
  {
    //dump to standard out in the format "S|NN" where is S is the 2 char string and NN is the total number of times it appeared
    out<<*(reinterpret_cast<const char *>(&(x.first))+1) << *(reinterpret_cast<unsigned char const *>(&(x.first))) <<"|"<<x.second.size()<<std::endl;
    std::unordered_map<uint16_t,int> counts;
    //figure out unique values and get the counts
    for(const auto & y:x.second)
      counts[y]++;
    //dump to standard out in the format "\t|S|NN"
    //S is the 2 char string
    //NN is the number of times that 2 char string appeared after the one above.
    for(const auto & y:counts)
      out<<"\t|"<<*(reinterpret_cast<const char *>(&(y.first))+1) << *(reinterpret_cast<const char *>(&(y.first)))<<"|"<<y.second<<std::endl;
  }
  return out.str();
}
```

You can see in the above code I make heavy use of `reinterpret_cast`
which is generally a stinky [code smell](https://en.wikipedia.org/wiki/Code_smell).

I'm also making a lot of assumptions about sizes. I shouldn't use
hard coded integer constants but instead use `constexpr` values.

Though in total though all of our uses of `std::string` have evaporated
and they've all been replaced by `uint16_t`s (which represents a two
character pair).

So what did all that danger get us?

```sh
2022-10-22T18:01:34-07:00
Running ./build/bench
Run on (32 X 3700.01 MHz CPU s)
CPU Caches:
  L1 Data 32 KiB (x16)
  L1 Instruction 32 KiB (x16)
  L2 Unified 512 KiB (x16)
  L3 Unified 32768 KiB (x1)
Load Average: 0.05, 0.10, 0.05
----------------------------------------------------------------------------
Benchmark                                  Time             CPU   Iterations
----------------------------------------------------------------------------
BM_compute_chains/original_code         3570 ms         3569 ms            1
BM_compute_chains/read_everything       1799 ms         1799 ms            1
BM_compute_chains/uints                  238 ms          232 ms            3
```

Incredible. Roughly a 9x improvement in performance! The risk/reward here
might not be acceptable for some candidates in an interview assignment (let
alone a production environment) but just for fun here. Seems worth it.

## Where do we go next?

I tried two more improvements after the two above. These two options
both provide improvements however when I composed them I actually
caused a heavy performance degradation on my system.

### Let's try threading!

Threading has a number of implications we need to worry about. Locking can be
a big problem for performance and without it we'll have issues with data
races if we're not careful.

To eliminate those data problems I'm allocating separate areas for each thread
to work on. The way I've done this spreads the data out which can be bad for
performance also. Let's get excited and see what happens.

```cpp
static std::string _4_threads(benchmark::State & state, bool & error)
{
  constexpr int threads_to_use = 4;
  struct stat sb;
  const int fd = open("./textToTrainOn", O_RDONLY);
  if (fstat(fd, &sb) == -1)           /* To obtain file size */
  {
    state.SkipWithError("fstat failed");;
    error = true;
    return "";
  }
  const size_t length = sb.st_size;
  if(length < 3)
  {
    state.SkipWithError("need at least 3 bytes");;
    error = true;
    return "";
  }
  std::vector<unsigned char> data(length, 0);
  if(!read(fd,data.data(),length))
  {
    state.SkipWithError("problem reading file");;
    error = true;
    return "";
  }
  //if(!read(fd,&a,1)||!read(fd,&b,1)||!read(fd,&c,1))
  unsigned char * const addr = data.data();
  std::array<std::unique_ptr<std::vector<uint16_t>[]>, 1 << 16> chains;
  #pragma omp parallel for
  for(int i = 0; i < 1 << 16; i++)
    chains[i].reset(new std::vector<uint16_t>[threads_to_use]);
  #pragma omp parallel num_threads(threads_to_use)
  {
    const int my_id = omp_get_thread_num();
    const int thread_count = omp_get_num_threads();
    const bool first = my_id == 0;
    const bool last = my_id+1 == thread_count;
    //only need 4 bytes of memory to read in
    uint32_t v = 0;
    uint16_t const * const a = reinterpret_cast<uint16_t *>(&v) + 1;
    uint16_t const * const b = reinterpret_cast<uint16_t *>(&v);
    unsigned char const * cur;
    if(first)
    {
      *(reinterpret_cast<unsigned char *>(&v) + 3)=*(reinterpret_cast<unsigned char *>(addr));
      *(reinterpret_cast<unsigned char *>(&v) + 2)=*(reinterpret_cast<unsigned char *>(addr)+1);
      *(reinterpret_cast<unsigned char *>(&v) + 1)=*(reinterpret_cast<unsigned char *>(addr)+2);
      cur = reinterpret_cast<unsigned char *>(addr)+3;
    }
    else
    {
      *(reinterpret_cast<unsigned char *>(&v) + 3)=*(reinterpret_cast<unsigned char *>(addr)+((length/thread_count)*my_id)-3);
      *(reinterpret_cast<unsigned char *>(&v) + 2)=*(reinterpret_cast<unsigned char *>(addr)+((length/thread_count)*my_id)-2);
      *(reinterpret_cast<unsigned char *>(&v) + 1)=*(reinterpret_cast<unsigned char *>(addr)+((length/thread_count)*my_id)-1);
      cur = reinterpret_cast<unsigned char *>(addr)+((length/thread_count)*my_id);
    }

    unsigned char const * const end = reinterpret_cast<unsigned char *>(addr) + (last ? length : ((length/thread_count)*(my_id+1)));

    while(cur != end)
    {
      v|=*(cur++);
      chains[*a][my_id].push_back(*b);
      v <<= 8;
    }
  }
  close(fd);
  std::stringstream out;
  //for all the entry 2 char strings
  for(uint32_t i=0; i < 1 << 16; i++){
    //dump to standard out in the format "S|NN" where is S is the 2 char string and NN is the total number of times it appeared
    uint32_t s = 0;
    for(int j = 0 ; j < threads_to_use; j++)
      s += chains[i][j].size();
    if(s==0)
      continue;
    out<<*(reinterpret_cast<const char *>(&(i))+1) << *(reinterpret_cast<const char *>(&(i))) <<"|"<<s<<std::endl;
    std::unordered_map<uint16_t,int> counts;
    //figure out unique values and get the counts
    for(int j = 0 ; j < threads_to_use; j++)
      for(const auto z: chains[i][j])
        counts[z]++;
    //dump to standard out in the format "\t|S|NN"
    //S is the 2 char string
    //NN is the number of times that 2 char string appeared after the one above.
    for(const auto & y:counts)
      out<<"\t|"<<*(reinterpret_cast<const char *>(&(y.first))+1) << *(reinterpret_cast<const char *>(&(y.first)))<<"|"<<y.second<<std::endl;
  }
  close(fd);
  return out.str();
}
```

The results:

```sh
2022-10-22T18:36:39-07:00
Running ./build/bench
Run on (32 X 3700.01 MHz CPU s)
CPU Caches:
L1 Data 32 KiB (x16)
L1 Instruction 32 KiB (x16)
L2 Unified 512 KiB (x16)
L3 Unified 32768 KiB (x1)
Load Average: 0.15, 0.08, 0.02
----------------------------------------------------------------------------
Benchmark                                  Time             CPU   Iterations
----------------------------------------------------------------------------
BM_compute_chains/original_code         3638 ms         3638 ms            1
BM_compute_chains/read_everything       1800 ms         1782 ms            1
BM_compute_chains/uints                  238 ms          238 ms            3
BM_compute_chains/_4_threads             136 ms          133 ms            5
BM_compute_chains/_32_threads            124 ms          124 ms            5
```

This gives only a roughly 40% improvement from the units version. Using 32 threads
doesn't improve things nearly as much as I'd want it to for the resources
dedicated. Still the 32 threads version brings us to a 96% improvement.

### SIMD

The other option we could consider is SIMD, we could make it so that
we trim the iterations of the main loop down by some multiple. Let's
take a look at that.

Using 256 bit simd I can store 8 32 bit values to use for the
indexing of the loop. However to find the 8 values I need to have 8
pointers for me to use. If I want to use 8 pointers then I'll want to
use simd to move all the pointers forward. Pointers are 64 bits which
cuts me down to 4 pointers to use. I decided to try that and see what
performance I can get. (Watch out for the follow up blog post where
we can use the full 8.)

```cpp
static std::string simd(benchmark::State & state, bool & error)
{
  struct stat sb;
  const int fd = open("./textToTrainOn", O_RDONLY);
  if (fstat(fd, &sb) == -1)           /* To obtain file size */
  {
    state.SkipWithError("fstat failed");;
    error = true;
    return "";
  }
  constexpr int multiple = 256/64;
  const size_t length = sb.st_size;
  const size_t aligned = length + (length % multiple);
  const size_t chunk_size = aligned / multiple;
  if(length < 3)
  {
    state.SkipWithError("need at least 3 bytes");;
    error = true;
    return "";
  }
  std::vector<unsigned char> data(aligned, 0);
  if(!read(fd,data.data(),length))
  {
    state.SkipWithError("problem reading file");;
    error = true;
    return "";
  }
  unsigned char * const addr = data.data();
  std::unordered_map<uint16_t,std::vector<uint16_t>> chains;
  //only need 4 bytes of memory to read in
  __m128i v;
  const __m128i shift_value = _mm_set_epi32(0, 0, 0, 8);
  __m256i pointers;
  const __m256i pointer_incremter = _mm256_set_epi64x(sizeof(char),sizeof(char),sizeof(char),sizeof(char));
#define instance(x) \
  *(reinterpret_cast<unsigned char *>(&v) + 3 + (4*x))=*(reinterpret_cast<unsigned char *>(addr) + (chunk_size * x)); \
  *(reinterpret_cast<unsigned char *>(&v) + 2 + (4*x))=*(reinterpret_cast<unsigned char *>(addr) + 1 + (chunk_size * x)); \
  *(reinterpret_cast<unsigned char *>(&v) + 1 + (4*x))=*(reinterpret_cast<unsigned char *>(addr) + 2 + (chunk_size * x)); \
  *(reinterpret_cast<unsigned char *>(&v) + 0 + (4*x))=0; \
  uint16_t const * const a_ ## x = reinterpret_cast<uint16_t *>(&v) + 1 + (2*x); \
  uint16_t const * const b_ ## x = reinterpret_cast<uint16_t *>(&v) + 0 + (2*x); \
  char ** cur_ ## x = reinterpret_cast<char **>(&pointers) + x;\
  *(cur_ ## x) = reinterpret_cast<char *>(addr) + 3 + (chunk_size * x);
  instance(0)
  instance(1)
  instance(2)
  instance(3)
#undef instance
  char const * const end = reinterpret_cast<char *>(addr) + aligned;
  while(*cur_3 != end)
  {
    const __m128i new_values = _mm_set_epi32(**cur_0, **cur_1, **cur_2, **cur_3);
    v = _mm_or_si128(v, new_values);
    chains[*a_0].push_back(*b_0);
    chains[*a_1].push_back(*b_1);
    chains[*a_2].push_back(*b_2);
    chains[*a_3].push_back(*b_3);
    v = _mm_sll_epi32(v, shift_value);
    pointers = _mm256_add_epi64(pointers, pointer_incremter);
  }
  while(*cur_3 != (end + 2))
  {
    const __m128i new_values = _mm_set_epi32(**cur_0, **cur_1, **cur_2, 0);
    v = _mm_or_si128(v, new_values);
    chains[*a_0].push_back(*b_0);
    chains[*a_1].push_back(*b_1);
    chains[*a_2].push_back(*b_2);
    v = _mm_sll_epi32(v, shift_value);
    pointers = _mm256_add_epi64(pointers, pointer_incremter);
  }
  close(fd);
  std::stringstream out;
  //for all the entry 2 char strings
  for(const auto & x:chains){
    //dump to standard out in the format "S|NN" where is S is the 2 char string and NN is the total number of times it appeared
    out<<*(reinterpret_cast<const char *>(&(x.first))+1) << *(reinterpret_cast<unsigned char const *>(&(x.first))) <<"|"<<x.second.size()<<std::endl;
    std::unordered_map<uint16_t,int> counts;
    //figure out unique values and get the counts
    for(const auto & y:x.second)
      counts[y]++;
    //dump to standard out in the format "\t|S|NN"
    //S is the 2 char string
    //NN is the number of times that 2 char string appeared after the one above.
    for(const auto & y:counts)
      out<<"\t|"<<*(reinterpret_cast<const char *>(&(y.first))+1) << *(reinterpret_cast<const char *>(&(y.first)))<<"|"<<y.second<<std::endl;
  }
  close(fd);
  return out.str();
}
```

The Results?

```sh
2022-10-22T18:57:54-07:00
Running ./build/bench
Run on (32 X 3700.01 MHz CPU s)
CPU Caches:
L1 Data 32 KiB (x16)
L1 Instruction 32 KiB (x16)
L2 Unified 512 KiB (x16)
L3 Unified 32768 KiB (x1)
Load Average: 0.26, 0.06, 0.02
----------------------------------------------------------------------------
Benchmark                                  Time             CPU   Iterations
----------------------------------------------------------------------------
BM_compute_chains/original_code         3623 ms         3622 ms            1
BM_compute_chains/read_everything       1758 ms         1758 ms            1
BM_compute_chains/uints                  277 ms          277 ms            3
BM_compute_chains/_4_threads             135 ms          134 ms            5
BM_compute_chains/_32_threads            122 ms          122 ms            5
BM_compute_chains/simd                   223 ms          223 ms            3
```

Introducing SIMD didn't improve performance over threading but did some how
improve performance over uints. It does seem that uints got slower though
also.

## Combining threading and simd appears bad

I thought to try to combine these two features to get improved performance
but in total though performance actually got worse. Check it out:

```cpp
static std::string _4_threads_simd(benchmark::State & state, bool & error)
{
  constexpr int threads_to_use = 4;
  struct stat sb;
  const int fd = open("./textToTrainOn", O_RDONLY);
  if (fstat(fd, &sb) == -1)           /* To obtain file size */
  {
    state.SkipWithError("fstat failed");;
    error = true;
    return "";
  }
  constexpr int multiple = (256/64)*threads_to_use;
  const size_t length = sb.st_size;
  const size_t aligned = length + (length % multiple);
  const size_t chunk_size = aligned / multiple;
  if(length < 3)
  {
    state.SkipWithError("need at least 3 bytes");;
    error = true;
    return "";
  }
  std::vector<unsigned char> data(length, 0);
  if(!read(fd,data.data(),length))
  {
    state.SkipWithError("problem reading file");;
    error = true;
    return "";
  }
  //if(!read(fd,&a,1)||!read(fd,&b,1)||!read(fd,&c,1))
  unsigned char * const addr = data.data();
  std::array<std::unique_ptr<std::vector<uint16_t>[]>, 1 << 16> chains;
  #pragma omp parallel for
  for(int i = 0; i < 1 << 16; i++)
    chains[i].reset(new std::vector<uint16_t>[threads_to_use]);
  #pragma omp parallel num_threads(threads_to_use)
  {
    const int my_id = omp_get_thread_num();
    const int thread_count = omp_get_num_threads();
    const bool first = my_id == 0;
    const bool last = my_id+1 == thread_count;
    //only need 4 bytes of memory to read in
    __m128i v;
    const __m128i shift_value = _mm_set_epi32(0, 0, 0, 8);
    __m256i pointers;
    const __m256i pointer_incremter = _mm256_set_epi64x(sizeof(char),sizeof(char),sizeof(char),sizeof(char));
#define instance(x) \
    *(reinterpret_cast<unsigned char *>(&v) + 3 + (4*x))=*(reinterpret_cast<unsigned char *>(addr) + (chunk_size * x * my_id)); \
    *(reinterpret_cast<unsigned char *>(&v) + 2 + (4*x))=*(reinterpret_cast<unsigned char *>(addr) + 1 + (chunk_size * x * my_id)); \
    *(reinterpret_cast<unsigned char *>(&v) + 1 + (4*x))=*(reinterpret_cast<unsigned char *>(addr) + 2 + (chunk_size * x * my_id)); \
    *(reinterpret_cast<unsigned char *>(&v) + 0 + (4*x))=0; \
    uint16_t const * const a_ ## x = reinterpret_cast<uint16_t *>(&v) + 1 + (2*x); \
    uint16_t const * const b_ ## x = reinterpret_cast<uint16_t *>(&v) + 0 + (2*x); \
    char ** cur_ ## x = reinterpret_cast<char **>(&pointers) + x;\
    *(cur_ ## x) = reinterpret_cast<char *>(addr) + 3 + (chunk_size * x * my_id);
    instance(0)
    instance(1)
    instance(2)
    instance(3)
#undef instance
    char const * const end = reinterpret_cast<char *>(addr) + (my_id+1)*chunk_size*4;

    while(*cur_3 != end)
    {
      const __m128i new_values = _mm_set_epi32(**cur_0, **cur_1, **cur_2, **cur_3);
      v = _mm_or_si128(v, new_values);
      chains[*a_0][my_id].push_back(*b_0);
      chains[*a_1][my_id].push_back(*b_1);
      chains[*a_2][my_id].push_back(*b_2);
      chains[*a_3][my_id].push_back(*b_3);
      v = _mm_sll_epi32(v, shift_value);
      pointers = _mm256_add_epi64(pointers, pointer_incremter);
    }
    while(*cur_3 != (end + 2))
    {
      const __m128i new_values = _mm_set_epi32(**cur_0, **cur_1, **cur_2, 0);
      v = _mm_or_si128(v, new_values);
      chains[*a_0][my_id].push_back(*b_0);
      chains[*a_1][my_id].push_back(*b_1);
      chains[*a_2][my_id].push_back(*b_2);
      v = _mm_sll_epi32(v, shift_value);
      pointers = _mm256_add_epi64(pointers, pointer_incremter);
    }
  }
  close(fd);
  std::stringstream out;
  //for all the entry 2 char strings
  for(uint32_t i=0; i < 1 << 16; i++){
    //dump to standard out in the format "S|NN" where is S is the 2 char string and NN is the total number of times it appeared
    uint32_t s = 0;
    for(int j = 0 ; j < threads_to_use; j++)
      s += chains[i][j].size();
    if(s==0)
      continue;
    out<<*(reinterpret_cast<const char *>(&(i))+1) << *(reinterpret_cast<const char *>(&(i))) <<"|"<<s<<std::endl;
    std::unordered_map<uint16_t,int> counts;
    //figure out unique values and get the counts
    for(int j = 0 ; j < threads_to_use; j++)
      for(const auto z: chains[i][j])
        counts[z]++;
    //dump to standard out in the format "\t|S|NN"
    //S is the 2 char string
    //NN is the number of times that 2 char string appeared after the one above.
    for(const auto & y:counts)
      out<<"\t|"<<*(reinterpret_cast<const char *>(&(y.first))+1) << *(reinterpret_cast<const char *>(&(y.first)))<<"|"<<y.second<<std::endl;
  }
  close(fd);
  return out.str();
}
```

Results:
```sh
2022-10-22T19:23:59-07:00
Running ./build/bench
Run on (32 X 3700.01 MHz CPU s)
CPU Caches:
L1 Data 32 KiB (x16)
L1 Instruction 32 KiB (x16)
L2 Unified 512 KiB (x16)
L3 Unified 32768 KiB (x1)
Load Average: 0.22, 0.08, 0.03
-----------------------------------------------------------------------------
Benchmark                                   Time             CPU   Iterations
-----------------------------------------------------------------------------
BM_compute_chains/original_code          3708 ms         3707 ms            1
BM_compute_chains/read_everything        1768 ms         1768 ms            1
BM_compute_chains/uints                   260 ms          260 ms            3
BM_compute_chains/_4_threads              133 ms          132 ms            5
BM_compute_chains/_32_threads             124 ms          124 ms            5
BM_compute_chains/simd                    218 ms          218 ms            3
BM_compute_chains/_4_threads_simd         705 ms          583 ms            1
```

You can see performance suddenly got worse, not great for us. Not good.

---

# Fin

In conclusion there are a number of performance improvements I could've considered
for the original interview question. This blog post was fun to put together and
look at the impacts of various portions of this code. This is really distilled
from the 60+ versions of the benchmarked code I wrote while exploring this problem.

If performance matters more (such as if there's a hard requirement) then there's
definitely more juice here but the squeezing will continue to get harder and harder.

-Tyler Sean Rau
