import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { StaticDataSource } from './static.datasource';
import { RestDataSource } from './rest.datasource';
@Injectable()
export class Model {
  private products: Product[] = [];
  private locator = (p: Product, id: number | undefined) => p.id == id;

  constructor(private datasource: RestDataSource) {
    this.datasource.getData().subscribe(data => this.products = data);
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number | undefined) {
    return this.products.find(p => p.id == id);
  }

  saveProduct(product: Product) {
    if (product.id == 0 || product.id == null) {
      product.id = this.generateID();
      this.products.push(product);
    } else {
      let index = this.products
        .findIndex(p => p.id == product.id);
      this.products.splice(index, 1, product);
    }
  }

  deleteProduct(id: number) {
    let index = this.products.findIndex(p => this.locator(p, id));
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

  private generateID(): number {
    let candidate = 100;
    while (this.getProduct(candidate) != null) {
      candidate++;
    }
    return candidate;
  }
}
