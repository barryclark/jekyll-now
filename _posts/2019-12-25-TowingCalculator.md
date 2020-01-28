---
layout: post
title: How to calculate your vehicle's towing capacity
icon: calc-200.png
---
As we decided to get a travel trailer,
we quickly discovered that a towing capacity
stated in the manual of my car is not actually even remotely the only value needed to safely tow a trailer.

![hitch]({{ site.baseurl }}/images/hitch.png )
The result has to do with the relationship between the payload capacity – or cargo capacity - of the vehicle,
also called TV (Towing Vehicle), and the tongue weight.
The tongue weight is usually 10% – 15% of the overall trailer weight when properly distributed.

First you have to start looking for the data required to do the calculation
either online or on your vehicle's manual. The words used to describe everything are
pretty descriptive, but it is a lot of lingo and it takes some time to make them part of your day to day
vocabulary.

For the vehicle, you need to find the following:
* [Curb Weight](https://en.wikipedia.org/wiki/Curb_weight): which is the weight of the vehicle without any passengers or cargo.
You can find that in your vehicle's manual, on a sticker on the driver's side, or on the manufacturer's website.
* [GVWR or Gross Vehicle Weight Rating](https://en.wikipedia.org/wiki/Gross_vehicle_weight_rating). This is also in the manual and usually on the driver's side sticker, and it is the max weight the vehicle can have. Make sure you never exceed this value for any reason because you can put your life and other's at risk.
* GCVWR or Gross Combined Vehicle Weight Rating. Sometimes found on the driver's side sticker, or the manual. It refers to how much weight can be carried by the vehicle including the trailer, hence the word *Combined*.
* Payload or Cargo capacity. This number should be the GVWR minus the curb weight. Giving you how much fuel, baggage and occupants can go safely into the vehicle. This value also is used to carry the tongue of the trailer.
* Towing capacity. Stated in the manual. This is usually not that useful because you can't tow more than the GCVWR minus the GVWR, but this gives you a sense of security that your vehicle was built with extra capacity in several parts that make it safe to reach the limit.

For the trailer, you need 3 values:
* UVW or Unloaded Vehicle Weight. Which is the weight from the factory without dealer options, but it usually includes full tanks of propane.
* GVWR. Same as the vehicle. This is the maximum weight the trailer can carry.
* Hitch Weight. It should be 10% - 15% of the overall weight of the trailer.

This is where things start getting more difficult. But for simplicity you should assume you
will be carrying your trailer fully loaded - that's at the GVWR for any required calculation
including the weight of the hitch. That will give you enough leeway.

As you can see, all those names are kind of confusing in the beginning, but as you start getting
familiar with them, it becomes easier to understand how much you can actually tow safely.
Again never exceed the GVWR and GCVWR set by the manufacturer. You can find some tricks on the
internet to increase the payload capacity of your truck, specially by upgrading the tires, but
that doesn't mean the overall GCVWR can go up, and that is because the manufacturer already
qualified all the components for such rating and it states that such value is safe for operation.
Think about it this way: if you are in an accident and you are found at fault, your insurance
may refuse to pay if you are found to have exceeded your vehicle capabilities in any way.

To make it easier to take into account all the values that I mentioned above,
I used the data and formulas from the guys at
[Keep Your Daydream](http://www.keepyourdaydream.com/payload/) and I wrote a simple online calculator.

Is it open source? Well of course [it is](https://github.com/FrSanchez/TowingCapacity), but even better, you can access it
from your phone or computer. I also added the [calculator](/calculator) to this website.

Hopefully it works for a lot of people and please leave a comment here if you use it.
