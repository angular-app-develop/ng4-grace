import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Restangular } from 'ngx-restangular';
import { AuthenticationService } from '../../../../layout/services/authentication.service';

@Injectable()
export class AlarmLevelStatService {

  constructor(private http: Http, private restangular: Restangular, private authenticationService: AuthenticationService) { }

  getData() {
    return [{
      name: '紧急告警',
      value: '57',
      icon: '紧急告警.png',
    }, {
      name: '重要告警',
      value: '895',
      icon: '重要告警.png',
    }, {

      name: '一般告警',
      value: '391',
      icon: '一般告警.png',
    }, {

      name: '普通告警',
      value: '392',
      icon: '普通告警.png',
    }];
  }
  public getAlarmStatbyLevelData(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('api/live-events/statisticsbyseverity', options).map((res: Response) => res.json());
  }
}
