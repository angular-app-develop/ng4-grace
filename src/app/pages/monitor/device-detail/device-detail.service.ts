import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Restangular } from 'ngx-restangular';
import { AuthenticationService } from '../../../layout/services/authentication.service';

@Injectable()
export class DeviceDetailService {

  constructor(private http: Http, private restangular: Restangular, private authenticationService: AuthenticationService) { }
  private data = [
    { img: '/assets/img/level1.png', time: '2017-5-28 16:28:06', name: '空调出风温度超高', type: '模拟', value: '38度', setvalue: "28度", status: 0, operate: 0 },
    { img: '/assets/img/level2.png', time: '2017-5-29 06:18:56', name: 'UPS旁路故障', type: '模拟', value: '', status: 1, operate: 2 },
    { img: '/assets/img/level3.png', time: '2017-6-28 15:27:36', name: '通讯状异常', type: '开关', value: '异常', status: 2, operate: 2 },
    { img: '/assets/img/level4.png', time: '2017-6-28 11:27:36', name: '门异常打开', type: '开关', value: '非法', status: 3, operate: 3 },
    { img: '/assets/img/level2.png', time: '2017-5-29 06:18:56', name: 'UPS旁路故障', type: '模拟', value: '', status: 1, operate: 1 },
    { img: '/assets/img/level1.png', time: '2017-5-28 16:28:06', name: '空调出风温度超高', type: '模拟', value: '38度', status: 0, operate: 0 },
    { img: '/assets/img/level3.png', time: '2017-6-28 15:27:36', name: '通讯状异常', type: '开关', value: '异常', setvalue: '8', status: 2, operate: 2 },
    { img: '/assets/img/level4.png', time: '2017-6-28 11:27:36', name: '门异常打开', type: '开关', value: '非法', status: 3, operate: 2 },
    { img: '/assets/img/level3.png', time: '2017-6-28 15:27:36', name: '通讯状异常', type: '开关', value: '异常', status: 2, operate: 2 },
    { img: '/assets/img/level4.png', time: '2017-6-28 11:27:36', name: '门异常打开', type: '开关', value: '非法', status: 3, operate: 3 },
    { img: '/assets/img/level2.png', time: '2017-5-29 06:18:56', name: 'UPS旁路故障', type: '模拟', value: '', status: 1, operate: 1 },
    { img: '/assets/img/level1.png', time: '2017-5-28 16:28:06', name: '空调出风温度超高', type: '模拟', value: '38度', status: 0, operate: 0 }
  ];

  public getData() {
    return this.data;
  }
  public getDeviceData(deviceId): Observable<any> {
    let headers = new Headers({
      'Content-Type': 'application/json', 'charset': 'UTF-8',
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('api/devices/' + deviceId, options).map((res: Response) => res.json());
  }
  public getDeviceLivePoint(deviceId): Observable<any> {
    let headers = new Headers({
      'Content-Type': 'application/json', 'charset': 'UTF-8',
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('api/live-points/device/' + deviceId, options).map((res: Response) => res.json());
  }
  public setDeviceMask(deviceId): Observable<any> {
    let headers = new Headers({
      'Content-Type': 'application/json', 'charset': 'UTF-8',
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('api/device/mask/' + deviceId, options).map((res: Response) => res.json());
  }
  public setLivePointMask(deviceId, pointId): Observable<any> {
    let headers = new Headers({
      'Content-Type': 'application/json', 'charset': 'UTF-8',
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('api/live-points/mask/' + deviceId + "." + pointId, options).map((res: Response) => res.json());
  }
  public confirmEndCov(pointId): Observable<any> {
    let headers = new Headers({
      'Content-Type': 'application/json', 'charset': 'UTF-8',
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.put('api/covs/' + pointId, options).map((res: Response) => res.json());
  }
  public setCovDesired(deviceId): Observable<any> {
    let headers = new Headers({
      'Content-Type': 'application/json', 'charset': 'UTF-8',
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('api/desiredcov/' + deviceId, options).map((res: Response) => res.json());
  }
}
