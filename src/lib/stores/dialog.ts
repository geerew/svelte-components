import { applyActions } from '$lib/internal/actions';
import {
	defaultExpanded,
	type Expandable
} from '$lib/internal/aria-expanded';
import { setAriaModal } from '$lib/internal/aria-modal';
import { trapFocus } from '$lib/internal/focus';
import { onClickOutside } from '$lib/internal/on-click-outside';
import { onEscape } from '$lib/internal/on-escape';
import { setRoleAction } from '$lib/internal/role';
import { writable } from 'svelte/store';

interface Dialog extends Expandable {}

// Create a dialog store
//  * subscribe - Store of type Dialog
//  * modal     - Action to define the modal (use:dialog.modal)
//  * open      - Function to open the dialog
//  * close     - Function to close the dialog
export function createDialog(props?: Partial<Dialog>) {
	let state: Dialog = {
		...defaultExpanded,
		...props
	};

	let store = writable(state);

	// Open/close
	const open = () => store.set({ expanded: true });
	const close = () => store.set({ expanded: false });

	const modal = (node: HTMLElement) => {
		const destroy = applyActions(node, [
			setRoleAction('modal'),
			setAriaModal(store),
			trapFocus(store),
			onClickOutside(close),
			onEscape(close)
		]);

		return { destroy };
	};

	//const { subscribe } = derived(store, (p) => p);

	return {
		subscribe: store.subscribe,
		open,
		close,
		modal
	};
}

// Expose the return type of createDialog()
export type DialogReturn = ReturnType<typeof createDialog>;
