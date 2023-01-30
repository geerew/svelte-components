import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        path: string | string[];
        pathSeparator?: string | undefined;
        capitalizeFirstLetter?: boolean | undefined;
        lastBreadcrumbClass?: string | undefined;
        divider?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        divider: {};
    };
};
export type BreadcrumbsProps = typeof __propDef.props;
export type BreadcrumbsEvents = typeof __propDef.events;
export type BreadcrumbsSlots = typeof __propDef.slots;
export default class Breadcrumbs extends SvelteComponentTyped<BreadcrumbsProps, BreadcrumbsEvents, BreadcrumbsSlots> {
}
export {};
