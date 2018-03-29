import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Headers, Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import { ExpenseProvider } from '../../providers/expense/expense';

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
  expense = { id: '', category: '', title: '', date: '', amount: '', description: '', is_approved: '', voucher_no: '' };
  loader: any;
  error: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private loading: LoadingController, private expenseService: ExpenseProvider) {
    this.expense.id = this.navParams.get('id');
    console.log(this.expense.id);
    this.custom_loading(true);
    expenseService.getExpense(this.expense.id).subscribe(
      data => {
        this.custom_loading(false);
        console.log(data);
        data.id = this.expense.id;
        this.expense = data;
      }, 
      err => {
        this.custom_loading(false);
        this.error = err;
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensePage');
  }

  custom_loading(flag, message = 'Loading...') {
    if (flag) {
      this.loader = this.loading.create({
        content: message
      });
      this.loader.present();
    }
    else {
      this.loader.dismiss();
    }
  }
}
