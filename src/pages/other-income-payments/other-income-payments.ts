import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PaymentProvider } from '../../providers/payment/payment';
import {Storage} from "@ionic/storage";

/**
 * Generated class for the OtherIncomePaymentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-other-income-payments',
  templateUrl: 'other-income-payments.html',
})
export class OtherIncomePaymentsPage {
  payments: Array<any>;
  error: any;
  loader: any;
  page = 1;
  reActiveInfinite: any;
  current_user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private paymentService: PaymentProvider, private loading: LoadingController) {
    this.storage.get('auth').then((auth) => {
      if(auth) {
        this.current_user = auth;
        this.loadPayments();
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherIncomePaymentsPage');
  }

  loadPayments() {
    this.custom_loading(true);
    this.paymentService.other_income_payments(this.current_user.id, this.page).subscribe(
    	data => {
    		this.payments = data;
        this.custom_loading(false);
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
    this.paymentService.other_income_payments(this.current_user.id, this.page).subscribe(
      data => {
        console.log(data);
        if (data.length > 0) {
          for (let payment of data) {
            this.payments.push(payment);
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
