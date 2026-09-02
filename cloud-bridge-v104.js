(()=>{
  const URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
  const KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
  const db=window.supabase?.createClient?.(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  if(!db)return;
  const stateKey='nwceo_final_v1', snapKey='nwceo_cloud_snapshot_v104';
  const cfg={
    clients:{table:'clients',map:{name:'name',phone:'phone',email:'email',address:'address',birth_date:'birth_date',notes:'notes',status:'status'}},
    appointments:{table:'appointments',map:{client_id:'client_id',title:'title',date:'appointment_date',start_time:'start_time',end_time:'end_time',type:'appointment_type',status:'status',notes:'notes',reminder_minutes:'reminder_minutes'}},
    partners:{table:'partners',map:{name:'name',phone:'phone',email:'email',business:'business',notes:'notes',status:'status'}},
    measurements:{table:'tanita_measurements',map:{client_id:'client_id',date:'measurement_date',weight:'weight',fat:'body_fat',muscle:'muscle_mass',water:'water_percent',bone:'bone_mass',visceral:'visceral_fat',calories:'calories',metabolic_age:'metabolic_age',fitness_score:'fitness_score',notes:'notes'}},
    programs:{table:'programs',map:{client_id:'client_id',title:'title',start_date:'start_date',end_date:'end_date',calories:'calories',protein:'protein',description:'description',notes:'notes',status:'status'}},
    followups:{table:'follow_ups',map:{client_id:'client_id',title:'title',date:'follow_up_date',time:'follow_up_time',status:'status',notes:'notes',reminder_minutes:'reminder_minutes'}},
    orders:{table:'orders',map:{client_id:'client_id',date:'order_date',product:'product_name',quantity:'quantity',unit_price:'unit_price',total:'total_amount',status:'status',notes:'notes'}},
    finance:{table:'finance_transactions',map:{type:'transaction_type',amount:'amount',date:'transaction_date',category:'category',description:'description',client_id:'client_id'}},
    tasks:{table:'planner_tasks',map:{title:'title',description:'description',date:'task_date',start_time:'start_time',end_time:'end_time',completed:'completed',reminder_minutes:'reminder_minutes',priority:'priority'}},
    reminders:{table:'reminders',map:{title:'title',date:'reminder_date',time:'reminder_time',reminder_minutes:'reminder_minutes',related_type:'related_type',related_id:'related_id',completed:'completed',notes:'notes'}},
    success:{table:'daily_success',map:{date:'success_date',task:'task',completed:'completed',notes:'notes'}},
    documents:{table:'documents',map:{title:'title',file_name:'file_name',file_path:'file_path',file_type:'file_type',file_size:'file_size',related_type:'related_type',related_id:'related_id'}}
  };
  const num=new Set(['amount','quantity','unit_price','total','weight','fat','muscle','water','bone','visceral','calories','protein','metabolic_age','fitness_score','file_size','reminder_minutes']);
  const keys=Object.keys(cfg);
  const read=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k)||'null');return v==null?d:v}catch{return d}};
  const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const getState=()=>read(stateKey,{clients:[],appointments:[],partners:[],measurements:[],programs:[],followups:[],orders:[],finance:[],tasks:[],reminders:[],success:[],documents:[]});
  const setStatus=(text,kind)=>{const b=document.querySelector('.sync-badge');if(b){b.className='sync-badge '+kind;b.textContent=text}};
  const row=(k,o,uid)=>{const r={id:o.id,user_id:uid};for(const [ui,dbk] of Object.entries(cfg[k].map)){let v=o[ui];if(v===undefined&&ui==='date')v=o.measurement_date||o.appointment_date||o.follow_up_date||o.order_date||o.transaction_date||o.task_date||o.reminder_date||o.success_date;if(ui==='title'&&v==null&&k==='appointments')v='Ραντεβού';if(ui==='type')v=v==='Έσοδο'?'income':v==='Έξοδο'?'expense':v;if(ui==='completed')v=!!v;if(num.has(ui)&&v!==''&&v!=null)v=Number(v);if(k==='appointments'&&ui==='reminder_minutes'&&v==null)v=0;if(['tasks','reminders','success'].includes(k)&&ui==='reminder_minutes'&&v==null)v=0;r[dbk]=v===''?null:v}return r};
  const ui=(k,r)=>{const o={id:r.id};for(const [uk,dk] of Object.entries(cfg[k].map)){let v=r[dk];if(uk==='type')v=v==='income'?'Έσοδο':v==='expense'?'Έξοδο':v;o[uk]=v}return o};
  let busy=false, lastLocal='', user=null;
  const localFingerprint=()=>JSON.stringify(read(stateKey,{}));
  async function pull(){
    if(!user||busy)return false;
    busy=true;setStatus('↻ Συγχρονισμός…','sync');
    try{
      const cloud={}; for(const k of keys){const q=await db.from(cfg[k].table).select('*').eq('user_id',user.id).order('created_at',{ascending:false});if(q.error)throw q.error;cloud[k]=(q.data||[]).map(r=>ui(k,r));}
      const local=getState(), old=read(snapKey,null), merged=structuredClone(local);
      const dirtyIds={};
      for(const k of keys){
        const la=local[k]||[], ca=cloud[k]||[], cm=new Map(ca.map(x=>[x.id,x]));
        const olda=old?.[k]||[], om=new Map(olda.map(x=>[x.id,JSON.stringify(x)]));
        for(const x of la){const oldx=om.get(x.id), changed=oldx===undefined||oldx!==JSON.stringify(x);if(!cm.has(x.id)||(changed&&JSON.stringify(x)!==JSON.stringify(cm.get(x.id))))dirtyIds[k]=(dirtyIds[k]||[]).concat(x.id)}
        const out=[];const seen=new Set();
        for(const x of la){if(cm.has(x.id)&&!(dirtyIds[k]||[]).includes(x.id)){out.push(cm.get(x.id));seen.add(x.id)}else{out.push(x);seen.add(x.id)}}
        for(const x of ca)if(!seen.has(x.id))out.push(x);
        merged[k]=out;
      }
      // Push local-only and locally changed records. This is the critical bridge for records created by the UI.
      for(const k of keys){for(const id of (dirtyIds[k]||[])){const x=(merged[k]||[]).find(z=>z.id===id);if(!x)continue;const {error}=await db.from(cfg[k].table).upsert(row(k,x,user.id),{onConflict:'id'});if(error)throw error}}
      // Pull once more after writes so the laptop/mobile end on exactly the same cloud state.
      const final={};for(const k of keys){const q=await db.from(cfg[k].table).select('*').eq('user_id',user.id).order('created_at',{ascending:false});if(q.error)throw q.error;final[k]=(q.data||[]).map(r=>ui(k,r));}
      write(stateKey,final);write(snapKey,final);write('nwceo_pending_final',[]);lastLocal=JSON.stringify(final);setStatus('☁️ Συγχρονισμένο','ok');if(typeof window.render==='function')window.render();return true;
    }catch(e){console.warn('v104 cloud bridge',e);setStatus('⚠️ Δεν ολοκληρώθηκε ο συγχρονισμός','offline');return false}finally{busy=false}
  }
  async function removeDeleted(){
    if(!user)return;const local=getState(), old=read(snapKey,null);if(!old)return;
    for(const k of keys){const ids=new Set((local[k]||[]).map(x=>x.id));for(const x of old[k]||[])if(!ids.has(x.id)){const {error}=await db.from(cfg[k].table).delete().eq('id',x.id).eq('user_id',user.id);if(error)console.warn(error)}}
  }
  async function watchLocal(){const f=localFingerprint();if(f===lastLocal||busy)return;if(user){await removeDeleted();await pull()}}
  function enhanceClientInputs(){
    document.querySelectorAll('select[name="client_id"]').forEach(sel=>{
      if(sel.dataset.searchEnhanced)return;sel.dataset.searchEnhanced='1';
      const wrap=document.createElement('div');wrap.className='client-search-wrap';
      const inp=document.createElement('input');inp.type='text';inp.setAttribute('list','nw-client-list');inp.placeholder='Πληκτρολόγησε όνομα πελάτη…';inp.className='client-search-input';
      const list=document.createElement('datalist');list.id='nw-client-list';
      [...sel.options].filter(o=>o.value).forEach(o=>{const op=document.createElement('option');op.value=o.textContent;op.dataset.id=o.value;list.appendChild(op)});
      const current=sel.options[sel.selectedIndex];if(current&&current.value)inp.value=current.textContent;
      inp.addEventListener('input',()=>{const val=inp.value.trim().toLocaleLowerCase('el-GR');const opt=[...sel.options].find(o=>o.value&&o.textContent.trim().toLocaleLowerCase('el-GR')===val);sel.value=opt?.value||'';sel.dispatchEvent(new Event('change',{bubbles:true}))});
      sel.parentNode.insertBefore(wrap,sel);wrap.appendChild(inp);wrap.appendChild(list);sel.style.display='none';
    });
  }
  const css=document.createElement('style');css.textContent='.client-search-wrap{width:100%}.client-search-input{width:100%;box-sizing:border-box}.data-card{position:relative}.client-folder-btn{margin-top:8px;border:1px solid rgba(36,91,43,.18);background:#fff;border-radius:10px;padding:7px 10px;cursor:pointer;font-weight:600}.tanita-folder-modal{position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;display:grid;place-items:center;padding:16px}.tanita-folder-card{background:#fff;width:min(1000px,96vw);max-height:90vh;overflow:auto;border-radius:20px;padding:22px;box-shadow:0 20px 60px rgba(0,0,0,.2)}.tanita-folder-card h2{margin:0 0 4px}.tanita-history{width:100%;border-collapse:collapse;margin-top:16px;font-size:14px}.tanita-history th,.tanita-history td{padding:9px 7px;border-bottom:1px solid #e7ece8;text-align:center}.tanita-history th:first-child,.tanita-history td:first-child{text-align:left}.delta{font-weight:700}.delta.pos{color:#2f7d32}.delta.neg{color:#b13b3b}.folder-close{float:right;border:0;background:transparent;font-size:26px;cursor:pointer}.folder-note{margin-top:12px;color:#64706a;font-size:13px}';document.head.appendChild(css);
  function delta(a,b,key,unit){if(a==null||b==null||a===''||b==='')return '—';const d=Number(a)-Number(b);const s=(d>0?'+':'')+d.toFixed(1).replace('.0','');return `<span class="delta ${d>0?'pos':d<0?'neg':''}">${s} ${unit}</span>`}
  function openFolder(id){
    const st=getState(), c=(st.clients||[]).find(x=>x.id===id), rows=(st.measurements||[]).filter(x=>x.client_id===id).sort((a,b)=>String(a.date||'').localeCompare(String(b.date||'')));
    if(!c)return;document.querySelector('.tanita-folder-modal')?.remove();
    let prev=null;const body=rows.map((m,i)=>{const r=`<tr><td>${m.date||'—'}</td><td>${m.weight??'—'} kg<br>${i?delta(m.weight,prev.weight,'weight','kg'):''}</td><td>${m.water??'—'}%<br>${i?delta(m.water,prev.water,'water','μον.'):''}</td><td>${m.fat??'—'}%<br>${i?delta(m.fat,prev.fat,'fat','μον.'):''}</td><td>${m.muscle??'—'} kg<br>${i?delta(m.muscle,prev.muscle,'muscle','kg'):''}</td><td>${m.visceral??'—'}<br>${i?delta(m.visceral,prev.visceral,'visceral','') :''}</td><td>${m.calories??'—'}<br>${i?delta(m.calories,prev.calories,'calories','kcal'):''}</td></tr>`;prev=m;return r}).join('');
    const modal=document.createElement('div');modal.className='tanita-folder-modal';modal.innerHTML=`<div class="tanita-folder-card"><button class="folder-close" aria-label="Κλείσιμο">×</button><div class="eyebrow">ΚΑΡΤΕΛΑ ΠΕΛΑΤΗ</div><h2>${String(c.name||'Πελάτης').replace(/[&<>]/g,'')}</h2><div>Tanita — όλες οι μετρήσεις και η μεταβολή από την προηγούμενη μέτρηση</div>${rows.length?`<table class="tanita-history"><thead><tr><th>Ημερομηνία</th><th>Βάρος</th><th>Νερό</th><th>Λίπος</th><th>Μυς</th><th>Σπλαχνικό</th><th>Θερμίδες</th></tr></thead><tbody>${body}</tbody></table>`:'<p>Δεν υπάρχει ακόμη μέτρηση για αυτόν τον πελάτη.</p>'}<div class="folder-note">Από τη 2η μέτρηση εμφανίζεται αυτόματα η διαφορά από την αμέσως προηγούμενη: π.χ. −2.0 kg, +1.9 μον. νερού.</div></div>`;document.body.appendChild(modal);modal.querySelector('.folder-close').onclick=()=>modal.remove();modal.addEventListener('click',e=>{if(e.target===modal)modal.remove()});
  }
  function enhanceClientCards(){document.querySelectorAll('.data-card').forEach(card=>{const edit=card.querySelector('[data-edit="clients"]');if(!edit||card.querySelector('.client-folder-btn'))return;const id=edit.dataset.id;const b=document.createElement('button');b.className='client-folder-btn';b.type='button';b.textContent='📊 Φάκελος & Μετρήσεις';b.onclick=()=>openFolder(id);card.querySelector('.card-main')?.appendChild(b)})}
  function enhance(){enhanceClientInputs();enhanceClientCards()}
  const oldRender=window.render;if(typeof oldRender==='function')window.render=function(){const r=oldRender.apply(this,arguments);setTimeout(enhance,0);return r};
  const mo=new MutationObserver(()=>enhance());mo.observe(document.body,{childList:true,subtree:true});
  db.auth.getSession().then(({data})=>{user=data?.session?.user||null;if(user){pull();setInterval(watchLocal,1200);}});
  db.auth.onAuthStateChange((_e,s)=>{user=s?.user||null;if(user)pull()});
  ['clients','appointments','partners','tanita_measurements','programs','follow_ups','orders','finance_transactions','planner_tasks','reminders','daily_success','documents'].forEach(t=>db.channel('v104-'+t).on('postgres_changes',{event:'*',schema:'public',table:t},()=>setTimeout(pull,250)).subscribe());
  window.addEventListener('online',()=>pull());
  setTimeout(enhance,500);
})();
