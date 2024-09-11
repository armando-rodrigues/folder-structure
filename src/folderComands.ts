import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
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
    // const curTime = new dayjs();
    // const txtTime = curTime.format();
    // const arqFile = `${rootFile}.old.${moment}`;
    // outputChannel.show();
    outputChannel.appendLine(`Folder to Arquive: ${rootPath}`);
    outputChannel.appendLine(`File to Arquive: ${rootFile}`);
    outputChannel.appendLine(`Arquive folder: ${arqPath}`);
    outputChannel.appendLine(`Uma Data: ${Date.now}`);
    outputChannel.appendLine(`Uma Data Formatada: ${Date.now.toString()}`);
    outputChannel.appendLine(`Agora: ${curTime.toString()}`);
    // outputChannel.appendLine(`Agora: ${curTime.form()}`);
}
