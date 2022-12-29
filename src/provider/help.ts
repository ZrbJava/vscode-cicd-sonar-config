/* eslint-disable @typescript-eslint/semi */
import * as vsc from 'vscode'
import * as path from 'path'

export class HelpProvider implements vsc.TreeDataProvider<HelpTreeItem> {
	getTreeItem(element: HelpTreeItem): vsc.TreeItem {
		return element
	}
	getChildren(element?: HelpTreeItem): vsc.ProviderResult<HelpTreeItem[]> {
		return [
			new HelpTreeItem('gitlab-ci帮助文档', vsc.TreeItemCollapsibleState.None, {
				title: '打开gitlab-ci帮助文档',
				command: 'cicd-sonar-config.openGitlabCiHelp',
			}),
			new HelpTreeItem(
				'sonarquebe帮助文档',
				vsc.TreeItemCollapsibleState.None,
				{
					title: 'sonarquebe帮助文档',
					command: 'cicd-sonar-config.openSonarquebeHelp',
				}
			),
		]
	}
}

export class HelpTreeItem extends vsc.TreeItem {
	constructor(
		public readonly label: string,
		public readonly collapsibleState: vsc.TreeItemCollapsibleState,
		public readonly command?: vsc.Command
	) {
		super(label, collapsibleState)
		this.tooltip = '点击查看详情'
		// this.description = '>>>查看'
		this.iconPath = {
			light: path.resolve(__dirname, '../assets/help.png'),
			dark: path.resolve(__dirname, '../assets/help.png'),
		}
		this.contextValue = 'contextValue+++'
	}
}

// export class Dependency extends vsc.TreeItem {
// 	constructor(
// 		public readonly label: string,
// 		private readonly version: string,
// 		public readonly collapsibleState: vsc.TreeItemCollapsibleState,
// 		public readonly command?: vsc.Command
// 	) {
// 		super(label, collapsibleState)

// 		this.tooltip = `${this.label}-${this.version}`
// 		this.description = this.version
// 	}

// 	iconPath = {
// 		light: path.join(
// 			__filename,
// 			'..',
// 			'..',
// 			'resources',
// 			'light',
// 			'dependency.svg'
// 		),
// 		dark: path.join(
// 			__filename,
// 			'..',
// 			'..',
// 			'resources',
// 			'dark',
// 			'dependency.svg'
// 		),
// 	}

// 	contextValue = 'dependency'
// }
