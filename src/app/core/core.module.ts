import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from "../model/model.module";
import { TableComponent } from "./table.component";
import { FormComponent } from "./form.component";
import { MODES, SharedState, SHARED_STATE } from './sharedState.model';
import { Subject } from "rxjs";
import { StatePipe } from './state.pipe';
import { MessageService } from "../messages/message.service";
import { Model } from "../model/repository.model";
import { Message } from "../messages/message.model";
@NgModule({
  imports: [BrowserModule, FormsModule, ModelModule],
  declarations: [TableComponent, FormComponent, StatePipe],
  exports: [ModelModule, TableComponent, FormComponent],
  providers: [{
    provide: SHARED_STATE,
    deps: [MessageService, Model],
    useFactory: (messageService: MessageService, model: Model) => {
    let subject = new Subject<SharedState>();
    subject.subscribe(m => messageService.reportMessage(
    new Message(MODES[m.mode] + (m.id != undefined
    ? ` ${model.getProduct(m.id).name}` : "")))
    );
    return subject;
    }
    }]
})
export class CoreModule { }
