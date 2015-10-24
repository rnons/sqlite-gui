import 'reflect-metadata';
import 'zone.js';

import {Component, bootstrap} from 'angular2/angular2';

@Component({
  selector: 'sqlite-gui-app',
  template: 'Hello, this is a Angular 2 app'
})
class AppComponent{
}

bootstrap(AppComponent);
