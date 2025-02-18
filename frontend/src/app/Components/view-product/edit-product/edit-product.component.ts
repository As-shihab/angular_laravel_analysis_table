import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ButtonComponent,
  DialogComponent,
  InputComponent,
  LabelComponent,
  OptionComponent,
  Ui5WebcomponentsModule,
} from '@ui5/webcomponents-ngx';
import { ProductService } from '../../../Services/product.service';
import Swal from 'sweetalert2';
import { ViewComponentComponent } from '../view-component.component';
import { SuccessAlert } from '../../lib/sweet';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [Ui5WebcomponentsModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  @Input() EditableData: any | undefined;
  @Input() isopenEdit: boolean = false;
  @Input() productId: any | undefined;
  @Output() IsOpenEditChange = new EventEmitter<boolean>();
  Isedit: boolean | undefined;
  ViewData: any | undefined;

  ProductObj: any = {
    productname: '',
    producttype: '',
    supplier: '',
    demination: '',
    weight: '',
    price: '',
  };
  // function start
  CloseEdit() {
    this.isopenEdit = !this.isopenEdit;
    this.IsOpenEditChange.emit(this.isopenEdit);
  }
  constructor(
    private _product: ProductService,
    private ViewProduct: ViewComponentComponent
  ) {}
  SaveProduct() {
    this._product.EditProduct(this.ProductObj, this.productId).subscribe({
      next: (result) => {
        this.ViewProduct.ViewProduct();
        this.isopenEdit = false;
        SuccessAlert('Product Edited successfully', 'Product edited')
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
