import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the InvoiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InvoiceProvider {

  INVOICES = [
    {id: 1, name: 'Md Nazrul Islam', mobile: '01722647240', address: '', amount: '250', month: 'April'},
    {id: 2, name: 'Mr. Xyz', mobile: '01722636524', address: '', amount: '350', month: 'May'},
    {id: 3, name: 'Miss Abc', mobile: '01722625424', address: '', amount: '300', month: 'June'}
  ]
  // constructor(public http: HttpClient) {
  constructor() {
    console.log('Hello InvoiceProvider Provider');
  }

  all() {
    return this.INVOICES;
  }

  getInvoice(id) {
    for(let i = 0; i < this.INVOICES.length; i++) {
    	if(this.INVOICES[i].id == id) {
          return this.INVOICES[i]
    	}
    }
    return {error: 'No customer found'};
  }
}
