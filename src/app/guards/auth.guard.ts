import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService:AuthService,private toaster:ToasterService,private route:Router){}
  canActivate:CanActivateFn=()=>{
    if(this.authService.isLoggedin()){
      return true
    }
    else{
      // alert (please login)
      this.toaster.showError("Access denied!!! please Login...","warning")
      
      // redirect to landing page
      this.route.navigateByUrl('/home')
      
      return false
    }


   
  }

  }
  
