import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        text?: string | undefined;
        textClass?: string | undefined;
        textLink?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type HighlighterProps = typeof __propDef.props;
export type HighlighterEvents = typeof __propDef.events;
export type HighlighterSlots = typeof __propDef.slots;
export default class Highlighter extends SvelteComponentTyped<HighlighterProps, HighlighterEvents, HighlighterSlots> {
}
export {};
