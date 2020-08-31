import { Component } from '@angular/core';
import { HostBinding } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {
	trigger,
	state,
	style,
	animate,
	transition,
} from '@angular/animations';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: [ 'app.component.scss' ],
	animations: [
		// animation triggers go here
	]
})
export class AppComponent {
	private MODULE = 'AppComponent';

	public appPages = [
		{ title: 'Dashboard', url: '/dashboard', icon: 'grid' },
		{ title: 'Home', url: '/home', icon: 'home' },
		{ title: 'Heroes', url: '/heroes', icon: 'list' }
	];

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar
	) {
		console.log(this.MODULE + '::constructor | ');

		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}
}
