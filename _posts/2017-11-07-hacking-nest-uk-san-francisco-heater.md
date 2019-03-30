---
id: 326
title: Hacking Nest UK to work in San Francisco, USA
date: 2017-11-07T20:04:21+00:00
author: Scott Shapiro
excerpt: How I had to import and hack Nest UK to work with my ancient furnace heater in San Francisco
layout: post
guid: http://www.scottshapiro.com/?p=326
permalink: /hacking-nest-uk-san-francisco-heater/
dpsp_networks_shares:
  - 'a:2:{s:9:"pinterest";i:0;s:8:"facebook";i:67;}'
dpsp_networks_shares_total:
  - "67"
dpsp_networks_shares_last_updated:
  - "1553829604"
categories:
  - Smart Home
---
_I&#8217;m addicted to the smart home, but have struggled for years to find a solution for our heater in San Francisco, USA. Nest wouldn&#8217;t work. Here&#8217;s how I resolved it._

### My thermostat is old and analog. I wish I had a Nest

I live in an old house, built in the 1950&#8217;s. But I&#8217;m making it smart. The first step was Alexa, with TP-Link smart bulbs and Sonos. Then I [integrated my rooftop solar system with Messenger](http://www.scottshapiro.com/im-building-a-bot/).

Now that Winter Is Coming, it&#8217;s time to focus on heating: pre-heating the house before we get home from work, and again before we get out of bed in the morning.

### But the Nest won&#8217;t work with my furnace

I&#8217;ve had my eye on a Nest Thermostat for a long time. But the one type of heater that doesn&#8217;t work with Nest is the one we have: Millivolt. Unlike the other 99% of people with furnaces in the US, we lack a C-wire since we don&#8217;t have a 24 Volt system.

<img src="http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_9982-768x1024.jpg" alt="" width="768" height="1024" class="alignnone size-small wp-image-348" srcset="http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_9982-768x1024.jpg 768w, http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_9982-225x300.jpg 225w" sizes="(max-width: 768px) 100vw, 768px" /> 

That&#8217;s been the standard for decades and what Nest is built on. Millivolt is a century-old off-the-grid method of heating that runs off a 0.5mV closed circuit. This is awesome if the power goes out but not otherwise.

<img src="http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0143-768x1024.jpg" alt="" width="768" height="1024" class="alignnone size-small wp-image-347" srcset="http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0143-768x1024.jpg 768w, http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0143-225x300.jpg 225w, http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0143.jpg 1536w" sizes="(max-width: 768px) 100vw, 768px" /> 

### But Nest UK can be hacked to work in San Francisco!

