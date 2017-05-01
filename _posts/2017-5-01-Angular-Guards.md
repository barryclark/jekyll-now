Most applications will have areas that have restricted access depending on who the user is. Guards help you enforce this logic.

The `CanActivate` guard is where we will put this logic.

# Guard your restricted features 

Without guards, every route in your application is open and available to every type of user.

We will use the `CanActivate()` guard to redirect unauthorized users trying to activate our restricted route.

The guard we are going to create will be a general purpose guard that checks if the user is logged in.

### Basic guard
create a file called `my-guard.service.ts`
or use the CLI `ng g guard my-guard`

```javascript
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
  export class MyGuard implements CanActivate {
    canActivate() {
      console.log('MyGuard#canActivate called');
      return true;
    }
  }
```
This guard will just output a log to the console when a route it is told to protect is activating. The `return true` is what allows the route to be activated.

### Add our guard to a route
```javascript
import { MyGuard } from '../my-guard.service';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [MyGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'crises', component: ManageCrisesComponent },
          { path: 'heroes', component: ManageHeroesComponent },
          { path: '', component: AdminDashboardComponent }
        ],
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
```
Now our Admin routes are protected by our guard.
