import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {CustomerStore} from '../../store/customer.store';
import {Observable, pipe} from 'rxjs';
import {Customer} from '../../store/model/customer.model';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../shared/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {
  customers$!: Observable<Customer[] | undefined>;
  displayedColumns: string[] = ['name', 'type', 'telephone', 'actions'];
  constructor(
    private _store: CustomerStore,
    private _router: Router,
    private _dialog: MatDialog,
  ) {
    this.customers$ = this._store.customers$;
  }
  refresh(): void {
    setTimeout(()=>{
      location.reload();
    }, 100);
  }

  ngOnInit(): void {
    // this.refresh();
  }

  editCustomer(customerId: number): void {
    // Navegue para a rota de edição, passando o ID do cliente como parâmetro
    this._router.navigate(['edit', customerId,]);
  }


  onAddCustomer(): void {
    this._router.navigate(['register']);
  }

  deleteCustomer(id: number) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._store.deleteCustomer(id);
        this.refresh();
      }
    });
  }
}
