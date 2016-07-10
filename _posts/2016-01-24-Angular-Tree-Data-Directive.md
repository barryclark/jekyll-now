---
layout: post
categories: [angular, front, end, directives, hierarchy]
title: Angular Hierarchy Data Directive
author: emir_osmanoski
headerimage: /images//2016-01-24-Tree-Data-Directive//01_CategoryTree.PNG
comments: true
---

I've been working on a project that required a way to display a hierarchy of
data. The project is an Angular SPA with an ASP.NET Web Api Backend. The data
that was to be displayed was a generic product category structure.

This post will try and cover the implementation of the directive and how this
can be  achieved in a way where the directive is usable to display any data
via attribute configuration.

We can see an example of the widget in the next screenshot:

![Category Hierarchy Data]({{ site.baseurl }}/images/2016-01-24-Tree-Data-Directive/01_CategoryTree.PNG)

# Directive Usage

Let's take a look at one example of usage of the directive that uses  all the
configuration attributes.

``` html
<ws-tree-data 
      data="vm.categories"
      children-property-name="ChildCategories"
      display-property-name="Name"
      value-property-name="Id"
      value-alt-property-name="TempId"
      handler="vm.selectCategoryHandler"
      mark="true"
      selected="vm.selectedCategory"
      >
</ws-tree-data>
```

We can go over all the parameters in the directive and describe what each of those means:

* **data** - Is the object hierarchy upon which the hierarchy tree will be constructed on.
* **children-property-name** - The name of the property on each of the objects in the hierarchy that allows us to find its child objects.
* **display-property-name** - The name of the property for each of the objects that will be displayed on the UI.
* **value-property-name** - The name of the property for each of the objects that uniquely identifies the property and servers as the value
* **value-alt-property-name** - The alternative value property name. Used for objects that do not have a server persisted ID.
* **handler** - The function that will be called on the controller/view model when an internal selected object event happens.
* **mark** - Indicate whether the objects in the hierarchy will be highlighted as selected.
* **selected** - The object on the controller/view model that will set when internally a selection is made.

# Directive HTML

Lets now take a look at the HTML for the directive. It is mainly based on an
internal template that gets repeated for each of the objects in the children
array of each object.

In a way it is using a sort of recursion to render the hierarchy:

``` html
<ul class="treeDataComponent">
    <li data-ng-repeat="item in vm.data | stateNotDeleted" ng-include="'itemTree'">
    </li>
</ul>

<script type="text/ng-template" id="itemTree">
    <div class="item" data-ng-class="vm.ItemClass(item)" >
        <div class="item_collapse"
             data-ng-click="vm.SetChildrenVisibleState(item)"
             data-ng-show="vm.HasChildren(item)">
            {{vm.ItemChildrenStateIndicator(item)}}
        </div>
        <div class="item_text" data-ng-click="vm.ItemClickHandler(item)">
            {{item[vm.displayPropertyName]}}
        </div>
    </div>

    <ul data-ng-show="vm.AreChildrenVisible(item)" 
    	ng-if="item[vm.childrenPropertyName]">
        	<li data-ng-repeat="item in item[vm.childrenPropertyName] | stateNotDeleted" 
        		ng-include="'itemTree'">
        	</li>
    </ul>
</script>
```

What this will do is basically start with at the level of the unordered list
and repeat list items for each element. The example we are going to see
actually contains only one element at the top level vm.data array, the root.

Starting for the root, we are rendering the 'itemTree' template. That in turn
will  render **two** main things. The first is the div with the 'item' class.
It renders a small  widget that is used to visually represent the state of the
item, which can be either collapsed or  open, which in turn will hide/show the
children of the item.

We can see the text rendering occurs within the div with the item_text class.
We are in a turn rendering the text of the item. Because the directive is made
to be generic and render all sorts of object hierarchies the text being
rendered is controlled by the *displayPropertyName*

