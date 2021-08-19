---
layout: post
title: Your worker needs help! (Part 2)
date: 2021-8-2
description: How can we make our waiting times more fun
img: hand-up.jpg # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [Twilio, Javascript, Typescript, Twilio Flex]
---

### Introduction
Over in [part 1]({{ site.baseurl }}/twilio-worker-hand-pt1){:target="_blank"}, we built a new plugin for flex that gave the agents the ability to raise thier hand. This is all good for the agent but there is 1 small problem. When the agent raises thier hand, the supervisor sees all agents hands raised.

The problem boils down to our use of a redux store, all instances of our component (1 in the main header and x in the Teams tab) all share the same instance of state. How can we refactor this?

### Let's sync up
We could build our own backend API that has an endpoint that takes worker and isRaised status, stores that off in a database and another endpoint that serves us back that state on a request... However, flex has built in support for [Twilio Sync](https://www.twilio.com/sync){:target="_blank"}, this allows us to persist our state in the cloud, and connects via websockets to deliver state updates straight to the UI. 

Firstly we need to do a small refactor on our `worker-hand` component to bring the state away from the redux store and into the component itself. We can do that by creating the following interface
```
interface WorkerHandState {
  isRaised: boolean
}
```
and change our component decleration as follows
```
export default class workerHand extends React.Component<Props, WorkerHandState> {
    ...
}
```
in our component now, we need to add our state field and give it some initial values
```
readonly state : WorkerHandState = {
  isRaised: false
}
```

Twilio Sync, along with some metadata, stores a json document with the state that you pass to it, to create or retrieve a document you need to give it a name. For this we will use our worker sid with "-HandState" appended. To get the worker sid and our client that will interact with sync we can use a property in our component and populate that propery in our plugin's `init()`.

let's do that by adding this code in our component
```
import { Worker } from "twilio-taskrouter";
import { SyncClient } from "twilio-sync";

interface OwnProps {
  worker: Worker;
  syncClient: SyncClient;
}
```
and in our `init()` in `RaiseHandPlugin.ts` replace our code that adds our components with the code below which uses the workerclient and insightsclient from our Flex manager instance.
```
flex.MainHeader.Content.add(
  <WorkerHand key="worker-hand" 
              worker={manager.workerClient} 
              syncClient={manager.insightsClient} />, 
  { sortOrder: -1, align: 'end'});

flex.WorkersDataTable.Content.add(
  <ColumnDefinition key="agent-hand-custom" 
                    header={""} 
                    content={item => 
                      <WorkerHand key={`worker-${item.worker.sid}-hand`} 
                                  worker={item.worker} 
                                  syncClient={manager.insightsClient} />
                    }/>
  ,{sortOrder:0});
```
This enables us to add to our component a constant for a sync doc name that is unique to our worker.
```
readonly workerHandStateDocName = `${this.props.worker.sid}-HandState`;
```
We can now introduce some logic to work with sync and retreive/update the state for our workers hand, the full code can be found [here](https://github.com/jords1987/plugin-raise-hand/blob/main/src/components/worker-hand/worker-hand.tsx){:target="_blank"} but I will show you some key points below.
In our `componentDidMount()` we will grab the initial state of the document and more importantly will subscribe to updates of that document
```
async componentDidMount() {
  var syncDoc = await this.props.syncClient.document(
    this.workerHandStateDocName
  );
  var docState = syncDoc.value as WorkerHandState;

  await this.handleDocUpdate(docState);

  syncDoc.on("updated", async (event) => {
    var state = event.value as WorkerHandState;
    await this.handleDocUpdate(state);
  });
}

handleDocUpdate = async (state: WorkerHandState) => {
  await this.setState({
    ...this.state,
    isRaised: state.isRaised,
  });
};
```
It's worth noting at this point, if you try to retrieve a sync document that doesnt exist, it will b`e created for you. This is why we do not need to do any up front work to create the document for each worker. Brilliant, right!

With all of that in place we can switch our button handlers to simply get the current state and update it, our subscription to sync updates will take care of the rest, here is the one for raising a hand, you can implement the same for lowering.
```
handleRaiseHand = async () => {
  var syncDoc = await this.props.syncClient.document(
    this.workerHandStateDocName
  );
  var docState = syncDoc.value as WorkerHandState;
  docState.isRaised = true;
  
  syncDoc.update(docState);
};
```
An important part (and full disclosure had me scratching my head for a while), we need to switch our conditional logic in our render function to check `this.state.isRaised` rather than `this.props.isRaised`.
Then, with all of that in place we should now be able to safely delete the state and actions in `/components/worker-hand.container.ts` and `/states/worker-hand.ts`

Now one thing to do for cleanliness, change the way our component is registered to give each one a unique key. To do this head to our plugins `init()` and use this code to register the component in the "Teams" view
```
flex.WorkersDataTable.Content.add(
  <ColumnDefinition key="agent-hand-custom" 
                    header={""} 
                    content={item => 
                      <WorkerHand key={`worker-${item.worker.sid}-hand`} 
                                  worker={item.worker} 
                                  syncClient={manager.insightsClient}/>}/>
  , {sortOrder:0});
```

Now is also a good time to go ahead and remove the default component that comes when the flex CLI boilerplates a plugin for you.

When you run your plugin using:
```
twilio flex:plugins:start
```

You should be able to see in the Teams tab, when you raise your worker hand, only your hand is now raised

![]({{ site.baseurl }}/assets/img/agent-hand/teams_hand_raised.png)

A bonus feature here (yes, some would call a bug!) is that the supervisors are able to lower the hand of the agent. We need to modify the code in the component a little to stop the default event happening on the worker table when we click the button... Add this to your raise/lower event handlers to see
```
handleRaiseHand = async (e: MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation(); //this will stop the event bubbling through
  ...
}
handleLowerHand = async (e: MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation(); //this will stop the event bubbling through
  ...
}
``` 

### Conclusion
In this part we used Twilio Sync to persist the state of our workers hand, we used the [Flex Manager](https://www.twilio.com/docs/flex/developer/ui/manager){:target="_blank"} to access all of the things we need to communicate securely with Sync and gain some context of our worker.

Heres a challenge, can you implement functionality to lower a users hand when they logout? (hint: you can use twilios [Actions Framework](https://assets.flex.twilio.com/docs/releases/flex-ui/1.27.0/Actions.html){:target="_blank"})

Full code for both parts of this can be found [here](https://github.com/jords1987/plugin-raise-hand). Some of you may discover my initial attempt at re-creating the user card in the flex "Teams" tab. This worked, however twilio do not (at the time of writing) provide the functionality to remove the default worker card

Thanks for reading!