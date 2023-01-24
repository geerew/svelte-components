import { derived, type Readable } from 'svelte/store';
import type { Action } from './actions';
import type { Expandable } from './aria-expanded';
import { Escape } from './keys';

// Create an action, such that when the ESC key is pressed,
// a callback function will run
export const onEscape = (run: () => void): Action => {
	return () => {
		// Create a derived subscription
		// Handler
		const handler = (event: KeyboardEvent) => {
			if (event.key === Escape) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				run();
			}
		};

		// Start listening for ESC events
		document.addEventListener('keydown', handler, true);

		return () => {
			// Stop listening for ESC events
			document.removeEventListener(
				'keydown',
				handler,
				true
			);
		};
	};
};
