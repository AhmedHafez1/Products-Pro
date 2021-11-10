import { Route, Router } from '@angular/router';
import { MessageService } from './messages/message.service';
import { Injectable } from '@angular/core';
import { Message } from './messages/message.model';

@Injectable()
export class LoadGuard {
  private loaded = false;

  constructor(private messages: MessageService, private router: Router) {}

  canLoad(route: Route): Promise<boolean> | boolean {
    return (
      this.loaded ||
      new Promise((resolve, reject) => {
        let responses: [string, () => void][] = [
          [
            'YES',
            () => {
              this.loaded = true;
              resolve(true);
            },
          ],
          [
            'NO',
            () => {
              this.router.navigateByUrl(this.router.url);
              resolve(false);
            },
          ],
        ];

        this.messages.reportMessage(
          new Message('Do you want to load the module?', false, responses)
        );
      })
    );
  }
}
