// Credit:

import { derived, type Readable } from 'svelte/store';
import type { Expandable } from './aria-expanded';
import type { Action } from './actions';
import { Tab } from './keys';

// Focusable elements (from https://stackoverflow.com/a/30753870)
const focusableSelector = [
	'[contentEditable=true]',
	'[tabindex]',
	'a[href]',
	'area[href]',
	'button:not([disabled])',
	'iframe',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])'
].join(',');

// Handle 2 states:
//
//  TAB       -> When the last focusable element within the container is
// 				 selected, wrap around to the first focusable element within
//               the container
//  SHIFT+TAB -> When the first focusable element within the container is
// 				 selected, wrap around to the last focusable element within
//				 the container
const focusTrapHandler = (event: KeyboardEvent) => {
	if (event.key !== Tab) return;

	const container = event.currentTarget as HTMLElement;
	const element = event.target as HTMLElement;

	// Trap tabbing to within the container
	if (!container.contains(element)) return;

	// Find all focusable elements
	const focusable = [...container.querySelectorAll(focusableSelector)];

	const first = focusable[0] as HTMLElement;
	const last = focusable.at(-1) as HTMLElement;

	// SHIFT + TAB -> first focusable element select, so wrap around
	// to last focusable element
	if (element === first && event.shiftKey) {
		last.focus();

		if (!last.hasAttribute('tabindex')) last.setAttribute('tabindex', '0');

		event.preventDefault();
	}

	// SHIFT + TAB -> last focusable element select, so wrap around
	// to first focusable element
	if (element === last && !event.shiftKey) {
		first.focus();

		if (!first.hasAttribute('tabindex')) first.setAttribute('tabindex', '0');

		event.preventDefault();
	}
};

// Find all focusable elements within a container
export function getFocusableElements(container: HTMLElement | null = document.body) {
	if (container == null) return [];

	return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).sort(
		// Move `tabindex="0"` to the end of the list, which
		// is what the browser does
		(a, b) =>
			Math.sign((a.tabIndex || Number.MAX_SAFE_INTEGER) - (b.tabIndex || Number.MAX_SAFE_INTEGER))
	);
}

// Trap focus to within a contain by binding an event listen, so TAB
// and SHIFT + TAB move focus between first and last elements within
// a container
export const trapFocus =
	(store: Readable<Expandable>): Action =>
	(container) => {
		const { subscribe } = derived(store, ($store) => $store.expanded);

		return subscribe((expanded) => {
			if (expanded) {
				// Find the first focusable element within the
				// container
				const focusable = getFocusableElements(container);

				// Set focus on the first focusable element within
				// this container
				if (focusable) {
					requestAnimationFrame(() => {
						const next = focusable[0] as HTMLElement;

						next.focus();

						if (!next.hasAttribute('tabindex')) next.setAttribute('tabindex', '0');
					});
				}

				// Start listening for TAB events
				container.addEventListener('keydown', focusTrapHandler);
			} else {
				// Stop listening for TAB events
				container.removeEventListener('keydown', focusTrapHandler);
			}
		});
	};
