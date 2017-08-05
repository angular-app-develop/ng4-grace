import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class AuthenticationService {
    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });
    private token: string;
    private username: string;

    constructor(private http: Http, private restangular: Restangular) {
    }

    login(account, password): Observable<any> {
        let cred = btoa(account + ":" + password);
        return this.restangular.one('login').get({ requestId: cred });
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('usertoken');
    }

    getToken() {
        var currentToken = localStorage.getItem('usertoken');
        if (currentToken) {
            this.token = currentToken;
        }
        return this.token;
    }

    getUserName() {
        var currentUserName = localStorage.getItem('username');
        if (currentUserName) {
            this.username = currentUserName;
        }
        return this.username;
    }
}
