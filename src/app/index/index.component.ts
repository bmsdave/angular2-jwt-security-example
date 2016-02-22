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
  selector: 'index',
  providers: [DataService],
  templateUrl: 'app/index/index.component.html',
  directives: [CORE_DIRECTIVES, RouterLink, FilterTextboxComponent, SortByDirective],
  pipes: [CapitalizePipe, TrimPipe]
})
export class IndexComponent {

  title: string;
  filterText: string;
  listDisplayModeEnabled: boolean;
  index: any[] = [];
  filteredIndex: any[] = [];
  sorter: Sorter;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.title = 'Index';
    this.filterText = 'Filter Index:';
    this.listDisplayModeEnabled = false;

    this.dataService.getIndex()
      .subscribe((index: any[]) => {
        this.index = this.filteredIndex = index;
      });

    this.sorter = new Sorter();
  }

  changeDisplayMode(mode: string) {
    this.listDisplayModeEnabled = (mode === 'List');
  }

  filterChanged(data: string) {
    if (data && this.index) {
      data = data.toUpperCase();
      let props = ['firstName', 'lastName', 'address', 'city', 'orderTotal'];
      let filtered = this.index.filter(item => {
        let match = false;
        for (let prop of props) {
          //console.log(item[prop] + ' ' + item[prop].toUpperCase().indexOf(data));
          if (item[prop].toString().toUpperCase().indexOf(data) > -1) {
            match = true;
            break;
          }
        };
        return match;
      });
      this.filteredIndex = filtered;
    }
    else {
      this.filteredIndex = this.index;
    }
  }

  deleteCustomer(id: number) {

  }

  sort(prop: string) {
    //Check for complex type such as 'state.name'
    if (prop && prop.indexOf('.')) {

    }
    this.sorter.sort(this.filteredIndex, prop);
  }

}
