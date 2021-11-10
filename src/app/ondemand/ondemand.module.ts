import { FirstComponent } from './first.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OndemandComponent } from './ondemand.component';
import { Routes, RouterModule } from '@angular/router';
import { SecondComponent } from './second.component';

let routes = RouterModule.forChild([
  {
    path: '',
    component: OndemandComponent,
    children: [
      {
        path: '',
        children: [
          { outlet: 'primary', path: '', component: FirstComponent },
          { outlet: 'right', path: '', component: SecondComponent },
          { outlet: 'left', path: '', component: SecondComponent },
        ],
      },
      {
        path: 'swap',
        children: [
          { outlet: 'primary', path: '', component: SecondComponent },
          { outlet: 'right', path: '', component: FirstComponent },
          { outlet: 'left', path: '', component: FirstComponent },
        ],
      },
    ],
  },
]);

@NgModule({
  imports: [CommonModule, routes],
  declarations: [OndemandComponent, FirstComponent, SecondComponent],
  exports: [OndemandComponent],
})
export class OndemandModule {}
