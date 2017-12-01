import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {InvoiceProvider} from '../../providers/invoice/invoice';

/**
 * Generated class for the InvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {
  invoice: Object;
  bill_paid = false;
  @ViewChild('payment_btn') payment_btn: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private invoiceService: InvoiceProvider, private alert: AlertController ) {
  	this.invoice = invoiceService.getInvoice(1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
  }

  makePayment(invoice_id) {
     let confirm = this.alert.create({
      title: 'Customer Bill Payment?',
      message: 'Are you sure to make this bill payment?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            // this.navCtrl.setRoot(ProfilePage);
            this.bill_paid = true;
          }
        }
      ]
    });
    confirm.present();
  }

}
