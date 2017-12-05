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
  paginationInfo = {
    page: 1,
    pageSize: 2,
    rowCount: 2,
    pageCount: 2,
  }
  loader: any;

  constructor(public navCtrl: NavController, private storage: Storage, private paymentService: PaymentProvider, private loading: LoadingController) {
    this.storage.get('auth').then((auth) => {
      if(auth) {
      	if(auth.type == 'customer') {
      		this.is_customer = true;
      		this.loadPayments(auth.id);
      	}
      	else {
      		this.loadPayments('');
      	}
      }
    });
  }

  changePage(current_page) {
    this.paginationInfo.page = current_page;
  }

  loadPayments(customer_id) {
    this.loader = this.loading.create({
          content: "Loading..."
        }); 
    this.loader.present();
    this.paymentService.customer_payments(customer_id).subscribe(
    	data => {
    		this.payments = data;
        this.loader.dismiss();
    	}, 
    	err => {
    		this.error = err;
        this.loader.dismiss();
    	}
    );
  }
}
