import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapPage } from './map.page';

import { HTTP } from '@ionic-native/http/ngx';

const routes: Routes = [
  {
    path: '',
    component: MapPage
  }
];

@NgModule({
    imports: [
	CommonModule,
	FormsModule,
	IonicModule,
	RouterModule.forChild(routes)
    ],
    declarations: [MapPage],
    providers: [
	HTTP
    ]
})
export class MapPageModule {}
