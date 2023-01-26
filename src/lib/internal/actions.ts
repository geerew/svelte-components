export type Unsubscribe = () => void;
export type Action = (container: HTMLElement) => Unsubscribe;

// Run a list of action callbacks on the given container
export const applyActions = (container: HTMLElement, actions: Action[]) => {
	// Add the actions
	const unsubscribes = actions.map((b) => b(container));

	// Return a function that will call each actions unsubscribe
	return () => unsubscribes.forEach((callback) => callback());
};
