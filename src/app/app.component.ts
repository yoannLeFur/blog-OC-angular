import { Component } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyAnIh7QcmBYI1zxlwlqGFb6uXwF1HplgJQ",
      authDomain: "blog-aa726.firebaseapp.com",
      databaseURL: "https://blog-aa726.firebaseio.com",
      projectId: "blog-aa726",
      storageBucket: "blog-aa726.appspot.com",
      messagingSenderId: "157933993337",
      appId: "1:157933993337:web:913cb8fed2fffc3e"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
