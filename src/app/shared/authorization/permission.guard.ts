import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthenticationService } from '@layout/services/authentication.service';

@Injectable()
export class PermissionGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router,
        private authenticationService: AuthenticationService) {

    }
    canActivate() {
        let hasPermission: boolean = false;
        if (this.authenticationService.getToken() != null &&
            this.authenticationService.getToken() != undefined) {
            hasPermission = true;
        }
        if (!hasPermission) {
            this.router.navigate(['/login']);
        }
        return hasPermission;
    }

    canActivateChild() {
        let hasPermission: boolean = false;
        if (this.authenticationService.getToken() != null &&
            this.authenticationService.getToken() != undefined) {
            hasPermission = true;
        }
        if (!hasPermission) {
            this.router.navigate(['/login']);
        }
        return hasPermission;
    }
}
