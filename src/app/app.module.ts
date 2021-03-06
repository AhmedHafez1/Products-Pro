import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TermsGuard } from './terms.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModelModule } from './model/model.module';
import { CoreModule } from './core/core.module';
import { MessageModule } from './messages/message.module';
import { TableComponent } from './core/table.component';
import { FormComponent } from './core/form.component';
import { MessageComponent } from './messages/message.component';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { LoadGuard } from './load.guard';

@NgModule({
  imports: [
    BrowserModule,
    ModelModule,
    CoreModule,
    MessageModule,
    routing,
    BrowserAnimationsModule,
  ],
  declarations: [AppComponent],
  providers: [TermsGuard, LoadGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
