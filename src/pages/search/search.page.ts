import 'rxjs/add/operator/toPromise';
import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Client } from 'elasticsearch';
import { Http, Headers, Response, RequestOptions, URLSearchParams, Jsonp } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { FiltersPage } from '../filters/filters.page';
import { CatalogPage } from '../catalog/catalog.page';
import { IPostService, PostService } from '../post/post.service';
import { Post } from '../../app/models/post';
import { ElasticSearchService } from '../../app/services/elasticsearch.service';

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
  search: FormControl;
  params: URLSearchParams;
  searchResults: Array<Post>;
  seachTextModel: string;
  results$: Subject<Array<any>> = new Subject<Array<any>>();
  message: string = "";
  active: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private _ngZone: NgZone,
    @Inject(PostService) public postService: IPostService,
    public es: ElasticSearchService
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
    this.searchResults = new Array<Post>();
  }

  gotoFiltersPage() {
    //this.navCtrl.push(FiltersPage, {});
    let profileModal = this.navCtrl.push(FiltersPage, { userId: 8675309 });
  }

  getByQuery(term: string) {
    //,1 this.params.set('Title', term);
    // return this.es.search(term);
  }

  ngOnInit() {
    //Event for Search item using temporary api
    // this.search.valueChanges.subscribe(term => this.getByQuery(term));

    this.search.valueChanges.subscribe(term => {
      let entity = {
        size: 20,
        from: 0,
        query: {
          match: {
            Title: { query: `${term}`, fuzziness: 2 }
          }
        }
      };
      // perform search operation outside of angular boundaries
      this.es.search(entity).subscribe((response: any) => {
        var data = response.hits.hits, posts:any = [];
         for (var i = 0; i < data.length; i++) {
               if(data[i]._id){
                  data[i]._source._id = data[i]._id;
               }
               posts.push(data[i]._source);
         }
       
           this.searchResults = posts;
           console.log(this.searchResults);  
      });
    });
  }

  gotoCatalogPage(item: any) {
    console.log(item);
  }

  handleError(): any {
    this.message = "something went wrong";
  }
}
