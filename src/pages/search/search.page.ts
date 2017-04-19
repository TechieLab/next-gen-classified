import 'rxjs/add/operator/toPromise';
import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { ModalController, LoadingController, NavController, NavParams, Events } from 'ionic-angular';
import { Client } from 'elasticsearch';
import { Http, Headers, Response, RequestOptions, URLSearchParams, Jsonp } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { FiltersPage } from '../filters/filters.page';
import { CatalogPage } from '../catalog/catalog.page';
import { IPostService, PostService } from '../post/post.service';
import { Post } from '../../app/models/post';
import { ElasticSearchService } from '../../app/services/elasticsearch.service';
import { SearchService, ISearchService } from './search.service';
import {Filters} from '../../app/models/filters';

@Component({
  selector: 'search-page',
  templateUrl: 'search.html',
  entryComponents: [CatalogPage],
  providers: [PostService, SearchService, ElasticSearchService]
})

export class SearchPage implements OnInit {
  search: FormControl;
  params: URLSearchParams;
  searchText: string;
  searchFilters: Filters;
  searchResults: Array<Post>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    public events: Events,
    private _ngZone: NgZone,
    @Inject(SearchService) public searchService: ISearchService,
  ) {
    this.searchText = '';
    this.search = new FormControl();
    this.params = new URLSearchParams();
    this.searchResults = new Array<Post>();
    this.searchFilters = new Filters();
  }

  gotoFiltersPage() {
    let modal = this.modalCtrl.create(FiltersPage, {filters : this.searchFilters});
    modal.onDidDismiss(data => {
      this.searchFilters = data;
      this.submitSearch();
    });
    modal.present();
  }

  ngOnInit() {  
    this.search.valueChanges.subscribe(term => {
      this.searchText = term;
      this.submitSearch();
    });
  }

  submitSearch() {
    let loader = this.loadingCtrl.create({
      content: "Loading Posts..."
    });

    loader.present();

    this.params.set('searchText', this.searchText);
    this.params.set('elastic', 'false');

    this.searchService.customPost(this.searchFilters, this.params).subscribe((res) => {
      if (res && res.Content) {
        this.searchResults = res.Content;
      }
      loader.dismiss();
    });
  }

  gotoCatalogPage(item: any) {
    console.log(item);
  }

  handleError(): any {

  }
}
