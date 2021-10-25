import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-write-messages',
  templateUrl: './write-messages.component.html',
  styleUrls: ['./write-messages.component.css']
})
export class WriteMessagesComponent implements OnInit {

  constructor(private messagesService:MessagesService) { }

  ngOnInit(): void {
    this.messagesService.postMessage("Uzkroviau komponenta").subscribe((response)=>{
      console.log(response);
    })
  }

}
