import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { StaticDataSource } from './static.datasource';
import { RestDataSource } from './rest.datasource';
@Injectable()
export class Model {
  private products: Product[] = [];
  private locator = (p: Product, id: number | undefined) => p.id == id;

  constructor(private datasource: RestDataSource) {
    this.datasource.getData().subscribe((data) => (this.products = data));
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number | undefined) {
    return this.products.find((p) => p.id == id);
  }

  getNextProductId(id: number): number {
    let index = this.products.findIndex(p => this.locator(p, id));
    if (index > -1) {
      return this.products[this.products.length > index + 1
        ? index + 1 : 0].id;
    } else {
      return id || 0;
    }
  }
  getPreviousProductid(id: number): number {
    let index = this.products.findIndex(p => this.locator(p, id));
    if (index > -1) {
      return this.products[index > 0
        ? index - 1 : this.products.length - 1].id;
    } else {
      return id || 0;
    }
  }

  saveProduct(product: Product) {
    if (product.id == 0 || product.id == null) {
      this.datasource
        .saveProduct(product)
        .subscribe((p) => this.products.push(p));
    } else {
      this.datasource.updateProduct(product).subscribe((p) => {
        let index = this.products.findIndex((item) => this.locator(item, p.id));
        this.products.splice(index, 1, p);
      });
    }
  }

  deleteProduct(id: number) {
    this.datasource.deleteProduct(id).subscribe(() => {
      let index = this.products.findIndex((p) => this.locator(p, id));
      if (index > -1) {
        this.products.splice(index, 1);
      }
    });
  }

  // private generateID(): number {
  //   let candidate = 100;
  //   while (this.getProduct(candidate) != null) {
  //     candidate++;
  //   }
  //   return candidate;
  // }
}
