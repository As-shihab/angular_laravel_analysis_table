import { Component, Input } from '@angular/core';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { SuccessAlert } from '../lib/sweet';
import Swal from 'sweetalert2';
import '@ui5/webcomponents-fiori/dist/illustrations/NoData.js';
import { RouterLink } from '@angular/router';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-view-orders',
  standalone: true,
  imports: [
    Ui5WebcomponentsModule,
    CommonModule,
    RouterLink,
    FormsModule,
    EditOrderComponent,
    PaginatorComponent,
    NgxPaginationModule,
  ],

  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css',
})
export class ViewOrdersComponent {
  search_value: string = '';
  Get_Products: any;
  Get_Customers: any;
  Get_Orders: any;
  IsOder: boolean = false;
  IsDeleted: boolean = false;
  IsUpdate: boolean = true;
  Validation_alert: boolean = false;
  IsLoading: boolean = false;
  IsEditOrder: boolean = false;
  EditData: any | undefined;
  minimumItem: number = 0;
  pageSize = 20;
  page: number = 1;
  count: number = 0;

  constructor(private _products: ProductService, private auth: AuthService) {
    this.GetProducts();
    this.Get_Customer();
    this.GetOrders();
    // this.Update();

  }

  CurrentPages(event: number){
    this.page= event;
   }
   GetRows(event: any){
     this.minimumItem =event
     console.log(this.minimumItem)
     
   }

  // get current orders update
  Update() {
    if (this.IsUpdate) {
      setInterval(() => {
        this.GetOrders();
      }, 10000);
    }
  }

  GetOrders() {
    this.IsLoading = true;
    this._products.GetProductOrders().subscribe({
      next: (orders: any) => {
        this.Get_Orders = orders;
        this.IsLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // delete order

  //
  DeleteOrder(id: any) {
    this._products.DeleteOrder(id).subscribe({
      next: (res) => {
        this.IsDeleted = true;
        this.GetOrders();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // get all products
  GetProducts() {
    this._products
      .GetProduct(this.search_value, this._products.ProductCounter)
      .subscribe({
        next: (items) => {
          this.Get_Products = items;
          console.log(items);
        },
      });
  }

  Get_Customer() {
    this.auth.Get_Customars().subscribe({
      next: (customer) => {
        this.Get_Customers = customer;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  Delete_Customer(id: any) {
    this.auth.Delete_Customer(id).subscribe({
      next: (res) => {},
      error: (err) => {
        console.log(err);
      },
    });
  }

  Order_Details = {
    productname: '',
    customername: '',
    product_id: '',
    customer_id: '',
    order_date: '',
    price: '',
    payment: '',
    delivary: '',
    stock: '',
  };

  CustomerName($event: any) {
    this.Order_Details.customer_id = $event.detail.item.id;
    this.Order_Details.customername = $event.detail.item.text;
  }
  ProductName($event: any) {
    this.Order_Details.productname = $event.detail.item.text;
    const id = (this.Order_Details.product_id = $event.detail.item.id);
    const price = (this.Order_Details.price =
      $event.detail.item.additionalText);
  }

  Order() {
    if (
      this.Order_Details.productname == '' ||
      this.Order_Details.customername == '' ||
      this.Order_Details.order_date == ''
    ) {
      this.Validation_alert = true;
      return;
    }

    this.IsLoading = true;

    // // this.Order_Details.payment =String(0);
    // // this.Order_Details.delivary = String(0)
    // // this.Order_Details.stock = String()
    this._products.CreateOrder(this.Order_Details).subscribe({
      next: (res) => {
        console.log(res);
        this.IsLoading = false;
        this.IsOder = false;
        this.Order_Details.customername = '';
        this.Order_Details.productname = '';
        this.Order_Details.order_date = '';
        SuccessAlert('Order place succesfully', 'Order Created');
        this.GetOrders();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // edit orders

  EditOrder(data: any) {
    this.IsEditOrder = !this.IsEditOrder;
    this.EditData = data;
  }

  getRowIndexes(): number[] {
    return Array.from({ length: this.minimumItem }, (_, i) => i);
  }
}
