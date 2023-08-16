import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerSearchComponent} from './customer-search/customer-search.component';
import {CustomerRegisterComponent} from './customer-register/customer-register.component';
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CustomerRoutingModule} from "./customer-routing.module";

@NgModule({
  declarations: [
    CustomerSearchComponent,
    CustomerRegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
