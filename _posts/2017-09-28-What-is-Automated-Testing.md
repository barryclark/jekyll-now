---
layout: post
title: What is Automated Testing?
---

This is an introduction to Automated Testing--an introduction. We’re starting from square one here, so if you've never heard of it, or if you've never tried it, or you're interested in learning about it, then you're in the right place. Over this series, we'll start from the very beginning on what is automated testing, why it's important, why we do it, and dip our toe in the water with examples in C#.

# Well, what is it?

Automated testing is when you write code to test your code. This domain is huge and there's a lot to it, but this is the overarching idea. It comes with many benefits (and at times, many struggles), so let's explore.

## Quality

If you've written any code at all--literally any, then you know what bugs are. You know how it feels to find a problem in your software. Whether you write software for a hobby or for a living, you've assuredly spent time fixing problems in your code. We do this because software must work; things that don't work properly aren't useful. Software exists to solve problems, and if it can't do it well, it doesn't do its job.

Quality happens when code works. Moreover, it works over time--it works even though it changes, even though other people maintain it, even though it becomes something it wasn't originally.

## Traditional Testing

Humans aren't perfect, and this bears out in our code. Bugs happen because we didn't write the software perfectly. This is for a great many reasons: the systems are complex and hard to fully understand; we aren't experts in the code we’re writing; we rush and miss details. I'm sure you can think of more reasons. This is why software needs to be tested.

It's typical to have additional people run the software you've built and manually verify that it works as expected. As the code base grows, these Quality Assurance folks have more and more to verify, and it doesn’t scale.

Of course, there are many facets to testing software. You can double-check every day that a button keeps doing what it's supposed to, but it's not hard for a human (and is actually awfully boring and repetitive). Instead, humans should be free to test through exploration and creativity, seeing how the software meshes together and where it falls short, not whether one component produces the expected output--this can be automated.

## Automated Testing

Automated testing is when code is written to verify other code. Automated tests exist alongside the application's codebase (separately, but close by) and exercises it, ensuring it does what it's supposed to. There are huge benefits here. For example, tests can verify things that humans don't have to, freeing them to explore the software in ways that machines can't. Tests can be run frequently to ensure changes to the codebase haven't broken any of the cases, preventing bugs. Tests are much faster than human verification.

Automated testing isn't free, however, and it certainly doesn't _just happen_. Let's explore a little of what it takes.

# The Cost of Automated Testing

## You have to write more code

What probably jumps out is that you’re writing _more_ code. Not only are you writing the application code to make your project work, but suddenly now you have to write additional code in a sibling codebase that tests your application codebase. All this is true. Moreover, the tests are equally important, so they deserve the same design and maintenance that your application gets.

This _must_ mean that it all takes longer, right? If you're doing more work, you have to spend more time on it! That's the obvious answer, but there are nuances here. Once you've written a feature, it's easy to not consider the time required to maintain it. How much time goes into bug fixes that eventually emerge? It's more than none, and it's a cost that can be paid for years. What if you spent more time during the initial development and established rules for the code--rules that, when broken, would alert you to problems in the code?

Spending more time up front on preventative maintenance will pay dividends in the future, so you don't spend time fixing bugs that sneak up on you.

## You have to write code differently

Code isn't inherently ready for automated testing (for reasons we'll see in future posts). This means we need to play ball with automation. We need to opt into it and allow our code to participate. This involves lots of abstraction and dependency management, which can be something that's easy to overlook.

Writing decoupled and reusable code often aligns to having testable code, and it isn't necessarily easy. It requires more work, care, and design. Again, think of this as an upfront cost that ensures you pay less in the long run. Of course, having a well-designed codebase makes automated testing possible, but also maintenance and changes become easier too.

## Automated testing isn't a silver bullet

This is crucial. Automated testing doesn't mean your software is perfect. It does mean you've given more thought and care to how your code is written, and how it expects to behave in a bunch of circumstances. It can offer up confidence that bugs aren't there--for the cases you've recorded. And it makes changing the code much less scary, since you know those cases still continue to work, even though the underlying implementation may be totally different.

Automated testing isn't the panacea to bugs. It's a tool in our toolboxes to establish a higher expectation of quality, through automatic checks, and developer discipline. When wielded with the appropriate force and timing, it's incredibly effective.

# Next Time

Next time we'll look at what automated testing actually looks like. We covered a lot of high-level topics about why it matters here, so we'll dig into some lower-level mechanics. See you then.
