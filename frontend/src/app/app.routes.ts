import { Routes } from '@angular/router';

import { StudentLayoutComponent } from './Layout/product-layout/student-layout.component';

import { ViewComponentComponent } from './Components/view-product/view-component.component';

import { ViewOneComponent } from './Components/view-product/view-one-product/view-one.component';
import { ViewUserComponent } from './Components/view-user/view-user.component';
import { ViewOrdersComponent } from './Components/view-orders/view-orders.component';
import { ViewOneOrderComponent } from './Components/view-orders/view-one-order/view-one-order.component';
export const routes: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
    children: [
      {
        path: '',
        component: ViewComponentComponent,
      },
      { path: 'users', component: ViewUserComponent },
      { path: 'orders', component: ViewOrdersComponent },
      {path:'orders/:id' , component:ViewOneOrderComponent},
      { path: 'view/:id', component: ViewOneComponent },
    ],
  },
];
