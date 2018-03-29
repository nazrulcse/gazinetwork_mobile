import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Headers, Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import { ExpensesPage } from '../expenses/expenses';

/**
 * Generated class for the CreateExpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-expense',
  templateUrl: 'create-expense.html',
})
export class CreateExpensePage {
  expense_category = [];
  loader: any;
  error: any;
  success: any;
  localDate = new Date();
  expense_form = {category: '', user_id: '', title: '', date: this.localDate.toISOString().slice(0,10), amount: '', received_by: '', voucher_no: '', description: ''}
  constructor(public navCtrl: NavController, 
    private storage: Storage, 
    public navParams: NavParams, 
    private http: Http,
    private loading: LoadingController
    ) {
      this.storage.get('auth').then((auth) => {
        this.expense_form.received_by = auth.login_id;
        this.expense_form.user_id = auth.id;
      });

      this.loadCategory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateExpensePage');
  }

  loadCategory() {
  	this.http.get('http://gazinetwork.one/api/v1/expenses/new').map(res => res.json().response).subscribe(
  		data => {
           this.expense_category = data;
  		},
  		err => {
  	    
  	  }
  	);
  }

  setDate($event) {
     this.expense_form.date = $event.getFullYear() + "-" + ($event.getMonth() + 1) + "-" + $event.getDate();
  }

  expense_submit() {
    let contentHeader = new Headers({"Content-Type": "application/json"});
    let nav = this.navCtrl;
    this.loader = this.loading.create({
      content: "Creating Expense..."
    }); 
    this.loader.present();
    this.http.post('http://gazinetwork.one/api/v1/expenses/store', JSON.stringify(this.expense_form), { headers: contentHeader })
      .map(res => res.json())
      .subscribe(
        data => {
          this.loader.dismiss();
          let response = data.response;
          if(data.status == 200) {
            this.success = data.response;
            this.error = '';
            setTimeout(function() {
              nav.setRoot(ExpensesPage);
            }, 3000);
          }
          else {
            this.success = '';
            this.error = data.response;
          }
        },
        err =>  { 
          this.error = err;
          this.success = '';
          this.loader.dismiss();
      }
    ); 
  }
}
