import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Restangular } from 'ngx-restangular';
import * as FileSaver from 'file-saver';
import { AuthenticationService } from '../../../layout/services/authentication.service';
import { Variable, TaskCompleteRequest, TaskCommentRequest, TaskActionRequest, TaskResolveRequest } from '@models/workflow/index';

@Injectable()
export class WorkflowService {
  size: number = 100000;
  constructor(private http: Http, private restangular: Restangular, private authenticationService: AuthenticationService) {
  }

  startWorkflow(item: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('runtime/process-instances', item, options);
  }

  getUsers(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('identity/users', options);
  }

  getTaskById(taskId: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`runtime/tasks/${taskId}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getTasks(applyer: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`runtime/tasks?includeProcessVariables=true&candidateOrAssigned=${applyer}&size=${this.size}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getTasksByProcessInstanceId(processInstanceId: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`runtime/tasks?processInstanceId=${processInstanceId}&size=${this.size}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getProcesses(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('repository/process-definitions', options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getTaskVariable(taskId: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`runtime/tasks/${taskId}/variables?scope=global&size=${this.size}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  taskAction(taskId: number, params: TaskActionRequest): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`runtime/tasks/${taskId}`, params, options);
  }

  taskComplete(taskId: number, variables: Variable[]): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    let taskCompleteRequest = new TaskCompleteRequest();
    taskCompleteRequest.action = "complete";
    taskCompleteRequest.variables = [];
    variables.forEach(element => {
      taskCompleteRequest.variables.push(element);
    });
    return this.http.post(`runtime/tasks/${taskId}`, taskCompleteRequest, options);
  }

  taskComment(taskId: number, comment: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    let taskCommentRequest = new TaskCommentRequest(comment, true);
    return this.http.post(`runtime/tasks/${taskId}/comments`, taskCommentRequest, options);
  }

  taskResolve(taskId: number, params: TaskResolveRequest): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`runtime/tasks/${taskId}`, params, options);
  }

  // Get historic task instances by processInstanceId
  getHistoricTaskInstancesByTaskDefinitionKey(processInstanceId: number, taskDefinitionKey: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`history/historic-task-instances?processInstanceId=${processInstanceId}&taskDefinitionKey=${taskDefinitionKey}&size=${this.size}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Get historic task instances by processInstanceId
  getHistoricTaskInstancesByTaskId(taskId: number): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`history/historic-task-instances/${taskId}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Get historic task instances by processInstanceId
  getHistoricTaskInstances(processInstanceId: number): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`history/historic-task-instances?processInstanceId=${processInstanceId}&size=${this.size}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Get historic variable instances by processInstanceId
  getHistoricVariableInstances(processInstanceId: number): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`history/historic-variable-instances?processInstanceId=${processInstanceId}&size=${this.size}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Get historic variable instances
  getAllHistoricVariableInstances(): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`history/historic-variable-instances?size=${this.size}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Get historic variable instances by processInstanceId
  getHistoricComment(processInstanceId: number): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`history/historic-process-instances/${processInstanceId}/comments`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Get historic task instances
  getHistoryTask(applyer: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`history/historic-task-instances?includeProcessVariables=true&candidateOrAssigned=${applyer}&size=${this.size}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Get historic task instances by processInstanceId
  getHistoryTaskByProcessInstanceId(processInstanceId: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`history/historic-task-instances?processInstanceId=${processInstanceId}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Get historic task instances
  getHistoryProcessById(processInstanceId: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`history/historic-process-instances?processInstanceId=${processInstanceId}&&includeProcessVariables=true`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  // Get historic task instances
  getHistoryProcessByProcessDefinitionId(processDefinitionId: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    if (processDefinitionId) {
      return this.http.get(`history/historic-process-instances?processDefinitionId=${processDefinitionId}&size=${this.size}`, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    } else {
      return this.http.get(`history/historic-process-instances?size=${this.size}`, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
  }

  // Get historic task instances by processInstanceId
  getHistoryProcessByProcessInstanceId(processInstanceId: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`history/historic-process-instances?processInstanceId=${processInstanceId}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  processInstanceAttachment(processInstanceId: number, fileName: string, params: any): Observable<any> {
    let headers = new Headers({ 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    fileName = this.encodeHexString(fileName);
    return this.http.post(`runtime/process-instances/${processInstanceId}/variables?name=${fileName}`, params, options);
  }

  downloadFile(processInstanceId: number, attachmentName: string) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
    attachmentName = this.encodeHexString(attachmentName);
    return this.http.get(`runtime/process-instances/${processInstanceId}/variables/${attachmentName}/data`, options)
      .map(res => {
        //let blob: Blob = new Blob([res.blob()]);
        attachmentName = this.encodeNormalString(attachmentName);
        FileSaver.saveAs(res.blob(), attachmentName);
      })
      .catch((error: any) => Observable.throw(error.json().error || 'download error'));
  }

  getProcessInstanceVariables(processInstanceId: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`runtime/process-instances/${processInstanceId}/variables`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getProcessInstanceVariablesByName(processInstanceId: number,variableName:string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`runtime/process-instances/${processInstanceId}/variables`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  removeProcessInstanceVariable(processInstanceId: number, attachmentName: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers });
    attachmentName = this.encodeHexString(attachmentName);
    return this.http.delete(`api/workflow/process-instances/${processInstanceId}/variables?variableName=${attachmentName}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  //16进制转码
  encodeHexString(inputString: string): string {
    return inputString.replace('%', '%25').replace('#', '%23').replace('&', '%26');//.replace('.', '%2E');
  }

  encodeNormalString(inputString: string): string {
    return inputString.replace('%26', '&').replace('%23', '#').replace('%25', '%');
  }

}
