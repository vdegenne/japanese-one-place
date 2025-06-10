import {ReactiveController, state} from '@snar/lit';
import {saveToLocalStorage} from 'snar-save-to-local-storage';
import {FormBuilder} from './forms/FormBuilder.js';

@saveToLocalStorage('japanese-one-place:store')
export class AppStore extends ReactiveController {
	@state() _search: string | null = null;

	get search() {
		const selectionObject = window.getSelection();
		const selection = selectionObject.toString();
		return selection || this._search;
	}
}

const store = new AppStore();

document.addEventListener('selectionchange', () => {
	store.requestUpdate();
});

const F = new FormBuilder(store);
export {store, F};
