import {Component, OnInit} from '@angular/core';
import {CustomerStore} from '../../store/customer.store';
import {Observable} from 'rxjs';
import {Customer} from '../../store/customer.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {
  customers$!: Observable<Customer[] | undefined>;
  displayedColumns: string[] = ['name', 'type', 'telephone'];
  constructor(
    private _store: CustomerStore,
    private _router: Router,
  ) {
    this.customers$ = this._store.customers$;
  }

  ngOnInit(): void {
    this._store.listAllCustomers();
  }

  editCustomer(customerId: number): void {
    // Navegue para a rota de edição, passando o ID do cliente como parâmetro
    this._router.navigate(['edit', customerId,]).then(r => console.log(r));
    console.log(customerId);
  }
}
