import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastrConfig } from 'ngx-toastr';

@Injectable()
export class ToastService {

  constructor(private toastrService: ToastrService,
    private toastrConfig: ToastrConfig) { }

  showToast(type, msg, title) {
    if (type === 'info') {
      this.toastrConfig = { timeOut: 1000 };
      this.toastrService.info(msg, title, this.toastrConfig);
    }
    if (type === 'success') {
      this.toastrService.success(msg, title);
    }
    if (type === 'warning') {
      this.toastrConfig = {
        timeOut: 1000,
        positionClass: 'toast-bottom-right'
      };
      this.toastrService.warning(msg, title, this.toastrConfig);
    }
    if (type === 'error') {
      this.toastrService.error(msg, title);
    }
  }

}
