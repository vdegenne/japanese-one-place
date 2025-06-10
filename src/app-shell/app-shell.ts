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
		return html`<!-- -->
			<header></header>
			<div class="flex flex-1 justify-center items-center text-9xl jp">
				${store._search}
			</div>
			<footer class="flex justify-center items-center gap-3 m-5">
				<md-icon-button
					@click=${() => {
						playJapanese(store.search);
					}}
				>
					<md-icon>volume_up</md-icon>
				</md-icon-button>
				<md-icon-button
					href="${jishoUrl(store.search)}"
					target="_blank"
					style="--md-icon-button-icon-size:20px"
				>
					<md-icon><img src=${ICO_JISHO} /></md-icon>
				</md-icon-button>
				<md-icon-button href="${googleImagesUrl(store.search)}" target="_blank">
					<md-icon>${SVG_GOOGLE_IMAGES}</md-icon>
				</md-icon-button>
				<md-icon-button
					href="${weblioUrl(store.search)}"
					target="_blank"
					style="--md-icon-button-icon-size:20px"
				>
					<md-icon><img src="${ICO_WEBLIO}" /></md-icon>
				</md-icon-button>
				<md-icon-button
					href="${mdbgUrl(store.search)}"
					target="_blank"
					style="--md-icon-button-icon-size:20px"
				>
					<md-icon><img src="${ICO_MDBG}" /></md-icon>
				</md-icon-button>
				<md-icon-button @click=${() => copyToClipboard(store.search)}>
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
