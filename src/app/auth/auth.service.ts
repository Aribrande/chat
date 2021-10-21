import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators'
import { User } from './user.model';

export interface AuthResponse {
  idToken: string, 	    //  A Firebase Auth ID token for the authenticated user.
  email: string,        // 	The email for the authenticated user.
  refreshToken: string, // 	A Firebase Auth refresh token for the authenticated user.
  expiresIn: string,    // 	The number of seconds in which the ID token expires.
  localId: string,      // 	The uid of the authenticated user.
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user:User;

  constructor(private http: HttpClient, private router:Router) { }


  private userAuth(response:AuthResponse){
    this.user=new User(
      response.email, 
      response.localId, 
      response.idToken, 
      new Date( new Date().getTime()+ +response.expiresIn*1000 ) 
      );
    localStorage.setItem('user',JSON.stringify(this.user));  
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCRnmH8aj2wX4LeSkcv6uPOzSFAcSRZtoA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe( tap((response)=>{
        this.userAuth(response);
      }));
  }

  login(email:string, password:string){
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCRnmH8aj2wX4LeSkcv6uPOzSFAcSRZtoA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe( tap((response)=>{
        this.userAuth(response);
      }));
  }

  savedLogin(){
    const user=JSON.parse(localStorage.getItem('user'));
    if (!user) return ;
    if (new Date(user.expires) < new Date()) return;
    this.user=new User(user.email, user.id,user.token,new Date(user.expires));
    this.router.navigate(['/']);
  }

  logout(){
    this.user=null;
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }

}
