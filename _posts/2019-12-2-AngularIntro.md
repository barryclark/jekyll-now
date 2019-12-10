---
Category: post
title: Learning Journal for Angular Intro
---
## Angular common sense?
1. Angular has a ***Angular Json*** file for all configurations to compile the files
2. Angular has a ***Package Json*** file to build the project (not every package is needed)
3. Angular uses ***TypeScript*** 

  1.TypeScript annotation
  ```
  let decimal: number = 6;
let hex: number = 0xf00d;

function getResult(value: number) : number {
   // get result
}

  
  ```
  2. MetaData annotation/ decorations
  ```
  @Validater({
   checksum: true
})
class CardProcessor {
	…
}

  ```
  3. private modifiers (even in constructor the parameter can be ***private*** class. this way no need to declare the class out of the constructor)
  ```
  class Animal {
    private _name: string;
    constructor(name: string) { this._name = name; }
    move(meters: number) {
        alert(this._name + " moved " + meters + "m.");
    }
}

  ```
  4. Other concepts similar to Java including interfaces, Enums and Generics
  
  5.Namespace: ***Internal modules*** usually only for creating modules for legacy codes
  ![Namespace intro] (https://www.youtube.com/watch?v=4Onwa-Putv4)
![Angular structure](https://github.com/EmilyStacy-droid/EmilyStacy-droid.github.io/blob/master/images/IMG_5314.JPG)
```
namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}

import polygons = Shapes.Polygons;
let sq = new polygons.Square();

```

5. common commands:

	1. create a new module:
	```
	 ng generate module ***file name(ex.)accounts*** --routing
	```

	2. create a new component:
	```
	ng generate component ***file name (ex.)accounts***/components/account-list --lint-fix --skip-import
	```
	
	3. initiate Angular cli (https://cli.angular.io/)
	
		```
		(install) npm install -g @angular/cli
		
		ng new ***file Name***
		
		cd ***file name***
		
		ng serve (perferred npm start -- --port no.)
		```
	4. ***GIT INGORE*** (https://github.com/angular/angular-cli/blob/master/.gitignore)
	
		```
			# Outputs
			bazel-*
			test-project-host-*
			dist/
			dist-schema/

			# IDEs
			jsconfig.json

			# Intellij IDEA/WebStorm
			# https://intellij-support.jetbrains.com/hc/en-us/articles/206544839
			.idea/inspectionProfiles/
			.idea/**/compiler.xml
			.idea/**/encodings.xml
			.idea/**/workspace.xml
			.idea/**/tasks.xml
			.idea/**/usage.statistics.xml
			.idea/**/dictionaries
			.idea/**/shelf

			# Also ignore code styles because .editorconfig is used instead.
			.idea/codeStyles/

			# VSCode
			# https://github.com/github/gitignore/blob/master/Global/VisualStudioCode.gitignore
			.vscode/
			!.vscode/settings.json
			!.vscode/tasks.json
			!.vscode/launch.json
			!.vscode/extensions.json
			**/*.code-workspace

			# Typings file.
			typings/

			# Misc
			coverage/
			node_modules/
			tmp/
			npm-debug.log*
			yarn-error.log*
			.ng_pkg_build/

			# Mac OSX Finder files.
			**/.DS_Store
			.DS_Store
		```
		
## Angular Key Concepts

1. Home.ts(usually App.ts) => Almost all logic will be listed here, including the ***@decorators***. The decorators allows us to ***bind typescript to the HTML template*** ex. creating a disabled button

2. ***Interpolation***: In the html file the dynamic file is interpolated this way (an example): <p> {{message}} </p>. The value of the message is assigned in the ts file 

3. ***Modularity*** with Ngmodules, browswer modules, Http modules, forms modules, etc.

	```
	// imports
	import { BrowserModule } from '@angular/platform-browser';
	import { NgModule } from '@angular/core';

	import { AppComponent } from './app.component';

	// @NgModule decorator with its metadata
		@NgModule({
		declarations: [AppComponent],
		imports: [BrowserModule],
		providers: [],
		bootstrap: [AppComponent]
		})
		export class AppModule {}
```
4.directves (see below)

5.Databinding: synchronize between ***model and view layers***  *Interpolation is a way of data biding*
	(1) Expressions
	(2) property binding
	(3) event binding
	(4)two-way binding
	
6. Modules vs. Components

* Angular Component

A component is one of the basic building blocks of an Angular app. An app can have more than one component. In a normal app, ***a component contains an HTML view page class file, a class file that controls the behaviour of the HTML page and the CSS/scss file to style your HTML view***. A component can be created using @Component decorator that is part of @angular/core module.

```
import { Component } from '@angular/core';
and to create a component

@Component({selector: 'greet', template: 'Hello {{name}}!'})
class Greet {
  name: string = 'World';
}
To create a component or angular app here is the tutorial
```
* Angular Module

An angular module is ***set of angular basic building blocks like component, directives, services etc.*** An app can have more than one module. Modules basically group the related components, services together so that you can have chunks of functionality which can then run independently

A module can be created using @NgModule decorator.
```
@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

## Angular Key structure

### NgModules
![NgModules decorator](https://github.com/EmilyStacy-droid/EmilyStacy-droid.github.io/blob/master/images/IMG_5313.JPG)

### Component
![Component decorator](https://github.com/EmilyStacy-droid/EmilyStacy-droid.github.io/blob/master/images/IMG_5316.JPG)
### Directive
1. An extensions of HTML that modify elements and/or extend their behavior *repeating* *show/hide* and *dynamic attribute assignment*
2.One of the 3 types of View Classes
```
<dig *ngif = "clicked">
	<h3> {{boat.name}} </h3>
	<img [src] = "boat.img" width="200px"/>
	<p> Built in {{boat.year}} </p>
</div>

```
(https://www.youtube.com/watch?v=23o0evRtrFI)

3. ****Ngfor*** is also a commone one

### Pipes 
HTML extensions that manipulates or formats data for display

For example(https://www.intertech.com/Blog/angular-tutorial-working-with-angular-pipes/)

***In Component***
```
export class PipesExampleComponent implements OnInit {
  todaysDate: Date;
  constructor() {
    this.todaysDate = new Date();
  }
  ngOnInit() {
  }
}
```
***In template***
```
<h6>Today's Date Raw: {{todaysDate}}</h6>
<h6>Today's Date Default: {{todaysDate | date}}</h6>
```
## Angular Decorator
https://docs.angularjs.org/guide/decorators
## Angular Services
1. All classes that ***encapsulate business logic not related to presentation***
2. Made available to view classes and other services via dependency injection
3. Do not belong to a module
4. Example: @Injectable
