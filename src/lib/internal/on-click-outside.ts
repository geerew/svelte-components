import { derived, type Readable } from 'svelte/store';
import type { Action } from './actions';

// Click outside interface
export interface ClickOutside {
	onClickOutsideEnabled: boolean;
}

// Default properties
export const defaultClickOutside: ClickOutside = {
	onClickOutsideEnabled: true
};

// Create an action that detects when an outside click occurs
export const onClickOutside = (store: Readable<ClickOutside>, callback: () => void): Action => {
	return (container) => {
		// Create a new store with only the `escape`
		// value
		const { subscribe } = derived(store, ($store) => $store.onClickOutsideEnabled);

		// Handler
		// Handler to detect events outside of a container
		const handler = (event: Event) => {
			if (container.contains(event.target as Node)) return;

			if (container.clientWidth) {
				event.preventDefault();
				event.stopPropagation();
				callback();
			}
		};

		return subscribe((onClickOutsideEnabled) => {
			if (onClickOutsideEnabled) {
				// Add handler
				document.documentElement.addEventListener('click', handler, true);
			} else {
				// Unsubscribe -> Remove handler

				document.documentElement.removeEventListener('click', handler, true);
			}
		});
	};
};
