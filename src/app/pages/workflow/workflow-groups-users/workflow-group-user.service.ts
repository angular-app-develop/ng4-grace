import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Restangular } from 'ngx-restangular';
import { AuthenticationService } from '../../../layout/services/authentication.service';
import { User } from '@models/workflow/user';
import { ActivitUser } from '@models/workflow/user';
import { ToastrService, ToastrConfig } from 'ngx-toastr';

@Injectable()
export class WorkflowGroupUserService {

  headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
  options = new RequestOptions({ headers: this.headers });
  user: any;
  group: any;
  // users:Array<any>;

  constructor(private http: Http, private restangular: Restangular, private authenticationService: AuthenticationService,
    private toastrService: ToastrService, private toastrConfig: ToastrConfig) {
  }

  public setUser(row: any) {
    this.user = row;
  }

  public getcurrentGroup() {
    return this.group;
  }

  public setcurrentGroup(row: any) {
    this.group = row;
  }

  public getUser() {
    return this.user;
  }


  convertToUsers(data: Array<any>): Array<User> {
    let users = new Array<User>();
    for (let item of data) {
      let user = new User();
      user.userId = item.id;
      user.userName = item.firstName;
      user.email = item.email;
      users.push(user);
    }
    return users;
  }

  convertToUser(data: any): User {
    if (!data) return null;
    let user = new User();
    user.userId = data.id;
    user.userName = data.firstName;
    user.email = data.email;
    return user;
  }

  convertToActivitiUser(user: User): ActivitUser {
    let a_user = new ActivitUser();
    a_user.id = user.userId;
    a_user.firstName = user.userName;
    a_user.lastName = user.userName;
    a_user.url = user.url
    a_user.email = user.email;
    a_user.password = '';
    return a_user;
  }

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

  getData(): Observable<any> {
    return this.http.get('identity/users', this.options);
  }


  deleteUser(userId: string): Observable<any> {
    return this.http.delete('identity/users/' + userId, this.options);
  }


  editUser(user: User): Observable<any> {
    let a_user = this.convertToActivitiUser(user);
    return this.http.put('identity/users/' + a_user.id, a_user, this.options);
  }


  findOne(userId: string): Observable<any> {
    return this.http.delete('identity/users/' + userId, this.options);
  }

  addUser(user: User): Observable<any> {
    let a_user = this.convertToActivitiUser(user);
    return this.http.post('identity/users', a_user, this.options);
  }


  getGroups(): Observable<any> {
    return this.http.get('identity/groups', this.options);
  }

  getGroup(groupId: string): Observable<any> {
    return this.http.get('identity/groups/' + groupId, this.options);
  }

  editGroup(group: any): Observable<any> {
    return this.http.put('identity/groups/' + group.id, group, this.options);
  }

  addGroup(group: any): Observable<any> {
    return this.http.post('identity/groups', group, this.options);
  }

  deleteGroup(groupId: string): Observable<any> {
    return this.http.delete('identity/groups/' + groupId, this.options);
  }

  getGroupMembers(groupId: string): Observable<any> {
    return this.http.get('identity/users?memberOfGroup=' + groupId, this.options);
  }

  addGroupMember(groupId: string, userId: string): Observable<any> {
    let params = { 'userId': userId };
    return this.http.post('identity/groups/' + groupId + '/members', params, this.options);
  }

  deleteGroupMember(groupId: string, userId: string): Observable<any> {
    return this.http.delete('identity/groups/' + groupId + '/members/' + userId, this.options);
  }







}
