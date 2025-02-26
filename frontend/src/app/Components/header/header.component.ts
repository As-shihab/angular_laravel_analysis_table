import { Component, OnInit } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';
import { api } from '../../environments/globalurl';
import { Router } from '@angular/router';

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
export class HeaderComponent implements OnInit{
  SignUpObj: any = {
    name: '',
    email: '',
    password: '',
  };

  Message : any;
  Alert :string ='';
isAuth : boolean = false;
  constructor(private _auth: AuthService, private _product: ProductService , private http: HttpClient ,private router :Router ) {}
  ngOnInit(): void {
    this.isAuth = this._auth.IsAuthenticated();
  }

  Signup() {
    this._auth.post('/register', this.SignUpObj).subscribe({
      next: (res: any) => {
        if (res) {
          localStorage.setItem('user-token', res.token);
          console.log(res);
        }
      },
      error: (err: any) => {
        this.Message = err;
        console.log(err);
      },
    });
  }
  Menu() {
    this._product.IsmenuActive = false;
  }

  LoginInfo = {
    password: '',
    email: '',
  };
Loading = false;

  Login() {
    this.Loading = true;
       this.http.post(api+"/login" , this.LoginInfo).subscribe({ next: (res : any) => {
      console.log(res)
      localStorage.setItem('user-token' , res.token);
      this.Loading = false;
      }, error: (err: any) => {
        console.log(err.error)
        this.Loading = false;
       this.Alert = err.error
      } });
  }

  isDialog: boolean = true;


  Logout(){
    this.Loading = true
   this.http.get(api+'/logout', {headers:{
    'Authorization' : "Bearer "+ localStorage.getItem('user-token') 
   }}).subscribe({next:(res)=>{
     localStorage.removeItem('user-token')
     this.Loading =false;
     alert('you loged out')
     this.router.navigate(['/']);
   }, error:(e: any)=>{
      console.log(e)
   }})
  }
}
