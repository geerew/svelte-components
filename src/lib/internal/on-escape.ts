import { derived, type Readable } from 'svelte/store';
import type { Action } from './actions';
import { Escape, Tab } from './keys';

// Escapable interface
export interface Escapable {
	onEscapeEnabled: boolean;
}

// Default properties for Escapable
export const defaultEscapable: Escapable = {
	onEscapeEnabled: true
};

// Create an action, such that when the ESC key is pressed,
// a callback function will run
export const onEscape = (store: Readable<Escapable>, callback: () => void): Action => {
	return () => {
		// Create a new store with only the `escape`
		// value
		const { subscribe } = derived(store, ($store) => $store.onEscapeEnabled);

		// Handler
		const handler = (event: KeyboardEvent) => {
			if (event.key === Escape) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				callback();
			}
		};

		return subscribe((onEscapeEnabled) => {
			if (onEscapeEnabled) {
				// Start listening for ESC events
				document.addEventListener('keydown', handler, true);
			} else {
				// Stop listening for ESC events
				document.removeEventListener('keydown', handler, true);
			}
		});
	};
};
