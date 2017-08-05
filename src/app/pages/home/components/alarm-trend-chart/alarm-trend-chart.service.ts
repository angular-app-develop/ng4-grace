import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Restangular } from 'ngx-restangular';
import { AuthenticationService } from '../../../../layout/services/authentication.service';

@Injectable()
export class AlarmTrendChartService {

  constructor(private http: Http, private restangular: Restangular, private authenticationService: AuthenticationService) { }

  public getData() {
    return this.data;
  }

  private data = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '2%',
      top: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      axisLabel: { textStyle: { color: '#ffffff' } },
      splitLine: { show: true },
      boundaryGap: false,
      data: ['7-14', '7-15', '7-16', '7-17', '7-18', '7-19', '7-20']
    }],
    yAxis: [{
      type: 'value',
      splitLine: { show: false },
      axisLabel: { textStyle: { color: '#ffffff' } },
    }],
    series: [{
      name: '告警总数',
      type: 'line',
      stack: '总量',
      lineStyle: { normal: { color: '#2ebce2', type: 'dashed' } },
      areaStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#4a669e' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#1a2d67' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        }
      },
      data: [220, 132, 228, 134, 90, 230, 210]
    }]
  }

  public getRealData() {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('api/devices/getonlinestatus', options).map((res: Response) => res.json());
  }
}
