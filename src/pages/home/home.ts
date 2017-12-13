import { Component } from '@angular/core';
import {
  ActionSheetController, AlertController, Keyboard, LoadingController, MenuController, NavController, ToastController,
} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  books:any;
  searchQuery: string = '';
  items:any;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, private dataService:DataProvider,
              public alertCtrl:AlertController, public menuCtrl:MenuController, public loadingCtrl:LoadingController,
              public toastCtrl:ToastController, public Keyboard:Keyboard) {

    this.books = this.dataService.bookList;
    this.items = this.dataService.bookList;
    //this.initializeItems();
  }

  initializeItems() {
    this.books = this.items;
  }

  getItems(ev: any) {
    this.initializeItems();

    // set q to the value of the searchbar
    var q = ev.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.books = this.books.filter((book) => {
      if(book.title && q) {
        if (book.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

  }


  openMenu() {
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  gotoDetail(book):void {
      let loader = this.loadingCtrl.create({
        content: "Loading...",
        duration: 400
      });
      loader.present();

    this.navCtrl.push("DetailPage", book);
  }

  addBook():void {
    let prompt = this.alertCtrl.create({
      title: 'Add Book',
      message: "Add the following information to add a Book.",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'author',
          placeholder: 'Author'
        },
        {
          name: 'bookDesc',
          placeholder: 'Description'
        },
        {
          name: 'genre',
          placeholder: 'Genre'
        },
        {
          name: 'image',
          placeholder: 'Insert Image URL'
        },
        {
          name: 'pages',
          placeholder: 'Number of Paged'
        },        {
          name: 'publishDate',
          placeholder: 'Year Published'
        }


      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.dataService.addNewBook(data);
          }
        }
      ]
    });
    prompt.present();
  }

  deleteBook(book):void {
    this.dataService.deleteBook(book.id);
  }

  editBook(book) {
    let prompt = this.alertCtrl.create({
      title: "Edit Book",
      inputs: [
        {name: "title",
          value: book.title},
        {name: "author",
        value: book.author},
        {name: "genre",
        value: book.genre},
        {name: "pages",
        value: book.pages},
        {name: "publishDate",
        value: book.publishDate}
      ],
      buttons: [
        {
          text: "Cancel"
        },

        {
          text: "Save",
          handler: data => {
            this.dataService.updateBook(book.id, data.title, data.author, data.genre, data.pages, data.publishDate);

          }
        }
      ]
    });
    prompt.present();

  }

  addToFavorites(book) {
    this.dataService.addToMyBooks(book);

    let toast = this.toastCtrl.create({
      message: 'Book was added successfully',
      duration: 2000
    });
    toast.present();

  }

  goToCart() {
    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 800
    });
    loader.present();

    this.navCtrl.push("CartPage");
  }

  gotoMyBooks() {
    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 500
    });
    loader.present();

    this.navCtrl.push("FavoritesPage");
  }


}
