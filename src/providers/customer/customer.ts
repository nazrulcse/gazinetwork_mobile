import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomerProvider {
  CUSTOMERS = [
    {id: 1, name: 'Md Nazrul Islam', mobile: '01722647240', address: '', tv: '1', payment_due: '250'},
    {id: 2, name: 'Mr. Xyz', mobile: '01722636524', address: '', tv: '2', payment_due: '350'},
    {id: 3, name: 'Miss Abc', mobile: '01722625424', address: '', tv: '2', payment_due: '300'}
  ]
  // constructor(public http: HttpClient) {
  constructor() {
    console.log('Hello CustomerProvider Provider');
  }

  all() {
    return this.CUSTOMERS;
  }

  getCustomer(id) {
    for(let i = 0; i < this.CUSTOMERS.length; i++) {
    	if(this.CUSTOMERS[i].id == id) {
          return this.CUSTOMERS[i]
    	}
    }
    return {error: 'No customer found'};
  }

}
