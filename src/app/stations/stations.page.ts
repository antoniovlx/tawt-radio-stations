import { Component, OnInit } from '@angular/core';
import { Station } from 'radio-browser-api';
import { StationsService } from '../services/stations.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.page.html',
  styleUrls: ['./stations.page.scss'],
})
export class StationsPage implements OnInit {
  stations: Station[] = [];
  audio: HTMLAudioElement;

  constructor(private stationsService: StationsService) { }

  ngOnInit(): void {
    this.audio = new Audio();

    this.stationsService.getStations().then(stations =>{
      this.stations = stations;
    })
  }

  play(url: string){
    this.audio.load();
    this.audio.src = url;
    this.audio.play();
  }


}
