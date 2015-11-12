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
  Router,
  RouteConfig,
  RouterLink,
  RouterOutlet,
  ROUTER_PROVIDERS
} from 'angular2/router';

import {Table} from './services/table';
import {TableCom} from './components/table/table';


@Component({
  selector: 'sqlite-gui-app',
  templateUrl: 'src/app.html',
  viewProviders: [Table],
  directives: [CORE_DIRECTIVES, RouterLink, RouterOutlet]
})
@RouteConfig([
  new Route({ path: '/table/:name/...', component: TableCom, as: 'Table' })
])
class AppComponent{
  constructor(zone, router) {
    this.router = router;
    this.asideSize = 160;
    this.isResizing = false;
    this.tables = [];
    this.subRoute = 'Content';
    router.subscribe(val => {
      router.recognize(val).then(ins => {
        this.currentTable = ins.component.params.name;
      });
    });

    ipc.send('get-tables');
    ipc.on('tables', (tables) => {
      zone.run(() => {
        this.tables = tables;
      });
    });
  }

  navigateTo(routeName) {
    this.subRoute = routeName;
    this.router.navigate(['/Table', {name: this.currentTable}, routeName]);
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

  finishResize() {
    this.isResizing = false;
    document.body.style.cursor = 'initial';
  }
}

AppComponent.parameters = [[NgZone], [Router]];

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, {useValue: '/'}),
  bind(LocationStrategy).toClass(HashLocationStrategy),
]);
