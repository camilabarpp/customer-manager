import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "../store/customer.model";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private URL: string = 'api/customers';

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
}
