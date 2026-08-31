/* Nikoleta Wellness CEO — 24ωρη μορφή ώρας */
(function(){
  'use strict';

  function time24(value){
    let s=String(value??'').trim();
    if(!s) return '';
    s=s.replace(/\s+/g,' ');
    const m=s.match(/^(\d{1,2}):(\d{2})(?:\s*(π\.μ\.|μ\.μ\.|πμ|μμ|am|pm))?$/i);
    if(!m) return s;
    let h=Number(m[1]);
    const min=m[2];
    const suffix=(m[3]||'').toLowerCase();
    if(suffix==='μ.μ.'||suffix==='μμ'||suffix==='pm') { if(h<12) h+=12; }
    if(suffix==='π.μ.'||suffix==='πμ'||suffix==='am') { if(h===12) h=0; }
    if(h>23) return s;
    return String(h).padStart(2,'0')+':'+min;
  }

  function fixTimeInputs(){
    document.querySelectorAll('input[type="time"]').forEach(input=>{
      const value=time24(input.value);
      if(value) input.value=value;
      /* Force a visible 24-hour text field instead of the browser's
         locale-dependent π.μ./μ.μ. presentation. */
      if(input.type==='time'){
        input.type='text';
        input.inputMode='numeric';
        input.placeholder='HH:MM';
        input.maxLength=5;
        input.pattern='^([01]\\d|2[0-3]):[0-5]\\d$';
        input.addEventListener('blur',()=>{
          const v=time24(input.value);
          if(v) input.value=v;
        });
      }
    });
  }

  function fixVisibleTimes(){
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      const parent=node.parentElement;
      if(!parent || ['SCRIPT','STYLE','INPUT','TEXTAREA'].includes(parent.tagName)) return;
      const original=node.nodeValue;
      const replaced=original.replace(/\b(\d{1,2}:\d{2})(?:\s*(π\.μ\.|μ\.μ\.|πμ|μμ|AM|PM))?\b/gi,(full)=>time24(full));
      if(replaced!==original) node.nodeValue=replaced;
    });
  }

  function run(){ fixTimeInputs(); fixVisibleTimes(); }
  document.addEventListener('DOMContentLoaded',run);
  new MutationObserver(run).observe(document.documentElement,{subtree:true,childList:true});
})();
