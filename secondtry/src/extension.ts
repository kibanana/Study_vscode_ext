import { ExtensionContext, commands, StatusBarItem, StatusBarAlignment, window, TextDocument } from "vscode";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "secondTry" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	let wordCounter = new WordCounter();
	let disposable = commands.registerCommand('extension.CountThem', () => {
		wordCounter.updateWordCount();
	});

	context.subscriptions.push(wordCounter);
	context.subscriptions.push(disposable);

}

class WordCounter {
	private _statusBarItem: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);

	public updateWordCount() {
		let editor = window.activeTextEditor;
		if(!editor) {
			this._statusBarItem.hide();
			return;
		}

		let doc = editor.document;
		if(doc.languageId === 'markdown') {
			let wordCount = this.getWordCount(doc);

			this._statusBarItem.text = wordCount !== 1 ? `That's length : ${wordCount}` : 'It\'s length is 1';
			this._statusBarItem.show();
		} else {
			this._statusBarItem.hide();
		}
	}

	public getWordCount(doc: TextDocument): number {
		let docContent = doc.getText();
		docContent = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ');
        docContent = docContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

		let wordCnt  = 0;
		if(docContent !== '') {
			wordCnt = docContent.split(' ').length;
		}

		return wordCnt;
	}

	dispose() {
		this._statusBarItem.dispose() ;
	}
}



// this method is called when your extension is deactivated
export function deactivate() {}