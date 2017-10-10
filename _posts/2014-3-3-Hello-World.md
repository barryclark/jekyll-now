---
layout: post
title: You're up and running!
---

Next you can update your site name, avatar and other options using the _config.yml file in the root of your repository (shown below).

![_config.yml]({{ site.baseurl }}/images/config.png)
Care system for communication between staff and family
====

The demand for healthcare is rising with the prediction of there being 0.5million more pensioners than children by 2029, yet they are still relying on paper based systems to record information. The more people that enter the healthcare system results in more information that will need to be stored. Technology has been improving every sector yet it seems that care has been overlooked.

> The number of people aged 60 and over is projected to increase from 14.9m in 2014 to 21.9m by 2039. As part of this growth, the number of over-85s is estimated to more than double from 1.5 million in 2014 to 3.6 million by 2039.
> - [Key Statistics on the NHS](http://www.nhsconfed.org/resources/key-statistics-on-the-nhs)

Whilst working in care homes I came across an issue of having a folder for each client that needed to be updated constantly as you carried out tasks within the home. If you have 10 clients that day then you need to carry 10 folders to update them. The mass amount of paperwork was overwhelming and the writing could often be illegible. Another issue is that if a file was lost then the record on that client is lost. My idea to combat this issue was to create a web application for care homes that allows care assistants to enter the information into a digital system to save a vast amount of paperwork and keep all records in a secure place.

Families and friends can struggle to get the information that they want as they need to find a care assistant or a nurse to tell them what they need to know. This can often lead to frustration for the families, as well as the care assistants and nurses that are already trying to do a lot within strict timeframes. If the information was available in a web application then family and friends could logon and see the information about the client. Often even if the family or friends see the folders on the clients they might not make sense to them due to the wording or the writing being illegible. A digital system could mean that information can be recorded clearly and in a way that others can read and understand.

As it is a web application and not an app I was considering the ability to email or text notifications to the friends and family regarding an option that they have selected. An example of this would be that they only want notified if they need anything brought or if any incidents had happened such as falls. Others may want updates on what they have eaten. This means that the system can be customised to suit the family and friends needs.

I looked at the idea of creating the system as an app, although this would require different apps for iOS and Android. As the target audience of the system would vary then an app wouldn’t be the best option. As technology develops it would be good to have an app so that a notification would appear on the device such as a phone or watch, although this is not suitable for the current target audience. Currently the web application being accessible from any device would be better suited.

The system could be used for both care within a nursing home and care in the community. Care assistants could update records using a phone or tablet to carryout care in the community and in a home setting there could be tablets placed on the walls, or each care assistant could have a tablet or device that they use.

I believe that technology could improve working conditions for care assistants and nurses, create more time to be spend with clients and drastically improve communication with family and friends. Technology has become part of most job roles, yet care seems to still be running a paper-based system. There has been research into the [future of carehomes](https://www.carehome.co.uk/news/article.cfm/id/1572922/care-homes-of-the-future-could-see-technology-take-a-leading-role-in-the-delivery-of-care "future of care homes") and I feel that a system like this is a step in the direction of what is needed.

### What will the system record?

* What their activities for the day are
* What they ate/what time/did they finish it
* How did they sleep
* Any creams are applied
* Medication was given
* Changes in medication
* Pads are changed
* If he needs anything brought up, e.g. shower gel or new clothing
* Update my contact details
* Notification if they are unwell
* Seizures
* General mood
* Any incidents that have 


### What are the pros and cons?
#### Pros

* An electronic system means that there would be room as space would not be taken up by paper records and folders
* The records would be more legible as they are not handwritten
* Records could be accessed easier as you do not need to go through vast amounts of paperwork
* Records could have a visual aspect to allow people to see information easily through data visualisation
* I know a lot about care homes and the information I would like to have as a family member
* Care has been left behind in regards to technology, therefore I feel this system will be useful
* Throughout my placement I worked with a web application
* I have links with a lot of care assistants and nurses to get feedback and information on what they would fine useful
* Through my time working in care homes I have seen a system in place and know that it would need drastically improved

#### Cons

* Security could be an issue due to hackers and security breaches, the only way to steal paper based records is in person
* It is going to be hard to make
* There are similar systems available
* It is handling personal information about people
* What if family and friends are not good with technology
* Care assistants and nurses may not want to adapt to a new system

### How it will be built

The system will be a web application that will be responsive to work with any device. The idea behind this is that if it was to be put into care in the community then they could use mobile phones to submit the information on the clients, although if it was in a care home maybe it would be tablets or a desktop computer that they would enter the information into.

Ruby on Rails and HTML will be used to develop the web application as the use of Gems means that it will be easier to build.  SCSS will be used to handle the styles to allow changes to be made quickly and easily. jQuery and Javascript might be needed for various features, such as menus and any animation that CSS animation isn’t capable of doing.

I am planning on developing part of the system, although not building all the features that I would like as this is a large idea and I know it would be close to impossible to develop it all within the short time scale. I would like to learn more about Ruby on Rails and have completed the [Udemy course](https://www.udemy.com/ruby-on-rails-for-web-development/learn/v4/overview "Ruby for web development") and have started a [Treehouse course](https://teamtreehouse.com/tracks/rails-development "Ruby on rails track") on Ruby on Rails so I feel that I should hopefully be capable of making part of the web application.

### Target Audience

The target audience for this web application would be three different groups of people:

* *Nurses* within the care home. The age ranges for nurses would be *21-55*
* The age range for *care assistants* would be *18-55*
* The clients family, and potentially friends. The age range for the *family and friends* would be *45-60*

### What is the business model?

This web application would be offered as a premium service for the home. It could come as two separate parts, you could purchase the ability for only nurses and care assistants to record information onto the web application that can be used to get rid of the paper based system within a care environment. Then you could purchase the ability to allow family to access the information.

This could be a feature that the care home pays for and then family could pay a monthly subscription to access the web application, or the care home could offer this as part of their care package.

### Competitors?

* [Sekoia Care](http://www.sekoia-care.co.uk/ "Sekoia Care")
* [Caredocs](http://www.caredocs.co.uk/ "Caredocs")
* [Lnt Software](http://www.lntsoftware.com/ "Lnt Software")
* [Mede Care](http://www.mede-care.co.uk/ "Mede Care")
* [Care Control Systems](https://carecontrolsystems.co.uk/ "Care Control Systems")
* [Autumn Care](https://autumn.care/ "Autumn Care")
* [Storii Care](https://storiicare.com/ "Storii Care")
* [Every Life Technologies](https://www.everylifetechnologies.com/ "Every Life Technologies")

