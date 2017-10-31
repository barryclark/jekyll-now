---
layout: post
categories: [angular, promise, javascript, queue, actions, chaining, $q, concurrency, async, ui]
title: The curious case of the concurrency conundrum
author: emir_osmanoski
headerimage: /images/2017-10-28-Concurrency/Client Updates Issue.png
comments: true
---

The project I’m working on at work ran into a very interesting problem with
how we handle user actions on the UI and how those actions are processed in
the back end.

The architecture of the system is capable of  processing multiple user actions
in parallel and out of order. This was mostly reflected on a main state object
that represents the current user's interaction within a business process.

The outcome of this is that the state was  not correctly updated. Certain user
actions were not reflected properly and were lost even though the users sent
them from the UI.

The issue was tackled on both the UI and server fronts. This post will focus
on the UI solution and the reasoning behind it. At  the same time it will take
a deeper look at the issue itself.

# Setting up the stage!

The front end of the solution is an Angular application which handles a
business process  represented as a JavaScript object that tracks the state and
changes.

The State is the current collection of data for an instance of a business
process on which the users operate by execution UI actions.

The actions are sent and processed in the server resulting in state updates
pushed back to the UI.

**What is important to note for the server side of is that the processing does
not happen straight away, but is handled by a service bus.**

When everything is finalized the UI then gets an asynchronous notification via
SignalR and in turn updates the local state to reflect the one from the
notification.

Moving unto updates themselves we separate them into two main categories:

1. Actions issued by the users who currently are involved in the business
process and operate on a detailed view of the state.

2. Actions issued by a set of power users who can change certain aspects of
the state including the ownership.

The main difference being the two being the view the users have on the state.
In the first case, the users are actively observing the state they are
changing, which might not need be the case with the second set of actions.

To better illustrates this part of the system we can take a look at the
following diagram:

![UpdateSources]({{ site.baseurl }}/images/2017-10-28-Concurrency/UpdateSources.png)

Even though the diagram does not contain any problems with it if we look
closely and knowing how things are processed we can determine a couple of
possible issue points:

1. User A can send two actions A1 and A2 at relatively the same:
   1. A1 sent.
   2. A2 sent.
   3. Both actions are executed in parallel
   4. Server processor sets StateA2 as first final state.
   5. Server processor sets StateA1 as final after A1 completes.
   6. Resulting in A2 being lost.

2. There is also the subtle issue where 2 users can perform actions with a
enough time difference that the final state is resolved correctly BUT it means
that a user has performed an action on a stale State that is not up to date.

We will see some more detailed explanations of the two above problems in the
following sections where we will try to identify is how and when a single user
receives notifications of changes for the state on the UI and the two general
types of notifications.

## Client Update Scenario

![ClientUpdates]({{ site.baseurl }}/images/2017-10-28-Concurrency/ClientUpdates.png)

We can see that the state updates can be categorized in two main types: 

1. State updates triggered by actions performed by the current client.
2. State updates triggered by actions from other clients.

We can also notice that the above image illustrates a perfect scenario where
each action is executed when it hits the server and each state update is
processed as it comes in the front end.

But this is usually not what happens! ClientA can perform many actions in
quick succession, and without any mechanism to control this the actions can be
executed in parallel on the server.

> NOTE: The parallel execution comes from the service bus implementation which can
pick up user actions in batches.

This can obviously lead to a lack of consistency on what is shown on the UI!

To better understand what might really go wrong we will look at a not so
perfect execution order in the next section.

## The Issue Scenario

![ClientUpdatesIssue]({{ site.baseurl }}/images/2017-10-28-Concurrency/Client Updates Issue.png)

Let’s take a look at some of the problems in the above diagram:

1. First of all the server can process some of the action in parallel without
consideration of the sequence the client sends the actions in. This results in
losing of one of the Actions. In the above example that is action A2 which:
  1. Ran not knowing that Action A1 was performed by the client before it.
  2. Finished before Action A1 and it was overwritten.

2. An issue then that can follow from that is that the client state loses the A2 action. 

