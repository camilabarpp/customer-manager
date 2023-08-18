import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Customer, Telephone, TypeCustomer} from "../../store/customer.model";
import {CustomerStore} from "../../store/customer.store";
import {Observable, of} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.scss']
})
export class CustomerRegisterComponent implements OnInit {
  customer$: Observable<Customer | undefined> | undefined;
  form!: FormGroup;
  phoneNumber!: FormGroup;
  typeOptions: TypeCustomer[] = [TypeCustomer.PF, TypeCustomer.PJ];

  constructor(
    private _store: CustomerStore,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
  ) {}

  createForm(): void {
    this.form = this._formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      type: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required]),
      rg: new FormControl('', [Validators.required]),
      ie: new FormControl('', [Validators.required]),
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
              name: customer.name,
              type: customer.type,
              cpf: customer.cpf,
              cnpj: customer.cnpj,
              rg: customer.rg,
              ie: customer.ie,
              phoneNumbers: customer.phoneNumbers.map((number: Telephone) => {
                return this._formBuilder.group({
                  id: [number.id],
                  number: [number.number, Validators.required]
                });
              })
            });
          }
        }
      );
      this.createForm();
    }
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
    }
  }

  get phoneNumbers() {
    return this.form.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber() {
    // this.phoneNumbers.push(this.createFormGroup());
    const control = this._formBuilder.control('', Validators.required);
    this.phoneNumbers.push(control);
  }

  removePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index);
  }

  initializePhoneNumbers(phoneNumbers: Telephone[]) : FormGroup[] {
    return phoneNumbers.map((number: Telephone) => {
      return this._formBuilder.group({
        id: [number.id],
        number: [number.number, Validators.required]
      });
    });
  }

}
