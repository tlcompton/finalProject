import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  book:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService:DataProvider,
              public toastCtrl:ToastController) {
    this.book = this.navParams.data;
  }

  ionViewDidLoad() {
  }

  addToCart(book) {
    this.dataService.addToCart(book);

    let toast = this.toastCtrl.create({
      message: 'Book added to cart.',
      duration: 1000,
      position: 'top'
    });

    toast.present();

  }

  addToFavorites(book) {
    this.dataService.addToMyBooks(book);

    let toast = this.toastCtrl.create({
      message: 'Book was added successfully',
      duration: 1000,
      position: 'top'
    });
    toast.present();

  }




}
