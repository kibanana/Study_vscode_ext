(function () {

    setInterval(() => {
        const vscode = acquireVsCodeApi();

        const oldState = vscode.getState();

        const divColor = document.getElementById('divColor');
        let color = '';

        color = '#'+Math.round(Math.random() * 0xffffff).toString(16);
        divColor.textContent = color;
        vscode.setState({ color });

        vscode.postMessage({
            command: 'alert',
            text: '🥰  color is ' + color
        });
    }, 3000);

}());