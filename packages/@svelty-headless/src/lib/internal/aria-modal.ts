import { derived, type Readable } from 'svelte/store';
import type { Expandable } from './aria-expanded';
import { ariaAttributeBoolean } from './set-aria-attribute';
import type { Action } from './actions';

const ariaModal = 'aria-modal';

// Set the aria-modal label by creating an action callback that
// when run, derives a store, calls subscribe() and returns an
// unsubscribe
export const setAriaModal =
	(store: Readable<Expandable>): Action =>
	(container) => {
		const { subscribe } = derived(store, ($newStore) => $newStore.expanded);

		return subscribe(ariaAttributeBoolean(ariaModal, container));
	};
