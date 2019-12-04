---
Category: post
title: Learning Journal for Angular Step 1
---
## Angular Event Emitter and Service

### Code Example:

Video: https://www.youtube.com/watch?v=Fdf5aTYRW0E

child component: account-form.html ***(click) to bind the data with the .ts file***
```
 <div class="form-check m-2">
          <input type="checkbox" class="form-check-input" id="isEmployee"
          formControlName="isEmployee" (click) = "passIsEmployeeState()">
          <label class="form-check-label" for="isEmployee">isEmployee</label>
        </div>
```
child component: account-form.ts ***create an output decorator***
```
@Output() isEmployeeState = new EventEmitter<boolean>();

\\ other codes

passIsEmployeeState() {
    this.myAccount.isEmployee = !this.myAccount.isEmployee;
    this.isEmployeeState.emit(this.myAccount.isEmployee);
  }

```

parent component: account-editor.html ***similar to React attributes, getting the @Output (showIsEmployee)***
```
<p>account-editor works!</p>
<am-account-form [myAccount]="account" (myEvent)="showTimesClicked($event)" (isEmployeeState)= "showIsEmployee($event)"></am-account-form>
```
parent component: account-editor.ts

```
this.account = this.accountsService.get(this.accountId);
\\\other codes
showIsEmployee(isEmployee:boolean) {

    console.log('isEmployee', isEmployee);
    this.account.isEmployee == isEmployee;
  }

```

Service: accounts.service.ts ***parent component sending the data to the service*** (in this case it has been created while creating the form)

```
get(id: number): Account {
    for (let ii = 0, len = this.accounts.length; ii < len; ii++) {
      if (this.accounts[ii].id === id) {
        return this.accounts[ii];
      }
    }

    return null;
  }
```
Finally another parent got the data by calling ***the service***
```
 ngOnInit() {
    this.accounts = this.accountsService.getAll();
  }
```

## Angular Form Tags and Form Module
Without Angular Tags, the bootstrap form won't work.

In order to create a form in Angular, follow the steps:

Step1: Finding out the module (the top level) and import the form modules. In this case it is the ***accounts.module***

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountsRoutingModule } from './accounts-routing.module';

import * as components from './components';
@NgModule({
  declarations: [
    components.AccountListComponent,
    components.AccountEditorComponent,
    components.NotFoundComponent,
    components.AccountFormComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountsModule { }

```

Step 3: deciding the parent component for the form. In this case it is the ***account-editor*** 

```
<p>account-editor works!</p>
<am-account-form [myAccount]="account" (myEvent)="showTimesClicked($event)" (isEmployeeState)= "showIsEmployee($event)"></am-account-form>

```

Step 2: In the target ***.ts*** import the form package. In this case it is the ***account-form*** . In account-form all words referring to Account needs to be ***myAccount*** because it is defined in the parent component. Without it, the info about account/accounts won't be found. The info about account is in ***service*** and parent component call the data back.

```
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
\\\other codes
accountForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log(this.myAccount);

    this.accountForm = this.formBuilder.group({
      isEmployee:[this.myAccount.isEmployee, Validators.required],
      name: [this.myAccount.name, Validators.required],
      email: [
        this.myAccount.email,
        Validators.compose([Validators.required, Validators.email])
      ]
    });
  }

// the following the related methods for the form buttons
cancel() {
    this.accountForm.patchValue({
      name: this.myAccount.name,
      email: this.myAccount.email
    });
  }

  reset() {
    this.accountForm.patchValue({
      name: '',
      email: ''
    });
  }

  save() {
    const value = this.accountForm.value;
    this.myAccount.name = value.name;
    this.myAccount.email = value.email;
  }

```

Step 3: In the targe ***.html*** file use a tag(decorator?) to bind the data

```
<form [formGroup]="accountForm" (ngSubmit)="save()">
\\other inputs

<button type="submit"
         [disabled]="accountForm.invalid"
         class="btn btn-primary">Save</button>
        <button type="button"
         [disabled]="accountForm.pristine"
         (click)="cancel()"
         class="btn">Cancel</button>
        <button type="button"
         (click)="reset()"
         class="btn">Reset</button>

</form>
```
p.s. .invalid(is not valid) and pristine(not modified) are all AngularJS validation methods. More info are at https://www.w3schools.com/angular/angular_validation.asp

## Angular Router

### Set up routing module

while creating a new project, Angular CLI will ask if angular routing is necessary. The answer is YES if routers will be used 

In this case, the app-routing.module.ts set up the logic 

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'accounts',
  //import router from the children listed in accounts.module
  loadChildren: () => import('./accounts/accounts.module')
    .then(data => data.AccountsModule)
},
{ path: '', redirectTo: 'accounts', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### router outlet
In the app.html use the router outlet

***
<a routerLink="accounts/list">List</a>
<router-outlet></router-outlet>
***

### paths
In this case, the logic is from accounts.module, so it created another angular routing here
```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as components from './components';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: components.AccountListComponent },
  { path: ':accountId', component: components.AccountEditorComponent },
  { path: '**', component: components.NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
```
## Angular Unit Test

### Case 1: Using reverse as an example

Key 1: Use a function and replace the parameters if the tests are getting redundant
![reverse test](https://github.com/EmilyStacy-droid/EmilyStacy-droid.github.io/blob/master/images/IMG-5335.JPG)

Key 2: Follow Red-Green-Refactor principle

![better test](https://github.com/EmilyStacy-droid/EmilyStacy-droid.github.io/blob/master/images/IMG-5338.JPG)

key 3: focus on testing form validation and services
![adding else after tests](https://github.com/EmilyStacy-droid/EmilyStacy-droid.github.io/blob/master/images/IMG-5339.JPG)

### Case 2: Cart Service
Key4: follow the syntax!
![newSyntax](https://github.com/EmilyStacy-droid/EmilyStacy-droid.github.io/blob/master/images/IMG-5341.JPG)

Key 5: If doing tests for asynchronous function, it is helpful to set up a time-out to make sure the function is returned after invoked
![setTimeOut](https://github.com/EmilyStacy-droid/EmilyStacy-droid.github.io/blob/master/images/IMG-5343.JPG)

![iscreated](https://github.com/EmilyStacy-droid/EmilyStacy-droid.github.io/blob/master/images/IMG-5344.JPG)

Key 6: Check isValid
![isValid](https://github.com/EmilyStacy-droid/EmilyStacy-droid.github.io/blob/master/images/IMG-5345.JPG)



