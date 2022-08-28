---
layout: memory
title: Splunk Cheatsheet
---

## Splunk Queries

I **really** don't like Splunk documentation. Why is it so hard to find out how to do a certain action? So this is a cheatsheet that I constructed to help me quickly gain knowledge that I need.

## Analysis

### Events over time

```bash
index="my_log"
| bin span=1hr _time
| stats count by _time
```

OR

```bash
index="my_log"
| timechart count span=1hr
```

## Arrays

### Does an array contain a specific value?

```bash
"array_name{}"=value

# Nested arrays
"dictionary_name.array_name{}.dictionary2.deep_nested_array{}"=value
```

### Extracting values from an array

```bash
eval variable_name=mvindex('array_name{}', array_index)
```

## Strings

### String Matching (with whitespace suppression)

If you're unable to match field values as you expect, extract the non-whitespace values from the field and compare against that instead.

For example, in the below example, `context.messageStatus` may contain whitespace, so Splunk won't capture them with a standard `=`. Instead, we need to do the following:

```bash
index="my_log"
| rex field=context.MessageStatus "(?<messageStatus>\w+)"
| eval status=if(messageStatus = "undelivered", "fail", "success")
| search status="success"
```

If you're trying to get multiple matches, use `max_match`, where `max_match=0` finds unlimited matches.

### String Replacement

```bash
rex mode=sed field=your_field "regex_statement"

# This is especially handy when you want to ignore whitespace!
# Example:
#    rex mode=sed field=my_field "s/ //g"
```

### String Concatenation

```bash
eval variable_name = "string1" . "string2"

# This is just like PHP
# Example:
#     eval word = "foo" . "bar" | table word
#
# Output:
#    word
#    ----
#    foobar 
```

### Substrings

```bash
eval variable_name = substr(variable, start_index, length)

# Example:
#    eval word = "foobar" | eval short = substr(word, 1, 3) | table short
#
# Output:
#    short
#    -----
#    oob
```

## eval

Trying to use a nested value in a dictionary, in an eval statement? Use **rename** first!

```bash
Example Entry:
{
    "signals": {
        "ip_address": "1.2.3.4",
    },
}

Query:
    | rename signals.ip_address as ip_addr
    | eval ip_addr=if(isnull(ip_addr), "null", ip_addr)
```

## Working with Multiple Queries

### Subsearch

This is used for funneling the output of one splunk query, into another query. However, some older splunk versions do not support it. However, there are other ways to formulate your query! See [this link](https://answers.splunk.com/answers/129424/how-to-compare-fields-over-multiple-sourcetypes-without-join-append-or-use-of-subsearches.html) for inspiration.

```bash
Example Logs:

nginx_logs
----------
{
 "useragent": "Chrome",
 "status":    200,
 "user":      "random-hash",
}

api_logs
--------
{
 "endpoint":   "/userinfo",
 "request-id": "random-hash",
}

Objective: Find out the useragent

Query:
    index=*
        (endpoint="/userinfo" AND request-id="random-hash") OR user="random-hash"
        | stats count by useragent
 
Explanation:
This searches all logs and tries to cross-reference a request-id from `api_logs`, and
searches for its useragent from `nginx_logs`. Note that the search parameters for the
log in `api_logs` should be as unique as possible, so that it won't pull information
from other logs.
```

### Joins

Joins are handy, when they work. This is a semi-complicated example I've used:

```bash
Example Logs:

suspicious_ips
--------------
{
    "ip_address": "1.2.3.4",
}

valid_ips
-----------
{
    "ip_address": "1.2.3.4",
}

Objective: Determine which IPs in `suspicious_ips` have NOT been logged in `valid_ips`.

Query:
    sourcetype=suspicious_ips
        | join type=left ip_address [
            search search_name=valid_ips
            | stats count by ip_address, search_name
          ]
        | search NOT search_name=valid_ips
```

When doing this, **remember to put `search` in the subsearch**! Otherwise, it won't work at all.

## Filtering

### NOT v !=

This is so lame, and is such a gotcha. [Original source](http://docs.splunk.com/Documentation/Splunk/7.0.2/Search/NOTexpressions).

Turns out, empty string is considered "not existing". Which means, if you have a column of either empty string, or value, and you want to get empty strings only, **use NOT** rather than !=.

## Formatting

I like things looking nice. Often this also means better usability, as it takes less mental energy to parse output
meant for machines. However, Splunk is a **terrible** means to nicely format output, especially when trying to send
this output downstream (like JIRA).

Through lots of trial and error, I have found these patterns to work nicely:

- Use `rex` to extract values

- Use `eval` to assign temporary variables

- Use `mvexpand` to split multiple results from `rex` into their own separate rows

- Use `stats list(<field_to_combine>) as <new_name_for_field> by <params_you_want_to_group_together>`
  to combine rows.
  
- Use `nomv` to teach JIRA to recognize multi-value rows, then use `rex` to replace spaces with new lines.
  IMPORTANT: Even though Splunk does not show the new lines, it will come out as expected in JIRA!

## Miscellaneous Gotchas

### Using rename

For some wacky reason,

```bash
stats count by data.user as user
```

is not the same as

```bash
stats count by data.user | rename data.user to user
```

The **latter** works as expected. I guess learning this method is always better, since it also works
when trying to count by multiple items.

```bash
stats count by data.user, data.email | rename data.user to user
```

## References

- Useful [other eval functions](http://docs.splunk.com/Documentation/Splunk/6.2.1/SearchReference/CommonEvalFunctions).
