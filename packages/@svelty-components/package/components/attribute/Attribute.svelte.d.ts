import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        text?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type AttributeProps = typeof __propDef.props;
export type AttributeEvents = typeof __propDef.events;
export type AttributeSlots = typeof __propDef.slots;
export default class Attribute extends SvelteComponentTyped<AttributeProps, AttributeEvents, AttributeSlots> {
}
export {};
