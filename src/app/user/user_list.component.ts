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
  templateUrl: './views/user/user_list.component.html',
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
    }
    else {
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
