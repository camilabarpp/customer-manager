import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerSearchComponent} from "./customer-search/customer-search.component";
import {CustomerRegisterComponent} from "./customer-register/customer-register.component";

const routes: Routes = [
  { path: 'search', component: CustomerSearchComponent },
  { path: 'register', component: CustomerRegisterComponent },
  // Defina outras rotas ou roteamentos internos aqui
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
