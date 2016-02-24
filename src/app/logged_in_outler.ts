import {Directive} from 'angular2/core';
import {RouterOutlet} from 'angular2/router';
import {PromiseWrapper} from 'angular2/src/facade/async';
import {LoginComponent} from './login/login.component';

// We specify that this outlet will be called when the `loggedin-router-outlet` tag is used.
@Directive({ selector: 'loggedin-router-outlet' })
// We inherit from the default RouterOutlet
export class LoggedInOutlet extends RouterOutlet {

  // We call the parent constructor
  constructor(viewContainer, compiler, router, injector) {
    super(viewContainer, compiler, router, injector);
  }

  canActivate(instruction) {
    // var url = this._router.lastNavigationAttempt;
    var url = '';
    // If the user is going to a URL that requires authentication and is not logged in (meaning we don't have the JWT saved in localStorage), we redirect the user to the login page.
    console.log(url);
    console.log(localStorage.getItem('jwt'));
    if (url !== '/login' && !localStorage.getItem('jwt')) {
      instruction.component = LoginComponent;
    }
    return PromiseWrapper.resolve(true);
  }
}
