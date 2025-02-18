import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../Services/product.service';
import { NgIf } from '@angular/common';
import { BusyIndicatorComponent } from '@ui5/webcomponents-ngx';

@Component({
  selector: 'app-view-one-order',
  standalone: true,
  imports: [NgIf,
    BusyIndicatorComponent
  ],
  templateUrl: './view-one-order.component.html',
  styleUrl: './view-one-order.component.css'
})
export class ViewOneOrderComponent {
IsLoading: boolean = false;
id:any | undefined;
constructor( route: ActivatedRoute,private product: ProductService){
  this.id = route.snapshot.paramMap.get('id');
  this.GetOneOrder()
}
OneOrderDetails : any| undefined;

GetOneOrder(){
  this.IsLoading=true;
  this.product.GetOneOrder(this.id).subscribe({
    next:(data : any)=>{
        this.IsLoading= false;
         this.OneOrderDetails = data
        
    }
  })
}

}
