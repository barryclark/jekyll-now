---
layout: page
title: Forms by Example
description: >
  Hydejack PRO allows you to build your own forms, using [the same CSS classes as Bootstrap](https://getbootstrap.com/docs/4.0/components/forms/).
  Below you can find examples to help you get started.
redirect_from:
  - /docs/7.5.0/forms-by-example/
  - /docs/7.5.1/forms-by-example/
---

## Example 1
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-check">
    <label class="form-check-label">
      <input type="checkbox" class="form-check-input">
      Check me out
    </label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

```html
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-check">
    <label class="form-check-label">
      <input type="checkbox" class="form-check-input">
      Check me out
    </label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

## Example 2
<form>
  <div class="form-group">
    <label for="exampleFormControlInput1">Email address</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Example select</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect2">Example multiple select</label>
    <select multiple class="form-control" id="exampleFormControlSelect2">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Example textarea</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
</form>

```html
<form>
  <div class="form-group">
    <label for="exampleFormControlInput1">Email address</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Example select</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect2">Example multiple select</label>
    <select multiple class="form-control" id="exampleFormControlSelect2">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Example textarea</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
</form>
```

## Example 3
<form>
  <div class="form-group">
    <label for="exampleFormControlFile1">Example file input</label>
    <input type="file" class="form-control-file" id="exampleFormControlFile1">
  </div>
</form>

```html
<form>
  <div class="form-group">
    <label for="exampleFormControlFile1">Example file input</label>
    <input type="file" class="form-control-file" id="exampleFormControlFile1">
  </div>
</form>
```

## Example 4
<form>
  <div class="form-group">
    <input class="form-control form-control-lg" type="text" placeholder=".form-control-lg">
  </div>
  <div class="form-group">
    <input class="form-control" type="text" placeholder="Default input">
  </div>
  <div class="form-group">
    <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm">
  </div>
  <div class="form-group">
    <select class="form-control form-control-lg">
      <option>Large select</option>
    </select>
  </div>
  <div class="form-group">
    <select class="form-control">
      <option>Default select</option>
    </select>
  </div>
  <div class="form-group">
    <select class="form-control form-control-sm">
      <option>Small select</option>
    </select>
  </div>
  <div class="form-group">
    <input class="form-control" type="text" placeholder="Readonly input here…" readonly>
  </div>
</form>

```html
<form>
  <div class="form-group">
    <input class="form-control form-control-lg" type="text" placeholder=".form-control-lg">
  </div>
  <div class="form-group">
    <input class="form-control" type="text" placeholder="Default input">
  </div>
  <div class="form-group">
    <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm">
  </div>
  <div class="form-group">
    <select class="form-control form-control-lg">
      <option>Large select</option>
    </select>
  </div>
  <div class="form-group">
    <select class="form-control">
      <option>Default select</option>
    </select>
  </div>
  <div class="form-group">
    <select class="form-control form-control-sm">
      <option>Small select</option>
    </select>
  </div>
  <div class="form-group">
    <input class="form-control" type="text" placeholder="Readonly input here…" readonly>
  </div>
</form>
```

## Example 5
<form>
  <div class="form-group row">
    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com">
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword" placeholder="Password">
    </div>
  </div>
</form>


```html
<form>
  <div class="form-group row">
    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com">
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword" placeholder="Password">
    </div>
  </div>
</form>
```

## Example 6
<form class="form-inline">
  <div class="form-group">
    <label for="staticEmail2" class="sr-only">Email</label>
    <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="email@example.com">
  </div>
  <div class="form-group mx-sm-3">
    <label for="inputPassword2" class="sr-only">Password</label>
    <input type="password" class="form-control" id="inputPassword2" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-primary">Confirm identity</button>
</form>

```html
<form class="form-inline">
  <div class="form-group">
    <label for="staticEmail2" class="sr-only">Email</label>
    <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="email@example.com">
  </div>
  <div class="form-group mx-sm-3">
    <label for="inputPassword2" class="sr-only">Password</label>
    <input type="password" class="form-control" id="inputPassword2" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-primary">Confirm identity</button>
</form>
```

## Example 7
<form>
  <div class="form-check">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" value="">
      Option one is this and that&mdash;be sure to include why it's great
    </label>
  </div>
  <div class="form-check disabled">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" value="" disabled>
      Option two is disabled
    </label>
  </div>
</form>

```html
<form>
  <div class="form-check">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" value="">
      Option one is this and that&mdash;be sure to include why it's great
    </label>
  </div>
  <div class="form-check disabled">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" value="" disabled>
      Option two is disabled
    </label>
  </div>
</form>
```

## Example 8
<form>
  <div class="form-check">
    <label class="form-check-label">
      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
      Option one is this and that&mdash;be sure to include why it's great
    </label>
  </div>
  <div class="form-check">
    <label class="form-check-label">
      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
      Option two can be something else and selecting it will deselect option one
    </label>
  </div>
  <div class="form-check disabled">
    <label class="form-check-label">
      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled>
      Option three is disabled
    </label>
  </div>
</form>

```html
<form>
  <div class="form-check">
    <label class="form-check-label">
      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
      Option one is this and that&mdash;be sure to include why it's great
    </label>
  </div>
  <div class="form-check">
    <label class="form-check-label">
      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
      Option two can be something else and selecting it will deselect option one
    </label>
  </div>
  <div class="form-check disabled">
    <label class="form-check-label">
      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled>
      Option three is disabled
    </label>
  </div>
</form>
```

## Example 9
<form>
  <div class="form-check form-check-inline">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"> 1
    </label>
  </div>
  <div class="form-check form-check-inline">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"> 2
    </label>
  </div>
  <div class="form-check form-check-inline disabled">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" disabled> 3
    </label>
  </div>
</form>

```html
<form>
  <div class="form-check form-check-inline">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"> 1
    </label>
  </div>
  <div class="form-check form-check-inline">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"> 2
    </label>
  </div>
  <div class="form-check form-check-inline disabled">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" disabled> 3
    </label>
  </div>
</form>
```

## Example 10
<form>
  <div class="form-check form-check-inline">
    <label class="form-check-label">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> 1
    </label>
  </div>
  <div class="form-check form-check-inline">
    <label class="form-check-label">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> 2
    </label>
  </div>
  <div class="form-check form-check-inline disabled">
    <label class="form-check-label">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled> 3
    </label>
  </div>
</form>

```html
<form>
  <div class="form-check form-check-inline">
    <label class="form-check-label">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> 1
    </label>
  </div>
  <div class="form-check form-check-inline">
    <label class="form-check-label">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> 2
    </label>
  </div>
  <div class="form-check form-check-inline disabled">
    <label class="form-check-label">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled> 3
    </label>
  </div>
</form>
```

## Example 11
<form>
  <div class="form-group">
    <label class="form-control-label" for="formGroupExampleInput">Example label</label>
    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input">
  </div>
  <div class="form-group">
    <label class="form-control-label" for="formGroupExampleInput2">Another label</label>
    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input">
  </div>
</form>

```html
<form>
  <div class="form-group">
    <label class="form-control-label" for="formGroupExampleInput">Example label</label>
    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input">
  </div>
  <div class="form-group">
    <label class="form-control-label" for="formGroupExampleInput2">Another label</label>
    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input">
  </div>
</form>
```

## Example 12
<form>
  <div class="form-row">
    <div class="col">
      <input type="text" class="form-control" placeholder="First name">
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="Last name">
    </div>
  </div>
</form>

```html
<form>
  <div class="form-row">
    <div class="col">
      <input type="text" class="form-control" placeholder="First name">
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="Last name">
    </div>
  </div>
</form>
```

## Example 13
<form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4" class="col-form-label">Email</label>
      <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4" class="col-form-label">Password</label>
      <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress" class="col-form-label">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
  <div class="form-group">
    <label for="inputAddress2" class="col-form-label">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity" class="col-form-label">City</label>
      <input type="text" class="form-control" id="inputCity">
    </div>
    <div class="form-group col-md-4">
      <label for="inputState" class="col-form-label">State</label>
      <select id="inputState" class="form-control">Choose</select>
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip" class="col-form-label">Zip</label>
      <input type="text" class="form-control" id="inputZip">
    </div>
  </div>
  <div class="form-group">
    <div class="form-check">
      <label class="form-check-label">
        <input class="form-check-input" type="checkbox"> Check me out
      </label>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Sign in</button>
</form>

```html
<form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4" class="col-form-label">Email</label>
      <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4" class="col-form-label">Password</label>
      <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress" class="col-form-label">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
  <div class="form-group">
    <label for="inputAddress2" class="col-form-label">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity" class="col-form-label">City</label>
      <input type="text" class="form-control" id="inputCity">
    </div>
    <div class="form-group col-md-4">
      <label for="inputState" class="col-form-label">State</label>
      <select id="inputState" class="form-control">Choose</select>
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip" class="col-form-label">Zip</label>
      <input type="text" class="form-control" id="inputZip">
    </div>
  </div>
  <div class="form-group">
    <div class="form-check">
      <label class="form-check-label">
        <input class="form-check-input" type="checkbox"> Check me out
      </label>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Sign in</button>
</form>
```

## Example 14
<form>
  <div class="form-row">
    <div class="col-7">
      <input type="text" class="form-control" placeholder="City">
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="State">
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="Zip">
    </div>
  </div>
</form>

```html
<form>
  <div class="form-row">
    <div class="col-7">
      <input type="text" class="form-control" placeholder="City">
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="State">
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="Zip">
    </div>
  </div>
</form>
```

## Example 15
<form>
  <div class="form-row align-items-center">
    <div class="col-auto">
      <label class="sr-only" for="inlineFormInput">Name</label>
      <input type="text" class="form-control mb-2 mb-sm-0" id="inlineFormInput" placeholder="Jane Doe">
    </div>
    <div class="col-auto">
      <label class="sr-only" for="inlineFormInputGroup">Username</label>
      <div class="input-group mb-2 mb-sm-0">
        <div class="input-group-addon">@</div>
        <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Username">
      </div>
    </div>
    <div class="col-auto">
      <div class="form-check mb-2 mb-sm-0">
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox"> Remember me
        </label>
      </div>
    </div>
    <div class="col-auto">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</form>

```html
<form>
  <div class="form-row align-items-center">
    <div class="col-auto">
      <label class="sr-only" for="inlineFormInput">Name</label>
      <input type="text" class="form-control mb-2 mb-sm-0" id="inlineFormInput" placeholder="Jane Doe">
    </div>
    <div class="col-auto">
      <label class="sr-only" for="inlineFormInputGroup">Username</label>
      <div class="input-group mb-2 mb-sm-0">
        <div class="input-group-addon">@</div>
        <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Username">
      </div>
    </div>
    <div class="col-auto">
      <div class="form-check mb-2 mb-sm-0">
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox"> Remember me
        </label>
      </div>
    </div>
    <div class="col-auto">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</form>
```

## Example 16
<form>
  <div class="form-row align-items-center">
    <div class="col-sm-3">
      <label class="sr-only" for="inlineFormInputName">Name</label>
      <input type="text" class="form-control mb-2 mb-sm-0" id="inlineFormInputName" placeholder="Jane Doe">
    </div>
    <div class="col-sm-3">
      <label class="sr-only" for="inlineFormInputGroupUsername">Username</label>
      <div class="input-group mb-2 mb-sm-0">
        <div class="input-group-addon">@</div>
        <input type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="Username">
      </div>
    </div>
    <div class="col-auto">
      <div class="form-check mb-2 mb-sm-0">
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox"> Remember me
        </label>
      </div>
    </div>
    <div class="col-auto">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</form>

```html
<form>
  <div class="form-row align-items-center">
    <div class="col-sm-3">
      <label class="sr-only" for="inlineFormInputName">Name</label>
      <input type="text" class="form-control mb-2 mb-sm-0" id="inlineFormInputName" placeholder="Jane Doe">
    </div>
    <div class="col-sm-3">
      <label class="sr-only" for="inlineFormInputGroupUsername">Username</label>
      <div class="input-group mb-2 mb-sm-0">
        <div class="input-group-addon">@</div>
        <input type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="Username">
      </div>
    </div>
    <div class="col-auto">
      <div class="form-check mb-2 mb-sm-0">
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox"> Remember me
        </label>
      </div>
    </div>
    <div class="col-auto">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</form>
```

## Example 17
<form class="form-inline">
  <label class="sr-only" for="inlineFormInputName2">Name</label>
  <input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="Jane Doe">

  <label class="sr-only" for="inlineFormInputGroupUsername2">Username</label>
  <div class="input-group mb-2 mr-sm-2 mb-sm-0">
    <div class="input-group-addon">@</div>
    <input type="text" class="form-control" id="inlineFormInputGroupUsername2" placeholder="Username">
  </div>

  <div class="form-check mb-2 mr-sm-2 mb-sm-0">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox"> Remember me
    </label>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>

```html
<form class="form-inline">
  <label class="sr-only" for="inlineFormInputName2">Name</label>
  <input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="Jane Doe">

  <label class="sr-only" for="inlineFormInputGroupUsername2">Username</label>
  <div class="input-group mb-2 mr-sm-2 mb-sm-0">
    <div class="input-group-addon">@</div>
    <input type="text" class="form-control" id="inlineFormInputGroupUsername2" placeholder="Username">
  </div>

  <div class="form-check mb-2 mr-sm-2 mb-sm-0">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox"> Remember me
    </label>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

## Example 18
<form class="form-inline">
  <div class="form-group">
    <label for="inputPassword6">Password</label>
    <input type="password" id="inputPassword6" class="form-control mx-sm-3" aria-describedby="passwordHelpInline">
    <small id="passwordHelpInline" class="text-muted">
      Must be 8-20 characters long.
    </small>
  </div>
</form>

```html
<form class="form-inline">
  <div class="form-group">
    <label for="inputPassword6">Password</label>
    <input type="password" id="inputPassword6" class="form-control mx-sm-3" aria-describedby="passwordHelpInline">
    <small id="passwordHelpInline" class="text-muted">
      Must be 8-20 characters long.
    </small>
  </div>
</form>
```

## Example 19
<form>
  <fieldset disabled>
    <div class="form-group">
      <label for="disabledTextInput">Disabled input</label>
      <input type="text" id="disabledTextInput" class="form-control" placeholder="Disabled input">
    </div>
    <div class="form-group">
      <label for="disabledSelect">Disabled select menu</label>
      <select id="disabledSelect" class="form-control">
        <option>Disabled select</option>
      </select>
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox"> Can't check this
      </label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </fieldset>
</form>

```html
<form>
  <fieldset disabled>
    <div class="form-group">
      <label for="disabledTextInput">Disabled input</label>
      <input type="text" id="disabledTextInput" class="form-control" placeholder="Disabled input">
    </div>
    <div class="form-group">
      <label for="disabledSelect">Disabled select menu</label>
      <select id="disabledSelect" class="form-control">
        <option>Disabled select</option>
      </select>
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox"> Can't check this
      </label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </fieldset>
</form>
```
