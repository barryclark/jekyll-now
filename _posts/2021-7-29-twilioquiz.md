---
layout: post
title: Hold on... you can do that?
---

We were recently discussing within the team how to reduce customer frustration during long wait times in our [Twilio Flex](https://www.twilio.com/flex) powered contact centre. A few Ideas came to mind. 

Hold Music? Yeah that's cool, but not everybody has the same tastes, maybe we could allow the customer to choose their preferred genre of music?.

Play an article or podcast episode to a customer? Again, a great idea but what if the customer absolutely hates what we have to offer? Also, I'm not sure an episode of your favourite podcast would sound the same when using [Twilio's best practices for audio recording](https://support.twilio.com/hc/en-us/articles/223180588-Best-Practices-for-Audio-Recordings)

We decided in the end on plain and simple hold music, of the most non offensive generic  kind so to please and upset our captive audience in equal measures...

However, during the discussion I tabled the idea of giving the user the choice to play a simple quiz while holding on to service their boring insurance policy? Is that even possible with Twilio? Lets find out...

---

![_config.yml]({{ site.baseurl }}/images/twilio-quiz/studio_meme.png)

First things first, we need give our customer the option to either wait on hold or play our quiz game, this is pretty simple to achieve with [Twilio Studio](https://www.twilio.com/studio). 

Lets add our "Gather Input on Call" widget to let the customer know they will be facing a wait and give them the option:

![_config.yml]({{ site.baseurl }}/images/twilio-quiz/gather_widget.png)

now we can connect our 2 split widgets to split based on if the user pressed a key or said that they did want to play, using
```
widgets.play_game_question.Digits
```
for key press, or for speech its
```
widgets.play_game_question.SpeechResult
```

![_config.yml]({{ site.baseurl }}/images/twilio-quiz/split_widget.png)

After this, you can send the call to an agent in flex with the quiz enabled, or disabled depending on the users choice:

![_config.yml]({{ site.baseurl }}/images/twilio-quiz/send_to_flex_widget.png)

---

![_config.yml]({{ site.baseurl }}/images/twilio-quiz/questions_meme.png)

Now for the fun part... getting the questions together and in a format that the caller can interact with... my tools of choice for this? [Twilio Serverless Functions](https://www.twilio.com/docs/runtime/functions),  [TwiML](https://www.twilio.com/docs/voice/twiml) and an awesome API I found [Open Trivia DB](https://opentdb.com/).

We can get to work creating a serverless function that would fetch questions from the API and generate the the TwiML to read it to the person on the phone and gather the answer. Here's the code I used:
```
// This is your new function. To start, set the name and path on the left.
const fetch = require("node-fetch");
const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.handler = async function(context, event, callback) {
  //add function that will shuffle later
  const shuffleArray = function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }
  try{
    //fetch a list of 10 questions from the api
    var questionApiResponse = await fetch("https://opentdb.com/api.php?amount=10");
    var questions = (await questionApiResponse.json()).results;
    
    //Create a TwiML voice response ready to return 
    const response = new VoiceResponse();    
      
    for(var i=0;i<questions.length;i++){
      var answers = [];  
            
      //Add the correct answer, and all of the incorrect anserts
      answers.push({correct:true, answer: decodeURI(questions[i].correct_answer)});      
      for(var j=0;j<questions[i].incorrect_answers.length;j++){
        answers.push({correct:false, answer: decodeURI(questions[i].incorrect_answers[j])});
      }
      //Shuffle the answers and assign them option numbers
      shuffleArray(answers)
      var correctOption = 0;
      answers.map((val,idx) => {
        val.option = idx + 1;
        if(val.correct) correctOption = idx +1;
      })      
      
      //Make the twiml that will read out the question and calls the process answer function
      const gather = response.gather({
          action: `https://${context.DOMAIN_NAME}/processAnswer?answer=` + correctOption,
          method: 'GET',
          input: 'dtmf',
          timeout: 5,
          finishOnKey: '*',
          numDigits: 1
      });
      
      //Build up the options for the customer to press the correct answer
      var answerString = " is it, ";
      answers.forEach(element => {
        answerString += " ";
        answerString += element.option;
        answerString += ". ";
        answerString += decodeURI(element.answer);
        answerString += ".. ";
      });      
      //a little hack here to remove the special chars from the question
      //so that when polly reads them, they sound OK
      gather.say(decodeURI(questions[i].question).replace(/&quot;/g, '-').replace(/&#039;/g, '-'));
      
      //Say the options for answers
      gather.say(answerString);
      
      response.say('Next Question');
    }
    //Now we loop around the function to get the next 10 questions
    response.redirect('`https://${context.DOMAIN_NAME}/questions`');

    // This callback is what is returned in response to this function being invoked.
    // It's really important! E.g. you might respond with TWiML here for a voice or SMS response.
    // Or you might return JSON data to a studio flow. Don't forget it!
    return callback(null, response);
  }
  catch(exception){
    console.log(`Error executing function ${exception}`);
    callback(null, "Error");
  }
};
```
Now we can create the function that is referenced by the "Gather" TwiML we made above, here's the code I used for that:

```
exports.handler = function(context, event, callback) {
  // Here's an example of setting up some TWiML to respond to with this function
	let twiml = new Twilio.twiml.VoiceResponse();
  console.log("processing answer")
  if(event.Digits === event.answer){
  console.log("correct")
    twiml.say("Thats correct, well done clever clogs!...");
  }
  else{
  console.log("incorrect")
    twiml.say("oh no you was wrong, the correct answer was" + event.answer + "...");
  }

  // This callback is what is returned in response to this function being invoked.
  // It's really important! E.g. you might respond with TWiML here for a voice or SMS response.
  // Or you might return JSON data to a studio flow. Don't forget it!
  return callback(null, twiml);
};
```

The finial part of the puzzle is to take the url for our questions function and add it as a "HOLD MUSIC TWIML URL" to our widget that sends the call to flex from our studio flow, this will mean that the quiz continues to play until the call is answered by an agent

![_config.yml]({{ site.baseurl }}/images/twilio-quiz/hold_music.png)

And there we have it, a fully functioning quiz game that can be used instead of listening to that generic hold music that we all hate. Great, right?

Full code can be found [here](https://github.com/jords1987/twilio-quiz), hope you enjoyed reading!