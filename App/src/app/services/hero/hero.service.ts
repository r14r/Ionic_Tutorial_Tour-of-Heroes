import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../message/message.service';
import { Hero } from 'src/app/models/hero';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class HeroService {
	private MODULE = "HeroService";

	private heroesUrl = 'api/heroes';  // URL to web api

	public currentHero: Hero = null;

	constructor(
		private http: HttpClient,
		private messageService: MessageService) {
		console.log(this.MODULE + '::constructor | ');
	}

	getHero(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/${id}`;
		
		console.log(this.MODULE + '::getHero | id=', id, ' url=', url);

		return this.http.get<Hero>(url).pipe(
			tap(_ => this.log(`fetched hero id=${id}`)),
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		);
	}

	getHeroNo404<Data>(id: number): Observable<Hero> {
		console.log(this.MODULE + '::getHeroNo404 | id=', id);

		const url = `${this.heroesUrl}/?id=${id}`;
		return this.http.get<Hero[]>(url)
			.pipe(
				map(heroes => heroes[0]), // returns a {0|1} element array
				tap(h => {
					const outcome = h ? `fetched` : `did not find`;
					this.log(`${outcome} hero id=${id}`);
				}),
				catchError(this.handleError<Hero>(`getHero id=${id}`))
			);
	}

	searchHeroes(term: string): Observable<Hero[]> {
		console.log(this.MODULE + '::searchHeroes | ');

		if (!term.trim()) {
			return of([]); // if not search term, return empty hero array.
		}
		return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
			tap(_ => this.log(`found heroes matching "${term}"`)),
			catchError(this.handleError<Hero[]>('searchHeroes', []))
		);
	}

	addHero(hero: Hero): Observable<Hero> {
		console.log(this.MODULE + '::addHero | ');

		return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
			tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
			catchError(this.handleError<Hero>('addHero'))
		);
	}

	deleteHero(hero: Hero | number): Observable<Hero> {
		console.log(this.MODULE + '::deleteHero | ');

		const id = typeof hero === 'number' ? hero : hero.id;
		const url = `${this.heroesUrl}/${id}`;

		return this.http.delete<Hero>(url, httpOptions).pipe(
			tap(_ => this.log(`deleted hero id=${id}`)),
			catchError(this.handleError<Hero>('deleteHero'))
		);
	}

	/** PUT: update the hero on the server */
	updateHero(hero: Hero): Observable<any> {
		console.log(this.MODULE + '::updateHero | ');

		return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
			tap(_ => this.log(`updated hero id=${hero.id}`)),
			catchError(this.handleError<any>('updateHero'))
		);
	}

	getHeroes(): Observable<Hero[]> {
		console.log(this.MODULE + '::getHeroes | url=' + this.heroesUrl);

		return this.http.get<Hero[]>(this.heroesUrl)
			.pipe(
				catchError(this.handleError('getHeroes', []))
			);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		console.log(this.MODULE + '::handleError | ');

		return (error: any): Observable<T> => {
			console.log(this.MODULE + '::handleError | error=', error);
			console.log(this.MODULE + '::handleError | error=', error.message);
		
			this.log(`${operation} failed: ${error.message}`);

			return of(result as T);
		};
	}

	private log(message: string) {
		this.messageService.add(`HeroService: ${message}`);
	}
}
