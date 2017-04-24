import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { NavController, MenuController, ViewController, NavParams, Events } from 'ionic-angular';
import { Filters } from '../../app/models/filters';
import { Lookup } from '../../app/models/lookup';
import { ILookupService, LookupService } from '../../app/services/lookup.service';
import {Constants} from '../../app/common/constants';

@Component({
    selector: 'filters-page',
    templateUrl: 'filters.html',
    providers: [LookupService]
})

export class FiltersPage implements OnInit {
    private selectedCategory: string;
    private filters: Filters;
    private rootPage: this;
    private categories: Array<Lookup>
    private sortByList : any;

    constructor(public viewCtrl: ViewController,
        public navCtrl: NavController,
        public menu: MenuController,
        public navParams: NavParams,
        public events: Events,
        @Inject(LookupService) public lookupService: ILookupService) {
        this.filters = new Filters();
        this.categories = new Array<Lookup>();
        this.filters = viewCtrl.getNavParams().get('filters');
    }

    ngOnInit() {
        this.getCategoryData();

        this.sortByList = Constants.SortBy
    }

    getCategoryData() {
        this.lookupService.getCategories().subscribe((response) => {
            this.categories[0] = new Lookup();
            this.categories = this.categories.concat(response);
        });
    }

    clearFilters() {
        this.filters = new Filters();
    }

    applyFilters() {
        this.viewCtrl.dismiss(this.filters);
    }
}
