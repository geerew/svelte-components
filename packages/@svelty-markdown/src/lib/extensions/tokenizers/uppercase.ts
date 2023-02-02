import type { marked } from 'marked';

export const uppercaseTokenizer: marked.TokenizerExtension = {
	name: 'uppercase',
	level: 'inline',
	start(src: string) {
		return src.indexOf('^');
	},
	tokenizer(src: string) {
		const rule = /^(\^\^?)(?=[^\s\^])([\s\S]*?[^\s\^])\1(?=[^\^]|$)/;
		const match = rule.exec(src);
		if (match) {
			return {
				type: 'uppercase',
				raw: match[0],
				text: match[2].toUpperCase(),
				tokens: this.lexer.inlineTokens(match[2].toUpperCase())
			};
		}
	}
};
