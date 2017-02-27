#### Use bootstrap in angular2 cli project

### The first option
The most conveninent way to use bootstrap in your angular2 cli project is to use Bootstrap CDN.

Go to [Bootstrap](http://getbootstrap.com/) official website, in "Getting started" page. Copy everything from "Bootstrap CDN" and paste it to your index.html page. Now it's ready for using.

... ... But if you just want to use bootstrap css, then just copy the css link. I personally only used bootstrap css in my projects.

### The second option
Install it via npm([Node Package Manager](https://www.npmjs.com/get-npm)), make it available locally in your node_modules folder, so you can use it even if you don't have internet connection.

I am using windows 7 as my development machine: following code can be ran through windows command console.

npm install bootstrap@3

After above command was ran successfully, you should find a new folder called bootstrap created in node_modules.  

### How to use it

Open angular-cli.json file, update styles declaration.

"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.min.css"
]
