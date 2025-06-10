import {withController} from '@snar/lit';
import {LitElement, html} from 'lit';
import {withStyles} from 'lit-with-styles';
import {customElement} from 'lit/decorators.js';
import {store} from '../store.js';
import styles from './app-shell.css?inline';
import {googleImagesUrl, jishoUrl, mdbgUrl, weblioUrl} from '@vdegenne/links';
import {
	ICO_JISHO,
	ICO_MDBG,
	ICO_WEBLIO,
	SVG_GOOGLE_IMAGES,
} from '../assets/assets.js';
import {copyToClipboard} from '../utils.js';
import {playJapanese} from '@vdegenne/speech';
import {ifDefined} from 'lit/directives/if-defined.js';

declare global {
	interface Window {
		app: AppShell;
	}
	interface HTMLElementTagNameMap {
		'app-shell': AppShell;
	}
}

@customElement('app-shell')
@withStyles(styles)
@withController(store)
export class AppShell extends LitElement {
	render() {
		const disabled = store.search === null;
		return html`<!-- -->
			<header></header>
			<div class="flex flex-1 justify-center items-center">
				${store._search
					? html`<span class="text-9xl jp">${store._search}</span>`
					: html`<p class="text-2xl">
							Add
							<span
								class="px-2 py-1"
								style="background-color:var(--md-sys-color-surface-container-highest);"
								>${'?search=...'}</span
							>
							if you want to search something.
						</p>`}
			</div>
			<footer class="flex justify-center items-center gap-3 m-5">
				<md-icon-button
					@click=${() => {
						playJapanese(store.search);
					}}
					?disabled=${disabled}
				>
					<md-icon>volume_up</md-icon>
				</md-icon-button>
				<md-icon-button
					href="${ifDefined(store.search && jishoUrl(store.search))}"
					target="_blank"
					style="--md-icon-button-icon-size:20px"
					?disabled=${disabled}
				>
					<md-icon><img src=${ICO_JISHO} /></md-icon>
				</md-icon-button>
				<md-icon-button
					href="${ifDefined(store.search && googleImagesUrl(store.search))}"
					target="_blank"
					?disabled=${disabled}
				>
					<md-icon>${SVG_GOOGLE_IMAGES}</md-icon>
				</md-icon-button>
				<md-icon-button
					href="${ifDefined(store.search && weblioUrl(store.search))}"
					target="_blank"
					style="--md-icon-button-icon-size:20px"
					?disabled=${disabled}
				>
					<md-icon><img src="${ICO_WEBLIO}" /></md-icon>
				</md-icon-button>
				<md-icon-button
					href="${ifDefined(store.search && mdbgUrl(store.search))}"
					target="_blank"
					style="--md-icon-button-icon-size:20px"
					?disabled=${disabled}
				>
					<md-icon><img src="${ICO_MDBG}" /></md-icon>
				</md-icon-button>
				<md-icon-button
					@click=${() => copyToClipboard(store.search)}
					?disabled=${disabled}
				>
					<md-icon>content_copy</md-icon>
				</md-icon-button>
			</footer>
			<!-- -->`;
	}

	// @confirm()
	// private _logout() {
	// 	authManager.logout();
	// }

	async connectedCallback() {
		super.connectedCallback();
		if (!this.hasUpdated) {
			await this.updateComplete;
		}
		shell.loading = false;
	}
}

export const app = (window.app = new AppShell());