The second main thing rendered in the template is the children of the current
item. This is where the recursion comes into play as we are calling the
template within itself for each of the children of the current item. Once
again because the directive is meant to be generic we are using the
*childrenPropertyName* directive option to select the childrens array.

We can also see several other calls to methods on the directive controller. We
are going to take a look at the controller next and go over the methods and
options one by one.

# Directive Controller

Let's take a look at the directive declaration and the controller syntax used
to define the functionality and logic of the hierarchy tree.

``` javascript
(function () {
    "use stirct";

    // define the module first 
    angular.module("treeDataModule", []);

    angular
        .module("treeDataModule")
        .directive("treeData", treeData);

    function treeData() {
        var directive = {
            scope: {
                data: "=",
                mark: "=",
                selected: "=",
                displayPropertyName: "@",
                valuePropertyName: "@",
                valueAltPropertyName: "@",
                childrenPropertyName: "@",
                
                handler: "&"
            },

            restrict: "E",
            templateUrl: 'app/components/treeData/treeData.html',

            controller: treeDataController,
            controllerAs: "vm",
            bindToController: true
        };

        return directive;
    }

    function treeDataController() {
        var vm = this;

        // internal tracking of what is selected
        vm.selected = {};

        vm.CollapsedState = {};

        vm.ItemClickHandler = itemClickHandler;
        vm.ItemClass = itemClass;

        vm.HasChildren = hasChildren;
        vm.AreChildrenVisible = areChildrenVisible;
        vm.SetChildrenVisibleState = setChildrenVisibleState;
        vm.ItemChildrenStateIndicator = itemChildrenStateIndicator;

        function itemClickHandler(item) {
            vm.selected = item;

            // make sure a handler has been specified first
            if (vm.handler() != undefined) {
                vm.handler()(item);
            }
        }

        /*
            Return the open/close indicator based on the Children 
            Visible property on the item.
        */
        function itemChildrenStateIndicator(item) {
            if (typeof item.ChildrenVisible == "undefined" 
                    || item.ChildrenVisible) {
                return "-";
            } else {
                return "+";
            }
        }
        /*
            Set state on the item for the visibility of the children
        */

        function setChildrenVisibleState(item) {
            if (typeof item.ChildrenVisible == "undefined" 
                    || item.ChildrenVisible) {
                item.ChildrenVisible = false;
            } else {
                item.ChildrenVisible = true;
            }
        }

        /*
            Determine if the children of the given item should be visible
        */

        function areChildrenVisible(item) {
            // we do not want to populate item with 
            if (typeof item.ChildrenVisible != "undefined") {
                return item.ChildrenVisible;
            } else {
                return true;
            }
        }

        /*
            Determine if the item has children for the given children property name
        */

        function hasChildren(item) {
            var itemChildrenCollection = item[vm.childrenPropertyName];
            if (typeof itemChildrenCollection != "undefined" 
                && itemChildrenCollection != null 
                && itemChildrenCollection.length > 0) {
                return true;
            } else {
                return false;
            }
        }

        /*
            Determine if the item should have the selected class
        */

        function itemClass(item) {
            if (vm.mark) {
                if (typeof item[vm.valuePropertyName] != "undefined" 
                        && item[vm.valuePropertyName] != 0) {
                    if (vm.selected[vm.valuePropertyName] == item[vm.valuePropertyName]) {
                        return decideClass(vm.valuePropertyName);
                    }
                } else if (typeof item[vm.valueAltPropertyName] != "undefined" 
                               && item[vm.valueAltPropertyName] != 0) {
                    return decideClass(vm.valueAltPropertyName);
                }
            }

            return "";

            function decideClass(valuePropertySelector) {
                if (vm.selected[valuePropertySelector] === item[valuePropertySelector]) {
                    return "selected";
                } else {
                    return "";
                }
            }
        }
    }
})();
```

The directive definition defines the internal isolate scope of the directive.
We are using the directive controller as syntax to define a controller as a
view model to define the logic and state for the widget.

There are several methods and state variables worth looking at that tie
closely to what we saw in the HTML definition.

