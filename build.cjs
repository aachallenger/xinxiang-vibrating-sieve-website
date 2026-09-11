const fs=require('node:fs');const path=require('node:path');const {spawnSync}=require('node:child_process');
const config=require('./cms-config.json');const projectId=process.env.SANITY_STUDIO_PROJECT_ID||config.projectId;
if(!/^[a-z0-9-]+$/.test(projectId)){throw new Error('Sanity project is not connected. Set cms-config.json projectId before deployment.');}
fs.mkdirSync(path.join(__dirname,'dist'),{recursive:true});
for(const f of fs.readdirSync(__dirname)){if(f.endsWith('.html')||['styles.css','script.js','blog.css','assets'].includes(f))fs.cpSync(path.join(__dirname,f),path.join(__dirname,'dist',f),{recursive:true});}
const cli=path.join(__dirname,'node_modules/sanity/bin/sanity');
const buildEnv={...process.env};
if(process.platform==='win32') buildEnv.NODE_OPTIONS=[buildEnv.NODE_OPTIONS,`--require=${path.join(__dirname,'tests','local-os-userinfo-fix.cjs')}`].filter(Boolean).join(' ');
const result=spawnSync(process.execPath,[cli,'build','dist/admin','--yes'],{cwd:__dirname,stdio:'inherit',env:buildEnv});
if(result.status!==0)process.exit(result.status||1);
console.log('Website and authenticated blog studio built successfully.');

