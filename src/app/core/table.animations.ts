import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const HighlightTrigger = trigger('rowHighLight', [
  state(
    'selected',
    style({
      backgroundColor: 'lightgreen',
    })
  ),
  state(
    'notselected',
    style({
      backgroundColor: 'lightsalmon',
    })
  ),
  state(
    '*',
    style({
      backgroundColor: 'beige',
    })
  ),
  transition('* => selected', [
    animate(
      '400ms 200ms ease-in',
      style({
        backgroundColor: 'lightblue',
      })
    ),
    animate(
      '250ms',
      style({
        backgroundColor: 'lightcoral',
      })
    ),
    animate('200ms'),
  ]),
  transition('* => notselected', animate('200ms')),
  state('void', style({ opacity: 0 })),
  transition('void => *', animate('500ms ease-in')),
]);
