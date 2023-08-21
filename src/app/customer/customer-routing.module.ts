import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerSearchComponent} from "./customer-search/customer-search.component";
import {CustomerRegisterComponent} from "./customer-register/customer-register.component";
import {CustomerEditComponent} from "./customer-edit/customer-edit.component";

const routes: Routes = [
  { path: '', component: CustomerSearchComponent },
  { path: 'register', component: CustomerRegisterComponent },
  { path: 'edit/:id', component: CustomerEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
