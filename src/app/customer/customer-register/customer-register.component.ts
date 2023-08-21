import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerStore} from "../../store/customer.store";
import {ActivatedRoute} from "@angular/router";
import {TypeCustomer} from "../../store/model/customer.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.scss']
})
export class CustomerRegisterComponent implements OnInit {
  form!: FormGroup;
  typeOptions: TypeCustomer[] = [TypeCustomer.PF, TypeCustomer.PJ];

  constructor(
    private _store: CustomerStore,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _location: Location,
    private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.form = this._formBuilder.group({
      name: new FormControl('', [ Validators.minLength(3)]),
      type: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [control => {
        if (this.form?.get('type')?.value === 'PF') {
          return Validators.required(control);
        }
        return null;
      }]),
      cnpj: new FormControl('', [control => {
        if (this.form?.get('type')?.value === 'PJ') {
          return Validators.required(control);
        }
        return null;
      }]),
      rg: new FormControl('', [control => {
        if (this.form?.get('type')?.value === 'PF') {
          return Validators.required(control);
        }
        return null;
      }]),
      ie: new FormControl('', [control => {
        if (this.form?.get('type')?.value === 'PJ') {
          return Validators.required(control);
        }
        return null;
      }]),
      phoneNumbers: this._formBuilder.array([], [Validators.required]),
    });
  }

  submitForm() {
    console.log(this.form.value)
    if (this.form.valid) {
      const customerData = {
        ...this.form.value,
        phoneNumbers: this.form.value.phoneNumbers.map((number: string) => ({ number }))
      };
      console.log(customerData);
      this._store.createCustomer(customerData);
      this.onCancel();
    }
  }


  get phoneNumbers() {
    return this.form.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber() {
    const control = this._formBuilder.control('', Validators.required);
    this.phoneNumbers.push(control);
  }

  removePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index);
  }

  onCancel() {
    this._location.back();
    setTimeout(()=>{
      location.reload();
    }, 100);
    this._store.listAllCustomers();
  }
}
