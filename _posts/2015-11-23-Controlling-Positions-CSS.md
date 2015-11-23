---
layout: post
title: Controlling The Position of Elements in CSS
excerpt_separator: <!--more-->
img_file: css.png
---
In order to control the layout of your page, CSS gives you the following positioning options for your elements:
1. Absolute
2. Fixed
3. Relative
4. Static
<!--more-->

Let's look at each of these options one by one and see what kind of affect they have on the layout.

&nbsp;

## 1- Position:Static Property

In normal  flow, each block-level element sits on top of the next one. Since this is the default way in which browsers treat HTML elements, you do not need a CSS property to indicate that elements should appear in normal  flow, but the syntax would be:

```
position: static;
```

<pre>
	<xmp style="width:450px">

<head>
    <title>Your awesome title</title>
    <style type="text/css">
        body {
            width:450px;
        }
        header, section, footer {
            border: 2px black solid;
            margin:10px;
            padding: 10px;
            position: static;
        }
    </style>
</head>
<body>
<header>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</header>

<section>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</section>

<section>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</section>

<footer>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</footer>

</body>
</html>
</xmp>
</pre>

<img src="/assets/images/css-static.png" style="border:1px dotted gray" />

## 2- Position:Relative Property


Relative positioning moves an element in relation to where it would have been in normal  flow. For example, you can move it 10 pixels lower than it would have been in normal  flow or 20% to the right. You then use the offset properties (top or bottom and left or right) to indicate how far to move the element from where it would have been in normal  flow.

To move the box up or down, you can use either the top or bottom properties. To move the box horizontally, you can use either the left or right properties.
The values of the box offset properties are usually given in pixels, percentages or ems.

<pre>
	<xmp style="width:450px">
<head>
    <title>Your awesome title</title>
    <style type="text/css">
        body {
            width:450px;
        }
        header, footer {
            border: 2px black solid;
            margin:10px;
            padding: 10px;
            position: static;
        }
        section {
            border: 2px black solid;
            margin:10px;
            padding: 10px;
            position: relative;
            left: 100px;
            top: 12px;
        }        
    </style>
</head>
<body>
<header>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</header>

<section>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</section>

<section>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</section>

<footer>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</footer>

</body>
</html>
</xmp>
</pre>


<img src="/assets/images/css-relative.png" style="border:1px dotted gray" />

## 3- Position:Absolute Property

When the position property is given a value of absolute, the box is taken out of normal  flow and no longer affects the position of other elements on the page.

The box offset properties (top or bottom and left or right) specify where the element should appear in relation to its containing element.


<pre>
	<xmp style="width:450px">

<head>
    <title>Your awesome title</title>
    <style type="text/css">
        body {
            width:450px;
        }
        section, footer {
            border: 2px black solid;
            margin:10px;
            padding: 10px;
            position: static;
        }

        header {
            border: 2px black solid;
            margin:10px;
            padding: 10px;
            position: absolute;
            left: 450px;
            top:2px;
        }
    </style>
</head>
<body>
<header>
<strong>HEADER</strong>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</header>

<section>
<strong>SECTION</strong>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</section>

<section>
<strong>SECTION</strong>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</section>

<footer>
<strong>FOOTER</strong>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</footer>

</body>
</html>
</xmp>
</pre>

<img src="/assets/images/css-absolute.png" style="border:1px dotted gray" />

## 4- Position:Fixed Property


Fixed positioning is a type of absolute positioning that requires the position property to have a value of fixed.

It positions the element in relation to the browser window. Therefore, when a user scrolls down the page, it stays in the exact same place. To control where the fixed position box appears in relation to the browser window, the box offset properties are used.

<pre>
	<xmp style="width:450px">

<head>
    <title>Your awesome title</title>
    <style type="text/css">
        body {
            width:450px;
        }
        section, footer {
            border: 2px black solid;
            margin:10px;
            padding: 10px;
        }

        header {
            border: 2px black solid;
            margin:10px;
            padding: 10px;
            position: fixed;
            top:0px;
        }
    </style>
</head>
<body>
<header>
<strong>HEADER</strong>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</header>

<section>
<strong>SECTION</strong>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</section>

<section>
<strong>SECTION</strong>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</section>

<section>
<strong>SECTION</strong>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</section>

<section>
<strong>SECTION</strong>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</section>

<section>
<strong>SECTION</strong>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</section>

<section>
<strong>SECTION</strong>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</section>

<section>
<strong>SECTION</strong>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</section>

<section>
<strong>SECTION</strong>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</section>

<footer>
<strong>FOOTER</strong>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut augue eget turpis faucibus viverra. Etiam facilisis nibh sapien, vitae laoreet massa tincidunt quis. Curabitur at consectetur nisi, eget interdum neque. 
</footer>

</body>
</html>
</xmp>
</pre>


<img src="/assets/images/css-fixed.png" style="border:1px dotted gray" />