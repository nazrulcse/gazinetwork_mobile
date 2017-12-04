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

  INVOICE_URL = 'http://9ccdb0a5.ngrok.io/api/v1';
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
}
