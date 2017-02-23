import { Component , OnInit, Inject } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import {Http, Headers, Response, RequestOptions, URLSearchParams,Jsonp} from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {FiltersPage}   from '../filters/filters.page';
import {CatalogPage} from '../catalog/catalog.page';
import { VendorService } from '../../app/services/vendor.service';
import { IPostService, PostService } from '../post/post.service';

@Component({
  selector: 'search-page',
  templateUrl: 'search.html',
  providers:[PostService]
})

export class SearchPage implements OnInit {
  selectedCategory: string;
  results: any[];
  categories: string[];
  search = new FormControl();
  items: Observable<Array<string>>;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams, public modalCtrl: ModalController,@Inject(PostService) public postService: IPostService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedCategory = navParams.get('category');
    this.categories = ["Mobile", "Electronics", "Home", "Entertainment", "Pet Care", "Education"];

    this.results = [{ Title: 'Mouse', Price: '200' },
                  { Title: 'Mouse', Price: '200' },
                  { Title: 'Mouse', Price: '200' }
                  ];
  }

  gotoFiltersPage() {
    //this.navCtrl.push(FiltersPage, {});
    let profileModal = this.navCtrl.push(FiltersPage, { userId: 8675309 });
  }
  getByQuery(term:string){
     // Parameters obj-
      let params: URLSearchParams = new URLSearchParams();
      params.set('Name', term);
      this.postService.getByQuery(params);
  }

  ngOnInit(){
     
    //Event for Search item using temporary api
  //  this.items = this.search.valueChanges.debounceTime(400).distinctUntilChanged().switchMap(term => this.getByQuery(term));
     
  }
}
