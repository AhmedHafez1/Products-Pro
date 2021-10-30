import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { MODES, SharedState, SHARED_STATE } from './sharedState.model';
import { distinctUntilChanged, skipWhile, takeWhile } from 'rxjs/operators';
@Component({
  selector: 'paForm',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],
})
export class FormComponent {
  product: Product = new Product();
  lastId: number | undefined;

  constructor(
    private model: Model,
    @Inject(SHARED_STATE) public stateEvents: Observable<SharedState>
  ) {
    stateEvents
      // .pipe(takeWhile((state) => state.mode == MODES.EDIT))
      // .pipe(
      //   distinctUntilChanged((x, y) => {
      //     return x.id === y.id;
      //   })
      // )
      .subscribe((update) => {
        this.product = new Product();
        if (update.id != undefined) {
          Object.assign(this.product, this.model.getProduct(update.id));
        }

        this.editing = update.mode == MODES.EDIT;
      });
  }

  editing: boolean = false;

  submitForm(form: NgForm) {
    if (form.valid) {
      this.model.saveProduct(this.product);
      this.product = new Product();
      form.reset();
    }
  }

  resetForm() {
    this.product = new Product();
  }

  // ngDoCheck() {
  //   if (this.lastId != this.state.id) {
  //     this.product = new Product();
  //     if (this.state.mode == MODES.EDIT) {
  //       Object.assign(this.product, this.model.getProduct(this.state.id));
  //     }
  //     this.lastId = this.state.id;
  //   }
  // }
}
