import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        modal?: any;
        backdrop?: boolean | undefined;
        title?: string | undefined;
        body?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        button: {};
        backdrop: {};
        default: {};
        header: {};
        body: {};
        footer: {};
    };
};
export type ModalProps = typeof __propDef.props;
export type ModalEvents = typeof __propDef.events;
export type ModalSlots = typeof __propDef.slots;
export default class Modal extends SvelteComponentTyped<ModalProps, ModalEvents, ModalSlots> {
}
export {};
