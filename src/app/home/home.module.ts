import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HTTP } from '@ionic-native/http/ngx';

@NgModule({
    imports: [
	CommonModule,
	FormsModule,
	IonicModule,
	RouterModule.forChild([
	    {
		path: '',
		component: HomePage
	    }
	])
    ],
    declarations: [HomePage],
    providers: [
	HTTP
    ]
})
export class HomePageModule {}
