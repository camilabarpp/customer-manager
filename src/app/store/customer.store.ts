import {Customer} from "./customer.model";
import {Injectable, OnDestroy} from "@angular/core";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {Observable, switchMap, tap} from "rxjs";
import {CustomerService} from "../service/customer.service";

export interface CustomerState {
    customerState?: Customer;
}

const initialState: CustomerState = {};

@Injectable({ providedIn: 'root' })
export class CustomerStore extends ComponentStore<CustomerState> implements OnDestroy {
    constructor(private customerService: CustomerService) {
        super(initialState);
    }
    readonly listAllCustomers = this.effect((request$: Observable<void>) => {
        return request$.pipe(
            switchMap(() =>
                this.customerService.listAllCustomers.pipe(
                    tapResponse(response => {
                        console.log(response);
                        this.setCustomers(response);
                    },
                (error: any) => console.error(error)
                    )
                )
            )
        );
    });

    readonly getACustomerById = this.effect((request$: Observable<string>) => {
        return request$.pipe(
            switchMap((id: string) => this.customerService.findACustomerById(id).pipe(
                tapResponse(response => {
                    console.log(response);
                    this.setCustomer(response);
                },
                    (error: any) => console.error(error)
                )
            ))
        );
    });

    // readonly getACustomerById = this.effect((request$: Observable<string>) => {
    //     return request$.pipe(
    //         switchMap((id: string) =>
    //             this.customerService.findACustomerById.pipe(
    //                 tapResponse(response => {
    //                     console.log(response);
    //                     this.setCustomer(response);
    //                 },
    //                     (error: any) => console.error(error)
    //                 )
    //             )
    //         )
    //     );
    // });

    // readonly createCliente = this.effect<Cliente>(cliente =>
    //     this.customerService.createCliente(cliente).pipe(
    //         tap(newCliente => {
    //             this.patchState(state => ({
    //                 clientes: [...state.clientes, newCliente]
    //             }));
    //         })
    //     )
    // );

    readonly setCustomers = this.updater((state, customers: Customer[] | undefined)  => {
        return {...state, customers};
    });

    readonly setCustomer = this.updater((state, customer: Customer | undefined)  => {
        return {...state, customer};
    });
}