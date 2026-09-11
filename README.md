# 多页面完整版 — 上传说明

本包共 25 个独立 HTML 页面。导航打开独立页面，产品详情不再是首页弹窗。

**解压后上传全部 HTML 文件、assets 文件夹、styles.css、script.js、build.cjs、package.json、vercel.json 和 README.md 到原仓库根目录。不要上传 ZIP 本身，也不要只上传首页。**

页面清单：
- about.html
- contact.html
- conveying-feeding.html
- guide-equipment-selection.html
- guide-project-checklist.html
- guide-screen-mesh.html
- index.html
- industries.html
- industry-chemicals-powders.html
- industry-fine-metal-powders.html
- industry-food-ingredients.html
- industry-minerals-aggregates.html
- product-linear-vibrating-screen.html
- product-rotary-vibrating-screen.html
- product-screw-conveyor.html
- product-tumbler-screen.html
- product-ultrasonic-vibrating-screen.html
- product-vibratory-feeder.html
- products.html
- resources.html
- screening-machines.html
- solution-bulk-material-classification.html
- solution-powder-screening-line.html
- solution-screening-conveying-integration.html
- solutions.html

# Xinxiang Vibrating Sieve website

这是一个英文工业设备展示网站，适配电脑和手机。红黑白配色，含产品筛选、独立产品详情页面、行业应用、方案介绍、FAQ 和邮件询价。

## 本地查看
解压 ZIP，双击 index.html 即可查看。所有图片和样式在包内，不需要安装依赖。

## 上传到现有 GitHub 仓库
1. 打开 https://github.com/aachallenger/xinxiang-vibrating-sieve-website ，选择 main 分支。
2. **先解压 ZIP，不要把 ZIP 本身上传到仓库。**
3. 点击 Add file → Upload files，把解压后的 index.html、styles.css、script.js、assets 文件夹、package.json、build.cjs、vercel.json 和 README.md 一起拖入。
4. 确保这些文件位于仓库根目录，不要多套一层文件夹。覆盖同名文件后点击 Commit changes。
5. Vercel 已关联此仓库，通常会自动开始部署。等待新的部署状态变为 Ready。
6. 打开 https://xinxiang-vibrating-sieve-website-aachanllager.vercel.app 。

## 如果 Vercel 没有自动发布
进入项目 Deployments，选择最新提交重新部署。项目 Settings → Build and Deployment 中确认 Root Directory 为空，Framework Preset 为 Other，Build Command 为 node build.cjs，Output Directory 为 dist。vercel.json 已提供这些设置（Root Directory 除外）。若手工设置仍覆盖文件配置，关闭原来的覆盖设置。

此版本是静态网站，替换原 Next.js 首页；旧 app/ 等源文件不会参与本包的构建。package.json 不再需要 Next.js 依赖；安装命令明确跳过旧依赖安装，旧锁文件不会参与此次构建。不要只上传 index.html，配置文件必须一起上传。上传前建议下载旧仓库作为备份。

## 发布前必须核对
- 联系邮箱沿用原网站的 info@xinxiangvibratingsieve.com；未验证该邮箱可用或由你控制。如需更换，在 script.js 第一行修改 SITE_EMAIL，同时搜索替换 index.html 中的旧邮箱。
- 询价按钮会打开访客的邮件软件，**不会直接发送或储存询价**。访客需要自行点击发送；无邮件软件时可以复制内容。无需服务端或密钥。
- 设备图片为 AI 生成的概念示意图，并非真实工厂或具体型号照片。网页已有标注，建议换成你的真实产品图。替换 assets/hero.png 即可更换主视觉。
- 产品内容是一般性介绍，不承诺实际库存、认证、性能、产能或客户数量。请按实际经营情况核对六类产品后发布。
- 参考网站 https://sanyuantangcn.com/ 仅用于栏目结构灵感，未复制其品牌、联系方式、认证、客户数据或图片。

## 修改内容
index.html：品牌、首页文案、行业、FAQ、页脚。
script.js：联系邮箱、邮箱、筛选与询价行为；产品文案直接修改对应 HTML 页面。
styles.css：配色、排版及手机适配。
assets/hero.png：首页与介绍区图片。

## 构建
Node.js 20 及以上运行 npm run build，生成 dist。无需 npm install。
这是交付源码包，尚未替你上传 GitHub 或发布到 Vercel。

