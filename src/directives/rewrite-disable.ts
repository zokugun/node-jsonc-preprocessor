import { type State, StateType } from '../types/state.js';

export function rewriteDisable(condition: boolean, input: string[], line: number, output: string[], stack: State[]): number {
	output.push(input[line]);

	if(stack[0].type === StateType.REWRITE) {
		stack.shift();
	}

	return line + 1;
}
