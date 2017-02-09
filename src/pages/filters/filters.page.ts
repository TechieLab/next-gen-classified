import { Component, OnInit, ElementRef , Inject} from '@angular/core';
import { NavController, MenuController, ViewController, NavParams } from 'ionic-angular';
import { Filters } from '../../app/models/filters';
import { Lookup } from '../../app/models/lookup';
import { ILookupService, LookupService } from '../../app/services/lookup.service';

@Component({
    selector: 'filters-page',
    templateUrl: 'filters.html',
    providers: [LookupService]
})

export class FiltersPage implements OnInit {
    private selectedCategory: string;
    private filters: Filters;
    private rootPage: this;
    private categories : Array<Lookup>

    constructor(public viewCtrl: ViewController,
        public navCtrl: NavController,
        public menu: MenuController,
        public navParams: NavParams,
        @Inject(LookupService) public lookupService : ILookupService) {
        this.selectedCategory = navParams.get('category');

    }

    ngOnInit() {
        this.filters = <Filters>{};

        this.getCategoryData();
    }

    getCategoryData(){
        this.lookupService.getCategories().subscribe((response) => {
            this.categories = response
        })

    }

    clearFilters() {
        this.filters = <Filters>{};
    }
}
