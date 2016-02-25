import {AuthService} from './app/shared/services/auth.service';
import {provide} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS, ConnectionBackend} from 'angular2/http';
import {App} from './app/app';
import {AuthHttp, AuthConfig} from 'angular2-jwt';

document.addEventListener('DOMContentLoaded', function main() {
  bootstrap(App, [
    ('production' === process.env.ENV ? [] : ELEMENT_PROBE_PROVIDERS),
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide(AuthConfig, {
      useFactory: () => {
        return new AuthConfig({
          headerName: 'Authorization',
          headerPrefix: 'JWT',
          tokenName: 'token',
          noJwtError: true
        });
      }
    }),
    AuthHttp,
    AuthService,
    ConnectionBackend
  ])
    .catch(err => console.error(err));
});
