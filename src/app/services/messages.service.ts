import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ChatMessage } from '../models/chatmessage.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private authService:AuthService, private http:HttpClient) { }


  postMessage(text:string){
     const message=new ChatMessage(this.authService.user.email, this.authService.user.id, text);

     return this.http.post<{name:string}>("https://chat-2581f-default-rtdb.europe-west1.firebasedatabase.app/messages.json",message,
      {
        params:new HttpParams().set('auth', this.authService.user.token)
      }
     );
  }
}
