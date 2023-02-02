import type { Renderers } from '$lib';
import Blockquote from './Blockquote.svelte';
import Br from './Br.svelte';
import Code from './Code.svelte';
import CodeSpan from './CodeSpan.svelte';
import Del from './Del.svelte';
import Em from './Em.svelte';
import Heading from './Heading.svelte';
import Hr from './Hr.svelte';
import Html from './Html.svelte';
import Image from './Image.svelte';
import Link from './Link.svelte';
import List from './List.svelte';
import ListItem from './ListItem.svelte';
import Paragraph from './Paragraph.svelte';
import Strong from './Strong.svelte';
import Table from './Table.svelte';
import TableBody from './TableBody.svelte';
import TableCell from './TableCell.svelte';
import TableHeader from './TableHeader.svelte';
import TableRow from './TableRow.svelte';
import Text from './Text.svelte';

export const defaultRenderers: Renderers = {
	blockquote: Blockquote,
	br: Br,
	code: Code,
	codespan: CodeSpan,
	del: Del,
	em: Em,
	heading: Heading,
	hr: Hr,
	html: Html,
	image: Image,
	link: Link,
	list_item: ListItem,
	list: List,
	paragraph: Paragraph,
	strong: Strong,
	table_body: TableBody,
	table_cell: TableCell,
	table_header: TableHeader,
	table_row: TableRow,
	table: Table,
	text: Text
};
