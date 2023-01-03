import * as vsc from 'vscode'
import * as path from 'path'
import * as fs from 'fs'

/**
 * @descrition 打开gitlab-ci帮助文档
 * @param context 插件上下文
 */
export const openGitlabCiHelp = (context: vsc.ExtensionContext) => {
	let openGitlabCiHelp = vsc.commands.registerCommand(
		'cicd-sonar-config.openGitlabCiHelp',
		() => {
			const panel = vsc.window.createWebviewPanel(
				'openGitlabCiHelp',
				'gitlab-ci帮助文档',
				vsc.ViewColumn.One,
				{
					enableScripts: true, // 启用JS，默认禁用
					retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
				}
			)
			const html = fs.readFileSync(
				path.resolve(context.extensionPath, './html/gitlab-ci-help.html'),
				'utf-8'
			)
			console.log('html', html)
			panel.webview.html = html
		}
	)
	context.subscriptions.push(openGitlabCiHelp)
}
