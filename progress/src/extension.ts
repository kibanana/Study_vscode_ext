// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('extension.viewProgress', () => {
		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: "Progress Bar is Viewed!",
			cancellable: true
		}, (progress, token) => {
			token.onCancellationRequested(() => {
				console.log("It is impossible!");
			});

			progress.report({increment:0});
			
			setTimeout(() => {
				progress.report({increment: 10, message: '10%'});
			}, 1000);

			setTimeout(() => {
				progress.report({increment: 56, message: '56%'});
			}, 2000);

			setTimeout(() => {
				progress.report({increment: 100, message: '100%'});
			}, 3000);

			let p = new Promise(resolve => {
				setTimeout(() => {
					resolve();
					console.log('what is resolve() ?');
				}, 10000);
			});

			return p;
			
		});
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}
