import { Component, OnInit, OnChanges } from '@angular/core';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero/hero.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.page.html',
	styleUrls: ['./heroes.page.scss'],
})
export class HeroesPage implements OnInit, OnChanges {
	private MODULE = "HeroesPage";

	heroes: Hero[];
	selectedHero: Hero;

	constructor(private router: Router, private heroService: HeroService) {
		console.log(this.MODULE + '::constructor | ');
	}

	ngOnInit() {
		console.log(this.MODULE + '::ngOnInit | ');

		this.getHeroes();
	}

	ngOnChanges() {
		console.log(this.MODULE + '::ngOnChanges | ');

	}
	
	onSelect(hero: Hero): void {
		console.log(this.MODULE + '::onSelect | ');

		this.selectedHero = hero;
	}

	getHeroes(): void {
		console.log(this.MODULE + '::getHeroes | ');

		this.heroService.getHeroes()
			.subscribe(heroes => {
				this.heroes = heroes;

				console.log(this.MODULE + '::getHeroes | got ' + this.heroes.length + ' heroes');
			});

		console.log(this.MODULE + '::getHeroes | DONE');
	}

	add(name: string): void {
		console.log(this.MODULE + '::getHeroes | ');

		name = name.trim();
		if (!name) { return; }
		this.heroService.addHero({ name } as Hero)
			.subscribe(hero => {
				this.heroes.push(hero);
			});
	}

	delete(sliding_item, hero: Hero): void {
		console.log(this.MODULE + '::getHeroes | ');

		this.heroes = this.heroes.filter(h => h !== hero);
		this.heroService.deleteHero(hero).subscribe();

		this.close_sliding_item(sliding_item)
	}

	show(hero) {
		console.log(this.MODULE + '::show | hero=', hero);
		this.heroService.currentHero = hero;
		this.router.navigateByUrl('/details/' + hero.id);
	}

	close_sliding_item(item) {
		console.log(this.MODULE + '::close_sliding_item | ');

		item.close();
	}
}
