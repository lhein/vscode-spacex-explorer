"use strict";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as spaceXutils from './utils';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('spacex.browser', () => {

		// display a quickpick containing all SpaceX missions (look at the utils functions to retrieve them)
		vscode.window.showQuickPick( spaceXutils.getAllSpaceXMissions() ) 
			// once the user selected a mission
			.then( ( selectedMission ) => { console.log(selectedMission); });
				// retrieve the selected mission (look at the utils functions to retrieve it)

					// once we have the mission data (as ISpaceXLauch type)

						// make sure we got result data

							// display the web page containing the mission information (see utils functions)
							
							// after storing the data the user receives a success notification 

						// if no result

							// in case of an error he will receive an error notification

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
