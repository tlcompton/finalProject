import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";


@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  mybooks:any;

  constructor(public navCtrl:NavController, public navParams:NavParams, public alertCtrl:AlertController,
              private dataService:DataProvider, public loadingCtrl:LoadingController) {

    this.mybooks = this.dataService.myBooks;

  }

  gotoDetail(book):void {
    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 800
    });
    loader.present();

    this.navCtrl.push("DetailPage", book);
  }

  goToCart() {
    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 800
    });
    loader.present();

    this.navCtrl.push("CartPage");
  }

  deleteBook(book) {
    let index = this.mybooks.indexOf(book);

    if(index > -1) {
      this.mybooks.splice(index, 1);
    }
  }

}
