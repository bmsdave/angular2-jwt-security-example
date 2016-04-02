import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {AuthService} from '../auth/auth-service';

@Component({
    selector: 'base',
    template: `
    <div>
      <span x-large>Your jwt</span>
      <pre>{{ token | json }}</pre>
    </div>
  `
})
export class Base {
    token:string;

    constructor(private AuthService:AuthService,
                private router:Router) {
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
