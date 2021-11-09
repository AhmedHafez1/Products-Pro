import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { TableComponent } from './table.component';
import { FormComponent } from './form.component';
import { MODES, SharedState, SHARED_STATE } from './sharedState.model';
import { Subject } from 'rxjs';
import { StatePipe } from './state.pipe';
import { MessageService } from '../messages/message.service';
import { Model } from '../model/repository.model';
import { MessageModule } from '../messages/message.module';
import { RouterModule } from '@angular/router';
import { ProductCountComponent } from './productCount.component';
import { CategoryCountComponent } from './categoryCount.component';
import { NotFoundComponent } from './notFound.component';
import { UnsavedGuard } from './unsaved.guard';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ModelModule,
    MessageModule,
    RouterModule,
  ],
  declarations: [
    TableComponent,
    FormComponent,
    StatePipe,
    ProductCountComponent,
    CategoryCountComponent,
    NotFoundComponent,
  ],
  providers: [UnsavedGuard],
  exports: [ModelModule, TableComponent, FormComponent],
})
export class CoreModule {}
