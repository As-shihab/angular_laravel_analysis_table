import { Component, OnInit } from '@angular/core';
import {
  BarComponent,
  ButtonComponent,
  DialogComponent,
  IllustratedMessageComponent,
  InputComponent,
  LabelComponent,
  MessageStripComponent,
  OptionComponent,
  SelectComponent,
  TableCellComponent,
  TableComponent,
  TableHeaderCellComponent,
  TableHeaderRowComponent,
  TableRowComponent,
  TitleComponent,
} from '@ui5/webcomponents-ngx';
import { ProductService } from '../../Services/product.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';

import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { SuccessAlert } from '../lib/sweet';
import { lodata_url } from '../../environments/globalurl';

@Component({
  selector: 'app-view-component',
  standalone: true,
  imports: [
    TableComponent,
    TableHeaderCellComponent,
    TableHeaderRowComponent,
    TableRowComponent,
    LabelComponent,
    TableCellComponent,
    ButtonComponent,
    NgFor,
    RouterLink,
    DialogComponent,
    EditProductComponent,
    BarComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    FormsModule,
    OptionComponent,
    InputComponent,
    TitleComponent,
    MessageStripComponent,
    IllustratedMessageComponent,
    NgxPaginationModule,
    CommonModule,
    NgFor,
  ],
  templateUrl: './view-component.component.html',
  styleUrl: './view-component.component.css',
})
export class ViewComponentComponent {
  AllProducts: any | undefined = [];
  isopenpopup: boolean = false;
  listId: any | undefined;
  isaddproduct: boolean = false;
  isRemove: boolean | any = false;
  filterddata: any;
  isadded: boolean = false;
  addform: boolean | undefined;
  isloading: boolean = false;
  GetEditableValue: any;
  // validation message
  SearchText: string = '';
  Validate: any;
  FilterdData: any | undefined;
  // pagination state :
  minimumItem: number = 0;
  page: number = 1;
  count = 0;
  pageSize: number = 20;

  // end pagination

  constructor(private Product: ProductService) {
    this.ViewProduct();
    this.addform = this.Product.addform;
  }

  onPageChange(pageNumber: number) {
    this.page = pageNumber;
    if (
      Math.ceil(this.AllProducts.value.length / this.pageSize) == pageNumber
    ) {
      
      let countblankpage = pageNumber - this.pageSize;
      this.minimumItem = countblankpage;
    } else {
      this.minimumItem = this.isloading ? 20 : 0;
    }
  }
  // end pagination
  ParentObj: any = {
    name: 'shihab',
    subject: 'computer',
  };

  ProductObj: any = {
    ProductName: '',
    ProductType: '',
    Supplier: '',
    Demination: '',
    Weight: '',
    Price: '',
  };

  // remove one product
  Remove(id: number) {
    this.isloading = true;

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-2',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you want delete?',
        text: 'After deleting you may not get product again!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.Product.DeleteProuduct(id).subscribe({
            next: (resphonse) => {
              this.isloading = false;
              // this.ShowAlert(
              //   "Proudct removed successfully",
              //   "Product removed"
              // )

              this.ViewProduct();
            },

            error: (err) => {
              console.log(err);
            },
          });

          swalWithBootstrapButtons.fire({
            title: 'Deleted!',
            text: 'Product has been deleted.',
            icon: 'success',
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.isloading = false;
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: "Prouduct didn't delete",
            icon: 'error',
          });
        }
      });
  }

  // view all product
  ViewProduct() {
    this.minimumItem=20
    this.isloading = true;
    this.Product.GetProduct(
      this.SearchText,
      this.Product.ProductCounter

    ).subscribe({
      next: (todos: any) => {
        this.isloading = false;
        this.AllProducts = todos;
        this.minimumItem =0;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  Edit(data: any) {
    console.log(data);
    this.GetEditableValue = data;
    this.listId = data.id;
    this.isopenpopup = !this.isopenpopup;
  }

  // work properly

  AddProduct() {
    const data = {
      productname: this.ProductObj.ProductName,
      producttype: this.ProductObj.ProductType,
      supplier: this.ProductObj.Supplier,
      demination: this.ProductObj.Demination,
      weight: this.ProductObj.Weight,
      price: this.ProductObj.Price,
    };

    if (
      data.productname == '' &&
      data.supplier == '' &&
      data.demination == '' &&
      data.weight == '' &&
      data.price == ''
    ) {
      this.Validate = 'Fill all the product';
    } else {
      if (data.productname == '') {
        this.Validate = 'Type the product name';
        return;
      }
      if (data.producttype == '') {
        this.Validate = 'Chose the product type';
        return;
      }
      if (data.supplier == '') {
        this.Validate = 'Type the supplier';
        return;
      }
      if (data.demination == '') {
        this.Validate = 'Chose the deminations';
        return;
      }

      if (data.price == '') {
        this.Validate = 'Mention the price of product';
        return;
      }
      if (data.weight == '') {
        this.Validate = 'Place the weight of product';
        return;
      } else {
        this.isloading = true;
        this.Product.CreateProduct(data).subscribe({
          next: (res) => {
            this.ProductObj.ProductName = '';
            this.ProductObj.ProductName = '';
            this.ProductObj.ProductType = '';
            this.ProductObj.Supplier = '';
            this.ProductObj.Demination = '';
            this.ParentObj.Weight = '';
            this.ProductObj.Price = '';

            this.addform = false;
            this.ViewProduct();
            console.log(res);
            this.isloading = false;

            SuccessAlert('Product Addedd Successfully', 'Product added');
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }

  // filter data by searching -----

  FilterData(): void {
    this.ViewProduct();
  }

  getRowIndexes(): number[] {
    return Array.from({ length: this.minimumItem }, (_, i) => i);
  }
}
