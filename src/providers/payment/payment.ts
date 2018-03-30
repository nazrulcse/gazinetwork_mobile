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
  PAYMENT_V2_URL = 'http://www.gazinetwork.one/api/v2';
  constructor(public http: Http) {
    console.log('Hello PaymentProvider Provider');
  }

  create(data) {
  	let contentHeader = new Headers({"Content-Type": "application/json"});
    return this.http.post(this.PAYMENT_URL + '/payment/store', JSON.stringify(data), { headers: contentHeader })
      .map(res => res.json());
  }

  customer_payments(auth, page, query_params) {
    let url = this.PAYMENT_URL + '/payments';
    if (auth.type == 'customer') {
      url = this.PAYMENT_URL + '/customers/' + auth.id + '/payments' 
    }
    else {
      url = this.PAYMENT_V2_URL + '/payments?receiver_id=' + auth.id + '&page=' + page + '&q=' + query_params;
    }
    return this.http.get(url)
      .map(res => res.json().response);
  }

  other_income_payments(receiver_id, page) {
    return this.http.get(this.PAYMENT_V2_URL + '/payments/other_income_payments?receiver_id=' + receiver_id + '&page=' + page)
    .map(res => res.json().response);
  }

  customer_monthly_payments(customer_id, year) {
      return this.http.get(this.PAYMENT_URL + '/customers/' + customer_id + '/payments/state?year=' + year)
      .map(res => res.json().response);
  }

  agent_collection(agent_id, from, to) {
    let contentHeader = new Headers({"Content-Type": "application/json"});
    return this.http.post(this.PAYMENT_URL + '/payments/collection', JSON.stringify({id: agent_id, from: from, to: to}), { headers: contentHeader })
      .map(res => res.json().response);
  }
}
