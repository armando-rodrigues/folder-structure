import * as vscode from 'vscode';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as path from 'path';
import * as AdmZip from 'adm-zip';

// Function to Arquive folder (move to Arquive folder)
// ================================================================================
export function arquiveFolder(context: vscode.ExtensionContext, uri: vscode.Uri, outputChannel: vscode.OutputChannel) {
    // Check if a folder was selected
    if (!uri || !uri.fsPath) {
        vscode.window.showErrorMessage('Please right-click a folder in the Explorer view.');
        return;
    }
    const rootPath = uri.fsPath; // Get the selected folder's path
    const rootFile = path.basename(rootPath);
    const arqPath = path.join(path.dirname(rootPath), 'Arquive');
    const arqDestPath = path.join(arqPath, rootFile);
    // Assure existence of Arquive Folder
    if (!fs.existsSync(arqPath)) {
        fs.mkdirSync(arqPath, { recursive: true });
        outputChannel.appendLine(`Created folder: ${arqPath}`);
    } else {outputChannel.appendLine(`Already existed folder: ${arqPath}`);}

    // Arquive
    fse.move(rootPath, arqDestPath, err => {
        if (err) {
            outputChannel.appendLine(`${err}`);
            return console.error(err);
        }
        outputChannel.appendLine(`File/Folder "${rootPath}" arquived to ${arqPath}`);
    });
}

// Function to Versionate (Arquive zip version) a folder
// ================================================================================
export function versionFolder(context: vscode.ExtensionContext, uri: vscode.Uri, outputChannel: vscode.OutputChannel) {
    // Check if a folder was selected
    if (!uri || !uri.fsPath) {
        vscode.window.showErrorMessage('Please right-click a folder in the Explorer view.');
        return;
    }
    const rootPath = uri.fsPath; // Get the selected folder's path
    const rootFile = path.basename(rootPath);
    const arqPath = path.join(path.dirname(rootPath), 'Arquive');
    const curTime = new Date();
    const txtTime:string = `${curTime.getFullYear().toString()}${curTime.getMonth().toString().padStart(2, '0')}${curTime.getDate().toString().padStart(2, '0')}_${curTime.getHours().toString().padStart(2, '0')}${curTime.getMinutes().toString().padStart(2, '0')}${curTime.getSeconds().toString().padStart(2, '0')}`;
    // Assure existence of Arquive Folder
    if (!fs.existsSync(arqPath)) {
        fs.mkdirSync(arqPath, { recursive: true });
        outputChannel.appendLine(`Created folder: ${arqPath}`);
    } else {outputChannel.appendLine(`Already existed folder: ${arqPath}`);}
    // Get next version number
    const files = fs.readdirSync(arqPath);
    const lastVersion = files.filter(file => file.startsWith(rootFile)).length;
    const nextVersion = (lastVersion+1);
    const arqFile = `${rootFile}.old.${txtTime}[V${nextVersion.toString().padStart(3, '0')}].zip`;
    const arqFilePath = path.join(arqPath, arqFile);

    // Function to create ZIP arquive from source folder
    function zipArquiveFolder(sourceFolder:string, outputZip:string) {
        const zipObj = new AdmZip.default();
        // Add the main folder
        const sourceMain:string = path.basename(sourceFolder);
        zipObj.addLocalFolder(sourceFolder, sourceMain);
        // Recursive AddFolder/File to Arquive
        function addFolderToZip(folderPath:string, zipPath:string) {
            fs.readdirSync(folderPath).forEach(file => {
                const filePath = path.join(folderPath, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    // If it's a directory, then add recursively its content
                    outputChannel.appendLine(`Add Folder ${filePath}`);
                    zipObj.addLocalFolder(filePath, zipPath);
                    addFolderToZip(filePath, path.join(zipPath, file));
                } else {
                    // If it's a file, then add it to the zip
                    outputChannel.appendLine(`Add File ${filePath}`);
                    zipObj.addLocalFile(filePath, zipPath);
                }
            });
        }
        outputChannel.appendLine(`Recursive folder ${sourceMain}...`);
        addFolderToZip(sourceFolder, sourceMain);
        zipObj.writeZip(outputZip);
    }
    // Function to create ZIP arquive from source file
    function zipArquiveFile(sourceFilePath:string, outputZip:string) {
        outputChannel.appendLine(`Recursive File`);
        const zipObj = new AdmZip.default();
        zipObj.addLocalFile(sourceFilePath);
        zipObj.writeZip(outputZip);
    }
    // Evaluate if source is file or folder
    const statSrc = fs.statSync(rootPath);
    if (statSrc.isDirectory()) {
        outputChannel.appendLine(`${rootPath} is a Directory`);
        zipArquiveFolder(rootPath, arqFilePath);
    } else {
        outputChannel.appendLine(`${rootPath} is a File`);
        zipArquiveFile(rootPath, arqFilePath);
    }
    outputChannel.appendLine(`File/Folder "${rootPath}" versioned to arquive ${arqFilePath}`);
}


