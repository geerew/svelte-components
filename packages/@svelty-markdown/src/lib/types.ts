import type { SvelteComponent } from 'svelte';
import type { marked } from 'marked';

export type Renderers = Record<string, typeof SvelteComponent>;

// Manually create the marked list item type, as it is
// not exported by `@types/marked`
export interface MarkedListItem {
	type: string;
	raw: string;
	task: boolean;
	checked?: boolean | undefined;
	loose: boolean;
	text: string;
	tokens: marked.Token[];
}

// Manually create the marked table cell type, as it is
// not exported by `@types/marked`
export interface MarkedTableCell {
	text: string;
	tokens: marked.Token[];
}

// Alignment options for a marked table cell
export type MarkedTableCellAlignment = 'center' | 'left' | 'right' | null;
