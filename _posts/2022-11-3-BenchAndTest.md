---
layout: post
title: Benchmarking and Testing
---

Have you ever had a piece of code you wanted to
optimize but you also want to confirm it has the
same results when you're done?

I've definitely been there and if you have then
this post should show you how to quickly plug
Google benchmark and Google test into your code
via `cmake` so you can use them to accomplish both
types of testing needs!

Personally I get really annoyed when having to
setup my own testing or benchmarking system. I
just want to benchmark or test the code already
and trust that the apparatus to do these things
is well tested and already functions. This will
show you how to do a quick integration with
google test and google benchmark via cmake!

---

## Google Test

You can find Google test [here](https://github.com/google/googletest).
(sometimes people refer to it as gtest instead of
google test). I personally find this framework to
be handy to work with and really powerful. I really
recommend checking out the documentation.

## Google Benchmark

You can find Google benchmark [here](https://github.com/google/benchmark).
It has a lot of similarities to Google Test. The
knowledge transfer between the two makes it a
strong contender for me. Also a huge recommendation
for checking out the docs.

## So what are we going to benchmark and test?

I wrote some simple code here
* `source_code.h`:
```cpp
#ifndef SOURCECODE_H
#define SOURCECODE_H

#include <vector>

extern std::vector<int> do_something(void);

#endif
```

* `source_code.cpp`:
```cpp
#include "source_code.h"

#include <vector>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

std::vector<int> do_something(void)
{
  int fd = open("/dev/urandom", O_RDONLY);
  if(fd < 0)
    throw "failed to open file";
  int v = 0;
  read(fd, &v, 1);
  close(fd);
  std::vector<int> ret{v};
  return ret;
}
```

## How do we hook up benchmarking and testing?

First lets create the cpp files for benchmarking
and testing our code.


### Testing

For testing let's make a simple test for this code

* `source_code.test.cpp`
```cpp
#include "source_code.h"
#include <gtest/gtest.h>

TEST(do_something, CorrectSize)
{
  const std::vector<int> ret = do_something();
  EXPECT_EQ(ret.size(), 1);
}
```

### Benchmarking

For benchmarking we can add another simple test.

* `source_code.benchmark.cpp`
```cpp
#include "source_code.h"
#include <benchmark/benchmark.h>

static void BM_do_something(benchmark::State & state)
{
  for(auto _ : state)
  {
    std::vector<int> foo;
    benchmark::DoNotOptimize(foo = do_something());
    benchmark::ClobberMemory();
  }
}

BENCHMARK(BM_do_something);
```

## Joining everything with `cmake`!

The last step is to finally join all the code
together with `cmake`!

This is the most joyful part out of all of
this. We can write a single `CMakeLists.txt`
file to join all this code together for us
AND it will pull the google test and google
benchmark repos for us automatically!

Let's check it out:

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
    GIT_TAG release-1.12.0
)

FetchContent_Declare(
  googlebenchmark
    GIT_REPOSITORY https://github.com/google/benchmark.git
    GIT_TAG v1.7.0
)

FetchContent_MakeAvailable(
  googletest
  googlebenchmark
)

add_library(
  source_code
  source_code.cpp
)
target_include_directories(
  source_code
  PUBLIC
  "${CMAKE_CURRENT_SOURCE_DIR}"
)

enable_testing()

add_executable(source_code_test)
target_sources(
  source_code_test
  PRIVATE
    source_code.test.cpp
)
target_link_libraries(
  source_code_test
  PRIVATE
    gtest_main
    source_code
)
include(GoogleTest)
gtest_discover_tests(source_code_test)

add_executable(source_code_benchmark)
target_sources(
  source_code_benchmark
  PRIVATE
    source_code.benchmark.cpp
)
target_link_libraries(
  source_code_benchmark
  PRIVATE
    source_code
    pthread
    benchmark::benchmark
    benchmark::benchmark_main
)
```

You can see above we have our nice `source_code`
library and we simply link that up with two
different executables: source_code_test and
source_code_benchmark. Each of those is properly
linked with the libraries to make their
intended pieces function.

Quick aside 1: google benchmark depends on google
test. So if you only care about benchmarking then
you still need to have the FetchContent for google
test. (You can omit the later pieces related to
the actual test executable)

Quick aside 2: I did find a bug in google benchmark
that appears to be a side effect from building
with it. [Open issue here](https://github.com/google/benchmark/issues/1498),
but it doesn't impact the above CMakeLists.txt

## Build and Run those benchmarks and tests!

This will create the executables for us:

```sh
mkdir build
cmake -DCMAKE_BUILD_TYPE=Release -S . -B build
cmake --build build -- -j
```

Now let's run them!

Benchmarks:
```sh
$ ./build/source_code_benchmark
2022-11-04T00:40:14-07:00
Running ./build/source_code_benchmark
Run on (32 X 3700.01 MHz CPU s)
CPU Caches:
  L1 Data 32 KiB (x16)
  L1 Instruction 32 KiB (x16)
  L2 Unified 512 KiB (x16)
  L3 Unified 32768 KiB (x1)
Load Average: 1.18, 0.32, 0.10
----------------------------------------------------------
Benchmark                Time             CPU   Iterations
----------------------------------------------------------
BM_do_something        899 ns          899 ns       784836
```

Tests:
```sh
$ ./build/source_code_test
Running main() from ...snipped...
[==========] Running 1 test from 1 test suite.
[----------] Global test environment set-up.
[----------] 1 test from do_something
[ RUN      ] do_something.CorrectSize
[       OK ] do_something.CorrectSize (0 ms)
[----------] 1 test from do_something (0 ms total)

[----------] Global test environment tear-down
[==========] 1 test from 1 test suite ran. (0 ms total)
[  PASSED  ] 1 test.
```

And with that we're done! As new functions get created
in the `source_code` library we can continue to design
tests and benchmarks for each of them, place them
in their respective files, and rerun!

In closing I want to echo again checkout the documentation
for both of these libraries: [google test](https://github.com/google/googletest)
and [google benchmark](https://github.com/google/benchmark).
There's a lot more power in them than I've shown here, and
I hope this is a quick enough introduction to encourage their
use whenever you need to test or benchmark C++ code!

---

Thanks for your time,
Tyler Sean Rau
