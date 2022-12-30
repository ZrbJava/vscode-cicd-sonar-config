/* eslint-disable @typescript-eslint/semi */
import * as vsc from 'vscode'
import * as path from 'path'

export class CicdProvider implements vsc.TreeDataProvider<CicdTreeItem> {
	getTreeItem(element: CicdTreeItem): vsc.TreeItem {
		return element
	}
	getChildren(element?: CicdTreeItem): vsc.ProviderResult<CicdTreeItem[]> {
		return [
			new CicdTreeItem(
				'启用gitlab-runner',
				'点击启用gitlab-runner',
				{
					title: '启用gitlab-runner',
					command: 'cicd-sonar-config.startGitlabRunner',
				},
				{
					light: path.resolve(__dirname, '../assets/start-light.png'),
					dark: path.resolve(__dirname, '../assets/start-dark.png'),
				}
			),
			new CicdTreeItem(
				'新建sonarquebe项目',
				'点击新建sonarquebe项目',
				{
					title: '新建sonarquebe项目',
					command: 'cicd-sonar-config.newSonarProject',
				},
				{
					light: path.resolve(__dirname, '../assets/new-light.png'),
					dark: path.resolve(__dirname, '../assets/new-dark.png'),
				}
			),
		]
	}
}

export class CicdTreeItem extends vsc.TreeItem {
	constructor(
		public readonly label: string,
		public readonly tooltip?: string,
		public readonly command?: vsc.Command,
		public readonly iconPath?: vsc.TreeItem['iconPath']
	) {
		super(label)
		this.collapsibleState = vsc.TreeItemCollapsibleState.None
		this.contextValue = 'contextValue+++'
	}
}

/**
 * 注册
 */
export function registerCicdProvider() {
	const cicdProvider = new CicdProvider()
	vsc.window.registerTreeDataProvider('cicd', cicdProvider)
}
