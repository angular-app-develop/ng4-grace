import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <img [src]="renderValue" />
  `,
})
export class AlarmSeverityImgRenderComponent implements OnInit {

  public renderValue;

  @Input() value;

  constructor() { }

  ngOnInit() {
    this.renderValue = '/assets/img/level' + this.value + '.png';
  }
}