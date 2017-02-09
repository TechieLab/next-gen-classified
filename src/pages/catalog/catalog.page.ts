import { Component, OnInit, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductPage } from '../product/product.page';
import { Product } from '../../app/models/product';
import { IProductService, ProductService } from '../../app/services/product.service';

@Component({
  selector: 'catalog-page',
  templateUrl: 'catalog.html',
  providers: [ProductService]
})
export class CatalogPage implements OnInit {
  selectedCategory: string;
  products: Array<Product>;
  subCategories: string[];
  isSubCategorySelected: boolean;
  ads: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
     @Inject(ProductService) public productService: IProductService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.isSubCategorySelected = false;
    this.selectedCategory = navParams.get('category');
    this.subCategories = ["SmartPhone", "Android", "Iphone", "Blackberry"];
  }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.productService.get().subscribe((response) => {
      this.products = response;
    });
  }

  selectSubCategory() {
    this.isSubCategorySelected = true;
  }

  showProductDetails(item: string) {
    this.navCtrl.push(ProductPage, { category: item });
  }
}
