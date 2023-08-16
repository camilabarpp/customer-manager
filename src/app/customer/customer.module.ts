import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerSearchComponent} from './customer-search/customer-search.component';
import {CustomerRegisterComponent} from './customer-register/customer-register.component';
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CustomerRoutingModule} from "./customer-routing.module";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    CustomerSearchComponent,
    CustomerRegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CustomerRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CustomerModule { }
