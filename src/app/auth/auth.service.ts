import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCRnmH8aj2wX4LeSkcv6uPOzSFAcSRZtoA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
  }

}
