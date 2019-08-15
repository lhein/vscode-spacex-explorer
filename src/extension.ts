"use strict";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('<your command id>', () => {

		// display a quickpick containing all SpaceX missions (look at the utils functions to retrieve them)

			// once the user selected a mission

				// retrieve the selected mission (look at the utils functions to retrieve it)

					// once we have the mission data (as ISpaceXLauch type)

						// make sure we got result data

							// display the web page containing the mission information (see utils functions)

							// display a success notification

						// otherwise 

							// display an error notification

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
