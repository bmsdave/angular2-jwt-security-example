import {Injectable} from 'angular2/core';
import {Headers, BaseRequestOptions} from 'angular2/http';


@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });
}
