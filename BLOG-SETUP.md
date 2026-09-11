# 博客后台连接与使用

代码已准备，必须连接真实 Sanity 项目后才可上线。当前 cms-config.json 的 projectId 留空，构建会主动停止，防止发布无法登录的后台。

## 账号连接
1. 在 https://www.sanity.io/manage 创建项目 Xinxiang Blog，创建名为 production 的 public 数据集。Published 内容公开；Sanity 原生草稿需登录并有权限才能读取。图片素材不应当作保密存储。
2. 将 Project ID 告诉我。这是公开标识，不是密码；不要发送密码或 API Token。
3. 在 API → CORS origins 添加 https://xinxiang-vibrating-sieve-website-aachanllager.vercel.app 并允许 credentials，使 /admin 后台可以登录。仅添加自己的确定域名，不要使用通配符。
4. 连接后我会验证并上传 GitHub，由 Vercel 部署。无需向代码库写入管理 Token，编辑权限由 Sanity 项目成员角色控制。

## 写文章
- 进入网站 /admin，使用项目所有者的 Sanity 账号登录。
- 点击“全部文章”，新建“博客文章”，填写标题、网址、摘要、分类、作者及正文。
- 英文标题可点击 Generate 生成网址；中文标题需填写英文或拼音网址。
- 可上传封面和正文图片，填写图片说明；支持标题、加粗、斜体、列表与链接。
- 内容自动保存为草稿。观察保存状态后再关闭窗口。
- 点击 Publish 发布，网站 /blog 会显示文章，独立网址为 /blog/文章网址。
- 编辑已发布文章时，修改先保留在草稿，重新 Publish 才更新公开内容。
- 文档菜单可取消发布；删除是另一项操作，请按后台提示确认。
- 显示日期用于排序和展示，不是定时发布。

## 验证
发布前需要真实账号完成：登录、新建草稿、关闭重开、图片上传、发布、修改、再次发布、取消发布。代码检查不能替代账号连通性验证。
原 25 个企业页面保留。文章使用服务端输出，含独立标题、摘要与 canonical。文章发布无需提交 GitHub。
未擅自发布示例博客。若项目仍有 Vercel 访问保护，访客可能先看到 Vercel 登录页；这与 Sanity 编辑登录是独立设置。