Not satisfied with this situation, I did a ton of research and found [this post by a fellow San Franciscan](https://medium.com/@chrisvale/controlling-an-ancient-millivolt-heater-with-a-nest-b9493bbc59da). He hacked together a transformer and relay to control his similarly ancient furnace with a Nest. As I was about to purchase the same electronics from Amazon, I [noticed a comment that mentions the UK version](https://medium.com/@willem.velden/great-work-you-did-on-the-nest-thermostat-49155d26829f) is different and works with Millivolt systems. Whoa. The hypothesis is that heaters (boilers) in the UK / EU mostly run via a simple on-off switch. This is similar to Millivolt. Just closing the circuit makes the heat go. Opening the circuit cuts the heat.

### I&#8217;ll try Nest UK

I looked at several products from the UK that all claim to work with “dry contact” / Millivolt systems:** **Tado, Nest, and Netatmo**. **Tado had great reviews but I went with the Nest because it was a little less complicated. Tado requires an Extension kit. Netatmo looks great with its Starck design, but had poor reviews.

But I still had all these questions about the Nest 3rd gen from [Amazon.co.uk](http://amazon.co.uk/)&#8230;

  * Would it work with my 110V power outlets? Or would I need a 230V transformer?
  * Would there be some regionalization like DVD&#8217;s that prevented international usage?
  * Nothing surface about working with Millivolt systems in any documentation&#8230; should I trust this random commenter?
  * Could I return this to Amazon UK if it didn&#8217;t work?

It arrived a week later and I unboxed.

First step was to pair the Heat Link (controller for the heater) with the Thermostat. The big benefit of this setup is that the Heat Link attaches to the furnace which is often in the basement or garage. Heat Link takes orders wirelessly from the thermostat (there&#8217;s also a way to wire them if the wireless signal is weak). The thermostat isn&#8217;t wired into the Heating system. It just needs USB power and can sit wherever &#8211; bedside, on the living room wall! It doesn&#8217;t need to go in the same spot as your old thermostat like Nest US does! Who knew a Thermostat didn&#8217;t have to be wall-mounted?

### Why Didn&#8217;t USB power work On Heat Link?

<img src="http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0082-1-1024x768.jpg" alt="" width="1024" height="768" class="alignnone size-large wp-image-350" srcset="http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0082-1-1024x768.jpg 1024w, http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0082-1-300x225.jpg 300w, http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0082-1-768x576.jpg 768w" sizes="(max-width: 1024px) 100vw, 1024px" /> 

I USB powered the Heat Link (yes, there&#8217;s a microUSB port!). And it didn&#8217;t do anything. The instructions say to connect it to the live main power at 230V, which is supplied by all modern UK furnaces. I don&#8217;t have 230V but I definitely have USB. The Nest documentation, website, and support had no info on the Heat Link&#8217;s USB port. Trying chat support, I kept getting directed to US support who didn&#8217;t know anything about the Heat Link since it shouldn&#8217;t exist in the US. [I even posted on Reddit](https://www.reddit.com/r/Nest/comments/78ro2s/uk_nest_heat_link_not_pairing_help/)[](https://www.reddit.com/r/Nest/comments/78ro2s/uk_nest_heat_link_not_pairing_help/).

### Switching to AC power

My last hope before returning was to try AC power to the Nest instead of the clean and safe USB option (isn&#8217;t everything USB powered now??). The nest manual suggests a 100-230V range in some places but 230V in other places. I figured I could try 110V and there&#8217;d be a 50/50 shot at frying the Heat Link. I stripped some 18 gauge wire, jammed it into an old surge protector, connected it to the L and N leads on the Nest. It booted up and paired with the Thermostat within a minute. Boom. I&#8217;m in business.

<img src="http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0088-768x1024.jpg" alt="" width="768" height="1024" class="alignnone size-large wp-image-335" srcset="http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0088-768x1024.jpg 768w, http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0088-225x300.jpg 225w, http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0088.jpg 1536w" sizes="(max-width: 768px) 100vw, 768px" /> 

Next step was to see if the Heat Link could actually control the furnace. I have no experience with HVAC or thermostats and only some electrical engineering from college 15 years ago. So I connected a pair of wires to the Nest where the manual suggest it worked with “dry contact” systems. I couldn&#8217;t confirm from the internet that Dry Contact is equivalent to Millivolt, but both definitions seemed similar &#8211; no exogenous power source.

### Rigging it up and testing

Before going down to the furnace and crawling around to wire up the Heat Link, I rigged it up to the Thermostat since those wires go straight to the thermostat. The Heat Link was still powered by the rigged up surge protector and was ready to roll. I hit the manual override button and the heater kicked in immediately. Success!! I verified that the thermostat was connected and recognized the manual override. Yup, it did. We&#8217;re in business!

<img src="http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0090-e1510112863865-566x1024.jpg" alt="" width="566" height="1024" class="alignnone size-large wp-image-337" srcset="http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0090-e1510112863865-566x1024.jpg 566w, http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0090-e1510112863865-166x300.jpg 166w, http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0090-e1510112863865-768x1391.jpg 768w, http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0090-e1510112863865.jpg 1131w" sizes="(max-width: 566px) 100vw, 566px" /> 

I then headed down to the furnace and wired up the Heat Link to the leads on the crusty old gas valve. The thermostat is sitting pretty in our living room, connected to the cloud via wifi and the Heat Link by its own protocol. I&#8217;m hoping that we&#8217;re not only more comfortable this winter but also more energy efficient.

<img src="http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0141-768x1024.jpg" alt="" width="768" height="1024" class="alignnone size-large wp-image-345" srcset="http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0141-768x1024.jpg 768w, http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0141-225x300.jpg 225w, http://www.scottshapiro.com/newblog/wp-content/uploads/2017/11/IMG_0141.jpg 1536w" sizes="(max-width: 768px) 100vw, 768px" /> 

I&#8217;m excited to see how this works and excited to be a Nest customer. I haven&#8217;t had to import a foreign item before as globalization has made technology so similar everywhere. But 100-year old heating technology wasn&#8217;t nearly globalized. So importing did the trick. Now it&#8217;s rigged up with Alexa, IFTTT, and Google Home!

### In case you want to try this too

What you need to control a dry contact / Millivolt furnace with Nest:

  * A Millivolt furnace
  * Nest UK 3rd gen
  * A “lamp cord” to power the Heat Link (you need a power source near the Heat Link). And old AC cord will work (two wires, not three; no ground needed).
  * 18+ gauge wire to connect the Heat Link to the gas control valve on the furnace
  * USB power for the Heat Link
  * Wire strippers

**Instructions**

  1. Connect the lamp cord to L and N on the Heat Link
  2. Connect 2 and 3 to the two contacts on the furnace gas valve
  3. Plug Heat Link in
  4. Test that manual operation (hitting the big round button) turns the furnace on and off
  5. Attach Nest backplate to Nest
  6. Power Nest via USB
  7. Go through setup and confirm sync with Heat Link
  8. Try controlling your furnace wirelessly via Nest!