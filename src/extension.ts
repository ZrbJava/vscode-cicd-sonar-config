import * as vscode from 'vscode'

import { registerHelpProvider } from './provider/help'
import { registerCicdProvider } from './provider/cicd'
import { openGitlabCiHelp } from './command/openGitlabCiHelp'
import { openSonarquebeHelp } from './command/openSonarquebeHelp'
import { generator } from './command/generator'
import { startGitlabRunner } from './command/startGitlabRunner'
import { newSonarProject } from './command/newSonarProject'
export function activate(context: vscode.ExtensionContext) {
	console.log('context', context)
	// const helpProvider = new HelpProvider()
	// vscode.window.registerTreeDataProvider('help', helpProvider)
	registerHelpProvider()
	registerCicdProvider()
	openGitlabCiHelp(context)
	openSonarquebeHelp(context)
	generator(context)
	startGitlabRunner(context)
	newSonarProject(context)
}

// This method is called when your extension is deactivated
export function deactivate() {
	console.log('🔪💣🎉cicd-sonar-config 插件关闭')
}
