---
layout: post
title: Your worker needs help! (Part 1)
date: 2021-8-1
description: How can we make our waiting times more fun
img: hand-up.jpg # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [Twilio, Javascript, Typescript, Twilio Flex]
---
### Introduciton
The idea for a new feature we could use in flex is to give the agent a button to press that will 'raise their hand', a supervisor can then see that an agents hand is raised and can help that agent in whatever way they need. 

We can achieve this using a custom flex plugin and some of the other twilio products that come out of the box in flex. Read on to get building.

### Getting started
If you dont have a flex enabled project you can get one for free [here](http://www.twilio.com/referral/f0TwNm){:target="_blank"}. You can also install the twilio CLI [here](https://www.twilio.com/docs/twilio-cli/quickstart){:target="_blank"}. For now, I will assume you do, so lets create our template plugin using the twilio CLI. 

```
twilio flex:plugins:create raise-hand --install --typescript
```

I like to leave the default CustomTaskList component that the template comes with in the folder structure until we have completed development of our component. This often comes in handy to refer back to.

So with that lets create our first custom component which will add this functionality

we can create the following files/folders:
components
```
|src
    |- components
        |- worker-hand
            |- worker-hand.tsx
            |- worker-hand.styles.ts
            |- worker-hand.container.ts
    |- states
        |- worker-hand.ts
```

we can now put all of the boilerplate code into these files. I wont include all of that here, but you can see what I did from [this commit](https://github.com/jords1987/plugin-raise-hand/commit/5425e3fd79976b316f2c80be09d4df7ba5fb9430){:target="_blank"}.

### Getting in a state

With that, we can now add our first pieces of functional code to the component. This is going to be the state of the workers hand, will eventually need this state at the component level, but for now we can add it into the redux store for our component.

we will add the state for the agents hand, in our `WorkerHandState` inside `worker-hand.ts` we can add a property like this
```
export interface WorkerHandState {
  isRaised: boolean,
}
```
at this point we will also need to the initial state to the `initial state` constant
```
const initialState: WorkerHandState = {
  isRaised: false,
};
```

now lets add a name for our lower hand action anywhere near the top of the file
```
const ACTION_LOWER_HAND = 'LOWER_HAND';
```

now we can define our action for that in our `Actions` class
```
export class Actions {
  public static lowerHand = (): Action => ({ type: ACTION_LOWER_HAND });
}
```
then we can add the code to change the state in our `reduce` function
```
export function reduce(state: WorkerHandState = initialState, action: Action) {
  switch (action.type) {
    case ACTION_LOWER_HAND: {
      return {
        ...state,
        isRaised: false,
      };
    }
    default:
      return state;
  }
}
```
follow the same pattern for a new action `raiseHand` but importantly, in the final part dont forget to set `isRaised = true` instead of the same as `lowerHand()`

### Bringing state into our component
With our redux state management code out of the way, we can now bring the state through to our component, we can do this by adding to our `worker-hand.container.ts` file

First import our redux state into our container
```
import { Actions } from '../../states/worker-hand';
```
then we can add our `isRaised` property to our component properties
```
export interface StateToProps {
    isRaised: boolean,
}
```
and map it to our redux state property
```
const mapStateToProps = (state: AppState): StateToProps => ({   
  isRaised: state[namespace].workerHand.isRaised,
});
```
now for the actions, add them to our component properties
```
export interface DispatchToProps {
    raiseHand: () => void,
    lowerHand: () => void,
}
```
and map them too
```
const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  raiseHand: bindActionCreators(Actions.rasieHand, dispatch),
  lowerHand: bindActionCreators(Actions.lowerHand, dispatch),
});
```

lets add this to our UI so that we can actually get this code up and running and see something working... for now make your components `render()` method look like this:
```
render() {
  return (
    <WorkerHandStyles>
      worker hand is raised: {this.props.isRaised.toString()}
      <button onClick={this.props.raiseHand}>Raise</button>
      <button onClick={this.props.lowerHand}>Lower</button>
    </WorkerHandStyles>
  );
}
```
and then in the `init()` of your components  entry point, if you followed this example, ours will be called `RaiseHandPlugin.ts`. We can first remove the component that gets added by default, delete the lines
```
const options: Flex.ContentFragmentProps = { sortOrder: -1 };
    flex.AgentDesktopView
      .Panel1
      .Content
      .add(<CustomTaskListContainer key="RaiseHandPlugin-component" />, options);
```
and now in its place, lets add our new component, we will add it to the main header for now
```
flex.MainHeader.Content.add(<WorkerHand key="worker-hand"/>, {
      sortOrder: -1,
      align: 'end'
    });
```
at the top of the file we will also need to
```
import WorkerHand from './components/worker-hand/worker-hand.container'
```
We will also add this for each worker as a column to our 'Teams' tab, you can do this by using twilio's [Teams View Programability](https://www.twilio.com/docs/flex/end-user-guide/insights/monitor-agent-activity#teams-view-programmability){:target="_blank"}. For now add this in the same place you added your worker view component to the main header.
```
flex.WorkersDataTable.Content.add(<ColumnDefinition key="agent-hand-custom" header={""} content={item => <WorkerHand key={`worker-hand`} />}/>, {sortOrder:0});
```

Now lets run our component and see it in action
```
twilio flex:plugins:start
```

Now as you can see, when we first load flex our initial state is false

![]({{ site.baseurl }}/assets/img/agent-hand/initial-state.png)

and when we press the button to raise our hand we see the state change to true

![]({{ site.baseurl }}/assets/img/agent-hand/raised.png)

Lets add some style to our component by changing our `worker-hand.styles.ts` to 
```
import { default as styled } from "react-emotion";
import { IconButton } from "@material-ui/core";

export const WorkerHandStyles = styled("div")({});

export const StyledIconButton = styled(IconButton)({
  backgroundColor: "transparent !important",
});
```

and our `worker-hand.tsx` to 
```
import React from "react";
import PanTool from "@material-ui/icons/PanTool";
import PanToolOutlined from "@material-ui/icons/PanToolOutlined";
import { StateToProps, DispatchToProps } from "./worker-hand.container";
import { WorkerHandStyles, StyledIconButton } from "./worker.hand.styles";

interface OwnProps {}

// Props should be a combination of StateToProps, DispatchToProps, and OwnProps
type Props = StateToProps & DispatchToProps & OwnProps;

export default class workerHand extends React.Component<Props> {
  render() {
    return (
      <WorkerHandStyles>
        {this.props.isRaised ? (
          <StyledIconButton
            onClick={this.props.lowerHand}
            aria-label="raisedHand"
          >
            <PanTool />
          </StyledIconButton>
        ) : (
          <StyledIconButton
            onClick={this.props.raiseHand}
            aria-label="loweredHand"
          >
            <PanToolOutlined />
          </StyledIconButton>
        )}
      </WorkerHandStyles>
    );
  }
}
```

you should now have this on the main header


![]({{ site.baseurl }}/assets/img/agent-hand/styled-lowered.png)

and

![]({{ site.baseurl }}/assets/img/agent-hand/styled-raised.png)

Awesome!

Now head over to the "Teams" tab in flex, can you spot the problem we have by using the redux state store? Dont worry we will fix it in the second part of this post

### Conclusion
We have created our code that will store the state of our workers hand (raised/lowered). We have also written the worker view component that we need to show to the worker to allow them to interact. But at the moment, it's pretty useless... 

The worker can raise their hand, but when 1 worker raises their hand, the supervisor sees all. Check out [part 2]({{ site.baseurl }}/twilio-worker-hand-pt2){:target="_blank"} where we will fix our state storage issues, for this we will also need to get to grips with [Twilio Sync](https://www.twilio.com/sync){:target="_blank"}.