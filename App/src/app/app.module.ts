import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data/in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MessagesComponent } from './components/messages/messages.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { HomePage } from './pages/home/home.page';
import { ListPage } from './pages/list/list.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { HeroesPage } from './pages/heroes/heroes.page';
import { HeroDetailsPage } from './pages/hero-details/hero-details.page';


@NgModule({
	declarations: [
		AppComponent,
		HeroesPage,
		HeroDetailsPage,
		MessagesComponent,
		HeroSearchComponent,
		HomePage,
		ListPage,
		DashboardPage,
		HeroesPage,
		HeroDetailsPage
	],
	entryComponents: [],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		HttpClientModule,
		HttpClientInMemoryWebApiModule.forRoot(
			InMemoryDataService, { dataEncapsulation: false }
		)
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	private MODULE = "AppModule";

	constructor() {
		console.log(this.MODULE + '::constructor | ');
	}
}
