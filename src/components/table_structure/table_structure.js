import {CORE_DIRECTIVES, Component} from 'angular2/angular2';

import {Table} from '../../services/table';

@Component({
  selector: 'table-structure-component',
  templateUrl: 'src/components/table_structure/structure.html',
  directives: [CORE_DIRECTIVES]
})
export class TableStructureCmp {
  constructor(table) {
    this.table = table;
    this.keys = ['cid', 'name', 'type', 'notnull', 'dflt_value', 'pk'];
    this.keyNames = {
      cid: 'Column ID',
      name: 'Name',
      type: 'Type',
      notnull: 'Not Null',
      dflt_value: 'Default Value',
      pk: 'Primary Key'
    };
  }
}

TableStructureCmp.parameters = [[Table]];
