import { NotFoundComponent } from './core/notFound.component';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './core/form.component';
import { TableComponent } from './core/table.component';

const routes: Routes = [
  { path: 'form/:mode/:id', component: FormComponent },
  { path: 'form/:mode', component: FormComponent },
  { path: 'table', component: TableComponent },
  { path: '', redirectTo: '/table', pathMatch: 'full' },
  { path: 'does', redirectTo: '/form/create', pathMatch: 'prefix' },
  { path: '**', component: NotFoundComponent },
];

export const routing = RouterModule.forRoot(routes);
