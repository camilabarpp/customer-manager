import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "../store/model/customer.model";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
   private URL: string = 'api/customers';
  //private URL: string = 'assets/api.json';

  constructor(private _http: HttpClient) { }

  get listAllCustomers(): Observable<Customer[]> {
    return this._http.get<Customer[]>(this.URL);
  }

  findACustomerById(id: string): Observable<Customer> {
    return this._http.get<Customer>(`${this.URL}/${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this._http.post<Customer>(this.URL, customer);
  }

  updateCustomerPf(id: string, customer: Customer): Observable<Customer> {
    return this._http.patch<Customer>(`${this.URL}/pf/${id}`, customer);
  }

  updateCustomerPj(id: string, customer: Customer): Observable<Customer> {
    return this._http.patch<Customer>(`${this.URL}/pj/${id}`, customer);
  }
}
