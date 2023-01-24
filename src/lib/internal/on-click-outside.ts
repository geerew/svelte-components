import type { Action } from './actions';

// Create an action that detects when an outside click occurs
export const onClickOutside = (run: () => void): Action => {
	return (container) => {
		// Handler to detect events outside of a container
		const handler = (event: Event) => {
			if (container.contains(event.target as Node)) return;

			if (container.clientWidth) {
				event.preventDefault();
				event.stopPropagation();
				run();
			}
		};

		// Add handler
		document.documentElement.addEventListener(
			'click',
			handler,
			true
		);

		// Unsubscribe -> Remove handler
		return () =>
			document.documentElement.removeEventListener(
				'click',
				handler,
				true
			);
	};
};
