import {CORE_DIRECTIVES, Component} from 'angular2/angular2';

import {Table} from '../../services/table';
import {GridTable} from '../grid_table/grid_table';

@Component({
  selector: 'table-structure-component',
  template: '<grid-table *ng-if="resolved" [columns]="columns" [rows]="rows"></grid-table>',
  directives: [CORE_DIRECTIVES, GridTable]
})
export class TableStructureCmp {
  constructor(table) {
    this.table = table;
    this.resolved = false;
  }

  onInit() {
    this.columns = [
      {name: 'cid', title: 'Column ID'},
      {name: 'name', title: 'Name'},
      {name: 'type', title: 'Type'},
      {name: 'notnull', title: 'Not Null'},
      {name: 'dflt_value', title: 'Default Value'},
      {name: 'pk', title: 'Primary Key'},
    ];
  }

  onActivate() {
    this.table.getStructure();
    this.rows = this.table.structure;
    this.resolved = true;
  }
}

TableStructureCmp.parameters = [[Table]];
