import {CORE_DIRECTIVES, Component, NgZone} from 'angular2/angular2';

import {Table} from '../../services/table';
import {GridTable} from '../grid_table/grid_table';

@Component({
  selector: 'table-structure-component',
  template: '<grid-table [fields]="fields" [rows]="rows"></grid-table>',
  directives: [CORE_DIRECTIVES, GridTable]
})
export class TableStructureCmp {
  constructor(_zone, table) {
    this._zone = _zone;
    this.table = table;
  }

  onInit() {
    this.fields = [
      {name: 'cid', title: 'Column ID'},
      {name: 'name', title: 'Name'},
      {name: 'type', title: 'Type'},
      {name: 'notnull', title: 'Not Null'},
      {name: 'dflt_value', title: 'Default Value'},
      {name: 'pk', title: 'Primary Key'},
    ];
    this.rows = this.table.structure;
    this.subscriber = this.table.emitter.subscribe(() => {
      this._zone.run(() => {
        this.rows = this.table.structure;
      });
    });
  }

  onDestroy() {
    this.subscriber.unsubscribe();
  }
}

TableStructureCmp.parameters = [[NgZone], [Table]];
