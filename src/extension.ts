// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { error } from 'console';
import { arquiveFolder } from './folderComands';
import { createStructure } from './folderStruct';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "folder-structure" is now active!');
    const outputChannel = vscode.window.createOutputChannel(`My extension Logs`);
    outputChannel.show();

    let disp1 = vscode.commands.registerCommand('extension.arquiveFolder', async (uri: vscode.Uri) => {
		arquiveFolder(context, uri, outputChannel);
	});

    let disp2 = vscode.commands.registerCommand('extension.createStructure', async (uri: vscode.Uri) => {
		createStructure(context, uri, outputChannel);
	});
  
	context.subscriptions.push(outputChannel);
	context.subscriptions.push(disp1);
	context.subscriptions.push(disp2);
}

// This method is called when your extension is deactivated
export function deactivate() {}
