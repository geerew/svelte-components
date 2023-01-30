import { applyActions } from '$lib/internal/actions';
import { defaultExpanded, type Expandable } from '$lib/internal/aria-expanded';
import { setAriaModal } from '$lib/internal/aria-modal';
import { trapFocus } from '$lib/internal/focus';
import {
	defaultClickOutside,
	onClickOutside,
	type ClickOutside
} from '$lib/internal/on-click-outside';
import { defaultEscapable, onEscape, type Escapable } from '$lib/internal/on-escape';
import { setRoleAction } from '$lib/internal/role';
import { derived, writable } from 'svelte/store';

interface Modal extends Expandable, Escapable, ClickOutside {}

// Create a modal store
//  * subscribe - Derived store of type modal
//  * action    - Action to define the modal (use:modal.action)
//  * open      - Function to open the modal
//  * close     - Function to close the modal
export function createModal(props?: Partial<Modal>) {
	let state: Modal = {
		...defaultExpanded,
		...defaultEscapable,
		...defaultClickOutside,
		...props
	};

	let store = writable(state);

	// Update state
	const set = (part: Partial<Modal>) => store.set((state = { ...state, ...part }));

	// Helper functions
	const open = () => set({ expanded: true });
	const close = () => set({ expanded: false });

	// Create a derived (readable) store, containing only `expanded`
	const { subscribe } = derived(store, ($state) => {
		return { expanded: $state.expanded };
	});

	// Apply actions to the modal (e.g. use:modal.action)
	const action = (node: HTMLElement) => {
		const destroy = applyActions(node, [
			setRoleAction('modal'),
			setAriaModal(store),
			trapFocus(store),
			onClickOutside(store, close),
			onEscape(store, close)
		]);

		return { destroy };
	};

	return {
		subscribe,
		open,
		close,
		action
	};
}

// Expose the return type of createModal()
export type ModalReturn = ReturnType<typeof createModal>;
