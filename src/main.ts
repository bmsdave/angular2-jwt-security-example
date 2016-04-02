import {provide} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, PathLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS, ConnectionBackend} from 'angular2/http';
import {App} from './app/app';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {enableProdMode} from 'angular2/core';
import {Http} from 'angular2/http';
import {AuthService} from './app/auth/auth-service';
import {YOUR_HEADER_NAME, YOUR_HEADER_PREFIX, YOUR_TOKEN_NAME } from './config';

enableProdMode();

document.addEventListener('DOMContentLoaded', function main() {
    bootstrap(App, [
        ('production' === process.env.ENV ? [] : ELEMENT_PROBE_PROVIDERS),
        AuthService,
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        provide(LocationStrategy, {useClass: PathLocationStrategy}),
        provide(AuthHttp, {
            useFactory: (http) => {
                return new AuthHttp(new AuthConfig({
                    headerName: YOUR_HEADER_NAME,
                    headerPrefix: YOUR_HEADER_PREFIX,
                    tokenName: YOUR_TOKEN_NAME,
                    noJwtError: true
                }), http);
            },
            deps: [Http]
        }),
        provide(AuthConfig, {
            useValue: new AuthConfig({
                headerName: YOUR_HEADER_NAME,
                headerPrefix: YOUR_HEADER_PREFIX,
                tokenName: YOUR_TOKEN_NAME,
                noJwtError: true
            })
        }),
        AuthHttp,
        AuthService,
        ConnectionBackend
    ])
        .catch(err => console.error(err));
});
