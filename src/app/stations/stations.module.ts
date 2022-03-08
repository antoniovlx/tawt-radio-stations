import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StationsPageRoutingModule } from './stations-routing.module';

import { StationsPage } from './stations.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StationsPageRoutingModule,
    SharedModule
  ],
  declarations: [StationsPage]
})
export class StationsPageModule {}
