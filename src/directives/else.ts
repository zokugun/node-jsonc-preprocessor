import { type State, StateType } from '../types/state.js';

export function directive(condition: boolean, input: string[], line: number, output: string[], stack: State[]): number {
	output.push(input[line]);

	condition = true;

	for(const [i, { type, value }] of stack.entries()) {
		if(type === StateType.ELSE_IF) {
			if(value) {
				condition = false;
			}
		}
		else if(type === StateType.IF) {
			// eslint-disable-next-line unicorn/no-lonely-if
			if(value || !stack[i + 1].value) {
				condition = false;
			}
		}
	}

	stack.unshift({
		type: StateType.ELSE,
		value: condition,
		indent: stack[0].indent,
		rewrite: stack[0].rewrite,
	});

	return line + 1;
}
