---
layout: post
title: Sutra on the Quest Contradictory to Both Facts and Theory
tags: [Datayana Sutras, Modernism, Original Buddhism]

# below, concepts for the generation of the sutta
matikas:
  speculativeviews:
    - interrogative: "What is Original Buddhism?"
      affirmative: "this is Original Buddhism"
      negative: "this is not Original Buddhism"
    - interrogative: "Is this Sutta authentic?"
      affirmative: "this Sutta is authentic"
      negative: "this Sutta is not authentic"
    - interrogative: "Is this meditation technique authentically Buddhist?"
      affirmative: "this meditation technique is authentically Buddhist"
      negative: "this meditation technique is not authentically Buddhist"

  # essentially similar to MN.1 ...
  subjects:
    - name: "the untaught ordinary person"
      qualities:
        - "who has no regard for noble ones and is unskilled and undisciplined in their Dhamma"
        - "who has no regard for true men and is unskilled and undisciplined in their Dhamma"
      perception:
        present:
          singular: "perceives"
          plural: "perceive"
        past: "perceived"
      conception:
        present: "conceive"
      delight:
        present: "delight"
      understanding: "have not fully understood it"
    - name: "the disciple of higher training"
      qualities:
        - "whose mind has not yet reached the goal"
        - "and who is still aspiring to the supreme security from bondage"
      perception:
        present:
          singular: "should not perceive"
          plural: "should not perceive"
        past: "not perceived"
      conception:
        present: "should not conceive"
      delight:
        present: "should not delight"
      understanding: "must fully understood it"
    - name: "the Tathagatha"
      qualities:
        - "accomplished and fully enlightened"
      perception:
        present:
          singular: "does not perceive"
          plural: "do not perceive"
        past: "not perceived"
      conception:
        present: "do not conceive"
      delight:
        present: "do not delight"
      understanding: "have fully understood it"
  # ... just different objects
  objects:
    - "Buddhist Practice"
    - "Buddhist Scriptures"
    - "Buddhist Teachings"
---

Thus have I heard.  
On one occasion the Blessed One was living at the Saddle Mountain State park, near Portland, Oregon, with a large group of Bhikkhunis and Bhikkhus and non-binary Bhikkhux.

#### <span style="color:gray">The views left undeclared</span>

{% assign speculativeviews = page.matikas.speculativeviews %}
Then, while the lay follower Scott was alone in meditation, the following thought arose in his mind:
"These speculative views have beenleft undeclared by the Blessed One, set aside and rejected by him, namely: {% for proposition in speculativeviews %}'{{proposition.affirmative}}' and '{{proposition.negative}}'{% if forloop.last %}.{% else %};{% endif %}{% endfor %}  
The Blessed One does not declare these to me, and I do not approve of and accept the fact that he does not declare these to me, so I shall go to the Blessed One and ask him the meaning of this.
If he declares to me {% for proposition in speculativeviews %}either '{{proposition.affirmative}}' or '{{proposition.negative}}', {% endfor %} then I will lead the holy life under him; if he does not declare these to me, then I will abandon the training and return to the low life."

Then, when it was evening, the lay follower Scott rose from meditation and went to the Blessed One. After paying homage to him, he sat down at one side and told him: "Here, venerable sir, while I was alone in meditation, the following thought arose in my mind: 'These speculative views have been left undeclared by the Blessed One... If he does not declare these to me, then I will abandon the training and return to the low life.'  

{% for proposition in speculativeviews %}If the Blessed One knows '{{proposition.affirmative}}' let the Blessed One declare to me '{{proposition.affirmative}}'; if the Blessed One knows '{{proposition.negative}}', let the Blessed One declare to me '{{proposition.negative}}'. If the Blessed One does not know either '{{proposition.affirmative}}' or '{{proposition.negative}}' then it is straightforward for one who does not know and does not see to say: 'I do not know, I do not see.'  
{% endfor %}

