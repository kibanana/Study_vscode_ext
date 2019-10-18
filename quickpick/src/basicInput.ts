/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window } from 'vscode';

/**
 * Shows a pick list using window.showQuickPick().
 */
export async function showQuickPickMine() {
	let cnt = 0;
	const output = await window.showQuickPick(['vanilla latte', 'ice americano', 'fruit juice'], {
		placeHolder: 'Hot, or ice?',
		onDidSelectItem: item => window.showInformationMessage(`Focus ${++cnt} : ${item}`),
	});
	window.showInformationMessage(`Got : ${output}`);
}

/**
 * Shows an input box using window.showInputBox().
 */
export async function showInputBoxMine() {
	const result = await window.showInputBox({
		value: 'woni is general to other people',
		valueSelection: [0, 4],
		placeHolder: 'For example: fedcba. But not: 123',
		validateInput: text => {
			window.showInformationMessage(`Validating: ${text}`);
			return text === 'vanilla latte' ? 'Not that!' : null;
		}
	});
	window.showInformationMessage(`Got: ${result}`);
}