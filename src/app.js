import 'reflect-metadata';
import 'zone.js';

import {Component, bootstrap} from 'angular2/angular2';

@Component({
  selector: 'sqlite-gui-app',
  templateUrl: 'src/app.html'
})
class AppComponent{
}

bootstrap(AppComponent);
