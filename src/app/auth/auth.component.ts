import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin=true;
  isLoading=false;
  errorMessage=null;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSwitch(){
    this.isLogin=!this.isLogin;
  }

  onSubmit(authForm:NgForm){
    this.isLoading=true;
    if (this.isLogin){
      //Prisijungias
    }else{

      this.authService.signup(authForm.value.email, authForm.value.password).subscribe((result)=>{
        console.log(result);
        this.isLoading=false;
      }, (error)=>{
        this.errorMessage="Įvyko nežinoma klaida";
        if (error.error && error.error.error){
          if (error.error.error.message=='EMAIL_EXISTS') this.errorMessage="Toks vartotojas jau registruotas";
        }
        this.isLoading=false;
      });
    }
    
  }

}
