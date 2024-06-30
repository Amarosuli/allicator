import { derived, writable, type Writable } from 'svelte/store';
import { evaluate } from 'mathjs';

import type { Readable } from 'svelte/motion';
import type { CalculationTemplate } from './CostumTypes';

export class Allicator {
	formula: string;
	constanta: string | undefined;
	variable: Array<string>;
	createInput: () => {
		inputVariables: Writable<Record<string, { isDisabled: boolean; value: number }>>;
		inputStatement: Readable<string>;
		livePreview: Readable<{
			result: number;
			statement: string;
		}>;
	};
	calculate: (data: Record<string, any>) => {
		result: number;
		statement: string;
	};
	private statement: string;
	private constantaVariable: Record<string, number> | undefined;

	constructor(formula: string, constanta?: string) {
		this.formula = formula;
		this.constanta = constanta;
		this.constantaVariable = this.constanta ? Allicator.parseStringToRecord(this.constanta) : undefined;
		this.statement = this.formula;
		this.variable = this.formula.match(/[A-Za-z0-9]+/g) as Array<string>;
		this.createInput = () => {
			let dummyObject: Record<string, { isDisabled: boolean; value: number }> = {};
			this.variable.pop();
			this.variable.map((element) => {
				if (this.constantaVariable && Object.keys(this.constantaVariable).includes(element)) {
					return (dummyObject[element] = { isDisabled: true, value: this.constantaVariable[element] });
				}
				return (dummyObject[element] = { isDisabled: false, value: 0 });
			});
			let inputVariables = writable(dummyObject);
			return {
				inputVariables,
				inputStatement: derived(inputVariables, ($inputVariables) => this.calculate($inputVariables).statement),
				livePreview: derived(inputVariables, ($inputVariables) => this.calculate($inputVariables))
			};
		};
		this.calculate = (data: Record<string, { isDisabled: boolean; value: number }>) => {
			this.statement = this.formula;
			this.variable?.forEach((indicator) => {
				if (Object.keys(data).includes(indicator) && data[indicator].value !== null) {
					if (typeof data[indicator].value === 'number') this.statement = this.statement.replace(indicator, data[indicator].value.toString());
					return;
				}
			});

			let final = this.statement.replace(/=.*/, '');

			return {
				result: evaluate(final),
				statement: final
			};
		};
	}

	static parseStringToRecord(input: string): Record<string, number> {
		const regex = /(\w+)\s*=\s*([\d.]+)/g;
		const result: Record<string, number> = {};
		let match;
		while ((match = regex.exec(input)) !== null) {
			const key = match[1];
			const value = parseFloat(match[2]);
			result[key] = value;
		}

		return result;
	}
}

export const createAllicator = (calculationTemplate?: CalculationTemplate) => {
	if (!calculationTemplate) throw Error('CalculationTemplate undefined');
	if (calculationTemplate.constanta) {
		return new Allicator(calculationTemplate.formula, calculationTemplate.constanta);
	} else {
		return new Allicator(calculationTemplate.formula);
	}
};
