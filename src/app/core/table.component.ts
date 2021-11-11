import { HighlightTrigger } from './table.animations';
import { ActivatedRoute } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { Observer } from 'rxjs';
import { Model } from '../model/repository.model';
import { MODES, SharedState, SHARED_STATE } from './sharedState.model';
import { Product } from '../model/product.model';

@Component({
  selector: 'paTable',
  templateUrl: 'table.component.html',
  animations: [HighlightTrigger],
})
export class TableComponent {
  category: string = null;
  highlightCategory: string = '';

  constructor(private model: Model, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe((params) => {
      this.category = params['category'] || null;
    });
  }

  getProduct(key: number) {
    return this.model.getProduct(key);
  }

  getProducts(): Product[] {
    return this.model
      .getProducts()
      .filter((p) => this.category == null || p.category == this.category);
  }

  get categories(): string[] {
    return this.model
      .getProducts()
      .map((p) => p.category)
      .filter((category, index, array) => array.indexOf(category) == index);
  }

  deleteProduct(key: number | undefined) {
    this.model.deleteProduct(key as number);
  }

  getRowState(category: string): string {
    return this.highlightCategory == ''
      ? ''
      : this.highlightCategory == category
      ? 'selected'
      : 'notselected';
  }
}
