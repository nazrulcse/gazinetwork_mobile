import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {PaymentProvider} from '../../providers/payment/payment';

// @IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {
  customer_id: any;
  payments: Array<any>;
  error: any;

  constructor(public navCtrl: NavController, private storage: Storage, private paymentService: PaymentProvider) {
    this.storage.get('auth').then((auth) => {
      if(auth) {
      	if(auth.type == 'customer') {
      		this.loadPayments(auth.id);
      	}
      	else {
      		this.loadPayments('');
      	}
      }
    });
  }

  loadPayments(customer_id) {
    this.paymentService.customer_payments(customer_id).subscribe(
    	data => {
    		this.payments = data;
    	}, 
    	err => {
    		this.error = err;
    	}
    );
  }
}
