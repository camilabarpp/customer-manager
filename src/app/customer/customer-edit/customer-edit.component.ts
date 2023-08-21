import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Customer, Telephone, TypeCustomer} from "../../store/model/customer.model";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerStore} from "../../store/customer.store";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  customer$: Observable<Customer | undefined> | undefined;
  form!: FormGroup;
  typeOptions: TypeCustomer[] = [TypeCustomer.PF, TypeCustomer.PJ];
  customer!: Customer;

  constructor(
    private _store: CustomerStore,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  createForm(): void {
    this.form = this._formBuilder.group({
      name: new FormControl('', [ Validators.minLength(3)]),
      type: new FormControl('PF', [Validators.required]),
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
      phoneNumbers: this._formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.customer$ = this._store.getCustomer();
    this.initializeForm();
  }

  initializeForm() {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this._store.getCustomerById(id);

      this._store.getCustomer().subscribe(
        customer => {
          if (customer) {
            this.form?.patchValue({
              id: customer.id,
              name: customer.name,
              type: customer.type,
              cpf: customer.cpf,
              cnpj: customer.cnpj,
              rg: customer.rg,
              ie: customer.ie,
            });

            while (this.phoneNumbers.length !== 0) {
              this.phoneNumbers.removeAt(0);
            }

            customer.phoneNumbers.forEach((number: Telephone) => {
              this.addPhoneNumberControl(number.number);
            });

            console.log('Initialized Form:', this.form.value);
          }
        }
      );
      this.createForm();
    }
  }

  addPhoneNumberControl(number: string = '') {
    const control = this._formBuilder.control(number, Validators.required);
    this.phoneNumbers.push(control);
  }

  submitForm() {
    const id = this._route.snapshot.paramMap.get('id');

    if (this.form.valid) {
      const customerData = {
        ...this.form.value,
        id: id,
        phoneNumbers: this.phoneNumbers.value.map((number: string) => ({ number: number }))
      };

      if (customerData.type === 'PF') {
        this._store.updateCustomerPf([id!, customerData]);
      } else {
        this._store.updateCustomerPj([id!, customerData]);
      }
    }
  }


  get phoneNumbers() {
    return this.form.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber() {
    const control = this._formBuilder.control('', Validators.required);
    this.phoneNumbers.push(control);
    const customerPhoneNumbers = this.customer.phoneNumbers;
    customerPhoneNumbers.push({ number: '' });
    this.customer.phoneNumbers = customerPhoneNumbers;
  }


  removePhoneNumber(index: number) {
    const phoneNumbersArray = this.form.get('phoneNumbers') as FormArray;
    phoneNumbersArray.removeAt(index);

    const updatedPhoneNumbers = phoneNumbersArray.controls.map(control => control.value);

    this.form.setControl('phoneNumbers', this._formBuilder.array(updatedPhoneNumbers));

    console.log('Updated Phone Numbers:', this.form.value.phoneNumbers);
  }


  cancel() {
    this._router.navigate(['']);
    setTimeout(()=>{
      location.reload();
    }, 100);
    this._store.listAllCustomers();
  }
}
