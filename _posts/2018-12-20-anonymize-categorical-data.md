---
layout: post
title: Anonymize Categorical Data
---

Often when you're trying to analyze data it can be helpful to anonymize it.

Sometimes this is because it's sensitive information, but I do it to prevent my biases from coming into play while looking at it.

It's easy enough to change the headers of a table, but generally you can figure out what the data is when looking at categorical data; things like names, places, colors, etc.

We're going to walk through a simple function that can be run on a pandas dataframe to replace your categorical values with integers, shrinking the size of your data down quite a bit in the process.

Here's a link to the video I recorded on this, feel free to skip it. I'll go into a bit more detail below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/FDPajjcVsVI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

(I know I already posted it. I'm guessing with some of the changes I'm making to this site that post won't be here for long...)

## Defining the Function

First, we need to define what we actually want to do.

Since I use pandas quite a bit I would like to pass in two things:

* A dataframe containing everything
* A list of columns that contain categorical data

The output is simple, I'd like to get a dataframe that contains the updated columns. Maybe we want a 'key' that links up the categories with the numbers we replace them with, so that can be an improvement later on.

Our basic layout:

```python
def anonymize_categories(df,columns):
    # something goes here I'm sure

    return df
```

## Starting the Loops

Right off the bat we should make something that will loop through the columns.

```python
def anonymize_categories(df,columns):
    for col in columns:
        # Anonymize those values!

    return df
```


Next, we know that we want to generate a list of unique values in the column, and assign each a unique number. Pandas `unique()` will get us the former, while the built-in `enumerate` gets us the latter.

A dictionary would be perfect to use as the 'translator' so let's make our list into that:

```python
def anonymize_categories(df, columns):
    for col_name in columns:
        res_dict = {}
        for i,val in enumerate(df[col_name].unique()):
            res_dict[val] = i

    return df
```

This looks good and does what we want. If you pass in a value you can get a number back. Let's clean it up with a dictionary comprehension:

```python
def anonymize_categories(df, columns):
    for col_name in columns:
        keys = {cats: i for i,cats in enumerate(df[col_name].unique())}

    return df
```

Much better.

Now, lets loop through that column and replace all the values with the new values using `apply()` and a lambda function.

```python
def anonymize_categories(df, columns):
    for col_name in columns:
        keys = {cats: i for i,cats in enumerate(df[col_name].unique())}
        df[col_name] = df[col_name].apply(lambda x: keys[x])
    return df
```

Excellent!

## Next Steps

I'll leave it up to you to improve this. Here's a couple 'feature requests' to get you started:

* Give the option to return a keys dataframe (pd.DataFrame.from_records is a big start)
* This treats all columns as independent of each other, can you find a way to link columns you want?

The next installment of this will be to anonymize continuous data, which is much more straightforward but has a bit of a twist. I'll probably have the video up Tuesday, then the post up Thursday.
