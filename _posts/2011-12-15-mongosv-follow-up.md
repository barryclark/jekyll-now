---
title: MongoSV follow up
author: kgorman
layout: post
permalink: mongosv-follow-up
aktt_notify_twitter:
  - yes
aktt_tweeted:
  - 1
fave-post_views:
  - 74
categories:
  - Mongodb
---
What a madhouse!  The 2011 MongoSV conference was a blast, it didn&#8217;t hurt there were over 1000 attendees.  I really enjoyed some excellent talks, and good discussions with colleges and 10gen employees.  Plus, the opportunities in the evenings for a couple cold beverages were fantastic.

![][1]

I have a couple take-aways from this years conference:

*   The new aggregation features of MongoDB are going to be great, I am excited to start playing with them.
*   10gen is listening to us about the locking behavior of MongoDB, and the roadmap is promising.
*   Lots of people use AWS for MongoDB.  More than I would have thought considering EBS is horrid.  Most everyone thought AWS and EBS was painful, but the pain was outweighed by the perceived benefits.
*   Everyone agrees schema design is key.  The money quote from the conference was:

> <div>
>   <span style="font-size: small;"><span style="line-height: 24px;">Schema free != Design free &#8211;<a href="http://twitter.com/nathenharvey" rel="user" target="_blank">@nathenharvey</a> <del>@nathanharvey </del></span></span>
> </div>

<div>
  <span style="font-size: small;"><span style="line-height: 24px;"><br /> </span></span></p> <ul>
    <li>
      <span style="font-size: medium; line-height: 24px;">Some people are using MongoDB for what I would call, non-optimal use cases.  I think one has to be careful to really think hard about when to use MongoDB and when not to.  It&#8217;s an exciting product, but not a cure-all.  I listened to more than one talk where folks will have a hard time continuing to use MongoDB.</span>
    </li>
    <li>
      <span style="font-size: medium; line-height: 24px;">There is still a lot to be learned about how to operate MongoDB in a production environment.  Hrm, seems like a good subject for future talks.</span>
    </li>
    <li>
      <span style="font-size: medium; line-height: 24px;">Someone needs to do a talk on locking internals so folks can really understand that locks in MongoDB are not the same locks as in most RDBMS&#8217;s.</span>
    </li>
    <li>
      <span style="font-size: medium; line-height: 24px;">The SJC airport is awesome.  I had to fly out Friday night to LA, and it was seamless.  Sorry I missed the after-party.</span>
    </li>
  </ul>

  <div>
    <span style="font-size: small;"><span style="line-height: 24px;">Here is the video from my session:</span></span>
  </div>

  <p>
    <br /> <a class="trk" style="padding: 2px 0px 4px; display: block; width: 320px; font-weight: normal; font-size: 10px; text-decoration: underline; text-align: center;" href="http://www.justin.tv/mongodb#r=-rid-&s=em">Watch live video from mongodb on Justin.tv</a>
  </p>
</div>

 [1]: http://p.twimg.com/AgQbOzLCEAENMzh.jpg:large
