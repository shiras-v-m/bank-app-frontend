import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url=`https://bank-app-backend-lbni.onrender.com`
  constructor(private http:HttpClient) { }

  register(username:any,acno:any,password:any){
    // req body
    const body={
      username,
      acno,
      password
    }
 
    // to call register api
 return this.http.post(`${this.base_url}/employee/register`,body)
  }

  login(acno:any,password:any){
    // in post method we need to send a body
    const body={
      acno,
      password
    }
    // api call
    return this.http.post(`${this.base_url}/employee/login`,body)
  }
  
  // adding header to http request
  appendToken(){
    // get token from local storage
    const token= localStorage.getItem("token")  
    // create http header
    let headers=new HttpHeaders()
    if(token){
      // append token in headers
     headers= headers.append("access-token",token)
     options.headers =headers
    }
    return options
  }

  // to get balance
  balanceEnquiry(acno:any){
    return this.http.get(`${this.base_url}/user/balance/${acno}`,this.appendToken())
  }

  // fund transfer
  fundTransfer(creditAcno:any,creditAmount:any,profilePassword:any){
    const body={
      creditAcno,
      creditAmount,
      profilePassword
    }
    return this.http.post(`${this.base_url}/user/transfer`,body,this.appendToken())
  }

  // getTransactions

  getTransactions(){
    return this.http.get(`${this.base_url}/user/ministatement`,this.appendToken())
  }

  deleteAcno(){
    // make an api call
    return this.http.delete(`${this.base_url}/user/delete`,this.appendToken())
  }
}
