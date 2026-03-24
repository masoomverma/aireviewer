import * as vscode from 'vscode';
import { OutputPanel } from '../panels/OutputPanel';

export async function runPullChanges(context: vscode.ExtensionContext) {
    const pullOutput = [
        'Pull Risk Detected',
        '',
        'Files:',
        'auth.cpp',
        '',
        'Remote Commits:',
        '* def456 - Update authentication flow',
        '* ghi789 - Refactor login module',
        '',
        'Suggestion:',
        'Fix before pulling to avoid merge conflicts in auth.cpp.'
    ].join('\n');

    // Show detailed output in editor tab
    OutputPanel.render(context.extensionUri, 'Pull Risk Analysis', pullOutput);

    // Show simpler dialog
    const dialogMessage = 'Pull Risk Detected\n\nFile: auth.cpp\nCommit: def456\n\n(See output tab for suggestions)';

    const result = await vscode.window.showWarningMessage(
        dialogMessage,
        { modal: true },
        'Proceed Pull',
        'Fetch' // Removing explicit 'Cancel' and replacing with 'Fetch'. Modal adds Cancel automatically
    );

    if (result === 'Proceed Pull') {
        vscode.window.showInformationMessage('Pull successful.');
    } else if (result === 'Fetch') {
        vscode.commands.executeCommand('aireviewer.fetchChanges');
    } else {
        vscode.window.showInformationMessage('Pull cancelled.');
    }
}
