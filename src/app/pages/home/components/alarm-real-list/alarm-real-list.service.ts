import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Restangular } from 'ngx-restangular';
import { AuthenticationService } from '../../../../layout/services/authentication.service';

@Injectable()
export class AlarmRealListService {

  constructor(private http: Http, private restangular: Restangular, private authenticationService: AuthenticationService) { }

  private data = [
    { img: '紧急告警.png', birthTime: '2017-5-28 16:28:06', name: '空调出风温度超高' },
    { img: '重要告警.png', birthTime: '2017-5-29 06:18:56', name: 'UPS旁路故障' },
    { img: '普通告警.png', birthTime: '2017-6-28 15:27:36', name: '通讯状异常' }
  ];

  public getData() {
    return this.data;
  }

  public getRealListData(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('api/live-events/top10', options).map((res: Response) => res.json());
  }
}
