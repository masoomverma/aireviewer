import * as vscode from 'vscode';
import { OutputPanel } from '../panels/OutputPanel';

export async function runAnalyzeError(context: vscode.ExtensionContext) {
    const errorDetails = [
        'Error:',
        'login.cpp:42',
        '',
        'Cause:',
        'Commit abc123',
        '',
        'Explanation:',
        'Validation logic modified',
        '',
        'Suggestion:',
        'Add null check'
    ].join('\n');

    OutputPanel.render(context.extensionUri, 'Analyze Error', errorDetails);
}