const ipc = window.require('ipc');

import {CORE_DIRECTIVES, Component, NgZone} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';


@Component({
  selector: 'table-component',
  templateUrl: 'src/components/table/table.html',
  directives: [CORE_DIRECTIVES]
})
export class TableCom {
  constructor(params, zone) {
    this.name = params.get('name');
    this.rows = [];
    this.keys = [];
    ipc.send('get-table', this.name);
    ipc.on('table', (data) => {
      zone.run(() => {
        this.rows = data;
        this.keys = Object.keys(this.rows[0]);
      });
    })
  }
}

TableCom.parameters = [[RouteParams], [NgZone]];
