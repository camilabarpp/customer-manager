import {Builder} from 'builder-pattern';
import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {Customer, Telephone, TypeCustomer} from "../../store/model/customer.model";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerStore} from "../../store/customer.store";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {UpdatedCustomerData} from "../../store/model/updated.customer.data";

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
    private _location: Location,
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

            // Clear existing phoneNumbers controls
            while (this.phoneNumbers.length !== 0) {
              this.phoneNumbers.removeAt(0);
            }

            // Populate phoneNumbers array
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


  // onFieldChange(fieldName: string, index?: number, value?: string) {
  //   if (fieldName === 'phoneNumbers') {
  //     this.enabledButton = true;
  //     console.log(this.enabledButton);
  //     if (!this.modifiedFields.has('phoneNumbers')) {
  //       this.modifiedFields.add('phoneNumbers');
  //     }
  //
  //     if (index !== undefined && value !== undefined) {
  //       const phoneControl = this.phoneNumbers.at(index).get('number');
  //       phoneControl?.patchValue(value);
  //     }
  //   } else {
  //     this.enabledButton = true;
  //     console.log(this.enabledButton);
  //     this.modifiedFields.add(fieldName);
  //   }
  // }

  // submitForm() {
  //   const id: string | null = this._route.snapshot.paramMap.get('id');
  //   console.log(this.form.value);
  //
  //   if (this.form.valid) {
  //     this.customer$?.subscribe(customer => {
  //       if (customer) {
  //         const customerData = Builder<Customer>()
  //           .id(id!)
  //           .name(this.form.value.name)
  //           .type(this.form.value.type)
  //           .cpf(this.form.value.cpf)
  //           .cnpj(this.form.value.cnpj)
  //           .rg(this.form.value.rg)
  //           .ie(this.form.value.ie)
  //           .phoneNumbers(this.form.value.phoneNumbers.map((number: Telephone) => ({ number: number.number })))
  //           .build();
  //         // if (customerData.type === 'PF') {
  //         //   this._store.updateCustomerPf([id!, customerData]);
  //         // } else {
  //         //   this._store.updateCustomerPj([id!, customerData]);
  //         // }
  //         console.log(customerData);
  //       }
  //     });
  //   }
  // }



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

      console.log(customerData);
    }
  }


  get phoneNumbers() {
    return this.form.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber() {
    const control = this._formBuilder.control('', Validators.required);
    this.phoneNumbers.push(control);
    // Update the customer's phoneNumbers array with the new empty entry
    const customerPhoneNumbers = this.customer.phoneNumbers;
    customerPhoneNumbers.push({ number: '' });
    this.customer.phoneNumbers = customerPhoneNumbers;
  }


  removePhoneNumber(index: number) {
    const phoneNumbersArray = this.form.get('phoneNumbers') as FormArray;
    phoneNumbersArray.removeAt(index); // Remove control from FormArray

    // Get updated phone numbers after removing the index
    const updatedPhoneNumbers = phoneNumbersArray.controls.map(control => control.value);

    // Recreate the FormArray with the updated phone numbers
    this.form.setControl('phoneNumbers', this._formBuilder.array(updatedPhoneNumbers));

    console.log('Updated Phone Numbers:', this.form.value.phoneNumbers);
  }


  cancel() {
    this._location.back();
    setTimeout(()=>{
      location.reload();
    }, 100);
    this._store.listAllCustomers();
  }
}
