import * as vscode from 'vscode';
import { OutputPanel } from '../panels/OutputPanel';

export async function runCheckPush(context: vscode.ExtensionContext) {
    const fullDetails = [
        'Push Risk Detected',
        '',
        'File:',
        'login.cpp',
        'Path:',
        'src/auth/login.cpp',
        '',
        'Commit:',
        'abc123 - Update auth logic',
        '',
        'Suggestion:',
        'Resolve conflict before pushing'
    ].join('\n');

    const commitMsg = await vscode.window.showInputBox({ prompt: 'Enter commit message' });
    if (!commitMsg) {return;}

    const branch = await vscode.window.showInputBox({ prompt: 'Enter branch name' });
    if (!branch) {return;}

    // Show suggestion and detailed output in the Editor Tab
    OutputPanel.render(context.extensionUri, 'Push Risk Analysis', fullDetails);

    // Dialog only shows error, file, and commit info
    const dialogMessage = 'Push Risk Detected\n\nFile: login.cpp\nPath: src/auth/login.cpp\nCommit: abc123\n\n(See output tab for suggestions)';

    const result = await vscode.window.showWarningMessage(
        dialogMessage,
        { modal: true },
        'Proceed Anyway' // We don't include 'Cancel' here as { modal: true } adds it.
    );

    if (result === 'Proceed Anyway') {
        vscode.window.showInformationMessage('Push successful.');
    }
}