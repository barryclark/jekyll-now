---
layout: post
title: C++ static vs dynamic polymorphism
---

Hello everyone! Today I want to mention some
static vs dynamic polymorphism stuff that I
thought was cool.

---

In some project that I'm working on at home
I have a set of jobs emplemented like this:

```cpp
enum class job_t
{
  a,
  b,
  c
};

class job
{
  public:
    virtual ~job(void);
    virtual job_t get_job_type(void) const = 0;
}

class a: public job
{
  public:
    get_job_type(void) const final
    {
      return job_t::a;
    }
}

class b: public job
{
  public:
    get_job_type(void) const final
    {
      return job_t::b;
    }
}

class c: public job
{
  public:
    get_job_type(void) const final
    {
      return job_t::c;
    }
}
```

The main reason I've done this is to
envision some kind of common representation
of a job and get the compiler to help me
make sure I'm implementing everyting I said
I would.

---

A few days ago I was wondering if I could
use static polymorphism instead of dynamic.
Meaning that at compile time the correct function
calls are all selected without the need for
the vtable during runtime.

one way you might have seen static polymorphism
in the past is via function overloading:

```cpp
void foo(bar b);
void foo(car c);

int main(void)
{
  bar b;
  car c;
  foo(b);
  foo(c);
}
```

Here function overloading resolves during
compile time and chooses the function to
be called based on the type of the input
parameter.

---

In my situation I wanted static polymorphism
but also want all the nice class interface
validations. I just wanted the interface
requirement checking.

