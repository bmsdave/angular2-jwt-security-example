import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';
import {Title} from './services/title';
import {XLarge} from './directives/x-large';
import {LoggedInOutlet} from '../logged_in_outler';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    ...FORM_DIRECTIVES,
    XLarge,
    LoggedInOutlet
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./home.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./home.html')
})
export class Home {
  // Set our default values
  data = { value: '' };
  jwt: string;
  router: any;
  // TypeScript public modifiers
  constructor(router: Router) {
    this.router = router;
    // We get the JWT from localStorage.
    // We set them as instance variables to be able to use it in this
    this.jwt = localStorage.getItem('jwt');
    // We also store the decoded JSON from this JWT

  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

}
