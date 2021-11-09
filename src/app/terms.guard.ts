import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { MessageService } from './messages/message.service';
import { Message } from './messages/message.model';

@Injectable()
export class TermsGuard {
  constructor(private messages: MessageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      let responses: [string, () => void][] = [
        ['YES', () => resolve(true)],
        ['NO', () => resolve(false)],
      ];

      this.messages.reportMessage(
        new Message('Do you accept the terms & conditions?', false, responses)
      );
    });
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    if (
      route.url.length > 0 &&
      route.url[route.url.length - 1].path == 'categories'
    ) {
      return new Promise((resolve, reject) => {
        let responses: [string, () => void][] = [
          ['YES', () => resolve(true)],
          ['NO', () => resolve(false)],
        ];
        this.messages.reportMessage(
          new Message(
            'Do you want to see the categories component ?',
            false,
            responses
          )
        );
      });
    } else {
      return true;
    }
  }
}
