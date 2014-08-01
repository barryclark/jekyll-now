---
layout: post
title: Simple Long Shadow with SASS and text-shadow
---

No modern design trend is as popular - or as notorious - as the long shadow. Long shadow designs have been making quite an impression on the web community for some time now, as a sub-trend of the flat design. While many designers love it, just as many can't seem to stand it.

> [@nickrp](https://twitter.com/nickrp) I enjoy it because it makes me think of paper crafts. And construction paper.
> &mdash; Dean Wagman (@DeanWagman) [August 26, 2013](https://twitter.com/DeanWagman/statuses/372122281314488321)
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Whether you agree with Mr. Pettit or not, at some point you may need to implement a long-shadow logo or icon somewhere on a the web. Chances are, you'd much rather not waste time with images (both on your end and your users). Fortunately, this effect is surprisingly easy to implement with just a short SASS function.

Below is a Pen with the SASS code I use to achieve this effect on a simple anchor tag with text.

<div data-height="403" data-theme-id="0" data-slug-hash="jmqIc" data-user="JordanForeman" data-default-tab="css" class='codepen'>

    $size: 100;
    $red: #b0232c;

    /*
    *  Sass function modified from: 
    *  http://dtott.com/thoughts/2013/07/03/a-sass-mixin-for-long-shadows
    */
    @function makelongshadow($color, $len) 
    {
      $val: 0px 0px $color;
      @for $i from 1 through $len 
      {
        $val: #{$val}, #{$i}px #{$i}px #{$color};
      }

      @return $val;
    }

    .logo
    {
      display: block;
      width: #{$size}px;
      height: #{$size}px;

      font-family: helvetica, sans-serif;
      font-weight: 800;
      font-size: 3.0em;

      background-color: $red;
      color: WHITE;

      line-height: #{$size}px;
      text-align: center;
      letter-spacing: -3px;

      border-radius: 5px;
      text-decoration: none;

      overflow: hidden;

      text-shadow: makelongshadow(darken($red, 10), $size);

      -webkit-transition: all .3s linear;

      &:hover
      {
          text-shadow: makelongshadow(darken($red, 15), $size);
      }

    }

See the Pen [%= penName %>](http://codepen.io/JordanForeman/pen/jmqIc) by Jordan Foreman ([@JordanForeman](http://codepen.io/JordanForeman)) on [CodePen](http://codepen.io)

</div><script async src="http://codepen.io/assets/embed/ei.js"></script>

We need to set `overflow: hidden` to avoid our text-shadow pushing out of bounds.