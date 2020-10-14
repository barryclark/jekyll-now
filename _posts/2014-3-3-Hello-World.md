<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* {
  box-sizing: border-box;
}

/* Add a gray background color with some padding */
body {
  font-family: Arial;
  padding: 20px;
  background: #383838;
}

/* Header/Blog Title */
.header {
  padding: 10px;
  font-size: 40px;
  text-align: center;
  background: #A9A9A9;
}

/* Create two unequal columns that floats next to each other */
/* Left column */
.leftcolumn {   
  float: left;
  width: 75%;
}

/* Right column */
.rightcolumn {
  float: left;
  width: 25%;
  padding-left: 20px;
}

/* Fake image */
.fakeimg {
  background-color: #aaa;
  width: 100%;
  padding: 20px;
}

/* Add a card effect for articles */
.card {
   background-color: white;
   padding: 20px;
   margin-top: 20px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Footer */
.footer {
  padding: 0px;
  text-align: center;
  background: #ddd;
  margin-top: 20px;
}

/* Image max size */
.maxsizing {
  max-width: 100%;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 800px) {
  .leftcolumn, .rightcolumn {   
    width: 100%;
    padding: 0;
  }
}
</style>
</head>
<body>

<div class="footer">
  <img src="/images/Header.png" class="maxsizing">
</div>

<div class="row">
  <div class="leftcolumn">
    <div class="card">
      <h2>There is something about Zaid</h2>
      <h5>A curious Proboscis, Dec 7, 2017</h5>
      <img src="/_posts/Images/zaid1.jpg" class="maxsizing">
	 <br>
      <p>The proboscis monkey or long-nosed monkey, known as the bekantan in Indonesia, is a reddish-brown arboreal Old World monkey with an unusually large nose. It is endemic to the southeast Asian island of Borneo and it is here that a group of researchers have recently taken keen interest in a male proboscis named Zaid.</p>
    </div>
     <div class="card">
    
      <img src="/_posts/Images/zaid2.jpg" class="maxsizing">
      <br>
      <p><b>Male Proboscis Monkey 'Zaidâ€' in Bako National Park, Borneo, Malaysia.</b></p>
      <p>Dr. Sofia Primrose, an anthropologist at Cambridge University leads a team of researchers into the jungles of Malaysia each year to study the mating rituals of these fascinating creatures. Dr. Primrose first encountered Zaid in 2016. He was sitting alone in the dirt with a look of perplexed curiosity. The other monkeys in the harem were mating and playing, but not Zaid. He liked to watch.</p>
    </div> <div class="card">
    
      <img src="/_posts/Images/zaid3.jpg" class="maxsizing">
      <br>
      <p><b>Zaid sits in the dirt waiting for females to come to him.</b></p>
      <p>In previous years Dr. Primrose has successfully patted Zaid's head and so she approached him with her hand extended. However, this time something was different. Zaid watched her calmly as she moved closer. He didn't move, he just watched. His eyes focused intently on her hand. "There's a good boy, Zaid" she said. Zaid's left eye twitched slightly. She was inches away from him now. "Not this time, bitch" Zaid muttered under his breath.</p>
    </div> <div class="card">
      
      <img src="/_posts/Images/zaid4.jpg" class="maxsizing">
      <br>
      <p><b>Zaid screeches and bares his teeth prior to attacking Dr. Primrose.</b></p>
      <p>According to the horrified research team, Zaid erupted into a violent frenzy and latched onto Dr. Primrose's arm, screeching and ripping away her flesh with his teeth. The attack lasted mere minutes but the damage was so severe that Dr. Primrose had to be air lifted to Rajah Charles Brooke Memorial Hospital. Her arm could not be saved.</p>
    </div> <div class="card">
      
      <img src="/_posts/Images/arm.jpg" class="maxsizing">
      <br>
      <p><b>Zaid's vicious attack left Dr. Primrose without an arm.</b></p>
      <p>Dr. Primrose underwent several hours of surgery to stop the bleeding and has since recovered from the traumatic experience. She is adamant that Zaid was speaking muffled English to her during the senseless attack but these claims have been dismissed as confusion and shock from her injuries.</p>
    </div>
    <div class="card">
      
      <img src="/_posts/Images/zaid5.jpg" class="maxsizing">
      <br>
      <p>Zaid has since become somewhat of a legend. Each year groups of curious travellers visit Borneo hoping to capture footage of him speaking or mating. To this day, no such footage exists.</p>
      
    </div>
  </div>
  <div class="rightcolumn">
    <div class="card">
      <h2>About Me</h2>
      <img src="/_posts/Images/explorer.jpg" class="maxsizing">
      <br>
      <p>Professor Asrama Berkumpule is a world renowned anthropologist who has devoted his life to the exploration of Earth's most mystifying lands and rarest species.</p>
    </div>
    <div class="card">
      <h3>Favourite Tree</h3>
      <img src="/_posts/Images/willow.jpg" class="maxsizing">
      <br>
      </div>
    <div class="card">
      <h3>Follow Me</h3>
      <p>I go to cool places.</p>
    </div>
  </div>
</div>

<div class="footer">
  <h2>Our Planet</h2>
</div>

</body>
</html>
