import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'paForm',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],
})
export class FormComponent {
  product: Product = new Product();
  originalProduct = new Product();
  lastId: number | undefined;

  constructor(
    public model: Model,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activeRoute.params.subscribe((params) => {
      this.editing = params['mode'] == 'edit';
      let id = params['id'];
      if (id != null) {
        Object.assign(this.product, this.model.getProduct(id) || new Product());
        Object.assign(this.originalProduct, this.product);
      }
    });
  }

  editing: boolean = false;

  submitForm(form: NgForm) {
    if (form.valid) {
      this.model.saveProduct(this.product);
      this.originalProduct = this.product;
      this.router.navigateByUrl('/');
    }
  }

  // resetForm() {
  //   this.product = new Product();
  // }

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
