const ipc = window.require('ipc');

import {CORE_DIRECTIVES, Component, NgZone} from 'angular2/angular2';
import {Route, RouteParams, RouteConfig, RouterOutlet} from 'angular2/router';
import {Table} from '../../services/table';


@Component({
  selector: 'table-content-component',
  templateUrl: 'src/components/table/content.html',
  directives: [CORE_DIRECTIVES]
})
class TableContentCmp {
  constructor(params, _zone, table) {
    this.table = table;
    this.table.getContent();
  }

  getContent() {
    this.rows = this.table.content;
    if (this.rows.length) {
      this.keys = Object.keys(this.rows[0]);
    }
  }
}

TableContentCmp.parameters = [[RouteParams], [NgZone], [Table]];

@Component({
  selector: 'table-structure-component',
  templateUrl: 'src/components/table/structure.html',
  directives: [CORE_DIRECTIVES]
})
class TableStructureCmp {
  constructor() {
  }
}

@Component({
  selector: 'table-component',
  templateUrl: 'src/components/table/table.html',
  directives: [CORE_DIRECTIVES, RouterOutlet]
})
@RouteConfig([
  new Route({ path: '', component: TableContentCmp, as: 'Content' }),
  new Route({ path: '/structure', component: TableStructureCmp, as: 'Structure' })
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
