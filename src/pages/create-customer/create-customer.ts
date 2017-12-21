import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {CustomerProvider} from '../../providers/customer/customer';
import {CustomerPage} from '../../pages/customer/customer';

/**
 * Generated class for the CreateCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-customer',
  templateUrl: 'create-customer.html',
})
export class CreateCustomerPage {
	customer_form = {name: '', email: '', phone: '', customer_id: "CU" + Math.round(Math.random() * 1000000), address: '', 
	                 customer_road: '', customer_house: '', customer_flat: '', customer_tv_count: 1, customer_monthly_bill: '', 
	                 customer_is_free: false, customer_set_top_box_iv: false, customer_zone: '', customer_connection_date: '' }
	localDate = new Date();
	loader: any;
	error: any;
	success: any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	private customerService: CustomerProvider,
  	public loading: LoadingController) {
  	this.customer_form.customer_connection_date = this.localDate.toISOString().slice(0,10);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCustomerPage');
  }

  setDate($event) {
     this.customer_form.customer_connection_date = $event.getFullYear() + "-" + ($event.getMonth() + 1) + "-" + $event.getDate();
  }

  customer_submit() {
  	let nav = this.navCtrl;
  	this.loader = this.loading.create({
      content: "Creating Customer..."
    }); 
    this.loader.present();
  	this.customerService.createCustomer(this.customer_form).subscribe(
        data => {
          this.loader.dismiss();
          let response = data.response;
          if(data.status == 200) {
            this.success = data.response;
            this.error = '';
            setTimeout(function() {
              nav.setRoot(CustomerPage, {id: data.id});
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
