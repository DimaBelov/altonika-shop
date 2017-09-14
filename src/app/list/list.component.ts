import { Component, OnInit } from '@angular/core';
import { Product } from '@entities/product';
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: Array<Product>;

  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this.products = this._productService.get();
  }

}
