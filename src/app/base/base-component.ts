import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {AuthService} from '../auth/auth-service';
import {User} from '../user/user';

@Component({
  selector: 'base',
  template: `
    <div>
      <span x-large>Your jwt</span>
      <h1>me.is_auth: {{me.is_auth}}</h1>
      <pre>{{ token | json }}</pre>
    </div>
  `
})
export class Base {
  token: string;
  me: User = new User({username: null});

  constructor(
    private AuthService: AuthService,
    private router: Router
    ) {
    this.AuthService = AuthService;
    this.router = router;
  }

  ngOnInit() {
      this.AuthService.me.subscribe(me => this.me = me);
      this.AuthService.fetchMe();
      this.AuthService.isAuth();
    // if (!this.AuthService.isAuth()) {
    //   this.router.navigate(['Login']);
    // } else {
    //   this.token = this.AuthService.getJwt();
    // }
  }

}
