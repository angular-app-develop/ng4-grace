import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { DeviceDetailService } from '../device-detail.service';

@Component({
  template: `
    <img [src]="renderSetValue" />&nbsp;&nbsp;&nbsp;
    <img [src]="renderHideValue" />&nbsp;&nbsp;&nbsp;
    <img [src]="renderEndValue" />&nbsp;&nbsp;&nbsp;
    <img [src]="renderConfirmValue" />
  `,
})
export class PointOperationItemComponent implements OnInit {

  public renderSetValue;
  public renderHideValue;
  public renderEndValue;
  public renderConfirmValue;

  @Input() value;

  constructor(private deviceDetailService:DeviceDetailService) {}

  ngOnInit() {
    if (this.value == 0) {
      this.renderSetValue = '/assets/img/set-off.png';
      this.renderHideValue = '/assets/img/hide-on.png';
      this.renderEndValue = '/assets/img/end-off.png';
      this.renderConfirmValue = '/assets/img/confirm-off.png';
    }
    if (this.value == 1) {
      this.renderSetValue = '/assets/img/set-on.png';
      this.renderHideValue = '/assets/img/hide-on.png';
      this.renderEndValue = '/assets/img/end-on.png';
      this.renderConfirmValue = '/assets/img/confirm-on.png';
    }
    if (this.value == 2) {
      this.renderSetValue = '/assets/img/set-on.png';
      this.renderHideValue = '/assets/img/hide-on.png';
      this.renderEndValue = '/assets/img/end-off.png';
      this.renderConfirmValue = '/assets/img/confirm-on.png';
    }
    if (this.value == 3) {
      this.renderSetValue = '/assets/img/set-on.png';
      this.renderHideValue = '/assets/img/hide-on.png';
      this.renderEndValue = '/assets/img/end-off.png';
      this.renderConfirmValue = '/assets/img/confirm-off.png';
    }
  }
}
