import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // form group
  registerForm= this.fb.group({
    username:['',[Validators.required]],
    acno:['',[Validators.required]], 
    password:['',[Validators.required]]
  })
  constructor(private fb:FormBuilder,private api:ApiService,private toastr: ToastrService,private router:Router){}
  register(){



    if(this.registerForm.valid){
      let username=this.registerForm.value.username
      let pswd=this.registerForm.value.password
      let acno=this.registerForm.value.acno
      console.log(username);
      console.log(pswd);
      console.log(acno);
      
      
      

      // register api call in  service
      this.api.register(username,acno,pswd).subscribe({
        next:(response:any)=>{
          console.log(response);
          this.toastr.success(`${response.username} registered successfully`,"success");
          setTimeout(()=>{
            this.router.navigateByUrl('/signin')
          },2000)
        },
        error:(err:any)=>{
          console.log(err);
        
          this.toastr.error(`${err.error}`,'failed')

        }
  
      })
    }
  
    else{
 this.toastr.error(`Please fill out the form`,'failed')    }
   
  }

}
