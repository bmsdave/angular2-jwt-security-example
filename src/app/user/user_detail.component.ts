import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouterLink, RouteParams } from 'angular2/router';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { TrimPipe } from '../shared/pipes/trim.pipe';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'user-detail',
  providers: [DataService],
  templateUrl: 'app/user/user_detail.component.html',
  directives: [CORE_DIRECTIVES, RouterLink],
  pipes: [CapitalizePipe, TrimPipe]
})
export class UserDetailComponent {

   title: string = 'User Detail';
   filteredUsers: any[] = [];
   filteredUser: any;

    constructor(private dataService: DataService, private _routeParams: RouteParams) {

    }

    ngOnInit() {
      console.log("this._routeParams.get('id')");
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
