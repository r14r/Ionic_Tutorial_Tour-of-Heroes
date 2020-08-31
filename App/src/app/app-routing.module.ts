import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './pages/home/home.page';
import { ListPage } from './pages/list/list.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { HeroesPage } from './pages/heroes/heroes.page';
import { HeroDetailsPage } from './pages/hero-details/hero-details.page';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardPage },
	{ path: 'details', component: HeroDetailsPage },
	{ path: 'details/:id', component: HeroDetailsPage },
	{ path: 'heroes', component: HeroesPage },
	{ path: 'home', component: HomePage },
	{ path: 'list', component: ListPage },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
	private MODULE = "AppRoutingModule";

	constructor() {
		console.log(this.MODULE + '::constructor | ');
	}
}