3. Finally, let’s say the User refreshes the UI and they get a fresh state or
even starts work on a new State.
    1. Unknown to them another user has performed action B1 which updates the
       server side state to SRB1.
    2.  Before SRB1 is propagated to our user they send ActionA3 not
        knowing about the server changes


The big problem with item 3 above is that B1 might change the state in such a
way that it might affect the user's decision to run A3 or the data they will
associate with the action.

Thinking about this we arrive at the point of the post, being how concurrency
is expressed in this system.

# Concuwhat?!

Concurrency! And after reading the Wikipedia definition, it turns out the lack
of concurrency in all of the above examples

>In computer science, concurrency is the decomposability property of a
program, algorithm, or problem into order-independent or partially-ordered
components or units. This means that even if the concurrent units of the
program, algorithm, or problem are executed out-of-order or in partial order,
the final outcome will remain the same.

We can see that we can’t really say the system and mode of operation we
described is really concurrent. For us the order is of great importance as
each action might result in alterations to the other available actions or
available data.

Each action must be completed before the next one can happen.

We must also insure Users performing these actions have the full picture on
what they are doing. Which is to say, that every external update to the state
must be visible to a user before his own actions will be considered.

## Same origin actions and the order!

One part of the solution is making sure all Actions originating from a single
user contain an identifier for the previous action performed by that user.

This in combination with some very smart code on the server will make sure the
actions are processed as the user is sending them from the UI and nothing gets
executed out of order and the server state is consistent.

For example when sending Action A2 we send along an identifier saying that A1
was the previous action. The back-end will then know to hold on A2 until it
knows A1 is finished.

> We can use the notation A2(A1) to denote the identification approach and
make the following couple of sections easier to describe.

But we might already guess that this is not enough as we also know that
multiple users can make changes to the state.

## Multi origin actions

The second thing to do is handling actions from multiple origins or users.
Let's also  in mind is that actions from other users trigger the external
state update.

The thing here is that there is not much else to do from any of the clients to
help with point 3 in the issue scenario above. Let's think it through:

The client sends A2(A1). Some other client sends B1(A1) and B1 get’s executed
first.

The above looks troublesome but it’s fixable by having the server also keeps
track about what was executed last for the given state, no matter which
client/user executed it. We can now compare state metadata and arrive at the
following conclusion:

1. When B1(A1) arrives check server state for last executed action which at
the time of check is A1.

2. Execute B1 and store as the last executed action.

3. When A2(A1) comes there is a conflict between (A1) and B1 which would mean
the state has changed

4. At this point we notify the User sending A2(A1) that a new state is available. 

At this point we discard A2(A1). The user will have to re-perform that action.

> NOTE: It is important to notify the user that their action did not execute.
They should review the state and try and perform the action again.

We saw in the Client Update diagram that external state changes are
immediately propagated to the all clients. As a result the new external state
for the user sending A2(A1) will come some time after they’ve sent their
action. They will then be able to review and perform their action again.

> The server in both cases will have to keep track of what action execution
modified the state and which was the last action.

## Moving onwards!

Having looked at the two main concepts and issues around this type of
asynchronous UI we can use the rest of the post to discuss ways to help the
back-end achieve the orchestration needed to handle the different scenarios.

We will also take a look at how we can create a situation where we make sure
the users actioning on a flow have all the latest information and how that
actually fits and helps with the orchestration.

# Tickets! Tickets! Let me see your tickets! 

I wanted to come up with an interesting analogy for how things are handled on
the Client. The final concept is one where each action needs a ticket to be
executed by the server. In a way we will be implementing a ticketing system
with the restriction where the uniqueness of the tickets is dependent on all
the previous passengers.

To elaborate on the concept we say that the tickets used by our actions
contain a value that identifies the action that was previously executed on the
state. And the ticket is valid only if the action identified by the ticket
value has been processed on the server and is the last processed action.

We send the action and then the big doorman in the server in the cloud
validates the action ticket which results in three possible actions:

