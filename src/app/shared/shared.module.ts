import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';
import { StationsService } from '../services/stations.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LeafletModule,
    HttpClientModule
  ],
  exports:[
    LeafletModule,
    CommonModule,
    HttpClientModule
  ],
  providers:[
    StationsService
  ]
})
export class SharedModule { }
