---
Category: post
title: Learning Journal for Angular Http
---

## Angular Http Module

### Angular Way

1. Add HTTP module under the APP Module because ***in our design all providers are set in the root level*** for testing convenience

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
2. We also need the module in ***service.ts*** (Services are @injectable!)
```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account, IAccount } from '../models';

import { environment } from '../../environments/environment';

// that is why app.module needs a HTTP module too

@Injectable({
  providedIn: 'root'
})

export class AccountsService {

//use the environment.ts file to protect confidential data. It is a good place to post userName and baseURL. The production needs to be false! 

  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }
  
  //When httpRequest is made, the returning subject is a general json object. If we have a class for the object, like Account. It will cause an error and we cannot use the methods. The best way is to set up an interface Iaccount that is a POJO and let it return the interface object 

  getAll(): Promise<Account[]> {
    return this.httpClient.get<IAccount[]>(`${this.baseUrl}/directory/accounts`)
      .toPromise()
      .then(accounts => (accounts || []).map(account => new Account(account)));
  }

  get(accountId: number): Promise<Account> {
    if (accountId <= 0 || isNaN(accountId)) {
      return Promise.resolve(null);
    }

    return this.httpClient.get<IAccount>(`${this.baseUrl}/directory/accounts/${accountId}`)
      .toPromise()
      .then(account => new Account(account));
  }

  create(account: Account): Promise<Account> {
    return this.httpClient.post<IAccount>(`${this.baseUrl}/directory/accounts`, account)
      .toPromise()
      .then(response => new Account(response));
  }

  update(account: Account): Promise<Account> {
    return this.httpClient.put<IAccount>(`${this.baseUrl}/directory/accounts/${account.id}`, account)
      .toPromise()
      .then(response => new Account(response));
  }

  delete(account: Account): Promise<void> {
    return this.httpClient.delete(`${this.baseUrl}/directory/accounts/${account.id}`)
      .toPromise()
      .then(() => { });
  }
}

```
3.When service.js changes, the other classes that call these methods need to be changed to. Use  ***account-list.component.ts*** as an example:

```
import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../../services';
import { Account } from '../../../models';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'am-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts: Account[];

  constructor(
    private accountsService: AccountsService,
    private cartService: CartService
  ) { }

///the keyword then replace the equal sign
  ngOnInit() {
    this.accountsService.getAll()
      .then(accounts => {
        this.accounts = accounts;
      })
      .catch(error => {

      });
  }

  remove(account: Account) {
    if (confirm(`Are you sure you want to remove ${account.getDescription()}?`)) {
      this.accountsService.delete(account)
        .then(() => {
          console.log('account deleted');
        });
    }
  }
}
```

 (1) Note 1: In TypeScript, interfaces is NOT a type, but a representation of an object. The interface describes the response. It DOES   NOT  create a JS class for users. It just validates the ID and the properties. The object that is receiving has a SHAPE. This concept is extremely important and helpful while doing the ***get,post,update methods***
 
In JavaScript, it won’t be a problem. The returning object can be converted to JS class easily.

Creating interfaces in models in this case
```
export interface IAccount {
  id: number;
  name: string;
  email: string;
  isEmployee: boolean;
  departmentId: number;
  phoneNumbers: IPhoneNumber[];
}

export interface IPhoneNumber {
  number: string;
  type: string;
}
```
And then
```
import { IAccount, IPhoneNumber } from './iaccount';

export class Account implements IAccount {
  id: number;
  name: string;
  email: string;
  isEmployee: boolean;
  departmentId: number;
  phoneNumbers: IPhoneNumber[];

  getDescription(): string {
    return `${this.name} <${this.email}>`;
  }

  constructor(account: IAccount) {
    if (account) {
      this.id = account.id;
      this.name = account.name;
      this.email = account.email;
      this.isEmployee = account.isEmployee;
      this.departmentId = account.departmentId;
      this.phoneNumbers = account.phoneNumbers;
    }
  }
}
```


## Angular Promises v.s. Observable
