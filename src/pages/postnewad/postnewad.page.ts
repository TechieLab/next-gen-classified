import {Component, OnInit, ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector:'post-ad',
    templateUrl:'postnewad.html',
    entryComponents: []
})

export class PostNewAd implements OnInit{
 
  private selectedCategory: string;
  private newPostForm = {}

  constructor(public navCtrl: NavController, public navParams: NavParams){
     this.selectedCategory = navParams.get('category');
  }

  logForm() {
   
  }
  
  ngOnInit(){ }

}