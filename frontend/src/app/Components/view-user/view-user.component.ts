import { Component } from '@angular/core';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';

import { GlobalService } from '../../Services/global.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { SuccessAlert } from '../lib/sweet';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [Ui5WebcomponentsModule, FormsModule, CommonModule],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css',
})
export class ViewUserComponent {
  IsNewUser: boolean | undefined;
  IsLoading: boolean = false;
  Customars: any | undefined;

  constructor(private _global: GlobalService, private auth: AuthService) {
    this.IsNewUser = this._global.isAddUser;
    this.Get_Customers();
  }

  // Alert(title : string , text: string){
  //   Swal.fire({
  //     title:title,
  //     text: text,
  //     icon: "success",
  //     confirmButtonText: "Confirm",
  //     cancelButtonText: "Cancel",
  // showCancelButton: undefined,
  // showCloseButton: undefined
  //   })
  // }

  user = {
    firstname: '',
    lastname: '',
    email: '',
    role: '',
  };

  // get all users

  Get_Customers() {
    this.auth.Get_Customars().subscribe({
      next: (items) => {
        this.Customars = items;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // add user
  AddUser() {
    this.auth.Create_Customer(this.user).subscribe({
      next: (resphonse) => {
        this.IsNewUser = false;
        SuccessAlert('User Created Successfullly', 'User created');
        this.Get_Customers();
      },
      error: (err) => {
      console.log(err);
      },
    });
  }

  DeleteCustomer(id: any) {
    this.IsLoading = true;
    this.auth.Delete_Customer(id).subscribe({
        next: (res) => {
        this.Get_Customers();
        SuccessAlert('Deleted Successfull', 'Deleted Customer');
        this.IsLoading = false;
        },
        error: (err) => {
        alert('not deted');
        console.log(err);
      },
    });
  }
}