### Selecting an Item in the Widget

We can see in the HTML that we have set an internal click handler on the text
of  the item *vm.ItemClickHandler* and we can see from the directive
declaration that this will set the item as *selected* and if defined we call
the handler passed in from a higher level controller.

### Working with the children of an item

The *itemChildrenStateIndicator* method is applied to determine between two
possible values for the button used to collapse and expand the children for a
given item.

The difference can be seen in the next two following screenshots:

![Open Category]({{ site.baseurl }}/images/2016-01-24-Tree-Data-Directive/02_MtBikes_Open.PNG)

and 

![Closed Category]({{ site.baseurl }}/images/2016-01-24-Tree-Data-Directive/03_MtBikes_Closed.PNG)
 
The *setChildrenVisibleState* is used on the div marked with the class
*item_collapse* to toggle between the two children visible states for the
item. Each item in the data collection passed to the widget will have as an
added new property *ChildrenVisible* that controls the state of the children.
It is actually  what is used by the *itemChildrenStateIndicator* method.

The next two methods, *areChildrenVisible* and *hasChildren* are utility
methods used to determine the visibility of the button to show/hide the
children and to determine if the element will internally render the same
template *itemTree*.

### Visibly marking an item as selected

The final method in the directive controller is *itemClass* and the internal
*decideClass* that are used to determine if any given item is currently the
selected one.

This is the location where we use both the *valuePropertyName* and the
*valueAltPropertyName*, as the key with which we compare two items. We use
them to make sure that the item currently being rendered and for which we are
requesting the item class is the item which is currently set as selected.

The reason we are using an additional alternative value property name is
because of the intended initial usage of the widget.  It is used to render a
hierarchy of categories which have server side unique id values. But the tree
is also used to insert new items in the hierarchy. The choice was made at this
point to persist all the changes to the category at once, so I needed a way to
determine if two items are the same based on an alternative id value, which in
the actual application using the directive is generated in an entity service
layer.

# Working with Items and the Hirearchy

One detail regarding the implementation of the directive, is how deleteion of
items is implemented. Because of the backend used on the actual project I
needed a way to hide and mark deleted nodes in the hierarchy with a State
value.

That is why the *stateNotDeleted* filter is used. We can see the usage in the
HTML of the directive. It's applied twice, both on the initial repeat on
vm.Data and then on the internal loop of Children when calling the *itemTree*
template recursively.

The current implementation of the filter is very simple and hard coded. We use
the value 4 for the State parameter because that is the Deleted state value of
entities on the project.

The simple filter implementation can be seen here:

``` javascript
(function () {
    "use strict";
    
    angular
        .module("treeDataModule")
        .filter("stateNotDeleted", stateNotDeletedFilter);

    function stateNotDeletedFilter() {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function(item) {
                if (typeof item.State != "undefined" 
                        && item.State != null) {
                    if (item.State != 4) {
                        filtered.push(item);
                    }
                } else {
                    filtered.push(item);
                }
            });
            return filtered;
        };
    }
})();
```

It's easy to see how this can be extended and made more generic.

# Example of Usage

We are going to be looking at a very simple usage example for the directive.

The HTML where this is called can be seen in the following block of code:

``` html
<div class="container">
<div>
	<acme-navbar ></acme-navbar>
</div>	

<h1>Hierarchy Tree</h1>
<h3>Click on a name to select a category </h3>
  
<div class="row">
	<div class="col-xs-6">
    	<tree-data 
		      	data="vm.data"
		      	mark="true"
		      	handler="vm.selectCategoryHandler"
		      	selected="vm.selectedCategory"
		      	display-property-name="Name"
		      	value-property-name="Id"
		      	value-alt-property-name="TempId"
		      	children-property-name="ChildCategories">
		</tree-data>
	</div>

  	<div class="col-xs-6" >
	  	<div class="component-row" data-ng-show="vm.categorySelected">
		  	<h3 >
			  	Category Selected:
			  	{{vm.selectedCategory.Name}}
		  	</h3>
		  	<div class="component-row">
		  		<button class="btn btn-danger" 
		  		data-ng-click=vm.setCategoryStateToDelete()>Delete!
		  		</button>
				<button class="btn btn-primary" 
				data-ng-click="vm.addChildToSelected()">
	  				Add Child to Parent
	  			</button>
		  	</div>
		  	<div class="component-row">
			  	<input type="text" 
			  	data-ng-model="vm.selectedCategory.Name" />
		  	</div>
	  	</div>
	</div>
</div>
```

