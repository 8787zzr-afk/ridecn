import vm from 'node:vm';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const script=fs.readFileSync('public/assets/app.js','utf8');
for(const lang of ['en','zh','fr']){
 const element=(dataset={})=>({dataset,events:{},attrs:{},addEventListener(k,fn){this.events[k]=fn},setAttribute(k,v){this.attrs[k]=v},getAttribute(k){return this.attrs[k]},classList:{toggle(){},remove(){}},focus(){}});
 const links=['en','zh','fr'].map(language=>element({language}));
 const menu=element(),nav=element(),theme=element(),check=element(),progress=element(),memory=new Map();
 const document={body:{dataset:{lang}},documentElement:{dataset:{}},addEventListener(){},querySelector(q){return {'#menu':menu,'#main-nav':nav,'#theme':theme,'#check-progress':progress}[q]},querySelectorAll(q){return q==='[data-language]'?links:q==='.check'?[check]:q==='.check:checked'?[check]:[]}};
 vm.runInNewContext(script,{document,localStorage:{getItem:k=>memory.get(k),setItem:(k,v)=>memory.set(k,v)}});
 for(const link of links){link.events.click({currentTarget:link});assert.equal(memory.get('ridecn-language'),link.dataset.language)}
 check.events.change();assert.equal(progress.textContent,`1 / 5 ${{en:'ready',zh:'已完成',fr:'prêts'}[lang]}`);
 menu.events.click();assert.equal(menu.attrs['aria-expanded'],'true');menu.events.click();assert.equal(menu.attrs['aria-expanded'],'false');
 theme.events.click();assert.equal(memory.get('ridecn-theme'),'dark');
}
console.log('PASS: three-language preference persistence, translated checklist status, menu and theme handlers.');
