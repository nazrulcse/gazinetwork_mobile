import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Headers, Http} from "@angular/http";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ExpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-expense',
  templateUrl: 'expense.html',
})
export class ExpensePage {
  expense_form = {category: [], title: '', date: '', amount: '', received_by: '', voucher_no: '', description: ''}
  constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, private http: Http) {
  	this.storage.get('auth').then((auth) => {
      this.expense_form.received_by = auth.login_id;
    });

    this.loadCategory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensePage');
  }

  loadCategory() {
  	this.http.get('http://465e673c.ngrok.io/api/v1/expenses/new').map(res => res.json().response).subscribe(
  		data => {
           this.expense_form.category = data;
  		},
  		err => {
  	    
  	    }
  	);
  }

  expense_submit() {
  	console.log(this.expense_form);
  }

}
