import { noop } from 'svelte/internal';
import type { Action } from './actions';

// Set the role attribute
export const setRoleAction =
	(role: string): Action =>
	(node) => {
		node.setAttribute('role', role);
		return noop;
	};
