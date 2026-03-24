import * as vscode from 'vscode';

export class SidebarProvider implements vscode.WebviewViewProvider {
    _view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(webviewView: vscode.WebviewView) {
        this._view = webviewView;
        webviewView.webview.options = { enableScripts: true, localResourceRoots: [this._extensionUri] };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage((message) => {
            switch (message.command) {
                case 'analyzeError':
                    vscode.commands.executeCommand('aireviewer.analyzeError');
                    break;
                case 'viewReports':
                    vscode.commands.executeCommand('aireviewer.viewReports');
                    break;
                case 'checkRemote':
                    vscode.commands.executeCommand('aireviewer.checkRemote');
                    break;
                case 'pushChanges':
                    vscode.commands.executeCommand('aireviewer.checkPush');
                    break;
                case 'fetchChanges':
                    vscode.commands.executeCommand('aireviewer.fetchChanges');
                    break;
                case 'pullChanges':
                    vscode.commands.executeCommand('aireviewer.pullChanges');
                    break;
            }
        });
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
body {
    font-family: var(--vscode-font-family);
    padding: 15px;
    color: var(--vscode-editor-foreground);
}
.section {
    margin-bottom: 24px;
}
.section-title {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--vscode-panelTitle-activeForeground);
    border-bottom: 1px solid var(--vscode-panel-border);
    padding-bottom: 5px;
    margin-bottom: 10px;
    margin-top: 0;
}
button {
    background-color: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    border: none;
    padding: 8px 12px;
    margin-bottom: 8px;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-size: 13px;
    border-radius: 2px;
    display: block;
}
button:hover {
    background-color: var(--vscode-button-hoverBackground);
}
</style>
</head>
<body>

<div class="section">
    <h3 class="section-title">Error Analysis</h3>
    <button onclick="sendCommand('analyzeError')">Analyze Error</button>
</div>

<div class="section">
    <h3 class="section-title">Reports</h3>
    <button onclick="sendCommand('viewReports')">View Reports</button>
</div>

<div class="section">
    <h3 class="section-title">Remote Intelligence</h3>
    <button onclick="sendCommand('checkRemote')">Check Remote Changes</button>
</div>

<div class="section">
    <h3 class="section-title">Git Actions</h3>
    <button onclick="sendCommand('pushChanges')">Push Changes</button>
    <button onclick="sendCommand('fetchChanges')">Fetch Changes</button>
    <button onclick="sendCommand('pullChanges')">Pull Changes</button>
</div>

<script>
    const vscode = acquireVsCodeApi();
    function sendCommand(command) {
        vscode.postMessage({ command });
    }
</script>

</body>
</html>`;
    }
}