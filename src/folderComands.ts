import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as AdmZip from 'adm-zip';
// import * as moment from 'moment';
// const dateFormat = require('dateformat');
// import * as admzip from 'adm-zip';
// import * as df from 'dateformat';

export function arquiveFolder(context: vscode.ExtensionContext, uri: vscode.Uri, outputChannel: vscode.OutputChannel) {
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
    let lastVersion = 0;
    fs.readdir(arqPath, (err, files) => {
        if (err) {
            return;
        }
        lastVersion = files.filter(file => file.startsWith(rootFile)).length;
    });
    const nextVersion:string = `${(lastVersion + 1)}`;
    const arqFile = `${rootFile}.old.${txtTime}[V ${nextVersion.padStart(3, '0')}].zip`;
    outputChannel.appendLine(`Folder to Arquive: ${rootPath}`);
    outputChannel.appendLine(`File to Arquive: ${rootFile}`);
    outputChannel.appendLine(`Arquive folder: ${arqPath}`);
    outputChannel.appendLine(`Agora Formatado: ${txtTime}`);
    outputChannel.appendLine(`Arquive: ${arqFile}`);
}
