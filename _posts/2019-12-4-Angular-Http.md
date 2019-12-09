---
Category: post
title: Learning Journal for Angular Http
---

## Angular sample project (in Chinese)
1.https://angular.cn/start (including directives and event emitter)

2.https://angular.cn/start/routing (routing)

3.https://angular.cn/start/data (cart service)


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

//use the environment.ts file to protect confidential data. 

It is a good place to post userName and baseURL.

The production needs to be false! //

  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }
  
  //When httpRequest is made, the returning subject is a general json object. 
  
  If we have a class for the object, like Account. It will cause an error and we cannot use the methods.
  
  The best way is to set up an interface Iaccount that is a POJO and let it return the interface object //

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

 Note 1: In TypeScript, interfaces is NOT a type, but a representation of an object. The interface describes the response. It DOES   NOT  create a JS class for users. It just validates the ID and the properties. The object that is receiving has a SHAPE. This concept is extremely important and helpful while doing the ***get,post,update methods***
 
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
if interested: compare HTTP requests in Angular and React
https://blog.bitsrc.io/making-https-request-in-react-3a2777700c5d


## Angular Promises v.s. Observable
https://www.youtube.com/watch?v=JFx3amVu1Yg

Promise                                  | Observable
-----------------------------------------| -------------
NOT lazy(load without  "then")           | lazy (only happen when subscribed)
canNOT be cancelled                      | Can be cancelled

## Angular Intercepter

The basic introduction about Angular intercepter: https://angular.io/api/common/http/HttpInterceptor

In this case using HttpIntercepter to save the header so that we don’t need to have headers for authorization while getting or posting

Here is the auth.intercepter.ts file
```
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.shouldAddAuthorizationHeaders(req)) {
      return next.handle(req);
    }

    return next.handle(req.clone({
      setHeaders: {
        Authorization: environment.username
      }
    }));
  }

  private shouldAddAuthorizationHeaders(req: HttpRequest<any>): boolean {
    return true;
  }
}
```

## Angular Testing HTTP Requests

1. describe vs. fdescribe: ***fdescribe*** let ***npm test*** only run this one test


2. While testing https, always set up the request in ***after each*** to make sure the call will happen and the data can be resolved (or rejected). The benefits: (1)we only send the request ONCE (2) to avoid that the result is ALWAYS true

 
3. We are creating the FAKEHTTPService class in ***fake-accounts.service.js*** with hard coding data for the test class, not the real class

```
import { Injectable } from '@angular/core';
import { Account } from '../models';

export class FakeAccountsService {
  private accounts: Account[] = [
    new Account({
      id: 1,
      name: 'Skyler',
      email: 'skyler.tweedie@improving.com',
      isEmployee: true,
      departmentId: 0,
      phoneNumbers: []
    }),
    new Account({
      id: 2,
      name: 'Skyler',
      email: 'skyler.tweedie@improving.com',
      isEmployee: true,
      departmentId: 0,
      phoneNumbers: []
    }),
    new Account({
      id: 3,
      name: 'Skyler',
      email: 'skyler.tweedie@improving.com',
      isEmployee: true,
      departmentId: 0,
      phoneNumbers: []
    })
  ];

  getAll(): Promise<Account[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.accounts);
      }, 1000);
      // reject(new Error('Some error'))
    });
  }

  get(id: number): Promise<Account> {
    return new Promise((resolve, reject) => {
      for (let ii = 0, len = this.accounts.length; ii < len; ii++) {
        if (this.accounts[ii].id === id) {

          setTimeout(() => {
            resolve(this.accounts[ii]);
          }, 5000);

          return;
        }
      }

      // return Promise.reject(new Error('Account could not be found'));
      resolve(null);
    });
  }

  create(account: Account): Promise<Account> {
    account.id = this.accounts.length + 1;
    this.accounts.push(account);

    return Promise.resolve(account);
  }

  update(account: Account): Promise<Account> {
    return Promise.resolve(account);
  }

  delete(account: Account): Promise<void> {
    return Promise.resolve();
  }
}

```

Here are the tests
```
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AccountsService } from './accounts.service';
import { IAccount } from '../models';
import { environment } from '../../environments/environment';

describe('AccountsService', () => {
  let accountsService: AccountsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(inject(
    [AccountsService, HttpTestingController],
    (_accountsService_: AccountsService, _httpTestingController_: HttpTestingController) => {
    accountsService = _accountsService_;
    httpTestingController = _httpTestingController_;
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getAll', () => {
    it('should send request to directory/accounts', done => {

      const fakeAccounts: IAccount[] = [{
        id: 1,
        name: 'Fake Person',
        email: 'fake.email@something.com',
        isEmployee: true,
        departmentId: null,
        phoneNumbers: [],
      }, {
        id: 2,
        name: 'Fake Person',
        email: 'fake.email@something.com',
        isEmployee: true,
        departmentId: null,
        phoneNumbers: [],
      }];

      accountsService.getAll()
        .then(accounts => {
          expect(accounts.length).toEqual(2);
          done();
        })
        .catch(error => done.fail(error));

      httpTestingController
        .expectOne(`${environment.baseUrl}/directory/accounts`)
        .flush(fakeAccounts);
    });

    it('should throw error when request fails', done => {
      accountsService.getAll()
        .then(accounts => {
          done.fail('request should have thrown error');
        })
        .catch(error => {
          done();
        });

      httpTestingController
        .expectOne(`${environment.baseUrl}/directory/accounts`)
        .error(null);
    });
  });

  describe('get', () => {
    it('should send request to directory/accounts/:accountId', done => {

      const fakeAccount: IAccount = {
        id: 1,
        name: 'Fake Person',
        email: 'fake.email@something.com',
        isEmployee: true,
        departmentId: null,
        phoneNumbers: [],
      };

      accountsService.get(fakeAccount.id)
        .then(account => {
          expect(account.id).toEqual(fakeAccount.id);
          done();
        })
        .catch(error => done.fail(error));

      httpTestingController
        .expectOne(`${environment.baseUrl}/directory/accounts/${fakeAccount.id}`)
        .flush(fakeAccount);
    });

    it('should throw error when request fails', done => {
      accountsService.get(123)
        .then(accounts => {
          done.fail('request should have thrown error');
        })
        .catch(error => {
          done();
        });

      httpTestingController
        .expectOne(`${environment.baseUrl}/directory/accounts/123`)
        .error(null);
    });

    it('should return null without making request with invalid account id', done => {
      accountsService.get(-1)
        .then(account => {
          expect(account).toBeNull();
          done();
        })
        .catch(error => done.fail(error));

      httpTestingController
        .expectNone(`${environment.baseUrl}/directory/accounts/-1`);
    });
  });
});

```
