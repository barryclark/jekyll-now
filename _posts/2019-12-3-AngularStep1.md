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

## Angular Router

## Angular Unit Test
