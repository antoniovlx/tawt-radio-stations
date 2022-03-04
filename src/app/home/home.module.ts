import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';

import { HomePage } from './home.page';
import { SharedModule } from '../shared/shared.module';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SwiperModule,
    SharedModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