1. The action identified by the value in our ticket has been processed and is
the last processed action. Our ticket is valid and we are good to go!

2. The action identified by the value in our ticket has either not arrived yet
or has not been let in the venue, so our action will wait and get processed
after the previous action. Good to go but we will wait a little bit!

3. The action identified by the ticket value has been processed but also other
actions have been processed after it. We have to go back and get a new ticket
with a new value matching the latest processed action!

## Digging deeper!

We are now going to look at achieving the above ticketing system and some
ground rules and conditions derived from the nature of the system.

We will keep it simple and say that actions are executed by an action method
and contain some data. The action method is a function that will do some
chores and then sends the data to the server using a POST method returning a
promise.

For our purposes we presume that the promise will resolve to the server
generated identifier for the action we sent. It is this identifier that
is the ticket value for any next action.

> NOTE: Remember that the POST promise does not contain the new state after
the action is applied. That comes later with the SignalR notification after
the action is fully executed.

We can identify two challenges here:

1. We can’t assume the POST action resolves infinitely fast. And we can’t
block the UI for a POST to finish so we can get the ticket value for the next
action.

2. Where do we get the initial ticket value for the first action.

Before delving deeper and looking into the ways to overcome the challenges
let’s look at what constitutes the state object.

## State Object

They key aspect our state is that each time it undergoes change we store the
identifier of the action that changed it. This is also true for the initial
action that "creates" the state.

With this in mind we have a more clearer picture on the resolution for the
second issue in the previous section.

## Tracking Actions

Everything we discussed before leads us to think about implementing a queue of
sorts to handle the actions a particular user does on the UI. 

This is driven mainly by the POST limitation and not having access to the
identifier for an action at the moment we send it in code. At the end of the
day we need to track and reference all the promises somewhere until we at
least get the identifiers.

## Types of Tracked Actions

We already discussed that states can undergo mainly 2 different types of
updates while users are working on them. Updates triggered by the users
themselves and updates triggered by different users in the application.

It is important for us to know any change that has happened on a state so we
will expand the queue idea to also track external updates as a type of action
that has happened on the state.

> NOTE: We will not exactly know which user performed what action but we will
have the outcome and, because of what was mentioned about states, the last
action identifier which is the most important aspect for us.

Now we also treat the initial load of the state as an action, we will have our first
action identifier to use for whatever the next user triggered action may be.

Putting the above into practice we end up with something along the lines of:

![ClientUpdatesIssue]({{ site.baseurl }}/images/2017-10-28-Concurrency/ActionTrackingDiagram.png)

We can see that the first tracked action is a state change. This would be the
first thing we store/track and happens when we load the state details page on
the UI.

We can now start talking about specifics and achieving the above in code.

# Javascript Execution and Promises

First we will look into some characteristics of Javascript that help us with
managing some of our issues.

Javascript is an inherently single threaded language which makes our somewhat
biggest problem quite a simple one.

When a function starts it runs until it finishes. Any fancy things like
timeouts and promise resolutions can never happen during the execution of the
function that creates them. 

> NOTE: There is no way we can get anything else running or executing at the
same time. One example would be a timeout with a 0ms delay. Not even that will
get called until the current code block finishes. 

Based on this once we start recording an action or start processing a state
update we know that we can’t have another action being sent or an other update
processed.

We know that we will complete recording everything we want for the current
action before anything else can happen.

This raises the concern of us not wanting the users to have to wait for
something we recorded to finish and get it’s id to “queue” up the next action.

This is where JavaScript promises come into play. Specifically $q, the promise
service used in Angular. Using the deferred functionality in a single line of
code we can make sure any action we send will depend on the previous one if
such exists.

This will still allow the user to happily click around and in a way queue up
the actions.

Maybe the best way to illustrate the approach is to start looking at some code,
so let's go!

## Handling User Actions

> NOTE: The code is heavily commented and explains what is going on and how
everything fits with what was discussed in all the previous sections. 

