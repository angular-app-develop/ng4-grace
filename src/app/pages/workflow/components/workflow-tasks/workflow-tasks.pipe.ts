import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';
@Pipe({
  name: 'durationTime',
  pure: false
})
export class DurationTimePipe implements PipeTransform {

  transform(value: any, dayLabel:string, hourLabel:string, minuteLabel:string,secondLabel:string): any {    
    return this.differentDays(value,dayLabel,hourLabel,minuteLabel,secondLabel);
  }

  private differentDays(date1: string,dayLabel:string, hourLabel:string, minuteLabel:string,secondLabel:string) {
    let day: any = 0;
    let hour: any = 0;
    let min: any = 0;
    let sec: any = 0;
    let diff = new Date().getTime() - Date.parse(date1);
    day = moment.duration(diff).days();
    hour = moment.duration(diff).hours();
    min = moment.duration(diff).minutes();
    sec = moment.duration(diff).seconds();
    if (day >= 1) {
      return `<span class='ng2-smart-table-cell-warn'>${day} ${dayLabel} ${hour} ${hourLabel} ${min} ${minuteLabel}</span>`;
    }
    else {
      return `${day} ${dayLabel} ${hour} ${hourLabel} ${min} ${minuteLabel}`;
    }
  }
}

