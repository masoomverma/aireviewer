import * as vscode from 'vscode';

export class DashboardPanel {
    public static currentPanel: DashboardPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        this._panel.webview.html = this._getHtmlForWebview();
    }

    public static render(extensionUri: vscode.Uri) {
        if (DashboardPanel.currentPanel) {
            DashboardPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
        } else {
            const panel = vscode.window.createWebviewPanel(
                'aiReviewerDashboard',
                'AiReviewer Dashboard',
                vscode.ViewColumn.One,
                { enableScripts: true }
            );

            DashboardPanel.currentPanel = new DashboardPanel(panel, extensionUri);
        }
    }

    public dispose() {
        DashboardPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }

    private _getHtmlForWebview(): string {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AiReviewer Dashboard</title>
    <style>
        body { font-family: var(--vscode-font-family); padding: 20px; color: var(--vscode-editor-foreground); background-color: var(--vscode-editor-background); }
        h1 { color: var(--vscode-editor-foreground); }
        .card { background-color: var(--vscode-editorWidget-background); padding: 15px; border-radius: 5px; margin-bottom: 15px; border: 1px solid var(--vscode-widget-border); }
    </style>
</head>
<body>
    <h1>AiReviewer Interface</h1>
    <div class="card">
        <h3>Overview</h3>
        <p>Welcome to AiReviewer. All intelligent insights regarding your codebase appear here.</p>
    </div>
    <div class="card">
        <h3>Recent Activity</h3>
        <ul>
            <li>No recent security vulnerabilities detected.</li>
            <li>Code style compliance at 98%.</li>
        </ul>
    </div>
</body>
</html>`;
    }
}
