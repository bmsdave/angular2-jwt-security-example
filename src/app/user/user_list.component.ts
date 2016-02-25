import { Component } from 'angular2/core';
//import { Observable } from 'rxjs/Observable';

import { Sorter } from '../shared/sorter';
import { FilterTextboxComponent } from './filterTextbox.component';
import { SortByDirective } from '../shared/directives/sortby.directive';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { TrimPipe } from '../shared/pipes/trim.pipe';



import {AuthService} from '../shared/services/auth.service';
import { DataService } from '../shared/services/data.service';
import {
CORE_DIRECTIVES,
FORM_DIRECTIVES,
FormBuilder,
ControlGroup,
Validators,
AbstractControl,
Control
} from 'angular2/common';
import {Http, Headers} from 'angular2/http';
import {Router, RouterLink} from 'angular2/router';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';


@Component({
  selector: 'user-list',
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
            <a [routerLink]="['Home']">Home</a>
            <div class="container">
                <div class="row card-container">
                    <div class="col-sm-6 col-md-4 col-lg-3" *ngFor="#user of filteredUsers">
                        <md-card>
                          <md-card-title>
                            <md-card-title-text>
                              <span class="md-headline"><a [routerLink]="['UserDetail',{username:user.username}]">
                                {{user.username}}<i class="icon-edit icon-white editIcon"></i></a>
                              </span>
                              <span class="md-subhead" *ngIf="user.person">{{user.person.first_name}}<br>
                                {{user.person.last_name}}
                              </span>
                            </md-card-title-text>
                            <md-card-title-media>
                              <div class="md-media-sm card-media"></div>
                            </md-card-title-media>
                          </md-card-title>
                        </md-card>
                    </div>
                    <div [hidden]="filteredUsers.length">
                        No Records Found
                    </div>
                </div>
            </div>
        </div>
    </div>
  `,
  directives: [CORE_DIRECTIVES, RouterLink, FilterTextboxComponent, SortByDirective],
  providers: [Http, DataService],
  pipes: [CapitalizePipe, TrimPipe]
})
export class UserList {

  title: string;
  filterText: string;
  listDisplayModeEnabled: boolean;
  users: any[] = [];
  filteredUsers: any[] = [];
  sorter: Sorter;

  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService
    ) {

    this.dataService = dataService;
     }

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
      let props = ['id', 'username', 'person'];
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
