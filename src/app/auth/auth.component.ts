import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin=true;
  isLoading=false;
  errorMessage=null;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSwitch(){
    this.isLogin=!this.isLogin;
  }

  onSubmit(authForm:NgForm){
    this.isLoading=true;

    let authObservable:Observable<AuthResponse>;

    if (this.isLogin){
       authObservable=this.authService.login(authForm.value.email, authForm.value.password);
    }else{
       authObservable=this.authService.signup(authForm.value.email, authForm.value.password);
    }

    authObservable.subscribe((result)=>{
      console.log(this.authService.user);
      this.isLoading=false;
      this.errorMessage=null;
      this.router.navigate(['/']);
    }, (error)=>{
      this.errorMessage="Įvyko nežinoma klaida";
      if (error.error && error.error.error){
        switch (error.error.error.message) {
          case 'EMAIL_EXISTS':      this.errorMessage = "Toks vartotojas jau registruotas";
            break;
          case 'EMAIL_NOT_FOUND':   this.errorMessage = "El. paštas nerastas";
            break;
          case 'INVALID_PASSWORD':  this.errorMessage = "Įvestas neteisingas slaptažodis";
            break;
        }

      }
      this.isLoading=false;
    });
    
  }

}
