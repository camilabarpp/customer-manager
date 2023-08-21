import {Customer} from "./model/customer.model";
import {Injectable} from "@angular/core";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {catchError, EMPTY, Observable, of, switchMap, tap} from "rxjs";
import {CustomerService} from "../service/customer.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../shared/components/error-dialog/error-dialog.component";
import {Router} from "@angular/router";

export interface CustomerState {
  customer?: Customer;
  customers?: Customer[];
}

const initialState: CustomerState = {};

@Injectable()
export class CustomerStore extends ComponentStore<CustomerState> {
  constructor(
    private _service: CustomerService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _dialog: MatDialog,
  ) {
    super(initialState);
  }

  readonly customers$: Observable<Customer[] | undefined> = this.select(state => state.customers);

  readonly listAllCustomers = this.effect<void>(() =>
    this._service.listAllCustomers.pipe(
      tapResponse(customerStates => {
          this.patchState({customers: customerStates});
          console.log(customerStates)
        },
        (error: any) => {
          console.error(error);
          this._dialog.open(ErrorDialogComponent, {
            data: 'Erro ao carregar clientes!'
          });
        }
      )
    ));

  readonly getCustomerById = this.effect<string>((customerId$) =>
    customerId$.pipe(
      switchMap((customerId) =>
        this._service.findACustomerById(customerId).pipe(
          tapResponse((customer) => {
              this.setCustomer(customer);
              this.setState({customer})
              this.patchState({customer});
              console.log(customer)
            },
            (error: any) => console.error(error)
          )
        )
      )
    ));

  readonly createCustomer = this.effect((customer$: Observable<Customer>) =>
    customer$.pipe(
      switchMap((customer) =>
        this._service.createCustomer(customer).pipe(
          tap(() => {
            this._snackBar.open('Cliente criado com sucesso!', 'Fechar', {
              duration: 5000,
            });
            this.listAllCustomers();
          }),
          catchError((error) => {
            console.error('Error creating customer:', error);
            this._snackBar.open('Erro ao criar cliente!', 'Fechar', {
              duration: 5000,
            });
            return of(null);
          })
        )
      )
    )
  );

  readonly updateCustomerPf = this.effect((request$: Observable<[string, Customer]>) => {
    return request$.pipe(
      switchMap((request) =>
        this._service.updateCustomerPf(request[0], request[1]).pipe(
          tapResponse((response) => {
              this._snackBar.open('Cliente atualizado com sucesso!', 'Fechar', {
                duration: 5000,
              });
              this.onCancel();
            },
            (error: HttpErrorResponse) => {
              this._snackBar.open('Erro ao atualizar cliente!', 'Fechar', {
                duration: 5000,
              });
              console.error(error)
            }
          ),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  });

  readonly updateCustomerPj = this.effect((request$: Observable<[string, Customer]>) => {
    return request$.pipe(
      switchMap((request) =>
        this._service.updateCustomerPj(request[0], request[1]).pipe(
          tapResponse((response) => {
              this._snackBar.open('Cliente atualizado com sucesso!', 'Fechar', {
                duration: 5000,
              });
              this.onCancel();
            },
            (error: HttpErrorResponse) => {
              this._snackBar.open('Erro ao atualizar cliente!', 'Fechar', {
                duration: 5000,
              });
              console.error(error)
            }
          ),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  });

  readonly deleteCustomer = this.effect((customerId$: Observable<number>) => {
    return customerId$.pipe(
      switchMap((customerId) =>
        this._service.deleteCustomer(customerId).pipe(
          tapResponse((response) => {
              this._snackBar.open('Cliente excluído com sucesso!', 'Fechar', {
                duration: 5000,
              });
            },
            (error: HttpErrorResponse) => {
              this._snackBar.open('Erro ao excluir cliente!', 'Fechar', {
                duration: 5000,
              });
              console.error(error)
            }
          ),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  });

  readonly getCustomerByName = this.effect<string>((customerName$) =>
    customerName$.pipe(
      switchMap((customerName) =>
        this._service.getCustomerByName(customerName).pipe(
          tapResponse((customer) => {
              this.patchState({customers: customer});
              console.log(customer)
            },
            (error: any) => console.error(error)
          )
        )
      )
    ));

  readonly setCustomer = this.updater((state, customer: Customer | undefined) => {
    return {...state, customer};
  });

  getCustomer(): Observable<Customer | undefined> {
    return this.select(state => state.customer);
  }

  onCancel() {
    this._router.navigate(['']);
    this.refresh();
  }

  refresh(): void {
    setTimeout(() => {
      location.reload();
    }, 100);
  }
}
