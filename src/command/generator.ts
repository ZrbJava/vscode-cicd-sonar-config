/* eslint-disable @typescript-eslint/naming-convention */

import * as vsc from 'vscode'
import * as ejs from 'ejs'
import * as fs from 'fs'
import * as path from 'path'
import { getRootPath } from '../utils'
enum IMAGES {
	'>=16.x' = 'harbor.leyaoyao.com/lyy-gz/node16-cicd:latest',
	'14.x' = 'harbor.leyaoyao.com/lyy-gz/node14-cicd:latest',
}
type NoderVersion = keyof typeof IMAGES

/**
 * @description cicd配置生成器
 * @param context 上下文
 */
export const generator = (context: vsc.ExtensionContext) => {
	let generator = vsc.commands.registerCommand(
		'cicd-sonar-config.generator',
		async () => {
			// node版本
			let nodeVersion = await vsc.window.showQuickPick(Object.keys(IMAGES), {
				title: '📝node版本? ',
				placeHolder: '请选择node版本',
			})
			if (!nodeVersion) {
				return
			}
			// // nodeVersion as string
			const image = IMAGES[nodeVersion as NoderVersion]
			console.log(`选择的基础镜像：${image}`)
			// webhook
			const webhook = await vsc.window.showInputBox({
				title: '📣webhook地址',
				placeHolder: '请输入企业微信群的webhook地址',
				prompt: '机器人地址',
				validateInput: value => {
					if (!value.length) {
						return '请输入企业微信群的webhook地址'
					}
				},
			})
			if (!webhook) {
				return
			}
			console.log('📣输入的webhook地址：', webhook)
			// 需要部署的服务器目录
			const deploy = await vsc.window.showInputBox({
				title: '📂服务器目录',
				placeHolder: '请输入服务器目录',
				prompt:
					'只需要填写如右边xxx部分：/usr/local/nginx/xxx。上传多处则通过"|"符号分割 如：operational-report|asset/operational-report',
				validateInput: value => {
					if (!value.length) {
						return '请输入服务器目录'
					}
				},
			})
			console.log(`输入的服务器目录：${deploy}`)
			if (!deploy) {
				return
			}
			// 是否启动sonar检测
			const isEnableSonar = await vsc.window.showQuickPick(['是', '否'], {
				title: '🔫是否启用sonar代码检测？ ',
				placeHolder: '请选择是否启用sonar代码检测 ',
			})
			if (isEnableSonar === '是') {
				const sonarProjectKey = await vsc.window.showInputBox({
					title: '📂sonarProjectKey',
					placeHolder: '请输入📂sonarProjectKey',
					prompt: 'sonar项目key,创建sonar项目输入的名称则为projectKey',
					validateInput: value => {
						if (!value.length) {
							return '请输入sonarProjectKey'
						}
					},
				})
				const sonarToken = await vsc.window.showInputBox({
					title: '📂sonarToken',
					placeHolder: '请输入sonarToken',
					prompt: 'sonar项目创建成功后会生成一个token，复制粘贴过来即可',
					validateInput: value => {
						if (!value.length) {
							return '请输入sonarToken'
						}
					},
				})
				generatorConfig(context, {
					image,
					webhook,
					deploy: deploy.split('|'),
					isEnableSonar: true,
					sonarProjectKey,
					sonarToken,
				})
			} else {
				generatorConfig(context, {
					image,
					webhook,
					deploy: deploy.split('|'),
					isEnableSonar: false,
				})
			}
		}
	)
	context.subscriptions.push(generator)
}

interface IConfig {
	/**
	 * 镜像版本
	 */
	image: string
	/**
	 * 机器人地址
	 */
	webhook: string
	/**
	 * dist的发布目录
	 */
	deploy: string[]
	/**
	 * 是否启用sonar检测
	 */
	isEnableSonar?: boolean
	/**
	 * sonar项目key,创建sonar项目输入的名称则为projectKey
	 */
	sonarProjectKey?: string
	/**
	 * sonar token
	 */
	sonarToken?: string
}

/**
 *
 * @param context 插件上下文
 * @param config 配置参数
 */
async function generatorConfig(context: vsc.ExtensionContext, config: IConfig) {
	const gitlabCiTemplate = fs.readFileSync(
		path.resolve(context.extensionPath, './template/gitlab-ci.ejs'),
		'utf-8'
	)
	const gitlabCiConfigContent = ejs.render(gitlabCiTemplate, config)
	console.log('configContent', gitlabCiConfigContent)

	const rootPath = getRootPath()
	if (rootPath) {
		await fs.writeFileSync(
			path.join(rootPath, '.gitlab-ci.yml'),
			gitlabCiConfigContent
		)

		if (config.isEnableSonar) {
			const sonarTemplate = fs.readFileSync(
				path.resolve(
					context.extensionPath,
					'./template/sonar-project.properties.ejs'
				),
				'utf-8'
			)
			const sonarconfigContent = ejs.render(sonarTemplate, config)
			await fs.writeFileSync(
				path.join(rootPath, 'sonar-project.properties'),
				sonarconfigContent
			)
		}
		vsc.window.showInformationMessage(
			'恭喜您！配置文件已成功！请前往项目根目录查看'
		)
	} else {
		vsc.window.showErrorMessage('请在项目工程下执行该操作！')
	}
}
