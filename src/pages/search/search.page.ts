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
import { Filters } from '../../app/models/filters';

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
  private pageSize: number = 25;
  private pageNumber: number = 1;

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
    this.searchResults = new Array<Post>();
    this.searchFilters = new Filters();
  }


  ngOnInit() {
    this.search.valueChanges.subscribe(term => {
      this.searchText = term;
      this.searchFilters.Keyword = term;
      this.submitSearch();
    });
  }

  gotoFiltersPage() {
    let modal = this.modalCtrl.create(FiltersPage, { filters: this.searchFilters });
    modal.onDidDismiss(data => {
      this.searchFilters = data;
      this.searchText = data.Keyword;

      this.submitSearch();
    });
    modal.present();
  }

  submitSearch() {
    let params = new URLSearchParams();
    let loader = this.loadingCtrl.create({
      content: "Loading Posts..."
    });

    loader.present();    

    params.set('searchText', this.searchText);
    params.set('elastic', 'false');

    if (this.pageSize) {
      params.set('pageSize', this.pageSize.toString());
    }

    if (this.pageNumber) {
      params.set('page', this.pageNumber.toString());
    }

    this.searchService.customPost(this.searchFilters, params).subscribe((res) => {
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
