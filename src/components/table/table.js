const ipc = window.require('ipc');

import {CORE_DIRECTIVES, Component, NgZone} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';


@Component({
  selector: 'table-component',
  templateUrl: 'src/components/table/table.html',
  directives: [CORE_DIRECTIVES]
})
export class TableCom {
  constructor(params, _zone) {
    this._zone = _zone;
    this.name = params.get('name');
    this.rows = [];
    this.keys = [];
    this.onTable = this.onTable.bind(this);
    ipc.send('get-table', this.name);
    ipc.on('table', this.onTable);
  }

  onTable(data) {
    this._zone.run(() => {
      this.rows = data;
      this.keys = Object.keys(this.rows[0]);
    });
  }

  onDestroy() {
    ipc.removeListener('table', this.onTable);
  }
}

TableCom.parameters = [[RouteParams], [NgZone]];
