import { type State } from '../types/state.js';
import { matchEndOfValue } from '../utils/match-end-of-value.js';
import { skipComments } from '../utils/skip-comments.js';

export function ignore(_condition: boolean, input: string[], line: number, _output: string[], _stack: State[]): number {
	line = skipComments(input, line + 1, []);

	const endOfValue = matchEndOfValue(input, line);

	return endOfValue + 1;
}
