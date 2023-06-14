import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  // loading spinner
  isLoading:Boolean=false
  
  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.minLength(2)]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
    constructor(private fb:FormBuilder,private api:ApiService,private toaster:ToasterService,private route:Router){}
  login(){
    this.isLoading=true
    if(this.loginForm.valid){
      let acno=this.loginForm.value.acno
      let pswd=this.loginForm.value.password
      console.log(acno);
      console.log(pswd);
      
      
      this.api.login(acno,pswd).subscribe({
        next:(res:any)=>{

          // res destructure to preuser and token
          const {preuser,token}=res

          console.log(res);
         
          localStorage.setItem("loginUser",preuser.username)
          localStorage.setItem("loginUserAcno",preuser.acno)
          localStorage.setItem("token",token)
          setTimeout(()=>{
             this.toaster.showSuccess(`${preuser.username} login successfully`,"success" )
            this.route.navigateByUrl('user/dashboard')
            this.isLoading=false
          },2000)
        },
        error:(err:any)=>{
          console.log(err.error);
          this.toaster.showError(`${err.error} login failed`,"failed" )
          this.isLoading=false
        }
      })
   
    }
    else{
      this.toaster.showError(`Invalid informations!`,"failed" )
      this.isLoading=false
    }
  }
}
