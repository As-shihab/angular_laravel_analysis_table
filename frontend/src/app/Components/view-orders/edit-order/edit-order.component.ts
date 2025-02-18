import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogComponent, LabelComponent, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { ProductService } from '../../../Services/product.service';
import { AuthService } from '../../../Services/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SuccessAlert } from '../../lib/sweet';
import { ViewOrdersComponent } from '../view-orders.component';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [DialogComponent,
Ui5WebcomponentsModule,
FormsModule,
CommonModule

  ],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css'
})
export class EditOrderComponent {
// isedit : boolean = true;
Get_Products: any | undefined;
Get_Customers: any | undefined;
IsLoading: boolean = false;
Validation_alert: boolean = false;
@Input() isedit : any | boolean = false; 
@Output() CloseEdit = new EventEmitter<boolean>();
@Input() EditableData : any | undefined;
constructor(private _products: ProductService , private auth :AuthService , private orders: ViewOrdersComponent){
  this.GetProducts();
    this.Get_Customer();

}


Order_Details : any = {
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


GetProducts() {
  this._products.GetProductCount()
  this._products.GetProduct('' , this._products.ProductCounter).subscribe({
    next: (items) => {
      this.Get_Products = items;
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

Close(){
  this.isedit = !this.isedit
  this.CloseEdit.emit()
}

SaveEdit(){
  
  this.IsLoading = true;
  if (
    this.Order_Details.productname == '' ||
    this.Order_Details.customername == '' ||
    this.Order_Details.order_date == ''
  ) {
    this.Validation_alert = true;
    this.IsLoading = false;
    return;
  }
  this._products.EditOrder(this.Order_Details , this.EditableData.id ).subscribe({
    next:(result: any)=>{
      this.IsLoading= false;
     this.isedit = false;
     this.orders.GetOrders()
SuccessAlert(
  "Order edited successfully",
  "Order edited"
)

    },
    error:(err)=>{
      this.IsLoading = false;
      console.log(err)
    }
  })
}


}
