const ipc = window.require('ipc');

import 'reflect-metadata';
import 'zone.js';

import {
  CORE_DIRECTIVES,
  Component,
  NgZone,
  bind,
  bootstrap,
  provide
} from 'angular2/angular2';
import {
  APP_BASE_HREF,
  HashLocationStrategy,
  LocationStrategy,
  Route,
  RouteConfig,
  RouterLink,
  RouterOutlet,
  ROUTER_PROVIDERS
} from 'angular2/router';

import {TableCom} from './components/table/table';


@Component({
  selector: 'sqlite-gui-app',
  templateUrl: 'src/app.html',
  directives: [CORE_DIRECTIVES, RouterLink, RouterOutlet]
})
@RouteConfig([
  new Route({ path: '/table/:name', component: TableCom, as: 'Table' })
])
class AppComponent{
  constructor(zone) {
    this.tables = [];
    ipc.send('get-tables');
    ipc.on('tables', (tables) => {
      zone.run(() => {
        this.tables = tables;
      });
    });
  }
}

AppComponent.parameters = [[NgZone]];

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, {useValue: '/'}),
  bind(LocationStrategy).toClass(HashLocationStrategy),
]);
