import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { error } from 'console';
import { Context } from 'mocha';

const defAuthor = require('os').userInfo().username.toString();
const defRepo = 'https://github.com/armando-rodrigues/folder-structure.git';

function unMaskFile(extension: vscode.ExtensionContext, file:string, _prjValues:{}):string {
	var step:string = `unMaskFile`;
	try {
        step = `resourceFile`;
        const resourceFile = vscode.Uri.file(extension.asAbsolutePath(file));
        step = `inputText`;
        const inputText = fs.readFileSync(resourceFile.fsPath, 'utf-8');
        step = `outputText`;
        let outputText = inputText;
        Object.entries(_prjValues).forEach(([key, value]) => {outputText = outputText.replaceAll(`{{${key}}}`, `${value}`);});
        return outputText;
	} catch (e) {
        vscode.window.showErrorMessage(`Error on unmasking file (${step}): ${e}`);
        throw error(e);
	}
}

export async function nodePrj(context: vscode.ExtensionContext, uri: vscode.Uri, outputChannel: vscode.OutputChannel) {
    // await vscode.window.showInformationMessage('Testing message', { detail: 'This is a simple NodeJS Project', modal: true }, ...['OK']).then((item) => {if (item !== undefined) outputChannel.appendLine(item.toString());});
    // Check if a folder was selected
    if (!uri || !uri.fsPath) {
        vscode.window.showErrorMessage('Please right-click a folder in the Explorer view.');
        return;
    }
    const rootPath = uri.fsPath; // Get the selected folder's path
	const resourceFolder:string = path.join('resources', 'txt', 'nodeprj');

    // Project Id
    let prjId = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        prompt: 'Project id ?',
        value: 'project-name'
    });
    if (prjId === undefined) {
        outputChannel.appendLine('Please parse a valid project id.');
        await vscode.window.showErrorMessage('Please parse a valid project id.');
        return;
    }
    prjId = String(prjId).toLowerCase();
    let prjFolder = prjId;
    // Project Name
    let prjName = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        prompt: 'Project Name ?',
        value: ''
    });
    if (prjName === undefined) {
        prjName = prjId.replace('-', ' ').replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();});
        outputChannel.appendLine(`No valid project name was parsed. It will be used: ${prjName}`);
    }
    if (prjName === '') {
        prjName = prjId.replace('-', ' ').replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();});
        outputChannel.appendLine(`No valid project name was parsed. It will be used: ${prjName}`);
    }
    // Project Description
    let prjDesc = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        prompt: 'Project Description ?',
        value: ''
    });
    if (prjDesc === undefined) {
        prjDesc = prjName;
        outputChannel.appendLine(`No valid project description was parsed. It will be used: ${prjDesc}`);
    }
    if (prjDesc === '') {
        prjDesc = prjName;
        outputChannel.appendLine(`No valid project description was parsed. It will be used: ${prjDesc}`);
    }
    // Project Author
    const defAuthor = require('os').userInfo().username.toString();
    let prjAuth = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        prompt: 'Project Author Name ?',
        value: defAuthor
    });
    if (prjAuth === undefined) {
        prjAuth = defAuthor;
        outputChannel.appendLine(`No valid project author. Current OS username will be used: ${prjAuth}`);
        // return;
    }
    // Git Repository
    let gitRep = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        prompt: 'Git Repository ?',
        value: defRepo
    });
    if (gitRep === undefined) {
        gitRep = defRepo;
        outputChannel.appendLine(`No valid git repository. Default will be used: ${gitRep}`);
    }
    // Create folders if they don't exist
    const prjPath = path.join(rootPath, prjFolder);
    if (!fs.existsSync(prjPath)) {
        fs.mkdirSync(prjPath, {recursive: true});
        outputChannel.appendLine(`Created NodeJS folder ${prjPath}`);
    }
    // Define default files to be created inside the folders
    const prjValues = {
        prjId: prjId,
        prjName: prjName,
        prjDesc: prjDesc,
        prjAuth: prjAuth,
        gitRepo: gitRep
    };
    let source = ['main.txt', 'package.txt', 'README.txt', 'gitignore.txt'];
    const target = ['main.js', 'package.json', 'README.md', '.gitignore'];
    source.forEach((item) => {source.splice(source.indexOf(item), 1, path.join(resourceFolder, item));});
    let files = [];
    for (let i=0; i<source.length; i++) {
        let tmpObj = { name: target[i], content: unMaskFile(context, source[i], prjValues)};
        files.push(tmpObj);
    }

    // Create default files inside the folders
    files.forEach(file => {
        const filePath = path.join(rootPath, prjFolder, file.name);
        fs.writeFileSync(filePath, file.content);
        outputChannel.appendLine(`Created file: ${filePath}`);
    });
    outputChannel.appendLine(`NodeJS project ${prjFolder} was created!`);
}

