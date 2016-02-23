import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouterLink } from 'angular2/router';
//import { Observable } from 'rxjs/Observable';
import { DataService } from '../shared/services/data.service';
import { Sorter } from '../shared/sorter';
import { FilterTextboxComponent } from './filterTextbox.component';
import { SortByDirective } from '../shared/directives/sortby.directive';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { TrimPipe } from '../shared/pipes/trim.pipe';

@Component({
  selector: 'user-list',
  providers: [DataService],
  template: `
    <div class="user-list view indent">
        <div class="container">
            <header>
                <h3>
                    <span class="glyphicon glyphicon-user"></span>
                    {{ title }}
                </h3>
            </header>
            <br />
            <div class="row">
                <div class="col-md-10">
                    <div class="navbar">
                        <ul class="nav navbar-nav">
                            <li class="toolbar-item">
                                <a (click)="changeDisplayMode('Card')" [class.active]="!listDisplayModeEnabled">
                                    <span class="glyphicon glyphicon-th-large"></span> Card View
                                </a>
                            </li>
                            <li class="toolbar-item">
                                <a (click)="changeDisplayMode('List')" [class.active]="listDisplayModeEnabled">
                                    <span class="glyphicon glyphicon-align-justify"></span> List View
                                </a>
                            </li>
                        </ul>
                        <filter-textbox class="navbar-right"
                         (changed)="filterChanged($event)"></filter-textbox>
                    </div>
                </div>
            </div>
            <a [routerLink]="['Home']">Home</a>
            <div class="container">
                <div class="row card-container" [hidden]="listDisplayModeEnabled">
                    <div class="col-sm-6 col-md-4 col-lg-3" *ngFor="#user of filteredUsers">
                        <div class="card">
                            <div class="card-header">
                                <a [routerLink]="['UserDetail',{id:user.id}]" class="white">{{user.firstName | capitalize }} {{ user.lastName | capitalize }}
                                    <i class="icon-edit icon-white editIcon"></i></a>
                            </div>
                            <div class="card-body">
                                <div class="clearfix">
                                    <div class="pull-left card-body-right">
                                        <div class="card-body-content">{{user.city | trim }}, {{user.state.name}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div [hidden]="filteredUsers.length">
                        No Records Found
                    </div>
                </div>
                <div class="row grid-container" [hidden]="!listDisplayModeEnabled">
                    <div class="col-md-10">
                        <div class="table">
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
                                        <td><a [routerLink]="['UserDetail',{id:user.id}]">{{ user.firstName | capitalize }}</a></td>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `,
  directives: [CORE_DIRECTIVES, RouterLink, FilterTextboxComponent, SortByDirective],
  pipes: [CapitalizePipe, TrimPipe]
})
export class UserListComponent {

  title: string;
  filterText: string;
  listDisplayModeEnabled: boolean;
  users: any[] = [];
  filteredUsers: any[] = [];
  sorter: Sorter;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.title = 'UserList';
    this.filterText = 'Filter Users:';
    this.listDisplayModeEnabled = false;

    this.dataService.getUserList()
      .subscribe((users: any[]) => {
        this.users = this.filteredUsers = users;
      });

    this.sorter = new Sorter();
  }

  changeDisplayMode(mode: string) {
    this.listDisplayModeEnabled = (mode === 'List');
  }

  filterChanged(data: string) {
    if (data && this.users) {
      data = data.toUpperCase();
      let props = ['firstName', 'lastName', 'address', 'city', 'orderTotal'];
      let filtered = this.users.filter(item => {
        let match = false;
        for (let prop of props) {
          if (item[prop].toString().toUpperCase().indexOf(data) > -1) {
            match = true;
            break;
          }
        };
        return match;
      });
      this.filteredUsers = filtered;
    } else {
      this.filteredUsers = this.users;
    }
  }

  sort(prop: string) {
    //Check for complex type such as 'state.name'
    if (prop && prop.indexOf('.')) {

    }
    this.sorter.sort(this.filteredUsers, prop);
  }

}
