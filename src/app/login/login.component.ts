import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email="";
  password="";
  url = "http://localhost:3000";
  

  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
  }
 
  login()
  {
    if(this.email!="" && this.password!="")
    {
      var reqObj={
        email:this.email,
        password:this.password,
        API_KEY:"1523sjfj9fmfm03m33df"
      }
      const headers=new HttpHeaders()
      .set("Content-Type","application/json");

      this.http.post(this.url+"/authenication/login",JSON.stringify(reqObj),{headers:headers})
      .subscribe(response=>{
        
        if(response["message"]=="Success")
        {
          this.router.navigateByUrl("dashboard");
        }
        else
        {
          alert("Login Failed");
        }
      })
    } 
  }
}
