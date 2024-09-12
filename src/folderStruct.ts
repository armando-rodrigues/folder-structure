import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { error } from 'console';


function unMaskFile(extension: vscode.ExtensionContext, file:string, _frFolder:string):string {
	var step:string = `unMaskFile`;
	try {
        step = `resourceFile`;
        const resourceFile = vscode.Uri.file(extension.asAbsolutePath(file));
        step = `inputText`;
        const inputText = fs.readFileSync(resourceFile.fsPath, 'utf-8');
        step = `outputText`;
        const outputText = inputText
        .replaceAll('{{frFolder}}', _frFolder);
        return outputText;
	} catch (e) {
        vscode.window.showErrorMessage(`Error on unmasking file (${step}): ${e}`);
        throw error(e);
	}
}

export async function createStructure(context: vscode.ExtensionContext, uri: vscode.Uri, outputChannel: vscode.OutputChannel) {
    // Check if a folder was selected
    if (!uri || !uri.fsPath) {
        vscode.window.showErrorMessage('Please right-click a folder in the Explorer view.');
        return;
    }
    const rootPath = uri.fsPath; // Get the selected folder's path
	const fileMinimum:string = `resources/minimum.txt`;
    const fileDeploy:string = `resources/deploy.txt`;

    let frFolderIn = await vscode.window.showInputBox({
        prompt: 'FR a criar ?',
        value: 'FR-#####'
    });
    
    if (frFolderIn === undefined) {
        await vscode.window.showErrorMessage('Please parse a valid FR code.');
        return;
    }
    let frFolder = String(frFolderIn).toUpperCase();
    if (frFolder.substring(0,3) !== 'FR-') {
        frFolder = `FR-${frFolder}`;
    }
    if (isNaN(Number(frFolder.substring(3)))) {
        await vscode.window.showErrorMessage(`FR code is not a number (${frFolder.substring(3)})`);
        await vscode.window.showErrorMessage('Please parse a valid FR code.');
        return;
    }

    await vscode.window.showInformationMessage(`Do you want to create the ${frFolder} folder structure here?`, 'Yes', 'No')
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
}
