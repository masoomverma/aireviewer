import * as vscode from 'vscode';
import { OutputPanel } from '../panels/OutputPanel';

export async function runCheckRemote(context: vscode.ExtensionContext) {
    const remoteOutput = [
        'Pull Risk Detected',
        '',
        'Files:',
        'auth.cpp',
        '',
        'Suggestion:',
        'Fix before pulling'
    ].join('\n');

    OutputPanel.render(context.extensionUri, 'Remote Intelligence', remoteOutput);
}