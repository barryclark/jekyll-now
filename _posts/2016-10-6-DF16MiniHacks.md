---
layout: post
title: Dreamforce16 Hacking the Mini Hack Basin - Astro is everywhere
---
![DF16 Minihacks]({{ site.baseurl }}/images/df16/minihacks.png)

At Dreamforce16 Trailhead was shining with many cool sessions, demos, Developer Forest, Admin Meadow, IoT Cabin and too many things to list here. There were number of cool hands-on trainig areas such as Quickstarts - intro to Trailhead modules, Code Consultation, Mini Hack Basin and more. 

![IoT Cabin]({{ site.baseurl }}/images/df16/iotcabin.png)

The Mini Hack Basin is where we will stop for today. Trailhead posted 7 mini hacks as small challenges, when completed participants can winn some swag prises. Complete 3 or 6 out of 7 hacks get a full pack with big Astro gift packs, cool but need to code for that.

![Developer Forest]({{ site.baseurl }}/images/df16/devforest.png)

Well #1 & 2 are no-code, declaritive development tasks, #3 was SLDS with some code in APEX required to make a controller and JS. From #4, 5, 6 it is all code with Lightning, Force.com and Heroku. #7 was Adaptive Layout with Windows, need Windows and Visual Studio (did not try this one on a Mac).

I have decided to take DF16 challenge thinking this should not be difficult as I can do this code during confernece week taking down time between sessions and meeting friends.
The 1, 2 & 3 turned out to be doable on day 1 but #4 hit some snag (error in Lighhtnig components) so I decided to move to others while thinking on this Lightning SYSTEM error. Only mention on #3 there was some confusion seem like the task was to try Design System with Visualforce page and no actual APEX was needed to pass the challenge.

Day 2 - The #5 was Heroku App in Action, build an app on Heroku, any languauge is ok, example used Python but I chose to do it with Node.js, seem quicker. This challenge required [Heroku Connect](https://www.heroku.com/connect) setup and data synchronization with Heroku Postgres DB. This was right in my part of the 'developer forest' as I was familiar with this very topic but for first-time it can be a challenge, recomend [Salesforce & Heroku Integration module](https://trailhead.salesforce.com/module/salesforce_heroku_integration) as resource. 

Here is code part of this solution [Heroku App in Action Mini Hack #5 github](https://github.com/iandrosov/df16-heroku-test)

The #6 was custiom APEX REST API, the documentation [Apex REST Basic Code Sample](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_rest_code_sample_basic.htm) will be helpful for this hack. Here is my APEX REST code for reference

```
@RestResource(urlMapping='/scontact')
global class Contact_REST {

    @HttpPost
	global static String doUpdate(String id, String des) {
        
		// Update contact Description data
        String rc = '';
 
                if (id != null){
                    List<Contact> cntList = [SELECT Id, Name, Description FROM Contact WHERE Id =:id];
                    if (cntList != null && cntList.size() > 0){
                        Contact cnt = cntList[0];
                        cnt.Description = des;
                        update cntList;
                    }
                }

        return rc;
    }
}
```

The tricky part about this one is method to test the REST API. I selected my default tool [Postman app](https://www.getpostman.com/) for that wich is bit more difficult because it requires Authentication, OAuth token to connect to Salesforce. The simpler route may be to use [Salesforce workbench tool](https://workbench.developerforce.com/login.php) that can call your API and show result.
[github df16-mini-hack-rest-api](https://github.com/iandrosov/df16-mini-hack-rest-api)

OK 1,2,3,5 & 6 are done now return to #4 Lightning Contacts. Challenge is to make contact search easier using Lightning Components.

Requirements: Create a Lightning Application named SearchContacts. The application is made of Lightning Components. you can choose to have one or more components depending on your design. 

The application should have one search box where a user can enter an Account Name and  the list below should return related contacts of the searched Account.

My solution: As 'good' component architect I choose to make separate componentes. That made sense initially, and that was my mistake as it resulted in Ligtning system GACK error when trying to pass events from Searchbar component to Contact List componnent.

```
SYSTEM ERROR
```
Enter Debug mode, determained to find a solution I resorted to all my dev-debug skills. 

1. Added some [Log Messages](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/debug_log_messages.htm) to my components to track the error. 
2. [Enable Debug Mode](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/aura_debug_mode.htm) for Lightning Components This enabled me to get exact GACK error for investigation
```
ID: 1698294744-317890 (263119078) ERROR
```
3. Use Google Chrome JaveScript [debuging tools](https://developers.google.com/web/tools/chrome-devtools/), 

4. Installed [Lightning Inspector](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/inspector_intro.htm) Chorme Extension to further trace this error. 

I wanted to ensure that this was not caused by the code I created in components. Finally armed with all evidence I found a Salesforce engineer at Mini Hack Basin to show all the findings with some hope for solution. After some investigation he cam back with resounding 'sorry it is our system error in Lightning' ....

Now what, my last hack saga continued.

Day 3 - I was determained to fix this so I redesigned my components to use a single component, included a searchbar HTML and JavaScript code into same component with Contact list and pass events within the component instead. This finally worked my lightning app start showing listing of Contacts. My final component code

```
<aura:component controller="ContactListController" implements="force:appHostable,flexipage:availableForAllPageTypes" access="global" >
	<aura:attribute name="contacts" type="Contact[]"/>
    <aura:handler name="init" value="{!this}" action="{!c.doInit}" />
    <aura:handler event="c:SearchKeyChange" action="{!c.searchKeyChange}"/>

    <div>
        <input type="text" class="form-control"
              placeholder="Search" onkeyup="{!c.searchKeyChange}"/>
    </div>
    
    <ul>
        <aura:iteration items="{!v.contacts}" var="contact">
            <li>
                <a href="{! '#/sObject/' + contact.Id + '/view'}">
                    <p>{!contact.Name}</p>
                    <p>{!contact.Phone}</p>
                </a>
            </li>
        </aura:iteration>
    </ul>
</aura:component>
```
Notice how Search input is now inside list controler, it is a quick hack. Now all I need is make simple wrapper component to include this list into the Lightning Tab to display in S1 or Lightning.

Great #4 Mini Hack complete!

Complete source code can be found [github df16-mini-hack-lightning-contacts](https://github.com/iandrosov/df16-mini-hack-lightning-contacts)

Lesson lerned if at 1st you do not succeed try again with some different route. Such was my Mini Hacks saga @DF16.

For more resources on Dreamforce mini hacks Patrik Connelly has put together several years of tehse challenges in this handy [website](http://forcebuds.com/minihacks/)



