import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../Services/product.service';
import { AvatarComponent, BreadcrumbsComponent, BreadcrumbsItemComponent, ButtonComponent, DynamicPageComponent, DynamicPageHeaderComponent, DynamicPageTitleComponent, LabelComponent, LinkComponent, ListComponent, ListItemCustomComponent, TagComponent, TextComponent, TitleComponent, ToolbarButtonComponent, ToolbarComponent, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';

@Component({
  selector: 'app-view-one',
  standalone: true,
  imports: [

Ui5WebcomponentsModule
    
  ],
  templateUrl: './view-one.component.html',
  styleUrl: './view-one.component.css'
})
export class ViewOneComponent {
id : any | null = null;
ViewData : any | undefined;

isform : boolean | undefined;


constructor(private route: ActivatedRoute , private _product : ProductService){
  this.id = this.route.snapshot.paramMap.get('id');
  this.isform = _product.addform;
  this.ViewOne()
}



ViewOne(){

  this._product.ViewOneProduct(this.id).subscribe({next : (res)=>{
 
    this.ViewData = res;
     
  },
   error: (err)=>{
    console.log(err)
   }
})


}







}
