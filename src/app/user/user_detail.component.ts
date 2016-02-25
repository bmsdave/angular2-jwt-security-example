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
                      <th sort-by="id" (sorted)="sort($event)">id</th>
                      <th sort-by="username" (sorted)="sort($event)">username</th>
                      <th sort-by="person" (sorted)="sort($event)">person</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>
                        <a [routerLink]="['UserDetail',{username:userDetail.username}]">
                          {{ userDetail.id  }}
                        </a>
                      </td>
                      <td>{{ userDetail.username }}</td>
                      <td>{{ userDetail.person }}</td>
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
export class UserDetail {

  title: string = 'User Detail';
  filteredUsers: any;
  userDetail: any = { id: 1 };

    constructor(private dataService: DataService, private _routeParams: RouteParams) {

    }

    ngOnInit() {
    let username = this._routeParams.get('username');
    this.dataService.getUserDetail(username).subscribe((user: any) => {
    this.filteredUsers = user;
    this.userDetail = this.filteredUsers;
    });
    }
}
