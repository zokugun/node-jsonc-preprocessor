import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { globbySync } from 'globby';
import yaml from 'yaml';
import { transform } from '../src/index.js';

describe('transform', () => {
	function prepare(file: string) {
		const name = path.basename(file).slice(0, path.basename(file).lastIndexOf('.'));
		const data = yaml.parse(fs.readFileSync(file, 'utf8')) as { input: string; output: string; types?: Record<string, string>; args?: Record<string, string> };

		it(`${name}`, () => {
			const result = transform(data.input, data.types, data.args ?? {});

			expect(result).to.eql(data.output);
		});
	}

	const files = globbySync('test/fixtures/transform/*.yml');

	for(const file of files) {
		prepare(file);
	}
});