// Function to Compress and Arquive folder (compress and move to Arquive folder)
// ================================================================================
export function zipArquive(context: vscode.ExtensionContext, uri: vscode.Uri, outputChannel: vscode.OutputChannel) {
    // Check if a folder was selected
    if (!uri || !uri.fsPath) {
        vscode.window.showErrorMessage('Please right-click a folder in the Explorer view.');
        return;
    }
    const rootPath = uri.fsPath; // Get the selected folder's path
    const rootFile = path.basename(rootPath);
    const arqPath = path.join(path.dirname(rootPath), 'Arquive');
    const curTime = new Date();
    const txtTime:string = `${curTime.getFullYear().toString()}${curTime.getMonth().toString().padStart(2, '0')}${curTime.getDate().toString().padStart(2, '0')}_${curTime.getHours().toString().padStart(2, '0')}${curTime.getMinutes().toString().padStart(2, '0')}${curTime.getSeconds().toString().padStart(2, '0')}`;
    // Assure existence of Arquive Folder
    if (!fs.existsSync(arqPath)) {
        fs.mkdirSync(arqPath, { recursive: true });
        outputChannel.appendLine(`Created folder: ${arqPath}`);
    } else {outputChannel.appendLine(`Already existed folder: ${arqPath}`);}
    // Get next version number
    // const files = fs.readdirSync(arqPath);
    // const lastVersion = files.filter(file => file.startsWith(rootFile)).length;
    // const nextVersion = (lastVersion+1);
    const arqFile = `${rootFile}.old.${txtTime}[V${''.padStart(3, '0')}].zip`;
    const arqFilePath = path.join(arqPath, arqFile);

    // Function to create ZIP arquive from source folder
    function zipArquiveFolder(sourceFolder:string, outputZip:string) {
        const zipObj = new AdmZip.default();
        // Add the main folder
        const sourceMain:string = path.basename(sourceFolder);
        zipObj.addLocalFolder(sourceFolder, sourceMain);
        // Recursive AddFolder/File to Arquive
        function addFolderToZip(folderPath:string, zipPath:string) {
            fs.readdirSync(folderPath).forEach(file => {
                const filePath = path.join(folderPath, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    // If it's a directory, then add recursively its content
                    outputChannel.appendLine(`Add Folder ${filePath}`);
                    zipObj.addLocalFolder(filePath, zipPath);
                    addFolderToZip(filePath, path.join(zipPath, file));
                } else {
                    // If it's a file, then add it to the zip
                    outputChannel.appendLine(`Add File ${filePath}`);
                    zipObj.addLocalFile(filePath, zipPath);
                }
            });
        }
        outputChannel.appendLine(`Recursive folder ${sourceMain}...`);
        addFolderToZip(sourceFolder, sourceMain);
        zipObj.writeZip(outputZip);
    }
    // Function to create ZIP arquive from source file
    function zipArquiveFile(sourceFilePath:string, outputZip:string) {
        outputChannel.appendLine(`Recursive File`);
        const zipObj = new AdmZip.default();
        zipObj.addLocalFile(sourceFilePath);
        zipObj.writeZip(outputZip);
    }
    // Evaluate if source is file or folder
    const statSrc = fs.statSync(rootPath);
    if (statSrc.isDirectory()) {
        outputChannel.appendLine(`${rootPath} is a Directory`);
        zipArquiveFolder(rootPath, arqFilePath);
    } else {
        outputChannel.appendLine(`${rootPath} is a File`);
        zipArquiveFile(rootPath, arqFilePath);
    }
    try {
        fs.rmdirSync(rootPath, {recursive: true});
    } catch (err) {
        console.log(`ERROR on deleting folder "${rootPath}" :: ${err}`);
        return;
    }
    outputChannel.appendLine(`File/Folder "${rootPath}" ziped and arquived to ${arqFilePath}`);
}
