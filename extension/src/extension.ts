import * as vscode from 'vscode';
import { runAnalyzeError } from './commands/analyzeError';
import { runViewReports } from './commands/viewReports';
import { runCheckRemote } from './commands/checkRemote';
import { runCheckPush } from './commands/checkPush';
import { runFetchChanges } from './commands/fetchChanges';
import { runPullChanges } from './commands/pullChanges';
import { SidebarProvider } from './panels/SidebarProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('AiReviewer extension is now active!');

    const sidebarProvider = new SidebarProvider(context.extensionUri);
    const sidebarSub = vscode.window.registerWebviewViewProvider('aireviewer.sidebar', sidebarProvider);

    const analyzeSub = vscode.commands.registerCommand('aireviewer.analyzeError', () => runAnalyzeError(context));
    const reportSub = vscode.commands.registerCommand('aireviewer.viewReports', () => runViewReports(context));
    const remoteSub = vscode.commands.registerCommand('aireviewer.checkRemote', () => runCheckRemote(context));
    const pushSub = vscode.commands.registerCommand('aireviewer.checkPush', () => runCheckPush(context));
    const fetchSub = vscode.commands.registerCommand('aireviewer.fetchChanges', () => runFetchChanges(context));
    const pullSub = vscode.commands.registerCommand('aireviewer.pullChanges', () => runPullChanges(context));

    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = '$(eye) AiReviewer Ready';
    statusBarItem.tooltip = 'AiReviewer is active and monitoring';
    statusBarItem.show();

    context.subscriptions.push(analyzeSub, reportSub, remoteSub, pushSub, fetchSub, pullSub, sidebarSub, statusBarItem);
}

export function deactivate() {}