import { elif } from './elif.js';
import { directive as elseDirective } from './else.js';
import { enable } from './enable.js';
import { endif } from './endif.js';
import { directive as ifDirective } from './if.js';
import { ignore } from './ignore.js';
import { rewriteDisable } from './rewrite-disable.js';
import { rewriteEnable } from './rewrite-enable.js';
import { rewriteLine } from './rewrite-line.js';

export const directives = {
	else: elseDirective,
	elif,
	enable,
	endif,
	if: ifDirective,
	ignore,
	'rewrite-disable': rewriteDisable,
	'rewrite-enable': rewriteEnable,
	'rewrite-next-line': rewriteLine,
};
