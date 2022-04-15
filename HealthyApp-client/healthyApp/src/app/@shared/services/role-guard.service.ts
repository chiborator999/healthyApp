import { EventEmitter, Injectable, Output } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  tokenPayload: any;
  expectedRole: any;

  constructor(private authService: AuthService,
              private router: Router)
  { }
  
  canActivate(route: ActivatedRouteSnapshot): boolean {

    this.expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');
    this.tokenPayload = jwt_decode(`${token}`);

    if (!this.authService.isAuthenticated() || this.tokenPayload.role !== this.expectedRole
  ) {
    this.router.navigate(['login']);
    return false;
  }
  return true;
  }
}
