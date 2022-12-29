import * as vsc from 'vscode'

/**
 *
 * @description 获取项目根路径
 */
export const getRootPath = () => {
	return vsc.workspace.workspaceFolders &&
		vsc.workspace.workspaceFolders.length > 0
		? vsc.workspace.workspaceFolders[0].uri.fsPath
		: undefined
}
