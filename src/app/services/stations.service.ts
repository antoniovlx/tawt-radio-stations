import { Injectable } from '@angular/core';
import { RadioBrowserApi, Station } from 'radio-browser-api'

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  audio: HTMLAudioElement;

  constructor() { 
    this.audio = new Audio();
  }

  async getStations() {
    const api = new RadioBrowserApi('My Radio App');

    // query stations by country code and limit to first 100 stations
    return await api.searchStations({
      //countryCode: 'US',
      limit: 1000,
      offset: 0 // this is the default - can be omited
    })
  }

  getPopup(station: Station) {
    return `${station.name}<br>
            ${station.country}<br>
            ${station.url}`;
  
  }
  play(url: string){
    this.audio.load();
    this.audio.src = url;
    this.audio.play();
  }
}
