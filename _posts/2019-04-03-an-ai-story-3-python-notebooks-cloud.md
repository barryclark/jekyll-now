---
title: An AI Story — Part 3
date: 2019-04-03
---

# Python notebooks in the cloud

![Machine Learning](https://miro.medium.com/max/1100/0*0IEhIk5IAuerFeg_.jpg)

#### Ashesi DSC

I got an invite from Ashesi University’s Developer Student Club (Ashesi DSC) to facilitate a machine learning workshop using TensorFlow. I jumped right in. I love Ashesi!

![](https://miro.medium.com/max/640/1*WWknQ0FWrxnkB5a1wgMHDA.png)

We had the workshop on Saturday, the 30th of March, 2019.

The Ashesi DSC leads, Wayne and Hannah, did a good job of chronicling our activities at the workshop in terms of content and pictures. Their blog post contains a detailed outline, and explanations, of what we did on Saturday.

You can find it [here](https://medium.com/@ashesidsc/dsc-ashesi-machine-learning-basics-using-googles-tensorflow-4c531c7d9167). It also contains links to my slides as well as live code.

Now, to our main topic for today:

#### Python Notebooks in the Cloud

During the workshop, we used Google Colaboratory — Google Colab, for short — to run our code. I’ll explain why it’s so awesome and what to watch out for in a bit, but first, let’s talk about Python notebooks.

When I first discovered Jupyter Notebooks (every data scientist’s favourite environment), I was ecstatic. Code and text living in harmony… things couldn’t get any better, I thought. Boy, was I wrong.

#### Free GPU!
The promise of faster training times using freely available graphics and tensor processing units (GPU and TPU respectively) is what drew me to Google Colab the first time, a cloud-based Python notebook environment by Google.

GPU’s and TPU’s, based on their architecture, can really speed up the training of a machine learning model. Where a CPU will use an hour, a GPU may use minutes; where a CPU will use days (seriously, people have trained models for days), a GPU may use hours. But when you have a laptop like mine, with no hope of attaching a GPU, Colab is a godsend.

An added advantage is that for beginners, the platform comes with loads of data science and machine learning tools and libraries pre-installed, like TensorFlow, PyTorch, NumPy, Matplotlib, etc. All you need to do is import your favourite library and write your code. Colab notebooks also save directly to your Google Drive, making sharing extremely easy.

The benefits are very clear. Here’s a [Colab tutorial](https://towardsdatascience.com/getting-started-with-google-colab-f2fff97f594c) to get you started if you are not already familiar.

However, as with everything created by man, Colab has its buggy days, and a cap on extended usage with their free version ☹️.

#### Google Colab Pitfalls
Imagine you’re going to give a talk to Ashesi DSC and that morning you decide to check on your demo projects in the cloud, only to see this:

![](https://miro.medium.com/max/1100/0*HloTml5KNCeD6CxU.png)

Well, I almost had a fit.

I switched browsers, went incognito and switched my internet source. Nothing worked. To a large extent it looks like it was an internet problem, although all my other internet applications were working, and I could access my Google Drive.

This brings our attention to two main pitfalls:

1. If your internet connection is poor, Colab will frustrate you. This is pretty straightforward, and something many developers in Africa come to terms with very early… a stable internet connection golden.
2. It’s Google tech: it’s good, but it’s not perfect. Sometimes, Colab will just act up, especially since its a fairly new Google product. Chances are, you can’t do anything about it when that happens.

So Colab was misbehaving, and I had a workshop in a few hours. I had to improvise. I could use my CPU and run things locally, but that would be slow. I needed an alternative, and I found one.

#### Kaggle Kernels
[Kaggle.com](http://kaggle.com/) is a popular data science and machine learning competition platform. At any given point in time there are about twenty active data science or machine learning problems on the site with cash prizes for winners.

Kaggle, however, is more than a competition platform, it is also a hub for learning, massive datasets, and live Python notebooks called kernels.

Kaggle kernels are pretty much the same as Colab notebooks with the exception of TPU availability and Google Drive integration. But we still have free GPU! Also, even on that seemingly poor network, I was able to re-upload my demo projects and run them on Kaggle with the speed of free GPU.

#### Other Alternatives

My moment of confusion led me to look for help in the data science community. I found a link in Ghana's PyData community which showed me that there were even more alternatives to both Kaggle kernels and Google Colab: platforms like [Binder](https://mybinder.org/), [Azure Notebooks](https://notebooks.azure.com/), [CoCalc](https://cocalc.com/) and [Datalore](https://datalore.io/).

To get a full comparison of these platforms, follow [this link](https://www.dataschool.io/cloud-services-for-jupyter-notebook/).

#### Conclusion

We’re in the data age and the one who can harness data best almost always wins. If you thought the tech to get this done is far beyond you, I have just shown you that it is not, so think again.

If one platform fails you, there’s at least five more to try, and where all fail we still have good ol’ Jupyter Notebooks which can be installed locally. I hope this helps someone get unstuck.

Happy coding!

KayO


---
Originally posted in [Towards Data Science](https://medium.com/towards-data-science/an-ai-story-part-3-python-notebooks-in-the-cloud-f7d4d62af1ae).
