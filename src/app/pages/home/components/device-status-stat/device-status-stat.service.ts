import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Restangular } from 'ngx-restangular';
import { AuthenticationService } from '../../../../layout/services/authentication.service';

@Injectable()
export class DeviceStatusStatService {

  constructor(private http: Http, private restangular: Restangular, private authenticationService: AuthenticationService) { }

  getData() {
    return [{
      statusName: '在綫',
      devicecount: '391'
    },
    {
      statusName: '离线',
      devicecount: '8'
    }];
  }
  public getDeviceStatusStaticData(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('api/devices/getonlinestatus', options).map((res: Response) => res.json());
  }

}
