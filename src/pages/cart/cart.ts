import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartbooks: any;

  constructor(public navCtrl:NavController, public navParams:NavParams, public alertCtrl:AlertController,
              private dataService:DataProvider, public loadingCtrl:LoadingController) {

    this.cartbooks = this.dataService.cartBooks;

  }

  gotoDetail(book): void {
    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 800
    });
    loader.present();

    this.navCtrl.push("DetailPage", book);
  }

  checkOut():void {
    let confirm = this.alertCtrl.create({
      title: 'Checkout',
      message: 'Are you sure you want to check out?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.clearCart();
          }
        }
      ]
    });
    confirm.present();

  }

  clearCart():void {
    this.cartbooks = [];
    this.dataService.clearCart();
  }


  deleteBook(book) {
    let index = this.cartbooks.indexOf(book);

    if (index > -1) {
      this.cartbooks.splice(index, 1);
    }
  }
}
