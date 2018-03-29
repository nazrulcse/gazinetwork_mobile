import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ExpenseProvider } from '../../providers/expense/expense';
import { ExpensePage } from '../expense/expense'
import { Storage } from "@ionic/storage";

/**
 * Generated class for the ExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expenses',
  templateUrl: 'expenses.html',
})
export class ExpensesPage {
  expenses = [];
  error: any;
  loader: any;
  page = 1;
  reActiveInfinite: any;
  current_user: any;
  date: any;
  localDate = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams, private expenseService: ExpenseProvider, private loading: LoadingController, private storage: Storage) {
    this.storage.get('auth').then((auth) => {
      if (auth) {
        this.current_user = auth.id;
        this.date = this.format_date(this.localDate);

        this.getExpenses();
      }
      else {
        this.error = 'You need to signin to view his page.'
      }
    }).catch((error) => this.error = error);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensesPage');
  }

  getExpense(id) {
  	this.navCtrl.push(ExpensePage, {id: id});
  }

  format_date(date) {
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }

  getExpenses() {
    this.custom_loading(true);
    this.expenseService.all(this.current_user, this.page, this.date).subscribe(
      data => {
        console.log(data);
        this.custom_loading(false);
        this.expenses = data;
      },
      err => {
        this.error = err;
        this.custom_loading(false);
      }
    );
  }

  doInfinite(infiniteScroll) {
    this.page += 1;
    this.reActiveInfinite = infiniteScroll;
    this.expenseService.all(this.current_user, this.page, this.date).subscribe(
      data => {
        console.log(data);
        if (data.length > 0) {
          for (let expense of data) {
            this.expenses.push(expense);
          }
          infiniteScroll.complete();
        }
        else {
          infiniteScroll.enable(false);
        }
      },
      err => {
        this.error = err;
        this.page -= 1;
      }
    );
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
