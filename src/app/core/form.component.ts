import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { MODES, SharedState, SHARED_STATE } from './sharedState.model';
import { distinctUntilChanged, skipWhile, takeWhile } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'paForm',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],
})
export class FormComponent {
  product: Product = new Product();
  lastId: number | undefined;

  constructor(
    public model: Model,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.editing = this.activeRoute.snapshot.params['mode'] == "edit";
    let id = this.activeRoute.snapshot.params['id'];

    if (id != null) {
      Object.assign(this.product, this.model.getProduct(id) || new Product());
    }
  }


  editing: boolean = false;

  submitForm(form: NgForm) {
    if (form.valid) {
      this.model.saveProduct(this.product);
      // this.product = new Product();
      // form.reset();
      this.router.navigateByUrl('/');
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
