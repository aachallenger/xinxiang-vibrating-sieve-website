const settings = require('../cms-config.json');
function escape(value=''){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function safeUrl(value){try{const u=new URL(value);return ['https:','http:','mailto:'].includes(u.protocol)?u.href:'';}catch{return '';}}
function imageUrl(ref){const p=process.env.SANITY_STUDIO_PROJECT_ID||settings.projectId;const d=process.env.SANITY_STUDIO_DATASET||settings.dataset;const match=/^image-([a-zA-Z0-9]+)-(\d+x\d+)-(jpg|png|webp|gif|jpeg)$/.exec(ref||'');return match&&/^[a-z0-9-]+$/.test(p)&&/^[a-z0-9_-]+$/.test(d)?`https://cdn.sanity.io/images/${p}/${d}/${match[1]}-${match[2]}.${match[3]}?w=1400&fit=max&auto=format`:'';}
function portableText(blocks=[]){let output='',list='';function close(){if(list){output+=`</${list}>`;list='';}}
 for(const b of blocks){if(b._type==='image'){close();const url=imageUrl(b.asset?._ref);if(url)output+=`<figure><img src="${escape(url)}" alt="${escape(b.alt||'')}" loading="lazy">${b.caption?`<figcaption>${escape(b.caption)}</figcaption>`:''}</figure>`;continue;}
 if(b._type!=='block')continue;let content=(b.children||[]).filter(s=>s._type==='span').map(s=>{let text=escape(s.text).replace(/\n/g,'<br>');for(const mark of s.marks||[]){if(mark==='strong'||mark==='em')text=`<${mark}>${text}</${mark}>`;else {const def=(b.markDefs||[]).find(d=>d._key===mark&&d._type==='link');const url=safeUrl(def?.href);if(url)text=`<a href="${escape(url)}" rel="noopener noreferrer">${text}</a>`;}}return text;}).join('');
 if(b.listItem){const type=b.listItem==='number'?'ol':'ul';if(list!==type){close();output+=`<${type}>`;list=type;}output+=`<li>${content}</li>`;}else{close();const tag=['h2','h3','blockquote'].includes(b.style)?b.style:'p';output+=`<${tag}>${content}</${tag}>`;}}
 close();return output;}
const projection='{_id,title,"slug":slug.current,excerpt,category,author,publishedAt,cover,body,seoTitle,seoDescription}';
async function query(slug,offset=0){const projectId=process.env.SANITY_STUDIO_PROJECT_ID||settings.projectId;const dataset=process.env.SANITY_STUDIO_DATASET||settings.dataset;if(!/^[a-z0-9-]+$/.test(projectId)||!/^[a-z0-9_-]+$/.test(dataset))throw new Error('CMS_NOT_CONFIGURED');
 const filter='_type == "post" && !(_id in path("drafts.**")) && !(_id in path("versions.**")) && defined(slug.current)';
 const groq=slug?`*[${filter} && slug.current == $slug][0]${projection}`:`{"posts":*[${filter}]|order(publishedAt desc,_id asc)[${offset}...${offset+10}]${projection},"total":count(*[${filter}])}`;
 const url=new URL(`https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}`);url.searchParams.set('query',groq);url.searchParams.set('perspective','published');if(slug)url.searchParams.set('$slug',JSON.stringify(slug));const response=await fetch(url,{signal:AbortSignal.timeout(10000)});if(!response.ok)throw new Error('CMS_UNAVAILABLE');const data=await response.json();return data.result;}
module.exports={escape,safeUrl,imageUrl,portableText,query};

