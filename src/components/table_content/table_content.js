import {CORE_DIRECTIVES, Component, ElementRef, NgZone} from 'angular2/angular2';

import {Table} from '../../services/table';

@Component({
  selector: 'table-content-component',
  templateUrl: 'src/components/table_content/content.html',
  directives: [CORE_DIRECTIVES]
})
export class TableContentCmp {
  constructor(_zone, elementRef, table) {
    this._zone = _zone;
    this.table = table;
    this.table.getContent();

    this.$el = elementRef.nativeElement;
    this.$hidden = this.$el.querySelector('.js-hidden-table')
  }

  onInit() {
    this.subscriber = this.table.emitter.subscribe(() => {
      this.resize();
    });
  }

  afterViewInit() {
    this.resize();
  }

  resize() {
    const contentWidth = this.$el.getBoundingClientRect().width;
    const headerWidth = this.$hidden.getBoundingClientRect().width;
    this._zone.run(() => {
      this.tableWidth = Math.max(contentWidth, headerWidth);
    });
  }

  onDestroy() {
    this.subscriber.unsubscribe()
  }
}

TableContentCmp.parameters = [[NgZone], [ElementRef], [Table]];
