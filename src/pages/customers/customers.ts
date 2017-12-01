import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomerProvider} from '../../providers/customer/customer';
import {CustomerPage} from '../../pages/customer/customer';

/**
 * Generated class for the CustomersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
})
export class CustomersPage {
  customers: any;
  filter_customers: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, customerService: CustomerProvider) {
  	this.customers = customerService.all();
    this.filter_customers = this.customers;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomersPage');
  }

  getcustomer(id) {
  	this.navCtrl.push(CustomerPage, {id: id});
  }

  initializeFilter() {
    this.customers = this.filter_customers;
  }

  searchCustomer(event) {
    this.initializeFilter();
    let value = event.target.value;
    if (value && value.trim() != '') {
      this.customers = this.customers.filter((item) => {
        let name = item.name.toLowerCase(); 
        let term = value.toLowerCase();
        return (name.indexOf(term) > -1);
      });
    }
  }
}
