/* eslint-disable @typescript-eslint/semi */
import * as vsc from 'vscode'
import * as path from 'path'

export class HelpProvider implements vsc.TreeDataProvider<HelpTreeItem> {
	getTreeItem(element: HelpTreeItem): vsc.TreeItem {
		return element
	}
	getChildren(element?: HelpTreeItem): vsc.ProviderResult<HelpTreeItem[]> {
		return [
			new HelpTreeItem(
				'gitlab-ci帮助文档',
				{
					title: '打开gitlab-ci帮助文档',
					command: 'cicd-sonar-config.openGitlabCiHelp',
				},
				path.resolve(__dirname, '../assets/gitlab.png')
			),
			new HelpTreeItem(
				'sonarquebe帮助文档',
				{
					title: 'sonarquebe帮助文档',
					command: 'cicd-sonar-config.openSonarquebeHelp',
				},
				path.resolve(__dirname, '../assets/sonarqube.png')
			),
		]
	}
}

export class HelpTreeItem extends vsc.TreeItem {
	constructor(
		public readonly label: string,
		public readonly command?: vsc.Command,
		public readonly iconPath?: vsc.TreeItem['iconPath']
	) {
		super(label)
		this.tooltip = '点击查看详情'
		this.collapsibleState = vsc.TreeItemCollapsibleState.None
		this.contextValue = 'contextValue+++'
	}
}
/**
 * 注册
 */
export function registerHelpProvider() {
	const helpProvider = new HelpProvider()
	vsc.window.registerTreeDataProvider('help', helpProvider)
}
