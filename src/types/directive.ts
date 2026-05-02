import { type State } from './state.js';

export type Directive = {
	(condition: boolean, input: string[], line: number, output: string[], stack: State[], args: Record<string, string>): number;
	isConditional: boolean;
};
