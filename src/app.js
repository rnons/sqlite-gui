import 'reflect-metadata';
import 'zone.js';

import {
  CORE_DIRECTIVES,
  Component,
  NgZone,
  bootstrap
} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

const ipc = window.require('ipc');

@Component({
  selector: 'sqlite-gui-app',
  templateUrl: 'src/app.html',
  directives: [CORE_DIRECTIVES, RouterLink]
})
class AppComponent{
  constructor(zone) {
    this.tables = [];
    ipc.on('tables', (tables) => {
      zone.run(() => {
        this.tables = tables;
      });
    });
  }
}

AppComponent.parameters = [[NgZone]];

bootstrap(AppComponent);
