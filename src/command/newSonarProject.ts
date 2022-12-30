import * as vsc from 'vscode'
import * as path from 'path'
import * as fs from 'fs'

/**
 * @descrition 打开sonarquebe创建项目
 * @param context 插件上下文
 */
export const newSonarProject = (context: vsc.ExtensionContext) => {
	let newSonarProject = vsc.commands.registerCommand(
		'cicd-sonar-config.newSonarProject',
		() => {
			vsc.env.openExternal(
				vsc.Uri.parse('https://sonarqube.leyaoyao.com/projects')
			)
		}
	)
	context.subscriptions.push(newSonarProject)
}
