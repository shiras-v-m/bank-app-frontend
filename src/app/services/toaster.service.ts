import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toaster:ToastrService) { }

  showSuccess(msg:any,title:any){
    this.toaster.success(msg,title)
  }
  showError(msg:any,title:any){
    this.toaster.error(msg,title)
  }
  
}
