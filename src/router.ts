import {ReactiveController, state} from '@snar/lit';
import {installRouter} from 'pwa-helpers';
import {store} from './store.js';

export enum Page {
	HOME,
	SESSION,
}

class Router extends ReactiveController {
	@state() page: Page = Page.HOME;

	navigateComplete = Promise.resolve();

	constructor() {
		super();
		installRouter(async (location) => {
			this.navigateComplete = new Promise(async (resolve) => {
				const hash = location.hash.slice(1);
				const params = new URLSearchParams(hash);
				const search = params.get('search');
				if (search) {
					store._search = search;
				}
				resolve();
			});
		});
	}
}

export const router = new Router();
