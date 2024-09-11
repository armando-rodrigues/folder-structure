# Folder Structure  

**Id**: folder-structure  
**Author**: Armando Rodrigues  
**Description**: Tools for Project Folder Structure or FR Feature Folder  

VSC Extension with some tools to create or manage default feature folder structure.  
This extension creates a standard feature folder structure and initialize its default files.  
Combine other features that helps on managing project folder structures.  


## Features

Folder Structure  

This extension is available from vscode explorer view in the context menu.  
Context menu group:  
* Create Folder Structure
* Arquive Folder

### Context menu Features:

* Create Folder Structure  
- It allows to create a default folder structure for a given FR Feature. FR code must be numeric and only accept the string "FR-" before the number.  
- It creates default folder and files for the feature.  

* Arquive Folder  
- Arquives the selected folder in a versioned zip file in arquive folder.  
- If the arquive folder doesn't exist, it's created.  
- The arquive folder has the same parent folder of the folder to arquive.  
- Folder is not removed in the arquive process.  


![Feature Usage](./images/project-folder-structure.gif)


## Requirements

NPM Installed


## Extension Settings

* `Ctrl+Shift+P` then select file `folder-structure-0.1.0.vsix` then enter  


## Release Notes

Helps on Feature Automation  


### 1.0.0

Initial release of Project Folder Structure
