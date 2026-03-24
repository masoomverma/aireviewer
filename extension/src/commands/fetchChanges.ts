import * as vscode from 'vscode';
import { OutputPanel } from '../panels/OutputPanel';

export async function runFetchChanges(context: vscode.ExtensionContext) {
    const fetchOutput = [
        'Fetch Completed',
        '',
        'Commits:',
        '* abc123 - Fix null pointer exception',
        '* def456 - Update authentication flow',
        '* ghi789 - Refactor login module',
        '',
        'Files:',
        '',
        '* login.cpp',
        '* auth.cpp'
    ].join('\n');

    OutputPanel.render(context.extensionUri, 'Fetch Changes', fetchOutput);
}
