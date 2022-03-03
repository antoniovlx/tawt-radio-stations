import { Component, OnInit } from '@angular/core';
import { RadioBrowserApi, Station } from 'radio-browser-api'

const api = new RadioBrowserApi('My Radio App');

@Component({
  selector: 'app-stations',
  templateUrl: './stations.page.html',
  styleUrls: ['./stations.page.scss'],
})
export class StationsPage implements OnInit {
  stations: Station[] = [];
  audio: HTMLAudioElement;

  constructor() { }

  ngOnInit(): void {
    this.getStations();
    this.audio = new Audio();
  }

  async getStations() {
    const api = new RadioBrowserApi('My Radio App');

    // query stations by country code and limit to first 100 stations
    this.stations = await api.searchStations({
      countryCode: 'US',
      limit: 100,
      offset: 0 // this is the default - can be omited
    })

    console.log(this.stations)
  }

  play(url: string){
    this.audio.load();
    this.audio.src = url;
    this.audio.play();
  }


}
