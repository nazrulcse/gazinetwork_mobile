import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";

/*
  Generated class for the ExpenseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExpenseProvider {

  EXPENSE_URL = 'http://www.gazinetwork.one/api/v1';
  EXPENSE_V2_URL = 'http://www.gazinetwork.one/api/v2';

  constructor(private http: Http) {
    console.log('Hello ExpenseProvider Provider');
  }

  all(user_id, page, date) {
    return this.http.get(this.EXPENSE_V2_URL + '/expenses?id=' + user_id + '&page=' + page)// + '&date=' + date)
    .map(res => res.json().response);
  }

  getExpense(id) {
    return this.http.get(this.EXPENSE_V2_URL + '/expenses/' + id)
      .map(res => res.json().response);
  }

  createExpense(data) {
    let contentHeader = new Headers({"Content-Type": "application/json"});
    return this.http.post(this.EXPENSE_URL + "/expenses/store", JSON.stringify(data), { headers: contentHeader })
      .map(res => res.json());
  }
}
