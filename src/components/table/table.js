const ipc = window.require('ipc');

import {CORE_DIRECTIVES, Component, NgZone} from 'angular2/angular2';
import {RouteParams, RouteConfig, RouterOutlet} from 'angular2/router';

import {Table} from '../../services/table';
import {TableContentCmp} from '../table_content/table_content';
import {TableStructureCmp} from '../table_structure/table_structure';


@Component({
  selector: 'table-component',
  templateUrl: 'src/components/table/table.html',
  directives: [CORE_DIRECTIVES, RouterOutlet]
})
@RouteConfig([
  { path: '', component: TableContentCmp, as: 'Content', data: {name: 'Content'} },
  { path: '/structure', component: TableStructureCmp, as: 'Structure', data: {name: 'Structure'} }
])
export class TableCom {
  constructor(params, _zone, table) {
    this._zone = _zone;
    this.name = params.get('name');
    this.rows = [];
    this.keys = [];
    table.use(this.name);
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
};

TableCom.parameters = [[RouteParams], [NgZone], [Table]];
