/*
 * Providers provided by Angular
 */
import {bind, provide, enableProdMode, Injectable} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, PathLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS, BaseRequestOptions, RequestOptions, Http, XHRBackend} from 'angular2/http';
import {FORM_PROVIDERS} from 'angular2/common';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import {DefaultRequestOptions} from './app/DefaultRequestOptions';

@Injectable()
export class ExRequestOptions extends BaseRequestOptions {
  constructor() {
    super();
    this.headers.append('X-CSRFToken', this.getCookie('csrftoken'));
  }

  getCookie(name) {
    let value = '; ' + document.cookie;
    let parts = value.split('; ' + name + '=');
    if (parts.length === 2)
      return parts.pop().split(';').shift();
  }
}


const ENV_PROVIDERS = [];

if ('production' === process.env.ENV) {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app/app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */

document.addEventListener('DOMContentLoaded', function main() {
  bootstrap(App, [
    ...ENV_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide(RequestOptions, { useClass: ExRequestOptions })
    // provide(Http, {
    // useFactory:
    // function(backend, defaultOptions) {
    //   return new Http(backend, defaultOptions);
    // },
    // deps: [XHRBackend, RequestOptions]
    // })
  ])
  .catch(err => console.error(err));

});


/*
 * Modified for using hot module reload
 */

// typescript lint error 'Cannot find name "module"' fix
declare let module: any;

// activate hot module reload
if (module.hot) {

  // bootstrap must not be called after DOMContentLoaded,
  // otherwise it cannot be rerenderd after module replacement
  //
  // for testing try to comment the bootstrap function,
  // open the dev tools and you'll see the reloader is replacing the module but cannot rerender it
  bootstrap(App, [
      ...ENV_PROVIDERS,
      ...HTTP_PROVIDERS,
      ...ROUTER_PROVIDERS,
      provide(LocationStrategy, { useClass: HashLocationStrategy }),
      provide(RequestOptions, { useClass: ExRequestOptions })
    ])
    .catch(err => console.error(err));

  module.hot.accept();
}

// For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
// Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
