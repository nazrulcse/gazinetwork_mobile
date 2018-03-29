import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";

/*
  Generated class for the InvoiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InvoiceProvider {

  INVOICE_URL = 'http://www.gazinetwork.one/api/v1';
  INVOICE_V2_URL = 'http://www.gazinetwork.one/api/v2';

  constructor(private http: Http) {
    console.log('Hello InvoiceProvider Provider');
  }

  all() {
    return this.http.get(this.INVOICE_URL + '/invoices')
      .map(res => res.json().response);
  }

  getInvoice(id) {
    return this.http.get(this.INVOICE_URL + '/invoices/' + id)
      .map(res => res.json().response);
  }

  createInvoice(data) {
    let contentHeader = new Headers({"Content-Type": "application/json"});
    return this.http.post(this.INVOICE_V2_URL + "/invoices/store", JSON.stringify(data), { headers: contentHeader })
      .map(res => res.json());
  }

  getOtherIncomes(page) {
    return this.http.get(this.INVOICE_V2_URL + '/invoices/other_income_invoices?page=' + page)
      .map(res => res.json().response);
  }
}
