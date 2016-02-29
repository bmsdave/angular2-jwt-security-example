import {Component, Inject} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Http, Headers, Response} from 'angular2/http';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {AuthService} from '../../auth-service';

@Component({
  selector: 'activate',
  template: require('./activation.html'),
  providers: [AuthService],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class Activation {

  activation_key: string;
  activation_success: boolean;

  constructor(
    private authService: AuthService,
    private params: RouteParams,
    private router: Router
    ) {
    this.activation_key = params.get('activation_key');
  }

  ngOnInit() {
    this.authService.activate(this.activation_key)
      .subscribe(
        res => {
          this.router.navigate(['Login']);
        },
        err => {
          this.activation_success = false;
        }
      );
  }

}
