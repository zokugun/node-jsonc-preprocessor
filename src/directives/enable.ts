import { type State } from '../types/state.js';
import { comment } from '../utils/comment.js';
import { indent } from '../utils/indent.js';
import { skipComments } from '../utils/skip-comments.js';
import { uncomment } from '../utils/uncomment.js';

export function enable(condition: boolean, input: string[], line: number, output: string[], stack: State[]): number {
	const directive = input[line];

	output.push(input[line]);

	line = skipComments(input, line + 1, output);

	if(condition && stack[0].value) {
		line = uncomment(input, line, output, false);
	}
	else {
		line = comment(input, line, indent(directive), output);
	}

	return line;
}

enable.isConditional = true;

