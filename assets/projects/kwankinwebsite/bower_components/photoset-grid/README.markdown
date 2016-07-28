# Photoset Grid

A simple jQuery plugin to arrange images into a flexible grid, based on Tumblr's photoset feature. Originally the plugin was created for our [Style Hatch](http://stylehatch.co) Tumblr themes as a way to use the photoset grid in responsive layouts, but we have since expanded it for use outside of the themes.

## Demo

View the [photoset grid Github page](http://stylehatch.github.com/photoset-grid) for all the examples or jump straight to the following demos: 

- [Basic usage](http://stylehatch.github.com/photoset-grid#demo-basic-usage)
- [Custom options](http://stylehatch.github.com/photoset-grid#demo-custom-options)
- [Adding a lightbox viewer](http://stylehatch.github.com/photoset-grid#demo-lightbox)
- [Using photoset grid in a Tumblr theme](http://stylehatch.github.com/photoset-grid#demo-tumblr)

## Usage

Apply the photo set grid layout to a selected `div` containing images for the grid. 

The only markup requirement is a `data-layout` attribute on the selected `div`. `data-layout` should contain a string of numbers representing the number of columns for each row. 

If all of the images in a photoset set both a height and a width, the layout of the grid is triggered immediately before all of the images load. Otherwise [imagesLoaded](https://github.com/desandro/imagesloaded) is used to wait for all of the images to load in.

**Understanding data-layout:**

- `data-layout="2331"` 1st row has 2 images, 2nd row has 3 images, 3rd row has 3 images, and 4th row has 1 image. Total of 9 images.
- `data-layout="13"` 1st row has 1 image and 2nd row has 3 images.

#### Basic Usage

Simply call `photosetGrid();` on a div with the `data-layout` specified and a number of images inside.

##### HTML:
	<div class="photoset-grid" data-layout="13">
		<img src="image1.jpg">
		<img src="image2.jpg">
		<img src="image3.jpg">
		<img src="image4.jpg">
	</div>
	
##### Javascript:
	$('.photoset-grid').photosetGrid();
#### Custom Options

Beyond the basic usage, you can set a number of optional arguments including callback functions that are useful for adding a lightbox for high resolution images.

**arguments**

- `width` - `string` Change the width that the photo set grid will be rendered at. Default: `100%` *automatically fits its container for responsive layouts*
- `layout` - `string` Manually set a string of numbers to specify the number of images each row contains. Default: `null` *generates a stacked layout of one image per row*
- `gutter` - `string` Set the pixel width between the columns and rows. Default: `0px`
- `highresLinks` - `boolean` Set to `true` to automatically swap out the default image `src` with the `data-highres` attribute once the image is wider than `lowresWidth`. This will also wrap each image with an `a` vs. `div` element. Default: `false`
- `lowresWidth` - `number` Sets the width where the default image is swapped out for the high resolution image. Default: `500`
- `rel` - `string` This optional setting useful for lightbox viewers applies a common `rel` attribute to the anchor tags wrapping the images.
- `onInit` - `function` Define a function to be called when the plugin is initialized.
- `onComplete` - `function` Define a function to be called when the plugin has completed the grid layout.

##### HTML:
	<div class="photoset-grid" style="visibility: hidden;">
		<img src="image1.jpg" data-highres="highres-image1.jpg">
		<img src="image2.jpg" data-highres="highres-image2.jpg">
		<img src="image3.jpg" data-highres="highres-image3.jpg">
		<img src="image4.jpg" data-highres="highres-image4.jpg">
		<img src="image5.jpg" data-highres="highres-image5.jpg">
		<img src="image6.jpg" data-highres="highres-image6.jpg">
		<img src="image7.jpg" data-highres="highres-image7.jpg">
	</div>
	
##### Javascript:
	$('.photoset-grid').photosetGrid({
		layout: '232',
		width: '100%',
		gutter: '5px',
		highresLinks: true,
		lowresWidth: 300,
		rel: 'gallery-01',
		
		onInit: function(){},
		onComplete: function(){
		
			$('.photoset-grid').css({
				'visibility': 'visible'
			});
			
		}
	});

## Installation

**Bower package manager**

You can easily install photoset-grid as a [Bower](https://github.com/twitter/bower) package by running:

	$ bower install photoset-grid

## Credits

* [Jonathan Moore](http://github.com/jonathanmoore) - *[@moore](http://twitter.com/moore) | [jonathanmoore.com](http://jonathanmoore.com)*
* [Mikey Wills](http://muke.me) - *[@mukealicious](https://twitter.com/mukealicious) | [muke.me](http://muke.me)*
* *Additional*
	* [Thomas Sardyha](https://github.com/Darsain) & [David DeSandro](https://github.com/desandro/) - [desandro/imagesloaded](https://github.com/desandro/imagesloaded)
	* [Louis-Rémi Babé](https://github.com/louisremi/) - [louisremi/jquery-smartresize](https://github.com/louisremi/jquery-smartresize)

### MIT License

Copyright (c) 2013 Style Hatch, Inc

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
