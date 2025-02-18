import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
// import { ButtonComponent, DialogComponent, ProductSwitchComponent, ProductSwitchItemComponent, SideNavigationComponent, SideNavigationGroupComponent, SideNavigationItemComponent, SideNavigationSubItemComponent } from '@ui5/webcomponents-ngx';


// import listing

import {SideNavigationComponent} from "@ui5/webcomponents-ngx/fiori/side-navigation"
import {SideNavigationSubItemComponent} from "@ui5/webcomponents-ngx/fiori/side-navigation-sub-item"
import { SideNavigationItemComponent } from '@ui5/webcomponents-ngx/fiori/side-navigation-item';
import '@ui5/webcomponents-icons/dist/AllIcons.js';
import { ProductService } from '../../Services/product.service';
@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [RouterOutlet,
    SideNavigationComponent,
    SideNavigationItemComponent,
    SideNavigationSubItemComponent,
RouterLink,
NgIf



  ],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.css'
})
export class StudentLayoutComponent {

  isSidbar : boolean;

  constructor(private _product: ProductService){
    this.isSidbar = this._product.IsmenuActive;
    console.log(this.isSidbar)
  }

  ispopup: boolean = true;
}
