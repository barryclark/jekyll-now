---
layout: post
title: AirBrake, the King of Errors!
---

<p>
	Airbrake is an Error Monitoring Software, which most of us developers welcome with open arms. It basically helps you deal with Production errors, by maintaining a log for the same, capturing the exact URL, number of occurrences, the culprit file which caused the error, all in all, a complete Stack trace for you to fall back into. It looks something like this;
</p>

![_config.yml]({{ site.baseurl }}/images/AirBrakeSnap.png)

<p>
	What you are seeing above is a snapshot of a Resolved Error, specifically *AbstractController::ActionNotFound error*.
</p>

<p>
	As you can see, all the information is broken down beautifully for all the help needed in Debugging. And this is just one of the tabs, there is more information for you to dig into.
</p>

<p>
	For Ruby on Rails applications, you can integrate Airbrake by bundling the airbrake gem. A couple of steps that follow this process are decently summed on the GitHub page for the Gem. You can reach that page following , Airbrake GitHub page.
</p>

<p>
	So, coming to errors now. How do you go about fixing them ?
	You can either mute the error, that way Airbrake won’t be shouting on the top of their lungs for you to fix it. It’ll still pop up in the error list, so that you can pick it up on your convenience, so don’t worry about it getting lost in a black hole of errors.
	Now comes the main thing, resolving them. By digging up in your code to determine the root cause, and fixing it at that very level.
</p>

<p>
	Let’s try to analyse one.
	The one you saw above, AbstractController::ActionNotFound . Let’s scrutinize this one.
	After letting this error play with my sanity for some time, I was able to able to deduce the cause. It is the result of a bad request from the server. Somebody was trying to outsmart the application, by editing the URL of the page he/she was on at that moment, and land upon a page from his imagination. How I got to this conclusion as by reproducing the same on my local system. I tried following the URL, by editing the host string and viola! The beast came out of his hiding place. I was greeted by Rails telling me that the Action I requested does not exist. This being a result of random actions from user, was an error that can’t be really restricted as I don’t have control over what the user decides to visits!
	That’s when I really could relate to the idiom, Ignorance is bliss &lt;3
	So, I added the fix for this in my airbrake.rb file, which is one of the initializer file in your project directory.
	The saviour code block was,
</p>

![_config.yml]({{ site.baseurl }}/images/AirBrakeSnap.png)

*Finished with that!*

Another such beauty I came across was, *SidekiqStatus::Container::StatusNotFound* error.

![_config.yml]({{ site.baseurl }}/images/AirBrake2.png)

<p>
	This one was a bit tricky to debug. I had to bother my teammates and we kept scratching our heads for quite some time.
</p>

<p>
	Our background jobs are handled using Sidekiq.
	So, Sidekiq was not getting status of something. After spending some time, not more than I should have *cough cough*, I got to the root cause. It was happening because there was a Javascript call into the code bound to the event DOMSubtreeModified ( which is now deprecated, reference: DOMSubtreeModified Deprecated ). Sidekiq needed a Job ID to return the status, and the call to get the Job ID was written inside the Javascript enclosed by this bound event. The script was getting called every time that was any DOM level change in the page, irrespective of whether the background job was running or not. This led to the Job ID being nil at times, leading to failure in retrieving the status from Sidekiq.
	The fix for this was replacing that code, and calling the method explicitly every time the action was required. This was able to handle the error, and when we tried reproducing it, nothing! Hurray!
</p>

<p>
	These are the two errors that I dealt with most recently, and felt the need to document it, for future reference as well as for other developers out there who may face similar kind of issues. That’s all for now.
</p>

**Cheers! Niyanta**