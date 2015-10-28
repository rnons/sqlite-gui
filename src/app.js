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
    this.asideSize = 160;
    this.isResizing = false;
    this.tables = [];
    ipc.send('get-tables');
    ipc.on('tables', (tables) => {
      zone.run(() => {
        this.tables = tables;
      });
    });
  }

  beginResize(event) {
    event.preventDefault();
    this.isResizing = true;
    this.x0 = event.pageX;
    document.body.style.cursor = 'col-resize';
  }

  resizing(event) {
    if (this.isResizing) {
      const xt = event.pageX;
      this.asideSize += xt - this.x0;
      this.x0 = xt;
    }
  }

  finishResize(event) {
    this.isResizing = false;
    document.body.style.cursor = 'initial';
  }
}

AppComponent.parameters = [[NgZone]];

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, {useValue: '/'}),
  bind(LocationStrategy).toClass(HashLocationStrategy),
]);
