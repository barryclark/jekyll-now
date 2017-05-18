---
layout: post
title: List of JavaFX Simple Properties
tags: [java]
keywords: [list of javafx simple properties, javafx,simplebooleanproperty,simpledoubleproperty,simplefloatproperty,simpleintegerproperty,simplelistproperty,simplelongproperty,simplemapproperty,simpleobjectproperty,simplesetproperty,simplestringproperty,simpledateproperty,simpleimageproperty]
image: /images/Java_logo.jpg
---

I've been playing around with JavaFX (the desktop/windows application interface for Java) recently and was trying to find a list of the different "`Simple...Property`" to use in [`TableColumn`](https://docs.oracle.com/javase/8/javafx/api/javafx/scene/control/TableColumn.html)'s [`setCellValueFactory()`](https://docs.oracle.com/javase/8/javafx/api/javafx/scene/control/TableColumn.html#cellValueFactoryProperty) method.

Although I wasn't able to find a list via a Google search, I was able to find at least one Simple...Property. The best list I could find was on the package page for [`javafx.beans.property`](https://docs.oracle.com/javase/8/javafx/api/javafx/beans/property/package-summary.html) (which is the package that these property classes belong). There are ten such properties:

* [`SimpleBooleanProperty`](https://docs.oracle.com/javase/8/javafx/api/javafx/beans/property/SimpleBooleanProperty.html)
* [`SimpleDoubleProperty`](https://docs.oracle.com/javase/8/javafx/api/javafx/beans/property/SimpleDoubleProperty.html)
* [`SimpleFloatProperty`](https://docs.oracle.com/javase/8/javafx/api/javafx/beans/property/SimpleFloatProperty.html)
* [`SimpleIntegerProperty`](https://docs.oracle.com/javase/8/javafx/api/javafx/beans/property/SimpleIntegerProperty.html)
* [`SimpleListProperty<E>`](https://docs.oracle.com/javase/8/javafx/api/javafx/beans/property/SimpleListProperty.html)
* [`SimpleLongProperty`](https://docs.oracle.com/javase/8/javafx/api/javafx/beans/property/SimpleLongProperty.html)
* [`SimpleMapProperty<K,V>`](https://docs.oracle.com/javase/8/javafx/api/javafx/beans/property/SimpleMapProperty.html)
* [`SimpleObjectProperty<T>`](https://docs.oracle.com/javase/8/javafx/api/javafx/beans/property/SimpleObjectProperty.html)
* [`SimpleSetProperty<E>`](https://docs.oracle.com/javase/8/javafx/api/javafx/beans/property/SimpleSetProperty.html)
* [`SimpleStringProperty`](https://docs.oracle.com/javase/8/javafx/api/javafx/beans/property/SimpleStringProperty.html)

These cover five of the eight primitives in Java (the five included are `int`, `long`, `float`, and `boolean`, while the missing three are `byte`, `short`, and `char`). A couple properties I feel are missing as well include "`SimpleDateProperty`" and "`SimpleImageProperty`," although these could be implemented by using `SimpleObjectProperty`.

Finally, an interesting observation about using `SimpleDoubleProperty`, `SimpleFloatProperty`, `SimpleIntegerProperty`, and `SimpleLongProperty` is that they all implement `Property<Number>`, not `Property<Double>`, `Property<Integer>`, etc. That means one would have to use a `TableColumn<S, Number>` rather than the respective wrapper class.
