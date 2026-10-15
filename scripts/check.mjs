import {pages, sources} from '../src/content.mjs';
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
const root=path.resolve('dist');const base=(process.env.BASE_PATH||'').replace(/\/$/,'');let htmls=[];function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);e.isDirectory()?walk(p):p.endsWith('.html')&&htmls.push(p)}}walk(root);assert.equal(htmls.length,24);
let count=0;for(const file of htmls){const html=fs.readFileSync(file,'utf8');for(const m of html.matchAll(/(?:href|src)="(\/[^"#]*)(#[^"]*)?"/g)){assert(!base || m[1].startsWith(base+'/'),`unprefixed link ${m[1]}`);let target=path.join(root,base?m[1].slice(base.length):m[1]);if(m[1].endsWith('/'))target=path.join(target,'index.html');assert(fs.existsSync(target),`${file}: broken ${m[1]}`);if(m[2])assert(fs.readFileSync(target,'utf8').includes(`id="${m[2].slice(1)}"`),`missing anchor ${m[0]}`);count++}if(/\/(en|zh)\//.test(file)){assert(html.includes('hreflang="zh-CN"'));assert(html.includes('name="description"'));assert(html.includes('<h1>'));assert(html.includes('Contact & Corrections')||html.includes('联系与纠错'));assert(!/undefined|NaN/.test(html))}}
for(const lang of ['en','zh']){const s=fs.readFileSync(`${root}/${lang}/safety/index.html`,'utf8');for(const n of [110,119,120,122])assert(s.includes(`tel:${n}`));}
assert(fs.statSync(`${root}/assets/china-road.jpg`).size>10000);console.log(`PASS: 24 pages, ${count} internal assets/links and linked anchors, bilingual metadata, emergency phone links, image asset.`);

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
for(const [lang,heading,button] of [['en','Get in touch with Zhou','Email Zhou'],['zh','联系 Zhou','给 Zhou 写邮件']]){
 const html=fs.readFileSync(`${root}/${lang}/contact/index.html`,'utf8');
 assert(html.includes(heading) && html.includes(button),`${lang}: untranslated contact UI`);
 assert(html.includes('mailto:8787zzr@gmail.com'),`${lang}: missing email link`);
 assert(!html.includes('report-detail'),`${lang}: outdated report generator`);
 const privacy=fs.readFileSync(`${root}/${lang}/privacy/index.html`,'utf8');
 assert(privacy.includes('mailto:8787zzr@gmail.com'),`${lang}: missing privacy contact`);
}
console.log('PASS: complete bilingual article fields, source labels, contact UI and privacy contact.');
