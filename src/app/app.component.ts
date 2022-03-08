import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  url: string = ``;

  public appPages = [
    { title: 'Inbox', url: 'home', icon: 'mail' },
    { title: 'Outbox', url: 'stations', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  audio: HTMLAudioElement;
  constructor() {
    console.log("init")
  }
  ngOnInit(): void {
   
  }

  
}
