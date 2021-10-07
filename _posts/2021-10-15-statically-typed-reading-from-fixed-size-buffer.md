---
layout: post
tags: rust
#categories: []
date: 2021-10-15
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'C++ Metaprogramming: Statically Typed Reading from a Fixed Size Buffer'
comments_id: 
---

TODO make a post out of this

```c++
#include <cstdint>
#include <tuple>
#include <iostream>
#include <type_traits>

using std::size_t;


// calculate the partial sum of Nelem elements of the given types
// we should make sure that all these types are of the same (numerical) type
template<size_t Nelem,typename T,typename ...Ts>
constexpr T partial_sum(T const t, Ts const... ts) {
    static_assert(Nelem < 1+sizeof...(Ts),"Not enough elements to sum up");
    static_assert( (std::is_same_v<T,Ts>&&...),"All arguments to be summed must be of the same type");
    if constexpr(Nelem == 0) {
        return 0;
    } else {
        return t+partial_sum<Nelem - 1>(ts...);
    }
}

// make a sequence of offsets based on the sizes of the given types
// the offset begins at 0 and the offset sequence is given in byte
// the sequence for the types <char, uint32_t,uint16_t> is e.g
// <0,1,5>
template<typename ...Ts, size_t ...Is>
constexpr auto make_offset_sequence_impl(std::integer_sequence<std::size_t,Is...>) {
    return std::integer_sequence<size_t, (partial_sum<Is>(sizeof(Ts)...))...>();
}

template<typename ...Ts>
constexpr auto make_offset_sequence() {
    return make_offset_sequence_impl<Ts...>(std::index_sequence_for<Ts...>());
}

template<size_t I ,size_t ...Is>
void print_integer_sequence(std::integer_sequence<size_t, I, Is...>) {
    std::cout << I;
    (std::cout << ... << (std::cout << ",",Is));
    std::cout << "\n";
}

template<typename T, size_t OffsetBytes,size_t N>
T elem_from_buffer_impl(char const (& buffer)[N]) {
    return *(reinterpret_cast<const T*>( buffer+OffsetBytes));
}

template<typename ...Ts, size_t N, size_t ...Offsets>
std::tuple<Ts...> from_buffer_impl(char const (&buffer)[N], std::index_sequence<Offsets...>) {
    std::tuple<Ts...> tup = {
            elem_from_buffer_impl<Ts,Offsets>(buffer)...
    };

    return tup;
}

template<typename ...Ts, size_t N>
std::tuple<Ts...> from_buffer(char const (&buffer)[N]) {
    static_assert(N>0, "Cannot read from empty buffer");
    static_assert(sizeof...(Ts)>0, "Must read at least one element from the buffer");
    static_assert( (sizeof(Ts)+...) <= N*sizeof(buffer[0]), "Not enough elements to read from in fixed size buffer");
    return from_buffer_impl<Ts...>(buffer,make_offset_sequence<Ts...>());
}

int main() {
    std::cout << "Partial Sum = " << partial_sum<3>(1,2,3,1,1,1,1) << "\n";
    //std::cout << "Partial Sum = " << partial_sum2<2,1,1,1,1>() << "\n";
    char buf[] = {'a', 'b', 'c', 'd','e','f','g','h','i','j','k'};
    print_integer_sequence(std::integer_sequence<size_t,1,5,7>());
    print_integer_sequence(make_offset_sequence<char,int,int,int>());

    auto [a,b,c,d]= from_buffer<char,int,float, unsigned short>(buf);


    std::cout << "Elements from Buffer = " << a << "," << b <<","  << c << "," << d;
    //std::cout << "Iptr = " << a << "," << b <<",";


    return 0;
}
```


of course we can also template on the buffer type itself and allow other types than single bytes. However we have to pay attention that our pointer arithmetic will not work as expected for types that are not one byte long. That is because adding to a pointer will increase it by sizeof(elem). We could still cast the zero element to a (char*) and proceed like we have.


tested this with other buffertypes

