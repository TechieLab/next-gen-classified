import { Component, Inject, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationPage } from '../notification/notification.page';
import { ProductService, IProductService } from '../../app/services/product.service';
import { Product } from '../../app/models/product';

@Component({
  selector: 'product-page',
  templateUrl: 'product.html',
  providers: [ProductService]
})
export class ProductPage implements OnInit {
  productId: string;
  product: Product;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject(ProductService) public productService: IProductService
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.productId = navParams.get('id');
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.productService.getById(this.productId).subscribe((response) => {
      this.product = response;
    });
  }

  gotoNotificationPage() {
    this.navCtrl.push(NotificationPage, {
      id: "123",
      name: "Carl"
    });
  }

  getItems() {

  }
}
