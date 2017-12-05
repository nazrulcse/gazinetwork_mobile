import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import {InvoiceProvider} from '../../providers/invoice/invoice';
import {InvoicesPage} from '../../pages/invoices/invoices';
import {PaymentProvider} from '../../providers/payment/payment';
import {Storage} from "@ionic/storage";

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
  invoice = {due: 0};
  bill_paid = false;
  error: any;
  payment = {amount: 0, full_paid: false, invoice_id: 0, receiver_id: 0};
  loader: any;
  @ViewChild('payment_btn') payment_btn: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private invoiceService: InvoiceProvider, private alert: AlertController, private paymentService: PaymentProvider, private loading: LoadingController ) {
  	let invoice_id = this.navParams.get('id');
    invoiceService.getInvoice(invoice_id).subscribe(
      data => {
        this.invoice = data;
      }, 
      err => {
        this.error = err;
      }
    );

    this.storage.get('auth').then((auth) => {
      if(auth) {
        this.payment.receiver_id = auth.id;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
  }

  makePayment(id) {
     let navbar = this.navCtrl;
     let ploader = this.loading.create({
          content: "Creating Payment..."
     });
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
            this.payment.invoice_id = id;
            ploader.present();
            this.paymentService.create(this.payment).subscribe(data => {
              this.bill_paid = true;
              setTimeout(function() {
                navbar.setRoot(InvoicesPage);
                ploader.dismiss();
              }, 5000);
            }, 
            err => {
              this.error = err;
              ploader.dismiss();
            });
          }
        }
      ]
    });
    confirm.present();
  }

  markFullPaid(e) {
    if(e.target.checked) {
      this.payment.amount = this.invoice.due;
    }
  }

}
