import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-sidebar-v2'
import { Station } from 'radio-browser-api';
import { Country } from '../model/Country';
import { StationsService } from '../services/stations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  map: L.Map;

  countGeoLocation = 0;

  // Define our base layers so we can reference them multiple times
  streetMaps = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  wMaps = L.tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Marker for the top of Mt. Ranier
  summit = L.marker([46.8523, -121.7603], {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  // Marker for the parking lot at the base of Mt. Ranier trails
  paradise = L.marker([46.78465227596462, -121.74141269177198], {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'leaflet/marker-icon.png',
      iconRetinaUrl: 'leaflet/marker-icon-2x.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  // Path from paradise to summit - most points omitted from this example for brevity
  route = L.polyline([[46.78465227596462, -121.74141269177198],
  [46.80047278292477, -121.73470708541572],
  [46.815471360459924, -121.72521826811135],
  [46.8360239546746, -121.7323131300509],
  [46.844306448474526, -121.73327445052564],
  [46.84979408048093, -121.74325201660395],
  [46.853193528950214, -121.74823296256363],
  [46.85322881676257, -121.74843915738165],
  [46.85119913890958, -121.7519719619304],
  [46.85103829018772, -121.7542376741767],
  [46.85101557523012, -121.75431755371392],
  [46.85140013694763, -121.75727385096252],
  [46.8525277543813, -121.75995212048292],
  [46.85290292836726, -121.76049157977104],
  [46.8528160918504, -121.76042997278273]]);

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps
    },
    overlays: {
      'Mt. Rainier Summit': this.summit,
      'Mt. Rainier Paradise Start': this.paradise,
      'Mt. Rainier Climb Route': this.route
    }
  };

  options = {
    layers: [this.streetMaps, this.route, this.summit, this.paradise],
    zoom: 2,
    center: L.latLng([40.416775, -3.703790])
  };
  stations: Station[] = [];
  countries: Country[];
  selectedCountry: string;
  sidebar: L.Control.Sidebar;

  constructor(private stationsService: StationsService) { }

  ngOnInit() {

    this.stationsService.getCountries().subscribe(countries => {
      this.countries = countries
    })

    this.searchStations();

  }

  onMapReady(map: L.Map) {

    this.sidebar = L.control.sidebar({
      autopan: false,       // whether to maintain the centered map point when opening the sidebar
      closeButton: true,    // whether t add a close button to the panes
      container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
      position: 'left',     // left or right
    });

    this.map = map;
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    this.sidebar.addTo(this.map);
  }

  loadStations() {
    for (const station of this.stations) {
      if (station.geoLat !== undefined && station.geoLong !== undefined) {
        this.countGeoLocation++;
        let marker = L.marker([station.geoLat, station.geoLong], {
          icon: L.icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
          }),
          title: station.name,
          alt: station.name
        });

        marker.bindPopup(this.stationsService.getPopup(station))
        marker.on('click', (event) =>  this.sidebar.open('home'));
        marker.addTo(this.map);

        this.layersControl.overlays[station.name] = marker;
      }
    }

  }
  selectCountry(selected): void {
    this.selectedCountry = selected.detail.value;
    this.searchStations(this.selectedCountry);
  }
  searchStations(selectedCountry?: string) {
    this.stationsService.getStations(selectedCountry).then(stations => {
      this.stations = stations;
      this.loadStations();
    })
  }
}
