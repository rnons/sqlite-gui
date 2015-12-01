import {NgFor, Component, ElementRef} from 'angular2/angular2';

@Component({
  selector: 'grid-table',
  templateUrl: 'src/components/grid_table/grid_table.html',
  directives: [NgFor],
  properties: ['columns', 'rows']
})
export class GridTable {
  constructor(elementRef) {
    this.$el = elementRef.nativeElement;
    this.$hidden = this.$el.querySelector('.js-hidden-table');
  }

  afterViewInit() {
    const contentWidth = this.$el.getBoundingClientRect().width;
    const headerWidth = this.$hidden.getBoundingClientRect().width;
    this.tableWidth = Math.max(contentWidth, headerWidth);
  }
}

GridTable.parameters = [[ElementRef]];
