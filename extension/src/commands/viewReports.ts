import * as vscode from 'vscode';
import { OutputPanel } from '../panels/OutputPanel';

export async function runViewReports(context: vscode.ExtensionContext) {
    const reports: vscode.QuickPickItem[] = [
        { label: 'Login Failure' },
        { label: 'API Crash' }
    ];

    const selected = await vscode.window.showQuickPick(reports, {
        placeHolder: 'Select a report to view details'
    });

    if (selected) {
        const output = [
            'Error:',
            'login.cpp:42',
            '',
            'Commit:',
            'abc123',
            '',
            'Suggestion:',
            'Add null check'
        ].join('\n');

        OutputPanel.render(context.extensionUri, `Report: ${selected.label}`, output);
    }
}