export async function simpleDesktopPrj(context: vscode.ExtensionContext, uri: vscode.Uri, outputChannel: vscode.OutputChannel) {
    // await vscode.window.showInformationMessage('Testing message', { detail: 'This is a Simple Desktop Project', modal: true }, ...['OK']).then((item) => {if (item !== undefined) outputChannel.appendLine(item.toString());});
    // Check if a folder was selected
    if (!uri || !uri.fsPath) {
        vscode.window.showErrorMessage('Please right-click a folder in the Explorer view.');
        return;
    }
    const rootPath = uri.fsPath; // Get the selected folder's path
	const resourceFolder:string = path.join('resources', 'txt', 'simpledesk');
    
    // Project Id
    let prjId = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        prompt: 'Project id ?',
        value: 'project-name'
    });
    if (prjId === undefined) {
        outputChannel.appendLine('Please parse a valid project id.');
        await vscode.window.showErrorMessage('Please parse a valid project id.');
        return;
    }
    prjId = String(prjId).toLowerCase();
    let prjFolder = prjId;
    // Project Name
    let prjName = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        prompt: 'Project Name ?',
        value: ''
    });
    if (prjName === undefined) {
        prjName = prjId.replace('-', ' ').replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();});
        outputChannel.appendLine(`No valid project name was parsed. It will be used: ${prjName}`);
    }
    if (prjName === '') {
        prjName = prjId.replace('-', ' ').replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();});
        outputChannel.appendLine(`No valid project name was parsed. It will be used: ${prjName}`);
    }
    // Project Description
    let prjDesc = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        prompt: 'Project Description ?',
        value: ''
    });
    if (prjDesc === undefined) {
        prjDesc = prjName;
        outputChannel.appendLine(`No valid project description was parsed. It will be used: ${prjDesc}`);
    }
    if (prjDesc === '') {
        prjDesc = prjName;
        outputChannel.appendLine(`No valid project description was parsed. It will be used: ${prjDesc}`);
    }
    // Project Author
    let prjAuth = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        prompt: 'Project Author Name ?',
        value: defAuthor
    });
    if (prjAuth === undefined) {
        prjAuth = defAuthor;
        outputChannel.appendLine(`No valid project author. Current OS username will be used: ${prjAuth}`);
        // return;
    }
    // Git Repository
    let gitRep = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        prompt: 'Git Repository ?',
        value: defRepo
    });
    if (gitRep === undefined) {
        gitRep = defRepo;
        outputChannel.appendLine(`No valid git repository. Default will be used: ${gitRep}`);
    }
    // Create folders if they don't exist
    const prjPath = path.join(rootPath, prjFolder);
    if (!fs.existsSync(prjPath)) {
        fs.mkdirSync(prjPath, {recursive: true});
        outputChannel.appendLine(`Created folder ${prjPath}`);
    }
    // Define default files to be created inside the folders
    const prjValues = {
        prjId: prjId,
        prjName: prjName,
        prjDesc: prjDesc,
        prjAuth: prjAuth,
        gitRepo: gitRep
    };
    let source = ['main.txt', 'package.txt', 'README.txt', 'gitignore.txt', 'preload.txt', 'renderer.txt', 'index_html.txt', 'index_css.txt', 'index_js.txt'];
    const target = ['main.js', 'package.json', 'README.md', '.gitignore', 'preload.js', 'renderer.js', 'index.html', 'index.css', 'index.js'];
    source.forEach((item) => {source.splice(source.indexOf(item), 1, path.join(resourceFolder, item));});
    let files = [];
    for (let i=0; i<source.length; i++) {
        let tmpObj = { name: target[i], content: unMaskFile(context, source[i], prjValues)};
        files.push(tmpObj);
    }

    // Create default files inside the folders
    files.forEach(file => {
        const filePath = path.join(rootPath, prjFolder, file.name);
        fs.writeFileSync(filePath, file.content);
        outputChannel.appendLine(`Created file: ${filePath}`);
    });
    outputChannel.appendLine(`Simple Desktop project ${prjFolder} was created!`);
}

