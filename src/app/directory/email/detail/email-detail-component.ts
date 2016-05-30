import {Component, View, Inject, Input, Output} from 'angular2/core';
import {Router} from 'angular2/router';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import { EMail } from '../../../base/classes/email';
import { EMailService } from './../email-service';
import { IEMail, category } from '../../../base/interfaces/interfaces';

@Component({
    selector: 'email-detail',
    template: require('./email-detail.html'),
    directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class EmailComponent {

    private email:EMail = new EMail({id:null, cat:category.Home, body:null});
    
    @Input() test: String;
    

    constructor(private EMailService: EMailService) {
        EMailService.selectedEMail$.subscribe(newEMail => this.email = new EMail(newEMail));
    }

}
