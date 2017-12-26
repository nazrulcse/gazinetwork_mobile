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
    fromDate = new Date().toISOString().slice(0, 10);
    toDate = new Date().toISOString().slice(0, 10);
    agc_id = '';
    collection = 'Loading...';
    error: any;
    calendar = {
        year: this.myDate.getFullYear(),
        month: this.myDate.getMonth() + 1,
        months: [
                  {name: 'January', payment: false},
                  {name: 'February', payment: false},
                  {name: 'March', payment: false},
                  {name: 'April', payment: false},
                  {name: 'May', payment: false},
                  {name: 'June', payment: false},
                  {name: 'July', payment: false},
                  {name: 'August', payment: false},
                  {name: 'September', payment: false},
                  {name: 'October', payment: false},
                  {name: 'November', payment: false},
                  {name: 'December', payment: false},
                ]
    };


    myEvents = [];

    constructor(public navCtrl: NavController, private paymentService: PaymentProvider, private storage: Storage) {
     this.storage.get('auth').then((auth) => {
      if(auth) {
        this.agc_id = auth.id;
      	if(auth.type == 'customer') {
      		this.is_customer = true;
      		this.loadPayments(auth.id, this.calendar.year);
      	}
      	else {
      		this.loadPaymentCollection();
      	}
      }
    });
  }

  changeYear(dir) {
    this.calendar.year = this.calendar.year + dir;
    this.loadPayments(this.agc_id, this.calendar.year);
  }

  loadPayments(customer_id, year) {
  	    let events = [];
  	    if(!customer_id) {
          return '';
  	    }
	    this.paymentService.customer_monthly_payments(customer_id, year).subscribe(
	    	data => {
          console.log(data);
          for(let i = 0; i < this.calendar.months.length; i++) {
            let month = this.calendar.months[i];
            this.calendar.months[i].payment = false;
            for(let j = 0; j < data.length; j++) {
               if(data[j] == month.name) {
                  this.calendar.months[i].payment = true;
               }
            }
          }
	    	}, 
	    	err => {}
	    );
	}

  loadPaymentCollection() {
      this.collection = 'Loading...'
      this.paymentService.agent_collection(this.agc_id, this.fromDate, this.toDate).subscribe(
        data => {
            this.collection = data.amount;
        }, 
        err => {
          this.error = err;
        }
      );
  }

	onChange() {

	}

	eventClicked() {

	}

}
