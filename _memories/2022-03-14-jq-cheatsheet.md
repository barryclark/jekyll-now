---
layout: memory
title: jq cheatsheet
---

jq is useful to slice, filter, map and transform structured json data. It can also help to pretty print data in the terminal. The fancy alternative to view JSON data in the terminal is [fx](https://github.com/antonmedv/fx)

## Useful arguments

When running jq, the following arguments may become handy:

| Argument        |  Description  |
| ----------------| :--------------------------------------------------------------|
| `--version`     | Output the jq version and exit with zero.                      |
| `--sort-keys`   | Output the fields of each object with the keys in sorted order.|

## Basic concepts

The syntax for jq is pretty coherent:

| Syntax  |  Description                                                          |
|:-------:| :---------------------------------------------------------------------|
| ,       | Filters separated by a comma will produce multiple independent outputs|
| ?       | Will ignores error if the type is unexpected                          |
| []      | Array construction                                                    |
| {}      | Object construction                                                   |
| +       | Concatenate or Add                                                    |
| -       | Difference of sets or Substract                                       |
| length  | Size of selected element                                              |
| &#124;  | Pipes are used to chain commands in a similar fashion than bash       |


## Dealing with json objects

| Description                | Command                                 |
| ---------------------------| :---------------------------------------|
| Display all keys           | `jq 'keys'`                             |
| Adds + 1 to all items      | `jq 'map_values(.+1)'`                  |
| Delete a key               | `jq 'del(.foo)'`                        |
| Convert an object to array | `to_entries &#124; map([.key, .value])` |

## Dealing with fields

| Description           | Command                        |
| ----------------------| :----------------------------- |
| Concatenate two fields| `fieldNew=.field1+' '+.field2` |


## Dealing with json arrays

### Slicing and Filtering

| Description                     | Command |
| :------------------------------:| :------------------------------------------------- |
| All                             | `jq .[]`                                           |
| First                           |	`jq '.[0]'`                                    |
| Range                           | `jq '.[2:4]'`                                      |
| First 3                         | `jq '.[:3]'`                                       |
| Last 2                          | `jq '.[-2:]'`                                      |
| Before Last                     | `jq '.[-2]'`                                       |
| Select array of int by value    | `jq 'map(select(. >= 2))'`                         |
| Select array of objects by value| ** jq '.[] &#124; select(.id == "second")'**       |
| Select by type                  | ** jq '.[] &#124; numbers' ** with type been arrays, objects, iterables, booleans, numbers, normals, finites, strings, nulls, values, scalars |

### Mapping and Transforming

| Description                            | Command                                                             |
| ---------------------------------------| :------------------------------------------------------------------ |
| Add + 1 to all items                   | `jq 'map(.+1)'`                                                     |
| Delete 2 items                         | `jq 'del(.[1, 2])'`                                                 |
| Concatenate arrays                     | `jq 'add'`                                                          |
| Flatten an array                       | `jq 'flatten'`                                                      |
| Create a range of numbers              | `jq '[range(2;4)]'`                                                 |
| Display the type of each item          | `jq 'map(type)'`                                                    |
| Sort an array of basic type            | `jq 'sort'`                                                         |
| Sort an array of objects               | `jq 'sort_by(.foo)'`                                                |
| Group by a key - opposite to flatten   | `jq 'group_by(.foo)'`                                               |
| Minimum value of an array              | `jq 'min'` .See also  min, max, min_by(path_exp), max_by(path_exp)  |
| Remove duplicates                      | `jq 'unique'` or `jq 'unique_by(.foo)'` or `jq 'unique_by(length)'` |
| Reverse an array                       | `jq 'reverse'`                                                      |