export async function desktopPrj(context: vscode.ExtensionContext, uri: vscode.Uri, outputChannel: vscode.OutputChannel) {
    // await vscode.window.showInformationMessage('Testing message', { detail: 'This is a Desktop Project', modal: true }, ...['OK']).then((item) => {if (item !== undefined) outputChannel.appendLine(item.toString());});
    // Check if a folder was selected
    if (!uri || !uri.fsPath) {
        vscode.window.showErrorMessage('Please right-click a folder in the Explorer view.');
        return;
    }
    const rootPath = uri.fsPath; // Get the selected folder's path
	const resourceFolder:string = path.join('resources', 'txt', 'deskprj');

    // Project Id
    let prjId = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        prompt: 'Project id ?',
        value: 'project-name'
    });
    if (prjId === undefined) {
        outputChannel.appendLine('Please parse a valid project id.');
        await vscode.window.showErrorMessage('Please parse a valid project id.');
        return;
    }
    prjId = String(prjId).toLowerCase();
    let prjFolder = prjId;
    // Project Name
    let prjName = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        prompt: 'Project Name ?',
        value: ''
    });
    if (prjName === undefined) {
        prjName = prjId.replace('-', ' ').replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();});
        outputChannel.appendLine(`No valid project name was parsed. It will be used: ${prjName}`);
    }
    if (prjName === '') {
        prjName = prjId.replace('-', ' ').replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();});
        outputChannel.appendLine(`No valid project name was parsed. It will be used: ${prjName}`);
    }
    // Project Description
    let prjDesc = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        prompt: 'Project Description ?',
        value: ''
    });
    if (prjDesc === undefined) {
        prjDesc = prjName;
        outputChannel.appendLine(`No valid project description was parsed. It will be used: ${prjDesc}`);
    }
    if (prjDesc === '') {
        prjDesc = prjName;
        outputChannel.appendLine(`No valid project description was parsed. It will be used: ${prjDesc}`);
    }
    // Project Author
    const defAuthor = require('os').userInfo().username.toString();
    let prjAuth = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        prompt: 'Project Author Name ?',
        value: defAuthor
    });
    if (prjAuth === undefined) {
        prjAuth = defAuthor;
        outputChannel.appendLine(`No valid project author. Current OS username will be used: ${prjAuth}`);
        // return;
    }
    // Git Repository
    let gitRep = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        prompt: 'Git Repository ?',
        value: defRepo
    });
    if (gitRep === undefined) {
        gitRep = defRepo;
        outputChannel.appendLine(`No valid git repository. Default will be used: ${gitRep}`);
    }
    // Create folders if they don't exist
    const prjPath = path.join(rootPath, prjFolder);
    if (!fs.existsSync(prjPath)) {
        fs.mkdirSync(prjPath, {recursive: true});
        outputChannel.appendLine(`Created folder ${prjPath}`);
    }
    // Define default files to be created inside the folders
    const prjValues = {
        prjId: prjId,
        prjName: prjName,
        prjDesc: prjDesc,
        prjAuth: prjAuth,
        gitRepo: gitRep
    };
    let source = ['main.txt', 'package.txt', 'README.txt', 'LICENSE.txt', 'gitignore.txt', 'preload.txt', 'renderer.txt', 'index_html.txt', 'index_js.txt', 'index_css.txt', 'data_structures.txt', 'default_data.txt'];
    const target = ['main.js', 'package.json', 'README.md', 'LICENSE', '.gitignore', 'preload.js', 'renderer.js', 'index.html', 'index.js', 'index.css', 'data_structures.js', 'default_data.js'];
    source.forEach((item) => {source.splice(source.indexOf(item), 1, path.join(resourceFolder, item));});
    let files = [];
    for (let i=0; i<source.length; i++) {
        let tmpObj = { name: target[i], content: unMaskFile(context, source[i], prjValues)};
        files.push(tmpObj);
    }

    // Create default files inside the folders
    files.forEach(file => {
        const filePath = path.join(rootPath, prjFolder, file.name);
        fs.writeFileSync(filePath, file.content);
        outputChannel.appendLine(`Created file: ${filePath}`);
    });

    // Copy resource image files
    // const sourceDir = path.join(resourceFolder, 'images');
    const sourceDir = path.join(context.extensionPath, 'resources', 'txt', 'deskprj', 'images');
    const targetDir = path.join(rootPath, prjFolder, 'images');
    // Assure target Dir
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    // Copy all images
    function copyImages() {
        fs.readdir(sourceDir, (err, files) => {
            if (err) {
                outputChannel.appendLine(`Error reading source directory: ${err}`);
                return;
            }
            files.forEach((file) => {
                const sourceFile = path.join(sourceDir, file);
                const targetFile = path.join(targetDir, file);
                fs.copyFile(sourceFile, targetFile, (err) => {
                    if (err) {
                        outputChannel.appendLine(`Error copying ${file}: ${err}`);
                    } else {
                        outputChannel.appendLine(`Copied ${file} to ${targetDir}`);
                    }
                });
            });
        });
    }
    copyImages();
    outputChannel.appendLine(`Desktop project ${prjFolder} was created!`);
}
