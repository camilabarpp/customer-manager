import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorDialogComponent} from "./components/error-dialog/error-dialog.component";
import {ConfirmationDialogComponent} from "./components/confirmation-dialog/confirmation-dialog.component";



@NgModule({
  declarations: [
    ErrorDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
