import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouterLink, RouteParams } from 'angular2/router';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { TrimPipe } from '../shared/pipes/trim.pipe';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'user-detail',
  providers: [DataService],
  template: `
    <div class="user-detail view indent">
      <div class="container">
        <h3><span class="glyphicon glyphicon-shopping-cart"></span>&nbsp;&nbsp;Orders</h3>
        <br />
          <table class="table table-striped table-hover">
              <thead>
                  <tr>
                      <th sort-by="firstName" (sorted)="sort($event)">First Name</th>
                      <th sort-by="lastName" (sorted)="sort($event)">Last Name</th>
                      <th sort-by="address" (sorted)="sort($event)">Address</th>
                      <th sort-by="city" (sorted)="sort($event)">City</th>
                      <th sort-by="state.name" (sorted)="sort($event)">State</th>
                      <!-- Or you can do this directly rather than using sort-by directive -->
                      <th (click)="sort('orderTotal')">Order Total</th>
                  </tr>
              </thead>
              <tbody>
                  <tr *ngFor="#user of filteredUsers">
                      <td>
                        <a [routerLink]="['UserDetail',{id:user.id}]">
                          {{ user.firstName | capitalize }}
                        </a>
                      </td>
                      <td>{{ user.lastName | capitalize }}</td>
                      <td>{{ user.address }}</td>
                      <td>{{ user.city | trim }}</td>
                      <td>{{ user.state.name }}</td>
                      <td>{{ user.orderTotal | currency:'USD':true }}</td>
                  </tr>
                  <tr [hidden]="filteredUsers.length">
                      <td>&nbsp;</td>
                      <td colspan="6">No Records Found</td>
                  </tr>
              </tbody>
          </table>
        <br/>
        <a [routerLink]="['UserList']" >View all Users</a>
      </div>
    </div>
  `,
  directives: [CORE_DIRECTIVES, RouterLink],
  pipes: [CapitalizePipe, TrimPipe]
})
export class UserDetailComponent {

  title: string = 'User Detail';
  filteredUsers: any[] = [];
  filteredUser: any = { id: 1 };

    constructor(private dataService: DataService, private _routeParams: RouteParams) {

    }

    ngOnInit() {
    console.log('this._routeParams.get("id")');
    console.log(this._routeParams.get('id'));

    let id = parseInt(this._routeParams.get('id'), 10);
    this.dataService.getUserDetail().subscribe((user: any[]) => {
      console.log('fucking test');
      console.log(user);
      this.filteredUsers = user.filter(user => user.id === id);
      this.filteredUser = this.filteredUsers[0];
      console.log(user);
      console.log(this.filteredUser);
    });
    }
}
