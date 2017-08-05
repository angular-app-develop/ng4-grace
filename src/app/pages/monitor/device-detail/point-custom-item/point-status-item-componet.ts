import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
   	<img [src]="renderSValue" />
    <img [src]="renderEValue" />
    <img [src]="renderCValue" />
  `,
})
export class PointStatusItemComponent implements OnInit {

  public renderSValue;
  public renderEValue;
  public renderCValue;

  @Input() value;

  constructor() {}

  ngOnInit() {
    if (this.value === 0)
    {
      this.renderSValue = '/assets/img/s-off.png';
      this.renderEValue = '/assets/img/e-off.png';
      this.renderCValue = '/assets/img/c-off.png';
    }
    if (this.value === 1)
    {
      this.renderSValue = '/assets/img/s-on.png';
      this.renderEValue = '/assets/img/e-off.png';
      this.renderCValue = '/assets/img/c-off.png';
    }
    if (this.value === 2)
    {
      this.renderSValue = '/assets/img/s-on.png';
      this.renderEValue = '/assets/img/e-on.png';
      this.renderCValue = '/assets/img/c-off.png';
    }
    if (this.value === 3)
    {
      this.renderSValue = '/assets/img/s-on.png';
      this.renderEValue = '/assets/img/e-on.png';
      this.renderCValue = '/assets/img/c-on.png';
    }
  }
}