"How then, Scott, did I ever say to you: 'Come, Scott, lead the holy life under me and I will declare to you "{{speculativeviews[0].affirmative}}"... or "{{speculativeviews[-1].negative}}"'? -- "No, venerable sir." -- "Did you ever tell me: 'I will lead the holy life under the Blessed One, and the Blessed One will declare to me "{{speculativeviews[0].affirmative}}"... or "{{speculativeviews[-1].negative}}"?'" -- "No, venerable sir." -- "That being so, misguided man, who are you and what are you abandoning?"

[paragraph as in MN 63.5]

"All this would still not be known to that man and meanwhile he would die. So too, Scott, if anyone should say thus: 'I will not lead the holy life under the Blessed One until the Blessed One declares to me: "{{speculativeviews[0].affirmative}}"... or "{{speculativeviews[-1].negative}}"', that would still remain undeclared by the Tathagatha and meanwhile that person would die.

{% for proposition in speculativeviews %}
"Scott, if there is the view '{{proposition.affirmative}}', the holy life cannot be lived; and if there is the view '{{proposition.negative}}', the holy life cannot be lived. Whether there is the view '{{proposition.affirmative}}' or the view '{{proposition.negative}}', there is birth, there is ageing, there is death, there are sorrow, lamentation, pain, grief, and despair, the destruction of which I prescribe here and now.  
{% endfor %}

"Therefore, Scott, remember what I have left undeclared as undeclared, and remember what I have declared as declared. And what have I left undeclared? {% for proposition in speculativeviews %}'{{proposition.affirmative}}' -- I have left undeclared. '{{proposition.negative}}' -- I have left undeclared.{% endfor %}

"Why have I left that undeclared? Because it is unbeneficial, it does not belong to the fundamentals of the holy life, it does not lead to disenchantment, to dispassion, to cessation, to peace, to direct knowledge, to enlightenment, to Nibbana. That is why I have left it undeclared

"And what have I declared? 'This is suffering' -- I have declared. 'This is the origin of suffering' -- I have declared. 'This is the cessation of suffering' -- I have declared. 'This is the path leading to the cessation of suffering' -- I have declared.

"Why have I declared that? Because it is beneficial, it belongs to the fundamentals of the holy life, it leads to disenchantment, to dispassion, to cessation, to peace, to direct knowledge, to enlightenment, to Nibbana. That is why I have declared it."

"Therefore, Scott, remember what I have left undeclared as undeclared, and remember what I have declared as declared.

#### <span style="color:gray">The root of all trolling</span>

"Bhikkhux, and Scott, I shall teach you a discourse on the Quest Contradictory to both Facts and Theory. Listen and attend closely to what I shall say." -- "Yes, venerable sir," the bhikkhux replied. -- "Okay," Scott replied. The Blessed one said this:

{% assign subjects = page.matikas.subjects %}
{% assign objects = page.matikas.objects %}
{% for subject in subjects %}
{% for object in objects %}
"{% if forloop.first %}Here, Bhikkhux, {{subject.name}} {% for quality in subject.qualities %}{{quality}}, {% endfor %} {{subject.perception.present.singular}}{% else %}They {{subject.perception.present.plural}}{% endif %} {{object}} as {{object}}. Having {{subject.perception.past}} {{object}} as {{object}}, they {{subject.conception.present}} {{object}}, they {{subject.conception.present}} themselves in {{object}}, they {{subject.conception.present}} themselves apart from {{object}}, they {{subject.conception.present}} {{object}} to be 'mine', they {{subject.delight.present}} in {{object}}. Why is that? Because they {{subject.understanding}}, I say.
{% endfor %}
{% endfor %}

#### <span style="color:gray">Final Verses</span>

About this is was said:
> True Buddhism is an illusion,
  False Buddhism is real.

That is what the Blessed One said. But Scott did not delight in the Blessed One's words.

## Commentary

This is obviously a free and creative adaptation of MN1 and MN63.
