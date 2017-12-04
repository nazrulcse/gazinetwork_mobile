import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomerProvider} from '../../providers/customer/customer';
import {InvoicePage} from '../../pages/invoice/invoice';

/**
 * Generated class for the CustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {
  customer = {};
  error: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerProvider) {
  	let cus_id = this.navParams.get('id');
    customerService.getCustomer(cus_id).subscribe(
      data => {
        this.customer = data;
      }, 
      err => {
        this.error = err;
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerPage');
  }

  collectPayment(invoice_id) {
    this.navCtrl.push(InvoicePage, {id: invoice_id});
  }

}
