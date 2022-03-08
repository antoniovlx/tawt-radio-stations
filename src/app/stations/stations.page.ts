import { Component, OnInit } from '@angular/core';
import { Station } from 'radio-browser-api';
import { Country } from '../model/Country';
import { StationsService } from '../services/stations.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.page.html',
  styleUrls: ['./stations.page.scss'],
})
export class StationsPage implements OnInit {
  stations: Station[] = [];
  audio: HTMLAudioElement;
  countries: Country[] = [];
  selectedCountry: string;

  constructor(private stationsService: StationsService) { }

  ngOnInit(): void {
    this.audio = new Audio();

    this.searchStations();

    this.stationsService.getCountries().subscribe(countries => {
      this.countries = countries
    })
  }

  private searchStations(countryCode?: string) {
    this.stationsService.getStations(countryCode).then(stations => {
      this.stations = stations;
    });
  }

  play(url: string) {
    this.audio.load();
    this.audio.src = url;
    this.audio.play();
  }

  selectCountry(selected): void {
    this.selectedCountry = selected.detail.value;
    this.searchStations(this.selectedCountry);
  }


}
