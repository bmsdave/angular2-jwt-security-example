import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'home',
  template: require('./home.component.html')
})

export class Home {
  token: string;

  constructor(
      private AuthService: AuthService,
      private router: Router
    ) {
    this.AuthService = AuthService;
    this.router = router;
  }

  ngOnInit() {
    if (!this.AuthService.isAuth()) {
      this.router.navigate(['Login']);
    } else {
      this.token = this.AuthService.getJwt();
    }
  }

}