My search revealed to me that [Curiously
recurring template pattern](https://en.wikipedia.org/wiki/Curiously_recurring_template_pattern)
actually is one way to do this.

Let's take a peek at how that would look

```cpp
enum class job_t
{
  a,
  b,
  c
};

template<typename T>
class job
{
  public:
    job_t get_job_type(void) const
    {
      return static_cast<T*>(this)->get_job_type_impl();
    }
}

class a: public job<a>
{
  public:
    job_t get_job_type_impl(void) const
    {
      return job_t::a;
    }
}

class b: public job<b>
{
  public:
    job_t get_job_type_impl(void) const
    {
      return job_t::b;
    }
}

class c: public job<c>
{
  public:
    job_t get_job_type_impl(void) const
    {
      return job_t::c;
    }
}
```

Nice! This gives me the validation of
the interface while remaining static
polymorphism.

---

###Food for thought

I had the assumption that there should be
some performance gains for this change. I had
thought this because the compiler shouldn't need
the vtable and thus function calls can be resolved
at compile time.

However I've been trying to think of a situation
where we could actually measure this performance
change. I struggled to think of such a situation
and decided to just try the most basic idea that
I had.

When I ran that code I saw identical performance
across the board. If you've a suggestion on how
to make this possible performance difference
manifest in benchmark results then I'd love to
here from you!

In total though if you just want interface
validation then this CRTP strategy might be
for you; however be sure you arm yourself with
real performance numbers before trying to
argue static vs dynamic polymorphism.

---

Here's what I observed:

```sh
$ ./build/source_code_benchmark --benchmark_repetitions=200 --benchmark_report_aggregates_only=true
2023-06-01T00:05:23-07:00
Running ./build/source_code_benchmark
Run on (16 X 3700 MHz CPU s)
CPU Caches:
  L1 Data 32 KiB (x8)
  L1 Instruction 32 KiB (x8)
  L2 Unified 512 KiB (x8)
  L3 Unified 32768 KiB (x1)
Load Average: 0.42, 0.66, 0.40
---------------------------------------------------------------------
Benchmark                           Time             CPU   Iterations
---------------------------------------------------------------------
BM_dynamic_add_mean              15.5 ns         15.5 ns          200
BM_dynamic_add_median            15.5 ns         15.5 ns          200
BM_dynamic_add_stddev           0.224 ns        0.224 ns          200
BM_dynamic_add_cv                1.44 %          1.44 %           200
BM_dynamic_subtract_mean         15.5 ns         15.5 ns          200
BM_dynamic_subtract_median       15.5 ns         15.5 ns          200
BM_dynamic_subtract_stddev      0.107 ns        0.107 ns          200
BM_dynamic_subtract_cv           0.69 %          0.69 %           200
BM_static_add_mean               15.5 ns         15.5 ns          200
BM_static_add_median             15.4 ns         15.4 ns          200
BM_static_add_stddev            0.073 ns        0.073 ns          200
BM_static_add_cv                 0.47 %          0.47 %           200
BM_static_subtract_mean          15.5 ns         15.5 ns          200
BM_static_subtract_median        15.5 ns         15.5 ns          200
BM_static_subtract_stddev       0.384 ns        0.384 ns          200
BM_static_subtract_cv            2.47 %          2.47 %           200
```

Using this `svd.cpp` file:

```cpp
#include <benchmark/benchmark.h>
#include <random>
#include <memory>
#include <algorithm>

class dynamic_operation
{
  public:
    virtual ~dynamic_operation(void){}
    virtual int operation(int, int) const = 0;
};

class dynamic_add: public dynamic_operation
{
  public:
    virtual ~dynamic_add(void){}
    int operation(int a, int b) const final {return a + b;}
};

class dynamic_subtract: public dynamic_operation
{
  public:
    virtual ~dynamic_subtract(void){}
    int operation(int a, int b) const final {return a - b;}
};

int indirect_dynamic_operation(dynamic_operation & x, int a, int b)
{
  return x.operation(a, b);
}

template<typename T>
class static_operation
{
  public:
    int operation(int a, int b) const {return static_cast<const T*>(this)->operation(a, b);}
};

class static_add: public static_operation<static_add>
{
  public:
    int operation(int a, int b) const {return a + b;}
};

class static_subtract: public static_operation<static_subtract>
{
  public:
    int operation(int a, int b) const {return a - b;}
};

template<typename T>
int indirect_static_operation(static_operation<T> & x, int a, int b)
{
  return x.operation(a, b);
}

static void BM_dynamic_add(benchmark::State & state)
{
  static thread_local std::mt19937 gen(0);
  static thread_local std::uniform_int_distribution<> distrib(0, 9);
  std::unique_ptr<dynamic_add> ad = std::make_unique<dynamic_add>();
  for(auto _ : state)
  {
    int foo = 0;
    benchmark::DoNotOptimize(foo = ad->operation(distrib(gen), distrib(gen)));
    benchmark::ClobberMemory();
  }
}

BENCHMARK(BM_dynamic_add);

static void BM_dynamic_subtract(benchmark::State & state)
{
  static thread_local std::mt19937 gen(0);
  static thread_local std::uniform_int_distribution<> distrib(0, 9);
  std::unique_ptr<dynamic_subtract> as = std::make_unique<dynamic_subtract>();
  for(auto _ : state)
  {
    int foo = 0;
    benchmark::DoNotOptimize(foo = as->operation(distrib(gen), distrib(gen)));
    benchmark::ClobberMemory();
  }
}

BENCHMARK(BM_dynamic_subtract);

static void BM_static_add(benchmark::State & state)
{
  static thread_local std::mt19937 gen(0);
  static thread_local std::uniform_int_distribution<> distrib(0, 9);
  std::unique_ptr<static_add> sa = std::make_unique<static_add>();
  for(auto _ : state)
  {
    int foo = 0;
    benchmark::DoNotOptimize(foo = sa->operation(distrib(gen), distrib(gen)));
    benchmark::ClobberMemory();
  }
}

BENCHMARK(BM_static_add);

static void BM_static_subtract(benchmark::State & state)
{
  static thread_local std::mt19937 gen(0);
  static thread_local std::uniform_int_distribution<> distrib(0, 9);
  std::unique_ptr<static_subtract> ss = std::make_unique<static_subtract>();
  for(auto _ : state)
  {
    int foo = 0;
    benchmark::DoNotOptimize(foo = ss->operation(distrib(gen), distrib(gen)));
    benchmark::ClobberMemory();
  }
}

BENCHMARK(BM_static_subtract);
```

with this CMakeLists.txt

```cmake
cmake_minimum_required(VERSION 3.14)
project(my_project)

set(CMAKE_CXX_STANDARD 20)
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

add_executable(source_code_benchmark)
target_sources(
  source_code_benchmark
  PRIVATE
    svd.cpp
)
target_link_libraries(
  source_code_benchmark
  PRIVATE
    pthread
    benchmark::benchmark
    benchmark::benchmark_main
)
```

---
Thanks for your time,
Tyler Sean Rau
