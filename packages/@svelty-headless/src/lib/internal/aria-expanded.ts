import { derived, type Readable } from 'svelte/store';
import { ariaAttributeBoolean } from './set-aria-attribute';
import type { Action } from './actions';

// Expandable interface
export interface Expandable {
	expanded: boolean;
}

// Default properties
export const defaultExpanded: Expandable = {
	expanded: false
};

const ariaExpanded = 'aria-expanded';

// Set the aria-expanded label by creating an action callback that
// when run, derives a store, calls subscribe() and returns an
// unsubscribe
export const setAriaExpanded =
	(store: Readable<Expandable>): Action =>
	(container) => {
		const { subscribe } = derived(store, ($newStore) => $newStore.expanded);

		return subscribe(ariaAttributeBoolean(ariaExpanded, container));
	};
