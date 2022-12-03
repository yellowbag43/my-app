import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { Buffer } from 'buffer';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router,
              private localStorage: LocalstorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const token = this.localStorage.getKey();

      if ( token )
      {
        const tokenParsed = JSON.parse(this.decodeBase64(token.split('.')[1]));
        console.log(tokenParsed)
        if ( this._tokenExpired(tokenParsed.exp) ) 
        {
          console.log("Token already Expired")
          this.route.navigate(['\login'])
          return false;
        }
        else
             return true;
      }
      else
      {
        this.route.navigate(['\login'])
        return false;
      }
    }

   decodeBase64 = (data) => {
      return Buffer.from(data, 'base64').toString('ascii')
  }

  private _tokenExpired(expiration): boolean {
    const val =  Math.floor(new Date().getTime() / 1000) >= expiration;
    return val;
  }

} 

