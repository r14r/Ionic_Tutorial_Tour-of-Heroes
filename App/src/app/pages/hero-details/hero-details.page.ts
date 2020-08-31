import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero/hero.service';


@Component({
	selector: 'app-hero-detail',
	templateUrl: './hero-details.page.html',
	styleUrls: ['./hero-details.page.scss']
})
export class HeroDetailsPage implements OnInit {
	private MODULE = "HeroDetailsPage";
	hero: Hero;

	ineditmode: boolean = null;

	constructor(
		private route: ActivatedRoute,
		private heroService: HeroService,
		private location: Location
	) {
		console.log(this.MODULE + '::constructor | ');
	}

	ngOnInit(): void {
		console.log(this.MODULE + '::ngOnInit | ');

		this.getHero();
	}

	getHero(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		console.log(this.MODULE + '::getHero | id=' + id);

		this.heroService.getHero(id)
			.subscribe(hero => {
				console.log(this.MODULE + '::getHero | subscribe here=' + hero);
				this.hero = hero
			});

		console.log(this.MODULE + '::getHero | DONE');

	}

	goBack(): void {
		console.log(this.MODULE + '::goBack | ');

		this.location.back();
	}

	save(): void {
		console.log(this.MODULE + '::save | ');

		this.heroService.updateHero(this.hero)
			.subscribe(() => this.goBack());
	}

	edit(toggle) {
		console.log(this.MODULE + '::edit | ');

		if (this.ineditmode == true) {
		}
		this.ineditmode = toggle;
	}

	submit(formValue: any) {
		console.log(this.MODULE + '::submit | ');

		console.log(formValue);
	}
}