```javascript

// Let's say that we call this somewhere from an angular event handler and we
// need to pass some action data to the back-end via an action
//
// action:  
//  Is expected to be an HTTP POST method that the calling client
//  provides as a callback which returns a promise that resolves to
//  the Action Identifier for the action we are sending. This action identifier
//  is the Ticket for the next action.


function handleAction(actionData, action) {
    //  1. We get the last node which is either the last action or the last
    //  state update
    var lastActionNode = getLastNode();

    //  2. We create a current node and set the action and data we are
    //  currently processing
    var currentNode = {
        action: action,
        data: actionData
    };

    // 3.   
    // The key aspects of handling the action. We create a deferred
    //  object and set the promise as the id()      on the current node.
    //
    //  This won't be resolved until we get the Action Identifier for what
    //  we are currently handling which as we will see bellow won't happen
    //  until the last action has been resolved thus creating a chain!
    var deferred = $q.deferr();
    currentNode.id = deferred.promise;

    // 4.   We store the current node before doing anything. 
    //
    //  NOTE: Because we are in this execution context nothing else can run
    //  while we are doing all of this. When we are done here the
    //  next thing to call getLastNode will get this latest node
    storeNode(currentNode);

    // 5. 
    // Up to this point we have still not handled the action. All we
    // have done is housekeeping to make sure anything else that comes
    // after this action will wait for it to finish.
    
    // 6.  
    //  We are now going to get our ticket by trying to resolve the last
    //  .id we've stored in the way as above
    return last.id.then(function (ourTicket) {

        // 7.  We have resolved the last.id and now we have our ticket. We
        // set it on our data and call action()
        actionData.ticket = ourTicket;

        action(actionData).then(function (currentActionIdentifier) {
            // 8. Action returns the actions identifier. We use this as the
            // ticket for the following Action. We do this by resolving
            // the promise we created above via the deferred.
            deferred.resolve(currentActionIdentifier);
        })
    })
}
```

What is presented above is heavily abstracted and almost pseudo-code. This is
also not the full code and stuff like the service definition and injections
are omitted out but can be easily inferred.

There are a couple of methods we use as given of which the most important are:

1. getLastNode()
2. storeNode()

These two methods abstract away the storage and retrieval of the nodes in our
action array. One important thing to note is that these should basically
implement a stack like structure. We put nodes on the stack and are always
able to get the last node.

> Note: My own implementation is a finite `stack` like structure implemented
with a finite number of items. When we reach the limit the node at the tail of
the stack gets discarded.

## Handling state updates by external sources

Let's now have a look at the method handling the state updates: 

