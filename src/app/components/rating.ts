import {Component, EventEmitter} from '@angular/core';
import { NgFor, NgClass} from '@angular/common';

@Component({
  selector: 'rating',
  inputs: ['rate'],
  template: `
    <span tabindex="0">
      <template *ngFor="let range of ranges; let index=index">
        <span class="sr-only">({{ index < rate ? '*' : ' ' }})</span>
        <i class="glyphicon" (click)="update(index + 1)" [ngClass]="index < rate ? 'glyphicon-star' : 'glyphicon-star-empty'"></i>
      </template>
    </span>
  `,
  outputs: ['updateRate: rateChange']
})

export class Rating {
  private ranges:Array<number> = [1,2,3,4,5];
  private rate:number;
  private updateRate: EventEmitter<any> = new EventEmitter();
  
  update(value) {
    this.rate = value;
    this.updateRate.next(value);
  }
}