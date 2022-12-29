import * as vscode from 'vscode'

import { HelpProvider } from './provider/help'
import { openGitlabCiHelp } from './command/openGitlabCiHelp'
import { openSonarquebeHelp } from './command/openSonarquebeHelp'
import { generator } from './command/generator'
export function activate(context: vscode.ExtensionContext) {
	console.log('context', context)
	const helpProvider = new HelpProvider()
	vscode.window.registerTreeDataProvider('help', helpProvider)
	vscode.window.setStatusBarMessage('hello!赵汝波')
	openGitlabCiHelp(context)
	openSonarquebeHelp(context)
	generator(context)
}

// This method is called when your extension is deactivated
export function deactivate() {
	console.log('🔪💣🎉cicd-sonar-config 插件关闭')
}
