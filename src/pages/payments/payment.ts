import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {PaymentProvider} from '../../providers/payment/payment';
import { Pagination } from 'ionic2-pagination';

// @IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {
  is_customer = false;
  payments: Array<any>;
  error: any;
  loader: any;
  page = 1;
  reActiveInfinite: any;
  current_user: any;
  query_params = '';

  constructor(public navCtrl: NavController, private storage: Storage, private paymentService: PaymentProvider, private loading: LoadingController) {
    this.storage.get('auth').then((auth) => {
      if(auth) {
        this.current_user = auth;
      	if(auth.type == 'customer') {
      		this.is_customer = true;
      	}
        this.loadPayments();
      }
    });
  }

  searchPayment() {
    this.page = 1;
    this.loadPayments();
    if(this.reActiveInfinite) {
      this.reActiveInfinite.enable(true);
    }
  }

  search_cancel(event) {
    console.log('cancelling');
    this.page = 1;
    this.query_params = '';
    this.loadPayments();
    if(this.reActiveInfinite) {
      this.reActiveInfinite.enable(true);
    }
  }

  loadPayments() {
    this.custom_loading(true);
    this.paymentService.customer_payments(this.current_user, this.page, this.query_params).subscribe(
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
    this.paymentService.customer_payments(this.current_user, this.page, this.query_params).subscribe(
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
