import 'rxjs/add/operator/toPromise';
import { Component, OnInit, Inject, NgZone ,
    ModalController, LoadingController, NavController, NavParams, Events ,
     Http, Headers, Response, RequestOptions, URLSearchParams, Jsonp ,
      FormControl } from '../common/index';
      
import { Subject, Observable } from 'rxjs';
import { RentalService, IRentalService } from './rental.service';
import { Filters, Rental } from '../../app/models/index';

@Component({
  selector: 'rental-page',
  templateUrl: 'rental.html',
  entryComponents: [],
  providers: [RentalService]
})

export class RentalPage implements OnInit {
  search: FormControl;
  params: URLSearchParams;
  searchText: string;
  searchFilters: Filters;
  searchResults: Array<Rental>;
  private pageSize: number = 25;
  private pageNumber: number = 1;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    public events: Events,
    private _ngZone: NgZone,
    @Inject(RentalService) public rentalService: IRentalService,
  ) {
    this.searchText = '';
    this.search = new FormControl();
    this.searchResults = new Array<Rental>();
    this.searchFilters = new Filters();
  }

  ngOnInit() {
    this.search.valueChanges.subscribe(term => {
      this.searchText = term;
      this.searchFilters.Keyword = term;
      this.submitSearch();
    });
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

    this.rentalService.customPost(this.searchFilters, params).subscribe((res) => {
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
