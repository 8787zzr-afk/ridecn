import {pages, sources} from '../src/content.mjs';
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
const root=path.resolve('dist');const base=(process.env.BASE_PATH||'').replace(/\/$/,'');let htmls=[];function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);e.isDirectory()?walk(p):p.endsWith('.html')&&htmls.push(p)}}walk(root);assert.equal(htmls.length,35);
let count=0;for(const file of htmls){const html=fs.readFileSync(file,'utf8');for(const m of html.matchAll(/(?:href|src)="(\/[^"#]*)(#[^"]*)?"/g)){assert(!base || m[1].startsWith(base+'/'),`unprefixed link ${m[1]}`);let target=path.join(root,base?m[1].slice(base.length):m[1]);if(m[1].endsWith('/'))target=path.join(target,'index.html');assert(fs.existsSync(target),`${file}: broken ${m[1]}`);if(m[2])assert(fs.readFileSync(target,'utf8').includes(`id="${m[2].slice(1)}"`),`missing anchor ${m[0]}`);count++}if(/\/(en|zh|fr)\//.test(file)){assert(html.includes('hreflang="zh-CN"'));assert(html.includes('name="description"'));assert(html.includes('<h1>'));assert(html.includes('Contact & Corrections')||html.includes('联系与纠错')||html.includes('Contact et corrections'));assert(!/undefined|NaN/.test(html))}}
for(const lang of ['en','zh','fr']){const s=fs.readFileSync(`${root}/${lang}/safety/index.html`,'utf8');for(const n of [110,119,120,122])assert(s.includes(`tel:${n}`));}
assert(fs.statSync(`${root}/assets/china-road.jpg`).size>10000);console.log(`PASS: 35 pages, ${count} internal assets/links and linked anchors, trilingual metadata, emergency phone links, image asset.`);

// Fail the release if a paired article or policy translation is missing.
for(const [key,page] of Object.entries(pages)){
 for(const field of ['title','desc','category']){
  assert.equal(page[field].length,2,`${key}.${field}: expected both published languages`);
  assert(page[field].every(v=>typeof v==='string' && v.trim()),`${key}.${field}: missing translation`);
 }
 for(const [index,section] of page.sections.entries()){
  for(const field of ['en','zh','bodyEN','bodyZH'])assert(typeof section[field]==='string' && section[field].trim(),`${key} section ${index}: missing ${field}`);
 }
}
for(const source of sources)for(const index of [1,2,3,4])assert(source[index]?.trim(),'Missing bilingual source label');
for(const [lang,heading,button] of [['en','Get in touch with Zhou','Email Zhou'],['zh','联系 Zhou','给 Zhou 写邮件'],['fr','Contacter Zhou','Écrire à Zhou']]){
 const html=fs.readFileSync(`${root}/${lang}/contact/index.html`,'utf8');
 assert(html.includes(heading) && html.includes(button),`${lang}: untranslated contact UI`);
 assert(html.includes('mailto:8787zzr@gmail.com'),`${lang}: missing email link`);
 assert(!html.includes('report-detail'),`${lang}: outdated report generator`);
 const privacy=fs.readFileSync(`${root}/${lang}/privacy/index.html`,'utf8');
 assert(privacy.includes('mailto:8787zzr@gmail.com'),`${lang}: missing privacy contact`);
}
console.log('PASS: complete bilingual article fields, source labels, contact UI and privacy contact.');

// Each translated content page loads one beacon; the redirect loads none.
for(const file of htmls.filter(file=>/\/(en|zh|fr)\//.test(file))){
 const html=fs.readFileSync(file,'utf8');
 assert.equal((html.match(/https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js/g)||[]).length,1,`${file}: expected one analytics script`);
 const config=html.match(/data-cf-beacon='([^']+)'/);
 assert.equal(JSON.parse(config[1]).token,'88fe31aba4ad41ab904bec02554be331');
}
assert(!fs.readFileSync(`${root}/index.html`,'utf8').includes('beacon.min.js'));
for(const lang of ['en','zh','fr']){
 const policy=fs.readFileSync(`${root}/${lang}/privacy/index.html`,'utf8');
 assert(policy.includes('Cloudflare Web Analytics'));
 assert(!policy.includes('or analytics scripts') && !policy.includes('或统计脚本'));
}
console.log('PASS: single analytics beacon on 33 content pages, redirect excluded, all privacy notices updated.');

// Check every page-preserving language link, SEO alternate and French section.
for(const lang of ['en','zh','fr'])for(const key of ['home',...Object.keys(pages)]){
 const suffix=key==='home'?'':key+'/';
 const html=fs.readFileSync(`${root}/${lang}/${suffix}index.html`,'utf8');
 for(const code of ['en','zh','fr']){
  assert(html.includes(`href="${base}/${code}/${suffix}"`),`Missing ${code} counterpart for ${lang}/${key}`);
  assert(html.includes(`hreflang="${code==='zh'?'zh-CN':code}"`));
 }
 if(lang==='fr')assert(html.includes('<html lang="fr">'));
}
const {frenchPages,frenchSources}=await import('../src/fr.mjs');
for(const [key,page] of Object.entries(pages)){
 const fr=frenchPages[key];assert.equal(fr[3].length,page.sections.length,`French section count: ${key}`);
 assert(fr.slice(0,3).every(s=>s?.trim()));
 const html=fs.readFileSync(`${root}/fr/${key}/index.html`,'utf8');
 for(const [heading,body] of fr[3]){assert(heading?.trim() && body?.trim());assert(html.includes(heading));assert(html.includes(body.split('8787zzr@gmail.com')[0]));}
}
for(const [id] of sources)assert(frenchSources[id]?.every(s=>s?.trim()));
assert(fs.readFileSync(`${root}/index.html`,'utf8').includes("fr:'"+base+"/fr/'"));
console.log('PASS: French sections and source labels, same-page switches and SEO for all three languages.');

await import('./check-interactions.mjs');

// The long-form homepage introduction must be complete in every published language.
const purpose=JSON.parse(fs.readFileSync('src/purpose.json','utf8'));
for(const lang of ['en','zh','fr']){
 const entry=purpose[lang],html=fs.readFileSync(`${root}/${lang}/index.html`,'utf8');
 const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
 assert.equal(entry.sections.length,6,`${lang}: missing purpose chapters`);
 assert.equal(entry.intro.length,purpose.en.intro.length,`${lang}: missing introductory paragraphs`);
 for(const field of ['label','title','motto','contactLabel','aboutLabel','contentsLabel'])assert(html.includes(escape(entry[field])),`${lang}: missing purpose ${field}`);
 for(const text of entry.intro)assert(html.includes(`<p>${escape(text)}</p>`),`${lang}: missing purpose introduction`);
 for(const [n,section] of entry.sections.entries()){
  assert.equal(section.id,purpose.en.sections[n].id);
  assert.equal(section.paragraphs.length,purpose.en.sections[n].paragraphs.length,`${lang}: missing paragraphs in ${section.id}`);
  assert(html.includes(`<h3 id="purpose-heading-${section.id}">${escape(section.title)}</h3>`));
  for(const text of section.paragraphs)assert(html.includes(`<p>${escape(text)}</p>`),`${lang}: missing purpose paragraph`);
 }
 assert.equal((html.match(/id="our-purpose"/g)||[]).length,1);
}
console.log('PASS: all six homepage purpose chapters, introductory paragraphs and sign-off in English, Chinese and French.');

// Keep each route idea and its provenance available in every published language.
const {routes,photos,routeSources,routeNotice}=await import('../src/chengdu-routes.mjs');
assert.equal(routes.length,6);
const escapeRoute=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
for(const lang of ['en','zh','fr']){
 const html=fs.readFileSync(`${root}/${lang}/chengdu/index.html`,'utf8');
 const sourceHTML=fs.readFileSync(`${root}/${lang}/sources/index.html`,'utf8');
 assert(html.includes(escapeRoute(routeNotice[lang])));
 for(const r of routes){
  assert.equal((html.match(new RegExp(`id="ride-${r.id}"`,'g'))||[]).length,1);
  for(const key of ['name','distance','terrain','effort','description','plan'])assert(html.includes(escapeRoute(r[key][lang])),`${lang}/${r.id}: missing ${key}`);
  const source=routeSources.find(s=>s.id===r.id);
  assert(sourceHTML.includes(`id="chengdu-${r.id}"`));
  assert(sourceHTML.includes(source.url));
 }
 for(const photo of photos){assert(html.includes(escapeRoute(photo.caption[lang])));assert(sourceHTML.includes(photo.url));}
}
for(const photo of photos){assert(fs.statSync(`${root}/assets/chengdu/${photo.id}.webp`).size<200000);assert(photo.width>0 && photo.height>0)}
console.log('PASS: six complete route ideas in three languages, provenance links, photo credits and optimized local images.');

const {socialAccounts}=await import('../src/social.mjs');
for(const lang of ['en','zh','fr']){
 const html=fs.readFileSync(`${root}/${lang}/contact/index.html`,'utf8');
 for(const a of socialAccounts){assert(html.includes(escapeRoute(a.href)),`${lang}: missing ${a.id} destination`);assert(html.includes(a.handle));assert(html.includes(a.action[lang]));}
 assert(html.includes(['Visiting China? Say hello.','来中国骑行，欢迎找我聊聊。','Vous venez en Chine ? Parlons-en.'][['en','zh','fr'].indexOf(lang)]));
 const privacy=fs.readFileSync(`${root}/${lang}/privacy/index.html`,'utf8');
 for(const platform of ['QQ','Instagram','Douyin'])assert(privacy.includes(platform==='Douyin'&&lang==='zh'?'抖音':platform));
 assert(privacy.includes('24 October 2026')||privacy.includes('2026年10月24日')||privacy.includes('24 octobre 2026'));
}
assert.equal(socialAccounts.find(a=>a.id==='douyin').href,'https://v.douyin.com/YIYzPD0RQrU/');
console.log('PASS: public contact accounts, provided Douyin share link, three-language invitation and social privacy notice.');
