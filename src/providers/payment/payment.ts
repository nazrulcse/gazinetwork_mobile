import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";

/*
  Generated class for the PaymentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaymentProvider {
  PAYMENT_URL = 'http://www.gazinetwork.one/api/v1';
  constructor(public http: Http) {
    console.log('Hello PaymentProvider Provider');
  }

  create(data) {
  	let contentHeader = new Headers({"Content-Type": "application/json"});
    return this.http.post(this.PAYMENT_URL + '/payment/store', JSON.stringify(data), { headers: contentHeader })
      .map(res => res.json());
  }

  customer_payments(customer_id) {
    let url = this.PAYMENT_URL + '/payments';
    if(customer_id) {
      url = this.PAYMENT_URL + '/customers/' + customer_id + '/payments' 
    }
    return this.http.get(url)
      .map(res => res.json().response);
  }
}
