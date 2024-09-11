// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { error } from 'console';
import { arquiveFolder } from './folderComands';


function unMaskFile(extension: vscode.ExtensionContext, file:string, _frFolder:string):string {
	var step:string = `unMaskFile`;
	try {
	  step = `resourceFile`;
	  const resourceFile = vscode.Uri.file(extension.asAbsolutePath(file));
	  step = `inputText`;
	  const inputText = fs.readFileSync(resourceFile.fsPath, 'utf-8');
	  step = `outputText`;
	  const outputText = inputText
	  .replace('{{frFolder}}', _frFolder);
	  return outputText;
	} catch (e) {
	  vscode.window.showErrorMessage(`Error on unmasking file (${step}): ${e}`);
	  throw error(e);
	}
  }
  
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "folder-structure" is now active!');
    const outputChannel = vscode.window.createOutputChannel(`My extension Logs`);
    outputChannel.show();

	const fileMinimum:string = `src/txt/minimum.txt`;
    const fileDeploy:string = `src/txt/deploy.txt`;

    let disp1 = vscode.commands.registerCommand('foldercomands.arquiveFolder', async (uri: vscode.Uri) => {
		arquiveFolder(context, uri, outputChannel);
	});
  
    let disposable = vscode.commands.registerCommand('extension.createFolderStructure', async (uri: vscode.Uri) => {
		// Check if a folder was selected
		if (!uri || !uri.fsPath) {
			vscode.window.showErrorMessage('Please right-click a folder in the Explorer view.');
			return;
		}
		const rootPath = uri.fsPath; // Get the selected folder's path

		let frFolder = await vscode.window.showInputBox({
			prompt: 'FR a criar ?',
			value: 'FR-#####'
		});
		
		if (frFolder === undefined) {
			vscode.window.showErrorMessage('Please parse a valid FR code.');
			return;
		}
		frFolder = frFolder.toUpperCase();
		if (frFolder.substring(0,3) !== 'FR-') {
			frFolder = `FR-${frFolder}`;
		}
		if (isNaN(Number(frFolder.substring(3)))) {
			vscode.window.showErrorMessage(`FR code is not a number (${frFolder.substring(3)})`);
			vscode.window.showErrorMessage('Please parse a valid FR code.');
			return;
		}

		vscode.window.showInformationMessage(`Do you want to create the ${frFolder} folder structure here?`, 'Yes', 'No')
		.then(selection => {
			// outputChannel.show();
			if (selection === 'Yes') {
				// Folder and file creation
				// ==============================
				
				// Define the folder structure
				const folders = [
					`${frFolder}/01-IN`,
					`${frFolder}/02-DESIGN`,
					`${frFolder}/03-DEV`,
					`${frFolder}/04-TST`,
					`${frFolder}/05-DEPLOY`,
				];
				
				// Create folders if they don't exist
				folders.forEach(folder => {
					const folderPath = path.join(rootPath, folder);
					if (!fs.existsSync(folderPath)) {
						fs.mkdirSync(folderPath, { recursive: true });
						outputChannel.appendLine(`Created folder: ${folderPath}`);
					}
				});
				
				// Define default files to be created inside the folders
				const files = [
					{ name: `${frFolder}/02-DESIGN/analisys_00.sql`, content: unMaskFile(context, fileMinimum, frFolder)},
					{ name: `${frFolder}/02-DESIGN/analisys_00.txt`, content: unMaskFile(context, fileMinimum, frFolder)},
					{ name: `${frFolder}/04-TST/test_deploy_00.sql`, content: unMaskFile(context, fileMinimum, frFolder)},
					{ name: `${frFolder}/05-DEPLOY/Commit_Comments.txt`, content: unMaskFile(context, fileDeploy, frFolder)}
				];
				
				// Create default files inside the folders
				files.forEach(file => {
					const filePath = path.join(rootPath, file.name);
					if (!fs.existsSync(filePath)) {
						fs.writeFileSync(filePath, file.content);
						outputChannel.appendLine(`Created file: ${filePath}`);
					}
				});
				outputChannel.appendLine(`Folder structure for ${frFolder} was created!`);
			} else {
				outputChannel.appendLine(`Folder structure for ${frFolder} will not be created!`);
			}
		});
	
	});

	  // The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// const disposable = vscode.commands.registerCommand('folder-structure.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from Folder Structure!');
	// });

	context.subscriptions.push(outputChannel);
	context.subscriptions.push(disp1);
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
