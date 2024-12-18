# Folder Structure  

**Id**: folder-structure-afr  
**Author**: Armando Rodrigues  
**Description**: Tools for Project Folder Structure or FR Feature Folder  

VSC Extension with some tools to create or manage default feature folder structure.  
This extension creates a standard feature folder structure and initialize its default files.  
Combine other features that helps on managing project folder structures.  


## License  

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Features  

Folder Structure  

This extension is available from vscode explorer view in the context menu.  
Context menu group:  
* Create Folder Structure
* Arquive Folder/File Structure
* Save Folder/File Version
* Zip Arquive Folder/File

### Context menu Features:  

* Create Folder Structure  
- It allows to create a default folder structure for a given FR Feature. FR code must be numeric and only accept the string "FR-" before the number.  
- It creates default folder and files for the feature.  

* Arquive Folder/File Structure
- Arquives the selected folder/file in arquive folder.  
- If the arquive folder doesn't exist, it's created.  
- The arquive folder has the same parent folder of the folder to arquive.  
- The folder/file is simply moved to the arquive folder
- Similar to `Zip Arquive Folder/File` but the folder/file is arquived as it is without compressing  

* Save Folder/File Version
- Arquives the selected folder/file in a versioned zip file in arquive folder.  
- The zip arquived is versioned with an incremental number and identied with the date and time of version  
- date-time and number of version are presented in the zip name  
- If the arquive folder doesn't exist, it's created.  
- The arquive folder has the same parent folder of the folder to arquive.  
- Folder is not removed in the arquive process.  

* Zip Arquive Folder/File
- Arquives the selected folder/file in a zip file in arquive folder.  
- If the arquive folder doesn't exist, it's created.  
- The arquive folder has the same parent folder of the folder to arquive.  
- Similar to `Arquive Folder/File Structure` but the folder/file is zipped before arquive  
- After aquived, the original folder/file is removed from the origin  
- The zip file name is similar to the resulting of the option `Save Folder/File Version` but the version number os always `000`  


<!-- ![Feature Usage](images/project-folder-structure.gif) -->
![Feature Usage](https://raw.githubusercontent.com/armando-rodrigues/folder-structure/8358e25d1fbe5ba9add0fb635ad620323c940f5a/images/project-folder-structure.gif)


## Requirements  

NPM Installed  


## Extension Settings  

### Local instalation  
* `Ctrl+Shift+P` then select `Extensions: install from VSIX` then select the local file [folder-structure-afr-`version`.vsix] then enter  

### Instalation from Published  
* Assure web connection  
* Search in published extensions for "Folder Structure"  
* If possible (acording to your desire/needs), choose the `Auto Update` option  
* Press Install  


## Release Notes  
Accessible from context menu.  
Folder group helps on project folder automation.  
Works with feature nomenclature line `FR-NNNNNN`, where `NNNNN` is an integer number.  
Project group helps on nodejs project creation automation.  

### 1.2.0  
Context Menu Grops:
* Folder Group  
    * Create Folder Structure  
    * Arquive Folder/File Structure  
    * Save Folder/File Version  
    * Zip Arquive Folder/File  
* Project Group  
    * NodeJS Project  
    * Simple Desktop Project  
    * Desktop Project  

## 1.3.0 - 2024-11-06
* Completed  
    * Desktop Project [`implemented`]  

## 1.4.0 - 2024-11-30
* Improoved `Desktop Project` with tables  

## 1.4.1 - 2024-11-30
* Improoved `Desktop Project`:  
    * Main HTML structure build by app according to data structure  
    * No need to edit HTML for each table  

## 1.4.2 - 2024-12-03
* Improoved `Desktop Project`:  
    * Command buttons configurated in data structure  


## Known Issues  

### [v 1.2.0] - Solved with [v 1.3.0]
* In project group, the `Desktop Project` is available but it's not yet full implemented.  
* In future, it's expected to have here the possibility of creating a desktop project with multiple separators and tables.  
