import { Component, ViewChild, Injectable } from '@angular/core';
import { LogoutPage } from '../../pages/logout/logout';
import { Platform, Nav } from 'ionic-angular';

/**
 * Generated class for the NavbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})

// @Injectable()
export class NavbarComponent {

  pages: Array<{title: string, component: any}>;
  data: any;
  // @ViewChild(Nav) nav: Nav;

  constructor() {
    this.pages = [];    
  }

  callme(nv): void {
    this.pages + nv;
    console.log(this.pages);
    this.data;
  } 

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
  }

}
