import { noop } from 'svelte/internal';
import type { Action } from './actions';

export const setRoleAction =
	(role: string): Action =>
	(node) => {
		node.setAttribute('role', role);
		return noop;
	};
