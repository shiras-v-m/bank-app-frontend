import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ResourceLoader } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private api:ApiService,private toaster:ToasterService,private fb:FormBuilder,private route:Router){}
  
  transferForm=this.fb.group({
    creditAcno:['',[Validators.required,Validators.pattern("[0-9]*")]],
    creditAmount:['',[Validators.required,Validators.pattern("[0-9]*")]],
    profilePswd:["",[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]]
  })
  
  
  user:string=''
  balance:number=0
  showOffcanvas:boolean=true
  ngOnInit(): void {
    // get userlogin details
    this.user=localStorage.getItem("loginUser") || ""
    console.log(this.user);
    
  }
  getBalance(){
    let acno=localStorage.getItem("loginUserAcno")
    this.api.balanceEnquiry(acno).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.balance=res
      },
      error:(err:any)=>{
        console.log(err.error);
        this.toaster.showError(err.error,"Fail")
        this.showOffcanvas=false
      }
    })
    // call balance fn of service

  }


  // transfer fund
  transfer(){
    if(this.transferForm.valid){
      let creditAcno=this.transferForm.value.creditAcno
      let creditAmount=this.transferForm.value.creditAmount
      let profilePswd=this.transferForm.value.profilePswd
      
      console.log("creditacno entered:",creditAcno)
      console.log("creditamount entered:",creditAmount)
      console.log("profilePswd entered:",profilePswd)
      // make a call to service
      this.api.fundTransfer(creditAcno,creditAmount,profilePswd).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.toaster.showSuccess(res,"success")
          this.transferForm.reset()

        },
        error:(err)=>{
          console.log(err.error);
          this.toaster.showError(err.error,"Failed")
        }
      })
    }
    else{
      this.toaster.showError("Invalid form",'warning')
    }

  }

  // cancel transfer
  cancelTransfer(){
    this.transferForm.reset()
  }


  // delete account
  deleteMyAcno(){
    // make call to service
    this.api.deleteAcno().subscribe({
      next:(res:any)=>{
        console.log(res);
 
        this.toaster.showSuccess(res,"Success")
        this.logout()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  // logout
  logout(){
    localStorage.removeItem("token")
        localStorage.removeItem("loginUser")
        localStorage.removeItem("loginUserAcno")
        setTimeout(()=>{
          this.route.navigateByUrl('/home')
        },1000)
  }
  // remove login data from localstore

}

