import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './message.model';
@Component({
  selector: 'paMessages',
  templateUrl: 'message.component.html',
})
export class MessageComponent {
  lastMessage: Message | undefined;
  constructor(messageService: MessageService) {
    messageService.messages.subscribe((m) => (this.lastMessage = m));
  }
}