```c++
ude <cstdint>
#include <tuple>
#include <iostream>
#include <type_traits>

using std::size_t;


// calculate the partial sum of Nelem elements of the given types
// we should make sure that all these types are of the same (numerical) type
template<size_t Nelem,typename T,typename ...Ts>
constexpr T partial_sum(T const t, Ts const... ts) {
    static_assert(Nelem < 1+sizeof...(Ts),"Not enough elements to sum up");
    static_assert( (std::is_same_v<T,Ts>&&...),"All arguments to be summed must be of the same type");
    if constexpr(Nelem == 0) {
        return 0;
    } else {
        return t+partial_sum<Nelem - 1>(ts...);
    }
}

// make a sequence of offsets based on the sizes of the given types
// the offset begins at 0 and the offset sequence is given in byte
// the sequence for the types <char, uint32_t,uint16_t> is e.g
// <0,1,5>
template<typename ...Ts, size_t ...Is>
constexpr auto make_offset_sequence_impl(std::integer_sequence<std::size_t,Is...>) {
    return std::integer_sequence<size_t, (partial_sum<Is>(sizeof(Ts)...))...>();
}

template<typename ...Ts>
constexpr auto make_offset_sequence() {
    return make_offset_sequence_impl<Ts...>(std::index_sequence_for<Ts...>());
}

template<size_t I ,size_t ...Is>
constexpr void print_integer_sequence(std::integer_sequence<size_t, I, Is...>) {
    std::cout << I;
    (std::cout << ... << (std::cout << ",",Is));
    std::cout << "\n";
}


// old version
// template<typename T, size_t OffsetBytes,size_t N>
//   constexpr T elem_from_buffer_impl(char const (& buffer)[N]) {
//    return *(reinterpret_cast<const T*>( buffer+OffsetBytes));
//  }
//template<typename ...Ts, size_t N, size_t ...Offsets>
//constexpr std::tuple<Ts...> from_buffer_impl(char const (&buffer)[N], std::index_sequence<Offsets...>) {
//    std::tuple<Ts...> tup = {
//            elem_from_buffer_impl<Ts,Offsets>(buffer)...
//    };
//
//    return tup;
//}
//
//template<typename ...Ts, size_t N>
//constexpr std::tuple<Ts...> from_buffer(char const (&buffer)[N]) {
//    static_assert(N>0, "Cannot read from empty buffer");
//    static_assert(sizeof...(Ts)>0, "Must read at least one element from the buffer");
//    static_assert( (sizeof(Ts)+...) <= N*sizeof(buffer[0]), "Not enough elements to read from in fixed size buffer");
//    return from_buffer_impl<Ts...>(buffer,make_offset_sequence<Ts...>());
//}

template<typename T, size_t OffsetBytes>
  constexpr T elem_from_buffer_impl(uint8_t const * const buffer) {
    return *(reinterpret_cast<const T*>( buffer+OffsetBytes));
  }


template<typename ...Ts, size_t ...Offsets>
constexpr std::tuple<Ts...> from_buffer_impl(uint8_t const * const buffer, std::index_sequence<Offsets...>) {
    std::tuple<Ts...> tup = {
            elem_from_buffer_impl<Ts,Offsets>(buffer)...
    };

    return tup;
}

template<typename ...Ts, size_t N, typename BufType>
constexpr std::tuple<Ts...> from_buffer( BufType const (&buffer)[N]) {
    static_assert(N>0, "Cannot read from empty buffer");
    static_assert(sizeof...(Ts)>0, "Must read at least one element from the buffer");
    static_assert( (sizeof(Ts)+...) <= N*sizeof(buffer[0]), "Not enough elements to read from in fixed size buffer");
    return from_buffer_impl<Ts...>( reinterpret_cast<uint8_t const*>(& buffer[0]),make_offset_sequence<Ts...>());
}

int main() {
    std::cout << "Partial Sum = " << partial_sum<3>(1,2,3,1,1,1,1) << "\n";
    //std::cout << "Partial Sum = " << partial_sum2<2,1,1,1,1>() << "\n";
    char buf[] = {'a', 'b', 'c', 'd','e','f','g','h','i','j','k'};
    int buf2[] = {1684234849, 1751606885,7039593}; // same buffer as above just with ints
    // see this hex editor: https://hexed.it/

    print_integer_sequence(std::integer_sequence<size_t,1,5,7>());
    print_integer_sequence(make_offset_sequence<char,int,int,int>());

    auto [a,b,c,d]= from_buffer<char,int,float, unsigned short>(buf2);


    std::cout << "Elements from Buffer = " << a << "," << b <<","  << c << "," << d;
    //std::cout << "Iptr = " << a << "," << b <<",";


    return 0;
}
```
