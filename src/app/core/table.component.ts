import { Component, Inject } from "@angular/core";
import { Observer } from "rxjs";
import { Model } from '../model/repository.model';
import { MODES, SharedState, SHARED_STATE } from './sharedState.model';

@Component({
  selector: "paTable",
  templateUrl: "table.component.html"
})
export class TableComponent {

  constructor(private model: Model,
    // @Inject(SHARED_STATE) private observer: Observer<SharedState>
  ) { }

  getProduct(key: number) {
    return this.model.getProduct(key);
  }

  getProducts() {
    return this.model.getProducts();
  }

  deleteProduct(key: number | undefined) {
    this.model.deleteProduct(key as number);
  }

  // editProduct(key: number | undefined) {
  //   this.observer.next(new SharedState(MODES.EDIT, key))
  // }

  // createProduct() {
  //   this.observer.next(new SharedState(MODES.CREATE))
  // }
}
