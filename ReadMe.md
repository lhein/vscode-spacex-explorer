# User Story

We want to be able to browse all past and future SpaceX launches and find out where it launched, if it was a success and what payload for which country was aboard.

The SpaceX API allows access to this information: https://github.com/r-spacex/SpaceX-API

# Flow

- the user invokes the command "_Browse SpaceX Missions_"

- a list of all available SpaceX missions is displayed

- the user selects one of the available missions from the list __OR__ hits ```ESC``` to display the latest finished mission (used as shortcut)

- the mission data is displayed as web page inside VSCode

- notification is displayed in case of error / success of the operation


# Hints

- install node-fetch via "_npm add node-fetch_" because its required by ```utils.ts```

- install fs via "_npm add fs_" because its required by ```utils.ts```

- use the "_Problems_" view at the bottom to find possible issues

- get the ```utils.ts``` file from the git repository https://github.com/lhein/vscode-spacex-explorer and copy it next to your ```extension.ts``` file

- ```utils.ts``` contains some useful helper functions to solve the above tasks

- import ```utils.ts``` via "_import * as utils from './utils';_"

- you can access functions of the ```utils.ts``` file via "_utils.functionName_"

- ```utils.ts``` contains some datastructures (_interfaces_) needed to work with the json results of the api calls

- to show a drop down list to the user VSCode provides _vscode.window.showQuickPick()_ function (see https://code.visualstudio.com/api/references/vscode-api#window)

- to show a notification to the user you can choose from different methods named "_show___Message()_" (see https://code.visualstudio.com/api/references/vscode-api#window)

- if you want to combine variable values and strings you can use the following notation to prevent concatenating with ```+``` char

		let myString = `someString ${someVariable} someString`;
	instead of 

		let myString = 'someString' + someVAriable + 'someString';

# Example QuickPick
showQuickPick returns a ```Thenable``` object which needs handling with a ```.then()```. See below example code:

	vscode.window.showQuickPick( someArrayOfString )
		.then( ( selectedItem ) => {
			// your logic goes here - the selected item is stored in "selectedItem"
		});
