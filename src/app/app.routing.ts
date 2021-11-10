import { LoadGuard } from './load.guard';
import { UnsavedGuard } from './core/unsaved.guard';
import { TermsGuard } from './terms.guard';
import { CategoryCountComponent } from './core/categoryCount.component';
import { ProductCountComponent } from './core/productCount.component';
import { NotFoundComponent } from './core/notFound.component';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './core/form.component';
import { TableComponent } from './core/table.component';
import { ModelResolver } from './model/model.resolver';

const childRoutes: Routes = [
  { path: 'products', component: ProductCountComponent },
  { path: 'categories', component: CategoryCountComponent },
  { path: '', component: ProductCountComponent },
];

const routes: Routes = [
  {
    path: 'ondemand',
    loadChildren: () =>
      import('./ondemand/ondemand.module').then((m) => m.OndemandModule),
    canLoad: [LoadGuard],
  },
  {
    path: 'form/:mode/:id',
    component: FormComponent,
    resolve: { model: ModelResolver },
    canDeactivate: [UnsavedGuard],
  },
  { path: 'form/:mode', component: FormComponent, canActivate: [TermsGuard] },
  {
    path: 'table',
    component: TableComponent,
    children: childRoutes,
    resolve: { model: ModelResolver },
    canActivateChild: [TermsGuard],
  },
  {
    path: 'table/:category',
    component: TableComponent,
    children: childRoutes,
    resolve: { model: ModelResolver },
    canActivateChild: [TermsGuard],
  },
  { path: '', redirectTo: '/table', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

export const routing = RouterModule.forRoot(routes);
