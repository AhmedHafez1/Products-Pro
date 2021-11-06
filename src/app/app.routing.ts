import { RouterModule, Routes } from "@angular/router";
import { FormComponent } from './core/form.component';
import { TableComponent } from './core/table.component';

const routes: Routes = [
  { path: "form/:mode/:id", component: FormComponent },
  { path: "form/:mode", component: FormComponent },
  { path: "", component: TableComponent }
]

export const routing = RouterModule.forRoot(routes);
