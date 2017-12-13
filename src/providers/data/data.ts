import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs";


export interface Book {
  id?: string;
  author: string;
  bookDesc: string;
  genre: string;
  image: string;
  pages: number;
  publishDate: string;
  title: string
}


@Injectable()
export class DataProvider {

  bookListRef:AngularFirestoreCollection<Book>;
  bookList: Observable<Book[]>;
  myBooks: Book[] = [];
  cartBooks: Book[] = [];

  constructor(private afs:AngularFirestore) {
    this.bookListRef = this.afs.collection<Book>('Books');
    this.bookList = this.bookListRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Book;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  addToCart(book) {
    this.cartBooks.push(book);
  }

  deleteBook(bookID):void {
    this.bookListRef.doc(bookID).delete();
  }

  addToMyBooks(book) {
    this.myBooks.push(book);
  }

  addNewBook(bookInfo):void {
    if(bookInfo) {
      this.bookListRef.add(bookInfo);
    }

  }



  updateBook(bookID, newTitle, newAuthor, newGenre, newPages, newPublishDate) {
    this.bookListRef.doc(bookID).update({"title": newTitle});
    this.bookListRef.doc(bookID).update({"author": newAuthor});
    this.bookListRef.doc(bookID).update({"genre": newGenre});
    this.bookListRef.doc(bookID).update({"pages": newPages});
    this.bookListRef.doc(bookID).update({"publishDate": newPublishDate});

  }

}
