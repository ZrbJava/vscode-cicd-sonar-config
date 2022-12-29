import * as vsc from 'vscode'
import * as path from 'path'
import * as fs from 'fs'

/**
 * @descrition 打开sonarquebe帮助文档
 * @param context 插件上下文
 */
export const openSonarquebeHelp = (context: vsc.ExtensionContext) => {
	// let openSonarquebeHelp = vsc.commands.registerCommand(
	// 	'cicd-sonar-config.openSonarquebeHelp',
	// 	() => {
	// 		const panel = vsc.window.createWebviewPanel(
	// 			'openSonarquebeHelp',
	// 			'sonarquebe帮助文档',
	// 			vsc.ViewColumn.One,
	// 			{
	// 				enableScripts: true, // 启用JS，默认禁用
	// 				retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
	// 			}
	// 		)
	// 		const html = fs.readFileSync(
	// 			path.resolve(context.extensionPath, './src/html/sonarquebe-help.html'),
	// 			'utf-8'
	// 		)
	// 		console.log('html', html)
	// 		panel.webview.html = html
	// 	}
	// )
	// https://sonarqube.leyaoyao.com/documentation/
	let openSonarquebeHelp = vsc.commands.registerCommand(
		'cicd-sonar-config.openSonarquebeHelp',
		() => {
			vsc.env.openExternal(
				vsc.Uri.parse('https://sonarqube.leyaoyao.com/documentation')
			)
		}
	)
	context.subscriptions.push(openSonarquebeHelp)
}
