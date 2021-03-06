import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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
  CUSTOMER_URL = 'http://www.gazinetwork.one/api/v1';
  CUSTOMER_V2_URL = 'http://www.gazinetwork.one/api/v2';
  loader: any;
  constructor(private http: Http, public loading: LoadingController) {
    this.loader = this.loading.create({
      content: "Loading..."
    }); 
  }

  all(page, query_param) {
   return this.http.get(this.CUSTOMER_V2_URL + '/customers?page=' + page + '&q=' + query_param)
      .map(res => res.json().response);
  }

  getCustomer(id) {
    return this.http.get(this.CUSTOMER_URL + '/customers/' + id)
      .map(res => res.json().response);
  }

  createCustomer(data) {
    let contentHeader = new Headers({"Content-Type": "application/json"});
    return this.http.post(this.CUSTOMER_URL + "/customers/store", JSON.stringify(data), { headers: contentHeader })
      .map(res => res.json());
  }

}
