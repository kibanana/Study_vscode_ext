// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {showQuickPickMine, showInputBoxMine} from './basicInput';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('samples.quickInput', async () => {
		const options: {[key: string]: (context: vscode.ExtensionContext) => Promise<void>} = {
			showQuickPickMine, showInputBoxMine
		};
		const quickPick = vscode.window.createQuickPick();
		quickPick.items = Object.keys(options).map(label => ({label}));
		quickPick.onDidChangeSelection(selection => {
			if(selection[0]) {
				options[selection[0].label](context)
				.catch(console.error);
			}
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}
