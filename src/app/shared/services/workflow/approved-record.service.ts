/**
 * Created by DELL on 8/3/2017.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {AuthenticationService} from '@layout/services/authentication.service';
import {WorkflowService} from '@services/workflow/workflow.service';
import {ApprovedRecord} from '@models/workflow/index';


@Injectable()
export class TodoTaskService {
  approvedRecordArray: Array<ApprovedRecord>;

  constructor(private service: WorkflowService,
              private authenticationService: AuthenticationService) {
    this.approvedRecordArray = new Array<ApprovedRecord>();
  }

  // getApprovedRecord(processInstanceId): Observable<any> {
  //   return this.service.getHistoricTaskInstances(processInstanceId)
  //     .map((data) => { })
  //     .mergeMap(res => {
  //       return res;
  //     })
  //     .mergeMap(res => {
  //       //
  //     }).subscribe((data) => {
  //
  //     }, (err) => {
  //     //
  //     });
  // }
}
