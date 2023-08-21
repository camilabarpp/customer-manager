import {Component, HostListener, OnInit} from '@angular/core';
import {CustomerStore} from '../../store/customer.store';
import {Observable} from 'rxjs';
import {Customer} from '../../store/model/customer.model';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {
  customers$!: Observable<Customer[] | undefined>;
  displayedColumns: string[] = ['name', 'type', 'telephone', 'actions'];
  searchForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobileView();
  }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      searchInput: ''
    });
    this.checkMobileView();
  }

  checkMobileView() {
    if (window.innerWidth < 500) {
      this.displayedColumns = ['name', 'telephone', 'actions'];
    }
  }

  searchCustomers() {
    const searchTerm = this.searchForm.get('searchInput')?.value;
    if (searchTerm) {
      this._store.getCustomerByName(searchTerm);
    } else {
      this.refresh();
    }
  }

  editCustomer(customerId: number): void {
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
