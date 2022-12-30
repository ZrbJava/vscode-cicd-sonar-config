/* eslint-disable @typescript-eslint/naming-convention */

import * as vsc from 'vscode'
import * as ejs from 'ejs'
import * as fs from 'fs'
import * as path from 'path'
import { getRootPath } from '../utils'

/**
 * @description 启用gitlab-runner
 * @param context 上下文
 */
export const startGitlabRunner = (context: vsc.ExtensionContext) => {
	let startGitlabRunner = vsc.commands.registerCommand(
		'cicd-sonar-config.startGitlabRunner',
		() => {
			vsc.window.showInformationMessage('请前往对应项目仓库启用gitlab-runner')
		}
	)
	context.subscriptions.push(startGitlabRunner)
}
