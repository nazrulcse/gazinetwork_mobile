import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PaymentProvider} from '../../providers/payment/payment';
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
	is_customer = false;
    eventSource;
    viewTitle;
    isToday: boolean;
    myDate = new Date();
    calendar = {
        mode: 'month',
        currentDate: new Date()
    };

    myEvents = [];

    constructor(public navCtrl: NavController, private paymentService: PaymentProvider, private storage: Storage) {
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

  loadPayments(customer_id) {
  	    let events = [];
  	    if(!customer_id) {
          return '';
  	    }
	    this.paymentService.customer_payments(customer_id).subscribe(
	    	data => {
	    		for(var i = 0; i < data.length; i++) {
	    			let eventDate = new Date(data[i].date);
	    			events.push({title: 'Customer Payment', starts: eventDate, ends: eventDate});
	    			this.myEvents = events;
	    		}
	    	}, 
	    	err => {}
	    );
	}

	onChange() {

	}

	eventClicked() {

	}

}