The JavaScript code for the MainController running on the above view can be
seen below:

``` javascript
(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log) {
    var vm = this;
    
    vm.data = 
    [{
        "Name": "Product",
        "Description": null,
        "ParentId": null,
        "ChildCategories": [{
            "Name": "Bikes",
            "Description": null,
            "ParentId": 1,
            "ChildCategories": [{
                "Name": "Mountain Bikes",
                "Description": "Des MTB",
                "ParentId": 2,
                "ChildCategories": [{
                    "Name": "Hardtail",
                    "Description": null,
                    "ParentId": 5,
                    "ChildCategories": [],
                    "Id": 22,
                    "State": 1
                }, {
                    "Name": "Full Suspension",
                    "Description": null,
                    "ParentId": 5,
                    "ChildCategories": [],
                    "Id": 49,
                    "State": 1
                }],
                "Id": 5,
                "State": 1
            } {
                "Name": "Hybrid Bikes",
                "Description": null,
                "ParentId": 2,
                "ChildCategories": [],
                "Id": 7,
                "State": 1
            }, {
                "Name": "Cross Bikes",
                "Description": null,
                "ParentId": 2,
                "ChildCategories": [],
                "Id": 8,
                "State": 1
            }],
            "Id": 2,
            "State": 1
        }],
        "Id": 1,
        "State": 1
    }]

    vm.selectedCategory = null;
    vm.categorySelected = false;

    vm.selectCategoryHandler = selectCategoryHandler;
    vm.setCategoryStateToDelete = setCategoryStateToDelete;

    activate();

    function activate() {
    }

    function selectCategoryHandler(item){
        if(item != null){
        vm.categorySelected = true;
      }
    }

    function setCategoryStateToDelete(){
        vm.selectedCategory.State = 4;
    }
}
})();
```

The implementation of the Main Controller used is shortened. Some of the data
has been cut out from the categories array. The full controller can be seen in
Git repository in the following section.

The Usage example is very simple with events and data hooked up to the
directive parameters from the main controller.

The *selectCategoryHandler* we pass to the directive just sets the Main
Controllers vm value for *categorySelected* to true. We are directly passing
the vm.selectedCategory to the directive so we do not need to set its value in
the selected handler.

The *setCategoryStateToDelete* method just sets the State value of the
selected category to 4 - which then gets picked up from the stateNotDeleted
filter and the category will not be displayed - even though it will remain in
the vm.data collection. This allows is to be then processed on the server when
we decide to persist the state changes to the category hierarchy.

Finally the *addChildToSelected* just adds a new category to the one currently
selected. It's at this point for new items we generate the temporary id, which
allows them to be properly selected within the widget controller.

The example at work can be seen at this [this address!](http://treedirective.students.mk/)

# Summary & Code 

This is an example of using an angular directive to render a hierarchy of
data. The component is conceived to be reusable for any object graph with the
way it can be configured using the  *display-property-name*, *value-property-
name* , *value-alt-property-name* and *children-property-name* directive
parameters.

It is currently still a work in progress that will probably see changes as
time goes by.

For now the example code and directive can be seen at [this github
repository](https://github.com/emir01/angular-tree-data-directive). It has
been bootstrapped and built using Yeoman Gulp and NPM - so certain NPM and
Bower packages will have to be installed to get everything working. At the
very least the code for the directive is available under
**src\app\components\treeData**


