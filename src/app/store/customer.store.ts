import {Customer} from "./customer.model";
import {Injectable, OnDestroy} from "@angular/core";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {catchError, EMPTY, Observable, of, switchMap, tap} from "rxjs";
import {CustomerService} from "../service/customer.service";
import {HttpErrorResponse} from "@angular/common/http";

export interface CustomerState {
  customer?: Customer;
  customers?: Customer[];
}

const initialState: CustomerState = {};

@Injectable()
export class CustomerStore extends ComponentStore<CustomerState> {
  constructor(private _service: CustomerService) {
    super(initialState);
  }

  readonly customer$: Observable<Customer | undefined> = this.select(state => state.customer);
  readonly customers$: Observable<Customer[] | undefined> = this.select(state => state.customers);

    readonly listAllCustomers = this.effect<void>(() =>
        this._service.listAllCustomers.pipe(
            tap(customerStates => {
              this.patchState({ customers: customerStates });
              console.log(customerStates)
            })

        )
    );

  readonly createCustomer = this.effect((customer$: Observable<Customer>) =>
    customer$.pipe(
      switchMap((customer) =>
        this._service.createCustomer(customer).pipe(
          tap(() => {
            this.listAllCustomers();
            console.log(customer)
          }), // Por exemplo, atualize a lista de clientes após criar um novo
          catchError((error) => {
            console.error('Error creating customer:', error);
            return of(null);
          })
        )
      )
    )
  );

  readonly getCustomerById = this.effect<string>((customerId$) =>
    customerId$.pipe(
      switchMap((customerId) =>
        this._service.findACustomerById(customerId).pipe(
          tapResponse((customer) => {
            this.setCustomer(customer);
            this.setState({ customer })
            this.patchState({ customer });
            console.log(customer)
          },
            (error: any) => console.error(error)
        )
      )
    )
  )
);

  readonly fetchCustomerById = this.effect<string>((id$) =>
    id$.pipe(
      switchMap((id) =>
        this._service.findACustomerById(id).pipe(
          tapResponse(
            (response) => {
              this.setCustomer(response)
              console.log(response)
            },
            (error: HttpErrorResponse) => {
              console.log('deu erro --');
              // this.setErrors(error);
            }
          ),
          catchError(() => {
            // this.setErrors(new Error('Erro desconhecido.'));
            return EMPTY;
          })
        )
      )
    )
  );

    readonly setCustomers = this.updater((state, customers: Customer[] | undefined)  => {
        return {...state, customers};
    });

    readonly setCustomer = this.updater((state, customer: Customer | undefined)  => {
        return {...state, customer};
    });

    getCustomers(): Observable<Customer[] | undefined> {
        return this.select(state => state.customers);
    }

    getCustomer(): Observable<Customer | undefined> {
        return this.select(state => state.customer);
    }
}
