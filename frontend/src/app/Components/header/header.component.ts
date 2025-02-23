import { Component, NgModule } from '@angular/core';
import {
  AvatarComponent,
  BarComponent,
  ShellBarComponent,
  PopoverComponent,
  InputComponent,
  IconComponent,
  DialogComponent,
  MenuItemComponent,
  MenuSeparatorComponent,
  MenuComponent,
} from '@ui5/webcomponents-ngx';

import { LabelComponent } from '@ui5/webcomponents-ngx/main/label';
import '@ui5/webcomponents/dist/Icon.js';
import { ButtonComponent } from '@ui5/webcomponents-ngx/main/button';
import { CommonModule, NgIf } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,

  imports: [
    BarComponent,
    AvatarComponent,
    LabelComponent,
    ButtonComponent,
    ShellBarComponent,
    PopoverComponent,
    InputComponent,
    IconComponent,
    NgIf,
    DialogComponent,
    MenuItemComponent,
    MenuSeparatorComponent,
    MenuComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  SignUpObj: any = {
    name: '',
    email: '',
    password: '',
  };

  Message: any;

  constructor(private _auth: AuthService, private _product: ProductService) {}

  Signup() {
    this._auth.post('/register', this.SignUpObj).subscribe({
      next: (res: any) => {
        if (res) {
          
          localStorage.setItem('user-token', res.token);

        }
      },
      error: (err: any) => {
        this.Message = err;
      },
    });
  }
  Menu() {
    this._product.IsmenuActive = false;
  }

  isDialog: boolean = true;
}