```javascript
// This method gets called anytime a state update triggered by the back end happens
// It is one of the updates we get from the back-end
//
// Here there are two things we need to do. 
//      1. Make sure the new state is latest
//      2. Store the state as a node and create the id() promise
// 
// Remember that once we get into this method nothing else can happen 
// until it finishes to completion
//
// We presume that the state object has a property 
// called lastProcessedActionIdentifier.
//
// It is this property that is treated as the Ticket for any following action.
//
// An important thing to note is that we handleStateUpdate even when we load
// the state details screen for the first time. So anytime someone starts
// working/modifying the state we already have the latest ticket!
function handleStateUpdate(newState) {
    
    // 1.   
    // The first thing to make sure is that this state update is newer
    // that the curret state.  If the "newState" is older we return
    var oldState = getCurrentState();
    if(oldState.version > newState.version){
        return;
    }
    
    // 2.   If the new state is newer (higher version) we update the current state
    updateCurrentState(newState);

    // 3.   We create a state node to push to the tracking system
    var stateNode = {
        data:newState,
    }

    // 4.   
    // We follow the same approach as in the action handler by creating a
    // deferred promise. We need to remember that while we are running
    // inside this method nothing else can happen. So we are safe to set
    // this up!
    var deferred = $q.defer();
    stateNode.id = deferred.promise;

    // 5.   We store the node straight away
    storeNode(stateNode);

    // 6.  
    // ! Important  We need to figure out how we resolve the deferred
    // promise.  An obvious value would be the
    // [newState.lastProcessedActionIdentifier] But that might not be the true
    // value because the [newState.lastProcessedActionIdentifier] can be the
    // value of an older action. So we need to find if
    // [newState.lastProcessedActionIdentifier] has already been stored and
    // used a ticket value.
    // If that holds true we resolve to the last stored action id.

    // 7. We start by getting all the tracked actions. 
    var allTrackedActions = getAllTrackedActions();

    // 8. Remember that these tracked actions also contain data so we need to
    // extract only the `ticket` id promises we need to resolve
    var allTrackedPromises  = lodash.map(allTrackedActions, function(action){
        return action.id;
    });

    // 7. We remove the last stored/tracked action because it points 
    // to the "current" one we stored in point 5.
    allTrackedPromises.splice(allTrackedPromises.length - 1, 1);

    // 8. We check if we ended up with no promises at which 
    // point we can resolve to the [newState.lastProcessedActionIdentifier]
    // !! IMPORTANT !! This is the case that happens when 
    // we initially load the state
    if (justAllPromises.length === 0) {
        deferred.resolve(newState.lastProcessedActionIdentifier);
    }
    else{
        // 9. We now have to get the resolved values from the remaining
        // promises. We do this using $q.all. This will return us an array of
        // all the ticket identifiers.

        $q.all(allTrackedPromises, function (allTrackedTicketValues){
            // 10. We need to check if our current
            // [newState.lastProcessedActionIdentifier] value is stored in our
            // list. If the state update we are processing is an update
            // triggered by an older action - so we will resolve to our
            // internally latest tracked action

            if(lodash.includes(allTrackedTicketValues, 
                               newState.lastProcessedActionIdentifier)){
                deferred.resolve(lodash.last(allTrackedTicketValues));
            }
            else{
                //11. If we have not stored the
                //[newState.lastProcessedActionIdentifier] value we are
                //dealing with a state update originating from an external
                //update. We go ahead and resolve the node to this new ticket value
                deferred.resolve(newState.lastProcessedActionIdentifier);
            }
        });
    }
}
```

Once again this is an abstracted pseudo-code look at the code. We use the
abstract methods described in the previous section, but we also have a couple
of new methods that have no implementation:

1. getAllTrackedActions() 
2. getCurrentState()
3. updateCurrentState()

The getAllTrackedActions() is an extension to the action tracking methods from
before and is self explanatory.

The state actions are pretty simple and deal with retrieving and storing the state.
This can call another data service which just works with a JavaScript Object
for the state information.

> There actually is an interesting thing to discuss here in how things were
implemented in the system in regards to the state. To keep it short initially
the state was stored in a high level service which turned out to be a bad
implementation. Hopefully I will get to cover this in a following post.

## One final thing!

There is a tiny little implementation that also needs to be considered. That
is the way we notify the user when an action they have sent has an invalid
ticket.

The thing to keep in mind is that the only way the server let's us know that
something got processed or not is using the SignalR notifications.

In our case we will have a SignalR notification type for successful processed
action which contains the new state.  

We can also have a SignalR notification type letting us know our action has
failed to process because of the wrong value in our ticket.

These actions are processed quite differently.

1. The new state SignalR handler eventually calls **handleStateUpdate()** with
the new state.

2. The failed to process SignalR handler can call a notification UI service
that shows an appropriate message.

**We don't have to do anything special for failed actions because we receive
the successful state update either way, even if the state has been updated by
a different user.**

# Wrapping things up!

The above UI approach is enough to handle the situations and issues we looked
at at the beginning. But it's important to note that this is just one half of
the puzzle and that there is a lot of work to do on the server as well.

Even so hopefully the topic of this post is enough to maybe give some insight
to some of these interesting specifics of the JavaScript language.

One key thing to finally mention are all the issues that I came across while
working on this. There were several versions of the above code before reaching
the final version. I made some  mistakes with the initial versions but to
discuss them would be a topic of its own as the reasons touch upon the time
frames in which the solution was to be delivered.

Nonetheless that period provided a very interesting experience which I'm
planning to cover in a future post!

Until next time!





