import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [NgxPaginationModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  minimumItem = 0;
  page: number = 1;
  count = 0;
  @Input() PageSize: any;
  @Input() AllProductLength: any;
  @Output() SentPageNumber: EventEmitter<any> = new EventEmitter<any>();
  @Output() GetRows: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
  GetPagesValue() {
  
    if (Math.ceil(this.AllProductLength / this.PageSize) == this.page) {
      let countblankpage = this.page - this.PageSize;
      this.GetRows.emit((Math.abs(this.minimumItem = countblankpage)));
       
    } 

    this.minimumItem = 0;
  }
  onPageChange(pageNumber: number) {
    this.page = pageNumber
    this.GetPagesValue();
    this.SentPageNumber.emit(pageNumber);
  }

}
