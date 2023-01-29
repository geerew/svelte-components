// Create a callback function for a store.subscribe(...) of
// type Subscriber<boolean>
export const ariaAttributeBoolean = (attribute: string, node: HTMLElement) => (value?: boolean) =>
	value === undefined
		? node.removeAttribute(attribute)
		: node.setAttribute(attribute, value.toString());
