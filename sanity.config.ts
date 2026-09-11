import {defineConfig, defineType, defineField} from 'sanity'
import {structureTool} from 'sanity/structure'
import settings from './cms-config.json'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || settings.projectId
const dataset = process.env.SANITY_STUDIO_DATASET || settings.dataset
if (!projectId) throw new Error('Connect your Sanity project before building the blog administrator.')

export default defineConfig({
  name: 'xinxiang-blog', title: '新乡振动筛 · 博客管理', projectId, dataset, basePath: '/admin',
  plugins: [structureTool({structure: S => S.list().title('内容管理').items([
    S.listItem().title('全部文章').child(S.documentTypeList('post').title('全部文章')),
    S.listItem().title('草稿 / 未发布修改').child(S.documentList().title('草稿 / 未发布修改').filter('_type == "post" && _id in path("drafts.**")')),
  ])})],
  schema: {types: [defineType({
    name:'post', title:'博客文章', type:'document',
    fields:[
      defineField({name:'title',title:'文章标题',type:'string',validation:r=>r.required().max(160)}),
      defineField({name:'slug',title:'文章网址',description:'点击 Generate 生成英文网址；发布后建议保持不变。',type:'slug',options:{source:'title',maxLength:96},validation:r=>r.required().custom(value=>!value?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current)?true:'请使用小写英文字母、数字和连字符，例如 vibrating-screen-guide')}),
      defineField({name:'excerpt',title:'文章摘要',type:'text',rows:3,validation:r=>r.required().max(320)}),
      defineField({name:'category',title:'分类',type:'string',options:{list:['Screening Guides','Equipment','Industry Applications','Company Updates']},initialValue:'Screening Guides',validation:r=>r.required()}),
      defineField({name:'author',title:'作者',type:'string',initialValue:'Xinxiang Vibrating Sieve',validation:r=>r.required().max(100)}),
      defineField({name:'publishedAt',title:'显示日期',description:'文章只有点击 Publish 才会上线，此日期不用于定时发布。',type:'datetime',initialValue:()=>new Date().toISOString(),validation:r=>r.required()}),
      defineField({name:'cover',title:'封面图片',type:'image',options:{hotspot:true},fields:[defineField({name:'alt',title:'图片说明',type:'string',validation:r=>r.required().max(200)})]}),
      defineField({name:'body',title:'正文',type:'array',validation:r=>r.required().min(1),of:[{type:'block',styles:[{title:'正文',value:'normal'},{title:'二级标题',value:'h2'},{title:'三级标题',value:'h3'},{title:'引用',value:'blockquote'}],lists:[{title:'项目列表',value:'bullet'},{title:'编号列表',value:'number'}],marks:{decorators:[{title:'加粗',value:'strong'},{title:'斜体',value:'em'}],annotations:[{name:'link',title:'链接',type:'object',fields:[{name:'href',title:'网址',type:'url',validation:r=>r.uri({scheme:['https','http','mailto']})}]}]}},{type:'image',options:{hotspot:true},fields:[{name:'alt',title:'图片说明',type:'string',validation:r=>r.required()},{name:'caption',title:'图片标题',type:'string'}]}]}),
      defineField({name:'seoTitle',title:'搜索引擎标题（可选）',type:'string',validation:r=>r.max(160)}),
      defineField({name:'seoDescription',title:'搜索引擎摘要（可选）',type:'text',rows:2,validation:r=>r.max(320)}),
    ],preview:{select:{title:'title',subtitle:'category',media:'cover'}},orderings:[{title:'按日期排序',name:'dateDesc',by:[{field:'publishedAt',direction:'desc'}]}],
  })]},
})

