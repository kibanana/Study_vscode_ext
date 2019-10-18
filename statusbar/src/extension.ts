import * as vscode from 'vscode';

let bellStatusBarItem: vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {

	// register a command that is invoked when the status bar
	// item is selected
	const bellCommandId = 'extension.showSelection';
	subscriptions.push(vscode.commands.registerCommand(bellCommandId, () => {
        let n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
        let str = getSelectedText(vscode.window.activeTextEditor);
        vscode.window.showInformationMessage(`${n} line(s) selected!`);
        setTimeout(() => {
            vscode.window.showInformationMessage(str);
        },2000);
	}));

	// create a new status bar item that we can now manage
	bellStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	bellStatusBarItem.command = bellCommandId;
	subscriptions.push(bellStatusBarItem);

	// register some listener that make sure the status bar 
	// item always up-to-date
	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

	// update status bar item once at start
	updateStatusBarItem();
}

function updateStatusBarItem(): void {
	let n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
	if (n > 0) {
		bellStatusBarItem.text = `$(bell~spin) ${n} line(s) selected`;
		bellStatusBarItem.show();
	} else {
		bellStatusBarItem.hide();
	}
}

function getNumberOfSelectedLines(editor: vscode.TextEditor | undefined): number {
	let lines = 0;
	if (editor) {
		lines = editor.selections.reduce((prev, curr) => prev + (curr.end.line - curr.start.line), 0);
	}
	return lines;
}

function getSelectedText(editor: vscode.TextEditor | undefined): string {
    let str = '';
    if(editor) {
        str = editor.document.getText(new vscode.Range(
            editor.selections[0].start.line,
            editor.selections[0].start.character,
            editor.selections[0].end.line, 
            editor.selections[0].end.character));
        // console.log(editor.selections);
        // console.log(editor.document.getText(new vscode.Range(
        //     editor.selections[0].start.line,
        //     editor.selections[0].start.character,
        //     editor.selections[0].end.line, 
        //     editor.selections[0].end.character)));
        // console.log(editor.selections[0].start.line);
        // console.log(editor.selections[0].start.character);
        // console.log(editor.selections[0].end.line);
        // console.log(editor.selections[0].end.character);
    }
    return str;
}