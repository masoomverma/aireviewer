import * as vscode from 'vscode';

export class OutputPanel {
    public static currentPanel: OutputPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }

    public static render(extensionUri: vscode.Uri, title: string, content: string) {
        if (OutputPanel.currentPanel) {
            OutputPanel.currentPanel._panel.title = title;
            OutputPanel.currentPanel._panel.webview.html = OutputPanel.currentPanel._getHtmlForWebview(title, content);
            OutputPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
        } else {
            const panel = vscode.window.createWebviewPanel(
                'aireviewerOutput',
                title,
                vscode.ViewColumn.One,
                { enableScripts: true }
            );

            OutputPanel.currentPanel = new OutputPanel(panel, extensionUri);
            OutputPanel.currentPanel._panel.webview.html = OutputPanel.currentPanel._getHtmlForWebview(title, content);
        }
    }

    public dispose() {
        OutputPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private _getHtmlForWebview(title: string, content: string) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
body { font-family: var(--vscode-font-family); padding: 20px; line-height: 1.5; color: var(--vscode-editor-foreground); }
h1 { font-size: 1.5em; margin-bottom: 20px; border-bottom: 1px solid var(--vscode-panel-border); padding-bottom: 10px; }
pre { white-space: pre-wrap; font-family: var(--vscode-editor-font-family); font-size: 13px; background: var(--vscode-textCodeBlock-background); padding: 10px; border-radius: 4px; }
</style>
</head>
<body>
<h1>${title}</h1>
<pre>${content}</pre>
</body>
</html>`;
    }
}
