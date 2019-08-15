"use strict";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as utils from './utils';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('spacex.browser', () => {

		// display a quickpick containing all SpaceX missions (look at the utils functions to retrieve them)
		vscode.window.showQuickPick( utils.getAllSpaceXMissions() ) 
			// once the user selected a mission
			.then( ( selectedMission ) => {
				// retrieve the selected mission (look at the utils functions to retrieve it)
				utils.getSpaceXMission(selectedMission)
					// once we have the mission data (as ISpaceXLauch type)
					.then( ( mission:utils.ISpaceXLaunch ) => {
						// make sure we got result data
						if (mission) {
							let viewTitle = `SpaceX - ${mission.mission_name} (${mission.launch_year})`;
							let content = utils.generateHTMLPageForLaunch(mission);

							// display the web page containing the mission information (see utils functions)
							utils.openMissionPage(viewTitle, content);
							
							// after storing the data the user receives a success notification 
							vscode.window.showInformationMessage(`Retrieved all information about SpaceX launch ${selectedMission}!`);
						} else {
							// in case of an error he will receive an error notification
							vscode.window.showErrorMessage('SpaceX launch data could not be fetched!');
						}
					});
			});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
