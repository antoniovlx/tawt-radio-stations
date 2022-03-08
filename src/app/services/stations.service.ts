import { Injectable } from '@angular/core';
import { RadioBrowserApi, Station } from 'radio-browser-api'
import { Observable } from 'rxjs';
import { Country } from '../model/Country';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  audio: HTMLAudioElement;

  private readonly URL = 'assets/data/countries.json';

  constructor(private httpClient: HttpClient) { 
    this.audio = new Audio();
  }

  async getStations(countryCode?: string) {
    const api = new RadioBrowserApi('My Radio App');


    // query stations by country code and limit to first 1000 stations
    return await api.searchStations({
      countryCode: countryCode !== undefined ? countryCode : '',
      limit: 100,
      offset: 0 // this is the default - can be omited
    });
  }

  getPopup(station: Station) {
    return `<img src="${station.favicon}"/>
            ${station.name}<br>
            ${station.country}<br>
            ${station.url}`;
  
  }
  play(url: string){
    this.audio.load();
    this.audio.src = url;
    this.audio.play();
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.URL);
  }
}
