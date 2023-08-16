import {Component, Input, OnInit} from '@angular/core';
import {CustomerStore} from "../../store/customer.store";

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {
  searchResults: any[] = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
    // ... Add more customer objects here
  ];

  constructor(private _store: CustomerStore) {
  }

  ngOnInit(): void {
    this._store.listAllCustomers();
  }
}
