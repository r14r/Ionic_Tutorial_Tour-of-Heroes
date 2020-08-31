import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero/hero.service';
import { Hero } from 'src/app/models/hero';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
	private MODULE = "DashboardPage";

	heroes: Hero[] = [];

	constructor(private heroService: HeroService) {
		console.log(this.MODULE + 'constructor | ');
	}

	ngOnInit() {
		console.log(this.MODULE + 'ngOnInit | ');

		this.getTop5Heroes();
	}

	getTop5Heroes(): void {
		console.log(this.MODULE + 'getTop5Heroes | ');

		this.heroService.getHeroes()
			.subscribe(heroes => this.heroes = heroes.slice(1, 5));
	}
}
