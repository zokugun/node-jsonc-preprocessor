import { type State } from '../types/state.js';
import { comment } from '../utils/comment.js';
import { indent } from '../utils/indent.js';
import { skipComments } from '../utils/skip-comments.js';
import { uncomment } from '../utils/uncomment.js';

export function rewriteLine(_: boolean, input: string[], line: number, output: string[], stack: State[], args: Record<string, string>): number {
	const directive = input[line];

	output.push(input[line]);

	line = skipComments(input, line + 1, output);

	if(stack[0].value) {
		line = uncomment(input, line, output, true, args);
	}
	else {
		line = comment(input, line, indent(directive), output);

		if(input[line].endsWith('// #del')) {
			++line;
		}
	}

	return line;
}
