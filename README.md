# AiReviewer

AiReviewer is an AI-powered code intelligence and root cause analysis tool designed to enhance your development workflow directly from VS Code. It provides real-time intelligent analysis of errors, source control operations, and codebase health.

The project is structured into two main components:
1. **VS Code Extension** (`extension/`): Provides the user interface, custom commands, and editor integrations.
2. **Node.js Backend Server** (`backend/`): Handles AI interactions, complex Git operations, and GitHub API interactions.

## Features Currently Developed

### 1. AI-Powered Analysis
- **Analyze Error**: Send code snippets or terminal errors to the AI for analysis and get insights into root causes and potential fixes.
- **Interactive Chat Interface**: A built-in Webview panel and Sidebar provider for interacting with the AI Reviewer.

### 2. Intelligent Git & Source Control Operations
- **Check Push Safety**: Evaluates local commits against the remote before you push, identifying potential conflicts or bad patterns.
- **Check Remote Changes**: Analyzes remote branches and commits directly inside the editor.
- **Fetch & Pull Changes**: Custom wrapper around Git fetch/pull commands with intelligent pre-flight checks.

### 3. Monitoring & Reporting
- **View Reports**: Review logged analysis results, error history, and scanned commits directly in the editor.
- **Status Bar Integration**: Constant monitoring visibility with a visual `$(eye) AiReviewer Ready` indicator.
- **Local Analytics Backend**: The local Express server tracks errors, history, and commits to persistent JSON logs (`errors.json`, `commits.json`, `history.json`).

## Project Structure

```text
aireviewer/
├── backend/                   # Express.js backend for heavy lifting & AI requests
│   ├── controllers/           # Route logic (analyze, GitHub, remote, reports)
│   ├── routes/                # API route definitions
│   ├── services/              # Integrations (aiService, gitService, githubService)
│   ├── logs/                  # Local JSON data stores for reports and history
│   └── server.js              # Entry point (runs on port 3000)
│
└── extension/                 # VS Code Extension frontend
    ├── src/
    │   ├── commands/          # Implementations for editor commands
    │   ├── panels/            # Webview UI and Sidebar Chat implementation
    │   ├── services/          # API Client to communicate with backend
    │   ├── utils/             # Local logging and utilities
    │   └── extension.ts       # Extension activation module
    └── package.json           # Extension manifest (defines commands & views)
```

## Getting Started

### Running the Backend Server
```bash
cd backend
npm install
node server.js
```
*The server will start on `http://localhost:3000`.*

### Running the VS Code Extension
1. Open the `/extension` directory in VS Code.
2. Run `npm install` to install extension dependencies.
3. Press `F5` to open a new Extension Development Host window.
4. Interact with the extension through the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`), typing `AiReviewer:`.

## Available Commands

- `AiReviewer: Analyze Error` (`aireviewer.analyzeError`)
- `AiReviewer: View Reports` (`aireviewer.viewReports`)
- `AiReviewer: Check Remote Changes` (`aireviewer.checkRemote`)
- `AiReviewer: Check Push Safety` (`aireviewer.checkPush`)
- `AiReviewer: Fetch Changes` (`aireviewer.fetchChanges`)
- `AiReviewer: Pull Changes` (`aireviewer.pullChanges`)

## Development

- **Extension**: Built with TypeScript and the standard VS Code Extension API.
- **Backend**: Built with Node.js and Express. It uses different services to interface with the local git repository and AI language models.
