import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
		BrowserModule,
		IonicModule.forRoot(),
		IonicStorageModule.forRoot(),
		AppRoutingModule
    ],
    providers: [
		StatusBar,
		SplashScreen,
		Keyboard,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		HTTP,
		Geolocation,
		Camera
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
