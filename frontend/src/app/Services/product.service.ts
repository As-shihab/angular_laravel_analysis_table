import { HttpClient } from '@angular/common/http';
import { Injectable , OnInit  } from '@angular/core';
import { ViewComponentComponent } from '../Components/view-product/view-component.component';
import { NgModel } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProductService  {
  // boolean state and useeffect

  addform: boolean = false;
  EditForm: boolean = false;
  IsmenuActive: boolean = true;
  BaseUrl = 'http://127.0.0.1:8000/odata/';
  ProductCounter: number =0;
  constructor(private http: HttpClient) {}
  
 
  
  GetProductCount() {
    this.http.get(this.BaseUrl+'Products?$count=true').subscribe({
      next:(count: any)=>{
        return this.ProductCounter =count['@count']
      }
    });
  }

  GetProduct(params: string , top: number) {
    this.GetProductCount()
    var orderby = `&orderby=id desc `;
    return this.http.get(
      this.BaseUrl +
        `Products?$filter=contains(productname,'${params}') or contains(supplier, '${params}') or contains(price, '${params}')&top=${top? top : ''}  ${orderby} `
    );
  }
  DeleteProuduct(id: number) {
    return this.http.delete(this.BaseUrl + 'Products/' + id);
  }
  // create product
  CreateProduct(data: any) {
    console.log(data);
    return this.http.post(this.BaseUrl + 'Products', data, {
      headers: { Accept: 'application/json' },
    });
  }
  //  view on product
  ViewOneProduct(id: any) {
    return this.http.get(this.BaseUrl + 'Products/' + id);
  }
  //  edit Produts
  EditProduct(data: any, id: any) {
    return this.http.put(this.BaseUrl + 'Products/' + id, data);
  }

  // get product orders
  CreateOrder(data: any) {
    return this.http.post(this.BaseUrl + 'Orders', data);
  }
  GetProductOrders() {
    var orderby = `?orderby=created_at desc `;
    return this.http.get(this.BaseUrl + 'Orders' + orderby);
  }
  DeleteOrder(id: any) {
    return this.http.delete(this.BaseUrl + 'Orders/' + id);
  }
  // get one order by id

  GetOneOrder(id: any) {
    return this.http.get(this.BaseUrl + 'Orders/' + id);
  }
  // edit order
  EditOrder(data: any, id: any) {
    return this.http.put(this.BaseUrl + 'Orders/' + id, data);
  }
}
