import { Component, OnInit, Inject } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Client } from 'elasticsearch';
import { Http, Headers, Response, RequestOptions, URLSearchParams, Jsonp } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { FiltersPage } from '../filters/filters.page';
import { CatalogPage } from '../catalog/catalog.page';
import { IPostService, PostService } from '../post/post.service';
import { IElasticSearchService, ElasticSearchService } from '../../app/services/elasticsearch.service';

@Component({
  selector: 'search-page',
  templateUrl: 'search.html',
  entryComponents: [CatalogPage],
  providers: [PostService, ElasticSearchService]
})

export class SearchPage implements OnInit {
  selectedCategory: string;
  results: any[];
  categories: string[];
  search : FormControl;
  params: URLSearchParams;
  items: Array<string>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, public modalCtrl: ModalController,
    @Inject(PostService) public postService: IPostService,
    @Inject(ElasticSearchService) public es: IElasticSearchService
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedCategory = navParams.get('category');
    this.categories = ["Mobile", "Electronics", "Home", "Entertainment", "Pet Care", "Education"];

    this.results = [{ Title: 'Mouse', Price: '200' },
    { Title: 'Mouse', Price: '200' },
    { Title: 'Mouse', Price: '200' }
    ];

    this.search = new FormControl();
    this.params = new URLSearchParams();
    this.items = new Array<string>();
  }

  gotoFiltersPage() {
    //this.navCtrl.push(FiltersPage, {});
    let profileModal = this.navCtrl.push(FiltersPage, { userId: 8675309 });
  }

  getByQuery(term: string) {
    this.params.set('Title', term);
    return this.es.search(term, 1);
  }

  ngOnInit() {
    //Event for Search item using temporary api
    this.search.valueChanges.subscribe(term => this.getByQuery(term));
  }

  gotoCatalogPage(item: any) {
    console.log(item);
  }
}
