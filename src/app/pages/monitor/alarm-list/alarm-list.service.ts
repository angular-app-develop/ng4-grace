import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Restangular } from 'ngx-restangular';
import { AuthenticationService } from '../../../layout/services/authentication.service';

@Injectable()
export class AlarmListService {
  constructor(private http: Http, private restangular: Restangular, private authenticationService: AuthenticationService) {

  }
  //larmData = 

  getData(): Observable<any> {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(this.alarmData);
    //   }, 2000);
    // });
    return this.restangular.all('alarms').getList();
  }

  public getAlarmListData(): Observable<any> {
    let headers = new Headers({
      'Content-Type': 'application/json', 'charset': 'UTF-8',
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('api/live-events', options).map((res: Response) => res.json());
  }
}
