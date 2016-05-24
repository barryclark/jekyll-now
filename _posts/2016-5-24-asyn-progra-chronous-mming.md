---
layout: post
title: Asyn program chronous mming
---

#### If you can read this title, it means that you know just about everything about asynchronous programming. 
You can leave this post alone and don't bother. 

Still here? OK, let's dive in. To explain my understanding of asynchronous programming, I have decided to write a whole post in an asynchronous manner (like the title).  
OK, I know what you think an another blog post about asynchronous bla-bla-bla. OK, you got me, this isn't that kind of <s>movie</s> blog post, I am not going to waste your time and explain asynchronous programming, there are dozens of good materials you can find on the net.

You know me. Today I woke up and felt that today will be the day of asynchronous programming. Then I got notified about the "Your coffee is ready, my lord" event and scheduled the event handler to the thread pool. After a few context switches I finally drank my coffee, went to work and woke up all in one OS time slice and started  writing this post.

#### What is the purpose of writing this post if I am not going to explain what is asynchronous programming? 

I just want to give you some real world examples of asynchronous things and share some code snippet that can be reused 
in multiple any WinForm or WPF desktop applications.

<!--more-->

### Let’s start from example.

Imagine a situation: You need to go to the restroom and you take your iPad with you. And you are like just sitting and playing something on your iPad. Playing a game on iPad is an operation executed by a single thread. 
When you need to "use force", you pause playing the game, do your stuff and then get back to playing after "using the force". 

It is asynchronous.

Once again, you have one thread that is playing the game on iPad. 
While playing on iPad you get an "I/O operation call", you pause the current thread and continue with executing the "I/O" operation. 
Then your iPad playing thread is free and it can work on an another thing (like thinking about the world), but when the "I/O" operation ends you resume playing and you stop thinking about the world.
You will start thinking about world again when second iteration of "I/O" occurs.

Everything is asynchronous. You just need to the right point of view to see the whole picture.

#### Now about WPF and WinForms. 
In the UI applications we're interacting with the user in the UI thread (this is our iPad playing thread) and usually do service calls (this like “using the force”). And while we are performing service calls we need to free our UI thread so that it can continue interacting with the user (work in another thing like thinking about the world). 

After trying to clear the things out, I would like to share a code that will help with developing asynchronous programs and avoiding inventing an another bicycle. 

(Yes it is just another bicycle that may or may not help you.)

```c#
public static async void Run<T>(Func<T> work, Action<T> uiUpdate) where T : class
{
    AggregateException workExceptions = null;

    await Task.Run(() =>
    {
        return work();

    }).ContinueWith((r) =>
    {
        if(r.Exception == null)
        {
            if(r.Result != null)
            {
                uiUpdate?.Invoke(r.Result);
            }
        }
        else
        {
            workExceptions = r.Exception;
        }
    }, TaskScheduler.FromCurrentSynchronizationContext());
}
```

If you have a close look at the code above, you'll notice that in my assumption that your service call will return a result that will be used in UI thread for rendering. Also I have used the `TaskScheduler.FromCurrentSynchronizationContext()` construct in-order to properly update the UI (as you know you may only update UI controls from the foreground thread that has created the control).

That’s all folks. 

You can modify this code to fit your needs. I have also added the exception handling to easy up your work. You can add more overloads and do other nasty things like that.

Below you can find the repository with full source code and a simple example that demonstrates the basic usage of the provided construct.
[AsyncHelper](https://github.com/arkoc/AsyncHelper)

Holy gods of Pythonium I have totally forgot about the asynchronous music… 

[Asynchronous Music](https://www.youtube.com/watch?v=oIr5Eamemv8)
