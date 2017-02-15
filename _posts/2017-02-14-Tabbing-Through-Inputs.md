---
layout: post
title: How to Tab Through Input Fields
---

On the web, it's common to tab through forms, an intuitive and [UX-friendly pattern](https://www.nngroup.com/articles/web-form-design/). You get this out of the box with web forms, but when building apps with React Native, you need to implement this functionality yourself. Fortunately, it's a cinch to set up.

## Native Form UX vs. Web Form UX

First, let's understand what native UX we're trying to emulate on React Native.

Here's a video of navigation through the native iOS contacts app:

<iframe width="853" height="480" src="https://www.youtube.com/embed/rHjJh0qk1dg" frameborder="0" allowfullscreen></iframe>

And here's a video of navigation through a Web form:

<iframe width="853" height="480" src="https://www.youtube.com/embed/JN_y8E4Erh8" frameborder="0" allowfullscreen></iframe>
*[Web Form](https://www.cs.tut.fi/~jkorpela/forms/tabbing.html)*

In summary, the iOS web browser gives us next and previous buttons, but for a native iOS app, these aren't present, and [React Native doesn't support them natively, either](https://github.com/facebook/react-native/issues/641#issuecomment-94522058).

I believe the reason for this discrepancy is that, natively, the "return" key performs double duty, tabbing through the form and submitting once the form is complete. On the web, the "return" key will submit the form by default, necessitating the next/previous buttons.

We'll focus on emulating the native functionality, relying on the "return" key to tab through the form and submit it when complete.

## Keyboards and `TextInput` on React Native

We'll be using `TextInput` and `View` from the `react-native` library, like so:

```
import {
  TextInput,
  View,
} from 'react-native';
```

Each `TextInput` [defines its own keyboard that appears when focused](https://facebook.github.io/react-native/docs/textinput.html#keyboardtype). This allows a particular input field to specify `numeric`, `numpad`, or a number of different options.

`TextInput`s are also responsible for determining which input to send focus to next, and [they provide a handy prop for implementing this](https://facebook.github.io/react-native/docs/textinput.html#onsubmitediting).


### Capturing the field reference
The first thing we'll need is to capture the `ref` of a particular input field. 

If you're not familiar, [a `ref` is a reference to the React component](https://facebook.github.io/react/docs/refs-and-the-dom.html). It's best practice to specify a callback function and capture the referenced component from the arguments.

In our example, we're storing each `TextInput`'s ref on an internal `inputs` object we'll define in the constructor. **We specify a custom index we'll use later to focus on the input.**



```
<TextInput
  ref={ input => {
    this.inputs['one'] = input;
  }}
  ...
/>

```

Since the ref is defined in the `render` function, don't store the reference with `setState`; [doing so will cause an infinite loop](https://github.com/facebook/react/issues/5591) and many tears will be shed.

### Triggering focus

Next, we need to focus on the next element. We do that by hooking into the `onSubmitEditing` prop and supplying it with a custom focus function on the component.

```
onSubmitEditing={() => {
  // specify the key of the ref, as done in the previous section.
  this.focusNextField('next-field');
}}
```

Then, we set up the field. If we zoom out to the component level:

```
class App extends React.Component {
  constructor(props) {
    super(props);
    this.focusNextField = this.focusNextField.bind(this);
    
    // to store our input refs
    this.inputs = {};
  }

  focusNextField(key) {
    this.inputs[key].focus();
  }
  
  ...
}
```

Two things to point out:

* [We need to bind the focus function](http://egorsmirnov.me/2015/08/16/react-and-es6-part3.html) to the class so we have an accurate reference to `this`. This is generally done in the constructor.
* The focus action accepts a key indicating which input to focus on. That key matches what we use in the `ref` callback above.

### Avoiding the disappearing keyboard

Sometimes as we're tabbing between fields, the keyboard will disappear and reappear. We can avoid this by using a prop on `TextInput` called `blurOnSubmit`:


```
<TextInput
	blurOnSubmit={ false }
	...
/>
```

This property forces the keyboard to remain visible. Since we're immediately tabbing to our next field, this behavior works nicely for us.

### Return key

Updating [the return key](https://facebook.github.io/react-native/docs/textinput.html#returnkeytype) to match the correct action isn't strictly necessary (and natively iOS doesn't change its appearance) but I think updating to the relevant return key type is a nice touch:


```
<TextInput
  returnKeyType={ "next" }
  ...
/>
<TextInput
  returnKeyType={ "done" }
  ...
/>        
```

This indicates how to show a `done` return key on the final input, and a `next` return key on the rest of em.

## Putting it all together

The final gist is here:

<script src="https://gist.github.com/thekevinscott/22b66e5fe9ae35d633a28e27c129bc8b.js"></script>

You can see it in action on iOS and Android:

<div class="flex">
<div>
<iframe width="50%" height="480" src="https://www.youtube.com/embed/rHjJh0qk1dg" frameborder="0" allowfullscreen></iframe>
*iOS*
</div>
<div>
<iframe width="50%" height="480" src="https://www.youtube.com/embed/KFazq6ZBFyw" frameborder="0" allowfullscreen></iframe>
*Android*
</div>
</div>

You can download it at this link, for which I'll need your email address.

