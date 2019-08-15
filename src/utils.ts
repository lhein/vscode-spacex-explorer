"use strict";

import * as vscode from 'vscode';

const fetch = require('node-fetch');

export const ID_NAME_SEPARATOR = ' - ';

export const SPACEX_ENDPOINT = 'https://api.spacexdata.com/v3/launches';

export interface IPayload {
	payload_id: string;
	customers: string[];
	nationality: string;
	manufacturer: string;
	payload_type: string;
	payload_mass_kg: number;
	payload_mass_lbs: number;
}

export interface IStage {
	payloads: IPayload[];
}

export interface IRocket {
	rocket_id: string;
	rocket_name: string;
	rocket_type: string;
	second_stage: IStage;
}

export interface ILaunchSite {
	site_id: string;
	site_name: string;
	site_name_long: string;
}

export interface ILinks {
	mission_patch: string;
	mission_patch_small: string;
	article_link: string;
	wikipedia: string;
	video_link: string;
}

export interface ISpaceXLaunch {
	flight_number: number;
	mission_name: string;
	upcoming: boolean;
	launch_year: string;
	launch_date_local: string;
	rocket: IRocket;
	launch_site: ILaunchSite;
	launch_success: boolean;
	links: ILinks;
	details: string;
}

export function callApi<T>(url: string): Promise<T> {
	return fetch(url).then( res => res.json() as Promise<T>);
}

export function getIdFromSelection(sel: string): string {
	return sel.split(ID_NAME_SEPARATOR)[0];
}

export function getAllSpaceXMissions(): Promise<string[]> {
	return new Promise( (resolve, reject) => {
		callApi<ISpaceXLaunch[]>(SPACEX_ENDPOINT)
		.then( (launches) => {
			resolve(launches.map( (launch : ISpaceXLaunch) => `${launch.flight_number}${ID_NAME_SEPARATOR}${launch.mission_name}`));
		})
		.catch(error => {
			reject(error);
		});
	});
}

export function getSpaceXMission(missionItem: string | undefined): Promise<ISpaceXLaunch> {
	return new Promise( (resolve, reject) => {
		// if user selected a launch we will use the launch number, otherwise we fetch the "latest" launch
		let launchId:string = missionItem ? getIdFromSelection(missionItem) : "latest";

		callApi<ISpaceXLaunch>(`${SPACEX_ENDPOINT}/${launchId}`)
		.then( (launch) => {
			resolve(launch);
		})
		.catch(error => {
			reject(error);
		});
	});
}

export function openMissionPage(viewTitle: string, content: string): void {
	const panel = vscode.window.createWebviewPanel(
		'spaceX',
		viewTitle,
		vscode.ViewColumn.One,
		{}
	);
							
	// And set its HTML content
	panel.webview.html = content;
}

export function generateHTMLPageForLaunch(launch: ISpaceXLaunch): string {
	let statusColor = launch.launch_success ? 'green' : 'red';
	let missionResult = launch.launch_success.toString().toUpperCase();
	missionResult = missionResult === 'FAILURE' || missionResult === 'FALSE' ? 'FAILURE' : 'SUCCESS';
	let html:string = 
			`<html>
				<head>
					<title>SpaceX Launch #${launch.flight_number} - ${launch.mission_name} (${launch.launch_year})</title>
				</head>
				<body>
					<center>
						<img src="${launch.links.mission_patch_small}"/><br/><br/><br/>
						<div><b>Flight Number: </b>${launch.flight_number}</div><br/>
						<div><b>Mission Name: </b>${launch.mission_name}</div><br/>
						<div><b>Upcoming: </b>${launch.upcoming}</div><br/>
						<div><b>Launch Year: </b>${launch.launch_year}</div><br/>
						<div><b>Launch Site: </b>${launch.launch_site.site_name_long}</div><br/>
						<div><b>Local Launch Time: </b>${launch.launch_date_local}</div><br/>
						<div><b>Rocket Type: </b>${launch.rocket.rocket_name} (${launch.rocket.rocket_type}6)</div><br/>
						<div><b>Payload: </b>
							<table border=1>
								<tr>
									<th>Type</th>
									<th>Manufacturer</th>
									<th>Customers</th>
									<th>Nationality</th>
									<th>Mass (lbs / kg)</th>
								</tr>`;

	for (let payload of launch.rocket.second_stage.payloads) {
		html = html + `		
								<tr>
									<td>${payload.payload_type}</td>
									<td>${payload.manufacturer}</td>
									<td>${payload.customers}</td>
									<td>${payload.nationality}</td>
									<td>${payload.payload_mass_lbs} / ${payload.payload_mass_kg}</td>
								</tr>`;
	}

	html = html + `
							</table>
						</div><br/>
						<div><b>Launch Success: </b><font color="${statusColor}"><b>${missionResult}</b></font></div><br/>
						<div><b>Launch Details: </b><br/>${launch.details}</div<br/><br/><br/>
						<div>
							<table border=0>
								<tr>
									<th>Links:</th>
								</tr>
								<tr>
									<td><a href="${launch.links.mission_patch}">Mission Patch</a></td>
								</tr>
								<tr>
									<td><a href="${launch.links.mission_patch_small}">Mission Patch (small)</a></td>
								</tr>
								<tr>
									<td><a href="${launch.links.article_link}">Article</a></td>
								</tr>
								<tr>
									<td><a href="${launch.links.wikipedia}">Wikipedia</a></td>
								</tr>
								<tr>
									<td><a href="${launch.links.video_link}">Video</a></td>
								</tr>
						</div>
					</center>
				</body>
			</html>`;
	return html;
}
