import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private authservice : AuthService,private route: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkedloggedIn(state.url);
  }
  checkedloggedIn(url: string) : boolean {
      if (this.authservice.isLoggedIn) {
          return true;
      }
      this.authservice.redirectUrl= url;
      this.route.navigate(['/login']); 
      return false;
  }
  

}
